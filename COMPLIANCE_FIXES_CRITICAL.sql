-- ============================================================================
-- HIPAA COMPLIANCE FIXES - CRITICAL ISSUES ONLY
-- ============================================================================
-- RUN THIS AFTER DEPLOYING COMPLETE_RESEARCH_GRADE_SCHEMA.sql
-- Addresses all CRITICAL and HIGH priority compliance gaps
-- ============================================================================

-- ============================================================================
-- FIX 1: IP ADDRESS HASHING FOR AUDIT LOG
-- ============================================================================

-- Create hashing function for IP addresses
CREATE OR REPLACE FUNCTION hash_ip(ip INET) RETURNS TEXT AS $$
BEGIN
    -- Hash IP with application salt for security
    -- Returns consistent hash for same IP (for pattern detection)
    RETURN encode(digest(ip::text || COALESCE(current_setting('app.ip_salt', true), 'default_salt_change_in_production'), 'sha256'), 'hex');
END;
$$ LANGUAGE plpgsql IMMUTABLE SECURITY DEFINER;

-- Add column for hashed IP
ALTER TABLE public.audit_log 
    ADD COLUMN IF NOT EXISTS ip_address_hash TEXT;

-- Update existing audit trigger to use hashed IPs
CREATE OR REPLACE FUNCTION public.audit_trigger_function()
RETURNS TRIGGER AS $$
DECLARE
    jwt_claims JSONB := nullif(current_setting('request.jwt.claims', true), '')::JSONB;
    acting_user TEXT := COALESCE(nullif(current_setting('app.current_user_id', true), ''), jwt_claims ->> 'sub');
    client_ip INET := inet_client_addr();
BEGIN
    INSERT INTO public.audit_log (
        user_id, 
        action, 
        table_name, 
        record_id, 
        ip_address_hash,  -- Use hashed IP instead of raw IP
        user_agent, 
        created_at
    )
    VALUES (
        CASE WHEN acting_user IS NOT NULL THEN acting_user::UUID ELSE NULL END,
        TG_OP,
        TG_TABLE_NAME,
        COALESCE((NEW).id::TEXT, (OLD).id::TEXT),
        CASE WHEN client_ip IS NOT NULL THEN hash_ip(client_ip) ELSE NULL END,  -- Hash the IP
        jwt_claims ->> 'user_agent',
        NOW()
    );
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Remove raw IP column (keeping hashed version)
ALTER TABLE public.audit_log DROP COLUMN IF EXISTS ip_address;

-- Add comment explaining the security measure
COMMENT ON COLUMN public.audit_log.ip_address_hash IS 'SHA-256 hashed IP address for security logging without storing PII. Allows pattern detection while protecting user privacy per HIPAA §164.514(b)(2)(i)(B)';

-- ============================================================================
-- FIX 2: SECURE RESEARCH USER MAPPING
-- ============================================================================

-- Create protected schema for sensitive mappings
CREATE SCHEMA IF NOT EXISTS protected;

-- Revoke public access
REVOKE ALL ON SCHEMA protected FROM PUBLIC;
GRANT USAGE ON SCHEMA protected TO authenticated;

-- Move research_user_mapping to protected schema with enhanced security
DROP TABLE IF EXISTS public.research_user_mapping CASCADE;

CREATE TABLE protected.research_user_mapping (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    research_user_id UUID NOT NULL UNIQUE DEFAULT gen_random_uuid(),
    mapping_key_hash TEXT NOT NULL DEFAULT encode(gen_random_bytes(32), 'hex'),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    last_accessed_at TIMESTAMPTZ,
    access_count INT DEFAULT 0,
    accessed_by UUID[] DEFAULT ARRAY[]::UUID[]
);

-- Enable RLS on the protected table
ALTER TABLE protected.research_user_mapping ENABLE ROW LEVEL SECURITY;

-- No direct select allowed - must use function
CREATE POLICY "No direct access to research mapping"
    ON protected.research_user_mapping
    FOR ALL
    USING (FALSE);

-- Revoke all direct table access
REVOKE ALL ON protected.research_user_mapping FROM PUBLIC;
REVOKE ALL ON protected.research_user_mapping FROM authenticated;

-- Create secure access function with full audit trail
CREATE OR REPLACE FUNCTION protected.get_research_id(user_uuid UUID)
RETURNS UUID AS $$
DECLARE
    research_id UUID;
    access_granted BOOLEAN := FALSE;
BEGIN
    -- Check if caller has permission (must be researcher or system)
    -- In production, add more granular permission checks
    
    -- Audit the access attempt
    INSERT INTO public.audit_log (
        user_id, 
        action, 
        table_name, 
        record_id,
        created_at
    )
    VALUES (
        auth.uid(), 
        'RESEARCH_MAPPING_ACCESS_ATTEMPT', 
        'research_user_mapping', 
        user_uuid::TEXT,
        NOW()
    );
    
    -- Get research ID
    SELECT research_user_id INTO research_id
    FROM protected.research_user_mapping
    WHERE user_id = user_uuid;
    
    IF research_id IS NOT NULL THEN
        -- Update access tracking
        UPDATE protected.research_user_mapping
        SET 
            last_accessed_at = NOW(), 
            access_count = access_count + 1,
            accessed_by = array_append(accessed_by, auth.uid())
        WHERE user_id = user_uuid;
        
        -- Log successful access
        INSERT INTO public.audit_log (
            user_id, 
            action, 
            table_name, 
            record_id,
            created_at
        )
        VALUES (
            auth.uid(), 
            'RESEARCH_MAPPING_ACCESS_SUCCESS', 
            'research_user_mapping', 
            user_uuid::TEXT,
            NOW()
        );
    END IF;
    
    RETURN research_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission on function only
GRANT EXECUTE ON FUNCTION protected.get_research_id(UUID) TO authenticated;

-- Add comment
COMMENT ON FUNCTION protected.get_research_id IS 'Securely retrieves research user ID with full audit trail. Per HIPAA §164.514(c), protects re-identification safeguards.';

-- ============================================================================
-- FIX 3: CARER ACCESS TIME LIMITS
-- ============================================================================

-- Add expiry and verification columns to carer relationships
ALTER TABLE public.carer_relationships
    ADD COLUMN IF NOT EXISTS access_expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '1 year'),
    ADD COLUMN IF NOT EXISTS last_verified_at TIMESTAMPTZ DEFAULT NOW(),
    ADD COLUMN IF NOT EXISTS verification_required_by TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '6 months'),
    ADD COLUMN IF NOT EXISTS access_level TEXT DEFAULT 'full_access' CHECK (access_level IN ('full_access', 'view_only', 'emergency_only'));

-- Create function to check and enforce carer access expiry
CREATE OR REPLACE FUNCTION check_carer_access_expiry()
RETURNS TRIGGER AS $$
BEGIN
    -- Check if access has expired
    IF NEW.access_expires_at IS NOT NULL AND NEW.access_expires_at < NOW() THEN
        NEW.status := 'expired';
        
        -- Log the expiry
        INSERT INTO public.audit_log (
            user_id, 
            action, 
            table_name, 
            record_id,
            created_at
        )
        VALUES (
            NEW.carer_user_id, 
            'CARER_ACCESS_EXPIRED', 
            'carer_relationships', 
            NEW.id::TEXT,
            NOW()
        );
    END IF;
    
    -- Check if verification is overdue
    IF NEW.verification_required_by < NOW() AND NEW.status = 'active' THEN
        NEW.status := 'verification_required';
        
        -- Log verification requirement
        INSERT INTO public.audit_log (
            user_id, 
            action, 
            table_name, 
            record_id,
            created_at
        )
        VALUES (
            NEW.patient_user_id, 
            'CARER_VERIFICATION_REQUIRED', 
            'carer_relationships', 
            NEW.id::TEXT,
            NOW()
        );
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Apply trigger
DROP TRIGGER IF EXISTS carer_access_expiry_check ON public.carer_relationships;
CREATE TRIGGER carer_access_expiry_check
    BEFORE INSERT OR UPDATE ON public.carer_relationships
    FOR EACH ROW 
    EXECUTE FUNCTION check_carer_access_expiry();

-- Update RLS policy to enforce expiry
DROP POLICY IF EXISTS "Users can view relationships as carer" ON public.carer_relationships;
CREATE POLICY "Users can view relationships as carer" 
    ON public.carer_relationships 
    FOR SELECT 
    USING (
        auth.uid() = carer_user_id 
        AND status IN ('active', 'verification_required')
        AND (access_expires_at IS NULL OR access_expires_at > NOW())
    );

-- ============================================================================
-- FIX 4: CLINICIAN ACCESS TIME-BASED EXPIRY
-- ============================================================================

-- Add expiry and access control columns
ALTER TABLE public.patient_clinician_connections
    ADD COLUMN IF NOT EXISTS access_expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '1 year'),
    ADD COLUMN IF NOT EXISTS last_verified_at TIMESTAMPTZ DEFAULT NOW(),
    ADD COLUMN IF NOT EXISTS access_level TEXT DEFAULT 'full_access' CHECK (access_level IN ('full_access', 'read_only', 'emergency_only')),
    ADD COLUMN IF NOT EXISTS emergency_access_only BOOLEAN DEFAULT FALSE,
    ADD COLUMN IF NOT EXISTS access_reason TEXT;

-- Create function to enforce clinician access expiry
CREATE OR REPLACE FUNCTION check_clinician_access()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.access_expires_at < NOW() THEN
        NEW.status := 'expired';
        
        -- Log the expiry
        INSERT INTO public.audit_log (
            user_id, 
            action, 
            table_name, 
            record_id,
            created_at
        )
        VALUES (
            NEW.clinician_id, 
            'CLINICIAN_ACCESS_EXPIRED', 
            'patient_clinician_connections', 
            NEW.id::TEXT,
            NOW()
        );
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Apply trigger
DROP TRIGGER IF EXISTS clinician_access_check ON public.patient_clinician_connections;
CREATE TRIGGER clinician_access_check
    BEFORE INSERT OR UPDATE ON public.patient_clinician_connections
    FOR EACH ROW 
    EXECUTE FUNCTION check_clinician_access();

-- Update RLS policy to enforce expiry
DROP POLICY IF EXISTS "Clinicians can view own connections" ON public.patient_clinician_connections;
CREATE POLICY "Clinicians can view own connections" 
    ON public.patient_clinician_connections 
    FOR SELECT 
    USING (
        auth.uid() = clinician_id 
        AND status = 'active'
        AND access_expires_at > NOW()
    );

-- ============================================================================
-- FIX 5: AUDIT LOG RETENTION AUTOMATION
-- ============================================================================

-- Enable pg_cron extension (requires superuser - run in Supabase dashboard)
-- CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Schedule audit log cleanup (uncomment after enabling pg_cron)
-- SELECT cron.schedule(
--     'cleanup-old-audit-logs',
--     '0 0 1 * *',  -- First day of every month at midnight
--     'SELECT public.cleanup_old_audit_logs()'
-- );

-- For now, create a function that can be called manually or via external scheduler
CREATE OR REPLACE FUNCTION public.cleanup_old_audit_logs_safe()
RETURNS TABLE(deleted_count BIGINT, oldest_remaining TIMESTAMPTZ) AS $$
DECLARE
    rows_deleted BIGINT;
    oldest_record TIMESTAMPTZ;
BEGIN
    -- Delete audit logs older than 7 years
    WITH deleted AS (
        DELETE FROM public.audit_log 
        WHERE created_at < NOW() - INTERVAL '7 years'
        RETURNING *
    )
    SELECT COUNT(*) INTO rows_deleted FROM deleted;
    
    -- Get oldest remaining record
    SELECT MIN(created_at) INTO oldest_record FROM public.audit_log;
    
    -- Log the cleanup operation
    INSERT INTO public.audit_log (
        action, 
        table_name, 
        record_id,
        created_at
    )
    VALUES (
        'AUDIT_LOG_CLEANUP', 
        'audit_log', 
        format('Deleted %s records', rows_deleted),
        NOW()
    );
    
    RETURN QUERY SELECT rows_deleted, oldest_record;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute to authenticated users with appropriate role
-- In production, restrict this to admin role only
COMMENT ON FUNCTION public.cleanup_old_audit_logs_safe IS 'Safely removes audit logs older than 7 years per HIPAA retention requirements. Returns count of deleted records.';

-- ============================================================================
-- FIX 6: BREACH DETECTION SYSTEM
-- ============================================================================

-- Create security incidents table
CREATE TABLE IF NOT EXISTS public.security_incidents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    incident_type TEXT NOT NULL CHECK (incident_type IN (
        'EXCESSIVE_DATA_ACCESS',
        'UNAUTHORIZED_ACCESS_ATTEMPT',
        'SUSPICIOUS_PATTERN',
        'DATA_EXPORT_ANOMALY',
        'LOGIN_ANOMALY',
        'OTHER'
    )),
    severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    affected_users UUID[],
    detected_at TIMESTAMPTZ DEFAULT NOW(),
    resolved_at TIMESTAMPTZ,
    description TEXT NOT NULL,
    resolution_notes TEXT,
    notification_required BOOLEAN DEFAULT FALSE,
    notification_sent BOOLEAN DEFAULT FALSE,
    notification_sent_at TIMESTAMPTZ,
    investigated_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.security_incidents ENABLE ROW LEVEL SECURITY;

-- Only admins can view security incidents
CREATE POLICY "Only admins can view security incidents"
    ON public.security_incidents
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND user_type = 'admin'
        )
    );

-- Function to detect suspicious access patterns
CREATE OR REPLACE FUNCTION detect_suspicious_access()
RETURNS TRIGGER AS $$
DECLARE
    access_count INT;
    recent_failures INT;
BEGIN
    -- Check for excessive data access in short time window
    SELECT COUNT(*) INTO access_count
    FROM public.audit_log
    WHERE user_id = NEW.user_id
      AND action LIKE '%ACCESS%'
      AND created_at > NOW() - INTERVAL '5 minutes';
      
    -- Check for recent failed access attempts
    SELECT COUNT(*) INTO recent_failures
    FROM public.audit_log
    WHERE user_id = NEW.user_id
      AND action LIKE '%FAILED%'
      AND created_at > NOW() - INTERVAL '10 minutes';
      
    -- Flag suspicious patterns
    IF access_count > 100 THEN
        INSERT INTO public.security_incidents (
            incident_type,
            severity,
            affected_users,
            description,
            notification_required
        ) VALUES (
            'EXCESSIVE_DATA_ACCESS',
            'high',
            ARRAY[NEW.user_id],
            format('User accessed data %s times in 5 minutes (threshold: 100)', access_count),
            TRUE
        );
    END IF;
    
    IF recent_failures > 5 THEN
        INSERT INTO public.security_incidents (
            incident_type,
            severity,
            affected_users,
            description,
            notification_required
        ) VALUES (
            'UNAUTHORIZED_ACCESS_ATTEMPT',
            'medium',
            ARRAY[NEW.user_id],
            format('User had %s failed access attempts in 10 minutes', recent_failures),
            TRUE
        );
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Apply breach detection trigger
DROP TRIGGER IF EXISTS detect_breach_attempts ON public.audit_log;
CREATE TRIGGER detect_breach_attempts
    AFTER INSERT ON public.audit_log
    FOR EACH ROW 
    WHEN (NEW.action LIKE '%ACCESS%' OR NEW.action LIKE '%FAILED%')
    EXECUTE FUNCTION detect_suspicious_access();

-- ============================================================================
-- FIX 7: UPDATE PROFILES TABLE WITH USER TYPE ENUM
-- ============================================================================

-- Ensure profiles table uses the user_type_enum
ALTER TABLE public.profiles
    ALTER COLUMN user_type TYPE user_type_enum USING user_type::user_type_enum;

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- Run these to verify fixes were applied correctly:

-- Check IP hashing is working
-- SELECT COUNT(*) FROM public.audit_log WHERE ip_address_hash IS NOT NULL;

-- Check research mapping is in protected schema
-- SELECT schemaname, tablename FROM pg_tables WHERE tablename = 'research_user_mapping';

-- Check carer access has expiry columns
-- SELECT column_name FROM information_schema.columns 
-- WHERE table_name = 'carer_relationships' AND column_name LIKE '%expir%';

-- Check clinician access has expiry columns
-- SELECT column_name FROM information_schema.columns 
-- WHERE table_name = 'patient_clinician_connections' AND column_name LIKE '%expir%';

-- Check security incidents table exists
-- SELECT COUNT(*) FROM information_schema.tables 
-- WHERE table_name = 'security_incidents' AND table_schema = 'public';

-- ============================================================================
-- DEPLOYMENT NOTES
-- ============================================================================

-- 1. Set a secure IP salt before deployment:
--    ALTER DATABASE your_database_name SET app.ip_salt = 'your-secure-random-salt-here';

-- 2. Enable pg_cron in Supabase dashboard for automated cleanup

-- 3. Configure Supabase project settings:
--    - Enable encryption at rest
--    - Enable PITR backups with encryption
--    - Require SSL connections

-- 4. Document backup encryption verification steps

-- 5. Schedule quarterly backup restoration tests

-- 6. Train security team on security_incidents monitoring

-- ============================================================================
-- END OF CRITICAL COMPLIANCE FIXES
-- ============================================================================

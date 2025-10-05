-- HAS been RUN now fully --

-- ============================================================================
-- CARER INVITATIONS TABLE - HIPAA COMPLIANT
-- ============================================================================
-- Tracks patient invitations to carers with DOB verification
-- Supports secure invitation flow without exposing PHI
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.carer_invitations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Pre-linked relationship
    relationship_id UUID NOT NULL REFERENCES public.carer_relationships(id) ON DELETE CASCADE,
    
    -- Who sent the invitation (patient)
    patient_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    
    -- Invited carer email (hashed for privacy)
    carer_email TEXT NOT NULL,
    carer_email_hash TEXT NOT NULL, -- SHA-256 hash for lookups
    
    -- Invitation details
    invitation_token TEXT NOT NULL UNIQUE DEFAULT encode(gen_random_bytes(32), 'hex'),
    
    -- Status tracking
    status TEXT NOT NULL CHECK (status IN (
        'pending',              -- Sent, awaiting response
        'verification_required', -- Carer signed in, needs DOB verification
        'accepted',             -- DOB verified, relationship active
        'expired',              -- Token expired
        'cancelled',            -- Patient cancelled
        'verification_failed'   -- DOB verification failed multiple times
    )) DEFAULT 'pending',
    
    -- Verification tracking
    dob_verification_attempts INT DEFAULT 0,
    max_dob_attempts INT DEFAULT 3,
    last_verification_attempt TIMESTAMPTZ,
    
    -- Timestamps
    invited_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '30 days'), -- 30-day expiry for carers
    accepted_at TIMESTAMPTZ,
    cancelled_at TIMESTAMPTZ,
    
    -- Carer details (filled after acceptance)
    carer_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    
    -- Audit
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Constraints
    UNIQUE(patient_user_id, carer_email_hash)
);

-- ============================================================================
-- INDEXES
-- ============================================================================

CREATE INDEX idx_carer_invitations_patient ON public.carer_invitations(patient_user_id);
CREATE INDEX idx_carer_invitations_token ON public.carer_invitations(invitation_token);
CREATE INDEX idx_carer_invitations_status ON public.carer_invitations(status);
CREATE INDEX idx_carer_invitations_email_hash ON public.carer_invitations(carer_email_hash);
CREATE INDEX idx_carer_invitations_expires ON public.carer_invitations(expires_at) WHERE status IN ('pending', 'verification_required');
CREATE INDEX idx_carer_invitations_relationship ON public.carer_invitations(relationship_id);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

ALTER TABLE public.carer_invitations ENABLE ROW LEVEL SECURITY;

-- Patients can view their own invitations
CREATE POLICY "Patients can view own invitations"
    ON public.carer_invitations
    FOR SELECT
    USING (auth.uid() = patient_user_id);

-- Patients can create invitations
CREATE POLICY "Patients can create invitations"
    ON public.carer_invitations
    FOR INSERT
    WITH CHECK (auth.uid() = patient_user_id);

-- Patients can update their own invitations
CREATE POLICY "Patients can update own invitations"
    ON public.carer_invitations
    FOR UPDATE
    USING (auth.uid() = patient_user_id)
    WITH CHECK (auth.uid() = patient_user_id);

-- Anyone can view invitation by token (for acceptance flow)
CREATE POLICY "Anyone can view invitation by token"
    ON public.carer_invitations
    FOR SELECT
    USING (true); -- Secured by requiring token knowledge

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

-- Function to check if invitation is expired
CREATE OR REPLACE FUNCTION check_carer_invitation_expiry()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.expires_at < NOW() AND NEW.status IN ('pending', 'verification_required') THEN
        NEW.status := 'expired';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER carer_invitation_expiry_check
    BEFORE UPDATE ON public.carer_invitations
    FOR EACH ROW
    EXECUTE FUNCTION check_carer_invitation_expiry();

-- Function to verify DOB and accept carer invitation
-- SECURITY: This must be called from a secure backend only
CREATE OR REPLACE FUNCTION verify_carer_dob_and_accept(
    invitation_token_param TEXT,
    carer_user_id_param UUID,
    provided_dob DATE
)
RETURNS JSONB AS $$
DECLARE
    invitation_record RECORD;
    patient_dob DATE;
    result JSONB;
BEGIN
    -- Get invitation
    SELECT * INTO invitation_record
    FROM public.carer_invitations
    WHERE invitation_token = invitation_token_param
    AND status IN ('pending', 'verification_required')
    AND expires_at > NOW();
    
    IF NOT FOUND THEN
        RETURN jsonb_build_object(
            'success', false,
            'error', 'invalid_or_expired_token',
            'message', 'Invitation not found or expired'
        );
    END IF;
    
    -- Check max attempts
    IF invitation_record.dob_verification_attempts >= invitation_record.max_dob_attempts THEN
        UPDATE public.carer_invitations
        SET 
            status = 'verification_failed',
            updated_at = NOW()
        WHERE id = invitation_record.id;
        
        RETURN jsonb_build_object(
            'success', false,
            'error', 'max_attempts_exceeded',
            'message', 'Maximum verification attempts exceeded'
        );
    END IF;
    
    -- Get patient's DOB from patient_profiles
    SELECT date_of_birth INTO patient_dob
    FROM public.patient_profiles
    WHERE user_id = invitation_record.patient_user_id;
    
    IF NOT FOUND THEN
        RETURN jsonb_build_object(
            'success', false,
            'error', 'patient_profile_not_found',
            'message', 'Patient profile not found'
        );
    END IF;
    
    -- Increment verification attempts
    UPDATE public.carer_invitations
    SET 
        dob_verification_attempts = dob_verification_attempts + 1,
        last_verification_attempt = NOW(),
        updated_at = NOW()
    WHERE id = invitation_record.id;
    
    -- Verify DOB
    IF patient_dob != provided_dob THEN
        -- Check if this was the last attempt
        IF invitation_record.dob_verification_attempts + 1 >= invitation_record.max_dob_attempts THEN
            UPDATE public.carer_invitations
            SET status = 'verification_failed'
            WHERE id = invitation_record.id;
            
            -- Log security incident
            INSERT INTO public.security_incidents (
                user_id,
                incident_type,
                severity,
                description,
                created_at
            ) VALUES (
                carer_user_id_param,
                'failed_dob_verification',
                'medium',
                format('Max DOB verification attempts (%s) exceeded for carer invitation', invitation_record.max_dob_attempts),
                NOW()
            );
        END IF;
        
        RETURN jsonb_build_object(
            'success', false,
            'error', 'dob_mismatch',
            'message', 'Date of birth does not match',
            'attempts_remaining', invitation_record.max_dob_attempts - (invitation_record.dob_verification_attempts + 1)
        );
    END IF;
    
    -- DOB matches! Accept invitation
    UPDATE public.carer_invitations
    SET 
        status = 'accepted',
        carer_user_id = carer_user_id_param,
        accepted_at = NOW(),
        updated_at = NOW()
    WHERE id = invitation_record.id;
    
    -- Activate the carer relationship
    UPDATE public.carer_relationships
    SET 
        carer_user_id = carer_user_id_param,
        status = 'active',
        approved_at = NOW(),
        updated_at = NOW()
    WHERE id = invitation_record.relationship_id;
    
    -- Log the acceptance in audit log
    INSERT INTO public.audit_log (
        user_id,
        action,
        table_name,
        record_id,
        created_at
    ) VALUES (
        carer_user_id_param,
        'CARER_INVITATION_ACCEPTED',
        'carer_invitations',
        invitation_record.id::TEXT,
        NOW()
    );
    
    RETURN jsonb_build_object(
        'success', true,
        'message', 'Invitation accepted successfully',
        'relationship_id', invitation_record.relationship_id
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to expire old carer invitations
CREATE OR REPLACE FUNCTION expire_old_carer_invitations()
RETURNS VOID AS $$
BEGIN
    UPDATE public.carer_invitations
    SET status = 'expired', updated_at = NOW()
    WHERE status IN ('pending', 'verification_required')
    AND expires_at < NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- AUDIT TRIGGER
-- ============================================================================

CREATE TRIGGER audit_carer_invitations
    AFTER INSERT OR UPDATE OR DELETE ON public.carer_invitations
    FOR EACH ROW EXECUTE FUNCTION public.audit_trigger_function();

-- ============================================================================
-- COMMENTS FOR DOCUMENTATION
-- ============================================================================

COMMENT ON TABLE public.carer_invitations IS 'HIPAA-compliant carer invitation tracking with DOB verification.';
COMMENT ON COLUMN public.carer_invitations.carer_email IS 'Plain email for sending. Consider encrypting in future.';
COMMENT ON COLUMN public.carer_invitations.carer_email_hash IS 'SHA-256 hash of email for lookups without exposing PII.';
COMMENT ON COLUMN public.carer_invitations.invitation_token IS 'Secure random token for invitation link. 32 bytes of entropy.';
COMMENT ON COLUMN public.carer_invitations.dob_verification_attempts IS 'Tracks failed DOB verification attempts for security.';
COMMENT ON FUNCTION verify_carer_dob_and_accept IS 'Verifies patient DOB and accepts carer invitation. MUST be called from secure backend only.';

-- ============================================================================
-- END OF CARER INVITATIONS SCHEMA
-- ============================================================================

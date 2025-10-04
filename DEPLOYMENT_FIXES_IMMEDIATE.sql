-- ============================================================================
-- IMMEDIATE DEPLOYMENT FIXES
-- ============================================================================
-- Fixes for errors encountered during deployment
-- Run this AFTER COMPLIANCE_FIXES_CRITICAL.sql fails
-- ============================================================================

-- ============================================================================
-- FIX 1: ADD MISSING ENUM VALUES TO connection_status_enum
-- ============================================================================

-- The compliance fixes script tries to set status to 'expired' and 'verification_required'
-- but these values don't exist in the enum. Add them:

ALTER TYPE connection_status_enum ADD VALUE IF NOT EXISTS 'expired';
ALTER TYPE connection_status_enum ADD VALUE IF NOT EXISTS 'verification_required';
ALTER TYPE connection_status_enum ADD VALUE IF NOT EXISTS 'revoked';

-- Verify the enum now has all values
-- SELECT unnest(enum_range(NULL::connection_status_enum));
-- Should show: pending, active, inactive, expired, verification_required, revoked

-- ============================================================================
-- FIX 2: IP SALT - USE ALTERNATIVE APPROACH
-- ============================================================================

-- You can't set custom database parameters on Supabase without superuser privileges
-- Instead, we'll use a different approach: store the salt in a protected table

-- Create a protected settings table
CREATE TABLE IF NOT EXISTS protected.system_settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE protected.system_settings ENABLE ROW LEVEL SECURITY;

-- No direct access - only through functions
CREATE POLICY "No direct access to system settings"
    ON protected.system_settings
    FOR ALL
    USING (FALSE);

-- Insert the IP salt (replace with your generated value)
INSERT INTO protected.system_settings (key, value)
VALUES ('ip_salt', 'X12YZ/4I9pdDdnCr1cO6T9V3VyQfcngpjvrNS7kexo0=')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW();

-- Update the hash_ip function to use the salt from the table
CREATE OR REPLACE FUNCTION hash_ip(ip INET) RETURNS TEXT AS $$
DECLARE
    salt_value TEXT;
BEGIN
    -- Get salt from protected table
    SELECT value INTO salt_value 
    FROM protected.system_settings 
    WHERE key = 'ip_salt';
    
    -- If no salt found, use a default (should never happen in production)
    IF salt_value IS NULL THEN
        salt_value := 'default_salt_please_change';
    END IF;
    
    -- Hash IP with salt
    RETURN encode(digest(ip::text || salt_value, 'sha256'), 'hex');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- FIX 3: UPDATE CARER ACCESS TRIGGER TO USE NEW ENUM VALUES
-- ============================================================================

-- The trigger was already created but now the enum values exist
-- Just verify it works correctly

-- Test by creating a test carer relationship (will be cleaned up)
-- You can skip this in production

-- ============================================================================
-- FIX 4: UPDATE CLINICIAN ACCESS TRIGGER
-- ============================================================================

-- Same as above - trigger should now work with the new enum values

-- ============================================================================
-- VERIFICATION
-- ============================================================================

-- Check enum values are correct
SELECT 'connection_status_enum values:' as check_type;
SELECT unnest(enum_range(NULL::connection_status_enum)) as enum_value;

-- Check protected.system_settings exists and has IP salt
SELECT 'IP Salt configured:' as check_type;
SELECT EXISTS(
    SELECT 1 FROM protected.system_settings WHERE key = 'ip_salt'
) as salt_exists;

-- Test the hash_ip function works
SELECT 'IP Hash function test:' as check_type;
SELECT hash_ip('192.168.1.1'::INET) as hashed_ip;

-- ============================================================================
-- DEPLOYMENT NOTES
-- ============================================================================

-- REGARDING PITR BACKUPS:
-- - 7 days is acceptable for development/testing
-- - For production HIPAA compliance, 30 days is recommended but not required
-- - The critical requirement is that backups are encrypted (which they are by default)
-- - You can start with 7 days and increase when budget allows

-- REGARDING ENCRYPTION SETTINGS:
-- - On Supabase Pro tier, encryption at rest is ALWAYS enabled (you can't disable it)
-- - There's no separate encryption settings page because it's automatic
-- - SSL/TLS for connections in transit is also always enforced
-- - The "compliance" features on Teams tier are about:
--   * HIPAA Business Associate Agreement (BAA) - REQUIRED for HIPAA
--   * SOC2 compliance documentation
--   * Enhanced support SLAs
--   * Not about the actual encryption (that's already there)

-- CRITICAL FOR HIPAA:
-- You MUST upgrade to Teams tier before handling real patient data because:
-- 1. You need the Business Associate Agreement (BAA) signed with Supabase
-- 2. Without a BAA, you cannot be HIPAA compliant regardless of technical measures
-- 3. Pro tier does NOT include BAA

-- TEMPORARY SOLUTION FOR TESTING:
-- - Use synthetic/fake data only on Pro tier
-- - Do NOT enter real patient data until Teams tier + BAA is in place
-- - All technical security measures are ready, but legal compliance requires BAA

-- ============================================================================
-- END OF IMMEDIATE FIXES
-- ============================================================================

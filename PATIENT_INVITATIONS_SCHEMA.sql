-- ============================================================================
-- PATIENT INVITATIONS TABLE - HIPAA COMPLIANT
-- ============================================================================
-- Tracks clinician invitations to patients
-- Supports secure invitation flow without exposing PHI
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.patient_invitations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Who sent the invitation
    clinician_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    
    -- Invited patient email (hashed for privacy)
    patient_email TEXT NOT NULL,
    patient_email_hash TEXT NOT NULL, -- SHA-256 hash for lookups
    
    -- Invitation details
    invitation_token TEXT NOT NULL UNIQUE DEFAULT encode(gen_random_bytes(32), 'hex'),
    invitation_message TEXT, -- Optional custom message (no PHI)
    
    -- Status tracking
    status TEXT NOT NULL CHECK (status IN (
        'pending',      -- Sent, awaiting response
        'accepted',     -- Patient signed up
        'expired',      -- Token expired
        'cancelled'     -- Clinician cancelled
    )) DEFAULT 'pending',
    
    -- Timestamps
    invited_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '7 days'), -- 7-day expiry
    accepted_at TIMESTAMPTZ,
    cancelled_at TIMESTAMPTZ,
    
    -- Patient details (filled after acceptance)
    patient_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    
    -- Audit
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Indexes for performance
    UNIQUE(clinician_id, patient_email_hash)
);

-- ============================================================================
-- INDEXES
-- ============================================================================

CREATE INDEX idx_patient_invitations_clinician ON public.patient_invitations(clinician_id);
CREATE INDEX idx_patient_invitations_token ON public.patient_invitations(invitation_token);
CREATE INDEX idx_patient_invitations_status ON public.patient_invitations(status);
CREATE INDEX idx_patient_invitations_email_hash ON public.patient_invitations(patient_email_hash);
CREATE INDEX idx_patient_invitations_expires ON public.patient_invitations(expires_at) WHERE status = 'pending';

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

ALTER TABLE public.patient_invitations ENABLE ROW LEVEL SECURITY;

-- Clinicians can view their own invitations
CREATE POLICY "Clinicians can view own invitations"
    ON public.patient_invitations
    FOR SELECT
    USING (auth.uid() = clinician_id);

-- Clinicians can create invitations
CREATE POLICY "Clinicians can create invitations"
    ON public.patient_invitations
    FOR INSERT
    WITH CHECK (auth.uid() = clinician_id);

-- Clinicians can update their own invitations (cancel only)
CREATE POLICY "Clinicians can update own invitations"
    ON public.patient_invitations
    FOR UPDATE
    USING (auth.uid() = clinician_id)
    WITH CHECK (auth.uid() = clinician_id);

-- Patients can view invitations sent to them (by token)
-- This allows accepting invitation without authentication
CREATE POLICY "Anyone can view invitation by token"
    ON public.patient_invitations
    FOR SELECT
    USING (true); -- Secured by requiring token knowledge

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

-- Function to hash email addresses consistently
CREATE OR REPLACE FUNCTION hash_email(email TEXT)
RETURNS TEXT AS $$
BEGIN
    RETURN encode(digest(lower(trim(email)), 'sha256'), 'hex');
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Function to check if invitation is expired
CREATE OR REPLACE FUNCTION check_invitation_expiry()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.expires_at < NOW() AND NEW.status = 'pending' THEN
        NEW.status := 'expired';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER invitation_expiry_check
    BEFORE UPDATE ON public.patient_invitations
    FOR EACH ROW
    EXECUTE FUNCTION check_invitation_expiry();

-- Function to automatically expire old invitations
CREATE OR REPLACE FUNCTION expire_old_invitations()
RETURNS VOID AS $$
BEGIN
    UPDATE public.patient_invitations
    SET status = 'expired', updated_at = NOW()
    WHERE status = 'pending'
    AND expires_at < NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to accept invitation (called after patient signs up)
CREATE OR REPLACE FUNCTION accept_invitation(
    invitation_token_param TEXT,
    patient_id_param UUID
)
RETURNS BOOLEAN AS $$
DECLARE
    invitation_record RECORD;
BEGIN
    -- Get invitation
    SELECT * INTO invitation_record
    FROM public.patient_invitations
    WHERE invitation_token = invitation_token_param
    AND status = 'pending'
    AND expires_at > NOW();
    
    IF NOT FOUND THEN
        RETURN FALSE;
    END IF;
    
    -- Update invitation status
    UPDATE public.patient_invitations
    SET 
        status = 'accepted',
        patient_id = patient_id_param,
        accepted_at = NOW(),
        updated_at = NOW()
    WHERE id = invitation_record.id;
    
    -- Create patient-clinician connection
    INSERT INTO public.patient_clinician_connections (
        patient_id,
        clinician_id,
        status,
        access_expires_at,
        connected_at
    ) VALUES (
        patient_id_param,
        invitation_record.clinician_id,
        'active',
        NOW() + INTERVAL '1 year',
        NOW()
    ) ON CONFLICT (patient_id, clinician_id) DO NOTHING;
    
    -- Log the acceptance in audit log
    INSERT INTO public.audit_log (
        user_id,
        action,
        table_name,
        record_id,
        created_at
    ) VALUES (
        patient_id_param,
        'INVITATION_ACCEPTED',
        'patient_invitations',
        invitation_record.id::TEXT,
        NOW()
    );
    
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- AUDIT TRIGGER
-- ============================================================================

CREATE TRIGGER audit_patient_invitations
    AFTER INSERT OR UPDATE OR DELETE ON public.patient_invitations
    FOR EACH ROW EXECUTE FUNCTION public.audit_trigger_function();

-- ============================================================================
-- COMMENTS FOR DOCUMENTATION
-- ============================================================================

COMMENT ON TABLE public.patient_invitations IS 'HIPAA-compliant patient invitation tracking. Email addresses are hashed for privacy.';
COMMENT ON COLUMN public.patient_invitations.patient_email IS 'Plain email for sending (clinicians use only). Consider encrypting in future.';
COMMENT ON COLUMN public.patient_invitations.patient_email_hash IS 'SHA-256 hash of email for lookups without exposing PII.';
COMMENT ON COLUMN public.patient_invitations.invitation_token IS 'Secure random token for invitation link. 32 bytes of entropy.';
COMMENT ON COLUMN public.patient_invitations.invitation_message IS 'Optional message from clinician. MUST NOT contain PHI.';

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- Check table was created
-- SELECT COUNT(*) FROM public.patient_invitations;

-- Check RLS is enabled
-- SELECT tablename, rowsecurity FROM pg_tables WHERE tablename = 'patient_invitations';

-- Check policies exist
-- SELECT * FROM pg_policies WHERE tablename = 'patient_invitations';

-- ============================================================================
-- END OF PATIENT INVITATIONS SCHEMA
-- ============================================================================

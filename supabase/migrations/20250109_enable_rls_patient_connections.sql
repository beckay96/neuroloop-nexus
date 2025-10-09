-- ============================================================================
-- ENABLE RLS FOR PATIENT-CLINICIAN CONNECTIONS
-- ============================================================================
-- Fix permission denied errors for clinician dashboard
-- ============================================================================

-- Enable RLS on patient_clinician_connections
ALTER TABLE public.patient_clinician_connections ENABLE ROW LEVEL SECURITY;

-- Enable RLS on patient_invitations
ALTER TABLE public.patient_invitations ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- RLS POLICIES FOR patient_clinician_connections
-- ============================================================================

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Clinicians can view their connections" ON public.patient_clinician_connections;
DROP POLICY IF EXISTS "Patients can view their connections" ON public.patient_clinician_connections;
DROP POLICY IF EXISTS "Clinicians can create connections" ON public.patient_clinician_connections;
DROP POLICY IF EXISTS "Clinicians can update their connections" ON public.patient_clinician_connections;
DROP POLICY IF EXISTS "Patients can update their connections" ON public.patient_clinician_connections;

-- Clinicians can view their own connections
CREATE POLICY "Clinicians can view their connections"
ON public.patient_clinician_connections
FOR SELECT
TO authenticated
USING (clinician_id = auth.uid());

-- Patients can view their own connections
CREATE POLICY "Patients can view their connections"
ON public.patient_clinician_connections
FOR SELECT
TO authenticated
USING (patient_id = auth.uid());

-- Clinicians can create connections (invitations)
CREATE POLICY "Clinicians can create connections"
ON public.patient_clinician_connections
FOR INSERT
TO authenticated
WITH CHECK (clinician_id = auth.uid());

-- Clinicians can update their own connections
CREATE POLICY "Clinicians can update their connections"
ON public.patient_clinician_connections
FOR UPDATE
TO authenticated
USING (clinician_id = auth.uid())
WITH CHECK (clinician_id = auth.uid());

-- Patients can update their own connections (accept/reject)
CREATE POLICY "Patients can update their connections"
ON public.patient_clinician_connections
FOR UPDATE
TO authenticated
USING (patient_id = auth.uid())
WITH CHECK (patient_id = auth.uid());

-- ============================================================================
-- RLS POLICIES FOR patient_invitations
-- ============================================================================

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Clinicians can view their invitations" ON public.patient_invitations;
DROP POLICY IF EXISTS "Patients can view invitations sent to them" ON public.patient_invitations;
DROP POLICY IF EXISTS "Clinicians can create invitations" ON public.patient_invitations;
DROP POLICY IF EXISTS "Clinicians can update their invitations" ON public.patient_invitations;
DROP POLICY IF EXISTS "Patients can update invitations sent to them" ON public.patient_invitations;

-- Clinicians can view their own invitations
CREATE POLICY "Clinicians can view their invitations"
ON public.patient_invitations
FOR SELECT
TO authenticated
USING (clinician_id = auth.uid());

-- Patients can view invitations sent to them (by email)
CREATE POLICY "Patients can view invitations sent to them"
ON public.patient_invitations
FOR SELECT
TO authenticated
USING (
  patient_email = (SELECT email FROM auth.users WHERE id = auth.uid())
  OR patient_id = auth.uid()
);

-- Clinicians can create invitations
CREATE POLICY "Clinicians can create invitations"
ON public.patient_invitations
FOR INSERT
TO authenticated
WITH CHECK (clinician_id = auth.uid());

-- Clinicians can update their own invitations
CREATE POLICY "Clinicians can update their invitations"
ON public.patient_invitations
FOR UPDATE
TO authenticated
USING (clinician_id = auth.uid())
WITH CHECK (clinician_id = auth.uid());

-- Patients can update invitations sent to them (accept/reject)
CREATE POLICY "Patients can update invitations sent to them"
ON public.patient_invitations
FOR UPDATE
TO authenticated
USING (
  patient_email = (SELECT email FROM auth.users WHERE id = auth.uid())
  OR patient_id = auth.uid()
)
WITH CHECK (
  patient_email = (SELECT email FROM auth.users WHERE id = auth.uid())
  OR patient_id = auth.uid()
);

-- Add helpful comments
COMMENT ON POLICY "Clinicians can view their connections" ON public.patient_clinician_connections IS 'Allows clinicians to see all patients they are connected to';
COMMENT ON POLICY "Patients can view their connections" ON public.patient_clinician_connections IS 'Allows patients to see all clinicians they are connected to';
COMMENT ON POLICY "Clinicians can view their invitations" ON public.patient_invitations IS 'Allows clinicians to see all invitations they have sent';
COMMENT ON POLICY "Patients can view invitations sent to them" ON public.patient_invitations IS 'Allows patients to see invitations sent to their email';

-- Reload PostgREST schema cache
NOTIFY pgrst, 'reload schema';

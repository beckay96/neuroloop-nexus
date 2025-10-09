-- ============================================================================
-- ENABLE RLS FOR CLINICIAN_PROFILES
-- ============================================================================
-- Allow clinicians to create and read their own profiles
-- ============================================================================

-- Enable RLS
ALTER TABLE public.clinician_profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Clinicians can insert their own profile" ON public.clinician_profiles;
DROP POLICY IF EXISTS "Clinicians can view their own profile" ON public.clinician_profiles;
DROP POLICY IF EXISTS "Clinicians can update their own profile" ON public.clinician_profiles;

-- Allow clinicians to insert their own profile during onboarding
CREATE POLICY "Clinicians can insert their own profile"
ON public.clinician_profiles
FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

-- Allow clinicians to view their own profile
CREATE POLICY "Clinicians can view their own profile"
ON public.clinician_profiles
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- Allow clinicians to update their own profile
CREATE POLICY "Clinicians can update their own profile"
ON public.clinician_profiles
FOR UPDATE
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Grant table access to authenticated role
GRANT SELECT, INSERT, UPDATE ON public.clinician_profiles TO authenticated;
REVOKE ALL ON public.clinician_profiles FROM anon;

-- Reload PostgREST schema cache
NOTIFY pgrst, 'reload schema';

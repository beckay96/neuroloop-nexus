-- ============================================================================
-- GRANT TABLE ACCESS TO AUTHENTICATED ROLE
-- ============================================================================
-- Sometimes RLS policies aren't enough - need to grant base table access
-- ============================================================================

-- Grant SELECT, INSERT, UPDATE to authenticated role
GRANT SELECT, INSERT, UPDATE ON public.patient_clinician_connections TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.patient_invitations TO authenticated;

-- Revoke from anon (anonymous users shouldn't access these)
REVOKE ALL ON public.patient_clinician_connections FROM anon;
REVOKE ALL ON public.patient_invitations FROM anon;

-- Reload PostgREST schema cache
NOTIFY pgrst, 'reload schema';

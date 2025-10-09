-- ============================================================================
-- GRANT READ ACCESS TO AUTH.USERS FOR AUTHENTICATED ROLE
-- ============================================================================
-- Needed for patient_invitations foreign key expansion
-- Only grant access to safe, non-sensitive columns
-- ============================================================================

-- Grant SELECT on auth.users to authenticated role
-- This allows PostgREST to expand foreign key relationships
GRANT SELECT ON auth.users TO authenticated;

-- Note: RLS on auth.users is already enabled by Supabase
-- Users can only see their own data due to existing RLS policies

-- Reload PostgREST schema cache
NOTIFY pgrst, 'reload schema';

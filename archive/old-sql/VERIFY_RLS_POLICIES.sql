-- ============================================================================
-- VERIFY RLS POLICIES ARE ENABLED
-- ============================================================================
-- Run this to check if RLS is working correctly
-- ============================================================================

-- Check if RLS is enabled on the tables
SELECT 
    schemaname,
    tablename,
    rowsecurity as rls_enabled
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('patient_clinician_connections', 'patient_invitations')
ORDER BY tablename;

-- Check what policies exist
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd as operation,
    qual as using_expression,
    with_check as with_check_expression
FROM pg_policies 
WHERE schemaname = 'public'
AND tablename IN ('patient_clinician_connections', 'patient_invitations')
ORDER BY tablename, policyname;

-- Check if the authenticated role has access
SELECT 
    grantee,
    table_schema,
    table_name,
    privilege_type
FROM information_schema.role_table_grants
WHERE table_schema = 'public'
AND table_name IN ('patient_clinician_connections', 'patient_invitations')
AND grantee IN ('authenticated', 'anon', 'postgres')
ORDER BY table_name, grantee;

-- Test query as if you were a clinician (replace with your actual user ID)
-- This simulates what the query would see
SET LOCAL role TO authenticated;
SET LOCAL request.jwt.claims TO '{"sub": "799576e1-6c60-4f91-9439-6109e4b97401"}';

-- Try to select (this should work if RLS is correct)
SELECT COUNT(*) as connection_count
FROM public.patient_clinician_connections
WHERE clinician_id = '799576e1-6c60-4f91-9439-6109e4b97401';

SELECT COUNT(*) as invitation_count
FROM public.patient_invitations
WHERE clinician_id = '799576e1-6c60-4f91-9439-6109e4b97401';

-- Reset
RESET role;

-- =====================================================
-- DIAGNOSE RLS ISSUES - Check what's actually in the database
-- =====================================================

-- 1. Check if these tables exist and in which schema
SELECT 
    schemaname,
    tablename,
    rowsecurity as rls_enabled
FROM pg_tables 
WHERE tablename IN (
    'seizure_signs_reference',
    'brain_regions_reference', 
    'seizure_triggers_reference',
    'sign_brain_region_mapping',
    'daily_tracking_preferences'
)
ORDER BY schemaname, tablename;

-- 2. Check existing policies on these tables
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual
FROM pg_policies
WHERE tablename IN (
    'seizure_signs_reference',
    'brain_regions_reference',
    'seizure_triggers_reference', 
    'sign_brain_region_mapping',
    'daily_tracking_preferences'
)
ORDER BY schemaname, tablename, policyname;

-- 3. Check if get_patient_onboarding_data function exists
SELECT 
    n.nspname as schema,
    p.proname as function_name,
    pg_get_function_arguments(p.oid) as arguments,
    pg_get_function_result(p.oid) as return_type
FROM pg_proc p
JOIN pg_namespace n ON p.pronamespace = n.oid
WHERE p.proname = 'get_patient_onboarding_data';

-- 4. Check all schemas
SELECT schema_name 
FROM information_schema.schemata 
ORDER BY schema_name;

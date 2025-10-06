-- ============================================================================
-- DIAGNOSTIC CHECK: Find why initialize_new_user is failing
-- ============================================================================
-- Run this in Supabase SQL Editor to see what's missing
-- ============================================================================

-- Check if function exists
SELECT 
    routine_name,
    routine_type,
    data_type as return_type
FROM information_schema.routines
WHERE routine_name = 'initialize_new_user'
AND routine_schema = 'public';

-- Check if user_type_enum exists
SELECT EXISTS (
    SELECT 1 FROM pg_type 
    WHERE typname = 'user_type_enum' 
    AND typnamespace = 'public'::regnamespace
) as user_type_enum_exists;

-- Check if required tables exist
SELECT 
    table_name,
    CASE 
        WHEN table_name IN (
            'profiles',
            'user_points',
            'patient_profiles',
            'clinician_profiles',
            'carer_profiles',
            'researcher_profiles',
            'data_sharing_preferences'
        ) THEN '✅ Required'
        ELSE '⚠️  Optional'
    END as status
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN (
    'profiles',
    'user_points',
    'patient_profiles',
    'clinician_profiles',
    'carer_profiles',
    'researcher_profiles',
    'data_sharing_preferences'
)
ORDER BY status DESC, table_name;

-- Check private_health_info schema tables
SELECT 
    table_name
FROM information_schema.tables
WHERE table_schema = 'private_health_info'
AND table_name IN (
    'patient_phi',
    'clinician_phi'
)
ORDER BY table_name;

-- Check profiles table structure
SELECT 
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns
WHERE table_schema = 'public'
AND table_name = 'profiles'
ORDER BY ordinal_position;

-- Try to call the function with test data (will show actual error)
-- UNCOMMENT and replace with a valid test UUID:
-- SELECT public.initialize_new_user(
--     'a0000000-0000-0000-0000-000000000000'::uuid,
--     'test@example.com',
--     'patient'
-- );

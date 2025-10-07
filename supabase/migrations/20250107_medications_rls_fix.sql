-- Fix public reference tables access - BOTH RLS AND GRANT permissions needed!
-- Issue: Users are authenticated but still getting "permission denied"
-- Root Cause: authenticated role lacks SELECT grant on reference tables

-- Step 1: Grant SELECT permission to PostgreSQL roles on reference tables
GRANT SELECT ON public.medications TO anon;
GRANT SELECT ON public.medications TO authenticated;
GRANT SELECT ON public.medications TO service_role;

GRANT SELECT ON public.conditions TO anon;
GRANT SELECT ON public.conditions TO authenticated;
GRANT SELECT ON public.conditions TO service_role;

-- Step 2: Enable RLS on reference tables
ALTER TABLE public.medications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conditions ENABLE ROW LEVEL SECURITY;

-- Step 3: Drop existing policies
DROP POLICY IF EXISTS "Allow public read access to medications" ON public.medications;
DROP POLICY IF EXISTS "Authenticated users can view medications" ON public.medications;
DROP POLICY IF EXISTS "Medications are publicly readable" ON public.medications;
DROP POLICY IF EXISTS "medications_public_read" ON public.medications;

DROP POLICY IF EXISTS "Allow public read access to conditions" ON public.conditions;
DROP POLICY IF EXISTS "Authenticated users can view conditions" ON public.conditions;
DROP POLICY IF EXISTS "Conditions are publicly readable" ON public.conditions;
DROP POLICY IF EXISTS "conditions_public_read" ON public.conditions;

-- Step 4: Create RLS policies for both anon and authenticated users
CREATE POLICY "medications_readable_by_all"
    ON public.medications
    FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "conditions_readable_by_all"
    ON public.conditions
    FOR SELECT
    TO anon, authenticated
    USING (true);

-- Verify everything is set up correctly with a temp table
CREATE TEMP TABLE verification_results (
    check_name TEXT,
    status TEXT,
    details TEXT
);

-- Check medications RLS policy
INSERT INTO verification_results
SELECT 
    'Medications RLS Policy' as check_name,
    CASE WHEN EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'medications'
        AND policyname = 'medications_readable_by_all'
    ) THEN '✅ SUCCESS' ELSE '❌ FAILED' END as status,
    'Policy allows SELECT for anon and authenticated' as details;

-- Check conditions RLS policy
INSERT INTO verification_results
SELECT 
    'Conditions RLS Policy' as check_name,
    CASE WHEN EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'conditions'
        AND policyname = 'conditions_readable_by_all'
    ) THEN '✅ SUCCESS' ELSE '❌ FAILED' END as status,
    'Policy allows SELECT for anon and authenticated' as details;

-- Check medications grants
INSERT INTO verification_results
SELECT 
    'Medications GRANT Permissions' as check_name,
    CASE WHEN COUNT(*) >= 2 THEN '✅ SUCCESS' ELSE '❌ FAILED' END as status,
    'Granted to: ' || string_agg(grantee, ', ') as details
FROM information_schema.role_table_grants 
WHERE table_name = 'medications' 
AND table_schema = 'public'
AND grantee IN ('anon', 'authenticated')
AND privilege_type = 'SELECT';

-- Check conditions grants
INSERT INTO verification_results
SELECT 
    'Conditions GRANT Permissions' as check_name,
    CASE WHEN COUNT(*) >= 2 THEN '✅ SUCCESS' ELSE '❌ FAILED' END as status,
    'Granted to: ' || string_agg(grantee, ', ') as details
FROM information_schema.role_table_grants 
WHERE table_name = 'conditions' 
AND table_schema = 'public'
AND grantee IN ('anon', 'authenticated')
AND privilege_type = 'SELECT';

-- Display results
SELECT * FROM verification_results;

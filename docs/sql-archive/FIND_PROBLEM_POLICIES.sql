-- ==========================================
-- FIND THE ACTUAL PROBLEM POLICIES
-- ==========================================
-- Let's see what policies the audit is flagging
-- ==========================================

-- 1. Show all INSERT policies that are missing WITH CHECK
SELECT 
    '🔍 INSERT POLICIES WITHOUT WITH CHECK' as finding,
    schemaname,
    tablename,
    policyname,
    cmd,
    qual as using_clause,
    with_check,
    CASE 
        WHEN with_check IS NULL THEN 'NULL - No WITH CHECK at all'
        WHEN with_check = 'true' THEN 'TRUE - Allows anything'
        ELSE 'HAS CHECK: ' || with_check
    END as with_check_status
FROM pg_policies
WHERE schemaname IN ('private_health_info', 'clinical')
AND cmd = 'INSERT'
AND (with_check IS NULL OR with_check = 'true')
AND policyname NOT LIKE '%System%'
AND policyname NOT LIKE '%Service%'
AND policyname NOT LIKE '%Admins%'
ORDER BY schemaname, tablename, policyname;

-- 2. Show all clinician policies missing relationship checks
SELECT 
    '🔍 CLINICIAN POLICIES WITHOUT RELATIONSHIP CHECK' as finding,
    schemaname,
    tablename,
    policyname,
    cmd,
    qual as using_clause
FROM pg_policies
WHERE schemaname IN ('private_health_info', 'clinical')
AND policyname ILIKE '%clinician%'
AND policyname NOT LIKE '%own%'
AND cmd = 'SELECT'
AND qual NOT LIKE '%patient_clinician_connections%'
AND qual NOT LIKE '%can_clinician_see%'
ORDER BY schemaname, tablename, policyname;

-- 3. Check what tables these policies are on
SELECT 
    '🔍 TABLES WITH PROBLEM POLICIES' as finding,
    schemaname,
    tablename,
    COUNT(*) as problem_policy_count,
    array_agg(policyname) as policy_names
FROM pg_policies
WHERE schemaname IN ('private_health_info', 'clinical')
AND (
    (cmd = 'INSERT' AND (with_check IS NULL OR with_check = 'true') 
     AND policyname NOT LIKE '%System%' AND policyname NOT LIKE '%Service%')
    OR
    (policyname ILIKE '%clinician%' AND policyname NOT LIKE '%own%' 
     AND cmd = 'SELECT' AND qual NOT LIKE '%patient_clinician_connections%' 
     AND qual NOT LIKE '%can_clinician_see%')
)
GROUP BY schemaname, tablename
ORDER BY schemaname, tablename;

-- 4. Show the exact column structure of these tables
SELECT 
    '🔍 COLUMN STRUCTURE OF PROBLEM TABLES' as finding,
    table_schema,
    table_name,
    column_name,
    data_type
FROM information_schema.columns
WHERE table_schema IN ('private_health_info', 'clinical')
AND table_name IN (
    SELECT DISTINCT tablename
    FROM pg_policies
    WHERE schemaname IN ('private_health_info', 'clinical')
    AND (
        (cmd = 'INSERT' AND (with_check IS NULL OR with_check = 'true') 
         AND policyname NOT LIKE '%System%' AND policyname NOT LIKE '%Service%')
        OR
        (policyname ILIKE '%clinician%' AND policyname NOT LIKE '%own%' 
         AND cmd = 'SELECT' AND qual NOT LIKE '%patient_clinician_connections%' 
         AND qual NOT LIKE '%can_clinician_see%')
    )
)
AND column_name IN ('id', 'user_id', 'patient_id', 'clinician_id', 'carer_id')
ORDER BY table_schema, table_name, column_name;

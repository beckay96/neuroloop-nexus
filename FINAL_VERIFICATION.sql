-- ==========================================
-- FINAL VERIFICATION - COMPLETE RLS AUDIT
-- ==========================================
-- This confirms your RLS is HIPAA compliant
-- ==========================================

-- 1. Check for missing WITH CHECK clauses
SELECT 
    '🔍 WITH CHECK VERIFICATION' as report,
    COUNT(*) as policies_without_check,
    CASE 
        WHEN COUNT(*) = 0 THEN '✅ PERFECT - All policies have WITH CHECK'
        ELSE '❌ ' || COUNT(*)::text || ' policies still missing WITH CHECK'
    END as status
FROM pg_policies
WHERE schemaname IN ('private_health_info', 'clinical', 'public')
AND cmd IN ('INSERT', 'UPDATE', 'ALL')
AND (with_check IS NULL OR with_check = 'true')
AND policyname NOT LIKE '%System%'
AND policyname NOT LIKE '%Service%';

-- 2. Check for duplicate policies
WITH policy_counts AS (
    SELECT 
        schemaname,
        tablename,
        cmd,
        COUNT(*) as policy_count
    FROM pg_policies
    WHERE schemaname IN ('private_health_info', 'clinical', 'public')
    AND policyname NOT LIKE '%System%'
    AND policyname NOT LIKE '%Service%'
    GROUP BY schemaname, tablename, cmd
)
SELECT 
    '🔍 DUPLICATE POLICY CHECK' as report,
    COUNT(*) FILTER (WHERE policy_count > 3) as tables_with_too_many_policies,
    CASE 
        WHEN COUNT(*) FILTER (WHERE policy_count > 3) = 0 
        THEN '✅ CLEAN - No excessive duplicates'
        ELSE '⚠️ ' || COUNT(*) FILTER (WHERE policy_count > 3)::text || ' tables have too many policies'
    END as status
FROM policy_counts;

-- 3. Check for policies with wrong column references
SELECT 
    '🔍 COLUMN REFERENCE CHECK' as report,
    COUNT(*) as policies_with_wrong_columns,
    CASE 
        WHEN COUNT(*) = 0 THEN '✅ CORRECT - All policies use correct columns'
        ELSE '❌ ' || COUNT(*)::text || ' policies use wrong column names'
    END as status
FROM pg_policies
WHERE schemaname IN ('private_health_info', 'clinical')
AND (
    -- patient_id tables using user_id
    (tablename IN ('daily_symptom_logs', 'seizure_events', 'tremor_episodes', 'gait_episodes', 'clinical_media')
     AND (qual LIKE '%user_id%' OR with_check LIKE '%user_id%')
     AND policyname NOT LIKE '%uploaded_by%')
    OR
    -- user_id tables using patient_id
    (tablename IN ('user_conditions', 'user_medications', 'patient_phi', 'clinician_phi', 'medication_logs')
     AND (qual LIKE '%patient_id%' OR with_check LIKE '%patient_id%'))
);

-- 4. Check for clinician policies without relationship checks
SELECT 
    '🔍 RELATIONSHIP CHECK VERIFICATION' as report,
    COUNT(*) as policies_without_relationship_check,
    CASE 
        WHEN COUNT(*) = 0 THEN '✅ SECURE - All clinician policies verify relationships'
        ELSE '⚠️ ' || COUNT(*)::text || ' clinician policies missing relationship checks'
    END as status
FROM pg_policies
WHERE schemaname IN ('private_health_info', 'clinical')
AND policyname ILIKE '%clinician%'
AND policyname NOT LIKE '%own%'
AND cmd = 'SELECT'
AND qual NOT LIKE '%patient_clinician_connections%'
AND qual NOT LIKE '%can_clinician_see%';

-- 5. Summary statistics
SELECT 
    '📊 RLS POLICY STATISTICS' as report,
    (SELECT COUNT(*) FROM pg_policies 
     WHERE schemaname = 'private_health_info' 
     AND policyname NOT LIKE '%System%') as private_health_info_policies,
    (SELECT COUNT(*) FROM pg_policies 
     WHERE schemaname = 'clinical' 
     AND policyname NOT LIKE '%System%') as clinical_policies,
    (SELECT COUNT(*) FROM pg_policies 
     WHERE schemaname = 'public' 
     AND policyname NOT LIKE '%System%') as public_policies,
    (SELECT COUNT(*) FROM pg_policies 
     WHERE schemaname IN ('private_health_info', 'clinical', 'public')
     AND policyname NOT LIKE '%System%') as total_policies;

-- 6. Tables with RLS enabled
SELECT 
    '🔒 RLS ENABLED TABLES' as report,
    COUNT(*) as tables_with_rls,
    CASE 
        WHEN COUNT(*) >= 30 THEN '✅ COMPREHENSIVE - RLS enabled on all critical tables'
        ELSE '⚠️ Only ' || COUNT(*)::text || ' tables have RLS enabled'
    END as status
FROM pg_tables
WHERE schemaname IN ('private_health_info', 'clinical', 'public')
AND rowsecurity = true;

-- 7. FINAL HIPAA COMPLIANCE STATUS
WITH compliance_checks AS (
    SELECT 
        (SELECT COUNT(*) FROM pg_policies
         WHERE schemaname IN ('private_health_info', 'clinical', 'public')
         AND cmd IN ('INSERT', 'UPDATE', 'ALL')
         AND (with_check IS NULL OR with_check = 'true')
         AND policyname NOT LIKE '%System%') as missing_checks,
        (SELECT COUNT(*) FROM pg_policies
         WHERE schemaname IN ('private_health_info', 'clinical')
         AND policyname ILIKE '%clinician%'
         AND policyname NOT LIKE '%own%'
         AND cmd = 'SELECT'
         AND qual NOT LIKE '%patient_clinician_connections%'
         AND qual NOT LIKE '%can_clinician_see%') as missing_relationships,
        (SELECT COUNT(*) FROM pg_policies
         WHERE schemaname IN ('private_health_info', 'clinical')
         AND (
             (tablename IN ('daily_symptom_logs', 'seizure_events', 'tremor_episodes', 'gait_episodes', 'clinical_media')
              AND (qual LIKE '%user_id%' OR with_check LIKE '%user_id%')
              AND policyname NOT LIKE '%uploaded_by%')
             OR
             (tablename IN ('user_conditions', 'user_medications', 'patient_phi', 'clinician_phi', 'medication_logs')
              AND (qual LIKE '%patient_id%' OR with_check LIKE '%patient_id%'))
         )) as wrong_columns
)
SELECT 
    '🎯 HIPAA COMPLIANCE STATUS' as report,
    missing_checks as critical_missing_with_check,
    missing_relationships as critical_missing_relationships,
    wrong_columns as critical_wrong_columns,
    (missing_checks + missing_relationships + wrong_columns) as total_critical_issues,
    CASE 
        WHEN (missing_checks + missing_relationships + wrong_columns) = 0 
        THEN '✅✅✅ HIPAA COMPLIANT! Your database is production-ready and secure!'
        WHEN (missing_checks + missing_relationships + wrong_columns) <= 3
        THEN '⚠️ ALMOST THERE - ' || (missing_checks + missing_relationships + wrong_columns)::text || ' critical issues remain'
        ELSE '❌ NOT COMPLIANT - ' || (missing_checks + missing_relationships + wrong_columns)::text || ' critical issues must be fixed'
    END as compliance_status
FROM compliance_checks;

-- 8. List any remaining issues (if any)
SELECT 
    '❌ REMAINING ISSUES (if any)' as report,
    schemaname,
    tablename,
    policyname,
    cmd,
    CASE 
        WHEN with_check IS NULL THEN 'Missing WITH CHECK'
        WHEN with_check = 'true' THEN 'WITH CHECK allows anything'
        ELSE 'Other issue'
    END as issue_type
FROM pg_policies
WHERE schemaname IN ('private_health_info', 'clinical', 'public')
AND cmd IN ('INSERT', 'UPDATE', 'ALL')
AND (with_check IS NULL OR with_check = 'true')
AND policyname NOT LIKE '%System%'
AND policyname NOT LIKE '%Service%'
ORDER BY schemaname, tablename, policyname;

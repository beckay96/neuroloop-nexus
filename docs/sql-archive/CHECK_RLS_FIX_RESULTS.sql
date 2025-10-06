-- ==========================================
-- CHECK WHAT HAPPENED IN THE LAST RLS FIX
-- ==========================================
-- Run this to see the detailed results from RLS_COMPLETE_FIX_SAFE.sql
-- ==========================================

-- 1. EXECUTIVE SUMMARY
SELECT 
    'EXECUTIVE SUMMARY' as report_section;

SELECT 
    report_title,
    policies_fixed,
    policies_failed,
    policies_skipped,
    remaining_with_check_issues,
    remaining_relationship_issues,
    CASE 
        WHEN remaining_with_check_issues = 0 AND remaining_relationship_issues = 0 
        THEN '✅ ALL ISSUES RESOLVED - PRODUCTION READY'
        WHEN remaining_with_check_issues + remaining_relationship_issues <= 5
        THEN '⚠️ MOSTLY FIXED - ' || (remaining_with_check_issues + remaining_relationship_issues)::text || ' MINOR ISSUES REMAIN'
        ELSE '❌ NEEDS ATTENTION - ' || (remaining_with_check_issues + remaining_relationship_issues)::text || ' ISSUES REMAIN'
    END as status
FROM rls_fix_summary;

-- 2. WHAT SUCCEEDED
SELECT 
    'SUCCESSFUL CHANGES' as report_section;

SELECT 
    action,
    schema_name || '.' || table_name as table_name,
    policy_name,
    details
FROM rls_changes_log
WHERE status = 'SUCCESS'
ORDER BY schema_name, table_name;

-- 3. WHAT FAILED (MOST IMPORTANT)
SELECT 
    'FAILURES - NEED ATTENTION' as report_section;

SELECT 
    action,
    schema_name || '.' || table_name as table_name,
    policy_name,
    details as error_message
FROM rls_changes_log
WHERE status = 'FAILED'
ORDER BY schema_name, table_name;

-- 4. WHAT WAS SKIPPED
SELECT 
    'SKIPPED POLICIES' as report_section;

SELECT 
    action,
    schema_name || '.' || table_name as table_name,
    policy_name,
    details as reason
FROM rls_changes_log
WHERE status = 'SKIPPED'
ORDER BY schema_name, table_name;

-- 5. SUMMARY BY STATUS
SELECT 
    'SUMMARY BY STATUS' as report_section;

SELECT 
    status,
    COUNT(*) as count,
    ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM rls_changes_log), 1) as percentage
FROM rls_changes_log
GROUP BY status
ORDER BY 
    CASE status
        WHEN 'SUCCESS' THEN 1
        WHEN 'SKIPPED' THEN 2
        WHEN 'FAILED' THEN 3
    END;

-- 6. CHECK IF TEMP TABLES STILL EXIST
SELECT 
    'TEMP TABLES STATUS' as report_section;

SELECT 
    CASE 
        WHEN EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'rls_changes_log' AND schemaname LIKE 'pg_temp%')
        THEN 'rls_changes_log EXISTS'
        ELSE 'rls_changes_log NOT FOUND - You may need to re-run RLS_COMPLETE_FIX_SAFE.sql'
    END as temp_table_status;

SELECT 
    CASE 
        WHEN EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'rls_fix_summary' AND schemaname LIKE 'pg_temp%')
        THEN 'rls_fix_summary EXISTS'
        ELSE 'rls_fix_summary NOT FOUND - You may need to re-run RLS_COMPLETE_FIX_SAFE.sql'
    END as temp_table_status;

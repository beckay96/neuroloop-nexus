-- ==========================================
-- FIND AND FIX THE FINAL 2 POLICIES
-- ==========================================

BEGIN;

-- Show exactly which 2 policies are the problem
SELECT 
    '🔍 THE FINAL 2 CULPRITS' as report,
    schemaname,
    tablename,
    policyname,
    cmd,
    qual as using_clause,
    with_check,
    CASE 
        WHEN with_check IS NULL THEN 'NULL - No WITH CHECK at all'
        WHEN with_check = 'true' THEN 'TRUE - Allows anything'
        ELSE 'Has check: ' || with_check
    END as issue_description
FROM pg_policies
WHERE schemaname IN ('private_health_info', 'clinical', 'public')
AND cmd IN ('INSERT', 'UPDATE', 'ALL')
AND (with_check IS NULL OR with_check = 'true')
AND policyname NOT LIKE '%System%'
AND policyname NOT LIKE '%Service%'
ORDER BY schemaname, tablename, policyname;

-- Fix them by using USING clause as WITH CHECK
DO $$
DECLARE
    v_policy RECORD;
    v_with_check TEXT;
BEGIN
    FOR v_policy IN
        SELECT schemaname, tablename, policyname, cmd, qual
        FROM pg_policies
        WHERE schemaname IN ('private_health_info', 'clinical', 'public')
        AND cmd IN ('INSERT', 'UPDATE', 'ALL')
        AND (with_check IS NULL OR with_check = 'true')
        AND policyname NOT LIKE '%System%'
        AND policyname NOT LIKE '%Service%'
    LOOP
        -- Use the USING clause as the WITH CHECK
        v_with_check := v_policy.qual;
        
        -- Drop and recreate
        EXECUTE format('DROP POLICY IF EXISTS %I ON %I.%I',
            v_policy.policyname, v_policy.schemaname, v_policy.tablename);
        
        EXECUTE format('CREATE POLICY %I ON %I.%I FOR %s USING (%s) WITH CHECK (%s)',
            v_policy.policyname, v_policy.schemaname, v_policy.tablename,
            v_policy.cmd, v_policy.qual, v_with_check);
        
        RAISE NOTICE 'Fixed: %.%.%', v_policy.schemaname, v_policy.tablename, v_policy.policyname;
    END LOOP;
END $$;

COMMIT;

-- Verify
SELECT 
    '✅ VERIFICATION' as report,
    COUNT(*) as remaining_issues,
    CASE 
        WHEN COUNT(*) = 0 THEN 'SUCCESS - All policies now have WITH CHECK'
        ELSE 'FAILED - Still ' || COUNT(*) || ' issues'
    END as status
FROM pg_policies
WHERE schemaname IN ('private_health_info', 'clinical', 'public')
AND cmd IN ('INSERT', 'UPDATE', 'ALL')
AND (with_check IS NULL OR with_check = 'true')
AND policyname NOT LIKE '%System%'
AND policyname NOT LIKE '%Service%';

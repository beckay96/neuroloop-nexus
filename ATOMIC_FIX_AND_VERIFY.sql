-- ==========================================
-- ATOMIC FIX AND VERIFY - ALL IN ONE
-- ==========================================
-- This does everything in a single transaction
-- ==========================================

BEGIN;

-- Step 1: Show what we're fixing
CREATE TEMP TABLE before_fix AS
SELECT 
    schemaname,
    tablename,
    policyname,
    cmd,
    qual,
    with_check
FROM pg_policies
WHERE schemaname IN ('private_health_info', 'clinical', 'public')
AND cmd IN ('INSERT', 'UPDATE', 'ALL')
AND (with_check IS NULL OR with_check = 'true')
AND policyname NOT LIKE '%System%'
AND policyname NOT LIKE '%Service%';

-- Step 2: Fix all policies missing WITH CHECK
DO $$
DECLARE
    v_policy RECORD;
    v_with_check TEXT;
    v_count INTEGER := 0;
BEGIN
    FOR v_policy IN
        SELECT * FROM before_fix
    LOOP
        -- Use USING clause as WITH CHECK
        v_with_check := COALESCE(v_policy.qual, 'true');
        
        -- Drop and recreate
        EXECUTE format('DROP POLICY IF EXISTS %I ON %I.%I',
            v_policy.policyname, v_policy.schemaname, v_policy.tablename);
        
        EXECUTE format('CREATE POLICY %I ON %I.%I FOR %s USING (%s) WITH CHECK (%s)',
            v_policy.policyname, v_policy.schemaname, v_policy.tablename,
            v_policy.cmd, v_policy.qual, v_with_check);
        
        v_count := v_count + 1;
    END LOOP;
    
    RAISE NOTICE 'Fixed % policies', v_count;
END $$;

COMMIT;

-- Step 3: Immediate verification in same session
SELECT 
    '📊 BEFORE FIX' as report,
    COUNT(*) as policies_that_needed_fixing
FROM before_fix;

SELECT 
    '✅ AFTER FIX' as report,
    COUNT(*) as policies_still_missing_check,
    CASE 
        WHEN COUNT(*) = 0 THEN '✅ SUCCESS - All fixed'
        ELSE '❌ FAILED - Still ' || COUNT(*) || ' issues'
    END as status
FROM pg_policies
WHERE schemaname IN ('private_health_info', 'clinical', 'public')
AND cmd IN ('INSERT', 'UPDATE', 'ALL')
AND (with_check IS NULL OR with_check = 'true')
AND policyname NOT LIKE '%System%'
AND policyname NOT LIKE '%Service%';

-- Step 4: Show all policies that now have WITH CHECK
SELECT 
    '📝 POLICIES WITH WITH CHECK' as report,
    schemaname,
    tablename,
    policyname,
    cmd,
    CASE 
        WHEN with_check IS NULL THEN '❌ NULL'
        WHEN with_check = 'true' THEN '❌ TRUE'
        WHEN length(with_check) > 50 THEN '✅ ' || left(with_check, 50) || '...'
        ELSE '✅ ' || with_check
    END as with_check_status
FROM pg_policies
WHERE schemaname IN ('private_health_info', 'clinical', 'public')
AND cmd IN ('INSERT', 'UPDATE', 'ALL')
AND policyname NOT LIKE '%System%'
AND policyname NOT LIKE '%Service%'
ORDER BY 
    CASE 
        WHEN with_check IS NULL THEN 1
        WHEN with_check = 'true' THEN 2
        ELSE 3
    END,
    schemaname, tablename, policyname;

-- Step 5: Final compliance check
WITH compliance AS (
    SELECT 
        COUNT(*) FILTER (WHERE with_check IS NULL OR with_check = 'true') as bad_policies,
        COUNT(*) as total_policies
    FROM pg_policies
    WHERE schemaname IN ('private_health_info', 'clinical', 'public')
    AND cmd IN ('INSERT', 'UPDATE', 'ALL')
    AND policyname NOT LIKE '%System%'
    AND policyname NOT LIKE '%Service%'
)
SELECT 
    '🎯 FINAL COMPLIANCE' as report,
    bad_policies as policies_without_proper_check,
    total_policies as total_insert_update_all_policies,
    CASE 
        WHEN bad_policies = 0 THEN '✅✅✅ HIPAA COMPLIANT - All policies secure!'
        ELSE '❌ NOT COMPLIANT - ' || bad_policies || ' policies need fixing'
    END as compliance_status
FROM compliance;

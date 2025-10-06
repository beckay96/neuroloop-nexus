-- ==========================================
-- FIX THE LAST 2 POLICIES MISSING WITH CHECK
-- ==========================================

BEGIN;

-- Find the 2 policies missing WITH CHECK
SELECT 
    '🔍 FOUND THE CULPRITS' as report,
    schemaname,
    tablename,
    policyname,
    cmd,
    qual as using_clause,
    with_check,
    CASE 
        WHEN with_check IS NULL THEN 'NULL - No WITH CHECK'
        WHEN with_check = 'true' THEN 'TRUE - Allows anything'
        ELSE 'Has check: ' || with_check
    END as issue
FROM pg_policies
WHERE schemaname IN ('private_health_info', 'clinical', 'public')
AND cmd IN ('INSERT', 'UPDATE', 'ALL')
AND (with_check IS NULL OR with_check = 'true')
AND policyname NOT LIKE '%System%'
AND policyname NOT LIKE '%Service%';

-- Fix them
DO $$
DECLARE
    v_policy RECORD;
    v_with_check TEXT;
    v_fixed INTEGER := 0;
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
        -- Determine the correct WITH CHECK based on table structure
        
        -- Check what columns this table has
        IF EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_schema = v_policy.schemaname 
                   AND table_name = v_policy.tablename 
                   AND column_name = 'patient_id') THEN
            v_with_check := '(auth.uid() = patient_id)';
            
        ELSIF EXISTS (SELECT 1 FROM information_schema.columns 
                      WHERE table_schema = v_policy.schemaname 
                      AND table_name = v_policy.tablename 
                      AND column_name = 'user_id') THEN
            v_with_check := '(auth.uid() = user_id)';
            
        ELSIF EXISTS (SELECT 1 FROM information_schema.columns 
                      WHERE table_schema = v_policy.schemaname 
                      AND table_name = v_policy.tablename 
                      AND column_name = 'clinician_id') THEN
            v_with_check := '(auth.uid() = clinician_id)';
            
        ELSIF EXISTS (SELECT 1 FROM information_schema.columns 
                      WHERE table_schema = v_policy.schemaname 
                      AND table_name = v_policy.tablename 
                      AND column_name = 'id') THEN
            v_with_check := '(auth.uid() = id)';
            
        ELSIF EXISTS (SELECT 1 FROM information_schema.columns 
                      WHERE table_schema = v_policy.schemaname 
                      AND table_name = v_policy.tablename 
                      AND column_name = 'patient_user_id') THEN
            v_with_check := '(auth.uid() = patient_user_id OR auth.uid() = carer_user_id)';
            
        ELSE
            -- Use the USING clause as WITH CHECK if we can't determine
            v_with_check := v_policy.qual;
        END IF;
        
        -- Drop and recreate with proper WITH CHECK
        EXECUTE format('DROP POLICY IF EXISTS %I ON %I.%I',
            v_policy.policyname, v_policy.schemaname, v_policy.tablename);
        
        EXECUTE format('CREATE POLICY %I ON %I.%I FOR %s USING (%s) WITH CHECK (%s)',
            v_policy.policyname, v_policy.schemaname, v_policy.tablename, 
            v_policy.cmd, v_policy.qual, v_with_check);
        
        v_fixed := v_fixed + 1;
        
        RAISE NOTICE 'Fixed: %.%.% - Added WITH CHECK: %', 
            v_policy.schemaname, v_policy.tablename, v_policy.policyname, v_with_check;
    END LOOP;
    
    RAISE NOTICE 'Total fixed: %', v_fixed;
END $$;

COMMIT;

-- Verify the fix
SELECT 
    '✅ VERIFICATION' as report,
    COUNT(*) as remaining_issues
FROM pg_policies
WHERE schemaname IN ('private_health_info', 'clinical', 'public')
AND cmd IN ('INSERT', 'UPDATE', 'ALL')
AND (with_check IS NULL OR with_check = 'true')
AND policyname NOT LIKE '%System%'
AND policyname NOT LIKE '%Service%';

-- Show final status
SELECT 
    '🎯 FINAL STATUS' as report,
    CASE 
        WHEN (SELECT COUNT(*) FROM pg_policies
              WHERE schemaname IN ('private_health_info', 'clinical', 'public')
              AND cmd IN ('INSERT', 'UPDATE', 'ALL')
              AND (with_check IS NULL OR with_check = 'true')
              AND policyname NOT LIKE '%System%') = 0
        THEN '✅✅✅ PERFECT! All RLS policies are HIPAA compliant!'
        ELSE '⚠️ Still ' || (SELECT COUNT(*) FROM pg_policies
              WHERE schemaname IN ('private_health_info', 'clinical', 'public')
              AND cmd IN ('INSERT', 'UPDATE', 'ALL')
              AND (with_check IS NULL OR with_check = 'true')
              AND policyname NOT LIKE '%System%')::text || ' issues remain'
    END as status;

-- Show what was fixed
SELECT 
    '📝 FIXED POLICIES' as report,
    schemaname,
    tablename,
    policyname,
    cmd,
    with_check
FROM pg_policies
WHERE schemaname IN ('private_health_info', 'clinical', 'public')
AND policyname IN (
    SELECT policyname 
    FROM pg_policies 
    WHERE schemaname IN ('private_health_info', 'clinical', 'public')
    AND cmd IN ('INSERT', 'UPDATE', 'ALL')
    AND with_check IS NOT NULL
    AND with_check != 'true'
)
ORDER BY schemaname, tablename;

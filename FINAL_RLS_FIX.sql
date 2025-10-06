-- ==========================================
-- FINAL RLS FIX - COMPREHENSIVE
-- ==========================================
-- This fixes ALL remaining RLS issues
-- ==========================================

BEGIN;

CREATE TEMP TABLE fix_log (
    id SERIAL,
    table_name TEXT,
    policy_name TEXT,
    action TEXT,
    status TEXT,
    details TEXT
);

-- Fix any INSERT policies on these 4 specific tables
DO $$
DECLARE
    v_policy RECORD;
BEGIN
    -- Get ALL INSERT policies on the problem tables
    FOR v_policy IN
        SELECT schemaname, tablename, policyname
        FROM pg_policies
        WHERE schemaname = 'private_health_info'
        AND tablename IN ('clinician_phi', 'patient_phi', 'tracking_entries', 'user_conditions')
        AND cmd = 'INSERT'
        AND policyname NOT LIKE '%System%'
        AND policyname NOT LIKE '%Service%'
    LOOP
        BEGIN
            -- Drop and recreate with proper WITH CHECK
            EXECUTE format('DROP POLICY IF EXISTS %I ON %I.%I',
                v_policy.policyname, v_policy.schemaname, v_policy.tablename);
            
            EXECUTE format('CREATE POLICY %I ON %I.%I FOR INSERT WITH CHECK (auth.uid() = user_id)',
                v_policy.policyname, v_policy.schemaname, v_policy.tablename);
            
            INSERT INTO fix_log (table_name, policy_name, action, status, details)
            VALUES (v_policy.schemaname || '.' || v_policy.tablename, v_policy.policyname,
                    'FIX_INSERT', 'SUCCESS', 'Added WITH CHECK (auth.uid() = user_id)');
                    
        EXCEPTION WHEN OTHERS THEN
            INSERT INTO fix_log (table_name, policy_name, action, status, details)
            VALUES (v_policy.schemaname || '.' || v_policy.tablename, v_policy.policyname,
                    'FIX_INSERT', 'FAILED', SQLERRM);
        END;
    END LOOP;
END $$;

COMMIT;

-- Show results
SELECT 
    '✅ FINAL FIX RESULTS' as report,
    table_name,
    policy_name,
    action,
    status,
    details
FROM fix_log
ORDER BY status, table_name;

-- Verify the fix worked
SELECT 
    '🔍 VERIFICATION' as report,
    schemaname,
    tablename,
    policyname,
    CASE 
        WHEN with_check IS NULL THEN '❌ Still NULL'
        WHEN with_check = 'true' THEN '❌ Still TRUE'
        WHEN with_check LIKE '%auth.uid()%' THEN '✅ Has auth.uid() check'
        ELSE '⚠️ Has check but unusual: ' || left(with_check, 50)
    END as verification_status,
    with_check
FROM pg_policies
WHERE schemaname = 'private_health_info'
AND tablename IN ('clinician_phi', 'patient_phi', 'tracking_entries', 'user_conditions')
AND cmd = 'INSERT'
ORDER BY tablename, policyname;

-- Final count
SELECT 
    '📊 SUMMARY' as report,
    COUNT(*) FILTER (WHERE status = 'SUCCESS') as fixed,
    COUNT(*) FILTER (WHERE status = 'FAILED') as failed,
    (
        SELECT COUNT(*)
        FROM pg_policies
        WHERE schemaname IN ('private_health_info', 'clinical')
        AND cmd = 'INSERT'
        AND (with_check IS NULL OR with_check = 'true')
        AND policyname NOT LIKE '%System%'
        AND policyname NOT LIKE '%Service%'
    ) as remaining_issues
FROM fix_log;

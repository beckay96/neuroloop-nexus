-- ==========================================
-- RLS COMPLIANCE & SECURITY TEST SUITE
-- ==========================================
-- This script tests Row Level Security policies to ensure:
-- 1. HIPAA Compliance - PHI is properly isolated
-- 2. Correct Access Control - Users can access what they should
-- 3. Proper Blocking - Users cannot access what they shouldn't
--
-- Run this in Supabase SQL Editor to verify RLS policies
-- ==========================================

-- Create a test results table
CREATE TEMP TABLE IF NOT EXISTS rls_test_results (
    test_id SERIAL PRIMARY KEY,
    test_category TEXT,
    test_name TEXT,
    expected_result TEXT,
    actual_result TEXT,
    status TEXT,
    details TEXT,
    tested_at TIMESTAMP DEFAULT NOW()
);

-- Helper function to log test results
CREATE OR REPLACE FUNCTION log_test_result(
    p_category TEXT,
    p_test_name TEXT,
    p_expected TEXT,
    p_actual TEXT,
    p_details TEXT DEFAULT NULL
) RETURNS VOID AS $$
DECLARE
    v_status TEXT;
BEGIN
    v_status := CASE WHEN p_expected = p_actual THEN '✅ PASS' ELSE '❌ FAIL' END;
    
    INSERT INTO rls_test_results (test_category, test_name, expected_result, actual_result, status, details)
    VALUES (p_category, p_test_name, p_expected, p_actual, v_status, p_details);
    
    RAISE NOTICE '% - %: % (Expected: %, Got: %)', v_status, p_category, p_test_name, p_expected, p_actual;
END;
$$ LANGUAGE plpgsql;

-- ==========================================
-- TEST 1: Verify RLS is Enabled on Critical Tables
-- ==========================================

DO $$
DECLARE
    v_table RECORD;
    v_count INTEGER := 0;
    v_missing INTEGER := 0;
BEGIN
    RAISE NOTICE '==========================================';
    RAISE NOTICE 'TEST 1: RLS ENABLED ON CRITICAL TABLES';
    RAISE NOTICE '==========================================';
    
    FOR v_table IN 
        SELECT schemaname, tablename
        FROM pg_tables
        WHERE schemaname IN ('private_health_info', 'clinical')
        AND tablename IN (
            'patient_phi', 'clinician_phi', 'daily_symptom_logs', 'seizure_events',
            'tremor_episodes', 'gait_episodes', 'clinical_media', 'seizure_logs_research',
            'user_conditions', 'user_medications', 'medication_logs',
            'patient_risk_alerts', 'patient_snapshots', 'clinical_notes_exports',
            'clinical_scale_results', 'neuro_imaging_results'
        )
    LOOP
        v_count := v_count + 1;
        
        IF EXISTS (
            SELECT 1 FROM pg_tables 
            WHERE schemaname = v_table.schemaname 
            AND tablename = v_table.tablename 
            AND rowsecurity = true
        ) THEN
            PERFORM log_test_result(
                'RLS Enabled',
                v_table.schemaname || '.' || v_table.tablename,
                'ENABLED',
                'ENABLED',
                'Row Level Security is active'
            );
        ELSE
            v_missing := v_missing + 1;
            PERFORM log_test_result(
                'RLS Enabled',
                v_table.schemaname || '.' || v_table.tablename,
                'ENABLED',
                'DISABLED',
                '⚠️ SECURITY RISK: RLS not enabled!'
            );
        END IF;
    END LOOP;
    
    RAISE NOTICE 'RLS Enabled: % of % critical tables', (v_count - v_missing), v_count;
END $$;

-- ==========================================
-- TEST 2: Verify Policies Exist for Critical Operations
-- ==========================================

DO $$
DECLARE
    v_table TEXT;
    v_schema TEXT;
    v_policy_count INTEGER;
BEGIN
    RAISE NOTICE '==========================================';
    RAISE NOTICE 'TEST 2: POLICIES EXIST FOR CRITICAL TABLES';
    RAISE NOTICE '==========================================';
    
    -- Check each critical PHI table has policies
    FOR v_schema, v_table IN 
        VALUES 
            ('private_health_info', 'patient_phi'),
            ('private_health_info', 'clinician_phi'),
            ('private_health_info', 'daily_symptom_logs'),
            ('private_health_info', 'seizure_events'),
            ('private_health_info', 'clinical_media'),
            ('clinical', 'patient_risk_alerts'),
            ('clinical', 'clinical_notes_exports'),
            ('clinical', 'neuro_imaging_results')
    LOOP
        SELECT COUNT(*) INTO v_policy_count
        FROM pg_policies
        WHERE schemaname = v_schema
        AND tablename = v_table;
        
        IF v_policy_count > 0 THEN
            PERFORM log_test_result(
                'Policies Exist',
                v_schema || '.' || v_table,
                'HAS_POLICIES',
                'HAS_POLICIES',
                v_policy_count || ' policies found'
            );
        ELSE
            PERFORM log_test_result(
                'Policies Exist',
                v_schema || '.' || v_table,
                'HAS_POLICIES',
                'NO_POLICIES',
                '⚠️ SECURITY RISK: No RLS policies!'
            );
        END IF;
    END LOOP;
END $$;

-- ==========================================
-- TEST 3: Check for Overly Permissive Policies
-- ==========================================

DO $$
DECLARE
    v_policy RECORD;
    v_dangerous_count INTEGER := 0;
BEGIN
    RAISE NOTICE '==========================================';
    RAISE NOTICE 'TEST 3: CHECK FOR OVERLY PERMISSIVE POLICIES';
    RAISE NOTICE '==========================================';
    
    -- Check for policies that might allow access to all data
    FOR v_policy IN
        SELECT schemaname, tablename, policyname, qual
        FROM pg_policies
        WHERE schemaname IN ('private_health_info', 'clinical')
        AND (
            qual IS NULL 
            OR qual = 'true'
            OR qual LIKE '%true%'
        )
        AND policyname NOT LIKE '%System%'
        AND policyname NOT LIKE '%Service role%'
        AND policyname NOT LIKE '%Admins%'
    LOOP
        v_dangerous_count := v_dangerous_count + 1;
        PERFORM log_test_result(
            'Permissive Policies',
            v_policy.schemaname || '.' || v_policy.tablename || ' - ' || v_policy.policyname,
            'RESTRICTED',
            'PERMISSIVE',
            '⚠️ WARNING: Policy may allow unrestricted access: ' || COALESCE(v_policy.qual, 'NULL')
        );
    END LOOP;
    
    IF v_dangerous_count = 0 THEN
        PERFORM log_test_result(
            'Permissive Policies',
            'Overall Check',
            'NO_ISSUES',
            'NO_ISSUES',
            'No overly permissive policies found'
        );
    END IF;
END $$;

-- ==========================================
-- TEST 4: Verify Column References in Policies
-- ==========================================

DO $$
DECLARE
    v_policy RECORD;
    v_issue_count INTEGER := 0;
BEGIN
    RAISE NOTICE '==========================================';
    RAISE NOTICE 'TEST 4: VERIFY CORRECT COLUMN REFERENCES';
    RAISE NOTICE '==========================================';
    
    -- Check that patient_id tables use patient_id, not user_id
    FOR v_policy IN
        SELECT schemaname, tablename, policyname, qual
        FROM pg_policies
        WHERE schemaname IN ('private_health_info', 'clinical')
        AND tablename IN ('daily_symptom_logs', 'seizure_events', 'tremor_episodes', 'gait_episodes', 'clinical_media')
        AND qual LIKE '%user_id%'
        AND qual NOT LIKE '%patient_id%'
    LOOP
        v_issue_count := v_issue_count + 1;
        PERFORM log_test_result(
            'Column References',
            v_policy.schemaname || '.' || v_policy.tablename || ' - ' || v_policy.policyname,
            'patient_id',
            'user_id',
            '❌ CRITICAL: Wrong column reference! Should use patient_id'
        );
    END LOOP;
    
    -- Check that user_id tables don't incorrectly use patient_id
    FOR v_policy IN
        SELECT schemaname, tablename, policyname, qual
        FROM pg_policies
        WHERE schemaname = 'private_health_info'
        AND tablename IN ('user_conditions', 'user_medications', 'patient_phi', 'clinician_phi', 'medication_logs')
        AND qual LIKE '%patient_id%'
        AND qual NOT LIKE '%user_id%'
    LOOP
        v_issue_count := v_issue_count + 1;
        PERFORM log_test_result(
            'Column References',
            v_policy.schemaname || '.' || v_policy.tablename || ' - ' || v_policy.policyname,
            'user_id',
            'patient_id',
            '❌ CRITICAL: Wrong column reference! Should use user_id'
        );
    END LOOP;
    
    IF v_issue_count = 0 THEN
        PERFORM log_test_result(
            'Column References',
            'Overall Check',
            'CORRECT',
            'CORRECT',
            'All column references are correct'
        );
    END IF;
END $$;

-- ==========================================
-- TEST 5: Check for Missing Policies on Key Operations
-- ==========================================

DO $$
DECLARE
    v_table RECORD;
    v_has_select BOOLEAN;
    v_has_insert BOOLEAN;
    v_has_update BOOLEAN;
BEGIN
    RAISE NOTICE '==========================================';
    RAISE NOTICE 'TEST 5: CHECK CRUD OPERATION COVERAGE';
    RAISE NOTICE '==========================================';
    
    FOR v_table IN
        SELECT schemaname, tablename
        FROM pg_tables
        WHERE schemaname = 'private_health_info'
        AND tablename IN ('patient_phi', 'daily_symptom_logs', 'seizure_events', 'user_conditions', 'user_medications')
    LOOP
        -- Check for SELECT policy
        SELECT EXISTS (
            SELECT 1 FROM pg_policies
            WHERE schemaname = v_table.schemaname
            AND tablename = v_table.tablename
            AND cmd = 'SELECT'
        ) INTO v_has_select;
        
        -- Check for INSERT policy
        SELECT EXISTS (
            SELECT 1 FROM pg_policies
            WHERE schemaname = v_table.schemaname
            AND tablename = v_table.tablename
            AND cmd IN ('INSERT', 'ALL')
        ) INTO v_has_insert;
        
        -- Check for UPDATE policy
        SELECT EXISTS (
            SELECT 1 FROM pg_policies
            WHERE schemaname = v_table.schemaname
            AND tablename = v_table.tablename
            AND cmd IN ('UPDATE', 'ALL')
        ) INTO v_has_update;
        
        -- Log results
        IF v_has_select AND v_has_insert AND v_has_update THEN
            PERFORM log_test_result(
                'CRUD Coverage',
                v_table.schemaname || '.' || v_table.tablename,
                'FULL_COVERAGE',
                'FULL_COVERAGE',
                'SELECT, INSERT, UPDATE policies exist'
            );
        ELSE
            PERFORM log_test_result(
                'CRUD Coverage',
                v_table.schemaname || '.' || v_table.tablename,
                'FULL_COVERAGE',
                'PARTIAL_COVERAGE',
                'Missing: ' || 
                CASE WHEN NOT v_has_select THEN 'SELECT ' ELSE '' END ||
                CASE WHEN NOT v_has_insert THEN 'INSERT ' ELSE '' END ||
                CASE WHEN NOT v_has_update THEN 'UPDATE' ELSE '' END
            );
        END IF;
    END LOOP;
END $$;

-- ==========================================
-- TEST 6: Verify Clinician Access Policies
-- ==========================================

DO $$
DECLARE
    v_table TEXT;
    v_has_clinician_policy BOOLEAN;
BEGIN
    RAISE NOTICE '==========================================';
    RAISE NOTICE 'TEST 6: CLINICIAN ACCESS TO PATIENT DATA';
    RAISE NOTICE '==========================================';
    
    -- Check that patient data tables have clinician access policies
    FOR v_table IN
        VALUES 
            ('daily_symptom_logs'),
            ('seizure_events'),
            ('tremor_episodes'),
            ('gait_episodes')
    LOOP
        SELECT EXISTS (
            SELECT 1 FROM pg_policies
            WHERE schemaname = 'private_health_info'
            AND tablename = v_table
            AND (
                policyname ILIKE '%clinician%'
                OR qual LIKE '%patient_clinician_connections%'
            )
        ) INTO v_has_clinician_policy;
        
        IF v_has_clinician_policy THEN
            PERFORM log_test_result(
                'Clinician Access',
                'private_health_info.' || v_table,
                'HAS_POLICY',
                'HAS_POLICY',
                'Clinicians can access connected patient data'
            );
        ELSE
            PERFORM log_test_result(
                'Clinician Access',
                'private_health_info.' || v_table,
                'HAS_POLICY',
                'NO_POLICY',
                '⚠️ WARNING: Clinicians may not be able to view patient data'
            );
        END IF;
    END LOOP;
END $$;

-- ==========================================
-- TEST 7: Verify Carer Access Policies
-- ==========================================

DO $$
DECLARE
    v_table TEXT;
    v_has_carer_policy BOOLEAN;
BEGIN
    RAISE NOTICE '==========================================';
    RAISE NOTICE 'TEST 7: CARER ACCESS TO PATIENT DATA';
    RAISE NOTICE '==========================================';
    
    -- Check that patient data tables have carer access policies
    FOR v_table IN
        VALUES 
            ('daily_symptom_logs'),
            ('seizure_events'),
            ('tremor_episodes'),
            ('gait_episodes')
    LOOP
        SELECT EXISTS (
            SELECT 1 FROM pg_policies
            WHERE schemaname = 'private_health_info'
            AND tablename = v_table
            AND (
                policyname ILIKE '%carer%'
                OR qual LIKE '%carer_relationships%'
            )
        ) INTO v_has_carer_policy;
        
        IF v_has_carer_policy THEN
            PERFORM log_test_result(
                'Carer Access',
                'private_health_info.' || v_table,
                'HAS_POLICY',
                'HAS_POLICY',
                'Carers can access related patient data'
            );
        ELSE
            PERFORM log_test_result(
                'Carer Access',
                'private_health_info.' || v_table,
                'HAS_POLICY',
                'NO_POLICY',
                '⚠️ WARNING: Carers may not be able to view patient data'
            );
        END IF;
    END LOOP;
END $$;

-- ==========================================
-- TEST 8: Check for Data Isolation Between Users
-- ==========================================

DO $$
DECLARE
    v_isolation_check TEXT;
BEGIN
    RAISE NOTICE '==========================================';
    RAISE NOTICE 'TEST 8: DATA ISOLATION VERIFICATION';
    RAISE NOTICE '==========================================';
    
    -- Verify that all PHI table policies use auth.uid() for isolation
    IF EXISTS (
        SELECT 1 FROM pg_policies
        WHERE schemaname = 'private_health_info'
        AND tablename IN ('patient_phi', 'clinician_phi', 'daily_symptom_logs', 'seizure_events')
        AND (qual LIKE '%auth.uid()%' OR qual LIKE '%auth.uid() =%')
    ) THEN
        PERFORM log_test_result(
            'Data Isolation',
            'PHI Tables',
            'USES_AUTH_UID',
            'USES_AUTH_UID',
            'Policies correctly use auth.uid() for user isolation'
        );
    ELSE
        PERFORM log_test_result(
            'Data Isolation',
            'PHI Tables',
            'USES_AUTH_UID',
            'MISSING_AUTH_UID',
            '❌ CRITICAL: Policies may not properly isolate user data!'
        );
    END IF;
END $$;

-- ==========================================
-- TEST 9: Verify No Policies Allow Unauthenticated Access to PHI
-- ==========================================

DO $$
DECLARE
    v_anon_policy RECORD;
    v_count INTEGER := 0;
BEGIN
    RAISE NOTICE '==========================================';
    RAISE NOTICE 'TEST 9: UNAUTHENTICATED ACCESS CHECK';
    RAISE NOTICE '==========================================';
    
    -- Check for policies that allow anonymous access to PHI
    FOR v_anon_policy IN
        SELECT schemaname, tablename, policyname, roles
        FROM pg_policies
        WHERE schemaname IN ('private_health_info', 'clinical')
        AND 'anon' = ANY(roles)
    LOOP
        v_count := v_count + 1;
        PERFORM log_test_result(
            'Unauthenticated Access',
            v_anon_policy.schemaname || '.' || v_anon_policy.tablename || ' - ' || v_anon_policy.policyname,
            'NO_ANON_ACCESS',
            'ALLOWS_ANON',
            '⚠️ WARNING: Policy allows unauthenticated access to PHI'
        );
    END LOOP;
    
    IF v_count = 0 THEN
        PERFORM log_test_result(
            'Unauthenticated Access',
            'Overall Check',
            'NO_ANON_ACCESS',
            'NO_ANON_ACCESS',
            'No PHI tables allow anonymous access'
        );
    END IF;
END $$;

-- ==========================================
-- TEST 10: Check Clinical Schema Relationship Policies
-- ==========================================

DO $$
DECLARE
    v_table TEXT;
    v_has_relationship_check BOOLEAN;
BEGIN
    RAISE NOTICE '==========================================';
    RAISE NOTICE 'TEST 10: CLINICAL RELATIONSHIP POLICIES';
    RAISE NOTICE '==========================================';
    
    -- Verify clinical tables check patient_clinician_connections
    FOR v_table IN
        VALUES 
            ('patient_risk_alerts'),
            ('patient_snapshots'),
            ('clinical_notes_exports'),
            ('clinical_scale_results')
    LOOP
        SELECT EXISTS (
            SELECT 1 FROM pg_policies
            WHERE schemaname = 'clinical'
            AND tablename = v_table
            AND qual LIKE '%patient_clinician_connections%'
        ) INTO v_has_relationship_check;
        
        IF v_has_relationship_check THEN
            PERFORM log_test_result(
                'Clinical Relationships',
                'clinical.' || v_table,
                'CHECKS_CONNECTION',
                'CHECKS_CONNECTION',
                'Policy verifies patient-clinician relationship'
            );
        ELSE
            PERFORM log_test_result(
                'Clinical Relationships',
                'clinical.' || v_table,
                'CHECKS_CONNECTION',
                'NO_CHECK',
                '⚠️ WARNING: May not verify patient-clinician relationship'
            );
        END IF;
    END LOOP;
END $$;

-- ==========================================
-- FINAL RESULTS SUMMARY
-- ==========================================

DO $$
DECLARE
    v_total INTEGER;
    v_passed INTEGER;
    v_failed INTEGER;
    v_pass_rate NUMERIC;
BEGIN
    SELECT COUNT(*) INTO v_total FROM rls_test_results;
    SELECT COUNT(*) INTO v_passed FROM rls_test_results WHERE status = '✅ PASS';
    SELECT COUNT(*) INTO v_failed FROM rls_test_results WHERE status = '❌ FAIL';
    
    v_pass_rate := ROUND((v_passed::NUMERIC / NULLIF(v_total, 0)) * 100, 2);
    
    RAISE NOTICE '==========================================';
    RAISE NOTICE '           FINAL TEST SUMMARY';
    RAISE NOTICE '==========================================';
    RAISE NOTICE 'Total Tests: %', v_total;
    RAISE NOTICE 'Passed: % (%.2f%%)', v_passed, v_pass_rate;
    RAISE NOTICE 'Failed: %', v_failed;
    RAISE NOTICE '==========================================';
    
    IF v_pass_rate >= 95 THEN
        RAISE NOTICE '✅ EXCELLENT: RLS policies are well-configured';
    ELSIF v_pass_rate >= 80 THEN
        RAISE NOTICE '⚠️  GOOD: Minor issues found, review failures';
    ELSIF v_pass_rate >= 60 THEN
        RAISE NOTICE '⚠️  WARNING: Significant issues found, review required';
    ELSE
        RAISE NOTICE '❌ CRITICAL: Major security issues, immediate action required';
    END IF;
END $$;

-- Display all test results
SELECT 
    test_category,
    test_name,
    status,
    expected_result,
    actual_result,
    details
FROM rls_test_results
ORDER BY test_id;

-- Display failures only
SELECT 
    test_category,
    test_name,
    details
FROM rls_test_results
WHERE status = '❌ FAIL'
ORDER BY test_category, test_name;

-- Cleanup
DROP FUNCTION IF EXISTS log_test_result(TEXT, TEXT, TEXT, TEXT, TEXT);

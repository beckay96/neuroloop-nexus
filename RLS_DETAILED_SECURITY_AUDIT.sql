-- ==========================================
-- DETAILED RLS SECURITY AUDIT
-- ==========================================
-- This script performs a deep dive into INSERT policies
-- to verify they have proper WITH CHECK clauses
-- ==========================================

CREATE TEMP TABLE IF NOT EXISTS security_audit_results (
    audit_id SERIAL PRIMARY KEY,
    severity TEXT,
    category TEXT,
    table_name TEXT,
    policy_name TEXT,
    issue TEXT,
    recommendation TEXT,
    tested_at TIMESTAMP DEFAULT NOW()
);

-- ==========================================
-- AUDIT 1: Check INSERT Policies Have WITH CHECK Clauses
-- ==========================================

DO $$
DECLARE
    v_policy RECORD;
    v_issue_count INTEGER := 0;
BEGIN
    RAISE NOTICE '==========================================';
    RAISE NOTICE 'AUDIT 1: INSERT POLICY WITH CHECK VERIFICATION';
    RAISE NOTICE '==========================================';
    
    -- Check all INSERT policies in PHI schemas
    FOR v_policy IN
        SELECT 
            schemaname,
            tablename,
            policyname,
            qual,
            with_check
        FROM pg_policies
        WHERE schemaname IN ('private_health_info', 'clinical')
        AND cmd IN ('INSERT', 'ALL')
        AND policyname NOT LIKE '%System%'
        AND policyname NOT LIKE '%Service%'
        AND policyname NOT LIKE '%Admins%'
    LOOP
        -- Check if WITH CHECK clause exists and is restrictive
        IF v_policy.with_check IS NULL OR v_policy.with_check = 'true' THEN
            v_issue_count := v_issue_count + 1;
            
            INSERT INTO security_audit_results (severity, category, table_name, policy_name, issue, recommendation)
            VALUES (
                '🔴 CRITICAL',
                'Missing WITH CHECK',
                v_policy.schemaname || '.' || v_policy.tablename,
                v_policy.policyname,
                'INSERT policy lacks proper WITH CHECK clause - may allow users to insert data for other users',
                'Add WITH CHECK (auth.uid() = user_id/patient_id/clinician_id) to restrict inserts'
            );
            
            RAISE NOTICE '🔴 CRITICAL: %.% - % has no WITH CHECK clause',
                v_policy.schemaname, v_policy.tablename, v_policy.policyname;
        ELSIF v_policy.with_check LIKE '%auth.uid()%' THEN
            RAISE NOTICE '✅ PASS: %.% - % has proper WITH CHECK',
                v_policy.schemaname, v_policy.tablename, v_policy.policyname;
        ELSE
            INSERT INTO security_audit_results (severity, category, table_name, policy_name, issue, recommendation)
            VALUES (
                '🟡 WARNING',
                'Unusual WITH CHECK',
                v_policy.schemaname || '.' || v_policy.tablename,
                v_policy.policyname,
                'WITH CHECK clause exists but may not use auth.uid(): ' || v_policy.with_check,
                'Review to ensure it properly restricts inserts to authenticated user'
            );
        END IF;
    END LOOP;
    
    RAISE NOTICE 'Found % INSERT policies with missing/inadequate WITH CHECK clauses', v_issue_count;
END $$;


-- ==========================================
-- AUDIT 2: Verify SELECT Policies Use auth.uid()
-- ==========================================

DO $$
DECLARE
    v_policy RECORD;
    v_issue_count INTEGER := 0;
BEGIN
    RAISE NOTICE '==========================================';
    RAISE NOTICE 'AUDIT 2: SELECT POLICY USER ISOLATION';
    RAISE NOTICE '==========================================';
    
    FOR v_policy IN
        SELECT 
            schemaname,
            tablename,
            policyname,
            qual
        FROM pg_policies
        WHERE schemaname IN ('private_health_info', 'clinical')
        AND cmd IN ('SELECT', 'ALL')
        AND policyname LIKE '%own%'
        AND policyname NOT LIKE '%System%'
        AND policyname NOT LIKE '%Admins%'
    LOOP
        IF v_policy.qual NOT LIKE '%auth.uid()%' THEN
            v_issue_count := v_issue_count + 1;
            
            INSERT INTO security_audit_results (severity, category, table_name, policy_name, issue, recommendation)
            VALUES (
                '🔴 CRITICAL',
                'Missing User Isolation',
                v_policy.schemaname || '.' || v_policy.tablename,
                v_policy.policyname,
                'SELECT policy claims to show "own" data but does not use auth.uid()',
                'Add auth.uid() = user_id/patient_id check to USING clause'
            );
            
            RAISE NOTICE '🔴 CRITICAL: %.% - % missing auth.uid() check',
                v_policy.schemaname, v_policy.tablename, v_policy.policyname;
        END IF;
    END LOOP;
    
    RAISE NOTICE 'Found % SELECT policies with missing user isolation', v_issue_count;
END $$;

-- ==========================================
-- AUDIT 3: Check for Duplicate Policies
-- ==========================================

DO $$
DECLARE
    v_dup RECORD;
BEGIN
    RAISE NOTICE '==========================================';
    RAISE NOTICE 'AUDIT 3: DUPLICATE POLICY DETECTION';
    RAISE NOTICE '==========================================';
    
    FOR v_dup IN
        SELECT 
            schemaname,
            tablename,
            cmd,
            COUNT(*) as policy_count,
            array_agg(policyname) as policy_names
        FROM pg_policies
        WHERE schemaname IN ('private_health_info', 'clinical', 'public')
        GROUP BY schemaname, tablename, cmd
        HAVING COUNT(*) > 3
    LOOP
        INSERT INTO security_audit_results (severity, category, table_name, policy_name, issue, recommendation)
        VALUES (
            '🟡 WARNING',
            'Duplicate Policies',
            v_dup.schemaname || '.' || v_dup.tablename,
            v_dup.cmd,
            'Table has ' || v_dup.policy_count || ' policies for ' || v_dup.cmd || ' operation: ' || array_to_string(v_dup.policy_names, ', '),
            'Review and consolidate duplicate policies to simplify maintenance'
        );
        
        RAISE NOTICE '🟡 WARNING: %.% has % % policies',
            v_dup.schemaname, v_dup.tablename, v_dup.policy_count, v_dup.cmd;
    END LOOP;
END $$;


-- ==========================================
-- AUDIT 4: Verify Clinician Access Uses Connection Check
-- ==========================================

DO $$
DECLARE
    v_policy RECORD;
    v_issue_count INTEGER := 0;
BEGIN
    RAISE NOTICE '==========================================';
    RAISE NOTICE 'AUDIT 4: CLINICIAN ACCESS VERIFICATION';
    RAISE NOTICE '==========================================';
    
    FOR v_policy IN
        SELECT 
            schemaname,
            tablename,
            policyname,
            qual
        FROM pg_policies
        WHERE schemaname IN ('private_health_info', 'clinical')
        AND policyname ILIKE '%clinician%'
        AND policyname NOT LIKE '%own%'
        AND cmd = 'SELECT'
    LOOP
        IF v_policy.qual NOT LIKE '%patient_clinician_connections%' 
           AND v_policy.qual NOT LIKE '%can_clinician_see%' THEN
            v_issue_count := v_issue_count + 1;
            
            INSERT INTO security_audit_results (severity, category, table_name, policy_name, issue, recommendation)
            VALUES (
                '🔴 CRITICAL',
                'Missing Relationship Check',
                v_policy.schemaname || '.' || v_policy.tablename,
                v_policy.policyname,
                'Clinician access policy does not verify patient-clinician relationship',
                'Add EXISTS check for patient_clinician_connections or use can_clinician_see_patient_data()'
            );
            
            RAISE NOTICE '🔴 CRITICAL: %.% - % missing relationship check',
                v_policy.schemaname, v_policy.tablename, v_policy.policyname;
        END IF;
    END LOOP;
    
    RAISE NOTICE 'Found % clinician policies without relationship checks', v_issue_count;
END $$;


-- ==========================================
-- AUDIT 5: Verify Carer Access Uses Connection Check
-- ==========================================

DO $$
DECLARE
    v_policy RECORD;
    v_issue_count INTEGER := 0;
BEGIN
    RAISE NOTICE '==========================================';
    RAISE NOTICE 'AUDIT 5: CARER ACCESS VERIFICATION';
    RAISE NOTICE '==========================================';
    
    FOR v_policy IN
        SELECT 
            schemaname,
            tablename,
            policyname,
            qual
        FROM pg_policies
        WHERE schemaname = 'private_health_info'
        AND policyname ILIKE '%carer%'
        AND cmd = 'SELECT'
    LOOP
        IF v_policy.qual NOT LIKE '%carer_relationships%' 
           AND v_policy.qual NOT LIKE '%can_carer_see%' THEN
            v_issue_count := v_issue_count + 1;
            
            INSERT INTO security_audit_results (severity, category, table_name, policy_name, issue, recommendation)
            VALUES (
                '🔴 CRITICAL',
                'Missing Relationship Check',
                v_policy.schemaname || '.' || v_policy.tablename,
                v_policy.policyname,
                'Carer access policy does not verify patient-carer relationship',
                'Add EXISTS check for carer_relationships or use can_carer_see_patient_data()'
            );
            
            RAISE NOTICE '🔴 CRITICAL: %.% - % missing relationship check',
                v_policy.schemaname, v_policy.tablename, v_policy.policyname;
        END IF;
    END LOOP;
    
    RAISE NOTICE 'Found % carer policies without relationship checks', v_issue_count;
END $$;

 
-- ==========================================
-- AUDIT 6: Check for Policies Using Deprecated Patterns
-- ==========================================

DO $$
DECLARE
    v_policy RECORD;
BEGIN
    RAISE NOTICE '==========================================';
    RAISE NOTICE 'AUDIT 6: DEPRECATED PATTERN DETECTION';
    RAISE NOTICE '==========================================';
    
    -- Check for policies using wrong column names
    FOR v_policy IN
        SELECT 
            schemaname,
            tablename,
            policyname,
            qual,
            with_check
        FROM pg_policies
        WHERE schemaname IN ('private_health_info', 'clinical')
    LOOP
        -- Check patient_id tables using user_id
        IF v_policy.tablename IN ('daily_symptom_logs', 'seizure_events', 'tremor_episodes', 'gait_episodes', 'clinical_media')
           AND (v_policy.qual LIKE '%user_id%' OR v_policy.with_check LIKE '%user_id%')
           AND v_policy.policyname NOT LIKE '%uploaded_by%' THEN
            
            INSERT INTO security_audit_results (severity, category, table_name, policy_name, issue, recommendation)
            VALUES (
                '🔴 CRITICAL',
                'Wrong Column Reference',
                v_policy.schemaname || '.' || v_policy.tablename,
                v_policy.policyname,
                'Policy uses user_id but table has patient_id column',
                'Change user_id to patient_id in policy definition'
            );
        END IF;
        
        -- Check user_id tables using patient_id
        IF v_policy.tablename IN ('user_conditions', 'user_medications', 'patient_phi', 'clinician_phi', 'medication_logs')
           AND (v_policy.qual LIKE '%patient_id%' OR v_policy.with_check LIKE '%patient_id%') THEN
            
            INSERT INTO security_audit_results (severity, category, table_name, policy_name, issue, recommendation)
            VALUES (
                '🔴 CRITICAL',
                'Wrong Column Reference',
                v_policy.schemaname || '.' || v_policy.tablename,
                v_policy.policyname,
                'Policy uses patient_id but table has user_id column',
                'Change patient_id to user_id in policy definition'
            );
        END IF;
    END LOOP;
END $$;


-- ==========================================
-- AUDIT 7: Verify Status-Based Access Control
-- ==========================================

DO $$
DECLARE
    v_policy RECORD;
BEGIN
    RAISE NOTICE '==========================================';
    RAISE NOTICE 'AUDIT 7: STATUS-BASED ACCESS CONTROL';
    RAISE NOTICE '==========================================';
    
    -- Check that connection-based policies verify status = 'active'
    FOR v_policy IN
        SELECT 
            schemaname,
            tablename,
            policyname,
            qual
        FROM pg_policies
        WHERE schemaname IN ('private_health_info', 'clinical')
        AND (qual LIKE '%patient_clinician_connections%' OR qual LIKE '%carer_relationships%')
    LOOP
        IF v_policy.qual NOT LIKE '%status%' THEN
            INSERT INTO security_audit_results (severity, category, table_name, policy_name, issue, recommendation)
            VALUES (
                '🟡 WARNING',
                'Missing Status Check',
                v_policy.schemaname || '.' || v_policy.tablename,
                v_policy.policyname,
                'Policy checks relationship but does not verify status = ''active''',
                'Add AND status = ''active'' to relationship check to prevent access from suspended/terminated relationships'
            );
            
            RAISE NOTICE '🟡 WARNING: %.% - % missing status check',
                v_policy.schemaname, v_policy.tablename, v_policy.policyname;
        END IF;
    END LOOP;
END $$;


-- ==========================================
-- FINAL AUDIT SUMMARY
-- ==========================================

DO $$
DECLARE
    v_critical INTEGER;
    v_warning INTEGER;
    v_total INTEGER;
BEGIN
    SELECT COUNT(*) INTO v_critical FROM security_audit_results WHERE severity = '🔴 CRITICAL';
    SELECT COUNT(*) INTO v_warning FROM security_audit_results WHERE severity = '🟡 WARNING';
    SELECT COUNT(*) INTO v_total FROM security_audit_results;
    
    RAISE NOTICE '==========================================';
    RAISE NOTICE '        SECURITY AUDIT SUMMARY';
    RAISE NOTICE '==========================================';
    RAISE NOTICE 'Total Issues Found: %', v_total;
    RAISE NOTICE 'Critical Issues: %', v_critical;
    RAISE NOTICE 'Warnings: %', v_warning;
    RAISE NOTICE '==========================================';
    
    IF v_critical = 0 AND v_warning = 0 THEN
        RAISE NOTICE '✅ EXCELLENT: No security issues found!';
        RAISE NOTICE 'Your RLS policies are HIPAA compliant and properly configured.';
    ELSIF v_critical = 0 THEN
        RAISE NOTICE '✅ GOOD: No critical issues, but % warnings to review', v_warning;
    ELSIF v_critical <= 5 THEN
        RAISE NOTICE '⚠️  ACTION REQUIRED: % critical issues must be fixed', v_critical;
    ELSE
        RAISE NOTICE '🔴 URGENT: % critical security issues require immediate attention', v_critical;
    END IF;
END $$;

-- Display all critical issues
SELECT 
    severity,
    category,
    table_name,
    policy_name,
    issue,
    recommendation
FROM security_audit_results
WHERE severity = '🔴 CRITICAL'
ORDER BY table_name, policy_name;

-- Display all warnings
SELECT 
    severity,
    category,
    table_name,
    policy_name,
    issue,
    recommendation
FROM security_audit_results
WHERE severity = '🟡 WARNING'
ORDER BY table_name, policy_name;

-- Summary by category
SELECT 
    severity,
    category,
    COUNT(*) as issue_count
FROM security_audit_results
GROUP BY severity, category
ORDER BY 
    CASE severity 
        WHEN '🔴 CRITICAL' THEN 1 
        WHEN '🟡 WARNING' THEN 2 
        ELSE 3 
    END,
    category;



---

| severity    | category                   | issue_count |
| ----------- | -------------------------- | ----------- |
| 🔴 CRITICAL | Missing Relationship Check | 11          |
| 🔴 CRITICAL | Missing WITH CHECK         | 29          |
| 🔴 CRITICAL | Wrong Column Reference     | 1           |
| 🟡 WARNING  | Duplicate Policies         | 13          |


-- CHECK TWO AFTER APPLYING THE NEW RLS_CRITICAL_FIXES.SQL --

| severity    | category                   | issue_count |
| ----------- | -------------------------- | ----------- |
| 🔴 CRITICAL | Missing Relationship Check | 11          |
| 🔴 CRITICAL | Missing WITH CHECK         | 29          |
| 🔴 CRITICAL | Wrong Column Reference     | 1           |
| 🟡 WARNING  | Duplicate Policies         | 13          |
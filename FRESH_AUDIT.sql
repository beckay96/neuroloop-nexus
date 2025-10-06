-- ==========================================
-- FRESH RLS AUDIT - CURRENT STATE
-- ==========================================
-- Run this to see the CURRENT security status
-- ==========================================

-- Clear any old temp tables
DROP TABLE IF EXISTS security_audit_results;

CREATE TEMP TABLE security_audit_results (
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
        IF v_policy.with_check IS NULL OR v_policy.with_check = 'true' THEN
            v_issue_count := v_issue_count + 1;
            
            INSERT INTO security_audit_results (severity, category, table_name, policy_name, issue, recommendation)
            VALUES (
                '🔴 CRITICAL',
                'Missing WITH CHECK',
                v_policy.schemaname || '.' || v_policy.tablename,
                v_policy.policyname,
                'INSERT policy lacks proper WITH CHECK clause',
                'Add WITH CHECK (auth.uid() = user_id/patient_id/clinician_id)'
            );
        END IF;
    END LOOP;
END $$;

-- ==========================================
-- AUDIT 2: Verify Clinician Access Uses Connection Check
-- ==========================================

DO $$
DECLARE
    v_policy RECORD;
    v_issue_count INTEGER := 0;
BEGIN
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
                'Add EXISTS check for patient_clinician_connections'
            );
        END IF;
    END LOOP;
END $$;

-- ==========================================
-- AUDIT 3: Check for Wrong Column References
-- ==========================================

DO $$
DECLARE
    v_policy RECORD;
BEGIN
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
-- AUDIT 4: Check for Duplicate Policies
-- ==========================================

DO $$
DECLARE
    v_dup RECORD;
BEGIN
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
            'Table has ' || v_dup.policy_count || ' policies for ' || v_dup.cmd,
            'Review and consolidate duplicate policies'
        );
    END LOOP;
END $$;

-- ==========================================
-- SHOW CURRENT RESULTS
-- ==========================================

-- 1. Summary by category
SELECT 
    '📊 CURRENT SECURITY STATUS' as report,
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

-- 2. Critical issues detail
SELECT 
    '🔴 CRITICAL ISSUES' as report,
    category,
    table_name,
    policy_name,
    issue
FROM security_audit_results
WHERE severity = '🔴 CRITICAL'
ORDER BY category, table_name, policy_name
LIMIT 20;

-- 3. Overall status
WITH counts AS (
    SELECT 
        COUNT(*) FILTER (WHERE severity = '🔴 CRITICAL') as critical,
        COUNT(*) FILTER (WHERE severity = '🟡 WARNING') as warnings
    FROM security_audit_results
)
SELECT 
    '✅ FINAL STATUS' as report,
    critical as critical_issues,
    warnings as warning_issues,
    CASE 
        WHEN critical = 0 AND warnings = 0 THEN '🎉 PERFECT! Your RLS is HIPAA compliant!'
        WHEN critical = 0 THEN '✅ SECURE! No critical issues, only ' || warnings || ' warnings'
        WHEN critical <= 5 THEN '⚠️ ALMOST THERE! ' || critical || ' critical issues remain'
        ELSE '🔴 NEEDS WORK! ' || critical || ' critical issues to fix'
    END as status
FROM counts;

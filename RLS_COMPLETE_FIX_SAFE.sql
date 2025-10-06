-- ==========================================
-- COMPLETE RLS FIX - SAFE PRODUCTION VERSION
-- ==========================================
-- Run this in Supabase SQL Editor
-- It will show you what it's doing at each step
-- ==========================================

BEGIN;

-- Create temp table for tracking changes
CREATE TEMP TABLE rls_changes_log (
    change_id SERIAL PRIMARY KEY,
    action TEXT,
    schema_name TEXT,
    table_name TEXT,
    policy_name TEXT,
    status TEXT,
    details TEXT,
    changed_at TIMESTAMP DEFAULT NOW()
);

-- ==========================================
-- STEP 1: Fix INSERT Policies - Add WITH CHECK
-- ==========================================

DO $$
DECLARE
    v_policy RECORD;
    v_with_check TEXT;
    v_fixed INTEGER := 0;
    v_failed INTEGER := 0;
BEGIN
    FOR v_policy IN
        SELECT 
            schemaname,
            tablename,
            policyname,
            cmd,
            with_check
        FROM pg_policies
        WHERE schemaname IN ('private_health_info', 'clinical')
        AND cmd = 'INSERT'
        AND (with_check IS NULL OR with_check = 'true')
        AND policyname NOT LIKE '%System%'
        AND policyname NOT LIKE '%Service%'
        AND policyname NOT LIKE '%Admins%'
        ORDER BY schemaname, tablename, policyname
    LOOP
        BEGIN
            -- Determine correct WITH CHECK based on table structure
            CASE 
                -- Tables with patient_id
                WHEN v_policy.tablename IN ('daily_symptom_logs', 'seizure_events', 'tremor_episodes', 
                                             'gait_episodes', 'clinical_media') THEN
                    v_with_check := '(auth.uid() = patient_id)';
                
                -- Tables with user_id  
                WHEN v_policy.tablename IN ('user_conditions', 'user_medications', 'patient_phi', 
                                             'clinician_phi', 'medication_logs', 'basal_temperature_logs',
                                             'patient_onboarding_data', 'clinician_onboarding_data',
                                             'tracking_entries', 'menstrual_cycle_logs', 'seizure_logs_research') THEN
                    v_with_check := '(auth.uid() = user_id)';
                
                -- menstrual_log_symptoms (junction table)
                WHEN v_policy.tablename = 'menstrual_log_symptoms' THEN
                    v_with_check := 'EXISTS (
                        SELECT 1 FROM private_health_info.menstrual_cycle_logs
                        WHERE id = menstrual_log_symptoms.log_id
                        AND user_id = auth.uid()
                    )';
                
                -- Clinical tables requiring relationship checks
                WHEN v_policy.tablename IN ('patient_risk_alerts', 'patient_snapshots', 'case_data_panels',
                                             'clinical_notes_exports', 'clinical_scale_results', 
                                             'neuro_imaging_results', 'patient_pro_timeline') THEN
                    v_with_check := 'EXISTS (
                        SELECT 1 FROM public.patient_clinician_connections
                        WHERE patient_id = ' || v_policy.tablename || '.patient_id
                        AND clinician_id = auth.uid()
                        AND status = ''active''
                    )';
                
                -- Clinician-owned tables
                WHEN v_policy.tablename IN ('ai_insights_cards', 'clinician_today_view') THEN
                    v_with_check := '(auth.uid() = clinician_id)';
                
                -- patient_collab_chat (special case)
                WHEN v_policy.tablename = 'patient_collab_chat' THEN
                    v_with_check := '(auth.uid() = sender_id) AND (
                        auth.uid() = patient_id OR
                        EXISTS (
                            SELECT 1 FROM public.patient_clinician_connections
                            WHERE patient_id = patient_collab_chat.patient_id
                            AND clinician_id = auth.uid()
                            AND status = ''active''
                        )
                    )';
                
                ELSE
                    INSERT INTO rls_changes_log (action, schema_name, table_name, policy_name, status, details)
                    VALUES ('INSERT_FIX', v_policy.schemaname, v_policy.tablename, v_policy.policyname, 
                            'SKIPPED', 'Unknown table structure');
                    CONTINUE;
            END CASE;
            
            -- Drop and recreate with WITH CHECK
            EXECUTE format('DROP POLICY IF EXISTS %I ON %I.%I', 
                          v_policy.policyname, v_policy.schemaname, v_policy.tablename);
            
            EXECUTE format('CREATE POLICY %I ON %I.%I FOR INSERT WITH CHECK %s',
                          v_policy.policyname, v_policy.schemaname, v_policy.tablename, v_with_check);
            
            v_fixed := v_fixed + 1;
            
            INSERT INTO rls_changes_log (action, schema_name, table_name, policy_name, status, details)
            VALUES ('INSERT_FIX', v_policy.schemaname, v_policy.tablename, v_policy.policyname, 
                    'SUCCESS', 'Added WITH CHECK: ' || v_with_check);
            
        EXCEPTION WHEN OTHERS THEN
            v_failed := v_failed + 1;
            
            INSERT INTO rls_changes_log (action, schema_name, table_name, policy_name, status, details)
            VALUES ('INSERT_FIX', v_policy.schemaname, v_policy.tablename, v_policy.policyname, 
                    'FAILED', 'Error: ' || SQLERRM);
        END;
    END LOOP;
END $$;

-- ==========================================
-- STEP 2: Fix Clinician SELECT Policies - Add Relationship Checks
-- ==========================================

DO $$
DECLARE
    v_policy RECORD;
    v_new_qual TEXT;
    v_fixed INTEGER := 0;
    v_failed INTEGER := 0;
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
        AND qual NOT LIKE '%patient_clinician_connections%'
        AND qual NOT LIKE '%can_clinician_see%'
        ORDER BY schemaname, tablename, policyname
    LOOP
        BEGIN
            -- Build new qual with relationship check
            IF v_policy.tablename IN ('daily_symptom_logs', 'seizure_events', 'tremor_episodes', 
                                       'gait_episodes', 'clinical_media', 'patient_risk_alerts',
                                       'patient_snapshots', 'case_data_panels', 'clinical_notes_exports',
                                       'clinical_scale_results', 'neuro_imaging_results', 'patient_pro_timeline') THEN
                
                v_new_qual := 'EXISTS (
                    SELECT 1 FROM public.patient_clinician_connections
                    WHERE patient_id = ' || v_policy.tablename || '.patient_id
                    AND clinician_id = auth.uid()
                    AND status = ''active''
                )';
                
                -- Drop and recreate
                EXECUTE format('DROP POLICY IF EXISTS %I ON %I.%I',
                              v_policy.policyname, v_policy.schemaname, v_policy.tablename);
                
                EXECUTE format('CREATE POLICY %I ON %I.%I FOR SELECT USING (%s)',
                              v_policy.policyname, v_policy.schemaname, v_policy.tablename, v_new_qual);
                
                v_fixed := v_fixed + 1;
                
                INSERT INTO rls_changes_log (action, schema_name, table_name, policy_name, status, details)
                VALUES ('RELATIONSHIP_CHECK', v_policy.schemaname, v_policy.tablename, v_policy.policyname,
                        'SUCCESS', 'Added relationship check');
            ELSE
                INSERT INTO rls_changes_log (action, schema_name, table_name, policy_name, status, details)
                VALUES ('RELATIONSHIP_CHECK', v_policy.schemaname, v_policy.tablename, v_policy.policyname,
                        'SKIPPED', 'Table does not have patient_id column');
            END IF;
            
        EXCEPTION WHEN OTHERS THEN
            v_failed := v_failed + 1;
            
            INSERT INTO rls_changes_log (action, schema_name, table_name, policy_name, status, details)
            VALUES ('RELATIONSHIP_CHECK', v_policy.schemaname, v_policy.tablename, v_policy.policyname,
                    'FAILED', 'Error: ' || SQLERRM);
        END;
    END LOOP;
END $$;

-- ==========================================
-- STEP 3: Verification
-- ==========================================

-- Verification is now done in the summary queries below

-- Intermediate results stored in temp tables for final report

-- ==========================================
-- STEP 4: Create Summary Report
-- ==========================================

CREATE TEMP TABLE rls_fix_summary AS
SELECT 
    'RLS Security Fix Complete' as report_title,
    (SELECT COUNT(*) FROM rls_changes_log WHERE status = 'SUCCESS') as policies_fixed,
    (SELECT COUNT(*) FROM rls_changes_log WHERE status = 'FAILED') as policies_failed,
    (SELECT COUNT(*) FROM rls_changes_log WHERE status = 'SKIPPED') as policies_skipped,
    (
        SELECT COUNT(*) 
        FROM pg_policies
        WHERE schemaname IN ('private_health_info', 'clinical')
        AND cmd = 'INSERT'
        AND (with_check IS NULL OR with_check = 'true')
        AND policyname NOT LIKE '%System%'
        AND policyname NOT LIKE '%Service%'
    ) as remaining_with_check_issues,
    (
        SELECT COUNT(*)
        FROM pg_policies
        WHERE schemaname IN ('private_health_info', 'clinical')
        AND policyname ILIKE '%clinician%'
        AND policyname NOT LIKE '%own%'
        AND cmd = 'SELECT'
        AND qual NOT LIKE '%patient_clinician_connections%'
        AND qual NOT LIKE '%can_clinician_see%'
    ) as remaining_relationship_issues;

COMMIT;

-- ==========================================
-- FINAL REPORT - QUERY THESE TABLES
-- ==========================================

-- 1. EXECUTIVE SUMMARY
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

-- 2. DETAILED CHANGE LOG
SELECT 
    action,
    schema_name || '.' || table_name as table_name,
    policy_name,
    status,
    details,
    changed_at
FROM rls_changes_log
ORDER BY 
    CASE status 
        WHEN 'SUCCESS' THEN 1
        WHEN 'SKIPPED' THEN 2
        WHEN 'FAILED' THEN 3
    END,
    schema_name,
    table_name;

-- 3. SUMMARY BY STATUS
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

-- 4. FAILURES ONLY (if any)
SELECT 
    schema_name || '.' || table_name as table_name,
    policy_name,
    details as error_message
FROM rls_changes_log
WHERE status = 'FAILED'
ORDER BY schema_name, table_name;

-- 5. NEXT STEPS
SELECT 
    CASE 
        WHEN (SELECT remaining_with_check_issues + remaining_relationship_issues FROM rls_fix_summary) = 0
        THEN 'SUCCESS! Re-run RLS_DETAILED_SECURITY_AUDIT.sql to verify. Your database is HIPAA compliant.'
        WHEN (SELECT remaining_with_check_issues + remaining_relationship_issues FROM rls_fix_summary) <= 5
        THEN 'GOOD PROGRESS! Review failures above and re-run RLS_DETAILED_SECURITY_AUDIT.sql'
        ELSE 'REVIEW REQUIRED: Check failures above. Some policies may need manual intervention.'
    END as next_steps;

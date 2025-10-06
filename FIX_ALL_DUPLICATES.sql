-- ==========================================
-- FIX ALL DUPLICATE INSERT POLICIES
-- ==========================================
-- Remove duplicates and keep only one correct policy per table
-- ==========================================

BEGIN;

CREATE TEMP TABLE duplicate_fixes (
    id SERIAL,
    table_name TEXT,
    policies_removed TEXT[],
    policy_created TEXT,
    status TEXT,
    details TEXT
);

-- Fix all INSERT policies by removing ALL and creating ONE correct policy per table
DO $$
DECLARE
    v_table RECORD;
    v_policies TEXT[];
    v_with_check TEXT;
BEGIN
    -- Process each table that has INSERT policies
    FOR v_table IN
        SELECT DISTINCT schemaname, tablename
        FROM pg_policies
        WHERE schemaname IN ('private_health_info', 'clinical')
        AND cmd = 'INSERT'
        AND policyname NOT LIKE '%System%'
        AND policyname NOT LIKE '%Service%'
        ORDER BY schemaname, tablename
    LOOP
        BEGIN
            -- Get all policy names for this table
            SELECT array_agg(policyname) INTO v_policies
            FROM pg_policies
            WHERE schemaname = v_table.schemaname
            AND tablename = v_table.tablename
            AND cmd = 'INSERT'
            AND policyname NOT LIKE '%System%'
            AND policyname NOT LIKE '%Service%';
            
            -- Determine correct WITH CHECK based on table
            CASE 
                -- Tables with patient_id
                WHEN v_table.tablename IN ('daily_symptom_logs', 'seizure_events', 'tremor_episodes', 
                                           'gait_episodes', 'clinical_media') THEN
                    v_with_check := '(auth.uid() = patient_id)';
                
                -- Tables with user_id
                WHEN v_table.tablename IN ('user_conditions', 'user_medications', 'patient_phi', 
                                           'clinician_phi', 'medication_logs', 'basal_temperature_logs',
                                           'patient_onboarding_data', 'clinician_onboarding_data',
                                           'tracking_entries', 'menstrual_cycle_logs', 'seizure_logs_research') THEN
                    v_with_check := '(auth.uid() = user_id)';
                
                -- menstrual_log_symptoms (junction table)
                WHEN v_table.tablename = 'menstrual_log_symptoms' THEN
                    v_with_check := 'EXISTS (
                        SELECT 1 FROM private_health_info.menstrual_cycle_logs
                        WHERE id = menstrual_log_symptoms.log_id
                        AND user_id = auth.uid()
                    )';
                
                -- Clinical tables with patient_id requiring relationship checks
                WHEN v_table.tablename IN ('patient_risk_alerts', 'patient_snapshots', 'case_data_panels',
                                           'clinical_notes_exports', 'clinical_scale_results', 
                                           'neuro_imaging_results', 'patient_pro_timeline') THEN
                    v_with_check := 'EXISTS (
                        SELECT 1 FROM public.patient_clinician_connections
                        WHERE patient_id = ' || v_table.tablename || '.patient_id
                        AND clinician_id = auth.uid()
                        AND status = ''active''
                    )';
                
                -- Clinician-owned tables
                WHEN v_table.tablename IN ('ai_insights_cards', 'clinician_today_view') THEN
                    v_with_check := '(auth.uid() = clinician_id)';
                
                -- patient_collab_chat (special case)
                WHEN v_table.tablename = 'patient_collab_chat' THEN
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
                    INSERT INTO duplicate_fixes (table_name, policies_removed, policy_created, status, details)
                    VALUES (v_table.schemaname || '.' || v_table.tablename, v_policies, NULL, 
                            'SKIPPED', 'Unknown table structure');
                    CONTINUE;
            END CASE;
            
            -- Drop ALL existing INSERT policies for this table
            EXECUTE format(
                'DROP POLICY IF EXISTS %I ON %I.%I',
                v_policies[1], v_table.schemaname, v_table.tablename
            );
            
            -- If there are more policies, drop them too
            FOR i IN 2..array_length(v_policies, 1) LOOP
                EXECUTE format(
                    'DROP POLICY IF EXISTS %I ON %I.%I',
                    v_policies[i], v_table.schemaname, v_table.tablename
                );
            END LOOP;
            
            -- Create ONE correct policy
            EXECUTE format(
                'CREATE POLICY %I ON %I.%I FOR INSERT WITH CHECK %s',
                'Users can insert own ' || v_table.tablename,
                v_table.schemaname,
                v_table.tablename,
                v_with_check
            );
            
            INSERT INTO duplicate_fixes (table_name, policies_removed, policy_created, status, details)
            VALUES (
                v_table.schemaname || '.' || v_table.tablename,
                v_policies,
                'Users can insert own ' || v_table.tablename,
                'SUCCESS',
                'Removed ' || array_length(v_policies, 1)::text || ' policies, created 1 with: ' || v_with_check
            );
            
        EXCEPTION WHEN OTHERS THEN
            INSERT INTO duplicate_fixes (table_name, policies_removed, policy_created, status, details)
            VALUES (
                v_table.schemaname || '.' || v_table.tablename,
                v_policies,
                NULL,
                'FAILED',
                SQLERRM
            );
        END;
    END LOOP;
END $$;

COMMIT;

-- Show results
SELECT 
    '✅ DUPLICATE FIX RESULTS' as report,
    table_name,
    array_length(policies_removed, 1) as old_policy_count,
    policy_created as new_policy_name,
    status,
    details
FROM duplicate_fixes
ORDER BY status, table_name;

-- Verify - should show ONE INSERT policy per table
SELECT 
    '🔍 VERIFICATION - INSERT POLICIES PER TABLE' as report,
    schemaname,
    tablename,
    COUNT(*) as insert_policy_count,
    array_agg(policyname) as policy_names
FROM pg_policies
WHERE schemaname IN ('private_health_info', 'clinical')
AND cmd = 'INSERT'
AND policyname NOT LIKE '%System%'
AND policyname NOT LIKE '%Service%'
GROUP BY schemaname, tablename
HAVING COUNT(*) > 1
ORDER BY schemaname, tablename;

-- Final audit count
SELECT 
    '📊 REMAINING ISSUES' as report,
    COUNT(*) as with_check_issues
FROM pg_policies
WHERE schemaname IN ('private_health_info', 'clinical')
AND cmd = 'INSERT'
AND (with_check IS NULL OR with_check = 'true')
AND policyname NOT LIKE '%System%'
AND policyname NOT LIKE '%Service%';

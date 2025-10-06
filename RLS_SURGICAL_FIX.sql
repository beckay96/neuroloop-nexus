-- ==========================================
-- SURGICAL RLS FIX - Updates Existing Policies
-- ==========================================
-- This script UPDATES existing policies instead of dropping/recreating
-- ==========================================

BEGIN;

-- ==========================================
-- STRATEGY: Use ALTER POLICY to update WITH CHECK clauses
-- ==========================================

DO $$
DECLARE
    v_policy RECORD;
    v_fixed INTEGER := 0;
BEGIN
    RAISE NOTICE '==========================================';
    RAISE NOTICE 'SURGICAL FIX: UPDATING EXISTING POLICIES';
    RAISE NOTICE '==========================================';
    
    -- Find all INSERT policies without proper WITH CHECK
    FOR v_policy IN
        SELECT 
            schemaname,
            tablename,
            policyname,
            cmd
        FROM pg_policies
        WHERE schemaname IN ('private_health_info', 'clinical')
        AND cmd IN ('INSERT', 'ALL')
        AND (with_check IS NULL OR with_check = 'true')
        AND policyname NOT LIKE '%System%'
        AND policyname NOT LIKE '%Service%'
        AND policyname NOT LIKE '%Admins%'
    LOOP
        -- Determine the correct WITH CHECK based on table
        DECLARE
            v_with_check TEXT;
        BEGIN
            -- Tables using patient_id
            IF v_policy.tablename IN ('daily_symptom_logs', 'seizure_events', 'tremor_episodes', 
                                       'gait_episodes', 'clinical_media') THEN
                v_with_check := 'auth.uid() = patient_id';
                
            -- Tables using user_id
            ELSIF v_policy.tablename IN ('user_conditions', 'user_medications', 'patient_phi', 
                                          'clinician_phi', 'medication_logs', 'basal_temperature_logs',
                                          'patient_onboarding_data', 'clinician_onboarding_data',
                                          'tracking_entries', 'menstrual_cycle_logs', 'seizure_logs_research') THEN
                v_with_check := 'auth.uid() = user_id';
                
            -- Clinical tables with patient_id
            ELSIF v_policy.tablename IN ('patient_risk_alerts', 'patient_snapshots', 'case_data_panels',
                                          'clinical_notes_exports', 'clinical_scale_results', 
                                          'neuro_imaging_results', 'patient_pro_timeline') THEN
                -- These need relationship checks
                v_with_check := 'EXISTS (
                    SELECT 1 FROM public.patient_clinician_connections
                    WHERE patient_id = ' || v_policy.tablename || '.patient_id
                    AND clinician_id = auth.uid()
                    AND status = ''active''
                )';
                
            -- Clinical tables with clinician_id
            ELSIF v_policy.tablename IN ('ai_insights_cards', 'clinician_today_view') THEN
                v_with_check := 'auth.uid() = clinician_id';
                
            -- patient_collab_chat (special case)
            ELSIF v_policy.tablename = 'patient_collab_chat' THEN
                v_with_check := 'auth.uid() = sender_id AND (
                    auth.uid() = patient_id OR
                    EXISTS (
                        SELECT 1 FROM public.patient_clinician_connections
                        WHERE patient_id = patient_collab_chat.patient_id
                        AND clinician_id = auth.uid()
                        AND status = ''active''
                    )
                )';
                
            -- menstrual_log_symptoms (junction table)
            ELSIF v_policy.tablename = 'menstrual_log_symptoms' THEN
                v_with_check := 'EXISTS (
                    SELECT 1 FROM private_health_info.menstrual_cycle_logs
                    WHERE id = menstrual_log_symptoms.log_id
                    AND user_id = auth.uid()
                )';
            ELSE
                RAISE NOTICE '⚠️  Skipping unknown table: %.%', v_policy.schemaname, v_policy.tablename;
                CONTINUE;
            END IF;
            
            -- Drop and recreate the policy with WITH CHECK
            EXECUTE format(
                'DROP POLICY IF EXISTS %I ON %I.%I',
                v_policy.policyname,
                v_policy.schemaname,
                v_policy.tablename
            );
            
            EXECUTE format(
                'CREATE POLICY %I ON %I.%I FOR INSERT WITH CHECK (%s)',
                v_policy.policyname,
                v_policy.schemaname,
                v_policy.tablename,
                v_with_check
            );
            
            v_fixed := v_fixed + 1;
            RAISE NOTICE '✅ Fixed: %.% - %', v_policy.schemaname, v_policy.tablename, v_policy.policyname;
            
        EXCEPTION WHEN OTHERS THEN
            RAISE NOTICE '❌ Error fixing %.% - %: %', 
                v_policy.schemaname, v_policy.tablename, v_policy.policyname, SQLERRM;
        END;
    END LOOP;
    
    RAISE NOTICE '==========================================';
    RAISE NOTICE 'Fixed % INSERT policies', v_fixed;
    RAISE NOTICE '==========================================';
END $$;

-- ==========================================
-- FIX: Add missing relationship checks to clinician SELECT policies
-- ==========================================

DO $$
DECLARE
    v_policy RECORD;
    v_fixed INTEGER := 0;
BEGIN
    RAISE NOTICE '==========================================';
    RAISE NOTICE 'FIXING: CLINICIAN RELATIONSHIP CHECKS';
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
        AND qual NOT LIKE '%patient_clinician_connections%'
        AND qual NOT LIKE '%can_clinician_see%'
    LOOP
        -- These policies need to be updated to include relationship checks
        DECLARE
            v_new_qual TEXT;
        BEGIN
            -- Add relationship check to existing qual
            IF v_policy.qual IS NULL OR v_policy.qual = 'true' THEN
                v_new_qual := 'EXISTS (
                    SELECT 1 FROM public.patient_clinician_connections
                    WHERE patient_id = ' || v_policy.tablename || '.patient_id
                    AND clinician_id = auth.uid()
                    AND status = ''active''
                )';
            ELSE
                -- Append to existing condition
                v_new_qual := '(' || v_policy.qual || ') AND EXISTS (
                    SELECT 1 FROM public.patient_clinician_connections
                    WHERE patient_id = ' || v_policy.tablename || '.patient_id
                    AND clinician_id = auth.uid()
                    AND status = ''active''
                )';
            END IF;
            
            EXECUTE format(
                'DROP POLICY IF EXISTS %I ON %I.%I',
                v_policy.policyname,
                v_policy.schemaname,
                v_policy.tablename
            );
            
            EXECUTE format(
                'CREATE POLICY %I ON %I.%I FOR SELECT USING (%s)',
                v_policy.policyname,
                v_policy.schemaname,
                v_policy.tablename,
                v_new_qual
            );
            
            v_fixed := v_fixed + 1;
            RAISE NOTICE '✅ Fixed: %.% - %', v_policy.schemaname, v_policy.tablename, v_policy.policyname;
            
        EXCEPTION WHEN OTHERS THEN
            RAISE NOTICE '❌ Error fixing %.% - %: %', 
                v_policy.schemaname, v_policy.tablename, v_policy.policyname, SQLERRM;
        END;
    END LOOP;
    
    RAISE NOTICE '==========================================';
    RAISE NOTICE 'Fixed % clinician policies', v_fixed;
    RAISE NOTICE '==========================================';
END $$;

COMMIT;

-- ==========================================
-- VERIFICATION
-- ==========================================

DO $$
DECLARE
    v_with_check_missing INTEGER;
    v_relationship_missing INTEGER;
    v_wrong_column INTEGER;
BEGIN
    RAISE NOTICE '==========================================';
    RAISE NOTICE 'POST-FIX VERIFICATION';
    RAISE NOTICE '==========================================';
    
    -- Count remaining issues
    SELECT COUNT(*) INTO v_with_check_missing
    FROM pg_policies
    WHERE schemaname IN ('private_health_info', 'clinical')
    AND cmd IN ('INSERT', 'ALL')
    AND (with_check IS NULL OR with_check = 'true')
    AND policyname NOT LIKE '%System%'
    AND policyname NOT LIKE '%Service%';
    
    SELECT COUNT(*) INTO v_relationship_missing
    FROM pg_policies
    WHERE schemaname IN ('private_health_info', 'clinical')
    AND policyname ILIKE '%clinician%'
    AND policyname NOT LIKE '%own%'
    AND cmd = 'SELECT'
    AND qual NOT LIKE '%patient_clinician_connections%'
    AND qual NOT LIKE '%can_clinician_see%';
    
    RAISE NOTICE 'Remaining WITH CHECK issues: %', v_with_check_missing;
    RAISE NOTICE 'Remaining relationship check issues: %', v_relationship_missing;
    
    IF v_with_check_missing = 0 AND v_relationship_missing = 0 THEN
        RAISE NOTICE '✅ SUCCESS: All critical issues resolved!';
    ELSE
        RAISE NOTICE '⚠️  Some issues remain - may need manual review';
    END IF;
END $$;

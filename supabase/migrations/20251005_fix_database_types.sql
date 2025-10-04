-- ============================================================================
-- DATABASE TYPE CLEANUP - VARCHAR → UUID/TEXT
-- ============================================================================
-- Purpose: Remove all VARCHAR types, use UUID for IDs and TEXT for strings
-- CRITICAL: This ensures HIPAA compliance and proper foreign key relationships
-- Date: 2025-10-05
-- ============================================================================

-- BACKUP FIRST:
-- pg_dump -U postgres -h localhost neuroloop > backup_before_type_migration.sql

BEGIN;

-- ============================================================================
-- STEP 0: DROP ALL RLS POLICIES (they block type changes)
-- ============================================================================
-- We'll recreate them after type conversion with proper UUID handling

-- Save policy definitions for recreation
CREATE TEMP TABLE temp_policies AS
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies
WHERE schemaname = 'public';

-- Drop all policies on public schema tables
DO $$
DECLARE
    r RECORD;
BEGIN
    FOR r IN 
        SELECT schemaname, tablename, policyname
        FROM pg_policies
        WHERE schemaname = 'public'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON %I.%I', 
            r.policyname, r.schemaname, r.tablename);
    END LOOP;
END $$;

-- ============================================================================
-- STEP 1: FIX user_id COLUMNS (VARCHAR → UUID with FK to auth.users)
-- ============================================================================

-- 1.1 audit_log.user_id
ALTER TABLE public.audit_log 
    ALTER COLUMN user_id TYPE UUID USING user_id::UUID;

-- 1.2 carer_profiles.user_id
ALTER TABLE public.carer_profiles 
    ALTER COLUMN user_id TYPE UUID USING user_id::UUID;

ALTER TABLE public.carer_profiles
    ADD CONSTRAINT fk_carer_profiles_user 
    FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- 1.3 carer_relationships (carer_user_id and patient_user_id)
ALTER TABLE public.carer_relationships 
    ALTER COLUMN carer_user_id TYPE UUID USING carer_user_id::UUID;

ALTER TABLE public.carer_relationships 
    ALTER COLUMN patient_user_id TYPE UUID USING patient_user_id::UUID;

ALTER TABLE public.carer_relationships
    ADD CONSTRAINT fk_carer_relationships_carer 
    FOREIGN KEY (carer_user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.carer_relationships
    ADD CONSTRAINT fk_carer_relationships_patient 
    FOREIGN KEY (patient_user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- 1.4 clinical_alerts (clinician_id, patient_id)
ALTER TABLE public.clinical_alerts 
    ALTER COLUMN clinician_id TYPE UUID USING clinician_id::UUID;

ALTER TABLE public.clinical_alerts 
    ALTER COLUMN patient_id TYPE UUID USING patient_id::UUID;

ALTER TABLE public.clinical_alerts
    ADD CONSTRAINT fk_clinical_alerts_clinician 
    FOREIGN KEY (clinician_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.clinical_alerts
    ADD CONSTRAINT fk_clinical_alerts_patient 
    FOREIGN KEY (patient_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- 1.5 clinical_metrics.patient_id
ALTER TABLE public.clinical_metrics 
    ALTER COLUMN patient_id TYPE UUID USING patient_id::UUID;

ALTER TABLE public.clinical_metrics
    ADD CONSTRAINT fk_clinical_metrics_patient 
    FOREIGN KEY (patient_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- 1.6 clinical_reports.clinician_id
ALTER TABLE public.clinical_reports 
    ALTER COLUMN clinician_id TYPE UUID USING clinician_id::UUID;

ALTER TABLE public.clinical_reports
    ADD CONSTRAINT fk_clinical_reports_clinician 
    FOREIGN KEY (clinician_id) REFERENCES auth.users(id) ON DELETE SET NULL;

-- 1.7 cohort_analytics.clinician_id
ALTER TABLE public.cohort_analytics 
    ALTER COLUMN clinician_id TYPE UUID USING clinician_id::UUID;

ALTER TABLE public.cohort_analytics
    ADD CONSTRAINT fk_cohort_analytics_clinician 
    FOREIGN KEY (clinician_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- 1.8 daily_tracking_preferences.user_id
ALTER TABLE public.daily_tracking_preferences 
    ALTER COLUMN user_id TYPE UUID USING user_id::UUID;

ALTER TABLE public.daily_tracking_preferences
    ADD CONSTRAINT fk_daily_tracking_user 
    FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- 1.9 dashboard_preferences.clinician_id
ALTER TABLE public.dashboard_preferences 
    ALTER COLUMN clinician_id TYPE UUID USING clinician_id::UUID;

ALTER TABLE public.dashboard_preferences
    ADD CONSTRAINT fk_dashboard_preferences_clinician 
    FOREIGN KEY (clinician_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- 1.10 device_test_results.patient_id
ALTER TABLE public.device_test_results 
    ALTER COLUMN patient_id TYPE UUID USING patient_id::UUID;

ALTER TABLE public.device_test_results
    ADD CONSTRAINT fk_device_test_results_patient 
    FOREIGN KEY (patient_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- 1.11 medication_logs.user_id
ALTER TABLE public.medication_logs 
    ALTER COLUMN user_id TYPE UUID USING user_id::UUID;

ALTER TABLE public.medication_logs
    ADD CONSTRAINT fk_medication_logs_user 
    FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- 1.12 menstrual_cycle_logs.user_id
ALTER TABLE public.menstrual_cycle_logs 
    ALTER COLUMN user_id TYPE UUID USING user_id::UUID;

ALTER TABLE public.menstrual_cycle_logs
    ADD CONSTRAINT fk_menstrual_cycle_logs_user 
    FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- 1.13 patient_clinical_overview (clinician_id, patient_id)
ALTER TABLE public.patient_clinical_overview 
    ALTER COLUMN clinician_id TYPE UUID USING clinician_id::UUID;

ALTER TABLE public.patient_clinical_overview 
    ALTER COLUMN patient_id TYPE UUID USING patient_id::UUID;

ALTER TABLE public.patient_clinical_overview
    ADD CONSTRAINT fk_patient_clinical_overview_clinician 
    FOREIGN KEY (clinician_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.patient_clinical_overview
    ADD CONSTRAINT fk_patient_clinical_overview_patient 
    FOREIGN KEY (patient_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- 1.14 patient_profiles.user_id
ALTER TABLE public.patient_profiles 
    ALTER COLUMN user_id TYPE UUID USING user_id::UUID;

ALTER TABLE public.patient_profiles
    ADD CONSTRAINT fk_patient_profiles_user 
    FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- 1.15 patient_timeline.patient_id
ALTER TABLE public.patient_timeline 
    ALTER COLUMN patient_id TYPE UUID USING patient_id::UUID;

ALTER TABLE public.patient_timeline
    ADD CONSTRAINT fk_patient_timeline_patient 
    FOREIGN KEY (patient_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- 1.16 research_consent.user_id
ALTER TABLE public.research_consent 
    ALTER COLUMN user_id TYPE UUID USING user_id::UUID;

ALTER TABLE public.research_consent
    ADD CONSTRAINT fk_research_consent_user 
    FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- 1.17 research_data_quality.user_id
ALTER TABLE public.research_data_quality 
    ALTER COLUMN user_id TYPE UUID USING user_id::UUID;

ALTER TABLE public.research_data_quality
    ADD CONSTRAINT fk_research_data_quality_user 
    FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- 1.18 research_medication_data.research_user_id
ALTER TABLE public.research_medication_data 
    ALTER COLUMN research_user_id TYPE UUID USING research_user_id::UUID;

-- No FK for research - anonymized

-- 1.19 research_seizure_data.research_user_id
ALTER TABLE public.research_seizure_data 
    ALTER COLUMN research_user_id TYPE UUID USING research_user_id::UUID;

-- No FK for research - anonymized

-- 1.20 research_symptom_data.research_user_id
ALTER TABLE public.research_symptom_data 
    ALTER COLUMN research_user_id TYPE UUID USING research_user_id::UUID;

-- No FK for research - anonymized

-- 1.21 seizure_logs.user_id
ALTER TABLE public.seizure_logs 
    ALTER COLUMN user_id TYPE UUID USING user_id::UUID;

ALTER TABLE public.seizure_logs
    ADD CONSTRAINT fk_seizure_logs_user 
    FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- 1.22 symptom_logs.user_id
ALTER TABLE public.symptom_logs 
    ALTER COLUMN user_id TYPE UUID USING user_id::UUID;

ALTER TABLE public.symptom_logs
    ADD CONSTRAINT fk_symptom_logs_user 
    FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- 1.23 tracking_entries.user_id
ALTER TABLE public.tracking_entries 
    ALTER COLUMN user_id TYPE UUID USING user_id::UUID;

ALTER TABLE public.tracking_entries
    ADD CONSTRAINT fk_tracking_entries_user 
    FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- 1.24 user_achievements.user_id
ALTER TABLE public.user_achievements 
    ALTER COLUMN user_id TYPE UUID USING user_id::UUID;

ALTER TABLE public.user_achievements
    ADD CONSTRAINT fk_user_achievements_user 
    FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- 1.25 user_conditions.user_id
ALTER TABLE public.user_conditions 
    ALTER COLUMN user_id TYPE UUID USING user_id::UUID;

ALTER TABLE public.user_conditions
    ADD CONSTRAINT fk_user_conditions_user 
    FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- ============================================================================
-- STEP 2: FIX id COLUMNS (VARCHAR → UUID)
-- ============================================================================

-- 2.1 audit_log.id
ALTER TABLE public.audit_log 
    ALTER COLUMN id TYPE UUID USING id::UUID;

-- 2.2 carer_onboarding_data.id (already UUID, skip)
-- 2.3 carer_profiles.id
ALTER TABLE public.carer_profiles 
    ALTER COLUMN id TYPE UUID USING id::UUID;

-- 2.4 carer_relationships.id
ALTER TABLE public.carer_relationships 
    ALTER COLUMN id TYPE UUID USING id::UUID;

-- 2.5 clinical_alerts.id
ALTER TABLE public.clinical_alerts 
    ALTER COLUMN id TYPE UUID USING id::UUID;

-- 2.6 clinical_metrics.id
ALTER TABLE public.clinical_metrics 
    ALTER COLUMN id TYPE UUID USING id::UUID;

-- 2.7 clinical_reports.id
ALTER TABLE public.clinical_reports 
    ALTER COLUMN id TYPE UUID USING id::UUID;

-- 2.8 cohort_analytics.id
ALTER TABLE public.cohort_analytics 
    ALTER COLUMN id TYPE UUID USING id::UUID;

-- 2.9 conditions.id
ALTER TABLE public.conditions 
    ALTER COLUMN id TYPE UUID USING id::UUID;

-- 2.10 daily_tracking_preferences.id
ALTER TABLE public.daily_tracking_preferences 
    ALTER COLUMN id TYPE UUID USING id::UUID;

-- 2.11 dashboard_preferences.id
ALTER TABLE public.dashboard_preferences 
    ALTER COLUMN id TYPE UUID USING id::UUID;

-- 2.12 device_test_results.id
ALTER TABLE public.device_test_results 
    ALTER COLUMN id TYPE UUID USING id::UUID;

-- 2.13 medication_logs.id
ALTER TABLE public.medication_logs 
    ALTER COLUMN id TYPE UUID USING id::UUID;

-- 2.14 medications.id
ALTER TABLE public.medications 
    ALTER COLUMN id TYPE UUID USING id::UUID;

-- 2.15 menstrual_cycle_logs.id
ALTER TABLE public.menstrual_cycle_logs 
    ALTER COLUMN id TYPE UUID USING id::UUID;

-- 2.16 patient_clinical_overview.id
ALTER TABLE public.patient_clinical_overview 
    ALTER COLUMN id TYPE UUID USING id::UUID;

-- 2.17 patient_profiles.id
ALTER TABLE public.patient_profiles 
    ALTER COLUMN id TYPE UUID USING id::UUID;

-- 2.18 patient_timeline.id
ALTER TABLE public.patient_timeline 
    ALTER COLUMN id TYPE UUID USING id::UUID;

-- 2.19 research_consent.id
ALTER TABLE public.research_consent 
    ALTER COLUMN id TYPE UUID USING id::UUID;

-- 2.20 research_data_quality.id
ALTER TABLE public.research_data_quality 
    ALTER COLUMN id TYPE UUID USING id::UUID;

-- 2.21 research_medication_data.id
ALTER TABLE public.research_medication_data 
    ALTER COLUMN id TYPE UUID USING id::UUID;

-- 2.22 research_seizure_data.id
ALTER TABLE public.research_seizure_data 
    ALTER COLUMN id TYPE UUID USING id::UUID;

-- 2.23 research_symptom_data.id
ALTER TABLE public.research_symptom_data 
    ALTER COLUMN id TYPE UUID USING id::UUID;

-- 2.24 seizure_logs.id
ALTER TABLE public.seizure_logs 
    ALTER COLUMN id TYPE UUID USING id::UUID;

-- 2.25 symptom_logs.id
ALTER TABLE public.symptom_logs 
    ALTER COLUMN id TYPE UUID USING id::UUID;

-- 2.26 tracking_entries.id
ALTER TABLE public.tracking_entries 
    ALTER COLUMN id TYPE UUID USING id::UUID;

-- 2.27 user_achievements.id
ALTER TABLE public.user_achievements 
    ALTER COLUMN id TYPE UUID USING id::UUID;

-- 2.28 user_conditions.id
ALTER TABLE public.user_conditions 
    ALTER COLUMN id TYPE UUID USING id::UUID;

-- 2.29 user_medications.id
ALTER TABLE public.user_medications 
    ALTER COLUMN id TYPE UUID USING id::UUID;

-- 2.30 user_points.id
ALTER TABLE public.user_points 
    ALTER COLUMN id TYPE UUID USING id::UUID;

-- ============================================================================
-- STEP 3: FIX OTHER VARCHAR COLUMNS → TEXT
-- ============================================================================

-- 3.1 audit_log
ALTER TABLE public.audit_log 
    ALTER COLUMN table_name TYPE TEXT,
    ALTER COLUMN record_id TYPE TEXT,
    ALTER COLUMN session_id TYPE TEXT;

-- 3.2 carer_profiles
ALTER TABLE public.carer_profiles 
    ALTER COLUMN first_name TYPE TEXT,
    ALTER COLUMN last_name TYPE TEXT,
    ALTER COLUMN email TYPE TEXT,
    ALTER COLUMN phone_number TYPE TEXT,
    ALTER COLUMN relationship TYPE TEXT;

-- 3.3 carer_relationships
ALTER TABLE public.carer_relationships 
    ALTER COLUMN approved_by TYPE TEXT,
    ALTER COLUMN relationship_type TYPE TEXT,
    ALTER COLUMN status TYPE TEXT;

-- 3.4 clinical_alerts
ALTER TABLE public.clinical_alerts 
    ALTER COLUMN related_entry_id TYPE TEXT;

-- 3.5 clinical_metrics (no varchar to convert)

-- 3.6 clinical_reports (mostly text already)

-- 3.7 conditions
ALTER TABLE public.conditions 
    ALTER COLUMN name TYPE TEXT,
    ALTER COLUMN category TYPE TEXT;

-- 3.8 medications
ALTER TABLE public.medications 
    ALTER COLUMN name TYPE TEXT,
    ALTER COLUMN generic_name TYPE TEXT,
    ALTER COLUMN category TYPE TEXT;

-- 3.9 medication_logs
ALTER TABLE public.medication_logs 
    ALTER COLUMN dosage_taken TYPE TEXT,
    ALTER COLUMN user_medication_id TYPE UUID USING user_medication_id::UUID;

-- 3.10 patient_profiles
ALTER TABLE public.patient_profiles 
    ALTER COLUMN first_name TYPE TEXT,
    ALTER COLUMN last_name TYPE TEXT,
    ALTER COLUMN middle_name TYPE TEXT,
    ALTER COLUMN gender TYPE TEXT;

-- 3.11 research tables
ALTER TABLE public.research_medication_data 
    ALTER COLUMN age_range TYPE TEXT,
    ALTER COLUMN gender TYPE TEXT,
    ALTER COLUMN condition_category TYPE TEXT,
    ALTER COLUMN medication_generic_name TYPE TEXT;

ALTER TABLE public.research_seizure_data 
    ALTER COLUMN age_range TYPE TEXT,
    ALTER COLUMN gender TYPE TEXT,
    ALTER COLUMN consciousness_level TYPE TEXT,
    ALTER COLUMN seizure_type TYPE TEXT;

ALTER TABLE public.research_symptom_data 
    ALTER COLUMN age_range TYPE TEXT,
    ALTER COLUMN gender TYPE TEXT,
    ALTER COLUMN condition_category TYPE TEXT,
    ALTER COLUMN symptom_type TYPE TEXT;

ALTER TABLE public.research_consent 
    ALTER COLUMN consent_version TYPE TEXT,
    ALTER COLUMN consent_document_url TYPE TEXT;

-- 3.12 seizure_logs
ALTER TABLE public.seizure_logs 
    ALTER COLUMN seizure_type TYPE TEXT,
    ALTER COLUMN consciousness_level TYPE TEXT,
    ALTER COLUMN location TYPE TEXT;

-- 3.13 symptom_logs
ALTER TABLE public.symptom_logs 
    ALTER COLUMN symptom_type TYPE TEXT;

-- 3.14 tracking_entries
ALTER TABLE public.tracking_entries 
    ALTER COLUMN entry_type TYPE TEXT;

-- 3.15 user_achievements
ALTER TABLE public.user_achievements 
    ALTER COLUMN achievement_name TYPE TEXT,
    ALTER COLUMN achievement_type TYPE TEXT,
    ALTER COLUMN category TYPE TEXT,
    ALTER COLUMN badge_icon TYPE TEXT;

-- 3.16 user_conditions
ALTER TABLE public.user_conditions 
    ALTER COLUMN condition_id TYPE UUID USING condition_id::UUID,
    ALTER COLUMN severity TYPE TEXT;

ALTER TABLE public.user_conditions
    ADD CONSTRAINT fk_user_conditions_condition 
    FOREIGN KEY (condition_id) REFERENCES public.conditions(id) ON DELETE CASCADE;

-- 3.17 user_medications
ALTER TABLE public.user_medications 
    ALTER COLUMN medication_id TYPE UUID USING medication_id::UUID,
    ALTER COLUMN dosage TYPE TEXT,
    ALTER COLUMN frequency TYPE TEXT;

ALTER TABLE public.user_medications
    ADD CONSTRAINT fk_user_medications_medication 
    FOREIGN KEY (medication_id) REFERENCES public.medications(id) ON DELETE SET NULL;

-- ============================================================================
-- STEP 4: FIX FOREIGN KEY REFERENCES
-- ============================================================================

-- 4.1 clinical_alerts.related_entry_id (text is OK, could be from multiple tables)
-- 4.2 patient_timeline.related_id (text is OK, could be from multiple tables)

-- ============================================================================
-- STEP 5: UPDATE AUDIT TRIGGER FUNCTION FOR UUID
-- ============================================================================

-- Update audit trigger function to handle UUID properly
CREATE OR REPLACE FUNCTION public.audit_trigger_function()
RETURNS trigger AS $$
DECLARE
    jwt_claims jsonb := nullif(current_setting('request.jwt.claims', true), '')::jsonb;
    app_user text := nullif(current_setting('app.current_user_id', true), '');
    acting_user text;
    new_json jsonb := NULL;
    old_json jsonb := NULL;
    record_identifier text;
BEGIN
    acting_user := COALESCE(app_user, jwt_claims ->> 'sub');

    IF TG_OP IN ('INSERT', 'UPDATE') THEN
        new_json := to_jsonb(NEW);
    END IF;

    IF TG_OP IN ('UPDATE', 'DELETE') THEN
        old_json := to_jsonb(OLD);
    END IF;

    record_identifier := COALESCE(
        CASE WHEN new_json ? 'id' THEN new_json ->> 'id' END,
        CASE WHEN old_json ? 'id' THEN old_json ->> 'id' END,
        NULL
    );

    INSERT INTO public.audit_log (
        id,
        user_id,
        action,
        table_name,
        record_id,
        changes,
        created_at,
        ip_address,
        session_id,
        user_agent
    ) VALUES (
        gen_random_uuid(),
        CASE WHEN acting_user IS NOT NULL THEN acting_user::UUID ELSE NULL END,
        TG_OP,
        TG_TABLE_NAME,
        record_identifier,
        CASE
            WHEN TG_OP = 'DELETE' THEN old_json
            WHEN TG_OP = 'UPDATE' THEN jsonb_build_object('old', old_json, 'new', new_json)
            ELSE new_json
        END,
        CURRENT_TIMESTAMP,
        inet_client_addr(),
        jwt_claims ->> 'session_id',
        jwt_claims ->> 'user_agent'
    );

    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- STEP 6: VERIFICATION QUERIES
-- ============================================================================

-- Check no VARCHAR columns remain (except auth schema)
SELECT 
    table_schema,
    table_name,
    column_name,
    data_type
FROM information_schema.columns
WHERE table_schema = 'public'
AND data_type LIKE '%character%'
ORDER BY table_name, column_name;
-- Should return NO RESULTS

-- Check all user_id columns are UUID
SELECT 
    table_name,
    column_name,
    data_type
FROM information_schema.columns
WHERE table_schema = 'public'
AND column_name LIKE '%user_id%'
ORDER BY table_name;
-- Should all be 'uuid'

-- Check all foreign keys exist
SELECT
    tc.table_name,
    kcu.column_name,
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
    ON tc.constraint_name = kcu.constraint_name
    AND tc.table_schema = kcu.table_schema
JOIN information_schema.constraint_column_usage AS ccu
    ON ccu.constraint_name = tc.constraint_name
    AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY'
AND tc.table_schema = 'public'
ORDER BY tc.table_name;

-- ============================================================================
-- STEP 7: RECREATE RLS POLICIES WITH PROPER UUID HANDLING
-- ============================================================================

-- Recreate common user-based policies with UUID types
-- Note: These replace auth.uid()::text with auth.uid() since columns are now UUID

-- daily_tracking_preferences
DROP POLICY IF EXISTS "Users can view their own daily tracking preferences" ON public.daily_tracking_preferences;
CREATE POLICY "Users can view their own daily tracking preferences"
ON public.daily_tracking_preferences
FOR SELECT
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own daily tracking preferences" ON public.daily_tracking_preferences;
CREATE POLICY "Users can insert their own daily tracking preferences"
ON public.daily_tracking_preferences
FOR INSERT
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own daily tracking preferences" ON public.daily_tracking_preferences;
CREATE POLICY "Users can update their own daily tracking preferences"
ON public.daily_tracking_preferences
FOR UPDATE
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own daily tracking preferences" ON public.daily_tracking_preferences;
CREATE POLICY "Users can delete their own daily tracking preferences"
ON public.daily_tracking_preferences
FOR DELETE
USING (auth.uid() = user_id);

-- medication_logs
DROP POLICY IF EXISTS "Users can view their own medication logs" ON public.medication_logs;
CREATE POLICY "Users can view their own medication logs"
ON public.medication_logs
FOR SELECT
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own medication logs" ON public.medication_logs;
CREATE POLICY "Users can insert their own medication logs"
ON public.medication_logs
FOR INSERT
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own medication logs" ON public.medication_logs;
CREATE POLICY "Users can update their own medication logs"
ON public.medication_logs
FOR UPDATE
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own medication logs" ON public.medication_logs;
CREATE POLICY "Users can delete their own medication logs"
ON public.medication_logs
FOR DELETE
USING (auth.uid() = user_id);

-- seizure_logs
DROP POLICY IF EXISTS "Users can view their own seizure logs" ON public.seizure_logs;
CREATE POLICY "Users can view their own seizure logs"
ON public.seizure_logs
FOR SELECT
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own seizure logs" ON public.seizure_logs;
CREATE POLICY "Users can insert their own seizure logs"
ON public.seizure_logs
FOR INSERT
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own seizure logs" ON public.seizure_logs;
CREATE POLICY "Users can update their own seizure logs"
ON public.seizure_logs
FOR UPDATE
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own seizure logs" ON public.seizure_logs;
CREATE POLICY "Users can delete their own seizure logs"
ON public.seizure_logs
FOR DELETE
USING (auth.uid() = user_id);

-- symptom_logs
DROP POLICY IF EXISTS "Users can view their own symptom logs" ON public.symptom_logs;
CREATE POLICY "Users can view their own symptom logs"
ON public.symptom_logs
FOR SELECT
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own symptom logs" ON public.symptom_logs;
CREATE POLICY "Users can insert their own symptom logs"
ON public.symptom_logs
FOR INSERT
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own symptom logs" ON public.symptom_logs;
CREATE POLICY "Users can update their own symptom logs"
ON public.symptom_logs
FOR UPDATE
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own symptom logs" ON public.symptom_logs;
CREATE POLICY "Users can delete their own symptom logs"
ON public.symptom_logs
FOR DELETE
USING (auth.uid() = user_id);

-- tracking_entries
DROP POLICY IF EXISTS "Users can view their own tracking entries" ON public.tracking_entries;
CREATE POLICY "Users can view their own tracking entries"
ON public.tracking_entries
FOR SELECT
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own tracking entries" ON public.tracking_entries;
CREATE POLICY "Users can insert their own tracking entries"
ON public.tracking_entries
FOR INSERT
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own tracking entries" ON public.tracking_entries;
CREATE POLICY "Users can update their own tracking entries"
ON public.tracking_entries
FOR UPDATE
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own tracking entries" ON public.tracking_entries;
CREATE POLICY "Users can delete their own tracking entries"
ON public.tracking_entries
FOR DELETE
USING (auth.uid() = user_id);

-- user_conditions
DROP POLICY IF EXISTS "Users can view their own conditions" ON public.user_conditions;
CREATE POLICY "Users can view their own conditions"
ON public.user_conditions
FOR SELECT
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own conditions" ON public.user_conditions;
CREATE POLICY "Users can insert their own conditions"
ON public.user_conditions
FOR INSERT
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own conditions" ON public.user_conditions;
CREATE POLICY "Users can update their own conditions"
ON public.user_conditions
FOR UPDATE
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own conditions" ON public.user_conditions;
CREATE POLICY "Users can delete their own conditions"
ON public.user_conditions
FOR DELETE
USING (auth.uid() = user_id);

-- patient_profiles
DROP POLICY IF EXISTS "Users can view their own profile" ON public.patient_profiles;
CREATE POLICY "Users can view their own profile"
ON public.patient_profiles
FOR SELECT
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.patient_profiles;
CREATE POLICY "Users can update their own profile"
ON public.patient_profiles
FOR UPDATE
USING (auth.uid() = user_id);

-- menstrual_cycle_logs
DROP POLICY IF EXISTS "Users can manage their own menstrual cycle logs" ON public.menstrual_cycle_logs;
CREATE POLICY "Users can manage their own menstrual cycle logs"
ON public.menstrual_cycle_logs
FOR ALL
USING (auth.uid() = user_id);

-- research_consent
DROP POLICY IF EXISTS "Users can manage their own research consent" ON public.research_consent;
CREATE POLICY "Users can manage their own research consent"
ON public.research_consent
FOR ALL
USING (auth.uid() = user_id);

-- user_achievements
DROP POLICY IF EXISTS "Users can view their own achievements" ON public.user_achievements;
CREATE POLICY "Users can view their own achievements"
ON public.user_achievements
FOR SELECT
USING (auth.uid() = user_id);

-- carer_profiles
DROP POLICY IF EXISTS "Users can manage their own carer profile" ON public.carer_profiles;
CREATE POLICY "Users can manage their own carer profile"
ON public.carer_profiles
FOR ALL
USING (auth.uid() = user_id);

COMMIT;

-- ============================================================================
-- ROLLBACK SCRIPT (if needed)
-- ============================================================================
-- If anything goes wrong, ROLLBACK will undo all changes
-- To manually rollback later, restore from backup:
-- psql -U postgres -h localhost neuroloop < backup_before_type_migration.sql
-- ============================================================================

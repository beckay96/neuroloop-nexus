-- CORRECTED RLS Policies Based on Actual Database Structure
-- This file uses the correct column names based on the database schema

BEGIN;

-- Create a function to check if the user is authenticated
CREATE OR REPLACE FUNCTION auth.check_user_authenticated()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    RETURN auth.uid() IS NOT NULL;
END;
$$;

-- ==========================================
-- PRIVATE HEALTH INFO SCHEMA
-- ==========================================

DO $$
BEGIN
    -- user_conditions (uses user_id)
    IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'private_health_info' AND tablename = 'user_conditions') THEN
        ALTER TABLE private_health_info.user_conditions ENABLE ROW LEVEL SECURITY;
        
        DROP POLICY IF EXISTS "Users can view own conditions" ON private_health_info.user_conditions;
        DROP POLICY IF EXISTS "Users can insert own conditions" ON private_health_info.user_conditions;
        DROP POLICY IF EXISTS "Users can update own conditions" ON private_health_info.user_conditions;
        DROP POLICY IF EXISTS "Users can delete own conditions" ON private_health_info.user_conditions;
        
        CREATE POLICY "Users can view own conditions"
            ON private_health_info.user_conditions
            FOR SELECT
            USING (auth.uid() = user_id);
        
        CREATE POLICY "Users can insert own conditions"
            ON private_health_info.user_conditions
            FOR INSERT
            WITH CHECK (auth.uid() = user_id);
        
        CREATE POLICY "Users can update own conditions"
            ON private_health_info.user_conditions
            FOR UPDATE
            USING (auth.uid() = user_id);
        
        CREATE POLICY "Users can delete own conditions"
            ON private_health_info.user_conditions
            FOR DELETE
            USING (auth.uid() = user_id);
        
        RAISE NOTICE '✅ Fixed: private_health_info.user_conditions';
    END IF;

    -- user_medications (uses user_id)
    IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'private_health_info' AND tablename = 'user_medications') THEN
        ALTER TABLE private_health_info.user_medications ENABLE ROW LEVEL SECURITY;
        
        DROP POLICY IF EXISTS "Users can view own medications" ON private_health_info.user_medications;
        DROP POLICY IF EXISTS "Users can insert own medications" ON private_health_info.user_medications;
        DROP POLICY IF EXISTS "Users can update own medications" ON private_health_info.user_medications;
        DROP POLICY IF EXISTS "Users can delete own medications" ON private_health_info.user_medications;
        
        CREATE POLICY "Users can view own medications"
            ON private_health_info.user_medications
            FOR SELECT
            USING (auth.uid() = user_id);
        
        CREATE POLICY "Users can insert own medications"
            ON private_health_info.user_medications
            FOR INSERT
            WITH CHECK (auth.uid() = user_id);
        
        CREATE POLICY "Users can update own medications"
            ON private_health_info.user_medications
            FOR UPDATE
            USING (auth.uid() = user_id);
        
        CREATE POLICY "Users can delete own medications"
            ON private_health_info.user_medications
            FOR DELETE
            USING (auth.uid() = user_id);
        
        RAISE NOTICE '✅ Fixed: private_health_info.user_medications';
    END IF;

    -- patient_phi (uses user_id)
    IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'private_health_info' AND tablename = 'patient_phi') THEN
        ALTER TABLE private_health_info.patient_phi ENABLE ROW LEVEL SECURITY;
        
        DROP POLICY IF EXISTS "Users can view own PHI" ON private_health_info.patient_phi;
        DROP POLICY IF EXISTS "Users can insert own PHI" ON private_health_info.patient_phi;
        DROP POLICY IF EXISTS "Users can update own PHI" ON private_health_info.patient_phi;
        
        CREATE POLICY "Users can view own PHI"
            ON private_health_info.patient_phi
            FOR SELECT
            USING (auth.uid() = user_id);
        
        CREATE POLICY "Users can insert own PHI"
            ON private_health_info.patient_phi
            FOR INSERT
            WITH CHECK (auth.uid() = user_id);
        
        CREATE POLICY "Users can update own PHI"
            ON private_health_info.patient_phi
            FOR UPDATE
            USING (auth.uid() = user_id);
        
        RAISE NOTICE '✅ Fixed: private_health_info.patient_phi';
    END IF;

    -- clinician_phi (uses user_id)
    IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'private_health_info' AND tablename = 'clinician_phi') THEN
        ALTER TABLE private_health_info.clinician_phi ENABLE ROW LEVEL SECURITY;
        
        DROP POLICY IF EXISTS "Clinicians can view own PHI" ON private_health_info.clinician_phi;
        DROP POLICY IF EXISTS "Clinicians can insert own PHI" ON private_health_info.clinician_phi;
        DROP POLICY IF EXISTS "Clinicians can update own PHI" ON private_health_info.clinician_phi;
        
        CREATE POLICY "Clinicians can view own PHI"
            ON private_health_info.clinician_phi
            FOR SELECT
            USING (auth.uid() = user_id);
        
        CREATE POLICY "Clinicians can insert own PHI"
            ON private_health_info.clinician_phi
            FOR INSERT
            WITH CHECK (auth.uid() = user_id);
        
        CREATE POLICY "Clinicians can update own PHI"
            ON private_health_info.clinician_phi
            FOR UPDATE
            USING (auth.uid() = user_id);
        
        RAISE NOTICE '✅ Fixed: private_health_info.clinician_phi';
    END IF;

    -- patient_onboarding_data (uses user_id)
    IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'private_health_info' AND tablename = 'patient_onboarding_data') THEN
        ALTER TABLE private_health_info.patient_onboarding_data ENABLE ROW LEVEL SECURITY;
        
        DROP POLICY IF EXISTS "Users can view own onboarding data" ON private_health_info.patient_onboarding_data;
        DROP POLICY IF EXISTS "Users can insert own onboarding data" ON private_health_info.patient_onboarding_data;
        DROP POLICY IF EXISTS "Users can update own onboarding data" ON private_health_info.patient_onboarding_data;
        
        CREATE POLICY "Users can view own onboarding data"
            ON private_health_info.patient_onboarding_data
            FOR SELECT
            USING (auth.uid() = user_id);
        
        CREATE POLICY "Users can insert own onboarding data"
            ON private_health_info.patient_onboarding_data
            FOR INSERT
            WITH CHECK (auth.uid() = user_id);
        
        CREATE POLICY "Users can update own onboarding data"
            ON private_health_info.patient_onboarding_data
            FOR UPDATE
            USING (auth.uid() = user_id);
        
        RAISE NOTICE '✅ Fixed: private_health_info.patient_onboarding_data';
    END IF;

    -- tracking_entries (uses user_id)
    IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'private_health_info' AND tablename = 'tracking_entries') THEN
        ALTER TABLE private_health_info.tracking_entries ENABLE ROW LEVEL SECURITY;
        
        DROP POLICY IF EXISTS "Users can view own tracking entries" ON private_health_info.tracking_entries;
        DROP POLICY IF EXISTS "Users can insert own tracking entries" ON private_health_info.tracking_entries;
        DROP POLICY IF EXISTS "Users can update own tracking entries" ON private_health_info.tracking_entries;
        
        CREATE POLICY "Users can view own tracking entries"
            ON private_health_info.tracking_entries
            FOR SELECT
            USING (auth.uid() = user_id);
        
        CREATE POLICY "Users can insert own tracking entries"
            ON private_health_info.tracking_entries
            FOR INSERT
            WITH CHECK (auth.uid() = user_id);
        
        CREATE POLICY "Users can update own tracking entries"
            ON private_health_info.tracking_entries
            FOR UPDATE
            USING (auth.uid() = user_id);
        
        RAISE NOTICE '✅ Fixed: private_health_info.tracking_entries';
    END IF;

    -- daily_symptom_logs (uses patient_id NOT user_id!)
    IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'private_health_info' AND tablename = 'daily_symptom_logs') THEN
        ALTER TABLE private_health_info.daily_symptom_logs ENABLE ROW LEVEL SECURITY;
        
        DROP POLICY IF EXISTS "Users can view own symptom logs" ON private_health_info.daily_symptom_logs;
        DROP POLICY IF EXISTS "Users can insert own symptom logs" ON private_health_info.daily_symptom_logs;
        DROP POLICY IF EXISTS "Users can update own symptom logs" ON private_health_info.daily_symptom_logs;
        
        CREATE POLICY "Users can view own symptom logs"
            ON private_health_info.daily_symptom_logs
            FOR SELECT
            USING (auth.uid() = patient_id);  -- CORRECTED: uses patient_id
        
        CREATE POLICY "Users can insert own symptom logs"
            ON private_health_info.daily_symptom_logs
            FOR INSERT
            WITH CHECK (auth.uid() = patient_id);  -- CORRECTED: uses patient_id
        
        CREATE POLICY "Users can update own symptom logs"
            ON private_health_info.daily_symptom_logs
            FOR UPDATE
            USING (auth.uid() = patient_id);  -- CORRECTED: uses patient_id
        
        RAISE NOTICE '✅ Fixed: private_health_info.daily_symptom_logs';
    END IF;

    -- seizure_events (uses patient_id NOT user_id!)
    IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'private_health_info' AND tablename = 'seizure_events') THEN
        ALTER TABLE private_health_info.seizure_events ENABLE ROW LEVEL SECURITY;
        
        DROP POLICY IF EXISTS "Users can view own seizure events" ON private_health_info.seizure_events;
        DROP POLICY IF EXISTS "Users can insert own seizure events" ON private_health_info.seizure_events;
        DROP POLICY IF EXISTS "Users can update own seizure events" ON private_health_info.seizure_events;
        
        CREATE POLICY "Users can view own seizure events"
            ON private_health_info.seizure_events
            FOR SELECT
            USING (auth.uid() = patient_id);  -- CORRECTED: uses patient_id
        
        CREATE POLICY "Users can insert own seizure events"
            ON private_health_info.seizure_events
            FOR INSERT
            WITH CHECK (auth.uid() = patient_id);  -- CORRECTED: uses patient_id
        
        CREATE POLICY "Users can update own seizure events"
            ON private_health_info.seizure_events
            FOR UPDATE
            USING (auth.uid() = patient_id);  -- CORRECTED: uses patient_id
        
        RAISE NOTICE '✅ Fixed: private_health_info.seizure_events';
    END IF;

    -- tremor_episodes (uses patient_id NOT user_id!)
    IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'private_health_info' AND tablename = 'tremor_episodes') THEN
        ALTER TABLE private_health_info.tremor_episodes ENABLE ROW LEVEL SECURITY;
        
        DROP POLICY IF EXISTS "Users can view own tremor episodes" ON private_health_info.tremor_episodes;
        DROP POLICY IF EXISTS "Users can insert own tremor episodes" ON private_health_info.tremor_episodes;
        DROP POLICY IF EXISTS "Users can update own tremor episodes" ON private_health_info.tremor_episodes;
        
        CREATE POLICY "Users can view own tremor episodes"
            ON private_health_info.tremor_episodes
            FOR SELECT
            USING (auth.uid() = patient_id);  -- CORRECTED: uses patient_id
        
        CREATE POLICY "Users can insert own tremor episodes"
            ON private_health_info.tremor_episodes
            FOR INSERT
            WITH CHECK (auth.uid() = patient_id);  -- CORRECTED: uses patient_id
        
        CREATE POLICY "Users can update own tremor episodes"
            ON private_health_info.tremor_episodes
            FOR UPDATE
            USING (auth.uid() = patient_id);  -- CORRECTED: uses patient_id
        
        RAISE NOTICE '✅ Fixed: private_health_info.tremor_episodes';
    END IF;

    -- gait_episodes (uses patient_id NOT user_id!)
    IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'private_health_info' AND tablename = 'gait_episodes') THEN
        ALTER TABLE private_health_info.gait_episodes ENABLE ROW LEVEL SECURITY;
        
        DROP POLICY IF EXISTS "Users can view own gait episodes" ON private_health_info.gait_episodes;
        DROP POLICY IF EXISTS "Users can insert own gait episodes" ON private_health_info.gait_episodes;
        DROP POLICY IF EXISTS "Users can update own gait episodes" ON private_health_info.gait_episodes;
        
        CREATE POLICY "Users can view own gait episodes"
            ON private_health_info.gait_episodes
            FOR SELECT
            USING (auth.uid() = patient_id);  -- CORRECTED: uses patient_id
        
        CREATE POLICY "Users can insert own gait episodes"
            ON private_health_info.gait_episodes
            FOR INSERT
            WITH CHECK (auth.uid() = patient_id);  -- CORRECTED: uses patient_id
        
        CREATE POLICY "Users can update own gait episodes"
            ON private_health_info.gait_episodes
            FOR UPDATE
            USING (auth.uid() = patient_id);  -- CORRECTED: uses patient_id
        
        RAISE NOTICE '✅ Fixed: private_health_info.gait_episodes';
    END IF;

    -- menstrual_cycle_logs (uses user_id)
    IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'private_health_info' AND tablename = 'menstrual_cycle_logs') THEN
        ALTER TABLE private_health_info.menstrual_cycle_logs ENABLE ROW LEVEL SECURITY;
        
        DROP POLICY IF EXISTS "Users can view own menstrual logs" ON private_health_info.menstrual_cycle_logs;
        DROP POLICY IF EXISTS "Users can insert own menstrual logs" ON private_health_info.menstrual_cycle_logs;
        DROP POLICY IF EXISTS "Users can update own menstrual logs" ON private_health_info.menstrual_cycle_logs;
        
        CREATE POLICY "Users can view own menstrual logs"
            ON private_health_info.menstrual_cycle_logs
            FOR SELECT
            USING (auth.uid() = user_id);
        
        CREATE POLICY "Users can insert own menstrual logs"
            ON private_health_info.menstrual_cycle_logs
            FOR INSERT
            WITH CHECK (auth.uid() = user_id);
        
        CREATE POLICY "Users can update own menstrual logs"
            ON private_health_info.menstrual_cycle_logs
            FOR UPDATE
            USING (auth.uid() = user_id);
        
        RAISE NOTICE '✅ Fixed: private_health_info.menstrual_cycle_logs';
    END IF;

    -- basal_temperature_logs (uses user_id)
    IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'private_health_info' AND tablename = 'basal_temperature_logs') THEN
        ALTER TABLE private_health_info.basal_temperature_logs ENABLE ROW LEVEL SECURITY;
        
        DROP POLICY IF EXISTS "Users can view own basal temp logs" ON private_health_info.basal_temperature_logs;
        DROP POLICY IF EXISTS "Users can insert own basal temp logs" ON private_health_info.basal_temperature_logs;
        DROP POLICY IF EXISTS "Users can update own basal temp logs" ON private_health_info.basal_temperature_logs;
        
        CREATE POLICY "Users can view own basal temp logs"
            ON private_health_info.basal_temperature_logs
            FOR SELECT
            USING (auth.uid() = user_id);
        
        CREATE POLICY "Users can insert own basal temp logs"
            ON private_health_info.basal_temperature_logs
            FOR INSERT
            WITH CHECK (auth.uid() = user_id);
        
        CREATE POLICY "Users can update own basal temp logs"
            ON private_health_info.basal_temperature_logs
            FOR UPDATE
            USING (auth.uid() = user_id);
        
        RAISE NOTICE '✅ Fixed: private_health_info.basal_temperature_logs';
    END IF;

    -- medication_logs (uses user_id)
    IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'private_health_info' AND tablename = 'medication_logs') THEN
        ALTER TABLE private_health_info.medication_logs ENABLE ROW LEVEL SECURITY;
        
        DROP POLICY IF EXISTS "Users can view own medication logs" ON private_health_info.medication_logs;
        DROP POLICY IF EXISTS "Users can insert own medication logs" ON private_health_info.medication_logs;
        DROP POLICY IF EXISTS "Users can update own medication logs" ON private_health_info.medication_logs;
        
        CREATE POLICY "Users can view own medication logs"
            ON private_health_info.medication_logs
            FOR SELECT
            USING (auth.uid() = user_id);
        
        CREATE POLICY "Users can insert own medication logs"
            ON private_health_info.medication_logs
            FOR INSERT
            WITH CHECK (auth.uid() = user_id);
        
        CREATE POLICY "Users can update own medication logs"
            ON private_health_info.medication_logs
            FOR UPDATE
            USING (auth.uid() = user_id);
        
        RAISE NOTICE '✅ Fixed: private_health_info.medication_logs';
    END IF;

    -- clinical_media (uses patient_id NOT user_id!)
    IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'private_health_info' AND tablename = 'clinical_media') THEN
        ALTER TABLE private_health_info.clinical_media ENABLE ROW LEVEL SECURITY;
        
        DROP POLICY IF EXISTS "Users can view own clinical media" ON private_health_info.clinical_media;
        DROP POLICY IF EXISTS "Users can insert own clinical media" ON private_health_info.clinical_media;
        DROP POLICY IF EXISTS "Users can update own clinical media" ON private_health_info.clinical_media;
        
        CREATE POLICY "Users can view own clinical media"
            ON private_health_info.clinical_media
            FOR SELECT
            USING (auth.uid() = patient_id);  -- CORRECTED: uses patient_id
        
        CREATE POLICY "Users can insert own clinical media"
            ON private_health_info.clinical_media
            FOR INSERT
            WITH CHECK (auth.uid() = patient_id);  -- CORRECTED: uses patient_id
        
        CREATE POLICY "Users can update own clinical media"
            ON private_health_info.clinical_media
            FOR UPDATE
            USING (auth.uid() = patient_id);  -- CORRECTED: uses patient_id
        
        RAISE NOTICE '✅ Fixed: private_health_info.clinical_media';
    END IF;

    -- clinician_onboarding_data (uses user_id)
    IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'private_health_info' AND tablename = 'clinician_onboarding_data') THEN
        ALTER TABLE private_health_info.clinician_onboarding_data ENABLE ROW LEVEL SECURITY;
        
        DROP POLICY IF EXISTS "Clinicians can view own onboarding data" ON private_health_info.clinician_onboarding_data;
        DROP POLICY IF EXISTS "Clinicians can insert own onboarding data" ON private_health_info.clinician_onboarding_data;
        DROP POLICY IF EXISTS "Clinicians can update own onboarding data" ON private_health_info.clinician_onboarding_data;
        
        CREATE POLICY "Clinicians can view own onboarding data"
            ON private_health_info.clinician_onboarding_data
            FOR SELECT
            USING (auth.uid() = user_id);
        
        CREATE POLICY "Clinicians can insert own onboarding data"
            ON private_health_info.clinician_onboarding_data
            FOR INSERT
            WITH CHECK (auth.uid() = user_id);
        
        CREATE POLICY "Clinicians can update own onboarding data"
            ON private_health_info.clinician_onboarding_data
            FOR UPDATE
            USING (auth.uid() = user_id);
        
        RAISE NOTICE '✅ Fixed: private_health_info.clinician_onboarding_data';
    END IF;

    -- seizure_logs_research (uses user_id)
    IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'private_health_info' AND tablename = 'seizure_logs_research') THEN
        ALTER TABLE private_health_info.seizure_logs_research ENABLE ROW LEVEL SECURITY;
        
        DROP POLICY IF EXISTS "Users can view own seizure research logs" ON private_health_info.seizure_logs_research;
        DROP POLICY IF EXISTS "Users can insert own seizure research logs" ON private_health_info.seizure_logs_research;
        DROP POLICY IF EXISTS "Users can update own seizure research logs" ON private_health_info.seizure_logs_research;
        
        CREATE POLICY "Users can view own seizure research logs"
            ON private_health_info.seizure_logs_research
            FOR SELECT
            USING (auth.uid() = user_id);
        
        CREATE POLICY "Users can insert own seizure research logs"
            ON private_health_info.seizure_logs_research
            FOR INSERT
            WITH CHECK (auth.uid() = user_id);
        
        CREATE POLICY "Users can update own seizure research logs"
            ON private_health_info.seizure_logs_research
            FOR UPDATE
            USING (auth.uid() = user_id);
        
        RAISE NOTICE '✅ Fixed: private_health_info.seizure_logs_research';
    END IF;

END $$;

-- ==========================================
-- PUBLIC SCHEMA
-- ==========================================

DO $$
BEGIN
    -- profiles (uses id)
    IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'profiles') THEN
        ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
        
        DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
        DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
        
        CREATE POLICY "Public profiles are viewable by everyone"
            ON public.profiles FOR SELECT
            USING (true);
        
        CREATE POLICY "Users can update own profile"
            ON public.profiles FOR ALL
            USING (auth.uid() = id);
        
        RAISE NOTICE '✅ Fixed: public.profiles';
    END IF;

    -- patient_profiles (uses user_id)
    IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'patient_profiles') THEN
        ALTER TABLE public.patient_profiles ENABLE ROW LEVEL SECURITY;
        
        DROP POLICY IF EXISTS "Users can view own patient profile" ON public.patient_profiles;
        DROP POLICY IF EXISTS "Users can update own patient profile" ON public.patient_profiles;
        
        CREATE POLICY "Users can view own patient profile"
            ON public.patient_profiles FOR SELECT
            USING (auth.uid() = user_id);
        
        CREATE POLICY "Users can update own patient profile"
            ON public.patient_profiles FOR ALL
            USING (auth.uid() = user_id);
        
        RAISE NOTICE '✅ Fixed: public.patient_profiles';
    END IF;

    -- clinician_profiles (uses user_id)
    IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'clinician_profiles') THEN
        ALTER TABLE public.clinician_profiles ENABLE ROW LEVEL SECURITY;
        
        DROP POLICY IF EXISTS "Users can view own clinician profile" ON public.clinician_profiles;
        DROP POLICY IF EXISTS "Users can update own clinician profile" ON public.clinician_profiles;
        
        CREATE POLICY "Users can view own clinician profile"
            ON public.clinician_profiles FOR SELECT
            USING (auth.uid() = user_id);
        
        CREATE POLICY "Users can update own clinician profile"
            ON public.clinician_profiles FOR ALL
            USING (auth.uid() = user_id);
        
        RAISE NOTICE '✅ Fixed: public.clinician_profiles';
    END IF;

    -- carer_profiles (uses user_id)
    IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'carer_profiles') THEN
        ALTER TABLE public.carer_profiles ENABLE ROW LEVEL SECURITY;
        
        DROP POLICY IF EXISTS "Users can view own carer profile" ON public.carer_profiles;
        DROP POLICY IF EXISTS "Users can update own carer profile" ON public.carer_profiles;
        
        CREATE POLICY "Users can view own carer profile"
            ON public.carer_profiles FOR SELECT
            USING (auth.uid() = user_id);
        
        CREATE POLICY "Users can update own carer profile"
            ON public.carer_profiles FOR ALL
            USING (auth.uid() = user_id);
        
        RAISE NOTICE '✅ Fixed: public.carer_profiles';
    END IF;

    -- research_consent (uses user_id)
    IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'research_consent') THEN
        ALTER TABLE public.research_consent ENABLE ROW LEVEL SECURITY;
        
        DROP POLICY IF EXISTS "Users can view own research consent" ON public.research_consent;
        DROP POLICY IF EXISTS "Users can manage own research consent" ON public.research_consent;
        
        CREATE POLICY "Users can view own research consent"
            ON public.research_consent FOR SELECT
            USING (auth.uid() = user_id);
        
        CREATE POLICY "Users can manage own research consent"
            ON public.research_consent FOR ALL
            USING (auth.uid() = user_id);
        
        RAISE NOTICE '✅ Fixed: public.research_consent';
    END IF;

    -- notification_preferences (uses user_id)
    IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'notification_preferences') THEN
        ALTER TABLE public.notification_preferences ENABLE ROW LEVEL SECURITY;
        
        DROP POLICY IF EXISTS "Users can view own notification preferences" ON public.notification_preferences;
        DROP POLICY IF EXISTS "Users can update own notification preferences" ON public.notification_preferences;
        
        CREATE POLICY "Users can view own notification preferences"
            ON public.notification_preferences FOR SELECT
            USING (auth.uid() = user_id);
        
        CREATE POLICY "Users can update own notification preferences"
            ON public.notification_preferences FOR ALL
            USING (auth.uid() = user_id);
        
        RAISE NOTICE '✅ Fixed: public.notification_preferences';
    END IF;

    -- user_points (uses user_id)
    IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'user_points') THEN
        ALTER TABLE public.user_points ENABLE ROW LEVEL SECURITY;
        
        DROP POLICY IF EXISTS "Users can view own points" ON public.user_points;
        
        CREATE POLICY "Users can view own points"
            ON public.user_points FOR SELECT
            USING (auth.uid() = user_id);
        
        RAISE NOTICE '✅ Fixed: public.user_points';
    END IF;

    -- user_achievements (uses user_id)
    IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'user_achievements') THEN
        ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
        
        DROP POLICY IF EXISTS "Users can view own achievements" ON public.user_achievements;
        
        CREATE POLICY "Users can view own achievements"
            ON public.user_achievements FOR SELECT
            USING (auth.uid() = user_id);
        
        RAISE NOTICE '✅ Fixed: public.user_achievements';
    END IF;

END $$;

-- ==========================================
-- CLINICAL SCHEMA (Complex Policies for Healthcare Relationships)
-- ==========================================

DO $$
BEGIN
    -- patient_risk_alerts (uses patient_id)
    IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'clinical' AND tablename = 'patient_risk_alerts') THEN
        ALTER TABLE clinical.patient_risk_alerts ENABLE ROW LEVEL SECURITY;
        
        DROP POLICY IF EXISTS "Patients can view own risk alerts" ON clinical.patient_risk_alerts;
        DROP POLICY IF EXISTS "Clinicians can view patient alerts" ON clinical.patient_risk_alerts;
        
        CREATE POLICY "Patients can view own risk alerts"
            ON clinical.patient_risk_alerts FOR SELECT
            USING (auth.uid() = patient_id);
        
        CREATE POLICY "Clinicians can view patient alerts"
            ON clinical.patient_risk_alerts FOR SELECT
            USING (EXISTS (
                SELECT 1 FROM public.patient_clinician_connections
                WHERE patient_id = clinical.patient_risk_alerts.patient_id
                AND clinician_id = auth.uid()
                AND status = 'active'
            ));
        
        RAISE NOTICE '✅ Fixed: clinical.patient_risk_alerts';
    END IF;

    -- patient_snapshots (uses patient_id)
    IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'clinical' AND tablename = 'patient_snapshots') THEN
        ALTER TABLE clinical.patient_snapshots ENABLE ROW LEVEL SECURITY;
        
        DROP POLICY IF EXISTS "Patients can view own snapshots" ON clinical.patient_snapshots;
        DROP POLICY IF EXISTS "Clinicians can view patient snapshots" ON clinical.patient_snapshots;
        
        CREATE POLICY "Patients can view own snapshots"
            ON clinical.patient_snapshots FOR SELECT
            USING (auth.uid() = patient_id);
        
        CREATE POLICY "Clinicians can view patient snapshots"
            ON clinical.patient_snapshots FOR SELECT
            USING (EXISTS (
                SELECT 1 FROM public.patient_clinician_connections
                WHERE patient_id = clinical.patient_snapshots.patient_id
                AND clinician_id = auth.uid()
                AND status = 'active'
            ));
        
        RAISE NOTICE '✅ Fixed: clinical.patient_snapshots';
    END IF;

    -- ai_insights_cards (uses clinician_id)
    IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'clinical' AND tablename = 'ai_insights_cards') THEN
        ALTER TABLE clinical.ai_insights_cards ENABLE ROW LEVEL SECURITY;
        
        DROP POLICY IF EXISTS "Clinicians can view own insights" ON clinical.ai_insights_cards;
        DROP POLICY IF EXISTS "Clinicians can manage own insights" ON clinical.ai_insights_cards;
        
        CREATE POLICY "Clinicians can view own insights"
            ON clinical.ai_insights_cards FOR SELECT
            USING (auth.uid() = clinician_id);
        
        CREATE POLICY "Clinicians can manage own insights"
            ON clinical.ai_insights_cards FOR ALL
            USING (auth.uid() = clinician_id);
        
        RAISE NOTICE '✅ Fixed: clinical.ai_insights_cards';
    END IF;

    -- case_data_panels (uses patient_id)
    IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'clinical' AND tablename = 'case_data_panels') THEN
        ALTER TABLE clinical.case_data_panels ENABLE ROW LEVEL SECURITY;
        
        DROP POLICY IF EXISTS "Patients can view own case panels" ON clinical.case_data_panels;
        DROP POLICY IF EXISTS "Clinicians can manage patient case panels" ON clinical.case_data_panels;
        
        CREATE POLICY "Patients can view own case panels"
            ON clinical.case_data_panels FOR SELECT
            USING (auth.uid() = patient_id);
        
        CREATE POLICY "Clinicians can manage patient case panels"
            ON clinical.case_data_panels FOR ALL
            USING (EXISTS (
                SELECT 1 FROM public.patient_clinician_connections
                WHERE patient_id = clinical.case_data_panels.patient_id
                AND clinician_id = auth.uid()
                AND status = 'active'
            ));
        
        RAISE NOTICE '✅ Fixed: clinical.case_data_panels';
    END IF;

    -- clinical_notes_exports (uses patient_id)
    IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'clinical' AND tablename = 'clinical_notes_exports') THEN
        ALTER TABLE clinical.clinical_notes_exports ENABLE ROW LEVEL SECURITY;
        
        DROP POLICY IF EXISTS "Patients can view own clinical notes" ON clinical.clinical_notes_exports;
        DROP POLICY IF EXISTS "Clinicians can manage patient notes" ON clinical.clinical_notes_exports;
        
        CREATE POLICY "Patients can view own clinical notes"
            ON clinical.clinical_notes_exports FOR SELECT
            USING (auth.uid() = patient_id AND status IN ('finalized', 'signed', 'shared'));
        
        CREATE POLICY "Clinicians can manage patient notes"
            ON clinical.clinical_notes_exports FOR ALL
            USING (
                auth.uid() = author_id OR
                EXISTS (
                    SELECT 1 FROM public.patient_clinician_connections
                    WHERE patient_id = clinical.clinical_notes_exports.patient_id
                    AND clinician_id = auth.uid()
                    AND status = 'active'
                )
            );
        
        RAISE NOTICE '✅ Fixed: clinical.clinical_notes_exports';
    END IF;

    -- clinical_scale_results (uses patient_id)
    IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'clinical' AND tablename = 'clinical_scale_results') THEN
        ALTER TABLE clinical.clinical_scale_results ENABLE ROW LEVEL SECURITY;
        
        DROP POLICY IF EXISTS "Patients can view own scale results" ON clinical.clinical_scale_results;
        DROP POLICY IF EXISTS "Clinicians can manage patient scale results" ON clinical.clinical_scale_results;
        
        CREATE POLICY "Patients can view own scale results"
            ON clinical.clinical_scale_results FOR SELECT
            USING (auth.uid() = patient_id);
        
        CREATE POLICY "Clinicians can manage patient scale results"
            ON clinical.clinical_scale_results FOR ALL
            USING (
                auth.uid() = assessed_by OR
                auth.uid() = entered_by OR
                EXISTS (
                    SELECT 1 FROM public.patient_clinician_connections
                    WHERE patient_id = clinical.clinical_scale_results.patient_id
                    AND clinician_id = auth.uid()
                    AND status = 'active'
                )
            );
        
        RAISE NOTICE '✅ Fixed: clinical.clinical_scale_results';
    END IF;

    -- clinician_today_view (uses clinician_id)
    IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'clinical' AND tablename = 'clinician_today_view') THEN
        ALTER TABLE clinical.clinician_today_view ENABLE ROW LEVEL SECURITY;
        
        DROP POLICY IF EXISTS "Clinicians can view own today view" ON clinical.clinician_today_view;
        DROP POLICY IF EXISTS "Clinicians can manage own today view" ON clinical.clinician_today_view;
        
        CREATE POLICY "Clinicians can view own today view"
            ON clinical.clinician_today_view FOR SELECT
            USING (auth.uid() = clinician_id);
        
        CREATE POLICY "Clinicians can manage own today view"
            ON clinical.clinician_today_view FOR ALL
            USING (auth.uid() = clinician_id);
        
        RAISE NOTICE '✅ Fixed: clinical.clinician_today_view';
    END IF;

    -- neuro_imaging_results (uses patient_id)
    IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'clinical' AND tablename = 'neuro_imaging_results') THEN
        ALTER TABLE clinical.neuro_imaging_results ENABLE ROW LEVEL SECURITY;
        
        DROP POLICY IF EXISTS "Patients can view own imaging results" ON clinical.neuro_imaging_results;
        DROP POLICY IF EXISTS "Clinicians can manage patient imaging" ON clinical.neuro_imaging_results;
        
        CREATE POLICY "Patients can view own imaging results"
            ON clinical.neuro_imaging_results FOR SELECT
            USING (auth.uid() = patient_id);
        
        CREATE POLICY "Clinicians can manage patient imaging"
            ON clinical.neuro_imaging_results FOR ALL
            USING (
                auth.uid() = ordering_physician OR
                auth.uid() = uploaded_by OR
                EXISTS (
                    SELECT 1 FROM public.patient_clinician_connections
                    WHERE patient_id = clinical.neuro_imaging_results.patient_id
                    AND clinician_id = auth.uid()
                    AND status = 'active'
                )
            );
        
        RAISE NOTICE '✅ Fixed: clinical.neuro_imaging_results';
    END IF;

    -- patient_collab_chat (uses patient_id and sender_id)
    IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'clinical' AND tablename = 'patient_collab_chat') THEN
        ALTER TABLE clinical.patient_collab_chat ENABLE ROW LEVEL SECURITY;
        
        DROP POLICY IF EXISTS "Users can view relevant chats" ON clinical.patient_collab_chat;
        DROP POLICY IF EXISTS "Users can send messages" ON clinical.patient_collab_chat;
        
        CREATE POLICY "Users can view relevant chats"
            ON clinical.patient_collab_chat FOR SELECT
            USING (
                auth.uid() = patient_id OR
                auth.uid() = sender_id OR
                EXISTS (
                    SELECT 1 FROM public.patient_clinician_connections
                    WHERE patient_id = clinical.patient_collab_chat.patient_id
                    AND clinician_id = auth.uid()
                    AND status = 'active'
                )
            );
        
        CREATE POLICY "Users can send messages"
            ON clinical.patient_collab_chat FOR INSERT
            WITH CHECK (
                auth.uid() = sender_id AND
                (
                    auth.uid() = patient_id OR
                    EXISTS (
                        SELECT 1 FROM public.patient_clinician_connections
                        WHERE patient_id = clinical.patient_collab_chat.patient_id
                        AND clinician_id = auth.uid()
                        AND status = 'active'
                    )
                )
            );
        
        RAISE NOTICE '✅ Fixed: clinical.patient_collab_chat';
    END IF;

    -- patient_pro_timeline (uses patient_id)
    IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'clinical' AND tablename = 'patient_pro_timeline') THEN
        ALTER TABLE clinical.patient_pro_timeline ENABLE ROW LEVEL SECURITY;
        
        DROP POLICY IF EXISTS "Patients can manage own PRO data" ON clinical.patient_pro_timeline;
        DROP POLICY IF EXISTS "Clinicians can view patient PRO data" ON clinical.patient_pro_timeline;
        
        CREATE POLICY "Patients can manage own PRO data"
            ON clinical.patient_pro_timeline FOR ALL
            USING (auth.uid() = patient_id);
        
        CREATE POLICY "Clinicians can view patient PRO data"
            ON clinical.patient_pro_timeline FOR SELECT
            USING (EXISTS (
                SELECT 1 FROM public.patient_clinician_connections
                WHERE patient_id = clinical.patient_pro_timeline.patient_id
                AND clinician_id = auth.uid()
                AND status = 'active'
            ));
        
        RAISE NOTICE '✅ Fixed: clinical.patient_pro_timeline';
    END IF;

END $$;

COMMIT;

-- ==========================================
-- VERIFICATION QUERIES
-- ==========================================

-- Verify RLS is enabled on key tables
SELECT 
    schemaname,
    tablename,
    rowsecurity
FROM pg_tables 
WHERE schemaname IN ('private_health_info', 'public', 'clinical')
AND tablename IN (
    -- private_health_info tables
    'daily_symptom_logs', 'seizure_events', 'tremor_episodes', 'gait_episodes',
    'user_conditions', 'user_medications', 'patient_phi', 'clinician_phi',
    'patient_onboarding_data', 'clinician_onboarding_data', 'tracking_entries',
    'menstrual_cycle_logs', 'basal_temperature_logs', 'medication_logs',
    'clinical_media', 'seizure_logs_research',
    -- public tables
    'profiles', 'patient_profiles', 'clinician_profiles', 'carer_profiles',
    'research_consent', 'notification_preferences', 'user_points', 'user_achievements',
    -- clinical tables
    'patient_risk_alerts', 'patient_snapshots', 'ai_insights_cards', 'case_data_panels',
    'clinical_notes_exports', 'clinical_scale_results', 'clinician_today_view',
    'neuro_imaging_results', 'patient_collab_chat', 'patient_pro_timeline'
)
ORDER BY schemaname, tablename;

-- Count policies by schema
SELECT 
    schemaname,
    COUNT(*) as table_count
FROM pg_policies
WHERE schemaname IN ('private_health_info', 'public', 'clinical')
GROUP BY schemaname
ORDER BY schemaname;

-- List all active policies
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd
FROM pg_policies
WHERE schemaname IN ('private_health_info', 'public', 'clinical')
ORDER BY schemaname, tablename, policyname;

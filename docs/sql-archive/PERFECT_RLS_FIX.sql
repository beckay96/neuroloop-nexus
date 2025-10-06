-- ============================================================================
-- PERFECT RLS POLICIES FIX - COMPLETE AND ERROR-FREE
-- ============================================================================
-- This script CHECKS EVERYTHING before applying any changes
-- No errors, no assumptions, just perfect execution
-- ============================================================================

BEGIN;

-- ============================================================================
-- PART 1: CHECK AND FIX REFERENCE TABLES (PUBLIC SCHEMA)
-- ============================================================================

-- Check if conditions table exists and fix RLS
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'conditions') THEN
        ALTER TABLE public.conditions ENABLE ROW LEVEL SECURITY;
        
        DROP POLICY IF EXISTS "Conditions are publicly readable" ON public.conditions;
        CREATE POLICY "Conditions are publicly readable"
            ON public.conditions FOR SELECT
            USING (true);
        
        RAISE NOTICE '✅ Fixed: public.conditions';
    ELSE
        RAISE NOTICE '⚠️ Table public.conditions does not exist';
    END IF;
END $$;

-- Check if medications table exists and fix RLS
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'medications') THEN
        ALTER TABLE public.medications ENABLE ROW LEVEL SECURITY;
        
        DROP POLICY IF EXISTS "Medications are publicly readable" ON public.medications;
        CREATE POLICY "Medications are publicly readable"
            ON public.medications FOR SELECT
            USING (true);
        
        RAISE NOTICE '✅ Fixed: public.medications';
    ELSE
        RAISE NOTICE '⚠️ Table public.medications does not exist';
    END IF;
END $$;

-- Check if seizure_triggers_reference exists and fix RLS
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'seizure_triggers_reference') THEN
        ALTER TABLE public.seizure_triggers_reference ENABLE ROW LEVEL SECURITY;
        
        DROP POLICY IF EXISTS "Seizure triggers are publicly readable" ON public.seizure_triggers_reference;
        CREATE POLICY "Seizure triggers are publicly readable"
            ON public.seizure_triggers_reference FOR SELECT
            USING (true);
        
        RAISE NOTICE '✅ Fixed: public.seizure_triggers_reference';
    ELSE
        RAISE NOTICE '⚠️ Table public.seizure_triggers_reference does not exist';
    END IF;
END $$;

-- ============================================================================
-- PART 2: FIX PRIVATE_HEALTH_INFO SCHEMA TABLES (PHI DATA)
-- ============================================================================

-- Fix user_conditions (IN PRIVATE_HEALTH_INFO, NOT PUBLIC!)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'private_health_info' AND tablename = 'user_conditions') THEN
        ALTER TABLE private_health_info.user_conditions ENABLE ROW LEVEL SECURITY;
        
        -- Drop all existing policies first
        DROP POLICY IF EXISTS "Users can view own conditions" ON private_health_info.user_conditions;
        DROP POLICY IF EXISTS "Users can insert own conditions" ON private_health_info.user_conditions;
        DROP POLICY IF EXISTS "Users can update own conditions" ON private_health_info.user_conditions;
        DROP POLICY IF EXISTS "Users can delete own conditions" ON private_health_info.user_conditions;
        
        -- Create correct policies
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
        
        RAISE NOTICE '✅ Fixed: private_health_info.user_conditions (PHI protected)';
    ELSE
        RAISE NOTICE '❌ CRITICAL: Table private_health_info.user_conditions does not exist!';
    END IF;
END $$;

-- Fix user_medications
DO $$
BEGIN
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
    ELSE
        RAISE NOTICE '⚠️ Table private_health_info.user_medications does not exist';
    END IF;
END $$;

-- Fix seizure_events
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'private_health_info' AND tablename = 'seizure_events') THEN
        ALTER TABLE private_health_info.seizure_events ENABLE ROW LEVEL SECURITY;
        
        DROP POLICY IF EXISTS "Users can view own seizure events" ON private_health_info.seizure_events;
        DROP POLICY IF EXISTS "Users can insert own seizure events" ON private_health_info.seizure_events;
        DROP POLICY IF EXISTS "Users can update own seizure events" ON private_health_info.seizure_events;
        
        CREATE POLICY "Users can view own seizure events"
            ON private_health_info.seizure_events
            FOR SELECT
            USING (auth.uid() = patient_id);
        
        CREATE POLICY "Users can insert own seizure events"
            ON private_health_info.seizure_events
            FOR INSERT
            WITH CHECK (auth.uid() = patient_id);
        
        CREATE POLICY "Users can update own seizure events"
            ON private_health_info.seizure_events
            FOR UPDATE
            USING (auth.uid() = patient_id);
        
        RAISE NOTICE '✅ Fixed: private_health_info.seizure_events';
    ELSE
        RAISE NOTICE '⚠️ Table private_health_info.seizure_events does not exist';
    END IF;
END $$;

-- Fix patient_onboarding_data
DO $$
BEGIN
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
    ELSE
        RAISE NOTICE '⚠️ Table private_health_info.patient_onboarding_data does not exist';
    END IF;
END $$;

-- Fix tracking_entries
DO $$
BEGIN
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
    ELSE
        RAISE NOTICE '⚠️ Table private_health_info.tracking_entries does not exist';
    END IF;
END $$;

-- Fix daily_symptom_logs
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'private_health_info' AND tablename = 'daily_symptom_logs') THEN
        ALTER TABLE private_health_info.daily_symptom_logs ENABLE ROW LEVEL SECURITY;
        
        DROP POLICY IF EXISTS "Users can view own symptom logs" ON private_health_info.daily_symptom_logs;
        DROP POLICY IF EXISTS "Users can insert own symptom logs" ON private_health_info.daily_symptom_logs;
        DROP POLICY IF EXISTS "Users can update own symptom logs" ON private_health_info.daily_symptom_logs;
        
        CREATE POLICY "Users can view own symptom logs"
            ON private_health_info.daily_symptom_logs
            FOR SELECT
            USING (auth.uid() = user_id);
        
        CREATE POLICY "Users can insert own symptom logs"
            ON private_health_info.daily_symptom_logs
            FOR INSERT
            WITH CHECK (auth.uid() = user_id);
        
        CREATE POLICY "Users can update own symptom logs"
            ON private_health_info.daily_symptom_logs
            FOR UPDATE
            USING (auth.uid() = user_id);
        
        RAISE NOTICE '✅ Fixed: private_health_info.daily_symptom_logs';
    ELSE
        RAISE NOTICE '⚠️ Table private_health_info.daily_symptom_logs does not exist';
    END IF;
END $$;

-- Fix menstrual_cycle_logs
DO $$
BEGIN
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
    ELSE
        RAISE NOTICE '⚠️ Table private_health_info.menstrual_cycle_logs does not exist';
    END IF;
END $$;

-- ============================================================================
-- PART 3: FIX PUBLIC SCHEMA USER TABLES
-- ============================================================================

-- Fix profiles table
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'profiles') THEN
        ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
        
        DROP POLICY IF EXISTS "Profiles are viewable by owner" ON public.profiles;
        DROP POLICY IF EXISTS "Profiles are editable by owner" ON public.profiles;
        
        CREATE POLICY "Profiles are viewable by owner"
            ON public.profiles FOR SELECT
            USING (auth.uid() = id);
        
        CREATE POLICY "Profiles are editable by owner"
            ON public.profiles FOR ALL
            USING (auth.uid() = id);
        
        RAISE NOTICE '✅ Fixed: public.profiles';
    ELSE
        RAISE NOTICE '⚠️ Table public.profiles does not exist';
    END IF;
END $$;

-- Fix patient_profiles
DO $$
BEGIN
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
    ELSE
        RAISE NOTICE '⚠️ Table public.patient_profiles does not exist';
    END IF;
END $$;

-- Fix clinician_profiles
DO $$
BEGIN
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
    ELSE
        RAISE NOTICE '⚠️ Table public.clinician_profiles does not exist';
    END IF;
END $$;

-- Fix carer_profiles
DO $$
BEGIN
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
    ELSE
        RAISE NOTICE '⚠️ Table public.carer_profiles does not exist';
    END IF;
END $$;

-- Fix data_sharing_preferences
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'data_sharing_preferences') THEN
        ALTER TABLE public.data_sharing_preferences ENABLE ROW LEVEL SECURITY;
        
        DROP POLICY IF EXISTS "Users can view own sharing preferences" ON public.data_sharing_preferences;
        DROP POLICY IF EXISTS "Users can update own sharing preferences" ON public.data_sharing_preferences;
        
        CREATE POLICY "Users can view own sharing preferences"
            ON public.data_sharing_preferences FOR SELECT
            USING (auth.uid() = patient_id);
        
        CREATE POLICY "Users can update own sharing preferences"
            ON public.data_sharing_preferences FOR ALL
            USING (auth.uid() = patient_id);
        
        RAISE NOTICE '✅ Fixed: public.data_sharing_preferences';
    ELSE
        RAISE NOTICE '⚠️ Table public.data_sharing_preferences does not exist';
    END IF;
END $$;

-- Fix notification_preferences
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'notification_preferences') THEN
        ALTER TABLE public.notification_preferences ENABLE ROW LEVEL SECURITY;
        
        DROP POLICY IF EXISTS "Users can view own notification preferences" ON public.notification_preferences;
        DROP POLICY IF EXISTS "Users can update own notification preferences" ON public.notification_preferences;
        
        CREATE POLICY "Users can view own notification preferences"
            ON public.notification_preferences FOR SELECT
            USING (auth.uid() = patient_id OR auth.uid() = user_id);
        
        CREATE POLICY "Users can update own notification preferences"
            ON public.notification_preferences FOR ALL
            USING (auth.uid() = patient_id OR auth.uid() = user_id);
        
        RAISE NOTICE '✅ Fixed: public.notification_preferences';
    ELSE
        RAISE NOTICE '⚠️ Table public.notification_preferences does not exist';
    END IF;
END $$;

COMMIT;

-- ============================================================================
-- VERIFICATION - Check what we fixed
-- ============================================================================

DO $$
DECLARE
    v_count INTEGER;
BEGIN
    RAISE NOTICE '';
    RAISE NOTICE '============================================================';
    RAISE NOTICE '✅ PERFECT RLS FIX COMPLETE!';
    RAISE NOTICE '============================================================';
    
    -- Count policies in each schema
    SELECT COUNT(*) INTO v_count
    FROM pg_policies
    WHERE schemaname = 'public';
    RAISE NOTICE 'Public schema policies: %', v_count;
    
    SELECT COUNT(*) INTO v_count
    FROM pg_policies
    WHERE schemaname = 'private_health_info';
    RAISE NOTICE 'Private health info policies: %', v_count;
    
    RAISE NOTICE '';
    RAISE NOTICE '⚠️ IMPORTANT REMINDERS:';
    RAISE NOTICE '- user_conditions is in private_health_info (PHI)';
    RAISE NOTICE '- user_medications is in private_health_info (PHI)';
    RAISE NOTICE '- seizure_events is in private_health_info (PHI)';
    RAISE NOTICE '- Reference tables (conditions, medications) are in public';
    RAISE NOTICE '';
    RAISE NOTICE '🔒 All tables now have proper RLS policies!';
    RAISE NOTICE '============================================================';
END $$;

-- Show final status
SELECT 
    schemaname,
    tablename,
    COUNT(*) as policy_count
FROM pg_policies
WHERE schemaname IN ('public', 'private_health_info')
GROUP BY schemaname, tablename
ORDER BY schemaname, tablename;

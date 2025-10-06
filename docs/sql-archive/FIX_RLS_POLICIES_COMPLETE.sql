-- ============================================================================
-- FIX ALL RLS POLICY ISSUES - Reference Tables & Patient Data Access
-- ============================================================================
-- Fixes 403 errors on reference tables and 406 errors on patient data
-- ============================================================================

BEGIN;

-- ============================================================================
-- PART 1: Make Reference Tables Publicly Readable (Fix 403 Errors)
-- ============================================================================

-- These tables contain reference data that all users need to read

-- seizure_signs_reference
DROP POLICY IF EXISTS "Allow public read access to seizure signs" ON public.seizure_signs_reference;
CREATE POLICY "Allow public read access to seizure signs"
    ON public.seizure_signs_reference
    FOR SELECT
    USING (true);

-- brain_regions_reference
DROP POLICY IF EXISTS "Allow public read access to brain regions" ON public.brain_regions_reference;
CREATE POLICY "Allow public read access to brain regions"
    ON public.brain_regions_reference
    FOR SELECT
    USING (true);

-- conditions
DROP POLICY IF EXISTS "Allow public read access to conditions" ON public.conditions;
CREATE POLICY "Allow public read access to conditions"
    ON public.conditions
    FOR SELECT
    USING (true);

-- medications
DROP POLICY IF EXISTS "Allow public read access to medications" ON public.medications;
CREATE POLICY "Allow public read access to medications"
    ON public.medications
    FOR SELECT
    USING (true);

-- seizure_triggers_reference
DROP POLICY IF EXISTS "Allow public read access to seizure triggers" ON public.seizure_triggers_reference;
CREATE POLICY "Allow public read access to seizure triggers"
    ON public.seizure_triggers_reference
    FOR SELECT
    USING (true);

-- sign_brain_region_mapping
DROP POLICY IF EXISTS "Allow public read access to sign brain mapping" ON public.sign_brain_region_mapping;
CREATE POLICY "Allow public read access to sign brain mapping"
    ON public.sign_brain_region_mapping
    FOR SELECT
    USING (true);

-- ============================================================================
-- PART 2: Fix Private Health Info Schema Access (406 Errors)
-- ============================================================================

-- Check if RLS is enabled, if not enable it
ALTER TABLE private_health_info.seizure_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE private_health_info.menstrual_cycle_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE private_health_info.gait_episodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE private_health_info.tremor_episodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE private_health_info.tracking_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE private_health_info.daily_symptom_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE private_health_info.user_medications ENABLE ROW LEVEL SECURITY;

-- seizure_events - patients can access their own
DROP POLICY IF EXISTS "Users can view own seizure events" ON private_health_info.seizure_events;
CREATE POLICY "Users can view own seizure events"
    ON private_health_info.seizure_events
    FOR SELECT
    USING (auth.uid() = patient_id);

DROP POLICY IF EXISTS "Users can insert own seizure events" ON private_health_info.seizure_events;
CREATE POLICY "Users can insert own seizure events"
    ON private_health_info.seizure_events
    FOR INSERT
    WITH CHECK (auth.uid() = patient_id);

-- menstrual_cycle_logs
DROP POLICY IF EXISTS "Users can view own menstrual logs" ON private_health_info.menstrual_cycle_logs;
CREATE POLICY "Users can view own menstrual logs"
    ON private_health_info.menstrual_cycle_logs
    FOR SELECT
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own menstrual logs" ON private_health_info.menstrual_cycle_logs;
CREATE POLICY "Users can insert own menstrual logs"
    ON private_health_info.menstrual_cycle_logs
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- gait_episodes
DROP POLICY IF EXISTS "Users can view own gait episodes" ON private_health_info.gait_episodes;
CREATE POLICY "Users can view own gait episodes"
    ON private_health_info.gait_episodes
    FOR SELECT
    USING (auth.uid() = patient_id);

DROP POLICY IF EXISTS "Users can insert own gait episodes" ON private_health_info.gait_episodes;
CREATE POLICY "Users can insert own gait episodes"
    ON private_health_info.gait_episodes
    FOR INSERT
    WITH CHECK (auth.uid() = patient_id);

-- tremor_episodes
DROP POLICY IF EXISTS "Users can view own tremor episodes" ON private_health_info.tremor_episodes;
CREATE POLICY "Users can view own tremor episodes"
    ON private_health_info.tremor_episodes
    FOR SELECT
    USING (auth.uid() = patient_id);

DROP POLICY IF EXISTS "Users can insert own tremor episodes" ON private_health_info.tremor_episodes;
CREATE POLICY "Users can insert own tremor episodes"
    ON private_health_info.tremor_episodes
    FOR INSERT
    WITH CHECK (auth.uid() = patient_id);

-- tracking_entries
DROP POLICY IF EXISTS "Users can view own tracking entries" ON private_health_info.tracking_entries;
CREATE POLICY "Users can view own tracking entries"
    ON private_health_info.tracking_entries
    FOR SELECT
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own tracking entries" ON private_health_info.tracking_entries;
CREATE POLICY "Users can insert own tracking entries"
    ON private_health_info.tracking_entries
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- daily_symptom_logs
DROP POLICY IF EXISTS "Users can view own symptom logs" ON private_health_info.daily_symptom_logs;
CREATE POLICY "Users can view own symptom logs"
    ON private_health_info.daily_symptom_logs
    FOR SELECT
    USING (auth.uid() = patient_id);

DROP POLICY IF EXISTS "Users can insert own symptom logs" ON private_health_info.daily_symptom_logs;
CREATE POLICY "Users can insert own symptom logs"
    ON private_health_info.daily_symptom_logs
    FOR INSERT
    WITH CHECK (auth.uid() = patient_id);

-- user_medications
DROP POLICY IF EXISTS "Users can view own medications" ON private_health_info.user_medications;
CREATE POLICY "Users can view own medications"
    ON private_health_info.user_medications
    FOR SELECT
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own medications" ON private_health_info.user_medications;
CREATE POLICY "Users can insert own medications"
    ON private_health_info.user_medications
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own medications" ON private_health_info.user_medications;
CREATE POLICY "Users can update own medications"
    ON private_health_info.user_medications
    FOR UPDATE
    USING (auth.uid() = user_id);

-- ============================================================================
-- PART 3: Fix user_conditions (IN PRIVATE_HEALTH_INFO - PHI DATA!)
-- ============================================================================

-- CRITICAL: user_conditions contains PHI and MUST be in private_health_info schema
ALTER TABLE private_health_info.user_conditions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own conditions" ON private_health_info.user_conditions;
CREATE POLICY "Users can view own conditions"
    ON private_health_info.user_conditions
    FOR SELECT
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own conditions" ON private_health_info.user_conditions;
CREATE POLICY "Users can insert own conditions"
    ON private_health_info.user_conditions
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own conditions" ON private_health_info.user_conditions;
CREATE POLICY "Users can update own conditions"
    ON private_health_info.user_conditions
    FOR UPDATE
    USING (auth.uid() = user_id);

-- ============================================================================
-- PART 4: Create Missing Tables
-- ============================================================================

-- Check if basal_temperature_logs exists, if not create it
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT FROM pg_tables 
        WHERE schemaname = 'private_health_info' 
        AND tablename = 'basal_temperature_logs'
    ) THEN
        CREATE TABLE private_health_info.basal_temperature_logs (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
            log_date DATE NOT NULL,
            temperature_celsius NUMERIC(4,2),
            notes TEXT,
            created_at TIMESTAMPTZ DEFAULT NOW(),
            UNIQUE(user_id, log_date)
        );
        
        ALTER TABLE private_health_info.basal_temperature_logs ENABLE ROW LEVEL SECURITY;
        
        CREATE POLICY "Users can view own temperature logs"
            ON private_health_info.basal_temperature_logs
            FOR SELECT
            USING (auth.uid() = user_id);
            
        CREATE POLICY "Users can insert own temperature logs"
            ON private_health_info.basal_temperature_logs
            FOR INSERT
            WITH CHECK (auth.uid() = user_id);
    END IF;
END $$;

-- Check if medication_logs exists
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT FROM pg_tables 
        WHERE schemaname = 'private_health_info' 
        AND tablename = 'medication_logs'
    ) THEN
        CREATE TABLE private_health_info.medication_logs (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
            user_medication_id UUID REFERENCES private_health_info.user_medications(id) ON DELETE CASCADE,
            log_date DATE NOT NULL,
            log_time TIME NOT NULL,
            taken BOOLEAN DEFAULT false,
            notes TEXT,
            created_at TIMESTAMPTZ DEFAULT NOW()
        );
        
        ALTER TABLE private_health_info.medication_logs ENABLE ROW LEVEL SECURITY;
        
        CREATE POLICY "Users can view own medication logs"
            ON private_health_info.medication_logs
            FOR SELECT
            USING (auth.uid() = user_id);
            
        CREATE POLICY "Users can insert own medication logs"
            ON private_health_info.medication_logs
            FOR INSERT
            WITH CHECK (auth.uid() = user_id);
    END IF;
END $$;

-- Check if daily_tracking_preferences exists
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT FROM pg_tables 
        WHERE schemaname = 'public' 
        AND tablename = 'daily_tracking_preferences'
    ) THEN
        CREATE TABLE public.daily_tracking_preferences (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
            tracking_times TIME[] DEFAULT ARRAY[]::TIME[],
            basal_temp_time TIME,
            medication_times JSONB DEFAULT '[]'::jsonb,
            custom_tracking_items JSONB DEFAULT '[]'::jsonb,
            created_at TIMESTAMPTZ DEFAULT NOW(),
            updated_at TIMESTAMPTZ DEFAULT NOW()
        );
        
        ALTER TABLE public.daily_tracking_preferences ENABLE ROW LEVEL SECURITY;
        
        CREATE POLICY "Users can view own tracking preferences"
            ON public.daily_tracking_preferences
            FOR SELECT
            USING (auth.uid() = user_id);
            
        CREATE POLICY "Users can insert own tracking preferences"
            ON public.daily_tracking_preferences
            FOR INSERT
            WITH CHECK (auth.uid() = user_id);
            
        CREATE POLICY "Users can update own tracking preferences"
            ON public.daily_tracking_preferences
            FOR UPDATE
            USING (auth.uid() = user_id);
    END IF;
END $$;

COMMIT;

-- ============================================================================
-- VERIFICATION
-- ============================================================================

-- Check reference table policies
SELECT schemaname, tablename, policyname, cmd
FROM pg_policies
WHERE tablename IN (
    'seizure_signs_reference',
    'brain_regions_reference',
    'conditions',
    'medications',
    'seizure_triggers_reference',
    'sign_brain_region_mapping'
)
ORDER BY tablename, cmd;

-- Check if new tables were created
SELECT schemaname, tablename
FROM pg_tables
WHERE tablename IN ('basal_temperature_logs', 'medication_logs', 'daily_tracking_preferences')
ORDER BY schemaname, tablename;

RAISE NOTICE '✅ RLS POLICIES FIXED!';
RAISE NOTICE 'Reference tables are now publicly readable';
RAISE NOTICE 'Patient data tables have proper RLS policies';
RAISE NOTICE 'Missing tables have been created';

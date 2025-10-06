-- ============================================================================
-- CORRECT MENSTRUAL TRACKING SCHEMA - FOLLOWING DATABASE PATTERN
-- ============================================================================
-- Pattern Analysis: Your database uses:
-- 1. ENUMs for categorical data (NOT TEXT with CHECK constraints)
-- 2. Reference tables for lookup data (symptom_options, trigger_options pattern)
-- 3. Junction tables for many-to-many relationships (NO JSONB arrays)
-- 4. Proper foreign keys and constraints
-- ============================================================================

BEGIN;

-- ============================================================================
-- PART 1: CREATE ENUMS (Following existing pattern)
-- ============================================================================

-- Flow intensity enum (like seizure_type_enum pattern)
CREATE TYPE public.flow_intensity_enum AS ENUM (
    'SPOTTING',
    'LIGHT',
    'MODERATE',
    'HEAVY',
    'VERY_HEAVY'
);

-- Cycle phase enum (like seizure_type_enum pattern)
CREATE TYPE public.cycle_phase_enum AS ENUM (
    'MENSTRUAL',        -- Days 1-5
    'FOLLICULAR',       -- Days 6-13
    'OVULATION',        -- Days 14-15
    'LUTEAL'            -- Days 16-28
);

-- Menstrual symptom severity enum (consistent with other severity enums)
CREATE TYPE public.menstrual_symptom_severity_enum AS ENUM (
    'NONE',
    'MILD',
    'MODERATE',
    'SEVERE',
    'VERY_SEVERE'
);

-- ============================================================================
-- PART 2: CREATE REFERENCE TABLE FOR MENSTRUAL SYMPTOMS
-- ============================================================================
-- Following symptom_options and trigger_options pattern

CREATE TABLE IF NOT EXISTS public.menstrual_symptom_options (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category TEXT NOT NULL,  -- 'PHYSICAL', 'EMOTIONAL', 'COGNITIVE'
    symptom_name TEXT NOT NULL,
    description TEXT,
    display_order INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert standard menstrual symptoms (following the reference data pattern)
INSERT INTO public.menstrual_symptom_options (category, symptom_name, description, display_order) VALUES
    -- Physical symptoms
    ('PHYSICAL', 'Cramps', 'Abdominal or pelvic cramping', 1),
    ('PHYSICAL', 'Bloating', 'Abdominal bloating or water retention', 2),
    ('PHYSICAL', 'Breast Tenderness', 'Breast pain or sensitivity', 3),
    ('PHYSICAL', 'Headache', 'Headaches or migraines', 4),
    ('PHYSICAL', 'Back Pain', 'Lower back pain', 5),
    ('PHYSICAL', 'Fatigue', 'Unusual tiredness or low energy', 6),
    ('PHYSICAL', 'Nausea', 'Feeling sick to stomach', 7),
    ('PHYSICAL', 'Acne', 'Skin breakouts', 8),
    ('PHYSICAL', 'Hot Flashes', 'Sudden feeling of warmth', 9),
    ('PHYSICAL', 'Dizziness', 'Lightheadedness', 10),
    
    -- Emotional symptoms
    ('EMOTIONAL', 'Mood Swings', 'Rapid changes in mood', 11),
    ('EMOTIONAL', 'Irritability', 'Increased frustration or anger', 12),
    ('EMOTIONAL', 'Anxiety', 'Feelings of worry or nervousness', 13),
    ('EMOTIONAL', 'Depression', 'Low mood or sadness', 14),
    ('EMOTIONAL', 'Crying Spells', 'Increased tearfulness', 15),
    
    -- Cognitive symptoms
    ('COGNITIVE', 'Brain Fog', 'Difficulty concentrating', 16),
    ('COGNITIVE', 'Memory Issues', 'Forgetfulness', 17),
    ('COGNITIVE', 'Sleep Disturbances', 'Insomnia or excessive sleep', 18),
    
    -- Appetite symptoms
    ('APPETITE', 'Food Cravings', 'Unusual food cravings', 19),
    ('APPETITE', 'Increased Appetite', 'Eating more than usual', 20),
    ('APPETITE', 'Decreased Appetite', 'Loss of appetite', 21)
ON CONFLICT DO NOTHING;

-- ============================================================================
-- PART 3: CREATE MAIN MENSTRUAL CYCLE TABLE
-- ============================================================================
-- Following seizure_events pattern (NO JSONB!)

CREATE TABLE IF NOT EXISTS private_health_info.menstrual_cycle_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    
    -- Cycle Information (scalar fields only)
    cycle_start_date DATE NOT NULL,
    cycle_end_date DATE,
    cycle_length_days INTEGER,
    
    -- Flow & Phase (ENUMs, not TEXT!)
    flow_intensity public.flow_intensity_enum,
    cycle_phase public.cycle_phase_enum,
    
    -- Overall symptom severity (INTEGER scale like daily_symptom_logs)
    overall_symptom_severity INTEGER CHECK (overall_symptom_severity BETWEEN 1 AND 10),
    
    -- CRITICAL: Seizure Correlation (Catamenial Epilepsy Tracking)
    seizure_count_during_cycle INTEGER DEFAULT 0,
    seizure_clustered_around_menstruation BOOLEAN DEFAULT false,
    catamenial_pattern_suspected BOOLEAN DEFAULT false,
    
    -- Notes (only field that can be free text)
    notes TEXT,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    
    -- Constraints
    CONSTRAINT valid_cycle_dates CHECK (
        cycle_end_date IS NULL OR cycle_end_date >= cycle_start_date
    ),
    CONSTRAINT valid_cycle_length CHECK (
        cycle_length_days IS NULL OR (cycle_length_days > 0 AND cycle_length_days <= 60)
    ),
    CONSTRAINT valid_seizure_count CHECK (
        seizure_count_during_cycle >= 0
    )
);

COMMENT ON TABLE private_health_info.menstrual_cycle_logs IS 'Menstrual cycle tracking for catamenial epilepsy research - HIPAA compliant PHI';
COMMENT ON COLUMN private_health_info.menstrual_cycle_logs.seizure_count_during_cycle IS 'Critical for identifying catamenial epilepsy patterns (affects 40% of women with epilepsy)';

-- ============================================================================
-- PART 4: CREATE JUNCTION TABLE FOR SYMPTOMS
-- ============================================================================
-- Following seizure_log_triggers and seizure_log_post_ictal_symptoms pattern

CREATE TABLE IF NOT EXISTS private_health_info.menstrual_log_symptoms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    log_id UUID NOT NULL REFERENCES private_health_info.menstrual_cycle_logs(id) ON DELETE CASCADE,
    symptom_id UUID NOT NULL REFERENCES public.menstrual_symptom_options(id) ON DELETE CASCADE,
    severity public.menstrual_symptom_severity_enum DEFAULT 'MODERATE',
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    
    -- Prevent duplicate symptoms per log
    CONSTRAINT unique_symptom_per_log UNIQUE (log_id, symptom_id)
);

COMMENT ON TABLE private_health_info.menstrual_log_symptoms IS 'Junction table linking menstrual logs to symptoms (relational, not JSONB)';

-- ============================================================================
-- PART 5: CREATE INDEXES
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_menstrual_logs_user_id 
ON private_health_info.menstrual_cycle_logs(user_id);

CREATE INDEX IF NOT EXISTS idx_menstrual_logs_cycle_date 
ON private_health_info.menstrual_cycle_logs(cycle_start_date DESC);

CREATE INDEX IF NOT EXISTS idx_menstrual_logs_catamenial 
ON private_health_info.menstrual_cycle_logs(user_id, catamenial_pattern_suspected)
WHERE catamenial_pattern_suspected = true;

CREATE INDEX IF NOT EXISTS idx_menstrual_log_symptoms_log_id 
ON private_health_info.menstrual_log_symptoms(log_id);

CREATE INDEX IF NOT EXISTS idx_menstrual_log_symptoms_symptom_id 
ON private_health_info.menstrual_log_symptoms(symptom_id);

-- ============================================================================
-- PART 6: CREATE TRIGGERS
-- ============================================================================

CREATE OR REPLACE FUNCTION private_health_info.update_menstrual_log_timestamp()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trigger_update_menstrual_log_timestamp 
ON private_health_info.menstrual_cycle_logs;

CREATE TRIGGER trigger_update_menstrual_log_timestamp
    BEFORE UPDATE ON private_health_info.menstrual_cycle_logs
    FOR EACH ROW
    EXECUTE FUNCTION private_health_info.update_menstrual_log_timestamp();

-- ============================================================================
-- PART 7: RLS POLICIES
-- ============================================================================

ALTER TABLE private_health_info.menstrual_cycle_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE private_health_info.menstrual_log_symptoms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menstrual_symptom_options ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own menstrual logs" ON private_health_info.menstrual_cycle_logs;
DROP POLICY IF EXISTS "Users can insert own menstrual logs" ON private_health_info.menstrual_cycle_logs;
DROP POLICY IF EXISTS "Users can update own menstrual logs" ON private_health_info.menstrual_cycle_logs;
DROP POLICY IF EXISTS "Users can delete own menstrual logs" ON private_health_info.menstrual_cycle_logs;
DROP POLICY IF EXISTS "Clinicians can view patient menstrual logs" ON private_health_info.menstrual_cycle_logs;

DROP POLICY IF EXISTS "Users can view own menstrual symptoms" ON private_health_info.menstrual_log_symptoms;
DROP POLICY IF EXISTS "Users can insert own menstrual symptoms" ON private_health_info.menstrual_log_symptoms;
DROP POLICY IF EXISTS "Users can update own menstrual symptoms" ON private_health_info.menstrual_log_symptoms;
DROP POLICY IF EXISTS "Users can delete own menstrual symptoms" ON private_health_info.menstrual_log_symptoms;

DROP POLICY IF EXISTS "Everyone can view menstrual symptom options" ON public.menstrual_symptom_options;

-- Patient can view their own logs
CREATE POLICY "Users can view own menstrual logs"
ON private_health_info.menstrual_cycle_logs
FOR SELECT
USING (auth.uid() = user_id);

-- Patient can insert their own logs
CREATE POLICY "Users can insert own menstrual logs"
ON private_health_info.menstrual_cycle_logs
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Patient can update their own logs
CREATE POLICY "Users can update own menstrual logs"
ON private_health_info.menstrual_cycle_logs
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Patient can delete their own logs
CREATE POLICY "Users can delete own menstrual logs"
ON private_health_info.menstrual_cycle_logs
FOR DELETE
USING (auth.uid() = user_id);

-- Clinicians can view patient logs (using CORRECT table name)
CREATE POLICY "Clinicians can view patient menstrual logs"
ON private_health_info.menstrual_cycle_logs
FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM public.patient_clinician_connections
        WHERE clinician_id = auth.uid()
        AND patient_id = menstrual_cycle_logs.user_id
        AND status = 'active'
    )
);

-- Junction table policies (following seizure_log_triggers pattern)
CREATE POLICY "Users can view own menstrual symptoms"
ON private_health_info.menstrual_log_symptoms
FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM private_health_info.menstrual_cycle_logs
        WHERE id = menstrual_log_symptoms.log_id
        AND user_id = auth.uid()
    )
);

CREATE POLICY "Users can insert own menstrual symptoms"
ON private_health_info.menstrual_log_symptoms
FOR INSERT
WITH CHECK (
    EXISTS (
        SELECT 1 FROM private_health_info.menstrual_cycle_logs
        WHERE id = menstrual_log_symptoms.log_id
        AND user_id = auth.uid()
    )
);

CREATE POLICY "Users can update own menstrual symptoms"
ON private_health_info.menstrual_log_symptoms
FOR UPDATE
USING (
    EXISTS (
        SELECT 1 FROM private_health_info.menstrual_cycle_logs
        WHERE id = menstrual_log_symptoms.log_id
        AND user_id = auth.uid()
    )
);

CREATE POLICY "Users can delete own menstrual symptoms"
ON private_health_info.menstrual_log_symptoms
FOR DELETE
USING (
    EXISTS (
        SELECT 1 FROM private_health_info.menstrual_cycle_logs
        WHERE id = menstrual_log_symptoms.log_id
        AND user_id = auth.uid()
    )
);

-- Reference table is public (like symptom_options, trigger_options)
CREATE POLICY "Everyone can view menstrual symptom options"
ON public.menstrual_symptom_options
FOR SELECT
USING (true);

-- ============================================================================
-- PART 8: GRANT PERMISSIONS
-- ============================================================================

GRANT SELECT ON public.menstrual_symptom_options TO authenticated;
GRANT SELECT ON public.menstrual_symptom_options TO anon;

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

DO $$
DECLARE
    v_enum_count INTEGER;
    v_table_count INTEGER;
    v_policy_count INTEGER;
BEGIN
    -- Check ENUMs created
    SELECT COUNT(*) INTO v_enum_count
    FROM pg_type
    WHERE typname IN ('flow_intensity_enum', 'cycle_phase_enum', 'menstrual_symptom_severity_enum');
    
    IF v_enum_count = 3 THEN
        RAISE NOTICE '✅ All 3 menstrual ENUMs created';
    ELSE
        RAISE WARNING '❌ Only % menstrual ENUMs found (expected 3)', v_enum_count;
    END IF;
    
    -- Check tables created
    SELECT COUNT(*) INTO v_table_count
    FROM information_schema.tables
    WHERE table_name IN ('menstrual_cycle_logs', 'menstrual_log_symptoms', 'menstrual_symptom_options');
    
    IF v_table_count = 3 THEN
        RAISE NOTICE '✅ All 3 menstrual tables created';
    ELSE
        RAISE WARNING '❌ Only % menstrual tables found (expected 3)', v_table_count;
    END IF;
    
    -- Check RLS policies
    SELECT COUNT(*) INTO v_policy_count
    FROM pg_policies
    WHERE tablename IN ('menstrual_cycle_logs', 'menstrual_log_symptoms', 'menstrual_symptom_options');
    
    IF v_policy_count >= 10 THEN
        RAISE NOTICE '✅ % RLS policies applied to menstrual tables', v_policy_count;
    ELSE
        RAISE WARNING '❌ Only % RLS policies found (expected >= 10)', v_policy_count;
    END IF;
    
    -- Check symptom reference data
    SELECT COUNT(*) INTO v_enum_count
    FROM public.menstrual_symptom_options;
    
    IF v_enum_count > 0 THEN
        RAISE NOTICE '✅ % menstrual symptoms inserted into reference table', v_enum_count;
    ELSE
        RAISE WARNING '❌ No menstrual symptoms in reference table';
    END IF;
END $$;

COMMIT;

-- ============================================================================
-- SUCCESS! CORRECT SCHEMA FOLLOWING DATABASE PATTERN
-- ============================================================================
-- ✅ ENUMs for categorical data (flow_intensity_enum, cycle_phase_enum)
-- ✅ Reference table for symptoms (menstrual_symptom_options)
-- ✅ Junction table for many-to-many (menstrual_log_symptoms)
-- ✅ NO JSONB arrays (proper relational design)
-- ✅ Follows exact same pattern as seizure tracking
-- ✅ HIPAA compliant (private_health_info schema)
-- ✅ RLS policies on all tables
-- ✅ Proper indexes for performance
-- ============================================================================

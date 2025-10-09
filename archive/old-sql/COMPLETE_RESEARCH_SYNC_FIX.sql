-- ============================================================================
-- COMPLETE RESEARCH SYNC FIX - HIPAA COMPLIANT
-- ============================================================================
-- Date: 2025-01-08
-- Purpose: Clean up legacy tables and fix all research anonymization functions
-- ============================================================================

-- ============================================================================
-- STEP 1: DROP LEGACY/UNUSED TABLES
-- ============================================================================

-- Drop seizure_logs_research from private_health_info (it's not needed)
-- The correct table is research.seizure_events
DROP TABLE IF EXISTS private_health_info.seizure_logs_research CASCADE;

-- Drop any other legacy research tables in PHI schema
-- (Add more if you find them)

-- ============================================================================
-- STEP 2: VERIFY RESEARCH SCHEMA STRUCTURE
-- ============================================================================

-- Ensure research schema exists
CREATE SCHEMA IF NOT EXISTS research;

-- Verify research.seizure_events exists (it should from your screenshot)
-- If it doesn't exist, create it:
CREATE TABLE IF NOT EXISTS research.seizure_events (
  event_id uuid NOT NULL DEFAULT gen_random_uuid(),
  research_id uuid NOT NULL,
  occurred_at_date date NOT NULL,
  occurred_at_hour integer NULL,
  duration_seconds integer NULL,
  seizure_type text NOT NULL,
  severity integer NULL,
  consciousness_level text NULL,
  had_aura boolean NULL,
  aura_signs jsonb NULL,
  possible_triggers jsonb NULL,
  body_parts_affected jsonb NULL,
  motor_symptoms jsonb NULL,
  non_motor_symptoms jsonb NULL,
  post_ictal_effects jsonb NULL,
  post_ictal_duration_minutes integer NULL,
  injuries_occurred boolean NULL,
  injury_types jsonb NULL,
  required_medical_attention boolean NULL,
  witnessed boolean NULL,
  medication_taken_as_prescribed boolean NULL,
  hours_since_last_dose integer NULL,
  recent_medication_changes boolean NULL,
  fully_recovered boolean NULL,
  recovery_time_minutes integer NULL,
  created_at timestamp with time zone NULL DEFAULT now(),
  updated_at timestamp with time zone NULL DEFAULT now(),
  source_event_id uuid NULL,
  CONSTRAINT seizure_events_pkey PRIMARY KEY (event_id),
  CONSTRAINT research_seizure_events_research_id_fkey FOREIGN KEY (research_id) 
    REFERENCES linkage.research_id_map(research_id) ON DELETE CASCADE
);

-- Create indexes if they don't exist
CREATE INDEX IF NOT EXISTS idx_research_seizures_research_id 
  ON research.seizure_events USING btree (research_id);

CREATE INDEX IF NOT EXISTS idx_research_seizures_date 
  ON research.seizure_events USING btree (occurred_at_date DESC);

-- ============================================================================
-- STEP 3: DROP AND RECREATE ALL ANONYMIZATION FUNCTIONS
-- ============================================================================

-- Drop existing anonymization functions
DROP FUNCTION IF EXISTS private_health_info.anonymize_seizure_to_research() CASCADE;
DROP FUNCTION IF EXISTS private_health_info.anonymize_daily_log_to_research() CASCADE;
DROP FUNCTION IF EXISTS private_health_info.anonymize_gait_to_research() CASCADE;
DROP FUNCTION IF EXISTS private_health_info.anonymize_tremor_to_research() CASCADE;

-- ============================================================================
-- RECREATE: anonymize_seizure_to_research
-- ============================================================================

CREATE OR REPLACE FUNCTION private_health_info.anonymize_seizure_to_research()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'private_health_info', 'linkage', 'research', 'public'
AS $$
DECLARE
    v_research_id UUID;
    v_consent BOOLEAN;
BEGIN
    -- Only sync if visible_to_researchers is true
    IF NEW.visible_to_researchers = false THEN
        RETURN NEW;
    END IF;
    
    -- Check research consent
    v_consent := private_health_info.check_research_consent(NEW.patient_id, 'seizure');
    IF v_consent = false THEN
        RETURN NEW;
    END IF;
    
    -- Get existing research_id
    SELECT research_id INTO v_research_id 
    FROM linkage.research_id_map 
    WHERE user_id = NEW.patient_id;
    
    -- If no research_id exists, create one
    IF v_research_id IS NULL THEN
        v_research_id := gen_random_uuid();
        INSERT INTO linkage.research_id_map (user_id, research_id) 
        VALUES (NEW.patient_id, v_research_id)
        ON CONFLICT (user_id) DO NOTHING;  -- NEVER overwrite!
        
        -- Get the research_id (in case of conflict)
        SELECT research_id INTO v_research_id 
        FROM linkage.research_id_map 
        WHERE user_id = NEW.patient_id;
    END IF;
    
    -- Sync to research.seizure_events (de-identified)
    INSERT INTO research.seizure_events (
        research_id,
        occurred_at_date,
        occurred_at_hour,
        duration_seconds,
        seizure_type,
        severity,
        consciousness_level,
        had_aura,
        aura_signs,
        possible_triggers,
        body_parts_affected,
        motor_symptoms,
        non_motor_symptoms,
        post_ictal_effects,
        post_ictal_duration_minutes,
        injuries_occurred,
        injury_types,
        required_medical_attention,
        witnessed,
        medication_taken_as_prescribed,
        hours_since_last_dose,
        recent_medication_changes,
        fully_recovered,
        recovery_time_minutes,
        source_event_id
    ) VALUES (
        v_research_id,
        DATE(NEW.occurred_at),  -- Date only, no exact timestamp
        EXTRACT(HOUR FROM NEW.occurred_at)::INTEGER,  -- Hour only for privacy
        NEW.duration_seconds,
        NEW.seizure_type,
        NEW.severity,
        NEW.consciousness_level,
        NEW.had_aura,
        NEW.aura_signs,
        NEW.possible_triggers,
        NEW.body_parts_affected,
        NEW.motor_symptoms,
        NEW.non_motor_symptoms,
        NEW.post_ictal_effects,
        NEW.post_ictal_duration_minutes,
        NEW.injuries_occurred,
        NEW.injury_types,
        NEW.required_medical_attention,
        NEW.witnessed,
        NEW.medication_taken_as_prescribed,
        NEW.hours_since_last_dose,
        NEW.recent_medication_changes,
        NEW.fully_recovered,
        NEW.recovery_time_minutes,
        NEW.event_id
    ) ON CONFLICT (event_id) DO UPDATE SET
        duration_seconds = EXCLUDED.duration_seconds,
        severity = EXCLUDED.severity,
        consciousness_level = EXCLUDED.consciousness_level,
        updated_at = NOW();
    
    RETURN NEW;
END;
$$;

-- ============================================================================
-- RECREATE: anonymize_daily_log_to_research
-- ============================================================================

CREATE OR REPLACE FUNCTION private_health_info.anonymize_daily_log_to_research()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'private_health_info', 'linkage', 'research', 'public'
AS $$
DECLARE
    v_research_id UUID;
    v_consent BOOLEAN;
BEGIN
    -- Only sync if visible_to_researchers is true
    IF NEW.visible_to_researchers = false THEN
        RETURN NEW;
    END IF;
    
    -- Check research consent
    v_consent := private_health_info.check_research_consent(NEW.patient_id, 'symptom');
    IF v_consent = false THEN
        RETURN NEW;
    END IF;
    
    -- Get existing research_id
    SELECT research_id INTO v_research_id 
    FROM linkage.research_id_map 
    WHERE user_id = NEW.patient_id;
    
    -- If no research_id exists, create one
    IF v_research_id IS NULL THEN
        v_research_id := gen_random_uuid();
        INSERT INTO linkage.research_id_map (user_id, research_id) 
        VALUES (NEW.patient_id, v_research_id)
        ON CONFLICT (user_id) DO NOTHING;  -- NEVER overwrite!
        
        -- Get the research_id (in case of conflict)
        SELECT research_id INTO v_research_id 
        FROM linkage.research_id_map 
        WHERE user_id = NEW.patient_id;
    END IF;
    
    -- Sync to research.daily_symptom_logs (de-identified)
    INSERT INTO research.daily_symptom_logs (
        research_id, 
        log_date, 
        overall_feeling, 
        mood, 
        energy_level, 
        fatigue_level,
        pain_level, 
        sleep_quality, 
        sleep_hours, 
        sleep_disturbances,
        motor_fluctuations_occurred, 
        on_time_hours, 
        off_time_hours,
        dyskinesia_severity, 
        stiffness_severity, 
        slowness_severity,
        cognitive_issues, 
        mood_issues, 
        autonomic_symptoms, 
        adl_independence_level,
        activities_difficult, 
        all_medications_taken, 
        medication_side_effects,
        stress_level, 
        exercise_minutes, 
        source_log_id
    ) VALUES (
        v_research_id, 
        NEW.log_date, 
        NEW.overall_feeling, 
        NEW.mood, 
        NEW.energy_level,
        NEW.fatigue_level, 
        NEW.pain_level, 
        NEW.sleep_quality, 
        NEW.sleep_hours,
        NEW.sleep_disturbances, 
        NEW.motor_fluctuations_occurred, 
        NEW.on_time_hours,
        NEW.off_time_hours, 
        NEW.dyskinesia_severity, 
        NEW.stiffness_severity,
        NEW.slowness_severity, 
        NEW.cognitive_issues, 
        NEW.mood_issues,
        NEW.autonomic_symptoms, 
        NEW.adl_independence_level, 
        NEW.activities_difficult,
        NEW.all_medications_taken, 
        NEW.medication_side_effects, 
        NEW.stress_level,
        NEW.exercise_minutes, 
        NEW.log_id
    ) ON CONFLICT (research_id, log_date) DO UPDATE SET
        overall_feeling = EXCLUDED.overall_feeling,
        mood = EXCLUDED.mood,
        energy_level = EXCLUDED.energy_level,
        updated_at = NOW();
    
    RETURN NEW;
END;
$$;

-- ============================================================================
-- RECREATE: anonymize_gait_to_research
-- ============================================================================

CREATE OR REPLACE FUNCTION private_health_info.anonymize_gait_to_research()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'private_health_info', 'linkage', 'research', 'public'
AS $$
DECLARE
    v_research_id UUID;
    v_consent BOOLEAN;
BEGIN
    -- Only sync if visible_to_researchers is true
    IF NEW.visible_to_researchers = false THEN
        RETURN NEW;
    END IF;
    
    -- Check research consent
    v_consent := private_health_info.check_research_consent(NEW.patient_id, 'gait');
    IF v_consent = false THEN
        RETURN NEW;
    END IF;
    
    -- Get existing research_id
    SELECT research_id INTO v_research_id 
    FROM linkage.research_id_map 
    WHERE user_id = NEW.patient_id;
    
    -- If no research_id exists, create one
    IF v_research_id IS NULL THEN
        v_research_id := gen_random_uuid();
        INSERT INTO linkage.research_id_map (user_id, research_id) 
        VALUES (NEW.patient_id, v_research_id)
        ON CONFLICT (user_id) DO NOTHING;  -- NEVER overwrite!
        
        -- Get the research_id (in case of conflict)
        SELECT research_id INTO v_research_id 
        FROM linkage.research_id_map 
        WHERE user_id = NEW.patient_id;
    END IF;
    
    -- Sync to research.gait_episodes (de-identified)
    INSERT INTO research.gait_episodes (
        research_id,
        occurred_at_date,
        occurred_at_hour,
        duration_seconds,
        gait_type,
        severity,
        freezing_occurred,
        fall_occurred,
        injury_occurred,
        festination,
        shuffling,
        reduced_arm_swing,
        postural_instability,
        medication_status,
        hours_since_medication,
        source_episode_id
    ) VALUES (
        v_research_id,
        DATE(NEW.occurred_at),
        EXTRACT(HOUR FROM NEW.occurred_at)::INTEGER,
        NEW.duration_seconds,
        NEW.gait_type,
        NEW.severity,
        NEW.freezing_occurred,
        NEW.fall_occurred,
        NEW.injury_occurred,
        NEW.festination,
        NEW.shuffling,
        NEW.reduced_arm_swing,
        NEW.postural_instability,
        NEW.medication_status,
        NEW.hours_since_medication,
        NEW.gait_id
    ) ON CONFLICT (source_episode_id) DO UPDATE SET
        duration_seconds = EXCLUDED.duration_seconds,
        severity = EXCLUDED.severity,
        updated_at = NOW();
    
    RETURN NEW;
END;
$$;

-- ============================================================================
-- RECREATE: anonymize_tremor_to_research
-- ============================================================================

CREATE OR REPLACE FUNCTION private_health_info.anonymize_tremor_to_research()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'private_health_info', 'linkage', 'research', 'public'
AS $$
DECLARE
    v_research_id UUID;
    v_consent BOOLEAN;
BEGIN
    -- Only sync if visible_to_researchers is true
    IF NEW.visible_to_researchers = false THEN
        RETURN NEW;
    END IF;
    
    -- Check research consent
    v_consent := private_health_info.check_research_consent(NEW.patient_id, 'tremor');
    IF v_consent = false THEN
        RETURN NEW;
    END IF;
    
    -- Get existing research_id
    SELECT research_id INTO v_research_id 
    FROM linkage.research_id_map 
    WHERE user_id = NEW.patient_id;
    
    -- If no research_id exists, create one
    IF v_research_id IS NULL THEN
        v_research_id := gen_random_uuid();
        INSERT INTO linkage.research_id_map (user_id, research_id) 
        VALUES (NEW.patient_id, v_research_id)
        ON CONFLICT (user_id) DO NOTHING;  -- NEVER overwrite!
        
        -- Get the research_id (in case of conflict)
        SELECT research_id INTO v_research_id 
        FROM linkage.research_id_map 
        WHERE user_id = NEW.patient_id;
    END IF;
    
    -- Sync to research.tremor_episodes (de-identified)
    INSERT INTO research.tremor_episodes (
        research_id,
        occurred_at_date,
        occurred_at_hour,
        duration_seconds,
        tremor_type,
        severity,
        frequency_hz,
        body_regions,
        dominant_side,
        interfered_with_activities,
        medication_status,
        hours_since_medication,
        source_episode_id
    ) VALUES (
        v_research_id,
        DATE(NEW.occurred_at),
        EXTRACT(HOUR FROM NEW.occurred_at)::INTEGER,
        NEW.duration_seconds,
        NEW.tremor_type,
        NEW.severity,
        NEW.frequency_hz,
        NEW.body_regions,
        NEW.dominant_side,
        NEW.interfered_with_activities,
        NEW.medication_status,
        NEW.hours_since_medication,
        NEW.tremor_id
    ) ON CONFLICT (source_episode_id) DO UPDATE SET
        duration_seconds = EXCLUDED.duration_seconds,
        severity = EXCLUDED.severity,
        updated_at = NOW();
    
    RETURN NEW;
END;
$$;

-- ============================================================================
-- STEP 4: RECREATE TRIGGERS
-- ============================================================================

-- Drop existing triggers
DROP TRIGGER IF EXISTS seizure_to_research_trigger ON private_health_info.seizure_events;
DROP TRIGGER IF EXISTS daily_log_to_research_trigger ON private_health_info.daily_symptom_logs;
DROP TRIGGER IF EXISTS gait_to_research_trigger ON private_health_info.gait_episodes;
DROP TRIGGER IF EXISTS tremor_to_research_trigger ON private_health_info.tremor_episodes;

-- Recreate triggers
CREATE TRIGGER seizure_to_research_trigger
AFTER INSERT OR UPDATE ON private_health_info.seizure_events
FOR EACH ROW
EXECUTE FUNCTION private_health_info.anonymize_seizure_to_research();

CREATE TRIGGER daily_log_to_research_trigger
AFTER INSERT OR UPDATE ON private_health_info.daily_symptom_logs
FOR EACH ROW
EXECUTE FUNCTION private_health_info.anonymize_daily_log_to_research();

CREATE TRIGGER gait_to_research_trigger
AFTER INSERT OR UPDATE ON private_health_info.gait_episodes
FOR EACH ROW
EXECUTE FUNCTION private_health_info.anonymize_gait_to_research();

CREATE TRIGGER tremor_to_research_trigger
AFTER INSERT OR UPDATE ON private_health_info.tremor_episodes
FOR EACH ROW
EXECUTE FUNCTION private_health_info.anonymize_tremor_to_research();

-- ============================================================================
-- STEP 5: CREATE ONBOARDING FUNCTIONS
-- ============================================================================

-- Create research_id during onboarding
CREATE OR REPLACE FUNCTION public.create_research_id_for_user(
    p_user_id UUID,
    p_consent_given BOOLEAN DEFAULT false
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'linkage', 'public'
AS $$
DECLARE
    v_research_id UUID;
BEGIN
    -- Only create if consent is given
    IF p_consent_given = false THEN
        RETURN NULL;
    END IF;
    
    -- Check if research_id already exists
    SELECT research_id INTO v_research_id
    FROM linkage.research_id_map
    WHERE user_id = p_user_id;
    
    IF v_research_id IS NOT NULL THEN
        RETURN v_research_id;
    END IF;
    
    -- Create new research_id
    v_research_id := gen_random_uuid();
    
    INSERT INTO linkage.research_id_map (
        user_id,
        research_id,
        created_by,
        consent_version,
        notes
    ) VALUES (
        p_user_id,
        v_research_id,
        p_user_id,
        'v1.0',
        'Created during onboarding'
    )
    ON CONFLICT (user_id) DO NOTHING;
    
    -- Get the research_id (in case of conflict)
    SELECT research_id INTO v_research_id
    FROM linkage.research_id_map
    WHERE user_id = p_user_id;
    
    RETURN v_research_id;
END;
$$;

-- Complete onboarding with research enrollment
CREATE OR REPLACE FUNCTION public.complete_onboarding(
    p_user_id UUID,
    p_user_type TEXT,
    p_research_consent BOOLEAN DEFAULT false
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public', 'private_health_info', 'linkage'
AS $$
DECLARE
    v_research_id UUID;
BEGIN
    -- Security check
    IF p_user_id != auth.uid() THEN
        RAISE EXCEPTION 'Access denied' USING ERRCODE = '42501';
    END IF;
    
    -- Mark onboarding as complete
    UPDATE public.profiles
    SET onboarding_completed = true,
        updated_at = NOW()
    WHERE id = p_user_id;
    
    -- If research consent given, create research_id
    IF p_research_consent = true THEN
        v_research_id := public.create_research_id_for_user(p_user_id, true);
        
        -- Record in research_consent table
        INSERT INTO public.research_consent (
            user_id,
            consent_given,
            consent_date,
            consent_version
        ) VALUES (
            p_user_id,
            true,
            NOW(),
            'v1.0'
        )
        ON CONFLICT (user_id) DO UPDATE SET
            consent_given = true,
            consent_date = NOW(),
            updated_at = NOW();
    END IF;
    
    RETURN jsonb_build_object(
        'success', true,
        'onboarding_completed', true,
        'research_id_created', (v_research_id IS NOT NULL),
        'research_id', v_research_id
    );
END;
$$;

-- Grant permissions
GRANT EXECUTE ON FUNCTION public.create_research_id_for_user TO authenticated;
GRANT EXECUTE ON FUNCTION public.complete_onboarding TO authenticated;

-- ============================================================================
-- STEP 6: VERIFY SETUP
-- ============================================================================

-- Add unique constraint on source IDs in research tables
ALTER TABLE research.seizure_events 
ADD CONSTRAINT IF NOT EXISTS research_seizure_events_source_unique 
UNIQUE (source_event_id);

ALTER TABLE research.gait_episodes 
ADD CONSTRAINT IF NOT EXISTS research_gait_episodes_source_unique 
UNIQUE (source_episode_id);

ALTER TABLE research.tremor_episodes 
ADD CONSTRAINT IF NOT EXISTS research_tremor_episodes_source_unique 
UNIQUE (source_episode_id);

-- ============================================================================
-- STEP 7: NOTIFY POSTGREST
-- ============================================================================

NOTIFY pgrst, 'reload schema';

-- ============================================================================
-- VERIFICATION QUERIES (Run these after deployment)
-- ============================================================================

-- Check research schema tables
-- SELECT table_name FROM information_schema.tables WHERE table_schema = 'research';

-- Check that NO user_id columns exist in research schema
-- SELECT table_name, column_name 
-- FROM information_schema.columns 
-- WHERE table_schema = 'research' 
-- AND column_name = 'user_id';
-- -- Should return EMPTY!

-- Check that research_id_map has no duplicates
-- SELECT user_id, COUNT(*) 
-- FROM linkage.research_id_map 
-- GROUP BY user_id 
-- HAVING COUNT(*) > 1;
-- -- Should return EMPTY!

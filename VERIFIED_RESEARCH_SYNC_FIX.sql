-- ============================================================================
-- VERIFIED RESEARCH SYNC FIX - Based on Actual Database Schema
-- ============================================================================
-- Date: 2025-01-08
-- Purpose: Fix ON CONFLICT bug in research anonymization functions
-- VERIFIED against actual database schema
-- ============================================================================

-- ============================================================================
-- CRITICAL: DO NOT DROP seizure_logs_research!
-- It's used by 5 other tables with foreign keys
-- ============================================================================

-- ============================================================================
-- STEP 1: Add missing updated_at column to research tables
-- ============================================================================

-- Add updated_at to research.daily_symptom_logs if it doesn't exist
ALTER TABLE research.daily_symptom_logs 
ADD COLUMN IF NOT EXISTS updated_at timestamp with time zone DEFAULT now();

-- Add updated_at to research.gait_episodes if it doesn't exist
ALTER TABLE research.gait_episodes 
ADD COLUMN IF NOT EXISTS updated_at timestamp with time zone DEFAULT now();

-- Add updated_at to research.tremor_episodes if it doesn't exist
ALTER TABLE research.tremor_episodes 
ADD COLUMN IF NOT EXISTS updated_at timestamp with time zone DEFAULT now();

-- Add updated_at to research.seizure_events if it doesn't exist
ALTER TABLE research.seizure_events 
ADD COLUMN IF NOT EXISTS updated_at timestamp with time zone DEFAULT now();

-- ============================================================================
-- STEP 2: Fix anonymize_daily_log_to_research
-- ============================================================================

CREATE OR REPLACE FUNCTION private_health_info.anonymize_daily_log_to_research()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'research', 'private_health_info', 'linkage', 'public'
AS $function$
DECLARE
    v_research_id UUID;
    v_consent BOOLEAN;
BEGIN
    IF NEW.visible_to_researchers = false THEN
        RETURN NEW;
    END IF;
    
    v_consent := private_health_info.check_research_consent(NEW.patient_id, 'symptom');
    IF v_consent = false THEN
        RETURN NEW;
    END IF;
    
    SELECT research_id INTO v_research_id FROM linkage.research_id_map WHERE user_id = NEW.patient_id;
    
    IF v_research_id IS NULL THEN
        v_research_id := gen_random_uuid();
        INSERT INTO linkage.research_id_map (user_id, research_id) VALUES (NEW.patient_id, v_research_id)
        ON CONFLICT (user_id) DO NOTHING;  -- FIXED: Don't overwrite!
        
        -- Get the research_id (in case of conflict)
        SELECT research_id INTO v_research_id FROM linkage.research_id_map WHERE user_id = NEW.patient_id;
    END IF;
    
    INSERT INTO research.daily_symptom_logs (
        research_id, log_date, overall_feeling, mood, energy_level, fatigue_level,
        pain_level, sleep_quality, sleep_hours, sleep_disturbances,
        motor_fluctuations_occurred, on_time_hours, off_time_hours,
        dyskinesia_severity, stiffness_severity, slowness_severity,
        cognitive_issues, mood_issues, autonomic_symptoms, adl_independence_level,
        activities_difficult, all_medications_taken, medication_side_effects,
        stress_level, exercise_minutes, source_log_id
    ) VALUES (
        v_research_id, NEW.log_date, NEW.overall_feeling, NEW.mood, NEW.energy_level,
        NEW.fatigue_level, NEW.pain_level, NEW.sleep_quality, NEW.sleep_hours,
        NEW.sleep_disturbances, NEW.motor_fluctuations_occurred, NEW.on_time_hours,
        NEW.off_time_hours, NEW.dyskinesia_severity, NEW.stiffness_severity,
        NEW.slowness_severity, NEW.cognitive_issues, NEW.mood_issues,
        NEW.autonomic_symptoms, NEW.adl_independence_level, NEW.activities_difficult,
        NEW.all_medications_taken, NEW.medication_side_effects, NEW.stress_level,
        NEW.exercise_minutes, NEW.log_id
    ) ON CONFLICT (research_id, log_date) DO UPDATE SET
        overall_feeling = EXCLUDED.overall_feeling,
        mood = EXCLUDED.mood,
        energy_level = EXCLUDED.energy_level,
        updated_at = NOW();
    
    RETURN NEW;
END;
$function$;

-- ============================================================================
-- STEP 3: Fix anonymize_gait_to_research
-- ============================================================================

CREATE OR REPLACE FUNCTION private_health_info.anonymize_gait_to_research()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'research', 'private_health_info', 'linkage', 'public'
AS $function$
DECLARE
    v_research_id UUID;
    v_consent BOOLEAN;
BEGIN
    IF NEW.visible_to_researchers = false THEN
        RETURN NEW;
    END IF;
    
    v_consent := private_health_info.check_research_consent(NEW.patient_id, 'gait');
    IF v_consent = false THEN
        RETURN NEW;
    END IF;
    
    SELECT research_id INTO v_research_id FROM linkage.research_id_map WHERE user_id = NEW.patient_id;
    
    IF v_research_id IS NULL THEN
        v_research_id := gen_random_uuid();
        INSERT INTO linkage.research_id_map (user_id, research_id) VALUES (NEW.patient_id, v_research_id)
        ON CONFLICT (user_id) DO NOTHING;  -- FIXED: Don't overwrite!
        
        -- Get the research_id (in case of conflict)
        SELECT research_id INTO v_research_id FROM linkage.research_id_map WHERE user_id = NEW.patient_id;
    END IF;
    
    INSERT INTO research.gait_episodes (
        research_id, occurred_at_date, occurred_at_hour, duration_seconds,
        event_type, severity, resulted_in_fall, fall_direction, injury_occurred,
        required_assistance, environmental_factors, medication_status,
        hours_since_medication, freezing_trigger, source_gait_id
    ) VALUES (
        v_research_id, DATE(NEW.occurred_at), EXTRACT(HOUR FROM NEW.occurred_at),
        NEW.duration_seconds, NEW.event_type, NEW.severity, NEW.resulted_in_fall,
        NEW.fall_direction, NEW.injury_occurred, NEW.required_assistance,
        NEW.environmental_factors, NEW.medication_status, NEW.hours_since_medication,
        NEW.freezing_trigger, NEW.gait_id
    ) ON CONFLICT (source_gait_id) DO UPDATE SET  -- FIXED: Use source_gait_id
        duration_seconds = EXCLUDED.duration_seconds,
        severity = EXCLUDED.severity,
        updated_at = NOW();
    
    RETURN NEW;
END;
$function$;

-- ============================================================================
-- STEP 4: Fix anonymize_seizure_to_research
-- ============================================================================

CREATE OR REPLACE FUNCTION private_health_info.anonymize_seizure_to_research()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'research', 'private_health_info', 'linkage', 'public'
AS $function$
DECLARE
    v_research_id UUID;
    v_consent BOOLEAN;
BEGIN
    -- Only process if visible_to_researchers is true
    IF NEW.visible_to_researchers = false THEN
        RETURN NEW;
    END IF;
    
    -- Check consent
    v_consent := private_health_info.check_research_consent(NEW.patient_id, 'seizure');
    
    IF v_consent = false THEN
        RETURN NEW;
    END IF;
    
    -- Get research ID
    SELECT research_id INTO v_research_id
    FROM linkage.research_id_map
    WHERE user_id = NEW.patient_id;
    
    -- If no research ID, create one
    IF v_research_id IS NULL THEN
        v_research_id := gen_random_uuid();
        INSERT INTO linkage.research_id_map (user_id, research_id)
        VALUES (NEW.patient_id, v_research_id)
        ON CONFLICT (user_id) DO NOTHING;  -- FIXED: Don't overwrite!
        
        -- Get the research_id (in case of conflict)
        SELECT research_id INTO v_research_id FROM linkage.research_id_map WHERE user_id = NEW.patient_id;
    END IF;
    
    -- Insert anonymized data into research schema
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
        DATE(NEW.occurred_at),
        EXTRACT(HOUR FROM NEW.occurred_at),
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
    )
    ON CONFLICT (source_event_id) DO UPDATE SET  -- FIXED: Use source_event_id
        duration_seconds = EXCLUDED.duration_seconds,
        severity = EXCLUDED.severity,
        updated_at = NOW();
    
    RETURN NEW;
END;
$function$;

-- ============================================================================
-- STEP 5: Fix anonymize_tremor_to_research
-- ============================================================================

CREATE OR REPLACE FUNCTION private_health_info.anonymize_tremor_to_research()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'research', 'private_health_info', 'linkage', 'public'
AS $function$
DECLARE
    v_research_id UUID;
    v_consent BOOLEAN;
BEGIN
    IF NEW.visible_to_researchers = false THEN
        RETURN NEW;
    END IF;
    
    v_consent := private_health_info.check_research_consent(NEW.patient_id, 'tremor');
    IF v_consent = false THEN
        RETURN NEW;
    END IF;
    
    SELECT research_id INTO v_research_id FROM linkage.research_id_map WHERE user_id = NEW.patient_id;
    
    IF v_research_id IS NULL THEN
        v_research_id := gen_random_uuid();
        INSERT INTO linkage.research_id_map (user_id, research_id) VALUES (NEW.patient_id, v_research_id)
        ON CONFLICT (user_id) DO NOTHING;  -- FIXED: Don't overwrite!
        
        -- Get the research_id (in case of conflict)
        SELECT research_id INTO v_research_id FROM linkage.research_id_map WHERE user_id = NEW.patient_id;
    END IF;
    
    INSERT INTO research.tremor_episodes (
        research_id, occurred_at_date, occurred_at_hour, duration_seconds,
        tremor_type, severity, frequency_hz, body_regions, dominant_side,
        interfered_with_activities, activities_affected, occurred_during,
        medication_status, hours_since_medication, possible_triggers, source_tremor_id
    ) VALUES (
        v_research_id, DATE(NEW.occurred_at), EXTRACT(HOUR FROM NEW.occurred_at),
        NEW.duration_seconds, NEW.tremor_type, NEW.severity, NEW.frequency_hz,
        NEW.body_regions, NEW.dominant_side, NEW.interfered_with_activities,
        NEW.activities_affected, NEW.occurred_during, NEW.medication_status,
        NEW.hours_since_medication, NEW.possible_triggers, NEW.tremor_id
    ) ON CONFLICT (source_tremor_id) DO UPDATE SET  -- FIXED: Use source_tremor_id
        duration_seconds = EXCLUDED.duration_seconds,
        severity = EXCLUDED.severity,
        updated_at = NOW();
    
    RETURN NEW;
END;
$function$;

-- ============================================================================
-- STEP 6: Add unique constraints on source IDs (if they don't exist)
-- ============================================================================

-- For gait_episodes
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'research_gait_episodes_source_unique'
    ) THEN
        ALTER TABLE research.gait_episodes 
        ADD CONSTRAINT research_gait_episodes_source_unique 
        UNIQUE (source_gait_id);
    END IF;
END $$;

-- For tremor_episodes
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'research_tremor_episodes_source_unique'
    ) THEN
        ALTER TABLE research.tremor_episodes 
        ADD CONSTRAINT research_tremor_episodes_source_unique 
        UNIQUE (source_tremor_id);
    END IF;
END $$;

-- For seizure_events
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'research_seizure_events_source_unique'
    ) THEN
        ALTER TABLE research.seizure_events 
        ADD CONSTRAINT research_seizure_events_source_unique 
        UNIQUE (source_event_id);
    END IF;
END $$;

-- ============================================================================
-- STEP 7: Create onboarding functions
-- ============================================================================

-- Drop existing complete_onboarding function (old signature)
DROP FUNCTION IF EXISTS public.complete_onboarding(uuid, text);

-- Create helper function for research_id creation
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
    IF p_consent_given = false THEN
        RETURN NULL;
    END IF;
    
    SELECT research_id INTO v_research_id
    FROM linkage.research_id_map
    WHERE user_id = p_user_id;
    
    IF v_research_id IS NOT NULL THEN
        RETURN v_research_id;
    END IF;
    
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
    
    SELECT research_id INTO v_research_id
    FROM linkage.research_id_map
    WHERE user_id = p_user_id;
    
    RETURN v_research_id;
END;
$$;

-- Create new complete_onboarding with research consent parameter
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
    IF p_user_id != auth.uid() THEN
        RAISE EXCEPTION 'Access denied' USING ERRCODE = '42501';
    END IF;
    
    UPDATE public.profiles
    SET onboarding_completed = true,
        updated_at = NOW()
    WHERE id = p_user_id;
    
    IF p_research_consent = true THEN
        v_research_id := public.create_research_id_for_user(p_user_id, true);
        
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

GRANT EXECUTE ON FUNCTION public.create_research_id_for_user TO authenticated;
GRANT EXECUTE ON FUNCTION public.complete_onboarding(uuid, text, boolean) TO authenticated;

-- ============================================================================
-- STEP 8: Notify PostgREST
-- ============================================================================

NOTIFY pgrst, 'reload schema';

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- Check that NO user_id columns exist in research schema
-- SELECT table_name, column_name 
-- FROM information_schema.columns 
-- WHERE table_schema = 'research' 
-- AND column_name = 'user_id';
-- Should return EMPTY!

-- Check research_id_map has no duplicates
-- SELECT user_id, COUNT(*) 
-- FROM linkage.research_id_map 
-- GROUP BY user_id 
-- HAVING COUNT(*) > 1;
-- Should return EMPTY!

-- ============================================================================
-- FIX RESEARCH DATA SYNC - HIPAA COMPLIANT
-- ============================================================================
-- Date: 2025-01-08
-- Purpose: Fix research ID mapping and ensure proper anonymization
-- ============================================================================

-- 1. Fix the anonymization trigger functions to NOT overwrite research_id
-- ============================================================================

-- Fix anonymize_daily_log_to_research
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
    
    -- Get existing research_id or create new one
    SELECT research_id INTO v_research_id 
    FROM linkage.research_id_map 
    WHERE user_id = NEW.patient_id;
    
    IF v_research_id IS NULL THEN
        -- Create new research_id
        v_research_id := gen_random_uuid();
        INSERT INTO linkage.research_id_map (user_id, research_id) 
        VALUES (NEW.patient_id, v_research_id)
        ON CONFLICT (user_id) DO NOTHING  -- CRITICAL: Don't overwrite existing!
        RETURNING research_id INTO v_research_id;
        
        -- If conflict occurred, get the existing research_id
        IF v_research_id IS NULL THEN
            SELECT research_id INTO v_research_id 
            FROM linkage.research_id_map 
            WHERE user_id = NEW.patient_id;
        END IF;
    END IF;
    
    -- Sync to research schema (de-identified)
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
$$;

-- Fix anonymize_seizure_to_research
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
    
    -- Get existing research_id or create new one
    SELECT research_id INTO v_research_id 
    FROM linkage.research_id_map 
    WHERE user_id = NEW.patient_id;
    
    IF v_research_id IS NULL THEN
        -- Create new research_id
        v_research_id := gen_random_uuid();
        INSERT INTO linkage.research_id_map (user_id, research_id) 
        VALUES (NEW.patient_id, v_research_id)
        ON CONFLICT (user_id) DO NOTHING  -- CRITICAL: Don't overwrite existing!
        RETURNING research_id INTO v_research_id;
        
        -- If conflict occurred, get the existing research_id
        IF v_research_id IS NULL THEN
            SELECT research_id INTO v_research_id 
            FROM linkage.research_id_map 
            WHERE user_id = NEW.patient_id;
        END IF;
    END IF;
    
    -- Sync to research schema (de-identified)
    INSERT INTO research.seizure_events (
        research_id,
        occurred_at,
        duration_seconds,
        seizure_type,
        seizure_subtype,
        severity,
        consciousness_level,
        had_aura,
        aura_signs,
        warning_time_seconds,
        possible_triggers,
        body_parts_affected,
        motor_symptoms,
        non_motor_symptoms,
        post_ictal_confusion,
        post_ictal_effects,
        post_ictal_duration_minutes,
        injuries_occurred,
        injury_types,
        required_medical_attention,
        location,
        activity_before,
        witnessed,
        medication_taken_as_prescribed,
        hours_since_last_dose,
        recent_medication_changes,
        fully_recovered,
        recovery_time_minutes,
        video_recorded,
        source_event_id
    ) VALUES (
        v_research_id,
        NEW.occurred_at,
        NEW.duration_seconds,
        NEW.seizure_type,
        NEW.seizure_subtype,
        NEW.severity,
        NEW.consciousness_level,
        NEW.had_aura,
        NEW.aura_signs,
        NEW.warning_time_seconds,
        NEW.possible_triggers,
        NEW.body_parts_affected,
        NEW.motor_symptoms,
        NEW.non_motor_symptoms,
        NEW.post_ictal_confusion,
        NEW.post_ictal_effects,
        NEW.post_ictal_duration_minutes,
        NEW.injuries_occurred,
        NEW.injury_types,
        NEW.required_medical_attention,
        NEW.location,
        NEW.activity_before,
        NEW.witnessed,
        NEW.medication_taken_as_prescribed,
        NEW.hours_since_last_dose,
        NEW.recent_medication_changes,
        NEW.fully_recovered,
        NEW.recovery_time_minutes,
        NEW.video_recorded,
        NEW.event_id
    ) ON CONFLICT (research_id, occurred_at) DO UPDATE SET
        duration_seconds = EXCLUDED.duration_seconds,
        severity = EXCLUDED.severity,
        updated_at = NOW();
    
    RETURN NEW;
END;
$$;

-- ============================================================================
-- 2. Create research_id during onboarding when user opts in
-- ============================================================================

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
        -- Already exists, return it
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
        'v1.0',  -- Update with your consent version
        'Created during onboarding'
    )
    ON CONFLICT (user_id) DO NOTHING;
    
    RETURN v_research_id;
END;
$$;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION public.create_research_id_for_user TO authenticated;

-- ============================================================================
-- 3. Update complete_onboarding to create research_id
-- ============================================================================

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
        
        -- Also record in research_consent table
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

-- Grant execute permission
GRANT EXECUTE ON FUNCTION public.complete_onboarding TO authenticated;

-- ============================================================================
-- 4. Verify research_id uniqueness and integrity
-- ============================================================================

-- Add constraint to ensure research_id is never null if row exists
ALTER TABLE linkage.research_id_map
ALTER COLUMN research_id SET NOT NULL;

-- Add audit trigger to log access
CREATE OR REPLACE FUNCTION linkage.audit_research_id_access()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- Update access tracking
    UPDATE linkage.research_id_map
    SET last_accessed = NOW(),
        access_count = COALESCE(access_count, 0) + 1
    WHERE research_id = NEW.research_id;
    
    RETURN NEW;
END;
$$;

-- ============================================================================
-- 5. Notify PostgREST to reload schema
-- ============================================================================

NOTIFY pgrst, 'reload schema';

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- Check if research_id_map has any duplicate user_ids
-- SELECT user_id, COUNT(*) as count
-- FROM linkage.research_id_map
-- GROUP BY user_id
-- HAVING COUNT(*) > 1;

-- Check if research_id_map has any duplicate research_ids
-- SELECT research_id, COUNT(*) as count
-- FROM linkage.research_id_map
-- GROUP BY research_id
-- HAVING COUNT(*) > 1;

-- Check users with research consent but no research_id
-- SELECT rc.user_id
-- FROM public.research_consent rc
-- LEFT JOIN linkage.research_id_map rim ON rc.user_id = rim.user_id
-- WHERE rc.consent_given = true
-- AND rim.research_id IS NULL;

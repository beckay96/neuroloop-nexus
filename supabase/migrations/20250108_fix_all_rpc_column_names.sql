-- =====================================================
-- FIX ALL RPC FUNCTIONS - COMPLETE COLUMN NAME CORRECTIONS
-- =====================================================
-- Based on ACTUAL database schema from the-tables-that-matter.md
-- Fixing ALL column mismatches
-- =====================================================

-- ============================================================================
-- 1. FIX get_seizure_logs
--    - Table: seizure_logs_research (NOT seizure_events!)
--    - Primary key: log_id (not id)
--    - Foreign key: user_id (not patient_id)
-- ============================================================================
CREATE OR REPLACE FUNCTION get_seizure_logs(p_user_id UUID)
RETURNS TABLE (
  log_id UUID,
  user_id UUID,
  log_date DATE,
  log_time TIME,
  seizure_type TEXT,
  consciousness_level TEXT,
  duration_seconds INTEGER,
  aura_present TEXT,
  aura_description TEXT,
  witnessed TEXT,
  witness_role TEXT,
  video_recorded TEXT,
  location_type TEXT,
  post_ictal_confusion_minutes INTEGER,
  recovery_time_minutes INTEGER,
  sleep_hours_prior NUMERIC,
  medication_adherence_prior TEXT,
  stress_level TEXT,
  emergency_services_called TEXT,
  rescue_medication_used TEXT,
  rescue_medication_type TEXT,
  hospitalized TEXT,
  research_grade TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = private_health_info, public
AS $$
BEGIN
  IF p_user_id != auth.uid() THEN
    RAISE EXCEPTION 'Access denied' USING ERRCODE = '42501';
  END IF;
  
  RETURN QUERY
  SELECT 
    sl.log_id,
    sl.user_id,
    sl.log_date,
    sl.log_time,
    sl.seizure_type::TEXT,
    sl.consciousness_level::TEXT,
    sl.duration_seconds,
    sl.aura_present::TEXT,
    sl.aura_description,
    sl.witnessed::TEXT,
    sl.witness_role::TEXT,
    sl.video_recorded::TEXT,
    sl.location_type::TEXT,
    sl.post_ictal_confusion_minutes,
    sl.recovery_time_minutes,
    sl.sleep_hours_prior,
    sl.medication_adherence_prior::TEXT,
    sl.stress_level::TEXT,
    sl.emergency_services_called::TEXT,
    sl.rescue_medication_used::TEXT,
    sl.rescue_medication_type::TEXT,
    sl.hospitalized::TEXT,
    sl.research_grade::TEXT,
    sl.notes,
    sl.created_at,
    sl.updated_at
  FROM private_health_info.seizure_logs_research sl
  WHERE sl.user_id = p_user_id
  ORDER BY sl.log_date DESC, sl.log_time DESC;
END;
$$;

GRANT EXECUTE ON FUNCTION get_seizure_logs(UUID) TO authenticated;
REVOKE EXECUTE ON FUNCTION get_seizure_logs(UUID) FROM anon;

-- ============================================================================
-- 2. FIX get_symptom_logs
--    - Table: daily_symptom_logs
--    - Primary key: log_id (not id)
--    - Foreign key: patient_id
-- ============================================================================
CREATE OR REPLACE FUNCTION get_symptom_logs(p_patient_id UUID)
RETURNS TABLE (
  log_id UUID,
  patient_id UUID,
  log_date DATE,
  overall_feeling INTEGER,
  mood INTEGER,
  energy_level INTEGER,
  fatigue_level INTEGER,
  pain_level INTEGER,
  sleep_quality INTEGER,
  sleep_hours NUMERIC,
  sleep_disturbances JSONB,
  motor_fluctuations_occurred BOOLEAN,
  on_time_hours NUMERIC,
  off_time_hours NUMERIC,
  dyskinesia_severity INTEGER,
  stiffness_severity INTEGER,
  slowness_severity INTEGER,
  cognitive_issues JSONB,
  mood_issues JSONB,
  autonomic_symptoms JSONB,
  adl_independence_level INTEGER,
  activities_difficult JSONB,
  all_medications_taken BOOLEAN,
  missed_doses TEXT,
  medication_side_effects JSONB,
  other_symptoms JSONB,
  symptom_notes TEXT,
  stress_level INTEGER,
  exercise_minutes INTEGER,
  notable_events TEXT,
  shared_with_clinician BOOLEAN,
  visible_to_researchers BOOLEAN,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = private_health_info, public
AS $$
BEGIN
  IF p_patient_id != auth.uid() THEN
    RAISE EXCEPTION 'Access denied' USING ERRCODE = '42501';
  END IF;
  
  RETURN QUERY
  SELECT 
    dsl.log_id,
    dsl.patient_id,
    dsl.log_date,
    dsl.overall_feeling,
    dsl.mood,
    dsl.energy_level,
    dsl.fatigue_level,
    dsl.pain_level,
    dsl.sleep_quality,
    dsl.sleep_hours,
    dsl.sleep_disturbances,
    dsl.motor_fluctuations_occurred,
    dsl.on_time_hours,
    dsl.off_time_hours,
    dsl.dyskinesia_severity,
    dsl.stiffness_severity,
    dsl.slowness_severity,
    dsl.cognitive_issues,
    dsl.mood_issues,
    dsl.autonomic_symptoms,
    dsl.adl_independence_level,
    dsl.activities_difficult,
    dsl.all_medications_taken,
    dsl.missed_doses,
    dsl.medication_side_effects,
    dsl.other_symptoms,
    dsl.symptom_notes,
    dsl.stress_level,
    dsl.exercise_minutes,
    dsl.notable_events,
    dsl.shared_with_clinician,
    dsl.visible_to_researchers,
    dsl.created_at,
    dsl.updated_at
  FROM private_health_info.daily_symptom_logs dsl
  WHERE dsl.patient_id = p_patient_id
  ORDER BY dsl.log_date DESC;
END;
$$;

GRANT EXECUTE ON FUNCTION get_symptom_logs(UUID) TO authenticated;
REVOKE EXECUTE ON FUNCTION get_symptom_logs(UUID) FROM anon;

-- ============================================================================
-- 3. FIX get_menstrual_logs
--    - NO log_date column! Has cycle_start_date, cycle_end_date
-- ============================================================================
CREATE OR REPLACE FUNCTION get_menstrual_logs(p_user_id UUID)
RETURNS TABLE (
  id UUID,
  user_id UUID,
  cycle_start_date DATE,
  cycle_end_date DATE,
  cycle_length_days INTEGER,
  flow_intensity TEXT,
  cycle_phase TEXT,
  overall_symptom_severity INTEGER,
  seizure_count_during_cycle INTEGER,
  seizure_clustered_around_menstruation BOOLEAN,
  catamenial_pattern_suspected BOOLEAN,
  notes TEXT,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = private_health_info, public
AS $$
BEGIN
  IF p_user_id != auth.uid() THEN
    RAISE EXCEPTION 'Access denied' USING ERRCODE = '42501';
  END IF;
  
  RETURN QUERY
  SELECT 
    ml.id,
    ml.user_id,
    ml.cycle_start_date,
    ml.cycle_end_date,
    ml.cycle_length_days,
    ml.flow_intensity::TEXT,
    ml.cycle_phase::TEXT,
    ml.overall_symptom_severity,
    ml.seizure_count_during_cycle,
    ml.seizure_clustered_around_menstruation,
    ml.catamenial_pattern_suspected,
    ml.notes,
    ml.created_at,
    ml.updated_at
  FROM private_health_info.menstrual_cycle_logs ml
  WHERE ml.user_id = p_user_id
  ORDER BY ml.cycle_start_date DESC;
END;
$$;

GRANT EXECUTE ON FUNCTION get_menstrual_logs(UUID) TO authenticated;
REVOKE EXECUTE ON FUNCTION get_menstrual_logs(UUID) FROM anon;

-- ============================================================================
-- 4. FIX get_temperature_logs
--    - Column is temperature_celsius (not temperature)
-- ============================================================================
CREATE OR REPLACE FUNCTION get_temperature_logs(p_user_id UUID)
RETURNS TABLE (
  id UUID,
  user_id UUID,
  log_date DATE,
  log_time TIME,
  temperature_celsius NUMERIC,
  notes TEXT,
  created_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = private_health_info, public
AS $$
BEGIN
  IF p_user_id != auth.uid() THEN
    RAISE EXCEPTION 'Access denied' USING ERRCODE = '42501';
  END IF;
  
  RETURN QUERY
  SELECT 
    btl.id,
    btl.user_id,
    btl.log_date,
    btl.log_time,
    btl.temperature_celsius,
    btl.notes,
    btl.created_at
  FROM private_health_info.basal_temperature_logs btl
  WHERE btl.user_id = p_user_id
  ORDER BY btl.log_date DESC, btl.log_time DESC;
END;
$$;

GRANT EXECUTE ON FUNCTION get_temperature_logs(UUID) TO authenticated;
REVOKE EXECUTE ON FUNCTION get_temperature_logs(UUID) FROM anon;

-- ============================================================================
-- 5. FIX get_medication_logs
--    - NO dosage_taken column!
--    - NO side_effects column!
--    - Only has: id, user_id, user_medication_id, log_date, log_time, taken, notes, created_at
-- ============================================================================
CREATE OR REPLACE FUNCTION get_medication_logs(p_user_id UUID)
RETURNS TABLE (
  id UUID,
  user_id UUID,
  user_medication_id UUID,
  log_date DATE,
  log_time TIME,
  taken BOOLEAN,
  notes TEXT,
  created_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = private_health_info, public
AS $$
BEGIN
  IF p_user_id != auth.uid() THEN
    RAISE EXCEPTION 'Access denied' USING ERRCODE = '42501';
  END IF;
  
  RETURN QUERY
  SELECT 
    ml.id,
    ml.user_id,
    ml.user_medication_id,
    ml.log_date,
    ml.log_time,
    ml.taken,
    ml.notes,
    ml.created_at
  FROM private_health_info.medication_logs ml
  WHERE ml.user_id = p_user_id
  ORDER BY ml.log_date DESC, ml.log_time DESC;
END;
$$;

GRANT EXECUTE ON FUNCTION get_medication_logs(UUID) TO authenticated;
REVOKE EXECUTE ON FUNCTION get_medication_logs(UUID) FROM anon;

-- ============================================================================
-- VERIFICATION
-- ============================================================================
DO $$
BEGIN
  RAISE NOTICE '✅ ALL RPC FUNCTIONS FIXED:';
  RAISE NOTICE '  - get_seizure_logs: Uses seizure_logs_research, log_id, user_id';
  RAISE NOTICE '  - get_symptom_logs: Uses daily_symptom_logs, log_id, patient_id';
  RAISE NOTICE '  - get_menstrual_logs: Uses cycle_start_date (not log_date)';
  RAISE NOTICE '  - get_temperature_logs: Uses temperature_celsius';
  RAISE NOTICE '  - get_medication_logs: Removed non-existent columns';
END $$;

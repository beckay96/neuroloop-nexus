-- =====================================================
-- COMPLETE PRIVATE_HEALTH_INFO RPC FUNCTIONS
-- =====================================================
-- All private_health_info tables MUST be accessed via RPC functions
-- Direct access via JS client .schema() is NOT allowed by PostgREST
-- =====================================================

-- ============================================================================
-- SEIZURE EVENTS (uses patient_id, primary key: event_id)
-- ============================================================================
CREATE OR REPLACE FUNCTION get_seizure_events(p_patient_id UUID)
RETURNS TABLE (
  event_id UUID,
  patient_id UUID,
  occurred_at TIMESTAMPTZ,
  duration_seconds INTEGER,
  seizure_type TEXT,
  seizure_subtype TEXT,
  severity INTEGER,
  consciousness_level TEXT,
  had_aura BOOLEAN,
  aura_signs JSONB,
  aura_description TEXT,
  warning_time_seconds INTEGER,
  possible_triggers JSONB,
  trigger_details TEXT,
  body_parts_affected JSONB,
  motor_symptoms JSONB,
  non_motor_symptoms JSONB,
  post_ictal_confusion BOOLEAN,
  post_ictal_effects JSONB,
  post_ictal_duration_minutes INTEGER,
  injuries_occurred BOOLEAN,
  injury_types JSONB,
  injury_description TEXT,
  required_medical_attention BOOLEAN,
  location TEXT,
  activity_before TEXT,
  witnessed BOOLEAN,
  witness_name TEXT,
  witness_description TEXT,
  medication_taken_as_prescribed BOOLEAN,
  hours_since_last_dose INTEGER,
  recent_medication_changes BOOLEAN,
  fully_recovered BOOLEAN,
  recovery_time_minutes INTEGER,
  video_recorded BOOLEAN,
  media_urls JSONB,
  notes TEXT,
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
    se.event_id, se.patient_id, se.occurred_at, se.duration_seconds,
    se.seizure_type, se.seizure_subtype, se.severity, se.consciousness_level,
    se.had_aura, se.aura_signs, se.aura_description, se.warning_time_seconds,
    se.possible_triggers, se.trigger_details, se.body_parts_affected,
    se.motor_symptoms, se.non_motor_symptoms, se.post_ictal_confusion,
    se.post_ictal_effects, se.post_ictal_duration_minutes, se.injuries_occurred,
    se.injury_types, se.injury_description, se.required_medical_attention,
    se.location, se.activity_before, se.witnessed, se.witness_name,
    se.witness_description, se.medication_taken_as_prescribed, se.hours_since_last_dose,
    se.recent_medication_changes, se.fully_recovered, se.recovery_time_minutes,
    se.video_recorded, se.media_urls, se.notes, se.shared_with_clinician,
    se.visible_to_researchers, se.created_at, se.updated_at
  FROM private_health_info.seizure_events se
  WHERE se.patient_id = p_patient_id
  ORDER BY se.occurred_at DESC;
END;
$$;

GRANT EXECUTE ON FUNCTION get_seizure_events(UUID) TO authenticated;
REVOKE EXECUTE ON FUNCTION get_seizure_events(UUID) FROM anon;

-- ============================================================================
-- DAILY SYMPTOM LOGS (uses patient_id, primary key: log_id)
-- ============================================================================
CREATE OR REPLACE FUNCTION get_daily_symptom_logs(p_patient_id UUID)
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
    dsl.log_id, dsl.patient_id, dsl.log_date, dsl.overall_feeling,
    dsl.mood, dsl.energy_level, dsl.fatigue_level, dsl.pain_level,
    dsl.sleep_quality, dsl.sleep_hours, dsl.sleep_disturbances,
    dsl.motor_fluctuations_occurred, dsl.on_time_hours, dsl.off_time_hours,
    dsl.dyskinesia_severity, dsl.stiffness_severity, dsl.slowness_severity,
    dsl.cognitive_issues, dsl.mood_issues, dsl.autonomic_symptoms,
    dsl.adl_independence_level, dsl.activities_difficult, dsl.all_medications_taken,
    dsl.missed_doses, dsl.medication_side_effects, dsl.other_symptoms,
    dsl.symptom_notes, dsl.stress_level, dsl.exercise_minutes,
    dsl.notable_events, dsl.shared_with_clinician, dsl.visible_to_researchers,
    dsl.created_at, dsl.updated_at
  FROM private_health_info.daily_symptom_logs dsl
  WHERE dsl.patient_id = p_patient_id
  ORDER BY dsl.log_date DESC;
END;
$$;

GRANT EXECUTE ON FUNCTION get_daily_symptom_logs(UUID) TO authenticated;
REVOKE EXECUTE ON FUNCTION get_daily_symptom_logs(UUID) FROM anon;

-- ============================================================================
-- GAIT EPISODES (uses patient_id, primary key: gait_id)
-- ============================================================================
CREATE OR REPLACE FUNCTION get_gait_episodes(p_patient_id UUID)
RETURNS TABLE (
  gait_id UUID,
  patient_id UUID,
  occurred_at TIMESTAMPTZ,
  duration_seconds INTEGER,
  event_type TEXT,
  severity INTEGER,
  resulted_in_fall BOOLEAN,
  fall_direction TEXT,
  injury_occurred BOOLEAN,
  injury_description TEXT,
  required_assistance BOOLEAN,
  location TEXT,
  activity TEXT,
  environmental_factors JSONB,
  medication_status TEXT,
  hours_since_medication INTEGER,
  freezing_trigger TEXT,
  broke_freeze_with TEXT,
  video_recorded BOOLEAN,
  media_urls JSONB,
  notes TEXT,
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
    ge.gait_id, ge.patient_id, ge.occurred_at, ge.duration_seconds,
    ge.event_type, ge.severity, ge.resulted_in_fall, ge.fall_direction,
    ge.injury_occurred, ge.injury_description, ge.required_assistance,
    ge.location, ge.activity, ge.environmental_factors,
    ge.medication_status, ge.hours_since_medication, ge.freezing_trigger,
    ge.broke_freeze_with, ge.video_recorded, ge.media_urls, ge.notes,
    ge.shared_with_clinician, ge.visible_to_researchers, ge.created_at, ge.updated_at
  FROM private_health_info.gait_episodes ge
  WHERE ge.patient_id = p_patient_id
  ORDER BY ge.occurred_at DESC;
END;
$$;

GRANT EXECUTE ON FUNCTION get_gait_episodes(UUID) TO authenticated;
REVOKE EXECUTE ON FUNCTION get_gait_episodes(UUID) FROM anon;

-- ============================================================================
-- MEDICATION LOGS (uses user_id, primary key: id)
-- ============================================================================
CREATE OR REPLACE FUNCTION get_medication_logs(p_user_id UUID)
RETURNS TABLE (
  id UUID,
  user_id UUID,
  user_medication_id UUID,
  log_date DATE,
  log_time TIME,
  dosage_taken TEXT,
  taken BOOLEAN,
  side_effects JSONB,
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
    ml.id, ml.user_id, ml.user_medication_id, ml.log_date,
    ml.log_time, ml.dosage_taken, ml.taken, ml.side_effects,
    ml.notes, ml.created_at
  FROM private_health_info.medication_logs ml
  WHERE ml.user_id = p_user_id
  ORDER BY ml.log_date DESC, ml.log_time DESC;
END;
$$;

GRANT EXECUTE ON FUNCTION get_medication_logs(UUID) TO authenticated;
REVOKE EXECUTE ON FUNCTION get_medication_logs(UUID) FROM anon;

-- ============================================================================
-- MENSTRUAL CYCLE LOGS (uses user_id, primary key: id)
-- ============================================================================
CREATE OR REPLACE FUNCTION get_menstrual_cycle_logs(p_user_id UUID)
RETURNS TABLE (
  id UUID,
  user_id UUID,
  cycle_start_date DATE,
  cycle_end_date DATE,
  period_start_date DATE,
  period_end_date DATE,
  flow_intensity TEXT,
  symptoms JSONB,
  mood_changes JSONB,
  pain_level INTEGER,
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
    mcl.id, mcl.user_id, mcl.cycle_start_date, mcl.cycle_end_date,
    mcl.period_start_date, mcl.period_end_date, mcl.flow_intensity,
    mcl.symptoms, mcl.mood_changes, mcl.pain_level, mcl.notes,
    mcl.created_at
  FROM private_health_info.menstrual_cycle_logs mcl
  WHERE mcl.user_id = p_user_id
  ORDER BY mcl.cycle_start_date DESC;
END;
$$;

GRANT EXECUTE ON FUNCTION get_menstrual_cycle_logs(UUID) TO authenticated;
REVOKE EXECUTE ON FUNCTION get_menstrual_cycle_logs(UUID) FROM anon;

-- ============================================================================
-- BASAL TEMPERATURE LOGS (uses user_id, primary key: id)
-- ============================================================================
CREATE OR REPLACE FUNCTION get_basal_temperature_logs(p_user_id UUID)
RETURNS TABLE (
  id UUID,
  user_id UUID,
  log_date DATE,
  log_time TIME,
  temperature_celsius NUMERIC,
  sleep_quality TEXT,
  disturbances TEXT,
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
    btl.id, btl.user_id, btl.log_date, btl.log_time,
    btl.temperature_celsius, btl.sleep_quality, btl.disturbances,
    btl.notes, btl.created_at
  FROM private_health_info.basal_temperature_logs btl
  WHERE btl.user_id = p_user_id
  ORDER BY btl.log_date DESC, btl.log_time DESC;
END;
$$;

GRANT EXECUTE ON FUNCTION get_basal_temperature_logs(UUID) TO authenticated;
REVOKE EXECUTE ON FUNCTION get_basal_temperature_logs(UUID) FROM anon;

-- ============================================================================
-- VERIFICATION
-- ============================================================================
CREATE TEMP TABLE private_health_info_rpc_verification (
    function_name TEXT,
    status TEXT,
    details TEXT
);

INSERT INTO private_health_info_rpc_verification VALUES
  ('get_seizure_events', '✅ CREATED', 'Access seizure_events via RPC (patient_id)'),
  ('get_daily_symptom_logs', '✅ CREATED', 'Access daily_symptom_logs via RPC (patient_id)'),
  ('get_gait_episodes', '✅ CREATED', 'Access gait_episodes via RPC (patient_id)'),
  ('get_medication_logs', '✅ CREATED', 'Access medication_logs via RPC (user_id)'),
  ('get_menstrual_cycle_logs', '✅ CREATED', 'Access menstrual_cycle_logs via RPC (user_id)'),
  ('get_basal_temperature_logs', '✅ CREATED', 'Access basal_temperature_logs via RPC (user_id)');

SELECT * FROM private_health_info_rpc_verification;

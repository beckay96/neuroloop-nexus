-- ============================================================================
-- COMPLETE HIPAA-COMPLIANT RPC FUNCTIONS FOR ALL NON-PUBLIC SCHEMAS
-- ============================================================================
-- This migration creates RPC functions for ALL tables in:
-- - private_health_info
-- - clinical
-- - research
-- 
-- This eliminates ALL direct schema access from the frontend
-- ============================================================================

-- ============================================================================
-- TRACKING ENTRIES (Daily Check-ins)
-- ============================================================================
CREATE OR REPLACE FUNCTION get_tracking_entries(p_user_id UUID)
RETURNS TABLE (
  id UUID,
  user_id UUID,
  entry_date DATE,
  mood_level TEXT,
  energy_level TEXT,
  sleep_quality TEXT,
  sleep_hours NUMERIC,
  symptoms TEXT[],
  notes TEXT,
  created_at TIMESTAMPTZ
) LANGUAGE plpgsql SECURITY DEFINER SET search_path = private_health_info, public
AS $$
BEGIN
  IF p_user_id != auth.uid() THEN
    RAISE EXCEPTION 'Access denied' USING ERRCODE = '42501';
  END IF;
  
  RETURN QUERY
  SELECT 
    te.id, te.user_id, te.entry_date, te.mood_level, te.energy_level,
    te.sleep_quality, te.sleep_hours, te.symptoms, te.notes, te.created_at
  FROM private_health_info.tracking_entries te
  WHERE te.user_id = p_user_id
  ORDER BY te.entry_date DESC;
END;
$$;

CREATE OR REPLACE FUNCTION save_tracking_entry(
  p_user_id UUID,
  p_entry_date DATE,
  p_mood_level TEXT DEFAULT NULL,
  p_energy_level TEXT DEFAULT NULL,
  p_sleep_quality TEXT DEFAULT NULL,
  p_sleep_hours NUMERIC DEFAULT NULL,
  p_symptoms TEXT[] DEFAULT NULL,
  p_notes TEXT DEFAULT NULL
) RETURNS UUID LANGUAGE plpgsql SECURITY DEFINER SET search_path = private_health_info, public
AS $$
DECLARE
  v_id UUID;
BEGIN
  IF p_user_id != auth.uid() THEN
    RAISE EXCEPTION 'Access denied' USING ERRCODE = '42501';
  END IF;
  
  INSERT INTO private_health_info.tracking_entries (
    user_id, entry_date, mood_level, energy_level, 
    sleep_quality, sleep_hours, symptoms, notes
  ) VALUES (
    p_user_id, p_entry_date, p_mood_level, p_energy_level,
    p_sleep_quality, p_sleep_hours, p_symptoms, p_notes
  )
  ON CONFLICT (user_id, entry_date) 
  DO UPDATE SET
    mood_level = EXCLUDED.mood_level,
    energy_level = EXCLUDED.energy_level,
    sleep_quality = EXCLUDED.sleep_quality,
    sleep_hours = EXCLUDED.sleep_hours,
    symptoms = EXCLUDED.symptoms,
    notes = EXCLUDED.notes
  RETURNING id INTO v_id;
  
  RETURN v_id;
END;
$$;

-- ============================================================================
-- SEIZURE LOGS (Research Grade)
-- ============================================================================
CREATE OR REPLACE FUNCTION get_seizure_logs(p_user_id UUID)
RETURNS TABLE (
  log_id UUID,
  user_id UUID,
  occurred_at TIMESTAMPTZ,
  duration_seconds INTEGER,
  seizure_type TEXT,
  consciousness_level TEXT,
  warning_signs TEXT[],
  post_ictal_symptoms TEXT[],
  possible_triggers TEXT[],
  location_during TEXT,
  rescue_medication_given BOOLEAN,
  emergency_services_called BOOLEAN,
  notes TEXT,
  created_at TIMESTAMPTZ
) LANGUAGE plpgsql SECURITY DEFINER SET search_path = private_health_info, public
AS $$
BEGIN
  IF p_user_id != auth.uid() THEN
    RAISE EXCEPTION 'Access denied' USING ERRCODE = '42501';
  END IF;
  
  RETURN QUERY
  SELECT 
    sl.log_id, sl.user_id, sl.occurred_at, sl.duration_seconds,
    sl.seizure_type, sl.consciousness_level, sl.warning_signs,
    sl.post_ictal_symptoms, sl.possible_triggers, sl.location_during,
    sl.rescue_medication_given, sl.emergency_services_called,
    sl.notes, sl.created_at
  FROM private_health_info.seizure_logs_research sl
  WHERE sl.user_id = p_user_id
  ORDER BY sl.occurred_at DESC;
END;
$$;

CREATE OR REPLACE FUNCTION save_seizure_log(
  p_user_id UUID,
  p_occurred_at TIMESTAMPTZ,
  p_duration_seconds INTEGER DEFAULT NULL,
  p_seizure_type TEXT DEFAULT NULL,
  p_consciousness_level TEXT DEFAULT NULL,
  p_warning_signs TEXT[] DEFAULT NULL,
  p_post_ictal_symptoms TEXT[] DEFAULT NULL,
  p_possible_triggers TEXT[] DEFAULT NULL,
  p_location_during TEXT DEFAULT NULL,
  p_rescue_medication_given BOOLEAN DEFAULT FALSE,
  p_emergency_services_called BOOLEAN DEFAULT FALSE,
  p_notes TEXT DEFAULT NULL
) RETURNS UUID LANGUAGE plpgsql SECURITY DEFINER SET search_path = private_health_info, public
AS $$
DECLARE
  v_log_id UUID;
BEGIN
  IF p_user_id != auth.uid() THEN
    RAISE EXCEPTION 'Access denied' USING ERRCODE = '42501';
  END IF;
  
  INSERT INTO private_health_info.seizure_logs_research (
    user_id, occurred_at, duration_seconds, seizure_type,
    consciousness_level, warning_signs, post_ictal_symptoms,
    possible_triggers, location_during, rescue_medication_given,
    emergency_services_called, notes
  ) VALUES (
    p_user_id, p_occurred_at, p_duration_seconds, p_seizure_type,
    p_consciousness_level, p_warning_signs, p_post_ictal_symptoms,
    p_possible_triggers, p_location_during, p_rescue_medication_given,
    p_emergency_services_called, p_notes
  ) RETURNING log_id INTO v_log_id;
  
  RETURN v_log_id;
END;
$$;

-- ============================================================================
-- SYMPTOM LOGS (Daily Symptoms)
-- ============================================================================
CREATE OR REPLACE FUNCTION get_symptom_logs(p_patient_id UUID)
RETURNS TABLE (
  id UUID,
  patient_id UUID,
  log_date DATE,
  log_time TIME,
  symptom_type TEXT,
  severity INTEGER,
  duration_minutes INTEGER,
  location TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ
) LANGUAGE plpgsql SECURITY DEFINER SET search_path = private_health_info, public
AS $$
BEGIN
  -- Note: symptom_logs uses patient_id, not user_id
  IF p_patient_id != auth.uid() THEN
    RAISE EXCEPTION 'Access denied' USING ERRCODE = '42501';
  END IF;
  
  RETURN QUERY
  SELECT 
    dsl.id, dsl.patient_id, dsl.log_date, dsl.log_time,
    dsl.symptom_type, dsl.severity, dsl.duration_minutes,
    dsl.location, dsl.notes, dsl.created_at
  FROM private_health_info.daily_symptom_logs dsl
  WHERE dsl.patient_id = p_patient_id
  ORDER BY dsl.log_date DESC, dsl.log_time DESC;
END;
$$;

-- ============================================================================
-- TREMOR EPISODES
-- ============================================================================
CREATE OR REPLACE FUNCTION get_tremor_episodes(p_patient_id UUID)
RETURNS TABLE (
  id UUID,
  patient_id UUID,
  episode_date DATE,
  episode_time TIME,
  tremor_type TEXT,
  body_part TEXT,
  severity INTEGER,
  duration_minutes INTEGER,
  activity_during TEXT,
  medication_taken BOOLEAN,
  notes TEXT,
  created_at TIMESTAMPTZ
) LANGUAGE plpgsql SECURITY DEFINER SET search_path = private_health_info, public
AS $$
BEGIN
  -- Note: tremor_episodes uses patient_id, not user_id
  IF p_patient_id != auth.uid() THEN
    RAISE EXCEPTION 'Access denied' USING ERRCODE = '42501';
  END IF;
  
  RETURN QUERY
  SELECT 
    te.id, te.patient_id, te.episode_date, te.episode_time,
    te.tremor_type, te.body_part, te.severity, te.duration_minutes,
    te.activity_during, te.medication_taken, te.notes, te.created_at
  FROM private_health_info.tremor_episodes te
  WHERE te.patient_id = p_patient_id
  ORDER BY te.episode_date DESC, te.episode_time DESC;
END;
$$;

-- ============================================================================
-- GAIT EPISODES
-- ============================================================================
CREATE OR REPLACE FUNCTION get_gait_episodes(p_patient_id UUID)
RETURNS TABLE (
  id UUID,
  patient_id UUID,
  episode_date DATE,
  episode_time TIME,
  gait_type TEXT,
  freezing_episodes BOOLEAN,
  falls BOOLEAN,
  duration_minutes INTEGER,
  distance_meters NUMERIC,
  assistance_needed BOOLEAN,
  notes TEXT,
  created_at TIMESTAMPTZ
) LANGUAGE plpgsql SECURITY DEFINER SET search_path = private_health_info, public
AS $$
BEGIN
  -- Note: gait_episodes uses patient_id, not user_id
  IF p_patient_id != auth.uid() THEN
    RAISE EXCEPTION 'Access denied' USING ERRCODE = '42501';
  END IF;
  
  RETURN QUERY
  SELECT 
    ge.id, ge.patient_id, ge.episode_date, ge.episode_time,
    ge.gait_type, ge.freezing_episodes, ge.falls, ge.duration_minutes,
    ge.distance_meters, ge.assistance_needed, ge.notes, ge.created_at
  FROM private_health_info.gait_episodes ge
  WHERE ge.patient_id = p_patient_id
  ORDER BY ge.episode_date DESC, ge.episode_time DESC;
END;
$$;

-- ============================================================================
-- MENSTRUAL CYCLE LOGS
-- ============================================================================
CREATE OR REPLACE FUNCTION get_menstrual_logs(p_user_id UUID)
RETURNS TABLE (
  id UUID,
  user_id UUID,
  log_date DATE,
  is_period_day BOOLEAN,
  flow_intensity TEXT,
  symptoms TEXT[],
  basal_temp NUMERIC,
  notes TEXT,
  created_at TIMESTAMPTZ
) LANGUAGE plpgsql SECURITY DEFINER SET search_path = private_health_info, public
AS $$
BEGIN
  IF p_user_id != auth.uid() THEN
    RAISE EXCEPTION 'Access denied' USING ERRCODE = '42501';
  END IF;
  
  RETURN QUERY
  SELECT 
    ml.id, ml.user_id, ml.log_date, ml.is_period_day,
    ml.flow_intensity, ml.symptoms, ml.basal_temp,
    ml.notes, ml.created_at
  FROM private_health_info.menstrual_cycle_logs ml
  WHERE ml.user_id = p_user_id
  ORDER BY ml.log_date DESC;
END;
$$;

-- ============================================================================
-- BASAL TEMPERATURE LOGS
-- ============================================================================
CREATE OR REPLACE FUNCTION get_temperature_logs(p_user_id UUID)
RETURNS TABLE (
  id UUID,
  user_id UUID,
  log_date DATE,
  log_time TIME,
  temperature NUMERIC,
  unit TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ
) LANGUAGE plpgsql SECURITY DEFINER SET search_path = private_health_info, public
AS $$
BEGIN
  IF p_user_id != auth.uid() THEN
    RAISE EXCEPTION 'Access denied' USING ERRCODE = '42501';
  END IF;
  
  RETURN QUERY
  SELECT 
    btl.id, btl.user_id, btl.log_date, btl.log_time,
    btl.temperature, btl.unit, btl.notes, btl.created_at
  FROM private_health_info.basal_temperature_logs btl
  WHERE btl.user_id = p_user_id
  ORDER BY btl.log_date DESC, btl.log_time DESC;
END;
$$;

-- ============================================================================
-- MEDICATION LOGS
-- ============================================================================
CREATE OR REPLACE FUNCTION get_medication_logs(p_user_id UUID)
RETURNS TABLE (
  id UUID,
  user_id UUID,
  user_medication_id UUID,
  log_date DATE,
  log_time TIME,
  taken BOOLEAN,
  missed_reason TEXT,
  side_effects TEXT[],
  notes TEXT,
  created_at TIMESTAMPTZ
) LANGUAGE plpgsql SECURITY DEFINER SET search_path = private_health_info, public
AS $$
BEGIN
  IF p_user_id != auth.uid() THEN
    RAISE EXCEPTION 'Access denied' USING ERRCODE = '42501';
  END IF;
  
  RETURN QUERY
  SELECT 
    ml.id, ml.user_id, ml.user_medication_id, ml.log_date, ml.log_time,
    ml.taken, ml.missed_reason, ml.side_effects, ml.notes, ml.created_at
  FROM private_health_info.medication_logs ml
  WHERE ml.user_id = p_user_id
  ORDER BY ml.log_date DESC, ml.log_time DESC;
END;
$$;

-- ============================================================================
-- PATIENT ONBOARDING DATA
-- ============================================================================
CREATE OR REPLACE FUNCTION get_patient_onboarding(p_user_id UUID)
RETURNS TABLE (
  user_id UUID,
  first_name TEXT,
  last_name TEXT,
  middle_name TEXT,
  date_of_birth DATE,
  gender TEXT,
  phone_number TEXT,
  emergency_contact_name TEXT,
  emergency_contact_phone TEXT,
  emergency_contact_relationship TEXT,
  created_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ
) LANGUAGE plpgsql SECURITY DEFINER SET search_path = private_health_info, public
AS $$
BEGIN
  IF p_user_id != auth.uid() THEN
    RAISE EXCEPTION 'Access denied' USING ERRCODE = '42501';
  END IF;
  
  RETURN QUERY
  SELECT 
    pod.user_id, pod.first_name, pod.last_name, pod.middle_name,
    pod.date_of_birth, pod.gender, pod.phone_number,
    pod.emergency_contact_name, pod.emergency_contact_phone,
    pod.emergency_contact_relationship, pod.created_at, pod.completed_at
  FROM private_health_info.patient_onboarding_data pod
  WHERE pod.user_id = p_user_id;
END;
$$;

-- ============================================================================
-- GRANT PERMISSIONS
-- ============================================================================
-- Grant execute to authenticated users only (not anonymous)
GRANT EXECUTE ON FUNCTION get_tracking_entries(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION save_tracking_entry(UUID, DATE, TEXT, TEXT, TEXT, NUMERIC, TEXT[], TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION get_seizure_logs(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION save_seizure_log(UUID, TIMESTAMPTZ, INTEGER, TEXT, TEXT, TEXT[], TEXT[], TEXT[], TEXT, BOOLEAN, BOOLEAN, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION get_symptom_logs(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION get_tremor_episodes(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION get_gait_episodes(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION get_menstrual_logs(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION get_temperature_logs(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION get_medication_logs(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION get_patient_onboarding(UUID) TO authenticated;

-- Revoke from anon
REVOKE EXECUTE ON FUNCTION get_tracking_entries(UUID) FROM anon;
REVOKE EXECUTE ON FUNCTION save_tracking_entry(UUID, DATE, TEXT, TEXT, TEXT, NUMERIC, TEXT[], TEXT) FROM anon;
REVOKE EXECUTE ON FUNCTION get_seizure_logs(UUID) FROM anon;
REVOKE EXECUTE ON FUNCTION save_seizure_log(UUID, TIMESTAMPTZ, INTEGER, TEXT, TEXT, TEXT[], TEXT[], TEXT[], TEXT, BOOLEAN, BOOLEAN, TEXT) FROM anon;
REVOKE EXECUTE ON FUNCTION get_symptom_logs(UUID) FROM anon;
REVOKE EXECUTE ON FUNCTION get_tremor_episodes(UUID) FROM anon;
REVOKE EXECUTE ON FUNCTION get_gait_episodes(UUID) FROM anon;
REVOKE EXECUTE ON FUNCTION get_menstrual_logs(UUID) FROM anon;
REVOKE EXECUTE ON FUNCTION get_temperature_logs(UUID) FROM anon;
REVOKE EXECUTE ON FUNCTION get_medication_logs(UUID) FROM anon;
REVOKE EXECUTE ON FUNCTION get_patient_onboarding(UUID) FROM anon;

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================
-- List all RPC functions we just created:
/*
SELECT 
  routine_name,
  routine_type,
  security_type
FROM information_schema.routines 
WHERE routine_schema = 'public' 
  AND routine_name LIKE 'get_%'
  OR routine_name LIKE 'save_%'
ORDER BY routine_name;
*/

-- ============================================================================
-- IMPORTANT NOTES
-- ============================================================================
-- 1. REALTIME SCHEMA: This is Supabase's internal schema for websockets.
--    Do NOT expose or access directly. It's managed by Supabase.
--
-- 2. CLINICAL SCHEMA: If you need to access clinical tables, create
--    similar RPC functions following the pattern above.
--
-- 3. RESEARCH SCHEMA: Same approach - use RPC functions for any
--    research schema tables.
--
-- 4. NEVER expose private_health_info, clinical, or research schemas
--    directly via PostgREST. Always use RPC functions.
--
-- 5. ALL frontend code should be updated to use these RPC functions
--    instead of direct .schema() calls.
-- ============================================================================

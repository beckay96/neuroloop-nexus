-- =====================================================
-- RPC FUNCTIONS FOR NEW TRACKING TABLES
-- =====================================================
-- Research-grade, properly structured
-- =====================================================

-- =====================================================
-- 1. SAVE DAILY TRACKING (Daily Check-in Feature)
-- =====================================================

DROP FUNCTION IF EXISTS public.save_daily_tracking(UUID, DATE, INTEGER, INTEGER, INTEGER, INTEGER, INTEGER, NUMERIC, INTEGER, INTEGER, TEXT, BOOLEAN, TEXT) CASCADE;

CREATE OR REPLACE FUNCTION public.save_daily_tracking(
  p_patient_id UUID,
  p_log_date DATE,
  p_overall_feeling INTEGER DEFAULT NULL,
  p_mood INTEGER DEFAULT NULL,
  p_energy_level INTEGER DEFAULT NULL,
  p_stress_level INTEGER DEFAULT NULL,
  p_sleep_quality INTEGER DEFAULT NULL,
  p_sleep_hours NUMERIC DEFAULT NULL,
  p_sleep_interruptions INTEGER DEFAULT 0,
  p_exercise_minutes INTEGER DEFAULT 0,
  p_exercise_type TEXT DEFAULT NULL,
  p_all_medications_taken BOOLEAN DEFAULT true,
  p_notes TEXT DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = private_health_info, public
AS $$
DECLARE
  v_log_id UUID;
BEGIN
  -- Security check
  IF p_patient_id != auth.uid() THEN
    RAISE EXCEPTION 'Access denied' USING ERRCODE = '42501';
  END IF;
  
  -- Insert or update (UPSERT based on patient_id + log_date)
  INSERT INTO private_health_info.patient_daily_tracking_logs (
    patient_id,
    log_date,
    overall_feeling,
    mood,
    energy_level,
    stress_level,
    sleep_quality,
    sleep_hours,
    sleep_interruptions,
    exercise_minutes,
    exercise_type,
    all_medications_taken,
    notes,
    shared_with_clinician,
    visible_to_researchers,
    created_at,
    updated_at
  ) VALUES (
    p_patient_id,
    p_log_date,
    p_overall_feeling,
    p_mood,
    p_energy_level,
    p_stress_level,
    p_sleep_quality,
    p_sleep_hours,
    p_sleep_interruptions,
    p_exercise_minutes,
    p_exercise_type,
    p_all_medications_taken,
    p_notes,
    true, -- shared_with_clinician
    false, -- visible_to_researchers
    NOW(),
    NOW()
  )
  ON CONFLICT (patient_id, log_date)
  DO UPDATE SET
    overall_feeling = EXCLUDED.overall_feeling,
    mood = EXCLUDED.mood,
    energy_level = EXCLUDED.energy_level,
    stress_level = EXCLUDED.stress_level,
    sleep_quality = EXCLUDED.sleep_quality,
    sleep_hours = EXCLUDED.sleep_hours,
    sleep_interruptions = EXCLUDED.sleep_interruptions,
    exercise_minutes = EXCLUDED.exercise_minutes,
    exercise_type = EXCLUDED.exercise_type,
    all_medications_taken = EXCLUDED.all_medications_taken,
    notes = EXCLUDED.notes,
    updated_at = NOW()
  RETURNING log_id INTO v_log_id;
  
  RETURN v_log_id;
END;
$$;

GRANT EXECUTE ON FUNCTION public.save_daily_tracking(UUID, DATE, INTEGER, INTEGER, INTEGER, INTEGER, INTEGER, NUMERIC, INTEGER, INTEGER, TEXT, BOOLEAN, TEXT) TO authenticated;

-- =====================================================
-- 2. GET DAILY TRACKING LOGS
-- =====================================================

DROP FUNCTION IF EXISTS public.get_daily_tracking_logs(UUID, INTEGER) CASCADE;

CREATE OR REPLACE FUNCTION public.get_daily_tracking_logs(
  p_patient_id UUID,
  p_limit INTEGER DEFAULT 30
)
RETURNS TABLE (
  log_id UUID,
  patient_id UUID,
  log_date DATE,
  overall_feeling INTEGER,
  mood INTEGER,
  energy_level INTEGER,
  stress_level INTEGER,
  sleep_quality INTEGER,
  sleep_hours NUMERIC,
  sleep_interruptions INTEGER,
  exercise_minutes INTEGER,
  exercise_type TEXT,
  all_medications_taken BOOLEAN,
  notes TEXT,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = private_health_info, public
AS $$
BEGIN
  -- Security check
  IF p_patient_id != auth.uid() THEN
    RAISE EXCEPTION 'Access denied' USING ERRCODE = '42501';
  END IF;
  
  RETURN QUERY
  SELECT 
    t.log_id,
    t.patient_id,
    t.log_date,
    t.overall_feeling,
    t.mood,
    t.energy_level,
    t.stress_level,
    t.sleep_quality,
    t.sleep_hours,
    t.sleep_interruptions,
    t.exercise_minutes,
    t.exercise_type,
    t.all_medications_taken,
    t.notes,
    t.created_at,
    t.updated_at
  FROM private_health_info.patient_daily_tracking_logs t
  WHERE t.patient_id = p_patient_id
  ORDER BY t.log_date DESC
  LIMIT p_limit;
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_daily_tracking_logs(UUID, INTEGER) TO authenticated;

-- =====================================================
-- 3. SAVE SYMPTOM LOG (Ad-hoc symptom logging)
-- =====================================================

DROP FUNCTION IF EXISTS public.log_symptom(UUID, UUID, TEXT, INTEGER, INTEGER, TEXT) CASCADE;

CREATE OR REPLACE FUNCTION public.log_symptom(
  p_patient_id UUID,
  p_symptom_id UUID DEFAULT NULL,
  p_custom_symptom_name TEXT DEFAULT NULL,
  p_severity INTEGER DEFAULT NULL,
  p_duration_minutes INTEGER DEFAULT NULL,
  p_notes TEXT DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = private_health_info, public
AS $$
DECLARE
  v_symptom_log_id UUID;
BEGIN
  -- Security check
  IF p_patient_id != auth.uid() THEN
    RAISE EXCEPTION 'Access denied' USING ERRCODE = '42501';
  END IF;
  
  -- Must have either symptom_id OR custom_symptom_name
  IF p_symptom_id IS NULL AND p_custom_symptom_name IS NULL THEN
    RAISE EXCEPTION 'Must provide either symptom_id or custom_symptom_name' USING ERRCODE = '22000';
  END IF;
  
  INSERT INTO private_health_info.patient_symptom_logs (
    patient_id,
    symptom_id,
    custom_symptom_name,
    severity,
    duration_minutes,
    notes,
    shared_with_clinician,
    visible_to_researchers,
    created_at
  ) VALUES (
    p_patient_id,
    p_symptom_id,
    p_custom_symptom_name,
    p_severity,
    p_duration_minutes,
    p_notes,
    true,
    false,
    NOW()
  )
  RETURNING symptom_log_id INTO v_symptom_log_id;
  
  RETURN v_symptom_log_id;
END;
$$;

GRANT EXECUTE ON FUNCTION public.log_symptom(UUID, UUID, TEXT, INTEGER, INTEGER, TEXT) TO authenticated;

-- =====================================================
-- 4. SEARCH SYMPTOMS LIBRARY
-- =====================================================

DROP FUNCTION IF EXISTS public.search_symptoms(TEXT, BOOLEAN, BOOLEAN) CASCADE;

CREATE OR REPLACE FUNCTION public.search_symptoms(
  p_search_term TEXT,
  p_epilepsy_only BOOLEAN DEFAULT false,
  p_parkinsons_only BOOLEAN DEFAULT false
)
RETURNS TABLE (
  symptom_id UUID,
  symptom_name TEXT,
  category TEXT,
  description TEXT,
  common_in_epilepsy BOOLEAN,
  common_in_parkinsons BOOLEAN
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    s.symptom_id,
    s.symptom_name,
    s.category::TEXT,
    s.description,
    s.common_in_epilepsy,
    s.common_in_parkinsons
  FROM public.symptoms_library s
  WHERE 
    (p_search_term IS NULL OR 
     s.symptom_name ILIKE '%' || p_search_term || '%' OR
     p_search_term = ANY(s.search_keywords))
    AND (NOT p_epilepsy_only OR s.common_in_epilepsy = true)
    AND (NOT p_parkinsons_only OR s.common_in_parkinsons = true)
  ORDER BY 
    CASE 
      WHEN s.symptom_name ILIKE p_search_term THEN 1
      WHEN s.symptom_name ILIKE p_search_term || '%' THEN 2
      ELSE 3
    END,
    s.symptom_name
  LIMIT 20;
END;
$$;

GRANT EXECUTE ON FUNCTION public.search_symptoms(TEXT, BOOLEAN, BOOLEAN) TO authenticated;

-- =====================================================
-- 5. SAVE PARKINSON'S MOTOR LOG
-- =====================================================

DROP FUNCTION IF EXISTS public.save_parkinsons_motor_log(UUID, DATE, TIME, BOOLEAN, NUMERIC, NUMERIC, INTEGER, INTEGER, INTEGER, INTEGER, INTEGER, INTEGER, TEXT) CASCADE;

CREATE OR REPLACE FUNCTION public.save_parkinsons_motor_log(
  p_patient_id UUID,
  p_log_date DATE,
  p_log_time TIME DEFAULT NULL,
  p_motor_fluctuations_occurred BOOLEAN DEFAULT false,
  p_on_time_hours NUMERIC DEFAULT NULL,
  p_off_time_hours NUMERIC DEFAULT NULL,
  p_tremor_severity INTEGER DEFAULT NULL,
  p_dyskinesia_severity INTEGER DEFAULT NULL,
  p_stiffness_severity INTEGER DEFAULT NULL,
  p_slowness_severity INTEGER DEFAULT NULL,
  p_freezing_episodes INTEGER DEFAULT 0,
  p_falls INTEGER DEFAULT 0,
  p_notes TEXT DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = private_health_info, public
AS $$
DECLARE
  v_log_id UUID;
BEGIN
  -- Security check
  IF p_patient_id != auth.uid() THEN
    RAISE EXCEPTION 'Access denied' USING ERRCODE = '42501';
  END IF;
  
  INSERT INTO private_health_info.parkinsons_motor_logs (
    patient_id,
    log_date,
    log_time,
    motor_fluctuations_occurred,
    on_time_hours,
    off_time_hours,
    tremor_severity,
    dyskinesia_severity,
    stiffness_severity,
    slowness_severity,
    freezing_episodes,
    falls,
    notes,
    shared_with_clinician,
    visible_to_researchers,
    created_at,
    updated_at
  ) VALUES (
    p_patient_id,
    p_log_date,
    p_log_time,
    p_motor_fluctuations_occurred,
    p_on_time_hours,
    p_off_time_hours,
    p_tremor_severity,
    p_dyskinesia_severity,
    p_stiffness_severity,
    p_slowness_severity,
    p_freezing_episodes,
    p_falls,
    p_notes,
    true,
    false,
    NOW(),
    NOW()
  )
  RETURNING log_id INTO v_log_id;
  
  RETURN v_log_id;
END;
$$;

GRANT EXECUTE ON FUNCTION public.save_parkinsons_motor_log(UUID, DATE, TIME, BOOLEAN, NUMERIC, NUMERIC, INTEGER, INTEGER, INTEGER, INTEGER, INTEGER, INTEGER, TEXT) TO authenticated;

-- =====================================================
-- 6. GET RECENT SYMPTOMS
-- =====================================================

DROP FUNCTION IF EXISTS public.get_recent_symptoms(UUID, INTEGER) CASCADE;

CREATE OR REPLACE FUNCTION public.get_recent_symptoms(
  p_patient_id UUID,
  p_limit INTEGER DEFAULT 10
)
RETURNS TABLE (
  symptom_log_id UUID,
  logged_at TIMESTAMPTZ,
  symptom_name TEXT,
  severity INTEGER,
  duration_minutes INTEGER,
  notes TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = private_health_info, public
AS $$
BEGIN
  -- Security check
  IF p_patient_id != auth.uid() THEN
    RAISE EXCEPTION 'Access denied' USING ERRCODE = '42501';
  END IF;
  
  RETURN QUERY
  SELECT 
    sl.symptom_log_id,
    sl.logged_at,
    COALESCE(s.symptom_name, sl.custom_symptom_name) as symptom_name,
    sl.severity,
    sl.duration_minutes,
    sl.notes
  FROM private_health_info.patient_symptom_logs sl
  LEFT JOIN public.symptoms_library s ON sl.symptom_id = s.symptom_id
  WHERE sl.patient_id = p_patient_id
  ORDER BY sl.logged_at DESC
  LIMIT p_limit;
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_recent_symptoms(UUID, INTEGER) TO authenticated;

-- =====================================================
-- VERIFY FUNCTIONS CREATED
-- =====================================================

SELECT 
    proname as function_name,
    pg_get_function_arguments(oid) as arguments
FROM pg_proc
WHERE proname IN (
  'save_daily_tracking',
  'get_daily_tracking_logs',
  'log_symptom',
  'search_symptoms',
  'save_parkinsons_motor_log',
  'get_recent_symptoms'
)
AND pronamespace = 'public'::regnamespace
ORDER BY proname;

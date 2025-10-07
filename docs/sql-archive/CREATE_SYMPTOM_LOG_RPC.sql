-- =====================================================
-- CREATE RPC FUNCTIONS FOR DAILY SYMPTOM LOGS
-- =====================================================
-- Allows secure INSERT/UPDATE/DELETE into private_health_info.daily_symptom_logs
-- =====================================================

-- 1. SAVE (INSERT) SYMPTOM LOG
DROP FUNCTION IF EXISTS public.save_symptom_log(UUID, DATE, INTEGER, INTEGER, INTEGER, NUMERIC, INTEGER, JSONB, JSONB, TEXT, BOOLEAN, BOOLEAN) CASCADE;

CREATE OR REPLACE FUNCTION public.save_symptom_log(
  p_patient_id UUID,
  p_log_date DATE,
  p_overall_feeling INTEGER DEFAULT NULL,
  p_mood INTEGER DEFAULT NULL,
  p_energy_level INTEGER DEFAULT NULL,
  p_sleep_hours NUMERIC DEFAULT NULL,
  p_sleep_quality INTEGER DEFAULT NULL,
  p_sleep_disturbances JSONB DEFAULT NULL,
  p_other_symptoms JSONB DEFAULT NULL,
  p_symptom_notes TEXT DEFAULT NULL,
  p_shared_with_clinician BOOLEAN DEFAULT false,
  p_visible_to_researchers BOOLEAN DEFAULT false
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = private_health_info, public
AS $$
DECLARE
  v_log_id UUID;
BEGIN
  -- Security check: user can only create logs for themselves
  IF p_patient_id != auth.uid() THEN
    RAISE EXCEPTION 'Access denied' USING ERRCODE = '42501';
  END IF;
  
  -- Insert symptom log
  INSERT INTO private_health_info.daily_symptom_logs (
    patient_id,
    log_date,
    overall_feeling,
    mood,
    energy_level,
    sleep_hours,
    sleep_quality,
    sleep_disturbances,
    other_symptoms,
    symptom_notes,
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
    p_sleep_hours,
    p_sleep_quality,
    p_sleep_disturbances,
    p_other_symptoms,
    p_symptom_notes,
    p_shared_with_clinician,
    p_visible_to_researchers,
    NOW(),
    NOW()
  )
  RETURNING log_id INTO v_log_id;
  
  RETURN v_log_id;
END;
$$;

-- 2. UPDATE SYMPTOM LOG
DROP FUNCTION IF EXISTS public.update_symptom_log(UUID, INTEGER, INTEGER, INTEGER, NUMERIC, INTEGER, JSONB, JSONB, TEXT, BOOLEAN, BOOLEAN) CASCADE;

CREATE OR REPLACE FUNCTION public.update_symptom_log(
  p_log_id UUID,
  p_overall_feeling INTEGER DEFAULT NULL,
  p_mood INTEGER DEFAULT NULL,
  p_energy_level INTEGER DEFAULT NULL,
  p_sleep_hours NUMERIC DEFAULT NULL,
  p_sleep_quality INTEGER DEFAULT NULL,
  p_sleep_disturbances JSONB DEFAULT NULL,
  p_other_symptoms JSONB DEFAULT NULL,
  p_symptom_notes TEXT DEFAULT NULL,
  p_shared_with_clinician BOOLEAN DEFAULT NULL,
  p_visible_to_researchers BOOLEAN DEFAULT NULL
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = private_health_info, public
AS $$
DECLARE
  v_patient_id UUID;
BEGIN
  -- Get patient_id and verify ownership
  SELECT patient_id INTO v_patient_id
  FROM private_health_info.daily_symptom_logs
  WHERE log_id = p_log_id;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Symptom log not found' USING ERRCODE = '42501';
  END IF;
  
  IF v_patient_id != auth.uid() THEN
    RAISE EXCEPTION 'Access denied' USING ERRCODE = '42501';
  END IF;
  
  -- Update symptom log (only update non-null parameters)
  UPDATE private_health_info.daily_symptom_logs
  SET
    overall_feeling = COALESCE(p_overall_feeling, overall_feeling),
    mood = COALESCE(p_mood, mood),
    energy_level = COALESCE(p_energy_level, energy_level),
    sleep_hours = COALESCE(p_sleep_hours, sleep_hours),
    sleep_quality = COALESCE(p_sleep_quality, sleep_quality),
    sleep_disturbances = COALESCE(p_sleep_disturbances, sleep_disturbances),
    other_symptoms = COALESCE(p_other_symptoms, other_symptoms),
    symptom_notes = COALESCE(p_symptom_notes, symptom_notes),
    shared_with_clinician = COALESCE(p_shared_with_clinician, shared_with_clinician),
    visible_to_researchers = COALESCE(p_visible_to_researchers, visible_to_researchers),
    updated_at = NOW()
  WHERE log_id = p_log_id;
END;
$$;

-- 3. DELETE SYMPTOM LOG
DROP FUNCTION IF EXISTS public.delete_symptom_log(UUID) CASCADE;

CREATE OR REPLACE FUNCTION public.delete_symptom_log(
  p_log_id UUID
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = private_health_info, public
AS $$
DECLARE
  v_patient_id UUID;
BEGIN
  -- Get patient_id and verify ownership
  SELECT patient_id INTO v_patient_id
  FROM private_health_info.daily_symptom_logs
  WHERE log_id = p_log_id;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Symptom log not found' USING ERRCODE = '42501';
  END IF;
  
  IF v_patient_id != auth.uid() THEN
    RAISE EXCEPTION 'Access denied' USING ERRCODE = '42501';
  END IF;
  
  -- Delete symptom log
  DELETE FROM private_health_info.daily_symptom_logs
  WHERE log_id = p_log_id;
END;
$$;

-- Grant permissions
GRANT EXECUTE ON FUNCTION public.save_symptom_log(UUID, DATE, INTEGER, INTEGER, INTEGER, NUMERIC, INTEGER, JSONB, JSONB, TEXT, BOOLEAN, BOOLEAN) TO authenticated;
GRANT EXECUTE ON FUNCTION public.update_symptom_log(UUID, INTEGER, INTEGER, INTEGER, NUMERIC, INTEGER, JSONB, JSONB, TEXT, BOOLEAN, BOOLEAN) TO authenticated;
GRANT EXECUTE ON FUNCTION public.delete_symptom_log(UUID) TO authenticated;

REVOKE EXECUTE ON FUNCTION public.save_symptom_log(UUID, DATE, INTEGER, INTEGER, INTEGER, NUMERIC, INTEGER, JSONB, JSONB, TEXT, BOOLEAN, BOOLEAN) FROM anon;
REVOKE EXECUTE ON FUNCTION public.update_symptom_log(UUID, INTEGER, INTEGER, INTEGER, NUMERIC, INTEGER, JSONB, JSONB, TEXT, BOOLEAN, BOOLEAN) FROM anon;
REVOKE EXECUTE ON FUNCTION public.delete_symptom_log(UUID) FROM anon;

-- Verify
SELECT 
    proname as function_name,
    pg_get_function_arguments(oid) as arguments
FROM pg_proc
WHERE proname IN ('save_symptom_log', 'update_symptom_log', 'delete_symptom_log')
AND pronamespace = 'public'::regnamespace
ORDER BY proname;

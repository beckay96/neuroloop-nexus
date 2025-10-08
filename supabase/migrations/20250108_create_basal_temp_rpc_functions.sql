-- ============================================================================
-- BASAL TEMPERATURE LOG RPC FUNCTIONS
-- ============================================================================
-- Secure RPC functions to access private_health_info.basal_temperature_logs
-- ============================================================================

-- Drop existing functions if they exist
DROP FUNCTION IF EXISTS public.save_basal_temperature_log CASCADE;
DROP FUNCTION IF EXISTS public.update_basal_temperature_log CASCADE;
DROP FUNCTION IF EXISTS public.delete_basal_temperature_log CASCADE;

-- ============================================================================
-- 1. SAVE BASAL TEMPERATURE LOG
-- ============================================================================
CREATE OR REPLACE FUNCTION public.save_basal_temperature_log(
  p_user_id UUID,
  p_log_date DATE,
  p_log_time TIME,
  p_temperature NUMERIC,
  p_temperature_unit TEXT,
  p_measurement_type TEXT DEFAULT 'basal',
  p_measurement_location TEXT DEFAULT NULL,
  p_menstrual_cycle_day INTEGER DEFAULT NULL,
  p_sleep_quality TEXT DEFAULT NULL,
  p_time_after_waking TEXT DEFAULT 'unknown',
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
  -- Security: Only allow users to log their own data
  IF p_user_id != auth.uid() THEN
    RAISE EXCEPTION 'Access denied' USING ERRCODE = '42501';
  END IF;
  
  -- Insert basal temperature log
  INSERT INTO private_health_info.basal_temperature_logs (
    user_id,
    log_date,
    log_time,
    temperature,
    temperature_unit,
    measurement_type,
    measurement_location,
    menstrual_cycle_day,
    sleep_quality,
    time_after_waking,
    notes,
    created_at,
    updated_at
  )
  VALUES (
    p_user_id,
    p_log_date,
    p_log_time,
    p_temperature,
    p_temperature_unit,
    p_measurement_type,
    p_measurement_location,
    p_menstrual_cycle_day,
    p_sleep_quality,
    p_time_after_waking::time_after_waking_enum,
    p_notes,
    NOW(),
    NOW()
  )
  RETURNING id INTO v_log_id;
  
  RETURN v_log_id;
END;
$$;

-- ============================================================================
-- 2. UPDATE BASAL TEMPERATURE LOG
-- ============================================================================
CREATE OR REPLACE FUNCTION public.update_basal_temperature_log(
  p_log_id UUID,
  p_temperature NUMERIC DEFAULT NULL,
  p_temperature_unit TEXT DEFAULT NULL,
  p_measurement_type TEXT DEFAULT NULL,
  p_measurement_location TEXT DEFAULT NULL,
  p_menstrual_cycle_day INTEGER DEFAULT NULL,
  p_sleep_quality TEXT DEFAULT NULL,
  p_time_after_waking TEXT DEFAULT NULL,
  p_notes TEXT DEFAULT NULL
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = private_health_info, public
AS $$
DECLARE
  v_user_id UUID;
BEGIN
  -- Get the user_id of the log
  SELECT user_id INTO v_user_id
  FROM private_health_info.basal_temperature_logs
  WHERE id = p_log_id;
  
  -- Security: Only allow users to update their own logs
  IF v_user_id IS NULL OR v_user_id != auth.uid() THEN
    RAISE EXCEPTION 'Access denied or log not found' USING ERRCODE = '42501';
  END IF;
  
  -- Update basal temperature log (only update fields that are provided)
  UPDATE private_health_info.basal_temperature_logs
  SET
    temperature = COALESCE(p_temperature, temperature),
    temperature_unit = COALESCE(p_temperature_unit, temperature_unit),
    measurement_type = COALESCE(p_measurement_type, measurement_type),
    measurement_location = COALESCE(p_measurement_location, measurement_location),
    menstrual_cycle_day = COALESCE(p_menstrual_cycle_day, menstrual_cycle_day),
    sleep_quality = COALESCE(p_sleep_quality, sleep_quality),
    time_after_waking = COALESCE(p_time_after_waking::time_after_waking_enum, time_after_waking),
    notes = COALESCE(p_notes, notes),
    updated_at = NOW()
  WHERE id = p_log_id;
  
  RETURN TRUE;
END;
$$;

-- ============================================================================
-- 3. DELETE BASAL TEMPERATURE LOG
-- ============================================================================
CREATE OR REPLACE FUNCTION public.delete_basal_temperature_log(
  p_log_id UUID
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = private_health_info, public
AS $$
DECLARE
  v_user_id UUID;
BEGIN
  -- Get the user_id of the log
  SELECT user_id INTO v_user_id
  FROM private_health_info.basal_temperature_logs
  WHERE id = p_log_id;
  
  -- Security: Only allow users to delete their own logs
  IF v_user_id IS NULL OR v_user_id != auth.uid() THEN
    RAISE EXCEPTION 'Access denied or log not found' USING ERRCODE = '42501';
  END IF;
  
  -- Delete the log
  DELETE FROM private_health_info.basal_temperature_logs
  WHERE id = p_log_id;
  
  RETURN TRUE;
END;
$$;

-- Grant permissions
GRANT EXECUTE ON FUNCTION public.save_basal_temperature_log TO authenticated;
GRANT EXECUTE ON FUNCTION public.update_basal_temperature_log TO authenticated;
GRANT EXECUTE ON FUNCTION public.delete_basal_temperature_log TO authenticated;

REVOKE EXECUTE ON FUNCTION public.save_basal_temperature_log FROM anon;
REVOKE EXECUTE ON FUNCTION public.update_basal_temperature_log FROM anon;
REVOKE EXECUTE ON FUNCTION public.delete_basal_temperature_log FROM anon;

-- Add comments
COMMENT ON FUNCTION public.save_basal_temperature_log IS 'Securely saves basal temperature log to private_health_info schema with RLS enforcement';
COMMENT ON FUNCTION public.update_basal_temperature_log IS 'Securely updates basal temperature log with RLS enforcement';
COMMENT ON FUNCTION public.delete_basal_temperature_log IS 'Securely deletes basal temperature log with RLS enforcement';

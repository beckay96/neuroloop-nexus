-- ============================================================================
-- MENSTRUAL CYCLE LOG RPC FUNCTIONS
-- ============================================================================
-- Secure RPC functions to access private_health_info.menstrual_cycle_logs
-- ============================================================================

-- Drop existing functions if they exist
DROP FUNCTION IF EXISTS public.save_menstrual_log CASCADE;
DROP FUNCTION IF EXISTS public.update_menstrual_log CASCADE;
DROP FUNCTION IF EXISTS public.delete_menstrual_log CASCADE;

-- ============================================================================
-- 1. SAVE MENSTRUAL LOG
-- ============================================================================
CREATE OR REPLACE FUNCTION public.save_menstrual_log(
  p_user_id UUID,
  p_cycle_start_date DATE,
  p_cycle_end_date DATE DEFAULT NULL,
  p_cycle_length_days INTEGER DEFAULT NULL,
  p_flow_intensity TEXT DEFAULT NULL,
  p_cycle_phase TEXT DEFAULT NULL,
  p_overall_symptom_severity INTEGER DEFAULT NULL,
  p_seizure_count_during_cycle INTEGER DEFAULT 0,
  p_seizure_clustered_around_menstruation BOOLEAN DEFAULT FALSE,
  p_catamenial_pattern_suspected BOOLEAN DEFAULT FALSE,
  p_is_pregnant BOOLEAN DEFAULT FALSE,
  p_is_breastfeeding BOOLEAN DEFAULT FALSE,
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
  
  -- Insert menstrual log
  INSERT INTO private_health_info.menstrual_cycle_logs (
    user_id,
    cycle_start_date,
    cycle_end_date,
    cycle_length_days,
    flow_intensity,
    cycle_phase,
    overall_symptom_severity,
    seizure_count_during_cycle,
    seizure_clustered_around_menstruation,
    catamenial_pattern_suspected,
    is_pregnant,
    is_breastfeeding,
    notes,
    created_at,
    updated_at
  )
  VALUES (
    p_user_id,
    p_cycle_start_date,
    p_cycle_end_date,
    p_cycle_length_days,
    p_flow_intensity::flow_intensity_enum,
    p_cycle_phase::cycle_phase_enum,
    p_overall_symptom_severity,
    p_seizure_count_during_cycle,
    p_seizure_clustered_around_menstruation,
    p_catamenial_pattern_suspected,
    p_is_pregnant,
    p_is_breastfeeding,
    p_notes,
    NOW(),
    NOW()
  )
  RETURNING id INTO v_log_id;
  
  RETURN v_log_id;
END;
$$;

-- ============================================================================
-- 2. UPDATE MENSTRUAL LOG
-- ============================================================================
CREATE OR REPLACE FUNCTION public.update_menstrual_log(
  p_log_id UUID,
  p_cycle_end_date DATE DEFAULT NULL,
  p_cycle_length_days INTEGER DEFAULT NULL,
  p_flow_intensity TEXT DEFAULT NULL,
  p_cycle_phase TEXT DEFAULT NULL,
  p_overall_symptom_severity INTEGER DEFAULT NULL,
  p_seizure_count_during_cycle INTEGER DEFAULT NULL,
  p_seizure_clustered_around_menstruation BOOLEAN DEFAULT NULL,
  p_catamenial_pattern_suspected BOOLEAN DEFAULT NULL,
  p_is_pregnant BOOLEAN DEFAULT NULL,
  p_is_breastfeeding BOOLEAN DEFAULT NULL,
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
  FROM private_health_info.menstrual_cycle_logs
  WHERE id = p_log_id;
  
  -- Security: Only allow users to update their own logs
  IF v_user_id IS NULL OR v_user_id != auth.uid() THEN
    RAISE EXCEPTION 'Access denied or log not found' USING ERRCODE = '42501';
  END IF;
  
  -- Update menstrual log (only update fields that are provided)
  UPDATE private_health_info.menstrual_cycle_logs
  SET
    cycle_end_date = COALESCE(p_cycle_end_date, cycle_end_date),
    cycle_length_days = COALESCE(p_cycle_length_days, cycle_length_days),
    flow_intensity = COALESCE(p_flow_intensity::flow_intensity_enum, flow_intensity),
    cycle_phase = COALESCE(p_cycle_phase::cycle_phase_enum, cycle_phase),
    overall_symptom_severity = COALESCE(p_overall_symptom_severity, overall_symptom_severity),
    seizure_count_during_cycle = COALESCE(p_seizure_count_during_cycle, seizure_count_during_cycle),
    seizure_clustered_around_menstruation = COALESCE(p_seizure_clustered_around_menstruation, seizure_clustered_around_menstruation),
    catamenial_pattern_suspected = COALESCE(p_catamenial_pattern_suspected, catamenial_pattern_suspected),
    is_pregnant = COALESCE(p_is_pregnant, is_pregnant),
    is_breastfeeding = COALESCE(p_is_breastfeeding, is_breastfeeding),
    notes = COALESCE(p_notes, notes),
    updated_at = NOW()
  WHERE id = p_log_id;
  
  RETURN TRUE;
END;
$$;

-- ============================================================================
-- 3. DELETE MENSTRUAL LOG
-- ============================================================================
CREATE OR REPLACE FUNCTION public.delete_menstrual_log(
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
  FROM private_health_info.menstrual_cycle_logs
  WHERE id = p_log_id;
  
  -- Security: Only allow users to delete their own logs
  IF v_user_id IS NULL OR v_user_id != auth.uid() THEN
    RAISE EXCEPTION 'Access denied or log not found' USING ERRCODE = '42501';
  END IF;
  
  -- Delete the log
  DELETE FROM private_health_info.menstrual_cycle_logs
  WHERE id = p_log_id;
  
  RETURN TRUE;
END;
$$;

-- Grant permissions
GRANT EXECUTE ON FUNCTION public.save_menstrual_log TO authenticated;
GRANT EXECUTE ON FUNCTION public.update_menstrual_log TO authenticated;
GRANT EXECUTE ON FUNCTION public.delete_menstrual_log TO authenticated;

REVOKE EXECUTE ON FUNCTION public.save_menstrual_log FROM anon;
REVOKE EXECUTE ON FUNCTION public.update_menstrual_log FROM anon;
REVOKE EXECUTE ON FUNCTION public.delete_menstrual_log FROM anon;

-- Add comments
COMMENT ON FUNCTION public.save_menstrual_log IS 'Securely saves menstrual cycle log to private_health_info schema with RLS enforcement';
COMMENT ON FUNCTION public.update_menstrual_log IS 'Securely updates menstrual cycle log with RLS enforcement';
COMMENT ON FUNCTION public.delete_menstrual_log IS 'Securely deletes menstrual cycle log with RLS enforcement';

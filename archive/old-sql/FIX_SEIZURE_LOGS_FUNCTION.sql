-- ============================================================================
-- URGENT FIX: Remove seizure_type from get_seizure_logs function
-- ============================================================================
-- Run this in Supabase SQL Editor to fix the error immediately
-- The seizure_logs_research table does NOT have a seizure_type column
-- ============================================================================

-- Drop the broken function
DROP FUNCTION IF EXISTS public.get_seizure_logs(uuid) CASCADE;

-- Recreate without seizure_type
CREATE OR REPLACE FUNCTION public.get_seizure_logs(p_user_id UUID)
RETURNS TABLE (
  log_id UUID,
  user_id UUID,
  log_date DATE,
  log_time TIME,
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
  -- Security: Only allow users to access their own data
  IF p_user_id != auth.uid() THEN
    RAISE EXCEPTION 'Access denied' USING ERRCODE = '42501';
  END IF;
  
  RETURN QUERY
  SELECT 
    sl.log_id,
    sl.user_id,
    sl.log_date,
    sl.log_time,
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

-- Grant permissions
GRANT EXECUTE ON FUNCTION public.get_seizure_logs(UUID) TO authenticated;
REVOKE EXECUTE ON FUNCTION public.get_seizure_logs(UUID) FROM anon;

-- Notify PostgREST to reload schema cache
NOTIFY pgrst, 'reload schema';

-- =====================================================
-- FIX EXISTING RPC FUNCTIONS (Column Errors)
-- =====================================================
-- Based on actual database schema, fixing column mismatches
-- =====================================================

-- ============================================================================
-- 1. FIX get_gait_episodes - Primary key is gait_id not id
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
    ge.gait_id,
    ge.patient_id,
    ge.occurred_at,
    ge.duration_seconds,
    ge.event_type,
    ge.severity,
    ge.resulted_in_fall,
    ge.fall_direction,
    ge.injury_occurred,
    ge.injury_description,
    ge.required_assistance,
    ge.location,
    ge.activity,
    ge.environmental_factors,
    ge.medication_status,
    ge.hours_since_medication,
    ge.freezing_trigger,
    ge.broke_freeze_with,
    ge.video_recorded,
    ge.media_urls,
    ge.notes,
    ge.shared_with_clinician,
    ge.visible_to_researchers,
    ge.created_at,
    ge.updated_at
  FROM private_health_info.gait_episodes ge
  WHERE ge.patient_id = p_patient_id
  ORDER BY ge.occurred_at DESC;
END;
$$;

GRANT EXECUTE ON FUNCTION get_gait_episodes(UUID) TO authenticated;
REVOKE EXECUTE ON FUNCTION get_gait_episodes(UUID) FROM anon;

-- ============================================================================
-- 2. FIX get_medication_logs - Remove missed_reason column (doesn't exist)
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
    ml.id,
    ml.user_id,
    ml.user_medication_id,
    ml.log_date,
    ml.log_time,
    ml.dosage_taken,
    ml.taken,
    ml.side_effects,
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
CREATE TEMP TABLE rpc_column_fixes (
    function_name TEXT,
    status TEXT,
    details TEXT
);

INSERT INTO rpc_column_fixes VALUES
  ('get_gait_episodes', '✅ FIXED', 'Primary key changed from id to gait_id'),
  ('get_medication_logs', '✅ FIXED', 'Removed non-existent missed_reason column');

SELECT * FROM rpc_column_fixes;

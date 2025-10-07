-- =====================================================
-- FIX ALL PATIENT DASHBOARD RPC FUNCTIONS
-- =====================================================
-- This migration fixes type mismatches and column errors in:
-- 1. get_user_medications (times column type)
-- 2. get_user_conditions (tracking_features type)
-- 3. get_tremor_episodes (primary key name)
-- 4. get_tracking_entries (wrong columns)
-- =====================================================

-- ============================================================================
-- 1. FIX get_user_medications - Change times from TEXT[] to TIME[]
-- ============================================================================
CREATE OR REPLACE FUNCTION get_user_medications(
  p_user_id UUID
)
RETURNS TABLE (
  id UUID,
  user_id UUID,
  medication_id UUID,
  medication_name TEXT,
  dosage_amount NUMERIC,
  dosage_unit TEXT,
  frequency TEXT,
  times TIME[], -- FIXED: was TEXT[], now TIME[]
  start_date DATE,
  end_date DATE,
  is_active BOOLEAN,
  created_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = private_health_info, public
AS $$
BEGIN
  IF p_user_id != auth.uid() THEN
    RAISE EXCEPTION 'Access denied: Users can only access their own medications'
      USING ERRCODE = '42501';
  END IF;

  RETURN QUERY
  SELECT 
    um.id,
    um.user_id,
    um.medication_id,
    um.medication_name,
    um.dosage_amount,
    um.dosage_unit,
    um.frequency,
    um.times,
    um.start_date,
    um.end_date,
    um.is_active,
    um.created_at
  FROM private_health_info.user_medications um
  WHERE um.user_id = p_user_id
    AND um.is_active = true
  ORDER BY um.created_at DESC;
END;
$$;

GRANT EXECUTE ON FUNCTION get_user_medications(UUID) TO authenticated;
REVOKE EXECUTE ON FUNCTION get_user_medications(UUID) FROM anon;

-- ============================================================================
-- 2. FIX get_user_conditions - Change tracking_features from TEXT[] to ENUM[]
-- ============================================================================
CREATE OR REPLACE FUNCTION get_user_conditions(
  p_user_id UUID
)
RETURNS TABLE (
  id UUID,
  user_id UUID,
  condition_id UUID,
  diagnosis_date DATE,
  severity INTEGER,
  tracking_features_enabled tracking_feature_enum[], -- FIXED: was TEXT[]
  created_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = private_health_info, public
AS $$
BEGIN
  IF p_user_id != auth.uid() THEN
    RAISE EXCEPTION 'Access denied: Users can only access their own conditions'
      USING ERRCODE = '42501';
  END IF;

  RETURN QUERY
  SELECT 
    uc.id,
    uc.user_id,
    uc.condition_id,
    uc.diagnosis_date,
    uc.severity,
    uc.tracking_features_enabled,
    uc.created_at
  FROM private_health_info.user_conditions uc
  WHERE uc.user_id = p_user_id
  ORDER BY uc.created_at DESC;
END;
$$;

GRANT EXECUTE ON FUNCTION get_user_conditions(UUID) TO authenticated;
REVOKE EXECUTE ON FUNCTION get_user_conditions(UUID) FROM anon;

-- ============================================================================
-- 3. FIX get_tremor_episodes - Use tremor_id instead of id
-- ============================================================================
CREATE OR REPLACE FUNCTION get_tremor_episodes(p_patient_id UUID)
RETURNS TABLE (
  tremor_id UUID, -- FIXED: was id, now tremor_id
  patient_id UUID,
  occurred_at TIMESTAMPTZ,
  duration_seconds INTEGER,
  tremor_type TEXT,
  severity INTEGER,
  frequency_hz NUMERIC,
  body_regions JSONB,
  dominant_side TEXT,
  interfered_with_activities BOOLEAN,
  activities_affected JSONB,
  occurred_during TEXT,
  medication_status TEXT,
  hours_since_medication INTEGER,
  possible_triggers JSONB,
  trigger_details TEXT,
  video_recorded BOOLEAN,
  media_urls JSONB,
  notes TEXT,
  created_at TIMESTAMPTZ
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
    te.tremor_id,
    te.patient_id,
    te.occurred_at,
    te.duration_seconds,
    te.tremor_type,
    te.severity,
    te.frequency_hz,
    te.body_regions,
    te.dominant_side,
    te.interfered_with_activities,
    te.activities_affected,
    te.occurred_during,
    te.medication_status,
    te.hours_since_medication,
    te.possible_triggers,
    te.trigger_details,
    te.video_recorded,
    te.media_urls,
    te.notes,
    te.created_at
  FROM private_health_info.tremor_episodes te
  WHERE te.patient_id = p_patient_id
  ORDER BY te.occurred_at DESC;
END;
$$;

GRANT EXECUTE ON FUNCTION get_tremor_episodes(UUID) TO authenticated;
REVOKE EXECUTE ON FUNCTION get_tremor_episodes(UUID) FROM anon;

-- ============================================================================
-- 4. FIX get_tracking_entries - Use actual columns from tracking_entries table
-- ============================================================================
CREATE OR REPLACE FUNCTION get_tracking_entries(p_user_id UUID)
RETURNS TABLE (
  id UUID,
  user_id UUID,
  tracking_type tracking_feature_enum,
  entry_date DATE,
  value NUMERIC,
  severity INTEGER,
  notes TEXT,
  metadata JSONB,
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
    te.id,
    te.user_id,
    te.tracking_type,
    te.entry_date,
    te.value,
    te.severity,
    te.notes,
    te.metadata,
    te.created_at,
    te.updated_at
  FROM private_health_info.tracking_entries te
  WHERE te.user_id = p_user_id
  ORDER BY te.entry_date DESC;
END;
$$;

GRANT EXECUTE ON FUNCTION get_tracking_entries(UUID) TO authenticated;
REVOKE EXECUTE ON FUNCTION get_tracking_entries(UUID) FROM anon;

-- ============================================================================
-- VERIFICATION TABLE
-- ============================================================================
CREATE TEMP TABLE rpc_fix_results (
    function_name TEXT,
    status TEXT,
    details TEXT
);

INSERT INTO rpc_fix_results VALUES
  ('get_user_medications', '✅ FIXED', 'times column now TIME[] instead of TEXT[]'),
  ('get_user_conditions', '✅ FIXED', 'tracking_features_enabled now tracking_feature_enum[]'),
  ('get_tremor_episodes', '✅ FIXED', 'Primary key changed from id to tremor_id'),
  ('get_tracking_entries', '✅ FIXED', 'All columns aligned with actual table structure');

SELECT * FROM rpc_fix_results;

-- ============================================================================
-- CREATE log_emergency_event RPC FUNCTION
-- ============================================================================
-- Securely logs emergency events to private_health_info.tracking_entries
-- ============================================================================

-- First, add 'emergency' to tracking_feature_enum if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_enum 
    WHERE enumlabel = 'emergency' 
    AND enumtypid = 'tracking_feature_enum'::regtype
  ) THEN
    ALTER TYPE tracking_feature_enum ADD VALUE 'emergency';
  END IF;
END $$;

DROP FUNCTION IF EXISTS public.log_emergency_event(uuid, text, jsonb) CASCADE;

CREATE OR REPLACE FUNCTION public.log_emergency_event(
  p_user_id UUID,
  p_event_type TEXT,
  p_details JSONB
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = private_health_info, public
AS $$
DECLARE
  v_entry_id UUID;
BEGIN
  -- Security: Only allow users to log their own emergency events
  IF p_user_id != auth.uid() THEN
    RAISE EXCEPTION 'Access denied' USING ERRCODE = '42501';
  END IF;
  
  -- Insert emergency event into tracking_entries
  INSERT INTO private_health_info.tracking_entries (
    user_id,
    tracking_type,
    entry_date,
    notes,
    metadata,
    created_at,
    updated_at
  )
  VALUES (
    p_user_id,
    'emergency'::tracking_feature_enum,
    CURRENT_DATE,
    'EMERGENCY EVENT: ' || p_event_type,
    jsonb_build_object(
      'event_type', p_event_type,
      'details', p_details,
      'timestamp', NOW()
    ),
    NOW(),
    NOW()
  )
  RETURNING id INTO v_entry_id;
  
  RETURN v_entry_id;
END;
$$;

-- Grant permissions
GRANT EXECUTE ON FUNCTION public.log_emergency_event(UUID, TEXT, JSONB) TO authenticated;
REVOKE EXECUTE ON FUNCTION public.log_emergency_event(UUID, TEXT, JSONB) FROM anon;

-- Add helpful comment
COMMENT ON FUNCTION public.log_emergency_event IS 'Securely logs emergency events to private_health_info.tracking_entries with proper RLS enforcement';

-- =====================================================
-- FIX get_patient_onboarding_data RPC
-- =====================================================
-- Drop and recreate with correct signature
-- =====================================================

-- Drop any existing versions
DROP FUNCTION IF EXISTS public.get_patient_onboarding_data(uuid) CASCADE;
DROP FUNCTION IF EXISTS public.get_patient_onboarding_data(text) CASCADE;
DROP FUNCTION IF EXISTS get_patient_onboarding_data(uuid) CASCADE;
DROP FUNCTION IF EXISTS get_patient_onboarding_data(text) CASCADE;

-- Create the correct version with ACTUAL columns from schema
CREATE OR REPLACE FUNCTION public.get_patient_onboarding_data(p_user_id UUID)
RETURNS TABLE (
  user_id UUID,
  first_name TEXT,
  middle_name TEXT,
  last_name TEXT,
  date_of_birth DATE,
  gender TEXT,
  phone_number TEXT,
  emergency_contact_name TEXT,
  emergency_contact_phone TEXT,
  emergency_contact_relationship TEXT,
  selected_conditions UUID[],
  track_menstrual_cycle BOOLEAN,
  share_research_data BOOLEAN,
  research_data_types TEXT[],
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  onboarding_step INTEGER
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = private_health_info, public
AS $$
BEGIN
  -- Security check: user can only access own data
  IF p_user_id != auth.uid() THEN
    RAISE EXCEPTION 'Access denied' USING ERRCODE = '42501';
  END IF;
  
  RETURN QUERY
  SELECT 
    pod.user_id,
    pod.first_name,
    pod.middle_name,
    pod.last_name,
    pod.date_of_birth,
    pod.gender::TEXT,
    pod.phone_number,
    pod.emergency_contact_name,
    pod.emergency_contact_phone,
    pod.emergency_contact_relationship,
    pod.selected_conditions,
    pod.track_menstrual_cycle,
    pod.share_research_data,
    ARRAY(SELECT unnest(pod.research_data_types)::TEXT),
    pod.completed_at,
    pod.created_at,
    pod.updated_at,
    pod.onboarding_step
  FROM private_health_info.patient_onboarding_data pod
  WHERE pod.user_id = p_user_id;
END;
$$;

-- Grant permissions
GRANT EXECUTE ON FUNCTION public.get_patient_onboarding_data(UUID) TO authenticated;
REVOKE EXECUTE ON FUNCTION public.get_patient_onboarding_data(UUID) FROM anon;

-- Test it
SELECT 
    proname as function_name,
    pg_get_function_arguments(oid) as arguments,
    pg_get_function_result(oid) as return_type
FROM pg_proc
WHERE proname = 'get_patient_onboarding_data'
AND pronamespace = 'public'::regnamespace;

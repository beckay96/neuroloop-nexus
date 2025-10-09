-- Create RPCs for Clinician Dashboard data fetching
-- IMPORTANT: SECURITY INVOKER to respect RLS. Grant EXECUTE to authenticated.
-- Per project SQL rules, drop before recreate; avoid RAISE NOTICE; no prints.

-- 1) Pending/All patient invitations for a clinician
DROP FUNCTION IF EXISTS public.get_clinician_connection_requests(uuid);
CREATE FUNCTION public.get_clinician_connection_requests(p_clinician_id uuid)
RETURNS TABLE (
  id uuid,
  clinician_id uuid,
  patient_email text,
  patient_user_id uuid,
  patient_name text,
  status text,
  invited_at timestamptz,
  expires_at timestamptz,
  accepted_at timestamptz,
  cancelled_at timestamptz
) LANGUAGE sql SECURITY INVOKER STABLE AS $$
  SELECT
    pi.id,
    pi.clinician_id,
    pi.patient_email,
    pi.patient_id AS patient_user_id,
    COALESCE(NULLIF(TRIM(pp.first_name || ' ' || pp.last_name), ''), pi.patient_email) AS patient_name,
    pi.status,
    pi.invited_at,
    pi.expires_at,
    pi.accepted_at,
    pi.cancelled_at
  FROM public.patient_invitations pi
  LEFT JOIN public.patient_profiles pp ON pp.user_id = pi.patient_id
  WHERE pi.clinician_id = p_clinician_id
  ORDER BY pi.invited_at DESC;
$$;

GRANT EXECUTE ON FUNCTION public.get_clinician_connection_requests(uuid) TO authenticated;

-- 2) Today view bundle (appointments, alerts, high_priority_patients, pending_tasks)
DROP FUNCTION IF EXISTS public.get_clinician_today_view(uuid, date);
CREATE FUNCTION public.get_clinician_today_view(p_clinician_id uuid, p_date date DEFAULT CURRENT_DATE)
RETURNS TABLE (
  date date,
  appointments jsonb,
  alerts jsonb,
  high_priority_patients jsonb,
  pending_tasks jsonb,
  last_refreshed timestamptz
) LANGUAGE sql SECURITY INVOKER STABLE AS $$
  SELECT
    v.date,
    v.appointments,
    v.alerts,
    v.high_priority_patients,
    v.pending_tasks,
    v.last_refreshed
  FROM clinical.clinician_today_view v
  WHERE v.clinician_id = p_clinician_id
    AND v.date = p_date
  ORDER BY v.last_refreshed DESC
  LIMIT 1;
$$;

GRANT EXECUTE ON FUNCTION public.get_clinician_today_view(uuid, date) TO authenticated;

-- 3) AI insights for a clinician
DROP FUNCTION IF EXISTS public.get_ai_insights_for_clinician(uuid);
CREATE FUNCTION public.get_ai_insights_for_clinician(p_clinician_id uuid)
RETURNS SETOF clinical.ai_insights_cards
LANGUAGE sql SECURITY INVOKER STABLE AS $$
  SELECT *
  FROM clinical.ai_insights_cards a
  WHERE a.clinician_id = p_clinician_id;
$$;

GRANT EXECUTE ON FUNCTION public.get_ai_insights_for_clinician(uuid) TO authenticated;

-- 4) Case panels for a patient (for clinician view)
DROP FUNCTION IF EXISTS public.get_case_panels_for_patient(uuid);
CREATE FUNCTION public.get_case_panels_for_patient(p_patient_id uuid)
RETURNS SETOF clinical.case_data_panels
LANGUAGE sql SECURITY INVOKER STABLE AS $$
  SELECT *
  FROM clinical.case_data_panels p
  WHERE p.patient_id = p_patient_id
    AND COALESCE(p.is_visible, true) = true
  ORDER BY p.display_order NULLS LAST, p.added_at DESC;
$$;

GRANT EXECUTE ON FUNCTION public.get_case_panels_for_patient(uuid) TO authenticated;

-- Ask PostgREST to reload schema for new RPCs (works on many setups)
NOTIFY pgrst, '{"db-schema": "public", "role": "authenticated", "action": "reload"}';

-- Complete RPC Suite for Clinician Dashboard Features
-- Security: INVOKER to respect RLS, granted to authenticated role
-- Per rules: drop before recreate, no RAISE NOTICE

-- ============= 1. PATIENT RISK ALERTS & STRATIFICATION =============

DROP FUNCTION IF EXISTS public.get_patient_risk_alerts(uuid);
CREATE FUNCTION public.get_patient_risk_alerts(p_clinician_id uuid)
RETURNS TABLE (
  alert_id uuid,
  patient_id uuid,
  patient_name text,
  patient_condition text,
  risk_type text,
  alert_level text,
  score numeric,
  reason text,
  recommendations jsonb,
  predictions jsonb,
  created_at timestamptz,
  last_updated timestamptz
) LANGUAGE sql SECURITY INVOKER STABLE AS $$
  SELECT
    a.alert_id,
    a.patient_id,
    COALESCE(NULLIF(TRIM(pp.first_name || ' ' || pp.last_name), ''), 'Patient') AS patient_name,
    COALESCE(uc.diagnosis_type, 'Neurological') AS patient_condition,
    a.risk_type,
    a.alert_level,
    a.score,
    a.reason,
    a.recommendations,
    a.predictions,
    a.created_at,
    a.last_updated
  FROM clinical.patient_risk_alerts a
  JOIN public.patient_clinician_connections pcc
    ON pcc.patient_id = a.patient_id
   AND pcc.clinician_id = p_clinician_id
   AND pcc.status = 'active'
  LEFT JOIN public.patient_profiles pp ON pp.user_id = a.patient_id
  LEFT JOIN private_health_info.user_conditions uc ON uc.user_id = a.patient_id AND uc.is_primary = true
  ORDER BY 
    CASE a.alert_level 
      WHEN 'critical' THEN 1 
      WHEN 'high' THEN 2 
      WHEN 'moderate' THEN 3 
      ELSE 4 
    END,
    a.score DESC,
    a.created_at DESC;
$$;

GRANT EXECUTE ON FUNCTION public.get_patient_risk_alerts(uuid) TO authenticated;

-- ============= 2. PATIENT SNAPSHOTS =============

DROP FUNCTION IF EXISTS public.get_patient_snapshots(uuid, integer);
CREATE FUNCTION public.get_patient_snapshots(p_clinician_id uuid, p_limit integer DEFAULT 10)
RETURNS TABLE (
  snapshot_id uuid,
  patient_id uuid,
  patient_name text,
  patient_avatar text,
  summary text,
  highlight_events jsonb,
  adherence_rate numeric,
  med_changes integer,
  ai_note text,
  generated_at timestamptz,
  author text,
  status text
) LANGUAGE sql SECURITY INVOKER STABLE AS $$
  SELECT
    s.snapshot_id,
    s.patient_id,
    COALESCE(NULLIF(TRIM(pp.first_name || ' ' || pp.last_name), ''), 'Patient') AS patient_name,
    (COALESCE(SUBSTRING(NULLIF(TRIM(pp.first_name), '') FROM 1 FOR 1), 'P') || 
     COALESCE(SUBSTRING(NULLIF(TRIM(pp.last_name), '') FROM 1 FOR 1), '')) AS patient_avatar,
    s.summary,
    s.highlight_events,
    s.adherence_rate,
    s.med_changes,
    s.ai_note,
    s.generated_at,
    s.author::text,
    s.status::text
  FROM clinical.patient_snapshots s
  JOIN public.patient_clinician_connections pcc
    ON pcc.patient_id = s.patient_id
   AND pcc.clinician_id = p_clinician_id
   AND pcc.status = 'active'
  LEFT JOIN public.patient_profiles pp ON pp.user_id = s.patient_id
  WHERE COALESCE(s.is_visible, true) = true
  ORDER BY s.generated_at DESC
  LIMIT p_limit;
$$;

GRANT EXECUTE ON FUNCTION public.get_patient_snapshots(uuid, integer) TO authenticated;

-- ============= 3. CLINICAL SCALES RESULTS =============

DROP FUNCTION IF EXISTS public.get_clinical_scales_for_clinician(uuid, integer);
CREATE FUNCTION public.get_clinical_scales_for_clinician(p_clinician_id uuid, p_limit integer DEFAULT 20)
RETURNS TABLE (
  scale_id uuid,
  patient_id uuid,
  patient_name text,
  scale_type text,
  scale_version text,
  total_score numeric,
  subscores jsonb,
  assessed_at timestamptz,
  assessed_by uuid,
  assessed_by_name text,
  entered_by uuid,
  assessment_notes text,
  change_alert boolean,
  due_at timestamptz
) LANGUAGE sql SECURITY INVOKER STABLE AS $$
  SELECT
    s.scale_id,
    s.patient_id,
    COALESCE(NULLIF(TRIM(pp.first_name || ' ' || pp.last_name), ''), 'Patient') AS patient_name,
    s.scale_type::text,
    s.scale_version,
    s.total_score,
    s.subscores,
    s.assessed_at,
    s.assessed_by,
    COALESCE(NULLIF(TRIM(cp.first_name || ' ' || cp.last_name), ''), 'Clinician') AS assessed_by_name,
    s.entered_by,
    s.assessment_notes,
    s.change_alert,
    (s.assessed_at + INTERVAL '3 months') AS due_at
  FROM clinical.clinical_scale_results s
  JOIN public.patient_clinician_connections pcc
    ON pcc.patient_id = s.patient_id
   AND pcc.clinician_id = p_clinician_id
   AND pcc.status = 'active'
  LEFT JOIN public.patient_profiles pp ON pp.user_id = s.patient_id
  LEFT JOIN public.clinician_profiles cp ON cp.user_id = s.assessed_by
  ORDER BY s.assessed_at DESC
  LIMIT p_limit;
$$;

GRANT EXECUTE ON FUNCTION public.get_clinical_scales_for_clinician(uuid, integer) TO authenticated;

-- Get scales for a specific patient
DROP FUNCTION IF EXISTS public.get_clinical_scales_for_patient(uuid, uuid);
CREATE FUNCTION public.get_clinical_scales_for_patient(p_patient_id uuid, p_clinician_id uuid DEFAULT NULL)
RETURNS SETOF clinical.clinical_scale_results
LANGUAGE sql SECURITY INVOKER STABLE AS $$
  SELECT s.*
  FROM clinical.clinical_scale_results s
  WHERE s.patient_id = p_patient_id
    AND (p_clinician_id IS NULL OR EXISTS (
      SELECT 1 FROM public.patient_clinician_connections pcc
      WHERE pcc.patient_id = s.patient_id
        AND pcc.clinician_id = p_clinician_id
        AND pcc.status = 'active'
    ))
  ORDER BY s.assessed_at DESC;
$$;

GRANT EXECUTE ON FUNCTION public.get_clinical_scales_for_patient(uuid, uuid) TO authenticated;

-- ============= 4. NEUROIMAGING RESULTS =============

DROP FUNCTION IF EXISTS public.get_neuroimaging_for_clinician(uuid, integer);
CREATE FUNCTION public.get_neuroimaging_for_clinician(p_clinician_id uuid, p_limit integer DEFAULT 20)
RETURNS TABLE (
  image_id uuid,
  patient_id uuid,
  patient_name text,
  study_type text,
  study_date date,
  findings text,
  impression text,
  study_condition_code text,
  ordering_physician uuid,
  ordering_physician_name text,
  uploaded_by uuid,
  created_at timestamptz,
  annotations_count bigint
) LANGUAGE sql SECURITY INVOKER STABLE AS $$
  WITH annotation_counts AS (
    SELECT 
      image_id,
      COUNT(*) AS count
    FROM clinical.neuro_imaging_annotations
    GROUP BY image_id
  )
  SELECT
    n.image_id,
    n.patient_id,
    COALESCE(NULLIF(TRIM(pp.first_name || ' ' || pp.last_name), ''), 'Patient') AS patient_name,
    n.study_type::text,
    n.study_date,
    n.findings,
    n.impression,
    n.study_condition_code,
    n.ordering_physician,
    COALESCE(NULLIF(TRIM(cp.first_name || ' ' || cp.last_name), ''), 'Physician') AS ordering_physician_name,
    n.uploaded_by,
    n.created_at,
    COALESCE(ac.count, 0) AS annotations_count
  FROM clinical.neuro_imaging_results n
  JOIN public.patient_clinician_connections pcc
    ON pcc.patient_id = n.patient_id
   AND pcc.clinician_id = p_clinician_id
   AND pcc.status = 'active'
  LEFT JOIN public.patient_profiles pp ON pp.user_id = n.patient_id
  LEFT JOIN public.clinician_profiles cp ON cp.user_id = n.ordering_physician
  LEFT JOIN annotation_counts ac ON ac.image_id = n.image_id
  ORDER BY n.study_date DESC, n.created_at DESC
  LIMIT p_limit;
$$;

GRANT EXECUTE ON FUNCTION public.get_neuroimaging_for_clinician(uuid, integer) TO authenticated;

-- Get imaging for a specific patient
DROP FUNCTION IF EXISTS public.get_neuroimaging_for_patient(uuid, uuid);
CREATE FUNCTION public.get_neuroimaging_for_patient(p_patient_id uuid, p_clinician_id uuid DEFAULT NULL)
RETURNS SETOF clinical.neuro_imaging_results
LANGUAGE sql SECURITY INVOKER STABLE AS $$
  SELECT n.*
  FROM clinical.neuro_imaging_results n
  WHERE n.patient_id = p_patient_id
    AND (p_clinician_id IS NULL OR EXISTS (
      SELECT 1 FROM public.patient_clinician_connections pcc
      WHERE pcc.patient_id = n.patient_id
        AND pcc.clinician_id = p_clinician_id
        AND pcc.status = 'active'
    ))
  ORDER BY n.study_date DESC, n.created_at DESC;
$$;

GRANT EXECUTE ON FUNCTION public.get_neuroimaging_for_patient(uuid, uuid) TO authenticated;

-- ============= 5. MEDICATION MANAGEMENT =============

DROP FUNCTION IF EXISTS public.get_patient_medications_overview(uuid);
CREATE FUNCTION public.get_patient_medications_overview(p_clinician_id uuid)
RETURNS TABLE (
  patient_id uuid,
  patient_name text,
  patient_condition text,
  overall_adherence numeric,
  active_medications_count bigint,
  recent_changes_count bigint,
  alerts_count bigint,
  last_medication_taken timestamptz,
  next_dose_due timestamptz
) LANGUAGE sql SECURITY INVOKER STABLE AS $$
  WITH med_stats AS (
    SELECT
      um.user_id AS patient_id,
      COUNT(*) FILTER (WHERE um.status = 'active') AS active_count,
      COUNT(*) FILTER (WHERE um.started_at > NOW() - INTERVAL '30 days') AS recent_changes
    FROM private_health_info.user_medications um
    GROUP BY um.user_id
  ),
  adherence_calc AS (
    SELECT
      ml.user_id AS patient_id,
      AVG(CASE WHEN ml.taken THEN 100.0 ELSE 0.0 END) AS adherence,
      MAX(ml.scheduled_time) FILTER (WHERE ml.taken) AS last_taken,
      MIN(ml.scheduled_time) FILTER (WHERE NOT ml.taken AND ml.scheduled_time > NOW()) AS next_due
    FROM private_health_info.medication_logs ml
    WHERE ml.scheduled_time > NOW() - INTERVAL '30 days'
    GROUP BY ml.user_id
  ),
  alert_counts AS (
    SELECT
      a.patient_id,
      COUNT(*) AS alert_count
    FROM clinical.patient_risk_alerts a
    WHERE a.risk_type LIKE '%medication%'
      OR a.risk_type = 'adherence'
    GROUP BY a.patient_id
  )
  SELECT
    pcc.patient_id,
    COALESCE(NULLIF(TRIM(pp.first_name || ' ' || pp.last_name), ''), 'Patient') AS patient_name,
    COALESCE(uc.diagnosis_type, 'Neurological') AS patient_condition,
    COALESCE(ac.adherence, 0) AS overall_adherence,
    COALESCE(ms.active_count, 0) AS active_medications_count,
    COALESCE(ms.recent_changes, 0) AS recent_changes_count,
    COALESCE(alc.alert_count, 0) AS alerts_count,
    ac.last_taken AS last_medication_taken,
    ac.next_due AS next_dose_due
  FROM public.patient_clinician_connections pcc
  LEFT JOIN public.patient_profiles pp ON pp.user_id = pcc.patient_id
  LEFT JOIN private_health_info.user_conditions uc ON uc.user_id = pcc.patient_id AND uc.is_primary = true
  LEFT JOIN med_stats ms ON ms.patient_id = pcc.patient_id
  LEFT JOIN adherence_calc ac ON ac.patient_id = pcc.patient_id
  LEFT JOIN alert_counts alc ON alc.patient_id = pcc.patient_id
  WHERE pcc.clinician_id = p_clinician_id
    AND pcc.status = 'active'
  ORDER BY alerts_count DESC, overall_adherence ASC;
$$;

GRANT EXECUTE ON FUNCTION public.get_patient_medications_overview(uuid) TO authenticated;

-- Get detailed medications for a specific patient
DROP FUNCTION IF EXISTS public.get_patient_medication_details(uuid, uuid);
CREATE FUNCTION public.get_patient_medication_details(p_patient_id uuid, p_clinician_id uuid)
RETURNS TABLE (
  medication_id uuid,
  medication_name text,
  dosage text,
  frequency text,
  route text,
  status text,
  started_at timestamptz,
  ended_at timestamptz,
  prescribed_by text,
  adherence_rate numeric,
  last_taken timestamptz,
  next_due timestamptz,
  recent_doses jsonb
) LANGUAGE sql SECURITY INVOKER STABLE AS $$
  WITH adherence_calc AS (
    SELECT
      ml.medication_name,
      AVG(CASE WHEN ml.taken THEN 100.0 ELSE 0.0 END) AS adherence,
      MAX(ml.scheduled_time) FILTER (WHERE ml.taken) AS last_taken,
      MIN(ml.scheduled_time) FILTER (WHERE NOT ml.taken AND ml.scheduled_time > NOW()) AS next_due,
      jsonb_agg(
        jsonb_build_object(
          'time', ml.scheduled_time,
          'taken', ml.taken,
          'late', ml.taken_at > ml.scheduled_time + INTERVAL '30 minutes',
          'skipped', NOT ml.taken AND ml.scheduled_time < NOW()
        ) ORDER BY ml.scheduled_time DESC
      ) FILTER (WHERE ml.scheduled_time > NOW() - INTERVAL '7 days') AS recent_doses
    FROM private_health_info.medication_logs ml
    WHERE ml.user_id = p_patient_id
    GROUP BY ml.medication_name
  )
  SELECT
    um.medication_id,
    um.medication_name,
    um.dosage,
    um.frequency,
    um.route,
    um.status,
    um.started_at,
    um.ended_at,
    COALESCE(NULLIF(TRIM(cp.first_name || ' ' || cp.last_name), ''), 'Prescriber') AS prescribed_by,
    COALESCE(ac.adherence, 0) AS adherence_rate,
    ac.last_taken,
    ac.next_due,
    COALESCE(ac.recent_doses, '[]'::jsonb) AS recent_doses
  FROM private_health_info.user_medications um
  LEFT JOIN adherence_calc ac ON ac.medication_name = um.medication_name
  LEFT JOIN public.clinician_profiles cp ON cp.user_id = um.prescribed_by
  WHERE um.user_id = p_patient_id
    AND EXISTS (
      SELECT 1 FROM public.patient_clinician_connections pcc
      WHERE pcc.patient_id = p_patient_id
        AND pcc.clinician_id = p_clinician_id
        AND pcc.status = 'active'
    )
  ORDER BY um.status DESC, um.started_at DESC;
$$;

GRANT EXECUTE ON FUNCTION public.get_patient_medication_details(uuid, uuid) TO authenticated;

-- ============= 6. PATIENT PRO TIMELINE =============

DROP FUNCTION IF EXISTS public.get_patient_pro_timeline(uuid, uuid);
CREATE FUNCTION public.get_patient_pro_timeline(p_patient_id uuid, p_clinician_id uuid DEFAULT NULL)
RETURNS SETOF clinical.patient_pro_timeline
LANGUAGE sql SECURITY INVOKER STABLE AS $$
  SELECT pt.*
  FROM clinical.patient_pro_timeline pt
  WHERE pt.patient_id = p_patient_id
    AND (p_clinician_id IS NULL OR EXISTS (
      SELECT 1 FROM public.patient_clinician_connections pcc
      WHERE pcc.patient_id = pt.patient_id
        AND pcc.clinician_id = p_clinician_id
        AND pcc.status = 'active'
    ))
  ORDER BY pt.reported_at DESC;
$$;

GRANT EXECUTE ON FUNCTION public.get_patient_pro_timeline(uuid, uuid) TO authenticated;

-- Reload PostgREST schema
NOTIFY pgrst, '{"db-schema": "public", "role": "authenticated", "action": "reload"}';

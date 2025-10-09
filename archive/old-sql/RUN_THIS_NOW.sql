-- =====================================================
-- COMPREHENSIVE FIX - RUN THIS NOW
-- =====================================================
-- Fixes: RPCs, RLS policies, and test issues
-- =====================================================

CREATE TEMP TABLE IF NOT EXISTS fix_log (
  fix_number INTEGER,
  fix_name TEXT,
  status TEXT,
  details TEXT
);

-- =====================================================
-- FIX 1: Update save_scale_result with NULL check
-- =====================================================

DROP FUNCTION IF EXISTS clinical.save_scale_result(UUID, clinical.scale_type_enum, clinical.scale_version_enum, NUMERIC, TIMESTAMPTZ, UUID, UUID, TEXT, TEXT, TEXT, JSONB);
CREATE OR REPLACE FUNCTION clinical.save_scale_result(
  p_patient_id UUID,
  p_scale_type clinical.scale_type_enum,
  p_scale_version clinical.scale_version_enum,
  p_total_score NUMERIC,
  p_assessed_at TIMESTAMPTZ,
  p_assessed_by UUID,
  p_entered_by UUID,
  p_snomed_ct_code TEXT DEFAULT NULL,
  p_icd10_code TEXT DEFAULT NULL,
  p_notes TEXT DEFAULT NULL,
  p_subscores JSONB DEFAULT '[]'::JSONB
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = clinical, public
AS $$
DECLARE
  v_scale_id UUID;
  v_subscore JSONB;
BEGIN
  -- Validate patient_id is not NULL
  IF p_patient_id IS NULL THEN
    RAISE EXCEPTION 'patient_id cannot be NULL';
  END IF;
  
  -- Insert main scale result
  INSERT INTO clinical.clinical_scale_results (
    patient_id,
    scale_type,
    scale_version,
    total_score,
    assessed_at,
    assessed_by,
    entered_by,
    snomed_ct_code,
    icd10_code,
    assessment_notes
  ) VALUES (
    p_patient_id,
    p_scale_type,
    p_scale_version,
    p_total_score,
    p_assessed_at,
    p_assessed_by,
    p_entered_by,
    p_snomed_ct_code,
    p_icd10_code,
    p_notes
  ) RETURNING scale_id INTO v_scale_id;
  
  -- Insert subscores if provided
  IF p_subscores IS NOT NULL AND jsonb_array_length(p_subscores) > 0 THEN
    FOR v_subscore IN SELECT * FROM jsonb_array_elements(p_subscores)
    LOOP
      INSERT INTO clinical.clinical_scale_subscore_results (
        scale_id,
        subscale_label,
        score,
        max_score,
        score_interpretation
      ) VALUES (
        v_scale_id,
        (v_subscore->>'subscale_label')::clinical.subscale_label_enum,
        (v_subscore->>'score')::NUMERIC,
        (v_subscore->>'max_score')::NUMERIC,
        v_subscore->>'score_interpretation'
      );
    END LOOP;
  END IF;
  
  RETURN v_scale_id;
END;
$$;

GRANT EXECUTE ON FUNCTION clinical.save_scale_result(UUID, clinical.scale_type_enum, clinical.scale_version_enum, NUMERIC, TIMESTAMPTZ, UUID, UUID, TEXT, TEXT, TEXT, JSONB) TO authenticated;

INSERT INTO fix_log VALUES (1, 'save_scale_result', 'FIXED', 'Added NULL check for patient_id');

-- =====================================================
-- FIX 2: Update get_scale_results with type casting
-- =====================================================

DROP FUNCTION IF EXISTS clinical.get_scale_results_with_subscores(UUID, clinical.scale_type_enum, INTEGER);
CREATE OR REPLACE FUNCTION clinical.get_scale_results_with_subscores(
  p_patient_id UUID,
  p_scale_type clinical.scale_type_enum DEFAULT NULL,
  p_limit INTEGER DEFAULT 20
)
RETURNS TABLE (
  scale_id UUID,
  patient_id UUID,
  scale_type TEXT,
  scale_version TEXT,
  total_score NUMERIC,
  assessed_at TIMESTAMPTZ,
  assessed_by UUID,
  entered_by UUID,
  snomed_ct_code TEXT,
  icd10_code TEXT,
  assessment_notes TEXT,
  entered_at TIMESTAMPTZ,
  subscores JSONB
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = clinical, public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    sr.scale_id,
    sr.patient_id,
    sr.scale_type::TEXT,
    sr.scale_version::TEXT,
    sr.total_score,
    sr.assessed_at,
    sr.assessed_by,
    sr.entered_by,
    sr.snomed_ct_code,
    sr.icd10_code,
    sr.assessment_notes,
    sr.entered_at,
    COALESCE(
      (
        SELECT jsonb_agg(
          jsonb_build_object(
            'subscale_label', ss.subscale_label::TEXT,
            'score', ss.score,
            'max_score', ss.max_score,
            'score_interpretation', ss.score_interpretation
          )
        )
        FROM clinical.clinical_scale_subscore_results ss
        WHERE ss.scale_id = sr.scale_id
      ),
      '[]'::JSONB
    ) as subscores
  FROM clinical.clinical_scale_results sr
  WHERE 
    sr.patient_id = p_patient_id
    AND (p_scale_type IS NULL OR sr.scale_type::TEXT = p_scale_type::TEXT)
  ORDER BY sr.assessed_at DESC, sr.entered_at DESC
  LIMIT p_limit;
END;
$$;

GRANT EXECUTE ON FUNCTION clinical.get_scale_results_with_subscores(UUID, clinical.scale_type_enum, INTEGER) TO authenticated;

INSERT INTO fix_log VALUES (2, 'get_scale_results_with_subscores', 'FIXED', 'Fixed type casting in WHERE clause');

-- =====================================================
-- FIX 3: Add INSERT policies for child tables
-- =====================================================

DROP POLICY IF EXISTS "Users can insert annotations for their own images" ON clinical.imaging_annotations;
CREATE POLICY "Users can insert annotations for their own images"
  ON clinical.imaging_annotations
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM clinical.neuro_imaging_results
      WHERE image_id = imaging_annotations.image_id
      AND patient_id = auth.uid()
    )
  );

GRANT INSERT ON clinical.imaging_annotations TO authenticated;

INSERT INTO fix_log VALUES (3, 'imaging_annotations INSERT policy', 'ADDED', 'Users can now insert annotations');

DROP POLICY IF EXISTS "Users can insert their own PRO values" ON clinical.patient_pro_value;
CREATE POLICY "Users can insert their own PRO values"
  ON clinical.patient_pro_value
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM clinical.patient_pro_timeline
      WHERE pro_id = patient_pro_value.pro_id
      AND patient_id = auth.uid()
    )
  );

GRANT INSERT ON clinical.patient_pro_value TO authenticated;

INSERT INTO fix_log VALUES (4, 'patient_pro_value INSERT policy', 'ADDED', 'Users can now insert PRO values');

DROP POLICY IF EXISTS "Users can insert subscores for their own scale results" ON clinical.clinical_scale_subscore_results;
CREATE POLICY "Users can insert subscores for their own scale results"
  ON clinical.clinical_scale_subscore_results
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM clinical.clinical_scale_results
      WHERE scale_id = clinical_scale_subscore_results.scale_id
      AND patient_id = auth.uid()
    )
  );

GRANT INSERT ON clinical.clinical_scale_subscore_results TO authenticated;

INSERT INTO fix_log VALUES (5, 'clinical_scale_subscore_results INSERT policy', 'ADDED', 'Users can now insert subscores');

-- =====================================================
-- VERIFICATION: Count policies
-- =====================================================

INSERT INTO fix_log
SELECT 
  6,
  'Total RLS Policies',
  CASE WHEN COUNT(*) >= 30 THEN 'PASS' ELSE 'CHECK' END,
  'Found ' || COUNT(*) || ' policies on audited tables'
FROM pg_policies
WHERE schemaname IN ('clinical', 'public', 'private_health_info')
  AND tablename IN (
    'clinical_scale_subscore_results',
    'imaging_annotations',
    'patient_pro_value',
    'clinical_scales_library',
    'imaging_findings_library',
    'pro_measures_library',
    'diagnoses_library',
    'symptoms_library',
    'patient_diagnoses',
    'seizure_logs',
    'custom_tracking_items',
    'custom_tracking_values'
  );

-- Display results
SELECT * FROM fix_log ORDER BY fix_number;

-- Reload PostgREST schema
NOTIFY pgrst, '{"action": "reload"}';


| fix_number | fix_name                                      | status | details                             |
| ---------- | --------------------------------------------- | ------ | ----------------------------------- |
| 1          | save_scale_result                             | FIXED  | Added NULL check for patient_id     |
| 2          | get_scale_results_with_subscores              | FIXED  | Fixed type casting in WHERE clause  |
| 3          | imaging_annotations INSERT policy             | ADDED  | Users can now insert annotations    |
| 4          | patient_pro_value INSERT policy               | ADDED  | Users can now insert PRO values     |
| 5          | clinical_scale_subscore_results INSERT policy | ADDED  | Users can now insert subscores      |
| 6          | Total RLS Policies                            | PASS   | Found 30 policies on audited tables |
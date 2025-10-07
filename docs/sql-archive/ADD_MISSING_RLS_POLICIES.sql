-- =====================================================
-- ADD MISSING RLS POLICIES FOR CHILD TABLES
-- =====================================================
-- These child tables need INSERT policies so users can add their own data

CREATE TEMP TABLE IF NOT EXISTS policy_add_log (
  table_name TEXT,
  policy_name TEXT,
  status TEXT
);

-- =====================================================
-- IMAGING ANNOTATIONS - Add INSERT policy
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

INSERT INTO policy_add_log VALUES ('clinical.imaging_annotations', 'INSERT policy', 'ADDED');

GRANT INSERT ON clinical.imaging_annotations TO authenticated;

-- =====================================================
-- PATIENT PRO VALUES - Add INSERT policy
-- =====================================================

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

INSERT INTO policy_add_log VALUES ('clinical.patient_pro_value', 'INSERT policy', 'ADDED');

GRANT INSERT ON clinical.patient_pro_value TO authenticated;

-- =====================================================
-- CLINICAL SCALE SUBSCORES - Add INSERT policy
-- =====================================================

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

INSERT INTO policy_add_log VALUES ('clinical.clinical_scale_subscore_results', 'INSERT policy', 'ADDED');

GRANT INSERT ON clinical.clinical_scale_subscore_results TO authenticated;

-- =====================================================
-- VERIFY NEW POLICY COUNT
-- =====================================================

SELECT 
  'Policy Count Check' as check_name,
  COUNT(*)::TEXT || ' policies found' as details
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

-- Display what was added
SELECT * FROM policy_add_log;

-- Reload schema
NOTIFY pgrst, '{"action": "reload"}';

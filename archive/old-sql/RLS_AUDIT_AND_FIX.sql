-- =====================================================
-- RLS POLICY AUDIT AND FIX FOR NEW TABLES
-- =====================================================
-- Created: 2025-01-08
-- Purpose: Ensure all new tables from PHASE 1-4 have proper RLS policies
-- =====================================================

-- =====================================================
-- STEP 1: ENABLE RLS ON ALL NEW TABLES
-- =====================================================

-- Clinical schema tables
ALTER TABLE clinical.clinical_scale_subscore_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE clinical.imaging_annotations ENABLE ROW LEVEL SECURITY;
ALTER TABLE clinical.patient_pro_value ENABLE ROW LEVEL SECURITY;

-- Public schema reference/library tables
ALTER TABLE public.clinical_scales_library ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.imaging_findings_library ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pro_measures_library ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.diagnoses_library ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.symptoms_library ENABLE ROW LEVEL SECURITY;

-- Private health info tables
ALTER TABLE private_health_info.patient_diagnoses ENABLE ROW LEVEL SECURITY;
ALTER TABLE private_health_info.seizure_logs ENABLE ROW LEVEL SECURITY;

-- Public custom tracking tables
ALTER TABLE public.custom_tracking_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.custom_tracking_values ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- STEP 2: RLS POLICIES FOR CLINICAL SCHEMA
-- =====================================================

-- Clinical Scale Subscores - Users see subscores for their own scale results
DROP POLICY IF EXISTS "Users can view subscores for their own scale results" ON clinical.clinical_scale_subscore_results;
CREATE POLICY "Users can view subscores for their own scale results"
  ON clinical.clinical_scale_subscore_results
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM clinical.clinical_scale_results
      WHERE scale_id = clinical_scale_subscore_results.scale_id
      AND patient_id = auth.uid()
    )
  );

GRANT SELECT ON clinical.clinical_scale_subscore_results TO authenticated;

-- Imaging Annotations - Users see annotations for their own imaging results
DROP POLICY IF EXISTS "Users can view annotations for their own images" ON clinical.imaging_annotations;
CREATE POLICY "Users can view annotations for their own images"
  ON clinical.imaging_annotations
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM clinical.neuro_imaging_results
      WHERE image_id = imaging_annotations.image_id
      AND patient_id = auth.uid()
    )
  );

GRANT SELECT ON clinical.imaging_annotations TO authenticated;

-- Patient PRO Values - Users see PRO values for their own timeline entries
DROP POLICY IF EXISTS "Users can view their own PRO values" ON clinical.patient_pro_value;
CREATE POLICY "Users can view their own PRO values"
  ON clinical.patient_pro_value
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM clinical.patient_pro_timeline
      WHERE pro_id = patient_pro_value.pro_id
      AND patient_id = auth.uid()
    )
  );

GRANT SELECT ON clinical.patient_pro_value TO authenticated;

-- =====================================================
-- STEP 3: RLS POLICIES FOR PUBLIC REFERENCE TABLES
-- =====================================================
-- These are read-only libraries for all authenticated users

-- Clinical Scales Library
DROP POLICY IF EXISTS "Clinical scales library readable by authenticated" ON public.clinical_scales_library;
CREATE POLICY "Clinical scales library readable by authenticated"
  ON public.clinical_scales_library
  FOR SELECT
  TO authenticated
  USING (true);

GRANT SELECT ON public.clinical_scales_library TO authenticated;

-- Imaging Findings Library
DROP POLICY IF EXISTS "Imaging findings library readable by authenticated" ON public.imaging_findings_library;
CREATE POLICY "Imaging findings library readable by authenticated"
  ON public.imaging_findings_library
  FOR SELECT
  TO authenticated
  USING (true);

GRANT SELECT ON public.imaging_findings_library TO authenticated;

-- PRO Measures Library
DROP POLICY IF EXISTS "PRO measures library readable by authenticated" ON public.pro_measures_library;
CREATE POLICY "PRO measures library readable by authenticated"
  ON public.pro_measures_library
  FOR SELECT
  TO authenticated
  USING (true);

GRANT SELECT ON public.pro_measures_library TO authenticated;

-- Diagnoses Library
DROP POLICY IF EXISTS "Diagnoses library readable by authenticated" ON public.diagnoses_library;
CREATE POLICY "Diagnoses library readable by authenticated"
  ON public.diagnoses_library
  FOR SELECT
  TO authenticated
  USING (true);

GRANT SELECT ON public.diagnoses_library TO authenticated;

-- Symptoms Library (already has policy, but ensure it's correct)
DROP POLICY IF EXISTS "Symptoms library readable by authenticated" ON public.symptoms_library;
CREATE POLICY "Symptoms library readable by authenticated"
  ON public.symptoms_library
  FOR SELECT
  TO authenticated
  USING (true);

GRANT SELECT ON public.symptoms_library TO authenticated;

-- =====================================================
-- STEP 4: RLS POLICIES FOR PRIVATE HEALTH INFO
-- =====================================================

-- Patient Diagnoses - Full CRUD for own records
DROP POLICY IF EXISTS "Users can view own diagnoses" ON private_health_info.patient_diagnoses;
CREATE POLICY "Users can view own diagnoses"
  ON private_health_info.patient_diagnoses
  FOR SELECT
  USING (patient_id = auth.uid());

DROP POLICY IF EXISTS "Users can insert own diagnoses" ON private_health_info.patient_diagnoses;
CREATE POLICY "Users can insert own diagnoses"
  ON private_health_info.patient_diagnoses
  FOR INSERT
  WITH CHECK (patient_id = auth.uid());

DROP POLICY IF EXISTS "Users can update own diagnoses" ON private_health_info.patient_diagnoses;
CREATE POLICY "Users can update own diagnoses"
  ON private_health_info.patient_diagnoses
  FOR UPDATE
  USING (patient_id = auth.uid());

DROP POLICY IF EXISTS "Users can delete own diagnoses" ON private_health_info.patient_diagnoses;
CREATE POLICY "Users can delete own diagnoses"
  ON private_health_info.patient_diagnoses
  FOR DELETE
  USING (patient_id = auth.uid());

GRANT SELECT, INSERT, UPDATE, DELETE ON private_health_info.patient_diagnoses TO authenticated;

-- Seizure Logs - Full CRUD for own records
DROP POLICY IF EXISTS "Users can view own seizure logs" ON private_health_info.seizure_logs;
CREATE POLICY "Users can view own seizure logs"
  ON private_health_info.seizure_logs
  FOR SELECT
  USING (patient_id = auth.uid());

DROP POLICY IF EXISTS "Users can insert own seizure logs" ON private_health_info.seizure_logs;
CREATE POLICY "Users can insert own seizure logs"
  ON private_health_info.seizure_logs
  FOR INSERT
  WITH CHECK (patient_id = auth.uid());

DROP POLICY IF EXISTS "Users can update own seizure logs" ON private_health_info.seizure_logs;
CREATE POLICY "Users can update own seizure logs"
  ON private_health_info.seizure_logs
  FOR UPDATE
  USING (patient_id = auth.uid());

DROP POLICY IF EXISTS "Users can delete own seizure logs" ON private_health_info.seizure_logs;
CREATE POLICY "Users can delete own seizure logs"
  ON private_health_info.seizure_logs
  FOR DELETE
  USING (patient_id = auth.uid());

GRANT SELECT, INSERT, UPDATE, DELETE ON private_health_info.seizure_logs TO authenticated;

-- =====================================================
-- STEP 5: RLS POLICIES FOR CUSTOM TRACKING TABLES
-- =====================================================

-- Custom Tracking Items - Full CRUD for own items
DROP POLICY IF EXISTS "Users can view own custom tracking items" ON public.custom_tracking_items;
CREATE POLICY "Users can view own custom tracking items"
  ON public.custom_tracking_items
  FOR SELECT
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can insert own custom tracking items" ON public.custom_tracking_items;
CREATE POLICY "Users can insert own custom tracking items"
  ON public.custom_tracking_items
  FOR INSERT
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can update own custom tracking items" ON public.custom_tracking_items;
CREATE POLICY "Users can update own custom tracking items"
  ON public.custom_tracking_items
  FOR UPDATE
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can delete own custom tracking items" ON public.custom_tracking_items;
CREATE POLICY "Users can delete own custom tracking items"
  ON public.custom_tracking_items
  FOR DELETE
  USING (user_id = auth.uid());

GRANT SELECT, INSERT, UPDATE, DELETE ON public.custom_tracking_items TO authenticated;

-- Custom Tracking Values - Full CRUD for own values
DROP POLICY IF EXISTS "Users can view own custom tracking values" ON public.custom_tracking_values;
CREATE POLICY "Users can view own custom tracking values"
  ON public.custom_tracking_values
  FOR SELECT
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can insert own custom tracking values" ON public.custom_tracking_values;
CREATE POLICY "Users can insert own custom tracking values"
  ON public.custom_tracking_values
  FOR INSERT
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can update own custom tracking values" ON public.custom_tracking_values;
CREATE POLICY "Users can update own custom tracking values"
  ON public.custom_tracking_values
  FOR UPDATE
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can delete own custom tracking values" ON public.custom_tracking_values;
CREATE POLICY "Users can delete own custom tracking values"
  ON public.custom_tracking_values
  FOR DELETE
  USING (user_id = auth.uid());

GRANT SELECT, INSERT, UPDATE, DELETE ON public.custom_tracking_values TO authenticated;

-- =====================================================
-- STEP 6: VERIFICATION QUERIES
-- =====================================================

-- Check RLS is enabled on all tables
SELECT 
  schemaname,
  tablename,
  rowsecurity AS rls_enabled
FROM pg_tables
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
  )
ORDER BY schemaname, tablename;

-- Check all policies exist
SELECT 
  schemaname,
  tablename,
  policyname,
  cmd AS operation,
  qual AS using_clause,
  with_check AS with_check_clause
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
  )
ORDER BY schemaname, tablename, policyname;

-- =====================================================
-- STEP 7: SUMMARY RESULTS
-- =====================================================

-- Create temp table for results
CREATE TEMP TABLE IF NOT EXISTS rls_audit_results (
  check_name TEXT,
  status TEXT,
  details TEXT
);

-- Check all tables have RLS enabled
INSERT INTO rls_audit_results
SELECT 
  'RLS Enabled Check',
  CASE WHEN COUNT(*) = 12 THEN 'PASS' ELSE 'FAIL' END,
  'Expected 12 tables, found: ' || COUNT(*)::TEXT
FROM pg_tables
WHERE schemaname IN ('clinical', 'public', 'private_health_info')
  AND rowsecurity = true
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

-- Check all policies created
INSERT INTO rls_audit_results
SELECT 
  'RLS Policies Check',
  CASE WHEN COUNT(*) >= 30 THEN 'PASS' ELSE 'FAIL' END,
  'Expected ~30+ policies, found: ' || COUNT(*)::TEXT
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
SELECT * FROM rls_audit_results;

-- =====================================================
-- DONE - RLS AUDIT COMPLETE!
-- =====================================================
 
| check_name               | status  | details                          |
| ------------------------ | ------- | -------------------------------- |
| RLS Enabled Check        | PASS    | Expected 12 tables, found: 12     |
| RLS Policies Check       | FAIL    | Expected ~30+ policies, found: 27 |

-- =====================================================

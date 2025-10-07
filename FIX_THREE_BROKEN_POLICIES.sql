-- =====================================================
-- FIX: 3 Tables with Wrong Column Names in RLS Policies
-- =====================================================
-- 1. carer_relationships: patient_id → patient_user_id, carer_id → carer_user_id
-- 2. imaging_annotations: imaging_id → image_id
-- 3. patient_pro_value: timeline_id → pro_id
-- =====================================================

-- =====================================================
-- 1. CARER_RELATIONSHIPS
-- =====================================================
-- Correct columns: patient_user_id, carer_user_id

DROP POLICY IF EXISTS "Participants view relationships" ON public.carer_relationships;
CREATE POLICY "Participants view relationships" ON public.carer_relationships
  FOR SELECT USING (patient_user_id = (select auth.uid()) OR carer_user_id = (select auth.uid()));

DROP POLICY IF EXISTS "Patients invite carers" ON public.carer_relationships;
CREATE POLICY "Patients invite carers" ON public.carer_relationships
  FOR INSERT WITH CHECK (patient_user_id = (select auth.uid()));

DROP POLICY IF EXISTS "Participants update relationships" ON public.carer_relationships;
CREATE POLICY "Participants update relationships" ON public.carer_relationships
  FOR UPDATE USING (patient_user_id = (select auth.uid()) OR carer_user_id = (select auth.uid()));

-- =====================================================
-- 2. IMAGING_ANNOTATIONS
-- =====================================================
-- Correct column: image_id (not imaging_id)
-- Join to neuro_imaging_results using image_id

DROP POLICY IF EXISTS "Users can view annotations for their own images" ON clinical.imaging_annotations;
CREATE POLICY "Users can view annotations for their own images" ON clinical.imaging_annotations
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM clinical.neuro_imaging_results
      WHERE image_id = imaging_annotations.image_id
      AND patient_id = (select auth.uid())
    )
  );

DROP POLICY IF EXISTS "Users can insert annotations for their own images" ON clinical.imaging_annotations;
CREATE POLICY "Users can insert annotations for their own images" ON clinical.imaging_annotations
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM clinical.neuro_imaging_results
      WHERE image_id = imaging_annotations.image_id
      AND patient_id = (select auth.uid())
    )
  );

-- =====================================================
-- 3. PATIENT_PRO_VALUE
-- =====================================================
-- Correct column: pro_id (not timeline_id)
-- Join to patient_pro_timeline using pro_id

DROP POLICY IF EXISTS "Users can view PRO values for their own timeline" ON clinical.patient_pro_value;
CREATE POLICY "Users can view PRO values for their own timeline" ON clinical.patient_pro_value
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM clinical.patient_pro_timeline
      WHERE pro_id = patient_pro_value.pro_id
      AND patient_id = (select auth.uid())
    )
  );

DROP POLICY IF EXISTS "Users can view their own PRO values" ON clinical.patient_pro_value;
CREATE POLICY "Users can view their own PRO values" ON clinical.patient_pro_value
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM clinical.patient_pro_timeline
      WHERE pro_id = patient_pro_value.pro_id
      AND patient_id = (select auth.uid())
    )
  );

DROP POLICY IF EXISTS "Users can insert their own PRO values" ON clinical.patient_pro_value;
CREATE POLICY "Users can insert their own PRO values" ON clinical.patient_pro_value
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM clinical.patient_pro_timeline
      WHERE pro_id = patient_pro_value.pro_id
      AND patient_id = (select auth.uid())
    )
  );

-- =====================================================
-- VERIFICATION
-- =====================================================
SELECT 
  'carer_relationships' as table_name,
  policyname,
  cmd,
  qual::text as using_clause
FROM pg_policies
WHERE schemaname = 'public'
AND tablename = 'carer_relationships'

UNION ALL

SELECT 
  'imaging_annotations' as table_name,
  policyname,
  cmd,
  qual::text as using_clause
FROM pg_policies
WHERE schemaname = 'clinical'
AND tablename = 'imaging_annotations'

UNION ALL

SELECT 
  'patient_pro_value' as table_name,
  policyname,
  cmd,
  qual::text as using_clause
FROM pg_policies
WHERE schemaname = 'clinical'
AND tablename = 'patient_pro_value'
ORDER BY table_name, cmd;

-- =====================================================
-- FIX: patient_diagnoses RLS Policies ONLY
-- =====================================================
-- Test this isolated to see if it works
-- =====================================================

BEGIN;

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own diagnoses" ON private_health_info.patient_diagnoses;
DROP POLICY IF EXISTS "Users can insert own diagnoses" ON private_health_info.patient_diagnoses;
DROP POLICY IF EXISTS "Users can update own diagnoses" ON private_health_info.patient_diagnoses;
DROP POLICY IF EXISTS "Users can delete own diagnoses" ON private_health_info.patient_diagnoses;

-- Create optimized policies with (select auth.uid())
CREATE POLICY "Users can view own diagnoses" 
ON private_health_info.patient_diagnoses
FOR SELECT 
USING (patient_id = (select auth.uid()));

CREATE POLICY "Users can insert own diagnoses" 
ON private_health_info.patient_diagnoses
FOR INSERT 
WITH CHECK (patient_id = (select auth.uid()));

CREATE POLICY "Users can update own diagnoses" 
ON private_health_info.patient_diagnoses
FOR UPDATE 
USING (patient_id = (select auth.uid()));

CREATE POLICY "Users can delete own diagnoses" 
ON private_health_info.patient_diagnoses
FOR DELETE 
USING (patient_id = (select auth.uid()));

COMMIT;

-- Verify
SELECT 
  policyname,
  cmd,
  qual::text as using_clause
FROM pg_policies
WHERE schemaname = 'private_health_info'
AND tablename = 'patient_diagnoses';

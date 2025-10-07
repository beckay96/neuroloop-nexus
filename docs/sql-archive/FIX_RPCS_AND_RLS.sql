-- =====================================================
-- FIX RPCs AND MISSING RLS POLICIES
-- =====================================================
-- Created: 2025-01-08
-- Purpose: Fix failing tests and add missing RLS policies
-- =====================================================

CREATE TEMP TABLE IF NOT EXISTS fix_results (
  fix_name TEXT,
  status TEXT,
  details TEXT
);

-- =====================================================
-- FIX 1: Recreate scale functions with proper DROP
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
  -- Validate patient_id
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

INSERT INTO fix_results VALUES ('save_scale_result', 'FIXED', 'Function recreated with NULL check');

-- =====================================================
-- FIX 2: Recreate get function with proper type casting
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

INSERT INTO fix_results VALUES ('get_scale_results_with_subscores', 'FIXED', 'Function recreated with proper type casting');

-- =====================================================
-- FIX 3: Add missing RLS policies
-- =====================================================

-- Clinician profiles policies (missing)
DROP POLICY IF EXISTS "Clinicians can view own profile" ON public.clinician_profiles;
CREATE POLICY "Clinicians can view own profile"
  ON public.clinician_profiles
  FOR SELECT
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Clinicians can update own profile" ON public.clinician_profiles;
CREATE POLICY "Clinicians can update own profile"
  ON public.clinician_profiles
  FOR UPDATE
  USING (user_id = auth.uid());

INSERT INTO fix_results VALUES ('clinician_profiles RLS', 'ADDED', 'Added SELECT and UPDATE policies');

-- Carer profiles policies (missing)
DROP POLICY IF EXISTS "Carers can view own profile" ON public.carer_profiles;
CREATE POLICY "Carers can view own profile"
  ON public.carer_profiles
  FOR SELECT
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Carers can update own profile" ON public.carer_profiles;
CREATE POLICY "Carers can update own profile"
  ON public.carer_profiles
  FOR UPDATE
  USING (user_id = auth.uid());

INSERT INTO fix_results VALUES ('carer_profiles RLS', 'ADDED', 'Added SELECT and UPDATE policies');

-- Patient profiles policies (might be missing)
DROP POLICY IF EXISTS "Patients can view own profile" ON public.patient_profiles;
CREATE POLICY "Patients can view own profile"
  ON public.patient_profiles
  FOR SELECT
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Patients can update own profile" ON public.patient_profiles;
CREATE POLICY "Patients can update own profile"
  ON public.patient_profiles
  FOR UPDATE
  USING (user_id = auth.uid());

INSERT INTO fix_results VALUES ('patient_profiles RLS', 'ADDED', 'Added SELECT and UPDATE policies');

-- =====================================================
-- FIX 4: Ensure profiles table has proper RLS
-- =====================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile"
  ON public.profiles
  FOR SELECT
  USING (id = auth.uid());

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  USING (id = auth.uid());

INSERT INTO fix_results VALUES ('profiles RLS', 'ADDED', 'Added SELECT and UPDATE policies');

-- =====================================================
-- DISPLAY FIX RESULTS
-- =====================================================

SELECT * FROM fix_results;

-- Reload PostgREST schema
NOTIFY pgrst, '{"action": "reload"}';


| test_number | test_name                        | status | details                     | created_id | error_message                                                                                       |
| ----------- | -------------------------------- | ------ | --------------------------- | ---------- | --------------------------------------------------------------------------------------------------- |
| 1           | save_scale_result UPDRS          | FAIL   | Error creating scale result | null       | null value in column "patient_id" of relation "clinical_scale_results" violates not-null constraint |
| 2           | get_scale_results_with_subscores | FAIL   | Error retrieving results    | null       | operator does not exist: text = scale_type_enum                                                     |
| 3           | save_scale_result MoCA           | FAIL   | Error creating MoCA result  | null       | null value in column "patient_id" of relation "clinical_scale_results" violates not-null constraint |
| 4           | clinical_scales_library          | PASS   | Found 10 records            | null       | null                                                                                                |
| 5           | imaging_findings_library         | PASS   | Found 8 records             | null       | null                                                                                                |
| 6           | pro_measures_library             | PASS   | Found 11 records            | null       | null                                                                                                |
| 7           | diagnoses_library                | PASS   | Found 6 records             | null       | null                                                                                                |
| 8           | symptoms_library                 | PASS   | Found 21 records            | null       | null                                                                                                |
| 9           | scale_type_enum                  | PASS   | Enum existence check        | null       | null                                                                                                |
| 10          | annotation_type_enum             | PASS   | Enum existence check        | null       | null                                                                                                |
| 11          | pro_type_enum                    | PASS   | Enum existence check        | null       | null                                                                                                |
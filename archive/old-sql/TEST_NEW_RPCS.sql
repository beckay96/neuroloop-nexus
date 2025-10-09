-- =====================================================
-- RPC TESTING SCRIPT FOR PHASE 1-4 FUNCTIONS
-- =====================================================
-- Created: 2025-01-08
-- Purpose: Test all new database functions created in PHASE 1-4
-- =====================================================

-- Create temp table for test results
CREATE TEMP TABLE IF NOT EXISTS test_results (
  test_number INTEGER,
  test_name TEXT,
  status TEXT,
  details TEXT,
  created_id UUID,
  error_message TEXT
);

-- =====================================================
-- SETUP: Store user info
-- =====================================================

CREATE TEMP TABLE IF NOT EXISTS test_user_info (
  patient_id UUID,
  clinician_id UUID
);

-- Get a real patient ID from database or use auth.uid()
DO $$
DECLARE
  v_patient_id UUID;
  v_clinician_id UUID;
BEGIN
  -- Try to get auth.uid() first
  v_patient_id := auth.uid();
  v_clinician_id := auth.uid();
  
  -- If NULL (running as service role), get a real patient from database
  IF v_patient_id IS NULL THEN
    SELECT id INTO v_patient_id
    FROM auth.users
    LIMIT 1;
    
    v_clinician_id := v_patient_id;
  END IF;
  
  -- If still NULL, create error message
  IF v_patient_id IS NULL THEN
    INSERT INTO test_results VALUES (
      0, 
      'SETUP', 
      'FAIL', 
      'No user found. Please run as authenticated user or ensure users exist in auth.users',
      NULL,
      'Cannot proceed with tests - no valid user_id'
    );
  ELSE
    INSERT INTO test_user_info VALUES (v_patient_id, v_clinician_id);
    INSERT INTO test_results VALUES (
      0,
      'SETUP',
      'PASS',
      'Using user ID: ' || v_patient_id::TEXT,
      v_patient_id,
      NULL
    );
  END IF;
END $$;

-- =====================================================
-- TEST 1: clinical.save_scale_result()
-- =====================================================

DO $$
DECLARE
  v_patient_id UUID;
  v_clinician_id UUID;
  v_scale_id UUID;
  v_subscores JSONB;
BEGIN
  -- Get test user IDs
  SELECT patient_id, clinician_id INTO v_patient_id, v_clinician_id FROM test_user_info;
  
  IF v_patient_id IS NULL THEN
    INSERT INTO test_results VALUES (1, 'save_scale_result UPDRS', 'SKIP', 'No test user available', NULL, 'Setup failed');
    RETURN;
  END IF;
  
  v_subscores := '[
    {"subscale_label": "UPDRS_I", "score": 10, "max_score": 52, "score_interpretation": "mild"},
    {"subscale_label": "UPDRS_II", "score": 15, "max_score": 52, "score_interpretation": "mild"},
    {"subscale_label": "UPDRS_III", "score": 35, "max_score": 132, "score_interpretation": "moderate"},
    {"subscale_label": "UPDRS_IV", "score": 8, "max_score": 24, "score_interpretation": "mild"}
  ]'::JSONB;

  v_scale_id := clinical.save_scale_result(
    p_patient_id := v_patient_id,
    p_scale_type := 'UPDRS'::clinical.scale_type_enum,
    p_scale_version := 'v3'::clinical.scale_version_enum,
    p_total_score := 68.0,
    p_assessed_at := NOW(),
    p_assessed_by := v_clinician_id,
    p_entered_by := v_clinician_id,
    p_snomed_ct_code := '49049000',
    p_icd10_code := 'G20',
    p_notes := 'TEST: Patient shows moderate Parkinsonian symptoms',
    p_subscores := v_subscores
  );

  INSERT INTO test_results VALUES (1, 'save_scale_result UPDRS', 'PASS', 'Created UPDRS scale result', v_scale_id, NULL);
EXCEPTION WHEN OTHERS THEN
  INSERT INTO test_results VALUES (1, 'save_scale_result UPDRS', 'FAIL', 'Error creating scale result', NULL, SQLERRM);
END $$;

-- =====================================================
-- TEST 2: clinical.get_scale_results_with_subscores()
-- =====================================================

DO $$
DECLARE
  v_patient_id UUID;
  v_count INTEGER;
BEGIN
  SELECT patient_id INTO v_patient_id FROM test_user_info;
  
  IF v_patient_id IS NULL THEN
    INSERT INTO test_results VALUES (2, 'get_scale_results_with_subscores', 'SKIP', 'No test user available', NULL, 'Setup failed');
    RETURN;
  END IF;
  
  SELECT COUNT(*) INTO v_count
  FROM clinical.get_scale_results_with_subscores(
    p_patient_id := v_patient_id,
    p_scale_type := 'UPDRS'::clinical.scale_type_enum,
    p_limit := 10
  );

  INSERT INTO test_results VALUES (2, 'get_scale_results_with_subscores', 'PASS', 'Retrieved ' || v_count || ' scale results', NULL, NULL);
EXCEPTION WHEN OTHERS THEN
  INSERT INTO test_results VALUES (2, 'get_scale_results_with_subscores', 'FAIL', 'Error retrieving results', NULL, SQLERRM);
END $$;

-- =====================================================
-- TEST 3: Test saving MoCA scale result
-- =====================================================

DO $$
DECLARE
  v_patient_id UUID;
  v_clinician_id UUID;
  v_scale_id UUID;
  v_subscores JSONB;
BEGIN
  SELECT patient_id, clinician_id INTO v_patient_id, v_clinician_id FROM test_user_info;
  
  IF v_patient_id IS NULL THEN
    INSERT INTO test_results VALUES (3, 'save_scale_result MoCA', 'SKIP', 'No test user available', NULL, 'Setup failed');
    RETURN;
  END IF;
  
  v_subscores := '[
    {"subscale_label": "Visuospatial", "score": 4, "max_score": 5, "score_interpretation": "normal"},
    {"subscale_label": "Naming", "score": 3, "max_score": 3, "score_interpretation": "normal"},
    {"subscale_label": "Attention", "score": 5, "max_score": 6, "score_interpretation": "mild impairment"},
    {"subscale_label": "Language", "score": 2, "max_score": 3, "score_interpretation": "normal"},
    {"subscale_label": "Abstraction", "score": 2, "max_score": 2, "score_interpretation": "normal"},
    {"subscale_label": "Delayed_Recall", "score": 3, "max_score": 5, "score_interpretation": "mild impairment"},
    {"subscale_label": "Orientation", "score": 6, "max_score": 6, "score_interpretation": "normal"}
  ]'::JSONB;

  v_scale_id := clinical.save_scale_result(
    p_patient_id := v_patient_id,
    p_scale_type := 'MoCA'::clinical.scale_type_enum,
    p_scale_version := 'v3'::clinical.scale_version_enum,
    p_total_score := 25.0,
    p_assessed_at := NOW(),
    p_assessed_by := v_clinician_id,
    p_entered_by := v_clinician_id,
    p_snomed_ct_code := '386807006',
    p_icd10_code := 'R41.3',
    p_notes := 'TEST: Cognitive screening shows mild impairment in attention and memory',
    p_subscores := v_subscores
  );

  INSERT INTO test_results VALUES (3, 'save_scale_result MoCA', 'PASS', 'Created MoCA result', v_scale_id, NULL);
EXCEPTION WHEN OTHERS THEN
  INSERT INTO test_results VALUES (3, 'save_scale_result MoCA', 'FAIL', 'Error creating MoCA result', NULL, SQLERRM);
END $$;

-- =====================================================
-- TEST 4: Verify library tables are populated
-- =====================================================

INSERT INTO test_results
SELECT 4, 'clinical_scales_library', 
  CASE WHEN COUNT(*) > 0 THEN 'PASS' ELSE 'FAIL' END,
  'Found ' || COUNT(*) || ' records', NULL, NULL
FROM public.clinical_scales_library;

INSERT INTO test_results
SELECT 5, 'imaging_findings_library',
  CASE WHEN COUNT(*) > 0 THEN 'PASS' ELSE 'FAIL' END,
  'Found ' || COUNT(*) || ' records', NULL, NULL
FROM public.imaging_findings_library;

INSERT INTO test_results
SELECT 6, 'pro_measures_library',
  CASE WHEN COUNT(*) > 0 THEN 'PASS' ELSE 'FAIL' END,
  'Found ' || COUNT(*) || ' records', NULL, NULL
FROM public.pro_measures_library;

INSERT INTO test_results
SELECT 7, 'diagnoses_library',
  CASE WHEN COUNT(*) > 0 THEN 'PASS' ELSE 'FAIL' END,
  'Found ' || COUNT(*) || ' records', NULL, NULL
FROM public.diagnoses_library;

INSERT INTO test_results
SELECT 8, 'symptoms_library',
  CASE WHEN COUNT(*) > 0 THEN 'PASS' ELSE 'FAIL' END,
  'Found ' || COUNT(*) || ' records', NULL, NULL
FROM public.symptoms_library;

-- =====================================================
-- TEST 5: Verify enums are created correctly
-- =====================================================

INSERT INTO test_results
SELECT 9, 'scale_type_enum',
  CASE WHEN EXISTS (
    SELECT 1 FROM pg_type t
    JOIN pg_namespace n ON n.oid = t.typnamespace
    WHERE n.nspname = 'clinical' AND t.typname = 'scale_type_enum'
  ) THEN 'PASS' ELSE 'FAIL' END,
  'Enum existence check', NULL, NULL;

INSERT INTO test_results
SELECT 10, 'annotation_type_enum',
  CASE WHEN EXISTS (
    SELECT 1 FROM pg_type t
    JOIN pg_namespace n ON n.oid = t.typnamespace
    WHERE n.nspname = 'clinical' AND t.typname = 'annotation_type_enum'
  ) THEN 'PASS' ELSE 'FAIL' END,
  'Enum existence check', NULL, NULL;

INSERT INTO test_results
SELECT 11, 'pro_type_enum',
  CASE WHEN EXISTS (
    SELECT 1 FROM pg_type t
    JOIN pg_namespace n ON n.oid = t.typnamespace
    WHERE n.nspname = 'clinical' AND t.typname = 'pro_type_enum'
  ) THEN 'PASS' ELSE 'FAIL' END,
  'Enum existence check', NULL, NULL;

-- =====================================================
-- DISPLAY TEST RESULTS
-- =====================================================

SELECT * FROM test_results ORDER BY test_number;

-- =====================================================
-- CREATE MISSING RPCs FOR ALL TABLES
-- =====================================================
-- Created: 2025-01-08
-- Purpose: Ensure all tables have necessary helper functions
-- Following Supabase SQL rules: DROP first, then CREATE
-- =====================================================

-- Create temp table for tracking RPC creation
CREATE TEMP TABLE IF NOT EXISTS rpc_creation_log (
  function_name TEXT,
  status TEXT,
  details TEXT
);

-- =====================================================
-- IMAGING ANNOTATIONS RPCs
-- =====================================================

-- Drop and recreate: Save imaging annotation
DROP FUNCTION IF EXISTS clinical.save_imaging_annotation(UUID, UUID, clinical.annotation_type_enum, TEXT, BOOLEAN, TEXT, TEXT, TEXT);
CREATE OR REPLACE FUNCTION clinical.save_imaging_annotation(
  p_image_id UUID,
  p_annotation_type clinical.annotation_type_enum,
  p_coordinates TEXT DEFAULT NULL,
  p_ai_flagged BOOLEAN DEFAULT false,
  p_snomed_ct_code TEXT DEFAULT NULL,
  p_icd10_code TEXT DEFAULT NULL,
  p_notes TEXT DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = clinical
AS $$
DECLARE
  v_annotation_id UUID;
  v_patient_id UUID;
BEGIN
  -- Verify user owns the imaging result
  SELECT patient_id INTO v_patient_id
  FROM clinical.neuro_imaging_results
  WHERE image_id = p_image_id;
  
  IF v_patient_id IS NULL THEN
    RAISE EXCEPTION 'Image not found';
  END IF;
  
  IF v_patient_id != auth.uid() THEN
    RAISE EXCEPTION 'Unauthorized access to image';
  END IF;
  
  -- Insert annotation
  INSERT INTO clinical.imaging_annotations (
    image_id,
    annotation_type,
    coordinates,
    ai_flagged,
    snomed_ct_code,
    icd10_code,
    notes
  ) VALUES (
    p_image_id,
    p_annotation_type,
    p_coordinates,
    p_ai_flagged,
    p_snomed_ct_code,
    p_icd10_code,
    p_notes
  ) RETURNING annotation_id INTO v_annotation_id;
  
  RETURN v_annotation_id;
END;
$$;

GRANT EXECUTE ON FUNCTION clinical.save_imaging_annotation(UUID, clinical.annotation_type_enum, TEXT, BOOLEAN, TEXT, TEXT, TEXT) TO authenticated;

INSERT INTO rpc_creation_log VALUES ('clinical.save_imaging_annotation', 'CREATED', 'Save imaging annotation function');

-- Drop and recreate: Get image annotations
DROP FUNCTION IF EXISTS clinical.get_image_annotations(UUID);
CREATE OR REPLACE FUNCTION clinical.get_image_annotations(
  p_image_id UUID
)
RETURNS TABLE (
  annotation_id UUID,
  annotation_type TEXT,
  coordinates TEXT,
  ai_flagged BOOLEAN,
  snomed_ct_code TEXT,
  icd10_code TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = clinical
AS $$
DECLARE
  v_patient_id UUID;
BEGIN
  -- Verify user owns the image
  SELECT neuro_imaging_results.patient_id INTO v_patient_id
  FROM clinical.neuro_imaging_results
  WHERE image_id = p_image_id;
  
  IF v_patient_id != auth.uid() THEN
    RAISE EXCEPTION 'Unauthorized access';
  END IF;
  
  RETURN QUERY
  SELECT 
    ia.annotation_id,
    ia.annotation_type::TEXT,
    ia.coordinates,
    ia.ai_flagged,
    ia.snomed_ct_code,
    ia.icd10_code,
    ia.notes,
    ia.created_at
  FROM clinical.imaging_annotations ia
  WHERE ia.image_id = p_image_id
  ORDER BY ia.created_at DESC;
END;
$$;

GRANT EXECUTE ON FUNCTION clinical.get_image_annotations(UUID) TO authenticated;

INSERT INTO rpc_creation_log VALUES ('clinical.get_image_annotations', 'CREATED', 'Get image annotations function');

-- =====================================================
-- PATIENT PRO VALUE RPCs
-- =====================================================

-- Drop and recreate: Save PRO value
DROP FUNCTION IF EXISTS clinical.save_pro_value(UUID, TEXT, NUMERIC, TEXT, TEXT, TEXT, TIMESTAMPTZ);
CREATE OR REPLACE FUNCTION clinical.save_pro_value(
  p_pro_id UUID,
  p_domain_label TEXT,
  p_value NUMERIC,
  p_value_unit TEXT DEFAULT NULL,
  p_snomed_ct_code TEXT DEFAULT NULL,
  p_icd10_code TEXT DEFAULT NULL,
  p_collected_at TIMESTAMPTZ DEFAULT NOW()
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = clinical
AS $$
DECLARE
  v_value_id UUID;
  v_patient_id UUID;
BEGIN
  -- Verify user owns the PRO timeline entry
  SELECT patient_id INTO v_patient_id
  FROM clinical.patient_pro_timeline
  WHERE pro_id = p_pro_id;
  
  IF v_patient_id IS NULL THEN
    RAISE EXCEPTION 'PRO timeline entry not found';
  END IF;
  
  IF v_patient_id != auth.uid() THEN
    RAISE EXCEPTION 'Unauthorized access';
  END IF;
  
  -- Insert PRO value
  INSERT INTO clinical.patient_pro_value (
    pro_id,
    domain_label,
    value,
    value_unit,
    snomed_ct_code,
    icd10_code,
    collected_at
  ) VALUES (
    p_pro_id,
    p_domain_label,
    p_value,
    p_value_unit,
    p_snomed_ct_code,
    p_icd10_code,
    p_collected_at
  ) RETURNING value_id INTO v_value_id;
  
  RETURN v_value_id;
END;
$$;

GRANT EXECUTE ON FUNCTION clinical.save_pro_value(UUID, TEXT, NUMERIC, TEXT, TEXT, TEXT, TIMESTAMPTZ) TO authenticated;

INSERT INTO rpc_creation_log VALUES ('clinical.save_pro_value', 'CREATED', 'Save PRO value function');

-- Drop and recreate: Get PRO values
DROP FUNCTION IF EXISTS clinical.get_pro_values(UUID);
CREATE OR REPLACE FUNCTION clinical.get_pro_values(
  p_pro_id UUID
)
RETURNS TABLE (
  value_id UUID,
  domain_label TEXT,
  value NUMERIC,
  value_unit TEXT,
  snomed_ct_code TEXT,
  icd10_code TEXT,
  collected_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = clinical
AS $$
DECLARE
  v_patient_id UUID;
BEGIN
  -- Verify user owns the PRO
  SELECT patient_id INTO v_patient_id
  FROM clinical.patient_pro_timeline
  WHERE pro_id = p_pro_id;
  
  IF v_patient_id != auth.uid() THEN
    RAISE EXCEPTION 'Unauthorized access';
  END IF;
  
  RETURN QUERY
  SELECT 
    pv.value_id,
    pv.domain_label,
    pv.value,
    pv.value_unit,
    pv.snomed_ct_code,
    pv.icd10_code,
    pv.collected_at
  FROM clinical.patient_pro_value pv
  WHERE pv.pro_id = p_pro_id
  ORDER BY pv.collected_at DESC;
END;
$$;

GRANT EXECUTE ON FUNCTION clinical.get_pro_values(UUID) TO authenticated;

INSERT INTO rpc_creation_log VALUES ('clinical.get_pro_values', 'CREATED', 'Get PRO values function');

-- =====================================================
-- PATIENT DIAGNOSIS RPCs
-- =====================================================

-- Drop and recreate: Save diagnosis
DROP FUNCTION IF EXISTS private_health_info.save_patient_diagnosis(UUID, TEXT, TEXT, DATE, UUID, TEXT, TEXT);
CREATE OR REPLACE FUNCTION private_health_info.save_patient_diagnosis(
  p_patient_id UUID,
  p_diagnosis_code TEXT,
  p_diagnosis_type TEXT,
  p_diagnosed_date DATE DEFAULT CURRENT_DATE,
  p_diagnosed_by UUID DEFAULT NULL,
  p_snomed_ct_code TEXT DEFAULT NULL,
  p_icd10_code TEXT DEFAULT NULL,
  p_notes TEXT DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = private_health_info
AS $$
DECLARE
  v_diagnosis_id UUID;
BEGIN
  -- Verify user is the patient
  IF p_patient_id != auth.uid() THEN
    RAISE EXCEPTION 'Unauthorized: Can only add own diagnoses';
  END IF;
  
  INSERT INTO private_health_info.patient_diagnoses (
    patient_id,
    diagnosis_code,
    diagnosis_type,
    diagnosed_date,
    diagnosed_by,
    snomed_ct_code,
    icd10_code,
    notes
  ) VALUES (
    p_patient_id,
    p_diagnosis_code,
    p_diagnosis_type,
    p_diagnosed_date,
    p_diagnosed_by,
    p_snomed_ct_code,
    p_icd10_code,
    p_notes
  ) RETURNING diagnosis_id INTO v_diagnosis_id;
  
  RETURN v_diagnosis_id;
END;
$$;

GRANT EXECUTE ON FUNCTION private_health_info.save_patient_diagnosis(UUID, TEXT, TEXT, DATE, UUID, TEXT, TEXT, TEXT) TO authenticated;

INSERT INTO rpc_creation_log VALUES ('private_health_info.save_patient_diagnosis', 'CREATED', 'Save patient diagnosis function');

-- =====================================================
-- SEIZURE LOG RPCs
-- =====================================================

-- Drop and recreate: Save seizure log
DROP FUNCTION IF EXISTS private_health_info.save_seizure_log(UUID, public.seizure_type_enum, TIMESTAMPTZ, INTEGER, TEXT, TEXT, TEXT, TEXT, JSONB);
CREATE OR REPLACE FUNCTION private_health_info.save_seizure_log(
  p_patient_id UUID,
  p_seizure_type public.seizure_type_enum,
  p_occurred_at TIMESTAMPTZ,
  p_duration_seconds INTEGER DEFAULT NULL,
  p_triggers TEXT DEFAULT NULL,
  p_notes TEXT DEFAULT NULL,
  p_snomed_ct_code TEXT DEFAULT '84757009',
  p_icd10_code TEXT DEFAULT 'G40',
  p_metadata JSONB DEFAULT '{}'::JSONB
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = private_health_info
AS $$
DECLARE
  v_log_id UUID;
BEGIN
  IF p_patient_id != auth.uid() THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;
  
  INSERT INTO private_health_info.seizure_logs (
    patient_id,
    seizure_type,
    occurred_at,
    duration_seconds,
    triggers,
    notes,
    snomed_ct_code,
    icd10_code,
    metadata
  ) VALUES (
    p_patient_id,
    p_seizure_type,
    p_occurred_at,
    p_duration_seconds,
    p_triggers,
    p_notes,
    p_snomed_ct_code,
    p_icd10_code,
    p_metadata
  ) RETURNING log_id INTO v_log_id;
  
  RETURN v_log_id;
END;
$$;

GRANT EXECUTE ON FUNCTION private_health_info.save_seizure_log(UUID, public.seizure_type_enum, TIMESTAMPTZ, INTEGER, TEXT, TEXT, TEXT, TEXT, JSONB) TO authenticated;

INSERT INTO rpc_creation_log VALUES ('private_health_info.save_seizure_log', 'CREATED', 'Save seizure log function');

-- =====================================================
-- CUSTOM TRACKING RPCs (already exist in FIX file, but ensuring here)
-- =====================================================

-- Drop and recreate: Get custom tracking items for user
DROP FUNCTION IF EXISTS public.get_user_custom_tracking_items(UUID);
CREATE OR REPLACE FUNCTION public.get_user_custom_tracking_items(
  p_user_id UUID DEFAULT NULL
)
RETURNS TABLE (
  item_id UUID,
  item_name TEXT,
  item_type TEXT,
  description TEXT,
  min_value NUMERIC,
  max_value NUMERIC,
  unit TEXT,
  icon TEXT,
  color TEXT,
  display_order INTEGER,
  is_active BOOLEAN
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id UUID;
BEGIN
  v_user_id := COALESCE(p_user_id, auth.uid());
  
  IF v_user_id != auth.uid() THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;
  
  RETURN QUERY
  SELECT 
    cti.item_id,
    cti.item_name,
    cti.item_type::TEXT,
    cti.description,
    cti.min_value,
    cti.max_value,
    cti.unit,
    cti.icon,
    cti.color,
    cti.display_order,
    cti.is_active
  FROM public.custom_tracking_items cti
  WHERE cti.user_id = v_user_id AND cti.is_active = true
  ORDER BY cti.display_order, cti.item_name;
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_user_custom_tracking_items(UUID) TO authenticated;

INSERT INTO rpc_creation_log VALUES ('public.get_user_custom_tracking_items', 'CREATED', 'Get user custom tracking items');

-- =====================================================
-- LIBRARY SEARCH RPCs
-- =====================================================

-- Drop and recreate: Search symptoms library
DROP FUNCTION IF EXISTS public.search_symptoms(TEXT);
CREATE OR REPLACE FUNCTION public.search_symptoms(
  p_search_term TEXT
)
RETURNS TABLE (
  symptom_code TEXT,
  symptom_name TEXT,
  category TEXT,
  snomed_ct_code TEXT,
  icd10_code TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    sl.symptom_code,
    sl.symptom_name,
    sl.category,
    sl.snomed_ct_code,
    sl.icd10_code
  FROM public.symptoms_library sl
  WHERE 
    sl.symptom_name ILIKE '%' || p_search_term || '%'
    OR sl.search_keywords ILIKE '%' || p_search_term || '%'
    OR sl.symptom_code ILIKE '%' || p_search_term || '%'
  ORDER BY 
    CASE 
      WHEN sl.symptom_name ILIKE p_search_term || '%' THEN 1
      WHEN sl.symptom_name ILIKE '%' || p_search_term || '%' THEN 2
      ELSE 3
    END,
    sl.symptom_name
  LIMIT 50;
END;
$$;

GRANT EXECUTE ON FUNCTION public.search_symptoms(TEXT) TO authenticated;

INSERT INTO rpc_creation_log VALUES ('public.search_symptoms', 'CREATED', 'Search symptoms library');

-- Drop and recreate: Search diagnoses library
DROP FUNCTION IF EXISTS public.search_diagnoses(TEXT);
CREATE OR REPLACE FUNCTION public.search_diagnoses(
  p_search_term TEXT
)
RETURNS TABLE (
  diagnosis_code TEXT,
  diagnosis_name TEXT,
  disease_category TEXT,
  snomed_ct_code TEXT,
  icd10_code TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    dl.diagnosis_code,
    dl.diagnosis_name,
    dl.disease_category,
    dl.snomed_ct_code,
    dl.icd10_code
  FROM public.diagnoses_library dl
  WHERE 
    dl.diagnosis_name ILIKE '%' || p_search_term || '%'
    OR dl.diagnosis_code ILIKE '%' || p_search_term || '%'
    OR dl.search_keywords ILIKE '%' || p_search_term || '%'
  ORDER BY 
    CASE 
      WHEN dl.diagnosis_name ILIKE p_search_term || '%' THEN 1
      WHEN dl.diagnosis_name ILIKE '%' || p_search_term || '%' THEN 2
      ELSE 3
    END,
    dl.diagnosis_name
  LIMIT 50;
END;
$$;

GRANT EXECUTE ON FUNCTION public.search_diagnoses(TEXT) TO authenticated;

INSERT INTO rpc_creation_log VALUES ('public.search_diagnoses', 'CREATED', 'Search diagnoses library');

-- =====================================================
-- DISPLAY CREATION LOG
-- =====================================================

SELECT * FROM rpc_creation_log ORDER BY function_name;

-- Reload PostgREST schema
NOTIFY pgrst, '{"action": "reload"}';


| function_name                              | status  | details                          |
| ------------------------------------------ | ------- | -------------------------------- |
| clinical.get_image_annotations             | CREATED | Get image annotations function   |
| clinical.get_pro_values                    | CREATED | Get PRO values function          |
| clinical.save_imaging_annotation           | CREATED | Save imaging annotation function |
| clinical.save_pro_value                    | CREATED | Save PRO value function          |
| private_health_info.save_patient_diagnosis | CREATED | Save patient diagnosis function  |
| private_health_info.save_seizure_log       | CREATED | Save seizure log function        |
| public.get_user_custom_tracking_items      | CREATED | Get user custom tracking items   |
| public.search_diagnoses                    | CREATED | Search diagnoses library         |
| public.search_symptoms                     | CREATED | Search symptoms library          |
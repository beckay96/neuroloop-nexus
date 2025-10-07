-- =====================================================
-- CREATE MISSING CRUD RPCs FOR COMPLETE SECURITY
-- Date: 2025-01-08
-- Purpose: Add update/delete RPCs for seizure_logs and patient_diagnoses
-- =====================================================

-- =====================================================
-- SEIZURE LOGS RPCs
-- =====================================================

-- Update seizure log
CREATE OR REPLACE FUNCTION public.update_seizure_log(
  p_log_id UUID,
  p_duration_seconds INTEGER DEFAULT NULL,
  p_seizure_type TEXT DEFAULT NULL,
  p_consciousness_level TEXT DEFAULT NULL,
  p_aura_present TEXT DEFAULT NULL,
  p_aura_description TEXT DEFAULT NULL,
  p_witnessed TEXT DEFAULT NULL,
  p_witness_role TEXT DEFAULT NULL,
  p_video_recorded TEXT DEFAULT NULL,
  p_location_type TEXT DEFAULT NULL,
  p_post_ictal_confusion_minutes INTEGER DEFAULT NULL,
  p_recovery_time_minutes INTEGER DEFAULT NULL,
  p_sleep_hours_prior NUMERIC DEFAULT NULL,
  p_medication_adherence_prior TEXT DEFAULT NULL,
  p_stress_level TEXT DEFAULT NULL,
  p_emergency_services_called TEXT DEFAULT NULL,
  p_rescue_medication_used TEXT DEFAULT NULL,
  p_rescue_medication_type TEXT DEFAULT NULL,
  p_hospitalized TEXT DEFAULT NULL,
  p_notes TEXT DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'private_health_info', 'public'
AS $$
DECLARE
  v_user_id UUID;
BEGIN
  -- Get the user_id for this log to verify ownership
  SELECT user_id INTO v_user_id
  FROM private_health_info.seizure_logs_research
  WHERE log_id = p_log_id;
  
  -- Check if log exists
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Seizure log not found' USING ERRCODE = '42704';
  END IF;
  
  -- Security check: user can only update their own logs
  IF v_user_id != auth.uid() THEN
    RAISE EXCEPTION 'Access denied: Users can only update their own seizure logs' 
      USING ERRCODE = '42501';
  END IF;
  
  -- Update the log (only non-null values)
  UPDATE private_health_info.seizure_logs_research
  SET
    duration_seconds = COALESCE(p_duration_seconds, duration_seconds),
    seizure_type = COALESCE(p_seizure_type, seizure_type),
    consciousness_level = COALESCE(p_consciousness_level, consciousness_level),
    aura_present = COALESCE(p_aura_present, aura_present),
    aura_description = COALESCE(p_aura_description, aura_description),
    witnessed = COALESCE(p_witnessed, witnessed),
    witness_role = COALESCE(p_witness_role, witness_role),
    video_recorded = COALESCE(p_video_recorded, video_recorded),
    location_type = COALESCE(p_location_type, location_type),
    post_ictal_confusion_minutes = COALESCE(p_post_ictal_confusion_minutes, post_ictal_confusion_minutes),
    recovery_time_minutes = COALESCE(p_recovery_time_minutes, recovery_time_minutes),
    sleep_hours_prior = COALESCE(p_sleep_hours_prior, sleep_hours_prior),
    medication_adherence_prior = COALESCE(p_medication_adherence_prior, medication_adherence_prior),
    stress_level = COALESCE(p_stress_level, stress_level),
    emergency_services_called = COALESCE(p_emergency_services_called, emergency_services_called),
    rescue_medication_used = COALESCE(p_rescue_medication_used, rescue_medication_used),
    rescue_medication_type = COALESCE(p_rescue_medication_type, rescue_medication_type),
    hospitalized = COALESCE(p_hospitalized, hospitalized),
    notes = COALESCE(p_notes, notes),
    updated_at = NOW()
  WHERE log_id = p_log_id;
  
  RETURN p_log_id;
END;
$$;

-- Delete (soft delete) seizure log
CREATE OR REPLACE FUNCTION public.delete_seizure_log(
  p_log_id UUID
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'private_health_info', 'public'
AS $$
DECLARE
  v_user_id UUID;
BEGIN
  -- Get the user_id for this log to verify ownership
  SELECT user_id INTO v_user_id
  FROM private_health_info.seizure_logs_research
  WHERE log_id = p_log_id;
  
  -- Check if log exists
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Seizure log not found' USING ERRCODE = '42704';
  END IF;
  
  -- Security check: user can only delete their own logs
  IF v_user_id != auth.uid() THEN
    RAISE EXCEPTION 'Access denied: Users can only delete their own seizure logs' 
      USING ERRCODE = '42501';
  END IF;
  
  -- Soft delete by setting is_active to false (if column exists)
  -- Otherwise, perform hard delete
  -- Check if is_active column exists
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'private_health_info' 
    AND table_name = 'seizure_logs_research' 
    AND column_name = 'is_active'
  ) THEN
    -- Soft delete
    UPDATE private_health_info.seizure_logs_research
    SET is_active = FALSE, updated_at = NOW()
    WHERE log_id = p_log_id;
  ELSE
    -- Hard delete (only if no is_active column)
    DELETE FROM private_health_info.seizure_logs_research
    WHERE log_id = p_log_id;
  END IF;
  
  RETURN TRUE;
END;
$$;

-- =====================================================
-- PATIENT DIAGNOSES RPCs
-- =====================================================

-- Get patient diagnoses
CREATE OR REPLACE FUNCTION public.get_patient_diagnoses(
  p_patient_id UUID
)
RETURNS TABLE(
  diagnosis_id UUID,
  patient_id UUID,
  diagnosis_date DATE,
  diagnosis_type TEXT,
  diagnosis_subtype TEXT,
  snomed_ct_code TEXT,
  icd10_code TEXT,
  confirmed_by_clinician BOOLEAN,
  confirming_clinician_id UUID,
  notes TEXT,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'private_health_info', 'public'
AS $$
BEGIN
  -- Security check: user can only access their own diagnoses
  IF p_patient_id != auth.uid() THEN
    RAISE EXCEPTION 'Access denied: Users can only access their own diagnoses' 
      USING ERRCODE = '42501';
  END IF;
  
  RETURN QUERY
  SELECT 
    pd.diagnosis_id,
    pd.patient_id,
    pd.diagnosis_date,
    pd.diagnosis_type,
    pd.diagnosis_subtype,
    pd.snomed_ct_code,
    pd.icd10_code,
    pd.confirmed_by_clinician,
    pd.confirming_clinician_id,
    pd.notes,
    pd.created_at,
    pd.updated_at
  FROM private_health_info.patient_diagnoses pd
  WHERE pd.patient_id = p_patient_id
  ORDER BY pd.diagnosis_date DESC;
END;
$$;

-- Update patient diagnosis
CREATE OR REPLACE FUNCTION public.update_patient_diagnosis(
  p_diagnosis_id UUID,
  p_diagnosis_date DATE DEFAULT NULL,
  p_diagnosis_type TEXT DEFAULT NULL,
  p_diagnosis_subtype TEXT DEFAULT NULL,
  p_snomed_ct_code TEXT DEFAULT NULL,
  p_icd10_code TEXT DEFAULT NULL,
  p_notes TEXT DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'private_health_info', 'public'
AS $$
DECLARE
  v_patient_id UUID;
BEGIN
  -- Get the patient_id for this diagnosis to verify ownership
  SELECT patient_id INTO v_patient_id
  FROM private_health_info.patient_diagnoses
  WHERE diagnosis_id = p_diagnosis_id;
  
  -- Check if diagnosis exists
  IF v_patient_id IS NULL THEN
    RAISE EXCEPTION 'Diagnosis not found' USING ERRCODE = '42704';
  END IF;
  
  -- Security check: user can only update their own diagnoses
  IF v_patient_id != auth.uid() THEN
    RAISE EXCEPTION 'Access denied: Users can only update their own diagnoses' 
      USING ERRCODE = '42501';
  END IF;
  
  -- Update the diagnosis (only non-null values)
  UPDATE private_health_info.patient_diagnoses
  SET
    diagnosis_date = COALESCE(p_diagnosis_date, diagnosis_date),
    diagnosis_type = COALESCE(p_diagnosis_type, diagnosis_type),
    diagnosis_subtype = COALESCE(p_diagnosis_subtype, diagnosis_subtype),
    snomed_ct_code = COALESCE(p_snomed_ct_code, snomed_ct_code),
    icd10_code = COALESCE(p_icd10_code, icd10_code),
    notes = COALESCE(p_notes, notes),
    updated_at = NOW()
  WHERE diagnosis_id = p_diagnosis_id;
  
  RETURN p_diagnosis_id;
END;
$$;

-- Delete (soft delete) patient diagnosis
CREATE OR REPLACE FUNCTION public.delete_patient_diagnosis(
  p_diagnosis_id UUID
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'private_health_info', 'public'
AS $$
DECLARE
  v_patient_id UUID;
BEGIN
  -- Get the patient_id for this diagnosis to verify ownership
  SELECT patient_id INTO v_patient_id
  FROM private_health_info.patient_diagnoses
  WHERE diagnosis_id = p_diagnosis_id;
  
  -- Check if diagnosis exists
  IF v_patient_id IS NULL THEN
    RAISE EXCEPTION 'Diagnosis not found' USING ERRCODE = '42704';
  END IF;
  
  -- Security check: user can only delete their own diagnoses
  IF v_patient_id != auth.uid() THEN
    RAISE EXCEPTION 'Access denied: Users can only delete their own diagnoses' 
      USING ERRCODE = '42501';
  END IF;
  
  -- Soft delete by setting is_active to false (if column exists)
  -- Otherwise, perform hard delete
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'private_health_info' 
    AND table_name = 'patient_diagnoses' 
    AND column_name = 'is_active'
  ) THEN
    -- Soft delete
    UPDATE private_health_info.patient_diagnoses
    SET is_active = FALSE, updated_at = NOW()
    WHERE diagnosis_id = p_diagnosis_id;
  ELSE
    -- Hard delete (only if no is_active column)
    DELETE FROM private_health_info.patient_diagnoses
    WHERE diagnosis_id = p_diagnosis_id;
  END IF;
  
  RETURN TRUE;
END;
$$;

-- =====================================================
-- GRANT PERMISSIONS
-- =====================================================

-- Grant execute permissions to authenticated users
GRANT EXECUTE ON FUNCTION public.update_seizure_log TO authenticated;
GRANT EXECUTE ON FUNCTION public.delete_seizure_log TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_patient_diagnoses TO authenticated;
GRANT EXECUTE ON FUNCTION public.update_patient_diagnosis TO authenticated;
GRANT EXECUTE ON FUNCTION public.delete_patient_diagnosis TO authenticated;

-- =====================================================
-- NOTIFY POSTGREST TO RELOAD SCHEMA
-- =====================================================

NOTIFY pgrst, 'reload schema';

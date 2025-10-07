-- =====================================================
-- PHASE 4: PATIENT REPORTED OUTCOMES (PRO) UPGRADE
-- =====================================================
-- Normalizes PRO data, adds collection method tracking,
-- creates research-grade PRO structure
-- =====================================================

-- =====================================================
-- STEP 1: CREATE PRO ENUMS
-- =====================================================

-- PRO types (validated concepts)
CREATE TYPE clinical.pro_type_enum AS ENUM (
  'quality_of_life',
  'sleep_quality',
  'fatigue_level',
  'cognition',
  'mood',
  'depression',
  'anxiety',
  'physical_function',
  'pain',
  'seizure_frequency',
  'motor_symptoms',
  'adherence_to_medication',
  'social_function',
  'energy_vitality',
  'emotional_wellbeing',
  'sexual_function',
  'autonomic_symptoms',
  'other'
);

-- Collection method for PROs
CREATE TYPE clinical.collection_method_enum AS ENUM (
  'manual_entry',
  'device',
  'EHR_import',
  'patient_survey',
  'proxy_report',
  'telehealth',
  'other'
);

-- PRO domain labels (for multidomain assessments)
CREATE TYPE clinical.pro_domain_label_enum AS ENUM (
  'total_score',
  'overall_quality',
  'emotional_wellbeing',
  'physical_wellbeing',
  'social_wellbeing',
  'cognitive_functioning',
  'pain_level',
  'fatigue_level',
  'sleep_duration',
  'sleep_quality',
  'motor_score',
  'mobility',
  'self_care',
  'usual_activities',
  'anxiety_depression',
  'energy_vitality',
  'other'
);

-- =====================================================
-- STEP 2: ALTER PATIENT_PRO_TIMELINE TABLE
-- =====================================================

ALTER TABLE clinical.patient_pro_timeline
  ADD COLUMN IF NOT EXISTS pro_type clinical.pro_type_enum,
  ADD COLUMN IF NOT EXISTS collection_method clinical.collection_method_enum DEFAULT 'manual_entry';

CREATE INDEX IF NOT EXISTS idx_pro_timeline_type ON clinical.patient_pro_timeline(pro_type);
CREATE INDEX IF NOT EXISTS idx_pro_timeline_patient_date ON clinical.patient_pro_timeline(patient_id, reported_at DESC);

-- =====================================================
-- STEP 3: CREATE PRO VALUE TABLE (NORMALIZED)
-- =====================================================

CREATE TABLE IF NOT EXISTS clinical.patient_pro_value (
  value_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pro_id UUID NOT NULL REFERENCES clinical.patient_pro_timeline(pro_id) ON DELETE CASCADE,
  domain_label clinical.pro_domain_label_enum NOT NULL,
  value NUMERIC(10,2) NOT NULL,
  value_unit TEXT, -- 'score', 'hours', 'index', 'likert', etc.
  snomed_ct_code TEXT,
  icd10_code TEXT,
  collected_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_pro_values_pro ON clinical.patient_pro_value(pro_id);
CREATE INDEX idx_pro_values_domain ON clinical.patient_pro_value(domain_label);

-- RLS for PRO values
ALTER TABLE clinical.patient_pro_value ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view PRO values for their own timeline"
  ON clinical.patient_pro_value
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM clinical.patient_pro_timeline
      WHERE pro_id = clinical.patient_pro_value.pro_id
      AND patient_id = auth.uid()
    )
  );

GRANT SELECT ON clinical.patient_pro_value TO authenticated;

-- =====================================================
-- STEP 4: CREATE PRO LIBRARY (REFERENCE)
-- =====================================================

CREATE TABLE IF NOT EXISTS public.pro_measures_library (
  pro_library_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pro_type clinical.pro_type_enum NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  description TEXT,
  snomed_ct_code TEXT,
  icd10_code TEXT,
  typical_use_case TEXT, -- 'parkinsons', 'epilepsy', 'general'
  typical_domains TEXT[], -- Domains typically assessed
  min_value NUMERIC,
  max_value NUMERIC,
  unit_of_measure TEXT,
  interpretation_guide TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed PRO measures library
INSERT INTO public.pro_measures_library (pro_type, full_name, description, snomed_ct_code, icd10_code, typical_use_case, typical_domains, min_value, max_value, unit_of_measure) VALUES
('quality_of_life', 'Quality of Life Assessment', 'Overall quality of life measure', '75262009', 'Z74.3', 'general', ARRAY['total_score', 'physical_wellbeing', 'emotional_wellbeing'], 0, 100, 'score'),
('sleep_quality', 'Sleep Quality Assessment', 'Sleep quality and disturbances', '34717003', 'G47.0', 'general', ARRAY['sleep_quality', 'sleep_duration'], 0, 10, 'likert'),
('fatigue_level', 'Fatigue Assessment', 'Fatigue and tiredness level', '84229001', 'R53.83', 'general', ARRAY['fatigue_level', 'energy_vitality'], 0, 10, 'likert'),
('cognition', 'Cognitive Function Assessment', 'Cognitive impairment measure', '386807006', 'R41.3', 'general', ARRAY['cognitive_functioning', 'total_score'], 0, 30, 'score'),
('depression', 'Depression Index', 'Depression severity', '35489007', 'F32.9', 'mood', ARRAY['total_score', 'mood'], 0, 27, 'score'),
('anxiety', 'Anxiety Assessment', 'Anxiety severity measure', '48694002', 'F41.9', 'mood', ARRAY['total_score', 'anxiety_depression'], 0, 21, 'score'),
('physical_function', 'Physical Function Assessment', 'Activities of daily living', '11713001', 'Z74.3', 'general', ARRAY['mobility', 'self_care', 'usual_activities'], 0, 100, 'score'),
('pain', 'Pain Assessment', 'Pain level and interference', '22253000', 'G89.9', 'general', ARRAY['pain_level'], 0, 10, 'likert'),
('seizure_frequency', 'Seizure Frequency Log', 'Number of seizures per time frame', '84757009', 'G40', 'epilepsy', ARRAY['total_score'], 0, NULL, 'seizures/week'),
('motor_symptoms', 'Motor Symptoms Assessment', 'Parkinsonian motor symptoms', '49049000', 'G20', 'parkinsons', ARRAY['motor_score', 'mobility'], 0, 100, 'score'),
('adherence_to_medication', 'Medication Adherence', 'Medication compliance measure', '2667000', 'Z91.1', 'general', ARRAY['total_score'], 0, 100, 'percentage');

-- Make PRO library public (read-only)
ALTER TABLE public.pro_measures_library ENABLE ROW LEVEL SECURITY;
CREATE POLICY "PRO measures library readable by authenticated"
  ON public.pro_measures_library
  FOR SELECT
  TO authenticated
  USING (true);

GRANT SELECT ON public.pro_measures_library TO authenticated;

-- =====================================================
-- STEP 5: CREATE RPC FOR SAVING PRO WITH VALUES
-- =====================================================

CREATE OR REPLACE FUNCTION clinical.save_pro_with_values(
  p_patient_id UUID,
  p_pro_type clinical.pro_type_enum,
  p_collection_method clinical.collection_method_enum,
  p_reported_at TIMESTAMPTZ,
  p_snomed_ct_code TEXT DEFAULT NULL,
  p_icd10_code TEXT DEFAULT NULL,
  p_notes TEXT DEFAULT NULL,
  p_values JSONB DEFAULT '[]'::JSONB
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = clinical, public
AS $$
DECLARE
  v_pro_id UUID;
  v_value JSONB;
BEGIN
  -- Insert main PRO timeline entry
  INSERT INTO clinical.patient_pro_timeline (
    patient_id,
    pro_type,
    collection_method,
    reported_at,
    snomed_ct_code,
    icd10_code,
    notes,
    created_at
  ) VALUES (
    p_patient_id,
    p_pro_type,
    p_collection_method,
    p_reported_at,
    p_snomed_ct_code,
    p_icd10_code,
    p_notes,
    NOW()
  ) RETURNING pro_id INTO v_pro_id;
  
  -- Insert individual domain values if provided
  IF p_values IS NOT NULL AND jsonb_array_length(p_values) > 0 THEN
    FOR v_value IN SELECT * FROM jsonb_array_elements(p_values)
    LOOP
      INSERT INTO clinical.patient_pro_value (
        pro_id,
        domain_label,
        value,
        value_unit,
        snomed_ct_code,
        icd10_code
      ) VALUES (
        v_pro_id,
        (v_value->>'domain_label')::clinical.pro_domain_label_enum,
        (v_value->>'value')::NUMERIC,
        v_value->>'value_unit',
        v_value->>'snomed_ct_code',
        v_value->>'icd10_code'
      );
    END LOOP;
  END IF;
  
  RETURN v_pro_id;
END;
$$;

GRANT EXECUTE ON FUNCTION clinical.save_pro_with_values(UUID, clinical.pro_type_enum, clinical.collection_method_enum, TIMESTAMPTZ, TEXT, TEXT, TEXT, JSONB) TO authenticated;

-- =====================================================
-- STEP 6: CREATE RPC FOR FETCHING PRO WITH VALUES
-- =====================================================

CREATE OR REPLACE FUNCTION clinical.get_pro_with_values(
  p_patient_id UUID,
  p_pro_type clinical.pro_type_enum DEFAULT NULL,
  p_limit INTEGER DEFAULT 20
)
RETURNS TABLE (
  pro_id UUID,
  patient_id UUID,
  pro_type TEXT,
  collection_method TEXT,
  reported_at TIMESTAMPTZ,
  snomed_ct_code TEXT,
  icd10_code TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ,
  pro_values JSONB
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = clinical, public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    pt.pro_id,
    pt.patient_id,
    pt.pro_type::TEXT,
    pt.collection_method::TEXT,
    pt.reported_at,
    pt.snomed_ct_code,
    pt.icd10_code,
    pt.notes,
    pt.created_at,
    COALESCE(
      (
        SELECT jsonb_agg(
          jsonb_build_object(
            'domain_label', pv.domain_label::TEXT,
            'value', pv.value,
            'value_unit', pv.value_unit,
            'snomed_ct_code', pv.snomed_ct_code,
            'icd10_code', pv.icd10_code
          )
        )
        FROM clinical.patient_pro_value pv
        WHERE pv.pro_id = pt.pro_id
      ),
      '[]'::JSONB
    ) as pro_values
  FROM clinical.patient_pro_timeline pt
  WHERE 
    pt.patient_id = p_patient_id
    AND (p_pro_type IS NULL OR pt.pro_type = p_pro_type)
  ORDER BY pt.reported_at DESC, pt.created_at DESC
  LIMIT p_limit;
END;
$$;

GRANT EXECUTE ON FUNCTION clinical.get_pro_with_values(UUID, clinical.pro_type_enum, INTEGER) TO authenticated;

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================

-- Check PRO enums
SELECT enumlabel FROM pg_enum WHERE enumtypid = 'clinical.pro_type_enum'::regtype ORDER BY enumsortorder;

-- Check tables
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'clinical' 
AND table_name IN ('patient_pro_value')
ORDER BY table_name;

-- Check PRO library
SELECT pro_type, full_name, typical_use_case FROM public.pro_measures_library ORDER BY pro_type;

-- =====================================================
-- DONE - PHASE 4 COMPLETE!
-- =====================================================

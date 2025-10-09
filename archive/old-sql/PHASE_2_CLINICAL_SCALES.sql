-- =====================================================
-- PHASE 2: CLINICAL SCALES & ASSESSMENTS UPGRADE
-- =====================================================
-- Replaces text fields with enums, normalizes subscores,
-- adds SNOMED/ICD-10 codes for research-grade tracking
-- =====================================================

-- =====================================================
-- STEP 1: CREATE SCALE ENUMS
-- =====================================================

-- Scale types for major validated assessments
CREATE TYPE clinical.scale_type_enum AS ENUM (
  'UPDRS',     -- Unified Parkinson's Disease Rating Scale
  'MoCA',      -- Montreal Cognitive Assessment
  'MMSE',      -- Mini-Mental State Exam
  'HAM-D',     -- Hamilton Depression Scale
  'QOLIE-89',  -- Quality of Life in Epilepsy
  'QOLIE-31',  -- Quality of Life Epilepsy-31
  'EQ-5D',     -- EuroQol 5 Dimensions
  'BDI',       -- Beck Depression Inventory
  'STAI',      -- State-Trait Anxiety Inventory
  'PDQ-39',    -- Parkinson's Disease Questionnaire
  'HADS',      -- Hospital Anxiety and Depression Scale
  'GAD-7',     -- Generalized Anxiety Disorder-7
  'PSQI',      -- Pittsburgh Sleep Quality Index
  'other'
);

-- Scale versions
CREATE TYPE clinical.scale_version_enum AS ENUM (
  'v1',
  'v2',
  'v3',
  'short',
  'long',
  'other'
);

-- Subscale labels (standardized for common scales)
CREATE TYPE clinical.subscale_label_enum AS ENUM (
  -- UPDRS parts
  'UPDRS_I',
  'UPDRS_II',
  'UPDRS_III',
  'UPDRS_IV',
  -- MoCA domains
  'Visuospatial',
  'Naming',
  'Attention',
  'Language',
  'Abstraction',
  'Delayed_Recall',
  'Orientation',
  -- QOLIE-89 domains
  'Seizure_Worry',
  'Overall_Quality',
  'Emotional_Wellbeing',
  'Energy_Fatigue',
  'Cognitive_Functioning',
  'Medication_Effects',
  'Social_Functioning',
  'Physical_Functioning',
  -- Generic
  'other'
);

-- =====================================================
-- STEP 2: ALTER CLINICAL_SCALE_RESULTS TABLE
-- =====================================================

ALTER TABLE clinical.clinical_scale_results
  ADD COLUMN IF NOT EXISTS scale_type clinical.scale_type_enum,
  ADD COLUMN IF NOT EXISTS scale_version clinical.scale_version_enum,
  ADD COLUMN IF NOT EXISTS snomed_ct_code TEXT,
  ADD COLUMN IF NOT EXISTS icd10_code TEXT,
  ADD COLUMN IF NOT EXISTS data_origin public.data_origin_enum DEFAULT 'manual_entry',
  ADD COLUMN IF NOT EXISTS reporter_type public.reporter_type_enum DEFAULT 'clinician',
  ADD COLUMN IF NOT EXISTS last_modified_by UUID REFERENCES auth.users(id),
  ADD COLUMN IF NOT EXISTS modification_reason TEXT;

CREATE INDEX IF NOT EXISTS idx_scale_results_type ON clinical.clinical_scale_results(scale_type);
CREATE INDEX IF NOT EXISTS idx_scale_results_snomed ON clinical.clinical_scale_results(snomed_ct_code);
CREATE INDEX IF NOT EXISTS idx_scale_results_patient_date ON clinical.clinical_scale_results(patient_id, assessed_at DESC);

-- =====================================================
-- STEP 3: CREATE SUBSCALE RESULTS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS clinical.clinical_scale_subscore_results (
  subscore_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scale_id UUID NOT NULL REFERENCES clinical.clinical_scale_results(scale_id) ON DELETE CASCADE,
  subscale_label clinical.subscale_label_enum NOT NULL,
  score NUMERIC(10,2) NOT NULL,
  max_score NUMERIC(10,2),
  score_interpretation TEXT, -- e.g., 'normal', 'impaired', 'severe'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_subscores_scale ON clinical.clinical_scale_subscore_results(scale_id);
CREATE INDEX idx_subscores_label ON clinical.clinical_scale_subscore_results(subscale_label);

-- RLS for subscores
ALTER TABLE clinical.clinical_scale_subscore_results ENABLE ROW LEVEL SECURITY;

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

-- =====================================================
-- STEP 4: CREATE SCALE LIBRARY (REFERENCE)
-- =====================================================

CREATE TABLE IF NOT EXISTS public.clinical_scales_library (
  scale_library_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scale_type clinical.scale_type_enum NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  abbreviation TEXT NOT NULL,
  description TEXT,
  snomed_ct_code TEXT,
  icd10_code TEXT,
  typical_use_case TEXT, -- 'parkinsons', 'epilepsy', 'cognitive', 'mood', etc.
  min_score NUMERIC,
  max_score NUMERIC,
  scoring_interpretation TEXT, -- JSON or text guide
  available_versions TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed clinical scales library
INSERT INTO public.clinical_scales_library (scale_type, full_name, abbreviation, description, snomed_ct_code, icd10_code, typical_use_case, min_score, max_score, available_versions) VALUES
('UPDRS', 'Unified Parkinson''s Disease Rating Scale', 'UPDRS', 'Comprehensive assessment of PD motor and non-motor symptoms', '273524006', 'G20', 'parkinsons', 0, 199, ARRAY['v3']),
('MoCA', 'Montreal Cognitive Assessment', 'MoCA', 'Brief cognitive screening tool', '386807006', 'R41.3', 'cognitive', 0, 30, ARRAY['v1', 'v2', 'v3']),
('MMSE', 'Mini-Mental State Exam', 'MMSE', 'Cognitive impairment screening', '386807006', 'R41.3', 'cognitive', 0, 30, ARRAY['v1']),
('HAM-D', 'Hamilton Depression Scale', 'HAM-D', 'Depression severity assessment', '35489007', 'F32.9', 'mood', 0, 52, ARRAY['short', 'long']),
('QOLIE-89', 'Quality of Life in Epilepsy Inventory', 'QOLIE-89', 'Epilepsy-specific quality of life', '84757009', 'G40', 'epilepsy', 0, 100, ARRAY['v1']),
('QOLIE-31', 'Quality of Life in Epilepsy-31', 'QOLIE-31', 'Shortened epilepsy QOL measure', '84757009', 'G40', 'epilepsy', 0, 100, ARRAY['v1']),
('PDQ-39', 'Parkinson''s Disease Questionnaire', 'PDQ-39', 'PD-specific quality of life', '49049000', 'G20', 'parkinsons', 0, 100, ARRAY['v1']),
('HADS', 'Hospital Anxiety and Depression Scale', 'HADS', 'Anxiety and depression screening', '48694002', 'F41.9', 'mood', 0, 42, ARRAY['v1']),
('GAD-7', 'Generalized Anxiety Disorder-7', 'GAD-7', 'Anxiety severity measure', '48694002', 'F41.9', 'mood', 0, 21, ARRAY['v1']),
('PSQI', 'Pittsburgh Sleep Quality Index', 'PSQI', 'Sleep quality assessment', '34717003', 'G47.0', 'sleep', 0, 21, ARRAY['v1']);

-- Make scales library public (read-only)
ALTER TABLE public.clinical_scales_library ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Scales library readable by authenticated"
  ON public.clinical_scales_library
  FOR SELECT
  TO authenticated
  USING (true);

GRANT SELECT ON public.clinical_scales_library TO authenticated;

-- =====================================================
-- STEP 5: ADD SNOMED/ICD TO OTHER CLINICAL TABLES
-- =====================================================

-- Add to AI insights cards
ALTER TABLE clinical.ai_insights_cards
  ADD COLUMN IF NOT EXISTS snomed_ct_code TEXT,
  ADD COLUMN IF NOT EXISTS icd10_code TEXT,
  ADD COLUMN IF NOT EXISTS data_origin public.data_origin_enum DEFAULT 'AI_generated';

-- Add to case data panels
ALTER TABLE clinical.case_data_panels
  ADD COLUMN IF NOT EXISTS snomed_ct_code TEXT,
  ADD COLUMN IF NOT EXISTS icd10_code TEXT;

-- Add to clinical notes exports
ALTER TABLE clinical.clinical_notes_exports
  ADD COLUMN IF NOT EXISTS snomed_ct_code TEXT,
  ADD COLUMN IF NOT EXISTS icd10_code TEXT,
  ADD COLUMN IF NOT EXISTS last_modified_by UUID REFERENCES auth.users(id),
  ADD COLUMN IF NOT EXISTS modification_reason TEXT;

-- Add to patient risk alerts
ALTER TABLE clinical.patient_risk_alerts
  ADD COLUMN IF NOT EXISTS snomed_ct_code TEXT,
  ADD COLUMN IF NOT EXISTS icd10_code TEXT;

-- Add to neuro imaging results
ALTER TABLE clinical.neuro_imaging_results
  ADD COLUMN IF NOT EXISTS snomed_ct_code TEXT,
  ADD COLUMN IF NOT EXISTS icd10_code TEXT,
  ADD COLUMN IF NOT EXISTS study_condition_code TEXT; -- Why the study was done

-- Add to patient PRO timeline
ALTER TABLE clinical.patient_pro_timeline
  ADD COLUMN IF NOT EXISTS snomed_ct_code TEXT,
  ADD COLUMN IF NOT EXISTS icd10_code TEXT,
  ADD COLUMN IF NOT EXISTS data_origin public.data_origin_enum DEFAULT 'manual_entry',
  ADD COLUMN IF NOT EXISTS reporter_type public.reporter_type_enum DEFAULT 'self';

-- =====================================================
-- STEP 6: CREATE RPC FOR SAVING SCALE RESULTS
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

-- =====================================================
-- STEP 7: CREATE RPC FOR FETCHING SCALE RESULTS
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

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================

-- Check enums
SELECT typname FROM pg_type WHERE typname LIKE '%scale%' AND typnamespace IN ('clinical'::regnamespace, 'public'::regnamespace) ORDER BY typname;

-- Check tables
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'clinical' 
AND table_name IN ('clinical_scale_subscore_results')
ORDER BY table_name;

-- Check scales library
SELECT scale_type, full_name, typical_use_case FROM public.clinical_scales_library ORDER BY scale_type;

-- =====================================================
-- DONE - PHASE 2 COMPLETE!
-- =====================================================

| scale_type | full_name                                | typical_use_case |
| ---------- | ---------------------------------------- | ---------------- |
| UPDRS      | Unified Parkinson's Disease Rating Scale | parkinsons       |
| MoCA       | Montreal Cognitive Assessment            | cognitive        |
| MMSE       | Mini-Mental State Exam                   | cognitive        |
| HAM-D      | Hamilton Depression Scale                | mood             |
| QOLIE-89   | Quality of Life in Epilepsy Inventory    | epilepsy         |
| QOLIE-31   | Quality of Life in Epilepsy-31           | epilepsy         |
| PDQ-39     | Parkinson's Disease Questionnaire        | parkinsons       |
| HADS       | Hospital Anxiety and Depression Scale    | mood             |
| GAD-7      | Generalized Anxiety Disorder-7           | mood             |
| PSQI       | Pittsburgh Sleep Quality Index           | sleep            | 


DONE 
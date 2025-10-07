-- =====================================================
-- PHASE 3: IMAGING & ANNOTATIONS UPGRADE
-- =====================================================
-- Normalizes imaging annotations, adds protocol metadata,
-- SNOMED/ICD-10 codes for research-grade imaging tracking
-- =====================================================

-- =====================================================
-- STEP 1: CREATE ANNOTATION ENUMS
-- =====================================================

-- Annotation types for imaging findings
CREATE TYPE clinical.annotation_type_enum AS ENUM (
  'lesion',
  'atrophy',
  'infarct',
  'hemorrhage',
  'hyperintensity',
  'hypointensity',
  'tumor',
  'artifact',
  'normal',
  'calcification',
  'impairment',
  'other'
);

-- =====================================================
-- STEP 2: CREATE IMAGING ANNOTATIONS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS clinical.imaging_annotations (
  annotation_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_id UUID NOT NULL REFERENCES clinical.neuro_imaging_results(image_id) ON DELETE CASCADE,
  annotation_type clinical.annotation_type_enum NOT NULL,
  coordinates TEXT, -- JSON string: "[x, y, width, height]" or 3D coords
  ai_flagged BOOLEAN DEFAULT false,
  ai_confidence NUMERIC(5,2), -- 0-100%
  snomed_ct_code TEXT,
  icd10_code TEXT,
  notes TEXT,
  validated_by UUID REFERENCES auth.users(id),
  validation_status TEXT, -- 'pending', 'confirmed', 'rejected'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_annotations_image ON clinical.imaging_annotations(image_id);
CREATE INDEX idx_annotations_type ON clinical.imaging_annotations(annotation_type);
CREATE INDEX idx_annotations_ai_flagged ON clinical.imaging_annotations(ai_flagged) WHERE ai_flagged = true;
CREATE INDEX idx_annotations_snomed ON clinical.imaging_annotations(snomed_ct_code);

-- RLS for annotations
ALTER TABLE clinical.imaging_annotations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view annotations for their own images"
  ON clinical.imaging_annotations
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM clinical.neuro_imaging_results
      WHERE image_id = clinical.imaging_annotations.image_id
      AND patient_id = auth.uid()
    )
  );

GRANT SELECT ON clinical.imaging_annotations TO authenticated;

-- =====================================================
-- STEP 3: CREATE IMAGING FINDINGS LIBRARY
-- =====================================================

CREATE TABLE IF NOT EXISTS public.imaging_findings_library (
  finding_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  finding_name TEXT NOT NULL UNIQUE,
  annotation_type clinical.annotation_type_enum NOT NULL,
  snomed_ct_code TEXT NOT NULL,
  icd10_code TEXT NOT NULL,
  description TEXT,
  typical_in_parkinsons BOOLEAN DEFAULT false,
  typical_in_epilepsy BOOLEAN DEFAULT false,
  clinical_significance TEXT,
  search_keywords TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed common imaging findings
INSERT INTO public.imaging_findings_library (finding_name, annotation_type, snomed_ct_code, icd10_code, description, typical_in_parkinsons, typical_in_epilepsy, search_keywords) VALUES
('Cerebral atrophy', 'atrophy', '13342000', 'G31.9', 'Brain volume loss', true, false, ARRAY['atrophy', 'volume loss', 'shrinkage']),
('Basal ganglia atrophy', 'atrophy', '230284003', 'G20', 'Atrophy of basal ganglia structures', true, false, ARRAY['basal ganglia', 'substantia nigra', 'striatum']),
('Cerebral infarct', 'infarct', '432504007', 'I63', 'Ischemic brain injury', false, true, ARRAY['infarct', 'stroke', 'ischemia']),
('Cerebral hemorrhage', 'hemorrhage', '230690007', 'I61', 'Brain bleeding', false, true, ARRAY['hemorrhage', 'bleed', 'hematoma']),
('White matter hyperintensity', 'hyperintensity', '418107008', 'G93.89', 'White matter signal changes', true, false, ARRAY['white matter', 'hyperintensity', 'leukoaraiosis']),
('Hippocampal sclerosis', 'atrophy', '21831000', 'G40.2', 'Hippocampal volume loss and gliosis', false, true, ARRAY['hippocampus', 'sclerosis', 'temporal lobe']),
('Cortical lesion', 'lesion', '128608001', 'G93.89', 'Cortical abnormality', false, true, ARRAY['cortical', 'lesion', 'cortex']),
('Calcification', 'calcification', '20104002', 'G93.89', 'Abnormal calcium deposits', false, false, ARRAY['calcification', 'calcium', 'deposits']);

-- Make findings library public (read-only)
ALTER TABLE public.imaging_findings_library ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Imaging findings library readable by authenticated"
  ON public.imaging_findings_library
  FOR SELECT
  TO authenticated
  USING (true);

GRANT SELECT ON public.imaging_findings_library TO authenticated;

CREATE INDEX idx_findings_snomed ON public.imaging_findings_library(snomed_ct_code);
CREATE INDEX idx_findings_parkinsons ON public.imaging_findings_library(typical_in_parkinsons) WHERE typical_in_parkinsons = true;
CREATE INDEX idx_findings_epilepsy ON public.imaging_findings_library(typical_in_epilepsy) WHERE typical_in_epilepsy = true;

-- =====================================================
-- STEP 4: CREATE RPC FOR SAVING IMAGING WITH ANNOTATIONS
-- =====================================================

CREATE OR REPLACE FUNCTION clinical.save_imaging_with_annotations(
  p_patient_id UUID,
  p_study_type TEXT,
  p_study_date DATE,
  p_image_url TEXT,
  p_findings TEXT DEFAULT NULL,
  p_impression TEXT DEFAULT NULL,
  p_snomed_ct_code TEXT DEFAULT NULL,
  p_icd10_code TEXT DEFAULT NULL,
  p_study_condition_code TEXT DEFAULT NULL,
  p_ordering_physician UUID DEFAULT NULL,
  p_uploaded_by UUID DEFAULT NULL,
  p_annotations JSONB DEFAULT '[]'::JSONB
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = clinical, public
AS $$
DECLARE
  v_image_id UUID;
  v_annotation JSONB;
BEGIN
  -- Insert main imaging record
  INSERT INTO clinical.neuro_imaging_results (
    patient_id,
    study_type,
    study_date,
    image_url,
    findings,
    impression,
    snomed_ct_code,
    icd10_code,
    study_condition_code,
    ordering_physician,
    uploaded_by,
    created_at
  ) VALUES (
    p_patient_id,
    p_study_type,
    p_study_date,
    p_image_url,
    p_findings,
    p_impression,
    p_snomed_ct_code,
    p_icd10_code,
    p_study_condition_code,
    p_ordering_physician,
    p_uploaded_by,
    NOW()
  ) RETURNING image_id INTO v_image_id;
  
  -- Insert annotations if provided
  IF p_annotations IS NOT NULL AND jsonb_array_length(p_annotations) > 0 THEN
    FOR v_annotation IN SELECT * FROM jsonb_array_elements(p_annotations)
    LOOP
      INSERT INTO clinical.imaging_annotations (
        image_id,
        annotation_type,
        coordinates,
        ai_flagged,
        ai_confidence,
        snomed_ct_code,
        icd10_code,
        notes
      ) VALUES (
        v_image_id,
        (v_annotation->>'annotation_type')::clinical.annotation_type_enum,
        v_annotation->>'coordinates',
        COALESCE((v_annotation->>'ai_flagged')::BOOLEAN, false),
        (v_annotation->>'ai_confidence')::NUMERIC,
        v_annotation->>'snomed_ct_code',
        v_annotation->>'icd10_code',
        v_annotation->>'notes'
      );
    END LOOP;
  END IF;
  
  RETURN v_image_id;
END;
$$;

GRANT EXECUTE ON FUNCTION clinical.save_imaging_with_annotations(UUID, TEXT, DATE, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, UUID, UUID, JSONB) TO authenticated;

-- =====================================================
-- STEP 5: CREATE RPC FOR FETCHING IMAGING WITH ANNOTATIONS
-- =====================================================

CREATE OR REPLACE FUNCTION clinical.get_imaging_with_annotations(
  p_patient_id UUID,
  p_limit INTEGER DEFAULT 10
)
RETURNS TABLE (
  image_id UUID,
  patient_id UUID,
  study_type TEXT,
  study_date DATE,
  image_url TEXT,
  findings TEXT,
  impression TEXT,
  snomed_ct_code TEXT,
  icd10_code TEXT,
  study_condition_code TEXT,
  ordering_physician UUID,
  uploaded_by UUID,
  created_at TIMESTAMPTZ,
  annotations JSONB
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = clinical, public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    ir.image_id,
    ir.patient_id,
    ir.study_type,
    ir.study_date,
    ir.image_url,
    ir.findings,
    ir.impression,
    ir.snomed_ct_code,
    ir.icd10_code,
    ir.study_condition_code,
    ir.ordering_physician,
    ir.uploaded_by,
    ir.created_at,
    COALESCE(
      (
        SELECT jsonb_agg(
          jsonb_build_object(
            'annotation_id', ia.annotation_id,
            'annotation_type', ia.annotation_type::TEXT,
            'coordinates', ia.coordinates,
            'ai_flagged', ia.ai_flagged,
            'ai_confidence', ia.ai_confidence,
            'snomed_ct_code', ia.snomed_ct_code,
            'icd10_code', ia.icd10_code,
            'notes', ia.notes,
            'validated_by', ia.validated_by,
            'validation_status', ia.validation_status
          )
        )
        FROM clinical.imaging_annotations ia
        WHERE ia.image_id = ir.image_id
      ),
      '[]'::JSONB
    ) as annotations
  FROM clinical.neuro_imaging_results ir
  WHERE ir.patient_id = p_patient_id
  ORDER BY ir.study_date DESC, ir.created_at DESC
  LIMIT p_limit;
END;
$$;

GRANT EXECUTE ON FUNCTION clinical.get_imaging_with_annotations(UUID, INTEGER) TO authenticated;

-- =====================================================
-- STEP 6: ADD ANNOTATION SEARCH RPC
-- =====================================================

CREATE OR REPLACE FUNCTION clinical.search_imaging_findings(
  p_search_term TEXT,
  p_parkinsons_only BOOLEAN DEFAULT false,
  p_epilepsy_only BOOLEAN DEFAULT false
)
RETURNS TABLE (
  finding_id UUID,
  finding_name TEXT,
  annotation_type TEXT,
  snomed_ct_code TEXT,
  icd10_code TEXT,
  description TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    f.finding_id,
    f.finding_name,
    f.annotation_type::TEXT,
    f.snomed_ct_code,
    f.icd10_code,
    f.description
  FROM public.imaging_findings_library f
  WHERE 
    (p_search_term IS NULL OR 
     f.finding_name ILIKE '%' || p_search_term || '%' OR
     p_search_term = ANY(f.search_keywords))
    AND (NOT p_parkinsons_only OR f.typical_in_parkinsons = true)
    AND (NOT p_epilepsy_only OR f.typical_in_epilepsy = true)
  ORDER BY 
    CASE 
      WHEN f.finding_name ILIKE p_search_term THEN 1
      WHEN f.finding_name ILIKE p_search_term || '%' THEN 2
      ELSE 3
    END,
    f.finding_name
  LIMIT 20;
END;
$$;

GRANT EXECUTE ON FUNCTION clinical.search_imaging_findings(TEXT, BOOLEAN, BOOLEAN) TO authenticated;

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================

-- Check annotation enum
SELECT enumlabel FROM pg_enum WHERE enumtypid = 'clinical.annotation_type_enum'::regtype ORDER BY enumsortorder;

-- Check tables
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'clinical' 
AND table_name IN ('imaging_annotations')
ORDER BY table_name;

-- Check findings library
SELECT finding_name, annotation_type, snomed_ct_code FROM public.imaging_findings_library ORDER BY finding_name;

-- =====================================================
-- DONE - PHASE 3 COMPLETE!
-- =====================================================

-- =====================================================
-- PHASE 1: CLINICAL VOCABULARY ENRICHMENT
-- =====================================================
-- Adds SNOMED CT/ICD-10 codes, disease subtypes,
-- data provenance, and research-grade metadata
-- =====================================================

-- =====================================================
-- STEP 1: CREATE DISEASE/SUBTYPE ENUMS
-- =====================================================
DROP TYPE IF EXISTS public.seizure_type_enum CASCADE;
DROP TYPE IF EXISTS consent_status_enum CASCADE;
DROP TYPE IF EXISTS consent_status_enum CASCADE;



-- Epilepsy subtypes (SNOMED G40 mapped)
CREATE TYPE public.epilepsy_subtype_enum AS ENUM (
  'focal_simple',
  'focal_complex',
  'generalized',
  'status_epilepticus',
  'absence',
  'myoclonic',
  'clonic',
  'tonic',
  'atonic',
  'landau_kleffner',
  'other'
);

-- Parkinson's subtypes (SNOMED/ICD G20 mapped)
CREATE TYPE public.parkinsons_subtype_enum AS ENUM (
  'idiopathic',
  'drug_induced',
  'vascular',
  'parkinsonism',
  'young_onset',
  'other'
);

-- Seizure types (finer granularity for epilepsy tracking)
CREATE TYPE public.seizure_type_enum AS ENUM (
  'simple_partial',
  'complex_partial',
  'generalized_tonic_clonic',
  'absence',
  'myoclonic',
  'clonic',
  'tonic',
  'atonic',
  'unknown'
);

-- PD motor symptom subtypes
CREATE TYPE public.pd_motor_symptom_enum AS ENUM (
  'tremor',
  'rigidity',
  'bradykinesia',
  'postural_instability',
  'dyskinesia',
  'freezing',
  'micrographia',
  'speech_disturbance',
  'facial_masking',
  'other'
);

-- =====================================================
-- STEP 2: CREATE DATA PROVENANCE ENUMS
-- =====================================================

-- Capture method (how data was collected)
CREATE TYPE public.capture_method_enum AS ENUM (
  'manual',
  'wearable',
  'EHR',
  'proxy',
  'survey_auto',
  'unknown'
);

-- Reporter type (who reported the data)
CREATE TYPE public.reporter_type_enum AS ENUM (
  'self',
  'caregiver',
  'clinician',
  'device',
  'other'
);

-- Data origin (for research metadata)
CREATE TYPE public.data_origin_enum AS ENUM (
  'manual_entry',
  'device',
  'EHR_import',
  'AI_generated',
  'clinician_assigned',
  'other'
);

-- Consent status (for research compliance)
CREATE TYPE public.consent_status_enum AS ENUM (
  'granted',
  'withdrawn',
  'pending'
);


-- Ensure symptom category enum exists (early restructure dependency)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_type t
    JOIN pg_namespace n ON n.oid = t.typnamespace
    WHERE t.typname = 'symptom_category_enum'
      AND n.nspname = 'public'
  ) THEN
    CREATE TYPE public.symptom_category_enum AS ENUM (
      'motor',
      'cognitive',
      'mood',
      'sleep',
      'autonomic',
      'sensory',
      'pain',
      'gastrointestinal',
      'cardiovascular',
      'respiratory',
      'other'
    );
  END IF;
END;
$$;

-- Create symptoms library if restructure script has not run yet
CREATE TABLE IF NOT EXISTS public.symptoms_library (
  symptom_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  symptom_name TEXT NOT NULL UNIQUE,
  category public.symptom_category_enum NOT NULL,
  common_in_epilepsy BOOLEAN DEFAULT false,
  common_in_parkinsons BOOLEAN DEFAULT false,
  description TEXT,
  search_keywords TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_symptoms_search ON public.symptoms_library USING gin(search_keywords);
CREATE INDEX IF NOT EXISTS idx_symptoms_category ON public.symptoms_library (category);
CREATE INDEX IF NOT EXISTS idx_symptoms_epilepsy ON public.symptoms_library (common_in_epilepsy) WHERE common_in_epilepsy = true;
CREATE INDEX IF NOT EXISTS idx_symptoms_parkinsons ON public.symptoms_library (common_in_parkinsons) WHERE common_in_parkinsons = true;

ALTER TABLE public.symptoms_library
  ADD COLUMN IF NOT EXISTS snomed_ct_code TEXT,
  ADD COLUMN IF NOT EXISTS icd10_code TEXT,
  ADD COLUMN IF NOT EXISTS coding_system TEXT DEFAULT 'SNOMED_CT';

CREATE INDEX IF NOT EXISTS idx_symptoms_snomed ON public.symptoms_library(snomed_ct_code);
CREATE INDEX IF NOT EXISTS idx_symptoms_icd10 ON public.symptoms_library(icd10_code);

-- =====================================================
-- STEP 4: SEED SYMPTOMS LIBRARY (IF EMPTY)
-- =====================================================

-- Insert base symptoms if they don't exist
INSERT INTO public.symptoms_library (symptom_name, category, common_in_epilepsy, common_in_parkinsons, description, search_keywords) VALUES
('Seizure aura', 'sensory', true, false, 'Warning sensations before a seizure', ARRAY['aura', 'warning', 'pre-seizure']),
('Post-ictal confusion', 'cognitive', true, false, 'Confusion after a seizure', ARRAY['confused', 'post-ictal', 'after seizure']),
('Headache', 'pain', true, false, 'Head pain', ARRAY['headache', 'migraine', 'head pain']),
('Fatigue', 'other', true, true, 'Extreme tiredness', ARRAY['tired', 'fatigue', 'exhausted']),
('Memory problems', 'cognitive', true, false, 'Difficulty remembering', ARRAY['memory', 'forgetful', 'amnesia']),
('Anxiety', 'mood', true, true, 'Feelings of worry or fear', ARRAY['anxious', 'worried', 'panic']),
('Tremor', 'motor', false, true, 'Involuntary shaking', ARRAY['tremor', 'shaking', 'trembling']),
('Rigidity', 'motor', false, true, 'Muscle stiffness', ARRAY['stiff', 'rigid', 'tight muscles']),
('Bradykinesia', 'motor', false, true, 'Slowness of movement', ARRAY['slow', 'bradykinesia', 'slow movement']),
('Postural instability', 'motor', false, true, 'Balance problems', ARRAY['balance', 'falls', 'unstable']),
('Freezing of gait', 'motor', false, true, 'Sudden inability to move feet', ARRAY['freezing', 'stuck', 'gait freeze']),
('Dyskinesia', 'motor', false, true, 'Involuntary movements', ARRAY['dyskinesia', 'involuntary movement']),
('Constipation', 'gastrointestinal', false, true, 'Difficulty with bowel movements', ARRAY['constipation', 'bowel', 'digestive']),
('Sleep disturbance', 'sleep', true, true, 'Problems sleeping', ARRAY['insomnia', 'sleep', 'restless sleep']),
('Dizziness', 'sensory', true, true, 'Feeling lightheaded', ARRAY['dizzy', 'lightheaded', 'vertigo']),
('Nausea', 'gastrointestinal', true, true, 'Feeling sick to stomach', ARRAY['nausea', 'sick', 'queasy']),
('Muscle weakness', 'motor', true, false, 'Reduced muscle strength', ARRAY['weak', 'weakness', 'muscle']),
('Numbness', 'sensory', true, false, 'Loss of sensation', ARRAY['numb', 'tingling', 'pins and needles']),
('Vision changes', 'sensory', true, false, 'Changes in eyesight', ARRAY['vision', 'blurry', 'visual', 'eyesight']),
('Speech difficulties', 'motor', true, true, 'Trouble speaking', ARRAY['speech', 'slurred', 'talking difficulty']),
('Depression', 'mood', true, true, 'Persistent low mood', ARRAY['depressed', 'sad', 'low mood'])
ON CONFLICT (symptom_name) DO NOTHING;

-- =====================================================
-- STEP 5: UPDATE SYMPTOMS LIBRARY WITH CODES
-- =====================================================

-- Epilepsy symptoms
UPDATE public.symptoms_library SET snomed_ct_code = '417080002', icd10_code = 'G40' WHERE symptom_name = 'Seizure aura';
UPDATE public.symptoms_library SET snomed_ct_code = '55342008', icd10_code = 'G40' WHERE symptom_name = 'Post-ictal confusion';
UPDATE public.symptoms_library SET snomed_ct_code = '386807006', icd10_code = 'R41.3' WHERE symptom_name = 'Memory problems';

-- Parkinson's symptoms
UPDATE public.symptoms_library SET snomed_ct_code = '308909003', icd10_code = 'G25.0' WHERE symptom_name = 'Tremor';
UPDATE public.symptoms_library SET snomed_ct_code = '90721005', icd10_code = 'G20' WHERE symptom_name = 'Rigidity';
UPDATE public.symptoms_library SET snomed_ct_code = '16842005', icd10_code = 'G20' WHERE symptom_name = 'Bradykinesia';
UPDATE public.symptoms_library SET snomed_ct_code = '282145008', icd10_code = 'G20' WHERE symptom_name = 'Postural instability';
UPDATE public.symptoms_library SET snomed_ct_code = '271706000', icd10_code = 'G20' WHERE symptom_name = 'Freezing of gait';
UPDATE public.symptoms_library SET snomed_ct_code = '33961009', icd10_code = 'G20.B' WHERE symptom_name = 'Dyskinesia';
UPDATE public.symptoms_library SET snomed_ct_code = '14760008', icd10_code = 'K59.0' WHERE symptom_name = 'Constipation';

-- General neurological
UPDATE public.symptoms_library SET snomed_ct_code = '25064002', icd10_code = 'R51' WHERE symptom_name = 'Headache';
UPDATE public.symptoms_library SET snomed_ct_code = '84229001', icd10_code = 'R53.83' WHERE symptom_name = 'Fatigue';
UPDATE public.symptoms_library SET snomed_ct_code = '48694002', icd10_code = 'F41.9' WHERE symptom_name = 'Anxiety';
UPDATE public.symptoms_library SET snomed_ct_code = '404640003', icd10_code = 'R42' WHERE symptom_name = 'Dizziness';
UPDATE public.symptoms_library SET snomed_ct_code = '422587007', icd10_code = 'R11' WHERE symptom_name = 'Nausea';
UPDATE public.symptoms_library SET snomed_ct_code = '26544005', icd10_code = 'M62.81' WHERE symptom_name = 'Muscle weakness';
UPDATE public.symptoms_library SET snomed_ct_code = '44077006', icd10_code = 'R20.0' WHERE symptom_name = 'Numbness';
UPDATE public.symptoms_library SET snomed_ct_code = '63102001', icd10_code = 'H53.9' WHERE symptom_name = 'Vision changes';
UPDATE public.symptoms_library SET snomed_ct_code = '29164008', icd10_code = 'R47.1' WHERE symptom_name = 'Speech difficulties';
UPDATE public.symptoms_library SET snomed_ct_code = '35489007', icd10_code = 'F32.9' WHERE symptom_name = 'Depression';
UPDATE public.symptoms_library SET snomed_ct_code = '34717003', icd10_code = 'G47.0' WHERE symptom_name = 'Sleep disturbance';

-- =====================================================
-- STEP 6: CREATE PATIENT DIAGNOSES TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS private_health_info.patient_diagnoses (
  diagnosis_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  diagnosis_date DATE NOT NULL,
  diagnosis_type TEXT NOT NULL, -- 'epilepsy', 'parkinsons', etc.
  diagnosis_subtype TEXT, -- e.g. 'idiopathic', 'focal', 'generalized'
  snomed_ct_code TEXT,
  icd10_code TEXT,
  confirmed_by_clinician BOOLEAN DEFAULT false,
  confirming_clinician_id UUID REFERENCES auth.users(id),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_diagnoses_patient ON private_health_info.patient_diagnoses(patient_id);
CREATE INDEX idx_diagnoses_type ON private_health_info.patient_diagnoses(diagnosis_type);
CREATE INDEX idx_diagnoses_snomed ON private_health_info.patient_diagnoses(snomed_ct_code);
CREATE INDEX idx_diagnoses_icd10 ON private_health_info.patient_diagnoses(icd10_code);

-- RLS for patient_diagnoses
ALTER TABLE private_health_info.patient_diagnoses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own diagnoses"
  ON private_health_info.patient_diagnoses
  FOR SELECT
  USING (patient_id = auth.uid());

CREATE POLICY "Users can insert own diagnoses"
  ON private_health_info.patient_diagnoses
  FOR INSERT
  WITH CHECK (patient_id = auth.uid());

CREATE POLICY "Users can update own diagnoses"
  ON private_health_info.patient_diagnoses
  FOR UPDATE
  USING (patient_id = auth.uid());

GRANT SELECT, INSERT, UPDATE ON private_health_info.patient_diagnoses TO authenticated;

-- =====================================================
-- STEP 7: ADD PROVENANCE TO TRACKING TABLES (IF EXIST)
-- =====================================================
-- Note: These tables are created in RESTRUCTURE_TRACKING_TABLES.sql
-- This step only runs if those tables already exist

-- Add to patient_daily_tracking_logs (if exists)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_schema = 'private_health_info' 
    AND table_name = 'patient_daily_tracking_logs'
  ) THEN
    ALTER TABLE private_health_info.patient_daily_tracking_logs
      ADD COLUMN IF NOT EXISTS capture_method public.capture_method_enum DEFAULT 'manual',
      ADD COLUMN IF NOT EXISTS reporter_type public.reporter_type_enum DEFAULT 'self',
      ADD COLUMN IF NOT EXISTS last_modified_by UUID REFERENCES auth.users(id),
      ADD COLUMN IF NOT EXISTS modification_reason TEXT,
      ADD COLUMN IF NOT EXISTS data_audit_version INTEGER DEFAULT 1,
      ADD COLUMN IF NOT EXISTS consent_status public.consent_status_enum DEFAULT 'granted';
  END IF;
END $$;

-- Add to patient_symptom_logs (if exists)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_schema = 'private_health_info' 
    AND table_name = 'patient_symptom_logs'
  ) THEN
    ALTER TABLE private_health_info.patient_symptom_logs
      ADD COLUMN IF NOT EXISTS capture_method public.capture_method_enum DEFAULT 'manual',
      ADD COLUMN IF NOT EXISTS reporter_type public.reporter_type_enum DEFAULT 'self',
      ADD COLUMN IF NOT EXISTS snomed_ct_code TEXT,
      ADD COLUMN IF NOT EXISTS icd10_code TEXT,
      ADD COLUMN IF NOT EXISTS last_modified_by UUID REFERENCES auth.users(id),
      ADD COLUMN IF NOT EXISTS consent_status public.consent_status_enum DEFAULT 'granted';
  END IF;
END $$;

-- Add to parkinsons_motor_logs (if exists)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_schema = 'private_health_info' 
    AND table_name = 'parkinsons_motor_logs'
  ) THEN
    ALTER TABLE private_health_info.parkinsons_motor_logs
      ADD COLUMN IF NOT EXISTS capture_method public.capture_method_enum DEFAULT 'manual',
      ADD COLUMN IF NOT EXISTS reporter_type public.reporter_type_enum DEFAULT 'self',
      ADD COLUMN IF NOT EXISTS last_modified_by UUID REFERENCES auth.users(id),
      ADD COLUMN IF NOT EXISTS consent_status public.consent_status_enum DEFAULT 'granted';
  END IF;
END $$;

-- =====================================================
-- STEP 8: CREATE ENHANCED SEIZURE LOGS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS private_health_info.seizure_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  log_date DATE NOT NULL,
  log_time TIME,
  seizure_type public.seizure_type_enum,
  epilepsy_subtype public.epilepsy_subtype_enum,
  snomed_ct_code TEXT,
  icd10_code TEXT,
  context TEXT, -- trigger, activity
  severity INTEGER CHECK (severity BETWEEN 1 AND 10),
  duration_seconds INTEGER,
  notes TEXT,
  capture_method public.capture_method_enum DEFAULT 'manual',
  reporter_type public.reporter_type_enum DEFAULT 'self',
  shared_with_clinician BOOLEAN DEFAULT true,
  visible_to_researchers BOOLEAN DEFAULT false,
  consent_status public.consent_status_enum DEFAULT 'granted',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_seizure_logs_patient ON private_health_info.seizure_logs(patient_id);
CREATE INDEX idx_seizure_logs_date ON private_health_info.seizure_logs(log_date DESC);
CREATE INDEX idx_seizure_logs_type ON private_health_info.seizure_logs(seizure_type);

-- RLS for seizure_logs
ALTER TABLE private_health_info.seizure_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own seizure logs"
  ON private_health_info.seizure_logs
  FOR ALL
  USING (patient_id = auth.uid())
  WITH CHECK (patient_id = auth.uid());

GRANT SELECT, INSERT, UPDATE, DELETE ON private_health_info.seizure_logs TO authenticated;

-- =====================================================
-- STEP 9: SEED COMMON DIAGNOSES
-- =====================================================

-- Create a reference table for common diagnoses
CREATE TABLE IF NOT EXISTS public.diagnoses_library (
  diagnosis_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  diagnosis_name TEXT NOT NULL UNIQUE,
  diagnosis_category TEXT NOT NULL, -- 'epilepsy', 'parkinsons', 'other_neurological'
  snomed_ct_code TEXT NOT NULL,
  icd10_code TEXT NOT NULL,
  description TEXT,
  typical_subtypes TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed common diagnoses
INSERT INTO public.diagnoses_library (diagnosis_name, diagnosis_category, snomed_ct_code, icd10_code, description, typical_subtypes) VALUES
('Parkinson''s disease', 'parkinsons', '49049000', 'G20', 'Progressive neurodegenerative disorder', ARRAY['idiopathic', 'young_onset']),
('Epilepsy', 'epilepsy', '84757009', 'G40', 'Recurrent seizure disorder', ARRAY['focal_simple', 'focal_complex', 'generalized']),
('Absence seizure disorder', 'epilepsy', '78444002', 'G40.7', 'Brief loss of consciousness', ARRAY['absence']),
('Status epilepticus', 'epilepsy', '27865001', 'G41', 'Prolonged seizure or repeated seizures', ARRAY['status_epilepticus']),
('Drug-induced Parkinsonism', 'parkinsons', '7061003', 'G21.1', 'Parkinson-like symptoms from medication', ARRAY['drug_induced']),
('Vascular Parkinsonism', 'parkinsons', '230285002', 'G21.4', 'Parkinsonism due to vascular disease', ARRAY['vascular']);

-- Make diagnoses library public (read-only)
ALTER TABLE public.diagnoses_library ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Diagnoses library readable by authenticated"
  ON public.diagnoses_library
  FOR SELECT
  TO authenticated
  USING (true);

GRANT SELECT ON public.diagnoses_library TO authenticated;

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================

-- Check enums created
SELECT typname FROM pg_type WHERE typname LIKE '%enum' AND typnamespace = 'public'::regnamespace ORDER BY typname;

-- Check symptoms library codes
SELECT symptom_name, snomed_ct_code, icd10_code FROM public.symptoms_library WHERE snomed_ct_code IS NOT NULL LIMIT 10;

-- Check new tables
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'private_health_info' 
AND table_name IN ('patient_diagnoses', 'seizure_logs')
ORDER BY table_name;

-- =====================================================
-- DONE - PHASE 1 COMPLETE!
-- =====================================================






PROBLEM AROSE - ERROR:  42P01: relation "public.symptoms_library" does not exist - FIXED.
NEW PROBLEM - ERROR:  42P01: relation "private_health_info.patient_daily_tracking_logs" does not exist

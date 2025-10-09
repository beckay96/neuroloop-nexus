-- =====================================================
-- RESTRUCTURE TRACKING TABLES - RESEARCH GRADE
-- =====================================================
-- Splits monolithic daily_symptom_logs into proper tables
-- NO JSONB - all enums and relational design
-- Each table maps to a specific feature
-- =====================================================

-- =====================================================
-- STEP 1: CREATE ENUMS FOR CATEGORICAL DATA
-- =====================================================

-- Sleep disturbance types
CREATE TYPE public.sleep_disturbance_enum AS ENUM (
  'difficulty_falling_asleep',
  'frequent_waking',
  'early_morning_waking',
  'nightmares',
  'restless_legs',
  'sleep_apnea',
  'pain',
  'anxiety',
  'medication_side_effects',
  'other'
);

-- Cognitive issue types
CREATE TYPE public.cognitive_issue_enum AS ENUM (
  'memory_loss',
  'difficulty_concentrating',
  'confusion',
  'word_finding_difficulty',
  'decision_making_problems',
  'processing_speed_slow',
  'executive_function_issues',
  'other'
);

-- Mood issue types
CREATE TYPE public.mood_issue_enum AS ENUM (
  'depression',
  'anxiety',
  'irritability',
  'apathy',
  'mood_swings',
  'emotional_instability',
  'anhedonia',
  'other'
);

-- Autonomic symptom types (for Parkinson's)
CREATE TYPE public.autonomic_symptom_enum AS ENUM (
  'orthostatic_hypotension',
  'constipation',
  'urinary_urgency',
  'urinary_frequency',
  'excessive_sweating',
  'temperature_dysregulation',
  'sexual_dysfunction',
  'drooling',
  'other'
);

-- Activity of Daily Living types
CREATE TYPE public.adl_type_enum AS ENUM (
  'dressing',
  'bathing',
  'eating',
  'toileting',
  'walking',
  'transfers',
  'grooming',
  'cooking',
  'shopping',
  'housework',
  'managing_finances',
  'managing_medications',
  'other'
);

-- General symptom categories (for searchable library)
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

-- Severity scale enum (standardized 1-10)
CREATE TYPE public.severity_scale_enum AS ENUM (
  'minimal',      -- 1-2
  'mild',         -- 3-4
  'moderate',     -- 5-6
  'severe',       -- 7-8
  'very_severe'   -- 9-10
);

-- =====================================================
-- STEP 2: CREATE SYMPTOMS LIBRARY (PUBLIC SCHEMA)
-- =====================================================

-- Master library of searchable symptoms
CREATE TABLE public.symptoms_library (
  symptom_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  symptom_name TEXT NOT NULL UNIQUE,
  category public.symptom_category_enum NOT NULL,
  common_in_epilepsy BOOLEAN DEFAULT false,
  common_in_parkinsons BOOLEAN DEFAULT false,
  description TEXT,
  search_keywords TEXT[], -- For autocomplete
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast searching
CREATE INDEX idx_symptoms_search ON public.symptoms_library USING gin(search_keywords);
CREATE INDEX idx_symptoms_category ON public.symptoms_library (category);
CREATE INDEX idx_symptoms_epilepsy ON public.symptoms_library (common_in_epilepsy) WHERE common_in_epilepsy = true;
CREATE INDEX idx_symptoms_parkinsons ON public.symptoms_library (common_in_parkinsons) WHERE common_in_parkinsons = true;

-- =====================================================
-- STEP 3: PATIENT DAILY TRACKING LOGS
-- =====================================================
-- For the "Daily Check-in" feature ONLY
-- General wellness tracking done once per day

CREATE TABLE private_health_info.patient_daily_tracking_logs (
  log_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  log_date DATE NOT NULL,
  
  -- General wellness (1-10 scale)
  overall_feeling INTEGER CHECK (overall_feeling BETWEEN 1 AND 10),
  mood INTEGER CHECK (mood BETWEEN 1 AND 10),
  energy_level INTEGER CHECK (energy_level BETWEEN 1 AND 10),
  stress_level INTEGER CHECK (stress_level BETWEEN 1 AND 10),
  
  -- Sleep tracking
  sleep_quality INTEGER CHECK (sleep_quality BETWEEN 1 AND 10),
  sleep_hours NUMERIC(4,1),
  sleep_interruptions INTEGER DEFAULT 0,
  
  -- Activity tracking
  exercise_minutes INTEGER DEFAULT 0,
  exercise_type TEXT,
  
  -- Medication adherence
  all_medications_taken BOOLEAN DEFAULT true,
  
  -- Notes
  notes TEXT,
  
  -- Sharing preferences
  shared_with_clinician BOOLEAN DEFAULT true,
  visible_to_researchers BOOLEAN DEFAULT false,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  CONSTRAINT unique_daily_tracking_per_patient_date UNIQUE (patient_id, log_date)
);

CREATE INDEX idx_daily_tracking_patient ON private_health_info.patient_daily_tracking_logs(patient_id);
CREATE INDEX idx_daily_tracking_date ON private_health_info.patient_daily_tracking_logs(log_date DESC);

-- =====================================================
-- STEP 4: PATIENT SYMPTOM LOGS
-- =====================================================
-- For ad-hoc symptom logging (anytime, multiple per day)

CREATE TABLE private_health_info.patient_symptom_logs (
  symptom_log_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  logged_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Link to symptoms library OR free text
  symptom_id UUID REFERENCES public.symptoms_library(symptom_id),
  custom_symptom_name TEXT, -- If not in library
  
  severity INTEGER CHECK (severity BETWEEN 1 AND 10),
  duration_minutes INTEGER,
  
  -- Context
  notes TEXT,
  
  -- Sharing
  shared_with_clinician BOOLEAN DEFAULT true,
  visible_to_researchers BOOLEAN DEFAULT false,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  CONSTRAINT symptom_must_have_name CHECK (
    symptom_id IS NOT NULL OR custom_symptom_name IS NOT NULL
  )
);

CREATE INDEX idx_symptom_logs_patient ON private_health_info.patient_symptom_logs(patient_id);
CREATE INDEX idx_symptom_logs_time ON private_health_info.patient_symptom_logs(logged_at DESC);
CREATE INDEX idx_symptom_logs_symptom ON private_health_info.patient_symptom_logs(symptom_id);

-- =====================================================
-- STEP 5: PARKINSON'S SPECIFIC TRACKING
-- =====================================================
-- For Parkinson's patients - motor symptoms

CREATE TABLE private_health_info.parkinsons_motor_logs (
  log_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  log_date DATE NOT NULL,
  log_time TIME,
  
  -- Motor fluctuations
  motor_fluctuations_occurred BOOLEAN DEFAULT false,
  on_time_hours NUMERIC(4,1),
  off_time_hours NUMERIC(4,1),
  
  -- Motor symptoms severity (1-10)
  tremor_severity INTEGER CHECK (tremor_severity BETWEEN 1 AND 10),
  dyskinesia_severity INTEGER CHECK (dyskinesia_severity BETWEEN 1 AND 10),
  stiffness_severity INTEGER CHECK (stiffness_severity BETWEEN 1 AND 10),
  slowness_severity INTEGER CHECK (slowness_severity BETWEEN 1 AND 10),
  
  -- Freezing of gait
  freezing_episodes INTEGER DEFAULT 0,
  falls INTEGER DEFAULT 0,
  
  notes TEXT,
  shared_with_clinician BOOLEAN DEFAULT true,
  visible_to_researchers BOOLEAN DEFAULT false,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_parkinsons_motor_patient ON private_health_info.parkinsons_motor_logs(patient_id);
CREATE INDEX idx_parkinsons_motor_date ON private_health_info.parkinsons_motor_logs(log_date DESC);

-- =====================================================
-- STEP 6: SLEEP DISTURBANCES (RELATIONAL)
-- =====================================================
-- Replaces JSONB sleep_disturbances

CREATE TABLE private_health_info.sleep_disturbance_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  daily_tracking_log_id UUID REFERENCES private_health_info.patient_daily_tracking_logs(log_id) ON DELETE CASCADE,
  disturbance_type public.sleep_disturbance_enum NOT NULL,
  severity INTEGER CHECK (severity BETWEEN 1 AND 10),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_sleep_disturbances_log ON private_health_info.sleep_disturbance_logs(daily_tracking_log_id);

-- =====================================================
-- STEP 7: COGNITIVE ISSUES (RELATIONAL)
-- =====================================================

CREATE TABLE private_health_info.cognitive_issue_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  log_date DATE NOT NULL,
  issue_type public.cognitive_issue_enum NOT NULL,
  severity INTEGER CHECK (severity BETWEEN 1 AND 10),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_cognitive_issues_patient ON private_health_info.cognitive_issue_logs(patient_id);
CREATE INDEX idx_cognitive_issues_date ON private_health_info.cognitive_issue_logs(log_date DESC);

-- =====================================================
-- STEP 8: MOOD ISSUES (RELATIONAL)
-- =====================================================

CREATE TABLE private_health_info.mood_issue_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  log_date DATE NOT NULL,
  issue_type public.mood_issue_enum NOT NULL,
  severity INTEGER CHECK (severity BETWEEN 1 AND 10),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_mood_issues_patient ON private_health_info.mood_issue_logs(patient_id);
CREATE INDEX idx_mood_issues_date ON private_health_info.mood_issue_logs(log_date DESC);

-- =====================================================
-- STEP 9: AUTONOMIC SYMPTOMS (RELATIONAL)
-- =====================================================

CREATE TABLE private_health_info.autonomic_symptom_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  log_date DATE NOT NULL,
  symptom_type public.autonomic_symptom_enum NOT NULL,
  severity INTEGER CHECK (severity BETWEEN 1 AND 10),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_autonomic_symptoms_patient ON private_health_info.autonomic_symptom_logs(patient_id);
CREATE INDEX idx_autonomic_symptoms_date ON private_health_info.autonomic_symptom_logs(log_date DESC);

-- =====================================================
-- STEP 10: ADL DIFFICULTY LOGS (RELATIONAL)
-- =====================================================

CREATE TABLE private_health_info.adl_difficulty_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  log_date DATE NOT NULL,
  activity_type public.adl_type_enum NOT NULL,
  difficulty_level INTEGER CHECK (difficulty_level BETWEEN 1 AND 10),
  assistance_needed BOOLEAN DEFAULT false,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_adl_difficulty_patient ON private_health_info.adl_difficulty_logs(patient_id);
CREATE INDEX idx_adl_difficulty_date ON private_health_info.adl_difficulty_logs(log_date DESC);

-- =====================================================
-- STEP 11: GRANT PERMISSIONS
-- =====================================================

-- Enable RLS on all new tables
ALTER TABLE private_health_info.patient_daily_tracking_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE private_health_info.patient_symptom_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE private_health_info.parkinsons_motor_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE private_health_info.sleep_disturbance_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE private_health_info.cognitive_issue_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE private_health_info.mood_issue_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE private_health_info.autonomic_symptom_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE private_health_info.adl_difficulty_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Users can only see their own data
CREATE POLICY "Users can view own daily tracking"
  ON private_health_info.patient_daily_tracking_logs
  FOR SELECT
  USING (patient_id = auth.uid());

CREATE POLICY "Users can insert own daily tracking"
  ON private_health_info.patient_daily_tracking_logs
  FOR INSERT
  WITH CHECK (patient_id = auth.uid());

CREATE POLICY "Users can update own daily tracking"
  ON private_health_info.patient_daily_tracking_logs
  FOR UPDATE
  USING (patient_id = auth.uid());

CREATE POLICY "Users can delete own daily tracking"
  ON private_health_info.patient_daily_tracking_logs
  FOR DELETE
  USING (patient_id = auth.uid());

-- Repeat for symptom logs
CREATE POLICY "Users can view own symptom logs"
  ON private_health_info.patient_symptom_logs
  FOR SELECT
  USING (patient_id = auth.uid());

CREATE POLICY "Users can insert own symptom logs"
  ON private_health_info.patient_symptom_logs
  FOR INSERT
  WITH CHECK (patient_id = auth.uid());

CREATE POLICY "Users can update own symptom logs"
  ON private_health_info.patient_symptom_logs
  FOR UPDATE
  USING (patient_id = auth.uid());

CREATE POLICY "Users can delete own symptom logs"
  ON private_health_info.patient_symptom_logs
  FOR DELETE
  USING (patient_id = auth.uid());

-- Parkinsons motor logs
CREATE POLICY "Users can manage own parkinsons logs"
  ON private_health_info.parkinsons_motor_logs
  FOR ALL
  USING (patient_id = auth.uid())
  WITH CHECK (patient_id = auth.uid());

-- Symptoms library is public (read-only)
ALTER TABLE public.symptoms_library ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Symptoms library is readable by authenticated users"
  ON public.symptoms_library
  FOR SELECT
  TO authenticated
  USING (true);

-- Grant table access
GRANT SELECT, INSERT, UPDATE, DELETE ON private_health_info.patient_daily_tracking_logs TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON private_health_info.patient_symptom_logs TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON private_health_info.parkinsons_motor_logs TO authenticated;
GRANT SELECT ON public.symptoms_library TO authenticated;

-- =====================================================
-- STEP 12: SEED SYMPTOMS LIBRARY
-- =====================================================

INSERT INTO public.symptoms_library (symptom_name, category, common_in_epilepsy, common_in_parkinsons, description, search_keywords) VALUES
-- Epilepsy common symptoms
('Seizure aura', 'sensory', true, false, 'Warning sensations before a seizure', ARRAY['aura', 'warning', 'pre-seizure']),
('Post-ictal confusion', 'cognitive', true, false, 'Confusion after a seizure', ARRAY['confused', 'post-ictal', 'after seizure']),
('Headache', 'pain', true, false, 'Head pain', ARRAY['headache', 'migraine', 'head pain']),
('Fatigue', 'other', true, true, 'Extreme tiredness', ARRAY['tired', 'fatigue', 'exhausted']),
('Memory problems', 'cognitive', true, false, 'Difficulty remembering', ARRAY['memory', 'forgetful', 'amnesia']),
('Anxiety', 'mood', true, true, 'Feelings of worry or fear', ARRAY['anxious', 'worried', 'panic']),

-- Parkinson's common symptoms
('Tremor', 'motor', false, true, 'Involuntary shaking', ARRAY['tremor', 'shaking', 'trembling']),
('Rigidity', 'motor', false, true, 'Muscle stiffness', ARRAY['stiff', 'rigid', 'tight muscles']),
('Bradykinesia', 'motor', false, true, 'Slowness of movement', ARRAY['slow', 'bradykinesia', 'slow movement']),
('Postural instability', 'motor', false, true, 'Balance problems', ARRAY['balance', 'falls', 'unstable']),
('Freezing of gait', 'motor', false, true, 'Sudden inability to move feet', ARRAY['freezing', 'stuck', 'gait freeze']),
('Dyskinesia', 'motor', false, true, 'Involuntary movements', ARRAY['dyskinesia', 'involuntary movement']),
('Constipation', 'gastrointestinal', false, true, 'Difficulty with bowel movements', ARRAY['constipation', 'bowel', 'digestive']),
('Sleep disturbance', 'sleep', true, true, 'Problems sleeping', ARRAY['insomnia', 'sleep', 'restless sleep']),

-- General neurological
('Dizziness', 'sensory', true, true, 'Feeling lightheaded', ARRAY['dizzy', 'lightheaded', 'vertigo']),
('Nausea', 'gastrointestinal', true, true, 'Feeling sick to stomach', ARRAY['nausea', 'sick', 'queasy']),
('Muscle weakness', 'motor', true, false, 'Reduced muscle strength', ARRAY['weak', 'weakness', 'muscle']),
('Numbness', 'sensory', true, false, 'Loss of sensation', ARRAY['numb', 'tingling', 'pins and needles']),
('Vision changes', 'sensory', true, false, 'Changes in eyesight', ARRAY['vision', 'blurry', 'visual', 'eyesight']),
('Speech difficulties', 'motor', true, true, 'Trouble speaking', ARRAY['speech', 'slurred', 'talking difficulty']),
('Depression', 'mood', true, true, 'Persistent low mood', ARRAY['depressed', 'sad', 'low mood']);

-- =====================================================
-- DONE! Now update TypeScript types and create RPCs
-- =====================================================

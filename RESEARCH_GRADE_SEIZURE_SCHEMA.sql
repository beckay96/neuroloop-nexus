-- ========================================
-- RESEARCH-GRADE SEIZURE TRACKING SCHEMA
-- ========================================
-- Purpose: Atomic, enum-driven, fully normalized seizure tracking
-- NO JSON, NO VARCHAR ARRAYS - Only enums and linking tables
-- Date: 2025-01-06
-- Status: READY TO APPLY

BEGIN;

-- ========================================
-- 1. ENUM TYPE DEFINITIONS
-- ========================================

-- Seizure Type Enum
CREATE TYPE seizure_type_enum AS ENUM (
    'FOCAL_AWARE',
    'FOCAL_IMPAIRED',
    'FOCAL_TO_BILATERAL_TONIC_CLONIC',
    'GENERALIZED_TONIC_CLONIC',
    'GENERALIZED_ABSENCE',
    'GENERALIZED_MYOCLONIC',
    'GENERALIZED_ATONIC',
    'GENERALIZED_TONIC',
    'GENERALIZED_CLONIC',
    'UNKNOWN'
);

-- Consciousness Level Enum
CREATE TYPE consciousness_level_enum AS ENUM (
    'FULL',
    'PARTIAL',
    'NONE'
);

-- Yes/No Enum
CREATE TYPE yes_no_enum AS ENUM ('YES', 'NO');

-- Witness Role Enum
CREATE TYPE witness_role_enum AS ENUM (
    'SELF',
    'FAMILY',
    'FRIEND',
    'CLINICIAN',
    'CARER',
    'STRANGER',
    'UNKNOWN'
);

-- Location Type Enum
CREATE TYPE location_type_enum AS ENUM (
    'HOME',
    'WORK',
    'SCHOOL',
    'OUTDOORS',
    'TRANSIT',
    'CLINICAL',
    'PUBLIC_PLACE',
    'UNKNOWN'
);

-- Medication Adherence Enum
CREATE TYPE medication_adherence_enum AS ENUM (
    'TAKEN_ON_TIME',
    'LATE',
    'MISSED',
    'UNKNOWN'
);

-- Stress Level Enum (1-10 scale)
CREATE TYPE stress_level_enum AS ENUM (
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'
);

-- Rescue Medication Type Enum
CREATE TYPE rescue_medication_enum AS ENUM (
    'MIDAZOLAM',
    'DIAZEPAM',
    'LORAZEPAM',
    'CLONAZEPAM',
    'NONE',
    'OTHER'
);

-- Semiology Category Enum
CREATE TYPE semiology_category_enum AS ENUM (
    'AURA',
    'MOTOR',
    'AUTONOMIC',
    'CONSCIOUSNESS',
    'BEHAVIORAL',
    'SENSORY'
);

-- Seizure Sign Enum (ILAE-compliant)
CREATE TYPE seizure_sign_enum AS ENUM (
    'EPIGASTRIC_AURA',
    'OLFACTORY_AURA',
    'GUSTATORY_AURA',
    'VISUAL_AURA',
    'AUDITORY_AURA',
    'SOMATOSENSORY_AURA',
    'FEAR_ANXIETY_AURA',
    'DEJA_VU',
    'JAMAIS_VU',
    'AUTOMATISMS_ORAL',
    'AUTOMATISMS_MANUAL',
    'TONIC_ACTIVITY',
    'CLONIC_ACTIVITY',
    'MYOCLONIC_JERKS',
    'ATONIC_DROP',
    'HEAD_VERSION',
    'EYE_DEVIATION',
    'DYSTONIC_POSTURING',
    'HYPERMOTOR_ACTIVITY',
    'MIMETIC_AUTOMATISMS',
    'GELASTIC',
    'DACRYSTIC',
    'VOCALIZATION',
    'SPEECH_ARREST',
    'LOSS_OF_AWARENESS',
    'STARING',
    'BEHAVIORAL_ARREST',
    'AUTONOMIC_FEATURES',
    'PALLOR',
    'FLUSHING',
    'SWEATING',
    'PILOERECTION',
    'HEART_RATE_CHANGE',
    'BREATHING_CHANGE',
    'INCONTINENCE',
    'TONGUE_BITING'
);

-- Brain Region Lobe Enum
CREATE TYPE brain_lobe_enum AS ENUM (
    'TEMPORAL',
    'FRONTAL',
    'PARIETAL',
    'OCCIPITAL',
    'INSULA',
    'CINGULATE',
    'HYPOTHALAMUS',
    'BILATERAL'
);

-- Brain Subregion Enum
CREATE TYPE brain_subregion_enum AS ENUM (
    'MESIAL_TEMPORAL',
    'LATERAL_TEMPORAL',
    'ANTERIOR_TEMPORAL',
    'POSTERIOR_TEMPORAL',
    'BASAL_TEMPORAL',
    'HIPPOCAMPUS',
    'AMYGDALA',
    'PRIMARY_MOTOR_CORTEX',
    'PREMOTOR_CORTEX',
    'SUPPLEMENTARY_MOTOR_AREA',
    'BROCA_AREA',
    'PREFRONTAL_CORTEX',
    'PRIMARY_SOMATOSENSORY_CORTEX',
    'SUPERIOR_PARIETAL_LOBULE',
    'INFERIOR_PARIETAL_LOBULE',
    'PRIMARY_VISUAL_CORTEX',
    'VISUAL_ASSOCIATION_AREAS',
    'ANTERIOR_INSULA',
    'POSTERIOR_INSULA',
    'ANTERIOR_CINGULATE',
    'POSTERIOR_CINGULATE'
);

-- Laterality Enum
CREATE TYPE laterality_enum AS ENUM (
    'LEFT',
    'RIGHT',
    'BILATERAL',
    'UNKNOWN'
);

-- Probability Grade Enum
CREATE TYPE probability_grade_enum AS ENUM (
    'VERY_LOW',    -- 0-20%
    'LOW',         -- 21-40%
    'MODERATE',    -- 41-60%
    'HIGH',        -- 61-80%
    'VERY_HIGH'    -- 81-100%
);

-- Assessment Type Enum
CREATE TYPE assessment_type_enum AS ENUM (
    'FOCAL',
    'GENERALIZED',
    'SECONDARY_GENERALIZED',
    'UNKNOWN'
);

-- Trigger Type Enum
CREATE TYPE trigger_type_enum AS ENUM (
    'SLEEP_DEPRIVATION',
    'FEVER',
    'ALCOHOL',
    'MEDICATION_MISSED',
    'EMOTIONAL_STRESS',
    'PHYSICAL_STRESS',
    'FLASHING_LIGHTS',
    'MENSTRUATION',
    'ILLNESS',
    'UNKNOWN'
);

-- Trigger Strength Enum
CREATE TYPE trigger_strength_enum AS ENUM (
    'NONE',
    'WEAK',
    'MODERATE',
    'STRONG'
);

-- Post-Ictal Symptom Enum
CREATE TYPE post_ictal_symptom_enum AS ENUM (
    'CONFUSION',
    'FATIGUE',
    'HEADACHE',
    'AGITATION',
    'WEAKNESS',
    'SPEECH_DIFFICULTY',
    'MEMORY_LOSS',
    'MUSCLE_PAIN',
    'NAUSEA'
);

-- ========================================
-- 2. CORE SEIZURE LOG TABLE
-- ========================================

CREATE TABLE IF NOT EXISTS private_health_info.seizure_logs_research (
    log_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    
    -- Temporal data
    log_date DATE NOT NULL,
    log_time TIME NOT NULL,
    
    -- Classification
    seizure_type seizure_type_enum NOT NULL,
    consciousness_level consciousness_level_enum,
    
    -- Duration
    duration_seconds INTEGER, -- Measured duration
    
    -- Aura information
    aura_present yes_no_enum,
    aura_description TEXT CHECK (char_length(aura_description) <= 255),
    
    -- Witness information
    witnessed yes_no_enum,
    witness_role witness_role_enum,
    video_recorded yes_no_enum,
    
    -- Context
    location_type location_type_enum,
    
    -- Post-ictal
    post_ictal_confusion_minutes INTEGER,
    recovery_time_minutes INTEGER,
    
    -- Pre-seizure context
    sleep_hours_prior NUMERIC(4,1), -- e.g., 7.5 hours
    medication_adherence_prior medication_adherence_enum,
    stress_level stress_level_enum,
    
    -- Emergency response
    emergency_services_called yes_no_enum,
    rescue_medication_used yes_no_enum,
    rescue_medication_type rescue_medication_enum,
    hospitalized yes_no_enum,
    
    -- Research quality
    research_grade yes_no_enum DEFAULT 'YES',
    
    -- Notes (short, constrained)
    notes TEXT CHECK (char_length(notes) <= 255),
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE private_health_info.seizure_logs_research IS 'Research-grade seizure logs - atomic enums only, no JSON';

-- Indexes
CREATE INDEX IF NOT EXISTS idx_seizure_logs_research_user_id ON private_health_info.seizure_logs_research(user_id);
CREATE INDEX IF NOT EXISTS idx_seizure_logs_research_log_date ON private_health_info.seizure_logs_research(log_date);
CREATE INDEX IF NOT EXISTS idx_seizure_logs_research_seizure_type ON private_health_info.seizure_logs_research(seizure_type);

-- RLS
ALTER TABLE private_health_info.seizure_logs_research ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can manage own seizure logs" ON private_health_info.seizure_logs_research;
CREATE POLICY "Users can manage own seizure logs"
    ON private_health_info.seizure_logs_research
    FOR ALL
    USING (auth.uid() = user_id);

-- ========================================
-- 3. SEIZURE SIGN REFERENCE TABLE
-- ========================================

CREATE TABLE IF NOT EXISTS public.seizure_signs_reference (
    sign_id SERIAL PRIMARY KEY,
    sign_name seizure_sign_enum UNIQUE NOT NULL,
    category semiology_category_enum NOT NULL,
    display_name TEXT NOT NULL,
    description TEXT,
    research_code TEXT, -- ICD-10/ILAE code
    created_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE public.seizure_signs_reference IS 'Reference table for all seizure signs/semiology';

-- Insert all signs
INSERT INTO public.seizure_signs_reference (sign_name, category, display_name, description) VALUES
    ('EPIGASTRIC_AURA', 'AURA', 'Epigastric Aura', 'Rising sensation in stomach'),
    ('OLFACTORY_AURA', 'AURA', 'Olfactory Aura', 'Unpleasant smells'),
    ('VISUAL_AURA', 'AURA', 'Visual Aura', 'Flashing lights, colors'),
    ('FEAR_ANXIETY_AURA', 'AURA', 'Fear/Anxiety', 'Sudden intense fear'),
    ('DEJA_VU', 'AURA', 'Déjà Vu', 'Feeling of familiarity'),
    ('SOMATOSENSORY_AURA', 'AURA', 'Somatosensory Aura', 'Tingling, numbness'),
    ('AUTOMATISMS_ORAL', 'MOTOR', 'Oral Automatisms', 'Lip smacking, chewing'),
    ('AUTOMATISMS_MANUAL', 'MOTOR', 'Manual Automatisms', 'Hand fumbling, picking'),
    ('TONIC_ACTIVITY', 'MOTOR', 'Tonic Activity', 'Muscle stiffening'),
    ('CLONIC_ACTIVITY', 'MOTOR', 'Clonic Activity', 'Rhythmic jerking'),
    ('HEAD_VERSION', 'MOTOR', 'Head Version', 'Forced head turning'),
    ('DYSTONIC_POSTURING', 'MOTOR', 'Dystonic Posturing', 'Twisted limb posturing'),
    ('MIMETIC_AUTOMATISMS', 'MOTOR', 'Mimetic Automatisms', 'Facial expressions'),
    ('GELASTIC', 'BEHAVIORAL', 'Gelastic (Laughing)', 'Inappropriate laughing'),
    ('VOCALIZATION', 'MOTOR', 'Vocalization', 'Grunting, moaning'),
    ('LOSS_OF_AWARENESS', 'CONSCIOUSNESS', 'Loss of Awareness', 'Blank stare, unresponsive'),
    ('AUTONOMIC_FEATURES', 'AUTONOMIC', 'Autonomic Features', 'Heart rate, breathing changes'),
    ('TONGUE_BITING', 'MOTOR', 'Tongue Biting', 'Biting tongue during seizure'),
    ('INCONTINENCE', 'AUTONOMIC', 'Incontinence', 'Loss of bladder/bowel control')
ON CONFLICT (sign_name) DO NOTHING;

-- ========================================
-- 4. SEIZURE LOG ↔ SIGN LINKING TABLE
-- ========================================

CREATE TABLE IF NOT EXISTS private_health_info.seizure_log_signs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    log_id UUID NOT NULL REFERENCES private_health_info.seizure_logs_research(log_id) ON DELETE CASCADE,
    sign_id INTEGER NOT NULL REFERENCES public.seizure_signs_reference(sign_id),
    present yes_no_enum DEFAULT 'YES',
    observer_rank witness_role_enum,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(log_id, sign_id)
);

COMMENT ON TABLE private_health_info.seizure_log_signs IS 'Many-to-many: seizure logs to signs';

-- Indexes
CREATE INDEX IF NOT EXISTS idx_seizure_log_signs_log_id ON private_health_info.seizure_log_signs(log_id);
CREATE INDEX IF NOT EXISTS idx_seizure_log_signs_sign_id ON private_health_info.seizure_log_signs(sign_id);

-- RLS
ALTER TABLE private_health_info.seizure_log_signs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can manage own seizure log signs" ON private_health_info.seizure_log_signs;
CREATE POLICY "Users can manage own seizure log signs"
    ON private_health_info.seizure_log_signs
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM private_health_info.seizure_logs_research
            WHERE seizure_logs_research.log_id = seizure_log_signs.log_id
            AND seizure_logs_research.user_id = auth.uid()
        )
    );

-- ========================================
-- 5. BRAIN REGION REFERENCE TABLE
-- ========================================

CREATE TABLE IF NOT EXISTS public.brain_regions_reference (
    region_id SERIAL PRIMARY KEY,
    lobe brain_lobe_enum NOT NULL,
    subregion brain_subregion_enum,
    laterality laterality_enum DEFAULT 'BILATERAL',
    display_name TEXT NOT NULL,
    function_description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE public.brain_regions_reference IS 'Reference table for brain regions';

-- Insert brain regions
INSERT INTO public.brain_regions_reference (lobe, subregion, display_name, function_description) VALUES
    ('TEMPORAL', NULL, 'Temporal Lobe', 'Memory, auditory processing, language'),
    ('TEMPORAL', 'MESIAL_TEMPORAL', 'Mesial Temporal', 'Memory formation, emotional processing'),
    ('TEMPORAL', 'HIPPOCAMPUS', 'Hippocampus', 'Memory consolidation'),
    ('TEMPORAL', 'AMYGDALA', 'Amygdala', 'Emotional processing, fear'),
    ('FRONTAL', NULL, 'Frontal Lobe', 'Motor control, executive functions'),
    ('FRONTAL', 'SUPPLEMENTARY_MOTOR_AREA', 'Supplementary Motor Area', 'Complex motor sequences'),
    ('PARIETAL', NULL, 'Parietal Lobe', 'Sensory processing, spatial awareness'),
    ('PARIETAL', 'PRIMARY_SOMATOSENSORY_CORTEX', 'Primary Somatosensory Cortex', 'Touch, pressure sensation'),
    ('OCCIPITAL', NULL, 'Occipital Lobe', 'Visual processing'),
    ('INSULA', NULL, 'Insula', 'Interoception, autonomic control'),
    ('CINGULATE', NULL, 'Cingulate Cortex', 'Emotional regulation, motor control'),
    ('HYPOTHALAMUS', NULL, 'Hypothalamus', 'Autonomic control, hormonal regulation')
ON CONFLICT DO NOTHING;

-- ========================================
-- 6. SIGN ↔ BRAIN REGION PROBABILITY MAPPING
-- ========================================

CREATE TABLE IF NOT EXISTS public.sign_brain_region_mapping (
    id SERIAL PRIMARY KEY,
    sign_id INTEGER NOT NULL REFERENCES public.seizure_signs_reference(sign_id),
    region_id INTEGER NOT NULL REFERENCES public.brain_regions_reference(region_id),
    probability_grade probability_grade_enum NOT NULL,
    probability_percentage INTEGER CHECK (probability_percentage BETWEEN 0 AND 100),
    research_basis TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(sign_id, region_id)
);

COMMENT ON TABLE public.sign_brain_region_mapping IS 'Research-based probability mapping: signs to brain regions';

-- Insert probability mappings (based on research data)
INSERT INTO public.sign_brain_region_mapping (sign_id, region_id, probability_grade, probability_percentage, research_basis) VALUES
    -- Epigastric Aura → Temporal (83%)
    ((SELECT sign_id FROM public.seizure_signs_reference WHERE sign_name = 'EPIGASTRIC_AURA'),
     (SELECT region_id FROM public.brain_regions_reference WHERE lobe = 'TEMPORAL' AND subregion IS NULL),
     'VERY_HIGH', 83, 'PMC9156627'),
    -- Epigastric Aura → Mesial Temporal (61%)
    ((SELECT sign_id FROM public.seizure_signs_reference WHERE sign_name = 'EPIGASTRIC_AURA'),
     (SELECT region_id FROM public.brain_regions_reference WHERE subregion = 'MESIAL_TEMPORAL'),
     'HIGH', 61, 'PMC9156627'),
    -- Tonic Activity → Frontal (54%)
    ((SELECT sign_id FROM public.seizure_signs_reference WHERE sign_name = 'TONIC_ACTIVITY'),
     (SELECT region_id FROM public.brain_regions_reference WHERE lobe = 'FRONTAL' AND subregion IS NULL),
     'MODERATE', 54, 'PMC9156627'),
    -- Visual Aura → Occipital (75%)
    ((SELECT sign_id FROM public.seizure_signs_reference WHERE sign_name = 'VISUAL_AURA'),
     (SELECT region_id FROM public.brain_regions_reference WHERE lobe = 'OCCIPITAL'),
     'HIGH', 75, 'PMC9156627')
ON CONFLICT (sign_id, region_id) DO NOTHING;

-- ========================================
-- 7. SEIZURE LOG ↔ BRAIN REGION (Calculated)
-- ========================================

CREATE TABLE IF NOT EXISTS private_health_info.seizure_log_brain_regions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    log_id UUID NOT NULL REFERENCES private_health_info.seizure_logs_research(log_id) ON DELETE CASCADE,
    region_id INTEGER NOT NULL REFERENCES public.brain_regions_reference(region_id),
    calculated_probability INTEGER CHECK (calculated_probability BETWEEN 0 AND 100),
    probability_grade probability_grade_enum,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(log_id, region_id)
);

COMMENT ON TABLE private_health_info.seizure_log_brain_regions IS 'Calculated brain region probabilities for each seizure log';

-- RLS
ALTER TABLE private_health_info.seizure_log_brain_regions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own brain region analysis" ON private_health_info.seizure_log_brain_regions;
CREATE POLICY "Users can view own brain region analysis"
    ON private_health_info.seizure_log_brain_regions
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM private_health_info.seizure_logs_research
            WHERE seizure_logs_research.log_id = seizure_log_brain_regions.log_id
            AND seizure_logs_research.user_id = auth.uid()
        )
    );

-- ========================================
-- 8. GENERALIZED ASSESSMENT TABLE
-- ========================================

CREATE TABLE IF NOT EXISTS private_health_info.seizure_generalized_assessment (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    log_id UUID NOT NULL UNIQUE REFERENCES private_health_info.seizure_logs_research(log_id) ON DELETE CASCADE,
    assessment_type assessment_type_enum NOT NULL,
    classifier_basis TEXT CHECK (char_length(classifier_basis) <= 255),
    confidence_score INTEGER CHECK (confidence_score BETWEEN 0 AND 100),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE private_health_info.seizure_generalized_assessment IS 'Automated generalized vs focal assessment';

-- RLS
ALTER TABLE private_health_info.seizure_generalized_assessment ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own assessments" ON private_health_info.seizure_generalized_assessment;
CREATE POLICY "Users can view own assessments"
    ON private_health_info.seizure_generalized_assessment
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM private_health_info.seizure_logs_research
            WHERE seizure_logs_research.log_id = seizure_generalized_assessment.log_id
            AND seizure_logs_research.user_id = auth.uid()
        )
    );

-- ========================================
-- 9. TRIGGER REFERENCE TABLE
-- ========================================

CREATE TABLE IF NOT EXISTS public.seizure_triggers_reference (
    trigger_id SERIAL PRIMARY KEY,
    trigger_type trigger_type_enum UNIQUE NOT NULL,
    display_name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO public.seizure_triggers_reference (trigger_type, display_name, description) VALUES
    ('SLEEP_DEPRIVATION', 'Sleep Deprivation', 'Lack of adequate sleep'),
    ('FEVER', 'Fever', 'Elevated body temperature'),
    ('ALCOHOL', 'Alcohol', 'Alcohol consumption'),
    ('MEDICATION_MISSED', 'Missed Medication', 'Missed or late medication dose'),
    ('EMOTIONAL_STRESS', 'Emotional Stress', 'Psychological stress or anxiety'),
    ('FLASHING_LIGHTS', 'Flashing Lights', 'Photosensitive trigger'),
    ('MENSTRUATION', 'Menstruation', 'Menstrual cycle related')
ON CONFLICT (trigger_type) DO NOTHING;

-- ========================================
-- 10. SEIZURE LOG ↔ TRIGGER LINKING TABLE
-- ========================================

CREATE TABLE IF NOT EXISTS private_health_info.seizure_log_triggers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    log_id UUID NOT NULL REFERENCES private_health_info.seizure_logs_research(log_id) ON DELETE CASCADE,
    trigger_id INTEGER NOT NULL REFERENCES public.seizure_triggers_reference(trigger_id),
    trigger_strength trigger_strength_enum,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(log_id, trigger_id)
);

-- RLS
ALTER TABLE private_health_info.seizure_log_triggers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can manage own triggers" ON private_health_info.seizure_log_triggers;
CREATE POLICY "Users can manage own triggers"
    ON private_health_info.seizure_log_triggers
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM private_health_info.seizure_logs_research
            WHERE seizure_logs_research.log_id = seizure_log_triggers.log_id
            AND seizure_logs_research.user_id = auth.uid()
        )
    );

-- ========================================
-- 11. POST-ICTAL SYMPTOMS LINKING TABLE
-- ========================================

CREATE TABLE IF NOT EXISTS private_health_info.seizure_log_post_ictal_symptoms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    log_id UUID NOT NULL REFERENCES private_health_info.seizure_logs_research(log_id) ON DELETE CASCADE,
    symptom post_ictal_symptom_enum NOT NULL,
    severity INTEGER CHECK (severity BETWEEN 1 AND 10),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(log_id, symptom)
);

-- RLS
ALTER TABLE private_health_info.seizure_log_post_ictal_symptoms ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can manage own post-ictal symptoms" ON private_health_info.seizure_log_post_ictal_symptoms;
CREATE POLICY "Users can manage own post-ictal symptoms"
    ON private_health_info.seizure_log_post_ictal_symptoms
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM private_health_info.seizure_logs_research
            WHERE seizure_logs_research.log_id = seizure_log_post_ictal_symptoms.log_id
            AND seizure_logs_research.user_id = auth.uid()
        )
    );

COMMIT;

-- ========================================
-- VERIFICATION QUERIES
-- ========================================

-- Check all enums created:
-- SELECT typname FROM pg_type WHERE typname LIKE '%enum%';

-- Check all tables:
-- SELECT table_name FROM information_schema.tables 
-- WHERE table_name LIKE '%seizure%' OR table_name LIKE '%brain%';

-- Test query: Get seizure with all signs and brain regions
-- SELECT 
--     sl.*,
--     array_agg(DISTINCT ssr.display_name) as signs,
--     array_agg(DISTINCT brr.display_name) as brain_regions
-- FROM private_health_info.seizure_logs_research sl
-- LEFT JOIN private_health_info.seizure_log_signs sls ON sl.log_id = sls.log_id
-- LEFT JOIN public.seizure_signs_reference ssr ON sls.sign_id = ssr.sign_id
-- LEFT JOIN private_health_info.seizure_log_brain_regions slbr ON sl.log_id = slbr.log_id
-- LEFT JOIN public.brain_regions_reference brr ON slbr.region_id = brr.region_id
-- WHERE sl.user_id = auth.uid()
-- GROUP BY sl.log_id;

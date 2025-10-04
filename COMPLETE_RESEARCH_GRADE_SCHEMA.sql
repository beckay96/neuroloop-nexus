-- ============================================================================
-- NEUROLOOP NEXUS - RESEARCH-GRADE SCHEMA (PART 1: ENUMS)
-- ============================================================================
-- FHIR/HL7 Aligned, Research Compliant, HIPAA Secure
-- ============================================================================

-- User & Profile Enums
CREATE TYPE user_type_enum AS ENUM ('patient', 'carer', 'clinician', 'researcher', 'admin');
CREATE TYPE gender_enum AS ENUM ('male', 'female', 'non_binary', 'other', 'prefer_not_to_say');
CREATE TYPE relationship_enum AS ENUM ('parent', 'spouse', 'partner', 'child', 'sibling', 'friend', 'caregiver', 'other');

-- Seizure Related Enums (FHIR/ILAE aligned)
CREATE TYPE seizure_type_enum AS ENUM (
    'generalized_tonic_clonic',
    'focal_aware',
    'focal_impaired_awareness',
    'focal_to_bilateral_tonic_clonic',
    'absence',
    'myoclonic',
    'atonic',
    'tonic',
    'clonic',
    'epileptic_spasm',
    'unknown'
);

CREATE TYPE consciousness_level_enum AS ENUM (
    'fully_conscious',
    'impaired_awareness',
    'loss_of_consciousness',
    'confusion',
    'unknown'
);

CREATE TYPE seizure_trigger_enum AS ENUM (
    'stress',
    'sleep_deprivation',
    'missed_medication',
    'alcohol',
    'illness',
    'menstruation',
    'flashing_lights',
    'heat',
    'dehydration',
    'exercise',
    'unknown',
    'none_identified'
);

-- Medication Enums
CREATE TYPE medication_frequency_enum AS ENUM (
    'once_daily',
    'twice_daily',
    'three_times_daily',
    'four_times_daily',
    'every_other_day',
    'weekly',
    'as_needed',
    'other'
);

CREATE TYPE medication_adherence_enum AS ENUM (
    'taken_on_time',
    'taken_late',
    'missed',
    'double_dose',
    'reduced_dose'
);

CREATE TYPE side_effect_severity_enum AS ENUM (
    'none',
    'mild',
    'moderate',
    'severe',
    'life_threatening'
);

-- Symptom Enums
CREATE TYPE symptom_type_enum AS ENUM (
    'headache',
    'dizziness',
    'nausea',
    'fatigue',
    'tremor',
    'numbness',
    'tingling',
    'vision_changes',
    'balance_issues',
    'cognitive_fog',
    'memory_issues',
    'mood_changes',
    'sleep_disturbance',
    'pain',
    'weakness',
    'other'
);

CREATE TYPE body_location_enum AS ENUM (
    'head',
    'face',
    'neck',
    'chest',
    'abdomen',
    'back',
    'left_arm',
    'right_arm',
    'left_leg',
    'right_leg',
    'left_hand',
    'right_hand',
    'generalized',
    'other'
);

-- Menstrual Cycle Enums
CREATE TYPE menstrual_flow_enum AS ENUM (
    'spotting',
    'light',
    'moderate',
    'heavy',
    'very_heavy'
);

CREATE TYPE menstrual_phase_enum AS ENUM (
    'menstrual',
    'follicular',
    'ovulation',
    'luteal'
);

-- Mood & Mental Health Enums
CREATE TYPE mood_type_enum AS ENUM (
    'very_poor',
    'poor',
    'neutral',
    'good',
    'very_good'
);

CREATE TYPE energy_level_enum AS ENUM (
    'exhausted',
    'low',
    'moderate',
    'high',
    'very_high'
);

CREATE TYPE sleep_quality_enum AS ENUM (
    'very_poor',
    'poor',
    'fair',
    'good',
    'excellent'
);

-- Tracking Feature Enum
CREATE TYPE tracking_feature_enum AS ENUM (
    'seizure',
    'tremor',
    'gait',
    'menstruation',
    'temperature',
    'mood',
    'energy',
    'sleep',
    'symptoms',
    'medication',
    'heart_rate',
    'blood_pressure',
    'weight',
    'exercise'
);

-- Research Consent Enums
CREATE TYPE research_data_type_enum AS ENUM (
    'seizure_data',
    'medication_data',
    'symptom_data',
    'menstrual_data',
    'wearable_data',
    'genetic_data',
    'imaging_data',
    'location_data',
    'demographic_data',
    'all_data'
);

CREATE TYPE consent_status_enum AS ENUM (
    'pending',
    'active',
    'withdrawn',
    'expired'
);

-- Connection & Relationship Enums
CREATE TYPE connection_status_enum AS ENUM (
    'pending',
    'active',
    'inactive',
    'rejected',
    'expired'
);

-- Wearable Device Enums
CREATE TYPE device_type_enum AS ENUM (
    'smartwatch',
    'fitness_tracker',
    'eeg_headband',
    'continuous_glucose_monitor',
    'heart_rate_monitor',
    'seizure_detection_device',
    'other'
);

CREATE TYPE device_data_type_enum AS ENUM (
    'heart_rate',
    'heart_rate_variability',
    'blood_oxygen',
    'sleep_stages',
    'steps',
    'activity_level',
    'skin_temperature',
    'eeg_signal',
    'seizure_detection',
    'fall_detection',
    'location',
    'other'
);

-- Age Range for Research (anonymized)
CREATE TYPE age_range_enum AS ENUM (
    '0_4',
    '5_9',
    '10_14',
    '15_19',
    '20_24',
    '25_29',
    '30_34',
    '35_39',
    '40_44',
    '45_49',
    '50_54',
    '55_59',
    '60_64',
    '65_69',
    '70_74',
    '75_79',
    '80_plus'
);

-- Geographic Region (anonymized for research)
CREATE TYPE geographic_region_enum AS ENUM (
    'north_america',
    'south_america',
    'europe',
    'asia',
    'africa',
    'oceania',
    'unknown'
);

-- ============================================================================
-- PART 2: CORE & REFERENCE TABLES
-- ============================================================================

-- Conditions (reference table with FHIR coding support)
CREATE TABLE public.conditions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    category TEXT,
    description TEXT,
    snomed_code TEXT,
    icd10_code TEXT,
    tracking_features_array tracking_feature_enum[],
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Medications (reference table with FHIR RxNorm support)
CREATE TABLE public.medications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    generic_name TEXT,
    category TEXT,
    rxnorm_code TEXT,
    atc_code TEXT,
    common_dosages TEXT,
    contraindications TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- USER PROFILES
-- ============================================================================

CREATE TABLE public.patient_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    first_name TEXT,
    last_name TEXT,
    date_of_birth DATE,
    gender gender_enum,
    timezone TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.carer_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    first_name TEXT,
    last_name TEXT,
    relationship relationship_enum,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    user_type user_type_enum NOT NULL,
    onboarding_completed BOOLEAN DEFAULT FALSE,
    research_user_id UUID DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- ONBOARDING
-- ============================================================================

CREATE TABLE public.patient_onboarding_data (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    selected_conditions UUID[],
    track_menstrual_cycle BOOLEAN DEFAULT FALSE,
    share_research_data BOOLEAN DEFAULT FALSE,
    research_data_types research_data_type_enum[],
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- RESEARCH CONSENT (Granular per data type)
-- ============================================================================

CREATE TABLE public.research_consent (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    data_type research_data_type_enum NOT NULL,
    consent_status consent_status_enum DEFAULT 'pending',
    consent_given_at TIMESTAMPTZ,
    consent_withdrawn_at TIMESTAMPTZ,
    consent_version TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, data_type)
);

-- ============================================================================
-- USER CONDITIONS & MEDICATIONS
-- ============================================================================

CREATE TABLE public.user_conditions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    condition_id UUID NOT NULL REFERENCES public.conditions(id) ON DELETE CASCADE,
    diagnosis_date DATE,
    severity INT CHECK (severity BETWEEN 1 AND 5),
    tracking_features_enabled tracking_feature_enum[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, condition_id)
);

CREATE TABLE public.user_medications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    medication_id UUID REFERENCES public.medications(id) ON DELETE SET NULL,
    dosage_amount DECIMAL,
    dosage_unit TEXT,
    frequency medication_frequency_enum,
    start_date DATE,
    end_date DATE,
    prescriber_name TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- SEIZURE TRACKING (Research-Grade)
-- ============================================================================

CREATE TABLE public.seizure_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    event_date DATE NOT NULL,
    event_time TIME,
    seizure_type seizure_type_enum NOT NULL,
    duration_seconds INT,
    consciousness_level consciousness_level_enum,
    
    -- Pre-ictal (before seizure)
    aura_present BOOLEAN,
    aura_description TEXT,
    pre_ictal_symptoms symptom_type_enum[],
    
    -- Ictal (during seizure)
    witnessed BOOLEAN,
    witness_name TEXT,
    video_recorded BOOLEAN,
    location_type TEXT,
    
    -- Post-ictal (after seizure)
    post_ictal_confusion_minutes INT,
    post_ictal_symptoms symptom_type_enum[],
    recovery_time_minutes INT,
    
    -- Triggers & Context
    identified_triggers seizure_trigger_enum[],
    sleep_hours_prior DECIMAL,
    medication_adherence_prior medication_adherence_enum,
    stress_level INT CHECK (stress_level BETWEEN 1 AND 10),
    
    -- Medical response
    emergency_services_called BOOLEAN,
    rescue_medication_used BOOLEAN,
    rescue_medication_name TEXT,
    hospitalized BOOLEAN,
    
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- MEDICATION TRACKING (Research-Grade)
-- ============================================================================

CREATE TABLE public.medication_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    user_medication_id UUID REFERENCES public.user_medications(id) ON DELETE SET NULL,
    log_date DATE NOT NULL,
    log_time TIME,
    
    adherence_status medication_adherence_enum NOT NULL,
    dosage_amount DECIMAL,
    dosage_unit TEXT,
    
    -- Adherence tracking
    planned_time TIME,
    actual_time TIME,
    missed_reason TEXT,
    
    -- Side effects
    side_effects_present BOOLEAN,
    side_effect_types symptom_type_enum[],
    side_effect_severity side_effect_severity_enum,
    
    -- Clinical data (if available)
    plasma_level DECIMAL,
    plasma_level_unit TEXT,
    
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- SYMPTOM TRACKING (Research-Grade)
-- ============================================================================

CREATE TABLE public.symptom_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    log_date DATE NOT NULL,
    log_time TIME,
    
    symptom_type symptom_type_enum NOT NULL,
    severity INT CHECK (severity BETWEEN 1 AND 10) NOT NULL,
    duration_minutes INT,
    
    -- Location
    body_locations body_location_enum[],
    
    -- Impact
    impact_on_daily_activities INT CHECK (impact_on_daily_activities BETWEEN 1 AND 10),
    work_school_affected BOOLEAN,
    
    -- Management
    relief_methods_tried TEXT[],
    relief_effectiveness INT CHECK (relief_effectiveness BETWEEN 1 AND 10),
    
    -- Context
    identified_triggers seizure_trigger_enum[],
    
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- MENSTRUAL CYCLE TRACKING (Research-Grade)
-- ============================================================================

CREATE TABLE public.menstrual_cycle_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    cycle_start_date DATE NOT NULL,
    cycle_end_date DATE,
    cycle_length_days INT,
    
    -- Flow tracking
    flow_intensity menstrual_flow_enum,
    cycle_phase menstrual_phase_enum,
    
    -- Symptoms
    symptoms symptom_type_enum[],
    symptom_severity INT CHECK (symptom_severity BETWEEN 1 AND 10),
    
    -- Seizure correlation
    seizure_count_during_cycle INT DEFAULT 0,
    seizure_clustered_around_menstruation BOOLEAN,
    catamenial_pattern_suspected BOOLEAN,
    
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- MOOD, SLEEP & WELLNESS TRACKING
-- ============================================================================

CREATE TABLE public.daily_wellness_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    log_date DATE NOT NULL,
    
    -- Mood
    mood mood_type_enum,
    mood_notes TEXT,
    
    -- Energy
    energy_level energy_level_enum,
    
    -- Sleep
    sleep_quality sleep_quality_enum,
    sleep_hours DECIMAL,
    sleep_interruptions INT,
    
    -- Activity
    exercise_minutes INT,
    exercise_type TEXT,
    
    -- Stress
    stress_level INT CHECK (stress_level BETWEEN 1 AND 10),
    
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, log_date)
);

-- ============================================================================
-- WEARABLE DEVICE DATA
-- ============================================================================

CREATE TABLE public.wearable_devices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    device_type device_type_enum NOT NULL,
    device_name TEXT,
    manufacturer TEXT,
    model TEXT,
    serial_number TEXT,
    connected_at TIMESTAMPTZ DEFAULT NOW(),
    last_sync_at TIMESTAMPTZ,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.wearable_data_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    device_id UUID REFERENCES public.wearable_devices(id) ON DELETE CASCADE,
    data_type device_data_type_enum NOT NULL,
    recorded_at TIMESTAMPTZ NOT NULL,
    
    -- Numeric values
    value_numeric DECIMAL,
    value_unit TEXT,
    
    -- Text values
    value_text TEXT,
    
    -- Metadata
    confidence_score DECIMAL,
    data_quality_flag TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_wearable_data_user_type ON public.wearable_data_logs(user_id, data_type, recorded_at DESC);

-- ============================================================================
-- RELATIONSHIPS
-- ============================================================================

CREATE TABLE public.carer_relationships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    carer_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    patient_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    relationship_type relationship_enum,
    status connection_status_enum DEFAULT 'pending',
    requested_at TIMESTAMPTZ DEFAULT NOW(),
    approved_at TIMESTAMPTZ,
    UNIQUE(carer_user_id, patient_user_id)
);

CREATE TABLE public.patient_clinician_connections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    clinician_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    status connection_status_enum DEFAULT 'active',
    connected_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(patient_id, clinician_id)
);

-- ============================================================================
-- PREFERENCES
-- ============================================================================

CREATE TABLE public.daily_tracking_preferences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    tracking_types tracking_feature_enum[],
    notification_enabled BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- GAMIFICATION
-- ============================================================================

CREATE TABLE public.user_achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    achievement_code TEXT NOT NULL,
    unlocked_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- AUDIT LOG (HIPAA)
-- ============================================================================

CREATE TABLE public.audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    table_name TEXT NOT NULL,
    record_id TEXT,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- RESEARCH TABLES (ANONYMIZED DATA)
-- ============================================================================

-- Research user mapping (encrypted separately)
CREATE TABLE public.research_user_mapping (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    research_user_id UUID NOT NULL UNIQUE DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Research seizure data (anonymized)
CREATE TABLE public.research_seizure_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    research_user_id UUID NOT NULL,
    age_range age_range_enum,
    gender gender_enum,
    geographic_region geographic_region_enum,
    
    -- Anonymized temporal data (days from baseline)
    days_since_baseline INT,
    time_of_day_category TEXT, -- morning/afternoon/evening/night
    
    -- Clinical data
    seizure_type seizure_type_enum,
    duration_seconds INT,
    consciousness_level consciousness_level_enum,
    aura_present BOOLEAN,
    witnessed BOOLEAN,
    post_ictal_confusion_minutes INT,
    
    -- Context (anonymized)
    identified_triggers seizure_trigger_enum[],
    sleep_hours_prior DECIMAL,
    medication_adherence_prior medication_adherence_enum,
    stress_level_category TEXT, -- low/medium/high
    
    -- Medical response
    emergency_services_called BOOLEAN,
    rescue_medication_used BOOLEAN,
    hospitalized BOOLEAN,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Research medication adherence (anonymized)
CREATE TABLE public.research_medication_adherence (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    research_user_id UUID NOT NULL,
    age_range age_range_enum,
    gender gender_enum,
    
    days_since_baseline INT,
    medication_generic_name TEXT,
    medication_category TEXT,
    
    adherence_status medication_adherence_enum,
    side_effects_present BOOLEAN,
    side_effect_severity side_effect_severity_enum,
    plasma_level DECIMAL,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Research symptom patterns (anonymized)
CREATE TABLE public.research_symptom_patterns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    research_user_id UUID NOT NULL,
    age_range age_range_enum,
    gender gender_enum,
    
    days_since_baseline INT,
    symptom_type symptom_type_enum,
    severity INT,
    duration_minutes INT,
    identified_triggers seizure_trigger_enum[],
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Research menstrual-seizure correlation (anonymized)
CREATE TABLE public.research_menstrual_seizure_correlation (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    research_user_id UUID NOT NULL,
    age_range age_range_enum,
    
    cycle_day INT,
    cycle_phase menstrual_phase_enum,
    seizure_occurred BOOLEAN,
    seizure_type seizure_type_enum,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- INDEXES
-- ============================================================================

CREATE INDEX idx_patient_profiles_user ON public.patient_profiles(user_id);
CREATE INDEX idx_seizure_logs_user_date ON public.seizure_logs(user_id, event_date DESC);
CREATE INDEX idx_medication_logs_user_date ON public.medication_logs(user_id, log_date DESC);
CREATE INDEX idx_symptom_logs_user_date ON public.symptom_logs(user_id, log_date DESC);
CREATE INDEX idx_menstrual_logs_user ON public.menstrual_cycle_logs(user_id, cycle_start_date DESC);
CREATE INDEX idx_wellness_logs_user_date ON public.daily_wellness_logs(user_id, log_date DESC);
CREATE INDEX idx_audit_log_user ON public.audit_log(user_id, created_at DESC);
CREATE INDEX idx_audit_log_table ON public.audit_log(table_name, created_at DESC);
CREATE INDEX idx_research_consent_user ON public.research_consent(user_id, data_type);

-- ============================================================================
-- AUDIT TRIGGER FUNCTION
-- ============================================================================

CREATE OR REPLACE FUNCTION public.audit_trigger_function()
RETURNS TRIGGER AS $$
DECLARE
    jwt_claims JSONB := nullif(current_setting('request.jwt.claims', true), '')::JSONB;
    acting_user TEXT := COALESCE(nullif(current_setting('app.current_user_id', true), ''), jwt_claims ->> 'sub');
BEGIN
    INSERT INTO public.audit_log (user_id, action, table_name, record_id, ip_address, user_agent, created_at)
    VALUES (
        CASE WHEN acting_user IS NOT NULL THEN acting_user::UUID ELSE NULL END,
        TG_OP,
        TG_TABLE_NAME,
        COALESCE((NEW).id::TEXT, (OLD).id::TEXT),
        inet_client_addr(),
        jwt_claims ->> 'user_agent',
        NOW()
    );
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Attach to PHI tables
CREATE TRIGGER audit_patient_profiles AFTER INSERT OR UPDATE OR DELETE ON public.patient_profiles FOR EACH ROW EXECUTE FUNCTION public.audit_trigger_function();
CREATE TRIGGER audit_seizure_logs AFTER INSERT OR UPDATE OR DELETE ON public.seizure_logs FOR EACH ROW EXECUTE FUNCTION public.audit_trigger_function();
CREATE TRIGGER audit_medication_logs AFTER INSERT OR UPDATE OR DELETE ON public.medication_logs FOR EACH ROW EXECUTE FUNCTION public.audit_trigger_function();
CREATE TRIGGER audit_symptom_logs AFTER INSERT OR UPDATE OR DELETE ON public.symptom_logs FOR EACH ROW EXECUTE FUNCTION public.audit_trigger_function();
CREATE TRIGGER audit_menstrual_logs AFTER INSERT OR UPDATE OR DELETE ON public.menstrual_cycle_logs FOR EACH ROW EXECUTE FUNCTION public.audit_trigger_function();
CREATE TRIGGER audit_user_conditions AFTER INSERT OR UPDATE OR DELETE ON public.user_conditions FOR EACH ROW EXECUTE FUNCTION public.audit_trigger_function();
CREATE TRIGGER audit_user_medications AFTER INSERT OR UPDATE OR DELETE ON public.user_medications FOR EACH ROW EXECUTE FUNCTION public.audit_trigger_function();

-- ============================================================================
-- RESEARCH ANONYMIZATION TRIGGERS (with consent checking)
-- ============================================================================

CREATE OR REPLACE FUNCTION public.anonymize_to_research_seizure()
RETURNS TRIGGER AS $$
DECLARE
    has_consent BOOLEAN;
    research_id UUID;
    user_age INT;
    user_gender gender_enum;
    age_bucket age_range_enum;
BEGIN
    -- Check if user consented to seizure data research
    SELECT consent_status = 'active' INTO has_consent
    FROM public.research_consent
    WHERE user_id = NEW.user_id AND data_type = 'seizure_data';
    
    IF NOT has_consent THEN
        RETURN NEW;
    END IF;
    
    -- Get research_user_id
    SELECT research_user_id INTO research_id FROM public.profiles WHERE id = NEW.user_id;
    
    -- Get demographics
    SELECT 
        EXTRACT(YEAR FROM AGE(date_of_birth))::INT,
        gender 
    INTO user_age, user_gender
    FROM public.patient_profiles WHERE user_id = NEW.user_id;
    
    -- Calculate age bucket
    age_bucket := CASE
        WHEN user_age < 5 THEN '0_4'::age_range_enum
        WHEN user_age < 10 THEN '5_9'::age_range_enum
        WHEN user_age < 15 THEN '10_14'::age_range_enum
        WHEN user_age < 20 THEN '15_19'::age_range_enum
        WHEN user_age < 25 THEN '20_24'::age_range_enum
        WHEN user_age < 30 THEN '25_29'::age_range_enum
        WHEN user_age < 35 THEN '30_34'::age_range_enum
        WHEN user_age < 40 THEN '35_39'::age_range_enum
        WHEN user_age < 45 THEN '40_44'::age_range_enum
        WHEN user_age < 50 THEN '45_49'::age_range_enum
        WHEN user_age < 55 THEN '50_54'::age_range_enum
        WHEN user_age < 60 THEN '55_59'::age_range_enum
        WHEN user_age < 65 THEN '60_64'::age_range_enum
        WHEN user_age < 70 THEN '65_69'::age_range_enum
        WHEN user_age < 75 THEN '70_74'::age_range_enum
        WHEN user_age < 80 THEN '75_79'::age_range_enum
        ELSE '80_plus'::age_range_enum
    END;
    
    -- Insert anonymized data
    INSERT INTO public.research_seizure_events (
        research_user_id, age_range, gender, geographic_region,
        seizure_type, duration_seconds, consciousness_level,
        aura_present, witnessed, post_ictal_confusion_minutes,
        identified_triggers, sleep_hours_prior, medication_adherence_prior,
        emergency_services_called, rescue_medication_used, hospitalized
    ) VALUES (
        research_id, age_bucket, user_gender, 'unknown'::geographic_region_enum,
        NEW.seizure_type, NEW.duration_seconds, NEW.consciousness_level,
        NEW.aura_present, NEW.witnessed, NEW.post_ictal_confusion_minutes,
        NEW.identified_triggers, NEW.sleep_hours_prior, NEW.medication_adherence_prior,
        NEW.emergency_services_called, NEW.rescue_medication_used, NEW.hospitalized
    );
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER research_anonymize_seizure
    AFTER INSERT ON public.seizure_logs
    FOR EACH ROW EXECUTE FUNCTION public.anonymize_to_research_seizure();

-- Similar triggers for medication, symptoms, menstrual data...

-- ============================================================================
-- ONBOARDING AUTOMATION
-- ============================================================================

CREATE OR REPLACE FUNCTION public.setup_user_on_onboarding()
RETURNS TRIGGER AS $$
DECLARE
    condition_id UUID;
    condition_features tracking_feature_enum[];
    all_features tracking_feature_enum[] := ARRAY[]::tracking_feature_enum[];
BEGIN
    IF NEW.completed_at IS NOT NULL THEN
        -- Create user conditions
        FOREACH condition_id IN ARRAY NEW.selected_conditions
        LOOP
            SELECT tracking_features_array INTO condition_features
            FROM public.conditions WHERE id = condition_id;
            
            INSERT INTO public.user_conditions (user_id, condition_id, tracking_features_enabled)
            VALUES (NEW.user_id, condition_id, condition_features)
            ON CONFLICT (user_id, condition_id) DO NOTHING;
            
            all_features := array_cat(all_features, condition_features);
        END LOOP;
        
        -- Add menstrual tracking
        IF NEW.track_menstrual_cycle THEN
            all_features := array_append(all_features, 'menstruation'::tracking_feature_enum);
        END IF;
        
        -- Remove duplicates
        all_features := ARRAY(SELECT DISTINCT unnest(all_features));
        
        -- Set tracking preferences
        INSERT INTO public.daily_tracking_preferences (user_id, tracking_types)
        VALUES (NEW.user_id, all_features)
        ON CONFLICT (user_id) DO UPDATE SET tracking_types = all_features;
        
        -- Setup research consents
        IF NEW.share_research_data AND NEW.research_data_types IS NOT NULL THEN
            INSERT INTO public.research_consent (user_id, data_type, consent_status, consent_given_at)
            SELECT NEW.user_id, unnest(NEW.research_data_types), 'active'::consent_status_enum, NOW()
            ON CONFLICT (user_id, data_type) DO UPDATE 
            SET consent_status = 'active', consent_given_at = NOW();
        END IF;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER setup_user_tracking
    AFTER INSERT OR UPDATE ON public.patient_onboarding_data
    FOR EACH ROW EXECUTE FUNCTION public.setup_user_on_onboarding();

-- ============================================================================
-- DATA RETENTION & ANONYMIZATION
-- ============================================================================

CREATE OR REPLACE FUNCTION public.cleanup_old_audit_logs()
RETURNS VOID AS $$
BEGIN
    DELETE FROM public.audit_log WHERE created_at < NOW() - INTERVAL '7 years';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.anonymize_deleted_user()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.audit_log SET user_id = NULL WHERE user_id = OLD.id;
    DELETE FROM public.research_user_mapping WHERE user_id = OLD.id;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER anonymize_on_user_delete
    BEFORE DELETE ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.anonymize_deleted_user();

-- ============================================================================
-- RLS POLICIES
-- ============================================================================

ALTER TABLE public.patient_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seizure_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medication_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.symptom_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menstrual_cycle_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_wellness_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_conditions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_medications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wearable_devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wearable_data_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_consent ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_tracking_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own data" ON public.patient_profiles FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own seizure logs" ON public.seizure_logs FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own medication logs" ON public.medication_logs FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own symptom logs" ON public.symptom_logs FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own menstrual logs" ON public.menstrual_cycle_logs FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own wellness logs" ON public.daily_wellness_logs FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own conditions" ON public.user_conditions FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own medications" ON public.user_medications FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own devices" ON public.wearable_devices FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own wearable data" ON public.wearable_data_logs FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own consent" ON public.research_consent FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own preferences" ON public.daily_tracking_preferences FOR ALL USING (auth.uid() = user_id);

-- Public reference tables
ALTER TABLE public.conditions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view conditions" ON public.conditions FOR SELECT USING (TRUE);
CREATE POLICY "Anyone can view medications" ON public.medications FOR SELECT USING (TRUE);

-- ============================================================================
-- SEED DATA
-- ============================================================================

INSERT INTO public.conditions (name, category, snomed_code, tracking_features_array) VALUES
('Epilepsy', 'Neurological', '84757009', ARRAY['seizure', 'mood', 'energy', 'sleep', 'symptoms']::tracking_feature_enum[]),
('Parkinson''s Disease', 'Neurological', '49049000', ARRAY['tremor', 'gait', 'mood', 'energy', 'sleep']::tracking_feature_enum[]),
('Multiple Sclerosis', 'Neurological', '24700007', ARRAY['gait', 'tremor', 'energy', 'mood', 'temperature', 'symptoms']::tracking_feature_enum[]),
('Migraine', 'Neurological', '37796009', ARRAY['symptoms', 'mood', 'sleep']::tracking_feature_enum[]);


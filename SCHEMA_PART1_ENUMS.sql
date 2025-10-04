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

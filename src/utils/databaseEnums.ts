// ============================================================================
// DATABASE ENUM MAPPINGS
// ============================================================================
// Maps UI-friendly labels to database enum values
// Ensures all data submissions match the research-grade schema
// ============================================================================

export const SEIZURE_TYPES = [
  { label: "Focal Aware (Simple Partial)", value: "focal_aware" },
  { label: "Focal Impaired Awareness (Complex Partial)", value: "focal_impaired_awareness" },
  { label: "Focal to Bilateral Tonic-Clonic", value: "focal_to_bilateral_tonic_clonic" },
  { label: "Generalized Tonic-Clonic", value: "generalized_tonic_clonic" },
  { label: "Absence", value: "absence" },
  { label: "Myoclonic", value: "myoclonic" },
  { label: "Atonic (Drop Attack)", value: "atonic" },
  { label: "Tonic", value: "tonic" },
  { label: "Clonic", value: "clonic" },
  { label: "Epileptic Spasm", value: "epileptic_spasm" },
  { label: "Unknown/Unsure", value: "unknown" }
] as const;

export const CONSCIOUSNESS_LEVELS = [
  { label: "Fully Conscious", value: "fully_conscious" },
  { label: "Impaired Awareness", value: "impaired_awareness" },
  { label: "Loss of Consciousness", value: "loss_of_consciousness" },
  { label: "Confusion", value: "confusion" },
  { label: "Unknown", value: "unknown" }
] as const;

export const SEIZURE_TRIGGERS = [
  { label: "Sleep Deprivation", value: "sleep_deprivation" },
  { label: "Stress", value: "stress" },
  { label: "Missed Medication", value: "missed_medication" },
  { label: "Alcohol", value: "alcohol" },
  { label: "Illness/Fever", value: "illness" },
  { label: "Menstruation", value: "menstruation" },
  { label: "Flashing Lights", value: "flashing_lights" },
  { label: "Heat", value: "heat" },
  { label: "Dehydration", value: "dehydration" },
  { label: "Exercise", value: "exercise" },
  { label: "Unknown", value: "unknown" },
  { label: "None Identified", value: "none_identified" }
] as const;

export const SYMPTOM_TYPES = [
  { label: "Headache", value: "headache" },
  { label: "Dizziness", value: "dizziness" },
  { label: "Nausea", value: "nausea" },
  { label: "Fatigue", value: "fatigue" },
  { label: "Tremor", value: "tremor" },
  { label: "Numbness", value: "numbness" },
  { label: "Tingling", value: "tingling" },
  { label: "Vision Changes", value: "vision_changes" },
  { label: "Balance Issues", value: "balance_issues" },
  { label: "Cognitive Fog", value: "cognitive_fog" },
  { label: "Memory Issues", value: "memory_issues" },
  { label: "Mood Changes", value: "mood_changes" },
  { label: "Sleep Disturbance", value: "sleep_disturbance" },
  { label: "Pain", value: "pain" },
  { label: "Weakness", value: "weakness" },
  { label: "Other", value: "other" }
] as const;

export const MEDICATION_ADHERENCE = [
  { label: "Taken on Time", value: "taken_on_time" },
  { label: "Taken Late", value: "taken_late" },
  { label: "Missed", value: "missed" },
  { label: "Double Dose", value: "double_dose" },
  { label: "Reduced Dose", value: "reduced_dose" }
] as const;

export const MEDICATION_FREQUENCY = [
  { label: "Once Daily", value: "once_daily" },
  { label: "Twice Daily", value: "twice_daily" },
  { label: "Three Times Daily", value: "three_times_daily" },
  { label: "Four Times Daily", value: "four_times_daily" },
  { label: "Every Other Day", value: "every_other_day" },
  { label: "Weekly", value: "weekly" },
  { label: "As Needed", value: "as_needed" },
  { label: "Other", value: "other" }
] as const;

export const GENDER_OPTIONS = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Non-Binary", value: "non_binary" },
  { label: "Other", value: "other" },
  { label: "Prefer Not to Say", value: "prefer_not_to_say" }
] as const;

export const MOOD_TYPES = [
  { label: "Very Poor", value: "very_poor", numericValue: 2 },
  { label: "Poor", value: "poor", numericValue: 4 },
  { label: "Neutral", value: "neutral", numericValue: 6 },
  { label: "Good", value: "good", numericValue: 8 },
  { label: "Very Good", value: "very_good", numericValue: 10 }
] as const;

export const ENERGY_LEVELS = [
  { label: "Exhausted", value: "exhausted", numericValue: 2 },
  { label: "Low", value: "low", numericValue: 4 },
  { label: "Moderate", value: "moderate", numericValue: 6 },
  { label: "High", value: "high", numericValue: 8 },
  { label: "Very High", value: "very_high", numericValue: 10 }
] as const;

export const SLEEP_QUALITY = [
  { label: "Very Poor", value: "very_poor", numericValue: 2 },
  { label: "Poor", value: "poor", numericValue: 4 },
  { label: "Fair", value: "fair", numericValue: 6 },
  { label: "Good", value: "good", numericValue: 8 },
  { label: "Excellent", value: "excellent", numericValue: 10 }
] as const;

export const MENSTRUAL_FLOW = [
  { label: "Spotting", value: "spotting" },
  { label: "Light", value: "light" },
  { label: "Moderate", value: "moderate" },
  { label: "Heavy", value: "heavy" },
  { label: "Very Heavy", value: "very_heavy" }
] as const;

export const MENSTRUAL_PHASE = [
  { label: "Menstrual", value: "menstrual" },
  { label: "Follicular", value: "follicular" },
  { label: "Ovulation", value: "ovulation" },
  { label: "Luteal", value: "luteal" }
] as const;

export const RESEARCH_DATA_TYPES = [
  { label: "Seizure Data", value: "seizure_data" },
  { label: "Medication Data", value: "medication_data" },
  { label: "Symptom Data", value: "symptom_data" },
  { label: "Menstrual Data", value: "menstrual_data" },
  { label: "Wearable Data", value: "wearable_data" },
  { label: "Genetic Data", value: "genetic_data" },
  { label: "Imaging Data", value: "imaging_data" },
  { label: "Location Data", value: "location_data" },
  { label: "Demographic Data", value: "demographic_data" },
  { label: "All Data", value: "all_data" }
] as const;

export const BODY_LOCATIONS = [
  { label: "Head", value: "head" },
  { label: "Face", value: "face" },
  { label: "Neck", value: "neck" },
  { label: "Chest", value: "chest" },
  { label: "Abdomen", value: "abdomen" },
  { label: "Back", value: "back" },
  { label: "Left Arm", value: "left_arm" },
  { label: "Right Arm", value: "right_arm" },
  { label: "Left Leg", value: "left_leg" },
  { label: "Right Leg", value: "right_leg" },
  { label: "Left Hand", value: "left_hand" },
  { label: "Right Hand", value: "right_hand" },
  { label: "Generalized", value: "generalized" },
  { label: "Other", value: "other" }
] as const;

// Helper functions
export function numericToMoodEnum(value: number): string {
  if (value <= 2) return "very_poor";
  if (value <= 4) return "poor";
  if (value <= 6) return "neutral";
  if (value <= 8) return "good";
  return "very_good";
}

export function numericToEnergyEnum(value: number): string {
  if (value <= 2) return "exhausted";
  if (value <= 4) return "low";
  if (value <= 6) return "moderate";
  if (value <= 8) return "high";
  return "very_high";
}

export function numericToSleepEnum(value: number): string {
  if (value <= 2) return "very_poor";
  if (value <= 4) return "poor";
  if (value <= 6) return "fair";
  if (value <= 8) return "good";
  return "excellent";
}

export function moodEnumToNumeric(value: string): number {
  const mapping: Record<string, number> = {
    "very_poor": 2,
    "poor": 4,
    "neutral": 6,
    "good": 8,
    "very_good": 10
  };
  return mapping[value] || 6;
}

export function energyEnumToNumeric(value: string): number {
  const mapping: Record<string, number> = {
    "exhausted": 2,
    "low": 4,
    "moderate": 6,
    "high": 8,
    "very_high": 10
  };
  return mapping[value] || 6;
}

export function sleepEnumToNumeric(value: string): number {
  const mapping: Record<string, number> = {
    "very_poor": 2,
    "poor": 4,
    "fair": 6,
    "good": 8,
    "excellent": 10
  };
  return mapping[value] || 6;
}

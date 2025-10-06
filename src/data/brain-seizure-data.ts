// Brain Seizure Analysis Data
// Based on research from: Probabilistic landscape of seizure semiology localizing values
// Source: 11,000+ data points from 4,643 patients across 309 studies

export interface SeizureSign {
  name: string;
  description: string;
  type: string;
  localizations: Record<string, number>; // region -> probability %
  additionalSigns?: string[];
}

export interface BrainRegion {
  name: string;
  function: string;
  subregions?: Record<string, string>;
  seizureCharacteristics?: string;
}

export interface GeneralizedSeizure {
  description: string;
  phases?: string[];
  signsRequired: string[];
  duration: string;
  brainInvolvement: string;
}

export const SEIZURE_SEMIOLOGY: Record<string, SeizureSign> = {
  epigastric_aura: {
    name: "Epigastric Aura",
    description: "Rising sensation in the stomach, butterfly feeling",
    type: "Subjective Sensory",
    localizations: {
      "Temporal Lobe": 83,
      "Mesial Temporal": 61,
      "Frontal Lobe": 8,
      "Insula": 10,
    },
    additionalSigns: ["Fear", "Déjà vu", "Jamais vu", "Autonomic changes"]
  },
  
  automatisms: {
    name: "Automatisms (Oral/Manual)",
    description: "Stereotyped movements - lip smacking, chewing, hand fumbling, picking",
    type: "Motor Signs",
    localizations: {
      "Temporal Lobe": 47,
      "Frontal Lobe": 31,
      "Anterior Temporal": 40,
      "Cingulate": 10,
    },
    additionalSigns: ["Loss of awareness", "Staring", "Amnesia"]
  },
  
  tonic_seizures: {
    name: "Tonic Seizures",
    description: "Sustained muscle stiffening, rigid posturing",
    type: "Motor Signs",
    localizations: {
      "Frontal Lobe": 54,
      "Temporal Lobe": 20,
      "Supplementary Motor Area": 35,
      "Cingulate": 7,
    },
    additionalSigns: ["Loss of consciousness", "Cyanosis", "Incontinence"]
  },
  
  head_version: {
    name: "Head Version",
    description: "Forced head turning, extreme deviation over shoulder",
    type: "Motor Signs",
    localizations: {
      "Temporal Lobe": 46,
      "Frontal Lobe": 33,
      "Posterior Temporal": 25,
      "Anterior Temporal": 20,
    },
    additionalSigns: ["Eye deviation", "Arm posturing"]
  },
  
  dystonic_posturing: {
    name: "Dystonic Posturing",
    description: "Twisted, abnormal posturing of limbs",
    type: "Motor Signs",
    localizations: {
      "Frontal Lobe": 53,
      "Temporal Lobe": 25,
      "Supplementary Motor Area": 30,
      "Cingulate": 5,
    },
    additionalSigns: ["Tonic activity", "Loss of awareness"]
  },
  
  olfactory_aura: {
    name: "Olfactory Aura",
    description: "Unpleasant smells, burning odors",
    type: "Subjective Sensory",
    localizations: {
      "Insula": 44,
      "Temporal Lobe": 40,
      "Parietal Lobe": 28,
      "Frontal Lobe": 21,
    },
    additionalSigns: ["Gustatory hallucinations", "Nausea", "Behavioral changes"]
  },
  
  somatosensory_aura: {
    name: "Somatosensory Aura",
    description: "Tingling, numbness, sensory distortions",
    type: "Subjective Sensory",
    localizations: {
      "Primary Somatosensory Cortex": 60,
      "Parietal Lobe": 38,
      "Temporal Lobe": 31,
      "Frontal Lobe": 23,
      "Insula": 15,
    },
    additionalSigns: ["Paresthesias", "Motor symptoms", "Jacksonian march"]
  },
  
  autonomic_features: {
    name: "Autonomic Features",
    description: "Heart rate changes, breathing changes, sweating, pallor",
    type: "Autonomic Signs",
    localizations: {
      "Temporal Lobe": 58,
      "Mesial Temporal": 36,
      "Insula": 18,
      "Hypothalamus": 15,
      "Frontal Lobe": 13,
    },
    additionalSigns: ["Epigastric aura", "Fear", "Piloerection"]
  },
  
  loss_of_awareness: {
    name: "Loss of Awareness",
    description: "Blank stare, unresponsiveness, altered consciousness",
    type: "Consciousness",
    localizations: {
      "Temporal Lobe": 42,
      "Posterior Temporal": 30,
      "Frontal Lobe": 28,
      "Basal Temporal": 25,
      "Occipital Lobe": 9,
    },
    additionalSigns: ["Automatisms", "Amnesia", "Behavioral arrest"]
  },
  
  mimetic_automatisms: {
    name: "Mimetic Automatisms",
    description: "Facial expressions, grimacing, emotional expressions",
    type: "Motor Signs",
    localizations: {
      "Frontal Lobe": 40,
      "Anterior Cingulate": 35,
      "Cingulate": 26,
      "Temporal Lobe": 20,
    },
    additionalSigns: ["Emotional changes", "Behavioral alterations"]
  },
  
  gelastic_dacrystic: {
    name: "Gelastic/Dacrystic",
    description: "Inappropriate laughing (gelastic) or crying (dacrystic)",
    type: "Behavioral",
    localizations: {
      "Hypothalamus": 41,
      "Temporal Lobe": 35,
      "Mesial Temporal": 25,
      "Frontal Lobe": 11,
    },
    additionalSigns: ["Emotional changes", "Autonomic features"]
  },
  
  vocalization: {
    name: "Vocalization",
    description: "Unintelligible sounds, grunting, moaning, screaming",
    type: "Motor Signs",
    localizations: {
      "Frontal Lobe": 44,
      "Temporal Lobe": 36,
      "Lateral Temporal": 30,
      "Cingulate": 9,
    },
    additionalSigns: ["Motor activity", "Loss of awareness"]
  },
  
  visual_aura: {
    name: "Visual Aura",
    description: "Flashing lights, colors, visual distortions",
    type: "Subjective Sensory",
    localizations: {
      "Occipital Lobe": 75,
      "Temporal Lobe": 15,
      "Parietal Lobe": 10,
    },
    additionalSigns: ["Headache", "Vision loss"]
  },
  
  fear_anxiety: {
    name: "Fear/Anxiety Aura",
    description: "Sudden intense fear or anxiety without cause",
    type: "Subjective Sensory",
    localizations: {
      "Temporal Lobe": 65,
      "Mesial Temporal": 55,
      "Amygdala": 70,
      "Frontal Lobe": 20,
    },
    additionalSigns: ["Autonomic changes", "Epigastric sensation"]
  },
  
  deja_vu: {
    name: "Déjà Vu/Jamais Vu",
    description: "Feeling of familiarity or unfamiliarity",
    type: "Subjective Sensory",
    localizations: {
      "Temporal Lobe": 78,
      "Mesial Temporal": 65,
      "Hippocampus": 60,
    },
    additionalSigns: ["Memory disturbances", "Confusion"]
  },

  clonic_seizures: {
    name: "Clonic Seizures",
    description: "Rhythmic jerking movements, repetitive muscle contractions",
    type: "Motor Signs",
    localizations: {
      "Frontal Lobe": 48,
      "Primary Motor Cortex": 55,
      "Temporal Lobe": 25,
      "Parietal Lobe": 18,
    },
    additionalSigns: ["Loss of consciousness", "Post-ictal confusion"]
  },

  myoclonic_jerks: {
    name: "Myoclonic Jerks",
    description: "Brief, shock-like muscle jerks",
    type: "Motor Signs",
    localizations: {
      "Frontal Lobe": 42,
      "Primary Motor Cortex": 38,
      "Supplementary Motor Area": 32,
      "Parietal Lobe": 20,
    },
    additionalSigns: ["May occur in clusters", "Can be generalized"]
  },

  absence_seizures: {
    name: "Absence Seizures",
    description: "Brief staring spell, sudden behavioral arrest, 3-10 seconds",
    type: "Consciousness",
    localizations: {
      "Temporal Lobe": 35,
      "Frontal Lobe": 30,
      "Thalamus": 45,
    },
    additionalSigns: ["Eye fluttering", "Automatisms", "No post-ictal confusion"]
  },

  hypermotor_seizures: {
    name: "Hypermotor Seizures",
    description: "Vigorous bilateral movements, thrashing, pelvic thrusting",
    type: "Motor Signs",
    localizations: {
      "Frontal Lobe": 68,
      "Supplementary Motor Area": 52,
      "Cingulate": 30,
      "Insula": 22,
    },
    additionalSigns: ["Preserved awareness possible", "Brief duration"]
  },

  speech_arrest: {
    name: "Speech Arrest/Dysphasia",
    description: "Inability to speak or difficulty finding words during seizure",
    type: "Language",
    localizations: {
      "Temporal Lobe": 55,
      "Frontal Lobe": 45,
      "Broca's Area": 62,
      "Lateral Temporal": 40,
    },
    additionalSigns: ["Awareness may be preserved", "Stuttering"]
  },

  auditory_aura: {
    name: "Auditory Aura",
    description: "Hearing sounds, music, voices that aren't there",
    type: "Subjective Sensory",
    localizations: {
      "Temporal Lobe": 68,
      "Lateral Temporal": 72,
      "Auditory Cortex": 80,
      "Parietal Lobe": 15,
    },
    additionalSigns: ["Tinnitus", "Distorted sounds", "Musical hallucinations"]
  },

  gustatory_aura: {
    name: "Gustatory Aura",
    description: "Abnormal tastes, metallic or bitter flavor",
    type: "Subjective Sensory",
    localizations: {
      "Insula": 52,
      "Temporal Lobe": 45,
      "Parietal Lobe": 30,
    },
    additionalSigns: ["Often with olfactory aura", "Nausea"]
  },

  psychic_aura: {
    name: "Psychic Aura",
    description: "Out-of-body experience, depersonalization, derealization",
    type: "Subjective Sensory",
    localizations: {
      "Temporal Lobe": 70,
      "Parietal Lobe": 45,
      "Occipital Lobe": 25,
    },
    additionalSigns: ["Altered perception of reality", "Dissociation"]
  },

  versive_seizures: {
    name: "Versive Seizures",
    description: "Sustained forced turning of head, eyes, and sometimes body",
    type: "Motor Signs",
    localizations: {
      "Frontal Lobe": 58,
      "Supplementary Motor Area": 48,
      "Temporal Lobe": 32,
    },
    additionalSigns: ["Contralateral to seizure focus", "May progress to tonic-clonic"]
  },

  atonic_seizures: {
    name: "Atonic Seizures (Drop Attacks)",
    description: "Sudden loss of muscle tone, falls or head drops",
    type: "Motor Signs",
    localizations: {
      "Frontal Lobe": 45,
      "Temporal Lobe": 25,
      "Thalamus": 35,
    },
    additionalSigns: ["Brief duration", "Risk of injury from falls"]
  },

  // Post-Ictal Symptoms
  postictal_confusion: {
    name: "Post-Ictal Confusion",
    description: "Confusion after seizure, slow recovery, memory fog",
    type: "Post-Ictal",
    localizations: {
      "Temporal Lobe": 58,
      "Frontal Lobe": 42,
      "Parietal Lobe": 25,
    },
    additionalSigns: ["Disorientation", "Amnesia for event"]
  },

  postictal_fatigue: {
    name: "Post-Ictal Fatigue/Weakness",
    description: "Feeling weak or tired after seizure",
    type: "Post-Ictal",
    localizations: {
      "Frontal Lobe": 48,
      "Temporal Lobe": 45,
      "Motor Cortex": 52,
    },
    additionalSigns: ["Muscle soreness", "Need to sleep"]
  },

  postictal_headache: {
    name: "Post-Ictal Headache",
    description: "Headache after seizure",
    type: "Post-Ictal",
    localizations: {
      "Temporal Lobe": 45,
      "Occipital Lobe": 38,
      "Frontal Lobe": 32,
    },
    additionalSigns: ["Throbbing pain", "Light sensitivity"]
  },

  postictal_agitation: {
    name: "Post-Ictal Agitation",
    description: "Restless, irritable, or aggressive after event",
    type: "Post-Ictal",
    localizations: {
      "Frontal Lobe": 55,
      "Temporal Lobe": 40,
      "Limbic System": 48,
    },
    additionalSigns: ["Emotional dysregulation", "Confusion"]
  },

  postictal_speech_difficulty: {
    name: "Post-Ictal Speech Difficulty",
    description: "Trouble speaking clearly after seizure",
    type: "Post-Ictal",
    localizations: {
      "Temporal Lobe": 62,
      "Frontal Lobe": 58,
      "Broca's Area": 70,
    },
    additionalSigns: ["Word-finding difficulty", "Slurred speech"]
  },

  // Generalized/Bilateral Indicators
  bilateral_motor_activity: {
    name: "Bilateral Motor Activity",
    description: "Movements or stiffness affecting both sides equally",
    type: "Generalized",
    localizations: {
      "Bilateral": 90,
      "Frontal Lobe": 35,
      "Thalamus": 45,
    },
    additionalSigns: ["Suggests generalized seizure", "Both arms/legs involved"]
  },

  tongue_biting_incontinence: {
    name: "Tongue Biting/Incontinence",
    description: "Physical injury (tongue/cheek biting) or urinary loss during event",
    type: "Associated Features",
    localizations: {
      "Generalized": 75,
      "Temporal Lobe": 35,
      "Frontal Lobe": 30,
    },
    additionalSigns: ["Loss of consciousness", "Tonic-clonic activity"]
  },

  immediate_loss_consciousness: {
    name: "Immediate Loss of Consciousness",
    description: "No warning or aura, sudden loss of awareness",
    type: "Consciousness",
    localizations: {
      "Generalized": 85,
      "Thalamus": 55,
      "Frontal Lobe": 28,
    },
    additionalSigns: ["No focal onset", "Bilateral involvement"]
  },
};

export const BRAIN_REGIONS: Record<string, BrainRegion> = {
  "Temporal Lobe": {
    name: "Temporal Lobe",
    function: "Memory, auditory processing, language comprehension, emotional processing",
    subregions: {
      "Mesial Temporal": "Memory formation, emotional processing (hippocampus, amygdala)",
      "Lateral Temporal": "Auditory processing, language comprehension",
      "Anterior Temporal": "Semantic memory, naming",
      "Posterior Temporal": "Auditory association, language",
      "Basal Temporal": "Visual object recognition, reading"
    },
    seizureCharacteristics: "Complex partial seizures, auras, automatisms - most common site of focal epilepsy (44%)"
  },
  
  "Frontal Lobe": {
    name: "Frontal Lobe",
    function: "Motor control, executive functions, speech production, personality",
    subregions: {
      "Primary Motor Cortex": "Voluntary motor movements",
      "Premotor Cortex": "Motor planning and coordination",
      "Supplementary Motor Area": "Complex motor sequences",
      "Broca's Area": "Speech production (dominant hemisphere)",
      "Prefrontal Cortex": "Executive functions, planning, decision-making"
    },
    seizureCharacteristics: "Tonic seizures, hypermotor activity, brief duration, abrupt onset"
  },
  
  "Parietal Lobe": {
    name: "Parietal Lobe",
    function: "Sensory processing, spatial awareness, attention, integration",
    subregions: {
      "Primary Somatosensory Cortex": "Touch, pressure, temperature sensation",
      "Superior Parietal Lobule": "Spatial processing, visuomotor integration",
      "Inferior Parietal Lobule": "Language (dominant), spatial attention"
    },
    seizureCharacteristics: "Somatosensory auras, tingling, numbness"
  },
  
  "Occipital Lobe": {
    name: "Occipital Lobe",
    function: "Visual processing and interpretation",
    subregions: {
      "Primary Visual Cortex": "Basic visual processing",
      "Visual Association Areas": "Complex visual interpretation"
    },
    seizureCharacteristics: "Visual hallucinations, flashing lights, vision loss"
  },
  
  "Insula": {
    name: "Insula",
    function: "Interoception, emotional processing, autonomic control, pain processing",
    subregions: {
      "Anterior Insula": "Emotional awareness, autonomic control",
      "Posterior Insula": "Sensory processing, pain"
    },
    seizureCharacteristics: "Autonomic features, olfactory auras"
  },
  
  "Cingulate Cortex": {
    name: "Cingulate Cortex",
    function: "Emotional regulation, attention, motor control",
    subregions: {
      "Anterior Cingulate": "Emotional processing, attention, motor planning",
      "Posterior Cingulate": "Memory, spatial processing"
    },
    seizureCharacteristics: "Mimetic automatisms, emotional changes"
  },
  
  "Hypothalamus": {
    name: "Hypothalamus",
    function: "Autonomic control, hormonal regulation, basic drives",
    seizureCharacteristics: "Gelastic/dacrystic seizures (laughing/crying)"
  }
};

export const GENERALIZED_SEIZURES: Record<string, GeneralizedSeizure> = {
  "Generalized Tonic-Clonic": {
    description: "Whole-body stiffening followed by rhythmic jerking",
    phases: ["Tonic phase (stiffening)", "Clonic phase (jerking)", "Postictal confusion"],
    signsRequired: [
      "Bilateral tonic activity",
      "Bilateral clonic activity",
      "Loss of consciousness",
      "Tongue biting",
      "Incontinence"
    ],
    duration: "1-3 minutes typically",
    brainInvolvement: "Bilateral cortical networks from onset"
  },
  
  "Absence Seizures": {
    description: "Brief episodes of staring and unresponsiveness",
    signsRequired: [
      "Sudden onset/offset",
      "Staring",
      "Unresponsiveness",
      "Brief duration"
    ],
    duration: "5-20 seconds typically",
    brainInvolvement: "Thalamo-cortical circuits, generalized 3Hz spike-wave"
  },
  
  "Myoclonic Seizures": {
    description: "Brief, shock-like muscle jerks",
    signsRequired: [
      "Sudden jerking movements",
      "Brief duration",
      "May cluster"
    ],
    duration: "Milliseconds to 1 second",
    brainInvolvement: "Cortical-subcortical networks"
  },
  
  "Atonic Seizures": {
    description: "Sudden loss of muscle tone, drop attacks",
    signsRequired: [
      "Sudden loss of muscle tone",
      "Falls or head drops",
      "Brief duration"
    ],
    duration: "1-2 seconds typically",
    brainInvolvement: "Frontal cortex, brainstem connections"
  }
};

export const COLOR_SCALE = {
  "0-20": "#E8E8E8",
  "21-40": "#FFE5B4",
  "41-60": "#FFB347",
  "61-80": "#FF6B35",
  "81-100": "#DC143C"
};

export function getProbabilityColor(probability: number): string {
  if (probability <= 20) return COLOR_SCALE["0-20"];
  if (probability <= 40) return COLOR_SCALE["21-40"];
  if (probability <= 60) return COLOR_SCALE["41-60"];
  if (probability <= 80) return COLOR_SCALE["61-80"];
  return COLOR_SCALE["81-100"];
}

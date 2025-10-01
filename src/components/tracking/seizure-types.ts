// Seizure type definitions with plain language labels for patient/carer understanding

export const SEIZURE_TYPES = {
  focal: {
    label: "Focal Seizures",
    description: "Seizures that start in one area of the brain",
    types: [
      { 
        value: "focal_aware_motor", 
        label: "Focal aware with movement", 
        description: "Person is awake and aware, with jerking, stiffening, or other movements"
      },
      { 
        value: "focal_aware_nonmotor", 
        label: "Focal aware without movement", 
        description: "Person is awake and aware, with sensations, feelings, or thoughts but minimal movement"
      },
      { 
        value: "focal_impaired_motor", 
        label: "Focal impaired awareness with movement", 
        description: "Person is confused or unaware, with movements like fumbling, picking, or wandering"
      },
      { 
        value: "focal_impaired_nonmotor", 
        label: "Focal impaired awareness without movement", 
        description: "Person is confused, staring, or unaware with minimal movement"
      },
      { 
        value: "focal_to_bilateral", 
        label: "Focal to bilateral tonic-clonic", 
        description: "Starts as a focal seizure, then becomes a full body convulsion"
      },
    ]
  },
  generalised: {
    label: "Generalised Seizures",
    description: "Seizures affecting both sides of the brain from the start",
    types: [
      { 
        value: "absence", 
        label: "Absence", 
        description: "Brief staring spells, usually less than 15 seconds, person unaware"
      },
      { 
        value: "atypical_absence", 
        label: "Atypical absence", 
        description: "Longer staring episodes with some awareness or slight movements"
      },
      { 
        value: "myoclonic", 
        label: "Myoclonic", 
        description: "Brief, sudden muscle jerks, person usually stays aware"
      },
      { 
        value: "myoclonic_atonic", 
        label: "Myoclonic-atonic", 
        description: "Sudden jerk followed by loss of muscle tone, may cause falls"
      },
      { 
        value: "myoclonic_tonic_clonic", 
        label: "Myoclonic-tonic-clonic", 
        description: "Jerks followed by stiffening and rhythmic shaking"
      },
      { 
        value: "tonic", 
        label: "Tonic", 
        description: "Sudden stiffening of muscles, person loses awareness"
      },
      { 
        value: "clonic", 
        label: "Clonic", 
        description: "Rhythmic jerking movements"
      },
      { 
        value: "tonic_clonic", 
        label: "Tonic-clonic (convulsion)", 
        description: "Full body convulsion - stiffening then rhythmic shaking"
      },
      { 
        value: "atonic", 
        label: "Atonic (drop attack)", 
        description: "Sudden complete loss of muscle tone, person drops or falls"
      },
    ]
  },
  unknown: {
    label: "Unknown Onset",
    description: "When the start of the seizure wasn't witnessed or is unclear",
    types: [
      { 
        value: "unknown_tonic_clonic", 
        label: "Tonic-clonic (unknown onset)", 
        description: "Convulsion but the beginning wasn't seen"
      },
      { 
        value: "unknown_motor", 
        label: "With movement (unknown onset)", 
        description: "Movement was present but start wasn't witnessed"
      },
      { 
        value: "unknown_nonmotor", 
        label: "Without movement (unknown onset)", 
        description: "Minimal movement, start wasn't seen"
      },
    ]
  },
  nonepileptic: {
    label: "Non-Epileptic Events",
    description: "Events that may look similar but have different causes (can be hidden by default)",
    types: [
      { 
        value: "pnes", 
        label: "Psychogenic nonepileptic seizure", 
        description: "Triggered by stress or psychological factors"
      },
      { 
        value: "syncope", 
        label: "Syncope-like", 
        description: "Fainting or passing out episode"
      },
      { 
        value: "nonepileptic_other", 
        label: "Other non-epileptic event", 
        description: "Another type of event that's not epileptic"
      },
    ]
  }
};

export const WARNING_SIGNS = [
  { value: "deja_vu", label: "Déjà vu" },
  { value: "fear_anxiety", label: "Fear or anxiety" },
  { value: "strange_smell_taste", label: "Strange smell or taste" },
  { value: "visual_changes", label: "Visual changes" },
  { value: "rising_stomach", label: "Rising stomach feeling" },
  { value: "tingling", label: "Tingling" },
  { value: "headache", label: "Headache" },
  { value: "nausea", label: "Nausea" },
  { value: "dizziness", label: "Dizziness" },
  { value: "fatigue", label: "Unusual fatigue" },
];

export const WARNING_SIGNS_OTHER_OPTIONS = [
  "Muscle twitching",
  "Chest tightness",
  "Temperature change",
  "Mood change",
  "Trembling",
  "Heart racing"
];

export const POSTICTAL_EFFECTS = [
  { value: "confusion", label: "Confusion" },
  { value: "headache", label: "Headache" },
  { value: "sleepiness", label: "Sleepiness/fatigue" },
  { value: "weakness", label: "Weakness" },
  { value: "memory_gap", label: "Memory gap" },
  { value: "speech_difficulty", label: "Speech difficulty" },
  { value: "nausea", label: "Nausea" },
  { value: "injury_pain", label: "Pain from injury" },
];

export const POSTICTAL_OTHER_OPTIONS = [
  "Vomiting",
  "Restlessness",
  "Aggression or agitation",
  "Mood changes",
  "Disorientation",
  "Vision problems"
];

export const TRIGGERS = [
  { value: "missed_late_med", label: "Missed/late medication" },
  { value: "illness_fever", label: "Illness or fever" },
  { value: "stress", label: "Stress or anxiety" },
  { value: "lack_sleep", label: "Lack of sleep" },
  { value: "hormonal", label: "Menstrual/hormonal" },
  { value: "alcohol", label: "Alcohol" },
  { value: "flashing_lights", label: "Flashing lights" },
  { value: "heat", label: "Heat or overheating" },
  { value: "dehydration", label: "Dehydration" },
];

export const TRIGGERS_OTHER_OPTIONS = [
  "Caffeine",
  "Excitement",
  "Physical exertion",
  "Medication change",
  "Loud noises",
  "Hunger"
];

export const INJURIES = [
  { value: "none", label: "None" },
  { value: "tongue_bite", label: "Tongue bite" },
  { value: "head_bump", label: "Head bump or injury" },
  { value: "bruises", label: "Bruises" },
  { value: "cut_laceration", label: "Cut or laceration" },
  { value: "fall", label: "Fall or collision" },
  { value: "incontinence", label: "Loss of bladder/bowel control" },
];

export const INJURIES_OTHER_OPTIONS = [
  "Shoulder dislocation",
  "Joint injury",
  "Burn",
  "Dental injury",
  "Fracture suspected"
];

export const LOCATIONS = [
  { 
    value: "home", 
    label: "Home", 
    sublocations: ["Bedroom", "Lounge room", "Kitchen", "Bathroom", "Hallway", "Stairs", "Backyard", "Balcony", "Garage"] 
  },
  { 
    value: "school", 
    label: "School/University", 
    sublocations: ["Classroom", "Playground", "Canteen", "Hall/auditorium", "Toilet", "Bus area", "Library", "Sports field"] 
  },
  { 
    value: "work", 
    label: "Work", 
    sublocations: ["Desk/office", "Meeting room", "Break room", "Bathroom", "Warehouse", "Workshop"] 
  },
  { 
    value: "outdoors", 
    label: "Outdoors", 
    sublocations: ["Park", "Street/footpath", "Beach", "Bush/trail", "Garden"] 
  },
  { 
    value: "vehicle", 
    label: "In vehicle", 
    sublocations: ["Car (passenger)", "Car (driver)", "Bus", "Train", "Taxi/rideshare"] 
  },
  { 
    value: "public_place", 
    label: "Public place", 
    sublocations: ["Shop/shopping centre", "Restaurant/cafe", "Cinema", "Library", "Community centre"] 
  },
  { 
    value: "sport_exercise", 
    label: "Sport/exercise venue", 
    sublocations: ["Gym", "Sports field", "Swimming pool", "Court (tennis/basketball)", "Track"] 
  },
  { 
    value: "clinic_hospital", 
    label: "Clinic/hospital", 
    sublocations: ["Waiting room", "Consultation room", "Ward", "Emergency department", "Treatment room"] 
  },
  { 
    value: "other", 
    label: "Other location", 
    sublocations: [] 
  },
];

# Brain Area Analysis Tool for Epileptic Seizure Localization: Comprehensive Research and Design

Based on extensive research into neuroanatomical correlates of epileptic seizures, we have designed a comprehensive interactive brain area analysis tool that allows users to select seizure signs and visualize the corresponding brain regions with probabilistic accuracy. This tool bridges clinical neurology with educational technology to provide valuable insights into seizure localization.


# THIS SHOULD BE ON THE PATIENTS DASHBOARD PLUS THE LANDING PAGE!!! Patient dashboard ONLY if they have epilepsy. 


## Neuroanatomical Foundation and Research Basis

The tool is grounded in rigorous scientific research from multiple sources, including the largest systematic review of seizure semiology localization values involving over 11,000 data points from 4,643 patients across 309 studies. The research reveals probabilistic relationships between specific seizure signs and their neuroanatomical origins, providing objective, data-driven localization values rather than subjective clinical impressions.[1][2]

### Brain Region Functions and Seizure Manifestations

## Temporal Lobe: 
The most common site of focal epilepsy, representing approximately 44% of seizure localizations when publication bias is corrected. The temporal lobe houses critical structures for memory formation (hippocampus), emotional processing (amygdala), and language comprehension. Temporal lobe seizures typically manifest with characteristic auras such as epigastric sensations (83% probability of temporal origin), automatisms, and altered consciousness.[3][4][1]

## Frontal Lobe: 
Responsible for motor control, executive functions, and speech production. Frontal lobe seizures characteristically present with tonic seizures (54% probability of frontal origin), dystonic posturing (53% probability), and hypermotor activity. These seizures often have abrupt onset, brief duration, and prominent motor manifestations.[5][1]

## Parietal Lobe: 
Primary somatosensory processing center. Parietal seizures most commonly present with somatosensory auras including tingling, numbness, or burning sensations (38% probability of parietal origin, 60% for primary somatosensory cortex specifically).[1]

## Occipital Lobe: 
Visual processing center where seizures manifest as visual hallucinations, flashing lights, or temporary vision loss. Loss of awareness surprisingly shows 9% probability of occipital origin.[1]

## Insula: 
Critical for interoception, pain processing, and autonomic control. Insular seizures often present with autonomic features (18% probability) and olfactory auras (44% probability).[1]

## Cingulate Cortex: 
Involved in emotional regulation and motor planning. Mimetic automatisms such as grimacing show strong correlation with cingulate origin (26% probability).[1]

## Hypothalamus: 
Controls autonomic functions and basic drives. Gelastic (laughing) and dacrystic (crying) seizures show very high hypothalamic correlation (41% probability).[1]

# Interactive System Design and User Experience

The brain area analysis tool employs a sophisticated three-layer architecture designed for optimal user interaction and educational value. Users begin with a 3D brain model displaying anatomically accurate regions based on standard brain atlases.

### User Interaction Flow

The system follows a carefully designed user journey that maximizes educational value while maintaining clinical accuracy:

1. Initial Presentation - Users are greeted with an interactive 3D brain model showing all major regions in neutral coloring
2. Symptom Selection - Organized categories allow selection of seizure signs including auras, motor signs, autonomic symptoms, consciousness changes, and behavioral manifestations
3. Real-time Visualization - As symptoms are selected, brain regions highlight with color-coded intensity representing localization probability
4. Educational Integration - Information panels provide detailed anatomical and functional explanations
5. Generalized Assessment - When sufficient signs suggest generalized seizures, the system automatically provides classification guidance

### Advanced Features and Clinical Accuracy

The tool incorporates sophisticated probability calculations based on research data. For example, when a user selects "epigastric aura," the temporal lobe highlights with deep red coloring (83% probability), while the mesial temporal region shows even stronger activation (61% probability). This granular approach reflects the actual clinical localization accuracy found in epilepsy surgery centers.[3][1]

Multi-symptom Analysis - The system handles complex presentations where multiple signs are present. When users select combinations like "tonic seizures" and "head version," both frontal (54% and 33% respectively) and temporal regions (20% and 46% respectively) highlight proportionally, demonstrating the overlap in seizure semiology.[1]

Generalized Seizure Recognition - The tool incorporates logic to identify when selected signs suggest generalized rather than focal seizures. When users select combinations indicating bilateral involvement, immediate consciousness loss, and associated features like tongue biting or incontinence, the system automatically transitions to generalized seizure classification education.

## Technical Implementation and Architecture

The system employs modern web technologies optimized for medical education and clinical utility:

3D Visualization Engine - Three.js renders high-resolution brain models with smooth highlighting transitions and interactive controls for rotation, zooming, and region selection.

Probability Algorithm - Real-time calculations combine individual semiology probabilities using statistical methods that account for multiple sign presentations and regional overlaps.

Educational Content Management - Dynamic content delivery provides context-appropriate information about brain anatomy, seizure types, and clinical significance.

Data Integrity - All localization probabilities derive from peer-reviewed research with proper confidence intervals and bias correction methods.[1]

## Clinical Applications and Educational Value

### For Medical Professionals

The tool serves as a valuable educational resource for neurology residents, medical students, and healthcare providers learning seizure semiology. It provides objective, research-based localization values that complement clinical training and can enhance understanding of seizure classification.

### For Patients and Families

The system offers patient education capabilities, helping individuals understand their seizure types and the brain regions involved. This can improve medication compliance, seizure recognition, and communication with healthcare providers.

### Research and Quality Improvement

The interactive database can support research initiatives by providing standardized semiology classifications and facilitating data collection for seizure localization studies.

## Seizure Classification Integration

The tool seamlessly integrates focal and generalized seizure classifications based on the International League Against Epilepsy (ILAE) 2017 operational classification. When users select signs suggesting generalized seizures - such as bilateral motor activity, immediate consciousness loss, or characteristic EEG patterns - the system provides comprehensive information about:[6]

Generalized Tonic-Clonic Seizures - Whole-body stiffening followed by rhythmic jerking, typically lasting 1-3 minutes with postictal confusion.

Absence Seizures - Brief episodes of staring and unresponsiveness involving thalamo-cortical circuits with characteristic 3Hz spike-wave patterns.

Myoclonic Seizures - Brief, shock-like muscle jerks involving cortical-subcortical networks.

Atonic Seizures - Sudden loss of muscle tone causing drop attacks, often involving frontal cortex and brainstem connections.

## Future Enhancements and Expansion

The modular design allows for continuous improvement and expansion:

EEG Integration - Future versions could incorporate EEG pattern recognition to enhance localization accuracy.

Imaging Correlation - Integration with MRI and other neuroimaging data could provide personalized localization information.

Longitudinal Tracking - Patient-specific modules could track seizure patterns over time and medication responses.

Multilingual Support - International expansion with translated content for global accessibility.

## Clinical Limitations and Appropriate Use

While the tool provides valuable educational information based on extensive research, it includes appropriate disclaimers about its limitations. The system emphasizes that:

- Seizure localization requires comprehensive clinical evaluation including EEG, imaging, and expert clinical assessment
- Probability scores represent population-based statistics and may not apply to individual cases
- The tool is designed for educational purposes and cannot replace medical diagnosis or treatment decisions
- Users are encouraged to seek appropriate medical consultation for seizure evaluation

## Conclusion

This comprehensive brain area analysis tool represents a significant advancement in epilepsy education technology. By combining rigorous neuroanatomical research with interactive visualization, it creates an engaging platform for understanding seizure localization. The system's foundation in evidence-based medicine, combined with intuitive design and comprehensive educational content, makes it valuable for medical education, patient care, and research applications.

The tool successfully bridges the gap between complex neuroanatomical knowledge and practical clinical application, providing users with immediate visual feedback about brain-seizure relationships while maintaining scientific accuracy and appropriate clinical context. This innovative approach to seizure education has the potential to improve understanding of epilepsy across multiple user groups while advancing the field of neurological education technology.


## Implementation_specification.json

{
  "technical": {
    "technical_specifications": {
      "frontend_framework": "React or Vue.js for interactive components",
      "3d_visualization": "Three.js for 3D brain model rendering",
      "brain_model": "Use standard brain atlas (MNI152 or similar)",
      "responsive_design": "Mobile-friendly interface",
      "accessibility": "WCAG 2.1 AA compliance"
    },
    "brain_model_requirements": {
      "3d_mesh": "High-resolution brain mesh with distinct regions",
      "interactivity": "Click/hover detection for each brain region",
      "animation": "Smooth highlighting transitions",
      "color_mapping": {
        "0-20%": "#E8E8E8",
        "21-40%": "#FFE5B4",
        "41-60%": "#FFB347",
        "61-80%": "#FF6B35",
        "81-100%": "#DC143C"
      },
      "labels": "Anatomical labels with toggle visibility"
    },
    "user_interface_components": {
      "symptom_selector": {
        "type": "Grouped checkboxes with search filter",
        "categories": [
          "Auras (Subjective Sensations)",
          "Motor Signs and Movements",
          "Autonomic Symptoms",
          "Consciousness Changes",
          "Behavioral Changes"
        ],
        "real_time_update": true,
        "multiple_selection": true
      },
      "brain_visualization_panel": {
        "3d_controls": "Rotate, zoom, pan",
        "region_highlighting": "Progressive intensity based on probability",
        "click_interaction": "Click region for detailed information",
        "reset_button": "Clear all selections"
      },
      "information_panel": {
        "brain_region_details": {
          "region_name": "Full anatomical name",
          "function": "Primary functions description",
          "probability_score": "Percentage with confidence interval",
          "related_symptoms": "Other symptoms that may occur"
        },
        "multiple_regions": "When multiple areas are highlighted",
        "combined_probability": "Statistical combination of probabilities"
      }
    },
    "generalized_seizure_logic": {
      "trigger_conditions": {
        "bilateral_signs": [
          "Bilateral tonic activity",
          "Bilateral clonic jerking",
          "Generalized myoclonus"
        ],
        "consciousness_patterns": [
          "Immediate loss of consciousness",
          "No aura",
          "Abrupt onset"
        ],
        "associated_features": [
          "Tongue biting",
          "Incontinence",
          "Post-ictal confusion",
          "Cyanosis"
        ]
      },
      "assessment_algorithm": {
        "high_likelihood": "3+ categories of signs present",
        "moderate_likelihood": "2 categories present",
        "low_likelihood": "1 or fewer categories"
      },
      "educational_trigger": "Automatically show when moderate+ likelihood"
    }
  },
  "database": {
    "brain_regions": {
      "region_id": "Unique identifier",
      "region_name": "Full name",
      "parent_region": "For subregions",
      "coordinates": "3D mesh coordinates",
      "functions": "Array of functions",
      "clinical_notes": "Seizure-related information"
    },
    "seizure_semiology": {
      "semiology_id": "Unique identifier",
      "name": "Semiology name",
      "description": "Detailed description",
      "category": "Type category",
      "localizations": "JSON of region probabilities",
      "related_signs": "Array of associated symptoms",
      "clinical_significance": "Medical importance notes"
    },
    "user_sessions": {
      "session_id": "Unique session identifier",
      "selected_signs": "Array of selected semiologies",
      "highlighted_regions": "Current brain highlighting state",
      "timestamp": "Session creation time",
      "educational_content_viewed": "Tracking for analytics"
    }
  },
  "education": {
    "brain_anatomy_lessons": {
      "temporal_lobe": {
        "overview": "Memory and language processing center",
        "subregions": {
          "hippocampus": "Critical for memory formation",
          "amygdala": "Emotional processing and fear responses",
          "superior_temporal_gyrus": "Auditory processing"
        },
        "seizure_characteristics": "Complex partial seizures, auras, automatisms"
      },
      "frontal_lobe": {
        "overview": "Executive function and motor control",
        "subregions": {
          "motor_cortex": "Voluntary movement control",
          "broca_area": "Speech production",
          "prefrontal_cortex": "Planning and decision making"
        },
        "seizure_characteristics": "Tonic seizures, hypermotor activity, brief duration"
      }
    },
    "seizure_education": {
      "focal_vs_generalized": "Key differences and implications",
      "seizure_first_aid": "What to do when witnessing a seizure",
      "when_to_seek_help": "Emergency situations and medical consultation",
      "treatment_overview": "Basic information about epilepsy treatment"
    },
    "probability_interpretation": {
      "what_percentages_mean": "How to understand probability scores",
      "limitations": "What the tool can and cannot diagnose",
      "clinical_correlation": "Importance of medical evaluation"
    }
  }
}


## BRAIN_SEIZURE_ANALYSIS_SYSTEM.json
{
  "brain_regions": {
    "Temporal Lobe": {
      "function": "Memory, auditory processing, language comprehension (dominant), emotional processing",
      "subregions": {
        "Mesial Temporal": "Memory formation, emotional processing (hippocampus, amygdala)",
        "Lateral Temporal": "Auditory processing, language comprehension",
        "Anterior Temporal": "Semantic memory, naming",
        "Posterior Temporal": "Auditory association, language",
        "Basal Temporal": "Visual object recognition, reading"
      }
    },
    "Frontal Lobe": {
      "function": "Motor control, executive functions, speech production (dominant), personality",
      "subregions": {
        "Primary Motor Cortex": "Voluntary motor movements",
        "Premotor Cortex": "Motor planning and coordination",
        "Supplementary Motor Area": "Complex motor sequences",
        "Broca's Area": "Speech production (dominant hemisphere)",
        "Prefrontal Cortex": "Executive functions, planning, decision-making"
      }
    },
    "Parietal Lobe": {
      "function": "Sensory processing, spatial awareness, attention, integration",
      "subregions": {
        "Primary Somatosensory Cortex": "Touch, pressure, temperature sensation",
        "Superior Parietal Lobule": "Spatial processing, visuomotor integration",
        "Inferior Parietal Lobule": "Language (dominant), spatial attention"
      }
    },
    "Occipital Lobe": {
      "function": "Visual processing and interpretation",
      "subregions": {
        "Primary Visual Cortex": "Basic visual processing",
        "Visual Association Areas": "Complex visual interpretation"
      }
    },
    "Insula": {
      "function": "Interoception, emotional processing, autonomic control, pain processing",
      "subregions": {
        "Anterior Insula": "Emotional awareness, autonomic control",
        "Posterior Insula": "Sensory processing, pain"
      }
    },
    "Cingulate Cortex": {
      "function": "Emotional regulation, attention, motor control",
      "subregions": {
        "Anterior Cingulate": "Emotional processing, attention, motor planning",
        "Posterior Cingulate": "Memory, spatial processing"
      }
    },
    "Hypothalamus": {
      "function": "Autonomic control, hormonal regulation, basic drives",
      "subregions": {
        "Anterior Hypothalamus": "Temperature regulation, autonomic control",
        "Posterior Hypothalamus": "Arousal, sleep-wake cycles"
      }
    }
  },
  "seizure_semiology": {
    "Epigastric Aura": {
      "description": "Rising sensation in the stomach, butterfly feeling",
      "type": "Subjective Sensory",
      "localizations": {
        "Temporal Lobe": 83,
        "Mesial Temporal": 61,
        "Frontal Lobe": 8,
        "Insula": 10,
        "Other": 9
      },
      "additional_signs": [
        "Fear",
        "D\u00e9j\u00e0 vu",
        "Jamais vu",
        "Autonomic changes"
      ]
    },
    "Automatisms (Oral/Manual)": {
      "description": "Stereotyped movements - lip smacking, chewing, hand fumbling, picking",
      "type": "Motor Signs",
      "localizations": {
        "Temporal Lobe": 47,
        "Frontal Lobe": 31,
        "Anterior Temporal": 40,
        "Cingulate": 10,
        "Other": 12
      },
      "additional_signs": [
        "Loss of awareness",
        "Staring",
        "Amnesia"
      ]
    },
    "Tonic Seizures": {
      "description": "Sustained muscle stiffening, rigid posturing",
      "type": "Motor Signs",
      "localizations": {
        "Frontal Lobe": 54,
        "Temporal Lobe": 20,
        "Supplementary Motor Area": 35,
        "Cingulate": 7,
        "Other": 19
      },
      "additional_signs": [
        "Loss of consciousness",
        "Cyanosis",
        "Incontinence"
      ]
    },
    "Head Version": {
      "description": "Forced head turning, extreme deviation over shoulder",
      "type": "Motor Signs",
      "localizations": {
        "Temporal Lobe": 46,
        "Frontal Lobe": 33,
        "Posterior Temporal": 25,
        "Anterior Temporal": 20,
        "Other": 21
      },
      "additional_signs": [
        "Eye deviation",
        "Arm posturing"
      ]
    },
    "Dystonic Posturing": {
      "description": "Twisted, abnormal posturing of limbs",
      "type": "Motor Signs",
      "localizations": {
        "Frontal Lobe": 53,
        "Temporal Lobe": 25,
        "Supplementary Motor Area": 30,
        "Cingulate": 5,
        "Other": 17
      },
      "additional_signs": [
        "Tonic activity",
        "Loss of awareness"
      ]
    },
    "Olfactory Aura": {
      "description": "Unpleasant smells, burning odors",
      "type": "Subjective Sensory",
      "localizations": {
        "Temporal Lobe": 40,
        "Parietal Lobe": 28,
        "Frontal Lobe": 21,
        "Insula": 44,
        "Other": 11
      },
      "additional_signs": [
        "Gustatory hallucinations",
        "Nausea",
        "Behavioral changes"
      ]
    },
    "Somatosensory Aura": {
      "description": "Tingling, numbness, sensory distortions",
      "type": "Subjective Sensory",
      "localizations": {
        "Parietal Lobe": 38,
        "Primary Somatosensory Cortex": 60,
        "Temporal Lobe": 31,
        "Frontal Lobe": 23,
        "Insula": 15,
        "Other": 8
      },
      "additional_signs": [
        "Paresthesias",
        "Motor symptoms",
        "Jacksonian march"
      ]
    },
    "Autonomic Features": {
      "description": "Heart rate changes, breathing changes, sweating, pallor",
      "type": "Autonomic Signs",
      "localizations": {
        "Temporal Lobe": 58,
        "Mesial Temporal": 36,
        "Hypothalamus": 15,
        "Frontal Lobe": 13,
        "Insula": 18,
        "Other": 14
      },
      "additional_signs": [
        "Epigastric aura",
        "Fear",
        "Piloerection"
      ]
    },
    "Loss of Awareness": {
      "description": "Blank stare, unresponsiveness, altered consciousness",
      "type": "Consciousness",
      "localizations": {
        "Temporal Lobe": 42,
        "Frontal Lobe": 28,
        "Occipital Lobe": 9,
        "Posterior Temporal": 30,
        "Basal Temporal": 25,
        "Other": 21
      },
      "additional_signs": [
        "Automatisms",
        "Amnesia",
        "Behavioral arrest"
      ]
    },
    "Mimetic Automatisms": {
      "description": "Facial expressions, grimacing, emotional expressions",
      "type": "Motor Signs",
      "localizations": {
        "Frontal Lobe": 40,
        "Cingulate": 26,
        "Anterior Cingulate": 35,
        "Temporal Lobe": 20,
        "Other": 14
      },
      "additional_signs": [
        "Emotional changes",
        "Behavioral alterations"
      ]
    },
    "Gelastic/Dacrystic": {
      "description": "Inappropriate laughing (gelastic) or crying (dacrystic)",
      "type": "Behavioral",
      "localizations": {
        "Hypothalamus": 41,
        "Temporal Lobe": 35,
        "Mesial Temporal": 25,
        "Frontal Lobe": 11,
        "Other": 13
      },
      "additional_signs": [
        "Emotional changes",
        "Autonomic features"
      ]
    },
    "Vocalization": {
      "description": "Unintelligible sounds, grunting, moaning, screaming",
      "type": "Motor Signs",
      "localizations": {
        "Frontal Lobe": 44,
        "Temporal Lobe": 36,
        "Lateral Temporal": 30,
        "Cingulate": 9,
        "Other": 11
      },
      "additional_signs": [
        "Motor activity",
        "Loss of awareness"
      ]
    }
  },
  "generalized_seizures": {
    "Generalized Tonic-Clonic": {
      "description": "Whole-body stiffening followed by rhythmic jerking",
      "phases": [
        "Tonic phase (stiffening)",
        "Clonic phase (jerking)",
        "Postictal confusion"
      ],
      "signs_required": [
        "Bilateral tonic activity",
        "Bilateral clonic activity",
        "Loss of consciousness",
        "Tongue biting",
        "Incontinence"
      ],
      "duration": "1-3 minutes typically",
      "brain_involvement": "Bilateral cortical networks from onset"
    },
    "Absence Seizures": {
      "description": "Brief episodes of staring and unresponsiveness",
      "subtypes": [
        "Typical absence",
        "Atypical absence",
        "Myoclonic absence",
        "Eyelid myoclonia"
      ],
      "signs_required": [
        "Sudden onset/offset",
        "Staring",
        "Unresponsiveness",
        "Brief duration"
      ],
      "duration": "5-20 seconds typically",
      "brain_involvement": "Thalamo-cortical circuits, generalized 3Hz spike-wave"
    },
    "Myoclonic Seizures": {
      "description": "Brief, shock-like muscle jerks",
      "characteristics": [
        "Sudden muscle contractions",
        "Brief duration",
        "Can be focal or generalized"
      ],
      "signs_required": [
        "Sudden jerking movements",
        "Brief duration",
        "May cluster"
      ],
      "duration": "Milliseconds to 1 second",
      "brain_involvement": "Cortical-subcortical networks"
    },
    "Atonic Seizures": {
      "description": "Sudden loss of muscle tone, drop attacks",
      "characteristics": [
        "Sudden collapse",
        "Head drops",
        "Loss of posture"
      ],
      "signs_required": [
        "Sudden loss of muscle tone",
        "Falls or head drops",
        "Brief duration"
      ],
      "duration": "1-2 seconds typically",
      "brain_involvement": "Frontal cortex, brainstem connections"
    }
  },
  "user_interface": {
    "brain_visualization": {
      "type": "3D brain model with clickable regions",
      "highlighting": "Color-coded probability intensity",
      "colors": {
        "no_activity": "#E8E8E8",
        "low_probability": "#FFE5B4",
        "medium_probability": "#FFB347",
        "high_probability": "#FF6B35",
        "very_high_probability": "#DC143C"
      }
    },
    "semiology_selection": {
      "categories": [
        "Subjective Sensory (Auras)",
        "Motor Signs",
        "Autonomic Signs",
        "Consciousness Changes",
        "Behavioral Signs"
      ],
      "selection_method": "Multi-select checkboxes with search",
      "real_time_updates": true
    },
    "information_panels": {
      "brain_region_info": "Dynamic panel showing selected region details",
      "semiology_correlation": "Probability scores and explanations",
      "additional_signs": "Related symptoms that might occur",
      "generalized_assessment": "Auto-triggered when criteria met"
    }
  },
  "educational_content": {
    "brain_anatomy": "Interactive labels with function descriptions",
    "seizure_types": "Definitions and video examples",
    "probability_explanation": "How to interpret the percentages",
    "clinical_context": "When to seek medical attention"
  }
}




------


Sources
[1] Probabilistic landscape of seizure semiology localizing values https://pmc.ncbi.nlm.nih.gov/articles/PMC9156627/
[2] Probabilistic landscape of seizure semiology localizing values https://academic.oup.com/braincomms/advance-article-pdf/doi/10.1093/braincomms/fcac130/43754399/fcac130.pdf
[3] Temporal Lobe Epilepsy Semiology https://pmc.ncbi.nlm.nih.gov/articles/PMC3420439/
[4] Temporal Lobe Epilepsy Semiology https://downloads.hindawi.com/archive/2012/751510.pdf
[5] Ictal semiology in temporo‐frontal epilepsy: A systematic review and meta‐analysis https://onlinelibrary.wiley.com/doi/10.1002/epd2.20328
[6] Instruction manual for the ILAE 2017 operational classification of seizure types https://onlinelibrary.wiley.com/doi/10.1111/epi.13671
[7] PET/MRI Applications in Pediatric Epilepsy http://www.thieme-connect.de/DOI/DOI?10.1055/s-0043-1764303
[8] Subtraction ictal SPECT coregistered to MRI for seizure focus localization in partial epilepsy. https://linkinghub.elsevier.com/retrieve/pii/S0025619611645886
[9] Methods and utility of EEG-fMRI in epilepsy. http://qims.amegroups.com/article/view/5897/6608
[10] Intensity-based registration and combined visualization of multimodal brain images for noninvasive epilepsy surgery planning http://proceedings.spiedigitallibrary.org/proceeding.aspx?doi=10.1117/12.479857
[11] Diagnosis and Surgical Treatment of Epilepsy https://www.mdpi.com/2076-3425/8/7/115
[12] 137 An Easily Implemented, Open Access Semiautomated Pipeline for Intracranial Electrode Localization. https://journals.lww.com/00006123-201608001-00067
[13] Digital Photography and 3D MRI–based Multimodal Imaging for Individualized Planning of Resective Neocortical Epilepsy Surgery https://onlinelibrary.wiley.com/doi/10.1046/j.1528-1157.2002.30002.x
[14] Virtual reality–based 3-dimensional localization of stereotactic EEG (SEEG) depth electrodes and related brain anatomy in pediatric epilepsy surgery https://link.springer.com/10.1007/s00381-021-05403-5
[15] A Review of EEG-based Localization of Epileptic Seizure Foci: Common Points with Multimodal Fusion of Brain Data https://journals.lww.com/10.4103/jmss.jmss_11_24
[16] Mapping Epileptic Activity: Sources or Networks for the Clinicians? https://pmc.ncbi.nlm.nih.gov/articles/PMC4220689/
[17] Localizing epileptogenic tissues in epilepsy: are we losing (the) focus? https://pmc.ncbi.nlm.nih.gov/articles/PMC10200283/
[18] Mapping Epileptic Activity: Sources or Networks for the Clinicians? https://www.frontiersin.org/articles/10.3389/fneur.2014.00218/pdf
[19] Structural and effective connectivity in focal epilepsy https://pmc.ncbi.nlm.nih.gov/articles/PMC5842760/
[20] Subdural electrodes https://pmc.ncbi.nlm.nih.gov/articles/PMC2962988/
[21] Localization of Epileptic Foci Based on Simultaneous EEG–fMRI Data https://pmc.ncbi.nlm.nih.gov/articles/PMC8110922/
[22] Anatomy Based Networks and Topology Alteration in Seizure-Related Cognitive Outcomes https://pmc.ncbi.nlm.nih.gov/articles/PMC5898178/
[23] Epilepsy lesion localization method based on brain function network https://pmc.ncbi.nlm.nih.gov/articles/PMC11266299/
[24] A Review of EEG-based Localization of Epileptic Seizure Foci: Common Points with Multimodal Fusion of Brain Data https://pmc.ncbi.nlm.nih.gov/articles/PMC11373807/
[25] Localization of Epileptic Foci Based on Simultaneous EEG–fMRI Data https://www.frontiersin.org/articles/10.3389/fneur.2021.645594/pdf
[26] Graph analysis of epileptogenic networks in human partial epilepsy https://pmc.ncbi.nlm.nih.gov/articles/PMC3200119/
[27] Lateralizing value and clinicoradiological features of asymmetric last clonic jerks in temporal and extratemporal epilepsy https://www.nature.com/articles/s41598-024-61401-y
[28] Case report: Bridging limbic network epilepsy with psychiatric, memory, and sleep comorbidities: case illustrations of reversible psychosis symptoms during continuous, high-frequency ANT-DBS https://www.frontiersin.org/articles/10.3389/fnetp.2024.1426743/full
[29] Panic attack semiology in right temporal lobe epilepsy. https://onlinelibrary.wiley.com/doi/10.1684/j.1950-6945.2003.tb00569.x
[30] Combining Ictal Surface‐Electroencephalography and Seizure Semiology Improves Patient Lateralization in Temporal Lobe Epilepsy https://onlinelibrary.wiley.com/doi/10.1111/j.1499-1654.2000.001567.x
[31] Dreamy State, Delusions, Audiovisual Hallucinations, and Metamorphopsia in a Lesional Lateral Temporal Lobe Epilepsy Followed by Ipsilateral Hippocampal Sclerosis https://karger.com/article/doi/10.1159/000501475
[32] Study of epileptic discharge propagation and semiology of temporal lobe epilepsy by intracranial EEG http://doi.wanfangdata.com.cn/10.3760/cma.j.issn.1001-2346.2009.09.019
[33] Combining Ictal Surface‐Electroencephalography and Seizure Semiology Improves Patient Lateralization in Temporal Lobe Epilepsy https://onlinelibrary.wiley.com/doi/10.1111/j.1528-1167.2000.01567.x
[34] Localizing and Lateralizing Value of Epileptic Symptoms in Temporal Lobe Epilepsy https://www.cambridge.org/core/product/identifier/S031716710000055X/type/journal_article
[35] Mesial Temporal Lobe Epilepsy in Congenital Toxoplasmosis: A Case Report http://j-epilepsy.org/journal/view.php?doi=10.14581/jer.15007
[36] Semiology of seizures with temporo-polar or "medio-lateral" temporal origin: A systematic review. https://onlinelibrary.wiley.com/doi/10.1002/epd2.20329
[37] Seizure semiology in temporal lobe vs. temporal plus epilepsy using intracranial EEG monitoring https://pmc.ncbi.nlm.nih.gov/articles/PMC8926121/
[38] Altered fMRI Connectivity Dynamics in Temporal Lobe Epilepsy Might Explain Seizure Semiology https://pmc.ncbi.nlm.nih.gov/articles/PMC4160997/
[39] Temporal Lobe Epilepsy and Psychiatric Comorbidity https://www.frontiersin.org/articles/10.3389/fneur.2021.775781/pdf
[40] Semiological differences between children and adults with temporal lobe epilepsy: a video-EEG based multivariate analysis https://www.frontiersin.org/articles/10.3389/fneur.2025.1578958/full
[41] Temporal Lobe Epilepsy and Psychiatric Comorbidity https://pmc.ncbi.nlm.nih.gov/articles/PMC8669948/
[42] Generalized Tonic Clonic Seizure Classification Based on Optimized Feature Extraction from Surface Electromyography https://ieeexplore.ieee.org/document/11103670/
[43] Characteristics and introduction of the operational classification of seizure types newly revised by International League Against Epilepsy http://doi.med.wanfangdata.com.cn/10.3760/cma.j.issn.1006-7876.2019.01.015
[44] [Seizure Semiology and Functional Anatomy in the Cerebral Cortex]. https://webview.isho.jp/journal/detail/abs/10.11477/mf.1436204711
[45] Using wearable sensors for semiology-independent seizure detection - towards ambulatory monitoring of epilepsy https://ieeexplore.ieee.org/document/7319660/
[46] Status Epilepticus in the Idiopathic Generalized Epilepsies http://link.springer.com/10.1007/978-3-319-58200-9_15
[47] Neuropsychological Deficits in Childhood Epilepsy Syndromes http://link.springer.com/10.1007/s11065-007-9048-4
[48] Machine Learning Methods for Detection of Epileptic Seizures with Long-Term Wearable Devices https://www.semanticscholar.org/paper/10f655b75e195194e2d746911a0869bf8e47a9cb
[49] ACR APPROPRIATENESS CRITERIA Epilepsy https://www.semanticscholar.org/paper/3e13431f93a813a4febb0ba75b449c9986dd6e95
[50] Severe Myoclonic Epilepsy in Infants and its Related Syndromes https://onlinelibrary.wiley.com/doi/10.1111/j.1528-1157.2000.tb02210.x
[51] Seizure disorders: Part 1. Classification and diagnosis. https://pmc.ncbi.nlm.nih.gov/articles/PMC1071497/
[52] ILAE definition of the Idiopathic Generalized Epilepsy Syndromes: Position statement by the ILAE Task Force on Nosology and Definitions https://onlinelibrary.wiley.com/doi/pdfdirect/10.1111/epi.17236
[53] Current Classification of Seizures and Epilepsies: Scope, Limitations and Recommendations for Future Action https://www.cureus.com/articles/36415-current-classification-of-seizures-and-epilepsies-scope-limitations-and-recommendations-for-future-action.pdf
[54] Managing patients with intellectual disability and epilepsy in the acute medical setting https://pmc.ncbi.nlm.nih.gov/articles/PMC11066991/
[55] Current Classification of Seizures and Epilepsies: Scope, Limitations and Recommendations for Future Action https://pmc.ncbi.nlm.nih.gov/articles/PMC7575300/
[56] 3D figure of epilepsy syndromes https://discovery.ucl.ac.uk/id/eprint/10158579/1/3D%20figure%20of%20epilepsy%20syndromes.pdf
[57] Epilepsy: From pediatric to adulthood. Definition, classifications, neurobiological profiles and clinical treatments https://www.peertechz.com/articles/JNNSD-6-139.pdf
[58] Neurostimulation for Generalized Epilepsy: Should Therapy be Syndrome-specific? https://pmc.ncbi.nlm.nih.gov/articles/PMC10676463/
[59] Overview of Epilepsy and Its Management https://www.ijfmr.com/papers/2023/6/9477.pdf
[60] Seizures Are the Main Sign of Epilepsy: Stages of Seizures https://article.sciencepublishinggroup.com/pdf/10.11648.j.plm.20230701.11.pdf
[61] Anatomy and Physiology of Brain https://www.amj.net.au/index.php/AMJ/article/viewFile/4058/2227
[62] Schizophrenia--what does structural MRI show? https://tidsskriftet.no/2013/04/oversiktsartikkel/schizofreni-hva-viser-strukturell-mr
[63] Signatures of life course socioeconomic conditions in brain anatomy https://onlinelibrary.wiley.com/doi/10.1002/hbm.25807
[64] Anatomy and white matter connections of the lateral occipital cortex http://link.springer.com/10.1007/s00276-019-02371-z
[65] Brain anatomy alterations associated with Social Networking Site (SNS) addiction https://www.nature.com/articles/srep45064
[66] The anatomy and function of the postrhinal cortex. https://doi.apa.org/doi/10.1037/bne0000500
[67] The brain’s default network: updated anatomy, physiology and evolving insights https://www.nature.com/articles/s41583-019-0212-7
[68] The anatomy, organisation and development of contralateral callosal projections of the mouse somatosensory cortex https://journals.sagepub.com/doi/10.1177/2398212817694888
[69] Emotion, motivation, decision-making, the orbitofrontal cortex, anterior cingulate cortex, and the amygdala https://link.springer.com/10.1007/s00429-023-02644-9
[70] Variation in brain anatomy in frogs and its possible bearing on their locomotor ecology https://onlinelibrary.wiley.com/doi/10.1111/joa.12613
[71] Distinct and overlapping functional zones in the cerebellum defined by resting state functional connectivity. https://pmc.ncbi.nlm.nih.gov/articles/PMC2837094/
[72] Structural Variability in the Human Brain Reflects Fine-Grained Functional Architecture at the Population Level https://pmc.ncbi.nlm.nih.gov/articles/PMC6668209/
[73] Fusion and Fission of Cognitive Functions in the Human Parietal Cortex https://pmc.ncbi.nlm.nih.gov/articles/PMC4585503/
[74] Cognitive Neuroscience: Functional Specialization in Human Cerebellum https://pmc.ncbi.nlm.nih.gov/articles/PMC6223660/
[75] The Architecture of Cortex—in Illness and in Health https://pmc.ncbi.nlm.nih.gov/articles/PMC5374328/
[76] Anatomy of the Temporal Lobe https://pmc.ncbi.nlm.nih.gov/articles/PMC3420617/
[77] The Cerebellum’s Orchestra: Understanding the Functional Connectivity of Its Lobes and Deep Nuclei in Coordination and Integration of Brain Networks https://pmc.ncbi.nlm.nih.gov/articles/PMC10142847/
[78] Anatomy and Physiology of Brain in Context of Learning: A Review from Current Literature https://biomedres.us/pdfs/BJSTR.MS.ID.004415.pdf
[79] The Cerebellum’s Orchestra: Understanding the Functional Connectivity of Its Lobes and Deep Nuclei in Coordination and Integration of Brain Networks https://www.mdpi.com/2379-139X/9/2/72/pdf?version=1682065080
[80] The limbic system https://pmc.ncbi.nlm.nih.gov/articles/PMC2917081/
[81] Mapping the structure-function relationship along macroscale gradients in the human brain https://www.nature.com/articles/s41467-024-51395-6
[82] Functional approach using intraoperative brain mapping and neurophysiological monitoring for the surgical treatment of brain metastases in the central region. https://thejns.org/view/journals/j-neurosurg/126/3/article-p698.xml
[83] Potential Effects of the COVID-19 Pandemic on the Developing Brain https://link.springer.com/10.1007/s12264-022-00942-6
[84] The Cerebellum https://en.wikiversity.org/wiki/WikiJournal_of_Medicine/The_Cerebellum
[85] An OP4 functional stream in the language-related neuroarchitecture. https://academic.oup.com/cercor/article-lookup/doi/10.1093/cercor/bht256
[86] Understanding Others: Imitation, Language, Empathy https://www.semanticscholar.org/paper/3c2266fc1c2f8dcf6695fab59cb6bbb89cbe3357
[87] Complete mutism after midbrain periaqueductal gray lesion. http://journals.lww.com/00001756-199903170-00004
[88] Stroke: A brain attack! https://www.semanticscholar.org/paper/b07142c00c630a7443efee3310dad04c9b1359bb
[89] Quantitative assessment of covariation between neuropsychological function and location of naturally occurring lesions in humans. https://www.tandfonline.com/doi/full/10.1080/01688639008401001
[90] Non-invasive brain-computer interfaces effectively improve motor function, sensory function, and activities of daily living in patients with spinal cord injury: a systematic review and meta-analysis https://journals.lww.com/10.4103/BNM.BNM_15_24
[91] Neural Development of Speech Sensorimotor Learning https://pmc.ncbi.nlm.nih.gov/articles/PMC8176761/
[92] Sensorimotor, language, and working memory representation within the human cerebellum https://pmc.ncbi.nlm.nih.gov/articles/PMC6865458/
[93] Neural representation of sensorimotor features in language-motor areas during auditory and visual perception https://pmc.ncbi.nlm.nih.gov/articles/PMC11724955/
[94] How sensory-motor systems impact the neural organization for language: direct contrasts between spoken and signed language https://pmc.ncbi.nlm.nih.gov/articles/PMC4033845/
[95] Language and the Cerebellum: Structural Connectivity to the Eloquent Brain https://direct.mit.edu/nol/article-pdf/doi/10.1162/nol_a_00085/2058291/nol_a_00085.pdf
[96] How sensory-motor systems impact the neural organization for language: direct contrasts between spoken and signed language https://www.frontiersin.org/articles/10.3389/fpsyg.2014.00484/pdf
[97] The brain decade in debate: VI. Sensory and motor maps: dynamics and plasticity. http://www.scielo.br/pdf/bjmbr/v34n12/4318.pdf
[98] Cortical Motor Organization, Mirror Neurons, and Embodied Language: An Evolutionary Perspective https://bioling.psychopen.eu/index.php/bioling/article/download/8923/8119
[99] Two Tongues, One Brain: Imaging Bilingual Speech Production https://pmc.ncbi.nlm.nih.gov/articles/PMC3139956/
[100] The Functional Connectome of Speech Control https://pmc.ncbi.nlm.nih.gov/articles/PMC4512708/


export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      audit_log: {
        Row: {
          action: string
          created_at: string | null
          id: string
          ip_address: unknown | null
          record_id: string | null
          table_name: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          record_id?: string | null
          table_name: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          record_id?: string | null
          table_name?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      carer_profiles: {
        Row: {
          created_at: string | null
          first_name: string | null
          id: string
          last_name: string | null
          relationship: Database["public"]["Enums"]["relationship_enum"] | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          relationship?: Database["public"]["Enums"]["relationship_enum"] | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          relationship?: Database["public"]["Enums"]["relationship_enum"] | null
          user_id?: string
        }
        Relationships: []
      }
      carer_relationships: {
        Row: {
          approved_at: string | null
          carer_user_id: string
          id: string
          patient_user_id: string
          relationship_type:
            | Database["public"]["Enums"]["relationship_enum"]
            | null
          requested_at: string | null
          status: Database["public"]["Enums"]["connection_status_enum"] | null
        }
        Insert: {
          approved_at?: string | null
          carer_user_id: string
          id?: string
          patient_user_id: string
          relationship_type?:
            | Database["public"]["Enums"]["relationship_enum"]
            | null
          requested_at?: string | null
          status?: Database["public"]["Enums"]["connection_status_enum"] | null
        }
        Update: {
          approved_at?: string | null
          carer_user_id?: string
          id?: string
          patient_user_id?: string
          relationship_type?:
            | Database["public"]["Enums"]["relationship_enum"]
            | null
          requested_at?: string | null
          status?: Database["public"]["Enums"]["connection_status_enum"] | null
        }
        Relationships: []
      }
      conditions: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          icd10_code: string | null
          id: string
          name: string
          snomed_code: string | null
          tracking_features_array:
            | Database["public"]["Enums"]["tracking_feature_enum"][]
            | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          icd10_code?: string | null
          id?: string
          name: string
          snomed_code?: string | null
          tracking_features_array?:
            | Database["public"]["Enums"]["tracking_feature_enum"][]
            | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          icd10_code?: string | null
          id?: string
          name?: string
          snomed_code?: string | null
          tracking_features_array?:
            | Database["public"]["Enums"]["tracking_feature_enum"][]
            | null
        }
        Relationships: []
      }
      daily_tracking_preferences: {
        Row: {
          created_at: string | null
          id: string
          notification_enabled: boolean | null
          tracking_types:
            | Database["public"]["Enums"]["tracking_feature_enum"][]
            | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          notification_enabled?: boolean | null
          tracking_types?:
            | Database["public"]["Enums"]["tracking_feature_enum"][]
            | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          notification_enabled?: boolean | null
          tracking_types?:
            | Database["public"]["Enums"]["tracking_feature_enum"][]
            | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      daily_wellness_logs: {
        Row: {
          created_at: string | null
          energy_level: Database["public"]["Enums"]["energy_level_enum"] | null
          exercise_minutes: number | null
          exercise_type: string | null
          id: string
          log_date: string
          mood: Database["public"]["Enums"]["mood_type_enum"] | null
          mood_notes: string | null
          notes: string | null
          sleep_hours: number | null
          sleep_interruptions: number | null
          sleep_quality:
            | Database["public"]["Enums"]["sleep_quality_enum"]
            | null
          stress_level: number | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          energy_level?: Database["public"]["Enums"]["energy_level_enum"] | null
          exercise_minutes?: number | null
          exercise_type?: string | null
          id?: string
          log_date: string
          mood?: Database["public"]["Enums"]["mood_type_enum"] | null
          mood_notes?: string | null
          notes?: string | null
          sleep_hours?: number | null
          sleep_interruptions?: number | null
          sleep_quality?:
            | Database["public"]["Enums"]["sleep_quality_enum"]
            | null
          stress_level?: number | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          energy_level?: Database["public"]["Enums"]["energy_level_enum"] | null
          exercise_minutes?: number | null
          exercise_type?: string | null
          id?: string
          log_date?: string
          mood?: Database["public"]["Enums"]["mood_type_enum"] | null
          mood_notes?: string | null
          notes?: string | null
          sleep_hours?: number | null
          sleep_interruptions?: number | null
          sleep_quality?:
            | Database["public"]["Enums"]["sleep_quality_enum"]
            | null
          stress_level?: number | null
          user_id?: string
        }
        Relationships: []
      }
      medication_logs: {
        Row: {
          actual_time: string | null
          adherence_status: Database["public"]["Enums"]["medication_adherence_enum"]
          created_at: string | null
          dosage_amount: number | null
          dosage_unit: string | null
          id: string
          log_date: string
          log_time: string | null
          missed_reason: string | null
          notes: string | null
          planned_time: string | null
          plasma_level: number | null
          plasma_level_unit: string | null
          side_effect_severity:
            | Database["public"]["Enums"]["side_effect_severity_enum"]
            | null
          side_effect_types:
            | Database["public"]["Enums"]["symptom_type_enum"][]
            | null
          side_effects_present: boolean | null
          user_id: string
          user_medication_id: string | null
        }
        Insert: {
          actual_time?: string | null
          adherence_status: Database["public"]["Enums"]["medication_adherence_enum"]
          created_at?: string | null
          dosage_amount?: number | null
          dosage_unit?: string | null
          id?: string
          log_date: string
          log_time?: string | null
          missed_reason?: string | null
          notes?: string | null
          planned_time?: string | null
          plasma_level?: number | null
          plasma_level_unit?: string | null
          side_effect_severity?:
            | Database["public"]["Enums"]["side_effect_severity_enum"]
            | null
          side_effect_types?:
            | Database["public"]["Enums"]["symptom_type_enum"][]
            | null
          side_effects_present?: boolean | null
          user_id: string
          user_medication_id?: string | null
        }
        Update: {
          actual_time?: string | null
          adherence_status?: Database["public"]["Enums"]["medication_adherence_enum"]
          created_at?: string | null
          dosage_amount?: number | null
          dosage_unit?: string | null
          id?: string
          log_date?: string
          log_time?: string | null
          missed_reason?: string | null
          notes?: string | null
          planned_time?: string | null
          plasma_level?: number | null
          plasma_level_unit?: string | null
          side_effect_severity?:
            | Database["public"]["Enums"]["side_effect_severity_enum"]
            | null
          side_effect_types?:
            | Database["public"]["Enums"]["symptom_type_enum"][]
            | null
          side_effects_present?: boolean | null
          user_id?: string
          user_medication_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "medication_logs_user_medication_id_fkey"
            columns: ["user_medication_id"]
            isOneToOne: false
            referencedRelation: "user_medications"
            referencedColumns: ["id"]
          },
        ]
      }
      medications: {
        Row: {
          atc_code: string | null
          category: string | null
          common_dosages: string | null
          contraindications: string[] | null
          created_at: string | null
          generic_name: string | null
          id: string
          name: string
          rxnorm_code: string | null
        }
        Insert: {
          atc_code?: string | null
          category?: string | null
          common_dosages?: string | null
          contraindications?: string[] | null
          created_at?: string | null
          generic_name?: string | null
          id?: string
          name: string
          rxnorm_code?: string | null
        }
        Update: {
          atc_code?: string | null
          category?: string | null
          common_dosages?: string | null
          contraindications?: string[] | null
          created_at?: string | null
          generic_name?: string | null
          id?: string
          name?: string
          rxnorm_code?: string | null
        }
        Relationships: []
      }
      menstrual_cycle_logs: {
        Row: {
          catamenial_pattern_suspected: boolean | null
          created_at: string | null
          cycle_end_date: string | null
          cycle_length_days: number | null
          cycle_phase:
            | Database["public"]["Enums"]["menstrual_phase_enum"]
            | null
          cycle_start_date: string
          flow_intensity:
            | Database["public"]["Enums"]["menstrual_flow_enum"]
            | null
          id: string
          notes: string | null
          seizure_clustered_around_menstruation: boolean | null
          seizure_count_during_cycle: number | null
          symptom_severity: number | null
          symptoms: Database["public"]["Enums"]["symptom_type_enum"][] | null
          user_id: string
        }
        Insert: {
          catamenial_pattern_suspected?: boolean | null
          created_at?: string | null
          cycle_end_date?: string | null
          cycle_length_days?: number | null
          cycle_phase?:
            | Database["public"]["Enums"]["menstrual_phase_enum"]
            | null
          cycle_start_date: string
          flow_intensity?:
            | Database["public"]["Enums"]["menstrual_flow_enum"]
            | null
          id?: string
          notes?: string | null
          seizure_clustered_around_menstruation?: boolean | null
          seizure_count_during_cycle?: number | null
          symptom_severity?: number | null
          symptoms?: Database["public"]["Enums"]["symptom_type_enum"][] | null
          user_id: string
        }
        Update: {
          catamenial_pattern_suspected?: boolean | null
          created_at?: string | null
          cycle_end_date?: string | null
          cycle_length_days?: number | null
          cycle_phase?:
            | Database["public"]["Enums"]["menstrual_phase_enum"]
            | null
          cycle_start_date?: string
          flow_intensity?:
            | Database["public"]["Enums"]["menstrual_flow_enum"]
            | null
          id?: string
          notes?: string | null
          seizure_clustered_around_menstruation?: boolean | null
          seizure_count_during_cycle?: number | null
          symptom_severity?: number | null
          symptoms?: Database["public"]["Enums"]["symptom_type_enum"][] | null
          user_id?: string
        }
        Relationships: []
      }
      patient_clinician_connections: {
        Row: {
          clinician_id: string
          connected_at: string | null
          id: string
          patient_id: string
          status: Database["public"]["Enums"]["connection_status_enum"] | null
        }
        Insert: {
          clinician_id: string
          connected_at?: string | null
          id?: string
          patient_id: string
          status?: Database["public"]["Enums"]["connection_status_enum"] | null
        }
        Update: {
          clinician_id?: string
          connected_at?: string | null
          id?: string
          patient_id?: string
          status?: Database["public"]["Enums"]["connection_status_enum"] | null
        }
        Relationships: []
      }
      patient_onboarding_data: {
        Row: {
          completed_at: string | null
          created_at: string | null
          id: string
          research_data_types:
            | Database["public"]["Enums"]["research_data_type_enum"][]
            | null
          selected_conditions: string[] | null
          share_research_data: boolean | null
          track_menstrual_cycle: boolean | null
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          research_data_types?:
            | Database["public"]["Enums"]["research_data_type_enum"][]
            | null
          selected_conditions?: string[] | null
          share_research_data?: boolean | null
          track_menstrual_cycle?: boolean | null
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          research_data_types?:
            | Database["public"]["Enums"]["research_data_type_enum"][]
            | null
          selected_conditions?: string[] | null
          share_research_data?: boolean | null
          track_menstrual_cycle?: boolean | null
          user_id?: string
        }
        Relationships: []
      }
      patient_profiles: {
        Row: {
          created_at: string | null
          date_of_birth: string | null
          first_name: string | null
          gender: Database["public"]["Enums"]["gender_enum"] | null
          id: string
          last_name: string | null
          timezone: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          date_of_birth?: string | null
          first_name?: string | null
          gender?: Database["public"]["Enums"]["gender_enum"] | null
          id?: string
          last_name?: string | null
          timezone?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          date_of_birth?: string | null
          first_name?: string | null
          gender?: Database["public"]["Enums"]["gender_enum"] | null
          id?: string
          last_name?: string | null
          timezone?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          id: string
          onboarding_completed: boolean | null
          research_user_id: string | null
          updated_at: string | null
          user_type: Database["public"]["Enums"]["user_type_enum"]
        }
        Insert: {
          created_at?: string | null
          id: string
          onboarding_completed?: boolean | null
          research_user_id?: string | null
          updated_at?: string | null
          user_type: Database["public"]["Enums"]["user_type_enum"]
        }
        Update: {
          created_at?: string | null
          id?: string
          onboarding_completed?: boolean | null
          research_user_id?: string | null
          updated_at?: string | null
          user_type?: Database["public"]["Enums"]["user_type_enum"]
        }
        Relationships: []
      }
      research_consent: {
        Row: {
          consent_given_at: string | null
          consent_status:
            | Database["public"]["Enums"]["consent_status_enum"]
            | null
          consent_version: string | null
          consent_withdrawn_at: string | null
          created_at: string | null
          data_type: Database["public"]["Enums"]["research_data_type_enum"]
          id: string
          user_id: string
        }
        Insert: {
          consent_given_at?: string | null
          consent_status?:
            | Database["public"]["Enums"]["consent_status_enum"]
            | null
          consent_version?: string | null
          consent_withdrawn_at?: string | null
          created_at?: string | null
          data_type: Database["public"]["Enums"]["research_data_type_enum"]
          id?: string
          user_id: string
        }
        Update: {
          consent_given_at?: string | null
          consent_status?:
            | Database["public"]["Enums"]["consent_status_enum"]
            | null
          consent_version?: string | null
          consent_withdrawn_at?: string | null
          created_at?: string | null
          data_type?: Database["public"]["Enums"]["research_data_type_enum"]
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      research_medication_adherence: {
        Row: {
          adherence_status:
            | Database["public"]["Enums"]["medication_adherence_enum"]
            | null
          age_range: Database["public"]["Enums"]["age_range_enum"] | null
          created_at: string | null
          days_since_baseline: number | null
          gender: Database["public"]["Enums"]["gender_enum"] | null
          id: string
          medication_category: string | null
          medication_generic_name: string | null
          plasma_level: number | null
          research_user_id: string
          side_effect_severity:
            | Database["public"]["Enums"]["side_effect_severity_enum"]
            | null
          side_effects_present: boolean | null
        }
        Insert: {
          adherence_status?:
            | Database["public"]["Enums"]["medication_adherence_enum"]
            | null
          age_range?: Database["public"]["Enums"]["age_range_enum"] | null
          created_at?: string | null
          days_since_baseline?: number | null
          gender?: Database["public"]["Enums"]["gender_enum"] | null
          id?: string
          medication_category?: string | null
          medication_generic_name?: string | null
          plasma_level?: number | null
          research_user_id: string
          side_effect_severity?:
            | Database["public"]["Enums"]["side_effect_severity_enum"]
            | null
          side_effects_present?: boolean | null
        }
        Update: {
          adherence_status?:
            | Database["public"]["Enums"]["medication_adherence_enum"]
            | null
          age_range?: Database["public"]["Enums"]["age_range_enum"] | null
          created_at?: string | null
          days_since_baseline?: number | null
          gender?: Database["public"]["Enums"]["gender_enum"] | null
          id?: string
          medication_category?: string | null
          medication_generic_name?: string | null
          plasma_level?: number | null
          research_user_id?: string
          side_effect_severity?:
            | Database["public"]["Enums"]["side_effect_severity_enum"]
            | null
          side_effects_present?: boolean | null
        }
        Relationships: []
      }
      research_menstrual_seizure_correlation: {
        Row: {
          age_range: Database["public"]["Enums"]["age_range_enum"] | null
          created_at: string | null
          cycle_day: number | null
          cycle_phase:
            | Database["public"]["Enums"]["menstrual_phase_enum"]
            | null
          id: string
          research_user_id: string
          seizure_occurred: boolean | null
          seizure_type: Database["public"]["Enums"]["seizure_type_enum"] | null
        }
        Insert: {
          age_range?: Database["public"]["Enums"]["age_range_enum"] | null
          created_at?: string | null
          cycle_day?: number | null
          cycle_phase?:
            | Database["public"]["Enums"]["menstrual_phase_enum"]
            | null
          id?: string
          research_user_id: string
          seizure_occurred?: boolean | null
          seizure_type?: Database["public"]["Enums"]["seizure_type_enum"] | null
        }
        Update: {
          age_range?: Database["public"]["Enums"]["age_range_enum"] | null
          created_at?: string | null
          cycle_day?: number | null
          cycle_phase?:
            | Database["public"]["Enums"]["menstrual_phase_enum"]
            | null
          id?: string
          research_user_id?: string
          seizure_occurred?: boolean | null
          seizure_type?: Database["public"]["Enums"]["seizure_type_enum"] | null
        }
        Relationships: []
      }
      research_seizure_events: {
        Row: {
          age_range: Database["public"]["Enums"]["age_range_enum"] | null
          aura_present: boolean | null
          consciousness_level:
            | Database["public"]["Enums"]["consciousness_level_enum"]
            | null
          created_at: string | null
          days_since_baseline: number | null
          duration_seconds: number | null
          emergency_services_called: boolean | null
          gender: Database["public"]["Enums"]["gender_enum"] | null
          geographic_region:
            | Database["public"]["Enums"]["geographic_region_enum"]
            | null
          hospitalized: boolean | null
          id: string
          identified_triggers:
            | Database["public"]["Enums"]["seizure_trigger_enum"][]
            | null
          medication_adherence_prior:
            | Database["public"]["Enums"]["medication_adherence_enum"]
            | null
          post_ictal_confusion_minutes: number | null
          rescue_medication_used: boolean | null
          research_user_id: string
          seizure_type: Database["public"]["Enums"]["seizure_type_enum"] | null
          sleep_hours_prior: number | null
          stress_level_category: string | null
          time_of_day_category: string | null
          witnessed: boolean | null
        }
        Insert: {
          age_range?: Database["public"]["Enums"]["age_range_enum"] | null
          aura_present?: boolean | null
          consciousness_level?:
            | Database["public"]["Enums"]["consciousness_level_enum"]
            | null
          created_at?: string | null
          days_since_baseline?: number | null
          duration_seconds?: number | null
          emergency_services_called?: boolean | null
          gender?: Database["public"]["Enums"]["gender_enum"] | null
          geographic_region?:
            | Database["public"]["Enums"]["geographic_region_enum"]
            | null
          hospitalized?: boolean | null
          id?: string
          identified_triggers?:
            | Database["public"]["Enums"]["seizure_trigger_enum"][]
            | null
          medication_adherence_prior?:
            | Database["public"]["Enums"]["medication_adherence_enum"]
            | null
          post_ictal_confusion_minutes?: number | null
          rescue_medication_used?: boolean | null
          research_user_id: string
          seizure_type?: Database["public"]["Enums"]["seizure_type_enum"] | null
          sleep_hours_prior?: number | null
          stress_level_category?: string | null
          time_of_day_category?: string | null
          witnessed?: boolean | null
        }
        Update: {
          age_range?: Database["public"]["Enums"]["age_range_enum"] | null
          aura_present?: boolean | null
          consciousness_level?:
            | Database["public"]["Enums"]["consciousness_level_enum"]
            | null
          created_at?: string | null
          days_since_baseline?: number | null
          duration_seconds?: number | null
          emergency_services_called?: boolean | null
          gender?: Database["public"]["Enums"]["gender_enum"] | null
          geographic_region?:
            | Database["public"]["Enums"]["geographic_region_enum"]
            | null
          hospitalized?: boolean | null
          id?: string
          identified_triggers?:
            | Database["public"]["Enums"]["seizure_trigger_enum"][]
            | null
          medication_adherence_prior?:
            | Database["public"]["Enums"]["medication_adherence_enum"]
            | null
          post_ictal_confusion_minutes?: number | null
          rescue_medication_used?: boolean | null
          research_user_id?: string
          seizure_type?: Database["public"]["Enums"]["seizure_type_enum"] | null
          sleep_hours_prior?: number | null
          stress_level_category?: string | null
          time_of_day_category?: string | null
          witnessed?: boolean | null
        }
        Relationships: []
      }
      research_symptom_patterns: {
        Row: {
          age_range: Database["public"]["Enums"]["age_range_enum"] | null
          created_at: string | null
          days_since_baseline: number | null
          duration_minutes: number | null
          gender: Database["public"]["Enums"]["gender_enum"] | null
          id: string
          identified_triggers:
            | Database["public"]["Enums"]["seizure_trigger_enum"][]
            | null
          research_user_id: string
          severity: number | null
          symptom_type: Database["public"]["Enums"]["symptom_type_enum"] | null
        }
        Insert: {
          age_range?: Database["public"]["Enums"]["age_range_enum"] | null
          created_at?: string | null
          days_since_baseline?: number | null
          duration_minutes?: number | null
          gender?: Database["public"]["Enums"]["gender_enum"] | null
          id?: string
          identified_triggers?:
            | Database["public"]["Enums"]["seizure_trigger_enum"][]
            | null
          research_user_id: string
          severity?: number | null
          symptom_type?: Database["public"]["Enums"]["symptom_type_enum"] | null
        }
        Update: {
          age_range?: Database["public"]["Enums"]["age_range_enum"] | null
          created_at?: string | null
          days_since_baseline?: number | null
          duration_minutes?: number | null
          gender?: Database["public"]["Enums"]["gender_enum"] | null
          id?: string
          identified_triggers?:
            | Database["public"]["Enums"]["seizure_trigger_enum"][]
            | null
          research_user_id?: string
          severity?: number | null
          symptom_type?: Database["public"]["Enums"]["symptom_type_enum"] | null
        }
        Relationships: []
      }
      research_user_mapping: {
        Row: {
          created_at: string | null
          id: string
          research_user_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          research_user_id?: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          research_user_id?: string
          user_id?: string
        }
        Relationships: []
      }
      seizure_logs: {
        Row: {
          aura_description: string | null
          aura_present: boolean | null
          consciousness_level:
            | Database["public"]["Enums"]["consciousness_level_enum"]
            | null
          created_at: string | null
          duration_seconds: number | null
          emergency_services_called: boolean | null
          event_date: string
          event_time: string | null
          hospitalized: boolean | null
          id: string
          identified_triggers:
            | Database["public"]["Enums"]["seizure_trigger_enum"][]
            | null
          location_type: string | null
          medication_adherence_prior:
            | Database["public"]["Enums"]["medication_adherence_enum"]
            | null
          notes: string | null
          post_ictal_confusion_minutes: number | null
          post_ictal_symptoms:
            | Database["public"]["Enums"]["symptom_type_enum"][]
            | null
          pre_ictal_symptoms:
            | Database["public"]["Enums"]["symptom_type_enum"][]
            | null
          recovery_time_minutes: number | null
          rescue_medication_name: string | null
          rescue_medication_used: boolean | null
          seizure_type: Database["public"]["Enums"]["seizure_type_enum"]
          sleep_hours_prior: number | null
          stress_level: number | null
          user_id: string
          video_recorded: boolean | null
          witness_name: string | null
          witnessed: boolean | null
        }
        Insert: {
          aura_description?: string | null
          aura_present?: boolean | null
          consciousness_level?:
            | Database["public"]["Enums"]["consciousness_level_enum"]
            | null
          created_at?: string | null
          duration_seconds?: number | null
          emergency_services_called?: boolean | null
          event_date: string
          event_time?: string | null
          hospitalized?: boolean | null
          id?: string
          identified_triggers?:
            | Database["public"]["Enums"]["seizure_trigger_enum"][]
            | null
          location_type?: string | null
          medication_adherence_prior?:
            | Database["public"]["Enums"]["medication_adherence_enum"]
            | null
          notes?: string | null
          post_ictal_confusion_minutes?: number | null
          post_ictal_symptoms?:
            | Database["public"]["Enums"]["symptom_type_enum"][]
            | null
          pre_ictal_symptoms?:
            | Database["public"]["Enums"]["symptom_type_enum"][]
            | null
          recovery_time_minutes?: number | null
          rescue_medication_name?: string | null
          rescue_medication_used?: boolean | null
          seizure_type: Database["public"]["Enums"]["seizure_type_enum"]
          sleep_hours_prior?: number | null
          stress_level?: number | null
          user_id: string
          video_recorded?: boolean | null
          witness_name?: string | null
          witnessed?: boolean | null
        }
        Update: {
          aura_description?: string | null
          aura_present?: boolean | null
          consciousness_level?:
            | Database["public"]["Enums"]["consciousness_level_enum"]
            | null
          created_at?: string | null
          duration_seconds?: number | null
          emergency_services_called?: boolean | null
          event_date?: string
          event_time?: string | null
          hospitalized?: boolean | null
          id?: string
          identified_triggers?:
            | Database["public"]["Enums"]["seizure_trigger_enum"][]
            | null
          location_type?: string | null
          medication_adherence_prior?:
            | Database["public"]["Enums"]["medication_adherence_enum"]
            | null
          notes?: string | null
          post_ictal_confusion_minutes?: number | null
          post_ictal_symptoms?:
            | Database["public"]["Enums"]["symptom_type_enum"][]
            | null
          pre_ictal_symptoms?:
            | Database["public"]["Enums"]["symptom_type_enum"][]
            | null
          recovery_time_minutes?: number | null
          rescue_medication_name?: string | null
          rescue_medication_used?: boolean | null
          seizure_type?: Database["public"]["Enums"]["seizure_type_enum"]
          sleep_hours_prior?: number | null
          stress_level?: number | null
          user_id?: string
          video_recorded?: boolean | null
          witness_name?: string | null
          witnessed?: boolean | null
        }
        Relationships: []
      }
      symptom_logs: {
        Row: {
          body_locations:
            | Database["public"]["Enums"]["body_location_enum"][]
            | null
          created_at: string | null
          duration_minutes: number | null
          id: string
          identified_triggers:
            | Database["public"]["Enums"]["seizure_trigger_enum"][]
            | null
          impact_on_daily_activities: number | null
          log_date: string
          log_time: string | null
          notes: string | null
          relief_effectiveness: number | null
          relief_methods_tried: string[] | null
          severity: number
          symptom_type: Database["public"]["Enums"]["symptom_type_enum"]
          user_id: string
          work_school_affected: boolean | null
        }
        Insert: {
          body_locations?:
            | Database["public"]["Enums"]["body_location_enum"][]
            | null
          created_at?: string | null
          duration_minutes?: number | null
          id?: string
          identified_triggers?:
            | Database["public"]["Enums"]["seizure_trigger_enum"][]
            | null
          impact_on_daily_activities?: number | null
          log_date: string
          log_time?: string | null
          notes?: string | null
          relief_effectiveness?: number | null
          relief_methods_tried?: string[] | null
          severity: number
          symptom_type: Database["public"]["Enums"]["symptom_type_enum"]
          user_id: string
          work_school_affected?: boolean | null
        }
        Update: {
          body_locations?:
            | Database["public"]["Enums"]["body_location_enum"][]
            | null
          created_at?: string | null
          duration_minutes?: number | null
          id?: string
          identified_triggers?:
            | Database["public"]["Enums"]["seizure_trigger_enum"][]
            | null
          impact_on_daily_activities?: number | null
          log_date?: string
          log_time?: string | null
          notes?: string | null
          relief_effectiveness?: number | null
          relief_methods_tried?: string[] | null
          severity?: number
          symptom_type?: Database["public"]["Enums"]["symptom_type_enum"]
          user_id?: string
          work_school_affected?: boolean | null
        }
        Relationships: []
      }
      user_achievements: {
        Row: {
          achievement_code: string
          id: string
          unlocked_at: string | null
          user_id: string
        }
        Insert: {
          achievement_code: string
          id?: string
          unlocked_at?: string | null
          user_id: string
        }
        Update: {
          achievement_code?: string
          id?: string
          unlocked_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_conditions: {
        Row: {
          condition_id: string
          created_at: string | null
          diagnosis_date: string | null
          id: string
          severity: number | null
          tracking_features_enabled:
            | Database["public"]["Enums"]["tracking_feature_enum"][]
            | null
          user_id: string
        }
        Insert: {
          condition_id: string
          created_at?: string | null
          diagnosis_date?: string | null
          id?: string
          severity?: number | null
          tracking_features_enabled?:
            | Database["public"]["Enums"]["tracking_feature_enum"][]
            | null
          user_id: string
        }
        Update: {
          condition_id?: string
          created_at?: string | null
          diagnosis_date?: string | null
          id?: string
          severity?: number | null
          tracking_features_enabled?:
            | Database["public"]["Enums"]["tracking_feature_enum"][]
            | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_conditions_condition_id_fkey"
            columns: ["condition_id"]
            isOneToOne: false
            referencedRelation: "conditions"
            referencedColumns: ["id"]
          },
        ]
      }
      user_medications: {
        Row: {
          created_at: string | null
          dosage_amount: number | null
          dosage_unit: string | null
          end_date: string | null
          frequency:
            | Database["public"]["Enums"]["medication_frequency_enum"]
            | null
          id: string
          medication_id: string | null
          prescriber_name: string | null
          start_date: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          dosage_amount?: number | null
          dosage_unit?: string | null
          end_date?: string | null
          frequency?:
            | Database["public"]["Enums"]["medication_frequency_enum"]
            | null
          id?: string
          medication_id?: string | null
          prescriber_name?: string | null
          start_date?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          dosage_amount?: number | null
          dosage_unit?: string | null
          end_date?: string | null
          frequency?:
            | Database["public"]["Enums"]["medication_frequency_enum"]
            | null
          id?: string
          medication_id?: string | null
          prescriber_name?: string | null
          start_date?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_medications_medication_id_fkey"
            columns: ["medication_id"]
            isOneToOne: false
            referencedRelation: "medications"
            referencedColumns: ["id"]
          },
        ]
      }
      wearable_data_logs: {
        Row: {
          confidence_score: number | null
          created_at: string | null
          data_quality_flag: string | null
          data_type: Database["public"]["Enums"]["device_data_type_enum"]
          device_id: string | null
          id: string
          recorded_at: string
          user_id: string
          value_numeric: number | null
          value_text: string | null
          value_unit: string | null
        }
        Insert: {
          confidence_score?: number | null
          created_at?: string | null
          data_quality_flag?: string | null
          data_type: Database["public"]["Enums"]["device_data_type_enum"]
          device_id?: string | null
          id?: string
          recorded_at: string
          user_id: string
          value_numeric?: number | null
          value_text?: string | null
          value_unit?: string | null
        }
        Update: {
          confidence_score?: number | null
          created_at?: string | null
          data_quality_flag?: string | null
          data_type?: Database["public"]["Enums"]["device_data_type_enum"]
          device_id?: string | null
          id?: string
          recorded_at?: string
          user_id?: string
          value_numeric?: number | null
          value_text?: string | null
          value_unit?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "wearable_data_logs_device_id_fkey"
            columns: ["device_id"]
            isOneToOne: false
            referencedRelation: "wearable_devices"
            referencedColumns: ["id"]
          },
        ]
      }
      wearable_devices: {
        Row: {
          active: boolean | null
          connected_at: string | null
          created_at: string | null
          device_name: string | null
          device_type: Database["public"]["Enums"]["device_type_enum"]
          id: string
          last_sync_at: string | null
          manufacturer: string | null
          model: string | null
          serial_number: string | null
          user_id: string
        }
        Insert: {
          active?: boolean | null
          connected_at?: string | null
          created_at?: string | null
          device_name?: string | null
          device_type: Database["public"]["Enums"]["device_type_enum"]
          id?: string
          last_sync_at?: string | null
          manufacturer?: string | null
          model?: string | null
          serial_number?: string | null
          user_id: string
        }
        Update: {
          active?: boolean | null
          connected_at?: string | null
          created_at?: string | null
          device_name?: string | null
          device_type?: Database["public"]["Enums"]["device_type_enum"]
          id?: string
          last_sync_at?: string | null
          manufacturer?: string | null
          model?: string | null
          serial_number?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      cleanup_old_audit_logs: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      hash_ip: {
        Args: { ip: unknown }
        Returns: string
      }
    }
    Enums: {
      age_range_enum:
        | "0_4"
        | "5_9"
        | "10_14"
        | "15_19"
        | "20_24"
        | "25_29"
        | "30_34"
        | "35_39"
        | "40_44"
        | "45_49"
        | "50_54"
        | "55_59"
        | "60_64"
        | "65_69"
        | "70_74"
        | "75_79"
        | "80_plus"
      body_location_enum:
        | "head"
        | "face"
        | "neck"
        | "chest"
        | "abdomen"
        | "back"
        | "left_arm"
        | "right_arm"
        | "left_leg"
        | "right_leg"
        | "left_hand"
        | "right_hand"
        | "generalized"
        | "other"
      connection_status_enum:
        | "pending"
        | "active"
        | "inactive"
        | "rejected"
        | "expired"
        | "verification_required"
        | "revoked"
      consciousness_level_enum:
        | "fully_conscious"
        | "impaired_awareness"
        | "loss_of_consciousness"
        | "confusion"
        | "unknown"
      consent_status_enum: "pending" | "active" | "withdrawn" | "expired"
      device_data_type_enum:
        | "heart_rate"
        | "heart_rate_variability"
        | "blood_oxygen"
        | "sleep_stages"
        | "steps"
        | "activity_level"
        | "skin_temperature"
        | "eeg_signal"
        | "seizure_detection"
        | "fall_detection"
        | "location"
        | "other"
      device_type_enum:
        | "smartwatch"
        | "fitness_tracker"
        | "eeg_headband"
        | "continuous_glucose_monitor"
        | "heart_rate_monitor"
        | "seizure_detection_device"
        | "other"
      energy_level_enum: "exhausted" | "low" | "moderate" | "high" | "very_high"
      gender_enum:
        | "male"
        | "female"
        | "non_binary"
        | "other"
        | "prefer_not_to_say"
      geographic_region_enum:
        | "north_america"
        | "south_america"
        | "europe"
        | "asia"
        | "africa"
        | "oceania"
        | "unknown"
      medication_adherence_enum:
        | "taken_on_time"
        | "taken_late"
        | "missed"
        | "double_dose"
        | "reduced_dose"
      medication_frequency_enum:
        | "once_daily"
        | "twice_daily"
        | "three_times_daily"
        | "four_times_daily"
        | "every_other_day"
        | "weekly"
        | "as_needed"
        | "other"
      menstrual_flow_enum:
        | "spotting"
        | "light"
        | "moderate"
        | "heavy"
        | "very_heavy"
      menstrual_phase_enum: "menstrual" | "follicular" | "ovulation" | "luteal"
      mood_type_enum: "very_poor" | "poor" | "neutral" | "good" | "very_good"
      relationship_enum:
        | "parent"
        | "spouse"
        | "partner"
        | "child"
        | "sibling"
        | "friend"
        | "caregiver"
        | "other"
      research_data_type_enum:
        | "seizure_data"
        | "medication_data"
        | "symptom_data"
        | "menstrual_data"
        | "wearable_data"
        | "genetic_data"
        | "imaging_data"
        | "location_data"
        | "demographic_data"
        | "all_data"
      seizure_trigger_enum:
        | "stress"
        | "sleep_deprivation"
        | "missed_medication"
        | "alcohol"
        | "illness"
        | "menstruation"
        | "flashing_lights"
        | "heat"
        | "dehydration"
        | "exercise"
        | "unknown"
        | "none_identified"
      seizure_type_enum:
        | "generalized_tonic_clonic"
        | "focal_aware"
        | "focal_impaired_awareness"
        | "focal_to_bilateral_tonic_clonic"
        | "absence"
        | "myoclonic"
        | "atonic"
        | "tonic"
        | "clonic"
        | "epileptic_spasm"
        | "unknown"
      side_effect_severity_enum:
        | "none"
        | "mild"
        | "moderate"
        | "severe"
        | "life_threatening"
      sleep_quality_enum: "very_poor" | "poor" | "fair" | "good" | "excellent"
      symptom_type_enum:
        | "headache"
        | "dizziness"
        | "nausea"
        | "fatigue"
        | "tremor"
        | "numbness"
        | "tingling"
        | "vision_changes"
        | "balance_issues"
        | "cognitive_fog"
        | "memory_issues"
        | "mood_changes"
        | "sleep_disturbance"
        | "pain"
        | "weakness"
        | "other"
      tracking_feature_enum:
        | "seizure"
        | "tremor"
        | "gait"
        | "menstruation"
        | "temperature"
        | "mood"
        | "energy"
        | "sleep"
        | "symptoms"
        | "medication"
        | "heart_rate"
        | "blood_pressure"
        | "weight"
        | "exercise"
      user_type_enum: "patient" | "carer" | "clinician" | "researcher" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      age_range_enum: [
        "0_4",
        "5_9",
        "10_14",
        "15_19",
        "20_24",
        "25_29",
        "30_34",
        "35_39",
        "40_44",
        "45_49",
        "50_54",
        "55_59",
        "60_64",
        "65_69",
        "70_74",
        "75_79",
        "80_plus",
      ],
      body_location_enum: [
        "head",
        "face",
        "neck",
        "chest",
        "abdomen",
        "back",
        "left_arm",
        "right_arm",
        "left_leg",
        "right_leg",
        "left_hand",
        "right_hand",
        "generalized",
        "other",
      ],
      connection_status_enum: [
        "pending",
        "active",
        "inactive",
        "rejected",
        "expired",
        "verification_required",
        "revoked",
      ],
      consciousness_level_enum: [
        "fully_conscious",
        "impaired_awareness",
        "loss_of_consciousness",
        "confusion",
        "unknown",
      ],
      consent_status_enum: ["pending", "active", "withdrawn", "expired"],
      device_data_type_enum: [
        "heart_rate",
        "heart_rate_variability",
        "blood_oxygen",
        "sleep_stages",
        "steps",
        "activity_level",
        "skin_temperature",
        "eeg_signal",
        "seizure_detection",
        "fall_detection",
        "location",
        "other",
      ],
      device_type_enum: [
        "smartwatch",
        "fitness_tracker",
        "eeg_headband",
        "continuous_glucose_monitor",
        "heart_rate_monitor",
        "seizure_detection_device",
        "other",
      ],
      energy_level_enum: ["exhausted", "low", "moderate", "high", "very_high"],
      gender_enum: [
        "male",
        "female",
        "non_binary",
        "other",
        "prefer_not_to_say",
      ],
      geographic_region_enum: [
        "north_america",
        "south_america",
        "europe",
        "asia",
        "africa",
        "oceania",
        "unknown",
      ],
      medication_adherence_enum: [
        "taken_on_time",
        "taken_late",
        "missed",
        "double_dose",
        "reduced_dose",
      ],
      medication_frequency_enum: [
        "once_daily",
        "twice_daily",
        "three_times_daily",
        "four_times_daily",
        "every_other_day",
        "weekly",
        "as_needed",
        "other",
      ],
      menstrual_flow_enum: [
        "spotting",
        "light",
        "moderate",
        "heavy",
        "very_heavy",
      ],
      menstrual_phase_enum: ["menstrual", "follicular", "ovulation", "luteal"],
      mood_type_enum: ["very_poor", "poor", "neutral", "good", "very_good"],
      relationship_enum: [
        "parent",
        "spouse",
        "partner",
        "child",
        "sibling",
        "friend",
        "caregiver",
        "other",
      ],
      research_data_type_enum: [
        "seizure_data",
        "medication_data",
        "symptom_data",
        "menstrual_data",
        "wearable_data",
        "genetic_data",
        "imaging_data",
        "location_data",
        "demographic_data",
        "all_data",
      ],
      seizure_trigger_enum: [
        "stress",
        "sleep_deprivation",
        "missed_medication",
        "alcohol",
        "illness",
        "menstruation",
        "flashing_lights",
        "heat",
        "dehydration",
        "exercise",
        "unknown",
        "none_identified",
      ],
      seizure_type_enum: [
        "generalized_tonic_clonic",
        "focal_aware",
        "focal_impaired_awareness",
        "focal_to_bilateral_tonic_clonic",
        "absence",
        "myoclonic",
        "atonic",
        "tonic",
        "clonic",
        "epileptic_spasm",
        "unknown",
      ],
      side_effect_severity_enum: [
        "none",
        "mild",
        "moderate",
        "severe",
        "life_threatening",
      ],
      sleep_quality_enum: ["very_poor", "poor", "fair", "good", "excellent"],
      symptom_type_enum: [
        "headache",
        "dizziness",
        "nausea",
        "fatigue",
        "tremor",
        "numbness",
        "tingling",
        "vision_changes",
        "balance_issues",
        "cognitive_fog",
        "memory_issues",
        "mood_changes",
        "sleep_disturbance",
        "pain",
        "weakness",
        "other",
      ],
      tracking_feature_enum: [
        "seizure",
        "tremor",
        "gait",
        "menstruation",
        "temperature",
        "mood",
        "energy",
        "sleep",
        "symptoms",
        "medication",
        "heart_rate",
        "blood_pressure",
        "weight",
        "exercise",
      ],
      user_type_enum: ["patient", "carer", "clinician", "researcher", "admin"],
    },
  },
} as const

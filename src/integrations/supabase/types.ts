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
      achievements: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          name: string
          points: number | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          points?: number | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          points?: number | null
        }
        Relationships: []
      }
      api_request_logs: {
        Row: {
          created_at: string
          duration_ms: number | null
          endpoint: string
          error_message: string | null
          error_type: string | null
          id: string
          ip_address: unknown | null
          method: string
          rate_limit_remaining: number | null
          request_time: string
          response_time: string | null
          session_id: string | null
          status_code: number | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          duration_ms?: number | null
          endpoint: string
          error_message?: string | null
          error_type?: string | null
          id?: string
          ip_address?: unknown | null
          method: string
          rate_limit_remaining?: number | null
          request_time?: string
          response_time?: string | null
          session_id?: string | null
          status_code?: number | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          duration_ms?: number | null
          endpoint?: string
          error_message?: string | null
          error_type?: string | null
          id?: string
          ip_address?: unknown | null
          method?: string
          rate_limit_remaining?: number | null
          request_time?: string
          response_time?: string | null
          session_id?: string | null
          status_code?: number | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      audit_log: {
        Row: {
          action: string
          created_at: string | null
          id: string
          ip_address_hash: string | null
          new_values: Json | null
          old_values: Json | null
          record_id: string | null
          table_name: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          id?: string
          ip_address_hash?: string | null
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          id?: string
          ip_address_hash?: string | null
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      brain_regions_reference: {
        Row: {
          created_at: string | null
          display_name: string
          function_description: string | null
          laterality: Database["public"]["Enums"]["laterality_enum"] | null
          lobe: Database["public"]["Enums"]["brain_lobe_enum"]
          region_id: number
          subregion: Database["public"]["Enums"]["brain_subregion_enum"] | null
        }
        Insert: {
          created_at?: string | null
          display_name: string
          function_description?: string | null
          laterality?: Database["public"]["Enums"]["laterality_enum"] | null
          lobe: Database["public"]["Enums"]["brain_lobe_enum"]
          region_id?: number
          subregion?: Database["public"]["Enums"]["brain_subregion_enum"] | null
        }
        Update: {
          created_at?: string | null
          display_name?: string
          function_description?: string | null
          laterality?: Database["public"]["Enums"]["laterality_enum"] | null
          lobe?: Database["public"]["Enums"]["brain_lobe_enum"]
          region_id?: number
          subregion?: Database["public"]["Enums"]["brain_subregion_enum"] | null
        }
        Relationships: []
      }
      carer_invitations: {
        Row: {
          accepted_at: string | null
          cancelled_at: string | null
          carer_email: string
          carer_email_hash: string
          carer_user_id: string | null
          created_at: string | null
          dob_verification_attempts: number | null
          expires_at: string | null
          id: string
          invitation_token: string
          invited_at: string | null
          last_verification_attempt: string | null
          max_dob_attempts: number | null
          patient_user_id: string
          relationship_id: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          accepted_at?: string | null
          cancelled_at?: string | null
          carer_email: string
          carer_email_hash: string
          carer_user_id?: string | null
          created_at?: string | null
          dob_verification_attempts?: number | null
          expires_at?: string | null
          id?: string
          invitation_token?: string
          invited_at?: string | null
          last_verification_attempt?: string | null
          max_dob_attempts?: number | null
          patient_user_id: string
          relationship_id: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          accepted_at?: string | null
          cancelled_at?: string | null
          carer_email?: string
          carer_email_hash?: string
          carer_user_id?: string | null
          created_at?: string | null
          dob_verification_attempts?: number | null
          expires_at?: string | null
          id?: string
          invitation_token?: string
          invited_at?: string | null
          last_verification_attempt?: string | null
          max_dob_attempts?: number | null
          patient_user_id?: string
          relationship_id?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "carer_invitations_relationship_id_fkey"
            columns: ["relationship_id"]
            isOneToOne: false
            referencedRelation: "carer_relationships"
            referencedColumns: ["id"]
          },
        ]
      }
      carer_onboarding_data: {
        Row: {
          completed_at: string | null
          created_at: string | null
          first_name: string | null
          id: string
          last_name: string | null
          middle_name: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          middle_name?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          middle_name?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      carer_profiles: {
        Row: {
          availability_notes: string | null
          certifications: string[] | null
          created_at: string | null
          date_of_birth: string | null
          first_name: string | null
          id: string
          last_name: string | null
          middle_name: string | null
          patient_dob_verification: string | null
          phone_number: string | null
          preferred_contact_method: string | null
          relationship_to_patient: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          availability_notes?: string | null
          certifications?: string[] | null
          created_at?: string | null
          date_of_birth?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          middle_name?: string | null
          patient_dob_verification?: string | null
          phone_number?: string | null
          preferred_contact_method?: string | null
          relationship_to_patient?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          availability_notes?: string | null
          certifications?: string[] | null
          created_at?: string | null
          date_of_birth?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          middle_name?: string | null
          patient_dob_verification?: string | null
          phone_number?: string | null
          preferred_contact_method?: string | null
          relationship_to_patient?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      carer_relationships: {
        Row: {
          approved_at: string | null
          can_manage_appointments: boolean | null
          can_receive_alerts: boolean | null
          can_view_health_data: boolean | null
          carer_user_id: string | null
          created_at: string
          id: string
          invited_at: string | null
          patient_user_id: string
          relationship_details: string | null
          relationship_type: string
          status: string
          terminated_at: string | null
          termination_reason: string | null
          updated_at: string | null
        }
        Insert: {
          approved_at?: string | null
          can_manage_appointments?: boolean | null
          can_receive_alerts?: boolean | null
          can_view_health_data?: boolean | null
          carer_user_id?: string | null
          created_at?: string
          id?: string
          invited_at?: string | null
          patient_user_id: string
          relationship_details?: string | null
          relationship_type: string
          status?: string
          terminated_at?: string | null
          termination_reason?: string | null
          updated_at?: string | null
        }
        Update: {
          approved_at?: string | null
          can_manage_appointments?: boolean | null
          can_receive_alerts?: boolean | null
          can_view_health_data?: boolean | null
          carer_user_id?: string | null
          created_at?: string
          id?: string
          invited_at?: string | null
          patient_user_id?: string
          relationship_details?: string | null
          relationship_type?: string
          status?: string
          terminated_at?: string | null
          termination_reason?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      clinician_profiles: {
        Row: {
          accepting_new_patients: boolean | null
          clinician_title: string | null
          created_at: string | null
          department: string | null
          first_name: string | null
          id: string
          institution: string | null
          last_name: string | null
          license_number: string | null
          middle_name: string | null
          patient_capacity: number | null
          preferred_communication: string | null
          specialty: string | null
          sub_specialty: string | null
          updated_at: string | null
          user_id: string
          years_in_practice: number | null
        }
        Insert: {
          accepting_new_patients?: boolean | null
          clinician_title?: string | null
          created_at?: string | null
          department?: string | null
          first_name?: string | null
          id?: string
          institution?: string | null
          last_name?: string | null
          license_number?: string | null
          middle_name?: string | null
          patient_capacity?: number | null
          preferred_communication?: string | null
          specialty?: string | null
          sub_specialty?: string | null
          updated_at?: string | null
          user_id: string
          years_in_practice?: number | null
        }
        Update: {
          accepting_new_patients?: boolean | null
          clinician_title?: string | null
          created_at?: string | null
          department?: string | null
          first_name?: string | null
          id?: string
          institution?: string | null
          last_name?: string | null
          license_number?: string | null
          middle_name?: string | null
          patient_capacity?: number | null
          preferred_communication?: string | null
          specialty?: string | null
          sub_specialty?: string | null
          updated_at?: string | null
          user_id?: string
          years_in_practice?: number | null
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
          basal_temp_time: string | null
          created_at: string | null
          custom_tracking_items: Json | null
          id: string
          medication_times: string[] | null
          tracking_times: string[] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          basal_temp_time?: string | null
          created_at?: string | null
          custom_tracking_items?: Json | null
          id?: string
          medication_times?: string[] | null
          tracking_times?: string[] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          basal_temp_time?: string | null
          created_at?: string | null
          custom_tracking_items?: Json | null
          id?: string
          medication_times?: string[] | null
          tracking_times?: string[] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      data_sharing_preferences: {
        Row: {
          carer_access_rules: Json | null
          clinician_access_rules: Json | null
          created_at: string | null
          daily_logs_visibility: string | null
          default_share_with_carers: boolean | null
          default_share_with_clinicians: boolean | null
          default_share_with_researchers: boolean | null
          gait_episodes_visibility: string | null
          id: string
          media_visibility: string | null
          medications_visibility: string | null
          patient_id: string
          research_demographic_data: boolean | null
          research_gait_data: boolean | null
          research_imaging_data: boolean | null
          research_medication_data: boolean | null
          research_seizure_data: boolean | null
          research_symptom_data: boolean | null
          research_tremor_data: boolean | null
          seizure_events_visibility: string | null
          tremor_episodes_visibility: string | null
          updated_at: string | null
        }
        Insert: {
          carer_access_rules?: Json | null
          clinician_access_rules?: Json | null
          created_at?: string | null
          daily_logs_visibility?: string | null
          default_share_with_carers?: boolean | null
          default_share_with_clinicians?: boolean | null
          default_share_with_researchers?: boolean | null
          gait_episodes_visibility?: string | null
          id?: string
          media_visibility?: string | null
          medications_visibility?: string | null
          patient_id: string
          research_demographic_data?: boolean | null
          research_gait_data?: boolean | null
          research_imaging_data?: boolean | null
          research_medication_data?: boolean | null
          research_seizure_data?: boolean | null
          research_symptom_data?: boolean | null
          research_tremor_data?: boolean | null
          seizure_events_visibility?: string | null
          tremor_episodes_visibility?: string | null
          updated_at?: string | null
        }
        Update: {
          carer_access_rules?: Json | null
          clinician_access_rules?: Json | null
          created_at?: string | null
          daily_logs_visibility?: string | null
          default_share_with_carers?: boolean | null
          default_share_with_clinicians?: boolean | null
          default_share_with_researchers?: boolean | null
          gait_episodes_visibility?: string | null
          id?: string
          media_visibility?: string | null
          medications_visibility?: string | null
          patient_id?: string
          research_demographic_data?: boolean | null
          research_gait_data?: boolean | null
          research_imaging_data?: boolean | null
          research_medication_data?: boolean | null
          research_seizure_data?: boolean | null
          research_symptom_data?: boolean | null
          research_tremor_data?: boolean | null
          seizure_events_visibility?: string | null
          tremor_episodes_visibility?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      database_operation_logs: {
        Row: {
          created_at: string
          error_message: string | null
          executed_at: string
          executed_by_role: string | null
          executed_by_user_id: string | null
          id: string
          operation_detail: string | null
          operation_type: string
          rows_affected: number | null
          session_id: string | null
          sql_state: string | null
          success: boolean
          table_name: string
          table_schema: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          executed_at?: string
          executed_by_role?: string | null
          executed_by_user_id?: string | null
          id?: string
          operation_detail?: string | null
          operation_type: string
          rows_affected?: number | null
          session_id?: string | null
          sql_state?: string | null
          success: boolean
          table_name: string
          table_schema: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          executed_at?: string
          executed_by_role?: string | null
          executed_by_user_id?: string | null
          id?: string
          operation_detail?: string | null
          operation_type?: string
          rows_affected?: number | null
          session_id?: string | null
          sql_state?: string | null
          success?: boolean
          table_name?: string
          table_schema?: string
        }
        Relationships: []
      }
      function_execution_logs: {
        Row: {
          completed_at: string | null
          created_at: string
          duration_ms: number | null
          error_detail: string | null
          error_hint: string | null
          error_message: string | null
          execution_status: string
          function_name: string
          id: string
          input_parameters: Json | null
          input_user_id: string | null
          input_user_type: string | null
          return_value: Json | null
          session_id: string | null
          sql_state: string | null
          started_at: string
          success: boolean | null
          triggered_by: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          duration_ms?: number | null
          error_detail?: string | null
          error_hint?: string | null
          error_message?: string | null
          execution_status: string
          function_name: string
          id?: string
          input_parameters?: Json | null
          input_user_id?: string | null
          input_user_type?: string | null
          return_value?: Json | null
          session_id?: string | null
          sql_state?: string | null
          started_at?: string
          success?: boolean | null
          triggered_by?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          duration_ms?: number | null
          error_detail?: string | null
          error_hint?: string | null
          error_message?: string | null
          execution_status?: string
          function_name?: string
          id?: string
          input_parameters?: Json | null
          input_user_id?: string | null
          input_user_type?: string | null
          return_value?: Json | null
          session_id?: string | null
          sql_state?: string | null
          started_at?: string
          success?: boolean | null
          triggered_by?: string | null
        }
        Relationships: []
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
      menstrual_symptom_options: {
        Row: {
          active: boolean | null
          category: string
          created_at: string | null
          description: string | null
          display_order: number | null
          id: string
          symptom_name: string
        }
        Insert: {
          active?: boolean | null
          category: string
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          symptom_name: string
        }
        Update: {
          active?: boolean | null
          category?: string
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          symptom_name?: string
        }
        Relationships: []
      }
      notification_history: {
        Row: {
          action_taken: boolean | null
          created_at: string | null
          id: string
          notification_type: string
          opened_at: string | null
          sent_at: string
          user_id: string
        }
        Insert: {
          action_taken?: boolean | null
          created_at?: string | null
          id?: string
          notification_type: string
          opened_at?: string | null
          sent_at: string
          user_id: string
        }
        Update: {
          action_taken?: boolean | null
          created_at?: string | null
          id?: string
          notification_type?: string
          opened_at?: string | null
          sent_at?: string
          user_id?: string
        }
        Relationships: []
      }
      notification_preferences: {
        Row: {
          achievement_notifications: boolean | null
          appointment_reminder_hours: number | null
          appointment_reminders: boolean | null
          created_at: string | null
          critical_alerts: boolean | null
          daily_checkin_reminder: boolean | null
          daily_checkin_time: string | null
          direct_messages: boolean | null
          email_enabled: boolean | null
          id: string
          medication_reminder_minutes: number | null
          medication_reminders: boolean | null
          message_notifications: boolean | null
          pattern_alerts: boolean | null
          push_enabled: boolean | null
          quiet_hours_enabled: boolean | null
          quiet_hours_end: string | null
          quiet_hours_start: string | null
          sound_enabled: boolean | null
          updated_at: string | null
          user_id: string
          vibration_enabled: boolean | null
        }
        Insert: {
          achievement_notifications?: boolean | null
          appointment_reminder_hours?: number | null
          appointment_reminders?: boolean | null
          created_at?: string | null
          critical_alerts?: boolean | null
          daily_checkin_reminder?: boolean | null
          daily_checkin_time?: string | null
          direct_messages?: boolean | null
          email_enabled?: boolean | null
          id?: string
          medication_reminder_minutes?: number | null
          medication_reminders?: boolean | null
          message_notifications?: boolean | null
          pattern_alerts?: boolean | null
          push_enabled?: boolean | null
          quiet_hours_enabled?: boolean | null
          quiet_hours_end?: string | null
          quiet_hours_start?: string | null
          sound_enabled?: boolean | null
          updated_at?: string | null
          user_id: string
          vibration_enabled?: boolean | null
        }
        Update: {
          achievement_notifications?: boolean | null
          appointment_reminder_hours?: number | null
          appointment_reminders?: boolean | null
          created_at?: string | null
          critical_alerts?: boolean | null
          daily_checkin_reminder?: boolean | null
          daily_checkin_time?: string | null
          direct_messages?: boolean | null
          email_enabled?: boolean | null
          id?: string
          medication_reminder_minutes?: number | null
          medication_reminders?: boolean | null
          message_notifications?: boolean | null
          pattern_alerts?: boolean | null
          push_enabled?: boolean | null
          quiet_hours_enabled?: boolean | null
          quiet_hours_end?: string | null
          quiet_hours_start?: string | null
          sound_enabled?: boolean | null
          updated_at?: string | null
          user_id?: string
          vibration_enabled?: boolean | null
        }
        Relationships: []
      }
      notification_queue: {
        Row: {
          action_url: string | null
          body: string
          created_at: string | null
          id: string
          notification_type: string
          priority: string | null
          reference_id: string | null
          scheduled_for: string
          sent_at: string | null
          status: string
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          action_url?: string | null
          body: string
          created_at?: string | null
          id?: string
          notification_type: string
          priority?: string | null
          reference_id?: string | null
          scheduled_for: string
          sent_at?: string | null
          status?: string
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          action_url?: string | null
          body?: string
          created_at?: string | null
          id?: string
          notification_type?: string
          priority?: string | null
          reference_id?: string | null
          scheduled_for?: string
          sent_at?: string | null
          status?: string
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      patient_clinician_connections: {
        Row: {
          access_expires_at: string | null
          access_level: string | null
          approved_at: string | null
          clinician_id: string
          connected_at: string | null
          created_at: string
          id: string
          patient_id: string
          status: string
          terminated_at: string | null
          termination_reason: string | null
          updated_at: string | null
        }
        Insert: {
          access_expires_at?: string | null
          access_level?: string | null
          approved_at?: string | null
          clinician_id: string
          connected_at?: string | null
          created_at?: string
          id?: string
          patient_id: string
          status?: string
          terminated_at?: string | null
          termination_reason?: string | null
          updated_at?: string | null
        }
        Update: {
          access_expires_at?: string | null
          access_level?: string | null
          approved_at?: string | null
          clinician_id?: string
          connected_at?: string | null
          created_at?: string
          id?: string
          patient_id?: string
          status?: string
          terminated_at?: string | null
          termination_reason?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      patient_invitations: {
        Row: {
          accepted_at: string | null
          cancelled_at: string | null
          clinician_id: string
          created_at: string | null
          expires_at: string | null
          id: string
          invitation_token: string
          invited_at: string | null
          message: string | null
          patient_email: string
          patient_email_hash: string
          patient_id: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          accepted_at?: string | null
          cancelled_at?: string | null
          clinician_id: string
          created_at?: string | null
          expires_at?: string | null
          id?: string
          invitation_token?: string
          invited_at?: string | null
          message?: string | null
          patient_email: string
          patient_email_hash: string
          patient_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          accepted_at?: string | null
          cancelled_at?: string | null
          clinician_id?: string
          created_at?: string | null
          expires_at?: string | null
          id?: string
          invitation_token?: string
          invited_at?: string | null
          message?: string | null
          patient_email?: string
          patient_email_hash?: string
          patient_id?: string | null
          status?: string | null
          updated_at?: string | null
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
          preferred_language: string | null
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
          preferred_language?: string | null
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
          preferred_language?: string | null
          timezone?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          middle_name: string | null
          onboarding_completed: boolean | null
          phone_number: string | null
          updated_at: string | null
          user_type: Database["public"]["Enums"]["user_type_enum"] | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          middle_name?: string | null
          onboarding_completed?: boolean | null
          phone_number?: string | null
          updated_at?: string | null
          user_type?: Database["public"]["Enums"]["user_type_enum"] | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          middle_name?: string | null
          onboarding_completed?: boolean | null
          phone_number?: string | null
          updated_at?: string | null
          user_type?: Database["public"]["Enums"]["user_type_enum"] | null
        }
        Relationships: []
      }
      pwa_push_subscriptions: {
        Row: {
          active: boolean | null
          auth_key: string
          browser: string | null
          created_at: string | null
          device_type: string | null
          endpoint: string
          id: string
          last_used_at: string | null
          p256dh_key: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          active?: boolean | null
          auth_key: string
          browser?: string | null
          created_at?: string | null
          device_type?: string | null
          endpoint: string
          id?: string
          last_used_at?: string | null
          p256dh_key: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          active?: boolean | null
          auth_key?: string
          browser?: string | null
          created_at?: string | null
          device_type?: string | null
          endpoint?: string
          id?: string
          last_used_at?: string | null
          p256dh_key?: string
          updated_at?: string | null
          user_id?: string
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
      research_data_sharing_details: {
        Row: {
          created_at: string | null
          demographic_data: boolean | null
          id: string
          medication_data: boolean | null
          menstrual_data: boolean | null
          parkinsons_data: boolean | null
          seizure_data: boolean | null
          symptom_data: boolean | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          demographic_data?: boolean | null
          id?: string
          medication_data?: boolean | null
          menstrual_data?: boolean | null
          parkinsons_data?: boolean | null
          seizure_data?: boolean | null
          symptom_data?: boolean | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          demographic_data?: boolean | null
          id?: string
          medication_data?: boolean | null
          menstrual_data?: boolean | null
          parkinsons_data?: boolean | null
          seizure_data?: boolean | null
          symptom_data?: boolean | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      researcher_onboarding_data: {
        Row: {
          completed_at: string | null
          created_at: string | null
          credentials: string | null
          first_name: string | null
          id: string
          institution: string | null
          last_name: string | null
          middle_name: string | null
          research_focus: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          credentials?: string | null
          first_name?: string | null
          id?: string
          institution?: string | null
          last_name?: string | null
          middle_name?: string | null
          research_focus?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          credentials?: string | null
          first_name?: string | null
          id?: string
          institution?: string | null
          last_name?: string | null
          middle_name?: string | null
          research_focus?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      researcher_profiles: {
        Row: {
          access_level: string | null
          created_at: string | null
          credentials: string | null
          department: string | null
          id: string
          institution: string | null
          research_focus: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          access_level?: string | null
          created_at?: string | null
          credentials?: string | null
          department?: string | null
          id?: string
          institution?: string | null
          research_focus?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          access_level?: string | null
          created_at?: string | null
          credentials?: string | null
          department?: string | null
          id?: string
          institution?: string | null
          research_focus?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      security_incidents: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          incident_type: string
          ip_address_hash: string | null
          resolved: boolean | null
          resolved_at: string | null
          resolved_by: string | null
          severity: string | null
          updated_at: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          incident_type: string
          ip_address_hash?: string | null
          resolved?: boolean | null
          resolved_at?: string | null
          resolved_by?: string | null
          severity?: string | null
          updated_at?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          incident_type?: string
          ip_address_hash?: string | null
          resolved?: boolean | null
          resolved_at?: string | null
          resolved_by?: string | null
          severity?: string | null
          updated_at?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      seizure_signs_reference: {
        Row: {
          category: Database["public"]["Enums"]["semiology_category_enum"]
          created_at: string | null
          description: string | null
          display_name: string
          research_code: string | null
          sign_id: number
          sign_name: Database["public"]["Enums"]["seizure_sign_enum"]
        }
        Insert: {
          category: Database["public"]["Enums"]["semiology_category_enum"]
          created_at?: string | null
          description?: string | null
          display_name: string
          research_code?: string | null
          sign_id?: number
          sign_name: Database["public"]["Enums"]["seizure_sign_enum"]
        }
        Update: {
          category?: Database["public"]["Enums"]["semiology_category_enum"]
          created_at?: string | null
          description?: string | null
          display_name?: string
          research_code?: string | null
          sign_id?: number
          sign_name?: Database["public"]["Enums"]["seizure_sign_enum"]
        }
        Relationships: []
      }
      seizure_triggers_reference: {
        Row: {
          created_at: string | null
          description: string | null
          display_name: string
          trigger_id: number
          trigger_type: Database["public"]["Enums"]["trigger_type_enum"]
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          display_name: string
          trigger_id?: number
          trigger_type: Database["public"]["Enums"]["trigger_type_enum"]
        }
        Update: {
          created_at?: string | null
          description?: string | null
          display_name?: string
          trigger_id?: number
          trigger_type?: Database["public"]["Enums"]["trigger_type_enum"]
        }
        Relationships: []
      }
      sign_brain_region_mapping: {
        Row: {
          created_at: string | null
          id: number
          probability_grade: Database["public"]["Enums"]["probability_grade_enum"]
          probability_percentage: number | null
          region_id: number
          research_basis: string | null
          sign_id: number
        }
        Insert: {
          created_at?: string | null
          id?: number
          probability_grade: Database["public"]["Enums"]["probability_grade_enum"]
          probability_percentage?: number | null
          region_id: number
          research_basis?: string | null
          sign_id: number
        }
        Update: {
          created_at?: string | null
          id?: number
          probability_grade?: Database["public"]["Enums"]["probability_grade_enum"]
          probability_percentage?: number | null
          region_id?: number
          research_basis?: string | null
          sign_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "sign_brain_region_mapping_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "brain_regions_reference"
            referencedColumns: ["region_id"]
          },
          {
            foreignKeyName: "sign_brain_region_mapping_sign_id_fkey"
            columns: ["sign_id"]
            isOneToOne: false
            referencedRelation: "seizure_signs_reference"
            referencedColumns: ["sign_id"]
          },
        ]
      }
      symptom_options: {
        Row: {
          active: boolean | null
          category: string
          description: string | null
          display_order: number | null
          id: string
          symptom_name: string
        }
        Insert: {
          active?: boolean | null
          category: string
          description?: string | null
          display_order?: number | null
          id?: string
          symptom_name: string
        }
        Update: {
          active?: boolean | null
          category?: string
          description?: string | null
          display_order?: number | null
          id?: string
          symptom_name?: string
        }
        Relationships: []
      }
      system_logs: {
        Row: {
          category: string
          context_data: Json | null
          created_at: string
          error_code: string | null
          event_type: string
          function_name: string | null
          id: string
          ip_address: unknown | null
          log_level: string
          message: string
          operation: string | null
          session_id: string | null
          sql_state: string | null
          stack_trace: string | null
          table_name: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          category: string
          context_data?: Json | null
          created_at?: string
          error_code?: string | null
          event_type: string
          function_name?: string | null
          id?: string
          ip_address?: unknown | null
          log_level: string
          message: string
          operation?: string | null
          session_id?: string | null
          sql_state?: string | null
          stack_trace?: string | null
          table_name?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          category?: string
          context_data?: Json | null
          created_at?: string
          error_code?: string | null
          event_type?: string
          function_name?: string | null
          id?: string
          ip_address?: unknown | null
          log_level?: string
          message?: string
          operation?: string | null
          session_id?: string | null
          sql_state?: string | null
          stack_trace?: string | null
          table_name?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      trigger_options: {
        Row: {
          active: boolean | null
          category: string
          description: string | null
          display_order: number | null
          id: string
          trigger_name: string
        }
        Insert: {
          active?: boolean | null
          category: string
          description?: string | null
          display_order?: number | null
          id?: string
          trigger_name: string
        }
        Update: {
          active?: boolean | null
          category?: string
          description?: string | null
          display_order?: number | null
          id?: string
          trigger_name?: string
        }
        Relationships: []
      }
      user_achievements: {
        Row: {
          achievement_id: string
          earned_at: string | null
          id: string
          user_id: string
        }
        Insert: {
          achievement_id: string
          earned_at?: string | null
          id?: string
          user_id: string
        }
        Update: {
          achievement_id?: string
          earned_at?: string | null
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          },
        ]
      }
      user_points: {
        Row: {
          created_at: string | null
          id: string
          last_activity_date: string | null
          level: number | null
          points: number | null
          streak_days: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          last_activity_date?: string | null
          level?: number | null
          points?: number | null
          streak_days?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          last_activity_date?: string | null
          level?: number | null
          points?: number | null
          streak_days?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_carer_see_patient_data: {
        Args: { p_carer_id: string; p_data_type: string; p_patient_id: string }
        Returns: boolean
      }
      can_clinician_see_patient_data: {
        Args: {
          p_clinician_id: string
          p_data_type: string
          p_patient_id: string
        }
        Returns: boolean
      }
      cleanup_old_logs: {
        Args: { p_days_to_keep?: number }
        Returns: {
          rows_deleted: number
          table_name: string
        }[]
      }
      complete_function_execution: {
        Args: {
          p_error_message?: string
          p_execution_id: string
          p_return_value?: Json
          p_success: boolean
        }
        Returns: undefined
      }
      complete_onboarding: {
        Args: { p_user_id: string; p_user_type: string }
        Returns: Json
      }
      delete_symptom_log: {
        Args: { p_log_id: string }
        Returns: undefined
      }
      get_function_stats: {
        Args: { p_function_name?: string }
        Returns: {
          avg_duration_ms: number
          failed: number
          function_name: string
          last_execution: string
          max_duration_ms: number
          successful: number
          total_executions: number
        }[]
      }
      get_gait_episodes: {
        Args: { p_patient_id: string }
        Returns: {
          activity: string
          broke_freeze_with: string
          created_at: string
          duration_seconds: number
          environmental_factors: Json
          event_type: string
          fall_direction: string
          freezing_trigger: string
          gait_id: string
          hours_since_medication: number
          injury_description: string
          injury_occurred: boolean
          location: string
          media_urls: Json
          medication_status: string
          notes: string
          occurred_at: string
          patient_id: string
          required_assistance: boolean
          resulted_in_fall: boolean
          severity: number
          shared_with_clinician: boolean
          updated_at: string
          video_recorded: boolean
          visible_to_researchers: boolean
        }[]
      }
      get_medication_logs: {
        Args: { p_user_id: string }
        Returns: {
          created_at: string
          id: string
          log_date: string
          log_time: string
          notes: string
          taken: boolean
          user_id: string
          user_medication_id: string
        }[]
      }
      get_menstrual_logs: {
        Args: { p_user_id: string }
        Returns: {
          catamenial_pattern_suspected: boolean
          created_at: string
          cycle_end_date: string
          cycle_length_days: number
          cycle_phase: string
          cycle_start_date: string
          flow_intensity: string
          id: string
          notes: string
          overall_symptom_severity: number
          seizure_clustered_around_menstruation: boolean
          seizure_count_during_cycle: number
          updated_at: string
          user_id: string
        }[]
      }
      get_patient_onboarding: {
        Args: { p_user_id: string }
        Returns: {
          completed_at: string
          created_at: string
          date_of_birth: string
          emergency_contact_name: string
          emergency_contact_phone: string
          emergency_contact_relationship: string
          first_name: string
          gender: string
          last_name: string
          middle_name: string
          phone_number: string
          user_id: string
        }[]
      }
      get_patient_onboarding_data: {
        Args: { p_user_id: string }
        Returns: {
          completed_at: string
          created_at: string
          date_of_birth: string
          emergency_contact_name: string
          emergency_contact_phone: string
          emergency_contact_relationship: string
          first_name: string
          gender: string
          last_name: string
          middle_name: string
          onboarding_step: number
          phone_number: string
          research_data_types: string[]
          selected_conditions: string[]
          share_research_data: boolean
          track_menstrual_cycle: boolean
          updated_at: string
          user_id: string
        }[]
      }
      get_recent_errors: {
        Args: { p_limit?: number }
        Returns: {
          category: string
          error_code: string
          event: string
          function_name: string
          level: string
          log_time: string
          message: string
          user_id: string
        }[]
      }
      get_research_id: {
        Args: { p_user_id: string }
        Returns: string
      }
      get_seizure_logs: {
        Args: { p_user_id: string }
        Returns: {
          aura_description: string
          aura_present: string
          consciousness_level: string
          created_at: string
          duration_seconds: number
          emergency_services_called: string
          hospitalized: string
          location_type: string
          log_date: string
          log_id: string
          log_time: string
          medication_adherence_prior: string
          notes: string
          post_ictal_confusion_minutes: number
          recovery_time_minutes: number
          rescue_medication_type: string
          rescue_medication_used: string
          research_grade: string
          seizure_type: string
          sleep_hours_prior: number
          stress_level: string
          updated_at: string
          user_id: string
          video_recorded: string
          witness_role: string
          witnessed: string
        }[]
      }
      get_symptom_logs: {
        Args: { p_patient_id: string }
        Returns: {
          activities_difficult: Json
          adl_independence_level: number
          all_medications_taken: boolean
          autonomic_symptoms: Json
          cognitive_issues: Json
          created_at: string
          dyskinesia_severity: number
          energy_level: number
          exercise_minutes: number
          fatigue_level: number
          log_date: string
          log_id: string
          medication_side_effects: Json
          missed_doses: string
          mood: number
          mood_issues: Json
          motor_fluctuations_occurred: boolean
          notable_events: string
          off_time_hours: number
          on_time_hours: number
          other_symptoms: Json
          overall_feeling: number
          pain_level: number
          patient_id: string
          shared_with_clinician: boolean
          sleep_disturbances: Json
          sleep_hours: number
          sleep_quality: number
          slowness_severity: number
          stiffness_severity: number
          stress_level: number
          symptom_notes: string
          updated_at: string
          visible_to_researchers: boolean
        }[]
      }
      get_temperature_logs: {
        Args: { p_user_id: string }
        Returns: {
          created_at: string
          id: string
          log_date: string
          log_time: string
          notes: string
          temperature_celsius: number
          user_id: string
        }[]
      }
      get_tracking_entries: {
        Args: { p_user_id: string }
        Returns: {
          created_at: string
          entry_date: string
          id: string
          metadata: Json
          notes: string
          severity: number
          tracking_type: Database["public"]["Enums"]["tracking_feature_enum"]
          updated_at: string
          user_id: string
          value: number
        }[]
      }
      get_tremor_episodes: {
        Args: { p_patient_id: string }
        Returns: {
          activities_affected: Json
          body_regions: Json
          created_at: string
          dominant_side: string
          duration_seconds: number
          frequency_hz: number
          hours_since_medication: number
          interfered_with_activities: boolean
          media_urls: Json
          medication_status: string
          notes: string
          occurred_at: string
          occurred_during: string
          patient_id: string
          possible_triggers: Json
          severity: number
          tremor_id: string
          tremor_type: string
          trigger_details: string
          video_recorded: boolean
        }[]
      }
      get_user_conditions: {
        Args: { p_user_id: string }
        Returns: {
          condition_id: string
          created_at: string
          diagnosis_date: string
          id: string
          severity: number
          tracking_features_enabled: Database["public"]["Enums"]["tracking_feature_enum"][]
          user_id: string
        }[]
      }
      get_user_medications: {
        Args: { p_user_id: string }
        Returns: {
          created_at: string
          dosage_amount: number
          dosage_unit: string
          end_date: string
          frequency: string
          id: string
          is_active: boolean
          medication_id: string
          medication_name: string
          start_date: string
          times: string[]
          user_id: string
        }[]
      }
      get_user_type: {
        Args: { p_user_id: string }
        Returns: string
      }
      initialize_new_user: {
        Args: { p_email: string; p_user_id: string; p_user_type?: string }
        Returns: Json
      }
      initialize_new_user_jsonb: {
        Args: { p_email: string; p_user_id: string; p_user_type: string }
        Returns: Json
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_approved_researcher: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_carer_related_to_patient: {
        Args: { p_carer_id: string; p_patient_id: string }
        Returns: boolean
      }
      is_clinician_connected_to_patient: {
        Args: { p_clinician_id: string; p_patient_id: string }
        Returns: boolean
      }
      is_in_quiet_hours: {
        Args: { p_user_id: string }
        Returns: boolean
      }
      log_system_event: {
        Args: {
          p_category: string
          p_context?: Json
          p_error_code?: string
          p_event_type: string
          p_function_name?: string
          p_level: string
          p_message: string
          p_user_id?: string
        }
        Returns: string
      }
      mark_notification_read: {
        Args: { p_notification_id: string }
        Returns: undefined
      }
      save_daily_tracking_preferences: {
        Args: {
          p_basal_temp_time: string
          p_tracking_times: string[]
          p_user_id: string
        }
        Returns: Json
      }
      save_patient_onboarding: {
        Args: { p_data: Json; p_user_id: string }
        Returns: Json
      }
      save_patient_onboarding_data: {
        Args:
          | {
              p_basal_temp_time: string
              p_date_of_birth: string
              p_emergency_contact_name: string
              p_emergency_contact_phone: string
              p_first_name: string
              p_gender: string
              p_last_name: string
              p_middle_name: string
              p_selected_conditions: string[]
              p_track_menstrual_cycle: boolean
              p_tracking_times: string[]
              p_user_id: string
            }
          | {
              p_date_of_birth: string
              p_emergency_contact_name: string
              p_emergency_contact_phone: string
              p_first_name: string
              p_gender: string
              p_last_name: string
              p_middle_name: string
              p_selected_conditions: string[]
              p_track_menstrual_cycle: boolean
              p_user_id: string
            }
        Returns: Json
      }
      save_seizure_log: {
        Args: {
          p_consciousness_level?: string
          p_duration_seconds?: number
          p_emergency_services_called?: boolean
          p_location_during?: string
          p_notes?: string
          p_occurred_at: string
          p_possible_triggers?: string[]
          p_post_ictal_symptoms?: string[]
          p_rescue_medication_given?: boolean
          p_seizure_type?: string
          p_user_id: string
          p_warning_signs?: string[]
        }
        Returns: string
      }
      save_symptom_log: {
        Args: {
          p_energy_level?: number
          p_log_date: string
          p_mood?: number
          p_other_symptoms?: Json
          p_overall_feeling?: number
          p_patient_id: string
          p_shared_with_clinician?: boolean
          p_sleep_disturbances?: Json
          p_sleep_hours?: number
          p_sleep_quality?: number
          p_symptom_notes?: string
          p_visible_to_researchers?: boolean
        }
        Returns: string
      }
      save_tracking_entry: {
        Args: {
          p_energy_level?: string
          p_entry_date: string
          p_mood_level?: string
          p_notes?: string
          p_sleep_hours?: number
          p_sleep_quality?: string
          p_symptoms?: string[]
          p_user_id: string
        }
        Returns: string
      }
      save_user_condition: {
        Args: {
          p_condition_id: string
          p_diagnosis_date?: string
          p_user_id: string
        }
        Returns: Json
      }
      save_user_medication: {
        Args:
          | {
              p_dosage_amount: number
              p_dosage_unit: string
              p_medication_id: string
              p_medication_name: string
              p_times: string[]
              p_user_id: string
            }
          | {
              p_dosage_amount?: number
              p_dosage_unit?: string
              p_frequency?: string
              p_is_active?: boolean
              p_medication_id?: string
              p_medication_name?: string
              p_times?: string[]
              p_user_id: string
            }
        Returns: string
      }
      schedule_daily_checkin_reminders: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      schedule_notification: {
        Args: {
          p_action_url?: string
          p_body: string
          p_priority?: string
          p_reference_id?: string
          p_scheduled_for?: string
          p_title: string
          p_type: string
          p_user_id: string
        }
        Returns: string
      }
      start_function_execution: {
        Args: {
          p_function_name: string
          p_triggered_by?: string
          p_user_id?: string
          p_user_type?: string
        }
        Returns: string
      }
      test_user_creation: {
        Args: { p_email: string; p_user_type?: string }
        Returns: Json
      }
      update_symptom_log: {
        Args: {
          p_energy_level?: number
          p_log_id: string
          p_mood?: number
          p_other_symptoms?: Json
          p_overall_feeling?: number
          p_shared_with_clinician?: boolean
          p_sleep_disturbances?: Json
          p_sleep_hours?: number
          p_sleep_quality?: number
          p_symptom_notes?: string
          p_visible_to_researchers?: boolean
        }
        Returns: undefined
      }
    }
    Enums: {
      assessment_type_enum:
        | "FOCAL"
        | "GENERALIZED"
        | "SECONDARY_GENERALIZED"
        | "UNKNOWN"
      brain_lobe_enum:
        | "TEMPORAL"
        | "FRONTAL"
        | "PARIETAL"
        | "OCCIPITAL"
        | "INSULA"
        | "CINGULATE"
        | "HYPOTHALAMUS"
        | "BILATERAL"
      brain_subregion_enum:
        | "MESIAL_TEMPORAL"
        | "LATERAL_TEMPORAL"
        | "ANTERIOR_TEMPORAL"
        | "POSTERIOR_TEMPORAL"
        | "BASAL_TEMPORAL"
        | "HIPPOCAMPUS"
        | "AMYGDALA"
        | "PRIMARY_MOTOR_CORTEX"
        | "PREMOTOR_CORTEX"
        | "SUPPLEMENTARY_MOTOR_AREA"
        | "BROCA_AREA"
        | "PREFRONTAL_CORTEX"
        | "PRIMARY_SOMATOSENSORY_CORTEX"
        | "SUPERIOR_PARIETAL_LOBULE"
        | "INFERIOR_PARIETAL_LOBULE"
        | "PRIMARY_VISUAL_CORTEX"
        | "VISUAL_ASSOCIATION_AREAS"
        | "ANTERIOR_INSULA"
        | "POSTERIOR_INSULA"
        | "ANTERIOR_CINGULATE"
        | "POSTERIOR_CINGULATE"
      consciousness_level_enum: "FULL" | "PARTIAL" | "NONE"
      consent_status_enum: "pending" | "active" | "withdrawn" | "expired"
      cycle_phase_enum: "MENSTRUAL" | "FOLLICULAR" | "OVULATION" | "LUTEAL"
      flow_intensity_enum:
        | "SPOTTING"
        | "LIGHT"
        | "MODERATE"
        | "HEAVY"
        | "VERY_HEAVY"
      gender_enum:
        | "male"
        | "female"
        | "non_binary"
        | "other"
        | "prefer_not_to_say"
      laterality_enum: "LEFT" | "RIGHT" | "BILATERAL" | "UNKNOWN"
      location_type_enum:
        | "HOME"
        | "WORK"
        | "SCHOOL"
        | "OUTDOORS"
        | "TRANSIT"
        | "CLINICAL"
        | "PUBLIC_PLACE"
        | "UNKNOWN"
      medication_adherence_enum: "TAKEN_ON_TIME" | "LATE" | "MISSED" | "UNKNOWN"
      menstrual_symptom_severity_enum:
        | "NONE"
        | "MILD"
        | "MODERATE"
        | "SEVERE"
        | "VERY_SEVERE"
      post_ictal_symptom_enum:
        | "CONFUSION"
        | "FATIGUE"
        | "HEADACHE"
        | "AGITATION"
        | "WEAKNESS"
        | "SPEECH_DIFFICULTY"
        | "MEMORY_LOSS"
        | "MUSCLE_PAIN"
        | "NAUSEA"
      probability_grade_enum:
        | "VERY_LOW"
        | "LOW"
        | "MODERATE"
        | "HIGH"
        | "VERY_HIGH"
      relationship_enum:
        | "parent"
        | "spouse"
        | "partner"
        | "child"
        | "sibling"
        | "friend"
        | "caregiver"
        | "other"
      rescue_medication_enum:
        | "MIDAZOLAM"
        | "DIAZEPAM"
        | "LORAZEPAM"
        | "CLONAZEPAM"
        | "NONE"
        | "OTHER"
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
      seizure_sign_enum:
        | "EPIGASTRIC_AURA"
        | "OLFACTORY_AURA"
        | "GUSTATORY_AURA"
        | "VISUAL_AURA"
        | "AUDITORY_AURA"
        | "SOMATOSENSORY_AURA"
        | "FEAR_ANXIETY_AURA"
        | "DEJA_VU"
        | "JAMAIS_VU"
        | "AUTOMATISMS_ORAL"
        | "AUTOMATISMS_MANUAL"
        | "TONIC_ACTIVITY"
        | "CLONIC_ACTIVITY"
        | "MYOCLONIC_JERKS"
        | "ATONIC_DROP"
        | "HEAD_VERSION"
        | "EYE_DEVIATION"
        | "DYSTONIC_POSTURING"
        | "HYPERMOTOR_ACTIVITY"
        | "MIMETIC_AUTOMATISMS"
        | "GELASTIC"
        | "DACRYSTIC"
        | "VOCALIZATION"
        | "SPEECH_ARREST"
        | "LOSS_OF_AWARENESS"
        | "STARING"
        | "BEHAVIORAL_ARREST"
        | "AUTONOMIC_FEATURES"
        | "PALLOR"
        | "FLUSHING"
        | "SWEATING"
        | "PILOERECTION"
        | "HEART_RATE_CHANGE"
        | "BREATHING_CHANGE"
        | "INCONTINENCE"
        | "TONGUE_BITING"
      seizure_type_enum:
        | "FOCAL_AWARE"
        | "FOCAL_IMPAIRED"
        | "FOCAL_TO_BILATERAL_TONIC_CLONIC"
        | "GENERALIZED_TONIC_CLONIC"
        | "GENERALIZED_ABSENCE"
        | "GENERALIZED_MYOCLONIC"
        | "GENERALIZED_ATONIC"
        | "GENERALIZED_TONIC"
        | "GENERALIZED_CLONIC"
        | "UNKNOWN"
      semiology_category_enum:
        | "AURA"
        | "MOTOR"
        | "AUTONOMIC"
        | "CONSCIOUSNESS"
        | "BEHAVIORAL"
        | "SENSORY"
      stress_level_enum:
        | "1"
        | "2"
        | "3"
        | "4"
        | "5"
        | "6"
        | "7"
        | "8"
        | "9"
        | "10"
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
      trigger_strength_enum: "NONE" | "WEAK" | "MODERATE" | "STRONG"
      trigger_type_enum:
        | "SLEEP_DEPRIVATION"
        | "FEVER"
        | "ALCOHOL"
        | "MEDICATION_MISSED"
        | "EMOTIONAL_STRESS"
        | "PHYSICAL_STRESS"
        | "FLASHING_LIGHTS"
        | "MENSTRUATION"
        | "ILLNESS"
        | "UNKNOWN"
      user_type_enum: "patient" | "carer" | "clinician" | "researcher" | "admin"
      witness_role_enum:
        | "SELF"
        | "FAMILY"
        | "FRIEND"
        | "CLINICIAN"
        | "CARER"
        | "STRANGER"
        | "UNKNOWN"
      yes_no_enum: "YES" | "NO"
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
      assessment_type_enum: [
        "FOCAL",
        "GENERALIZED",
        "SECONDARY_GENERALIZED",
        "UNKNOWN",
      ],
      brain_lobe_enum: [
        "TEMPORAL",
        "FRONTAL",
        "PARIETAL",
        "OCCIPITAL",
        "INSULA",
        "CINGULATE",
        "HYPOTHALAMUS",
        "BILATERAL",
      ],
      brain_subregion_enum: [
        "MESIAL_TEMPORAL",
        "LATERAL_TEMPORAL",
        "ANTERIOR_TEMPORAL",
        "POSTERIOR_TEMPORAL",
        "BASAL_TEMPORAL",
        "HIPPOCAMPUS",
        "AMYGDALA",
        "PRIMARY_MOTOR_CORTEX",
        "PREMOTOR_CORTEX",
        "SUPPLEMENTARY_MOTOR_AREA",
        "BROCA_AREA",
        "PREFRONTAL_CORTEX",
        "PRIMARY_SOMATOSENSORY_CORTEX",
        "SUPERIOR_PARIETAL_LOBULE",
        "INFERIOR_PARIETAL_LOBULE",
        "PRIMARY_VISUAL_CORTEX",
        "VISUAL_ASSOCIATION_AREAS",
        "ANTERIOR_INSULA",
        "POSTERIOR_INSULA",
        "ANTERIOR_CINGULATE",
        "POSTERIOR_CINGULATE",
      ],
      consciousness_level_enum: ["FULL", "PARTIAL", "NONE"],
      consent_status_enum: ["pending", "active", "withdrawn", "expired"],
      cycle_phase_enum: ["MENSTRUAL", "FOLLICULAR", "OVULATION", "LUTEAL"],
      flow_intensity_enum: [
        "SPOTTING",
        "LIGHT",
        "MODERATE",
        "HEAVY",
        "VERY_HEAVY",
      ],
      gender_enum: [
        "male",
        "female",
        "non_binary",
        "other",
        "prefer_not_to_say",
      ],
      laterality_enum: ["LEFT", "RIGHT", "BILATERAL", "UNKNOWN"],
      location_type_enum: [
        "HOME",
        "WORK",
        "SCHOOL",
        "OUTDOORS",
        "TRANSIT",
        "CLINICAL",
        "PUBLIC_PLACE",
        "UNKNOWN",
      ],
      medication_adherence_enum: ["TAKEN_ON_TIME", "LATE", "MISSED", "UNKNOWN"],
      menstrual_symptom_severity_enum: [
        "NONE",
        "MILD",
        "MODERATE",
        "SEVERE",
        "VERY_SEVERE",
      ],
      post_ictal_symptom_enum: [
        "CONFUSION",
        "FATIGUE",
        "HEADACHE",
        "AGITATION",
        "WEAKNESS",
        "SPEECH_DIFFICULTY",
        "MEMORY_LOSS",
        "MUSCLE_PAIN",
        "NAUSEA",
      ],
      probability_grade_enum: [
        "VERY_LOW",
        "LOW",
        "MODERATE",
        "HIGH",
        "VERY_HIGH",
      ],
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
      rescue_medication_enum: [
        "MIDAZOLAM",
        "DIAZEPAM",
        "LORAZEPAM",
        "CLONAZEPAM",
        "NONE",
        "OTHER",
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
      seizure_sign_enum: [
        "EPIGASTRIC_AURA",
        "OLFACTORY_AURA",
        "GUSTATORY_AURA",
        "VISUAL_AURA",
        "AUDITORY_AURA",
        "SOMATOSENSORY_AURA",
        "FEAR_ANXIETY_AURA",
        "DEJA_VU",
        "JAMAIS_VU",
        "AUTOMATISMS_ORAL",
        "AUTOMATISMS_MANUAL",
        "TONIC_ACTIVITY",
        "CLONIC_ACTIVITY",
        "MYOCLONIC_JERKS",
        "ATONIC_DROP",
        "HEAD_VERSION",
        "EYE_DEVIATION",
        "DYSTONIC_POSTURING",
        "HYPERMOTOR_ACTIVITY",
        "MIMETIC_AUTOMATISMS",
        "GELASTIC",
        "DACRYSTIC",
        "VOCALIZATION",
        "SPEECH_ARREST",
        "LOSS_OF_AWARENESS",
        "STARING",
        "BEHAVIORAL_ARREST",
        "AUTONOMIC_FEATURES",
        "PALLOR",
        "FLUSHING",
        "SWEATING",
        "PILOERECTION",
        "HEART_RATE_CHANGE",
        "BREATHING_CHANGE",
        "INCONTINENCE",
        "TONGUE_BITING",
      ],
      seizure_type_enum: [
        "FOCAL_AWARE",
        "FOCAL_IMPAIRED",
        "FOCAL_TO_BILATERAL_TONIC_CLONIC",
        "GENERALIZED_TONIC_CLONIC",
        "GENERALIZED_ABSENCE",
        "GENERALIZED_MYOCLONIC",
        "GENERALIZED_ATONIC",
        "GENERALIZED_TONIC",
        "GENERALIZED_CLONIC",
        "UNKNOWN",
      ],
      semiology_category_enum: [
        "AURA",
        "MOTOR",
        "AUTONOMIC",
        "CONSCIOUSNESS",
        "BEHAVIORAL",
        "SENSORY",
      ],
      stress_level_enum: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
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
      trigger_strength_enum: ["NONE", "WEAK", "MODERATE", "STRONG"],
      trigger_type_enum: [
        "SLEEP_DEPRIVATION",
        "FEVER",
        "ALCOHOL",
        "MEDICATION_MISSED",
        "EMOTIONAL_STRESS",
        "PHYSICAL_STRESS",
        "FLASHING_LIGHTS",
        "MENSTRUATION",
        "ILLNESS",
        "UNKNOWN",
      ],
      user_type_enum: ["patient", "carer", "clinician", "researcher", "admin"],
      witness_role_enum: [
        "SELF",
        "FAMILY",
        "FRIEND",
        "CLINICIAN",
        "CARER",
        "STRANGER",
        "UNKNOWN",
      ],
      yes_no_enum: ["YES", "NO"],
    },
  },
} as const

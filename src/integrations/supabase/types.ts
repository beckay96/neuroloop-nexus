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
          achievement_type: string
          description: string | null
          id: string
          metadata: string | null
          points: number | null
          title: string
          unlocked_at: string | null
          user_id: string
        }
        Insert: {
          achievement_type: string
          description?: string | null
          id?: string
          metadata?: string | null
          points?: number | null
          title: string
          unlocked_at?: string | null
          user_id: string
        }
        Update: {
          achievement_type?: string
          description?: string | null
          id?: string
          metadata?: string | null
          points?: number | null
          title?: string
          unlocked_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      audit_log: {
        Row: {
          action: string
          changes: string[] | null
          changes_description: string | null
          created_at: string | null
          id: string
          ip_address: unknown | null
          record_id: string | null
          session_id: string | null
          table_name: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          changes?: string[] | null
          changes_description?: string | null
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          record_id?: string | null
          session_id?: string | null
          table_name: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          changes?: string[] | null
          changes_description?: string | null
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          record_id?: string | null
          session_id?: string | null
          table_name?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      auth_users: {
        Row: {
          account_status: string | null
          created_at: string | null
          email: string
          email_verified: boolean | null
          failed_login_attempts: number | null
          id: string
          last_login_at: string | null
          locked_until: string | null
          password_hash: string
          password_reset_expires: string | null
          password_reset_token: string | null
          updated_at: string | null
        }
        Insert: {
          account_status?: string | null
          created_at?: string | null
          email: string
          email_verified?: boolean | null
          failed_login_attempts?: number | null
          id?: string
          last_login_at?: string | null
          locked_until?: string | null
          password_hash: string
          password_reset_expires?: string | null
          password_reset_token?: string | null
          updated_at?: string | null
        }
        Update: {
          account_status?: string | null
          created_at?: string | null
          email?: string
          email_verified?: boolean | null
          failed_login_attempts?: number | null
          id?: string
          last_login_at?: string | null
          locked_until?: string | null
          password_hash?: string
          password_reset_expires?: string | null
          password_reset_token?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      carer_onboarding_data: {
        Row: {
          created_at: string | null
          date_of_birth: string | null
          first_name: string
          id: string
          last_name: string
          middle_name: string | null
          patient_date_of_birth: string | null
          phone_number: string | null
          relationship_to_patient: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          date_of_birth?: string | null
          first_name: string
          id?: string
          last_name: string
          middle_name?: string | null
          patient_date_of_birth?: string | null
          phone_number?: string | null
          relationship_to_patient?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          date_of_birth?: string | null
          first_name?: string
          id?: string
          last_name?: string
          middle_name?: string | null
          patient_date_of_birth?: string | null
          phone_number?: string | null
          relationship_to_patient?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      carer_profiles: {
        Row: {
          access_expires_date: string | null
          access_granted_date: string | null
          can_view_medications: boolean | null
          can_view_seizures: boolean | null
          can_view_symptoms: boolean | null
          created_at: string | null
          email: string | null
          emergency_contact: boolean | null
          first_name: string
          id: string
          last_name: string
          phone_number: string | null
          relationship: string | null
          user_id: string
        }
        Insert: {
          access_expires_date?: string | null
          access_granted_date?: string | null
          can_view_medications?: boolean | null
          can_view_seizures?: boolean | null
          can_view_symptoms?: boolean | null
          created_at?: string | null
          email?: string | null
          emergency_contact?: boolean | null
          first_name: string
          id?: string
          last_name: string
          phone_number?: string | null
          relationship?: string | null
          user_id: string
        }
        Update: {
          access_expires_date?: string | null
          access_granted_date?: string | null
          can_view_medications?: boolean | null
          can_view_seizures?: boolean | null
          can_view_symptoms?: boolean | null
          created_at?: string | null
          email?: string | null
          emergency_contact?: boolean | null
          first_name?: string
          id?: string
          last_name?: string
          phone_number?: string | null
          relationship?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "carer_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      carer_relationships: {
        Row: {
          approved_by: string | null
          approved_date: string | null
          carer_user_id: string
          id: string
          notes: string | null
          patient_user_id: string
          permissions: Json | null
          relationship_type: string
          requested_date: string | null
          status: string | null
        }
        Insert: {
          approved_by?: string | null
          approved_date?: string | null
          carer_user_id: string
          id?: string
          notes?: string | null
          patient_user_id: string
          permissions?: Json | null
          relationship_type: string
          requested_date?: string | null
          status?: string | null
        }
        Update: {
          approved_by?: string | null
          approved_date?: string | null
          carer_user_id?: string
          id?: string
          notes?: string | null
          patient_user_id?: string
          permissions?: Json | null
          relationship_type?: string
          requested_date?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "carer_relationships_carer_user_id_fkey"
            columns: ["carer_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "carer_relationships_patient_user_id_fkey"
            columns: ["patient_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      clinical_alerts: {
        Row: {
          acknowledged_at: string | null
          alert_type: string
          auto_generated: boolean | null
          clinician_id: string
          created_at: string | null
          description: string
          id: string
          patient_id: string
          related_entry_id: string | null
          resolved_at: string | null
          severity: string
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          acknowledged_at?: string | null
          alert_type: string
          auto_generated?: boolean | null
          clinician_id: string
          created_at?: string | null
          description: string
          id?: string
          patient_id: string
          related_entry_id?: string | null
          resolved_at?: string | null
          severity: string
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          acknowledged_at?: string | null
          alert_type?: string
          auto_generated?: boolean | null
          clinician_id?: string
          created_at?: string | null
          description?: string
          id?: string
          patient_id?: string
          related_entry_id?: string | null
          resolved_at?: string | null
          severity?: string
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "clinical_alerts_clinician_id_fkey"
            columns: ["clinician_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "clinical_alerts_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      clinical_metrics: {
        Row: {
          created_at: string | null
          days_active: number | null
          entries_logged: number | null
          gait_score: number | null
          id: string
          medication_adherence: number | null
          metric_date: string
          mood_avg: number | null
          patient_id: string
          period_type: string
          seizure_count: number | null
          seizure_duration_avg: number | null
          seizure_severity_avg: number | null
          sleep_quality_avg: number | null
          symptom_count: number | null
          tremor_severity_avg: number | null
          updrs_score: number | null
        }
        Insert: {
          created_at?: string | null
          days_active?: number | null
          entries_logged?: number | null
          gait_score?: number | null
          id?: string
          medication_adherence?: number | null
          metric_date: string
          mood_avg?: number | null
          patient_id: string
          period_type: string
          seizure_count?: number | null
          seizure_duration_avg?: number | null
          seizure_severity_avg?: number | null
          sleep_quality_avg?: number | null
          symptom_count?: number | null
          tremor_severity_avg?: number | null
          updrs_score?: number | null
        }
        Update: {
          created_at?: string | null
          days_active?: number | null
          entries_logged?: number | null
          gait_score?: number | null
          id?: string
          medication_adherence?: number | null
          metric_date?: string
          mood_avg?: number | null
          patient_id?: string
          period_type?: string
          seizure_count?: number | null
          seizure_duration_avg?: number | null
          seizure_severity_avg?: number | null
          sleep_quality_avg?: number | null
          symptom_count?: number | null
          tremor_severity_avg?: number | null
          updrs_score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "clinical_metrics_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      clinical_reports: {
        Row: {
          clinician_id: string
          created_at: string | null
          date_range_end: string | null
          date_range_start: string | null
          expires_at: string | null
          file_format: string | null
          file_path: string | null
          filters_applied: string | null
          generated_at: string | null
          id: string
          patient_ids: string | null
          report_name: string
          report_type: string
          status: string | null
        }
        Insert: {
          clinician_id: string
          created_at?: string | null
          date_range_end?: string | null
          date_range_start?: string | null
          expires_at?: string | null
          file_format?: string | null
          file_path?: string | null
          filters_applied?: string | null
          generated_at?: string | null
          id?: string
          patient_ids?: string | null
          report_name: string
          report_type: string
          status?: string | null
        }
        Update: {
          clinician_id?: string
          created_at?: string | null
          date_range_end?: string | null
          date_range_start?: string | null
          expires_at?: string | null
          file_format?: string | null
          file_path?: string | null
          filters_applied?: string | null
          generated_at?: string | null
          id?: string
          patient_ids?: string | null
          report_name?: string
          report_type?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "clinical_reports_clinician_id_fkey"
            columns: ["clinician_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      clinician_onboarding_data: {
        Row: {
          clinician_title: string | null
          created_at: string | null
          first_name: string
          id: string
          institution: string | null
          last_name: string
          license_number: string | null
          middle_name: string | null
          patient_invite_emails: string[] | null
          specialty: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          clinician_title?: string | null
          created_at?: string | null
          first_name: string
          id?: string
          institution?: string | null
          last_name: string
          license_number?: string | null
          middle_name?: string | null
          patient_invite_emails?: string[] | null
          specialty?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          clinician_title?: string | null
          created_at?: string | null
          first_name?: string
          id?: string
          institution?: string | null
          last_name?: string
          license_number?: string | null
          middle_name?: string | null
          patient_invite_emails?: string[] | null
          specialty?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      cohort_analytics: {
        Row: {
          active_patients: number | null
          adherence_trend_data: string | null
          avg_adherence_rate: number | null
          avg_seizure_frequency: number | null
          calculated_at: string | null
          clinician_id: string
          cohort_name: string
          date_range_end: string | null
          date_range_start: string | null
          diagnosis_filter: string | null
          high_risk_patients: number | null
          id: string
          seizure_trend_data: string | null
          total_patients: number | null
          trial_arm_filter: string | null
        }
        Insert: {
          active_patients?: number | null
          adherence_trend_data?: string | null
          avg_adherence_rate?: number | null
          avg_seizure_frequency?: number | null
          calculated_at?: string | null
          clinician_id: string
          cohort_name: string
          date_range_end?: string | null
          date_range_start?: string | null
          diagnosis_filter?: string | null
          high_risk_patients?: number | null
          id?: string
          seizure_trend_data?: string | null
          total_patients?: number | null
          trial_arm_filter?: string | null
        }
        Update: {
          active_patients?: number | null
          adherence_trend_data?: string | null
          avg_adherence_rate?: number | null
          avg_seizure_frequency?: number | null
          calculated_at?: string | null
          clinician_id?: string
          cohort_name?: string
          date_range_end?: string | null
          date_range_start?: string | null
          diagnosis_filter?: string | null
          high_risk_patients?: number | null
          id?: string
          seizure_trend_data?: string | null
          total_patients?: number | null
          trial_arm_filter?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cohort_analytics_clinician_id_fkey"
            columns: ["clinician_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      conditions: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          id: string
          name: string
          symptoms: string | null
          tracking_features: Json | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          symptoms?: string | null
          tracking_features?: Json | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          symptoms?: string | null
          tracking_features?: Json | null
        }
        Relationships: []
      }
      daily_tracking_preferences: {
        Row: {
          created_at: string | null
          id: string
          notification_enabled: boolean | null
          reminder_times: Json | null
          streak_notifications: boolean | null
          tracking_types: Json | null
          updated_at: string | null
          user_id: string
          weekly_reports: boolean | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          notification_enabled?: boolean | null
          reminder_times?: Json | null
          streak_notifications?: boolean | null
          tracking_types?: Json | null
          updated_at?: string | null
          user_id: string
          weekly_reports?: boolean | null
        }
        Update: {
          created_at?: string | null
          id?: string
          notification_enabled?: boolean | null
          reminder_times?: Json | null
          streak_notifications?: boolean | null
          tracking_types?: Json | null
          updated_at?: string | null
          user_id?: string
          weekly_reports?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "daily_tracking_preferences_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      dashboard_preferences: {
        Row: {
          clinician_id: string
          created_at: string | null
          critical_alerts_only: boolean | null
          dashboard_layout: string | null
          default_alert_level: string | null
          default_diagnosis_filter: string | null
          default_time_range: string | null
          default_view: string | null
          email_alerts: boolean | null
          id: string
          patients_per_page: number | null
          show_inactive_patients: boolean | null
          updated_at: string | null
        }
        Insert: {
          clinician_id: string
          created_at?: string | null
          critical_alerts_only?: boolean | null
          dashboard_layout?: string | null
          default_alert_level?: string | null
          default_diagnosis_filter?: string | null
          default_time_range?: string | null
          default_view?: string | null
          email_alerts?: boolean | null
          id?: string
          patients_per_page?: number | null
          show_inactive_patients?: boolean | null
          updated_at?: string | null
        }
        Update: {
          clinician_id?: string
          created_at?: string | null
          critical_alerts_only?: boolean | null
          dashboard_layout?: string | null
          default_alert_level?: string | null
          default_diagnosis_filter?: string | null
          default_time_range?: string | null
          default_view?: string | null
          email_alerts?: boolean | null
          id?: string
          patients_per_page?: number | null
          show_inactive_patients?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dashboard_preferences_clinician_id_fkey"
            columns: ["clinician_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      device_test_results: {
        Row: {
          clinical_significance: string | null
          created_at: string | null
          detailed_results: string | null
          device_id: string | null
          device_type: string | null
          id: string
          patient_id: string
          primary_score: number | null
          requires_review: boolean | null
          secondary_score: number | null
          test_date: string
          test_duration: number | null
          test_type: string
        }
        Insert: {
          clinical_significance?: string | null
          created_at?: string | null
          detailed_results?: string | null
          device_id?: string | null
          device_type?: string | null
          id?: string
          patient_id: string
          primary_score?: number | null
          requires_review?: boolean | null
          secondary_score?: number | null
          test_date: string
          test_duration?: number | null
          test_type: string
        }
        Update: {
          clinical_significance?: string | null
          created_at?: string | null
          detailed_results?: string | null
          device_id?: string | null
          device_type?: string | null
          id?: string
          patient_id?: string
          primary_score?: number | null
          requires_review?: boolean | null
          secondary_score?: number | null
          test_date?: string
          test_duration?: number | null
          test_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "device_test_results_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      medication_logs: {
        Row: {
          created_at: string | null
          dosage_taken: string | null
          effectiveness_rating: number | null
          id: string
          log_date: string
          log_time: string | null
          notes: string | null
          side_effects: Json | null
          taken: boolean | null
          user_id: string
          user_medication_id: string
        }
        Insert: {
          created_at?: string | null
          dosage_taken?: string | null
          effectiveness_rating?: number | null
          id?: string
          log_date: string
          log_time?: string | null
          notes?: string | null
          side_effects?: Json | null
          taken?: boolean | null
          user_id: string
          user_medication_id: string
        }
        Update: {
          created_at?: string | null
          dosage_taken?: string | null
          effectiveness_rating?: number | null
          id?: string
          log_date?: string
          log_time?: string | null
          notes?: string | null
          side_effects?: Json | null
          taken?: boolean | null
          user_id?: string
          user_medication_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "medication_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
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
          category: string | null
          common_dosages: string | null
          common_side_effects: Json | null
          created_at: string | null
          generic_name: string | null
          id: string
          name: string
          side_effects: string | null
          typical_dosages: Json | null
        }
        Insert: {
          category?: string | null
          common_dosages?: string | null
          common_side_effects?: Json | null
          created_at?: string | null
          generic_name?: string | null
          id?: string
          name: string
          side_effects?: string | null
          typical_dosages?: Json | null
        }
        Update: {
          category?: string | null
          common_dosages?: string | null
          common_side_effects?: Json | null
          created_at?: string | null
          generic_name?: string | null
          id?: string
          name?: string
          side_effects?: string | null
          typical_dosages?: Json | null
        }
        Relationships: []
      }
      menstrual_cycle_logs: {
        Row: {
          created_at: string | null
          cycle_end_date: string | null
          cycle_start_date: string
          flow_intensity: Json | null
          id: string
          notes: string | null
          seizure_correlation: Json | null
          symptoms: Json | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          cycle_end_date?: string | null
          cycle_start_date: string
          flow_intensity?: Json | null
          id?: string
          notes?: string | null
          seizure_correlation?: Json | null
          symptoms?: Json | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          cycle_end_date?: string | null
          cycle_start_date?: string
          flow_intensity?: Json | null
          id?: string
          notes?: string | null
          seizure_correlation?: Json | null
          symptoms?: Json | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "menstrual_cycle_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      onboarding_progress: {
        Row: {
          completed: boolean | null
          created_at: string | null
          current_step: number
          id: string
          step_1_data: string | null
          step_2_data: string | null
          step_3_data: string | null
          step_4_data: string | null
          step_5_data: string | null
          step_6_data: string | null
          step_7_data: string | null
          step_8_data: string | null
          step_9_data: string | null
          step_data: Json | null
          updated_at: string | null
          user_id: string
          user_type: string
        }
        Insert: {
          completed?: boolean | null
          created_at?: string | null
          current_step?: number
          id?: string
          step_1_data?: string | null
          step_2_data?: string | null
          step_3_data?: string | null
          step_4_data?: string | null
          step_5_data?: string | null
          step_6_data?: string | null
          step_7_data?: string | null
          step_8_data?: string | null
          step_9_data?: string | null
          step_data?: Json | null
          updated_at?: string | null
          user_id: string
          user_type: string
        }
        Update: {
          completed?: boolean | null
          created_at?: string | null
          current_step?: number
          id?: string
          step_1_data?: string | null
          step_2_data?: string | null
          step_3_data?: string | null
          step_4_data?: string | null
          step_5_data?: string | null
          step_6_data?: string | null
          step_7_data?: string | null
          step_8_data?: string | null
          step_9_data?: string | null
          step_data?: Json | null
          updated_at?: string | null
          user_id?: string
          user_type?: string
        }
        Relationships: []
      }
      patient_clinical_overview: {
        Row: {
          adherence_score: number | null
          alert_level: string | null
          clinical_notes: string | null
          clinician_id: string
          created_at: string | null
          enrollment_status: string | null
          id: string
          last_activity_date: string | null
          last_review_date: string | null
          next_appointment_date: string | null
          patient_id: string
          primary_diagnosis: string
          review_required: boolean | null
          secondary_diagnoses: string | null
          trial_arm: string | null
          updated_at: string | null
        }
        Insert: {
          adherence_score?: number | null
          alert_level?: string | null
          clinical_notes?: string | null
          clinician_id: string
          created_at?: string | null
          enrollment_status?: string | null
          id?: string
          last_activity_date?: string | null
          last_review_date?: string | null
          next_appointment_date?: string | null
          patient_id: string
          primary_diagnosis: string
          review_required?: boolean | null
          secondary_diagnoses?: string | null
          trial_arm?: string | null
          updated_at?: string | null
        }
        Update: {
          adherence_score?: number | null
          alert_level?: string | null
          clinical_notes?: string | null
          clinician_id?: string
          created_at?: string | null
          enrollment_status?: string | null
          id?: string
          last_activity_date?: string | null
          last_review_date?: string | null
          next_appointment_date?: string | null
          patient_id?: string
          primary_diagnosis?: string
          review_required?: boolean | null
          secondary_diagnoses?: string | null
          trial_arm?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "patient_clinical_overview_clinician_id_fkey"
            columns: ["clinician_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patient_clinical_overview_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      patient_onboarding_data: {
        Row: {
          carer_email: string | null
          carer_name: string | null
          carer_phone: string | null
          created_at: string | null
          date_of_birth: string | null
          first_name: string
          gender: string | null
          id: string
          last_name: string
          middle_name: string | null
          preferred_tracking_times: string[] | null
          research_data_types: string[] | null
          selected_conditions: string[] | null
          share_research_data: boolean | null
          track_menstrual_cycle: boolean | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          carer_email?: string | null
          carer_name?: string | null
          carer_phone?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          first_name: string
          gender?: string | null
          id?: string
          last_name: string
          middle_name?: string | null
          preferred_tracking_times?: string[] | null
          research_data_types?: string[] | null
          selected_conditions?: string[] | null
          share_research_data?: boolean | null
          track_menstrual_cycle?: boolean | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          carer_email?: string | null
          carer_name?: string | null
          carer_phone?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          first_name?: string
          gender?: string | null
          id?: string
          last_name?: string
          middle_name?: string | null
          preferred_tracking_times?: string[] | null
          research_data_types?: string[] | null
          selected_conditions?: string[] | null
          share_research_data?: boolean | null
          track_menstrual_cycle?: boolean | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      patient_profiles: {
        Row: {
          created_at: string | null
          date_of_birth: string | null
          first_name: string
          gender: string | null
          id: string
          last_name: string
          middle_name: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          date_of_birth?: string | null
          first_name: string
          gender?: string | null
          id?: string
          last_name: string
          middle_name?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          date_of_birth?: string | null
          first_name?: string
          gender?: string | null
          id?: string
          last_name?: string
          middle_name?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "patient_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      patient_timeline: {
        Row: {
          clinical_significance: string | null
          color_code: string | null
          created_at: string | null
          description: string | null
          event_date: string
          event_type: string
          icon_type: string | null
          id: string
          patient_id: string
          related_id: string | null
          related_table: string | null
          title: string
        }
        Insert: {
          clinical_significance?: string | null
          color_code?: string | null
          created_at?: string | null
          description?: string | null
          event_date: string
          event_type: string
          icon_type?: string | null
          id?: string
          patient_id: string
          related_id?: string | null
          related_table?: string | null
          title: string
        }
        Update: {
          clinical_significance?: string | null
          color_code?: string | null
          created_at?: string | null
          description?: string | null
          event_date?: string
          event_type?: string
          icon_type?: string | null
          id?: string
          patient_id?: string
          related_id?: string | null
          related_table?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "patient_timeline_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          first_name: string | null
          id: string
          institution: string | null
          last_name: string | null
          onboarding_completed: boolean | null
          selected_conditions: string | null
          specialty: string | null
          updated_at: string | null
          user_type: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          first_name?: string | null
          id: string
          institution?: string | null
          last_name?: string | null
          onboarding_completed?: boolean | null
          selected_conditions?: string | null
          specialty?: string | null
          updated_at?: string | null
          user_type?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          first_name?: string | null
          id?: string
          institution?: string | null
          last_name?: string | null
          onboarding_completed?: boolean | null
          selected_conditions?: string | null
          specialty?: string | null
          updated_at?: string | null
          user_type?: string | null
        }
        Relationships: []
      }
      research_consent: {
        Row: {
          consent_date: string | null
          consent_document_url: string | null
          consent_version: string
          created_at: string | null
          data_types_consented: Json | null
          id: string
          is_active: boolean | null
          updated_at: string | null
          user_id: string
          withdrawal_date: string | null
        }
        Insert: {
          consent_date?: string | null
          consent_document_url?: string | null
          consent_version: string
          created_at?: string | null
          data_types_consented?: Json | null
          id?: string
          is_active?: boolean | null
          updated_at?: string | null
          user_id: string
          withdrawal_date?: string | null
        }
        Update: {
          consent_date?: string | null
          consent_document_url?: string | null
          consent_version?: string
          created_at?: string | null
          data_types_consented?: Json | null
          id?: string
          is_active?: boolean | null
          updated_at?: string | null
          user_id?: string
          withdrawal_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "research_consent_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      research_data_quality: {
        Row: {
          assessment_details: Json | null
          consistency_score: number | null
          data_completeness_score: number | null
          id: string
          last_assessment_date: string | null
          overall_quality_score: number | null
          timeliness_score: number | null
          user_id: string
        }
        Insert: {
          assessment_details?: Json | null
          consistency_score?: number | null
          data_completeness_score?: number | null
          id?: string
          last_assessment_date?: string | null
          overall_quality_score?: number | null
          timeliness_score?: number | null
          user_id: string
        }
        Update: {
          assessment_details?: Json | null
          consistency_score?: number | null
          data_completeness_score?: number | null
          id?: string
          last_assessment_date?: string | null
          overall_quality_score?: number | null
          timeliness_score?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "research_data_quality_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      research_medication_data: {
        Row: {
          adherence_percentage: number | null
          age_range: string | null
          condition_category: string | null
          created_at: string | null
          dosage_mg: number | null
          effectiveness_rating: number | null
          gender: string | null
          id: string
          medication_generic_name: string | null
          research_user_id: string
          side_effects: Json | null
          years_on_medication: number | null
        }
        Insert: {
          adherence_percentage?: number | null
          age_range?: string | null
          condition_category?: string | null
          created_at?: string | null
          dosage_mg?: number | null
          effectiveness_rating?: number | null
          gender?: string | null
          id?: string
          medication_generic_name?: string | null
          research_user_id: string
          side_effects?: Json | null
          years_on_medication?: number | null
        }
        Update: {
          adherence_percentage?: number | null
          age_range?: string | null
          condition_category?: string | null
          created_at?: string | null
          dosage_mg?: number | null
          effectiveness_rating?: number | null
          gender?: string | null
          id?: string
          medication_generic_name?: string | null
          research_user_id?: string
          side_effects?: Json | null
          years_on_medication?: number | null
        }
        Relationships: []
      }
      research_seizure_data: {
        Row: {
          age_range: string | null
          consciousness_level: string | null
          created_at: string | null
          duration_seconds: number | null
          gender: string | null
          id: string
          medications_count: number | null
          research_user_id: string
          seizure_date: string | null
          seizure_type: string | null
          severity: number | null
          triggers: Json | null
          years_since_diagnosis: number | null
        }
        Insert: {
          age_range?: string | null
          consciousness_level?: string | null
          created_at?: string | null
          duration_seconds?: number | null
          gender?: string | null
          id?: string
          medications_count?: number | null
          research_user_id: string
          seizure_date?: string | null
          seizure_type?: string | null
          severity?: number | null
          triggers?: Json | null
          years_since_diagnosis?: number | null
        }
        Update: {
          age_range?: string | null
          consciousness_level?: string | null
          created_at?: string | null
          duration_seconds?: number | null
          gender?: string | null
          id?: string
          medications_count?: number | null
          research_user_id?: string
          seizure_date?: string | null
          seizure_type?: string | null
          severity?: number | null
          triggers?: Json | null
          years_since_diagnosis?: number | null
        }
        Relationships: []
      }
      research_symptom_data: {
        Row: {
          age_range: string | null
          condition_category: string | null
          created_at: string | null
          frequency_per_week: number | null
          gender: string | null
          id: string
          medications_count: number | null
          research_user_id: string
          severity: number | null
          symptom_date: string | null
          symptom_type: string | null
          triggers: Json | null
        }
        Insert: {
          age_range?: string | null
          condition_category?: string | null
          created_at?: string | null
          frequency_per_week?: number | null
          gender?: string | null
          id?: string
          medications_count?: number | null
          research_user_id: string
          severity?: number | null
          symptom_date?: string | null
          symptom_type?: string | null
          triggers?: Json | null
        }
        Update: {
          age_range?: string | null
          condition_category?: string | null
          created_at?: string | null
          frequency_per_week?: number | null
          gender?: string | null
          id?: string
          medications_count?: number | null
          research_user_id?: string
          severity?: number | null
          symptom_date?: string | null
          symptom_type?: string | null
          triggers?: Json | null
        }
        Relationships: []
      }
      researcher_access_requests: {
        Row: {
          created_at: string | null
          email: string
          first_name: string | null
          id: string
          institution: string | null
          last_name: string | null
          request_reason: string | null
          research_area: string | null
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          email: string
          first_name?: string | null
          id?: string
          institution?: string | null
          last_name?: string | null
          request_reason?: string | null
          research_area?: string | null
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          email?: string
          first_name?: string | null
          id?: string
          institution?: string | null
          last_name?: string | null
          request_reason?: string | null
          research_area?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      seizure_logs: {
        Row: {
          consciousness_level: string | null
          created_at: string | null
          duration_seconds: number | null
          id: string
          injuries: Json | null
          location: string | null
          log_date: string
          log_time: string | null
          notes: string | null
          post_ictal_symptoms: Json | null
          seizure_type: string | null
          severity: number | null
          triggers: Json | null
          user_id: string
          warning_signs: Json | null
          witness_account: string | null
          witness_present: boolean | null
        }
        Insert: {
          consciousness_level?: string | null
          created_at?: string | null
          duration_seconds?: number | null
          id?: string
          injuries?: Json | null
          location?: string | null
          log_date: string
          log_time?: string | null
          notes?: string | null
          post_ictal_symptoms?: Json | null
          seizure_type?: string | null
          severity?: number | null
          triggers?: Json | null
          user_id: string
          warning_signs?: Json | null
          witness_account?: string | null
          witness_present?: boolean | null
        }
        Update: {
          consciousness_level?: string | null
          created_at?: string | null
          duration_seconds?: number | null
          id?: string
          injuries?: Json | null
          location?: string | null
          log_date?: string
          log_time?: string | null
          notes?: string | null
          post_ictal_symptoms?: Json | null
          seizure_type?: string | null
          severity?: number | null
          triggers?: Json | null
          user_id?: string
          warning_signs?: Json | null
          witness_account?: string | null
          witness_present?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "seizure_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      sessions: {
        Row: {
          expire: string
          sess: Json
          sid: string
        }
        Insert: {
          expire: string
          sess: Json
          sid: string
        }
        Update: {
          expire?: string
          sess?: Json
          sid?: string
        }
        Relationships: []
      }
      symptom_logs: {
        Row: {
          body_parts: Json | null
          created_at: string | null
          duration_minutes: number | null
          id: string
          impact_on_activities: Json | null
          log_date: string
          log_time: string | null
          notes: string | null
          relief_methods: Json | null
          severity: number | null
          symptom_type: string
          triggers: Json | null
          user_id: string
        }
        Insert: {
          body_parts?: Json | null
          created_at?: string | null
          duration_minutes?: number | null
          id?: string
          impact_on_activities?: Json | null
          log_date: string
          log_time?: string | null
          notes?: string | null
          relief_methods?: Json | null
          severity?: number | null
          symptom_type: string
          triggers?: Json | null
          user_id: string
        }
        Update: {
          body_parts?: Json | null
          created_at?: string | null
          duration_minutes?: number | null
          id?: string
          impact_on_activities?: Json | null
          log_date?: string
          log_time?: string | null
          notes?: string | null
          relief_methods?: Json | null
          severity?: number | null
          symptom_type?: string
          triggers?: Json | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "symptom_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      tracking_entries: {
        Row: {
          created_at: string | null
          description: string | null
          duration_minutes: number | null
          energy_level: number | null
          entry_date: string
          entry_type: string
          id: string
          location: string | null
          mood_rating: number | null
          notes: string | null
          severity: number | null
          sleep_quality: number | null
          title: string | null
          triggers: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          duration_minutes?: number | null
          energy_level?: number | null
          entry_date: string
          entry_type: string
          id?: string
          location?: string | null
          mood_rating?: number | null
          notes?: string | null
          severity?: number | null
          sleep_quality?: number | null
          title?: string | null
          triggers?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          duration_minutes?: number | null
          energy_level?: number | null
          entry_date?: string
          entry_type?: string
          id?: string
          location?: string | null
          mood_rating?: number | null
          notes?: string | null
          severity?: number | null
          sleep_quality?: number | null
          title?: string | null
          triggers?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tracking_entries_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_achievements: {
        Row: {
          achievement_name: string
          achievement_type: string
          badge_icon: string | null
          category: string | null
          description: string | null
          id: string
          is_displayed: boolean | null
          points_earned: number | null
          unlock_date: string | null
          user_id: string
        }
        Insert: {
          achievement_name: string
          achievement_type: string
          badge_icon?: string | null
          category?: string | null
          description?: string | null
          id?: string
          is_displayed?: boolean | null
          points_earned?: number | null
          unlock_date?: string | null
          user_id: string
        }
        Update: {
          achievement_name?: string
          achievement_type?: string
          badge_icon?: string | null
          category?: string | null
          description?: string | null
          id?: string
          is_displayed?: boolean | null
          points_earned?: number | null
          unlock_date?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_conditions: {
        Row: {
          condition_id: string
          created_at: string | null
          diagnosis_date: string | null
          id: string
          notes: string | null
          severity: string | null
          user_id: string
        }
        Insert: {
          condition_id: string
          created_at?: string | null
          diagnosis_date?: string | null
          id?: string
          notes?: string | null
          severity?: string | null
          user_id: string
        }
        Update: {
          condition_id?: string
          created_at?: string | null
          diagnosis_date?: string | null
          id?: string
          notes?: string | null
          severity?: string | null
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
          {
            foreignKeyName: "user_conditions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_medications: {
        Row: {
          created_at: string | null
          dosage: string
          end_date: string | null
          frequency: string
          id: string
          is_active: boolean | null
          medication_id: string
          notes: string | null
          prescribing_doctor: string | null
          start_date: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          dosage: string
          end_date?: string | null
          frequency: string
          id?: string
          is_active?: boolean | null
          medication_id: string
          notes?: string | null
          prescribing_doctor?: string | null
          start_date?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          dosage?: string
          end_date?: string | null
          frequency?: string
          id?: string
          is_active?: boolean | null
          medication_id?: string
          notes?: string | null
          prescribing_doctor?: string | null
          start_date?: string | null
          updated_at?: string | null
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
          {
            foreignKeyName: "user_medications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_points: {
        Row: {
          created_at: string | null
          current_streak: number | null
          id: string
          last_activity_date: string | null
          level_name: string | null
          level_number: number | null
          longest_streak: number | null
          monthly_points: number | null
          total_points: number | null
          updated_at: string | null
          user_id: string
          weekly_points: number | null
        }
        Insert: {
          created_at?: string | null
          current_streak?: number | null
          id?: string
          last_activity_date?: string | null
          level_name?: string | null
          level_number?: number | null
          longest_streak?: number | null
          monthly_points?: number | null
          total_points?: number | null
          updated_at?: string | null
          user_id: string
          weekly_points?: number | null
        }
        Update: {
          created_at?: string | null
          current_streak?: number | null
          id?: string
          last_activity_date?: string | null
          level_name?: string | null
          level_number?: number | null
          longest_streak?: number | null
          monthly_points?: number | null
          total_points?: number | null
          updated_at?: string | null
          user_id?: string
          weekly_points?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "user_points_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          auth_user_id: string
          created_at: string | null
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          onboarding_completed: boolean | null
          profile_image_url: string | null
          updated_at: string | null
          user_type: string
        }
        Insert: {
          auth_user_id?: string
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          onboarding_completed?: boolean | null
          profile_image_url?: string | null
          updated_at?: string | null
          user_type: string
        }
        Update: {
          auth_user_id?: string
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          onboarding_completed?: boolean | null
          profile_image_url?: string | null
          updated_at?: string | null
          user_type?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      auth_uid_as_uuid: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      set_user_context: {
        Args: { auth_user_id: string; user_id: string }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const

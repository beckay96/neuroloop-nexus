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
  clinical: {
    Tables: {
      ai_insights_cards: {
        Row: {
          action_taken: boolean | null
          action_url: string | null
          ai_model_version: string | null
          clinician_id: string
          confidence_score: number | null
          content: string
          dismissed_at: string | null
          generated_at: string
          has_action: boolean | null
          impact_metric: Json | null
          insight_id: string
          insight_type: string
          is_dismissed: boolean | null
          is_pinned: boolean | null
          is_read: boolean | null
          read_at: string | null
          title: string
        }
        Insert: {
          action_taken?: boolean | null
          action_url?: string | null
          ai_model_version?: string | null
          clinician_id: string
          confidence_score?: number | null
          content: string
          dismissed_at?: string | null
          generated_at?: string
          has_action?: boolean | null
          impact_metric?: Json | null
          insight_id?: string
          insight_type: string
          is_dismissed?: boolean | null
          is_pinned?: boolean | null
          is_read?: boolean | null
          read_at?: string | null
          title: string
        }
        Update: {
          action_taken?: boolean | null
          action_url?: string | null
          ai_model_version?: string | null
          clinician_id?: string
          confidence_score?: number | null
          content?: string
          dismissed_at?: string | null
          generated_at?: string
          has_action?: boolean | null
          impact_metric?: Json | null
          insight_id?: string
          insight_type?: string
          is_dismissed?: boolean | null
          is_pinned?: boolean | null
          is_read?: boolean | null
          read_at?: string | null
          title?: string
        }
        Relationships: []
      }
      case_data_panels: {
        Row: {
          added_at: string
          added_by: string | null
          content: Json
          custom_panel_name: string | null
          display_order: number | null
          is_collapsed: boolean | null
          is_visible: boolean | null
          panel_id: string
          panel_type: string
          patient_id: string
          priority_score: number | null
          title: string
          updated_at: string | null
        }
        Insert: {
          added_at?: string
          added_by?: string | null
          content: Json
          custom_panel_name?: string | null
          display_order?: number | null
          is_collapsed?: boolean | null
          is_visible?: boolean | null
          panel_id?: string
          panel_type: string
          patient_id: string
          priority_score?: number | null
          title: string
          updated_at?: string | null
        }
        Update: {
          added_at?: string
          added_by?: string | null
          content?: Json
          custom_panel_name?: string | null
          display_order?: number | null
          is_collapsed?: boolean | null
          is_visible?: boolean | null
          panel_id?: string
          panel_type?: string
          patient_id?: string
          priority_score?: number | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      clinical_notes_exports: {
        Row: {
          author_id: string
          content: string
          digital_signature: string | null
          file_path: string | null
          format: string
          generated_at: string
          note_id: string
          note_type: string
          patient_id: string
          shared_at: string | null
          shared_with: string[] | null
          signed_at: string | null
          signed_by: string | null
          status: string | null
          updated_at: string | null
          visit_date: string | null
        }
        Insert: {
          author_id: string
          content: string
          digital_signature?: string | null
          file_path?: string | null
          format: string
          generated_at?: string
          note_id?: string
          note_type: string
          patient_id: string
          shared_at?: string | null
          shared_with?: string[] | null
          signed_at?: string | null
          signed_by?: string | null
          status?: string | null
          updated_at?: string | null
          visit_date?: string | null
        }
        Update: {
          author_id?: string
          content?: string
          digital_signature?: string | null
          file_path?: string | null
          format?: string
          generated_at?: string
          note_id?: string
          note_type?: string
          patient_id?: string
          shared_at?: string | null
          shared_with?: string[] | null
          signed_at?: string | null
          signed_by?: string | null
          status?: string | null
          updated_at?: string | null
          visit_date?: string | null
        }
        Relationships: []
      }
      clinical_scale_results: {
        Row: {
          assessed_at: string
          assessed_by: string | null
          assessment_notes: string | null
          change_alert: boolean | null
          change_from_baseline: number | null
          due_at: string | null
          entered_at: string | null
          entered_by: string
          is_significant_change: boolean | null
          patient_condition: string | null
          patient_id: string
          scale_id: string
          scale_type: string
          scale_version: string | null
          subscale_scores: Json | null
          total_score: number | null
          trend: Json | null
          updated_at: string | null
        }
        Insert: {
          assessed_at: string
          assessed_by?: string | null
          assessment_notes?: string | null
          change_alert?: boolean | null
          change_from_baseline?: number | null
          due_at?: string | null
          entered_at?: string | null
          entered_by: string
          is_significant_change?: boolean | null
          patient_condition?: string | null
          patient_id: string
          scale_id?: string
          scale_type: string
          scale_version?: string | null
          subscale_scores?: Json | null
          total_score?: number | null
          trend?: Json | null
          updated_at?: string | null
        }
        Update: {
          assessed_at?: string
          assessed_by?: string | null
          assessment_notes?: string | null
          change_alert?: boolean | null
          change_from_baseline?: number | null
          due_at?: string | null
          entered_at?: string | null
          entered_by?: string
          is_significant_change?: boolean | null
          patient_condition?: string | null
          patient_id?: string
          scale_id?: string
          scale_type?: string
          scale_version?: string | null
          subscale_scores?: Json | null
          total_score?: number | null
          trend?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      clinician_today_view: {
        Row: {
          alerts: Json | null
          appointments: Json | null
          clinician_id: string
          created_at: string | null
          date: string
          high_priority_patients: Json | null
          last_refreshed: string | null
          layout_config: Json | null
          pending_tasks: Json | null
          updated_at: string | null
          view_id: string
          widget_order: number[] | null
        }
        Insert: {
          alerts?: Json | null
          appointments?: Json | null
          clinician_id: string
          created_at?: string | null
          date?: string
          high_priority_patients?: Json | null
          last_refreshed?: string | null
          layout_config?: Json | null
          pending_tasks?: Json | null
          updated_at?: string | null
          view_id?: string
          widget_order?: number[] | null
        }
        Update: {
          alerts?: Json | null
          appointments?: Json | null
          clinician_id?: string
          created_at?: string | null
          date?: string
          high_priority_patients?: Json | null
          last_refreshed?: string | null
          layout_config?: Json | null
          pending_tasks?: Json | null
          updated_at?: string | null
          view_id?: string
          widget_order?: number[] | null
        }
        Relationships: []
      }
      neuro_imaging_results: {
        Row: {
          ai_findings: Json | null
          ai_processed: boolean | null
          annotations: Json | null
          critical_findings: boolean | null
          dicom_uid: string | null
          file_size_mb: number | null
          findings_summary: string | null
          image_id: string
          image_path: string | null
          impression: string | null
          modality_details: string | null
          ordering_physician: string | null
          patient_id: string
          radiologist: string | null
          study_date: string
          study_protocol: string | null
          study_type: string
          updated_at: string | null
          uploaded_at: string | null
          uploaded_by: string | null
        }
        Insert: {
          ai_findings?: Json | null
          ai_processed?: boolean | null
          annotations?: Json | null
          critical_findings?: boolean | null
          dicom_uid?: string | null
          file_size_mb?: number | null
          findings_summary?: string | null
          image_id?: string
          image_path?: string | null
          impression?: string | null
          modality_details?: string | null
          ordering_physician?: string | null
          patient_id: string
          radiologist?: string | null
          study_date: string
          study_protocol?: string | null
          study_type: string
          updated_at?: string | null
          uploaded_at?: string | null
          uploaded_by?: string | null
        }
        Update: {
          ai_findings?: Json | null
          ai_processed?: boolean | null
          annotations?: Json | null
          critical_findings?: boolean | null
          dicom_uid?: string | null
          file_size_mb?: number | null
          findings_summary?: string | null
          image_id?: string
          image_path?: string | null
          impression?: string | null
          modality_details?: string | null
          ordering_physician?: string | null
          patient_id?: string
          radiologist?: string | null
          study_date?: string
          study_protocol?: string | null
          study_type?: string
          updated_at?: string | null
          uploaded_at?: string | null
          uploaded_by?: string | null
        }
        Relationships: []
      }
      patient_collab_chat: {
        Row: {
          attachments: Json | null
          deleted_at: string | null
          edited_at: string | null
          is_read: boolean | null
          is_urgent: boolean | null
          mentioned_users: string[] | null
          message: string
          message_id: string
          parent_message_id: string | null
          patient_id: string
          read_at: string | null
          read_by: string[] | null
          requires_response: boolean | null
          sender_id: string
          sent_at: string
          thread_id: string | null
        }
        Insert: {
          attachments?: Json | null
          deleted_at?: string | null
          edited_at?: string | null
          is_read?: boolean | null
          is_urgent?: boolean | null
          mentioned_users?: string[] | null
          message: string
          message_id?: string
          parent_message_id?: string | null
          patient_id: string
          read_at?: string | null
          read_by?: string[] | null
          requires_response?: boolean | null
          sender_id: string
          sent_at?: string
          thread_id?: string | null
        }
        Update: {
          attachments?: Json | null
          deleted_at?: string | null
          edited_at?: string | null
          is_read?: boolean | null
          is_urgent?: boolean | null
          mentioned_users?: string[] | null
          message?: string
          message_id?: string
          parent_message_id?: string | null
          patient_id?: string
          read_at?: string | null
          read_by?: string[] | null
          requires_response?: boolean | null
          sender_id?: string
          sent_at?: string
          thread_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "patient_collab_chat_parent_message_id_fkey"
            columns: ["parent_message_id"]
            isOneToOne: false
            referencedRelation: "patient_collab_chat"
            referencedColumns: ["message_id"]
          },
        ]
      }
      patient_pro_timeline: {
        Row: {
          collection_method: string | null
          created_at: string | null
          custom_type_name: string | null
          intervention_notes: string | null
          is_validated: boolean | null
          linked_intervention: string | null
          patient_id: string
          pro_id: string
          pro_type: string
          reported_at: string
          updated_at: string | null
          validated_by: string | null
          validation_notes: string | null
          value: number | null
          value_json: Json | null
          value_unit: string | null
        }
        Insert: {
          collection_method?: string | null
          created_at?: string | null
          custom_type_name?: string | null
          intervention_notes?: string | null
          is_validated?: boolean | null
          linked_intervention?: string | null
          patient_id: string
          pro_id?: string
          pro_type: string
          reported_at?: string
          updated_at?: string | null
          validated_by?: string | null
          validation_notes?: string | null
          value?: number | null
          value_json?: Json | null
          value_unit?: string | null
        }
        Update: {
          collection_method?: string | null
          created_at?: string | null
          custom_type_name?: string | null
          intervention_notes?: string | null
          is_validated?: boolean | null
          linked_intervention?: string | null
          patient_id?: string
          pro_id?: string
          pro_type?: string
          reported_at?: string
          updated_at?: string | null
          validated_by?: string | null
          validation_notes?: string | null
          value?: number | null
          value_json?: Json | null
          value_unit?: string | null
        }
        Relationships: []
      }
      patient_risk_alerts: {
        Row: {
          acknowledged_at: string | null
          acknowledged_by: string | null
          alert_id: string
          alert_level: string
          context_data: Json | null
          created_at: string
          patient_id: string
          reason: string
          resolution_notes: string | null
          resolved_at: string | null
          resolved_by: string | null
          risk_type: string
          score: number | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          acknowledged_at?: string | null
          acknowledged_by?: string | null
          alert_id?: string
          alert_level?: string
          context_data?: Json | null
          created_at?: string
          patient_id: string
          reason: string
          resolution_notes?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          risk_type: string
          score?: number | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          acknowledged_at?: string | null
          acknowledged_by?: string | null
          alert_id?: string
          alert_level?: string
          context_data?: Json | null
          created_at?: string
          patient_id?: string
          reason?: string
          resolution_notes?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          risk_type?: string
          score?: number | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      patient_snapshots: {
        Row: {
          ai_model_version: string | null
          author: string
          author_id: string | null
          generated_at: string
          highlight_events: Json | null
          is_archived: boolean | null
          is_pinned: boolean | null
          key_metrics: Json | null
          patient_id: string
          period_end: string | null
          period_start: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          snapshot_id: string
          summary: string
        }
        Insert: {
          ai_model_version?: string | null
          author: string
          author_id?: string | null
          generated_at?: string
          highlight_events?: Json | null
          is_archived?: boolean | null
          is_pinned?: boolean | null
          key_metrics?: Json | null
          patient_id: string
          period_end?: string | null
          period_start?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          snapshot_id?: string
          summary: string
        }
        Update: {
          ai_model_version?: string | null
          author?: string
          author_id?: string | null
          generated_at?: string
          highlight_events?: Json | null
          is_archived?: boolean | null
          is_pinned?: boolean | null
          key_metrics?: Json | null
          patient_id?: string
          period_end?: string | null
          period_start?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          snapshot_id?: string
          summary?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  private_health_info: {
    Tables: {
      basal_temperature_logs: {
        Row: {
          created_at: string | null
          id: string
          log_date: string
          log_time: string
          notes: string | null
          temperature_celsius: number | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          log_date: string
          log_time: string
          notes?: string | null
          temperature_celsius?: number | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          log_date?: string
          log_time?: string
          notes?: string | null
          temperature_celsius?: number | null
          user_id?: string
        }
        Relationships: []
      }
      clinical_media: {
        Row: {
          description: string | null
          duration_seconds: number | null
          file_size_mb: number | null
          file_type: string
          file_url: string
          media_id: string
          mime_type: string | null
          parent_id: string
          parent_type: string
          patient_id: string
          shared_with_clinician: boolean | null
          storage_bucket: string | null
          storage_path: string | null
          tags: Json | null
          thumbnail_url: string | null
          uploaded_at: string | null
          uploaded_by: string | null
          visible_to_researchers: boolean | null
        }
        Insert: {
          description?: string | null
          duration_seconds?: number | null
          file_size_mb?: number | null
          file_type: string
          file_url: string
          media_id?: string
          mime_type?: string | null
          parent_id: string
          parent_type: string
          patient_id: string
          shared_with_clinician?: boolean | null
          storage_bucket?: string | null
          storage_path?: string | null
          tags?: Json | null
          thumbnail_url?: string | null
          uploaded_at?: string | null
          uploaded_by?: string | null
          visible_to_researchers?: boolean | null
        }
        Update: {
          description?: string | null
          duration_seconds?: number | null
          file_size_mb?: number | null
          file_type?: string
          file_url?: string
          media_id?: string
          mime_type?: string | null
          parent_id?: string
          parent_type?: string
          patient_id?: string
          shared_with_clinician?: boolean | null
          storage_bucket?: string | null
          storage_path?: string | null
          tags?: Json | null
          thumbnail_url?: string | null
          uploaded_at?: string | null
          uploaded_by?: string | null
          visible_to_researchers?: boolean | null
        }
        Relationships: []
      }
      clinician_onboarding_data: {
        Row: {
          clinician_title: string | null
          completed_at: string | null
          created_at: string | null
          first_name: string | null
          id: string
          institution: string | null
          last_name: string | null
          last_updated_at: string | null
          license_number: string | null
          middle_name: string | null
          onboarding_step: number | null
          patient_invite_emails: string[] | null
          specialty: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          clinician_title?: string | null
          completed_at?: string | null
          created_at?: string | null
          first_name?: string | null
          id?: string
          institution?: string | null
          last_name?: string | null
          last_updated_at?: string | null
          license_number?: string | null
          middle_name?: string | null
          onboarding_step?: number | null
          patient_invite_emails?: string[] | null
          specialty?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          clinician_title?: string | null
          completed_at?: string | null
          created_at?: string | null
          first_name?: string | null
          id?: string
          institution?: string | null
          last_name?: string | null
          last_updated_at?: string | null
          license_number?: string | null
          middle_name?: string | null
          onboarding_step?: number | null
          patient_invite_emails?: string[] | null
          specialty?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      clinician_phi: {
        Row: {
          board_certifications: string[] | null
          created_at: string | null
          dea_number: string | null
          id: string
          license_expiry: string | null
          license_number: string | null
          license_state: string | null
          medical_degree: string | null
          npi_number: string | null
          office_fax: string | null
          office_phone: string | null
          practice_address: Json | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          board_certifications?: string[] | null
          created_at?: string | null
          dea_number?: string | null
          id?: string
          license_expiry?: string | null
          license_number?: string | null
          license_state?: string | null
          medical_degree?: string | null
          npi_number?: string | null
          office_fax?: string | null
          office_phone?: string | null
          practice_address?: Json | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          board_certifications?: string[] | null
          created_at?: string | null
          dea_number?: string | null
          id?: string
          license_expiry?: string | null
          license_number?: string | null
          license_state?: string | null
          medical_degree?: string | null
          npi_number?: string | null
          office_fax?: string | null
          office_phone?: string | null
          practice_address?: Json | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      daily_symptom_logs: {
        Row: {
          activities_difficult: Json | null
          adl_independence_level: number | null
          all_medications_taken: boolean | null
          autonomic_symptoms: Json | null
          cognitive_issues: Json | null
          created_at: string | null
          dyskinesia_severity: number | null
          energy_level: number | null
          exercise_minutes: number | null
          fatigue_level: number | null
          log_date: string
          log_id: string
          medication_side_effects: Json | null
          missed_doses: string | null
          mood: number | null
          mood_issues: Json | null
          motor_fluctuations_occurred: boolean | null
          notable_events: string | null
          off_time_hours: number | null
          on_time_hours: number | null
          other_symptoms: Json | null
          overall_feeling: number | null
          pain_level: number | null
          patient_id: string
          shared_with_clinician: boolean | null
          sleep_disturbances: Json | null
          sleep_hours: number | null
          sleep_quality: number | null
          slowness_severity: number | null
          stiffness_severity: number | null
          stress_level: number | null
          symptom_notes: string | null
          updated_at: string | null
          visible_to_researchers: boolean | null
        }
        Insert: {
          activities_difficult?: Json | null
          adl_independence_level?: number | null
          all_medications_taken?: boolean | null
          autonomic_symptoms?: Json | null
          cognitive_issues?: Json | null
          created_at?: string | null
          dyskinesia_severity?: number | null
          energy_level?: number | null
          exercise_minutes?: number | null
          fatigue_level?: number | null
          log_date: string
          log_id?: string
          medication_side_effects?: Json | null
          missed_doses?: string | null
          mood?: number | null
          mood_issues?: Json | null
          motor_fluctuations_occurred?: boolean | null
          notable_events?: string | null
          off_time_hours?: number | null
          on_time_hours?: number | null
          other_symptoms?: Json | null
          overall_feeling?: number | null
          pain_level?: number | null
          patient_id: string
          shared_with_clinician?: boolean | null
          sleep_disturbances?: Json | null
          sleep_hours?: number | null
          sleep_quality?: number | null
          slowness_severity?: number | null
          stiffness_severity?: number | null
          stress_level?: number | null
          symptom_notes?: string | null
          updated_at?: string | null
          visible_to_researchers?: boolean | null
        }
        Update: {
          activities_difficult?: Json | null
          adl_independence_level?: number | null
          all_medications_taken?: boolean | null
          autonomic_symptoms?: Json | null
          cognitive_issues?: Json | null
          created_at?: string | null
          dyskinesia_severity?: number | null
          energy_level?: number | null
          exercise_minutes?: number | null
          fatigue_level?: number | null
          log_date?: string
          log_id?: string
          medication_side_effects?: Json | null
          missed_doses?: string | null
          mood?: number | null
          mood_issues?: Json | null
          motor_fluctuations_occurred?: boolean | null
          notable_events?: string | null
          off_time_hours?: number | null
          on_time_hours?: number | null
          other_symptoms?: Json | null
          overall_feeling?: number | null
          pain_level?: number | null
          patient_id?: string
          shared_with_clinician?: boolean | null
          sleep_disturbances?: Json | null
          sleep_hours?: number | null
          sleep_quality?: number | null
          slowness_severity?: number | null
          stiffness_severity?: number | null
          stress_level?: number | null
          symptom_notes?: string | null
          updated_at?: string | null
          visible_to_researchers?: boolean | null
        }
        Relationships: []
      }
      gait_episodes: {
        Row: {
          activity: string | null
          broke_freeze_with: string | null
          created_at: string | null
          duration_seconds: number | null
          environmental_factors: Json | null
          event_type: string
          fall_direction: string | null
          freezing_trigger: string | null
          gait_id: string
          hours_since_medication: number | null
          injury_description: string | null
          injury_occurred: boolean | null
          location: string | null
          media_urls: Json | null
          medication_status: string | null
          notes: string | null
          occurred_at: string
          patient_id: string
          required_assistance: boolean | null
          resulted_in_fall: boolean | null
          severity: number | null
          shared_with_clinician: boolean | null
          updated_at: string | null
          video_recorded: boolean | null
          visible_to_researchers: boolean | null
        }
        Insert: {
          activity?: string | null
          broke_freeze_with?: string | null
          created_at?: string | null
          duration_seconds?: number | null
          environmental_factors?: Json | null
          event_type: string
          fall_direction?: string | null
          freezing_trigger?: string | null
          gait_id?: string
          hours_since_medication?: number | null
          injury_description?: string | null
          injury_occurred?: boolean | null
          location?: string | null
          media_urls?: Json | null
          medication_status?: string | null
          notes?: string | null
          occurred_at: string
          patient_id: string
          required_assistance?: boolean | null
          resulted_in_fall?: boolean | null
          severity?: number | null
          shared_with_clinician?: boolean | null
          updated_at?: string | null
          video_recorded?: boolean | null
          visible_to_researchers?: boolean | null
        }
        Update: {
          activity?: string | null
          broke_freeze_with?: string | null
          created_at?: string | null
          duration_seconds?: number | null
          environmental_factors?: Json | null
          event_type?: string
          fall_direction?: string | null
          freezing_trigger?: string | null
          gait_id?: string
          hours_since_medication?: number | null
          injury_description?: string | null
          injury_occurred?: boolean | null
          location?: string | null
          media_urls?: Json | null
          medication_status?: string | null
          notes?: string | null
          occurred_at?: string
          patient_id?: string
          required_assistance?: boolean | null
          resulted_in_fall?: boolean | null
          severity?: number | null
          shared_with_clinician?: boolean | null
          updated_at?: string | null
          video_recorded?: boolean | null
          visible_to_researchers?: boolean | null
        }
        Relationships: []
      }
      medication_logs: {
        Row: {
          created_at: string | null
          id: string
          log_date: string
          log_time: string
          notes: string | null
          taken: boolean | null
          user_id: string
          user_medication_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          log_date: string
          log_time: string
          notes?: string | null
          taken?: boolean | null
          user_id: string
          user_medication_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          log_date?: string
          log_time?: string
          notes?: string | null
          taken?: boolean | null
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
      menstrual_cycle_logs: {
        Row: {
          catamenial_pattern_suspected: boolean | null
          created_at: string
          cycle_end_date: string | null
          cycle_length_days: number | null
          cycle_phase: Database["public"]["Enums"]["cycle_phase_enum"] | null
          cycle_start_date: string
          flow_intensity:
            | Database["public"]["Enums"]["flow_intensity_enum"]
            | null
          id: string
          notes: string | null
          overall_symptom_severity: number | null
          seizure_clustered_around_menstruation: boolean | null
          seizure_count_during_cycle: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          catamenial_pattern_suspected?: boolean | null
          created_at?: string
          cycle_end_date?: string | null
          cycle_length_days?: number | null
          cycle_phase?: Database["public"]["Enums"]["cycle_phase_enum"] | null
          cycle_start_date: string
          flow_intensity?:
            | Database["public"]["Enums"]["flow_intensity_enum"]
            | null
          id?: string
          notes?: string | null
          overall_symptom_severity?: number | null
          seizure_clustered_around_menstruation?: boolean | null
          seizure_count_during_cycle?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          catamenial_pattern_suspected?: boolean | null
          created_at?: string
          cycle_end_date?: string | null
          cycle_length_days?: number | null
          cycle_phase?: Database["public"]["Enums"]["cycle_phase_enum"] | null
          cycle_start_date?: string
          flow_intensity?:
            | Database["public"]["Enums"]["flow_intensity_enum"]
            | null
          id?: string
          notes?: string | null
          overall_symptom_severity?: number | null
          seizure_clustered_around_menstruation?: boolean | null
          seizure_count_during_cycle?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      menstrual_log_symptoms: {
        Row: {
          created_at: string
          id: string
          log_id: string
          severity:
            | Database["public"]["Enums"]["menstrual_symptom_severity_enum"]
            | null
          symptom_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          log_id: string
          severity?:
            | Database["public"]["Enums"]["menstrual_symptom_severity_enum"]
            | null
          symptom_id: string
        }
        Update: {
          created_at?: string
          id?: string
          log_id?: string
          severity?:
            | Database["public"]["Enums"]["menstrual_symptom_severity_enum"]
            | null
          symptom_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "menstrual_log_symptoms_log_id_fkey"
            columns: ["log_id"]
            isOneToOne: false
            referencedRelation: "menstrual_cycle_logs"
            referencedColumns: ["id"]
          },
        ]
      }
      patient_onboarding_data: {
        Row: {
          completed_at: string | null
          created_at: string | null
          date_of_birth: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          emergency_contact_relationship: string | null
          first_name: string | null
          gender: Database["public"]["Enums"]["gender_enum"] | null
          id: string
          last_name: string | null
          last_updated_at: string | null
          middle_name: string | null
          onboarding_step: number | null
          phone_number: string | null
          research_data_types:
            | Database["public"]["Enums"]["research_data_type_enum"][]
            | null
          selected_conditions: string[] | null
          share_research_data: boolean | null
          track_menstrual_cycle: boolean | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          emergency_contact_relationship?: string | null
          first_name?: string | null
          gender?: Database["public"]["Enums"]["gender_enum"] | null
          id?: string
          last_name?: string | null
          last_updated_at?: string | null
          middle_name?: string | null
          onboarding_step?: number | null
          phone_number?: string | null
          research_data_types?:
            | Database["public"]["Enums"]["research_data_type_enum"][]
            | null
          selected_conditions?: string[] | null
          share_research_data?: boolean | null
          track_menstrual_cycle?: boolean | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          emergency_contact_relationship?: string | null
          first_name?: string | null
          gender?: Database["public"]["Enums"]["gender_enum"] | null
          id?: string
          last_name?: string | null
          last_updated_at?: string | null
          middle_name?: string | null
          onboarding_step?: number | null
          phone_number?: string | null
          research_data_types?:
            | Database["public"]["Enums"]["research_data_type_enum"][]
            | null
          selected_conditions?: string[] | null
          share_research_data?: boolean | null
          track_menstrual_cycle?: boolean | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      patient_phi: {
        Row: {
          aadhaar_number_encrypted: string | null
          ayushman_bharat_id_encrypted: string | null
          country_code: string | null
          created_at: string | null
          date_of_birth: string | null
          diagnosis_date: string | null
          dva_number_encrypted: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          emergency_contact_relationship: string | null
          ethnicity: string | null
          gender: string | null
          home_address: Json | null
          id: string
          insurance_member_id: string | null
          insurance_provider: string | null
          medical_record_number: string | null
          medicare_expiry: string | null
          medicare_irn: string | null
          medicare_number_encrypted: string | null
          national_health_id_encrypted: string | null
          pan_number_encrypted: string | null
          phone_number: string | null
          preferred_pronouns: string | null
          primary_care_physician: string | null
          primary_diagnosis: string | null
          primary_language: string | null
          private_health_insurer: string | null
          private_health_member_id_encrypted: string | null
          race: string | null
          referring_physician: string | null
          social_security_number_encrypted: string | null
          timezone: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          aadhaar_number_encrypted?: string | null
          ayushman_bharat_id_encrypted?: string | null
          country_code?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          diagnosis_date?: string | null
          dva_number_encrypted?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          emergency_contact_relationship?: string | null
          ethnicity?: string | null
          gender?: string | null
          home_address?: Json | null
          id?: string
          insurance_member_id?: string | null
          insurance_provider?: string | null
          medical_record_number?: string | null
          medicare_expiry?: string | null
          medicare_irn?: string | null
          medicare_number_encrypted?: string | null
          national_health_id_encrypted?: string | null
          pan_number_encrypted?: string | null
          phone_number?: string | null
          preferred_pronouns?: string | null
          primary_care_physician?: string | null
          primary_diagnosis?: string | null
          primary_language?: string | null
          private_health_insurer?: string | null
          private_health_member_id_encrypted?: string | null
          race?: string | null
          referring_physician?: string | null
          social_security_number_encrypted?: string | null
          timezone?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          aadhaar_number_encrypted?: string | null
          ayushman_bharat_id_encrypted?: string | null
          country_code?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          diagnosis_date?: string | null
          dva_number_encrypted?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          emergency_contact_relationship?: string | null
          ethnicity?: string | null
          gender?: string | null
          home_address?: Json | null
          id?: string
          insurance_member_id?: string | null
          insurance_provider?: string | null
          medical_record_number?: string | null
          medicare_expiry?: string | null
          medicare_irn?: string | null
          medicare_number_encrypted?: string | null
          national_health_id_encrypted?: string | null
          pan_number_encrypted?: string | null
          phone_number?: string | null
          preferred_pronouns?: string | null
          primary_care_physician?: string | null
          primary_diagnosis?: string | null
          primary_language?: string | null
          private_health_insurer?: string | null
          private_health_member_id_encrypted?: string | null
          race?: string | null
          referring_physician?: string | null
          social_security_number_encrypted?: string | null
          timezone?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      seizure_events: {
        Row: {
          activity_before: string | null
          aura_description: string | null
          aura_signs: Json | null
          body_parts_affected: Json | null
          consciousness_level: string | null
          created_at: string | null
          duration_seconds: number | null
          event_id: string
          fully_recovered: boolean | null
          had_aura: boolean | null
          hours_since_last_dose: number | null
          injuries_occurred: boolean | null
          injury_description: string | null
          injury_types: Json | null
          location: string | null
          media_urls: Json | null
          medication_taken_as_prescribed: boolean | null
          motor_symptoms: Json | null
          non_motor_symptoms: Json | null
          notes: string | null
          occurred_at: string
          patient_concerns: string | null
          patient_id: string
          possible_triggers: Json | null
          post_ictal_confusion: boolean | null
          post_ictal_duration_minutes: number | null
          post_ictal_effects: Json | null
          recent_medication_changes: boolean | null
          recovery_time_minutes: number | null
          required_medical_attention: boolean | null
          seizure_subtype: string | null
          seizure_type: string
          severity: number | null
          shared_with_carers: boolean | null
          shared_with_clinician: boolean | null
          synced_to_clinician_at: string | null
          trigger_details: string | null
          updated_at: string | null
          video_recorded: boolean | null
          visible_to_researchers: boolean | null
          warning_time_seconds: number | null
          witness_description: string | null
          witness_name: string | null
          witnessed: boolean | null
        }
        Insert: {
          activity_before?: string | null
          aura_description?: string | null
          aura_signs?: Json | null
          body_parts_affected?: Json | null
          consciousness_level?: string | null
          created_at?: string | null
          duration_seconds?: number | null
          event_id?: string
          fully_recovered?: boolean | null
          had_aura?: boolean | null
          hours_since_last_dose?: number | null
          injuries_occurred?: boolean | null
          injury_description?: string | null
          injury_types?: Json | null
          location?: string | null
          media_urls?: Json | null
          medication_taken_as_prescribed?: boolean | null
          motor_symptoms?: Json | null
          non_motor_symptoms?: Json | null
          notes?: string | null
          occurred_at: string
          patient_concerns?: string | null
          patient_id: string
          possible_triggers?: Json | null
          post_ictal_confusion?: boolean | null
          post_ictal_duration_minutes?: number | null
          post_ictal_effects?: Json | null
          recent_medication_changes?: boolean | null
          recovery_time_minutes?: number | null
          required_medical_attention?: boolean | null
          seizure_subtype?: string | null
          seizure_type: string
          severity?: number | null
          shared_with_carers?: boolean | null
          shared_with_clinician?: boolean | null
          synced_to_clinician_at?: string | null
          trigger_details?: string | null
          updated_at?: string | null
          video_recorded?: boolean | null
          visible_to_researchers?: boolean | null
          warning_time_seconds?: number | null
          witness_description?: string | null
          witness_name?: string | null
          witnessed?: boolean | null
        }
        Update: {
          activity_before?: string | null
          aura_description?: string | null
          aura_signs?: Json | null
          body_parts_affected?: Json | null
          consciousness_level?: string | null
          created_at?: string | null
          duration_seconds?: number | null
          event_id?: string
          fully_recovered?: boolean | null
          had_aura?: boolean | null
          hours_since_last_dose?: number | null
          injuries_occurred?: boolean | null
          injury_description?: string | null
          injury_types?: Json | null
          location?: string | null
          media_urls?: Json | null
          medication_taken_as_prescribed?: boolean | null
          motor_symptoms?: Json | null
          non_motor_symptoms?: Json | null
          notes?: string | null
          occurred_at?: string
          patient_concerns?: string | null
          patient_id?: string
          possible_triggers?: Json | null
          post_ictal_confusion?: boolean | null
          post_ictal_duration_minutes?: number | null
          post_ictal_effects?: Json | null
          recent_medication_changes?: boolean | null
          recovery_time_minutes?: number | null
          required_medical_attention?: boolean | null
          seizure_subtype?: string | null
          seizure_type?: string
          severity?: number | null
          shared_with_carers?: boolean | null
          shared_with_clinician?: boolean | null
          synced_to_clinician_at?: string | null
          trigger_details?: string | null
          updated_at?: string | null
          video_recorded?: boolean | null
          visible_to_researchers?: boolean | null
          warning_time_seconds?: number | null
          witness_description?: string | null
          witness_name?: string | null
          witnessed?: boolean | null
        }
        Relationships: []
      }
      seizure_generalized_assessment: {
        Row: {
          assessment_type: Database["public"]["Enums"]["assessment_type_enum"]
          classifier_basis: string | null
          confidence_score: number | null
          created_at: string | null
          id: string
          log_id: string
        }
        Insert: {
          assessment_type: Database["public"]["Enums"]["assessment_type_enum"]
          classifier_basis?: string | null
          confidence_score?: number | null
          created_at?: string | null
          id?: string
          log_id: string
        }
        Update: {
          assessment_type?: Database["public"]["Enums"]["assessment_type_enum"]
          classifier_basis?: string | null
          confidence_score?: number | null
          created_at?: string | null
          id?: string
          log_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "seizure_generalized_assessment_log_id_fkey"
            columns: ["log_id"]
            isOneToOne: true
            referencedRelation: "seizure_logs_research"
            referencedColumns: ["log_id"]
          },
        ]
      }
      seizure_log_brain_regions: {
        Row: {
          calculated_probability: number | null
          created_at: string | null
          id: string
          log_id: string
          probability_grade:
            | Database["public"]["Enums"]["probability_grade_enum"]
            | null
          region_id: number
        }
        Insert: {
          calculated_probability?: number | null
          created_at?: string | null
          id?: string
          log_id: string
          probability_grade?:
            | Database["public"]["Enums"]["probability_grade_enum"]
            | null
          region_id: number
        }
        Update: {
          calculated_probability?: number | null
          created_at?: string | null
          id?: string
          log_id?: string
          probability_grade?:
            | Database["public"]["Enums"]["probability_grade_enum"]
            | null
          region_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "seizure_log_brain_regions_log_id_fkey"
            columns: ["log_id"]
            isOneToOne: false
            referencedRelation: "seizure_logs_research"
            referencedColumns: ["log_id"]
          },
        ]
      }
      seizure_log_post_ictal_symptoms: {
        Row: {
          created_at: string | null
          id: string
          log_id: string
          severity: number | null
          symptom: Database["public"]["Enums"]["post_ictal_symptom_enum"]
        }
        Insert: {
          created_at?: string | null
          id?: string
          log_id: string
          severity?: number | null
          symptom: Database["public"]["Enums"]["post_ictal_symptom_enum"]
        }
        Update: {
          created_at?: string | null
          id?: string
          log_id?: string
          severity?: number | null
          symptom?: Database["public"]["Enums"]["post_ictal_symptom_enum"]
        }
        Relationships: [
          {
            foreignKeyName: "seizure_log_post_ictal_symptoms_log_id_fkey"
            columns: ["log_id"]
            isOneToOne: false
            referencedRelation: "seizure_logs_research"
            referencedColumns: ["log_id"]
          },
        ]
      }
      seizure_log_signs: {
        Row: {
          created_at: string | null
          id: string
          log_id: string
          observer_rank: Database["public"]["Enums"]["witness_role_enum"] | null
          present: Database["public"]["Enums"]["yes_no_enum"] | null
          sign_id: number
        }
        Insert: {
          created_at?: string | null
          id?: string
          log_id: string
          observer_rank?:
            | Database["public"]["Enums"]["witness_role_enum"]
            | null
          present?: Database["public"]["Enums"]["yes_no_enum"] | null
          sign_id: number
        }
        Update: {
          created_at?: string | null
          id?: string
          log_id?: string
          observer_rank?:
            | Database["public"]["Enums"]["witness_role_enum"]
            | null
          present?: Database["public"]["Enums"]["yes_no_enum"] | null
          sign_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "seizure_log_signs_log_id_fkey"
            columns: ["log_id"]
            isOneToOne: false
            referencedRelation: "seizure_logs_research"
            referencedColumns: ["log_id"]
          },
        ]
      }
      seizure_log_triggers: {
        Row: {
          created_at: string | null
          id: string
          log_id: string
          trigger_id: number
          trigger_strength:
            | Database["public"]["Enums"]["trigger_strength_enum"]
            | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          log_id: string
          trigger_id: number
          trigger_strength?:
            | Database["public"]["Enums"]["trigger_strength_enum"]
            | null
        }
        Update: {
          created_at?: string | null
          id?: string
          log_id?: string
          trigger_id?: number
          trigger_strength?:
            | Database["public"]["Enums"]["trigger_strength_enum"]
            | null
        }
        Relationships: [
          {
            foreignKeyName: "seizure_log_triggers_log_id_fkey"
            columns: ["log_id"]
            isOneToOne: false
            referencedRelation: "seizure_logs_research"
            referencedColumns: ["log_id"]
          },
        ]
      }
      seizure_logs_research: {
        Row: {
          aura_description: string | null
          aura_present: Database["public"]["Enums"]["yes_no_enum"] | null
          consciousness_level:
            | Database["public"]["Enums"]["consciousness_level_enum"]
            | null
          created_at: string | null
          duration_seconds: number | null
          emergency_services_called:
            | Database["public"]["Enums"]["yes_no_enum"]
            | null
          hospitalized: Database["public"]["Enums"]["yes_no_enum"] | null
          location_type:
            | Database["public"]["Enums"]["location_type_enum"]
            | null
          log_date: string
          log_id: string
          log_time: string
          medication_adherence_prior:
            | Database["public"]["Enums"]["medication_adherence_enum"]
            | null
          notes: string | null
          post_ictal_confusion_minutes: number | null
          recovery_time_minutes: number | null
          rescue_medication_type:
            | Database["public"]["Enums"]["rescue_medication_enum"]
            | null
          rescue_medication_used:
            | Database["public"]["Enums"]["yes_no_enum"]
            | null
          research_grade: Database["public"]["Enums"]["yes_no_enum"] | null
          seizure_type: Database["public"]["Enums"]["seizure_type_enum"]
          sleep_hours_prior: number | null
          stress_level: Database["public"]["Enums"]["stress_level_enum"] | null
          updated_at: string | null
          user_id: string
          video_recorded: Database["public"]["Enums"]["yes_no_enum"] | null
          witness_role: Database["public"]["Enums"]["witness_role_enum"] | null
          witnessed: Database["public"]["Enums"]["yes_no_enum"] | null
        }
        Insert: {
          aura_description?: string | null
          aura_present?: Database["public"]["Enums"]["yes_no_enum"] | null
          consciousness_level?:
            | Database["public"]["Enums"]["consciousness_level_enum"]
            | null
          created_at?: string | null
          duration_seconds?: number | null
          emergency_services_called?:
            | Database["public"]["Enums"]["yes_no_enum"]
            | null
          hospitalized?: Database["public"]["Enums"]["yes_no_enum"] | null
          location_type?:
            | Database["public"]["Enums"]["location_type_enum"]
            | null
          log_date: string
          log_id?: string
          log_time: string
          medication_adherence_prior?:
            | Database["public"]["Enums"]["medication_adherence_enum"]
            | null
          notes?: string | null
          post_ictal_confusion_minutes?: number | null
          recovery_time_minutes?: number | null
          rescue_medication_type?:
            | Database["public"]["Enums"]["rescue_medication_enum"]
            | null
          rescue_medication_used?:
            | Database["public"]["Enums"]["yes_no_enum"]
            | null
          research_grade?: Database["public"]["Enums"]["yes_no_enum"] | null
          seizure_type: Database["public"]["Enums"]["seizure_type_enum"]
          sleep_hours_prior?: number | null
          stress_level?: Database["public"]["Enums"]["stress_level_enum"] | null
          updated_at?: string | null
          user_id: string
          video_recorded?: Database["public"]["Enums"]["yes_no_enum"] | null
          witness_role?: Database["public"]["Enums"]["witness_role_enum"] | null
          witnessed?: Database["public"]["Enums"]["yes_no_enum"] | null
        }
        Update: {
          aura_description?: string | null
          aura_present?: Database["public"]["Enums"]["yes_no_enum"] | null
          consciousness_level?:
            | Database["public"]["Enums"]["consciousness_level_enum"]
            | null
          created_at?: string | null
          duration_seconds?: number | null
          emergency_services_called?:
            | Database["public"]["Enums"]["yes_no_enum"]
            | null
          hospitalized?: Database["public"]["Enums"]["yes_no_enum"] | null
          location_type?:
            | Database["public"]["Enums"]["location_type_enum"]
            | null
          log_date?: string
          log_id?: string
          log_time?: string
          medication_adherence_prior?:
            | Database["public"]["Enums"]["medication_adherence_enum"]
            | null
          notes?: string | null
          post_ictal_confusion_minutes?: number | null
          recovery_time_minutes?: number | null
          rescue_medication_type?:
            | Database["public"]["Enums"]["rescue_medication_enum"]
            | null
          rescue_medication_used?:
            | Database["public"]["Enums"]["yes_no_enum"]
            | null
          research_grade?: Database["public"]["Enums"]["yes_no_enum"] | null
          seizure_type?: Database["public"]["Enums"]["seizure_type_enum"]
          sleep_hours_prior?: number | null
          stress_level?: Database["public"]["Enums"]["stress_level_enum"] | null
          updated_at?: string | null
          user_id?: string
          video_recorded?: Database["public"]["Enums"]["yes_no_enum"] | null
          witness_role?: Database["public"]["Enums"]["witness_role_enum"] | null
          witnessed?: Database["public"]["Enums"]["yes_no_enum"] | null
        }
        Relationships: []
      }
      tracking_entries: {
        Row: {
          created_at: string | null
          entry_date: string | null
          id: string
          metadata: Json | null
          notes: string | null
          severity: number | null
          tracking_type: Database["public"]["Enums"]["tracking_feature_enum"]
          updated_at: string | null
          user_id: string
          value: number | null
        }
        Insert: {
          created_at?: string | null
          entry_date?: string | null
          id?: string
          metadata?: Json | null
          notes?: string | null
          severity?: number | null
          tracking_type: Database["public"]["Enums"]["tracking_feature_enum"]
          updated_at?: string | null
          user_id: string
          value?: number | null
        }
        Update: {
          created_at?: string | null
          entry_date?: string | null
          id?: string
          metadata?: Json | null
          notes?: string | null
          severity?: number | null
          tracking_type?: Database["public"]["Enums"]["tracking_feature_enum"]
          updated_at?: string | null
          user_id?: string
          value?: number | null
        }
        Relationships: []
      }
      tremor_episodes: {
        Row: {
          activities_affected: Json | null
          body_regions: Json | null
          created_at: string | null
          dominant_side: string | null
          duration_seconds: number | null
          frequency_hz: number | null
          hours_since_medication: number | null
          interfered_with_activities: boolean | null
          media_urls: Json | null
          medication_status: string | null
          notes: string | null
          occurred_at: string
          occurred_during: string | null
          patient_id: string
          possible_triggers: Json | null
          severity: number | null
          shared_with_clinician: boolean | null
          tremor_id: string
          tremor_type: string | null
          trigger_details: string | null
          updated_at: string | null
          video_recorded: boolean | null
          visible_to_researchers: boolean | null
        }
        Insert: {
          activities_affected?: Json | null
          body_regions?: Json | null
          created_at?: string | null
          dominant_side?: string | null
          duration_seconds?: number | null
          frequency_hz?: number | null
          hours_since_medication?: number | null
          interfered_with_activities?: boolean | null
          media_urls?: Json | null
          medication_status?: string | null
          notes?: string | null
          occurred_at: string
          occurred_during?: string | null
          patient_id: string
          possible_triggers?: Json | null
          severity?: number | null
          shared_with_clinician?: boolean | null
          tremor_id?: string
          tremor_type?: string | null
          trigger_details?: string | null
          updated_at?: string | null
          video_recorded?: boolean | null
          visible_to_researchers?: boolean | null
        }
        Update: {
          activities_affected?: Json | null
          body_regions?: Json | null
          created_at?: string | null
          dominant_side?: string | null
          duration_seconds?: number | null
          frequency_hz?: number | null
          hours_since_medication?: number | null
          interfered_with_activities?: boolean | null
          media_urls?: Json | null
          medication_status?: string | null
          notes?: string | null
          occurred_at?: string
          occurred_during?: string | null
          patient_id?: string
          possible_triggers?: Json | null
          severity?: number | null
          shared_with_clinician?: boolean | null
          tremor_id?: string
          tremor_type?: string | null
          trigger_details?: string | null
          updated_at?: string | null
          video_recorded?: boolean | null
          visible_to_researchers?: boolean | null
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
        Relationships: []
      }
      user_medications: {
        Row: {
          created_at: string | null
          dosage_amount: number | null
          dosage_unit: string | null
          end_date: string | null
          frequency: string | null
          id: string
          is_active: boolean | null
          medication_id: string | null
          medication_name: string | null
          start_date: string | null
          times: string[] | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          dosage_amount?: number | null
          dosage_unit?: string | null
          end_date?: string | null
          frequency?: string | null
          id?: string
          is_active?: boolean | null
          medication_id?: string | null
          medication_name?: string | null
          start_date?: string | null
          times?: string[] | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          dosage_amount?: number | null
          dosage_unit?: string | null
          end_date?: string | null
          frequency?: string | null
          id?: string
          is_active?: boolean | null
          medication_id?: string | null
          medication_name?: string | null
          start_date?: string | null
          times?: string[] | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_research_consent: {
        Args: { p_data_type: string; p_patient_id: string }
        Returns: boolean
      }
      get_user_medications: {
        Args: { p_user_id: string }
        Returns: {
          id: string
          user_id: string
          medication_id: string | null
          medication_name: string | null
          dosage_amount: number | null
          dosage_unit: string | null
          frequency: string | null
          times: string[] | null
          start_date: string | null
          end_date: string | null
          is_active: boolean | null
          created_at: string | null
        }[]
      }
      save_user_medication: {
        Args: {
          p_user_id: string
          p_medication_id?: string | null
          p_medication_name?: string | null
          p_dosage_amount?: number | null
          p_dosage_unit?: string | null
          p_frequency?: string | null
          p_times?: string[] | null
          p_is_active?: boolean
        }
        Returns: string
      }
      get_user_conditions: {
        Args: { p_user_id: string }
        Returns: {
          id: string
          user_id: string
          condition_id: string
          diagnosis_date: string | null
          severity: number | null
          tracking_features_enabled: string[] | null
          created_at: string | null
        }[]
      }
      get_tracking_entries: {
        Args: { p_user_id: string }
        Returns: {
          id: string
          user_id: string
          entry_date: string
          mood_level: string | null
          energy_level: string | null
          sleep_quality: string | null
          sleep_hours: number | null
          symptoms: string[] | null
          notes: string | null
          created_at: string | null
        }[]
      }
      save_tracking_entry: {
        Args: {
          p_user_id: string
          p_entry_date: string
          p_mood_level?: string | null
          p_energy_level?: string | null
          p_sleep_quality?: string | null
          p_sleep_hours?: number | null
          p_symptoms?: string[] | null
          p_notes?: string | null
        }
        Returns: string
      }
      get_seizure_logs: {
        Args: { p_user_id: string }
        Returns: {
          log_id: string
          user_id: string
          occurred_at: string
          duration_seconds: number | null
          seizure_type: string | null
          consciousness_level: string | null
          warning_signs: string[] | null
          post_ictal_symptoms: string[] | null
          possible_triggers: string[] | null
          location_during: string | null
          rescue_medication_given: boolean | null
          emergency_services_called: boolean | null
          notes: string | null
          created_at: string | null
        }[]
      }
      save_seizure_log: {
        Args: {
          p_user_id: string
          p_occurred_at: string
          p_duration_seconds?: number | null
          p_seizure_type?: string | null
          p_consciousness_level?: string | null
          p_warning_signs?: string[] | null
          p_post_ictal_symptoms?: string[] | null
          p_possible_triggers?: string[] | null
          p_location_during?: string | null
          p_rescue_medication_given?: boolean
          p_emergency_services_called?: boolean
          p_notes?: string | null
        }
        Returns: string
      }
      get_symptom_logs: {
        Args: { p_patient_id: string }
        Returns: {
          id: string
          patient_id: string
          log_date: string
          log_time: string | null
          symptom_type: string | null
          severity: number | null
          duration_minutes: number | null
          location: string | null
          notes: string | null
          created_at: string | null
        }[]
      }
      get_tremor_episodes: {
        Args: { p_patient_id: string }
        Returns: {
          id: string
          patient_id: string
          episode_date: string
          episode_time: string | null
          tremor_type: string | null
          body_part: string | null
          severity: number | null
          duration_minutes: number | null
          activity_during: string | null
          medication_taken: boolean | null
          notes: string | null
          created_at: string | null
        }[]
      }
      get_gait_episodes: {
        Args: { p_patient_id: string }
        Returns: {
          id: string
          patient_id: string
          episode_date: string
          episode_time: string | null
          gait_type: string | null
          freezing_episodes: boolean | null
          falls: boolean | null
          duration_minutes: number | null
          distance_meters: number | null
          assistance_needed: boolean | null
          notes: string | null
          created_at: string | null
        }[]
      }
      get_menstrual_logs: {
        Args: { p_user_id: string }
        Returns: {
          id: string
          user_id: string
          log_date: string
          is_period_day: boolean | null
          flow_intensity: string | null
          symptoms: string[] | null
          basal_temp: number | null
          notes: string | null
          created_at: string | null
        }[]
      }
      get_temperature_logs: {
        Args: { p_user_id: string }
        Returns: {
          id: string
          user_id: string
          log_date: string
          log_time: string | null
          temperature: number | null
          unit: string | null
          notes: string | null
          created_at: string | null
        }[]
      }
      get_medication_logs: {
        Args: { p_user_id: string }
        Returns: {
          id: string
          user_id: string
          user_medication_id: string | null
          log_date: string
          log_time: string | null
          taken: boolean | null
          missed_reason: string | null
          side_effects: string[] | null
          notes: string | null
          created_at: string | null
        }[]
      }
      get_patient_onboarding: {
        Args: { p_user_id: string }
        Returns: {
          user_id: string
          first_name: string | null
          last_name: string | null
          middle_name: string | null
          date_of_birth: string | null
          gender: string | null
          phone_number: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          emergency_contact_relationship: string | null
          created_at: string | null
          completed_at: string | null
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
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
      save_patient_onboarding: {
        Args: { p_data: Json; p_user_id: string }
        Returns: Json
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
  clinical: {
    Enums: {},
  },
  private_health_info: {
    Enums: {},
  },
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

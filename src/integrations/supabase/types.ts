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
          insight_id: string
          clinician_id: string
          title: string
          content: string
          insight_type: string
          impact_metric: Json | null
          ai_model_version: string | null
          confidence_score: number | null
          is_read: boolean | null
          is_dismissed: boolean | null
          is_pinned: boolean | null
          has_action: boolean | null
          action_url: string | null
          action_taken: boolean | null
          generated_at: string
          read_at: string | null
          dismissed_at: string | null
        }
        Insert: {
          insight_id?: string | null
          clinician_id: string
          title: string
          content: string
          insight_type: string
          impact_metric?: Json | null
          ai_model_version?: string | null
          confidence_score?: number | null
          is_read?: boolean | null
          is_dismissed?: boolean | null
          is_pinned?: boolean | null
          has_action?: boolean | null
          action_url?: string | null
          action_taken?: boolean | null
          generated_at?: string | null
          read_at?: string | null
          dismissed_at?: string | null
        }
        Update: {
          insight_id?: string
          clinician_id?: string
          title?: string
          content?: string
          insight_type?: string
          impact_metric?: Json | null
          ai_model_version?: string | null
          confidence_score?: number | null
          is_read?: boolean | null
          is_dismissed?: boolean | null
          is_pinned?: boolean | null
          has_action?: boolean | null
          action_url?: string | null
          action_taken?: boolean | null
          generated_at?: string
          read_at?: string | null
          dismissed_at?: string | null
        }
        Relationships: []
      },
      case_data_panels: {
        Row: {
          panel_id: string
          patient_id: string
          panel_type: string
          custom_panel_name: string | null
          title: string
          content: Json
          display_order: number | null
          is_visible: boolean | null
          is_collapsed: boolean | null
          priority_score: number | null
          added_at: string
          added_by: string | null
          updated_at: string | null
        }
        Insert: {
          panel_id?: string | null
          patient_id: string
          panel_type: string
          custom_panel_name?: string | null
          title: string
          content: Json
          display_order?: number | null
          is_visible?: boolean | null
          is_collapsed?: boolean | null
          priority_score?: number | null
          added_at?: string | null
          added_by?: string | null
          updated_at?: string | null
        }
        Update: {
          panel_id?: string
          patient_id?: string
          panel_type?: string
          custom_panel_name?: string | null
          title?: string
          content?: Json
          display_order?: number | null
          is_visible?: boolean | null
          is_collapsed?: boolean | null
          priority_score?: number | null
          added_at?: string
          added_by?: string | null
          updated_at?: string | null
        }
        Relationships: []
      },
      clinical_notes_exports: {
        Row: {
          note_id: string
          patient_id: string
          note_type: string
          content: string
          format: string
          file_path: string | null
          status: string | null
          author_id: string
          signed_by: string | null
          signed_at: string | null
          digital_signature: string | null
          shared_with: string | null
          shared_at: string | null
          visit_date: string | null
          generated_at: string
          updated_at: string | null
        }
        Insert: {
          note_id?: string | null
          patient_id: string
          note_type: string
          content: string
          format: string
          file_path?: string | null
          status?: string | null
          author_id: string
          signed_by?: string | null
          signed_at?: string | null
          digital_signature?: string | null
          shared_with?: string | null
          shared_at?: string | null
          visit_date?: string | null
          generated_at?: string | null
          updated_at?: string | null
        }
        Update: {
          note_id?: string
          patient_id?: string
          note_type?: string
          content?: string
          format?: string
          file_path?: string | null
          status?: string | null
          author_id?: string
          signed_by?: string | null
          signed_at?: string | null
          digital_signature?: string | null
          shared_with?: string | null
          shared_at?: string | null
          visit_date?: string | null
          generated_at?: string
          updated_at?: string | null
        }
        Relationships: []
      },
      clinical_scale_results: {
        Row: {
          scale_id: string
          patient_id: string
          scale_type: string
          scale_version: string | null
          total_score: number | null
          subscale_scores: Json | null
          assessed_at: string
          due_at: string | null
          change_from_baseline: number | null
          change_alert: boolean | null
          is_significant_change: boolean | null
          trend: Json | null
          assessed_by: string | null
          assessment_notes: string | null
          patient_condition: string | null
          entered_by: string
          entered_at: string | null
          updated_at: string | null
        }
        Insert: {
          scale_id?: string | null
          patient_id: string
          scale_type: string
          scale_version?: string | null
          total_score?: number | null
          subscale_scores?: Json | null
          assessed_at: string
          due_at?: string | null
          change_from_baseline?: number | null
          change_alert?: boolean | null
          is_significant_change?: boolean | null
          trend?: Json | null
          assessed_by?: string | null
          assessment_notes?: string | null
          patient_condition?: string | null
          entered_by: string
          entered_at?: string | null
          updated_at?: string | null
        }
        Update: {
          scale_id?: string
          patient_id?: string
          scale_type?: string
          scale_version?: string | null
          total_score?: number | null
          subscale_scores?: Json | null
          assessed_at?: string
          due_at?: string | null
          change_from_baseline?: number | null
          change_alert?: boolean | null
          is_significant_change?: boolean | null
          trend?: Json | null
          assessed_by?: string | null
          assessment_notes?: string | null
          patient_condition?: string | null
          entered_by?: string
          entered_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      },
      clinician_today_view: {
        Row: {
          view_id: string
          clinician_id: string
          date: string
          appointments: Json | null
          alerts: Json | null
          high_priority_patients: Json | null
          pending_tasks: Json | null
          layout_config: Json | null
          widget_order: number | null
          last_refreshed: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          view_id?: string | null
          clinician_id: string
          date?: string | null
          appointments?: Json | null
          alerts?: Json | null
          high_priority_patients?: Json | null
          pending_tasks?: Json | null
          layout_config?: Json | null
          widget_order?: number | null
          last_refreshed?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          view_id?: string
          clinician_id?: string
          date?: string
          appointments?: Json | null
          alerts?: Json | null
          high_priority_patients?: Json | null
          pending_tasks?: Json | null
          layout_config?: Json | null
          widget_order?: number | null
          last_refreshed?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      },
      neuro_imaging_results: {
        Row: {
          image_id: string
          patient_id: string
          study_type: string
          study_protocol: string | null
          modality_details: string | null
          image_path: string | null
          dicom_uid: string | null
          file_size_mb: number | null
          findings_summary: string | null
          impression: string | null
          annotations: Json | null
          critical_findings: boolean | null
          study_date: string
          radiologist: string | null
          ordering_physician: string | null
          ai_processed: boolean | null
          ai_findings: Json | null
          uploaded_at: string | null
          uploaded_by: string | null
          updated_at: string | null
        }
        Insert: {
          image_id?: string | null
          patient_id: string
          study_type: string
          study_protocol?: string | null
          modality_details?: string | null
          image_path?: string | null
          dicom_uid?: string | null
          file_size_mb?: number | null
          findings_summary?: string | null
          impression?: string | null
          annotations?: Json | null
          critical_findings?: boolean | null
          study_date: string
          radiologist?: string | null
          ordering_physician?: string | null
          ai_processed?: boolean | null
          ai_findings?: Json | null
          uploaded_at?: string | null
          uploaded_by?: string | null
          updated_at?: string | null
        }
        Update: {
          image_id?: string
          patient_id?: string
          study_type?: string
          study_protocol?: string | null
          modality_details?: string | null
          image_path?: string | null
          dicom_uid?: string | null
          file_size_mb?: number | null
          findings_summary?: string | null
          impression?: string | null
          annotations?: Json | null
          critical_findings?: boolean | null
          study_date?: string
          radiologist?: string | null
          ordering_physician?: string | null
          ai_processed?: boolean | null
          ai_findings?: Json | null
          uploaded_at?: string | null
          uploaded_by?: string | null
          updated_at?: string | null
        }
        Relationships: []
      },
      patient_collab_chat: {
        Row: {
          message_id: string
          patient_id: string
          sender_id: string
          message: string
          thread_id: string | null
          parent_message_id: string | null
          attachments: Json | null
          is_urgent: boolean | null
          requires_response: boolean | null
          is_read: boolean | null
          read_by: string | null
          read_at: string | null
          mentioned_users: string | null
          sent_at: string
          edited_at: string | null
          deleted_at: string | null
        }
        Insert: {
          message_id?: string | null
          patient_id: string
          sender_id: string
          message: string
          thread_id?: string | null
          parent_message_id?: string | null
          attachments?: Json | null
          is_urgent?: boolean | null
          requires_response?: boolean | null
          is_read?: boolean | null
          read_by?: string | null
          read_at?: string | null
          mentioned_users?: string | null
          sent_at?: string | null
          edited_at?: string | null
          deleted_at?: string | null
        }
        Update: {
          message_id?: string
          patient_id?: string
          sender_id?: string
          message?: string
          thread_id?: string | null
          parent_message_id?: string | null
          attachments?: Json | null
          is_urgent?: boolean | null
          requires_response?: boolean | null
          is_read?: boolean | null
          read_by?: string | null
          read_at?: string | null
          mentioned_users?: string | null
          sent_at?: string
          edited_at?: string | null
          deleted_at?: string | null
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
      },
      patient_pro_timeline: {
        Row: {
          pro_id: string
          patient_id: string
          pro_type: string
          custom_type_name: string | null
          value: number | null
          value_unit: string | null
          value_json: Json | null
          reported_at: string
          collection_method: string | null
          linked_intervention: string | null
          intervention_notes: string | null
          is_validated: boolean | null
          validated_by: string | null
          validation_notes: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          pro_id?: string | null
          patient_id: string
          pro_type: string
          custom_type_name?: string | null
          value?: number | null
          value_unit?: string | null
          value_json?: Json | null
          reported_at?: string | null
          collection_method?: string | null
          linked_intervention?: string | null
          intervention_notes?: string | null
          is_validated?: boolean | null
          validated_by?: string | null
          validation_notes?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          pro_id?: string
          patient_id?: string
          pro_type?: string
          custom_type_name?: string | null
          value?: number | null
          value_unit?: string | null
          value_json?: Json | null
          reported_at?: string
          collection_method?: string | null
          linked_intervention?: string | null
          intervention_notes?: string | null
          is_validated?: boolean | null
          validated_by?: string | null
          validation_notes?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      },
      patient_risk_alerts: {
        Row: {
          alert_id: string
          patient_id: string
          risk_type: string
          alert_level: string
          score: number | null
          reason: string
          context_data: Json | null
          status: string | null
          acknowledged_by: string | null
          acknowledged_at: string | null
          resolved_by: string | null
          resolved_at: string | null
          resolution_notes: string | null
          created_at: string
          updated_at: string | null
        }
        Insert: {
          alert_id?: string | null
          patient_id: string
          risk_type: string
          alert_level?: string | null
          score?: number | null
          reason: string
          context_data?: Json | null
          status?: string | null
          acknowledged_by?: string | null
          acknowledged_at?: string | null
          resolved_by?: string | null
          resolved_at?: string | null
          resolution_notes?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          alert_id?: string
          patient_id?: string
          risk_type?: string
          alert_level?: string
          score?: number | null
          reason?: string
          context_data?: Json | null
          status?: string | null
          acknowledged_by?: string | null
          acknowledged_at?: string | null
          resolved_by?: string | null
          resolved_at?: string | null
          resolution_notes?: string | null
          created_at?: string
          updated_at?: string | null
        }
        Relationships: []
      },
      patient_snapshots: {
        Row: {
          snapshot_id: string
          patient_id: string
          summary: string
          highlight_events: Json | null
          key_metrics: Json | null
          author: string
          author_id: string | null
          ai_model_version: string | null
          period_start: string | null
          period_end: string | null
          is_pinned: boolean | null
          is_archived: boolean | null
          generated_at: string
          reviewed_by: string | null
          reviewed_at: string | null
        }
        Insert: {
          snapshot_id?: string | null
          patient_id: string
          summary: string
          highlight_events?: Json | null
          key_metrics?: Json | null
          author: string
          author_id?: string | null
          ai_model_version?: string | null
          period_start?: string | null
          period_end?: string | null
          is_pinned?: boolean | null
          is_archived?: boolean | null
          generated_at?: string | null
          reviewed_by?: string | null
          reviewed_at?: string | null
        }
        Update: {
          snapshot_id?: string
          patient_id?: string
          summary?: string
          highlight_events?: Json | null
          key_metrics?: Json | null
          author?: string
          author_id?: string | null
          ai_model_version?: string | null
          period_start?: string | null
          period_end?: string | null
          is_pinned?: boolean | null
          is_archived?: boolean | null
          generated_at?: string
          reviewed_by?: string | null
          reviewed_at?: string | null
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
  linkage: {
    Tables: {
      research_id_map: {
        Row: {
          id: string
          user_id: string
          research_id: string
          created_at: string
          created_by: string | null
          last_accessed: string | null
          access_count: number | null
          irb_protocol_number: string | null
          consent_version: string | null
          is_locked: boolean | null
          notes: string | null
        }
        Insert: {
          id?: string | null
          user_id: string
          research_id?: string | null
          created_at?: string | null
          created_by?: string | null
          last_accessed?: string | null
          access_count?: number | null
          irb_protocol_number?: string | null
          consent_version?: string | null
          is_locked?: boolean | null
          notes?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          research_id?: string
          created_at?: string
          created_by?: string | null
          last_accessed?: string | null
          access_count?: number | null
          irb_protocol_number?: string | null
          consent_version?: string | null
          is_locked?: boolean | null
          notes?: string | null
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
      clinical_media: {
        Row: {
          media_id: string
          patient_id: string
          parent_type: string
          parent_id: string
          file_url: string
          file_type: string
          file_size_mb: number | null
          mime_type: string | null
          thumbnail_url: string | null
          duration_seconds: number | null
          description: string | null
          tags: Json | null
          storage_bucket: string | null
          storage_path: string | null
          shared_with_clinician: boolean | null
          visible_to_researchers: boolean | null
          uploaded_at: string | null
          uploaded_by: string | null
        }
        Insert: {
          media_id?: string | null
          patient_id: string
          parent_type: string
          parent_id: string
          file_url: string
          file_type: string
          file_size_mb?: number | null
          mime_type?: string | null
          thumbnail_url?: string | null
          duration_seconds?: number | null
          description?: string | null
          tags?: Json | null
          storage_bucket?: string | null
          storage_path?: string | null
          shared_with_clinician?: boolean | null
          visible_to_researchers?: boolean | null
          uploaded_at?: string | null
          uploaded_by?: string | null
        }
        Update: {
          media_id?: string
          patient_id?: string
          parent_type?: string
          parent_id?: string
          file_url?: string
          file_type?: string
          file_size_mb?: number | null
          mime_type?: string | null
          thumbnail_url?: string | null
          duration_seconds?: number | null
          description?: string | null
          tags?: Json | null
          storage_bucket?: string | null
          storage_path?: string | null
          shared_with_clinician?: boolean | null
          visible_to_researchers?: boolean | null
          uploaded_at?: string | null
          uploaded_by?: string | null
        }
        Relationships: []
      },
      clinician_onboarding_data: {
        Row: {
          id: string
          user_id: string
          first_name: string | null
          middle_name: string | null
          last_name: string | null
          clinician_title: string | null
          specialty: string | null
          institution: string | null
          license_number: string | null
          patient_invite_emails: string | null
          completed_at: string | null
          created_at: string | null
          updated_at: string | null
          onboarding_step: number | null
          last_updated_at: string | null
        }
        Insert: {
          id?: string | null
          user_id: string
          first_name?: string | null
          middle_name?: string | null
          last_name?: string | null
          clinician_title?: string | null
          specialty?: string | null
          institution?: string | null
          license_number?: string | null
          patient_invite_emails?: string | null
          completed_at?: string | null
          created_at?: string | null
          updated_at?: string | null
          onboarding_step?: number | null
          last_updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          first_name?: string | null
          middle_name?: string | null
          last_name?: string | null
          clinician_title?: string | null
          specialty?: string | null
          institution?: string | null
          license_number?: string | null
          patient_invite_emails?: string | null
          completed_at?: string | null
          created_at?: string | null
          updated_at?: string | null
          onboarding_step?: number | null
          last_updated_at?: string | null
        }
        Relationships: []
      },
      clinician_phi: {
        Row: {
          id: string
          user_id: string
          npi_number: string | null
          dea_number: string | null
          license_number: string | null
          license_state: string | null
          license_expiry: string | null
          office_phone: string | null
          office_fax: string | null
          practice_address: Json | null
          medical_degree: string | null
          board_certifications: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string | null
          user_id: string
          npi_number?: string | null
          dea_number?: string | null
          license_number?: string | null
          license_state?: string | null
          license_expiry?: string | null
          office_phone?: string | null
          office_fax?: string | null
          practice_address?: Json | null
          medical_degree?: string | null
          board_certifications?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          npi_number?: string | null
          dea_number?: string | null
          license_number?: string | null
          license_state?: string | null
          license_expiry?: string | null
          office_phone?: string | null
          office_fax?: string | null
          practice_address?: Json | null
          medical_degree?: string | null
          board_certifications?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      },
      daily_symptom_logs: {
        Row: {
          log_id: string
          patient_id: string
          log_date: string
          overall_feeling: number | null
          mood: number | null
          energy_level: number | null
          fatigue_level: number | null
          pain_level: number | null
          sleep_quality: number | null
          sleep_hours: number | null
          sleep_disturbances: Json | null
          motor_fluctuations_occurred: boolean | null
          on_time_hours: number | null
          off_time_hours: number | null
          dyskinesia_severity: number | null
          stiffness_severity: number | null
          slowness_severity: number | null
          cognitive_issues: Json | null
          mood_issues: Json | null
          autonomic_symptoms: Json | null
          adl_independence_level: number | null
          activities_difficult: Json | null
          all_medications_taken: boolean | null
          missed_doses: string | null
          medication_side_effects: Json | null
          other_symptoms: Json | null
          symptom_notes: string | null
          stress_level: number | null
          exercise_minutes: number | null
          notable_events: string | null
          shared_with_clinician: boolean | null
          visible_to_researchers: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          log_id?: string | null
          patient_id: string
          log_date: string
          overall_feeling?: number | null
          mood?: number | null
          energy_level?: number | null
          fatigue_level?: number | null
          pain_level?: number | null
          sleep_quality?: number | null
          sleep_hours?: number | null
          sleep_disturbances?: Json | null
          motor_fluctuations_occurred?: boolean | null
          on_time_hours?: number | null
          off_time_hours?: number | null
          dyskinesia_severity?: number | null
          stiffness_severity?: number | null
          slowness_severity?: number | null
          cognitive_issues?: Json | null
          mood_issues?: Json | null
          autonomic_symptoms?: Json | null
          adl_independence_level?: number | null
          activities_difficult?: Json | null
          all_medications_taken?: boolean | null
          missed_doses?: string | null
          medication_side_effects?: Json | null
          other_symptoms?: Json | null
          symptom_notes?: string | null
          stress_level?: number | null
          exercise_minutes?: number | null
          notable_events?: string | null
          shared_with_clinician?: boolean | null
          visible_to_researchers?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          log_id?: string
          patient_id?: string
          log_date?: string
          overall_feeling?: number | null
          mood?: number | null
          energy_level?: number | null
          fatigue_level?: number | null
          pain_level?: number | null
          sleep_quality?: number | null
          sleep_hours?: number | null
          sleep_disturbances?: Json | null
          motor_fluctuations_occurred?: boolean | null
          on_time_hours?: number | null
          off_time_hours?: number | null
          dyskinesia_severity?: number | null
          stiffness_severity?: number | null
          slowness_severity?: number | null
          cognitive_issues?: Json | null
          mood_issues?: Json | null
          autonomic_symptoms?: Json | null
          adl_independence_level?: number | null
          activities_difficult?: Json | null
          all_medications_taken?: boolean | null
          missed_doses?: string | null
          medication_side_effects?: Json | null
          other_symptoms?: Json | null
          symptom_notes?: string | null
          stress_level?: number | null
          exercise_minutes?: number | null
          notable_events?: string | null
          shared_with_clinician?: boolean | null
          visible_to_researchers?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      },
      gait_episodes: {
        Row: {
          gait_id: string
          patient_id: string
          occurred_at: string
          duration_seconds: number | null
          event_type: string
          severity: number | null
          resulted_in_fall: boolean | null
          fall_direction: string | null
          injury_occurred: boolean | null
          injury_description: string | null
          required_assistance: boolean | null
          location: string | null
          activity: string | null
          environmental_factors: Json | null
          medication_status: string | null
          hours_since_medication: number | null
          freezing_trigger: string | null
          broke_freeze_with: string | null
          video_recorded: boolean | null
          media_urls: Json | null
          notes: string | null
          shared_with_clinician: boolean | null
          visible_to_researchers: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          gait_id?: string | null
          patient_id: string
          occurred_at: string
          duration_seconds?: number | null
          event_type: string
          severity?: number | null
          resulted_in_fall?: boolean | null
          fall_direction?: string | null
          injury_occurred?: boolean | null
          injury_description?: string | null
          required_assistance?: boolean | null
          location?: string | null
          activity?: string | null
          environmental_factors?: Json | null
          medication_status?: string | null
          hours_since_medication?: number | null
          freezing_trigger?: string | null
          broke_freeze_with?: string | null
          video_recorded?: boolean | null
          media_urls?: Json | null
          notes?: string | null
          shared_with_clinician?: boolean | null
          visible_to_researchers?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          gait_id?: string
          patient_id?: string
          occurred_at?: string
          duration_seconds?: number | null
          event_type?: string
          severity?: number | null
          resulted_in_fall?: boolean | null
          fall_direction?: string | null
          injury_occurred?: boolean | null
          injury_description?: string | null
          required_assistance?: boolean | null
          location?: string | null
          activity?: string | null
          environmental_factors?: Json | null
          medication_status?: string | null
          hours_since_medication?: number | null
          freezing_trigger?: string | null
          broke_freeze_with?: string | null
          video_recorded?: boolean | null
          media_urls?: Json | null
          notes?: string | null
          shared_with_clinician?: boolean | null
          visible_to_researchers?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      },
      menstrual_cycle_logs: {
        Row: {
          id: string
          user_id: string
          cycle_start_date: string
          cycle_end_date: string | null
          cycle_length_days: number | null
          flow_intensity: unknown | null
          cycle_phase: unknown | null
          overall_symptom_severity: number | null
          seizure_count_during_cycle: number | null
          seizure_clustered_around_menstruation: boolean | null
          catamenial_pattern_suspected: boolean | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string | null
          user_id: string
          cycle_start_date: string
          cycle_end_date?: string | null
          cycle_length_days?: number | null
          flow_intensity?: unknown | null
          cycle_phase?: unknown | null
          overall_symptom_severity?: number | null
          seizure_count_during_cycle?: number | null
          seizure_clustered_around_menstruation?: boolean | null
          catamenial_pattern_suspected?: boolean | null
          notes?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          cycle_start_date?: string
          cycle_end_date?: string | null
          cycle_length_days?: number | null
          flow_intensity?: unknown | null
          cycle_phase?: unknown | null
          overall_symptom_severity?: number | null
          seizure_count_during_cycle?: number | null
          seizure_clustered_around_menstruation?: boolean | null
          catamenial_pattern_suspected?: boolean | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      },
      menstrual_log_symptoms: {
        Row: {
          id: string
          log_id: string
          symptom_id: string
          severity: unknown | null
          created_at: string
        }
        Insert: {
          id?: string | null
          log_id: string
          symptom_id: string
          severity?: unknown | null
          created_at?: string | null
        }
        Update: {
          id?: string
          log_id?: string
          symptom_id?: string
          severity?: unknown | null
          created_at?: string
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
      },
      patient_onboarding_data: {
        Row: {
          id: string
          user_id: string
          first_name: string | null
          middle_name: string | null
          last_name: string | null
          date_of_birth: string | null
          gender: unknown | null
          phone_number: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          emergency_contact_relationship: string | null
          selected_conditions: string | null
          track_menstrual_cycle: boolean | null
          share_research_data: boolean | null
          research_data_types: unknown[] | null
          completed_at: string | null
          created_at: string | null
          updated_at: string | null
          onboarding_step: number | null
          last_updated_at: string | null
        }
        Insert: {
          id?: string | null
          user_id: string
          first_name?: string | null
          middle_name?: string | null
          last_name?: string | null
          date_of_birth?: string | null
          gender?: unknown | null
          phone_number?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          emergency_contact_relationship?: string | null
          selected_conditions?: string | null
          track_menstrual_cycle?: boolean | null
          share_research_data?: boolean | null
          research_data_types?: unknown[] | null
          completed_at?: string | null
          created_at?: string | null
          updated_at?: string | null
          onboarding_step?: number | null
          last_updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          first_name?: string | null
          middle_name?: string | null
          last_name?: string | null
          date_of_birth?: string | null
          gender?: unknown | null
          phone_number?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          emergency_contact_relationship?: string | null
          selected_conditions?: string | null
          track_menstrual_cycle?: boolean | null
          share_research_data?: boolean | null
          research_data_types?: unknown[] | null
          completed_at?: string | null
          created_at?: string | null
          updated_at?: string | null
          onboarding_step?: number | null
          last_updated_at?: string | null
        }
        Relationships: []
      },
      patient_phi: {
        Row: {
          id: string
          user_id: string
          date_of_birth: string | null
          social_security_number_encrypted: string | null
          medical_record_number: string | null
          gender: string | null
          ethnicity: string | null
          race: string | null
          primary_language: string | null
          preferred_pronouns: string | null
          home_address: Json | null
          phone_number: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          emergency_contact_relationship: string | null
          primary_diagnosis: string | null
          diagnosis_date: string | null
          referring_physician: string | null
          primary_care_physician: string | null
          insurance_provider: string | null
          insurance_member_id: string | null
          timezone: string | null
          created_at: string | null
          updated_at: string | null
          medicare_number_encrypted: string | null
          medicare_irn: string | null
          medicare_expiry: string | null
          dva_number_encrypted: string | null
          private_health_insurer: string | null
          private_health_member_id_encrypted: string | null
          aadhaar_number_encrypted: string | null
          pan_number_encrypted: string | null
          ayushman_bharat_id_encrypted: string | null
          country_code: string | null
          national_health_id_encrypted: string | null
        }
        Insert: {
          id?: string | null
          user_id: string
          date_of_birth?: string | null
          social_security_number_encrypted?: string | null
          medical_record_number?: string | null
          gender?: string | null
          ethnicity?: string | null
          race?: string | null
          primary_language?: string | null
          preferred_pronouns?: string | null
          home_address?: Json | null
          phone_number?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          emergency_contact_relationship?: string | null
          primary_diagnosis?: string | null
          diagnosis_date?: string | null
          referring_physician?: string | null
          primary_care_physician?: string | null
          insurance_provider?: string | null
          insurance_member_id?: string | null
          timezone?: string | null
          created_at?: string | null
          updated_at?: string | null
          medicare_number_encrypted?: string | null
          medicare_irn?: string | null
          medicare_expiry?: string | null
          dva_number_encrypted?: string | null
          private_health_insurer?: string | null
          private_health_member_id_encrypted?: string | null
          aadhaar_number_encrypted?: string | null
          pan_number_encrypted?: string | null
          ayushman_bharat_id_encrypted?: string | null
          country_code?: string | null
          national_health_id_encrypted?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          date_of_birth?: string | null
          social_security_number_encrypted?: string | null
          medical_record_number?: string | null
          gender?: string | null
          ethnicity?: string | null
          race?: string | null
          primary_language?: string | null
          preferred_pronouns?: string | null
          home_address?: Json | null
          phone_number?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          emergency_contact_relationship?: string | null
          primary_diagnosis?: string | null
          diagnosis_date?: string | null
          referring_physician?: string | null
          primary_care_physician?: string | null
          insurance_provider?: string | null
          insurance_member_id?: string | null
          timezone?: string | null
          created_at?: string | null
          updated_at?: string | null
          medicare_number_encrypted?: string | null
          medicare_irn?: string | null
          medicare_expiry?: string | null
          dva_number_encrypted?: string | null
          private_health_insurer?: string | null
          private_health_member_id_encrypted?: string | null
          aadhaar_number_encrypted?: string | null
          pan_number_encrypted?: string | null
          ayushman_bharat_id_encrypted?: string | null
          country_code?: string | null
          national_health_id_encrypted?: string | null
        }
        Relationships: []
      },
      seizure_events: {
        Row: {
          event_id: string
          patient_id: string
          occurred_at: string
          duration_seconds: number | null
          seizure_type: string
          seizure_subtype: string | null
          severity: number | null
          consciousness_level: string | null
          had_aura: boolean | null
          aura_signs: Json | null
          aura_description: string | null
          warning_time_seconds: number | null
          possible_triggers: Json | null
          trigger_details: string | null
          body_parts_affected: Json | null
          motor_symptoms: Json | null
          non_motor_symptoms: Json | null
          post_ictal_confusion: boolean | null
          post_ictal_effects: Json | null
          post_ictal_duration_minutes: number | null
          injuries_occurred: boolean | null
          injury_types: Json | null
          injury_description: string | null
          required_medical_attention: boolean | null
          location: string | null
          activity_before: string | null
          witnessed: boolean | null
          witness_name: string | null
          witness_description: string | null
          medication_taken_as_prescribed: boolean | null
          hours_since_last_dose: number | null
          recent_medication_changes: boolean | null
          fully_recovered: boolean | null
          recovery_time_minutes: number | null
          video_recorded: boolean | null
          media_urls: Json | null
          notes: string | null
          patient_concerns: string | null
          shared_with_clinician: boolean | null
          shared_with_carers: boolean | null
          visible_to_researchers: boolean | null
          created_at: string | null
          updated_at: string | null
          synced_to_clinician_at: string | null
        }
        Insert: {
          event_id?: string | null
          patient_id: string
          occurred_at: string
          duration_seconds?: number | null
          seizure_type: string
          seizure_subtype?: string | null
          severity?: number | null
          consciousness_level?: string | null
          had_aura?: boolean | null
          aura_signs?: Json | null
          aura_description?: string | null
          warning_time_seconds?: number | null
          possible_triggers?: Json | null
          trigger_details?: string | null
          body_parts_affected?: Json | null
          motor_symptoms?: Json | null
          non_motor_symptoms?: Json | null
          post_ictal_confusion?: boolean | null
          post_ictal_effects?: Json | null
          post_ictal_duration_minutes?: number | null
          injuries_occurred?: boolean | null
          injury_types?: Json | null
          injury_description?: string | null
          required_medical_attention?: boolean | null
          location?: string | null
          activity_before?: string | null
          witnessed?: boolean | null
          witness_name?: string | null
          witness_description?: string | null
          medication_taken_as_prescribed?: boolean | null
          hours_since_last_dose?: number | null
          recent_medication_changes?: boolean | null
          fully_recovered?: boolean | null
          recovery_time_minutes?: number | null
          video_recorded?: boolean | null
          media_urls?: Json | null
          notes?: string | null
          patient_concerns?: string | null
          shared_with_clinician?: boolean | null
          shared_with_carers?: boolean | null
          visible_to_researchers?: boolean | null
          created_at?: string | null
          updated_at?: string | null
          synced_to_clinician_at?: string | null
        }
        Update: {
          event_id?: string
          patient_id?: string
          occurred_at?: string
          duration_seconds?: number | null
          seizure_type?: string
          seizure_subtype?: string | null
          severity?: number | null
          consciousness_level?: string | null
          had_aura?: boolean | null
          aura_signs?: Json | null
          aura_description?: string | null
          warning_time_seconds?: number | null
          possible_triggers?: Json | null
          trigger_details?: string | null
          body_parts_affected?: Json | null
          motor_symptoms?: Json | null
          non_motor_symptoms?: Json | null
          post_ictal_confusion?: boolean | null
          post_ictal_effects?: Json | null
          post_ictal_duration_minutes?: number | null
          injuries_occurred?: boolean | null
          injury_types?: Json | null
          injury_description?: string | null
          required_medical_attention?: boolean | null
          location?: string | null
          activity_before?: string | null
          witnessed?: boolean | null
          witness_name?: string | null
          witness_description?: string | null
          medication_taken_as_prescribed?: boolean | null
          hours_since_last_dose?: number | null
          recent_medication_changes?: boolean | null
          fully_recovered?: boolean | null
          recovery_time_minutes?: number | null
          video_recorded?: boolean | null
          media_urls?: Json | null
          notes?: string | null
          patient_concerns?: string | null
          shared_with_clinician?: boolean | null
          shared_with_carers?: boolean | null
          visible_to_researchers?: boolean | null
          created_at?: string | null
          updated_at?: string | null
          synced_to_clinician_at?: string | null
        }
        Relationships: []
      },
      seizure_generalized_assessment: {
        Row: {
          id: string
          log_id: string
          assessment_type: unknown
          classifier_basis: string | null
          confidence_score: number | null
          created_at: string | null
        }
        Insert: {
          id?: string | null
          log_id: string
          assessment_type: unknown
          classifier_basis?: string | null
          confidence_score?: number | null
          created_at?: string | null
        }
        Update: {
          id?: string
          log_id?: string
          assessment_type?: unknown
          classifier_basis?: string | null
          confidence_score?: number | null
          created_at?: string | null
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
      },
      seizure_log_brain_regions: {
        Row: {
          id: string
          log_id: string
          region_id: number
          calculated_probability: number | null
          probability_grade: unknown | null
          created_at: string | null
        }
        Insert: {
          id?: string | null
          log_id: string
          region_id: number
          calculated_probability?: number | null
          probability_grade?: unknown | null
          created_at?: string | null
        }
        Update: {
          id?: string
          log_id?: string
          region_id?: number
          calculated_probability?: number | null
          probability_grade?: unknown | null
          created_at?: string | null
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
      },
      seizure_log_post_ictal_symptoms: {
        Row: {
          id: string
          log_id: string
          symptom: unknown
          severity: number | null
          created_at: string | null
        }
        Insert: {
          id?: string | null
          log_id: string
          symptom: unknown
          severity?: number | null
          created_at?: string | null
        }
        Update: {
          id?: string
          log_id?: string
          symptom?: unknown
          severity?: number | null
          created_at?: string | null
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
      },
      seizure_log_signs: {
        Row: {
          id: string
          log_id: string
          sign_id: number
          present: unknown | null
          observer_rank: unknown | null
          created_at: string | null
        }
        Insert: {
          id?: string | null
          log_id: string
          sign_id: number
          present?: unknown | null
          observer_rank?: unknown | null
          created_at?: string | null
        }
        Update: {
          id?: string
          log_id?: string
          sign_id?: number
          present?: unknown | null
          observer_rank?: unknown | null
          created_at?: string | null
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
      },
      seizure_log_triggers: {
        Row: {
          id: string
          log_id: string
          trigger_id: number
          trigger_strength: unknown | null
          created_at: string | null
        }
        Insert: {
          id?: string | null
          log_id: string
          trigger_id: number
          trigger_strength?: unknown | null
          created_at?: string | null
        }
        Update: {
          id?: string
          log_id?: string
          trigger_id?: number
          trigger_strength?: unknown | null
          created_at?: string | null
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
      },
      seizure_logs_research: {
        Row: {
          log_id: string
          user_id: string
          log_date: string
          log_time: unknown
          seizure_type: unknown
          consciousness_level: unknown | null
          duration_seconds: number | null
          aura_present: unknown | null
          aura_description: string | null
          witnessed: unknown | null
          witness_role: unknown | null
          video_recorded: unknown | null
          location_type: unknown | null
          post_ictal_confusion_minutes: number | null
          recovery_time_minutes: number | null
          sleep_hours_prior: number | null
          medication_adherence_prior: unknown | null
          stress_level: unknown | null
          emergency_services_called: unknown | null
          rescue_medication_used: unknown | null
          rescue_medication_type: unknown | null
          hospitalized: unknown | null
          research_grade: unknown | null
          notes: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          log_id?: string | null
          user_id: string
          log_date: string
          log_time: unknown
          seizure_type: unknown
          consciousness_level?: unknown | null
          duration_seconds?: number | null
          aura_present?: unknown | null
          aura_description?: string | null
          witnessed?: unknown | null
          witness_role?: unknown | null
          video_recorded?: unknown | null
          location_type?: unknown | null
          post_ictal_confusion_minutes?: number | null
          recovery_time_minutes?: number | null
          sleep_hours_prior?: number | null
          medication_adherence_prior?: unknown | null
          stress_level?: unknown | null
          emergency_services_called?: unknown | null
          rescue_medication_used?: unknown | null
          rescue_medication_type?: unknown | null
          hospitalized?: unknown | null
          research_grade?: unknown | null
          notes?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          log_id?: string
          user_id?: string
          log_date?: string
          log_time?: unknown
          seizure_type?: unknown
          consciousness_level?: unknown | null
          duration_seconds?: number | null
          aura_present?: unknown | null
          aura_description?: string | null
          witnessed?: unknown | null
          witness_role?: unknown | null
          video_recorded?: unknown | null
          location_type?: unknown | null
          post_ictal_confusion_minutes?: number | null
          recovery_time_minutes?: number | null
          sleep_hours_prior?: number | null
          medication_adherence_prior?: unknown | null
          stress_level?: unknown | null
          emergency_services_called?: unknown | null
          rescue_medication_used?: unknown | null
          rescue_medication_type?: unknown | null
          hospitalized?: unknown | null
          research_grade?: unknown | null
          notes?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      },
      tracking_entries: {
        Row: {
          id: string
          user_id: string
          tracking_type: unknown
          entry_date: string | null
          value: number | null
          severity: number | null
          notes: string | null
          metadata: Json | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string | null
          user_id: string
          tracking_type: unknown
          entry_date?: string | null
          value?: number | null
          severity?: number | null
          notes?: string | null
          metadata?: Json | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          tracking_type?: unknown
          entry_date?: string | null
          value?: number | null
          severity?: number | null
          notes?: string | null
          metadata?: Json | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      },
      tremor_episodes: {
        Row: {
          tremor_id: string
          patient_id: string
          occurred_at: string
          duration_seconds: number | null
          tremor_type: string | null
          severity: number | null
          frequency_hz: number | null
          body_regions: Json | null
          dominant_side: string | null
          interfered_with_activities: boolean | null
          activities_affected: Json | null
          occurred_during: string | null
          medication_status: string | null
          hours_since_medication: number | null
          possible_triggers: Json | null
          trigger_details: string | null
          video_recorded: boolean | null
          media_urls: Json | null
          notes: string | null
          shared_with_clinician: boolean | null
          visible_to_researchers: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          tremor_id?: string | null
          patient_id: string
          occurred_at: string
          duration_seconds?: number | null
          tremor_type?: string | null
          severity?: number | null
          frequency_hz?: number | null
          body_regions?: Json | null
          dominant_side?: string | null
          interfered_with_activities?: boolean | null
          activities_affected?: Json | null
          occurred_during?: string | null
          medication_status?: string | null
          hours_since_medication?: number | null
          possible_triggers?: Json | null
          trigger_details?: string | null
          video_recorded?: boolean | null
          media_urls?: Json | null
          notes?: string | null
          shared_with_clinician?: boolean | null
          visible_to_researchers?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          tremor_id?: string
          patient_id?: string
          occurred_at?: string
          duration_seconds?: number | null
          tremor_type?: string | null
          severity?: number | null
          frequency_hz?: number | null
          body_regions?: Json | null
          dominant_side?: string | null
          interfered_with_activities?: boolean | null
          activities_affected?: Json | null
          occurred_during?: string | null
          medication_status?: string | null
          hours_since_medication?: number | null
          possible_triggers?: Json | null
          trigger_details?: string | null
          video_recorded?: boolean | null
          media_urls?: Json | null
          notes?: string | null
          shared_with_clinician?: boolean | null
          visible_to_researchers?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      },
      user_conditions: {
        Row: {
          id: string
          user_id: string
          condition_id: string
          diagnosis_date: string | null
          severity: number | null
          tracking_features_enabled: unknown[] | null
          created_at: string | null
        }
        Insert: {
          id?: string | null
          user_id: string
          condition_id: string
          diagnosis_date?: string | null
          severity?: number | null
          tracking_features_enabled?: unknown[] | null
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          condition_id?: string
          diagnosis_date?: string | null
          severity?: number | null
          tracking_features_enabled?: unknown[] | null
          created_at?: string | null
        }
        Relationships: []
      },
      user_medications: {
        Row: {
          id: string
          user_id: string
          medication_id: string | null
          dosage_amount: number | null
          dosage_unit: string | null
          frequency: string | null
          start_date: string | null
          end_date: string | null
          is_active: boolean | null
          created_at: string | null
        }
        Insert: {
          id?: string | null
          user_id: string
          medication_id?: string | null
          dosage_amount?: number | null
          dosage_unit?: string | null
          frequency?: string | null
          start_date?: string | null
          end_date?: string | null
          is_active?: boolean | null
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          medication_id?: string | null
          dosage_amount?: number | null
          dosage_unit?: string | null
          frequency?: string | null
          start_date?: string | null
          end_date?: string | null
          is_active?: boolean | null
          created_at?: string | null
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
          id: string
          name: string
          description: string | null
          icon: string | null
          points: number | null
          category: string | null
          created_at: string | null
        }
        Insert: {
          id?: string | null
          name: string
          description?: string | null
          icon?: string | null
          points?: number | null
          category?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          icon?: string | null
          points?: number | null
          category?: string | null
          created_at?: string | null
        }
        Relationships: []
      },
      api_request_logs: {
        Row: {
          id: string
          endpoint: string
          method: string
          status_code: number | null
          user_id: string | null
          session_id: string | null
          ip_address: unknown | null
          user_agent: string | null
          request_time: string
          response_time: string | null
          duration_ms: number | null
          error_message: string | null
          error_type: string | null
          rate_limit_remaining: number | null
          created_at: string
        }
        Insert: {
          id?: string | null
          endpoint: string
          method: string
          status_code?: number | null
          user_id?: string | null
          session_id?: string | null
          ip_address?: unknown | null
          user_agent?: string | null
          request_time?: string | null
          response_time?: string | null
          duration_ms?: number | null
          error_message?: string | null
          error_type?: string | null
          rate_limit_remaining?: number | null
          created_at?: string | null
        }
        Update: {
          id?: string
          endpoint?: string
          method?: string
          status_code?: number | null
          user_id?: string | null
          session_id?: string | null
          ip_address?: unknown | null
          user_agent?: string | null
          request_time?: string
          response_time?: string | null
          duration_ms?: number | null
          error_message?: string | null
          error_type?: string | null
          rate_limit_remaining?: number | null
          created_at?: string
        }
        Relationships: []
      },
      audit_log: {
        Row: {
          id: string
          user_id: string | null
          action: string
          table_name: string | null
          record_id: string | null
          old_values: Json | null
          new_values: Json | null
          ip_address_hash: string | null
          created_at: string | null
        }
        Insert: {
          id?: string | null
          user_id?: string | null
          action: string
          table_name?: string | null
          record_id?: string | null
          old_values?: Json | null
          new_values?: Json | null
          ip_address_hash?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          action?: string
          table_name?: string | null
          record_id?: string | null
          old_values?: Json | null
          new_values?: Json | null
          ip_address_hash?: string | null
          created_at?: string | null
        }
        Relationships: []
      },
      brain_regions_reference: {
        Row: {
          region_id: number
          lobe: unknown
          subregion: unknown | null
          laterality: unknown | null
          display_name: string
          function_description: string | null
          created_at: string | null
        }
        Insert: {
          region_id?: number | null
          lobe: unknown
          subregion?: unknown | null
          laterality?: unknown | null
          display_name: string
          function_description?: string | null
          created_at?: string | null
        }
        Update: {
          region_id?: number
          lobe?: unknown
          subregion?: unknown | null
          laterality?: unknown | null
          display_name?: string
          function_description?: string | null
          created_at?: string | null
        }
        Relationships: []
      },
      carer_invitations: {
        Row: {
          id: string
          relationship_id: string
          patient_user_id: string
          carer_email: string
          carer_email_hash: string
          invitation_token: string
          status: string | null
          dob_verification_attempts: number | null
          max_dob_attempts: number | null
          last_verification_attempt: string | null
          invited_at: string | null
          expires_at: string | null
          accepted_at: string | null
          cancelled_at: string | null
          carer_user_id: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string | null
          relationship_id: string
          patient_user_id: string
          carer_email: string
          carer_email_hash: string
          invitation_token?: string | null
          status?: string | null
          dob_verification_attempts?: number | null
          max_dob_attempts?: number | null
          last_verification_attempt?: string | null
          invited_at?: string | null
          expires_at?: string | null
          accepted_at?: string | null
          cancelled_at?: string | null
          carer_user_id?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          relationship_id?: string
          patient_user_id?: string
          carer_email?: string
          carer_email_hash?: string
          invitation_token?: string
          status?: string | null
          dob_verification_attempts?: number | null
          max_dob_attempts?: number | null
          last_verification_attempt?: string | null
          invited_at?: string | null
          expires_at?: string | null
          accepted_at?: string | null
          cancelled_at?: string | null
          carer_user_id?: string | null
          created_at?: string | null
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
      },
      carer_onboarding_data: {
        Row: {
          id: string
          user_id: string
          first_name: string | null
          middle_name: string | null
          last_name: string | null
          completed_at: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string | null
          user_id: string
          first_name?: string | null
          middle_name?: string | null
          last_name?: string | null
          completed_at?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          first_name?: string | null
          middle_name?: string | null
          last_name?: string | null
          completed_at?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      },
      carer_profiles: {
        Row: {
          id: string
          user_id: string
          preferred_contact_method: string | null
          availability_notes: string | null
          certifications: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string | null
          user_id: string
          preferred_contact_method?: string | null
          availability_notes?: string | null
          certifications?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          preferred_contact_method?: string | null
          availability_notes?: string | null
          certifications?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      },
      carer_relationships: {
        Row: {
          id: string
          patient_user_id: string
          carer_user_id: string | null
          relationship_type: string
          relationship_details: string | null
          status: string
          can_view_health_data: boolean | null
          can_receive_alerts: boolean | null
          can_manage_appointments: boolean | null
          invited_at: string | null
          approved_at: string | null
          terminated_at: string | null
          termination_reason: string | null
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string | null
          patient_user_id: string
          carer_user_id?: string | null
          relationship_type: string
          relationship_details?: string | null
          status?: string | null
          can_view_health_data?: boolean | null
          can_receive_alerts?: boolean | null
          can_manage_appointments?: boolean | null
          invited_at?: string | null
          approved_at?: string | null
          terminated_at?: string | null
          termination_reason?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          patient_user_id?: string
          carer_user_id?: string | null
          relationship_type?: string
          relationship_details?: string | null
          status?: string
          can_view_health_data?: boolean | null
          can_receive_alerts?: boolean | null
          can_manage_appointments?: boolean | null
          invited_at?: string | null
          approved_at?: string | null
          terminated_at?: string | null
          termination_reason?: string | null
          created_at?: string
          updated_at?: string | null
        }
        Relationships: []
      },
      clinician_profiles: {
        Row: {
          id: string
          user_id: string
          specialty: string | null
          sub_specialty: string | null
          institution: string | null
          department: string | null
          years_in_practice: number | null
          patient_capacity: number | null
          accepting_new_patients: boolean | null
          preferred_communication: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string | null
          user_id: string
          specialty?: string | null
          sub_specialty?: string | null
          institution?: string | null
          department?: string | null
          years_in_practice?: number | null
          patient_capacity?: number | null
          accepting_new_patients?: boolean | null
          preferred_communication?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          specialty?: string | null
          sub_specialty?: string | null
          institution?: string | null
          department?: string | null
          years_in_practice?: number | null
          patient_capacity?: number | null
          accepting_new_patients?: boolean | null
          preferred_communication?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      },
      conditions: {
        Row: {
          id: string
          name: string
          category: string | null
          description: string | null
          snomed_code: string | null
          icd10_code: string | null
          tracking_features_array: unknown[] | null
          created_at: string | null
        }
        Insert: {
          id?: string | null
          name: string
          category?: string | null
          description?: string | null
          snomed_code?: string | null
          icd10_code?: string | null
          tracking_features_array?: unknown[] | null
          created_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          category?: string | null
          description?: string | null
          snomed_code?: string | null
          icd10_code?: string | null
          tracking_features_array?: unknown[] | null
          created_at?: string | null
        }
        Relationships: []
      },
      data_sharing_preferences: {
        Row: {
          id: string
          patient_id: string
          default_share_with_clinicians: boolean | null
          default_share_with_carers: boolean | null
          default_share_with_researchers: boolean | null
          clinician_access_rules: Json | null
          carer_access_rules: Json | null
          research_seizure_data: boolean | null
          research_tremor_data: boolean | null
          research_gait_data: boolean | null
          research_medication_data: boolean | null
          research_symptom_data: boolean | null
          research_imaging_data: boolean | null
          research_demographic_data: boolean | null
          seizure_events_visibility: string | null
          tremor_episodes_visibility: string | null
          gait_episodes_visibility: string | null
          daily_logs_visibility: string | null
          medications_visibility: string | null
          media_visibility: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string | null
          patient_id: string
          default_share_with_clinicians?: boolean | null
          default_share_with_carers?: boolean | null
          default_share_with_researchers?: boolean | null
          clinician_access_rules?: Json | null
          carer_access_rules?: Json | null
          research_seizure_data?: boolean | null
          research_tremor_data?: boolean | null
          research_gait_data?: boolean | null
          research_medication_data?: boolean | null
          research_symptom_data?: boolean | null
          research_imaging_data?: boolean | null
          research_demographic_data?: boolean | null
          seizure_events_visibility?: string | null
          tremor_episodes_visibility?: string | null
          gait_episodes_visibility?: string | null
          daily_logs_visibility?: string | null
          medications_visibility?: string | null
          media_visibility?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          patient_id?: string
          default_share_with_clinicians?: boolean | null
          default_share_with_carers?: boolean | null
          default_share_with_researchers?: boolean | null
          clinician_access_rules?: Json | null
          carer_access_rules?: Json | null
          research_seizure_data?: boolean | null
          research_tremor_data?: boolean | null
          research_gait_data?: boolean | null
          research_medication_data?: boolean | null
          research_symptom_data?: boolean | null
          research_imaging_data?: boolean | null
          research_demographic_data?: boolean | null
          seizure_events_visibility?: string | null
          tremor_episodes_visibility?: string | null
          gait_episodes_visibility?: string | null
          daily_logs_visibility?: string | null
          medications_visibility?: string | null
          media_visibility?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      },
      database_operation_logs: {
        Row: {
          id: string
          operation_type: string
          table_schema: string
          table_name: string
          executed_by_user_id: string | null
          executed_by_role: string | null
          operation_detail: string | null
          rows_affected: number | null
          success: boolean
          error_message: string | null
          sql_state: string | null
          executed_at: string
          session_id: string | null
          created_at: string
        }
        Insert: {
          id?: string | null
          operation_type: string
          table_schema: string
          table_name: string
          executed_by_user_id?: string | null
          executed_by_role?: string | null
          operation_detail?: string | null
          rows_affected?: number | null
          success: boolean
          error_message?: string | null
          sql_state?: string | null
          executed_at?: string | null
          session_id?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          operation_type?: string
          table_schema?: string
          table_name?: string
          executed_by_user_id?: string | null
          executed_by_role?: string | null
          operation_detail?: string | null
          rows_affected?: number | null
          success?: boolean
          error_message?: string | null
          sql_state?: string | null
          executed_at?: string
          session_id?: string | null
          created_at?: string
        }
        Relationships: []
      },
      function_execution_logs: {
        Row: {
          id: string
          function_name: string
          execution_status: string
          started_at: string
          completed_at: string | null
          duration_ms: number | null
          input_user_id: string | null
          input_user_type: string | null
          input_parameters: Json | null
          return_value: Json | null
          success: boolean | null
          error_message: string | null
          error_detail: string | null
          error_hint: string | null
          sql_state: string | null
          session_id: string | null
          triggered_by: string | null
          created_at: string
        }
        Insert: {
          id?: string | null
          function_name: string
          execution_status: string
          started_at?: string | null
          completed_at?: string | null
          duration_ms?: number | null
          input_user_id?: string | null
          input_user_type?: string | null
          input_parameters?: Json | null
          return_value?: Json | null
          success?: boolean | null
          error_message?: string | null
          error_detail?: string | null
          error_hint?: string | null
          sql_state?: string | null
          session_id?: string | null
          triggered_by?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          function_name?: string
          execution_status?: string
          started_at?: string
          completed_at?: string | null
          duration_ms?: number | null
          input_user_id?: string | null
          input_user_type?: string | null
          input_parameters?: Json | null
          return_value?: Json | null
          success?: boolean | null
          error_message?: string | null
          error_detail?: string | null
          error_hint?: string | null
          sql_state?: string | null
          session_id?: string | null
          triggered_by?: string | null
          created_at?: string
        }
        Relationships: []
      },
      medications: {
        Row: {
          id: string
          name: string
          generic_name: string | null
          category: string | null
          rxnorm_code: string | null
          atc_code: string | null
          common_dosages: string | null
          contraindications: string | null
          created_at: string | null
        }
        Insert: {
          id?: string | null
          name: string
          generic_name?: string | null
          category?: string | null
          rxnorm_code?: string | null
          atc_code?: string | null
          common_dosages?: string | null
          contraindications?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          generic_name?: string | null
          category?: string | null
          rxnorm_code?: string | null
          atc_code?: string | null
          common_dosages?: string | null
          contraindications?: string | null
          created_at?: string | null
        }
        Relationships: []
      },
      menstrual_symptom_options: {
        Row: {
          id: string
          category: string
          symptom_name: string
          description: string | null
          display_order: number | null
          active: boolean | null
          created_at: string | null
        }
        Insert: {
          id?: string | null
          category: string
          symptom_name: string
          description?: string | null
          display_order?: number | null
          active?: boolean | null
          created_at?: string | null
        }
        Update: {
          id?: string
          category?: string
          symptom_name?: string
          description?: string | null
          display_order?: number | null
          active?: boolean | null
          created_at?: string | null
        }
        Relationships: []
      },
      notification_history: {
        Row: {
          id: string
          user_id: string
          notification_type: string
          sent_at: string
          opened_at: string | null
          action_taken: boolean | null
          created_at: string | null
        }
        Insert: {
          id?: string | null
          user_id: string
          notification_type: string
          sent_at: string
          opened_at?: string | null
          action_taken?: boolean | null
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          notification_type?: string
          sent_at?: string
          opened_at?: string | null
          action_taken?: boolean | null
          created_at?: string | null
        }
        Relationships: []
      },
      notification_preferences: {
        Row: {
          id: string
          user_id: string
          push_enabled: boolean | null
          email_enabled: boolean | null
          medication_reminders: boolean | null
          medication_reminder_minutes: number | null
          appointment_reminders: boolean | null
          appointment_reminder_hours: number | null
          critical_alerts: boolean | null
          pattern_alerts: boolean | null
          achievement_notifications: boolean | null
          message_notifications: boolean | null
          direct_messages: boolean | null
          daily_checkin_reminder: boolean | null
          daily_checkin_time: unknown | null
          quiet_hours_enabled: boolean | null
          quiet_hours_start: unknown | null
          quiet_hours_end: unknown | null
          sound_enabled: boolean | null
          vibration_enabled: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string | null
          user_id: string
          push_enabled?: boolean | null
          email_enabled?: boolean | null
          medication_reminders?: boolean | null
          medication_reminder_minutes?: number | null
          appointment_reminders?: boolean | null
          appointment_reminder_hours?: number | null
          critical_alerts?: boolean | null
          pattern_alerts?: boolean | null
          achievement_notifications?: boolean | null
          message_notifications?: boolean | null
          direct_messages?: boolean | null
          daily_checkin_reminder?: boolean | null
          daily_checkin_time?: unknown | null
          quiet_hours_enabled?: boolean | null
          quiet_hours_start?: unknown | null
          quiet_hours_end?: unknown | null
          sound_enabled?: boolean | null
          vibration_enabled?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          push_enabled?: boolean | null
          email_enabled?: boolean | null
          medication_reminders?: boolean | null
          medication_reminder_minutes?: number | null
          appointment_reminders?: boolean | null
          appointment_reminder_hours?: number | null
          critical_alerts?: boolean | null
          pattern_alerts?: boolean | null
          achievement_notifications?: boolean | null
          message_notifications?: boolean | null
          direct_messages?: boolean | null
          daily_checkin_reminder?: boolean | null
          daily_checkin_time?: unknown | null
          quiet_hours_enabled?: boolean | null
          quiet_hours_start?: unknown | null
          quiet_hours_end?: unknown | null
          sound_enabled?: boolean | null
          vibration_enabled?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      },
      notification_queue: {
        Row: {
          id: string
          user_id: string
          notification_type: string
          title: string
          body: string
          action_url: string | null
          reference_id: string | null
          status: string
          scheduled_for: string
          sent_at: string | null
          priority: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string | null
          user_id: string
          notification_type: string
          title: string
          body: string
          action_url?: string | null
          reference_id?: string | null
          status?: string | null
          scheduled_for: string
          sent_at?: string | null
          priority?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          notification_type?: string
          title?: string
          body?: string
          action_url?: string | null
          reference_id?: string | null
          status?: string
          scheduled_for?: string
          sent_at?: string | null
          priority?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      },
      patient_clinician_connections: {
        Row: {
          id: string
          patient_id: string
          clinician_id: string
          status: string
          access_level: string | null
          access_expires_at: string | null
          connected_at: string | null
          approved_at: string | null
          terminated_at: string | null
          termination_reason: string | null
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string | null
          patient_id: string
          clinician_id: string
          status?: string | null
          access_level?: string | null
          access_expires_at?: string | null
          connected_at?: string | null
          approved_at?: string | null
          terminated_at?: string | null
          termination_reason?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          patient_id?: string
          clinician_id?: string
          status?: string
          access_level?: string | null
          access_expires_at?: string | null
          connected_at?: string | null
          approved_at?: string | null
          terminated_at?: string | null
          termination_reason?: string | null
          created_at?: string
          updated_at?: string | null
        }
        Relationships: []
      },
      patient_invitations: {
        Row: {
          id: string
          clinician_id: string
          patient_email: string
          patient_email_hash: string
          invitation_token: string
          status: string | null
          patient_id: string | null
          message: string | null
          invited_at: string | null
          expires_at: string | null
          accepted_at: string | null
          cancelled_at: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string | null
          clinician_id: string
          patient_email: string
          patient_email_hash: string
          invitation_token?: string | null
          status?: string | null
          patient_id?: string | null
          message?: string | null
          invited_at?: string | null
          expires_at?: string | null
          accepted_at?: string | null
          cancelled_at?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          clinician_id?: string
          patient_email?: string
          patient_email_hash?: string
          invitation_token?: string
          status?: string | null
          patient_id?: string | null
          message?: string | null
          invited_at?: string | null
          expires_at?: string | null
          accepted_at?: string | null
          cancelled_at?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      },
      patient_profiles: {
        Row: {
          id: string
          user_id: string
          timezone: string | null
          preferred_language: string | null
          created_at: string | null
          updated_at: string | null
          first_name: string | null
          last_name: string | null
          date_of_birth: string | null
          gender: unknown | null
        }
        Insert: {
          id?: string | null
          user_id: string
          timezone?: string | null
          preferred_language?: string | null
          created_at?: string | null
          updated_at?: string | null
          first_name?: string | null
          last_name?: string | null
          date_of_birth?: string | null
          gender?: unknown | null
        }
        Update: {
          id?: string
          user_id?: string
          timezone?: string | null
          preferred_language?: string | null
          created_at?: string | null
          updated_at?: string | null
          first_name?: string | null
          last_name?: string | null
          date_of_birth?: string | null
          gender?: unknown | null
        }
        Relationships: []
      },
      profiles: {
        Row: {
          id: string
          user_type: unknown | null
          first_name: string | null
          middle_name: string | null
          last_name: string | null
          email: string | null
          phone_number: string | null
          onboarding_completed: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id: string
          user_type?: unknown | null
          first_name?: string | null
          middle_name?: string | null
          last_name?: string | null
          email?: string | null
          phone_number?: string | null
          onboarding_completed?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_type?: unknown | null
          first_name?: string | null
          middle_name?: string | null
          last_name?: string | null
          email?: string | null
          phone_number?: string | null
          onboarding_completed?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      },
      pwa_push_subscriptions: {
        Row: {
          id: string
          user_id: string
          endpoint: string
          p256dh_key: string
          auth_key: string
          device_type: string | null
          browser: string | null
          active: boolean | null
          last_used_at: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string | null
          user_id: string
          endpoint: string
          p256dh_key: string
          auth_key: string
          device_type?: string | null
          browser?: string | null
          active?: boolean | null
          last_used_at?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          endpoint?: string
          p256dh_key?: string
          auth_key?: string
          device_type?: string | null
          browser?: string | null
          active?: boolean | null
          last_used_at?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      },
      research_consent: {
        Row: {
          id: string
          user_id: string
          data_type: unknown
          consent_status: unknown | null
          consent_given_at: string | null
          consent_withdrawn_at: string | null
          consent_version: string | null
          created_at: string | null
        }
        Insert: {
          id?: string | null
          user_id: string
          data_type: unknown
          consent_status?: unknown | null
          consent_given_at?: string | null
          consent_withdrawn_at?: string | null
          consent_version?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          data_type?: unknown
          consent_status?: unknown | null
          consent_given_at?: string | null
          consent_withdrawn_at?: string | null
          consent_version?: string | null
          created_at?: string | null
        }
        Relationships: []
      },
      researcher_onboarding_data: {
        Row: {
          id: string
          user_id: string
          first_name: string | null
          middle_name: string | null
          last_name: string | null
          institution: string | null
          research_focus: string | null
          credentials: string | null
          completed_at: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string | null
          user_id: string
          first_name?: string | null
          middle_name?: string | null
          last_name?: string | null
          institution?: string | null
          research_focus?: string | null
          credentials?: string | null
          completed_at?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          first_name?: string | null
          middle_name?: string | null
          last_name?: string | null
          institution?: string | null
          research_focus?: string | null
          credentials?: string | null
          completed_at?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      },
      researcher_profiles: {
        Row: {
          id: string
          user_id: string
          institution: string | null
          department: string | null
          research_focus: string | null
          credentials: string | null
          access_level: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string | null
          user_id: string
          institution?: string | null
          department?: string | null
          research_focus?: string | null
          credentials?: string | null
          access_level?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          institution?: string | null
          department?: string | null
          research_focus?: string | null
          credentials?: string | null
          access_level?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      },
      security_incidents: {
        Row: {
          id: string
          user_id: string | null
          incident_type: string
          severity: string | null
          description: string | null
          ip_address_hash: string | null
          user_agent: string | null
          resolved: boolean | null
          resolved_at: string | null
          resolved_by: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string | null
          user_id?: string | null
          incident_type: string
          severity?: string | null
          description?: string | null
          ip_address_hash?: string | null
          user_agent?: string | null
          resolved?: boolean | null
          resolved_at?: string | null
          resolved_by?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          incident_type?: string
          severity?: string | null
          description?: string | null
          ip_address_hash?: string | null
          user_agent?: string | null
          resolved?: boolean | null
          resolved_at?: string | null
          resolved_by?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      },
      seizure_signs_reference: {
        Row: {
          sign_id: number
          sign_name: unknown
          category: unknown
          display_name: string
          description: string | null
          research_code: string | null
          created_at: string | null
        }
        Insert: {
          sign_id?: number | null
          sign_name: unknown
          category: unknown
          display_name: string
          description?: string | null
          research_code?: string | null
          created_at?: string | null
        }
        Update: {
          sign_id?: number
          sign_name?: unknown
          category?: unknown
          display_name?: string
          description?: string | null
          research_code?: string | null
          created_at?: string | null
        }
        Relationships: []
      },
      seizure_triggers_reference: {
        Row: {
          trigger_id: number
          trigger_type: unknown
          display_name: string
          description: string | null
          created_at: string | null
        }
        Insert: {
          trigger_id?: number | null
          trigger_type: unknown
          display_name: string
          description?: string | null
          created_at?: string | null
        }
        Update: {
          trigger_id?: number
          trigger_type?: unknown
          display_name?: string
          description?: string | null
          created_at?: string | null
        }
        Relationships: []
      },
      sign_brain_region_mapping: {
        Row: {
          id: number
          sign_id: number
          region_id: number
          probability_grade: unknown
          probability_percentage: number | null
          research_basis: string | null
          created_at: string | null
        }
        Insert: {
          id?: number | null
          sign_id: number
          region_id: number
          probability_grade: unknown
          probability_percentage?: number | null
          research_basis?: string | null
          created_at?: string | null
        }
        Update: {
          id?: number
          sign_id?: number
          region_id?: number
          probability_grade?: unknown
          probability_percentage?: number | null
          research_basis?: string | null
          created_at?: string | null
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
      },
      symptom_options: {
        Row: {
          id: string
          category: string
          symptom_name: string
          description: string | null
          display_order: number | null
          active: boolean | null
        }
        Insert: {
          id?: string | null
          category: string
          symptom_name: string
          description?: string | null
          display_order?: number | null
          active?: boolean | null
        }
        Update: {
          id?: string
          category?: string
          symptom_name?: string
          description?: string | null
          display_order?: number | null
          active?: boolean | null
        }
        Relationships: []
      },
      system_logs: {
        Row: {
          id: string
          log_level: string
          category: string
          event_type: string
          message: string
          user_id: string | null
          function_name: string | null
          table_name: string | null
          operation: string | null
          error_code: string | null
          sql_state: string | null
          stack_trace: string | null
          context_data: Json | null
          created_at: string
          session_id: string | null
          ip_address: unknown | null
          user_agent: string | null
        }
        Insert: {
          id?: string | null
          log_level: string
          category: string
          event_type: string
          message: string
          user_id?: string | null
          function_name?: string | null
          table_name?: string | null
          operation?: string | null
          error_code?: string | null
          sql_state?: string | null
          stack_trace?: string | null
          context_data?: Json | null
          created_at?: string | null
          session_id?: string | null
          ip_address?: unknown | null
          user_agent?: string | null
        }
        Update: {
          id?: string
          log_level?: string
          category?: string
          event_type?: string
          message?: string
          user_id?: string | null
          function_name?: string | null
          table_name?: string | null
          operation?: string | null
          error_code?: string | null
          sql_state?: string | null
          stack_trace?: string | null
          context_data?: Json | null
          created_at?: string
          session_id?: string | null
          ip_address?: unknown | null
          user_agent?: string | null
        }
        Relationships: []
      },
      trigger_options: {
        Row: {
          id: string
          category: string
          trigger_name: string
          description: string | null
          display_order: number | null
          active: boolean | null
        }
        Insert: {
          id?: string | null
          category: string
          trigger_name: string
          description?: string | null
          display_order?: number | null
          active?: boolean | null
        }
        Update: {
          id?: string
          category?: string
          trigger_name?: string
          description?: string | null
          display_order?: number | null
          active?: boolean | null
        }
        Relationships: []
      },
      user_achievements: {
        Row: {
          id: string
          user_id: string
          achievement_id: string
          earned_at: string | null
        }
        Insert: {
          id?: string | null
          user_id: string
          achievement_id: string
          earned_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          achievement_id?: string
          earned_at?: string | null
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
      },
      user_points: {
        Row: {
          id: string
          user_id: string
          points: number | null
          level: number | null
          streak_days: number | null
          last_activity_date: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string | null
          user_id: string
          points?: number | null
          level?: number | null
          streak_days?: number | null
          last_activity_date?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          points?: number | null
          level?: number | null
          streak_days?: number | null
          last_activity_date?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {

      can_carer_see_patient_data: {
        Args: { p_carer_id: string; p_data_type: string; p_patient_id: string     }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  research: {
    Tables: {
      daily_symptom_logs: {
        Row: {
          log_id: string
          research_id: string
          log_date: string
          overall_feeling: number | null
          mood: number | null
          energy_level: number | null
          fatigue_level: number | null
          pain_level: number | null
          sleep_quality: number | null
          sleep_hours: number | null
          sleep_disturbances: Json | null
          motor_fluctuations_occurred: boolean | null
          on_time_hours: number | null
          off_time_hours: number | null
          dyskinesia_severity: number | null
          stiffness_severity: number | null
          slowness_severity: number | null
          cognitive_issues: Json | null
          mood_issues: Json | null
          autonomic_symptoms: Json | null
          adl_independence_level: number | null
          activities_difficult: Json | null
          all_medications_taken: boolean | null
          medication_side_effects: Json | null
          stress_level: number | null
          exercise_minutes: number | null
          created_at: string | null
          source_log_id: string | null
        }
        Insert: {
          log_id?: string | null
          research_id: string
          log_date: string
          overall_feeling?: number | null
          mood?: number | null
          energy_level?: number | null
          fatigue_level?: number | null
          pain_level?: number | null
          sleep_quality?: number | null
          sleep_hours?: number | null
          sleep_disturbances?: Json | null
          motor_fluctuations_occurred?: boolean | null
          on_time_hours?: number | null
          off_time_hours?: number | null
          dyskinesia_severity?: number | null
          stiffness_severity?: number | null
          slowness_severity?: number | null
          cognitive_issues?: Json | null
          mood_issues?: Json | null
          autonomic_symptoms?: Json | null
          adl_independence_level?: number | null
          activities_difficult?: Json | null
          all_medications_taken?: boolean | null
          medication_side_effects?: Json | null
          stress_level?: number | null
          exercise_minutes?: number | null
          created_at?: string | null
          source_log_id?: string | null
        }
        Update: {
          log_id?: string
          research_id?: string
          log_date?: string
          overall_feeling?: number | null
          mood?: number | null
          energy_level?: number | null
          fatigue_level?: number | null
          pain_level?: number | null
          sleep_quality?: number | null
          sleep_hours?: number | null
          sleep_disturbances?: Json | null
          motor_fluctuations_occurred?: boolean | null
          on_time_hours?: number | null
          off_time_hours?: number | null
          dyskinesia_severity?: number | null
          stiffness_severity?: number | null
          slowness_severity?: number | null
          cognitive_issues?: Json | null
          mood_issues?: Json | null
          autonomic_symptoms?: Json | null
          adl_independence_level?: number | null
          activities_difficult?: Json | null
          all_medications_taken?: boolean | null
          medication_side_effects?: Json | null
          stress_level?: number | null
          exercise_minutes?: number | null
          created_at?: string | null
          source_log_id?: string | null
        }
        Relationships: []
      },
      gait_episodes: {
        Row: {
          gait_id: string
          research_id: string
          occurred_at_date: string
          occurred_at_hour: number | null
          duration_seconds: number | null
          event_type: string
          severity: number | null
          resulted_in_fall: boolean | null
          fall_direction: string | null
          injury_occurred: boolean | null
          required_assistance: boolean | null
          environmental_factors: Json | null
          medication_status: string | null
          hours_since_medication: number | null
          freezing_trigger: string | null
          created_at: string | null
          source_gait_id: string | null
        }
        Insert: {
          gait_id?: string | null
          research_id: string
          occurred_at_date: string
          occurred_at_hour?: number | null
          duration_seconds?: number | null
          event_type: string
          severity?: number | null
          resulted_in_fall?: boolean | null
          fall_direction?: string | null
          injury_occurred?: boolean | null
          required_assistance?: boolean | null
          environmental_factors?: Json | null
          medication_status?: string | null
          hours_since_medication?: number | null
          freezing_trigger?: string | null
          created_at?: string | null
          source_gait_id?: string | null
        }
        Update: {
          gait_id?: string
          research_id?: string
          occurred_at_date?: string
          occurred_at_hour?: number | null
          duration_seconds?: number | null
          event_type?: string
          severity?: number | null
          resulted_in_fall?: boolean | null
          fall_direction?: string | null
          injury_occurred?: boolean | null
          required_assistance?: boolean | null
          environmental_factors?: Json | null
          medication_status?: string | null
          hours_since_medication?: number | null
          freezing_trigger?: string | null
          created_at?: string | null
          source_gait_id?: string | null
        }
        Relationships: []
      },
      seizure_events: {
        Row: {
          event_id: string
          research_id: string
          occurred_at_date: string
          occurred_at_hour: number | null
          duration_seconds: number | null
          seizure_type: string
          severity: number | null
          consciousness_level: string | null
          had_aura: boolean | null
          aura_signs: Json | null
          possible_triggers: Json | null
          body_parts_affected: Json | null
          motor_symptoms: Json | null
          non_motor_symptoms: Json | null
          post_ictal_effects: Json | null
          post_ictal_duration_minutes: number | null
          injuries_occurred: boolean | null
          injury_types: Json | null
          required_medical_attention: boolean | null
          witnessed: boolean | null
          medication_taken_as_prescribed: boolean | null
          hours_since_last_dose: number | null
          recent_medication_changes: boolean | null
          fully_recovered: boolean | null
          recovery_time_minutes: number | null
          created_at: string | null
          source_event_id: string | null
        }
        Insert: {
          event_id?: string | null
          research_id: string
          occurred_at_date: string
          occurred_at_hour?: number | null
          duration_seconds?: number | null
          seizure_type: string
          severity?: number | null
          consciousness_level?: string | null
          had_aura?: boolean | null
          aura_signs?: Json | null
          possible_triggers?: Json | null
          body_parts_affected?: Json | null
          motor_symptoms?: Json | null
          non_motor_symptoms?: Json | null
          post_ictal_effects?: Json | null
          post_ictal_duration_minutes?: number | null
          injuries_occurred?: boolean | null
          injury_types?: Json | null
          required_medical_attention?: boolean | null
          witnessed?: boolean | null
          medication_taken_as_prescribed?: boolean | null
          hours_since_last_dose?: number | null
          recent_medication_changes?: boolean | null
          fully_recovered?: boolean | null
          recovery_time_minutes?: number | null
          created_at?: string | null
          source_event_id?: string | null
        }
        Update: {
          event_id?: string
          research_id?: string
          occurred_at_date?: string
          occurred_at_hour?: number | null
          duration_seconds?: number | null
          seizure_type?: string
          severity?: number | null
          consciousness_level?: string | null
          had_aura?: boolean | null
          aura_signs?: Json | null
          possible_triggers?: Json | null
          body_parts_affected?: Json | null
          motor_symptoms?: Json | null
          non_motor_symptoms?: Json | null
          post_ictal_effects?: Json | null
          post_ictal_duration_minutes?: number | null
          injuries_occurred?: boolean | null
          injury_types?: Json | null
          required_medical_attention?: boolean | null
          witnessed?: boolean | null
          medication_taken_as_prescribed?: boolean | null
          hours_since_last_dose?: number | null
          recent_medication_changes?: boolean | null
          fully_recovered?: boolean | null
          recovery_time_minutes?: number | null
          created_at?: string | null
          source_event_id?: string | null
        }
        Relationships: []
      },
      tremor_episodes: {
        Row: {
          tremor_id: string
          research_id: string
          occurred_at_date: string
          occurred_at_hour: number | null
          duration_seconds: number | null
          tremor_type: string | null
          severity: number | null
          frequency_hz: number | null
          body_regions: Json | null
          dominant_side: string | null
          interfered_with_activities: boolean | null
          activities_affected: Json | null
          occurred_during: string | null
          medication_status: string | null
          hours_since_medication: number | null
          possible_triggers: Json | null
          created_at: string | null
          source_tremor_id: string | null
        }
        Insert: {
          tremor_id?: string | null
          research_id: string
          occurred_at_date: string
          occurred_at_hour?: number | null
          duration_seconds?: number | null
          tremor_type?: string | null
          severity?: number | null
          frequency_hz?: number | null
          body_regions?: Json | null
          dominant_side?: string | null
          interfered_with_activities?: boolean | null
          activities_affected?: Json | null
          occurred_during?: string | null
          medication_status?: string | null
          hours_since_medication?: number | null
          possible_triggers?: Json | null
          created_at?: string | null
          source_tremor_id?: string | null
        }
        Update: {
          tremor_id?: string
          research_id?: string
          occurred_at_date?: string
          occurred_at_hour?: number | null
          duration_seconds?: number | null
          tremor_type?: string | null
          severity?: number | null
          frequency_hz?: number | null
          body_regions?: Json | null
          dominant_side?: string | null
          interfered_with_activities?: boolean | null
          activities_affected?: Json | null
          occurred_during?: string | null
          medication_status?: string | null
          hours_since_medication?: number | null
          possible_triggers?: Json | null
          created_at?: string | null
          source_tremor_id?: string | null
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
  linkage: {
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
    },
  },
  research: {
    Enums: {},
  },
} as const

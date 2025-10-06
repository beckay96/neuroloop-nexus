[
  {
    "schema_name": "auth",
    "table_name": "identities",
    "constraint_name": "identities_user_id_fkey",
    "fk_definition": "FOREIGN KEY (user_id) REFERENCES auth.users (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "c"
  },
  {
    "schema_name": "auth",
    "table_name": "mfa_amr_claims",
    "constraint_name": "mfa_amr_claims_session_id_fkey",
    "fk_definition": "FOREIGN KEY (session_id) REFERENCES auth.sessions (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "c"
  },
  {
    "schema_name": "auth",
    "table_name": "mfa_challenges",
    "constraint_name": "mfa_challenges_auth_factor_id_fkey",
    "fk_definition": "FOREIGN KEY (factor_id) REFERENCES auth.mfa_factors (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "c"
  },
  {
    "schema_name": "auth",
    "table_name": "mfa_factors",
    "constraint_name": "mfa_factors_user_id_fkey",
    "fk_definition": "FOREIGN KEY (user_id) REFERENCES auth.users (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "c"
  },
  {
    "schema_name": "auth",
    "table_name": "one_time_tokens",
    "constraint_name": "one_time_tokens_user_id_fkey",
    "fk_definition": "FOREIGN KEY (user_id) REFERENCES auth.users (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "c"
  },
  {
    "schema_name": "auth",
    "table_name": "refresh_tokens",
    "constraint_name": "refresh_tokens_session_id_fkey",
    "fk_definition": "FOREIGN KEY (session_id) REFERENCES auth.sessions (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "c"
  },
  {
    "schema_name": "auth",
    "table_name": "saml_providers",
    "constraint_name": "saml_providers_sso_provider_id_fkey",
    "fk_definition": "FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "c"
  },
  {
    "schema_name": "auth",
    "table_name": "saml_relay_states",
    "constraint_name": "saml_relay_states_flow_state_id_fkey",
    "fk_definition": "FOREIGN KEY (flow_state_id) REFERENCES auth.flow_state (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "c"
  },
  {
    "schema_name": "auth",
    "table_name": "saml_relay_states",
    "constraint_name": "saml_relay_states_sso_provider_id_fkey",
    "fk_definition": "FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "c"
  },
  {
    "schema_name": "auth",
    "table_name": "sessions",
    "constraint_name": "sessions_user_id_fkey",
    "fk_definition": "FOREIGN KEY (user_id) REFERENCES auth.users (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "c"
  },
  {
    "schema_name": "auth",
    "table_name": "sso_domains",
    "constraint_name": "sso_domains_sso_provider_id_fkey",
    "fk_definition": "FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "c"
  },
  {
    "schema_name": "clinical",
    "table_name": "ai_insights_cards",
    "constraint_name": "ai_insights_cards_clinician_id_fkey",
    "fk_definition": "FOREIGN KEY (clinician_id) REFERENCES auth.users (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "c"
  },
  {
    "schema_name": "clinical",
    "table_name": "case_data_panels",
    "constraint_name": "case_data_panels_added_by_fkey",
    "fk_definition": "FOREIGN KEY (added_by) REFERENCES auth.users (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "a"
  },
  {
    "schema_name": "clinical",
    "table_name": "case_data_panels",
    "constraint_name": "case_data_panels_patient_id_fkey",
    "fk_definition": "FOREIGN KEY (patient_id) REFERENCES auth.users (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "c"
  },
  {
    "schema_name": "clinical",
    "table_name": "clinical_notes_exports",
    "constraint_name": "clinical_notes_exports_author_id_fkey",
    "fk_definition": "FOREIGN KEY (author_id) REFERENCES auth.users (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "a"
  },
  {
    "schema_name": "clinical",
    "table_name": "clinical_notes_exports",
    "constraint_name": "clinical_notes_exports_patient_id_fkey",
    "fk_definition": "FOREIGN KEY (patient_id) REFERENCES auth.users (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "c"
  },
  {
    "schema_name": "clinical",
    "table_name": "clinical_notes_exports",
    "constraint_name": "clinical_notes_exports_signed_by_fkey",
    "fk_definition": "FOREIGN KEY (signed_by) REFERENCES auth.users (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "a"
  },
  {
    "schema_name": "clinical",
    "table_name": "clinical_scale_results",
    "constraint_name": "clinical_scale_results_assessed_by_fkey",
    "fk_definition": "FOREIGN KEY (assessed_by) REFERENCES auth.users (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "a"
  },
  {
    "schema_name": "clinical",
    "table_name": "clinical_scale_results",
    "constraint_name": "clinical_scale_results_entered_by_fkey",
    "fk_definition": "FOREIGN KEY (entered_by) REFERENCES auth.users (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "a"
  },
  {
    "schema_name": "clinical",
    "table_name": "clinical_scale_results",
    "constraint_name": "clinical_scale_results_patient_id_fkey",
    "fk_definition": "FOREIGN KEY (patient_id) REFERENCES auth.users (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "c"
  },
  {
    "schema_name": "clinical",
    "table_name": "clinician_today_view",
    "constraint_name": "clinician_today_view_clinician_id_fkey",
    "fk_definition": "FOREIGN KEY (clinician_id) REFERENCES auth.users (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "c"
  },
  {
    "schema_name": "clinical",
    "table_name": "neuro_imaging_results",
    "constraint_name": "neuro_imaging_results_ordering_physician_fkey",
    "fk_definition": "FOREIGN KEY (ordering_physician) REFERENCES auth.users (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "a"
  },
  {
    "schema_name": "clinical",
    "table_name": "neuro_imaging_results",
    "constraint_name": "neuro_imaging_results_patient_id_fkey",
    "fk_definition": "FOREIGN KEY (patient_id) REFERENCES auth.users (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "c"
  },
  {
    "schema_name": "clinical",
    "table_name": "neuro_imaging_results",
    "constraint_name": "neuro_imaging_results_uploaded_by_fkey",
    "fk_definition": "FOREIGN KEY (uploaded_by) REFERENCES auth.users (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "a"
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_collab_chat",
    "constraint_name": "patient_collab_chat_parent_message_id_fkey",
    "fk_definition": "FOREIGN KEY (parent_message_id) REFERENCES clinical.patient_collab_chat (message_id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "a"
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_collab_chat",
    "constraint_name": "patient_collab_chat_patient_id_fkey",
    "fk_definition": "FOREIGN KEY (patient_id) REFERENCES auth.users (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "c"
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_collab_chat",
    "constraint_name": "patient_collab_chat_sender_id_fkey",
    "fk_definition": "FOREIGN KEY (sender_id) REFERENCES auth.users (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "a"
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_pro_timeline",
    "constraint_name": "patient_pro_timeline_patient_id_fkey",
    "fk_definition": "FOREIGN KEY (patient_id) REFERENCES auth.users (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "c"
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_pro_timeline",
    "constraint_name": "patient_pro_timeline_validated_by_fkey",
    "fk_definition": "FOREIGN KEY (validated_by) REFERENCES auth.users (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "a"
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_risk_alerts",
    "constraint_name": "patient_risk_alerts_acknowledged_by_fkey",
    "fk_definition": "FOREIGN KEY (acknowledged_by) REFERENCES auth.users (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "a"
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_risk_alerts",
    "constraint_name": "patient_risk_alerts_patient_id_fkey",
    "fk_definition": "FOREIGN KEY (patient_id) REFERENCES auth.users (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "c"
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_risk_alerts",
    "constraint_name": "patient_risk_alerts_resolved_by_fkey",
    "fk_definition": "FOREIGN KEY (resolved_by) REFERENCES auth.users (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "a"
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_snapshots",
    "constraint_name": "patient_snapshots_author_id_fkey",
    "fk_definition": "FOREIGN KEY (author_id) REFERENCES auth.users (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "a"
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_snapshots",
    "constraint_name": "patient_snapshots_patient_id_fkey",
    "fk_definition": "FOREIGN KEY (patient_id) REFERENCES auth.users (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "c"
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_snapshots",
    "constraint_name": "patient_snapshots_reviewed_by_fkey",
    "fk_definition": "FOREIGN KEY (reviewed_by) REFERENCES auth.users (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "a"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "basal_temperature_logs",
    "constraint_name": "basal_temperature_logs_user_id_fkey",
    "fk_definition": "FOREIGN KEY (user_id) REFERENCES auth.users (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "c"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "clinical_media",
    "constraint_name": "clinical_media_patient_id_fkey",
    "fk_definition": "FOREIGN KEY (patient_id) REFERENCES auth.users (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "c"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "clinical_media",
    "constraint_name": "clinical_media_uploaded_by_fkey",
    "fk_definition": "FOREIGN KEY (uploaded_by) REFERENCES auth.users (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "a"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "clinician_onboarding_data",
    "constraint_name": "clinician_onboarding_data_user_id_fkey",
    "fk_definition": "FOREIGN KEY (user_id) REFERENCES auth.users (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "c"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "clinician_phi",
    "constraint_name": "clinician_phi_user_id_fkey",
    "fk_definition": "FOREIGN KEY (user_id) REFERENCES auth.users (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "c"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "daily_symptom_logs",
    "constraint_name": "daily_symptom_logs_patient_id_fkey",
    "fk_definition": "FOREIGN KEY (patient_id) REFERENCES auth.users (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "c"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "gait_episodes",
    "constraint_name": "gait_episodes_patient_id_fkey",
    "fk_definition": "FOREIGN KEY (patient_id) REFERENCES auth.users (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "c"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "medication_logs",
    "constraint_name": "medication_logs_user_id_fkey",
    "fk_definition": "FOREIGN KEY (user_id) REFERENCES auth.users (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "c"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "medication_logs",
    "constraint_name": "medication_logs_user_medication_id_fkey",
    "fk_definition": "FOREIGN KEY (user_medication_id) REFERENCES private_health_info.user_medications (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "c"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "menstrual_cycle_logs",
    "constraint_name": "menstrual_cycle_logs_user_id_fkey",
    "fk_definition": "FOREIGN KEY (user_id) REFERENCES auth.users (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "c"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "menstrual_log_symptoms",
    "constraint_name": "menstrual_log_symptoms_log_id_fkey",
    "fk_definition": "FOREIGN KEY (log_id) REFERENCES private_health_info.menstrual_cycle_logs (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "c"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "menstrual_log_symptoms",
    "constraint_name": "menstrual_log_symptoms_symptom_id_fkey",
    "fk_definition": "FOREIGN KEY (symptom_id) REFERENCES public.menstrual_symptom_options (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "c"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "patient_onboarding_data",
    "constraint_name": "patient_onboarding_data_user_id_fkey",
    "fk_definition": "FOREIGN KEY (user_id) REFERENCES auth.users (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "c"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "patient_phi",
    "constraint_name": "patient_phi_user_id_fkey",
    "fk_definition": "FOREIGN KEY (user_id) REFERENCES auth.users (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "c"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_events",
    "constraint_name": "seizure_events_patient_id_fkey",
    "fk_definition": "FOREIGN KEY (patient_id) REFERENCES auth.users (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "c"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_generalized_assessment",
    "constraint_name": "seizure_generalized_assessment_log_id_fkey",
    "fk_definition": "FOREIGN KEY (log_id) REFERENCES private_health_info.seizure_logs_research (log_id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "c"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_log_brain_regions",
    "constraint_name": "seizure_log_brain_regions_log_id_fkey",
    "fk_definition": "FOREIGN KEY (log_id) REFERENCES private_health_info.seizure_logs_research (log_id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "c"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_log_brain_regions",
    "constraint_name": "seizure_log_brain_regions_region_id_fkey",
    "fk_definition": "FOREIGN KEY (region_id) REFERENCES public.brain_regions_reference (region_id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "a"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_log_post_ictal_symptoms",
    "constraint_name": "seizure_log_post_ictal_symptoms_log_id_fkey",
    "fk_definition": "FOREIGN KEY (log_id) REFERENCES private_health_info.seizure_logs_research (log_id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "c"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_log_signs",
    "constraint_name": "seizure_log_signs_log_id_fkey",
    "fk_definition": "FOREIGN KEY (log_id) REFERENCES private_health_info.seizure_logs_research (log_id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "c"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_log_signs",
    "constraint_name": "seizure_log_signs_sign_id_fkey",
    "fk_definition": "FOREIGN KEY (sign_id) REFERENCES public.seizure_signs_reference (sign_id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "a"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_log_triggers",
    "constraint_name": "seizure_log_triggers_log_id_fkey",
    "fk_definition": "FOREIGN KEY (log_id) REFERENCES private_health_info.seizure_logs_research (log_id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "c"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_log_triggers",
    "constraint_name": "seizure_log_triggers_trigger_id_fkey",
    "fk_definition": "FOREIGN KEY (trigger_id) REFERENCES public.seizure_triggers_reference (trigger_id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "a"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_logs_research",
    "constraint_name": "seizure_logs_research_user_id_fkey",
    "fk_definition": "FOREIGN KEY (user_id) REFERENCES auth.users (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "c"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "tracking_entries",
    "constraint_name": "tracking_entries_user_id_fkey",
    "fk_definition": "FOREIGN KEY (user_id) REFERENCES auth.users (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "c"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "tremor_episodes",
    "constraint_name": "tremor_episodes_patient_id_fkey",
    "fk_definition": "FOREIGN KEY (patient_id) REFERENCES auth.users (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "c"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "user_conditions",
    "constraint_name": "user_conditions_condition_id_fkey",
    "fk_definition": "FOREIGN KEY (condition_id) REFERENCES public.conditions (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "a"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "user_conditions",
    "constraint_name": "user_conditions_user_id_fkey",
    "fk_definition": "FOREIGN KEY (user_id) REFERENCES auth.users (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "c"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "user_medications",
    "constraint_name": "user_medications_medication_id_fkey",
    "fk_definition": "FOREIGN KEY (medication_id) REFERENCES public.medications (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "a"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "user_medications",
    "constraint_name": "user_medications_user_id_fkey",
    "fk_definition": "FOREIGN KEY (user_id) REFERENCES auth.users (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "c"
  },
  {
    "schema_name": "public",
    "table_name": "audit_log",
    "constraint_name": "audit_log_user_id_fkey",
    "fk_definition": "FOREIGN KEY (user_id) REFERENCES auth.users (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "a"
  },
  {
    "schema_name": "public",
    "table_name": "carer_invitations",
    "constraint_name": "carer_invitations_carer_user_id_fkey",
    "fk_definition": "FOREIGN KEY (carer_user_id) REFERENCES auth.users (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "a"
  },
  {
    "schema_name": "public",
    "table_name": "carer_invitations",
    "constraint_name": "carer_invitations_patient_user_id_fkey",
    "fk_definition": "FOREIGN KEY (patient_user_id) REFERENCES auth.users (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "c"
  },
  {
    "schema_name": "public",
    "table_name": "carer_invitations",
    "constraint_name": "carer_invitations_relationship_id_fkey",
    "fk_definition": "FOREIGN KEY (relationship_id) REFERENCES public.carer_relationships (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "c"
  },
  {
    "schema_name": "public",
    "table_name": "carer_onboarding_data",
    "constraint_name": "carer_onboarding_data_user_id_fkey",
    "fk_definition": "FOREIGN KEY (user_id) REFERENCES auth.users (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "c"
  },
  {
    "schema_name": "public",
    "table_name": "carer_profiles",
    "constraint_name": "carer_profiles_user_id_fkey",
    "fk_definition": "FOREIGN KEY (user_id) REFERENCES auth.users (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "c"
  },
  {
    "schema_name": "public",
    "table_name": "carer_relationships",
    "constraint_name": "carer_relationships_carer_user_id_fkey",
    "fk_definition": "FOREIGN KEY (carer_user_id) REFERENCES auth.users (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "n"
  },
  {
    "schema_name": "public",
    "table_name": "carer_relationships",
    "constraint_name": "carer_relationships_patient_user_id_fkey",
    "fk_definition": "FOREIGN KEY (patient_user_id) REFERENCES auth.users (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "c"
  },
  {
    "schema_name": "public",
    "table_name": "clinician_profiles",
    "constraint_name": "clinician_profiles_user_id_fkey",
    "fk_definition": "FOREIGN KEY (user_id) REFERENCES auth.users (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "c"
  },
  {
    "schema_name": "public",
    "table_name": "daily_tracking_preferences",
    "constraint_name": "daily_tracking_preferences_user_id_fkey",
    "fk_definition": "FOREIGN KEY (user_id) REFERENCES auth.users (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "c"
  },
  {
    "schema_name": "public",
    "table_name": "data_sharing_preferences",
    "constraint_name": "data_sharing_preferences_patient_id_fkey",
    "fk_definition": "FOREIGN KEY (patient_id) REFERENCES auth.users (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "c"
  },
  {
    "schema_name": "public",
    "table_name": "notification_history",
    "constraint_name": "notification_history_user_id_fkey",
    "fk_definition": "FOREIGN KEY (user_id) REFERENCES auth.users (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "c"
  },
  {
    "schema_name": "public",
    "table_name": "notification_preferences",
    "constraint_name": "notification_preferences_user_id_fkey",
    "fk_definition": "FOREIGN KEY (user_id) REFERENCES auth.users (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "c"
  },
  {
    "schema_name": "public",
    "table_name": "notification_queue",
    "constraint_name": "notification_queue_user_id_fkey",
    "fk_definition": "FOREIGN KEY (user_id) REFERENCES auth.users (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "c"
  },
  {
    "schema_name": "public",
    "table_name": "patient_clinician_connections",
    "constraint_name": "patient_clinician_connections_clinician_id_fkey",
    "fk_definition": "FOREIGN KEY (clinician_id) REFERENCES auth.users (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "c"
  },
  {
    "schema_name": "public",
    "table_name": "patient_clinician_connections",
    "constraint_name": "patient_clinician_connections_patient_id_fkey",
    "fk_definition": "FOREIGN KEY (patient_id) REFERENCES auth.users (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "c"
  },
  {
    "schema_name": "public",
    "table_name": "patient_invitations",
    "constraint_name": "patient_invitations_clinician_id_fkey",
    "fk_definition": "FOREIGN KEY (clinician_id) REFERENCES auth.users (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "c"
  },
  {
    "schema_name": "public",
    "table_name": "patient_invitations",
    "constraint_name": "patient_invitations_patient_id_fkey",
    "fk_definition": "FOREIGN KEY (patient_id) REFERENCES auth.users (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "a"
  },
  {
    "schema_name": "public",
    "table_name": "patient_profiles",
    "constraint_name": "patient_profiles_user_id_fkey",
    "fk_definition": "FOREIGN KEY (user_id) REFERENCES auth.users (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "c"
  },
  {
    "schema_name": "public",
    "table_name": "profiles",
    "constraint_name": "profiles_id_fkey",
    "fk_definition": "FOREIGN KEY (id) REFERENCES auth.users (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "c"
  },
  {
    "schema_name": "public",
    "table_name": "pwa_push_subscriptions",
    "constraint_name": "pwa_push_subscriptions_user_id_fkey",
    "fk_definition": "FOREIGN KEY (user_id) REFERENCES auth.users (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "c"
  },
  {
    "schema_name": "public",
    "table_name": "research_consent",
    "constraint_name": "research_consent_user_id_fkey",
    "fk_definition": "FOREIGN KEY (user_id) REFERENCES auth.users (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "c"
  },
  {
    "schema_name": "public",
    "table_name": "research_data_sharing_details",
    "constraint_name": "research_data_sharing_details_user_id_fkey",
    "fk_definition": "FOREIGN KEY (user_id) REFERENCES auth.users (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "c"
  },
  {
    "schema_name": "public",
    "table_name": "researcher_onboarding_data",
    "constraint_name": "researcher_onboarding_data_user_id_fkey",
    "fk_definition": "FOREIGN KEY (user_id) REFERENCES auth.users (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "c"
  },
  {
    "schema_name": "public",
    "table_name": "researcher_profiles",
    "constraint_name": "researcher_profiles_user_id_fkey",
    "fk_definition": "FOREIGN KEY (user_id) REFERENCES auth.users (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "c"
  },
  {
    "schema_name": "public",
    "table_name": "security_incidents",
    "constraint_name": "security_incidents_resolved_by_fkey",
    "fk_definition": "FOREIGN KEY (resolved_by) REFERENCES auth.users (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "a"
  },
  {
    "schema_name": "public",
    "table_name": "security_incidents",
    "constraint_name": "security_incidents_user_id_fkey",
    "fk_definition": "FOREIGN KEY (user_id) REFERENCES auth.users (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "a"
  },
  {
    "schema_name": "public",
    "table_name": "sign_brain_region_mapping",
    "constraint_name": "sign_brain_region_mapping_region_id_fkey",
    "fk_definition": "FOREIGN KEY (region_id) REFERENCES public.brain_regions_reference (region_id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "a"
  },
  {
    "schema_name": "public",
    "table_name": "sign_brain_region_mapping",
    "constraint_name": "sign_brain_region_mapping_sign_id_fkey",
    "fk_definition": "FOREIGN KEY (sign_id) REFERENCES public.seizure_signs_reference (sign_id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "a"
  },
  {
    "schema_name": "public",
    "table_name": "user_achievements",
    "constraint_name": "user_achievements_achievement_id_fkey",
    "fk_definition": "FOREIGN KEY (achievement_id) REFERENCES public.achievements (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "a"
  },
  {
    "schema_name": "public",
    "table_name": "user_achievements",
    "constraint_name": "user_achievements_user_id_fkey",
    "fk_definition": "FOREIGN KEY (user_id) REFERENCES auth.users (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "c"
  },
  {
    "schema_name": "public",
    "table_name": "user_points",
    "constraint_name": "user_points_user_id_fkey",
    "fk_definition": "FOREIGN KEY (user_id) REFERENCES auth.users (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "c"
  },
  {
    "schema_name": "storage",
    "table_name": "objects",
    "constraint_name": "objects_bucketId_fkey",
    "fk_definition": "FOREIGN KEY (bucket_id) REFERENCES storage.buckets (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "a"
  },
  {
    "schema_name": "storage",
    "table_name": "prefixes",
    "constraint_name": "prefixes_bucketId_fkey",
    "fk_definition": "FOREIGN KEY (bucket_id) REFERENCES storage.buckets (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "a"
  },
  {
    "schema_name": "storage",
    "table_name": "s3_multipart_uploads",
    "constraint_name": "s3_multipart_uploads_bucket_id_fkey",
    "fk_definition": "FOREIGN KEY (bucket_id) REFERENCES storage.buckets (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "a"
  },
  {
    "schema_name": "storage",
    "table_name": "s3_multipart_uploads_parts",
    "constraint_name": "s3_multipart_uploads_parts_bucket_id_fkey",
    "fk_definition": "FOREIGN KEY (bucket_id) REFERENCES storage.buckets (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "a"
  },
  {
    "schema_name": "storage",
    "table_name": "s3_multipart_uploads_parts",
    "constraint_name": "s3_multipart_uploads_parts_upload_id_fkey",
    "fk_definition": "FOREIGN KEY (upload_id) REFERENCES storage.s3_multipart_uploads (id)",
    "confmatchtype": "s",
    "confupdtype": "a",
    "confdeltype": "c"
  }
]
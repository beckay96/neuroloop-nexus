[
  {
    "schema_name": "auth",
    "table_name": "audit_log_entries",
    "constraint_name": "audit_log_entries_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "auth",
    "table_name": "flow_state",
    "constraint_name": "flow_state_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "auth",
    "table_name": "identities",
    "constraint_name": "identities_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "auth",
    "table_name": "identities",
    "constraint_name": "identities_provider_id_provider_unique",
    "constraint_type": "u",
    "definition": "UNIQUE (provider_id, provider)"
  },
  {
    "schema_name": "auth",
    "table_name": "instances",
    "constraint_name": "instances_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "auth",
    "table_name": "mfa_amr_claims",
    "constraint_name": "amr_id_pk",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "auth",
    "table_name": "mfa_amr_claims",
    "constraint_name": "mfa_amr_claims_session_id_authentication_method_pkey",
    "constraint_type": "u",
    "definition": "UNIQUE (session_id, authentication_method)"
  },
  {
    "schema_name": "auth",
    "table_name": "mfa_challenges",
    "constraint_name": "mfa_challenges_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "auth",
    "table_name": "mfa_factors",
    "constraint_name": "mfa_factors_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "auth",
    "table_name": "mfa_factors",
    "constraint_name": "mfa_factors_last_challenged_at_key",
    "constraint_type": "u",
    "definition": "UNIQUE (last_challenged_at)"
  },
  {
    "schema_name": "auth",
    "table_name": "oauth_clients",
    "constraint_name": "oauth_clients_client_name_length",
    "constraint_type": "c",
    "definition": "CHECK ((char_length(client_name) <= 1024))"
  },
  {
    "schema_name": "auth",
    "table_name": "oauth_clients",
    "constraint_name": "oauth_clients_client_uri_length",
    "constraint_type": "c",
    "definition": "CHECK ((char_length(client_uri) <= 2048))"
  },
  {
    "schema_name": "auth",
    "table_name": "oauth_clients",
    "constraint_name": "oauth_clients_logo_uri_length",
    "constraint_type": "c",
    "definition": "CHECK ((char_length(logo_uri) <= 2048))"
  },
  {
    "schema_name": "auth",
    "table_name": "oauth_clients",
    "constraint_name": "oauth_clients_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "auth",
    "table_name": "oauth_clients",
    "constraint_name": "oauth_clients_client_id_key",
    "constraint_type": "u",
    "definition": "UNIQUE (client_id)"
  },
  {
    "schema_name": "auth",
    "table_name": "one_time_tokens",
    "constraint_name": "one_time_tokens_token_hash_check",
    "constraint_type": "c",
    "definition": "CHECK ((char_length(token_hash) > 0))"
  },
  {
    "schema_name": "auth",
    "table_name": "one_time_tokens",
    "constraint_name": "one_time_tokens_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "auth",
    "table_name": "refresh_tokens",
    "constraint_name": "refresh_tokens_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "auth",
    "table_name": "refresh_tokens",
    "constraint_name": "refresh_tokens_token_unique",
    "constraint_type": "u",
    "definition": "UNIQUE (token)"
  },
  {
    "schema_name": "auth",
    "table_name": "saml_providers",
    "constraint_name": "entity_id not empty",
    "constraint_type": "c",
    "definition": "CHECK ((char_length(entity_id) > 0))"
  },
  {
    "schema_name": "auth",
    "table_name": "saml_providers",
    "constraint_name": "metadata_url not empty",
    "constraint_type": "c",
    "definition": "CHECK (((metadata_url = NULL::text) OR (char_length(metadata_url) > 0)))"
  },
  {
    "schema_name": "auth",
    "table_name": "saml_providers",
    "constraint_name": "metadata_xml not empty",
    "constraint_type": "c",
    "definition": "CHECK ((char_length(metadata_xml) > 0))"
  },
  {
    "schema_name": "auth",
    "table_name": "saml_providers",
    "constraint_name": "saml_providers_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "auth",
    "table_name": "saml_providers",
    "constraint_name": "saml_providers_entity_id_key",
    "constraint_type": "u",
    "definition": "UNIQUE (entity_id)"
  },
  {
    "schema_name": "auth",
    "table_name": "saml_relay_states",
    "constraint_name": "request_id not empty",
    "constraint_type": "c",
    "definition": "CHECK ((char_length(request_id) > 0))"
  },
  {
    "schema_name": "auth",
    "table_name": "saml_relay_states",
    "constraint_name": "saml_relay_states_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "auth",
    "table_name": "schema_migrations",
    "constraint_name": "schema_migrations_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (version)"
  },
  {
    "schema_name": "auth",
    "table_name": "sessions",
    "constraint_name": "sessions_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "auth",
    "table_name": "sso_domains",
    "constraint_name": "domain not empty",
    "constraint_type": "c",
    "definition": "CHECK ((char_length(domain) > 0))"
  },
  {
    "schema_name": "auth",
    "table_name": "sso_domains",
    "constraint_name": "sso_domains_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "auth",
    "table_name": "sso_providers",
    "constraint_name": "resource_id not empty",
    "constraint_type": "c",
    "definition": "CHECK (((resource_id = NULL::text) OR (char_length(resource_id) > 0)))"
  },
  {
    "schema_name": "auth",
    "table_name": "sso_providers",
    "constraint_name": "sso_providers_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "auth",
    "table_name": "users",
    "constraint_name": "users_email_change_confirm_status_check",
    "constraint_type": "c",
    "definition": "CHECK (((email_change_confirm_status >= 0) AND (email_change_confirm_status <= 2)))"
  },
  {
    "schema_name": "auth",
    "table_name": "users",
    "constraint_name": "users_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "auth",
    "table_name": "users",
    "constraint_name": "users_phone_key",
    "constraint_type": "u",
    "definition": "UNIQUE (phone)"
  },
  {
    "schema_name": "clinical",
    "table_name": "ai_insights_cards",
    "constraint_name": "ai_insights_cards_insight_type_check",
    "constraint_type": "c",
    "definition": "CHECK ((insight_type = ANY (ARRAY['did_you_know'::text, 'impact_metric'::text, 'best_practice'::text, 'alert'::text, 'recommendation'::text])))"
  },
  {
    "schema_name": "clinical",
    "table_name": "ai_insights_cards",
    "constraint_name": "ai_insights_cards_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (insight_id)"
  },
  {
    "schema_name": "clinical",
    "table_name": "case_data_panels",
    "constraint_name": "case_data_panels_panel_type_check",
    "constraint_type": "c",
    "definition": "CHECK ((panel_type = ANY (ARRAY['urgency'::text, 'ai_alerts'::text, 'trends'::text, 'intervention'::text, 'medications'::text, 'vitals'::text, 'labs'::text, 'custom'::text])))"
  },
  {
    "schema_name": "clinical",
    "table_name": "case_data_panels",
    "constraint_name": "case_data_panels_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (panel_id)"
  },
  {
    "schema_name": "clinical",
    "table_name": "clinical_notes_exports",
    "constraint_name": "clinical_notes_exports_format_check",
    "constraint_type": "c",
    "definition": "CHECK ((format = ANY (ARRAY['pdf'::text, 'docx'::text, 'html'::text, 'markdown'::text])))"
  },
  {
    "schema_name": "clinical",
    "table_name": "clinical_notes_exports",
    "constraint_name": "clinical_notes_exports_note_type_check",
    "constraint_type": "c",
    "definition": "CHECK ((note_type = ANY (ARRAY['progress_note'::text, 'consult_letter'::text, 'discharge_summary'::text, 'referral'::text, 'procedure_note'::text, 'other'::text])))"
  },
  {
    "schema_name": "clinical",
    "table_name": "clinical_notes_exports",
    "constraint_name": "clinical_notes_exports_status_check",
    "constraint_type": "c",
    "definition": "CHECK ((status = ANY (ARRAY['draft'::text, 'finalized'::text, 'signed'::text, 'shared'::text, 'archived'::text])))"
  },
  {
    "schema_name": "clinical",
    "table_name": "clinical_notes_exports",
    "constraint_name": "clinical_notes_exports_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (note_id)"
  },
  {
    "schema_name": "clinical",
    "table_name": "clinical_scale_results",
    "constraint_name": "clinical_scale_results_scale_type_check",
    "constraint_type": "c",
    "definition": "CHECK ((scale_type = ANY (ARRAY['MDS-UPDRS'::text, 'MoCA'::text, 'NIHSS'::text, 'MMSE'::text, 'PDQ-39'::text, 'HAMD'::text, 'HAMA'::text, 'EDSS'::text, 'Other'::text])))"
  },
  {
    "schema_name": "clinical",
    "table_name": "clinical_scale_results",
    "constraint_name": "clinical_scale_results_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (scale_id)"
  },
  {
    "schema_name": "clinical",
    "table_name": "clinician_today_view",
    "constraint_name": "clinician_today_view_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (view_id)"
  },
  {
    "schema_name": "clinical",
    "table_name": "clinician_today_view",
    "constraint_name": "clinician_today_view_clinician_id_date_key",
    "constraint_type": "u",
    "definition": "UNIQUE (clinician_id, date)"
  },
  {
    "schema_name": "clinical",
    "table_name": "neuro_imaging_results",
    "constraint_name": "neuro_imaging_results_study_type_check",
    "constraint_type": "c",
    "definition": "CHECK ((study_type = ANY (ARRAY['MRI'::text, 'CT'::text, 'EEG'::text, 'PET'::text, 'SPECT'::text, 'DTI'::text, 'fMRI'::text, 'MEG'::text, 'SEEG'::text, 'Other'::text])))"
  },
  {
    "schema_name": "clinical",
    "table_name": "neuro_imaging_results",
    "constraint_name": "neuro_imaging_results_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (image_id)"
  },
  {
    "schema_name": "clinical",
    "table_name": "neuro_imaging_results",
    "constraint_name": "neuro_imaging_results_dicom_uid_key",
    "constraint_type": "u",
    "definition": "UNIQUE (dicom_uid)"
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_collab_chat",
    "constraint_name": "patient_collab_chat_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (message_id)"
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_pro_timeline",
    "constraint_name": "patient_pro_timeline_collection_method_check",
    "constraint_type": "c",
    "definition": "CHECK ((collection_method = ANY (ARRAY['app'::text, 'wearable'::text, 'manual_entry'::text, 'survey'::text, 'voice'::text])))"
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_pro_timeline",
    "constraint_name": "patient_pro_timeline_pro_type_check",
    "constraint_type": "c",
    "definition": "CHECK ((pro_type = ANY (ARRAY['sleep'::text, 'mood'::text, 'pain'::text, 'fatigue'::text, 'falls'::text, 'side_effects'::text, 'anxiety'::text, 'depression'::text, 'quality_of_life'::text, 'custom'::text])))"
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_pro_timeline",
    "constraint_name": "patient_pro_timeline_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (pro_id)"
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_risk_alerts",
    "constraint_name": "patient_risk_alerts_alert_level_check",
    "constraint_type": "c",
    "definition": "CHECK ((alert_level = ANY (ARRAY['critical'::text, 'high'::text, 'moderate'::text, 'low'::text])))"
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_risk_alerts",
    "constraint_name": "patient_risk_alerts_risk_type_check",
    "constraint_type": "c",
    "definition": "CHECK ((risk_type = ANY (ARRAY['seizure'::text, 'fall'::text, 'hospital'::text, 'med_failure'::text, 'cognitive_decline'::text, 'other'::text])))"
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_risk_alerts",
    "constraint_name": "patient_risk_alerts_status_check",
    "constraint_type": "c",
    "definition": "CHECK ((status = ANY (ARRAY['unread'::text, 'acknowledged'::text, 'in_progress'::text, 'resolved'::text, 'dismissed'::text])))"
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_risk_alerts",
    "constraint_name": "patient_risk_alerts_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (alert_id)"
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_snapshots",
    "constraint_name": "patient_snapshots_author_check",
    "constraint_type": "c",
    "definition": "CHECK ((author = ANY (ARRAY['ai'::text, 'clinician'::text, 'hybrid'::text])))"
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_snapshots",
    "constraint_name": "patient_snapshots_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (snapshot_id)"
  },
  {
    "schema_name": "linkage",
    "table_name": "research_id_map",
    "constraint_name": "research_id_map_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "linkage",
    "table_name": "research_id_map",
    "constraint_name": "research_id_map_research_id_key",
    "constraint_type": "u",
    "definition": "UNIQUE (research_id)"
  },
  {
    "schema_name": "linkage",
    "table_name": "research_id_map",
    "constraint_name": "research_id_map_user_id_key",
    "constraint_type": "u",
    "definition": "UNIQUE (user_id)"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "basal_temperature_logs",
    "constraint_name": "basal_temperature_logs_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "basal_temperature_logs",
    "constraint_name": "basal_temperature_logs_user_id_log_date_key",
    "constraint_type": "u",
    "definition": "UNIQUE (user_id, log_date)"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "clinical_media",
    "constraint_name": "clinical_media_file_type_check",
    "constraint_type": "c",
    "definition": "CHECK ((file_type = ANY (ARRAY['video'::text, 'photo'::text, 'audio'::text, 'document'::text])))"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "clinical_media",
    "constraint_name": "clinical_media_parent_type_check",
    "constraint_type": "c",
    "definition": "CHECK ((parent_type = ANY (ARRAY['seizure_event'::text, 'tremor_episode'::text, 'gait_episode'::text, 'daily_log'::text, 'other'::text])))"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "clinical_media",
    "constraint_name": "clinical_media_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (media_id)"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "clinician_onboarding_data",
    "constraint_name": "clinician_onboarding_data_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "clinician_onboarding_data",
    "constraint_name": "clinician_onboarding_data_user_id_key",
    "constraint_type": "u",
    "definition": "UNIQUE (user_id)"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "clinician_phi",
    "constraint_name": "clinician_phi_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "clinician_phi",
    "constraint_name": "clinician_phi_npi_number_key",
    "constraint_type": "u",
    "definition": "UNIQUE (npi_number)"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "clinician_phi",
    "constraint_name": "clinician_phi_user_id_key",
    "constraint_type": "u",
    "definition": "UNIQUE (user_id)"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "daily_symptom_logs",
    "constraint_name": "daily_symptom_logs_adl_independence_level_check",
    "constraint_type": "c",
    "definition": "CHECK (((adl_independence_level >= 1) AND (adl_independence_level <= 10)))"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "daily_symptom_logs",
    "constraint_name": "daily_symptom_logs_dyskinesia_severity_check",
    "constraint_type": "c",
    "definition": "CHECK (((dyskinesia_severity >= 1) AND (dyskinesia_severity <= 10)))"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "daily_symptom_logs",
    "constraint_name": "daily_symptom_logs_energy_level_check",
    "constraint_type": "c",
    "definition": "CHECK (((energy_level >= 1) AND (energy_level <= 10)))"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "daily_symptom_logs",
    "constraint_name": "daily_symptom_logs_fatigue_level_check",
    "constraint_type": "c",
    "definition": "CHECK (((fatigue_level >= 1) AND (fatigue_level <= 10)))"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "daily_symptom_logs",
    "constraint_name": "daily_symptom_logs_mood_check",
    "constraint_type": "c",
    "definition": "CHECK (((mood >= 1) AND (mood <= 10)))"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "daily_symptom_logs",
    "constraint_name": "daily_symptom_logs_overall_feeling_check",
    "constraint_type": "c",
    "definition": "CHECK (((overall_feeling >= 1) AND (overall_feeling <= 10)))"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "daily_symptom_logs",
    "constraint_name": "daily_symptom_logs_pain_level_check",
    "constraint_type": "c",
    "definition": "CHECK (((pain_level >= 1) AND (pain_level <= 10)))"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "daily_symptom_logs",
    "constraint_name": "daily_symptom_logs_sleep_quality_check",
    "constraint_type": "c",
    "definition": "CHECK (((sleep_quality >= 1) AND (sleep_quality <= 10)))"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "daily_symptom_logs",
    "constraint_name": "daily_symptom_logs_slowness_severity_check",
    "constraint_type": "c",
    "definition": "CHECK (((slowness_severity >= 1) AND (slowness_severity <= 10)))"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "daily_symptom_logs",
    "constraint_name": "daily_symptom_logs_stiffness_severity_check",
    "constraint_type": "c",
    "definition": "CHECK (((stiffness_severity >= 1) AND (stiffness_severity <= 10)))"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "daily_symptom_logs",
    "constraint_name": "daily_symptom_logs_stress_level_check",
    "constraint_type": "c",
    "definition": "CHECK (((stress_level >= 1) AND (stress_level <= 10)))"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "daily_symptom_logs",
    "constraint_name": "daily_symptom_logs_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (log_id)"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "daily_symptom_logs",
    "constraint_name": "daily_symptom_logs_patient_id_log_date_key",
    "constraint_type": "u",
    "definition": "UNIQUE (patient_id, log_date)"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "gait_episodes",
    "constraint_name": "gait_episodes_event_type_check",
    "constraint_type": "c",
    "definition": "CHECK ((event_type = ANY (ARRAY['freezing'::text, 'festination'::text, 'shuffling'::text, 'imbalance'::text, 'fall'::text, 'near_fall'::text, 'difficulty_turning'::text, 'difficulty_starting'::text, 'other'::text])))"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "gait_episodes",
    "constraint_name": "gait_episodes_fall_direction_check",
    "constraint_type": "c",
    "definition": "CHECK ((fall_direction = ANY (ARRAY['forward'::text, 'backward'::text, 'sideways_left'::text, 'sideways_right'::text, 'unknown'::text])))"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "gait_episodes",
    "constraint_name": "gait_episodes_freezing_trigger_check",
    "constraint_type": "c",
    "definition": "CHECK ((freezing_trigger = ANY (ARRAY['doorway'::text, 'turn'::text, 'narrow_space'::text, 'dual_task'::text, 'anxiety'::text, 'crowded'::text, 'start_walking'::text, 'other'::text])))"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "gait_episodes",
    "constraint_name": "gait_episodes_medication_status_check",
    "constraint_type": "c",
    "definition": "CHECK ((medication_status = ANY (ARRAY['on'::text, 'off'::text, 'wearing_off'::text, 'unknown'::text])))"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "gait_episodes",
    "constraint_name": "gait_episodes_severity_check",
    "constraint_type": "c",
    "definition": "CHECK (((severity >= 1) AND (severity <= 10)))"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "gait_episodes",
    "constraint_name": "gait_episodes_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (gait_id)"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "medication_logs",
    "constraint_name": "medication_logs_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "menstrual_cycle_logs",
    "constraint_name": "menstrual_cycle_logs_overall_symptom_severity_check",
    "constraint_type": "c",
    "definition": "CHECK (((overall_symptom_severity >= 1) AND (overall_symptom_severity <= 10)))"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "menstrual_cycle_logs",
    "constraint_name": "valid_cycle_dates",
    "constraint_type": "c",
    "definition": "CHECK (((cycle_end_date IS NULL) OR (cycle_end_date >= cycle_start_date)))"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "menstrual_cycle_logs",
    "constraint_name": "valid_cycle_length",
    "constraint_type": "c",
    "definition": "CHECK (((cycle_length_days IS NULL) OR ((cycle_length_days > 0) AND (cycle_length_days <= 60))))"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "menstrual_cycle_logs",
    "constraint_name": "valid_seizure_count",
    "constraint_type": "c",
    "definition": "CHECK ((seizure_count_during_cycle >= 0))"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "menstrual_cycle_logs",
    "constraint_name": "menstrual_cycle_logs_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "menstrual_log_symptoms",
    "constraint_name": "menstrual_log_symptoms_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "menstrual_log_symptoms",
    "constraint_name": "unique_symptom_per_log",
    "constraint_type": "u",
    "definition": "UNIQUE (log_id, symptom_id)"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "patient_onboarding_data",
    "constraint_name": "patient_onboarding_data_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "patient_onboarding_data",
    "constraint_name": "patient_onboarding_data_user_id_key",
    "constraint_type": "u",
    "definition": "UNIQUE (user_id)"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "patient_phi",
    "constraint_name": "patient_phi_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "patient_phi",
    "constraint_name": "patient_phi_user_id_key",
    "constraint_type": "u",
    "definition": "UNIQUE (user_id)"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_events",
    "constraint_name": "seizure_events_consciousness_level_check",
    "constraint_type": "c",
    "definition": "CHECK ((consciousness_level = ANY (ARRAY['fully_conscious'::text, 'impaired_awareness'::text, 'unconscious'::text, 'unknown'::text])))"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_events",
    "constraint_name": "seizure_events_seizure_type_check",
    "constraint_type": "c",
    "definition": "CHECK ((seizure_type = ANY (ARRAY['absence'::text, 'tonic_clonic'::text, 'tonic'::text, 'clonic'::text, 'myoclonic'::text, 'atonic'::text, 'focal_aware'::text, 'focal_impaired_awareness'::text, 'focal_to_bilateral_tonic_clonic'::text, 'unknown'::text, 'other'::text])))"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_events",
    "constraint_name": "seizure_events_severity_check",
    "constraint_type": "c",
    "definition": "CHECK (((severity >= 1) AND (severity <= 10)))"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_events",
    "constraint_name": "seizure_events_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (event_id)"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_generalized_assessment",
    "constraint_name": "seizure_generalized_assessment_classifier_basis_check",
    "constraint_type": "c",
    "definition": "CHECK ((char_length(classifier_basis) <= 255))"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_generalized_assessment",
    "constraint_name": "seizure_generalized_assessment_confidence_score_check",
    "constraint_type": "c",
    "definition": "CHECK (((confidence_score >= 0) AND (confidence_score <= 100)))"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_generalized_assessment",
    "constraint_name": "seizure_generalized_assessment_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_generalized_assessment",
    "constraint_name": "seizure_generalized_assessment_log_id_key",
    "constraint_type": "u",
    "definition": "UNIQUE (log_id)"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_log_brain_regions",
    "constraint_name": "seizure_log_brain_regions_calculated_probability_check",
    "constraint_type": "c",
    "definition": "CHECK (((calculated_probability >= 0) AND (calculated_probability <= 100)))"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_log_brain_regions",
    "constraint_name": "seizure_log_brain_regions_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_log_brain_regions",
    "constraint_name": "seizure_log_brain_regions_log_id_region_id_key",
    "constraint_type": "u",
    "definition": "UNIQUE (log_id, region_id)"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_log_post_ictal_symptoms",
    "constraint_name": "seizure_log_post_ictal_symptoms_severity_check",
    "constraint_type": "c",
    "definition": "CHECK (((severity >= 1) AND (severity <= 10)))"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_log_post_ictal_symptoms",
    "constraint_name": "seizure_log_post_ictal_symptoms_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_log_post_ictal_symptoms",
    "constraint_name": "seizure_log_post_ictal_symptoms_log_id_symptom_key",
    "constraint_type": "u",
    "definition": "UNIQUE (log_id, symptom)"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_log_signs",
    "constraint_name": "seizure_log_signs_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_log_signs",
    "constraint_name": "seizure_log_signs_log_id_sign_id_key",
    "constraint_type": "u",
    "definition": "UNIQUE (log_id, sign_id)"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_log_triggers",
    "constraint_name": "seizure_log_triggers_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_log_triggers",
    "constraint_name": "seizure_log_triggers_log_id_trigger_id_key",
    "constraint_type": "u",
    "definition": "UNIQUE (log_id, trigger_id)"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_logs_research",
    "constraint_name": "seizure_logs_research_aura_description_check",
    "constraint_type": "c",
    "definition": "CHECK ((char_length(aura_description) <= 255))"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_logs_research",
    "constraint_name": "seizure_logs_research_notes_check",
    "constraint_type": "c",
    "definition": "CHECK ((char_length(notes) <= 255))"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_logs_research",
    "constraint_name": "seizure_logs_research_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (log_id)"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "tracking_entries",
    "constraint_name": "tracking_entries_severity_check",
    "constraint_type": "c",
    "definition": "CHECK (((severity >= 1) AND (severity <= 10)))"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "tracking_entries",
    "constraint_name": "tracking_entries_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "tremor_episodes",
    "constraint_name": "tremor_episodes_dominant_side_check",
    "constraint_type": "c",
    "definition": "CHECK ((dominant_side = ANY (ARRAY['left'::text, 'right'::text, 'bilateral'::text, 'none'::text])))"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "tremor_episodes",
    "constraint_name": "tremor_episodes_medication_status_check",
    "constraint_type": "c",
    "definition": "CHECK ((medication_status = ANY (ARRAY['on'::text, 'off'::text, 'wearing_off'::text, 'unknown'::text])))"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "tremor_episodes",
    "constraint_name": "tremor_episodes_occurred_during_check",
    "constraint_type": "c",
    "definition": "CHECK ((occurred_during = ANY (ARRAY['rest'::text, 'movement'::text, 'holding_position'::text, 'reaching'::text, 'writing'::text, 'eating'::text, 'other'::text])))"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "tremor_episodes",
    "constraint_name": "tremor_episodes_severity_check",
    "constraint_type": "c",
    "definition": "CHECK (((severity >= 1) AND (severity <= 10)))"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "tremor_episodes",
    "constraint_name": "tremor_episodes_tremor_type_check",
    "constraint_type": "c",
    "definition": "CHECK ((tremor_type = ANY (ARRAY['resting'::text, 'action'::text, 'postural'::text, 'intention'::text, 'kinetic'::text, 'other'::text])))"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "tremor_episodes",
    "constraint_name": "tremor_episodes_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (tremor_id)"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "user_conditions",
    "constraint_name": "user_conditions_severity_check",
    "constraint_type": "c",
    "definition": "CHECK (((severity >= 1) AND (severity <= 5)))"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "user_conditions",
    "constraint_name": "user_conditions_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "user_conditions",
    "constraint_name": "user_conditions_user_id_condition_id_key",
    "constraint_type": "u",
    "definition": "UNIQUE (user_id, condition_id)"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "user_medications",
    "constraint_name": "user_medications_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "protected",
    "table_name": "system_settings",
    "constraint_name": "system_settings_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (key)"
  },
  {
    "schema_name": "public",
    "table_name": "achievements",
    "constraint_name": "achievements_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "achievements",
    "constraint_name": "achievements_name_key",
    "constraint_type": "u",
    "definition": "UNIQUE (name)"
  },
  {
    "schema_name": "public",
    "table_name": "api_request_logs",
    "constraint_name": "api_request_logs_method_check",
    "constraint_type": "c",
    "definition": "CHECK ((method = ANY (ARRAY['GET'::text, 'POST'::text, 'PUT'::text, 'PATCH'::text, 'DELETE'::text])))"
  },
  {
    "schema_name": "public",
    "table_name": "api_request_logs",
    "constraint_name": "api_request_logs_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "audit_log",
    "constraint_name": "audit_log_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "brain_regions_reference",
    "constraint_name": "brain_regions_reference_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (region_id)"
  },
  {
    "schema_name": "public",
    "table_name": "carer_invitations",
    "constraint_name": "carer_invitations_status_check",
    "constraint_type": "c",
    "definition": "CHECK ((status = ANY (ARRAY['pending'::text, 'verification_required'::text, 'accepted'::text, 'expired'::text, 'cancelled'::text, 'verification_failed'::text])))"
  },
  {
    "schema_name": "public",
    "table_name": "carer_invitations",
    "constraint_name": "carer_invitations_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "carer_invitations",
    "constraint_name": "carer_invitations_invitation_token_key",
    "constraint_type": "u",
    "definition": "UNIQUE (invitation_token)"
  },
  {
    "schema_name": "public",
    "table_name": "carer_onboarding_data",
    "constraint_name": "carer_onboarding_data_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "carer_onboarding_data",
    "constraint_name": "carer_onboarding_data_user_id_key",
    "constraint_type": "u",
    "definition": "UNIQUE (user_id)"
  },
  {
    "schema_name": "public",
    "table_name": "carer_profiles",
    "constraint_name": "carer_profiles_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "carer_profiles",
    "constraint_name": "carer_profiles_user_id_key",
    "constraint_type": "u",
    "definition": "UNIQUE (user_id)"
  },
  {
    "schema_name": "public",
    "table_name": "carer_relationships",
    "constraint_name": "carer_relationships_relationship_type_check",
    "constraint_type": "c",
    "definition": "CHECK ((relationship_type = ANY (ARRAY['parent'::text, 'spouse'::text, 'partner'::text, 'child'::text, 'sibling'::text, 'friend'::text, 'caregiver'::text, 'other'::text])))"
  },
  {
    "schema_name": "public",
    "table_name": "carer_relationships",
    "constraint_name": "carer_relationships_status_check",
    "constraint_type": "c",
    "definition": "CHECK ((status = ANY (ARRAY['pending'::text, 'active'::text, 'suspended'::text, 'terminated'::text])))"
  },
  {
    "schema_name": "public",
    "table_name": "carer_relationships",
    "constraint_name": "carer_relationships_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "clinician_profiles",
    "constraint_name": "clinician_profiles_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "clinician_profiles",
    "constraint_name": "clinician_profiles_user_id_key",
    "constraint_type": "u",
    "definition": "UNIQUE (user_id)"
  },
  {
    "schema_name": "public",
    "table_name": "conditions",
    "constraint_name": "conditions_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "daily_tracking_preferences",
    "constraint_name": "daily_tracking_preferences_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "daily_tracking_preferences",
    "constraint_name": "daily_tracking_preferences_user_id_key",
    "constraint_type": "u",
    "definition": "UNIQUE (user_id)"
  },
  {
    "schema_name": "public",
    "table_name": "data_sharing_preferences",
    "constraint_name": "data_sharing_preferences_daily_logs_visibility_check",
    "constraint_type": "c",
    "definition": "CHECK ((daily_logs_visibility = ANY (ARRAY['private'::text, 'clinician_only'::text, 'clinician_carer'::text, 'all'::text])))"
  },
  {
    "schema_name": "public",
    "table_name": "data_sharing_preferences",
    "constraint_name": "data_sharing_preferences_gait_episodes_visibility_check",
    "constraint_type": "c",
    "definition": "CHECK ((gait_episodes_visibility = ANY (ARRAY['private'::text, 'clinician_only'::text, 'clinician_carer'::text, 'all'::text])))"
  },
  {
    "schema_name": "public",
    "table_name": "data_sharing_preferences",
    "constraint_name": "data_sharing_preferences_media_visibility_check",
    "constraint_type": "c",
    "definition": "CHECK ((media_visibility = ANY (ARRAY['private'::text, 'clinician_only'::text, 'clinician_carer'::text, 'all'::text])))"
  },
  {
    "schema_name": "public",
    "table_name": "data_sharing_preferences",
    "constraint_name": "data_sharing_preferences_medications_visibility_check",
    "constraint_type": "c",
    "definition": "CHECK ((medications_visibility = ANY (ARRAY['private'::text, 'clinician_only'::text, 'clinician_carer'::text, 'all'::text])))"
  },
  {
    "schema_name": "public",
    "table_name": "data_sharing_preferences",
    "constraint_name": "data_sharing_preferences_seizure_events_visibility_check",
    "constraint_type": "c",
    "definition": "CHECK ((seizure_events_visibility = ANY (ARRAY['private'::text, 'clinician_only'::text, 'clinician_carer'::text, 'all'::text])))"
  },
  {
    "schema_name": "public",
    "table_name": "data_sharing_preferences",
    "constraint_name": "data_sharing_preferences_tremor_episodes_visibility_check",
    "constraint_type": "c",
    "definition": "CHECK ((tremor_episodes_visibility = ANY (ARRAY['private'::text, 'clinician_only'::text, 'clinician_carer'::text, 'all'::text])))"
  },
  {
    "schema_name": "public",
    "table_name": "data_sharing_preferences",
    "constraint_name": "data_sharing_preferences_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "data_sharing_preferences",
    "constraint_name": "data_sharing_preferences_patient_id_key",
    "constraint_type": "u",
    "definition": "UNIQUE (patient_id)"
  },
  {
    "schema_name": "public",
    "table_name": "database_operation_logs",
    "constraint_name": "database_operation_logs_operation_type_check",
    "constraint_type": "c",
    "definition": "CHECK ((operation_type = ANY (ARRAY['CREATE'::text, 'ALTER'::text, 'DROP'::text, 'INSERT'::text, 'UPDATE'::text, 'DELETE'::text, 'TRUNCATE'::text])))"
  },
  {
    "schema_name": "public",
    "table_name": "database_operation_logs",
    "constraint_name": "database_operation_logs_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "function_execution_logs",
    "constraint_name": "function_execution_logs_execution_status_check",
    "constraint_type": "c",
    "definition": "CHECK ((execution_status = ANY (ARRAY['started'::text, 'completed'::text, 'failed'::text, 'timeout'::text])))"
  },
  {
    "schema_name": "public",
    "table_name": "function_execution_logs",
    "constraint_name": "function_execution_logs_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "medications",
    "constraint_name": "medications_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "menstrual_symptom_options",
    "constraint_name": "menstrual_symptom_options_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "notification_history",
    "constraint_name": "notification_history_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "notification_preferences",
    "constraint_name": "notification_preferences_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "notification_preferences",
    "constraint_name": "notification_preferences_user_id_key",
    "constraint_type": "u",
    "definition": "UNIQUE (user_id)"
  },
  {
    "schema_name": "public",
    "table_name": "notification_queue",
    "constraint_name": "notification_queue_notification_type_check",
    "constraint_type": "c",
    "definition": "CHECK ((notification_type = ANY (ARRAY['medication_reminder'::text, 'appointment_reminder'::text, 'daily_checkin'::text, 'critical_alert'::text, 'pattern_alert'::text, 'achievement'::text, 'message'::text, 'system'::text])))"
  },
  {
    "schema_name": "public",
    "table_name": "notification_queue",
    "constraint_name": "notification_queue_priority_check",
    "constraint_type": "c",
    "definition": "CHECK ((priority = ANY (ARRAY['low'::text, 'normal'::text, 'high'::text, 'critical'::text])))"
  },
  {
    "schema_name": "public",
    "table_name": "notification_queue",
    "constraint_name": "notification_queue_status_check",
    "constraint_type": "c",
    "definition": "CHECK ((status = ANY (ARRAY['pending'::text, 'sent'::text, 'failed'::text, 'cancelled'::text])))"
  },
  {
    "schema_name": "public",
    "table_name": "notification_queue",
    "constraint_name": "notification_queue_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "patient_clinician_connections",
    "constraint_name": "patient_clinician_connections_access_level_check",
    "constraint_type": "c",
    "definition": "CHECK ((access_level = ANY (ARRAY['full'::text, 'limited'::text, 'view_only'::text])))"
  },
  {
    "schema_name": "public",
    "table_name": "patient_clinician_connections",
    "constraint_name": "patient_clinician_connections_status_check",
    "constraint_type": "c",
    "definition": "CHECK ((status = ANY (ARRAY['pending'::text, 'active'::text, 'suspended'::text, 'terminated'::text])))"
  },
  {
    "schema_name": "public",
    "table_name": "patient_clinician_connections",
    "constraint_name": "patient_clinician_connections_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "patient_clinician_connections",
    "constraint_name": "patient_clinician_connections_patient_id_clinician_id_key",
    "constraint_type": "u",
    "definition": "UNIQUE (patient_id, clinician_id)"
  },
  {
    "schema_name": "public",
    "table_name": "patient_invitations",
    "constraint_name": "patient_invitations_status_check",
    "constraint_type": "c",
    "definition": "CHECK ((status = ANY (ARRAY['pending'::text, 'accepted'::text, 'expired'::text, 'cancelled'::text])))"
  },
  {
    "schema_name": "public",
    "table_name": "patient_invitations",
    "constraint_name": "patient_invitations_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "patient_invitations",
    "constraint_name": "patient_invitations_invitation_token_key",
    "constraint_type": "u",
    "definition": "UNIQUE (invitation_token)"
  },
  {
    "schema_name": "public",
    "table_name": "patient_profiles",
    "constraint_name": "patient_profiles_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "patient_profiles",
    "constraint_name": "patient_profiles_user_id_key",
    "constraint_type": "u",
    "definition": "UNIQUE (user_id)"
  },
  {
    "schema_name": "public",
    "table_name": "profiles",
    "constraint_name": "profiles_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "pwa_push_subscriptions",
    "constraint_name": "pwa_push_subscriptions_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "pwa_push_subscriptions",
    "constraint_name": "pwa_push_subscriptions_user_id_endpoint_key",
    "constraint_type": "u",
    "definition": "UNIQUE (user_id, endpoint)"
  },
  {
    "schema_name": "public",
    "table_name": "research_consent",
    "constraint_name": "research_consent_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "research_data_sharing_details",
    "constraint_name": "research_data_sharing_details_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "research_data_sharing_details",
    "constraint_name": "research_data_sharing_details_user_id_key",
    "constraint_type": "u",
    "definition": "UNIQUE (user_id)"
  },
  {
    "schema_name": "public",
    "table_name": "researcher_onboarding_data",
    "constraint_name": "researcher_onboarding_data_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "researcher_onboarding_data",
    "constraint_name": "researcher_onboarding_data_user_id_key",
    "constraint_type": "u",
    "definition": "UNIQUE (user_id)"
  },
  {
    "schema_name": "public",
    "table_name": "researcher_profiles",
    "constraint_name": "researcher_profiles_access_level_check",
    "constraint_type": "c",
    "definition": "CHECK ((access_level = ANY (ARRAY['basic'::text, 'advanced'::text, 'admin'::text])))"
  },
  {
    "schema_name": "public",
    "table_name": "researcher_profiles",
    "constraint_name": "researcher_profiles_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "researcher_profiles",
    "constraint_name": "researcher_profiles_user_id_key",
    "constraint_type": "u",
    "definition": "UNIQUE (user_id)"
  },
  {
    "schema_name": "public",
    "table_name": "security_incidents",
    "constraint_name": "security_incidents_incident_type_check",
    "constraint_type": "c",
    "definition": "CHECK ((incident_type = ANY (ARRAY['suspicious_access'::text, 'excessive_queries'::text, 'failed_authentication'::text, 'data_breach_attempt'::text, 'unauthorized_access'::text, 'failed_dob_verification'::text, 'other'::text])))"
  },
  {
    "schema_name": "public",
    "table_name": "security_incidents",
    "constraint_name": "security_incidents_severity_check",
    "constraint_type": "c",
    "definition": "CHECK ((severity = ANY (ARRAY['low'::text, 'medium'::text, 'high'::text, 'critical'::text])))"
  },
  {
    "schema_name": "public",
    "table_name": "security_incidents",
    "constraint_name": "security_incidents_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "seizure_signs_reference",
    "constraint_name": "seizure_signs_reference_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (sign_id)"
  },
  {
    "schema_name": "public",
    "table_name": "seizure_signs_reference",
    "constraint_name": "seizure_signs_reference_sign_name_key",
    "constraint_type": "u",
    "definition": "UNIQUE (sign_name)"
  },
  {
    "schema_name": "public",
    "table_name": "seizure_triggers_reference",
    "constraint_name": "seizure_triggers_reference_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (trigger_id)"
  },
  {
    "schema_name": "public",
    "table_name": "seizure_triggers_reference",
    "constraint_name": "seizure_triggers_reference_trigger_type_key",
    "constraint_type": "u",
    "definition": "UNIQUE (trigger_type)"
  },
  {
    "schema_name": "public",
    "table_name": "sign_brain_region_mapping",
    "constraint_name": "sign_brain_region_mapping_probability_percentage_check",
    "constraint_type": "c",
    "definition": "CHECK (((probability_percentage >= 0) AND (probability_percentage <= 100)))"
  },
  {
    "schema_name": "public",
    "table_name": "sign_brain_region_mapping",
    "constraint_name": "sign_brain_region_mapping_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "sign_brain_region_mapping",
    "constraint_name": "sign_brain_region_mapping_sign_id_region_id_key",
    "constraint_type": "u",
    "definition": "UNIQUE (sign_id, region_id)"
  },
  {
    "schema_name": "public",
    "table_name": "symptom_options",
    "constraint_name": "symptom_options_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "system_logs",
    "constraint_name": "system_logs_log_level_check",
    "constraint_type": "c",
    "definition": "CHECK ((log_level = ANY (ARRAY['DEBUG'::text, 'INFO'::text, 'WARNING'::text, 'ERROR'::text, 'CRITICAL'::text])))"
  },
  {
    "schema_name": "public",
    "table_name": "system_logs",
    "constraint_name": "valid_log_level",
    "constraint_type": "c",
    "definition": "CHECK ((log_level = ANY (ARRAY['DEBUG'::text, 'INFO'::text, 'WARNING'::text, 'ERROR'::text, 'CRITICAL'::text])))"
  },
  {
    "schema_name": "public",
    "table_name": "system_logs",
    "constraint_name": "system_logs_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "trigger_options",
    "constraint_name": "trigger_options_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "user_achievements",
    "constraint_name": "user_achievements_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "user_achievements",
    "constraint_name": "user_achievements_user_id_achievement_id_key",
    "constraint_type": "u",
    "definition": "UNIQUE (user_id, achievement_id)"
  },
  {
    "schema_name": "public",
    "table_name": "user_points",
    "constraint_name": "user_points_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "user_points",
    "constraint_name": "user_points_user_id_key",
    "constraint_type": "u",
    "definition": "UNIQUE (user_id)"
  },
  {
    "schema_name": "realtime",
    "table_name": "messages",
    "constraint_name": "messages_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (id, inserted_at)"
  },
  {
    "schema_name": "realtime",
    "table_name": "schema_migrations",
    "constraint_name": "schema_migrations_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (version)"
  },
  {
    "schema_name": "realtime",
    "table_name": "subscription",
    "constraint_name": "pk_subscription",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "research",
    "table_name": "daily_symptom_logs",
    "constraint_name": "daily_symptom_logs_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (log_id)"
  },
  {
    "schema_name": "research",
    "table_name": "daily_symptom_logs",
    "constraint_name": "daily_symptom_logs_research_id_log_date_key",
    "constraint_type": "u",
    "definition": "UNIQUE (research_id, log_date)"
  },
  {
    "schema_name": "research",
    "table_name": "gait_episodes",
    "constraint_name": "gait_episodes_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (gait_id)"
  },
  {
    "schema_name": "research",
    "table_name": "seizure_events",
    "constraint_name": "seizure_events_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (event_id)"
  },
  {
    "schema_name": "research",
    "table_name": "tremor_episodes",
    "constraint_name": "tremor_episodes_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (tremor_id)"
  },
  {
    "schema_name": "storage",
    "table_name": "buckets",
    "constraint_name": "buckets_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "storage",
    "table_name": "buckets_analytics",
    "constraint_name": "buckets_analytics_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "storage",
    "table_name": "migrations",
    "constraint_name": "migrations_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "storage",
    "table_name": "migrations",
    "constraint_name": "migrations_name_key",
    "constraint_type": "u",
    "definition": "UNIQUE (name)"
  },
  {
    "schema_name": "storage",
    "table_name": "objects",
    "constraint_name": "objects_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "storage",
    "table_name": "prefixes",
    "constraint_name": "prefixes_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (bucket_id, level, name)"
  },
  {
    "schema_name": "storage",
    "table_name": "s3_multipart_uploads",
    "constraint_name": "s3_multipart_uploads_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "storage",
    "table_name": "s3_multipart_uploads_parts",
    "constraint_name": "s3_multipart_uploads_parts_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "supabase_migrations",
    "table_name": "schema_migrations",
    "constraint_name": "schema_migrations_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (version)"
  },
  {
    "schema_name": "supabase_migrations",
    "table_name": "schema_migrations",
    "constraint_name": "schema_migrations_idempotency_key_key",
    "constraint_type": "u",
    "definition": "UNIQUE (idempotency_key)"
  },
  {
    "schema_name": "supabase_migrations",
    "table_name": "seed_files",
    "constraint_name": "seed_files_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (path)"
  },
  {
    "schema_name": "vault",
    "table_name": "secrets",
    "constraint_name": "secrets_pkey",
    "constraint_type": "p",
    "definition": "PRIMARY KEY (id)"
  }
]
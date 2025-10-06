[
  {
    "schema_name": "auth",
    "table_name": "audit_log_entries",
    "index_name": "audit_log_entries_pkey",
    "index_def": "CREATE UNIQUE INDEX audit_log_entries_pkey ON auth.audit_log_entries USING btree (id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "auth",
    "table_name": "audit_log_entries",
    "index_name": "audit_logs_instance_id_idx",
    "index_def": "CREATE INDEX audit_logs_instance_id_idx ON auth.audit_log_entries USING btree (instance_id)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "auth",
    "table_name": "flow_state",
    "index_name": "flow_state_created_at_idx",
    "index_def": "CREATE INDEX flow_state_created_at_idx ON auth.flow_state USING btree (created_at DESC)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "auth",
    "table_name": "flow_state",
    "index_name": "flow_state_pkey",
    "index_def": "CREATE UNIQUE INDEX flow_state_pkey ON auth.flow_state USING btree (id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "auth",
    "table_name": "flow_state",
    "index_name": "idx_auth_code",
    "index_def": "CREATE INDEX idx_auth_code ON auth.flow_state USING btree (auth_code)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "auth",
    "table_name": "flow_state",
    "index_name": "idx_user_id_auth_method",
    "index_def": "CREATE INDEX idx_user_id_auth_method ON auth.flow_state USING btree (user_id, authentication_method)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "auth",
    "table_name": "identities",
    "index_name": "identities_email_idx",
    "index_def": "CREATE INDEX identities_email_idx ON auth.identities USING btree (email text_pattern_ops)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "auth",
    "table_name": "identities",
    "index_name": "identities_pkey",
    "index_def": "CREATE UNIQUE INDEX identities_pkey ON auth.identities USING btree (id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "auth",
    "table_name": "identities",
    "index_name": "identities_provider_id_provider_unique",
    "index_def": "CREATE UNIQUE INDEX identities_provider_id_provider_unique ON auth.identities USING btree (provider_id, provider)",
    "is_unique": true,
    "is_primary": false
  },
  {
    "schema_name": "auth",
    "table_name": "identities",
    "index_name": "identities_user_id_idx",
    "index_def": "CREATE INDEX identities_user_id_idx ON auth.identities USING btree (user_id)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "auth",
    "table_name": "instances",
    "index_name": "instances_pkey",
    "index_def": "CREATE UNIQUE INDEX instances_pkey ON auth.instances USING btree (id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "auth",
    "table_name": "mfa_amr_claims",
    "index_name": "amr_id_pk",
    "index_def": "CREATE UNIQUE INDEX amr_id_pk ON auth.mfa_amr_claims USING btree (id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "auth",
    "table_name": "mfa_amr_claims",
    "index_name": "mfa_amr_claims_session_id_authentication_method_pkey",
    "index_def": "CREATE UNIQUE INDEX mfa_amr_claims_session_id_authentication_method_pkey ON auth.mfa_amr_claims USING btree (session_id, authentication_method)",
    "is_unique": true,
    "is_primary": false
  },
  {
    "schema_name": "auth",
    "table_name": "mfa_challenges",
    "index_name": "mfa_challenge_created_at_idx",
    "index_def": "CREATE INDEX mfa_challenge_created_at_idx ON auth.mfa_challenges USING btree (created_at DESC)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "auth",
    "table_name": "mfa_challenges",
    "index_name": "mfa_challenges_pkey",
    "index_def": "CREATE UNIQUE INDEX mfa_challenges_pkey ON auth.mfa_challenges USING btree (id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "auth",
    "table_name": "mfa_factors",
    "index_name": "factor_id_created_at_idx",
    "index_def": "CREATE INDEX factor_id_created_at_idx ON auth.mfa_factors USING btree (user_id, created_at)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "auth",
    "table_name": "mfa_factors",
    "index_name": "mfa_factors_last_challenged_at_key",
    "index_def": "CREATE UNIQUE INDEX mfa_factors_last_challenged_at_key ON auth.mfa_factors USING btree (last_challenged_at)",
    "is_unique": true,
    "is_primary": false
  },
  {
    "schema_name": "auth",
    "table_name": "mfa_factors",
    "index_name": "mfa_factors_pkey",
    "index_def": "CREATE UNIQUE INDEX mfa_factors_pkey ON auth.mfa_factors USING btree (id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "auth",
    "table_name": "mfa_factors",
    "index_name": "mfa_factors_user_friendly_name_unique",
    "index_def": "CREATE UNIQUE INDEX mfa_factors_user_friendly_name_unique ON auth.mfa_factors USING btree (friendly_name, user_id) WHERE (TRIM(BOTH FROM friendly_name) <> ''::text)",
    "is_unique": true,
    "is_primary": false
  },
  {
    "schema_name": "auth",
    "table_name": "mfa_factors",
    "index_name": "mfa_factors_user_id_idx",
    "index_def": "CREATE INDEX mfa_factors_user_id_idx ON auth.mfa_factors USING btree (user_id)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "auth",
    "table_name": "mfa_factors",
    "index_name": "unique_phone_factor_per_user",
    "index_def": "CREATE UNIQUE INDEX unique_phone_factor_per_user ON auth.mfa_factors USING btree (user_id, phone)",
    "is_unique": true,
    "is_primary": false
  },
  {
    "schema_name": "auth",
    "table_name": "oauth_clients",
    "index_name": "oauth_clients_client_id_idx",
    "index_def": "CREATE INDEX oauth_clients_client_id_idx ON auth.oauth_clients USING btree (client_id)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "auth",
    "table_name": "oauth_clients",
    "index_name": "oauth_clients_client_id_key",
    "index_def": "CREATE UNIQUE INDEX oauth_clients_client_id_key ON auth.oauth_clients USING btree (client_id)",
    "is_unique": true,
    "is_primary": false
  },
  {
    "schema_name": "auth",
    "table_name": "oauth_clients",
    "index_name": "oauth_clients_deleted_at_idx",
    "index_def": "CREATE INDEX oauth_clients_deleted_at_idx ON auth.oauth_clients USING btree (deleted_at)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "auth",
    "table_name": "oauth_clients",
    "index_name": "oauth_clients_pkey",
    "index_def": "CREATE UNIQUE INDEX oauth_clients_pkey ON auth.oauth_clients USING btree (id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "auth",
    "table_name": "one_time_tokens",
    "index_name": "one_time_tokens_pkey",
    "index_def": "CREATE UNIQUE INDEX one_time_tokens_pkey ON auth.one_time_tokens USING btree (id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "auth",
    "table_name": "one_time_tokens",
    "index_name": "one_time_tokens_relates_to_hash_idx",
    "index_def": "CREATE INDEX one_time_tokens_relates_to_hash_idx ON auth.one_time_tokens USING hash (relates_to)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "auth",
    "table_name": "one_time_tokens",
    "index_name": "one_time_tokens_token_hash_hash_idx",
    "index_def": "CREATE INDEX one_time_tokens_token_hash_hash_idx ON auth.one_time_tokens USING hash (token_hash)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "auth",
    "table_name": "one_time_tokens",
    "index_name": "one_time_tokens_user_id_token_type_key",
    "index_def": "CREATE UNIQUE INDEX one_time_tokens_user_id_token_type_key ON auth.one_time_tokens USING btree (user_id, token_type)",
    "is_unique": true,
    "is_primary": false
  },
  {
    "schema_name": "auth",
    "table_name": "refresh_tokens",
    "index_name": "refresh_tokens_instance_id_idx",
    "index_def": "CREATE INDEX refresh_tokens_instance_id_idx ON auth.refresh_tokens USING btree (instance_id)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "auth",
    "table_name": "refresh_tokens",
    "index_name": "refresh_tokens_instance_id_user_id_idx",
    "index_def": "CREATE INDEX refresh_tokens_instance_id_user_id_idx ON auth.refresh_tokens USING btree (instance_id, user_id)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "auth",
    "table_name": "refresh_tokens",
    "index_name": "refresh_tokens_parent_idx",
    "index_def": "CREATE INDEX refresh_tokens_parent_idx ON auth.refresh_tokens USING btree (parent)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "auth",
    "table_name": "refresh_tokens",
    "index_name": "refresh_tokens_pkey",
    "index_def": "CREATE UNIQUE INDEX refresh_tokens_pkey ON auth.refresh_tokens USING btree (id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "auth",
    "table_name": "refresh_tokens",
    "index_name": "refresh_tokens_session_id_revoked_idx",
    "index_def": "CREATE INDEX refresh_tokens_session_id_revoked_idx ON auth.refresh_tokens USING btree (session_id, revoked)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "auth",
    "table_name": "refresh_tokens",
    "index_name": "refresh_tokens_token_unique",
    "index_def": "CREATE UNIQUE INDEX refresh_tokens_token_unique ON auth.refresh_tokens USING btree (token)",
    "is_unique": true,
    "is_primary": false
  },
  {
    "schema_name": "auth",
    "table_name": "refresh_tokens",
    "index_name": "refresh_tokens_updated_at_idx",
    "index_def": "CREATE INDEX refresh_tokens_updated_at_idx ON auth.refresh_tokens USING btree (updated_at DESC)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "auth",
    "table_name": "saml_providers",
    "index_name": "saml_providers_entity_id_key",
    "index_def": "CREATE UNIQUE INDEX saml_providers_entity_id_key ON auth.saml_providers USING btree (entity_id)",
    "is_unique": true,
    "is_primary": false
  },
  {
    "schema_name": "auth",
    "table_name": "saml_providers",
    "index_name": "saml_providers_pkey",
    "index_def": "CREATE UNIQUE INDEX saml_providers_pkey ON auth.saml_providers USING btree (id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "auth",
    "table_name": "saml_providers",
    "index_name": "saml_providers_sso_provider_id_idx",
    "index_def": "CREATE INDEX saml_providers_sso_provider_id_idx ON auth.saml_providers USING btree (sso_provider_id)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "auth",
    "table_name": "saml_relay_states",
    "index_name": "saml_relay_states_created_at_idx",
    "index_def": "CREATE INDEX saml_relay_states_created_at_idx ON auth.saml_relay_states USING btree (created_at DESC)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "auth",
    "table_name": "saml_relay_states",
    "index_name": "saml_relay_states_for_email_idx",
    "index_def": "CREATE INDEX saml_relay_states_for_email_idx ON auth.saml_relay_states USING btree (for_email)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "auth",
    "table_name": "saml_relay_states",
    "index_name": "saml_relay_states_pkey",
    "index_def": "CREATE UNIQUE INDEX saml_relay_states_pkey ON auth.saml_relay_states USING btree (id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "auth",
    "table_name": "saml_relay_states",
    "index_name": "saml_relay_states_sso_provider_id_idx",
    "index_def": "CREATE INDEX saml_relay_states_sso_provider_id_idx ON auth.saml_relay_states USING btree (sso_provider_id)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "auth",
    "table_name": "schema_migrations",
    "index_name": "schema_migrations_pkey",
    "index_def": "CREATE UNIQUE INDEX schema_migrations_pkey ON auth.schema_migrations USING btree (version)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "auth",
    "table_name": "sessions",
    "index_name": "sessions_not_after_idx",
    "index_def": "CREATE INDEX sessions_not_after_idx ON auth.sessions USING btree (not_after DESC)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "auth",
    "table_name": "sessions",
    "index_name": "sessions_pkey",
    "index_def": "CREATE UNIQUE INDEX sessions_pkey ON auth.sessions USING btree (id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "auth",
    "table_name": "sessions",
    "index_name": "sessions_user_id_idx",
    "index_def": "CREATE INDEX sessions_user_id_idx ON auth.sessions USING btree (user_id)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "auth",
    "table_name": "sessions",
    "index_name": "user_id_created_at_idx",
    "index_def": "CREATE INDEX user_id_created_at_idx ON auth.sessions USING btree (user_id, created_at)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "auth",
    "table_name": "sso_domains",
    "index_name": "sso_domains_domain_idx",
    "index_def": "CREATE UNIQUE INDEX sso_domains_domain_idx ON auth.sso_domains USING btree (lower(domain))",
    "is_unique": true,
    "is_primary": false
  },
  {
    "schema_name": "auth",
    "table_name": "sso_domains",
    "index_name": "sso_domains_pkey",
    "index_def": "CREATE UNIQUE INDEX sso_domains_pkey ON auth.sso_domains USING btree (id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "auth",
    "table_name": "sso_domains",
    "index_name": "sso_domains_sso_provider_id_idx",
    "index_def": "CREATE INDEX sso_domains_sso_provider_id_idx ON auth.sso_domains USING btree (sso_provider_id)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "auth",
    "table_name": "sso_providers",
    "index_name": "sso_providers_pkey",
    "index_def": "CREATE UNIQUE INDEX sso_providers_pkey ON auth.sso_providers USING btree (id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "auth",
    "table_name": "sso_providers",
    "index_name": "sso_providers_resource_id_idx",
    "index_def": "CREATE UNIQUE INDEX sso_providers_resource_id_idx ON auth.sso_providers USING btree (lower(resource_id))",
    "is_unique": true,
    "is_primary": false
  },
  {
    "schema_name": "auth",
    "table_name": "sso_providers",
    "index_name": "sso_providers_resource_id_pattern_idx",
    "index_def": "CREATE INDEX sso_providers_resource_id_pattern_idx ON auth.sso_providers USING btree (resource_id text_pattern_ops)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "auth",
    "table_name": "users",
    "index_name": "confirmation_token_idx",
    "index_def": "CREATE UNIQUE INDEX confirmation_token_idx ON auth.users USING btree (confirmation_token) WHERE ((confirmation_token)::text !~ '^[0-9 ]*$'::text)",
    "is_unique": true,
    "is_primary": false
  },
  {
    "schema_name": "auth",
    "table_name": "users",
    "index_name": "email_change_token_current_idx",
    "index_def": "CREATE UNIQUE INDEX email_change_token_current_idx ON auth.users USING btree (email_change_token_current) WHERE ((email_change_token_current)::text !~ '^[0-9 ]*$'::text)",
    "is_unique": true,
    "is_primary": false
  },
  {
    "schema_name": "auth",
    "table_name": "users",
    "index_name": "email_change_token_new_idx",
    "index_def": "CREATE UNIQUE INDEX email_change_token_new_idx ON auth.users USING btree (email_change_token_new) WHERE ((email_change_token_new)::text !~ '^[0-9 ]*$'::text)",
    "is_unique": true,
    "is_primary": false
  },
  {
    "schema_name": "auth",
    "table_name": "users",
    "index_name": "reauthentication_token_idx",
    "index_def": "CREATE UNIQUE INDEX reauthentication_token_idx ON auth.users USING btree (reauthentication_token) WHERE ((reauthentication_token)::text !~ '^[0-9 ]*$'::text)",
    "is_unique": true,
    "is_primary": false
  },
  {
    "schema_name": "auth",
    "table_name": "users",
    "index_name": "recovery_token_idx",
    "index_def": "CREATE UNIQUE INDEX recovery_token_idx ON auth.users USING btree (recovery_token) WHERE ((recovery_token)::text !~ '^[0-9 ]*$'::text)",
    "is_unique": true,
    "is_primary": false
  },
  {
    "schema_name": "auth",
    "table_name": "users",
    "index_name": "users_email_partial_key",
    "index_def": "CREATE UNIQUE INDEX users_email_partial_key ON auth.users USING btree (email) WHERE (is_sso_user = false)",
    "is_unique": true,
    "is_primary": false
  },
  {
    "schema_name": "auth",
    "table_name": "users",
    "index_name": "users_instance_id_email_idx",
    "index_def": "CREATE INDEX users_instance_id_email_idx ON auth.users USING btree (instance_id, lower((email)::text))",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "auth",
    "table_name": "users",
    "index_name": "users_instance_id_idx",
    "index_def": "CREATE INDEX users_instance_id_idx ON auth.users USING btree (instance_id)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "auth",
    "table_name": "users",
    "index_name": "users_is_anonymous_idx",
    "index_def": "CREATE INDEX users_is_anonymous_idx ON auth.users USING btree (is_anonymous)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "auth",
    "table_name": "users",
    "index_name": "users_phone_key",
    "index_def": "CREATE UNIQUE INDEX users_phone_key ON auth.users USING btree (phone)",
    "is_unique": true,
    "is_primary": false
  },
  {
    "schema_name": "auth",
    "table_name": "users",
    "index_name": "users_pkey",
    "index_def": "CREATE UNIQUE INDEX users_pkey ON auth.users USING btree (id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "clinical",
    "table_name": "ai_insights_cards",
    "index_name": "ai_insights_cards_pkey",
    "index_def": "CREATE UNIQUE INDEX ai_insights_cards_pkey ON clinical.ai_insights_cards USING btree (insight_id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "clinical",
    "table_name": "ai_insights_cards",
    "index_name": "idx_insights_clinician",
    "index_def": "CREATE INDEX idx_insights_clinician ON clinical.ai_insights_cards USING btree (clinician_id)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "clinical",
    "table_name": "ai_insights_cards",
    "index_name": "idx_insights_generated",
    "index_def": "CREATE INDEX idx_insights_generated ON clinical.ai_insights_cards USING btree (generated_at DESC)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "clinical",
    "table_name": "ai_insights_cards",
    "index_name": "idx_insights_unread",
    "index_def": "CREATE INDEX idx_insights_unread ON clinical.ai_insights_cards USING btree (is_read) WHERE (is_read = false)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "clinical",
    "table_name": "case_data_panels",
    "index_name": "case_data_panels_pkey",
    "index_def": "CREATE UNIQUE INDEX case_data_panels_pkey ON clinical.case_data_panels USING btree (panel_id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "clinical",
    "table_name": "case_data_panels",
    "index_name": "idx_panels_patient",
    "index_def": "CREATE INDEX idx_panels_patient ON clinical.case_data_panels USING btree (patient_id)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "clinical",
    "table_name": "case_data_panels",
    "index_name": "idx_panels_type",
    "index_def": "CREATE INDEX idx_panels_type ON clinical.case_data_panels USING btree (panel_type)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "clinical",
    "table_name": "case_data_panels",
    "index_name": "idx_panels_visible",
    "index_def": "CREATE INDEX idx_panels_visible ON clinical.case_data_panels USING btree (is_visible) WHERE (is_visible = true)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "clinical",
    "table_name": "clinical_notes_exports",
    "index_name": "clinical_notes_exports_pkey",
    "index_def": "CREATE UNIQUE INDEX clinical_notes_exports_pkey ON clinical.clinical_notes_exports USING btree (note_id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "clinical",
    "table_name": "clinical_notes_exports",
    "index_name": "idx_notes_author",
    "index_def": "CREATE INDEX idx_notes_author ON clinical.clinical_notes_exports USING btree (author_id)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "clinical",
    "table_name": "clinical_notes_exports",
    "index_name": "idx_notes_generated",
    "index_def": "CREATE INDEX idx_notes_generated ON clinical.clinical_notes_exports USING btree (generated_at DESC)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "clinical",
    "table_name": "clinical_notes_exports",
    "index_name": "idx_notes_patient",
    "index_def": "CREATE INDEX idx_notes_patient ON clinical.clinical_notes_exports USING btree (patient_id)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "clinical",
    "table_name": "clinical_notes_exports",
    "index_name": "idx_notes_status",
    "index_def": "CREATE INDEX idx_notes_status ON clinical.clinical_notes_exports USING btree (status)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "clinical",
    "table_name": "clinical_scale_results",
    "index_name": "clinical_scale_results_pkey",
    "index_def": "CREATE UNIQUE INDEX clinical_scale_results_pkey ON clinical.clinical_scale_results USING btree (scale_id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "clinical",
    "table_name": "clinical_scale_results",
    "index_name": "idx_scale_results_assessed",
    "index_def": "CREATE INDEX idx_scale_results_assessed ON clinical.clinical_scale_results USING btree (assessed_at DESC)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "clinical",
    "table_name": "clinical_scale_results",
    "index_name": "idx_scale_results_change_alert",
    "index_def": "CREATE INDEX idx_scale_results_change_alert ON clinical.clinical_scale_results USING btree (change_alert) WHERE (change_alert = true)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "clinical",
    "table_name": "clinical_scale_results",
    "index_name": "idx_scale_results_patient",
    "index_def": "CREATE INDEX idx_scale_results_patient ON clinical.clinical_scale_results USING btree (patient_id)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "clinical",
    "table_name": "clinical_scale_results",
    "index_name": "idx_scale_results_type",
    "index_def": "CREATE INDEX idx_scale_results_type ON clinical.clinical_scale_results USING btree (scale_type)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "clinical",
    "table_name": "clinician_today_view",
    "index_name": "clinician_today_view_clinician_id_date_key",
    "index_def": "CREATE UNIQUE INDEX clinician_today_view_clinician_id_date_key ON clinical.clinician_today_view USING btree (clinician_id, date)",
    "is_unique": true,
    "is_primary": false
  },
  {
    "schema_name": "clinical",
    "table_name": "clinician_today_view",
    "index_name": "clinician_today_view_pkey",
    "index_def": "CREATE UNIQUE INDEX clinician_today_view_pkey ON clinical.clinician_today_view USING btree (view_id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "clinical",
    "table_name": "clinician_today_view",
    "index_name": "idx_today_view_clinician",
    "index_def": "CREATE INDEX idx_today_view_clinician ON clinical.clinician_today_view USING btree (clinician_id)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "clinical",
    "table_name": "clinician_today_view",
    "index_name": "idx_today_view_date",
    "index_def": "CREATE INDEX idx_today_view_date ON clinical.clinician_today_view USING btree (date DESC)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "clinical",
    "table_name": "neuro_imaging_results",
    "index_name": "idx_imaging_critical",
    "index_def": "CREATE INDEX idx_imaging_critical ON clinical.neuro_imaging_results USING btree (critical_findings) WHERE (critical_findings = true)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "clinical",
    "table_name": "neuro_imaging_results",
    "index_name": "idx_imaging_date",
    "index_def": "CREATE INDEX idx_imaging_date ON clinical.neuro_imaging_results USING btree (study_date DESC)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "clinical",
    "table_name": "neuro_imaging_results",
    "index_name": "idx_imaging_patient",
    "index_def": "CREATE INDEX idx_imaging_patient ON clinical.neuro_imaging_results USING btree (patient_id)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "clinical",
    "table_name": "neuro_imaging_results",
    "index_name": "idx_imaging_type",
    "index_def": "CREATE INDEX idx_imaging_type ON clinical.neuro_imaging_results USING btree (study_type)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "clinical",
    "table_name": "neuro_imaging_results",
    "index_name": "neuro_imaging_results_dicom_uid_key",
    "index_def": "CREATE UNIQUE INDEX neuro_imaging_results_dicom_uid_key ON clinical.neuro_imaging_results USING btree (dicom_uid)",
    "is_unique": true,
    "is_primary": false
  },
  {
    "schema_name": "clinical",
    "table_name": "neuro_imaging_results",
    "index_name": "neuro_imaging_results_pkey",
    "index_def": "CREATE UNIQUE INDEX neuro_imaging_results_pkey ON clinical.neuro_imaging_results USING btree (image_id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_collab_chat",
    "index_name": "idx_chat_patient",
    "index_def": "CREATE INDEX idx_chat_patient ON clinical.patient_collab_chat USING btree (patient_id)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_collab_chat",
    "index_name": "idx_chat_sender",
    "index_def": "CREATE INDEX idx_chat_sender ON clinical.patient_collab_chat USING btree (sender_id)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_collab_chat",
    "index_name": "idx_chat_sent",
    "index_def": "CREATE INDEX idx_chat_sent ON clinical.patient_collab_chat USING btree (sent_at DESC)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_collab_chat",
    "index_name": "idx_chat_thread",
    "index_def": "CREATE INDEX idx_chat_thread ON clinical.patient_collab_chat USING btree (thread_id)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_collab_chat",
    "index_name": "idx_chat_urgent",
    "index_def": "CREATE INDEX idx_chat_urgent ON clinical.patient_collab_chat USING btree (is_urgent) WHERE (is_urgent = true)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_collab_chat",
    "index_name": "patient_collab_chat_pkey",
    "index_def": "CREATE UNIQUE INDEX patient_collab_chat_pkey ON clinical.patient_collab_chat USING btree (message_id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_pro_timeline",
    "index_name": "idx_pro_patient",
    "index_def": "CREATE INDEX idx_pro_patient ON clinical.patient_pro_timeline USING btree (patient_id)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_pro_timeline",
    "index_name": "idx_pro_reported",
    "index_def": "CREATE INDEX idx_pro_reported ON clinical.patient_pro_timeline USING btree (reported_at DESC)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_pro_timeline",
    "index_name": "idx_pro_type",
    "index_def": "CREATE INDEX idx_pro_type ON clinical.patient_pro_timeline USING btree (pro_type)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_pro_timeline",
    "index_name": "patient_pro_timeline_pkey",
    "index_def": "CREATE UNIQUE INDEX patient_pro_timeline_pkey ON clinical.patient_pro_timeline USING btree (pro_id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_risk_alerts",
    "index_name": "idx_risk_alerts_created",
    "index_def": "CREATE INDEX idx_risk_alerts_created ON clinical.patient_risk_alerts USING btree (created_at DESC)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_risk_alerts",
    "index_name": "idx_risk_alerts_level",
    "index_def": "CREATE INDEX idx_risk_alerts_level ON clinical.patient_risk_alerts USING btree (alert_level)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_risk_alerts",
    "index_name": "idx_risk_alerts_patient",
    "index_def": "CREATE INDEX idx_risk_alerts_patient ON clinical.patient_risk_alerts USING btree (patient_id)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_risk_alerts",
    "index_name": "idx_risk_alerts_status",
    "index_def": "CREATE INDEX idx_risk_alerts_status ON clinical.patient_risk_alerts USING btree (status)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_risk_alerts",
    "index_name": "patient_risk_alerts_pkey",
    "index_def": "CREATE UNIQUE INDEX patient_risk_alerts_pkey ON clinical.patient_risk_alerts USING btree (alert_id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_snapshots",
    "index_name": "idx_snapshots_generated",
    "index_def": "CREATE INDEX idx_snapshots_generated ON clinical.patient_snapshots USING btree (generated_at DESC)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_snapshots",
    "index_name": "idx_snapshots_patient",
    "index_def": "CREATE INDEX idx_snapshots_patient ON clinical.patient_snapshots USING btree (patient_id)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_snapshots",
    "index_name": "idx_snapshots_pinned",
    "index_def": "CREATE INDEX idx_snapshots_pinned ON clinical.patient_snapshots USING btree (is_pinned) WHERE (is_pinned = true)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_snapshots",
    "index_name": "patient_snapshots_pkey",
    "index_def": "CREATE UNIQUE INDEX patient_snapshots_pkey ON clinical.patient_snapshots USING btree (snapshot_id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "linkage",
    "table_name": "research_id_map",
    "index_name": "idx_research_map_research",
    "index_def": "CREATE INDEX idx_research_map_research ON linkage.research_id_map USING btree (research_id)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "linkage",
    "table_name": "research_id_map",
    "index_name": "idx_research_map_user",
    "index_def": "CREATE INDEX idx_research_map_user ON linkage.research_id_map USING btree (user_id)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "linkage",
    "table_name": "research_id_map",
    "index_name": "research_id_map_pkey",
    "index_def": "CREATE UNIQUE INDEX research_id_map_pkey ON linkage.research_id_map USING btree (id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "linkage",
    "table_name": "research_id_map",
    "index_name": "research_id_map_research_id_key",
    "index_def": "CREATE UNIQUE INDEX research_id_map_research_id_key ON linkage.research_id_map USING btree (research_id)",
    "is_unique": true,
    "is_primary": false
  },
  {
    "schema_name": "linkage",
    "table_name": "research_id_map",
    "index_name": "research_id_map_user_id_key",
    "index_def": "CREATE UNIQUE INDEX research_id_map_user_id_key ON linkage.research_id_map USING btree (user_id)",
    "is_unique": true,
    "is_primary": false
  },
  {
    "schema_name": "private_health_info",
    "table_name": "basal_temperature_logs",
    "index_name": "basal_temperature_logs_pkey",
    "index_def": "CREATE UNIQUE INDEX basal_temperature_logs_pkey ON private_health_info.basal_temperature_logs USING btree (id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "private_health_info",
    "table_name": "basal_temperature_logs",
    "index_name": "basal_temperature_logs_user_id_log_date_key",
    "index_def": "CREATE UNIQUE INDEX basal_temperature_logs_user_id_log_date_key ON private_health_info.basal_temperature_logs USING btree (user_id, log_date)",
    "is_unique": true,
    "is_primary": false
  },
  {
    "schema_name": "private_health_info",
    "table_name": "clinical_media",
    "index_name": "clinical_media_pkey",
    "index_def": "CREATE UNIQUE INDEX clinical_media_pkey ON private_health_info.clinical_media USING btree (media_id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "private_health_info",
    "table_name": "clinical_media",
    "index_name": "idx_clinical_media_parent",
    "index_def": "CREATE INDEX idx_clinical_media_parent ON private_health_info.clinical_media USING btree (parent_type, parent_id)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "private_health_info",
    "table_name": "clinical_media",
    "index_name": "idx_clinical_media_patient",
    "index_def": "CREATE INDEX idx_clinical_media_patient ON private_health_info.clinical_media USING btree (patient_id)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "private_health_info",
    "table_name": "clinician_onboarding_data",
    "index_name": "clinician_onboarding_data_pkey",
    "index_def": "CREATE UNIQUE INDEX clinician_onboarding_data_pkey ON private_health_info.clinician_onboarding_data USING btree (id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "private_health_info",
    "table_name": "clinician_onboarding_data",
    "index_name": "clinician_onboarding_data_user_id_key",
    "index_def": "CREATE UNIQUE INDEX clinician_onboarding_data_user_id_key ON private_health_info.clinician_onboarding_data USING btree (user_id)",
    "is_unique": true,
    "is_primary": false
  },
  {
    "schema_name": "private_health_info",
    "table_name": "clinician_phi",
    "index_name": "clinician_phi_npi_number_key",
    "index_def": "CREATE UNIQUE INDEX clinician_phi_npi_number_key ON private_health_info.clinician_phi USING btree (npi_number)",
    "is_unique": true,
    "is_primary": false
  },
  {
    "schema_name": "private_health_info",
    "table_name": "clinician_phi",
    "index_name": "clinician_phi_pkey",
    "index_def": "CREATE UNIQUE INDEX clinician_phi_pkey ON private_health_info.clinician_phi USING btree (id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "private_health_info",
    "table_name": "clinician_phi",
    "index_name": "clinician_phi_user_id_key",
    "index_def": "CREATE UNIQUE INDEX clinician_phi_user_id_key ON private_health_info.clinician_phi USING btree (user_id)",
    "is_unique": true,
    "is_primary": false
  },
  {
    "schema_name": "private_health_info",
    "table_name": "clinician_phi",
    "index_name": "idx_clinician_phi_npi",
    "index_def": "CREATE UNIQUE INDEX idx_clinician_phi_npi ON private_health_info.clinician_phi USING btree (npi_number) WHERE (npi_number IS NOT NULL)",
    "is_unique": true,
    "is_primary": false
  },
  {
    "schema_name": "private_health_info",
    "table_name": "clinician_phi",
    "index_name": "idx_clinician_phi_user",
    "index_def": "CREATE INDEX idx_clinician_phi_user ON private_health_info.clinician_phi USING btree (user_id)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "private_health_info",
    "table_name": "daily_symptom_logs",
    "index_name": "daily_symptom_logs_patient_id_log_date_key",
    "index_def": "CREATE UNIQUE INDEX daily_symptom_logs_patient_id_log_date_key ON private_health_info.daily_symptom_logs USING btree (patient_id, log_date)",
    "is_unique": true,
    "is_primary": false
  },
  {
    "schema_name": "private_health_info",
    "table_name": "daily_symptom_logs",
    "index_name": "daily_symptom_logs_pkey",
    "index_def": "CREATE UNIQUE INDEX daily_symptom_logs_pkey ON private_health_info.daily_symptom_logs USING btree (log_id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "private_health_info",
    "table_name": "daily_symptom_logs",
    "index_name": "idx_daily_logs_date",
    "index_def": "CREATE INDEX idx_daily_logs_date ON private_health_info.daily_symptom_logs USING btree (log_date DESC)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "private_health_info",
    "table_name": "daily_symptom_logs",
    "index_name": "idx_daily_logs_patient",
    "index_def": "CREATE INDEX idx_daily_logs_patient ON private_health_info.daily_symptom_logs USING btree (patient_id)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "private_health_info",
    "table_name": "gait_episodes",
    "index_name": "gait_episodes_pkey",
    "index_def": "CREATE UNIQUE INDEX gait_episodes_pkey ON private_health_info.gait_episodes USING btree (gait_id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "private_health_info",
    "table_name": "gait_episodes",
    "index_name": "idx_gait_episodes_occurred",
    "index_def": "CREATE INDEX idx_gait_episodes_occurred ON private_health_info.gait_episodes USING btree (occurred_at DESC)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "private_health_info",
    "table_name": "gait_episodes",
    "index_name": "idx_gait_episodes_patient",
    "index_def": "CREATE INDEX idx_gait_episodes_patient ON private_health_info.gait_episodes USING btree (patient_id)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "private_health_info",
    "table_name": "gait_episodes",
    "index_name": "idx_gait_episodes_type",
    "index_def": "CREATE INDEX idx_gait_episodes_type ON private_health_info.gait_episodes USING btree (event_type)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "private_health_info",
    "table_name": "medication_logs",
    "index_name": "medication_logs_pkey",
    "index_def": "CREATE UNIQUE INDEX medication_logs_pkey ON private_health_info.medication_logs USING btree (id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "private_health_info",
    "table_name": "menstrual_cycle_logs",
    "index_name": "idx_menstrual_logs_catamenial",
    "index_def": "CREATE INDEX idx_menstrual_logs_catamenial ON private_health_info.menstrual_cycle_logs USING btree (user_id, catamenial_pattern_suspected) WHERE (catamenial_pattern_suspected = true)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "private_health_info",
    "table_name": "menstrual_cycle_logs",
    "index_name": "idx_menstrual_logs_cycle_date",
    "index_def": "CREATE INDEX idx_menstrual_logs_cycle_date ON private_health_info.menstrual_cycle_logs USING btree (cycle_start_date)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "private_health_info",
    "table_name": "menstrual_cycle_logs",
    "index_name": "idx_menstrual_logs_user_id",
    "index_def": "CREATE INDEX idx_menstrual_logs_user_id ON private_health_info.menstrual_cycle_logs USING btree (user_id)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "private_health_info",
    "table_name": "menstrual_cycle_logs",
    "index_name": "menstrual_cycle_logs_pkey",
    "index_def": "CREATE UNIQUE INDEX menstrual_cycle_logs_pkey ON private_health_info.menstrual_cycle_logs USING btree (id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "private_health_info",
    "table_name": "menstrual_log_symptoms",
    "index_name": "idx_menstrual_log_symptoms_log_id",
    "index_def": "CREATE INDEX idx_menstrual_log_symptoms_log_id ON private_health_info.menstrual_log_symptoms USING btree (log_id)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "private_health_info",
    "table_name": "menstrual_log_symptoms",
    "index_name": "menstrual_log_symptoms_pkey",
    "index_def": "CREATE UNIQUE INDEX menstrual_log_symptoms_pkey ON private_health_info.menstrual_log_symptoms USING btree (id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "private_health_info",
    "table_name": "menstrual_log_symptoms",
    "index_name": "unique_symptom_per_log",
    "index_def": "CREATE UNIQUE INDEX unique_symptom_per_log ON private_health_info.menstrual_log_symptoms USING btree (log_id, symptom_id)",
    "is_unique": true,
    "is_primary": false
  },
  {
    "schema_name": "private_health_info",
    "table_name": "patient_onboarding_data",
    "index_name": "patient_onboarding_data_pkey",
    "index_def": "CREATE UNIQUE INDEX patient_onboarding_data_pkey ON private_health_info.patient_onboarding_data USING btree (id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "private_health_info",
    "table_name": "patient_onboarding_data",
    "index_name": "patient_onboarding_data_user_id_key",
    "index_def": "CREATE UNIQUE INDEX patient_onboarding_data_user_id_key ON private_health_info.patient_onboarding_data USING btree (user_id)",
    "is_unique": true,
    "is_primary": false
  },
  {
    "schema_name": "private_health_info",
    "table_name": "patient_phi",
    "index_name": "idx_patient_phi_user",
    "index_def": "CREATE INDEX idx_patient_phi_user ON private_health_info.patient_phi USING btree (user_id)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "private_health_info",
    "table_name": "patient_phi",
    "index_name": "patient_phi_pkey",
    "index_def": "CREATE UNIQUE INDEX patient_phi_pkey ON private_health_info.patient_phi USING btree (id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "private_health_info",
    "table_name": "patient_phi",
    "index_name": "patient_phi_user_id_key",
    "index_def": "CREATE UNIQUE INDEX patient_phi_user_id_key ON private_health_info.patient_phi USING btree (user_id)",
    "is_unique": true,
    "is_primary": false
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_events",
    "index_name": "idx_seizure_events_occurred",
    "index_def": "CREATE INDEX idx_seizure_events_occurred ON private_health_info.seizure_events USING btree (occurred_at DESC)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_events",
    "index_name": "idx_seizure_events_patient",
    "index_def": "CREATE INDEX idx_seizure_events_patient ON private_health_info.seizure_events USING btree (patient_id)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_events",
    "index_name": "idx_seizure_events_type",
    "index_def": "CREATE INDEX idx_seizure_events_type ON private_health_info.seizure_events USING btree (seizure_type)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_events",
    "index_name": "seizure_events_pkey",
    "index_def": "CREATE UNIQUE INDEX seizure_events_pkey ON private_health_info.seizure_events USING btree (event_id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_generalized_assessment",
    "index_name": "seizure_generalized_assessment_log_id_key",
    "index_def": "CREATE UNIQUE INDEX seizure_generalized_assessment_log_id_key ON private_health_info.seizure_generalized_assessment USING btree (log_id)",
    "is_unique": true,
    "is_primary": false
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_generalized_assessment",
    "index_name": "seizure_generalized_assessment_pkey",
    "index_def": "CREATE UNIQUE INDEX seizure_generalized_assessment_pkey ON private_health_info.seizure_generalized_assessment USING btree (id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_log_brain_regions",
    "index_name": "seizure_log_brain_regions_log_id_region_id_key",
    "index_def": "CREATE UNIQUE INDEX seizure_log_brain_regions_log_id_region_id_key ON private_health_info.seizure_log_brain_regions USING btree (log_id, region_id)",
    "is_unique": true,
    "is_primary": false
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_log_brain_regions",
    "index_name": "seizure_log_brain_regions_pkey",
    "index_def": "CREATE UNIQUE INDEX seizure_log_brain_regions_pkey ON private_health_info.seizure_log_brain_regions USING btree (id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_log_post_ictal_symptoms",
    "index_name": "seizure_log_post_ictal_symptoms_log_id_symptom_key",
    "index_def": "CREATE UNIQUE INDEX seizure_log_post_ictal_symptoms_log_id_symptom_key ON private_health_info.seizure_log_post_ictal_symptoms USING btree (log_id, symptom)",
    "is_unique": true,
    "is_primary": false
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_log_post_ictal_symptoms",
    "index_name": "seizure_log_post_ictal_symptoms_pkey",
    "index_def": "CREATE UNIQUE INDEX seizure_log_post_ictal_symptoms_pkey ON private_health_info.seizure_log_post_ictal_symptoms USING btree (id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_log_signs",
    "index_name": "idx_seizure_log_signs_log_id",
    "index_def": "CREATE INDEX idx_seizure_log_signs_log_id ON private_health_info.seizure_log_signs USING btree (log_id)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_log_signs",
    "index_name": "idx_seizure_log_signs_sign_id",
    "index_def": "CREATE INDEX idx_seizure_log_signs_sign_id ON private_health_info.seizure_log_signs USING btree (sign_id)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_log_signs",
    "index_name": "seizure_log_signs_log_id_sign_id_key",
    "index_def": "CREATE UNIQUE INDEX seizure_log_signs_log_id_sign_id_key ON private_health_info.seizure_log_signs USING btree (log_id, sign_id)",
    "is_unique": true,
    "is_primary": false
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_log_signs",
    "index_name": "seizure_log_signs_pkey",
    "index_def": "CREATE UNIQUE INDEX seizure_log_signs_pkey ON private_health_info.seizure_log_signs USING btree (id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_log_triggers",
    "index_name": "seizure_log_triggers_log_id_trigger_id_key",
    "index_def": "CREATE UNIQUE INDEX seizure_log_triggers_log_id_trigger_id_key ON private_health_info.seizure_log_triggers USING btree (log_id, trigger_id)",
    "is_unique": true,
    "is_primary": false
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_log_triggers",
    "index_name": "seizure_log_triggers_pkey",
    "index_def": "CREATE UNIQUE INDEX seizure_log_triggers_pkey ON private_health_info.seizure_log_triggers USING btree (id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_logs_research",
    "index_name": "idx_seizure_logs_research_log_date",
    "index_def": "CREATE INDEX idx_seizure_logs_research_log_date ON private_health_info.seizure_logs_research USING btree (log_date)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_logs_research",
    "index_name": "idx_seizure_logs_research_seizure_type",
    "index_def": "CREATE INDEX idx_seizure_logs_research_seizure_type ON private_health_info.seizure_logs_research USING btree (seizure_type)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_logs_research",
    "index_name": "idx_seizure_logs_research_user_id",
    "index_def": "CREATE INDEX idx_seizure_logs_research_user_id ON private_health_info.seizure_logs_research USING btree (user_id)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_logs_research",
    "index_name": "seizure_logs_research_pkey",
    "index_def": "CREATE UNIQUE INDEX seizure_logs_research_pkey ON private_health_info.seizure_logs_research USING btree (log_id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "private_health_info",
    "table_name": "tracking_entries",
    "index_name": "idx_tracking_date",
    "index_def": "CREATE INDEX idx_tracking_date ON private_health_info.tracking_entries USING btree (entry_date DESC)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "private_health_info",
    "table_name": "tracking_entries",
    "index_name": "idx_tracking_user",
    "index_def": "CREATE INDEX idx_tracking_user ON private_health_info.tracking_entries USING btree (user_id)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "private_health_info",
    "table_name": "tracking_entries",
    "index_name": "tracking_entries_pkey",
    "index_def": "CREATE UNIQUE INDEX tracking_entries_pkey ON private_health_info.tracking_entries USING btree (id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "private_health_info",
    "table_name": "tremor_episodes",
    "index_name": "idx_tremor_episodes_occurred",
    "index_def": "CREATE INDEX idx_tremor_episodes_occurred ON private_health_info.tremor_episodes USING btree (occurred_at DESC)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "private_health_info",
    "table_name": "tremor_episodes",
    "index_name": "idx_tremor_episodes_patient",
    "index_def": "CREATE INDEX idx_tremor_episodes_patient ON private_health_info.tremor_episodes USING btree (patient_id)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "private_health_info",
    "table_name": "tremor_episodes",
    "index_name": "tremor_episodes_pkey",
    "index_def": "CREATE UNIQUE INDEX tremor_episodes_pkey ON private_health_info.tremor_episodes USING btree (tremor_id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "private_health_info",
    "table_name": "user_conditions",
    "index_name": "idx_user_conditions_user",
    "index_def": "CREATE INDEX idx_user_conditions_user ON private_health_info.user_conditions USING btree (user_id)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "private_health_info",
    "table_name": "user_conditions",
    "index_name": "user_conditions_pkey",
    "index_def": "CREATE UNIQUE INDEX user_conditions_pkey ON private_health_info.user_conditions USING btree (id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "private_health_info",
    "table_name": "user_conditions",
    "index_name": "user_conditions_user_id_condition_id_key",
    "index_def": "CREATE UNIQUE INDEX user_conditions_user_id_condition_id_key ON private_health_info.user_conditions USING btree (user_id, condition_id)",
    "is_unique": true,
    "is_primary": false
  },
  {
    "schema_name": "private_health_info",
    "table_name": "user_medications",
    "index_name": "idx_user_medications_user",
    "index_def": "CREATE INDEX idx_user_medications_user ON private_health_info.user_medications USING btree (user_id)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "private_health_info",
    "table_name": "user_medications",
    "index_name": "user_medications_pkey",
    "index_def": "CREATE UNIQUE INDEX user_medications_pkey ON private_health_info.user_medications USING btree (id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "protected",
    "table_name": "system_settings",
    "index_name": "system_settings_pkey",
    "index_def": "CREATE UNIQUE INDEX system_settings_pkey ON protected.system_settings USING btree (key)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "public",
    "table_name": "achievements",
    "index_name": "achievements_name_key",
    "index_def": "CREATE UNIQUE INDEX achievements_name_key ON public.achievements USING btree (name)",
    "is_unique": true,
    "is_primary": false
  },
  {
    "schema_name": "public",
    "table_name": "achievements",
    "index_name": "achievements_pkey",
    "index_def": "CREATE UNIQUE INDEX achievements_pkey ON public.achievements USING btree (id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "public",
    "table_name": "api_request_logs",
    "index_name": "api_request_logs_pkey",
    "index_def": "CREATE UNIQUE INDEX api_request_logs_pkey ON public.api_request_logs USING btree (id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "public",
    "table_name": "api_request_logs",
    "index_name": "idx_api_logs_endpoint",
    "index_def": "CREATE INDEX idx_api_logs_endpoint ON public.api_request_logs USING btree (endpoint)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "public",
    "table_name": "api_request_logs",
    "index_name": "idx_api_logs_errors",
    "index_def": "CREATE INDEX idx_api_logs_errors ON public.api_request_logs USING btree (status_code) WHERE (status_code >= 400)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "public",
    "table_name": "api_request_logs",
    "index_name": "idx_api_logs_time",
    "index_def": "CREATE INDEX idx_api_logs_time ON public.api_request_logs USING btree (request_time DESC)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "public",
    "table_name": "api_request_logs",
    "index_name": "idx_api_logs_user_id",
    "index_def": "CREATE INDEX idx_api_logs_user_id ON public.api_request_logs USING btree (user_id) WHERE (user_id IS NOT NULL)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "public",
    "table_name": "audit_log",
    "index_name": "audit_log_pkey",
    "index_def": "CREATE UNIQUE INDEX audit_log_pkey ON public.audit_log USING btree (id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "public",
    "table_name": "audit_log",
    "index_name": "idx_audit_log_action",
    "index_def": "CREATE INDEX idx_audit_log_action ON public.audit_log USING btree (action)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "public",
    "table_name": "audit_log",
    "index_name": "idx_audit_log_created",
    "index_def": "CREATE INDEX idx_audit_log_created ON public.audit_log USING btree (created_at DESC)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "public",
    "table_name": "audit_log",
    "index_name": "idx_audit_log_user",
    "index_def": "CREATE INDEX idx_audit_log_user ON public.audit_log USING btree (user_id)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "public",
    "table_name": "brain_regions_reference",
    "index_name": "brain_regions_reference_pkey",
    "index_def": "CREATE UNIQUE INDEX brain_regions_reference_pkey ON public.brain_regions_reference USING btree (region_id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "public",
    "table_name": "carer_invitations",
    "index_name": "carer_invitations_invitation_token_key",
    "index_def": "CREATE UNIQUE INDEX carer_invitations_invitation_token_key ON public.carer_invitations USING btree (invitation_token)",
    "is_unique": true,
    "is_primary": false
  },
  {
    "schema_name": "public",
    "table_name": "carer_invitations",
    "index_name": "carer_invitations_pkey",
    "index_def": "CREATE UNIQUE INDEX carer_invitations_pkey ON public.carer_invitations USING btree (id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "public",
    "table_name": "carer_invitations",
    "index_name": "idx_carer_invitations_relationship",
    "index_def": "CREATE INDEX idx_carer_invitations_relationship ON public.carer_invitations USING btree (relationship_id)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "public",
    "table_name": "carer_invitations",
    "index_name": "idx_carer_invitations_status",
    "index_def": "CREATE INDEX idx_carer_invitations_status ON public.carer_invitations USING btree (status)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "public",
    "table_name": "carer_invitations",
    "index_name": "idx_carer_invitations_token",
    "index_def": "CREATE INDEX idx_carer_invitations_token ON public.carer_invitations USING btree (invitation_token)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "public",
    "table_name": "carer_onboarding_data",
    "index_name": "carer_onboarding_data_pkey",
    "index_def": "CREATE UNIQUE INDEX carer_onboarding_data_pkey ON public.carer_onboarding_data USING btree (id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "public",
    "table_name": "carer_onboarding_data",
    "index_name": "carer_onboarding_data_user_id_key",
    "index_def": "CREATE UNIQUE INDEX carer_onboarding_data_user_id_key ON public.carer_onboarding_data USING btree (user_id)",
    "is_unique": true,
    "is_primary": false
  },
  {
    "schema_name": "public",
    "table_name": "carer_profiles",
    "index_name": "carer_profiles_pkey",
    "index_def": "CREATE UNIQUE INDEX carer_profiles_pkey ON public.carer_profiles USING btree (id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "public",
    "table_name": "carer_profiles",
    "index_name": "carer_profiles_user_id_key",
    "index_def": "CREATE UNIQUE INDEX carer_profiles_user_id_key ON public.carer_profiles USING btree (user_id)",
    "is_unique": true,
    "is_primary": false
  },
  {
    "schema_name": "public",
    "table_name": "carer_profiles",
    "index_name": "idx_carer_profiles_user",
    "index_def": "CREATE INDEX idx_carer_profiles_user ON public.carer_profiles USING btree (user_id)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "public",
    "table_name": "carer_relationships",
    "index_name": "carer_relationships_pkey",
    "index_def": "CREATE UNIQUE INDEX carer_relationships_pkey ON public.carer_relationships USING btree (id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "public",
    "table_name": "carer_relationships",
    "index_name": "idx_carer_rel_carer",
    "index_def": "CREATE INDEX idx_carer_rel_carer ON public.carer_relationships USING btree (carer_user_id)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "public",
    "table_name": "carer_relationships",
    "index_name": "idx_carer_rel_patient",
    "index_def": "CREATE INDEX idx_carer_rel_patient ON public.carer_relationships USING btree (patient_user_id)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "public",
    "table_name": "carer_relationships",
    "index_name": "idx_carer_rel_status",
    "index_def": "CREATE INDEX idx_carer_rel_status ON public.carer_relationships USING btree (status)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "public",
    "table_name": "clinician_profiles",
    "index_name": "clinician_profiles_pkey",
    "index_def": "CREATE UNIQUE INDEX clinician_profiles_pkey ON public.clinician_profiles USING btree (id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "public",
    "table_name": "clinician_profiles",
    "index_name": "clinician_profiles_user_id_key",
    "index_def": "CREATE UNIQUE INDEX clinician_profiles_user_id_key ON public.clinician_profiles USING btree (user_id)",
    "is_unique": true,
    "is_primary": false
  },
  {
    "schema_name": "public",
    "table_name": "clinician_profiles",
    "index_name": "idx_clinician_profiles_specialty",
    "index_def": "CREATE INDEX idx_clinician_profiles_specialty ON public.clinician_profiles USING btree (specialty)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "public",
    "table_name": "clinician_profiles",
    "index_name": "idx_clinician_profiles_user",
    "index_def": "CREATE INDEX idx_clinician_profiles_user ON public.clinician_profiles USING btree (user_id)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "public",
    "table_name": "conditions",
    "index_name": "conditions_pkey",
    "index_def": "CREATE UNIQUE INDEX conditions_pkey ON public.conditions USING btree (id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "public",
    "table_name": "conditions",
    "index_name": "idx_conditions_name",
    "index_def": "CREATE INDEX idx_conditions_name ON public.conditions USING btree (name)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "public",
    "table_name": "daily_tracking_preferences",
    "index_name": "daily_tracking_preferences_pkey",
    "index_def": "CREATE UNIQUE INDEX daily_tracking_preferences_pkey ON public.daily_tracking_preferences USING btree (id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "public",
    "table_name": "daily_tracking_preferences",
    "index_name": "daily_tracking_preferences_user_id_key",
    "index_def": "CREATE UNIQUE INDEX daily_tracking_preferences_user_id_key ON public.daily_tracking_preferences USING btree (user_id)",
    "is_unique": true,
    "is_primary": false
  },
  {
    "schema_name": "public",
    "table_name": "data_sharing_preferences",
    "index_name": "data_sharing_preferences_patient_id_key",
    "index_def": "CREATE UNIQUE INDEX data_sharing_preferences_patient_id_key ON public.data_sharing_preferences USING btree (patient_id)",
    "is_unique": true,
    "is_primary": false
  },
  {
    "schema_name": "public",
    "table_name": "data_sharing_preferences",
    "index_name": "data_sharing_preferences_pkey",
    "index_def": "CREATE UNIQUE INDEX data_sharing_preferences_pkey ON public.data_sharing_preferences USING btree (id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "public",
    "table_name": "data_sharing_preferences",
    "index_name": "idx_sharing_prefs_patient",
    "index_def": "CREATE INDEX idx_sharing_prefs_patient ON public.data_sharing_preferences USING btree (patient_id)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "public",
    "table_name": "database_operation_logs",
    "index_name": "database_operation_logs_pkey",
    "index_def": "CREATE UNIQUE INDEX database_operation_logs_pkey ON public.database_operation_logs USING btree (id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "public",
    "table_name": "database_operation_logs",
    "index_name": "idx_db_ops_errors",
    "index_def": "CREATE INDEX idx_db_ops_errors ON public.database_operation_logs USING btree (success) WHERE (success = false)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "public",
    "table_name": "database_operation_logs",
    "index_name": "idx_db_ops_table",
    "index_def": "CREATE INDEX idx_db_ops_table ON public.database_operation_logs USING btree (table_schema, table_name)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "public",
    "table_name": "database_operation_logs",
    "index_name": "idx_db_ops_time",
    "index_def": "CREATE INDEX idx_db_ops_time ON public.database_operation_logs USING btree (executed_at DESC)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "public",
    "table_name": "database_operation_logs",
    "index_name": "idx_db_ops_type",
    "index_def": "CREATE INDEX idx_db_ops_type ON public.database_operation_logs USING btree (operation_type)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "public",
    "table_name": "function_execution_logs",
    "index_name": "function_execution_logs_pkey",
    "index_def": "CREATE UNIQUE INDEX function_execution_logs_pkey ON public.function_execution_logs USING btree (id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "public",
    "table_name": "function_execution_logs",
    "index_name": "idx_function_logs_failed",
    "index_def": "CREATE INDEX idx_function_logs_failed ON public.function_execution_logs USING btree (execution_status) WHERE (execution_status = 'failed'::text)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "public",
    "table_name": "function_execution_logs",
    "index_name": "idx_function_logs_name",
    "index_def": "CREATE INDEX idx_function_logs_name ON public.function_execution_logs USING btree (function_name)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "public",
    "table_name": "function_execution_logs",
    "index_name": "idx_function_logs_started",
    "index_def": "CREATE INDEX idx_function_logs_started ON public.function_execution_logs USING btree (started_at DESC)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "public",
    "table_name": "function_execution_logs",
    "index_name": "idx_function_logs_status",
    "index_def": "CREATE INDEX idx_function_logs_status ON public.function_execution_logs USING btree (execution_status)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "public",
    "table_name": "medications",
    "index_name": "idx_medications_name",
    "index_def": "CREATE INDEX idx_medications_name ON public.medications USING btree (name)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "public",
    "table_name": "medications",
    "index_name": "medications_pkey",
    "index_def": "CREATE UNIQUE INDEX medications_pkey ON public.medications USING btree (id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "public",
    "table_name": "menstrual_symptom_options",
    "index_name": "menstrual_symptom_options_pkey",
    "index_def": "CREATE UNIQUE INDEX menstrual_symptom_options_pkey ON public.menstrual_symptom_options USING btree (id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "public",
    "table_name": "notification_history",
    "index_name": "idx_notification_history_sent_at",
    "index_def": "CREATE INDEX idx_notification_history_sent_at ON public.notification_history USING btree (sent_at)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "public",
    "table_name": "notification_history",
    "index_name": "idx_notification_history_user_id",
    "index_def": "CREATE INDEX idx_notification_history_user_id ON public.notification_history USING btree (user_id)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "public",
    "table_name": "notification_history",
    "index_name": "notification_history_pkey",
    "index_def": "CREATE UNIQUE INDEX notification_history_pkey ON public.notification_history USING btree (id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "public",
    "table_name": "notification_preferences",
    "index_name": "idx_notification_prefs_user_id",
    "index_def": "CREATE INDEX idx_notification_prefs_user_id ON public.notification_preferences USING btree (user_id)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "public",
    "table_name": "notification_preferences",
    "index_name": "notification_preferences_pkey",
    "index_def": "CREATE UNIQUE INDEX notification_preferences_pkey ON public.notification_preferences USING btree (id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "public",
    "table_name": "notification_preferences",
    "index_name": "notification_preferences_user_id_key",
    "index_def": "CREATE UNIQUE INDEX notification_preferences_user_id_key ON public.notification_preferences USING btree (user_id)",
    "is_unique": true,
    "is_primary": false
  },
  {
    "schema_name": "public",
    "table_name": "notification_queue",
    "index_name": "idx_notification_queue_scheduled",
    "index_def": "CREATE INDEX idx_notification_queue_scheduled ON public.notification_queue USING btree (scheduled_for)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "public",
    "table_name": "notification_queue",
    "index_name": "idx_notification_queue_status",
    "index_def": "CREATE INDEX idx_notification_queue_status ON public.notification_queue USING btree (status)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "public",
    "table_name": "notification_queue",
    "index_name": "idx_notification_queue_type",
    "index_def": "CREATE INDEX idx_notification_queue_type ON public.notification_queue USING btree (notification_type)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "public",
    "table_name": "notification_queue",
    "index_name": "idx_notification_queue_user_id",
    "index_def": "CREATE INDEX idx_notification_queue_user_id ON public.notification_queue USING btree (user_id)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "public",
    "table_name": "notification_queue",
    "index_name": "notification_queue_pkey",
    "index_def": "CREATE UNIQUE INDEX notification_queue_pkey ON public.notification_queue USING btree (id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "public",
    "table_name": "patient_clinician_connections",
    "index_name": "idx_pcc_clinician",
    "index_def": "CREATE INDEX idx_pcc_clinician ON public.patient_clinician_connections USING btree (clinician_id)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "public",
    "table_name": "patient_clinician_connections",
    "index_name": "idx_pcc_clinician_patient_status",
    "index_def": "CREATE INDEX idx_pcc_clinician_patient_status ON public.patient_clinician_connections USING btree (clinician_id, patient_id, status)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "public",
    "table_name": "patient_clinician_connections",
    "index_name": "idx_pcc_patient",
    "index_def": "CREATE INDEX idx_pcc_patient ON public.patient_clinician_connections USING btree (patient_id)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "public",
    "table_name": "patient_clinician_connections",
    "index_name": "idx_pcc_status",
    "index_def": "CREATE INDEX idx_pcc_status ON public.patient_clinician_connections USING btree (status)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "public",
    "table_name": "patient_clinician_connections",
    "index_name": "patient_clinician_connections_patient_id_clinician_id_key",
    "index_def": "CREATE UNIQUE INDEX patient_clinician_connections_patient_id_clinician_id_key ON public.patient_clinician_connections USING btree (patient_id, clinician_id)",
    "is_unique": true,
    "is_primary": false
  },
  {
    "schema_name": "public",
    "table_name": "patient_clinician_connections",
    "index_name": "patient_clinician_connections_pkey",
    "index_def": "CREATE UNIQUE INDEX patient_clinician_connections_pkey ON public.patient_clinician_connections USING btree (id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "public",
    "table_name": "patient_invitations",
    "index_name": "idx_patient_invitations_clinician",
    "index_def": "CREATE INDEX idx_patient_invitations_clinician ON public.patient_invitations USING btree (clinician_id)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "public",
    "table_name": "patient_invitations",
    "index_name": "idx_patient_invitations_status",
    "index_def": "CREATE INDEX idx_patient_invitations_status ON public.patient_invitations USING btree (status)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "public",
    "table_name": "patient_invitations",
    "index_name": "idx_patient_invitations_token",
    "index_def": "CREATE INDEX idx_patient_invitations_token ON public.patient_invitations USING btree (invitation_token)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "public",
    "table_name": "patient_invitations",
    "index_name": "patient_invitations_invitation_token_key",
    "index_def": "CREATE UNIQUE INDEX patient_invitations_invitation_token_key ON public.patient_invitations USING btree (invitation_token)",
    "is_unique": true,
    "is_primary": false
  },
  {
    "schema_name": "public",
    "table_name": "patient_invitations",
    "index_name": "patient_invitations_pkey",
    "index_def": "CREATE UNIQUE INDEX patient_invitations_pkey ON public.patient_invitations USING btree (id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "public",
    "table_name": "patient_profiles",
    "index_name": "idx_patient_profiles_user",
    "index_def": "CREATE INDEX idx_patient_profiles_user ON public.patient_profiles USING btree (user_id)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "public",
    "table_name": "patient_profiles",
    "index_name": "patient_profiles_pkey",
    "index_def": "CREATE UNIQUE INDEX patient_profiles_pkey ON public.patient_profiles USING btree (id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "public",
    "table_name": "patient_profiles",
    "index_name": "patient_profiles_user_id_key",
    "index_def": "CREATE UNIQUE INDEX patient_profiles_user_id_key ON public.patient_profiles USING btree (user_id)",
    "is_unique": true,
    "is_primary": false
  },
  {
    "schema_name": "public",
    "table_name": "profiles",
    "index_name": "idx_profiles_user_type",
    "index_def": "CREATE INDEX idx_profiles_user_type ON public.profiles USING btree (user_type)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "public",
    "table_name": "profiles",
    "index_name": "profiles_pkey",
    "index_def": "CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "public",
    "table_name": "pwa_push_subscriptions",
    "index_name": "idx_pwa_subscriptions_active",
    "index_def": "CREATE INDEX idx_pwa_subscriptions_active ON public.pwa_push_subscriptions USING btree (active)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "public",
    "table_name": "pwa_push_subscriptions",
    "index_name": "idx_pwa_subscriptions_user_id",
    "index_def": "CREATE INDEX idx_pwa_subscriptions_user_id ON public.pwa_push_subscriptions USING btree (user_id)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "public",
    "table_name": "pwa_push_subscriptions",
    "index_name": "pwa_push_subscriptions_pkey",
    "index_def": "CREATE UNIQUE INDEX pwa_push_subscriptions_pkey ON public.pwa_push_subscriptions USING btree (id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "public",
    "table_name": "pwa_push_subscriptions",
    "index_name": "pwa_push_subscriptions_user_id_endpoint_key",
    "index_def": "CREATE UNIQUE INDEX pwa_push_subscriptions_user_id_endpoint_key ON public.pwa_push_subscriptions USING btree (user_id, endpoint)",
    "is_unique": true,
    "is_primary": false
  },
  {
    "schema_name": "public",
    "table_name": "research_consent",
    "index_name": "idx_research_consent_user",
    "index_def": "CREATE INDEX idx_research_consent_user ON public.research_consent USING btree (user_id)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "public",
    "table_name": "research_consent",
    "index_name": "research_consent_pkey",
    "index_def": "CREATE UNIQUE INDEX research_consent_pkey ON public.research_consent USING btree (id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "public",
    "table_name": "research_data_sharing_details",
    "index_name": "research_data_sharing_details_pkey",
    "index_def": "CREATE UNIQUE INDEX research_data_sharing_details_pkey ON public.research_data_sharing_details USING btree (id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "public",
    "table_name": "research_data_sharing_details",
    "index_name": "research_data_sharing_details_user_id_key",
    "index_def": "CREATE UNIQUE INDEX research_data_sharing_details_user_id_key ON public.research_data_sharing_details USING btree (user_id)",
    "is_unique": true,
    "is_primary": false
  },
  {
    "schema_name": "public",
    "table_name": "researcher_onboarding_data",
    "index_name": "researcher_onboarding_data_pkey",
    "index_def": "CREATE UNIQUE INDEX researcher_onboarding_data_pkey ON public.researcher_onboarding_data USING btree (id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "public",
    "table_name": "researcher_onboarding_data",
    "index_name": "researcher_onboarding_data_user_id_key",
    "index_def": "CREATE UNIQUE INDEX researcher_onboarding_data_user_id_key ON public.researcher_onboarding_data USING btree (user_id)",
    "is_unique": true,
    "is_primary": false
  },
  {
    "schema_name": "public",
    "table_name": "researcher_profiles",
    "index_name": "idx_researcher_profiles_user",
    "index_def": "CREATE INDEX idx_researcher_profiles_user ON public.researcher_profiles USING btree (user_id)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "public",
    "table_name": "researcher_profiles",
    "index_name": "researcher_profiles_pkey",
    "index_def": "CREATE UNIQUE INDEX researcher_profiles_pkey ON public.researcher_profiles USING btree (id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "public",
    "table_name": "researcher_profiles",
    "index_name": "researcher_profiles_user_id_key",
    "index_def": "CREATE UNIQUE INDEX researcher_profiles_user_id_key ON public.researcher_profiles USING btree (user_id)",
    "is_unique": true,
    "is_primary": false
  },
  {
    "schema_name": "public",
    "table_name": "security_incidents",
    "index_name": "idx_security_incidents_severity",
    "index_def": "CREATE INDEX idx_security_incidents_severity ON public.security_incidents USING btree (severity)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "public",
    "table_name": "security_incidents",
    "index_name": "idx_security_incidents_user",
    "index_def": "CREATE INDEX idx_security_incidents_user ON public.security_incidents USING btree (user_id)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "public",
    "table_name": "security_incidents",
    "index_name": "security_incidents_pkey",
    "index_def": "CREATE UNIQUE INDEX security_incidents_pkey ON public.security_incidents USING btree (id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "public",
    "table_name": "seizure_signs_reference",
    "index_name": "seizure_signs_reference_pkey",
    "index_def": "CREATE UNIQUE INDEX seizure_signs_reference_pkey ON public.seizure_signs_reference USING btree (sign_id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "public",
    "table_name": "seizure_signs_reference",
    "index_name": "seizure_signs_reference_sign_name_key",
    "index_def": "CREATE UNIQUE INDEX seizure_signs_reference_sign_name_key ON public.seizure_signs_reference USING btree (sign_name)",
    "is_unique": true,
    "is_primary": false
  },
  {
    "schema_name": "public",
    "table_name": "seizure_triggers_reference",
    "index_name": "seizure_triggers_reference_pkey",
    "index_def": "CREATE UNIQUE INDEX seizure_triggers_reference_pkey ON public.seizure_triggers_reference USING btree (trigger_id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "public",
    "table_name": "seizure_triggers_reference",
    "index_name": "seizure_triggers_reference_trigger_type_key",
    "index_def": "CREATE UNIQUE INDEX seizure_triggers_reference_trigger_type_key ON public.seizure_triggers_reference USING btree (trigger_type)",
    "is_unique": true,
    "is_primary": false
  },
  {
    "schema_name": "public",
    "table_name": "sign_brain_region_mapping",
    "index_name": "sign_brain_region_mapping_pkey",
    "index_def": "CREATE UNIQUE INDEX sign_brain_region_mapping_pkey ON public.sign_brain_region_mapping USING btree (id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "public",
    "table_name": "sign_brain_region_mapping",
    "index_name": "sign_brain_region_mapping_sign_id_region_id_key",
    "index_def": "CREATE UNIQUE INDEX sign_brain_region_mapping_sign_id_region_id_key ON public.sign_brain_region_mapping USING btree (sign_id, region_id)",
    "is_unique": true,
    "is_primary": false
  },
  {
    "schema_name": "public",
    "table_name": "symptom_options",
    "index_name": "symptom_options_pkey",
    "index_def": "CREATE UNIQUE INDEX symptom_options_pkey ON public.symptom_options USING btree (id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "public",
    "table_name": "system_logs",
    "index_name": "idx_system_logs_category",
    "index_def": "CREATE INDEX idx_system_logs_category ON public.system_logs USING btree (category)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "public",
    "table_name": "system_logs",
    "index_name": "idx_system_logs_created",
    "index_def": "CREATE INDEX idx_system_logs_created ON public.system_logs USING btree (created_at DESC)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "public",
    "table_name": "system_logs",
    "index_name": "idx_system_logs_error",
    "index_def": "CREATE INDEX idx_system_logs_error ON public.system_logs USING btree (log_level) WHERE (log_level = ANY (ARRAY['ERROR'::text, 'CRITICAL'::text]))",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "public",
    "table_name": "system_logs",
    "index_name": "idx_system_logs_function",
    "index_def": "CREATE INDEX idx_system_logs_function ON public.system_logs USING btree (function_name) WHERE (function_name IS NOT NULL)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "public",
    "table_name": "system_logs",
    "index_name": "idx_system_logs_level",
    "index_def": "CREATE INDEX idx_system_logs_level ON public.system_logs USING btree (log_level)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "public",
    "table_name": "system_logs",
    "index_name": "idx_system_logs_user_id",
    "index_def": "CREATE INDEX idx_system_logs_user_id ON public.system_logs USING btree (user_id) WHERE (user_id IS NOT NULL)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "public",
    "table_name": "system_logs",
    "index_name": "system_logs_pkey",
    "index_def": "CREATE UNIQUE INDEX system_logs_pkey ON public.system_logs USING btree (id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "public",
    "table_name": "trigger_options",
    "index_name": "trigger_options_pkey",
    "index_def": "CREATE UNIQUE INDEX trigger_options_pkey ON public.trigger_options USING btree (id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "public",
    "table_name": "user_achievements",
    "index_name": "idx_user_achievements_user",
    "index_def": "CREATE INDEX idx_user_achievements_user ON public.user_achievements USING btree (user_id)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "public",
    "table_name": "user_achievements",
    "index_name": "user_achievements_pkey",
    "index_def": "CREATE UNIQUE INDEX user_achievements_pkey ON public.user_achievements USING btree (id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "public",
    "table_name": "user_achievements",
    "index_name": "user_achievements_user_id_achievement_id_key",
    "index_def": "CREATE UNIQUE INDEX user_achievements_user_id_achievement_id_key ON public.user_achievements USING btree (user_id, achievement_id)",
    "is_unique": true,
    "is_primary": false
  },
  {
    "schema_name": "public",
    "table_name": "user_points",
    "index_name": "idx_user_points_user",
    "index_def": "CREATE INDEX idx_user_points_user ON public.user_points USING btree (user_id)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "public",
    "table_name": "user_points",
    "index_name": "user_points_pkey",
    "index_def": "CREATE UNIQUE INDEX user_points_pkey ON public.user_points USING btree (id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "public",
    "table_name": "user_points",
    "index_name": "user_points_user_id_key",
    "index_def": "CREATE UNIQUE INDEX user_points_user_id_key ON public.user_points USING btree (user_id)",
    "is_unique": true,
    "is_primary": false
  },
  {
    "schema_name": "realtime",
    "table_name": "messages",
    "index_name": "messages_inserted_at_topic_index",
    "index_def": "CREATE INDEX messages_inserted_at_topic_index ON ONLY realtime.messages USING btree (inserted_at DESC, topic) WHERE ((extension = 'broadcast'::text) AND (private IS TRUE))",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "realtime",
    "table_name": "messages",
    "index_name": "messages_pkey",
    "index_def": "CREATE UNIQUE INDEX messages_pkey ON ONLY realtime.messages USING btree (id, inserted_at)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "realtime",
    "table_name": "schema_migrations",
    "index_name": "schema_migrations_pkey",
    "index_def": "CREATE UNIQUE INDEX schema_migrations_pkey ON realtime.schema_migrations USING btree (version)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "realtime",
    "table_name": "subscription",
    "index_name": "ix_realtime_subscription_entity",
    "index_def": "CREATE INDEX ix_realtime_subscription_entity ON realtime.subscription USING btree (entity)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "realtime",
    "table_name": "subscription",
    "index_name": "pk_subscription",
    "index_def": "CREATE UNIQUE INDEX pk_subscription ON realtime.subscription USING btree (id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "realtime",
    "table_name": "subscription",
    "index_name": "subscription_subscription_id_entity_filters_key",
    "index_def": "CREATE UNIQUE INDEX subscription_subscription_id_entity_filters_key ON realtime.subscription USING btree (subscription_id, entity, filters)",
    "is_unique": true,
    "is_primary": false
  },
  {
    "schema_name": "research",
    "table_name": "daily_symptom_logs",
    "index_name": "daily_symptom_logs_pkey",
    "index_def": "CREATE UNIQUE INDEX daily_symptom_logs_pkey ON research.daily_symptom_logs USING btree (log_id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "research",
    "table_name": "daily_symptom_logs",
    "index_name": "daily_symptom_logs_research_id_log_date_key",
    "index_def": "CREATE UNIQUE INDEX daily_symptom_logs_research_id_log_date_key ON research.daily_symptom_logs USING btree (research_id, log_date)",
    "is_unique": true,
    "is_primary": false
  },
  {
    "schema_name": "research",
    "table_name": "daily_symptom_logs",
    "index_name": "idx_research_daily_logs_research_id",
    "index_def": "CREATE INDEX idx_research_daily_logs_research_id ON research.daily_symptom_logs USING btree (research_id)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "research",
    "table_name": "gait_episodes",
    "index_name": "gait_episodes_pkey",
    "index_def": "CREATE UNIQUE INDEX gait_episodes_pkey ON research.gait_episodes USING btree (gait_id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "research",
    "table_name": "gait_episodes",
    "index_name": "idx_research_gait_research_id",
    "index_def": "CREATE INDEX idx_research_gait_research_id ON research.gait_episodes USING btree (research_id)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "research",
    "table_name": "seizure_events",
    "index_name": "idx_research_seizures_date",
    "index_def": "CREATE INDEX idx_research_seizures_date ON research.seizure_events USING btree (occurred_at_date DESC)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "research",
    "table_name": "seizure_events",
    "index_name": "idx_research_seizures_research_id",
    "index_def": "CREATE INDEX idx_research_seizures_research_id ON research.seizure_events USING btree (research_id)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "research",
    "table_name": "seizure_events",
    "index_name": "seizure_events_pkey",
    "index_def": "CREATE UNIQUE INDEX seizure_events_pkey ON research.seizure_events USING btree (event_id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "research",
    "table_name": "tremor_episodes",
    "index_name": "idx_research_tremors_research_id",
    "index_def": "CREATE INDEX idx_research_tremors_research_id ON research.tremor_episodes USING btree (research_id)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "research",
    "table_name": "tremor_episodes",
    "index_name": "tremor_episodes_pkey",
    "index_def": "CREATE UNIQUE INDEX tremor_episodes_pkey ON research.tremor_episodes USING btree (tremor_id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "storage",
    "table_name": "buckets",
    "index_name": "bname",
    "index_def": "CREATE UNIQUE INDEX bname ON storage.buckets USING btree (name)",
    "is_unique": true,
    "is_primary": false
  },
  {
    "schema_name": "storage",
    "table_name": "buckets",
    "index_name": "buckets_pkey",
    "index_def": "CREATE UNIQUE INDEX buckets_pkey ON storage.buckets USING btree (id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "storage",
    "table_name": "buckets_analytics",
    "index_name": "buckets_analytics_pkey",
    "index_def": "CREATE UNIQUE INDEX buckets_analytics_pkey ON storage.buckets_analytics USING btree (id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "storage",
    "table_name": "migrations",
    "index_name": "migrations_name_key",
    "index_def": "CREATE UNIQUE INDEX migrations_name_key ON storage.migrations USING btree (name)",
    "is_unique": true,
    "is_primary": false
  },
  {
    "schema_name": "storage",
    "table_name": "migrations",
    "index_name": "migrations_pkey",
    "index_def": "CREATE UNIQUE INDEX migrations_pkey ON storage.migrations USING btree (id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "storage",
    "table_name": "objects",
    "index_name": "bucketid_objname",
    "index_def": "CREATE UNIQUE INDEX bucketid_objname ON storage.objects USING btree (bucket_id, name)",
    "is_unique": true,
    "is_primary": false
  },
  {
    "schema_name": "storage",
    "table_name": "objects",
    "index_name": "idx_name_bucket_level_unique",
    "index_def": "CREATE UNIQUE INDEX idx_name_bucket_level_unique ON storage.objects USING btree (name COLLATE \"C\", bucket_id, level)",
    "is_unique": true,
    "is_primary": false
  },
  {
    "schema_name": "storage",
    "table_name": "objects",
    "index_name": "idx_objects_bucket_id_name",
    "index_def": "CREATE INDEX idx_objects_bucket_id_name ON storage.objects USING btree (bucket_id, name COLLATE \"C\")",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "storage",
    "table_name": "objects",
    "index_name": "idx_objects_lower_name",
    "index_def": "CREATE INDEX idx_objects_lower_name ON storage.objects USING btree ((path_tokens[level]), lower(name) text_pattern_ops, bucket_id, level)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "storage",
    "table_name": "objects",
    "index_name": "name_prefix_search",
    "index_def": "CREATE INDEX name_prefix_search ON storage.objects USING btree (name text_pattern_ops)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "storage",
    "table_name": "objects",
    "index_name": "objects_bucket_id_level_idx",
    "index_def": "CREATE UNIQUE INDEX objects_bucket_id_level_idx ON storage.objects USING btree (bucket_id, level, name COLLATE \"C\")",
    "is_unique": true,
    "is_primary": false
  },
  {
    "schema_name": "storage",
    "table_name": "objects",
    "index_name": "objects_pkey",
    "index_def": "CREATE UNIQUE INDEX objects_pkey ON storage.objects USING btree (id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "storage",
    "table_name": "prefixes",
    "index_name": "idx_prefixes_lower_name",
    "index_def": "CREATE INDEX idx_prefixes_lower_name ON storage.prefixes USING btree (bucket_id, level, ((string_to_array(name, '/'::text))[level]), lower(name) text_pattern_ops)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "storage",
    "table_name": "prefixes",
    "index_name": "prefixes_pkey",
    "index_def": "CREATE UNIQUE INDEX prefixes_pkey ON storage.prefixes USING btree (bucket_id, level, name)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "storage",
    "table_name": "s3_multipart_uploads",
    "index_name": "idx_multipart_uploads_list",
    "index_def": "CREATE INDEX idx_multipart_uploads_list ON storage.s3_multipart_uploads USING btree (bucket_id, key, created_at)",
    "is_unique": false,
    "is_primary": false
  },
  {
    "schema_name": "storage",
    "table_name": "s3_multipart_uploads",
    "index_name": "s3_multipart_uploads_pkey",
    "index_def": "CREATE UNIQUE INDEX s3_multipart_uploads_pkey ON storage.s3_multipart_uploads USING btree (id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "storage",
    "table_name": "s3_multipart_uploads_parts",
    "index_name": "s3_multipart_uploads_parts_pkey",
    "index_def": "CREATE UNIQUE INDEX s3_multipart_uploads_parts_pkey ON storage.s3_multipart_uploads_parts USING btree (id)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "supabase_migrations",
    "table_name": "schema_migrations",
    "index_name": "schema_migrations_idempotency_key_key",
    "index_def": "CREATE UNIQUE INDEX schema_migrations_idempotency_key_key ON supabase_migrations.schema_migrations USING btree (idempotency_key)",
    "is_unique": true,
    "is_primary": false
  },
  {
    "schema_name": "supabase_migrations",
    "table_name": "schema_migrations",
    "index_name": "schema_migrations_pkey",
    "index_def": "CREATE UNIQUE INDEX schema_migrations_pkey ON supabase_migrations.schema_migrations USING btree (version)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "supabase_migrations",
    "table_name": "seed_files",
    "index_name": "seed_files_pkey",
    "index_def": "CREATE UNIQUE INDEX seed_files_pkey ON supabase_migrations.seed_files USING btree (path)",
    "is_unique": true,
    "is_primary": true
  },
  {
    "schema_name": "vault",
    "table_name": "secrets",
    "index_name": "secrets_name_idx",
    "index_def": "CREATE UNIQUE INDEX secrets_name_idx ON vault.secrets USING btree (name) WHERE (name IS NOT NULL)",
    "is_unique": true,
    "is_primary": false
  },
  {
    "schema_name": "vault",
    "table_name": "secrets",
    "index_name": "secrets_pkey",
    "index_def": "CREATE UNIQUE INDEX secrets_pkey ON vault.secrets USING btree (id)",
    "is_unique": true,
    "is_primary": true
  }
]
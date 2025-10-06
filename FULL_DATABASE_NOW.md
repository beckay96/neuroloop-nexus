

# All schemas


| schema_oid | schema_name         | owner          |
| ---------- | ------------------- | -------------- |
| 16494      | auth                | supabase_admin |
| 20597      | clinical            | postgres       |
| 16388      | extensions          | postgres       |
| 16624      | graphql             | supabase_admin |
| 16613      | graphql_public      | supabase_admin |
| 20596      | linkage             | postgres       |
| 20595      | private_health_info | postgres       |
| 19554      | protected           | postgres       |
| 18464      | public              | postgres       |
| 16605      | realtime            | supabase_admin |
| 21871      | research            | postgres       |
| 16542      | storage             | supabase_admin |
| 19701      | supabase_migrations | postgres       |
| 16653      | vault               | supabase_admin |





------------

# JSON export of ALL Columns with data types, defaults, nullability, (all schemas)

``

[
  {
    "schema_name": "auth",
    "table_name": "audit_log_entries",
    "ordinal_position": 1,
    "column_name": "instance_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "audit_log_entries",
    "ordinal_position": 2,
    "column_name": "id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "audit_log_entries",
    "ordinal_position": 3,
    "column_name": "payload",
    "data_type": "json",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "audit_log_entries",
    "ordinal_position": 4,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "audit_log_entries",
    "ordinal_position": 5,
    "column_name": "ip_address",
    "data_type": "character varying(64)",
    "column_default": "''::character varying",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "flow_state",
    "ordinal_position": 1,
    "column_name": "id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "flow_state",
    "ordinal_position": 2,
    "column_name": "user_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "flow_state",
    "ordinal_position": 3,
    "column_name": "auth_code",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "flow_state",
    "ordinal_position": 4,
    "column_name": "code_challenge_method",
    "data_type": "auth.code_challenge_method",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "flow_state",
    "ordinal_position": 5,
    "column_name": "code_challenge",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "flow_state",
    "ordinal_position": 6,
    "column_name": "provider_type",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "flow_state",
    "ordinal_position": 7,
    "column_name": "provider_access_token",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "flow_state",
    "ordinal_position": 8,
    "column_name": "provider_refresh_token",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "flow_state",
    "ordinal_position": 9,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "flow_state",
    "ordinal_position": 10,
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "flow_state",
    "ordinal_position": 11,
    "column_name": "authentication_method",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "flow_state",
    "ordinal_position": 12,
    "column_name": "auth_code_issued_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "identities",
    "ordinal_position": 1,
    "column_name": "provider_id",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "identities",
    "ordinal_position": 2,
    "column_name": "user_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "identities",
    "ordinal_position": 3,
    "column_name": "identity_data",
    "data_type": "jsonb",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "identities",
    "ordinal_position": 4,
    "column_name": "provider",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "identities",
    "ordinal_position": 5,
    "column_name": "last_sign_in_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "identities",
    "ordinal_position": 6,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "identities",
    "ordinal_position": 7,
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "identities",
    "ordinal_position": 8,
    "column_name": "email",
    "data_type": "text",
    "column_default": "lower((identity_data ->> 'email'::text))",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": "s"
  },
  {
    "schema_name": "auth",
    "table_name": "identities",
    "ordinal_position": 9,
    "column_name": "id",
    "data_type": "uuid",
    "column_default": "gen_random_uuid()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "instances",
    "ordinal_position": 1,
    "column_name": "id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "instances",
    "ordinal_position": 2,
    "column_name": "uuid",
    "data_type": "uuid",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "instances",
    "ordinal_position": 3,
    "column_name": "raw_base_config",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "instances",
    "ordinal_position": 4,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "instances",
    "ordinal_position": 5,
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "mfa_amr_claims",
    "ordinal_position": 1,
    "column_name": "session_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "mfa_amr_claims",
    "ordinal_position": 2,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "mfa_amr_claims",
    "ordinal_position": 3,
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "mfa_amr_claims",
    "ordinal_position": 4,
    "column_name": "authentication_method",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "mfa_amr_claims",
    "ordinal_position": 5,
    "column_name": "id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "mfa_challenges",
    "ordinal_position": 1,
    "column_name": "id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "mfa_challenges",
    "ordinal_position": 2,
    "column_name": "factor_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "mfa_challenges",
    "ordinal_position": 3,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "mfa_challenges",
    "ordinal_position": 4,
    "column_name": "verified_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "mfa_challenges",
    "ordinal_position": 5,
    "column_name": "ip_address",
    "data_type": "inet",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "mfa_challenges",
    "ordinal_position": 6,
    "column_name": "otp_code",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "mfa_challenges",
    "ordinal_position": 7,
    "column_name": "web_authn_session_data",
    "data_type": "jsonb",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "mfa_factors",
    "ordinal_position": 1,
    "column_name": "id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "mfa_factors",
    "ordinal_position": 2,
    "column_name": "user_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "mfa_factors",
    "ordinal_position": 3,
    "column_name": "friendly_name",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "mfa_factors",
    "ordinal_position": 4,
    "column_name": "factor_type",
    "data_type": "auth.factor_type",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "mfa_factors",
    "ordinal_position": 5,
    "column_name": "status",
    "data_type": "auth.factor_status",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "mfa_factors",
    "ordinal_position": 6,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "mfa_factors",
    "ordinal_position": 7,
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "mfa_factors",
    "ordinal_position": 8,
    "column_name": "secret",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "mfa_factors",
    "ordinal_position": 9,
    "column_name": "phone",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "mfa_factors",
    "ordinal_position": 10,
    "column_name": "last_challenged_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "mfa_factors",
    "ordinal_position": 11,
    "column_name": "web_authn_credential",
    "data_type": "jsonb",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "mfa_factors",
    "ordinal_position": 12,
    "column_name": "web_authn_aaguid",
    "data_type": "uuid",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "oauth_clients",
    "ordinal_position": 1,
    "column_name": "id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "oauth_clients",
    "ordinal_position": 2,
    "column_name": "client_id",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "oauth_clients",
    "ordinal_position": 3,
    "column_name": "client_secret_hash",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "oauth_clients",
    "ordinal_position": 4,
    "column_name": "registration_type",
    "data_type": "auth.oauth_registration_type",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "oauth_clients",
    "ordinal_position": 5,
    "column_name": "redirect_uris",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "oauth_clients",
    "ordinal_position": 6,
    "column_name": "grant_types",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "oauth_clients",
    "ordinal_position": 7,
    "column_name": "client_name",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "oauth_clients",
    "ordinal_position": 8,
    "column_name": "client_uri",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "oauth_clients",
    "ordinal_position": 9,
    "column_name": "logo_uri",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "oauth_clients",
    "ordinal_position": 10,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "oauth_clients",
    "ordinal_position": 11,
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "oauth_clients",
    "ordinal_position": 12,
    "column_name": "deleted_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "one_time_tokens",
    "ordinal_position": 1,
    "column_name": "id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "one_time_tokens",
    "ordinal_position": 2,
    "column_name": "user_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "one_time_tokens",
    "ordinal_position": 3,
    "column_name": "token_type",
    "data_type": "auth.one_time_token_type",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "one_time_tokens",
    "ordinal_position": 4,
    "column_name": "token_hash",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "one_time_tokens",
    "ordinal_position": 5,
    "column_name": "relates_to",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "one_time_tokens",
    "ordinal_position": 6,
    "column_name": "created_at",
    "data_type": "timestamp without time zone",
    "column_default": "now()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "one_time_tokens",
    "ordinal_position": 7,
    "column_name": "updated_at",
    "data_type": "timestamp without time zone",
    "column_default": "now()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "refresh_tokens",
    "ordinal_position": 1,
    "column_name": "instance_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "refresh_tokens",
    "ordinal_position": 2,
    "column_name": "id",
    "data_type": "bigint",
    "column_default": "nextval('auth.refresh_tokens_id_seq'::regclass)",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "refresh_tokens",
    "ordinal_position": 3,
    "column_name": "token",
    "data_type": "character varying(255)",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "refresh_tokens",
    "ordinal_position": 4,
    "column_name": "user_id",
    "data_type": "character varying(255)",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "refresh_tokens",
    "ordinal_position": 5,
    "column_name": "revoked",
    "data_type": "boolean",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "refresh_tokens",
    "ordinal_position": 6,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "refresh_tokens",
    "ordinal_position": 7,
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "refresh_tokens",
    "ordinal_position": 8,
    "column_name": "parent",
    "data_type": "character varying(255)",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "refresh_tokens",
    "ordinal_position": 9,
    "column_name": "session_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "saml_providers",
    "ordinal_position": 1,
    "column_name": "id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "saml_providers",
    "ordinal_position": 2,
    "column_name": "sso_provider_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "saml_providers",
    "ordinal_position": 3,
    "column_name": "entity_id",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "saml_providers",
    "ordinal_position": 4,
    "column_name": "metadata_xml",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "saml_providers",
    "ordinal_position": 5,
    "column_name": "metadata_url",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "saml_providers",
    "ordinal_position": 6,
    "column_name": "attribute_mapping",
    "data_type": "jsonb",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "saml_providers",
    "ordinal_position": 7,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "saml_providers",
    "ordinal_position": 8,
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "saml_providers",
    "ordinal_position": 9,
    "column_name": "name_id_format",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "saml_relay_states",
    "ordinal_position": 1,
    "column_name": "id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "saml_relay_states",
    "ordinal_position": 2,
    "column_name": "sso_provider_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "saml_relay_states",
    "ordinal_position": 3,
    "column_name": "request_id",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "saml_relay_states",
    "ordinal_position": 4,
    "column_name": "for_email",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "saml_relay_states",
    "ordinal_position": 5,
    "column_name": "redirect_to",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "saml_relay_states",
    "ordinal_position": 7,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "saml_relay_states",
    "ordinal_position": 8,
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "saml_relay_states",
    "ordinal_position": 9,
    "column_name": "flow_state_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "schema_migrations",
    "ordinal_position": 1,
    "column_name": "version",
    "data_type": "character varying(255)",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "sessions",
    "ordinal_position": 1,
    "column_name": "id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "sessions",
    "ordinal_position": 2,
    "column_name": "user_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "sessions",
    "ordinal_position": 3,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "sessions",
    "ordinal_position": 4,
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "sessions",
    "ordinal_position": 5,
    "column_name": "factor_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "sessions",
    "ordinal_position": 6,
    "column_name": "aal",
    "data_type": "auth.aal_level",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "sessions",
    "ordinal_position": 7,
    "column_name": "not_after",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "sessions",
    "ordinal_position": 8,
    "column_name": "refreshed_at",
    "data_type": "timestamp without time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "sessions",
    "ordinal_position": 9,
    "column_name": "user_agent",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "sessions",
    "ordinal_position": 10,
    "column_name": "ip",
    "data_type": "inet",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "sessions",
    "ordinal_position": 11,
    "column_name": "tag",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "sso_domains",
    "ordinal_position": 1,
    "column_name": "id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "sso_domains",
    "ordinal_position": 2,
    "column_name": "sso_provider_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "sso_domains",
    "ordinal_position": 3,
    "column_name": "domain",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "sso_domains",
    "ordinal_position": 4,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "sso_domains",
    "ordinal_position": 5,
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "sso_providers",
    "ordinal_position": 1,
    "column_name": "id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "sso_providers",
    "ordinal_position": 2,
    "column_name": "resource_id",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "sso_providers",
    "ordinal_position": 3,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "sso_providers",
    "ordinal_position": 4,
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "sso_providers",
    "ordinal_position": 5,
    "column_name": "disabled",
    "data_type": "boolean",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "users",
    "ordinal_position": 1,
    "column_name": "instance_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "users",
    "ordinal_position": 2,
    "column_name": "id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "users",
    "ordinal_position": 3,
    "column_name": "aud",
    "data_type": "character varying(255)",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "users",
    "ordinal_position": 4,
    "column_name": "role",
    "data_type": "character varying(255)",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "users",
    "ordinal_position": 5,
    "column_name": "email",
    "data_type": "character varying(255)",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "users",
    "ordinal_position": 6,
    "column_name": "encrypted_password",
    "data_type": "character varying(255)",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "users",
    "ordinal_position": 7,
    "column_name": "email_confirmed_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "users",
    "ordinal_position": 8,
    "column_name": "invited_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "users",
    "ordinal_position": 9,
    "column_name": "confirmation_token",
    "data_type": "character varying(255)",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "users",
    "ordinal_position": 10,
    "column_name": "confirmation_sent_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "users",
    "ordinal_position": 11,
    "column_name": "recovery_token",
    "data_type": "character varying(255)",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "users",
    "ordinal_position": 12,
    "column_name": "recovery_sent_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "users",
    "ordinal_position": 13,
    "column_name": "email_change_token_new",
    "data_type": "character varying(255)",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "users",
    "ordinal_position": 14,
    "column_name": "email_change",
    "data_type": "character varying(255)",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "users",
    "ordinal_position": 15,
    "column_name": "email_change_sent_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "users",
    "ordinal_position": 16,
    "column_name": "last_sign_in_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "users",
    "ordinal_position": 17,
    "column_name": "raw_app_meta_data",
    "data_type": "jsonb",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "users",
    "ordinal_position": 18,
    "column_name": "raw_user_meta_data",
    "data_type": "jsonb",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "users",
    "ordinal_position": 19,
    "column_name": "is_super_admin",
    "data_type": "boolean",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "users",
    "ordinal_position": 20,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "users",
    "ordinal_position": 21,
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "users",
    "ordinal_position": 22,
    "column_name": "phone",
    "data_type": "text",
    "column_default": "NULL::character varying",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "users",
    "ordinal_position": 23,
    "column_name": "phone_confirmed_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "users",
    "ordinal_position": 24,
    "column_name": "phone_change",
    "data_type": "text",
    "column_default": "''::character varying",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "users",
    "ordinal_position": 25,
    "column_name": "phone_change_token",
    "data_type": "character varying(255)",
    "column_default": "''::character varying",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "users",
    "ordinal_position": 26,
    "column_name": "phone_change_sent_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "users",
    "ordinal_position": 27,
    "column_name": "confirmed_at",
    "data_type": "timestamp with time zone",
    "column_default": "LEAST(email_confirmed_at, phone_confirmed_at)",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": "s"
  },
  {
    "schema_name": "auth",
    "table_name": "users",
    "ordinal_position": 28,
    "column_name": "email_change_token_current",
    "data_type": "character varying(255)",
    "column_default": "''::character varying",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "users",
    "ordinal_position": 29,
    "column_name": "email_change_confirm_status",
    "data_type": "smallint",
    "column_default": "0",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "users",
    "ordinal_position": 30,
    "column_name": "banned_until",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "users",
    "ordinal_position": 31,
    "column_name": "reauthentication_token",
    "data_type": "character varying(255)",
    "column_default": "''::character varying",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "users",
    "ordinal_position": 32,
    "column_name": "reauthentication_sent_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "users",
    "ordinal_position": 33,
    "column_name": "is_sso_user",
    "data_type": "boolean",
    "column_default": "false",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "users",
    "ordinal_position": 34,
    "column_name": "deleted_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "auth",
    "table_name": "users",
    "ordinal_position": 35,
    "column_name": "is_anonymous",
    "data_type": "boolean",
    "column_default": "false",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "ai_insights_cards",
    "ordinal_position": 1,
    "column_name": "insight_id",
    "data_type": "uuid",
    "column_default": "gen_random_uuid()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "ai_insights_cards",
    "ordinal_position": 2,
    "column_name": "clinician_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "ai_insights_cards",
    "ordinal_position": 3,
    "column_name": "title",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "ai_insights_cards",
    "ordinal_position": 4,
    "column_name": "content",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "ai_insights_cards",
    "ordinal_position": 5,
    "column_name": "insight_type",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "ai_insights_cards",
    "ordinal_position": 6,
    "column_name": "impact_metric",
    "data_type": "jsonb",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "ai_insights_cards",
    "ordinal_position": 7,
    "column_name": "ai_model_version",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "ai_insights_cards",
    "ordinal_position": 8,
    "column_name": "confidence_score",
    "data_type": "numeric(5,2)",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "ai_insights_cards",
    "ordinal_position": 9,
    "column_name": "is_read",
    "data_type": "boolean",
    "column_default": "false",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "ai_insights_cards",
    "ordinal_position": 10,
    "column_name": "is_dismissed",
    "data_type": "boolean",
    "column_default": "false",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "ai_insights_cards",
    "ordinal_position": 11,
    "column_name": "is_pinned",
    "data_type": "boolean",
    "column_default": "false",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "ai_insights_cards",
    "ordinal_position": 12,
    "column_name": "has_action",
    "data_type": "boolean",
    "column_default": "false",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "ai_insights_cards",
    "ordinal_position": 13,
    "column_name": "action_url",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "ai_insights_cards",
    "ordinal_position": 14,
    "column_name": "action_taken",
    "data_type": "boolean",
    "column_default": "false",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "ai_insights_cards",
    "ordinal_position": 15,
    "column_name": "generated_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "ai_insights_cards",
    "ordinal_position": 16,
    "column_name": "read_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "ai_insights_cards",
    "ordinal_position": 17,
    "column_name": "dismissed_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "case_data_panels",
    "ordinal_position": 1,
    "column_name": "panel_id",
    "data_type": "uuid",
    "column_default": "gen_random_uuid()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "case_data_panels",
    "ordinal_position": 2,
    "column_name": "patient_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "case_data_panels",
    "ordinal_position": 3,
    "column_name": "panel_type",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "case_data_panels",
    "ordinal_position": 4,
    "column_name": "custom_panel_name",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "case_data_panels",
    "ordinal_position": 5,
    "column_name": "title",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "case_data_panels",
    "ordinal_position": 6,
    "column_name": "content",
    "data_type": "jsonb",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "case_data_panels",
    "ordinal_position": 7,
    "column_name": "display_order",
    "data_type": "integer",
    "column_default": "0",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "case_data_panels",
    "ordinal_position": 8,
    "column_name": "is_visible",
    "data_type": "boolean",
    "column_default": "true",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "case_data_panels",
    "ordinal_position": 9,
    "column_name": "is_collapsed",
    "data_type": "boolean",
    "column_default": "false",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "case_data_panels",
    "ordinal_position": 10,
    "column_name": "priority_score",
    "data_type": "numeric(5,2)",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "case_data_panels",
    "ordinal_position": 11,
    "column_name": "added_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "case_data_panels",
    "ordinal_position": 12,
    "column_name": "added_by",
    "data_type": "uuid",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "case_data_panels",
    "ordinal_position": 13,
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "clinical_notes_exports",
    "ordinal_position": 1,
    "column_name": "note_id",
    "data_type": "uuid",
    "column_default": "gen_random_uuid()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "clinical_notes_exports",
    "ordinal_position": 2,
    "column_name": "patient_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "clinical_notes_exports",
    "ordinal_position": 3,
    "column_name": "note_type",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "clinical_notes_exports",
    "ordinal_position": 4,
    "column_name": "content",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "clinical_notes_exports",
    "ordinal_position": 5,
    "column_name": "format",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "clinical_notes_exports",
    "ordinal_position": 6,
    "column_name": "file_path",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "clinical_notes_exports",
    "ordinal_position": 7,
    "column_name": "status",
    "data_type": "text",
    "column_default": "'draft'::text",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "clinical_notes_exports",
    "ordinal_position": 8,
    "column_name": "author_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "clinical_notes_exports",
    "ordinal_position": 9,
    "column_name": "signed_by",
    "data_type": "uuid",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "clinical_notes_exports",
    "ordinal_position": 10,
    "column_name": "signed_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "clinical_notes_exports",
    "ordinal_position": 11,
    "column_name": "digital_signature",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "clinical_notes_exports",
    "ordinal_position": 12,
    "column_name": "shared_with",
    "data_type": "uuid[]",
    "column_default": "ARRAY[]::uuid[]",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "clinical_notes_exports",
    "ordinal_position": 13,
    "column_name": "shared_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "clinical_notes_exports",
    "ordinal_position": 14,
    "column_name": "visit_date",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "clinical_notes_exports",
    "ordinal_position": 15,
    "column_name": "generated_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "clinical_notes_exports",
    "ordinal_position": 16,
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "clinical_scale_results",
    "ordinal_position": 1,
    "column_name": "scale_id",
    "data_type": "uuid",
    "column_default": "gen_random_uuid()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "clinical_scale_results",
    "ordinal_position": 2,
    "column_name": "patient_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "clinical_scale_results",
    "ordinal_position": 3,
    "column_name": "scale_type",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "clinical_scale_results",
    "ordinal_position": 4,
    "column_name": "scale_version",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "clinical_scale_results",
    "ordinal_position": 5,
    "column_name": "total_score",
    "data_type": "numeric(10,2)",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "clinical_scale_results",
    "ordinal_position": 6,
    "column_name": "subscale_scores",
    "data_type": "jsonb",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "clinical_scale_results",
    "ordinal_position": 7,
    "column_name": "assessed_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "clinical_scale_results",
    "ordinal_position": 8,
    "column_name": "due_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "clinical_scale_results",
    "ordinal_position": 9,
    "column_name": "change_from_baseline",
    "data_type": "numeric(10,2)",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "clinical_scale_results",
    "ordinal_position": 10,
    "column_name": "change_alert",
    "data_type": "boolean",
    "column_default": "false",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "clinical_scale_results",
    "ordinal_position": 11,
    "column_name": "is_significant_change",
    "data_type": "boolean",
    "column_default": "false",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "clinical_scale_results",
    "ordinal_position": 12,
    "column_name": "trend",
    "data_type": "jsonb",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "clinical_scale_results",
    "ordinal_position": 13,
    "column_name": "assessed_by",
    "data_type": "uuid",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "clinical_scale_results",
    "ordinal_position": 14,
    "column_name": "assessment_notes",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "clinical_scale_results",
    "ordinal_position": 15,
    "column_name": "patient_condition",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "clinical_scale_results",
    "ordinal_position": 16,
    "column_name": "entered_by",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "clinical_scale_results",
    "ordinal_position": 17,
    "column_name": "entered_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "clinical_scale_results",
    "ordinal_position": 18,
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "clinician_today_view",
    "ordinal_position": 1,
    "column_name": "view_id",
    "data_type": "uuid",
    "column_default": "gen_random_uuid()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "clinician_today_view",
    "ordinal_position": 2,
    "column_name": "clinician_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "clinician_today_view",
    "ordinal_position": 3,
    "column_name": "date",
    "data_type": "date",
    "column_default": "CURRENT_DATE",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "clinician_today_view",
    "ordinal_position": 4,
    "column_name": "appointments",
    "data_type": "jsonb",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "clinician_today_view",
    "ordinal_position": 5,
    "column_name": "alerts",
    "data_type": "jsonb",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "clinician_today_view",
    "ordinal_position": 6,
    "column_name": "high_priority_patients",
    "data_type": "jsonb",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "clinician_today_view",
    "ordinal_position": 7,
    "column_name": "pending_tasks",
    "data_type": "jsonb",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "clinician_today_view",
    "ordinal_position": 8,
    "column_name": "layout_config",
    "data_type": "jsonb",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "clinician_today_view",
    "ordinal_position": 9,
    "column_name": "widget_order",
    "data_type": "integer[]",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "clinician_today_view",
    "ordinal_position": 10,
    "column_name": "last_refreshed",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "clinician_today_view",
    "ordinal_position": 11,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "clinician_today_view",
    "ordinal_position": 12,
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "neuro_imaging_results",
    "ordinal_position": 1,
    "column_name": "image_id",
    "data_type": "uuid",
    "column_default": "gen_random_uuid()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "neuro_imaging_results",
    "ordinal_position": 2,
    "column_name": "patient_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "neuro_imaging_results",
    "ordinal_position": 3,
    "column_name": "study_type",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "neuro_imaging_results",
    "ordinal_position": 4,
    "column_name": "study_protocol",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "neuro_imaging_results",
    "ordinal_position": 5,
    "column_name": "modality_details",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "neuro_imaging_results",
    "ordinal_position": 6,
    "column_name": "image_path",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "neuro_imaging_results",
    "ordinal_position": 7,
    "column_name": "dicom_uid",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "neuro_imaging_results",
    "ordinal_position": 8,
    "column_name": "file_size_mb",
    "data_type": "numeric(10,2)",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "neuro_imaging_results",
    "ordinal_position": 9,
    "column_name": "findings_summary",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "neuro_imaging_results",
    "ordinal_position": 10,
    "column_name": "impression",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "neuro_imaging_results",
    "ordinal_position": 11,
    "column_name": "annotations",
    "data_type": "jsonb",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "neuro_imaging_results",
    "ordinal_position": 12,
    "column_name": "critical_findings",
    "data_type": "boolean",
    "column_default": "false",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "neuro_imaging_results",
    "ordinal_position": 13,
    "column_name": "study_date",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "neuro_imaging_results",
    "ordinal_position": 14,
    "column_name": "radiologist",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "neuro_imaging_results",
    "ordinal_position": 15,
    "column_name": "ordering_physician",
    "data_type": "uuid",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "neuro_imaging_results",
    "ordinal_position": 16,
    "column_name": "ai_processed",
    "data_type": "boolean",
    "column_default": "false",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "neuro_imaging_results",
    "ordinal_position": 17,
    "column_name": "ai_findings",
    "data_type": "jsonb",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "neuro_imaging_results",
    "ordinal_position": 18,
    "column_name": "uploaded_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "neuro_imaging_results",
    "ordinal_position": 19,
    "column_name": "uploaded_by",
    "data_type": "uuid",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "neuro_imaging_results",
    "ordinal_position": 20,
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_collab_chat",
    "ordinal_position": 1,
    "column_name": "message_id",
    "data_type": "uuid",
    "column_default": "gen_random_uuid()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_collab_chat",
    "ordinal_position": 2,
    "column_name": "patient_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_collab_chat",
    "ordinal_position": 3,
    "column_name": "sender_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_collab_chat",
    "ordinal_position": 4,
    "column_name": "message",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_collab_chat",
    "ordinal_position": 5,
    "column_name": "thread_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_collab_chat",
    "ordinal_position": 6,
    "column_name": "parent_message_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_collab_chat",
    "ordinal_position": 7,
    "column_name": "attachments",
    "data_type": "jsonb",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_collab_chat",
    "ordinal_position": 8,
    "column_name": "is_urgent",
    "data_type": "boolean",
    "column_default": "false",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_collab_chat",
    "ordinal_position": 9,
    "column_name": "requires_response",
    "data_type": "boolean",
    "column_default": "false",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_collab_chat",
    "ordinal_position": 10,
    "column_name": "is_read",
    "data_type": "boolean",
    "column_default": "false",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_collab_chat",
    "ordinal_position": 11,
    "column_name": "read_by",
    "data_type": "uuid[]",
    "column_default": "ARRAY[]::uuid[]",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_collab_chat",
    "ordinal_position": 12,
    "column_name": "read_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_collab_chat",
    "ordinal_position": 13,
    "column_name": "mentioned_users",
    "data_type": "uuid[]",
    "column_default": "ARRAY[]::uuid[]",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_collab_chat",
    "ordinal_position": 14,
    "column_name": "sent_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_collab_chat",
    "ordinal_position": 15,
    "column_name": "edited_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_collab_chat",
    "ordinal_position": 16,
    "column_name": "deleted_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_pro_timeline",
    "ordinal_position": 1,
    "column_name": "pro_id",
    "data_type": "uuid",
    "column_default": "gen_random_uuid()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_pro_timeline",
    "ordinal_position": 2,
    "column_name": "patient_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_pro_timeline",
    "ordinal_position": 3,
    "column_name": "pro_type",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_pro_timeline",
    "ordinal_position": 4,
    "column_name": "custom_type_name",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_pro_timeline",
    "ordinal_position": 5,
    "column_name": "value",
    "data_type": "numeric(10,2)",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_pro_timeline",
    "ordinal_position": 6,
    "column_name": "value_unit",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_pro_timeline",
    "ordinal_position": 7,
    "column_name": "value_json",
    "data_type": "jsonb",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_pro_timeline",
    "ordinal_position": 8,
    "column_name": "reported_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_pro_timeline",
    "ordinal_position": 9,
    "column_name": "collection_method",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_pro_timeline",
    "ordinal_position": 10,
    "column_name": "linked_intervention",
    "data_type": "uuid",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_pro_timeline",
    "ordinal_position": 11,
    "column_name": "intervention_notes",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_pro_timeline",
    "ordinal_position": 12,
    "column_name": "is_validated",
    "data_type": "boolean",
    "column_default": "false",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_pro_timeline",
    "ordinal_position": 13,
    "column_name": "validated_by",
    "data_type": "uuid",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_pro_timeline",
    "ordinal_position": 14,
    "column_name": "validation_notes",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_pro_timeline",
    "ordinal_position": 15,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_pro_timeline",
    "ordinal_position": 16,
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_risk_alerts",
    "ordinal_position": 1,
    "column_name": "alert_id",
    "data_type": "uuid",
    "column_default": "gen_random_uuid()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_risk_alerts",
    "ordinal_position": 2,
    "column_name": "patient_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_risk_alerts",
    "ordinal_position": 3,
    "column_name": "risk_type",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_risk_alerts",
    "ordinal_position": 4,
    "column_name": "alert_level",
    "data_type": "text",
    "column_default": "'moderate'::text",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_risk_alerts",
    "ordinal_position": 5,
    "column_name": "score",
    "data_type": "numeric(5,2)",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_risk_alerts",
    "ordinal_position": 6,
    "column_name": "reason",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_risk_alerts",
    "ordinal_position": 7,
    "column_name": "context_data",
    "data_type": "jsonb",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_risk_alerts",
    "ordinal_position": 8,
    "column_name": "status",
    "data_type": "text",
    "column_default": "'unread'::text",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_risk_alerts",
    "ordinal_position": 9,
    "column_name": "acknowledged_by",
    "data_type": "uuid",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_risk_alerts",
    "ordinal_position": 10,
    "column_name": "acknowledged_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_risk_alerts",
    "ordinal_position": 11,
    "column_name": "resolved_by",
    "data_type": "uuid",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_risk_alerts",
    "ordinal_position": 12,
    "column_name": "resolved_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_risk_alerts",
    "ordinal_position": 13,
    "column_name": "resolution_notes",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_risk_alerts",
    "ordinal_position": 14,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_risk_alerts",
    "ordinal_position": 15,
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_snapshots",
    "ordinal_position": 1,
    "column_name": "snapshot_id",
    "data_type": "uuid",
    "column_default": "gen_random_uuid()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_snapshots",
    "ordinal_position": 2,
    "column_name": "patient_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_snapshots",
    "ordinal_position": 3,
    "column_name": "summary",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_snapshots",
    "ordinal_position": 4,
    "column_name": "highlight_events",
    "data_type": "jsonb",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_snapshots",
    "ordinal_position": 5,
    "column_name": "key_metrics",
    "data_type": "jsonb",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_snapshots",
    "ordinal_position": 6,
    "column_name": "author",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_snapshots",
    "ordinal_position": 7,
    "column_name": "author_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_snapshots",
    "ordinal_position": 8,
    "column_name": "ai_model_version",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_snapshots",
    "ordinal_position": 9,
    "column_name": "period_start",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_snapshots",
    "ordinal_position": 10,
    "column_name": "period_end",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_snapshots",
    "ordinal_position": 11,
    "column_name": "is_pinned",
    "data_type": "boolean",
    "column_default": "false",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_snapshots",
    "ordinal_position": 12,
    "column_name": "is_archived",
    "data_type": "boolean",
    "column_default": "false",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_snapshots",
    "ordinal_position": 13,
    "column_name": "generated_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_snapshots",
    "ordinal_position": 14,
    "column_name": "reviewed_by",
    "data_type": "uuid",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "clinical",
    "table_name": "patient_snapshots",
    "ordinal_position": 15,
    "column_name": "reviewed_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "extensions",
    "table_name": "pg_stat_statements",
    "ordinal_position": 1,
    "column_name": "userid",
    "data_type": "oid",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "extensions",
    "table_name": "pg_stat_statements",
    "ordinal_position": 2,
    "column_name": "dbid",
    "data_type": "oid",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "extensions",
    "table_name": "pg_stat_statements",
    "ordinal_position": 3,
    "column_name": "toplevel",
    "data_type": "boolean",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "extensions",
    "table_name": "pg_stat_statements",
    "ordinal_position": 4,
    "column_name": "queryid",
    "data_type": "bigint",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "extensions",
    "table_name": "pg_stat_statements",
    "ordinal_position": 5,
    "column_name": "query",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "extensions",
    "table_name": "pg_stat_statements",
    "ordinal_position": 6,
    "column_name": "plans",
    "data_type": "bigint",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "extensions",
    "table_name": "pg_stat_statements",
    "ordinal_position": 7,
    "column_name": "total_plan_time",
    "data_type": "double precision",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "extensions",
    "table_name": "pg_stat_statements",
    "ordinal_position": 8,
    "column_name": "min_plan_time",
    "data_type": "double precision",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "extensions",
    "table_name": "pg_stat_statements",
    "ordinal_position": 9,
    "column_name": "max_plan_time",
    "data_type": "double precision",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "extensions",
    "table_name": "pg_stat_statements",
    "ordinal_position": 10,
    "column_name": "mean_plan_time",
    "data_type": "double precision",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "extensions",
    "table_name": "pg_stat_statements",
    "ordinal_position": 11,
    "column_name": "stddev_plan_time",
    "data_type": "double precision",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "extensions",
    "table_name": "pg_stat_statements",
    "ordinal_position": 12,
    "column_name": "calls",
    "data_type": "bigint",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "extensions",
    "table_name": "pg_stat_statements",
    "ordinal_position": 13,
    "column_name": "total_exec_time",
    "data_type": "double precision",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "extensions",
    "table_name": "pg_stat_statements",
    "ordinal_position": 14,
    "column_name": "min_exec_time",
    "data_type": "double precision",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "extensions",
    "table_name": "pg_stat_statements",
    "ordinal_position": 15,
    "column_name": "max_exec_time",
    "data_type": "double precision",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "extensions",
    "table_name": "pg_stat_statements",
    "ordinal_position": 16,
    "column_name": "mean_exec_time",
    "data_type": "double precision",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "extensions",
    "table_name": "pg_stat_statements",
    "ordinal_position": 17,
    "column_name": "stddev_exec_time",
    "data_type": "double precision",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "extensions",
    "table_name": "pg_stat_statements",
    "ordinal_position": 18,
    "column_name": "rows",
    "data_type": "bigint",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "extensions",
    "table_name": "pg_stat_statements",
    "ordinal_position": 19,
    "column_name": "shared_blks_hit",
    "data_type": "bigint",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "extensions",
    "table_name": "pg_stat_statements",
    "ordinal_position": 20,
    "column_name": "shared_blks_read",
    "data_type": "bigint",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "extensions",
    "table_name": "pg_stat_statements",
    "ordinal_position": 21,
    "column_name": "shared_blks_dirtied",
    "data_type": "bigint",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "extensions",
    "table_name": "pg_stat_statements",
    "ordinal_position": 22,
    "column_name": "shared_blks_written",
    "data_type": "bigint",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "extensions",
    "table_name": "pg_stat_statements",
    "ordinal_position": 23,
    "column_name": "local_blks_hit",
    "data_type": "bigint",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "extensions",
    "table_name": "pg_stat_statements",
    "ordinal_position": 24,
    "column_name": "local_blks_read",
    "data_type": "bigint",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "extensions",
    "table_name": "pg_stat_statements",
    "ordinal_position": 25,
    "column_name": "local_blks_dirtied",
    "data_type": "bigint",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "extensions",
    "table_name": "pg_stat_statements",
    "ordinal_position": 26,
    "column_name": "local_blks_written",
    "data_type": "bigint",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "extensions",
    "table_name": "pg_stat_statements",
    "ordinal_position": 27,
    "column_name": "temp_blks_read",
    "data_type": "bigint",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "extensions",
    "table_name": "pg_stat_statements",
    "ordinal_position": 28,
    "column_name": "temp_blks_written",
    "data_type": "bigint",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "extensions",
    "table_name": "pg_stat_statements",
    "ordinal_position": 29,
    "column_name": "shared_blk_read_time",
    "data_type": "double precision",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "extensions",
    "table_name": "pg_stat_statements",
    "ordinal_position": 30,
    "column_name": "shared_blk_write_time",
    "data_type": "double precision",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "extensions",
    "table_name": "pg_stat_statements",
    "ordinal_position": 31,
    "column_name": "local_blk_read_time",
    "data_type": "double precision",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "extensions",
    "table_name": "pg_stat_statements",
    "ordinal_position": 32,
    "column_name": "local_blk_write_time",
    "data_type": "double precision",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "extensions",
    "table_name": "pg_stat_statements",
    "ordinal_position": 33,
    "column_name": "temp_blk_read_time",
    "data_type": "double precision",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "extensions",
    "table_name": "pg_stat_statements",
    "ordinal_position": 34,
    "column_name": "temp_blk_write_time",
    "data_type": "double precision",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "extensions",
    "table_name": "pg_stat_statements",
    "ordinal_position": 35,
    "column_name": "wal_records",
    "data_type": "bigint",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "extensions",
    "table_name": "pg_stat_statements",
    "ordinal_position": 36,
    "column_name": "wal_fpi",
    "data_type": "bigint",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "extensions",
    "table_name": "pg_stat_statements",
    "ordinal_position": 37,
    "column_name": "wal_bytes",
    "data_type": "numeric",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "extensions",
    "table_name": "pg_stat_statements",
    "ordinal_position": 38,
    "column_name": "jit_functions",
    "data_type": "bigint",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "extensions",
    "table_name": "pg_stat_statements",
    "ordinal_position": 39,
    "column_name": "jit_generation_time",
    "data_type": "double precision",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "extensions",
    "table_name": "pg_stat_statements",
    "ordinal_position": 40,
    "column_name": "jit_inlining_count",
    "data_type": "bigint",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "extensions",
    "table_name": "pg_stat_statements",
    "ordinal_position": 41,
    "column_name": "jit_inlining_time",
    "data_type": "double precision",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "extensions",
    "table_name": "pg_stat_statements",
    "ordinal_position": 42,
    "column_name": "jit_optimization_count",
    "data_type": "bigint",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "extensions",
    "table_name": "pg_stat_statements",
    "ordinal_position": 43,
    "column_name": "jit_optimization_time",
    "data_type": "double precision",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "extensions",
    "table_name": "pg_stat_statements",
    "ordinal_position": 44,
    "column_name": "jit_emission_count",
    "data_type": "bigint",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "extensions",
    "table_name": "pg_stat_statements",
    "ordinal_position": 45,
    "column_name": "jit_emission_time",
    "data_type": "double precision",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "extensions",
    "table_name": "pg_stat_statements",
    "ordinal_position": 46,
    "column_name": "jit_deform_count",
    "data_type": "bigint",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "extensions",
    "table_name": "pg_stat_statements",
    "ordinal_position": 47,
    "column_name": "jit_deform_time",
    "data_type": "double precision",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "extensions",
    "table_name": "pg_stat_statements",
    "ordinal_position": 48,
    "column_name": "stats_since",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "extensions",
    "table_name": "pg_stat_statements",
    "ordinal_position": 49,
    "column_name": "minmax_stats_since",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "extensions",
    "table_name": "pg_stat_statements_info",
    "ordinal_position": 1,
    "column_name": "dealloc",
    "data_type": "bigint",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "extensions",
    "table_name": "pg_stat_statements_info",
    "ordinal_position": 2,
    "column_name": "stats_reset",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "linkage",
    "table_name": "research_id_map",
    "ordinal_position": 1,
    "column_name": "id",
    "data_type": "uuid",
    "column_default": "gen_random_uuid()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "linkage",
    "table_name": "research_id_map",
    "ordinal_position": 2,
    "column_name": "user_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "linkage",
    "table_name": "research_id_map",
    "ordinal_position": 3,
    "column_name": "research_id",
    "data_type": "uuid",
    "column_default": "gen_random_uuid()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "linkage",
    "table_name": "research_id_map",
    "ordinal_position": 4,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "linkage",
    "table_name": "research_id_map",
    "ordinal_position": 5,
    "column_name": "created_by",
    "data_type": "uuid",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "linkage",
    "table_name": "research_id_map",
    "ordinal_position": 6,
    "column_name": "last_accessed",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "linkage",
    "table_name": "research_id_map",
    "ordinal_position": 7,
    "column_name": "access_count",
    "data_type": "integer",
    "column_default": "0",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "linkage",
    "table_name": "research_id_map",
    "ordinal_position": 8,
    "column_name": "irb_protocol_number",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "linkage",
    "table_name": "research_id_map",
    "ordinal_position": 9,
    "column_name": "consent_version",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "linkage",
    "table_name": "research_id_map",
    "ordinal_position": 10,
    "column_name": "is_locked",
    "data_type": "boolean",
    "column_default": "false",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "linkage",
    "table_name": "research_id_map",
    "ordinal_position": 11,
    "column_name": "notes",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "clinical_media",
    "ordinal_position": 1,
    "column_name": "media_id",
    "data_type": "uuid",
    "column_default": "gen_random_uuid()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "clinical_media",
    "ordinal_position": 2,
    "column_name": "patient_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "clinical_media",
    "ordinal_position": 3,
    "column_name": "parent_type",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "clinical_media",
    "ordinal_position": 4,
    "column_name": "parent_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "clinical_media",
    "ordinal_position": 5,
    "column_name": "file_url",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "clinical_media",
    "ordinal_position": 6,
    "column_name": "file_type",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "clinical_media",
    "ordinal_position": 7,
    "column_name": "file_size_mb",
    "data_type": "numeric(10,2)",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "clinical_media",
    "ordinal_position": 8,
    "column_name": "mime_type",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "clinical_media",
    "ordinal_position": 9,
    "column_name": "thumbnail_url",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "clinical_media",
    "ordinal_position": 10,
    "column_name": "duration_seconds",
    "data_type": "integer",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "clinical_media",
    "ordinal_position": 11,
    "column_name": "description",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "clinical_media",
    "ordinal_position": 12,
    "column_name": "tags",
    "data_type": "jsonb",
    "column_default": "'[]'::jsonb",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "clinical_media",
    "ordinal_position": 13,
    "column_name": "storage_bucket",
    "data_type": "text",
    "column_default": "'phi-bucket'::text",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "clinical_media",
    "ordinal_position": 14,
    "column_name": "storage_path",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "clinical_media",
    "ordinal_position": 15,
    "column_name": "shared_with_clinician",
    "data_type": "boolean",
    "column_default": "true",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "clinical_media",
    "ordinal_position": 16,
    "column_name": "visible_to_researchers",
    "data_type": "boolean",
    "column_default": "false",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "clinical_media",
    "ordinal_position": 17,
    "column_name": "uploaded_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "clinical_media",
    "ordinal_position": 18,
    "column_name": "uploaded_by",
    "data_type": "uuid",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "clinician_onboarding_data",
    "ordinal_position": 1,
    "column_name": "id",
    "data_type": "uuid",
    "column_default": "gen_random_uuid()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "clinician_onboarding_data",
    "ordinal_position": 2,
    "column_name": "user_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "clinician_onboarding_data",
    "ordinal_position": 3,
    "column_name": "first_name",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "clinician_onboarding_data",
    "ordinal_position": 4,
    "column_name": "middle_name",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "clinician_onboarding_data",
    "ordinal_position": 5,
    "column_name": "last_name",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "clinician_onboarding_data",
    "ordinal_position": 6,
    "column_name": "clinician_title",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "clinician_onboarding_data",
    "ordinal_position": 7,
    "column_name": "specialty",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "clinician_onboarding_data",
    "ordinal_position": 8,
    "column_name": "institution",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "clinician_onboarding_data",
    "ordinal_position": 9,
    "column_name": "license_number",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "clinician_onboarding_data",
    "ordinal_position": 10,
    "column_name": "patient_invite_emails",
    "data_type": "text[]",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "clinician_onboarding_data",
    "ordinal_position": 11,
    "column_name": "completed_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "clinician_onboarding_data",
    "ordinal_position": 12,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "clinician_onboarding_data",
    "ordinal_position": 13,
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "clinician_onboarding_data",
    "ordinal_position": 14,
    "column_name": "onboarding_step",
    "data_type": "integer",
    "column_default": "0",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "clinician_onboarding_data",
    "ordinal_position": 15,
    "column_name": "last_updated_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "clinician_phi",
    "ordinal_position": 1,
    "column_name": "id",
    "data_type": "uuid",
    "column_default": "gen_random_uuid()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "clinician_phi",
    "ordinal_position": 2,
    "column_name": "user_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "clinician_phi",
    "ordinal_position": 3,
    "column_name": "npi_number",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "clinician_phi",
    "ordinal_position": 4,
    "column_name": "dea_number",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "clinician_phi",
    "ordinal_position": 5,
    "column_name": "license_number",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "clinician_phi",
    "ordinal_position": 6,
    "column_name": "license_state",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "clinician_phi",
    "ordinal_position": 7,
    "column_name": "license_expiry",
    "data_type": "date",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "clinician_phi",
    "ordinal_position": 8,
    "column_name": "office_phone",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "clinician_phi",
    "ordinal_position": 9,
    "column_name": "office_fax",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "clinician_phi",
    "ordinal_position": 10,
    "column_name": "practice_address",
    "data_type": "jsonb",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "clinician_phi",
    "ordinal_position": 11,
    "column_name": "medical_degree",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "clinician_phi",
    "ordinal_position": 12,
    "column_name": "board_certifications",
    "data_type": "text[]",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "clinician_phi",
    "ordinal_position": 13,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "clinician_phi",
    "ordinal_position": 14,
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "daily_symptom_logs",
    "ordinal_position": 1,
    "column_name": "log_id",
    "data_type": "uuid",
    "column_default": "gen_random_uuid()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "daily_symptom_logs",
    "ordinal_position": 2,
    "column_name": "patient_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "daily_symptom_logs",
    "ordinal_position": 3,
    "column_name": "log_date",
    "data_type": "date",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "daily_symptom_logs",
    "ordinal_position": 4,
    "column_name": "overall_feeling",
    "data_type": "integer",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "daily_symptom_logs",
    "ordinal_position": 5,
    "column_name": "mood",
    "data_type": "integer",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "daily_symptom_logs",
    "ordinal_position": 6,
    "column_name": "energy_level",
    "data_type": "integer",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "daily_symptom_logs",
    "ordinal_position": 7,
    "column_name": "fatigue_level",
    "data_type": "integer",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "daily_symptom_logs",
    "ordinal_position": 8,
    "column_name": "pain_level",
    "data_type": "integer",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "daily_symptom_logs",
    "ordinal_position": 9,
    "column_name": "sleep_quality",
    "data_type": "integer",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "daily_symptom_logs",
    "ordinal_position": 10,
    "column_name": "sleep_hours",
    "data_type": "numeric(4,1)",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "daily_symptom_logs",
    "ordinal_position": 11,
    "column_name": "sleep_disturbances",
    "data_type": "jsonb",
    "column_default": "'[]'::jsonb",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "daily_symptom_logs",
    "ordinal_position": 12,
    "column_name": "motor_fluctuations_occurred",
    "data_type": "boolean",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "daily_symptom_logs",
    "ordinal_position": 13,
    "column_name": "on_time_hours",
    "data_type": "numeric(4,1)",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "daily_symptom_logs",
    "ordinal_position": 14,
    "column_name": "off_time_hours",
    "data_type": "numeric(4,1)",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "daily_symptom_logs",
    "ordinal_position": 15,
    "column_name": "dyskinesia_severity",
    "data_type": "integer",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "daily_symptom_logs",
    "ordinal_position": 16,
    "column_name": "stiffness_severity",
    "data_type": "integer",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "daily_symptom_logs",
    "ordinal_position": 17,
    "column_name": "slowness_severity",
    "data_type": "integer",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "daily_symptom_logs",
    "ordinal_position": 18,
    "column_name": "cognitive_issues",
    "data_type": "jsonb",
    "column_default": "'[]'::jsonb",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "daily_symptom_logs",
    "ordinal_position": 19,
    "column_name": "mood_issues",
    "data_type": "jsonb",
    "column_default": "'[]'::jsonb",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "daily_symptom_logs",
    "ordinal_position": 20,
    "column_name": "autonomic_symptoms",
    "data_type": "jsonb",
    "column_default": "'[]'::jsonb",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "daily_symptom_logs",
    "ordinal_position": 21,
    "column_name": "adl_independence_level",
    "data_type": "integer",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "daily_symptom_logs",
    "ordinal_position": 22,
    "column_name": "activities_difficult",
    "data_type": "jsonb",
    "column_default": "'[]'::jsonb",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "daily_symptom_logs",
    "ordinal_position": 23,
    "column_name": "all_medications_taken",
    "data_type": "boolean",
    "column_default": "true",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "daily_symptom_logs",
    "ordinal_position": 24,
    "column_name": "missed_doses",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "daily_symptom_logs",
    "ordinal_position": 25,
    "column_name": "medication_side_effects",
    "data_type": "jsonb",
    "column_default": "'[]'::jsonb",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "daily_symptom_logs",
    "ordinal_position": 26,
    "column_name": "other_symptoms",
    "data_type": "jsonb",
    "column_default": "'[]'::jsonb",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "daily_symptom_logs",
    "ordinal_position": 27,
    "column_name": "symptom_notes",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "daily_symptom_logs",
    "ordinal_position": 28,
    "column_name": "stress_level",
    "data_type": "integer",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "daily_symptom_logs",
    "ordinal_position": 29,
    "column_name": "exercise_minutes",
    "data_type": "integer",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "daily_symptom_logs",
    "ordinal_position": 30,
    "column_name": "notable_events",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "daily_symptom_logs",
    "ordinal_position": 31,
    "column_name": "shared_with_clinician",
    "data_type": "boolean",
    "column_default": "true",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "daily_symptom_logs",
    "ordinal_position": 32,
    "column_name": "visible_to_researchers",
    "data_type": "boolean",
    "column_default": "false",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "daily_symptom_logs",
    "ordinal_position": 33,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "daily_symptom_logs",
    "ordinal_position": 34,
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "gait_episodes",
    "ordinal_position": 1,
    "column_name": "gait_id",
    "data_type": "uuid",
    "column_default": "gen_random_uuid()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "gait_episodes",
    "ordinal_position": 2,
    "column_name": "patient_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "gait_episodes",
    "ordinal_position": 3,
    "column_name": "occurred_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "gait_episodes",
    "ordinal_position": 4,
    "column_name": "duration_seconds",
    "data_type": "integer",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "gait_episodes",
    "ordinal_position": 5,
    "column_name": "event_type",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "gait_episodes",
    "ordinal_position": 6,
    "column_name": "severity",
    "data_type": "integer",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "gait_episodes",
    "ordinal_position": 7,
    "column_name": "resulted_in_fall",
    "data_type": "boolean",
    "column_default": "false",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "gait_episodes",
    "ordinal_position": 8,
    "column_name": "fall_direction",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "gait_episodes",
    "ordinal_position": 9,
    "column_name": "injury_occurred",
    "data_type": "boolean",
    "column_default": "false",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "gait_episodes",
    "ordinal_position": 10,
    "column_name": "injury_description",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "gait_episodes",
    "ordinal_position": 11,
    "column_name": "required_assistance",
    "data_type": "boolean",
    "column_default": "false",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "gait_episodes",
    "ordinal_position": 12,
    "column_name": "location",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "gait_episodes",
    "ordinal_position": 13,
    "column_name": "activity",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "gait_episodes",
    "ordinal_position": 14,
    "column_name": "environmental_factors",
    "data_type": "jsonb",
    "column_default": "'[]'::jsonb",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "gait_episodes",
    "ordinal_position": 15,
    "column_name": "medication_status",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "gait_episodes",
    "ordinal_position": 16,
    "column_name": "hours_since_medication",
    "data_type": "integer",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "gait_episodes",
    "ordinal_position": 17,
    "column_name": "freezing_trigger",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "gait_episodes",
    "ordinal_position": 18,
    "column_name": "broke_freeze_with",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "gait_episodes",
    "ordinal_position": 19,
    "column_name": "video_recorded",
    "data_type": "boolean",
    "column_default": "false",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "gait_episodes",
    "ordinal_position": 20,
    "column_name": "media_urls",
    "data_type": "jsonb",
    "column_default": "'[]'::jsonb",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "gait_episodes",
    "ordinal_position": 21,
    "column_name": "notes",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "gait_episodes",
    "ordinal_position": 22,
    "column_name": "shared_with_clinician",
    "data_type": "boolean",
    "column_default": "true",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "gait_episodes",
    "ordinal_position": 23,
    "column_name": "visible_to_researchers",
    "data_type": "boolean",
    "column_default": "false",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "gait_episodes",
    "ordinal_position": 24,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "gait_episodes",
    "ordinal_position": 25,
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "menstrual_cycle_logs",
    "ordinal_position": 1,
    "column_name": "id",
    "data_type": "uuid",
    "column_default": "gen_random_uuid()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "menstrual_cycle_logs",
    "ordinal_position": 2,
    "column_name": "user_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "menstrual_cycle_logs",
    "ordinal_position": 3,
    "column_name": "cycle_start_date",
    "data_type": "date",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "menstrual_cycle_logs",
    "ordinal_position": 4,
    "column_name": "cycle_end_date",
    "data_type": "date",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "menstrual_cycle_logs",
    "ordinal_position": 5,
    "column_name": "cycle_length_days",
    "data_type": "integer",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "menstrual_cycle_logs",
    "ordinal_position": 6,
    "column_name": "flow_intensity",
    "data_type": "flow_intensity_enum",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "menstrual_cycle_logs",
    "ordinal_position": 7,
    "column_name": "cycle_phase",
    "data_type": "cycle_phase_enum",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "menstrual_cycle_logs",
    "ordinal_position": 8,
    "column_name": "overall_symptom_severity",
    "data_type": "integer",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "menstrual_cycle_logs",
    "ordinal_position": 9,
    "column_name": "seizure_count_during_cycle",
    "data_type": "integer",
    "column_default": "0",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "menstrual_cycle_logs",
    "ordinal_position": 10,
    "column_name": "seizure_clustered_around_menstruation",
    "data_type": "boolean",
    "column_default": "false",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "menstrual_cycle_logs",
    "ordinal_position": 11,
    "column_name": "catamenial_pattern_suspected",
    "data_type": "boolean",
    "column_default": "false",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "menstrual_cycle_logs",
    "ordinal_position": 12,
    "column_name": "notes",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "menstrual_cycle_logs",
    "ordinal_position": 13,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "menstrual_cycle_logs",
    "ordinal_position": 14,
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "menstrual_log_symptoms",
    "ordinal_position": 1,
    "column_name": "id",
    "data_type": "uuid",
    "column_default": "gen_random_uuid()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "menstrual_log_symptoms",
    "ordinal_position": 2,
    "column_name": "log_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "menstrual_log_symptoms",
    "ordinal_position": 3,
    "column_name": "symptom_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "menstrual_log_symptoms",
    "ordinal_position": 4,
    "column_name": "severity",
    "data_type": "menstrual_symptom_severity_enum",
    "column_default": "'MODERATE'::menstrual_symptom_severity_enum",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "menstrual_log_symptoms",
    "ordinal_position": 5,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "patient_onboarding_data",
    "ordinal_position": 1,
    "column_name": "id",
    "data_type": "uuid",
    "column_default": "gen_random_uuid()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "patient_onboarding_data",
    "ordinal_position": 2,
    "column_name": "user_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "patient_onboarding_data",
    "ordinal_position": 3,
    "column_name": "first_name",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "patient_onboarding_data",
    "ordinal_position": 4,
    "column_name": "middle_name",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "patient_onboarding_data",
    "ordinal_position": 5,
    "column_name": "last_name",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "patient_onboarding_data",
    "ordinal_position": 6,
    "column_name": "date_of_birth",
    "data_type": "date",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "patient_onboarding_data",
    "ordinal_position": 7,
    "column_name": "gender",
    "data_type": "gender_enum",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "patient_onboarding_data",
    "ordinal_position": 8,
    "column_name": "phone_number",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "patient_onboarding_data",
    "ordinal_position": 9,
    "column_name": "emergency_contact_name",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "patient_onboarding_data",
    "ordinal_position": 10,
    "column_name": "emergency_contact_phone",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "patient_onboarding_data",
    "ordinal_position": 11,
    "column_name": "emergency_contact_relationship",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "patient_onboarding_data",
    "ordinal_position": 12,
    "column_name": "selected_conditions",
    "data_type": "uuid[]",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "patient_onboarding_data",
    "ordinal_position": 13,
    "column_name": "track_menstrual_cycle",
    "data_type": "boolean",
    "column_default": "false",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "patient_onboarding_data",
    "ordinal_position": 14,
    "column_name": "share_research_data",
    "data_type": "boolean",
    "column_default": "false",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "patient_onboarding_data",
    "ordinal_position": 15,
    "column_name": "research_data_types",
    "data_type": "research_data_type_enum[]",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "patient_onboarding_data",
    "ordinal_position": 16,
    "column_name": "completed_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "patient_onboarding_data",
    "ordinal_position": 17,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "patient_onboarding_data",
    "ordinal_position": 18,
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "patient_onboarding_data",
    "ordinal_position": 19,
    "column_name": "onboarding_step",
    "data_type": "integer",
    "column_default": "0",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "patient_onboarding_data",
    "ordinal_position": 20,
    "column_name": "last_updated_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "patient_phi",
    "ordinal_position": 1,
    "column_name": "id",
    "data_type": "uuid",
    "column_default": "gen_random_uuid()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "patient_phi",
    "ordinal_position": 2,
    "column_name": "user_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "patient_phi",
    "ordinal_position": 3,
    "column_name": "date_of_birth",
    "data_type": "date",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "patient_phi",
    "ordinal_position": 4,
    "column_name": "social_security_number_encrypted",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "patient_phi",
    "ordinal_position": 5,
    "column_name": "medical_record_number",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "patient_phi",
    "ordinal_position": 6,
    "column_name": "gender",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "patient_phi",
    "ordinal_position": 7,
    "column_name": "ethnicity",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "patient_phi",
    "ordinal_position": 8,
    "column_name": "race",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "patient_phi",
    "ordinal_position": 9,
    "column_name": "primary_language",
    "data_type": "text",
    "column_default": "'English'::text",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "patient_phi",
    "ordinal_position": 10,
    "column_name": "preferred_pronouns",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "patient_phi",
    "ordinal_position": 11,
    "column_name": "home_address",
    "data_type": "jsonb",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "patient_phi",
    "ordinal_position": 12,
    "column_name": "phone_number",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "patient_phi",
    "ordinal_position": 13,
    "column_name": "emergency_contact_name",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "patient_phi",
    "ordinal_position": 14,
    "column_name": "emergency_contact_phone",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "patient_phi",
    "ordinal_position": 15,
    "column_name": "emergency_contact_relationship",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "patient_phi",
    "ordinal_position": 16,
    "column_name": "primary_diagnosis",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "patient_phi",
    "ordinal_position": 17,
    "column_name": "diagnosis_date",
    "data_type": "date",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "patient_phi",
    "ordinal_position": 18,
    "column_name": "referring_physician",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "patient_phi",
    "ordinal_position": 19,
    "column_name": "primary_care_physician",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "patient_phi",
    "ordinal_position": 20,
    "column_name": "insurance_provider",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "patient_phi",
    "ordinal_position": 21,
    "column_name": "insurance_member_id",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "patient_phi",
    "ordinal_position": 22,
    "column_name": "timezone",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "patient_phi",
    "ordinal_position": 23,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "patient_phi",
    "ordinal_position": 24,
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "patient_phi",
    "ordinal_position": 25,
    "column_name": "medicare_number_encrypted",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "patient_phi",
    "ordinal_position": 26,
    "column_name": "medicare_irn",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "patient_phi",
    "ordinal_position": 27,
    "column_name": "medicare_expiry",
    "data_type": "date",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "patient_phi",
    "ordinal_position": 28,
    "column_name": "dva_number_encrypted",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "patient_phi",
    "ordinal_position": 29,
    "column_name": "private_health_insurer",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "patient_phi",
    "ordinal_position": 30,
    "column_name": "private_health_member_id_encrypted",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "patient_phi",
    "ordinal_position": 31,
    "column_name": "aadhaar_number_encrypted",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "patient_phi",
    "ordinal_position": 32,
    "column_name": "pan_number_encrypted",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "patient_phi",
    "ordinal_position": 33,
    "column_name": "ayushman_bharat_id_encrypted",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "patient_phi",
    "ordinal_position": 34,
    "column_name": "country_code",
    "data_type": "text",
    "column_default": "'AU'::text",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "patient_phi",
    "ordinal_position": 35,
    "column_name": "national_health_id_encrypted",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_events",
    "ordinal_position": 1,
    "column_name": "event_id",
    "data_type": "uuid",
    "column_default": "gen_random_uuid()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_events",
    "ordinal_position": 2,
    "column_name": "patient_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_events",
    "ordinal_position": 3,
    "column_name": "occurred_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_events",
    "ordinal_position": 4,
    "column_name": "duration_seconds",
    "data_type": "integer",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_events",
    "ordinal_position": 5,
    "column_name": "seizure_type",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_events",
    "ordinal_position": 6,
    "column_name": "seizure_subtype",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_events",
    "ordinal_position": 7,
    "column_name": "severity",
    "data_type": "integer",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_events",
    "ordinal_position": 8,
    "column_name": "consciousness_level",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_events",
    "ordinal_position": 9,
    "column_name": "had_aura",
    "data_type": "boolean",
    "column_default": "false",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_events",
    "ordinal_position": 10,
    "column_name": "aura_signs",
    "data_type": "jsonb",
    "column_default": "'[]'::jsonb",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_events",
    "ordinal_position": 11,
    "column_name": "aura_description",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_events",
    "ordinal_position": 12,
    "column_name": "warning_time_seconds",
    "data_type": "integer",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_events",
    "ordinal_position": 13,
    "column_name": "possible_triggers",
    "data_type": "jsonb",
    "column_default": "'[]'::jsonb",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_events",
    "ordinal_position": 14,
    "column_name": "trigger_details",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_events",
    "ordinal_position": 15,
    "column_name": "body_parts_affected",
    "data_type": "jsonb",
    "column_default": "'[]'::jsonb",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_events",
    "ordinal_position": 16,
    "column_name": "motor_symptoms",
    "data_type": "jsonb",
    "column_default": "'[]'::jsonb",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_events",
    "ordinal_position": 17,
    "column_name": "non_motor_symptoms",
    "data_type": "jsonb",
    "column_default": "'[]'::jsonb",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_events",
    "ordinal_position": 18,
    "column_name": "post_ictal_confusion",
    "data_type": "boolean",
    "column_default": "false",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_events",
    "ordinal_position": 19,
    "column_name": "post_ictal_effects",
    "data_type": "jsonb",
    "column_default": "'[]'::jsonb",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_events",
    "ordinal_position": 20,
    "column_name": "post_ictal_duration_minutes",
    "data_type": "integer",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_events",
    "ordinal_position": 21,
    "column_name": "injuries_occurred",
    "data_type": "boolean",
    "column_default": "false",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_events",
    "ordinal_position": 22,
    "column_name": "injury_types",
    "data_type": "jsonb",
    "column_default": "'[]'::jsonb",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_events",
    "ordinal_position": 23,
    "column_name": "injury_description",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_events",
    "ordinal_position": 24,
    "column_name": "required_medical_attention",
    "data_type": "boolean",
    "column_default": "false",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_events",
    "ordinal_position": 25,
    "column_name": "location",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_events",
    "ordinal_position": 26,
    "column_name": "activity_before",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_events",
    "ordinal_position": 27,
    "column_name": "witnessed",
    "data_type": "boolean",
    "column_default": "false",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_events",
    "ordinal_position": 28,
    "column_name": "witness_name",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_events",
    "ordinal_position": 29,
    "column_name": "witness_description",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_events",
    "ordinal_position": 30,
    "column_name": "medication_taken_as_prescribed",
    "data_type": "boolean",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_events",
    "ordinal_position": 31,
    "column_name": "hours_since_last_dose",
    "data_type": "integer",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_events",
    "ordinal_position": 32,
    "column_name": "recent_medication_changes",
    "data_type": "boolean",
    "column_default": "false",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_events",
    "ordinal_position": 33,
    "column_name": "fully_recovered",
    "data_type": "boolean",
    "column_default": "false",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_events",
    "ordinal_position": 34,
    "column_name": "recovery_time_minutes",
    "data_type": "integer",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_events",
    "ordinal_position": 35,
    "column_name": "video_recorded",
    "data_type": "boolean",
    "column_default": "false",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_events",
    "ordinal_position": 36,
    "column_name": "media_urls",
    "data_type": "jsonb",
    "column_default": "'[]'::jsonb",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_events",
    "ordinal_position": 37,
    "column_name": "notes",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_events",
    "ordinal_position": 38,
    "column_name": "patient_concerns",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_events",
    "ordinal_position": 39,
    "column_name": "shared_with_clinician",
    "data_type": "boolean",
    "column_default": "true",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_events",
    "ordinal_position": 40,
    "column_name": "shared_with_carers",
    "data_type": "boolean",
    "column_default": "true",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_events",
    "ordinal_position": 41,
    "column_name": "visible_to_researchers",
    "data_type": "boolean",
    "column_default": "false",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_events",
    "ordinal_position": 42,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_events",
    "ordinal_position": 43,
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_events",
    "ordinal_position": 44,
    "column_name": "synced_to_clinician_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_generalized_assessment",
    "ordinal_position": 1,
    "column_name": "id",
    "data_type": "uuid",
    "column_default": "gen_random_uuid()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_generalized_assessment",
    "ordinal_position": 2,
    "column_name": "log_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_generalized_assessment",
    "ordinal_position": 3,
    "column_name": "assessment_type",
    "data_type": "assessment_type_enum",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_generalized_assessment",
    "ordinal_position": 4,
    "column_name": "classifier_basis",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_generalized_assessment",
    "ordinal_position": 5,
    "column_name": "confidence_score",
    "data_type": "integer",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_generalized_assessment",
    "ordinal_position": 6,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_log_brain_regions",
    "ordinal_position": 1,
    "column_name": "id",
    "data_type": "uuid",
    "column_default": "gen_random_uuid()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_log_brain_regions",
    "ordinal_position": 2,
    "column_name": "log_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_log_brain_regions",
    "ordinal_position": 3,
    "column_name": "region_id",
    "data_type": "integer",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_log_brain_regions",
    "ordinal_position": 4,
    "column_name": "calculated_probability",
    "data_type": "integer",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_log_brain_regions",
    "ordinal_position": 5,
    "column_name": "probability_grade",
    "data_type": "probability_grade_enum",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_log_brain_regions",
    "ordinal_position": 6,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_log_post_ictal_symptoms",
    "ordinal_position": 1,
    "column_name": "id",
    "data_type": "uuid",
    "column_default": "gen_random_uuid()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_log_post_ictal_symptoms",
    "ordinal_position": 2,
    "column_name": "log_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_log_post_ictal_symptoms",
    "ordinal_position": 3,
    "column_name": "symptom",
    "data_type": "post_ictal_symptom_enum",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_log_post_ictal_symptoms",
    "ordinal_position": 4,
    "column_name": "severity",
    "data_type": "integer",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_log_post_ictal_symptoms",
    "ordinal_position": 5,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_log_signs",
    "ordinal_position": 1,
    "column_name": "id",
    "data_type": "uuid",
    "column_default": "gen_random_uuid()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_log_signs",
    "ordinal_position": 2,
    "column_name": "log_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_log_signs",
    "ordinal_position": 3,
    "column_name": "sign_id",
    "data_type": "integer",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_log_signs",
    "ordinal_position": 4,
    "column_name": "present",
    "data_type": "yes_no_enum",
    "column_default": "'YES'::yes_no_enum",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_log_signs",
    "ordinal_position": 5,
    "column_name": "observer_rank",
    "data_type": "witness_role_enum",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_log_signs",
    "ordinal_position": 6,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_log_triggers",
    "ordinal_position": 1,
    "column_name": "id",
    "data_type": "uuid",
    "column_default": "gen_random_uuid()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_log_triggers",
    "ordinal_position": 2,
    "column_name": "log_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_log_triggers",
    "ordinal_position": 3,
    "column_name": "trigger_id",
    "data_type": "integer",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_log_triggers",
    "ordinal_position": 4,
    "column_name": "trigger_strength",
    "data_type": "trigger_strength_enum",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_log_triggers",
    "ordinal_position": 5,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_logs_research",
    "ordinal_position": 1,
    "column_name": "log_id",
    "data_type": "uuid",
    "column_default": "gen_random_uuid()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_logs_research",
    "ordinal_position": 2,
    "column_name": "user_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_logs_research",
    "ordinal_position": 3,
    "column_name": "log_date",
    "data_type": "date",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_logs_research",
    "ordinal_position": 4,
    "column_name": "log_time",
    "data_type": "time without time zone",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_logs_research",
    "ordinal_position": 5,
    "column_name": "seizure_type",
    "data_type": "seizure_type_enum",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_logs_research",
    "ordinal_position": 6,
    "column_name": "consciousness_level",
    "data_type": "consciousness_level_enum",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_logs_research",
    "ordinal_position": 7,
    "column_name": "duration_seconds",
    "data_type": "integer",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_logs_research",
    "ordinal_position": 8,
    "column_name": "aura_present",
    "data_type": "yes_no_enum",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_logs_research",
    "ordinal_position": 9,
    "column_name": "aura_description",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_logs_research",
    "ordinal_position": 10,
    "column_name": "witnessed",
    "data_type": "yes_no_enum",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_logs_research",
    "ordinal_position": 11,
    "column_name": "witness_role",
    "data_type": "witness_role_enum",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_logs_research",
    "ordinal_position": 12,
    "column_name": "video_recorded",
    "data_type": "yes_no_enum",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_logs_research",
    "ordinal_position": 13,
    "column_name": "location_type",
    "data_type": "location_type_enum",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_logs_research",
    "ordinal_position": 14,
    "column_name": "post_ictal_confusion_minutes",
    "data_type": "integer",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_logs_research",
    "ordinal_position": 15,
    "column_name": "recovery_time_minutes",
    "data_type": "integer",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_logs_research",
    "ordinal_position": 16,
    "column_name": "sleep_hours_prior",
    "data_type": "numeric(4,1)",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_logs_research",
    "ordinal_position": 17,
    "column_name": "medication_adherence_prior",
    "data_type": "medication_adherence_enum",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_logs_research",
    "ordinal_position": 18,
    "column_name": "stress_level",
    "data_type": "stress_level_enum",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_logs_research",
    "ordinal_position": 19,
    "column_name": "emergency_services_called",
    "data_type": "yes_no_enum",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_logs_research",
    "ordinal_position": 20,
    "column_name": "rescue_medication_used",
    "data_type": "yes_no_enum",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_logs_research",
    "ordinal_position": 21,
    "column_name": "rescue_medication_type",
    "data_type": "rescue_medication_enum",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_logs_research",
    "ordinal_position": 22,
    "column_name": "hospitalized",
    "data_type": "yes_no_enum",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_logs_research",
    "ordinal_position": 23,
    "column_name": "research_grade",
    "data_type": "yes_no_enum",
    "column_default": "'YES'::yes_no_enum",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_logs_research",
    "ordinal_position": 24,
    "column_name": "notes",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_logs_research",
    "ordinal_position": 25,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_logs_research",
    "ordinal_position": 26,
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "tracking_entries",
    "ordinal_position": 1,
    "column_name": "id",
    "data_type": "uuid",
    "column_default": "gen_random_uuid()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "tracking_entries",
    "ordinal_position": 2,
    "column_name": "user_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "tracking_entries",
    "ordinal_position": 3,
    "column_name": "tracking_type",
    "data_type": "tracking_feature_enum",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "tracking_entries",
    "ordinal_position": 4,
    "column_name": "entry_date",
    "data_type": "date",
    "column_default": "CURRENT_DATE",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "tracking_entries",
    "ordinal_position": 5,
    "column_name": "value",
    "data_type": "numeric",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "tracking_entries",
    "ordinal_position": 6,
    "column_name": "severity",
    "data_type": "integer",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "tracking_entries",
    "ordinal_position": 7,
    "column_name": "notes",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "tracking_entries",
    "ordinal_position": 8,
    "column_name": "metadata",
    "data_type": "jsonb",
    "column_default": "'{}'::jsonb",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "tracking_entries",
    "ordinal_position": 9,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "tracking_entries",
    "ordinal_position": 10,
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "tremor_episodes",
    "ordinal_position": 1,
    "column_name": "tremor_id",
    "data_type": "uuid",
    "column_default": "gen_random_uuid()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "tremor_episodes",
    "ordinal_position": 2,
    "column_name": "patient_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "tremor_episodes",
    "ordinal_position": 3,
    "column_name": "occurred_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "tremor_episodes",
    "ordinal_position": 4,
    "column_name": "duration_seconds",
    "data_type": "integer",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "tremor_episodes",
    "ordinal_position": 5,
    "column_name": "tremor_type",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "tremor_episodes",
    "ordinal_position": 6,
    "column_name": "severity",
    "data_type": "integer",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "tremor_episodes",
    "ordinal_position": 7,
    "column_name": "frequency_hz",
    "data_type": "numeric(5,2)",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "tremor_episodes",
    "ordinal_position": 8,
    "column_name": "body_regions",
    "data_type": "jsonb",
    "column_default": "'[]'::jsonb",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "tremor_episodes",
    "ordinal_position": 9,
    "column_name": "dominant_side",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "tremor_episodes",
    "ordinal_position": 10,
    "column_name": "interfered_with_activities",
    "data_type": "boolean",
    "column_default": "false",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "tremor_episodes",
    "ordinal_position": 11,
    "column_name": "activities_affected",
    "data_type": "jsonb",
    "column_default": "'[]'::jsonb",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "tremor_episodes",
    "ordinal_position": 12,
    "column_name": "occurred_during",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "tremor_episodes",
    "ordinal_position": 13,
    "column_name": "medication_status",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "tremor_episodes",
    "ordinal_position": 14,
    "column_name": "hours_since_medication",
    "data_type": "integer",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "tremor_episodes",
    "ordinal_position": 15,
    "column_name": "possible_triggers",
    "data_type": "jsonb",
    "column_default": "'[]'::jsonb",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "tremor_episodes",
    "ordinal_position": 16,
    "column_name": "trigger_details",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "tremor_episodes",
    "ordinal_position": 17,
    "column_name": "video_recorded",
    "data_type": "boolean",
    "column_default": "false",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "tremor_episodes",
    "ordinal_position": 18,
    "column_name": "media_urls",
    "data_type": "jsonb",
    "column_default": "'[]'::jsonb",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "tremor_episodes",
    "ordinal_position": 19,
    "column_name": "notes",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "tremor_episodes",
    "ordinal_position": 20,
    "column_name": "shared_with_clinician",
    "data_type": "boolean",
    "column_default": "true",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "tremor_episodes",
    "ordinal_position": 21,
    "column_name": "visible_to_researchers",
    "data_type": "boolean",
    "column_default": "false",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "tremor_episodes",
    "ordinal_position": 22,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "tremor_episodes",
    "ordinal_position": 23,
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "user_conditions",
    "ordinal_position": 1,
    "column_name": "id",
    "data_type": "uuid",
    "column_default": "gen_random_uuid()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "user_conditions",
    "ordinal_position": 2,
    "column_name": "user_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "user_conditions",
    "ordinal_position": 3,
    "column_name": "condition_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "user_conditions",
    "ordinal_position": 4,
    "column_name": "diagnosis_date",
    "data_type": "date",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "user_conditions",
    "ordinal_position": 5,
    "column_name": "severity",
    "data_type": "integer",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "user_conditions",
    "ordinal_position": 6,
    "column_name": "tracking_features_enabled",
    "data_type": "tracking_feature_enum[]",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "user_conditions",
    "ordinal_position": 7,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "user_medications",
    "ordinal_position": 1,
    "column_name": "id",
    "data_type": "uuid",
    "column_default": "gen_random_uuid()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "user_medications",
    "ordinal_position": 2,
    "column_name": "user_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "user_medications",
    "ordinal_position": 3,
    "column_name": "medication_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "user_medications",
    "ordinal_position": 4,
    "column_name": "dosage_amount",
    "data_type": "numeric",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "user_medications",
    "ordinal_position": 5,
    "column_name": "dosage_unit",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "user_medications",
    "ordinal_position": 6,
    "column_name": "frequency",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "user_medications",
    "ordinal_position": 7,
    "column_name": "start_date",
    "data_type": "date",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "user_medications",
    "ordinal_position": 8,
    "column_name": "end_date",
    "data_type": "date",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "user_medications",
    "ordinal_position": 9,
    "column_name": "is_active",
    "data_type": "boolean",
    "column_default": "true",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "private_health_info",
    "table_name": "user_medications",
    "ordinal_position": 10,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "protected",
    "table_name": "system_settings",
    "ordinal_position": 1,
    "column_name": "key",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "protected",
    "table_name": "system_settings",
    "ordinal_position": 2,
    "column_name": "value",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "protected",
    "table_name": "system_settings",
    "ordinal_position": 3,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "protected",
    "table_name": "system_settings",
    "ordinal_position": 4,
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "achievements",
    "ordinal_position": 1,
    "column_name": "id",
    "data_type": "uuid",
    "column_default": "gen_random_uuid()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "achievements",
    "ordinal_position": 2,
    "column_name": "name",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "achievements",
    "ordinal_position": 3,
    "column_name": "description",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "achievements",
    "ordinal_position": 4,
    "column_name": "icon",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "achievements",
    "ordinal_position": 5,
    "column_name": "points",
    "data_type": "integer",
    "column_default": "0",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "achievements",
    "ordinal_position": 6,
    "column_name": "category",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "achievements",
    "ordinal_position": 7,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "api_request_logs",
    "ordinal_position": 1,
    "column_name": "id",
    "data_type": "uuid",
    "column_default": "gen_random_uuid()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "api_request_logs",
    "ordinal_position": 2,
    "column_name": "endpoint",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "api_request_logs",
    "ordinal_position": 3,
    "column_name": "method",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "api_request_logs",
    "ordinal_position": 4,
    "column_name": "status_code",
    "data_type": "integer",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "api_request_logs",
    "ordinal_position": 5,
    "column_name": "user_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "api_request_logs",
    "ordinal_position": 6,
    "column_name": "session_id",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "api_request_logs",
    "ordinal_position": 7,
    "column_name": "ip_address",
    "data_type": "inet",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "api_request_logs",
    "ordinal_position": 8,
    "column_name": "user_agent",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "api_request_logs",
    "ordinal_position": 9,
    "column_name": "request_time",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "api_request_logs",
    "ordinal_position": 10,
    "column_name": "response_time",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "api_request_logs",
    "ordinal_position": 11,
    "column_name": "duration_ms",
    "data_type": "integer",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "api_request_logs",
    "ordinal_position": 12,
    "column_name": "error_message",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "api_request_logs",
    "ordinal_position": 13,
    "column_name": "error_type",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "api_request_logs",
    "ordinal_position": 14,
    "column_name": "rate_limit_remaining",
    "data_type": "integer",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "api_request_logs",
    "ordinal_position": 15,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "audit_log",
    "ordinal_position": 1,
    "column_name": "id",
    "data_type": "uuid",
    "column_default": "gen_random_uuid()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "audit_log",
    "ordinal_position": 2,
    "column_name": "user_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "audit_log",
    "ordinal_position": 3,
    "column_name": "action",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "audit_log",
    "ordinal_position": 4,
    "column_name": "table_name",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "audit_log",
    "ordinal_position": 5,
    "column_name": "record_id",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "audit_log",
    "ordinal_position": 6,
    "column_name": "old_values",
    "data_type": "jsonb",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "audit_log",
    "ordinal_position": 7,
    "column_name": "new_values",
    "data_type": "jsonb",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "audit_log",
    "ordinal_position": 8,
    "column_name": "ip_address_hash",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "audit_log",
    "ordinal_position": 9,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "brain_regions_reference",
    "ordinal_position": 1,
    "column_name": "region_id",
    "data_type": "integer",
    "column_default": "nextval('brain_regions_reference_region_id_seq'::regclass)",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "brain_regions_reference",
    "ordinal_position": 2,
    "column_name": "lobe",
    "data_type": "brain_lobe_enum",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "brain_regions_reference",
    "ordinal_position": 3,
    "column_name": "subregion",
    "data_type": "brain_subregion_enum",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "brain_regions_reference",
    "ordinal_position": 4,
    "column_name": "laterality",
    "data_type": "laterality_enum",
    "column_default": "'BILATERAL'::laterality_enum",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "brain_regions_reference",
    "ordinal_position": 5,
    "column_name": "display_name",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "brain_regions_reference",
    "ordinal_position": 6,
    "column_name": "function_description",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "brain_regions_reference",
    "ordinal_position": 7,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "carer_invitations",
    "ordinal_position": 1,
    "column_name": "id",
    "data_type": "uuid",
    "column_default": "gen_random_uuid()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "carer_invitations",
    "ordinal_position": 2,
    "column_name": "relationship_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "carer_invitations",
    "ordinal_position": 3,
    "column_name": "patient_user_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "carer_invitations",
    "ordinal_position": 4,
    "column_name": "carer_email",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "carer_invitations",
    "ordinal_position": 5,
    "column_name": "carer_email_hash",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "carer_invitations",
    "ordinal_position": 6,
    "column_name": "invitation_token",
    "data_type": "text",
    "column_default": "encode(gen_random_bytes(32), 'hex'::text)",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "carer_invitations",
    "ordinal_position": 7,
    "column_name": "status",
    "data_type": "text",
    "column_default": "'pending'::text",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "carer_invitations",
    "ordinal_position": 8,
    "column_name": "dob_verification_attempts",
    "data_type": "integer",
    "column_default": "0",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "carer_invitations",
    "ordinal_position": 9,
    "column_name": "max_dob_attempts",
    "data_type": "integer",
    "column_default": "3",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "carer_invitations",
    "ordinal_position": 10,
    "column_name": "last_verification_attempt",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "carer_invitations",
    "ordinal_position": 11,
    "column_name": "invited_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "carer_invitations",
    "ordinal_position": 12,
    "column_name": "expires_at",
    "data_type": "timestamp with time zone",
    "column_default": "(now() + '30 days'::interval)",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "carer_invitations",
    "ordinal_position": 13,
    "column_name": "accepted_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "carer_invitations",
    "ordinal_position": 14,
    "column_name": "cancelled_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "carer_invitations",
    "ordinal_position": 15,
    "column_name": "carer_user_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "carer_invitations",
    "ordinal_position": 16,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "carer_invitations",
    "ordinal_position": 17,
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "carer_onboarding_data",
    "ordinal_position": 1,
    "column_name": "id",
    "data_type": "uuid",
    "column_default": "gen_random_uuid()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "carer_onboarding_data",
    "ordinal_position": 2,
    "column_name": "user_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "carer_onboarding_data",
    "ordinal_position": 3,
    "column_name": "first_name",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "carer_onboarding_data",
    "ordinal_position": 4,
    "column_name": "middle_name",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "carer_onboarding_data",
    "ordinal_position": 5,
    "column_name": "last_name",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "carer_onboarding_data",
    "ordinal_position": 6,
    "column_name": "completed_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "carer_onboarding_data",
    "ordinal_position": 7,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "carer_onboarding_data",
    "ordinal_position": 8,
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "carer_profiles",
    "ordinal_position": 1,
    "column_name": "id",
    "data_type": "uuid",
    "column_default": "gen_random_uuid()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "carer_profiles",
    "ordinal_position": 2,
    "column_name": "user_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "carer_profiles",
    "ordinal_position": 3,
    "column_name": "preferred_contact_method",
    "data_type": "text",
    "column_default": "'email'::text",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "carer_profiles",
    "ordinal_position": 4,
    "column_name": "availability_notes",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "carer_profiles",
    "ordinal_position": 5,
    "column_name": "certifications",
    "data_type": "text[]",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "carer_profiles",
    "ordinal_position": 6,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "carer_profiles",
    "ordinal_position": 7,
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "carer_relationships",
    "ordinal_position": 1,
    "column_name": "id",
    "data_type": "uuid",
    "column_default": "gen_random_uuid()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "carer_relationships",
    "ordinal_position": 2,
    "column_name": "patient_user_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "carer_relationships",
    "ordinal_position": 3,
    "column_name": "carer_user_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "carer_relationships",
    "ordinal_position": 4,
    "column_name": "relationship_type",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "carer_relationships",
    "ordinal_position": 5,
    "column_name": "relationship_details",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "carer_relationships",
    "ordinal_position": 6,
    "column_name": "status",
    "data_type": "text",
    "column_default": "'pending'::text",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "carer_relationships",
    "ordinal_position": 7,
    "column_name": "can_view_health_data",
    "data_type": "boolean",
    "column_default": "true",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "carer_relationships",
    "ordinal_position": 8,
    "column_name": "can_receive_alerts",
    "data_type": "boolean",
    "column_default": "true",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "carer_relationships",
    "ordinal_position": 9,
    "column_name": "can_manage_appointments",
    "data_type": "boolean",
    "column_default": "false",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "carer_relationships",
    "ordinal_position": 10,
    "column_name": "invited_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "carer_relationships",
    "ordinal_position": 11,
    "column_name": "approved_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "carer_relationships",
    "ordinal_position": 12,
    "column_name": "terminated_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "carer_relationships",
    "ordinal_position": 13,
    "column_name": "termination_reason",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "carer_relationships",
    "ordinal_position": 14,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "carer_relationships",
    "ordinal_position": 15,
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "clinician_profiles",
    "ordinal_position": 1,
    "column_name": "id",
    "data_type": "uuid",
    "column_default": "gen_random_uuid()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "clinician_profiles",
    "ordinal_position": 2,
    "column_name": "user_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "clinician_profiles",
    "ordinal_position": 3,
    "column_name": "specialty",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "clinician_profiles",
    "ordinal_position": 4,
    "column_name": "sub_specialty",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "clinician_profiles",
    "ordinal_position": 5,
    "column_name": "institution",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "clinician_profiles",
    "ordinal_position": 6,
    "column_name": "department",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "clinician_profiles",
    "ordinal_position": 7,
    "column_name": "years_in_practice",
    "data_type": "integer",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "clinician_profiles",
    "ordinal_position": 8,
    "column_name": "patient_capacity",
    "data_type": "integer",
    "column_default": "100",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "clinician_profiles",
    "ordinal_position": 9,
    "column_name": "accepting_new_patients",
    "data_type": "boolean",
    "column_default": "true",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "clinician_profiles",
    "ordinal_position": 10,
    "column_name": "preferred_communication",
    "data_type": "text",
    "column_default": "'email'::text",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "clinician_profiles",
    "ordinal_position": 11,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "clinician_profiles",
    "ordinal_position": 12,
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "conditions",
    "ordinal_position": 1,
    "column_name": "id",
    "data_type": "uuid",
    "column_default": "gen_random_uuid()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "conditions",
    "ordinal_position": 2,
    "column_name": "name",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "conditions",
    "ordinal_position": 3,
    "column_name": "category",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "conditions",
    "ordinal_position": 4,
    "column_name": "description",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "conditions",
    "ordinal_position": 5,
    "column_name": "snomed_code",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "conditions",
    "ordinal_position": 6,
    "column_name": "icd10_code",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "conditions",
    "ordinal_position": 7,
    "column_name": "tracking_features_array",
    "data_type": "tracking_feature_enum[]",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "conditions",
    "ordinal_position": 8,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "data_sharing_preferences",
    "ordinal_position": 1,
    "column_name": "id",
    "data_type": "uuid",
    "column_default": "gen_random_uuid()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "data_sharing_preferences",
    "ordinal_position": 2,
    "column_name": "patient_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "data_sharing_preferences",
    "ordinal_position": 3,
    "column_name": "default_share_with_clinicians",
    "data_type": "boolean",
    "column_default": "true",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "data_sharing_preferences",
    "ordinal_position": 4,
    "column_name": "default_share_with_carers",
    "data_type": "boolean",
    "column_default": "true",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "data_sharing_preferences",
    "ordinal_position": 5,
    "column_name": "default_share_with_researchers",
    "data_type": "boolean",
    "column_default": "false",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "data_sharing_preferences",
    "ordinal_position": 6,
    "column_name": "clinician_access_rules",
    "data_type": "jsonb",
    "column_default": "'[]'::jsonb",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "data_sharing_preferences",
    "ordinal_position": 7,
    "column_name": "carer_access_rules",
    "data_type": "jsonb",
    "column_default": "'[]'::jsonb",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "data_sharing_preferences",
    "ordinal_position": 8,
    "column_name": "research_seizure_data",
    "data_type": "boolean",
    "column_default": "false",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "data_sharing_preferences",
    "ordinal_position": 9,
    "column_name": "research_tremor_data",
    "data_type": "boolean",
    "column_default": "false",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "data_sharing_preferences",
    "ordinal_position": 10,
    "column_name": "research_gait_data",
    "data_type": "boolean",
    "column_default": "false",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "data_sharing_preferences",
    "ordinal_position": 11,
    "column_name": "research_medication_data",
    "data_type": "boolean",
    "column_default": "false",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "data_sharing_preferences",
    "ordinal_position": 12,
    "column_name": "research_symptom_data",
    "data_type": "boolean",
    "column_default": "false",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "data_sharing_preferences",
    "ordinal_position": 13,
    "column_name": "research_imaging_data",
    "data_type": "boolean",
    "column_default": "false",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "data_sharing_preferences",
    "ordinal_position": 14,
    "column_name": "research_demographic_data",
    "data_type": "boolean",
    "column_default": "false",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "data_sharing_preferences",
    "ordinal_position": 15,
    "column_name": "seizure_events_visibility",
    "data_type": "text",
    "column_default": "'clinician_carer'::text",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "data_sharing_preferences",
    "ordinal_position": 16,
    "column_name": "tremor_episodes_visibility",
    "data_type": "text",
    "column_default": "'clinician_carer'::text",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "data_sharing_preferences",
    "ordinal_position": 17,
    "column_name": "gait_episodes_visibility",
    "data_type": "text",
    "column_default": "'clinician_carer'::text",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "data_sharing_preferences",
    "ordinal_position": 18,
    "column_name": "daily_logs_visibility",
    "data_type": "text",
    "column_default": "'clinician_only'::text",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "data_sharing_preferences",
    "ordinal_position": 19,
    "column_name": "medications_visibility",
    "data_type": "text",
    "column_default": "'clinician_carer'::text",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "data_sharing_preferences",
    "ordinal_position": 20,
    "column_name": "media_visibility",
    "data_type": "text",
    "column_default": "'clinician_only'::text",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "data_sharing_preferences",
    "ordinal_position": 21,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "data_sharing_preferences",
    "ordinal_position": 22,
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "database_operation_logs",
    "ordinal_position": 1,
    "column_name": "id",
    "data_type": "uuid",
    "column_default": "gen_random_uuid()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "database_operation_logs",
    "ordinal_position": 2,
    "column_name": "operation_type",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "database_operation_logs",
    "ordinal_position": 3,
    "column_name": "table_schema",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "database_operation_logs",
    "ordinal_position": 4,
    "column_name": "table_name",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "database_operation_logs",
    "ordinal_position": 5,
    "column_name": "executed_by_user_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "database_operation_logs",
    "ordinal_position": 6,
    "column_name": "executed_by_role",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "database_operation_logs",
    "ordinal_position": 7,
    "column_name": "operation_detail",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "database_operation_logs",
    "ordinal_position": 8,
    "column_name": "rows_affected",
    "data_type": "integer",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "database_operation_logs",
    "ordinal_position": 9,
    "column_name": "success",
    "data_type": "boolean",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "database_operation_logs",
    "ordinal_position": 10,
    "column_name": "error_message",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "database_operation_logs",
    "ordinal_position": 11,
    "column_name": "sql_state",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "database_operation_logs",
    "ordinal_position": 12,
    "column_name": "executed_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "database_operation_logs",
    "ordinal_position": 13,
    "column_name": "session_id",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "database_operation_logs",
    "ordinal_position": 14,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "function_execution_logs",
    "ordinal_position": 1,
    "column_name": "id",
    "data_type": "uuid",
    "column_default": "gen_random_uuid()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "function_execution_logs",
    "ordinal_position": 2,
    "column_name": "function_name",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "function_execution_logs",
    "ordinal_position": 3,
    "column_name": "execution_status",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "function_execution_logs",
    "ordinal_position": 4,
    "column_name": "started_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "function_execution_logs",
    "ordinal_position": 5,
    "column_name": "completed_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "function_execution_logs",
    "ordinal_position": 6,
    "column_name": "duration_ms",
    "data_type": "integer",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "function_execution_logs",
    "ordinal_position": 7,
    "column_name": "input_user_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "function_execution_logs",
    "ordinal_position": 8,
    "column_name": "input_user_type",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "function_execution_logs",
    "ordinal_position": 9,
    "column_name": "input_parameters",
    "data_type": "jsonb",
    "column_default": "'{}'::jsonb",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "function_execution_logs",
    "ordinal_position": 10,
    "column_name": "return_value",
    "data_type": "jsonb",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "function_execution_logs",
    "ordinal_position": 11,
    "column_name": "success",
    "data_type": "boolean",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "function_execution_logs",
    "ordinal_position": 12,
    "column_name": "error_message",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "function_execution_logs",
    "ordinal_position": 13,
    "column_name": "error_detail",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "function_execution_logs",
    "ordinal_position": 14,
    "column_name": "error_hint",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "function_execution_logs",
    "ordinal_position": 15,
    "column_name": "sql_state",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "function_execution_logs",
    "ordinal_position": 16,
    "column_name": "session_id",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "function_execution_logs",
    "ordinal_position": 17,
    "column_name": "triggered_by",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "function_execution_logs",
    "ordinal_position": 18,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "medications",
    "ordinal_position": 1,
    "column_name": "id",
    "data_type": "uuid",
    "column_default": "gen_random_uuid()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "medications",
    "ordinal_position": 2,
    "column_name": "name",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "medications",
    "ordinal_position": 3,
    "column_name": "generic_name",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "medications",
    "ordinal_position": 4,
    "column_name": "category",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "medications",
    "ordinal_position": 5,
    "column_name": "rxnorm_code",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "medications",
    "ordinal_position": 6,
    "column_name": "atc_code",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "medications",
    "ordinal_position": 7,
    "column_name": "common_dosages",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "medications",
    "ordinal_position": 8,
    "column_name": "contraindications",
    "data_type": "text[]",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "medications",
    "ordinal_position": 9,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "menstrual_symptom_options",
    "ordinal_position": 1,
    "column_name": "id",
    "data_type": "uuid",
    "column_default": "gen_random_uuid()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "menstrual_symptom_options",
    "ordinal_position": 2,
    "column_name": "category",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "menstrual_symptom_options",
    "ordinal_position": 3,
    "column_name": "symptom_name",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "menstrual_symptom_options",
    "ordinal_position": 4,
    "column_name": "description",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "menstrual_symptom_options",
    "ordinal_position": 5,
    "column_name": "display_order",
    "data_type": "integer",
    "column_default": "0",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "menstrual_symptom_options",
    "ordinal_position": 6,
    "column_name": "active",
    "data_type": "boolean",
    "column_default": "true",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "menstrual_symptom_options",
    "ordinal_position": 7,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "notification_history",
    "ordinal_position": 1,
    "column_name": "id",
    "data_type": "uuid",
    "column_default": "gen_random_uuid()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "notification_history",
    "ordinal_position": 2,
    "column_name": "user_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "notification_history",
    "ordinal_position": 3,
    "column_name": "notification_type",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "notification_history",
    "ordinal_position": 4,
    "column_name": "sent_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "notification_history",
    "ordinal_position": 5,
    "column_name": "opened_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "notification_history",
    "ordinal_position": 6,
    "column_name": "action_taken",
    "data_type": "boolean",
    "column_default": "false",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "notification_history",
    "ordinal_position": 7,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "notification_preferences",
    "ordinal_position": 1,
    "column_name": "id",
    "data_type": "uuid",
    "column_default": "gen_random_uuid()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "notification_preferences",
    "ordinal_position": 2,
    "column_name": "user_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "notification_preferences",
    "ordinal_position": 3,
    "column_name": "push_enabled",
    "data_type": "boolean",
    "column_default": "true",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "notification_preferences",
    "ordinal_position": 4,
    "column_name": "email_enabled",
    "data_type": "boolean",
    "column_default": "false",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "notification_preferences",
    "ordinal_position": 5,
    "column_name": "medication_reminders",
    "data_type": "boolean",
    "column_default": "true",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "notification_preferences",
    "ordinal_position": 6,
    "column_name": "medication_reminder_minutes",
    "data_type": "integer",
    "column_default": "15",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "notification_preferences",
    "ordinal_position": 7,
    "column_name": "appointment_reminders",
    "data_type": "boolean",
    "column_default": "true",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "notification_preferences",
    "ordinal_position": 8,
    "column_name": "appointment_reminder_hours",
    "data_type": "integer",
    "column_default": "24",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "notification_preferences",
    "ordinal_position": 9,
    "column_name": "critical_alerts",
    "data_type": "boolean",
    "column_default": "true",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "notification_preferences",
    "ordinal_position": 10,
    "column_name": "pattern_alerts",
    "data_type": "boolean",
    "column_default": "true",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "notification_preferences",
    "ordinal_position": 11,
    "column_name": "achievement_notifications",
    "data_type": "boolean",
    "column_default": "true",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "notification_preferences",
    "ordinal_position": 12,
    "column_name": "message_notifications",
    "data_type": "boolean",
    "column_default": "true",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "notification_preferences",
    "ordinal_position": 13,
    "column_name": "direct_messages",
    "data_type": "boolean",
    "column_default": "true",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "notification_preferences",
    "ordinal_position": 14,
    "column_name": "daily_checkin_reminder",
    "data_type": "boolean",
    "column_default": "true",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "notification_preferences",
    "ordinal_position": 15,
    "column_name": "daily_checkin_time",
    "data_type": "time without time zone",
    "column_default": "'20:00:00'::time without time zone",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "notification_preferences",
    "ordinal_position": 16,
    "column_name": "quiet_hours_enabled",
    "data_type": "boolean",
    "column_default": "false",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "notification_preferences",
    "ordinal_position": 17,
    "column_name": "quiet_hours_start",
    "data_type": "time without time zone",
    "column_default": "'22:00:00'::time without time zone",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "notification_preferences",
    "ordinal_position": 18,
    "column_name": "quiet_hours_end",
    "data_type": "time without time zone",
    "column_default": "'08:00:00'::time without time zone",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "notification_preferences",
    "ordinal_position": 19,
    "column_name": "sound_enabled",
    "data_type": "boolean",
    "column_default": "true",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "notification_preferences",
    "ordinal_position": 20,
    "column_name": "vibration_enabled",
    "data_type": "boolean",
    "column_default": "true",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "notification_preferences",
    "ordinal_position": 21,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "notification_preferences",
    "ordinal_position": 22,
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "notification_queue",
    "ordinal_position": 1,
    "column_name": "id",
    "data_type": "uuid",
    "column_default": "gen_random_uuid()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "notification_queue",
    "ordinal_position": 2,
    "column_name": "user_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "notification_queue",
    "ordinal_position": 3,
    "column_name": "notification_type",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "notification_queue",
    "ordinal_position": 4,
    "column_name": "title",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "notification_queue",
    "ordinal_position": 5,
    "column_name": "body",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "notification_queue",
    "ordinal_position": 6,
    "column_name": "action_url",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "notification_queue",
    "ordinal_position": 7,
    "column_name": "reference_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "notification_queue",
    "ordinal_position": 8,
    "column_name": "status",
    "data_type": "text",
    "column_default": "'pending'::text",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "notification_queue",
    "ordinal_position": 9,
    "column_name": "scheduled_for",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "notification_queue",
    "ordinal_position": 10,
    "column_name": "sent_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "notification_queue",
    "ordinal_position": 11,
    "column_name": "priority",
    "data_type": "text",
    "column_default": "'normal'::text",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "notification_queue",
    "ordinal_position": 12,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "notification_queue",
    "ordinal_position": 13,
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "patient_clinician_connections",
    "ordinal_position": 1,
    "column_name": "id",
    "data_type": "uuid",
    "column_default": "gen_random_uuid()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "patient_clinician_connections",
    "ordinal_position": 2,
    "column_name": "patient_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "patient_clinician_connections",
    "ordinal_position": 3,
    "column_name": "clinician_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "patient_clinician_connections",
    "ordinal_position": 4,
    "column_name": "status",
    "data_type": "text",
    "column_default": "'pending'::text",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "patient_clinician_connections",
    "ordinal_position": 5,
    "column_name": "access_level",
    "data_type": "text",
    "column_default": "'full'::text",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "patient_clinician_connections",
    "ordinal_position": 6,
    "column_name": "access_expires_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "patient_clinician_connections",
    "ordinal_position": 7,
    "column_name": "connected_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "patient_clinician_connections",
    "ordinal_position": 8,
    "column_name": "approved_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "patient_clinician_connections",
    "ordinal_position": 9,
    "column_name": "terminated_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "patient_clinician_connections",
    "ordinal_position": 10,
    "column_name": "termination_reason",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "patient_clinician_connections",
    "ordinal_position": 11,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "patient_clinician_connections",
    "ordinal_position": 12,
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "patient_invitations",
    "ordinal_position": 1,
    "column_name": "id",
    "data_type": "uuid",
    "column_default": "gen_random_uuid()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "patient_invitations",
    "ordinal_position": 2,
    "column_name": "clinician_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "patient_invitations",
    "ordinal_position": 3,
    "column_name": "patient_email",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "patient_invitations",
    "ordinal_position": 4,
    "column_name": "patient_email_hash",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "patient_invitations",
    "ordinal_position": 5,
    "column_name": "invitation_token",
    "data_type": "text",
    "column_default": "encode(gen_random_bytes(32), 'hex'::text)",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "patient_invitations",
    "ordinal_position": 6,
    "column_name": "status",
    "data_type": "text",
    "column_default": "'pending'::text",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "patient_invitations",
    "ordinal_position": 7,
    "column_name": "patient_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "patient_invitations",
    "ordinal_position": 8,
    "column_name": "message",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "patient_invitations",
    "ordinal_position": 9,
    "column_name": "invited_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "patient_invitations",
    "ordinal_position": 10,
    "column_name": "expires_at",
    "data_type": "timestamp with time zone",
    "column_default": "(now() + '7 days'::interval)",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "patient_invitations",
    "ordinal_position": 11,
    "column_name": "accepted_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "patient_invitations",
    "ordinal_position": 12,
    "column_name": "cancelled_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "patient_invitations",
    "ordinal_position": 13,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "patient_invitations",
    "ordinal_position": 14,
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "patient_profiles",
    "ordinal_position": 1,
    "column_name": "id",
    "data_type": "uuid",
    "column_default": "gen_random_uuid()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "patient_profiles",
    "ordinal_position": 2,
    "column_name": "user_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "patient_profiles",
    "ordinal_position": 3,
    "column_name": "timezone",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "patient_profiles",
    "ordinal_position": 4,
    "column_name": "preferred_language",
    "data_type": "text",
    "column_default": "'English'::text",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "patient_profiles",
    "ordinal_position": 5,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "patient_profiles",
    "ordinal_position": 6,
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "patient_profiles",
    "ordinal_position": 7,
    "column_name": "first_name",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "patient_profiles",
    "ordinal_position": 8,
    "column_name": "last_name",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "patient_profiles",
    "ordinal_position": 9,
    "column_name": "date_of_birth",
    "data_type": "date",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "patient_profiles",
    "ordinal_position": 10,
    "column_name": "gender",
    "data_type": "gender_enum",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "profiles",
    "ordinal_position": 1,
    "column_name": "id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "profiles",
    "ordinal_position": 2,
    "column_name": "user_type",
    "data_type": "user_type_enum",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "profiles",
    "ordinal_position": 3,
    "column_name": "first_name",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "profiles",
    "ordinal_position": 4,
    "column_name": "middle_name",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "profiles",
    "ordinal_position": 5,
    "column_name": "last_name",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "profiles",
    "ordinal_position": 6,
    "column_name": "email",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "profiles",
    "ordinal_position": 7,
    "column_name": "phone_number",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "profiles",
    "ordinal_position": 8,
    "column_name": "onboarding_completed",
    "data_type": "boolean",
    "column_default": "false",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "profiles",
    "ordinal_position": 10,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "profiles",
    "ordinal_position": 11,
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "pwa_push_subscriptions",
    "ordinal_position": 1,
    "column_name": "id",
    "data_type": "uuid",
    "column_default": "gen_random_uuid()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "pwa_push_subscriptions",
    "ordinal_position": 2,
    "column_name": "user_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "pwa_push_subscriptions",
    "ordinal_position": 3,
    "column_name": "endpoint",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "pwa_push_subscriptions",
    "ordinal_position": 4,
    "column_name": "p256dh_key",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "pwa_push_subscriptions",
    "ordinal_position": 5,
    "column_name": "auth_key",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "pwa_push_subscriptions",
    "ordinal_position": 6,
    "column_name": "device_type",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "pwa_push_subscriptions",
    "ordinal_position": 7,
    "column_name": "browser",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "pwa_push_subscriptions",
    "ordinal_position": 8,
    "column_name": "active",
    "data_type": "boolean",
    "column_default": "true",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "pwa_push_subscriptions",
    "ordinal_position": 9,
    "column_name": "last_used_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "pwa_push_subscriptions",
    "ordinal_position": 10,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "pwa_push_subscriptions",
    "ordinal_position": 11,
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "research_consent",
    "ordinal_position": 1,
    "column_name": "id",
    "data_type": "uuid",
    "column_default": "gen_random_uuid()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "research_consent",
    "ordinal_position": 2,
    "column_name": "user_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "research_consent",
    "ordinal_position": 3,
    "column_name": "data_type",
    "data_type": "research_data_type_enum",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "research_consent",
    "ordinal_position": 4,
    "column_name": "consent_status",
    "data_type": "consent_status_enum",
    "column_default": "'pending'::consent_status_enum",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "research_consent",
    "ordinal_position": 5,
    "column_name": "consent_given_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "research_consent",
    "ordinal_position": 6,
    "column_name": "consent_withdrawn_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "research_consent",
    "ordinal_position": 7,
    "column_name": "consent_version",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "research_consent",
    "ordinal_position": 8,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "researcher_onboarding_data",
    "ordinal_position": 1,
    "column_name": "id",
    "data_type": "uuid",
    "column_default": "gen_random_uuid()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "researcher_onboarding_data",
    "ordinal_position": 2,
    "column_name": "user_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "researcher_onboarding_data",
    "ordinal_position": 3,
    "column_name": "first_name",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "researcher_onboarding_data",
    "ordinal_position": 4,
    "column_name": "middle_name",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "researcher_onboarding_data",
    "ordinal_position": 5,
    "column_name": "last_name",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "researcher_onboarding_data",
    "ordinal_position": 6,
    "column_name": "institution",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "researcher_onboarding_data",
    "ordinal_position": 7,
    "column_name": "research_focus",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "researcher_onboarding_data",
    "ordinal_position": 8,
    "column_name": "credentials",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "researcher_onboarding_data",
    "ordinal_position": 9,
    "column_name": "completed_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "researcher_onboarding_data",
    "ordinal_position": 10,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "researcher_onboarding_data",
    "ordinal_position": 11,
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "researcher_profiles",
    "ordinal_position": 1,
    "column_name": "id",
    "data_type": "uuid",
    "column_default": "gen_random_uuid()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "researcher_profiles",
    "ordinal_position": 2,
    "column_name": "user_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "researcher_profiles",
    "ordinal_position": 3,
    "column_name": "institution",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "researcher_profiles",
    "ordinal_position": 4,
    "column_name": "department",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "researcher_profiles",
    "ordinal_position": 5,
    "column_name": "research_focus",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "researcher_profiles",
    "ordinal_position": 6,
    "column_name": "credentials",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "researcher_profiles",
    "ordinal_position": 7,
    "column_name": "access_level",
    "data_type": "text",
    "column_default": "'basic'::text",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "researcher_profiles",
    "ordinal_position": 8,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "researcher_profiles",
    "ordinal_position": 9,
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "security_incidents",
    "ordinal_position": 1,
    "column_name": "id",
    "data_type": "uuid",
    "column_default": "gen_random_uuid()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "security_incidents",
    "ordinal_position": 2,
    "column_name": "user_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "security_incidents",
    "ordinal_position": 3,
    "column_name": "incident_type",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "security_incidents",
    "ordinal_position": 4,
    "column_name": "severity",
    "data_type": "text",
    "column_default": "'medium'::text",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "security_incidents",
    "ordinal_position": 5,
    "column_name": "description",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "security_incidents",
    "ordinal_position": 6,
    "column_name": "ip_address_hash",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "security_incidents",
    "ordinal_position": 7,
    "column_name": "user_agent",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "security_incidents",
    "ordinal_position": 8,
    "column_name": "resolved",
    "data_type": "boolean",
    "column_default": "false",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "security_incidents",
    "ordinal_position": 9,
    "column_name": "resolved_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "security_incidents",
    "ordinal_position": 10,
    "column_name": "resolved_by",
    "data_type": "uuid",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "security_incidents",
    "ordinal_position": 11,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "security_incidents",
    "ordinal_position": 12,
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "seizure_signs_reference",
    "ordinal_position": 1,
    "column_name": "sign_id",
    "data_type": "integer",
    "column_default": "nextval('seizure_signs_reference_sign_id_seq'::regclass)",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "seizure_signs_reference",
    "ordinal_position": 2,
    "column_name": "sign_name",
    "data_type": "seizure_sign_enum",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "seizure_signs_reference",
    "ordinal_position": 3,
    "column_name": "category",
    "data_type": "semiology_category_enum",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "seizure_signs_reference",
    "ordinal_position": 4,
    "column_name": "display_name",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "seizure_signs_reference",
    "ordinal_position": 5,
    "column_name": "description",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "seizure_signs_reference",
    "ordinal_position": 6,
    "column_name": "research_code",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "seizure_signs_reference",
    "ordinal_position": 7,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "seizure_triggers_reference",
    "ordinal_position": 1,
    "column_name": "trigger_id",
    "data_type": "integer",
    "column_default": "nextval('seizure_triggers_reference_trigger_id_seq'::regclass)",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "seizure_triggers_reference",
    "ordinal_position": 2,
    "column_name": "trigger_type",
    "data_type": "trigger_type_enum",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "seizure_triggers_reference",
    "ordinal_position": 3,
    "column_name": "display_name",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "seizure_triggers_reference",
    "ordinal_position": 4,
    "column_name": "description",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "seizure_triggers_reference",
    "ordinal_position": 5,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "sign_brain_region_mapping",
    "ordinal_position": 1,
    "column_name": "id",
    "data_type": "integer",
    "column_default": "nextval('sign_brain_region_mapping_id_seq'::regclass)",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "sign_brain_region_mapping",
    "ordinal_position": 2,
    "column_name": "sign_id",
    "data_type": "integer",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "sign_brain_region_mapping",
    "ordinal_position": 3,
    "column_name": "region_id",
    "data_type": "integer",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "sign_brain_region_mapping",
    "ordinal_position": 4,
    "column_name": "probability_grade",
    "data_type": "probability_grade_enum",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "sign_brain_region_mapping",
    "ordinal_position": 5,
    "column_name": "probability_percentage",
    "data_type": "integer",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "sign_brain_region_mapping",
    "ordinal_position": 6,
    "column_name": "research_basis",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "sign_brain_region_mapping",
    "ordinal_position": 7,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "symptom_options",
    "ordinal_position": 1,
    "column_name": "id",
    "data_type": "uuid",
    "column_default": "gen_random_uuid()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "symptom_options",
    "ordinal_position": 2,
    "column_name": "category",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "symptom_options",
    "ordinal_position": 3,
    "column_name": "symptom_name",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "symptom_options",
    "ordinal_position": 4,
    "column_name": "description",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "symptom_options",
    "ordinal_position": 5,
    "column_name": "display_order",
    "data_type": "integer",
    "column_default": "0",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "symptom_options",
    "ordinal_position": 6,
    "column_name": "active",
    "data_type": "boolean",
    "column_default": "true",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "system_logs",
    "ordinal_position": 1,
    "column_name": "id",
    "data_type": "uuid",
    "column_default": "gen_random_uuid()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "system_logs",
    "ordinal_position": 2,
    "column_name": "log_level",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "system_logs",
    "ordinal_position": 3,
    "column_name": "category",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "system_logs",
    "ordinal_position": 4,
    "column_name": "event_type",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "system_logs",
    "ordinal_position": 5,
    "column_name": "message",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "system_logs",
    "ordinal_position": 6,
    "column_name": "user_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "system_logs",
    "ordinal_position": 7,
    "column_name": "function_name",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "system_logs",
    "ordinal_position": 8,
    "column_name": "table_name",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "system_logs",
    "ordinal_position": 9,
    "column_name": "operation",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "system_logs",
    "ordinal_position": 10,
    "column_name": "error_code",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "system_logs",
    "ordinal_position": 11,
    "column_name": "sql_state",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "system_logs",
    "ordinal_position": 12,
    "column_name": "stack_trace",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "system_logs",
    "ordinal_position": 13,
    "column_name": "context_data",
    "data_type": "jsonb",
    "column_default": "'{}'::jsonb",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "system_logs",
    "ordinal_position": 14,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "system_logs",
    "ordinal_position": 15,
    "column_name": "session_id",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "system_logs",
    "ordinal_position": 16,
    "column_name": "ip_address",
    "data_type": "inet",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "system_logs",
    "ordinal_position": 17,
    "column_name": "user_agent",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "trigger_options",
    "ordinal_position": 1,
    "column_name": "id",
    "data_type": "uuid",
    "column_default": "gen_random_uuid()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "trigger_options",
    "ordinal_position": 2,
    "column_name": "category",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "trigger_options",
    "ordinal_position": 3,
    "column_name": "trigger_name",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "trigger_options",
    "ordinal_position": 4,
    "column_name": "description",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "trigger_options",
    "ordinal_position": 5,
    "column_name": "display_order",
    "data_type": "integer",
    "column_default": "0",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "trigger_options",
    "ordinal_position": 6,
    "column_name": "active",
    "data_type": "boolean",
    "column_default": "true",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "user_achievements",
    "ordinal_position": 1,
    "column_name": "id",
    "data_type": "uuid",
    "column_default": "gen_random_uuid()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "user_achievements",
    "ordinal_position": 2,
    "column_name": "user_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "user_achievements",
    "ordinal_position": 3,
    "column_name": "achievement_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "user_achievements",
    "ordinal_position": 4,
    "column_name": "earned_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "user_points",
    "ordinal_position": 1,
    "column_name": "id",
    "data_type": "uuid",
    "column_default": "gen_random_uuid()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "user_points",
    "ordinal_position": 2,
    "column_name": "user_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "user_points",
    "ordinal_position": 3,
    "column_name": "points",
    "data_type": "integer",
    "column_default": "0",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "user_points",
    "ordinal_position": 4,
    "column_name": "level",
    "data_type": "integer",
    "column_default": "1",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "user_points",
    "ordinal_position": 5,
    "column_name": "streak_days",
    "data_type": "integer",
    "column_default": "0",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "user_points",
    "ordinal_position": 6,
    "column_name": "last_activity_date",
    "data_type": "date",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "user_points",
    "ordinal_position": 7,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "public",
    "table_name": "user_points",
    "ordinal_position": 8,
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "realtime",
    "table_name": "messages",
    "ordinal_position": 3,
    "column_name": "topic",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "realtime",
    "table_name": "messages",
    "ordinal_position": 4,
    "column_name": "extension",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "realtime",
    "table_name": "messages",
    "ordinal_position": 5,
    "column_name": "payload",
    "data_type": "jsonb",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "realtime",
    "table_name": "messages",
    "ordinal_position": 6,
    "column_name": "event",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "realtime",
    "table_name": "messages",
    "ordinal_position": 7,
    "column_name": "private",
    "data_type": "boolean",
    "column_default": "false",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "realtime",
    "table_name": "messages",
    "ordinal_position": 8,
    "column_name": "updated_at",
    "data_type": "timestamp without time zone",
    "column_default": "now()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "realtime",
    "table_name": "messages",
    "ordinal_position": 9,
    "column_name": "inserted_at",
    "data_type": "timestamp without time zone",
    "column_default": "now()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "realtime",
    "table_name": "messages",
    "ordinal_position": 10,
    "column_name": "id",
    "data_type": "uuid",
    "column_default": "gen_random_uuid()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "realtime",
    "table_name": "schema_migrations",
    "ordinal_position": 1,
    "column_name": "version",
    "data_type": "bigint",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "realtime",
    "table_name": "schema_migrations",
    "ordinal_position": 2,
    "column_name": "inserted_at",
    "data_type": "timestamp(0) without time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "realtime",
    "table_name": "subscription",
    "ordinal_position": 1,
    "column_name": "id",
    "data_type": "bigint",
    "column_default": null,
    "not_null": true,
    "identity_kind": "a",
    "generated_kind": ""
  },
  {
    "schema_name": "realtime",
    "table_name": "subscription",
    "ordinal_position": 2,
    "column_name": "subscription_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "realtime",
    "table_name": "subscription",
    "ordinal_position": 4,
    "column_name": "entity",
    "data_type": "regclass",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "realtime",
    "table_name": "subscription",
    "ordinal_position": 5,
    "column_name": "filters",
    "data_type": "realtime.user_defined_filter[]",
    "column_default": "'{}'::realtime.user_defined_filter[]",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "realtime",
    "table_name": "subscription",
    "ordinal_position": 7,
    "column_name": "claims",
    "data_type": "jsonb",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "realtime",
    "table_name": "subscription",
    "ordinal_position": 8,
    "column_name": "claims_role",
    "data_type": "regrole",
    "column_default": "realtime.to_regrole((claims ->> 'role'::text))",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": "s"
  },
  {
    "schema_name": "realtime",
    "table_name": "subscription",
    "ordinal_position": 9,
    "column_name": "created_at",
    "data_type": "timestamp without time zone",
    "column_default": "timezone('utc'::text, now())",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "daily_symptom_logs",
    "ordinal_position": 1,
    "column_name": "log_id",
    "data_type": "uuid",
    "column_default": "gen_random_uuid()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "daily_symptom_logs",
    "ordinal_position": 2,
    "column_name": "research_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "daily_symptom_logs",
    "ordinal_position": 3,
    "column_name": "log_date",
    "data_type": "date",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "daily_symptom_logs",
    "ordinal_position": 4,
    "column_name": "overall_feeling",
    "data_type": "integer",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "daily_symptom_logs",
    "ordinal_position": 5,
    "column_name": "mood",
    "data_type": "integer",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "daily_symptom_logs",
    "ordinal_position": 6,
    "column_name": "energy_level",
    "data_type": "integer",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "daily_symptom_logs",
    "ordinal_position": 7,
    "column_name": "fatigue_level",
    "data_type": "integer",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "daily_symptom_logs",
    "ordinal_position": 8,
    "column_name": "pain_level",
    "data_type": "integer",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "daily_symptom_logs",
    "ordinal_position": 9,
    "column_name": "sleep_quality",
    "data_type": "integer",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "daily_symptom_logs",
    "ordinal_position": 10,
    "column_name": "sleep_hours",
    "data_type": "numeric(4,1)",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "daily_symptom_logs",
    "ordinal_position": 11,
    "column_name": "sleep_disturbances",
    "data_type": "jsonb",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "daily_symptom_logs",
    "ordinal_position": 12,
    "column_name": "motor_fluctuations_occurred",
    "data_type": "boolean",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "daily_symptom_logs",
    "ordinal_position": 13,
    "column_name": "on_time_hours",
    "data_type": "numeric(4,1)",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "daily_symptom_logs",
    "ordinal_position": 14,
    "column_name": "off_time_hours",
    "data_type": "numeric(4,1)",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "daily_symptom_logs",
    "ordinal_position": 15,
    "column_name": "dyskinesia_severity",
    "data_type": "integer",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "daily_symptom_logs",
    "ordinal_position": 16,
    "column_name": "stiffness_severity",
    "data_type": "integer",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "daily_symptom_logs",
    "ordinal_position": 17,
    "column_name": "slowness_severity",
    "data_type": "integer",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "daily_symptom_logs",
    "ordinal_position": 18,
    "column_name": "cognitive_issues",
    "data_type": "jsonb",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "daily_symptom_logs",
    "ordinal_position": 19,
    "column_name": "mood_issues",
    "data_type": "jsonb",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "daily_symptom_logs",
    "ordinal_position": 20,
    "column_name": "autonomic_symptoms",
    "data_type": "jsonb",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "daily_symptom_logs",
    "ordinal_position": 21,
    "column_name": "adl_independence_level",
    "data_type": "integer",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "daily_symptom_logs",
    "ordinal_position": 22,
    "column_name": "activities_difficult",
    "data_type": "jsonb",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "daily_symptom_logs",
    "ordinal_position": 23,
    "column_name": "all_medications_taken",
    "data_type": "boolean",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "daily_symptom_logs",
    "ordinal_position": 24,
    "column_name": "medication_side_effects",
    "data_type": "jsonb",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "daily_symptom_logs",
    "ordinal_position": 25,
    "column_name": "stress_level",
    "data_type": "integer",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "daily_symptom_logs",
    "ordinal_position": 26,
    "column_name": "exercise_minutes",
    "data_type": "integer",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "daily_symptom_logs",
    "ordinal_position": 27,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "daily_symptom_logs",
    "ordinal_position": 28,
    "column_name": "source_log_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "gait_episodes",
    "ordinal_position": 1,
    "column_name": "gait_id",
    "data_type": "uuid",
    "column_default": "gen_random_uuid()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "gait_episodes",
    "ordinal_position": 2,
    "column_name": "research_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "gait_episodes",
    "ordinal_position": 3,
    "column_name": "occurred_at_date",
    "data_type": "date",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "gait_episodes",
    "ordinal_position": 4,
    "column_name": "occurred_at_hour",
    "data_type": "integer",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "gait_episodes",
    "ordinal_position": 5,
    "column_name": "duration_seconds",
    "data_type": "integer",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "gait_episodes",
    "ordinal_position": 6,
    "column_name": "event_type",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "gait_episodes",
    "ordinal_position": 7,
    "column_name": "severity",
    "data_type": "integer",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "gait_episodes",
    "ordinal_position": 8,
    "column_name": "resulted_in_fall",
    "data_type": "boolean",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "gait_episodes",
    "ordinal_position": 9,
    "column_name": "fall_direction",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "gait_episodes",
    "ordinal_position": 10,
    "column_name": "injury_occurred",
    "data_type": "boolean",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "gait_episodes",
    "ordinal_position": 11,
    "column_name": "required_assistance",
    "data_type": "boolean",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "gait_episodes",
    "ordinal_position": 12,
    "column_name": "environmental_factors",
    "data_type": "jsonb",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "gait_episodes",
    "ordinal_position": 13,
    "column_name": "medication_status",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "gait_episodes",
    "ordinal_position": 14,
    "column_name": "hours_since_medication",
    "data_type": "integer",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "gait_episodes",
    "ordinal_position": 15,
    "column_name": "freezing_trigger",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "gait_episodes",
    "ordinal_position": 16,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "gait_episodes",
    "ordinal_position": 17,
    "column_name": "source_gait_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "seizure_events",
    "ordinal_position": 1,
    "column_name": "event_id",
    "data_type": "uuid",
    "column_default": "gen_random_uuid()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "seizure_events",
    "ordinal_position": 2,
    "column_name": "research_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "seizure_events",
    "ordinal_position": 3,
    "column_name": "occurred_at_date",
    "data_type": "date",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "seizure_events",
    "ordinal_position": 4,
    "column_name": "occurred_at_hour",
    "data_type": "integer",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "seizure_events",
    "ordinal_position": 5,
    "column_name": "duration_seconds",
    "data_type": "integer",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "seizure_events",
    "ordinal_position": 6,
    "column_name": "seizure_type",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "seizure_events",
    "ordinal_position": 7,
    "column_name": "severity",
    "data_type": "integer",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "seizure_events",
    "ordinal_position": 8,
    "column_name": "consciousness_level",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "seizure_events",
    "ordinal_position": 9,
    "column_name": "had_aura",
    "data_type": "boolean",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "seizure_events",
    "ordinal_position": 10,
    "column_name": "aura_signs",
    "data_type": "jsonb",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "seizure_events",
    "ordinal_position": 11,
    "column_name": "possible_triggers",
    "data_type": "jsonb",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "seizure_events",
    "ordinal_position": 12,
    "column_name": "body_parts_affected",
    "data_type": "jsonb",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "seizure_events",
    "ordinal_position": 13,
    "column_name": "motor_symptoms",
    "data_type": "jsonb",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "seizure_events",
    "ordinal_position": 14,
    "column_name": "non_motor_symptoms",
    "data_type": "jsonb",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "seizure_events",
    "ordinal_position": 15,
    "column_name": "post_ictal_effects",
    "data_type": "jsonb",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "seizure_events",
    "ordinal_position": 16,
    "column_name": "post_ictal_duration_minutes",
    "data_type": "integer",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "seizure_events",
    "ordinal_position": 17,
    "column_name": "injuries_occurred",
    "data_type": "boolean",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "seizure_events",
    "ordinal_position": 18,
    "column_name": "injury_types",
    "data_type": "jsonb",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "seizure_events",
    "ordinal_position": 19,
    "column_name": "required_medical_attention",
    "data_type": "boolean",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "seizure_events",
    "ordinal_position": 20,
    "column_name": "witnessed",
    "data_type": "boolean",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "seizure_events",
    "ordinal_position": 21,
    "column_name": "medication_taken_as_prescribed",
    "data_type": "boolean",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "seizure_events",
    "ordinal_position": 22,
    "column_name": "hours_since_last_dose",
    "data_type": "integer",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "seizure_events",
    "ordinal_position": 23,
    "column_name": "recent_medication_changes",
    "data_type": "boolean",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "seizure_events",
    "ordinal_position": 24,
    "column_name": "fully_recovered",
    "data_type": "boolean",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "seizure_events",
    "ordinal_position": 25,
    "column_name": "recovery_time_minutes",
    "data_type": "integer",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "seizure_events",
    "ordinal_position": 26,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "seizure_events",
    "ordinal_position": 27,
    "column_name": "source_event_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "tremor_episodes",
    "ordinal_position": 1,
    "column_name": "tremor_id",
    "data_type": "uuid",
    "column_default": "gen_random_uuid()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "tremor_episodes",
    "ordinal_position": 2,
    "column_name": "research_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "tremor_episodes",
    "ordinal_position": 3,
    "column_name": "occurred_at_date",
    "data_type": "date",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "tremor_episodes",
    "ordinal_position": 4,
    "column_name": "occurred_at_hour",
    "data_type": "integer",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "tremor_episodes",
    "ordinal_position": 5,
    "column_name": "duration_seconds",
    "data_type": "integer",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "tremor_episodes",
    "ordinal_position": 6,
    "column_name": "tremor_type",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "tremor_episodes",
    "ordinal_position": 7,
    "column_name": "severity",
    "data_type": "integer",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "tremor_episodes",
    "ordinal_position": 8,
    "column_name": "frequency_hz",
    "data_type": "numeric(5,2)",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "tremor_episodes",
    "ordinal_position": 9,
    "column_name": "body_regions",
    "data_type": "jsonb",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "tremor_episodes",
    "ordinal_position": 10,
    "column_name": "dominant_side",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "tremor_episodes",
    "ordinal_position": 11,
    "column_name": "interfered_with_activities",
    "data_type": "boolean",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "tremor_episodes",
    "ordinal_position": 12,
    "column_name": "activities_affected",
    "data_type": "jsonb",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "tremor_episodes",
    "ordinal_position": 13,
    "column_name": "occurred_during",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "tremor_episodes",
    "ordinal_position": 14,
    "column_name": "medication_status",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "tremor_episodes",
    "ordinal_position": 15,
    "column_name": "hours_since_medication",
    "data_type": "integer",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "tremor_episodes",
    "ordinal_position": 16,
    "column_name": "possible_triggers",
    "data_type": "jsonb",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "tremor_episodes",
    "ordinal_position": 17,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "research",
    "table_name": "tremor_episodes",
    "ordinal_position": 18,
    "column_name": "source_tremor_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "storage",
    "table_name": "buckets",
    "ordinal_position": 1,
    "column_name": "id",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "storage",
    "table_name": "buckets",
    "ordinal_position": 2,
    "column_name": "name",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "storage",
    "table_name": "buckets",
    "ordinal_position": 3,
    "column_name": "owner",
    "data_type": "uuid",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "storage",
    "table_name": "buckets",
    "ordinal_position": 4,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "storage",
    "table_name": "buckets",
    "ordinal_position": 5,
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "storage",
    "table_name": "buckets",
    "ordinal_position": 6,
    "column_name": "public",
    "data_type": "boolean",
    "column_default": "false",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "storage",
    "table_name": "buckets",
    "ordinal_position": 7,
    "column_name": "avif_autodetection",
    "data_type": "boolean",
    "column_default": "false",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "storage",
    "table_name": "buckets",
    "ordinal_position": 8,
    "column_name": "file_size_limit",
    "data_type": "bigint",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "storage",
    "table_name": "buckets",
    "ordinal_position": 9,
    "column_name": "allowed_mime_types",
    "data_type": "text[]",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "storage",
    "table_name": "buckets",
    "ordinal_position": 10,
    "column_name": "owner_id",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "storage",
    "table_name": "buckets",
    "ordinal_position": 11,
    "column_name": "type",
    "data_type": "storage.buckettype",
    "column_default": "'STANDARD'::storage.buckettype",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "storage",
    "table_name": "buckets_analytics",
    "ordinal_position": 1,
    "column_name": "id",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "storage",
    "table_name": "buckets_analytics",
    "ordinal_position": 2,
    "column_name": "type",
    "data_type": "storage.buckettype",
    "column_default": "'ANALYTICS'::storage.buckettype",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "storage",
    "table_name": "buckets_analytics",
    "ordinal_position": 3,
    "column_name": "format",
    "data_type": "text",
    "column_default": "'ICEBERG'::text",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "storage",
    "table_name": "buckets_analytics",
    "ordinal_position": 4,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "storage",
    "table_name": "buckets_analytics",
    "ordinal_position": 5,
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "storage",
    "table_name": "migrations",
    "ordinal_position": 1,
    "column_name": "id",
    "data_type": "integer",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "storage",
    "table_name": "migrations",
    "ordinal_position": 2,
    "column_name": "name",
    "data_type": "character varying(100)",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "storage",
    "table_name": "migrations",
    "ordinal_position": 3,
    "column_name": "hash",
    "data_type": "character varying(40)",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "storage",
    "table_name": "migrations",
    "ordinal_position": 4,
    "column_name": "executed_at",
    "data_type": "timestamp without time zone",
    "column_default": "CURRENT_TIMESTAMP",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "storage",
    "table_name": "objects",
    "ordinal_position": 1,
    "column_name": "id",
    "data_type": "uuid",
    "column_default": "gen_random_uuid()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "storage",
    "table_name": "objects",
    "ordinal_position": 2,
    "column_name": "bucket_id",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "storage",
    "table_name": "objects",
    "ordinal_position": 3,
    "column_name": "name",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "storage",
    "table_name": "objects",
    "ordinal_position": 4,
    "column_name": "owner",
    "data_type": "uuid",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "storage",
    "table_name": "objects",
    "ordinal_position": 5,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "storage",
    "table_name": "objects",
    "ordinal_position": 6,
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "storage",
    "table_name": "objects",
    "ordinal_position": 7,
    "column_name": "last_accessed_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "storage",
    "table_name": "objects",
    "ordinal_position": 8,
    "column_name": "metadata",
    "data_type": "jsonb",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "storage",
    "table_name": "objects",
    "ordinal_position": 9,
    "column_name": "path_tokens",
    "data_type": "text[]",
    "column_default": "string_to_array(name, '/'::text)",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": "s"
  },
  {
    "schema_name": "storage",
    "table_name": "objects",
    "ordinal_position": 10,
    "column_name": "version",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "storage",
    "table_name": "objects",
    "ordinal_position": 11,
    "column_name": "owner_id",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "storage",
    "table_name": "objects",
    "ordinal_position": 12,
    "column_name": "user_metadata",
    "data_type": "jsonb",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "storage",
    "table_name": "objects",
    "ordinal_position": 13,
    "column_name": "level",
    "data_type": "integer",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "storage",
    "table_name": "prefixes",
    "ordinal_position": 1,
    "column_name": "bucket_id",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "storage",
    "table_name": "prefixes",
    "ordinal_position": 2,
    "column_name": "name",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "storage",
    "table_name": "prefixes",
    "ordinal_position": 3,
    "column_name": "level",
    "data_type": "integer",
    "column_default": "storage.get_level(name)",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": "s"
  },
  {
    "schema_name": "storage",
    "table_name": "prefixes",
    "ordinal_position": 4,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "storage",
    "table_name": "prefixes",
    "ordinal_position": 5,
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "storage",
    "table_name": "s3_multipart_uploads",
    "ordinal_position": 1,
    "column_name": "id",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "storage",
    "table_name": "s3_multipart_uploads",
    "ordinal_position": 2,
    "column_name": "in_progress_size",
    "data_type": "bigint",
    "column_default": "0",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "storage",
    "table_name": "s3_multipart_uploads",
    "ordinal_position": 3,
    "column_name": "upload_signature",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "storage",
    "table_name": "s3_multipart_uploads",
    "ordinal_position": 4,
    "column_name": "bucket_id",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "storage",
    "table_name": "s3_multipart_uploads",
    "ordinal_position": 5,
    "column_name": "key",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "storage",
    "table_name": "s3_multipart_uploads",
    "ordinal_position": 6,
    "column_name": "version",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "storage",
    "table_name": "s3_multipart_uploads",
    "ordinal_position": 7,
    "column_name": "owner_id",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "storage",
    "table_name": "s3_multipart_uploads",
    "ordinal_position": 8,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "storage",
    "table_name": "s3_multipart_uploads",
    "ordinal_position": 9,
    "column_name": "user_metadata",
    "data_type": "jsonb",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "storage",
    "table_name": "s3_multipart_uploads_parts",
    "ordinal_position": 1,
    "column_name": "id",
    "data_type": "uuid",
    "column_default": "gen_random_uuid()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "storage",
    "table_name": "s3_multipart_uploads_parts",
    "ordinal_position": 2,
    "column_name": "upload_id",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "storage",
    "table_name": "s3_multipart_uploads_parts",
    "ordinal_position": 3,
    "column_name": "size",
    "data_type": "bigint",
    "column_default": "0",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "storage",
    "table_name": "s3_multipart_uploads_parts",
    "ordinal_position": 4,
    "column_name": "part_number",
    "data_type": "integer",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "storage",
    "table_name": "s3_multipart_uploads_parts",
    "ordinal_position": 5,
    "column_name": "bucket_id",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "storage",
    "table_name": "s3_multipart_uploads_parts",
    "ordinal_position": 6,
    "column_name": "key",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "storage",
    "table_name": "s3_multipart_uploads_parts",
    "ordinal_position": 7,
    "column_name": "etag",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "storage",
    "table_name": "s3_multipart_uploads_parts",
    "ordinal_position": 8,
    "column_name": "owner_id",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "storage",
    "table_name": "s3_multipart_uploads_parts",
    "ordinal_position": 9,
    "column_name": "version",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "storage",
    "table_name": "s3_multipart_uploads_parts",
    "ordinal_position": 10,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "supabase_migrations",
    "table_name": "schema_migrations",
    "ordinal_position": 1,
    "column_name": "version",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "supabase_migrations",
    "table_name": "schema_migrations",
    "ordinal_position": 2,
    "column_name": "statements",
    "data_type": "text[]",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "supabase_migrations",
    "table_name": "schema_migrations",
    "ordinal_position": 3,
    "column_name": "name",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "supabase_migrations",
    "table_name": "schema_migrations",
    "ordinal_position": 4,
    "column_name": "created_by",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "supabase_migrations",
    "table_name": "schema_migrations",
    "ordinal_position": 5,
    "column_name": "idempotency_key",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "supabase_migrations",
    "table_name": "seed_files",
    "ordinal_position": 1,
    "column_name": "path",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "supabase_migrations",
    "table_name": "seed_files",
    "ordinal_position": 2,
    "column_name": "hash",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "vault",
    "table_name": "decrypted_secrets",
    "ordinal_position": 1,
    "column_name": "id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "vault",
    "table_name": "decrypted_secrets",
    "ordinal_position": 2,
    "column_name": "name",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "vault",
    "table_name": "decrypted_secrets",
    "ordinal_position": 3,
    "column_name": "description",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "vault",
    "table_name": "decrypted_secrets",
    "ordinal_position": 4,
    "column_name": "secret",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "vault",
    "table_name": "decrypted_secrets",
    "ordinal_position": 5,
    "column_name": "decrypted_secret",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "vault",
    "table_name": "decrypted_secrets",
    "ordinal_position": 6,
    "column_name": "key_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "vault",
    "table_name": "decrypted_secrets",
    "ordinal_position": 7,
    "column_name": "nonce",
    "data_type": "bytea",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "vault",
    "table_name": "decrypted_secrets",
    "ordinal_position": 8,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "vault",
    "table_name": "decrypted_secrets",
    "ordinal_position": 9,
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "vault",
    "table_name": "secrets",
    "ordinal_position": 1,
    "column_name": "id",
    "data_type": "uuid",
    "column_default": "gen_random_uuid()",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "vault",
    "table_name": "secrets",
    "ordinal_position": 2,
    "column_name": "name",
    "data_type": "text",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "vault",
    "table_name": "secrets",
    "ordinal_position": 3,
    "column_name": "description",
    "data_type": "text",
    "column_default": "''::text",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "vault",
    "table_name": "secrets",
    "ordinal_position": 4,
    "column_name": "secret",
    "data_type": "text",
    "column_default": null,
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "vault",
    "table_name": "secrets",
    "ordinal_position": 5,
    "column_name": "key_id",
    "data_type": "uuid",
    "column_default": null,
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "vault",
    "table_name": "secrets",
    "ordinal_position": 6,
    "column_name": "nonce",
    "data_type": "bytea",
    "column_default": "vault._crypto_aead_det_noncegen()",
    "not_null": false,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "vault",
    "table_name": "secrets",
    "ordinal_position": 7,
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": "CURRENT_TIMESTAMP",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  },
  {
    "schema_name": "vault",
    "table_name": "secrets",
    "ordinal_position": 8,
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "column_default": "CURRENT_TIMESTAMP",
    "not_null": true,
    "identity_kind": "",
    "generated_kind": ""
  }
]

``



---------

# Primary Keys, unique constraints, and check constraints (all schemas)

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





---------



# Foreign keys (all schemas)


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



---------

# Indexes (all schemas)



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





--------

# Triggers (all schemas)

[
  {
    "schema_name": "auth",
    "table_name": "users",
    "trigger_name": "on_auth_user_created",
    "granularity": "ROW",
    "events": [
      "INSERT"
    ],
    "timing": "AFTER",
    "function_name": "public.handle_new_user",
    "trigger_def": "CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION handle_new_user()"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "clinician_onboarding_data",
    "trigger_name": "update_clinician_onboarding_timestamp",
    "granularity": "ROW",
    "events": [
      "UPDATE"
    ],
    "timing": "BEFORE",
    "function_name": "private_health_info.update_onboarding_timestamp",
    "trigger_def": "CREATE TRIGGER update_clinician_onboarding_timestamp BEFORE UPDATE ON private_health_info.clinician_onboarding_data FOR EACH ROW EXECUTE FUNCTION private_health_info.update_onboarding_timestamp()"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "daily_symptom_logs",
    "trigger_name": "daily_log_to_research_trigger",
    "granularity": "ROW",
    "events": [
      "INSERT",
      "UPDATE"
    ],
    "timing": "AFTER",
    "function_name": "private_health_info.anonymize_daily_log_to_research",
    "trigger_def": "CREATE TRIGGER daily_log_to_research_trigger AFTER INSERT OR UPDATE ON private_health_info.daily_symptom_logs FOR EACH ROW EXECUTE FUNCTION private_health_info.anonymize_daily_log_to_research()"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "gait_episodes",
    "trigger_name": "gait_to_research_trigger",
    "granularity": "ROW",
    "events": [
      "INSERT",
      "UPDATE"
    ],
    "timing": "AFTER",
    "function_name": "private_health_info.anonymize_gait_to_research",
    "trigger_def": "CREATE TRIGGER gait_to_research_trigger AFTER INSERT OR UPDATE ON private_health_info.gait_episodes FOR EACH ROW EXECUTE FUNCTION private_health_info.anonymize_gait_to_research()"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "menstrual_cycle_logs",
    "trigger_name": "trigger_catamenial_pattern_alert",
    "granularity": "ROW",
    "events": [
      "INSERT"
    ],
    "timing": "AFTER",
    "function_name": "private_health_info.check_catamenial_pattern_alert",
    "trigger_def": "CREATE TRIGGER trigger_catamenial_pattern_alert AFTER INSERT ON private_health_info.menstrual_cycle_logs FOR EACH ROW EXECUTE FUNCTION private_health_info.check_catamenial_pattern_alert()"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "menstrual_cycle_logs",
    "trigger_name": "trigger_update_menstrual_log_timestamp",
    "granularity": "ROW",
    "events": [
      "UPDATE"
    ],
    "timing": "BEFORE",
    "function_name": "private_health_info.update_menstrual_log_timestamp",
    "trigger_def": "CREATE TRIGGER trigger_update_menstrual_log_timestamp BEFORE UPDATE ON private_health_info.menstrual_cycle_logs FOR EACH ROW EXECUTE FUNCTION private_health_info.update_menstrual_log_timestamp()"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "patient_onboarding_data",
    "trigger_name": "update_patient_onboarding_timestamp",
    "granularity": "ROW",
    "events": [
      "UPDATE"
    ],
    "timing": "BEFORE",
    "function_name": "private_health_info.update_onboarding_timestamp",
    "trigger_def": "CREATE TRIGGER update_patient_onboarding_timestamp BEFORE UPDATE ON private_health_info.patient_onboarding_data FOR EACH ROW EXECUTE FUNCTION private_health_info.update_onboarding_timestamp()"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_events",
    "trigger_name": "seizure_to_research_trigger",
    "granularity": "ROW",
    "events": [
      "INSERT",
      "UPDATE"
    ],
    "timing": "AFTER",
    "function_name": "private_health_info.anonymize_seizure_to_research",
    "trigger_def": "CREATE TRIGGER seizure_to_research_trigger AFTER INSERT OR UPDATE ON private_health_info.seizure_events FOR EACH ROW EXECUTE FUNCTION private_health_info.anonymize_seizure_to_research()"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "seizure_events",
    "trigger_name": "trigger_seizure_cluster_alert",
    "granularity": "ROW",
    "events": [
      "INSERT"
    ],
    "timing": "AFTER",
    "function_name": "private_health_info.check_seizure_cluster_alert",
    "trigger_def": "CREATE TRIGGER trigger_seizure_cluster_alert AFTER INSERT ON private_health_info.seizure_events FOR EACH ROW EXECUTE FUNCTION private_health_info.check_seizure_cluster_alert()"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "tremor_episodes",
    "trigger_name": "tremor_to_research_trigger",
    "granularity": "ROW",
    "events": [
      "INSERT",
      "UPDATE"
    ],
    "timing": "AFTER",
    "function_name": "private_health_info.anonymize_tremor_to_research",
    "trigger_def": "CREATE TRIGGER tremor_to_research_trigger AFTER INSERT OR UPDATE ON private_health_info.tremor_episodes FOR EACH ROW EXECUTE FUNCTION private_health_info.anonymize_tremor_to_research()"
  },
  {
    "schema_name": "private_health_info",
    "table_name": "user_medications",
    "trigger_name": "trigger_schedule_medication_reminders",
    "granularity": "ROW",
    "events": [
      "INSERT",
      "UPDATE"
    ],
    "timing": "AFTER",
    "function_name": "private_health_info.schedule_medication_reminders",
    "trigger_def": "CREATE TRIGGER trigger_schedule_medication_reminders AFTER INSERT OR UPDATE ON private_health_info.user_medications FOR EACH ROW WHEN (new.end_date IS NULL) EXECUTE FUNCTION private_health_info.schedule_medication_reminders()"
  },
  {
    "schema_name": "realtime",
    "table_name": "subscription",
    "trigger_name": "tr_check_filters",
    "granularity": "ROW",
    "events": [
      "INSERT",
      "UPDATE"
    ],
    "timing": "BEFORE",
    "function_name": "realtime.subscription_check_filters",
    "trigger_def": "CREATE TRIGGER tr_check_filters BEFORE INSERT OR UPDATE ON realtime.subscription FOR EACH ROW EXECUTE FUNCTION realtime.subscription_check_filters()"
  },
  {
    "schema_name": "storage",
    "table_name": "buckets",
    "trigger_name": "enforce_bucket_name_length_trigger",
    "granularity": "ROW",
    "events": [
      "INSERT",
      "UPDATE"
    ],
    "timing": "BEFORE",
    "function_name": "storage.enforce_bucket_name_length",
    "trigger_def": "CREATE TRIGGER enforce_bucket_name_length_trigger BEFORE INSERT OR UPDATE OF name ON storage.buckets FOR EACH ROW EXECUTE FUNCTION storage.enforce_bucket_name_length()"
  },
  {
    "schema_name": "storage",
    "table_name": "objects",
    "trigger_name": "objects_delete_delete_prefix",
    "granularity": "ROW",
    "events": [
      "DELETE"
    ],
    "timing": "AFTER",
    "function_name": "storage.delete_prefix_hierarchy_trigger",
    "trigger_def": "CREATE TRIGGER objects_delete_delete_prefix AFTER DELETE ON storage.objects FOR EACH ROW EXECUTE FUNCTION storage.delete_prefix_hierarchy_trigger()"
  },
  {
    "schema_name": "storage",
    "table_name": "objects",
    "trigger_name": "objects_insert_create_prefix",
    "granularity": "ROW",
    "events": [
      "INSERT"
    ],
    "timing": "BEFORE",
    "function_name": "storage.objects_insert_prefix_trigger",
    "trigger_def": "CREATE TRIGGER objects_insert_create_prefix BEFORE INSERT ON storage.objects FOR EACH ROW EXECUTE FUNCTION storage.objects_insert_prefix_trigger()"
  },
  {
    "schema_name": "storage",
    "table_name": "objects",
    "trigger_name": "objects_update_create_prefix",
    "granularity": "ROW",
    "events": [
      "UPDATE"
    ],
    "timing": "BEFORE",
    "function_name": "storage.objects_update_prefix_trigger",
    "trigger_def": "CREATE TRIGGER objects_update_create_prefix BEFORE UPDATE ON storage.objects FOR EACH ROW WHEN (new.name <> old.name OR new.bucket_id <> old.bucket_id) EXECUTE FUNCTION storage.objects_update_prefix_trigger()"
  },
  {
    "schema_name": "storage",
    "table_name": "objects",
    "trigger_name": "update_objects_updated_at",
    "granularity": "ROW",
    "events": [
      "UPDATE"
    ],
    "timing": "BEFORE",
    "function_name": "storage.update_updated_at_column",
    "trigger_def": "CREATE TRIGGER update_objects_updated_at BEFORE UPDATE ON storage.objects FOR EACH ROW EXECUTE FUNCTION storage.update_updated_at_column()"
  },
  {
    "schema_name": "storage",
    "table_name": "prefixes",
    "trigger_name": "prefixes_create_hierarchy",
    "granularity": "ROW",
    "events": [
      "INSERT"
    ],
    "timing": "BEFORE",
    "function_name": "storage.prefixes_insert_trigger",
    "trigger_def": "CREATE TRIGGER prefixes_create_hierarchy BEFORE INSERT ON storage.prefixes FOR EACH ROW WHEN (pg_trigger_depth() < 1) EXECUTE FUNCTION storage.prefixes_insert_trigger()"
  },
  {
    "schema_name": "storage",
    "table_name": "prefixes",
    "trigger_name": "prefixes_delete_hierarchy",
    "granularity": "ROW",
    "events": [
      "DELETE"
    ],
    "timing": "AFTER",
    "function_name": "storage.delete_prefix_hierarchy_trigger",
    "trigger_def": "CREATE TRIGGER prefixes_delete_hierarchy AFTER DELETE ON storage.prefixes FOR EACH ROW EXECUTE FUNCTION storage.delete_prefix_hierarchy_trigger()"
  }
]


---------



# Functions (all schemas) with argument types and return type

[
  {
    "schema_name": "auth",
    "function_name": "email",
    "args_signature": "",
    "return_type": "text",
    "language": "sql",
    "security_definer": false,
    "volatility": "s",
    "parallel": "u",
    "comment": "Deprecated. Use auth.jwt() -> 'email' instead."
  },
  {
    "schema_name": "auth",
    "function_name": "jwt",
    "args_signature": "",
    "return_type": "jsonb",
    "language": "sql",
    "security_definer": false,
    "volatility": "s",
    "parallel": "u",
    "comment": null
  },
  {
    "schema_name": "auth",
    "function_name": "role",
    "args_signature": "",
    "return_type": "text",
    "language": "sql",
    "security_definer": false,
    "volatility": "s",
    "parallel": "u",
    "comment": "Deprecated. Use auth.jwt() -> 'role' instead."
  },
  {
    "schema_name": "auth",
    "function_name": "uid",
    "args_signature": "",
    "return_type": "uuid",
    "language": "sql",
    "security_definer": false,
    "volatility": "s",
    "parallel": "u",
    "comment": "Deprecated. Use auth.jwt() -> 'sub' instead."
  },
  {
    "schema_name": "extensions",
    "function_name": "armor",
    "args_signature": "bytea, text[], text[]",
    "return_type": "text",
    "language": "c",
    "security_definer": false,
    "volatility": "i",
    "parallel": "s",
    "comment": null
  },
  {
    "schema_name": "extensions",
    "function_name": "armor",
    "args_signature": "bytea",
    "return_type": "text",
    "language": "c",
    "security_definer": false,
    "volatility": "i",
    "parallel": "s",
    "comment": null
  },
  {
    "schema_name": "extensions",
    "function_name": "crypt",
    "args_signature": "text, text",
    "return_type": "text",
    "language": "c",
    "security_definer": false,
    "volatility": "i",
    "parallel": "s",
    "comment": null
  },
  {
    "schema_name": "extensions",
    "function_name": "dearmor",
    "args_signature": "text",
    "return_type": "bytea",
    "language": "c",
    "security_definer": false,
    "volatility": "i",
    "parallel": "s",
    "comment": null
  },
  {
    "schema_name": "extensions",
    "function_name": "decrypt",
    "args_signature": "bytea, bytea, text",
    "return_type": "bytea",
    "language": "c",
    "security_definer": false,
    "volatility": "i",
    "parallel": "s",
    "comment": null
  },
  {
    "schema_name": "extensions",
    "function_name": "decrypt_iv",
    "args_signature": "bytea, bytea, bytea, text",
    "return_type": "bytea",
    "language": "c",
    "security_definer": false,
    "volatility": "i",
    "parallel": "s",
    "comment": null
  },
  {
    "schema_name": "extensions",
    "function_name": "digest",
    "args_signature": "bytea, text",
    "return_type": "bytea",
    "language": "c",
    "security_definer": false,
    "volatility": "i",
    "parallel": "s",
    "comment": null
  },
  {
    "schema_name": "extensions",
    "function_name": "digest",
    "args_signature": "text, text",
    "return_type": "bytea",
    "language": "c",
    "security_definer": false,
    "volatility": "i",
    "parallel": "s",
    "comment": null
  },
  {
    "schema_name": "extensions",
    "function_name": "encrypt",
    "args_signature": "bytea, bytea, text",
    "return_type": "bytea",
    "language": "c",
    "security_definer": false,
    "volatility": "i",
    "parallel": "s",
    "comment": null
  },
  {
    "schema_name": "extensions",
    "function_name": "encrypt_iv",
    "args_signature": "bytea, bytea, bytea, text",
    "return_type": "bytea",
    "language": "c",
    "security_definer": false,
    "volatility": "i",
    "parallel": "s",
    "comment": null
  },
  {
    "schema_name": "extensions",
    "function_name": "gen_random_bytes",
    "args_signature": "integer",
    "return_type": "bytea",
    "language": "c",
    "security_definer": false,
    "volatility": "v",
    "parallel": "s",
    "comment": null
  },
  {
    "schema_name": "extensions",
    "function_name": "gen_random_uuid",
    "args_signature": "",
    "return_type": "uuid",
    "language": "c",
    "security_definer": false,
    "volatility": "v",
    "parallel": "s",
    "comment": null
  },
  {
    "schema_name": "extensions",
    "function_name": "gen_salt",
    "args_signature": "text",
    "return_type": "text",
    "language": "c",
    "security_definer": false,
    "volatility": "v",
    "parallel": "s",
    "comment": null
  },
  {
    "schema_name": "extensions",
    "function_name": "gen_salt",
    "args_signature": "text, integer",
    "return_type": "text",
    "language": "c",
    "security_definer": false,
    "volatility": "v",
    "parallel": "s",
    "comment": null
  },
  {
    "schema_name": "extensions",
    "function_name": "grant_pg_cron_access",
    "args_signature": "",
    "return_type": "event_trigger",
    "language": "plpgsql",
    "security_definer": false,
    "volatility": "v",
    "parallel": "u",
    "comment": "Grants access to pg_cron"
  },
  {
    "schema_name": "extensions",
    "function_name": "grant_pg_graphql_access",
    "args_signature": "",
    "return_type": "event_trigger",
    "language": "plpgsql",
    "security_definer": false,
    "volatility": "v",
    "parallel": "u",
    "comment": "Grants access to pg_graphql"
  },
  {
    "schema_name": "extensions",
    "function_name": "grant_pg_net_access",
    "args_signature": "",
    "return_type": "event_trigger",
    "language": "plpgsql",
    "security_definer": false,
    "volatility": "v",
    "parallel": "u",
    "comment": "Grants access to pg_net"
  },
  {
    "schema_name": "extensions",
    "function_name": "hmac",
    "args_signature": "text, text, text",
    "return_type": "bytea",
    "language": "c",
    "security_definer": false,
    "volatility": "i",
    "parallel": "s",
    "comment": null
  },
  {
    "schema_name": "extensions",
    "function_name": "hmac",
    "args_signature": "bytea, bytea, text",
    "return_type": "bytea",
    "language": "c",
    "security_definer": false,
    "volatility": "i",
    "parallel": "s",
    "comment": null
  },
  {
    "schema_name": "extensions",
    "function_name": "pg_stat_statements",
    "args_signature": "showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT shared_blk_read_time double precision, OUT shared_blk_write_time double precision, OUT local_blk_read_time double precision, OUT local_blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision, OUT jit_deform_count bigint, OUT jit_deform_time double precision, OUT stats_since timestamp with time zone, OUT minmax_stats_since timestamp with time zone",
    "return_type": "SETOF record",
    "language": "c",
    "security_definer": false,
    "volatility": "v",
    "parallel": "s",
    "comment": null
  },
  {
    "schema_name": "extensions",
    "function_name": "pg_stat_statements_info",
    "args_signature": "OUT dealloc bigint, OUT stats_reset timestamp with time zone",
    "return_type": "record",
    "language": "c",
    "security_definer": false,
    "volatility": "v",
    "parallel": "s",
    "comment": null
  },
  {
    "schema_name": "extensions",
    "function_name": "pg_stat_statements_reset",
    "args_signature": "userid oid, dbid oid, queryid bigint, minmax_only boolean",
    "return_type": "timestamp with time zone",
    "language": "c",
    "security_definer": false,
    "volatility": "v",
    "parallel": "s",
    "comment": null
  },
  {
    "schema_name": "extensions",
    "function_name": "pgp_armor_headers",
    "args_signature": "text, OUT key text, OUT value text",
    "return_type": "SETOF record",
    "language": "c",
    "security_definer": false,
    "volatility": "i",
    "parallel": "s",
    "comment": null
  },
  {
    "schema_name": "extensions",
    "function_name": "pgp_key_id",
    "args_signature": "bytea",
    "return_type": "text",
    "language": "c",
    "security_definer": false,
    "volatility": "i",
    "parallel": "s",
    "comment": null
  },
  {
    "schema_name": "extensions",
    "function_name": "pgp_pub_decrypt",
    "args_signature": "bytea, bytea, text, text",
    "return_type": "text",
    "language": "c",
    "security_definer": false,
    "volatility": "i",
    "parallel": "s",
    "comment": null
  },
  {
    "schema_name": "extensions",
    "function_name": "pgp_pub_decrypt",
    "args_signature": "bytea, bytea",
    "return_type": "text",
    "language": "c",
    "security_definer": false,
    "volatility": "i",
    "parallel": "s",
    "comment": null
  },
  {
    "schema_name": "extensions",
    "function_name": "pgp_pub_decrypt",
    "args_signature": "bytea, bytea, text",
    "return_type": "text",
    "language": "c",
    "security_definer": false,
    "volatility": "i",
    "parallel": "s",
    "comment": null
  },
  {
    "schema_name": "extensions",
    "function_name": "pgp_pub_decrypt_bytea",
    "args_signature": "bytea, bytea",
    "return_type": "bytea",
    "language": "c",
    "security_definer": false,
    "volatility": "i",
    "parallel": "s",
    "comment": null
  },
  {
    "schema_name": "extensions",
    "function_name": "pgp_pub_decrypt_bytea",
    "args_signature": "bytea, bytea, text",
    "return_type": "bytea",
    "language": "c",
    "security_definer": false,
    "volatility": "i",
    "parallel": "s",
    "comment": null
  },
  {
    "schema_name": "extensions",
    "function_name": "pgp_pub_decrypt_bytea",
    "args_signature": "bytea, bytea, text, text",
    "return_type": "bytea",
    "language": "c",
    "security_definer": false,
    "volatility": "i",
    "parallel": "s",
    "comment": null
  },
  {
    "schema_name": "extensions",
    "function_name": "pgp_pub_encrypt",
    "args_signature": "text, bytea, text",
    "return_type": "bytea",
    "language": "c",
    "security_definer": false,
    "volatility": "v",
    "parallel": "s",
    "comment": null
  },
  {
    "schema_name": "extensions",
    "function_name": "pgp_pub_encrypt",
    "args_signature": "text, bytea",
    "return_type": "bytea",
    "language": "c",
    "security_definer": false,
    "volatility": "v",
    "parallel": "s",
    "comment": null
  },
  {
    "schema_name": "extensions",
    "function_name": "pgp_pub_encrypt_bytea",
    "args_signature": "bytea, bytea",
    "return_type": "bytea",
    "language": "c",
    "security_definer": false,
    "volatility": "v",
    "parallel": "s",
    "comment": null
  },
  {
    "schema_name": "extensions",
    "function_name": "pgp_pub_encrypt_bytea",
    "args_signature": "bytea, bytea, text",
    "return_type": "bytea",
    "language": "c",
    "security_definer": false,
    "volatility": "v",
    "parallel": "s",
    "comment": null
  },
  {
    "schema_name": "extensions",
    "function_name": "pgp_sym_decrypt",
    "args_signature": "bytea, text, text",
    "return_type": "text",
    "language": "c",
    "security_definer": false,
    "volatility": "i",
    "parallel": "s",
    "comment": null
  },
  {
    "schema_name": "extensions",
    "function_name": "pgp_sym_decrypt",
    "args_signature": "bytea, text",
    "return_type": "text",
    "language": "c",
    "security_definer": false,
    "volatility": "i",
    "parallel": "s",
    "comment": null
  },
  {
    "schema_name": "extensions",
    "function_name": "pgp_sym_decrypt_bytea",
    "args_signature": "bytea, text",
    "return_type": "bytea",
    "language": "c",
    "security_definer": false,
    "volatility": "i",
    "parallel": "s",
    "comment": null
  },
  {
    "schema_name": "extensions",
    "function_name": "pgp_sym_decrypt_bytea",
    "args_signature": "bytea, text, text",
    "return_type": "bytea",
    "language": "c",
    "security_definer": false,
    "volatility": "i",
    "parallel": "s",
    "comment": null
  },
  {
    "schema_name": "extensions",
    "function_name": "pgp_sym_encrypt",
    "args_signature": "text, text",
    "return_type": "bytea",
    "language": "c",
    "security_definer": false,
    "volatility": "v",
    "parallel": "s",
    "comment": null
  },
  {
    "schema_name": "extensions",
    "function_name": "pgp_sym_encrypt",
    "args_signature": "text, text, text",
    "return_type": "bytea",
    "language": "c",
    "security_definer": false,
    "volatility": "v",
    "parallel": "s",
    "comment": null
  },
  {
    "schema_name": "extensions",
    "function_name": "pgp_sym_encrypt_bytea",
    "args_signature": "bytea, text, text",
    "return_type": "bytea",
    "language": "c",
    "security_definer": false,
    "volatility": "v",
    "parallel": "s",
    "comment": null
  },
  {
    "schema_name": "extensions",
    "function_name": "pgp_sym_encrypt_bytea",
    "args_signature": "bytea, text",
    "return_type": "bytea",
    "language": "c",
    "security_definer": false,
    "volatility": "v",
    "parallel": "s",
    "comment": null
  },
  {
    "schema_name": "extensions",
    "function_name": "pgrst_ddl_watch",
    "args_signature": "",
    "return_type": "event_trigger",
    "language": "plpgsql",
    "security_definer": false,
    "volatility": "v",
    "parallel": "u",
    "comment": null
  },
  {
    "schema_name": "extensions",
    "function_name": "pgrst_drop_watch",
    "args_signature": "",
    "return_type": "event_trigger",
    "language": "plpgsql",
    "security_definer": false,
    "volatility": "v",
    "parallel": "u",
    "comment": null
  },
  {
    "schema_name": "extensions",
    "function_name": "set_graphql_placeholder",
    "args_signature": "",
    "return_type": "event_trigger",
    "language": "plpgsql",
    "security_definer": false,
    "volatility": "v",
    "parallel": "u",
    "comment": "Reintroduces placeholder function for graphql_public.graphql"
  },
  {
    "schema_name": "extensions",
    "function_name": "uuid_generate_v1",
    "args_signature": "",
    "return_type": "uuid",
    "language": "c",
    "security_definer": false,
    "volatility": "v",
    "parallel": "s",
    "comment": null
  },
  {
    "schema_name": "extensions",
    "function_name": "uuid_generate_v1mc",
    "args_signature": "",
    "return_type": "uuid",
    "language": "c",
    "security_definer": false,
    "volatility": "v",
    "parallel": "s",
    "comment": null
  },
  {
    "schema_name": "extensions",
    "function_name": "uuid_generate_v3",
    "args_signature": "namespace uuid, name text",
    "return_type": "uuid",
    "language": "c",
    "security_definer": false,
    "volatility": "i",
    "parallel": "s",
    "comment": null
  },
  {
    "schema_name": "extensions",
    "function_name": "uuid_generate_v4",
    "args_signature": "",
    "return_type": "uuid",
    "language": "c",
    "security_definer": false,
    "volatility": "v",
    "parallel": "s",
    "comment": null
  },
  {
    "schema_name": "extensions",
    "function_name": "uuid_generate_v5",
    "args_signature": "namespace uuid, name text",
    "return_type": "uuid",
    "language": "c",
    "security_definer": false,
    "volatility": "i",
    "parallel": "s",
    "comment": null
  },
  {
    "schema_name": "extensions",
    "function_name": "uuid_nil",
    "args_signature": "",
    "return_type": "uuid",
    "language": "c",
    "security_definer": false,
    "volatility": "i",
    "parallel": "s",
    "comment": null
  },
  {
    "schema_name": "extensions",
    "function_name": "uuid_ns_dns",
    "args_signature": "",
    "return_type": "uuid",
    "language": "c",
    "security_definer": false,
    "volatility": "i",
    "parallel": "s",
    "comment": null
  },
  {
    "schema_name": "extensions",
    "function_name": "uuid_ns_oid",
    "args_signature": "",
    "return_type": "uuid",
    "language": "c",
    "security_definer": false,
    "volatility": "i",
    "parallel": "s",
    "comment": null
  },
  {
    "schema_name": "extensions",
    "function_name": "uuid_ns_url",
    "args_signature": "",
    "return_type": "uuid",
    "language": "c",
    "security_definer": false,
    "volatility": "i",
    "parallel": "s",
    "comment": null
  },
  {
    "schema_name": "extensions",
    "function_name": "uuid_ns_x500",
    "args_signature": "",
    "return_type": "uuid",
    "language": "c",
    "security_definer": false,
    "volatility": "i",
    "parallel": "s",
    "comment": null
  },
  {
    "schema_name": "graphql",
    "function_name": "_internal_resolve",
    "args_signature": "query text, variables jsonb, \"operationName\" text, extensions jsonb",
    "return_type": "jsonb",
    "language": "c",
    "security_definer": false,
    "volatility": "v",
    "parallel": "u",
    "comment": null
  },
  {
    "schema_name": "graphql",
    "function_name": "comment_directive",
    "args_signature": "comment_ text",
    "return_type": "jsonb",
    "language": "sql",
    "security_definer": false,
    "volatility": "i",
    "parallel": "u",
    "comment": null
  },
  {
    "schema_name": "graphql",
    "function_name": "exception",
    "args_signature": "message text",
    "return_type": "text",
    "language": "plpgsql",
    "security_definer": false,
    "volatility": "v",
    "parallel": "u",
    "comment": null
  },
  {
    "schema_name": "graphql",
    "function_name": "get_schema_version",
    "args_signature": "",
    "return_type": "integer",
    "language": "sql",
    "security_definer": true,
    "volatility": "v",
    "parallel": "u",
    "comment": null
  },
  {
    "schema_name": "graphql",
    "function_name": "increment_schema_version",
    "args_signature": "",
    "return_type": "event_trigger",
    "language": "plpgsql",
    "security_definer": true,
    "volatility": "v",
    "parallel": "u",
    "comment": null
  },
  {
    "schema_name": "graphql",
    "function_name": "resolve",
    "args_signature": "query text, variables jsonb, \"operationName\" text, extensions jsonb",
    "return_type": "jsonb",
    "language": "plpgsql",
    "security_definer": false,
    "volatility": "v",
    "parallel": "u",
    "comment": null
  },
  {
    "schema_name": "graphql_public",
    "function_name": "graphql",
    "args_signature": "\"operationName\" text, query text, variables jsonb, extensions jsonb",
    "return_type": "jsonb",
    "language": "sql",
    "security_definer": false,
    "volatility": "v",
    "parallel": "u",
    "comment": null
  },
  {
    "schema_name": "private_health_info",
    "function_name": "anonymize_daily_log_to_research",
    "args_signature": "",
    "return_type": "trigger",
    "language": "plpgsql",
    "security_definer": true,
    "volatility": "v",
    "parallel": "u",
    "comment": null
  },
  {
    "schema_name": "private_health_info",
    "function_name": "anonymize_gait_to_research",
    "args_signature": "",
    "return_type": "trigger",
    "language": "plpgsql",
    "security_definer": true,
    "volatility": "v",
    "parallel": "u",
    "comment": null
  },
  {
    "schema_name": "private_health_info",
    "function_name": "anonymize_seizure_to_research",
    "args_signature": "",
    "return_type": "trigger",
    "language": "plpgsql",
    "security_definer": true,
    "volatility": "v",
    "parallel": "u",
    "comment": null
  },
  {
    "schema_name": "private_health_info",
    "function_name": "anonymize_tremor_to_research",
    "args_signature": "",
    "return_type": "trigger",
    "language": "plpgsql",
    "security_definer": true,
    "volatility": "v",
    "parallel": "u",
    "comment": null
  },
  {
    "schema_name": "private_health_info",
    "function_name": "check_catamenial_pattern_alert",
    "args_signature": "",
    "return_type": "trigger",
    "language": "plpgsql",
    "security_definer": true,
    "volatility": "v",
    "parallel": "u",
    "comment": null
  },
  {
    "schema_name": "private_health_info",
    "function_name": "check_research_consent",
    "args_signature": "p_patient_id uuid, p_data_type text",
    "return_type": "boolean",
    "language": "plpgsql",
    "security_definer": true,
    "volatility": "v",
    "parallel": "u",
    "comment": "Checks if patient has consented to research data sharing for specific data type"
  },
  {
    "schema_name": "private_health_info",
    "function_name": "check_seizure_cluster_alert",
    "args_signature": "",
    "return_type": "trigger",
    "language": "plpgsql",
    "security_definer": true,
    "volatility": "v",
    "parallel": "u",
    "comment": null
  },
  {
    "schema_name": "private_health_info",
    "function_name": "schedule_medication_reminders",
    "args_signature": "",
    "return_type": "trigger",
    "language": "plpgsql",
    "security_definer": true,
    "volatility": "v",
    "parallel": "u",
    "comment": null
  },
  {
    "schema_name": "private_health_info",
    "function_name": "update_menstrual_log_timestamp",
    "args_signature": "",
    "return_type": "trigger",
    "language": "plpgsql",
    "security_definer": true,
    "volatility": "v",
    "parallel": "u",
    "comment": null
  },
  {
    "schema_name": "private_health_info",
    "function_name": "update_onboarding_timestamp",
    "args_signature": "",
    "return_type": "trigger",
    "language": "plpgsql",
    "security_definer": true,
    "volatility": "v",
    "parallel": "u",
    "comment": null
  },
  {
    "schema_name": "public",
    "function_name": "can_carer_see_patient_data",
    "args_signature": "p_carer_id uuid, p_patient_id uuid, p_data_type text",
    "return_type": "boolean",
    "language": "plpgsql",
    "security_definer": true,
    "volatility": "v",
    "parallel": "u",
    "comment": "Check if carer can see patient data based on sharing preferences"
  },
  {
    "schema_name": "public",
    "function_name": "can_clinician_see_patient_data",
    "args_signature": "p_clinician_id uuid, p_patient_id uuid, p_data_type text",
    "return_type": "boolean",
    "language": "plpgsql",
    "security_definer": true,
    "volatility": "v",
    "parallel": "u",
    "comment": "Check if clinician can see patient data based on sharing preferences"
  },
  {
    "schema_name": "public",
    "function_name": "cleanup_old_logs",
    "args_signature": "p_days_to_keep integer",
    "return_type": "TABLE(table_name text, rows_deleted bigint)",
    "language": "plpgsql",
    "security_definer": true,
    "volatility": "v",
    "parallel": "u",
    "comment": null
  },
  {
    "schema_name": "public",
    "function_name": "complete_function_execution",
    "args_signature": "p_execution_id uuid, p_success boolean, p_return_value jsonb, p_error_message text",
    "return_type": "void",
    "language": "plpgsql",
    "security_definer": true,
    "volatility": "v",
    "parallel": "u",
    "comment": null
  },
  {
    "schema_name": "public",
    "function_name": "complete_onboarding",
    "args_signature": "p_user_id uuid, p_user_type text",
    "return_type": "json",
    "language": "plpgsql",
    "security_definer": true,
    "volatility": "v",
    "parallel": "u",
    "comment": "Mark user onboarding as complete and award welcome achievement"
  },
  {
    "schema_name": "public",
    "function_name": "get_function_stats",
    "args_signature": "p_function_name text",
    "return_type": "TABLE(function_name text, total_executions bigint, successful bigint, failed bigint, avg_duration_ms numeric, max_duration_ms integer, last_execution timestamp with time zone)",
    "language": "sql",
    "security_definer": true,
    "volatility": "v",
    "parallel": "u",
    "comment": null
  },
  {
    "schema_name": "public",
    "function_name": "get_recent_errors",
    "args_signature": "p_limit integer",
    "return_type": "TABLE(log_time timestamp with time zone, level text, category text, event text, message text, function_name text, error_code text, user_id uuid)",
    "language": "sql",
    "security_definer": true,
    "volatility": "v",
    "parallel": "u",
    "comment": null
  },
  {
    "schema_name": "public",
    "function_name": "get_research_id",
    "args_signature": "p_user_id uuid",
    "return_type": "uuid",
    "language": "plpgsql",
    "security_definer": true,
    "volatility": "v",
    "parallel": "u",
    "comment": "Secure function to retrieve research ID without exposing linkage table. This is the ONLY way app code should get research IDs."
  },
  {
    "schema_name": "public",
    "function_name": "get_user_type",
    "args_signature": "p_user_id uuid",
    "return_type": "text",
    "language": "plpgsql",
    "security_definer": true,
    "volatility": "v",
    "parallel": "u",
    "comment": "Get user type for given user ID"
  },
  {
    "schema_name": "public",
    "function_name": "handle_new_user",
    "args_signature": "",
    "return_type": "trigger",
    "language": "plpgsql",
    "security_definer": true,
    "volatility": "v",
    "parallel": "u",
    "comment": "Inserts minimal profile with NULL user_type to avoid PHI leakage and allow onboarding."
  },
  {
    "schema_name": "public",
    "function_name": "initialize_new_user",
    "args_signature": "p_user_id uuid, p_email text, p_user_type text",
    "return_type": "jsonb",
    "language": "plpgsql",
    "security_definer": true,
    "volatility": "v",
    "parallel": "u",
    "comment": null
  },
  {
    "schema_name": "public",
    "function_name": "initialize_new_user_jsonb",
    "args_signature": "p_user_id uuid, p_email text, p_user_type text",
    "return_type": "jsonb",
    "language": "plpgsql",
    "security_definer": true,
    "volatility": "v",
    "parallel": "u",
    "comment": null
  },
  {
    "schema_name": "public",
    "function_name": "is_admin",
    "args_signature": "",
    "return_type": "boolean",
    "language": "plpgsql",
    "security_definer": true,
    "volatility": "v",
    "parallel": "u",
    "comment": "Check if current user is admin"
  },
  {
    "schema_name": "public",
    "function_name": "is_approved_researcher",
    "args_signature": "",
    "return_type": "boolean",
    "language": "plpgsql",
    "security_definer": true,
    "volatility": "v",
    "parallel": "u",
    "comment": "Check if current user is an approved researcher with data access"
  },
  {
    "schema_name": "public",
    "function_name": "is_carer_related_to_patient",
    "args_signature": "p_carer_id uuid, p_patient_id uuid",
    "return_type": "boolean",
    "language": "plpgsql",
    "security_definer": true,
    "volatility": "v",
    "parallel": "u",
    "comment": "Check if carer has active relationship to patient"
  },
  {
    "schema_name": "public",
    "function_name": "is_clinician_connected_to_patient",
    "args_signature": "p_clinician_id uuid, p_patient_id uuid",
    "return_type": "boolean",
    "language": "plpgsql",
    "security_definer": true,
    "volatility": "v",
    "parallel": "u",
    "comment": "Check if clinician has active connection to patient"
  },
  {
    "schema_name": "public",
    "function_name": "is_in_quiet_hours",
    "args_signature": "p_user_id uuid",
    "return_type": "boolean",
    "language": "plpgsql",
    "security_definer": true,
    "volatility": "v",
    "parallel": "u",
    "comment": "Check if current time is in user quiet hours"
  },
  {
    "schema_name": "public",
    "function_name": "log_system_event",
    "args_signature": "p_level text, p_category text, p_event_type text, p_message text, p_user_id uuid, p_function_name text, p_error_code text, p_context jsonb",
    "return_type": "uuid",
    "language": "plpgsql",
    "security_definer": true,
    "volatility": "v",
    "parallel": "u",
    "comment": "HIPAA-compliant system event logging - NO PHI"
  },
  {
    "schema_name": "public",
    "function_name": "mark_notification_read",
    "args_signature": "p_notification_id uuid",
    "return_type": "void",
    "language": "plpgsql",
    "security_definer": true,
    "volatility": "v",
    "parallel": "u",
    "comment": null
  },
  {
    "schema_name": "public",
    "function_name": "schedule_daily_checkin_reminders",
    "args_signature": "",
    "return_type": "integer",
    "language": "plpgsql",
    "security_definer": true,
    "volatility": "v",
    "parallel": "u",
    "comment": "Schedule daily check-in reminders for all users - NO PHI"
  },
  {
    "schema_name": "public",
    "function_name": "schedule_notification",
    "args_signature": "p_user_id uuid, p_type text, p_title text, p_body text, p_action_url text, p_reference_id uuid, p_scheduled_for timestamp with time zone, p_priority text",
    "return_type": "uuid",
    "language": "plpgsql",
    "security_definer": true,
    "volatility": "v",
    "parallel": "u",
    "comment": "Schedule a notification respecting user preferences - NO PHI in content"
  },
  {
    "schema_name": "public",
    "function_name": "start_function_execution",
    "args_signature": "p_function_name text, p_user_id uuid, p_user_type text, p_triggered_by text",
    "return_type": "uuid",
    "language": "plpgsql",
    "security_definer": true,
    "volatility": "v",
    "parallel": "u",
    "comment": null
  },
  {
    "schema_name": "realtime",
    "function_name": "apply_rls",
    "args_signature": "wal jsonb, max_record_bytes integer",
    "return_type": "SETOF realtime.wal_rls",
    "language": "plpgsql",
    "security_definer": false,
    "volatility": "v",
    "parallel": "u",
    "comment": null
  },
  {
    "schema_name": "realtime",
    "function_name": "broadcast_changes",
    "args_signature": "topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text",
    "return_type": "void",
    "language": "plpgsql",
    "security_definer": false,
    "volatility": "v",
    "parallel": "u",
    "comment": null
  },
  {
    "schema_name": "realtime",
    "function_name": "build_prepared_statement_sql",
    "args_signature": "prepared_statement_name text, entity regclass, columns realtime.wal_column[]",
    "return_type": "text",
    "language": "sql",
    "security_definer": false,
    "volatility": "v",
    "parallel": "u",
    "comment": null
  },
  {
    "schema_name": "realtime",
    "function_name": "cast",
    "args_signature": "val text, type_ regtype",
    "return_type": "jsonb",
    "language": "plpgsql",
    "security_definer": false,
    "volatility": "i",
    "parallel": "u",
    "comment": null
  },
  {
    "schema_name": "realtime",
    "function_name": "check_equality_op",
    "args_signature": "op realtime.equality_op, type_ regtype, val_1 text, val_2 text",
    "return_type": "boolean",
    "language": "plpgsql",
    "security_definer": false,
    "volatility": "i",
    "parallel": "u",
    "comment": null
  },
  {
    "schema_name": "realtime",
    "function_name": "is_visible_through_filters",
    "args_signature": "columns realtime.wal_column[], filters realtime.user_defined_filter[]",
    "return_type": "boolean",
    "language": "sql",
    "security_definer": false,
    "volatility": "i",
    "parallel": "u",
    "comment": null
  },
  {
    "schema_name": "realtime",
    "function_name": "list_changes",
    "args_signature": "publication name, slot_name name, max_changes integer, max_record_bytes integer",
    "return_type": "SETOF realtime.wal_rls",
    "language": "sql",
    "security_definer": false,
    "volatility": "v",
    "parallel": "u",
    "comment": null
  },
  {
    "schema_name": "realtime",
    "function_name": "quote_wal2json",
    "args_signature": "entity regclass",
    "return_type": "text",
    "language": "sql",
    "security_definer": false,
    "volatility": "i",
    "parallel": "u",
    "comment": null
  },
  {
    "schema_name": "realtime",
    "function_name": "send",
    "args_signature": "payload jsonb, event text, topic text, private boolean",
    "return_type": "void",
    "language": "plpgsql",
    "security_definer": false,
    "volatility": "v",
    "parallel": "u",
    "comment": null
  },
  {
    "schema_name": "realtime",
    "function_name": "subscription_check_filters",
    "args_signature": "",
    "return_type": "trigger",
    "language": "plpgsql",
    "security_definer": false,
    "volatility": "v",
    "parallel": "u",
    "comment": null
  },
  {
    "schema_name": "realtime",
    "function_name": "to_regrole",
    "args_signature": "role_name text",
    "return_type": "regrole",
    "language": "sql",
    "security_definer": false,
    "volatility": "i",
    "parallel": "u",
    "comment": null
  },
  {
    "schema_name": "realtime",
    "function_name": "topic",
    "args_signature": "",
    "return_type": "text",
    "language": "sql",
    "security_definer": false,
    "volatility": "s",
    "parallel": "u",
    "comment": null
  },
  {
    "schema_name": "storage",
    "function_name": "add_prefixes",
    "args_signature": "_bucket_id text, _name text",
    "return_type": "void",
    "language": "plpgsql",
    "security_definer": true,
    "volatility": "v",
    "parallel": "u",
    "comment": null
  },
  {
    "schema_name": "storage",
    "function_name": "can_insert_object",
    "args_signature": "bucketid text, name text, owner uuid, metadata jsonb",
    "return_type": "void",
    "language": "plpgsql",
    "security_definer": false,
    "volatility": "v",
    "parallel": "u",
    "comment": null
  },
  {
    "schema_name": "storage",
    "function_name": "delete_leaf_prefixes",
    "args_signature": "bucket_ids text[], names text[]",
    "return_type": "void",
    "language": "plpgsql",
    "security_definer": true,
    "volatility": "v",
    "parallel": "u",
    "comment": null
  },
  {
    "schema_name": "storage",
    "function_name": "delete_prefix",
    "args_signature": "_bucket_id text, _name text",
    "return_type": "boolean",
    "language": "plpgsql",
    "security_definer": true,
    "volatility": "v",
    "parallel": "u",
    "comment": null
  },
  {
    "schema_name": "storage",
    "function_name": "delete_prefix_hierarchy_trigger",
    "args_signature": "",
    "return_type": "trigger",
    "language": "plpgsql",
    "security_definer": false,
    "volatility": "v",
    "parallel": "u",
    "comment": null
  },
  {
    "schema_name": "storage",
    "function_name": "enforce_bucket_name_length",
    "args_signature": "",
    "return_type": "trigger",
    "language": "plpgsql",
    "security_definer": false,
    "volatility": "v",
    "parallel": "u",
    "comment": null
  },
  {
    "schema_name": "storage",
    "function_name": "extension",
    "args_signature": "name text",
    "return_type": "text",
    "language": "plpgsql",
    "security_definer": false,
    "volatility": "i",
    "parallel": "u",
    "comment": null
  },
  {
    "schema_name": "storage",
    "function_name": "filename",
    "args_signature": "name text",
    "return_type": "text",
    "language": "plpgsql",
    "security_definer": false,
    "volatility": "v",
    "parallel": "u",
    "comment": null
  },
  {
    "schema_name": "storage",
    "function_name": "foldername",
    "args_signature": "name text",
    "return_type": "text[]",
    "language": "plpgsql",
    "security_definer": false,
    "volatility": "i",
    "parallel": "u",
    "comment": null
  },
  {
    "schema_name": "storage",
    "function_name": "get_level",
    "args_signature": "name text",
    "return_type": "integer",
    "language": "sql",
    "security_definer": false,
    "volatility": "i",
    "parallel": "u",
    "comment": null
  },
  {
    "schema_name": "storage",
    "function_name": "get_prefix",
    "args_signature": "name text",
    "return_type": "text",
    "language": "sql",
    "security_definer": false,
    "volatility": "i",
    "parallel": "u",
    "comment": null
  },
  {
    "schema_name": "storage",
    "function_name": "get_prefixes",
    "args_signature": "name text",
    "return_type": "text[]",
    "language": "plpgsql",
    "security_definer": false,
    "volatility": "i",
    "parallel": "u",
    "comment": null
  },
  {
    "schema_name": "storage",
    "function_name": "get_size_by_bucket",
    "args_signature": "",
    "return_type": "TABLE(size bigint, bucket_id text)",
    "language": "plpgsql",
    "security_definer": false,
    "volatility": "s",
    "parallel": "u",
    "comment": null
  },
  {
    "schema_name": "storage",
    "function_name": "list_multipart_uploads_with_delimiter",
    "args_signature": "bucket_id text, prefix_param text, delimiter_param text, max_keys integer, next_key_token text, next_upload_token text",
    "return_type": "TABLE(key text, id text, created_at timestamp with time zone)",
    "language": "plpgsql",
    "security_definer": false,
    "volatility": "v",
    "parallel": "u",
    "comment": null
  },
  {
    "schema_name": "storage",
    "function_name": "list_objects_with_delimiter",
    "args_signature": "bucket_id text, prefix_param text, delimiter_param text, max_keys integer, start_after text, next_token text",
    "return_type": "TABLE(name text, id uuid, metadata jsonb, updated_at timestamp with time zone)",
    "language": "plpgsql",
    "security_definer": false,
    "volatility": "v",
    "parallel": "u",
    "comment": null
  },
  {
    "schema_name": "storage",
    "function_name": "lock_top_prefixes",
    "args_signature": "bucket_ids text[], names text[]",
    "return_type": "void",
    "language": "plpgsql",
    "security_definer": true,
    "volatility": "v",
    "parallel": "u",
    "comment": null
  },
  {
    "schema_name": "storage",
    "function_name": "objects_delete_cleanup",
    "args_signature": "",
    "return_type": "trigger",
    "language": "plpgsql",
    "security_definer": true,
    "volatility": "v",
    "parallel": "u",
    "comment": null
  },
  {
    "schema_name": "storage",
    "function_name": "objects_insert_prefix_trigger",
    "args_signature": "",
    "return_type": "trigger",
    "language": "plpgsql",
    "security_definer": false,
    "volatility": "v",
    "parallel": "u",
    "comment": null
  },
  {
    "schema_name": "storage",
    "function_name": "objects_update_cleanup",
    "args_signature": "",
    "return_type": "trigger",
    "language": "plpgsql",
    "security_definer": true,
    "volatility": "v",
    "parallel": "u",
    "comment": null
  },
  {
    "schema_name": "storage",
    "function_name": "objects_update_level_trigger",
    "args_signature": "",
    "return_type": "trigger",
    "language": "plpgsql",
    "security_definer": false,
    "volatility": "v",
    "parallel": "u",
    "comment": null
  },
  {
    "schema_name": "storage",
    "function_name": "objects_update_prefix_trigger",
    "args_signature": "",
    "return_type": "trigger",
    "language": "plpgsql",
    "security_definer": false,
    "volatility": "v",
    "parallel": "u",
    "comment": null
  },
  {
    "schema_name": "storage",
    "function_name": "operation",
    "args_signature": "",
    "return_type": "text",
    "language": "plpgsql",
    "security_definer": false,
    "volatility": "s",
    "parallel": "u",
    "comment": null
  },
  {
    "schema_name": "storage",
    "function_name": "prefixes_delete_cleanup",
    "args_signature": "",
    "return_type": "trigger",
    "language": "plpgsql",
    "security_definer": true,
    "volatility": "v",
    "parallel": "u",
    "comment": null
  },
  {
    "schema_name": "storage",
    "function_name": "prefixes_insert_trigger",
    "args_signature": "",
    "return_type": "trigger",
    "language": "plpgsql",
    "security_definer": false,
    "volatility": "v",
    "parallel": "u",
    "comment": null
  },
  {
    "schema_name": "storage",
    "function_name": "search",
    "args_signature": "prefix text, bucketname text, limits integer, levels integer, offsets integer, search text, sortcolumn text, sortorder text",
    "return_type": "TABLE(name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)",
    "language": "plpgsql",
    "security_definer": false,
    "volatility": "v",
    "parallel": "u",
    "comment": null
  },
  {
    "schema_name": "storage",
    "function_name": "search_legacy_v1",
    "args_signature": "prefix text, bucketname text, limits integer, levels integer, offsets integer, search text, sortcolumn text, sortorder text",
    "return_type": "TABLE(name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)",
    "language": "plpgsql",
    "security_definer": false,
    "volatility": "s",
    "parallel": "u",
    "comment": null
  },
  {
    "schema_name": "storage",
    "function_name": "search_v1_optimised",
    "args_signature": "prefix text, bucketname text, limits integer, levels integer, offsets integer, search text, sortcolumn text, sortorder text",
    "return_type": "TABLE(name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)",
    "language": "plpgsql",
    "security_definer": false,
    "volatility": "s",
    "parallel": "u",
    "comment": null
  },
  {
    "schema_name": "storage",
    "function_name": "search_v2",
    "args_signature": "prefix text, bucket_name text, limits integer, levels integer, start_after text, sort_order text, sort_column text, sort_column_after text",
    "return_type": "TABLE(key text, name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)",
    "language": "plpgsql",
    "security_definer": false,
    "volatility": "s",
    "parallel": "u",
    "comment": null
  },
  {
    "schema_name": "storage",
    "function_name": "update_updated_at_column",
    "args_signature": "",
    "return_type": "trigger",
    "language": "plpgsql",
    "security_definer": false,
    "volatility": "v",
    "parallel": "u",
    "comment": null
  },
  {
    "schema_name": "vault",
    "function_name": "_crypto_aead_det_decrypt",
    "args_signature": "message bytea, additional bytea, key_id bigint, context bytea, nonce bytea",
    "return_type": "bytea",
    "language": "c",
    "security_definer": false,
    "volatility": "i",
    "parallel": "u",
    "comment": null
  },
  {
    "schema_name": "vault",
    "function_name": "_crypto_aead_det_encrypt",
    "args_signature": "message bytea, additional bytea, key_id bigint, context bytea, nonce bytea",
    "return_type": "bytea",
    "language": "c",
    "security_definer": false,
    "volatility": "i",
    "parallel": "u",
    "comment": null
  },
  {
    "schema_name": "vault",
    "function_name": "_crypto_aead_det_noncegen",
    "args_signature": "",
    "return_type": "bytea",
    "language": "c",
    "security_definer": false,
    "volatility": "i",
    "parallel": "u",
    "comment": null
  },
  {
    "schema_name": "vault",
    "function_name": "create_secret",
    "args_signature": "new_secret text, new_name text, new_description text, new_key_id uuid",
    "return_type": "uuid",
    "language": "plpgsql",
    "security_definer": true,
    "volatility": "v",
    "parallel": "u",
    "comment": null
  },
  {
    "schema_name": "vault",
    "function_name": "update_secret",
    "args_signature": "secret_id uuid, new_secret text, new_name text, new_description text, new_key_id uuid",
    "return_type": "void",
    "language": "plpgsql",
    "security_definer": true,
    "volatility": "v",
    "parallel": "u",
    "comment": null
  }
]


------------

# Function source code (be cautious: can be large). Filter by schema if needed.

[
  {
    "schema_name": "auth",
    "function_name": "email",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION auth.email()\n RETURNS text\n LANGUAGE sql\n STABLE\nAS $function$\n  select \n  coalesce(\n    nullif(current_setting('request.jwt.claim.email', true), ''),\n    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'email')\n  )::text\n$function$\n"
  },
  {
    "schema_name": "auth",
    "function_name": "jwt",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION auth.jwt()\n RETURNS jsonb\n LANGUAGE sql\n STABLE\nAS $function$\n  select \n    coalesce(\n        nullif(current_setting('request.jwt.claim', true), ''),\n        nullif(current_setting('request.jwt.claims', true), '')\n    )::jsonb\n$function$\n"
  },
  {
    "schema_name": "auth",
    "function_name": "role",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION auth.role()\n RETURNS text\n LANGUAGE sql\n STABLE\nAS $function$\n  select \n  coalesce(\n    nullif(current_setting('request.jwt.claim.role', true), ''),\n    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'role')\n  )::text\n$function$\n"
  },
  {
    "schema_name": "auth",
    "function_name": "uid",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION auth.uid()\n RETURNS uuid\n LANGUAGE sql\n STABLE\nAS $function$\n  select \n  coalesce(\n    nullif(current_setting('request.jwt.claim.sub', true), ''),\n    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub')\n  )::uuid\n$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "armor",
    "args_signature": "bytea, text[], text[]",
    "definition": "CREATE OR REPLACE FUNCTION extensions.armor(bytea, text[], text[])\n RETURNS text\n LANGUAGE c\n IMMUTABLE PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pg_armor$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "armor",
    "args_signature": "bytea",
    "definition": "CREATE OR REPLACE FUNCTION extensions.armor(bytea)\n RETURNS text\n LANGUAGE c\n IMMUTABLE PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pg_armor$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "crypt",
    "args_signature": "text, text",
    "definition": "CREATE OR REPLACE FUNCTION extensions.crypt(text, text)\n RETURNS text\n LANGUAGE c\n IMMUTABLE PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pg_crypt$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "dearmor",
    "args_signature": "text",
    "definition": "CREATE OR REPLACE FUNCTION extensions.dearmor(text)\n RETURNS bytea\n LANGUAGE c\n IMMUTABLE PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pg_dearmor$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "decrypt",
    "args_signature": "bytea, bytea, text",
    "definition": "CREATE OR REPLACE FUNCTION extensions.decrypt(bytea, bytea, text)\n RETURNS bytea\n LANGUAGE c\n IMMUTABLE PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pg_decrypt$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "decrypt_iv",
    "args_signature": "bytea, bytea, bytea, text",
    "definition": "CREATE OR REPLACE FUNCTION extensions.decrypt_iv(bytea, bytea, bytea, text)\n RETURNS bytea\n LANGUAGE c\n IMMUTABLE PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pg_decrypt_iv$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "digest",
    "args_signature": "bytea, text",
    "definition": "CREATE OR REPLACE FUNCTION extensions.digest(bytea, text)\n RETURNS bytea\n LANGUAGE c\n IMMUTABLE PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pg_digest$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "digest",
    "args_signature": "text, text",
    "definition": "CREATE OR REPLACE FUNCTION extensions.digest(text, text)\n RETURNS bytea\n LANGUAGE c\n IMMUTABLE PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pg_digest$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "encrypt",
    "args_signature": "bytea, bytea, text",
    "definition": "CREATE OR REPLACE FUNCTION extensions.encrypt(bytea, bytea, text)\n RETURNS bytea\n LANGUAGE c\n IMMUTABLE PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pg_encrypt$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "encrypt_iv",
    "args_signature": "bytea, bytea, bytea, text",
    "definition": "CREATE OR REPLACE FUNCTION extensions.encrypt_iv(bytea, bytea, bytea, text)\n RETURNS bytea\n LANGUAGE c\n IMMUTABLE PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pg_encrypt_iv$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "gen_random_bytes",
    "args_signature": "integer",
    "definition": "CREATE OR REPLACE FUNCTION extensions.gen_random_bytes(integer)\n RETURNS bytea\n LANGUAGE c\n PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pg_random_bytes$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "gen_random_uuid",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION extensions.gen_random_uuid()\n RETURNS uuid\n LANGUAGE c\n PARALLEL SAFE\nAS '$libdir/pgcrypto', $function$pg_random_uuid$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "gen_salt",
    "args_signature": "text",
    "definition": "CREATE OR REPLACE FUNCTION extensions.gen_salt(text)\n RETURNS text\n LANGUAGE c\n PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pg_gen_salt$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "gen_salt",
    "args_signature": "text, integer",
    "definition": "CREATE OR REPLACE FUNCTION extensions.gen_salt(text, integer)\n RETURNS text\n LANGUAGE c\n PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pg_gen_salt_rounds$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "grant_pg_cron_access",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION extensions.grant_pg_cron_access()\n RETURNS event_trigger\n LANGUAGE plpgsql\nAS $function$\nBEGIN\n  IF EXISTS (\n    SELECT\n    FROM pg_event_trigger_ddl_commands() AS ev\n    JOIN pg_extension AS ext\n    ON ev.objid = ext.oid\n    WHERE ext.extname = 'pg_cron'\n  )\n  THEN\n    grant usage on schema cron to postgres with grant option;\n\n    alter default privileges in schema cron grant all on tables to postgres with grant option;\n    alter default privileges in schema cron grant all on functions to postgres with grant option;\n    alter default privileges in schema cron grant all on sequences to postgres with grant option;\n\n    alter default privileges for user supabase_admin in schema cron grant all\n        on sequences to postgres with grant option;\n    alter default privileges for user supabase_admin in schema cron grant all\n        on tables to postgres with grant option;\n    alter default privileges for user supabase_admin in schema cron grant all\n        on functions to postgres with grant option;\n\n    grant all privileges on all tables in schema cron to postgres with grant option;\n    revoke all on table cron.job from postgres;\n    grant select on table cron.job to postgres with grant option;\n  END IF;\nEND;\n$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "grant_pg_graphql_access",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION extensions.grant_pg_graphql_access()\n RETURNS event_trigger\n LANGUAGE plpgsql\nAS $function$\nDECLARE\n    func_is_graphql_resolve bool;\nBEGIN\n    func_is_graphql_resolve = (\n        SELECT n.proname = 'resolve'\n        FROM pg_event_trigger_ddl_commands() AS ev\n        LEFT JOIN pg_catalog.pg_proc AS n\n        ON ev.objid = n.oid\n    );\n\n    IF func_is_graphql_resolve\n    THEN\n        -- Update public wrapper to pass all arguments through to the pg_graphql resolve func\n        DROP FUNCTION IF EXISTS graphql_public.graphql;\n        create or replace function graphql_public.graphql(\n            \"operationName\" text default null,\n            query text default null,\n            variables jsonb default null,\n            extensions jsonb default null\n        )\n            returns jsonb\n            language sql\n        as $$\n            select graphql.resolve(\n                query := query,\n                variables := coalesce(variables, '{}'),\n                \"operationName\" := \"operationName\",\n                extensions := extensions\n            );\n        $$;\n\n        -- This hook executes when `graphql.resolve` is created. That is not necessarily the last\n        -- function in the extension so we need to grant permissions on existing entities AND\n        -- update default permissions to any others that are created after `graphql.resolve`\n        grant usage on schema graphql to postgres, anon, authenticated, service_role;\n        grant select on all tables in schema graphql to postgres, anon, authenticated, service_role;\n        grant execute on all functions in schema graphql to postgres, anon, authenticated, service_role;\n        grant all on all sequences in schema graphql to postgres, anon, authenticated, service_role;\n        alter default privileges in schema graphql grant all on tables to postgres, anon, authenticated, service_role;\n        alter default privileges in schema graphql grant all on functions to postgres, anon, authenticated, service_role;\n        alter default privileges in schema graphql grant all on sequences to postgres, anon, authenticated, service_role;\n\n        -- Allow postgres role to allow granting usage on graphql and graphql_public schemas to custom roles\n        grant usage on schema graphql_public to postgres with grant option;\n        grant usage on schema graphql to postgres with grant option;\n    END IF;\n\nEND;\n$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "grant_pg_net_access",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION extensions.grant_pg_net_access()\n RETURNS event_trigger\n LANGUAGE plpgsql\nAS $function$\nBEGIN\n  IF EXISTS (\n    SELECT 1\n    FROM pg_event_trigger_ddl_commands() AS ev\n    JOIN pg_extension AS ext\n    ON ev.objid = ext.oid\n    WHERE ext.extname = 'pg_net'\n  )\n  THEN\n    IF NOT EXISTS (\n      SELECT 1\n      FROM pg_roles\n      WHERE rolname = 'supabase_functions_admin'\n    )\n    THEN\n      CREATE USER supabase_functions_admin NOINHERIT CREATEROLE LOGIN NOREPLICATION;\n    END IF;\n\n    GRANT USAGE ON SCHEMA net TO supabase_functions_admin, postgres, anon, authenticated, service_role;\n\n    IF EXISTS (\n      SELECT FROM pg_extension\n      WHERE extname = 'pg_net'\n      -- all versions in use on existing projects as of 2025-02-20\n      -- version 0.12.0 onwards don't need these applied\n      AND extversion IN ('0.2', '0.6', '0.7', '0.7.1', '0.8', '0.10.0', '0.11.0')\n    ) THEN\n      ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;\n      ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;\n\n      ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;\n      ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;\n\n      REVOKE ALL ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;\n      REVOKE ALL ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;\n\n      GRANT EXECUTE ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;\n      GRANT EXECUTE ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;\n    END IF;\n  END IF;\nEND;\n$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "hmac",
    "args_signature": "text, text, text",
    "definition": "CREATE OR REPLACE FUNCTION extensions.hmac(text, text, text)\n RETURNS bytea\n LANGUAGE c\n IMMUTABLE PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pg_hmac$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "hmac",
    "args_signature": "bytea, bytea, text",
    "definition": "CREATE OR REPLACE FUNCTION extensions.hmac(bytea, bytea, text)\n RETURNS bytea\n LANGUAGE c\n IMMUTABLE PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pg_hmac$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "pg_stat_statements",
    "args_signature": "showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT shared_blk_read_time double precision, OUT shared_blk_write_time double precision, OUT local_blk_read_time double precision, OUT local_blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision, OUT jit_deform_count bigint, OUT jit_deform_time double precision, OUT stats_since timestamp with time zone, OUT minmax_stats_since timestamp with time zone",
    "definition": "CREATE OR REPLACE FUNCTION extensions.pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT shared_blk_read_time double precision, OUT shared_blk_write_time double precision, OUT local_blk_read_time double precision, OUT local_blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision, OUT jit_deform_count bigint, OUT jit_deform_time double precision, OUT stats_since timestamp with time zone, OUT minmax_stats_since timestamp with time zone)\n RETURNS SETOF record\n LANGUAGE c\n PARALLEL SAFE STRICT\nAS '$libdir/pg_stat_statements', $function$pg_stat_statements_1_11$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "pg_stat_statements_info",
    "args_signature": "OUT dealloc bigint, OUT stats_reset timestamp with time zone",
    "definition": "CREATE OR REPLACE FUNCTION extensions.pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone)\n RETURNS record\n LANGUAGE c\n PARALLEL SAFE STRICT\nAS '$libdir/pg_stat_statements', $function$pg_stat_statements_info$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "pg_stat_statements_reset",
    "args_signature": "userid oid, dbid oid, queryid bigint, minmax_only boolean",
    "definition": "CREATE OR REPLACE FUNCTION extensions.pg_stat_statements_reset(userid oid DEFAULT 0, dbid oid DEFAULT 0, queryid bigint DEFAULT 0, minmax_only boolean DEFAULT false)\n RETURNS timestamp with time zone\n LANGUAGE c\n PARALLEL SAFE STRICT\nAS '$libdir/pg_stat_statements', $function$pg_stat_statements_reset_1_11$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "pgp_armor_headers",
    "args_signature": "text, OUT key text, OUT value text",
    "definition": "CREATE OR REPLACE FUNCTION extensions.pgp_armor_headers(text, OUT key text, OUT value text)\n RETURNS SETOF record\n LANGUAGE c\n IMMUTABLE PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pgp_armor_headers$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "pgp_key_id",
    "args_signature": "bytea",
    "definition": "CREATE OR REPLACE FUNCTION extensions.pgp_key_id(bytea)\n RETURNS text\n LANGUAGE c\n IMMUTABLE PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pgp_key_id_w$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "pgp_pub_decrypt",
    "args_signature": "bytea, bytea, text, text",
    "definition": "CREATE OR REPLACE FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text, text)\n RETURNS text\n LANGUAGE c\n IMMUTABLE PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pgp_pub_decrypt_text$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "pgp_pub_decrypt",
    "args_signature": "bytea, bytea",
    "definition": "CREATE OR REPLACE FUNCTION extensions.pgp_pub_decrypt(bytea, bytea)\n RETURNS text\n LANGUAGE c\n IMMUTABLE PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pgp_pub_decrypt_text$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "pgp_pub_decrypt",
    "args_signature": "bytea, bytea, text",
    "definition": "CREATE OR REPLACE FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text)\n RETURNS text\n LANGUAGE c\n IMMUTABLE PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pgp_pub_decrypt_text$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "pgp_pub_decrypt_bytea",
    "args_signature": "bytea, bytea",
    "definition": "CREATE OR REPLACE FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea)\n RETURNS bytea\n LANGUAGE c\n IMMUTABLE PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pgp_pub_decrypt_bytea$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "pgp_pub_decrypt_bytea",
    "args_signature": "bytea, bytea, text",
    "definition": "CREATE OR REPLACE FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text)\n RETURNS bytea\n LANGUAGE c\n IMMUTABLE PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pgp_pub_decrypt_bytea$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "pgp_pub_decrypt_bytea",
    "args_signature": "bytea, bytea, text, text",
    "definition": "CREATE OR REPLACE FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text, text)\n RETURNS bytea\n LANGUAGE c\n IMMUTABLE PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pgp_pub_decrypt_bytea$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "pgp_pub_encrypt",
    "args_signature": "text, bytea, text",
    "definition": "CREATE OR REPLACE FUNCTION extensions.pgp_pub_encrypt(text, bytea, text)\n RETURNS bytea\n LANGUAGE c\n PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pgp_pub_encrypt_text$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "pgp_pub_encrypt",
    "args_signature": "text, bytea",
    "definition": "CREATE OR REPLACE FUNCTION extensions.pgp_pub_encrypt(text, bytea)\n RETURNS bytea\n LANGUAGE c\n PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pgp_pub_encrypt_text$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "pgp_pub_encrypt_bytea",
    "args_signature": "bytea, bytea",
    "definition": "CREATE OR REPLACE FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea)\n RETURNS bytea\n LANGUAGE c\n PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pgp_pub_encrypt_bytea$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "pgp_pub_encrypt_bytea",
    "args_signature": "bytea, bytea, text",
    "definition": "CREATE OR REPLACE FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea, text)\n RETURNS bytea\n LANGUAGE c\n PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pgp_pub_encrypt_bytea$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "pgp_sym_decrypt",
    "args_signature": "bytea, text, text",
    "definition": "CREATE OR REPLACE FUNCTION extensions.pgp_sym_decrypt(bytea, text, text)\n RETURNS text\n LANGUAGE c\n IMMUTABLE PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pgp_sym_decrypt_text$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "pgp_sym_decrypt",
    "args_signature": "bytea, text",
    "definition": "CREATE OR REPLACE FUNCTION extensions.pgp_sym_decrypt(bytea, text)\n RETURNS text\n LANGUAGE c\n IMMUTABLE PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pgp_sym_decrypt_text$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "pgp_sym_decrypt_bytea",
    "args_signature": "bytea, text",
    "definition": "CREATE OR REPLACE FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text)\n RETURNS bytea\n LANGUAGE c\n IMMUTABLE PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pgp_sym_decrypt_bytea$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "pgp_sym_decrypt_bytea",
    "args_signature": "bytea, text, text",
    "definition": "CREATE OR REPLACE FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text, text)\n RETURNS bytea\n LANGUAGE c\n IMMUTABLE PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pgp_sym_decrypt_bytea$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "pgp_sym_encrypt",
    "args_signature": "text, text",
    "definition": "CREATE OR REPLACE FUNCTION extensions.pgp_sym_encrypt(text, text)\n RETURNS bytea\n LANGUAGE c\n PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pgp_sym_encrypt_text$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "pgp_sym_encrypt",
    "args_signature": "text, text, text",
    "definition": "CREATE OR REPLACE FUNCTION extensions.pgp_sym_encrypt(text, text, text)\n RETURNS bytea\n LANGUAGE c\n PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pgp_sym_encrypt_text$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "pgp_sym_encrypt_bytea",
    "args_signature": "bytea, text, text",
    "definition": "CREATE OR REPLACE FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text, text)\n RETURNS bytea\n LANGUAGE c\n PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pgp_sym_encrypt_bytea$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "pgp_sym_encrypt_bytea",
    "args_signature": "bytea, text",
    "definition": "CREATE OR REPLACE FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text)\n RETURNS bytea\n LANGUAGE c\n PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pgp_sym_encrypt_bytea$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "pgrst_ddl_watch",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION extensions.pgrst_ddl_watch()\n RETURNS event_trigger\n LANGUAGE plpgsql\nAS $function$\nDECLARE\n  cmd record;\nBEGIN\n  FOR cmd IN SELECT * FROM pg_event_trigger_ddl_commands()\n  LOOP\n    IF cmd.command_tag IN (\n      'CREATE SCHEMA', 'ALTER SCHEMA'\n    , 'CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO', 'ALTER TABLE'\n    , 'CREATE FOREIGN TABLE', 'ALTER FOREIGN TABLE'\n    , 'CREATE VIEW', 'ALTER VIEW'\n    , 'CREATE MATERIALIZED VIEW', 'ALTER MATERIALIZED VIEW'\n    , 'CREATE FUNCTION', 'ALTER FUNCTION'\n    , 'CREATE TRIGGER'\n    , 'CREATE TYPE', 'ALTER TYPE'\n    , 'CREATE RULE'\n    , 'COMMENT'\n    )\n    -- don't notify in case of CREATE TEMP table or other objects created on pg_temp\n    AND cmd.schema_name is distinct from 'pg_temp'\n    THEN\n      NOTIFY pgrst, 'reload schema';\n    END IF;\n  END LOOP;\nEND; $function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "pgrst_drop_watch",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION extensions.pgrst_drop_watch()\n RETURNS event_trigger\n LANGUAGE plpgsql\nAS $function$\nDECLARE\n  obj record;\nBEGIN\n  FOR obj IN SELECT * FROM pg_event_trigger_dropped_objects()\n  LOOP\n    IF obj.object_type IN (\n      'schema'\n    , 'table'\n    , 'foreign table'\n    , 'view'\n    , 'materialized view'\n    , 'function'\n    , 'trigger'\n    , 'type'\n    , 'rule'\n    )\n    AND obj.is_temporary IS false -- no pg_temp objects\n    THEN\n      NOTIFY pgrst, 'reload schema';\n    END IF;\n  END LOOP;\nEND; $function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "set_graphql_placeholder",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION extensions.set_graphql_placeholder()\n RETURNS event_trigger\n LANGUAGE plpgsql\nAS $function$\n    DECLARE\n    graphql_is_dropped bool;\n    BEGIN\n    graphql_is_dropped = (\n        SELECT ev.schema_name = 'graphql_public'\n        FROM pg_event_trigger_dropped_objects() AS ev\n        WHERE ev.schema_name = 'graphql_public'\n    );\n\n    IF graphql_is_dropped\n    THEN\n        create or replace function graphql_public.graphql(\n            \"operationName\" text default null,\n            query text default null,\n            variables jsonb default null,\n            extensions jsonb default null\n        )\n            returns jsonb\n            language plpgsql\n        as $$\n            DECLARE\n                server_version float;\n            BEGIN\n                server_version = (SELECT (SPLIT_PART((select version()), ' ', 2))::float);\n\n                IF server_version >= 14 THEN\n                    RETURN jsonb_build_object(\n                        'errors', jsonb_build_array(\n                            jsonb_build_object(\n                                'message', 'pg_graphql extension is not enabled.'\n                            )\n                        )\n                    );\n                ELSE\n                    RETURN jsonb_build_object(\n                        'errors', jsonb_build_array(\n                            jsonb_build_object(\n                                'message', 'pg_graphql is only available on projects running Postgres 14 onwards.'\n                            )\n                        )\n                    );\n                END IF;\n            END;\n        $$;\n    END IF;\n\n    END;\n$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "uuid_generate_v1",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION extensions.uuid_generate_v1()\n RETURNS uuid\n LANGUAGE c\n PARALLEL SAFE STRICT\nAS '$libdir/uuid-ossp', $function$uuid_generate_v1$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "uuid_generate_v1mc",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION extensions.uuid_generate_v1mc()\n RETURNS uuid\n LANGUAGE c\n PARALLEL SAFE STRICT\nAS '$libdir/uuid-ossp', $function$uuid_generate_v1mc$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "uuid_generate_v3",
    "args_signature": "namespace uuid, name text",
    "definition": "CREATE OR REPLACE FUNCTION extensions.uuid_generate_v3(namespace uuid, name text)\n RETURNS uuid\n LANGUAGE c\n IMMUTABLE PARALLEL SAFE STRICT\nAS '$libdir/uuid-ossp', $function$uuid_generate_v3$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "uuid_generate_v4",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION extensions.uuid_generate_v4()\n RETURNS uuid\n LANGUAGE c\n PARALLEL SAFE STRICT\nAS '$libdir/uuid-ossp', $function$uuid_generate_v4$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "uuid_generate_v5",
    "args_signature": "namespace uuid, name text",
    "definition": "CREATE OR REPLACE FUNCTION extensions.uuid_generate_v5(namespace uuid, name text)\n RETURNS uuid\n LANGUAGE c\n IMMUTABLE PARALLEL SAFE STRICT\nAS '$libdir/uuid-ossp', $function$uuid_generate_v5$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "uuid_nil",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION extensions.uuid_nil()\n RETURNS uuid\n LANGUAGE c\n IMMUTABLE PARALLEL SAFE STRICT\nAS '$libdir/uuid-ossp', $function$uuid_nil$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "uuid_ns_dns",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION extensions.uuid_ns_dns()\n RETURNS uuid\n LANGUAGE c\n IMMUTABLE PARALLEL SAFE STRICT\nAS '$libdir/uuid-ossp', $function$uuid_ns_dns$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "uuid_ns_oid",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION extensions.uuid_ns_oid()\n RETURNS uuid\n LANGUAGE c\n IMMUTABLE PARALLEL SAFE STRICT\nAS '$libdir/uuid-ossp', $function$uuid_ns_oid$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "uuid_ns_url",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION extensions.uuid_ns_url()\n RETURNS uuid\n LANGUAGE c\n IMMUTABLE PARALLEL SAFE STRICT\nAS '$libdir/uuid-ossp', $function$uuid_ns_url$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "uuid_ns_x500",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION extensions.uuid_ns_x500()\n RETURNS uuid\n LANGUAGE c\n IMMUTABLE PARALLEL SAFE STRICT\nAS '$libdir/uuid-ossp', $function$uuid_ns_x500$function$\n"
  },
  {
    "schema_name": "graphql",
    "function_name": "_internal_resolve",
    "args_signature": "query text, variables jsonb, \"operationName\" text, extensions jsonb",
    "definition": "CREATE OR REPLACE FUNCTION graphql._internal_resolve(query text, variables jsonb DEFAULT '{}'::jsonb, \"operationName\" text DEFAULT NULL::text, extensions jsonb DEFAULT NULL::jsonb)\n RETURNS jsonb\n LANGUAGE c\nAS '$libdir/pg_graphql', $function$resolve_wrapper$function$\n"
  },
  {
    "schema_name": "graphql",
    "function_name": "comment_directive",
    "args_signature": "comment_ text",
    "definition": "CREATE OR REPLACE FUNCTION graphql.comment_directive(comment_ text)\n RETURNS jsonb\n LANGUAGE sql\n IMMUTABLE\nAS $function$\n    /*\n    comment on column public.account.name is '@graphql.name: myField'\n    */\n    select\n        coalesce(\n            (\n                regexp_match(\n                    comment_,\n                    '@graphql\\((.+)\\)'\n                )\n            )[1]::jsonb,\n            jsonb_build_object()\n        )\n$function$\n"
  },
  {
    "schema_name": "graphql",
    "function_name": "exception",
    "args_signature": "message text",
    "definition": "CREATE OR REPLACE FUNCTION graphql.exception(message text)\n RETURNS text\n LANGUAGE plpgsql\nAS $function$\nbegin\n    raise exception using errcode='22000', message=message;\nend;\n$function$\n"
  },
  {
    "schema_name": "graphql",
    "function_name": "get_schema_version",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION graphql.get_schema_version()\n RETURNS integer\n LANGUAGE sql\n SECURITY DEFINER\nAS $function$\n    select last_value from graphql.seq_schema_version;\n$function$\n"
  },
  {
    "schema_name": "graphql",
    "function_name": "increment_schema_version",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION graphql.increment_schema_version()\n RETURNS event_trigger\n LANGUAGE plpgsql\n SECURITY DEFINER\nAS $function$\nbegin\n    perform pg_catalog.nextval('graphql.seq_schema_version');\nend;\n$function$\n"
  },
  {
    "schema_name": "graphql",
    "function_name": "resolve",
    "args_signature": "query text, variables jsonb, \"operationName\" text, extensions jsonb",
    "definition": "CREATE OR REPLACE FUNCTION graphql.resolve(query text, variables jsonb DEFAULT '{}'::jsonb, \"operationName\" text DEFAULT NULL::text, extensions jsonb DEFAULT NULL::jsonb)\n RETURNS jsonb\n LANGUAGE plpgsql\nAS $function$\ndeclare\n    res jsonb;\n    message_text text;\nbegin\n  begin\n    select graphql._internal_resolve(\"query\" := \"query\",\n                                     \"variables\" := \"variables\",\n                                     \"operationName\" := \"operationName\",\n                                     \"extensions\" := \"extensions\") into res;\n    return res;\n  exception\n    when others then\n    get stacked diagnostics message_text = message_text;\n    return\n    jsonb_build_object('data', null,\n                       'errors', jsonb_build_array(jsonb_build_object('message', message_text)));\n  end;\nend;\n$function$\n"
  },
  {
    "schema_name": "graphql_public",
    "function_name": "graphql",
    "args_signature": "\"operationName\" text, query text, variables jsonb, extensions jsonb",
    "definition": "CREATE OR REPLACE FUNCTION graphql_public.graphql(\"operationName\" text DEFAULT NULL::text, query text DEFAULT NULL::text, variables jsonb DEFAULT NULL::jsonb, extensions jsonb DEFAULT NULL::jsonb)\n RETURNS jsonb\n LANGUAGE sql\nAS $function$\n            select graphql.resolve(\n                query := query,\n                variables := coalesce(variables, '{}'),\n                \"operationName\" := \"operationName\",\n                extensions := extensions\n            );\n        $function$\n"
  },
  {
    "schema_name": "private_health_info",
    "function_name": "anonymize_daily_log_to_research",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION private_health_info.anonymize_daily_log_to_research()\n RETURNS trigger\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'research', 'private_health_info', 'linkage', 'public'\nAS $function$\nDECLARE\n    v_research_id UUID;\n    v_consent BOOLEAN;\nBEGIN\n    IF NEW.visible_to_researchers = false THEN\n        RETURN NEW;\n    END IF;\n    \n    v_consent := private_health_info.check_research_consent(NEW.patient_id, 'symptom');\n    IF v_consent = false THEN\n        RETURN NEW;\n    END IF;\n    \n    SELECT research_id INTO v_research_id FROM linkage.research_id_map WHERE user_id = NEW.patient_id;\n    \n    IF v_research_id IS NULL THEN\n        v_research_id := gen_random_uuid();\n        INSERT INTO linkage.research_id_map (user_id, research_id) VALUES (NEW.patient_id, v_research_id)\n        ON CONFLICT (user_id) DO UPDATE SET research_id = EXCLUDED.research_id RETURNING research_id INTO v_research_id;\n    END IF;\n    \n    INSERT INTO research.daily_symptom_logs (\n        research_id, log_date, overall_feeling, mood, energy_level, fatigue_level,\n        pain_level, sleep_quality, sleep_hours, sleep_disturbances,\n        motor_fluctuations_occurred, on_time_hours, off_time_hours,\n        dyskinesia_severity, stiffness_severity, slowness_severity,\n        cognitive_issues, mood_issues, autonomic_symptoms, adl_independence_level,\n        activities_difficult, all_medications_taken, medication_side_effects,\n        stress_level, exercise_minutes, source_log_id\n    ) VALUES (\n        v_research_id, NEW.log_date, NEW.overall_feeling, NEW.mood, NEW.energy_level,\n        NEW.fatigue_level, NEW.pain_level, NEW.sleep_quality, NEW.sleep_hours,\n        NEW.sleep_disturbances, NEW.motor_fluctuations_occurred, NEW.on_time_hours,\n        NEW.off_time_hours, NEW.dyskinesia_severity, NEW.stiffness_severity,\n        NEW.slowness_severity, NEW.cognitive_issues, NEW.mood_issues,\n        NEW.autonomic_symptoms, NEW.adl_independence_level, NEW.activities_difficult,\n        NEW.all_medications_taken, NEW.medication_side_effects, NEW.stress_level,\n        NEW.exercise_minutes, NEW.log_id\n    ) ON CONFLICT (research_id, log_date) DO UPDATE SET\n        overall_feeling = EXCLUDED.overall_feeling,\n        mood = EXCLUDED.mood,\n        updated_at = NOW();\n    \n    RETURN NEW;\nEND;\n$function$\n"
  },
  {
    "schema_name": "private_health_info",
    "function_name": "anonymize_gait_to_research",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION private_health_info.anonymize_gait_to_research()\n RETURNS trigger\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'research', 'private_health_info', 'linkage', 'public'\nAS $function$\nDECLARE\n    v_research_id UUID;\n    v_consent BOOLEAN;\nBEGIN\n    IF NEW.visible_to_researchers = false THEN\n        RETURN NEW;\n    END IF;\n    \n    v_consent := private_health_info.check_research_consent(NEW.patient_id, 'gait');\n    IF v_consent = false THEN\n        RETURN NEW;\n    END IF;\n    \n    SELECT research_id INTO v_research_id FROM linkage.research_id_map WHERE user_id = NEW.patient_id;\n    \n    IF v_research_id IS NULL THEN\n        v_research_id := gen_random_uuid();\n        INSERT INTO linkage.research_id_map (user_id, research_id) VALUES (NEW.patient_id, v_research_id)\n        ON CONFLICT (user_id) DO UPDATE SET research_id = EXCLUDED.research_id RETURNING research_id INTO v_research_id;\n    END IF;\n    \n    INSERT INTO research.gait_episodes (\n        research_id, occurred_at_date, occurred_at_hour, duration_seconds,\n        event_type, severity, resulted_in_fall, fall_direction, injury_occurred,\n        required_assistance, environmental_factors, medication_status,\n        hours_since_medication, freezing_trigger, source_gait_id\n    ) VALUES (\n        v_research_id, DATE(NEW.occurred_at), EXTRACT(HOUR FROM NEW.occurred_at),\n        NEW.duration_seconds, NEW.event_type, NEW.severity, NEW.resulted_in_fall,\n        NEW.fall_direction, NEW.injury_occurred, NEW.required_assistance,\n        NEW.environmental_factors, NEW.medication_status, NEW.hours_since_medication,\n        NEW.freezing_trigger, NEW.gait_id\n    ) ON CONFLICT (gait_id) DO NOTHING;\n    \n    RETURN NEW;\nEND;\n$function$\n"
  },
  {
    "schema_name": "private_health_info",
    "function_name": "anonymize_seizure_to_research",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION private_health_info.anonymize_seizure_to_research()\n RETURNS trigger\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'research', 'private_health_info', 'linkage', 'public'\nAS $function$\nDECLARE\n    v_research_id UUID;\n    v_consent BOOLEAN;\nBEGIN\n    -- Only process if visible_to_researchers is true\n    IF NEW.visible_to_researchers = false THEN\n        RETURN NEW;\n    END IF;\n    \n    -- Check consent\n    v_consent := private_health_info.check_research_consent(NEW.patient_id, 'seizure');\n    \n    IF v_consent = false THEN\n        RETURN NEW;\n    END IF;\n    \n    -- Get research ID\n    SELECT research_id INTO v_research_id\n    FROM linkage.research_id_map\n    WHERE user_id = NEW.patient_id;\n    \n    -- If no research ID, create one\n    IF v_research_id IS NULL THEN\n        v_research_id := gen_random_uuid();\n        INSERT INTO linkage.research_id_map (user_id, research_id)\n        VALUES (NEW.patient_id, v_research_id)\n        ON CONFLICT (user_id) DO UPDATE SET research_id = EXCLUDED.research_id\n        RETURNING research_id INTO v_research_id;\n    END IF;\n    \n    -- Insert anonymized data into research schema\n    INSERT INTO research.seizure_events (\n        research_id,\n        occurred_at_date,\n        occurred_at_hour,\n        duration_seconds,\n        seizure_type,\n        severity,\n        consciousness_level,\n        had_aura,\n        aura_signs,\n        possible_triggers,\n        body_parts_affected,\n        motor_symptoms,\n        non_motor_symptoms,\n        post_ictal_effects,\n        post_ictal_duration_minutes,\n        injuries_occurred,\n        injury_types,\n        required_medical_attention,\n        witnessed,\n        medication_taken_as_prescribed,\n        hours_since_last_dose,\n        recent_medication_changes,\n        fully_recovered,\n        recovery_time_minutes,\n        source_event_id\n    ) VALUES (\n        v_research_id,\n        DATE(NEW.occurred_at),\n        EXTRACT(HOUR FROM NEW.occurred_at),\n        NEW.duration_seconds,\n        NEW.seizure_type,\n        NEW.severity,\n        NEW.consciousness_level,\n        NEW.had_aura,\n        NEW.aura_signs,\n        NEW.possible_triggers,\n        NEW.body_parts_affected,\n        NEW.motor_symptoms,\n        NEW.non_motor_symptoms,\n        NEW.post_ictal_effects,\n        NEW.post_ictal_duration_minutes,\n        NEW.injuries_occurred,\n        NEW.injury_types,\n        NEW.required_medical_attention,\n        NEW.witnessed,\n        NEW.medication_taken_as_prescribed,\n        NEW.hours_since_last_dose,\n        NEW.recent_medication_changes,\n        NEW.fully_recovered,\n        NEW.recovery_time_minutes,\n        NEW.event_id\n    )\n    ON CONFLICT (event_id) DO NOTHING; -- Prevent duplicates on update\n    \n    RETURN NEW;\nEND;\n$function$\n"
  },
  {
    "schema_name": "private_health_info",
    "function_name": "anonymize_tremor_to_research",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION private_health_info.anonymize_tremor_to_research()\n RETURNS trigger\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'research', 'private_health_info', 'linkage', 'public'\nAS $function$\nDECLARE\n    v_research_id UUID;\n    v_consent BOOLEAN;\nBEGIN\n    IF NEW.visible_to_researchers = false THEN\n        RETURN NEW;\n    END IF;\n    \n    v_consent := private_health_info.check_research_consent(NEW.patient_id, 'tremor');\n    IF v_consent = false THEN\n        RETURN NEW;\n    END IF;\n    \n    SELECT research_id INTO v_research_id FROM linkage.research_id_map WHERE user_id = NEW.patient_id;\n    \n    IF v_research_id IS NULL THEN\n        v_research_id := gen_random_uuid();\n        INSERT INTO linkage.research_id_map (user_id, research_id) VALUES (NEW.patient_id, v_research_id)\n        ON CONFLICT (user_id) DO UPDATE SET research_id = EXCLUDED.research_id RETURNING research_id INTO v_research_id;\n    END IF;\n    \n    INSERT INTO research.tremor_episodes (\n        research_id, occurred_at_date, occurred_at_hour, duration_seconds,\n        tremor_type, severity, frequency_hz, body_regions, dominant_side,\n        interfered_with_activities, activities_affected, occurred_during,\n        medication_status, hours_since_medication, possible_triggers, source_tremor_id\n    ) VALUES (\n        v_research_id, DATE(NEW.occurred_at), EXTRACT(HOUR FROM NEW.occurred_at),\n        NEW.duration_seconds, NEW.tremor_type, NEW.severity, NEW.frequency_hz,\n        NEW.body_regions, NEW.dominant_side, NEW.interfered_with_activities,\n        NEW.activities_affected, NEW.occurred_during, NEW.medication_status,\n        NEW.hours_since_medication, NEW.possible_triggers, NEW.tremor_id\n    ) ON CONFLICT (tremor_id) DO NOTHING;\n    \n    RETURN NEW;\nEND;\n$function$\n"
  },
  {
    "schema_name": "private_health_info",
    "function_name": "check_catamenial_pattern_alert",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION private_health_info.check_catamenial_pattern_alert()\n RETURNS trigger\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'private_health_info', 'public'\nAS $function$\nDECLARE\n    v_recent_cycles INTEGER;\nBEGIN\n    -- If user suspects catamenial pattern, send alert\n    IF NEW.catamenial_pattern_suspected = true THEN\n        -- Check how many times they've suspected this\n        SELECT COUNT(*) INTO v_recent_cycles\n        FROM private_health_info.menstrual_cycle_logs\n        WHERE user_id = NEW.user_id\n        AND catamenial_pattern_suspected = true\n        AND created_at > NOW() - INTERVAL '3 months';\n        \n        -- If 2+ cycles with suspected pattern, send alert (NO PHI!)\n        IF v_recent_cycles >= 2 THEN\n            PERFORM public.schedule_notification(\n                NEW.user_id,\n                'pattern_alert',\n                'Catamenial Seizure Pattern Detected',\n                'You''ve logged multiple cycles with menstrual-related seizures. Consider discussing this pattern with your neurologist.',\n                '/dashboard/insights',\n                NEW.id,\n                NOW(),\n                'high'\n            );\n        END IF;\n    END IF;\n    \n    RETURN NEW;\nEND;\n$function$\n"
  },
  {
    "schema_name": "private_health_info",
    "function_name": "check_research_consent",
    "args_signature": "p_patient_id uuid, p_data_type text",
    "definition": "CREATE OR REPLACE FUNCTION private_health_info.check_research_consent(p_patient_id uuid, p_data_type text)\n RETURNS boolean\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'public', 'private_health_info', 'linkage'\nAS $function$\nDECLARE\n    v_consent BOOLEAN := false;\n    v_default_share BOOLEAN := false;\nBEGIN\n    -- Check data_sharing_preferences\n    SELECT \n        default_share_with_researchers,\n        CASE p_data_type\n            WHEN 'seizure' THEN research_seizure_data\n            WHEN 'tremor' THEN research_tremor_data\n            WHEN 'gait' THEN research_gait_data\n            WHEN 'symptom' THEN research_symptom_data\n            ELSE false\n        END\n    INTO v_default_share, v_consent\n    FROM public.data_sharing_preferences\n    WHERE patient_id = p_patient_id;\n    \n    -- If no preferences exist, default to NO consent\n    IF NOT FOUND THEN\n        RETURN false;\n    END IF;\n    \n    -- Both default AND specific consent must be true\n    RETURN (v_default_share AND v_consent);\nEND;\n$function$\n"
  },
  {
    "schema_name": "private_health_info",
    "function_name": "check_seizure_cluster_alert",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION private_health_info.check_seizure_cluster_alert()\n RETURNS trigger\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'private_health_info', 'public'\nAS $function$\nDECLARE\n    v_recent_seizures INTEGER;\nBEGIN\n    -- Count seizures in last 24 hours\n    SELECT COUNT(*) INTO v_recent_seizures\n    FROM private_health_info.seizure_events\n    WHERE patient_id = NEW.patient_id\n    AND occurred_at > NOW() - INTERVAL '24 hours';\n    \n    -- If 3+ seizures in 24 hours, send critical alert (NO PHI!)\n    IF v_recent_seizures >= 3 THEN\n        PERFORM public.schedule_notification(\n            NEW.patient_id,\n            'critical_alert',\n            'Seizure Cluster Detected',\n            'You''ve logged 3+ seizures in 24 hours. Consider contacting your healthcare provider.',\n            '/dashboard/emergency',\n            NEW.id,\n            NOW(),\n            'critical'\n        );\n    END IF;\n    \n    RETURN NEW;\nEND;\n$function$\n"
  },
  {
    "schema_name": "private_health_info",
    "function_name": "schedule_medication_reminders",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION private_health_info.schedule_medication_reminders()\n RETURNS trigger\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'private_health_info', 'public'\nAS $function$\nDECLARE\n    v_prefs RECORD;\n    v_medication_name TEXT;\n    v_next_dose TIMESTAMPTZ;\nBEGIN\n    -- Get user preferences\n    SELECT * INTO v_prefs\n    FROM public.notification_preferences\n    WHERE user_id = NEW.user_id;\n    \n    -- If medication reminders disabled, skip\n    IF NOT FOUND OR NOT v_prefs.medication_reminders THEN\n        RETURN NEW;\n    END IF;\n    \n    -- Get medication name (NO PHI - just generic reference)\n    SELECT 'Medication Reminder' INTO v_medication_name;\n    \n    -- Calculate next dose time (example: if dose_times array exists)\n    -- For now, schedule for tomorrow at daily_checkin_time\n    v_next_dose := (CURRENT_DATE + INTERVAL '1 day' + v_prefs.daily_checkin_time::TIME)::TIMESTAMPTZ;\n    \n    -- Schedule notification (NO PHI in content!)\n    PERFORM public.schedule_notification(\n        NEW.user_id,\n        'medication_reminder',\n        'Medication Reminder',\n        'Time to take your medication. Tap to log.',\n        '/dashboard?action=medication',\n        NEW.id,\n        v_next_dose - (v_prefs.medication_reminder_minutes || ' minutes')::INTERVAL,\n        'normal'\n    );\n    \n    RETURN NEW;\nEND;\n$function$\n"
  },
  {
    "schema_name": "private_health_info",
    "function_name": "update_menstrual_log_timestamp",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION private_health_info.update_menstrual_log_timestamp()\n RETURNS trigger\n LANGUAGE plpgsql\n SECURITY DEFINER\nAS $function$\nBEGIN\n    NEW.updated_at = NOW();\n    RETURN NEW;\nEND;\n$function$\n"
  },
  {
    "schema_name": "private_health_info",
    "function_name": "update_onboarding_timestamp",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION private_health_info.update_onboarding_timestamp()\n RETURNS trigger\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'private_health_info', 'public'\nAS $function$\nBEGIN\n  NEW.last_updated_at = NOW();\n  RETURN NEW;\nEND;\n$function$\n"
  },
  {
    "schema_name": "public",
    "function_name": "can_carer_see_patient_data",
    "args_signature": "p_carer_id uuid, p_patient_id uuid, p_data_type text",
    "definition": "CREATE OR REPLACE FUNCTION public.can_carer_see_patient_data(p_carer_id uuid, p_patient_id uuid, p_data_type text)\n RETURNS boolean\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'public'\nAS $function$\nDECLARE\n    v_default_share BOOLEAN;\n    v_visibility TEXT;\n    v_can_view_health_data BOOLEAN;\nBEGIN\n    -- Check if carer relationship exists and allows health data\n    SELECT can_view_health_data\n    INTO v_can_view_health_data\n    FROM public.carer_relationships\n    WHERE carer_user_id = p_carer_id\n      AND patient_user_id = p_patient_id\n      AND status = 'active';\n    \n    IF NOT FOUND OR NOT v_can_view_health_data THEN\n        RETURN false;\n    END IF;\n    \n    -- Check sharing preferences\n    SELECT \n        default_share_with_carers,\n        CASE p_data_type\n            WHEN 'seizure_events' THEN seizure_events_visibility\n            WHEN 'tremor_episodes' THEN tremor_episodes_visibility\n            WHEN 'gait_episodes' THEN gait_episodes_visibility\n            WHEN 'daily_logs' THEN daily_logs_visibility\n            WHEN 'medications' THEN medications_visibility\n            WHEN 'media' THEN media_visibility\n            ELSE 'clinician_only'\n        END\n    INTO v_default_share, v_visibility\n    FROM public.data_sharing_preferences\n    WHERE patient_id = p_patient_id;\n    \n    -- If no preferences set, default to allow for carers\n    IF NOT FOUND THEN\n        RETURN true;\n    END IF;\n    \n    -- Check if visibility allows carer access\n    RETURN v_default_share AND v_visibility IN ('clinician_carer', 'all');\nEND;\n$function$\n"
  },
  {
    "schema_name": "public",
    "function_name": "can_clinician_see_patient_data",
    "args_signature": "p_clinician_id uuid, p_patient_id uuid, p_data_type text",
    "definition": "CREATE OR REPLACE FUNCTION public.can_clinician_see_patient_data(p_clinician_id uuid, p_patient_id uuid, p_data_type text)\n RETURNS boolean\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'public'\nAS $function$\nDECLARE\n    v_default_share BOOLEAN;\n    v_visibility TEXT;\nBEGIN\n    -- Must have active connection\n    IF NOT public.is_clinician_connected_to_patient(p_clinician_id, p_patient_id) THEN\n        RETURN false;\n    END IF;\n    \n    -- Check sharing preferences\n    SELECT \n        default_share_with_clinicians,\n        CASE p_data_type\n            WHEN 'seizure_events' THEN seizure_events_visibility\n            WHEN 'tremor_episodes' THEN tremor_episodes_visibility\n            WHEN 'gait_episodes' THEN gait_episodes_visibility\n            WHEN 'daily_logs' THEN daily_logs_visibility\n            WHEN 'medications' THEN medications_visibility\n            WHEN 'media' THEN media_visibility\n            ELSE 'clinician_only'\n        END\n    INTO v_default_share, v_visibility\n    FROM public.data_sharing_preferences\n    WHERE patient_id = p_patient_id;\n    \n    -- If no preferences set, default to allow\n    IF NOT FOUND THEN\n        RETURN true;\n    END IF;\n    \n    -- Check if visibility allows clinician access\n    RETURN v_default_share AND v_visibility IN ('clinician_only', 'clinician_carer', 'all');\nEND;\n$function$\n"
  },
  {
    "schema_name": "public",
    "function_name": "cleanup_old_logs",
    "args_signature": "p_days_to_keep integer",
    "definition": "CREATE OR REPLACE FUNCTION public.cleanup_old_logs(p_days_to_keep integer DEFAULT 30)\n RETURNS TABLE(table_name text, rows_deleted bigint)\n LANGUAGE plpgsql\n SECURITY DEFINER\nAS $function$\nDECLARE\n    v_system_deleted BIGINT;\n    v_function_deleted BIGINT;\n    v_api_deleted BIGINT;\n    v_db_deleted BIGINT;\nBEGIN\n    -- Delete old system logs\n    DELETE FROM public.system_logs WHERE created_at < NOW() - (p_days_to_keep || ' days')::INTERVAL;\n    GET DIAGNOSTICS v_system_deleted = ROW_COUNT;\n    \n    -- Delete old function logs\n    DELETE FROM public.function_execution_logs WHERE created_at < NOW() - (p_days_to_keep || ' days')::INTERVAL;\n    GET DIAGNOSTICS v_function_deleted = ROW_COUNT;\n    \n    -- Delete old API logs\n    DELETE FROM public.api_request_logs WHERE created_at < NOW() - (p_days_to_keep || ' days')::INTERVAL;\n    GET DIAGNOSTICS v_api_deleted = ROW_COUNT;\n    \n    -- Delete old DB logs\n    DELETE FROM public.database_operation_logs WHERE created_at < NOW() - (p_days_to_keep || ' days')::INTERVAL;\n    GET DIAGNOSTICS v_db_deleted = ROW_COUNT;\n    \n    -- Return summary\n    RETURN QUERY\n    SELECT 'system_logs'::TEXT, v_system_deleted\n    UNION ALL\n    SELECT 'function_execution_logs'::TEXT, v_function_deleted\n    UNION ALL\n    SELECT 'api_request_logs'::TEXT, v_api_deleted\n    UNION ALL\n    SELECT 'database_operation_logs'::TEXT, v_db_deleted;\nEND;\n$function$\n"
  },
  {
    "schema_name": "public",
    "function_name": "complete_function_execution",
    "args_signature": "p_execution_id uuid, p_success boolean, p_return_value jsonb, p_error_message text",
    "definition": "CREATE OR REPLACE FUNCTION public.complete_function_execution(p_execution_id uuid, p_success boolean, p_return_value jsonb DEFAULT NULL::jsonb, p_error_message text DEFAULT NULL::text)\n RETURNS void\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'pg_catalog', 'public'\nAS $function$\nBEGIN\n    UPDATE public.function_execution_logs\n    SET \n        execution_status = CASE WHEN p_success THEN 'completed' ELSE 'failed' END,\n        completed_at = NOW(),\n        duration_ms = EXTRACT(EPOCH FROM (NOW() - started_at)) * 1000,\n        success = p_success,\n        return_value = p_return_value,\n        error_message = p_error_message\n    WHERE id = p_execution_id;\nEND;\n$function$\n"
  },
  {
    "schema_name": "public",
    "function_name": "complete_onboarding",
    "args_signature": "p_user_id uuid, p_user_type text",
    "definition": "CREATE OR REPLACE FUNCTION public.complete_onboarding(p_user_id uuid, p_user_type text)\n RETURNS json\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'public'\nAS $function$\nDECLARE\n    v_user_type user_type_enum;\nBEGIN\n    v_user_type := p_user_type::user_type_enum;\n\n    -- Update profile\n    UPDATE public.profiles\n    SET onboarding_completed = true,\n        updated_at = NOW()\n    WHERE id = p_user_id;\n\n    -- Update onboarding progress\n    UPDATE public.onboarding_progress\n    SET completed = true,\n        completed_at = NOW()\n    WHERE user_id = p_user_id;\n\n    -- Award \"Welcome Aboard\" achievement\n    INSERT INTO public.user_achievements (user_id, achievement_id)\n    SELECT p_user_id, id\n    FROM public.achievements\n    WHERE name = 'Welcome Aboard'\n    ON CONFLICT DO NOTHING;\n\n    -- Award points for completion\n    UPDATE public.user_points\n    SET total_points = total_points + 50\n    WHERE user_id = p_user_id;\n\n    RETURN json_build_object(\n        'success', true,\n        'message', 'Onboarding completed successfully'\n    );\n\nEXCEPTION WHEN OTHERS THEN\n    RETURN json_build_object(\n        'success', false,\n        'message', 'Error completing onboarding: ' || SQLERRM\n    );\nEND;\n$function$\n"
  },
  {
    "schema_name": "public",
    "function_name": "get_function_stats",
    "args_signature": "p_function_name text",
    "definition": "CREATE OR REPLACE FUNCTION public.get_function_stats(p_function_name text DEFAULT NULL::text)\n RETURNS TABLE(function_name text, total_executions bigint, successful bigint, failed bigint, avg_duration_ms numeric, max_duration_ms integer, last_execution timestamp with time zone)\n LANGUAGE sql\n SECURITY DEFINER\nAS $function$\n    SELECT \n        function_name,\n        COUNT(*) as total_executions,\n        SUM(CASE WHEN success THEN 1 ELSE 0 END) as successful,\n        SUM(CASE WHEN success = false THEN 1 ELSE 0 END) as failed,\n        ROUND(AVG(duration_ms), 2) as avg_duration_ms,\n        MAX(duration_ms) as max_duration_ms,\n        MAX(started_at) as last_execution\n    FROM public.function_execution_logs\n    WHERE (p_function_name IS NULL OR function_name = p_function_name)\n    AND execution_status IN ('completed', 'failed')\n    GROUP BY function_name\n    ORDER BY last_execution DESC;\n$function$\n"
  },
  {
    "schema_name": "public",
    "function_name": "get_recent_errors",
    "args_signature": "p_limit integer",
    "definition": "CREATE OR REPLACE FUNCTION public.get_recent_errors(p_limit integer DEFAULT 50)\n RETURNS TABLE(log_time timestamp with time zone, level text, category text, event text, message text, function_name text, error_code text, user_id uuid)\n LANGUAGE sql\n SECURITY DEFINER\nAS $function$\n    SELECT \n        created_at,\n        log_level,\n        category,\n        event_type,\n        message,\n        function_name,\n        error_code,\n        user_id\n    FROM public.system_logs\n    WHERE log_level IN ('ERROR', 'CRITICAL')\n    ORDER BY created_at DESC\n    LIMIT p_limit;\n$function$\n"
  },
  {
    "schema_name": "public",
    "function_name": "get_research_id",
    "args_signature": "p_user_id uuid",
    "definition": "CREATE OR REPLACE FUNCTION public.get_research_id(p_user_id uuid)\n RETURNS uuid\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'linkage', 'public'\nAS $function$\nDECLARE\n    v_research_id UUID;\nBEGIN\n    -- Get research ID from secure linkage table\n    SELECT research_id INTO v_research_id\n    FROM linkage.research_id_map\n    WHERE user_id = p_user_id;\n    \n    -- If not exists, create one\n    IF v_research_id IS NULL THEN\n        INSERT INTO linkage.research_id_map (user_id, research_id)\n        VALUES (p_user_id, gen_random_uuid())\n        RETURNING research_id INTO v_research_id;\n    END IF;\n    \n    -- Update access tracking\n    UPDATE linkage.research_id_map\n    SET \n        last_accessed = NOW(),\n        access_count = access_count + 1\n    WHERE user_id = p_user_id;\n    \n    RETURN v_research_id;\nEND;\n$function$\n"
  },
  {
    "schema_name": "public",
    "function_name": "get_user_type",
    "args_signature": "p_user_id uuid",
    "definition": "CREATE OR REPLACE FUNCTION public.get_user_type(p_user_id uuid)\n RETURNS text\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'public'\nAS $function$\nDECLARE\n    v_user_type TEXT;\nBEGIN\n    SELECT user_type INTO v_user_type\n    FROM public.profiles\n    WHERE id = p_user_id;\n    \n    RETURN v_user_type;\nEND;\n$function$\n"
  },
  {
    "schema_name": "public",
    "function_name": "handle_new_user",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION public.handle_new_user()\n RETURNS trigger\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'public'\nAS $function$\nBEGIN\n  -- Insert skeleton profile; user_type intentionally NULL until onboarding\n  INSERT INTO public.profiles (id, email, user_type, onboarding_completed, created_at, updated_at)\n  VALUES (NEW.id, NEW.email, NULL, FALSE, NOW(), NOW())\n  ON CONFLICT (id) DO NOTHING;\n\n  RETURN NEW;\nEND;\n$function$\n"
  },
  {
    "schema_name": "public",
    "function_name": "initialize_new_user",
    "args_signature": "p_user_id uuid, p_email text, p_user_type text",
    "definition": "CREATE OR REPLACE FUNCTION public.initialize_new_user(p_user_id uuid, p_email text, p_user_type text DEFAULT 'patient'::text)\n RETURNS jsonb\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'pg_catalog', 'public', 'private_health_info'\nAS $function$\nDECLARE\n    v_user_type user_type_enum;\n    v_user_exists BOOLEAN;\n    v_profile_exists BOOLEAN;\n    v_execution_id UUID;\n    v_step TEXT;\nBEGIN\n    v_execution_id := public.start_function_execution('initialize_new_user', p_user_id, p_user_type, 'api');\n    PERFORM public.log_system_event('INFO', 'auth', 'user_initialization_started', 'Starting user initialization', p_user_id, 'initialize_new_user', NULL, jsonb_build_object('user_type', p_user_type));\n    \n    -- Step 1: Validate user_type\n    v_step := 'validate_user_type';\n    BEGIN\n        v_user_type := p_user_type::user_type_enum;\n        PERFORM public.log_system_event('DEBUG', 'auth', 'user_type_validated', 'User type validated successfully', p_user_id, 'initialize_new_user', NULL, jsonb_build_object('user_type', p_user_type, 'step', v_step));\n    EXCEPTION\n        WHEN OTHERS THEN\n            PERFORM public.log_system_event('ERROR', 'auth', 'validation_failed', 'Invalid user_type: ' || p_user_type, p_user_id, 'initialize_new_user', SQLSTATE, jsonb_build_object('user_type', p_user_type, 'step', v_step, 'error', SQLERRM));\n            PERFORM public.complete_function_execution(v_execution_id, false, jsonb_build_object('success', false, 'message', 'Invalid user_type: ' || p_user_type));\n            RETURN jsonb_build_object('success', false, 'message', 'Invalid user_type: ' || p_user_type);\n    END;\n\n    -- Step 2: Check if user exists in auth.users\n    v_step := 'check_auth_user';\n    SELECT EXISTS (SELECT 1 FROM auth.users WHERE id = p_user_id) INTO v_user_exists;\n    \n    IF NOT v_user_exists THEN\n        PERFORM public.log_system_event('ERROR', 'auth', 'user_not_found', 'User does not exist in auth.users', p_user_id, 'initialize_new_user', 'USER_NOT_FOUND', jsonb_build_object('step', v_step));\n        PERFORM public.complete_function_execution(v_execution_id, false, jsonb_build_object('success', false, 'message', 'User does not exist in auth.users'));\n        RETURN jsonb_build_object('success', false, 'message', 'User does not exist in auth.users');\n    END IF;\n\n    -- Step 3: Check if profile already exists\n    v_step := 'check_existing_profile';\n    SELECT EXISTS (SELECT 1 FROM public.profiles WHERE id = p_user_id) INTO v_profile_exists;\n    \n    IF v_profile_exists THEN\n        PERFORM public.log_system_event('WARNING', 'auth', 'profile_already_exists', 'Profile already exists, skipping initialization', p_user_id, 'initialize_new_user', 'PROFILE_EXISTS', jsonb_build_object('step', v_step));\n        PERFORM public.complete_function_execution(v_execution_id, true, jsonb_build_object('success', true, 'message', 'Profile already exists'));\n        RETURN jsonb_build_object('success', true, 'message', 'Profile already exists');\n    END IF;\n\n    -- Step 4: Create profile\n    v_step := 'create_profile';\n    BEGIN\n        INSERT INTO public.profiles (id, user_type, email, onboarding_completed)\n        VALUES (p_user_id, v_user_type, p_email, false);\n        PERFORM public.log_system_event('INFO', 'auth', 'profile_created', 'Profile created successfully', p_user_id, 'initialize_new_user', NULL, jsonb_build_object('step', v_step, 'user_type', p_user_type));\n    EXCEPTION\n        WHEN OTHERS THEN\n            PERFORM public.log_system_event('ERROR', 'auth', 'profile_creation_failed', 'Failed to create profile', p_user_id, 'initialize_new_user', SQLSTATE, jsonb_build_object('step', v_step, 'error', SQLERRM, 'detail', SQLSTATE));\n            PERFORM public.complete_function_execution(v_execution_id, false, jsonb_build_object('success', false, 'message', 'Profile creation failed: ' || SQLERRM));\n            RETURN jsonb_build_object('success', false, 'message', 'Profile creation failed: ' || SQLERRM);\n    END;\n\n    -- Step 5: Initialize user points (FIX: use 'points' not 'total_points')\n    v_step := 'initialize_points';\n    BEGIN\n        INSERT INTO public.user_points (user_id, points, level)\n        VALUES (p_user_id, 0, 1);\n        PERFORM public.log_system_event('DEBUG', 'gamification', 'points_initialized', 'User points initialized', p_user_id, 'initialize_new_user', NULL, jsonb_build_object('step', v_step));\n    EXCEPTION\n        WHEN OTHERS THEN\n            PERFORM public.log_system_event('WARNING', 'gamification', 'points_init_failed', 'Failed to initialize points (non-critical)', p_user_id, 'initialize_new_user', SQLSTATE, jsonb_build_object('step', v_step, 'error', SQLERRM));\n    END;\n\n    -- Step 6: Create type-specific profile\n    v_step := 'create_type_specific_profile';\n    BEGIN\n        CASE v_user_type\n            WHEN 'patient' THEN\n                INSERT INTO public.patient_profiles (user_id) VALUES (p_user_id);\n                INSERT INTO private_health_info.patient_phi (user_id) VALUES (p_user_id);\n            WHEN 'clinician' THEN\n                INSERT INTO public.clinician_profiles (user_id) VALUES (p_user_id);\n                INSERT INTO private_health_info.clinician_phi (user_id) VALUES (p_user_id);\n            WHEN 'carer' THEN\n                INSERT INTO public.carer_profiles (user_id) VALUES (p_user_id);\n            WHEN 'researcher' THEN\n                INSERT INTO public.researcher_profiles (user_id) VALUES (p_user_id);\n        END CASE;\n        PERFORM public.log_system_event('INFO', 'auth', 'type_profile_created', 'Type-specific profile created', p_user_id, 'initialize_new_user', NULL, jsonb_build_object('step', v_step, 'user_type', p_user_type));\n    EXCEPTION\n        WHEN OTHERS THEN\n            PERFORM public.log_system_event('ERROR', 'auth', 'type_profile_failed', 'Failed to create type-specific profile', p_user_id, 'initialize_new_user', SQLSTATE, jsonb_build_object('step', v_step, 'user_type', p_user_type, 'error', SQLERRM));\n            PERFORM public.complete_function_execution(v_execution_id, false, jsonb_build_object('success', false, 'message', 'Type-specific profile failed: ' || SQLERRM));\n            RETURN jsonb_build_object('success', false, 'message', 'Type-specific profile creation failed: ' || SQLERRM);\n    END;\n\n    -- Step 7: Create data sharing preferences (FIX: use 'patient_id' not 'user_id')\n    v_step := 'create_sharing_preferences';\n    BEGIN\n        IF v_user_type = 'patient' THEN\n            INSERT INTO public.data_sharing_preferences (patient_id) VALUES (p_user_id);\n        END IF;\n        PERFORM public.log_system_event('DEBUG', 'privacy', 'sharing_prefs_created', 'Data sharing preferences created', p_user_id, 'initialize_new_user', NULL, jsonb_build_object('step', v_step));\n    EXCEPTION\n        WHEN OTHERS THEN\n            PERFORM public.log_system_event('WARNING', 'privacy', 'sharing_prefs_failed', 'Failed to create sharing preferences (non-critical)', p_user_id, 'initialize_new_user', SQLSTATE, jsonb_build_object('step', v_step, 'error', SQLERRM));\n    END;\n\n    -- Success!\n    PERFORM public.log_system_event('INFO', 'auth', 'user_initialization_completed', 'User initialization completed successfully', p_user_id, 'initialize_new_user', NULL, jsonb_build_object('user_type', p_user_type));\n    PERFORM public.complete_function_execution(v_execution_id, true, jsonb_build_object('success', true, 'message', 'User initialized successfully', 'user_type', v_user_type));\n    RETURN jsonb_build_object('success', true, 'message', 'User initialized successfully', 'user_type', v_user_type);\n\nEXCEPTION\n    WHEN OTHERS THEN\n        PERFORM public.log_system_event('CRITICAL', 'auth', 'initialization_catastrophic_failure', 'Unexpected error during user initialization', p_user_id, 'initialize_new_user', SQLSTATE, jsonb_build_object('step', v_step, 'error', SQLERRM, 'detail', SQLSTATE));\n        PERFORM public.complete_function_execution(v_execution_id, false, jsonb_build_object('success', false, 'message', 'Error: ' || SQLERRM, 'detail', SQLSTATE));\n        RETURN jsonb_build_object('success', false, 'message', 'Error: ' || SQLERRM, 'detail', SQLSTATE);\nEND;\n$function$\n"
  },
  {
    "schema_name": "public",
    "function_name": "initialize_new_user_jsonb",
    "args_signature": "p_user_id uuid, p_email text, p_user_type text",
    "definition": "CREATE OR REPLACE FUNCTION public.initialize_new_user_jsonb(p_user_id uuid, p_email text, p_user_type text)\n RETURNS jsonb\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'pg_catalog', 'public', 'private_health_info'\nAS $function$\nBEGIN\n  -- Optional: call legacy function if it exists and is needed\n  -- PERFORM public.initialize_new_user(p_user_id, p_email, p_user_type);\n\n  -- Create/ensure profile\n  INSERT INTO public.profiles (\n    id,\n    user_type,\n    onboarding_completed,\n    created_at,\n    updated_at\n  ) VALUES (\n    p_user_id,\n    p_user_type::user_type_enum,\n    false,\n    NOW(),\n    NOW()\n  )\n  ON CONFLICT (id) DO UPDATE\n    SET user_type = EXCLUDED.user_type,\n        updated_at = NOW();\n\n  -- Patient-specific\n  IF p_user_type = 'patient' THEN\n    INSERT INTO public.patient_profiles (user_id, created_at, updated_at)\n    VALUES (p_user_id, NOW(), NOW())\n    ON CONFLICT (user_id) DO NOTHING;\n\n    INSERT INTO private_health_info.patient_phi (user_id, created_at, updated_at)\n    VALUES (p_user_id, NOW(), NOW())\n    ON CONFLICT (user_id) DO NOTHING;\n  END IF;\n\n  -- Carer-specific\n  IF p_user_type = 'carer' THEN\n    INSERT INTO public.carer_profiles (user_id, created_at, updated_at)\n    VALUES (p_user_id, NOW(), NOW())\n    ON CONFLICT (user_id) DO NOTHING;\n  END IF;\n\n  RETURN jsonb_build_object('success', true, 'message', 'User initialized successfully');\n\nEXCEPTION\n  WHEN OTHERS THEN\n    RETURN jsonb_build_object('success', false, 'message', 'Initialization failed: ' || SQLERRM);\nEND;\n$function$\n"
  },
  {
    "schema_name": "public",
    "function_name": "is_admin",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION public.is_admin()\n RETURNS boolean\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'public'\nAS $function$\nBEGIN\n    RETURN EXISTS (\n        SELECT 1\n        FROM public.profiles\n        WHERE id = auth.uid()\n          AND user_type = 'admin'\n    );\nEND;\n$function$\n"
  },
  {
    "schema_name": "public",
    "function_name": "is_approved_researcher",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION public.is_approved_researcher()\n RETURNS boolean\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'public'\nAS $function$\nBEGIN\n    RETURN EXISTS (\n        SELECT 1\n        FROM public.researcher_profiles\n        WHERE user_id = auth.uid()\n          AND access_level IN ('advanced', 'admin')\n    );\nEND;\n$function$\n"
  },
  {
    "schema_name": "public",
    "function_name": "is_carer_related_to_patient",
    "args_signature": "p_carer_id uuid, p_patient_id uuid",
    "definition": "CREATE OR REPLACE FUNCTION public.is_carer_related_to_patient(p_carer_id uuid, p_patient_id uuid)\n RETURNS boolean\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'public'\nAS $function$\nBEGIN\n    RETURN EXISTS (\n        SELECT 1\n        FROM public.carer_relationships\n        WHERE carer_user_id = p_carer_id\n          AND patient_user_id = p_patient_id\n          AND status = 'active'\n    );\nEND;\n$function$\n"
  },
  {
    "schema_name": "public",
    "function_name": "is_clinician_connected_to_patient",
    "args_signature": "p_clinician_id uuid, p_patient_id uuid",
    "definition": "CREATE OR REPLACE FUNCTION public.is_clinician_connected_to_patient(p_clinician_id uuid, p_patient_id uuid)\n RETURNS boolean\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'public'\nAS $function$\nBEGIN\n    RETURN EXISTS (\n        SELECT 1\n        FROM public.patient_clinician_connections\n        WHERE clinician_id = p_clinician_id\n          AND patient_id = p_patient_id\n          AND status = 'active'\n    );\nEND;\n$function$\n"
  },
  {
    "schema_name": "public",
    "function_name": "is_in_quiet_hours",
    "args_signature": "p_user_id uuid",
    "definition": "CREATE OR REPLACE FUNCTION public.is_in_quiet_hours(p_user_id uuid)\n RETURNS boolean\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'public'\nAS $function$\nDECLARE\n    v_prefs RECORD;\n    v_current_time TIME;\nBEGIN\n    -- Get user preferences\n    SELECT quiet_hours_enabled, quiet_hours_start, quiet_hours_end\n    INTO v_prefs\n    FROM public.notification_preferences\n    WHERE user_id = p_user_id;\n    \n    -- If quiet hours not enabled, return false\n    IF NOT FOUND OR NOT v_prefs.quiet_hours_enabled THEN\n        RETURN false;\n    END IF;\n    \n    v_current_time := CURRENT_TIME;\n    \n    -- Handle overnight quiet hours (e.g., 22:00 to 08:00)\n    IF v_prefs.quiet_hours_start > v_prefs.quiet_hours_end THEN\n        RETURN v_current_time >= v_prefs.quiet_hours_start OR v_current_time < v_prefs.quiet_hours_end;\n    ELSE\n        RETURN v_current_time >= v_prefs.quiet_hours_start AND v_current_time < v_prefs.quiet_hours_end;\n    END IF;\nEND;\n$function$\n"
  },
  {
    "schema_name": "public",
    "function_name": "log_system_event",
    "args_signature": "p_level text, p_category text, p_event_type text, p_message text, p_user_id uuid, p_function_name text, p_error_code text, p_context jsonb",
    "definition": "CREATE OR REPLACE FUNCTION public.log_system_event(p_level text, p_category text, p_event_type text, p_message text, p_user_id uuid DEFAULT NULL::uuid, p_function_name text DEFAULT NULL::text, p_error_code text DEFAULT NULL::text, p_context jsonb DEFAULT '{}'::jsonb)\n RETURNS uuid\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'pg_catalog', 'public'\nAS $function$\nDECLARE\n    v_log_id UUID;\nBEGIN\n    -- CRITICAL: Validate that context contains NO PHI\n    -- Remove any potentially sensitive keys\n    p_context := p_context - ARRAY['email', 'phone', 'name', 'first_name', 'last_name', 'ssn', 'dob', 'address', 'password'];\n    \n    INSERT INTO public.system_logs (\n        log_level,\n        category,\n        event_type,\n        message,\n        user_id,\n        function_name,\n        error_code,\n        context_data,\n        session_id\n    ) VALUES (\n        UPPER(p_level),\n        p_category,\n        p_event_type,\n        p_message,\n        p_user_id,\n        p_function_name,\n        p_error_code,\n        p_context,\n        current_setting('application_name', true)\n    )\n    RETURNING id INTO v_log_id;\n    \n    RETURN v_log_id;\nEXCEPTION\n    WHEN OTHERS THEN\n        -- Even logging failed! Raise warning but don't crash\n        RAISE WARNING 'Failed to write to system_logs: %', SQLERRM;\n        RETURN NULL;\nEND;\n$function$\n"
  },
  {
    "schema_name": "public",
    "function_name": "mark_notification_read",
    "args_signature": "p_notification_id uuid",
    "definition": "CREATE OR REPLACE FUNCTION public.mark_notification_read(p_notification_id uuid)\n RETURNS void\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'public'\nAS $function$\nBEGIN\n    UPDATE public.notification_queue\n    SET status = 'sent',\n        sent_at = NOW()\n    WHERE id = p_notification_id\n    AND user_id = auth.uid(); -- Security: only own notifications\n    \n    -- Log to history\n    INSERT INTO public.notification_history (\n        user_id,\n        notification_type,\n        sent_at,\n        opened_at\n    )\n    SELECT \n        user_id,\n        notification_type,\n        NOW(),\n        NOW()\n    FROM public.notification_queue\n    WHERE id = p_notification_id;\nEND;\n$function$\n"
  },
  {
    "schema_name": "public",
    "function_name": "schedule_daily_checkin_reminders",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION public.schedule_daily_checkin_reminders()\n RETURNS integer\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'public'\nAS $function$\nDECLARE\n    v_user RECORD;\n    v_scheduled_time TIMESTAMPTZ;\n    v_count INTEGER := 0;\nBEGIN\n    -- Loop through users with daily check-in enabled\n    FOR v_user IN \n        SELECT user_id, daily_checkin_time\n        FROM public.notification_preferences\n        WHERE daily_checkin_reminder = true\n        AND push_enabled = true\n    LOOP\n        -- Calculate next check-in time\n        v_scheduled_time := (CURRENT_DATE + v_user.daily_checkin_time)::TIMESTAMPTZ;\n        \n        -- If time has passed today, schedule for tomorrow\n        IF v_scheduled_time < NOW() THEN\n            v_scheduled_time := v_scheduled_time + INTERVAL '1 day';\n        END IF;\n        \n        -- Schedule notification (NO PHI!)\n        PERFORM public.schedule_notification(\n            v_user.user_id,\n            'daily_checkin',\n            'Daily Health Check-In',\n            'How are you feeling today? Log your mood, energy, and symptoms.',\n            '/dashboard?action=daily-tracking',\n            NULL,\n            v_scheduled_time,\n            'normal'\n        );\n        \n        v_count := v_count + 1;\n    END LOOP;\n    \n    RETURN v_count;\nEND;\n$function$\n"
  },
  {
    "schema_name": "public",
    "function_name": "schedule_notification",
    "args_signature": "p_user_id uuid, p_type text, p_title text, p_body text, p_action_url text, p_reference_id uuid, p_scheduled_for timestamp with time zone, p_priority text",
    "definition": "CREATE OR REPLACE FUNCTION public.schedule_notification(p_user_id uuid, p_type text, p_title text, p_body text, p_action_url text DEFAULT NULL::text, p_reference_id uuid DEFAULT NULL::uuid, p_scheduled_for timestamp with time zone DEFAULT now(), p_priority text DEFAULT 'normal'::text)\n RETURNS uuid\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'public'\nAS $function$\nDECLARE\n    v_notification_id UUID;\n    v_prefs RECORD;\nBEGIN\n    -- Get user preferences\n    SELECT * INTO v_prefs\n    FROM public.notification_preferences\n    WHERE user_id = p_user_id;\n    \n    -- Check if notifications enabled\n    IF NOT FOUND OR NOT v_prefs.push_enabled THEN\n        RETURN NULL; -- User has disabled notifications\n    END IF;\n    \n    -- Check type-specific preferences\n    IF p_type = 'medication_reminder' AND NOT v_prefs.medication_reminders THEN\n        RETURN NULL;\n    ELSIF p_type = 'daily_checkin' AND NOT v_prefs.daily_checkin_reminder THEN\n        RETURN NULL;\n    ELSIF p_type = 'message' AND NOT v_prefs.message_notifications THEN\n        RETURN NULL;\n    END IF;\n    \n    -- Don't schedule during quiet hours (unless critical)\n    IF p_priority != 'critical' AND public.is_in_quiet_hours(p_user_id) THEN\n        -- Reschedule for end of quiet hours\n        SELECT quiet_hours_end INTO p_scheduled_for\n        FROM public.notification_preferences\n        WHERE user_id = p_user_id;\n    END IF;\n    \n    -- Insert notification\n    INSERT INTO public.notification_queue (\n        user_id,\n        notification_type,\n        title,\n        body,\n        action_url,\n        reference_id,\n        scheduled_for,\n        priority\n    ) VALUES (\n        p_user_id,\n        p_type,\n        p_title,\n        p_body,\n        p_action_url,\n        p_reference_id,\n        p_scheduled_for,\n        p_priority\n    )\n    RETURNING id INTO v_notification_id;\n    \n    RETURN v_notification_id;\nEND;\n$function$\n"
  },
  {
    "schema_name": "public",
    "function_name": "start_function_execution",
    "args_signature": "p_function_name text, p_user_id uuid, p_user_type text, p_triggered_by text",
    "definition": "CREATE OR REPLACE FUNCTION public.start_function_execution(p_function_name text, p_user_id uuid DEFAULT NULL::uuid, p_user_type text DEFAULT NULL::text, p_triggered_by text DEFAULT 'api'::text)\n RETURNS uuid\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'pg_catalog', 'public'\nAS $function$\nDECLARE\n    v_execution_id UUID;\nBEGIN\n    INSERT INTO public.function_execution_logs (\n        function_name,\n        execution_status,\n        started_at,\n        input_user_id,\n        input_user_type,\n        triggered_by,\n        session_id\n    ) VALUES (\n        p_function_name,\n        'started',\n        NOW(),\n        p_user_id,\n        p_user_type,\n        p_triggered_by,\n        current_setting('application_name', true)\n    )\n    RETURNING id INTO v_execution_id;\n    \n    RETURN v_execution_id;\nEND;\n$function$\n"
  },
  {
    "schema_name": "realtime",
    "function_name": "apply_rls",
    "args_signature": "wal jsonb, max_record_bytes integer",
    "definition": "CREATE OR REPLACE FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer DEFAULT (1024 * 1024))\n RETURNS SETOF realtime.wal_rls\n LANGUAGE plpgsql\nAS $function$\ndeclare\n-- Regclass of the table e.g. public.notes\nentity_ regclass = (quote_ident(wal ->> 'schema') || '.' || quote_ident(wal ->> 'table'))::regclass;\n\n-- I, U, D, T: insert, update ...\naction realtime.action = (\n    case wal ->> 'action'\n        when 'I' then 'INSERT'\n        when 'U' then 'UPDATE'\n        when 'D' then 'DELETE'\n        else 'ERROR'\n    end\n);\n\n-- Is row level security enabled for the table\nis_rls_enabled bool = relrowsecurity from pg_class where oid = entity_;\n\nsubscriptions realtime.subscription[] = array_agg(subs)\n    from\n        realtime.subscription subs\n    where\n        subs.entity = entity_;\n\n-- Subscription vars\nroles regrole[] = array_agg(distinct us.claims_role::text)\n    from\n        unnest(subscriptions) us;\n\nworking_role regrole;\nclaimed_role regrole;\nclaims jsonb;\n\nsubscription_id uuid;\nsubscription_has_access bool;\nvisible_to_subscription_ids uuid[] = '{}';\n\n-- structured info for wal's columns\ncolumns realtime.wal_column[];\n-- previous identity values for update/delete\nold_columns realtime.wal_column[];\n\nerror_record_exceeds_max_size boolean = octet_length(wal::text) > max_record_bytes;\n\n-- Primary jsonb output for record\noutput jsonb;\n\nbegin\nperform set_config('role', null, true);\n\ncolumns =\n    array_agg(\n        (\n            x->>'name',\n            x->>'type',\n            x->>'typeoid',\n            realtime.cast(\n                (x->'value') #>> '{}',\n                coalesce(\n                    (x->>'typeoid')::regtype, -- null when wal2json version <= 2.4\n                    (x->>'type')::regtype\n                )\n            ),\n            (pks ->> 'name') is not null,\n            true\n        )::realtime.wal_column\n    )\n    from\n        jsonb_array_elements(wal -> 'columns') x\n        left join jsonb_array_elements(wal -> 'pk') pks\n            on (x ->> 'name') = (pks ->> 'name');\n\nold_columns =\n    array_agg(\n        (\n            x->>'name',\n            x->>'type',\n            x->>'typeoid',\n            realtime.cast(\n                (x->'value') #>> '{}',\n                coalesce(\n                    (x->>'typeoid')::regtype, -- null when wal2json version <= 2.4\n                    (x->>'type')::regtype\n                )\n            ),\n            (pks ->> 'name') is not null,\n            true\n        )::realtime.wal_column\n    )\n    from\n        jsonb_array_elements(wal -> 'identity') x\n        left join jsonb_array_elements(wal -> 'pk') pks\n            on (x ->> 'name') = (pks ->> 'name');\n\nfor working_role in select * from unnest(roles) loop\n\n    -- Update `is_selectable` for columns and old_columns\n    columns =\n        array_agg(\n            (\n                c.name,\n                c.type_name,\n                c.type_oid,\n                c.value,\n                c.is_pkey,\n                pg_catalog.has_column_privilege(working_role, entity_, c.name, 'SELECT')\n            )::realtime.wal_column\n        )\n        from\n            unnest(columns) c;\n\n    old_columns =\n            array_agg(\n                (\n                    c.name,\n                    c.type_name,\n                    c.type_oid,\n                    c.value,\n                    c.is_pkey,\n                    pg_catalog.has_column_privilege(working_role, entity_, c.name, 'SELECT')\n                )::realtime.wal_column\n            )\n            from\n                unnest(old_columns) c;\n\n    if action <> 'DELETE' and count(1) = 0 from unnest(columns) c where c.is_pkey then\n        return next (\n            jsonb_build_object(\n                'schema', wal ->> 'schema',\n                'table', wal ->> 'table',\n                'type', action\n            ),\n            is_rls_enabled,\n            -- subscriptions is already filtered by entity\n            (select array_agg(s.subscription_id) from unnest(subscriptions) as s where claims_role = working_role),\n            array['Error 400: Bad Request, no primary key']\n        )::realtime.wal_rls;\n\n    -- The claims role does not have SELECT permission to the primary key of entity\n    elsif action <> 'DELETE' and sum(c.is_selectable::int) <> count(1) from unnest(columns) c where c.is_pkey then\n        return next (\n            jsonb_build_object(\n                'schema', wal ->> 'schema',\n                'table', wal ->> 'table',\n                'type', action\n            ),\n            is_rls_enabled,\n            (select array_agg(s.subscription_id) from unnest(subscriptions) as s where claims_role = working_role),\n            array['Error 401: Unauthorized']\n        )::realtime.wal_rls;\n\n    else\n        output = jsonb_build_object(\n            'schema', wal ->> 'schema',\n            'table', wal ->> 'table',\n            'type', action,\n            'commit_timestamp', to_char(\n                ((wal ->> 'timestamp')::timestamptz at time zone 'utc'),\n                'YYYY-MM-DD\"T\"HH24:MI:SS.MS\"Z\"'\n            ),\n            'columns', (\n                select\n                    jsonb_agg(\n                        jsonb_build_object(\n                            'name', pa.attname,\n                            'type', pt.typname\n                        )\n                        order by pa.attnum asc\n                    )\n                from\n                    pg_attribute pa\n                    join pg_type pt\n                        on pa.atttypid = pt.oid\n                where\n                    attrelid = entity_\n                    and attnum > 0\n                    and pg_catalog.has_column_privilege(working_role, entity_, pa.attname, 'SELECT')\n            )\n        )\n        -- Add \"record\" key for insert and update\n        || case\n            when action in ('INSERT', 'UPDATE') then\n                jsonb_build_object(\n                    'record',\n                    (\n                        select\n                            jsonb_object_agg(\n                                -- if unchanged toast, get column name and value from old record\n                                coalesce((c).name, (oc).name),\n                                case\n                                    when (c).name is null then (oc).value\n                                    else (c).value\n                                end\n                            )\n                        from\n                            unnest(columns) c\n                            full outer join unnest(old_columns) oc\n                                on (c).name = (oc).name\n                        where\n                            coalesce((c).is_selectable, (oc).is_selectable)\n                            and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))\n                    )\n                )\n            else '{}'::jsonb\n        end\n        -- Add \"old_record\" key for update and delete\n        || case\n            when action = 'UPDATE' then\n                jsonb_build_object(\n                        'old_record',\n                        (\n                            select jsonb_object_agg((c).name, (c).value)\n                            from unnest(old_columns) c\n                            where\n                                (c).is_selectable\n                                and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))\n                        )\n                    )\n            when action = 'DELETE' then\n                jsonb_build_object(\n                    'old_record',\n                    (\n                        select jsonb_object_agg((c).name, (c).value)\n                        from unnest(old_columns) c\n                        where\n                            (c).is_selectable\n                            and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))\n                            and ( not is_rls_enabled or (c).is_pkey ) -- if RLS enabled, we can't secure deletes so filter to pkey\n                    )\n                )\n            else '{}'::jsonb\n        end;\n\n        -- Create the prepared statement\n        if is_rls_enabled and action <> 'DELETE' then\n            if (select 1 from pg_prepared_statements where name = 'walrus_rls_stmt' limit 1) > 0 then\n                deallocate walrus_rls_stmt;\n            end if;\n            execute realtime.build_prepared_statement_sql('walrus_rls_stmt', entity_, columns);\n        end if;\n\n        visible_to_subscription_ids = '{}';\n\n        for subscription_id, claims in (\n                select\n                    subs.subscription_id,\n                    subs.claims\n                from\n                    unnest(subscriptions) subs\n                where\n                    subs.entity = entity_\n                    and subs.claims_role = working_role\n                    and (\n                        realtime.is_visible_through_filters(columns, subs.filters)\n                        or (\n                          action = 'DELETE'\n                          and realtime.is_visible_through_filters(old_columns, subs.filters)\n                        )\n                    )\n        ) loop\n\n            if not is_rls_enabled or action = 'DELETE' then\n                visible_to_subscription_ids = visible_to_subscription_ids || subscription_id;\n            else\n                -- Check if RLS allows the role to see the record\n                perform\n                    -- Trim leading and trailing quotes from working_role because set_config\n                    -- doesn't recognize the role as valid if they are included\n                    set_config('role', trim(both '\"' from working_role::text), true),\n                    set_config('request.jwt.claims', claims::text, true);\n\n                execute 'execute walrus_rls_stmt' into subscription_has_access;\n\n                if subscription_has_access then\n                    visible_to_subscription_ids = visible_to_subscription_ids || subscription_id;\n                end if;\n            end if;\n        end loop;\n\n        perform set_config('role', null, true);\n\n        return next (\n            output,\n            is_rls_enabled,\n            visible_to_subscription_ids,\n            case\n                when error_record_exceeds_max_size then array['Error 413: Payload Too Large']\n                else '{}'\n            end\n        )::realtime.wal_rls;\n\n    end if;\nend loop;\n\nperform set_config('role', null, true);\nend;\n$function$\n"
  },
  {
    "schema_name": "realtime",
    "function_name": "broadcast_changes",
    "args_signature": "topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text",
    "definition": "CREATE OR REPLACE FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text DEFAULT 'ROW'::text)\n RETURNS void\n LANGUAGE plpgsql\nAS $function$\nDECLARE\n    -- Declare a variable to hold the JSONB representation of the row\n    row_data jsonb := '{}'::jsonb;\nBEGIN\n    IF level = 'STATEMENT' THEN\n        RAISE EXCEPTION 'function can only be triggered for each row, not for each statement';\n    END IF;\n    -- Check the operation type and handle accordingly\n    IF operation = 'INSERT' OR operation = 'UPDATE' OR operation = 'DELETE' THEN\n        row_data := jsonb_build_object('old_record', OLD, 'record', NEW, 'operation', operation, 'table', table_name, 'schema', table_schema);\n        PERFORM realtime.send (row_data, event_name, topic_name);\n    ELSE\n        RAISE EXCEPTION 'Unexpected operation type: %', operation;\n    END IF;\nEXCEPTION\n    WHEN OTHERS THEN\n        RAISE EXCEPTION 'Failed to process the row: %', SQLERRM;\nEND;\n\n$function$\n"
  },
  {
    "schema_name": "realtime",
    "function_name": "build_prepared_statement_sql",
    "args_signature": "prepared_statement_name text, entity regclass, columns realtime.wal_column[]",
    "definition": "CREATE OR REPLACE FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[])\n RETURNS text\n LANGUAGE sql\nAS $function$\n      /*\n      Builds a sql string that, if executed, creates a prepared statement to\n      tests retrive a row from *entity* by its primary key columns.\n      Example\n          select realtime.build_prepared_statement_sql('public.notes', '{\"id\"}'::text[], '{\"bigint\"}'::text[])\n      */\n          select\n      'prepare ' || prepared_statement_name || ' as\n          select\n              exists(\n                  select\n                      1\n                  from\n                      ' || entity || '\n                  where\n                      ' || string_agg(quote_ident(pkc.name) || '=' || quote_nullable(pkc.value #>> '{}') , ' and ') || '\n              )'\n          from\n              unnest(columns) pkc\n          where\n              pkc.is_pkey\n          group by\n              entity\n      $function$\n"
  },
  {
    "schema_name": "realtime",
    "function_name": "cast",
    "args_signature": "val text, type_ regtype",
    "definition": "CREATE OR REPLACE FUNCTION realtime.\"cast\"(val text, type_ regtype)\n RETURNS jsonb\n LANGUAGE plpgsql\n IMMUTABLE\nAS $function$\n    declare\n      res jsonb;\n    begin\n      execute format('select to_jsonb(%L::'|| type_::text || ')', val)  into res;\n      return res;\n    end\n    $function$\n"
  },
  {
    "schema_name": "realtime",
    "function_name": "check_equality_op",
    "args_signature": "op realtime.equality_op, type_ regtype, val_1 text, val_2 text",
    "definition": "CREATE OR REPLACE FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text)\n RETURNS boolean\n LANGUAGE plpgsql\n IMMUTABLE\nAS $function$\n      /*\n      Casts *val_1* and *val_2* as type *type_* and check the *op* condition for truthiness\n      */\n      declare\n          op_symbol text = (\n              case\n                  when op = 'eq' then '='\n                  when op = 'neq' then '!='\n                  when op = 'lt' then '<'\n                  when op = 'lte' then '<='\n                  when op = 'gt' then '>'\n                  when op = 'gte' then '>='\n                  when op = 'in' then '= any'\n                  else 'UNKNOWN OP'\n              end\n          );\n          res boolean;\n      begin\n          execute format(\n              'select %L::'|| type_::text || ' ' || op_symbol\n              || ' ( %L::'\n              || (\n                  case\n                      when op = 'in' then type_::text || '[]'\n                      else type_::text end\n              )\n              || ')', val_1, val_2) into res;\n          return res;\n      end;\n      $function$\n"
  },
  {
    "schema_name": "realtime",
    "function_name": "is_visible_through_filters",
    "args_signature": "columns realtime.wal_column[], filters realtime.user_defined_filter[]",
    "definition": "CREATE OR REPLACE FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[])\n RETURNS boolean\n LANGUAGE sql\n IMMUTABLE\nAS $function$\n    /*\n    Should the record be visible (true) or filtered out (false) after *filters* are applied\n    */\n        select\n            -- Default to allowed when no filters present\n            $2 is null -- no filters. this should not happen because subscriptions has a default\n            or array_length($2, 1) is null -- array length of an empty array is null\n            or bool_and(\n                coalesce(\n                    realtime.check_equality_op(\n                        op:=f.op,\n                        type_:=coalesce(\n                            col.type_oid::regtype, -- null when wal2json version <= 2.4\n                            col.type_name::regtype\n                        ),\n                        -- cast jsonb to text\n                        val_1:=col.value #>> '{}',\n                        val_2:=f.value\n                    ),\n                    false -- if null, filter does not match\n                )\n            )\n        from\n            unnest(filters) f\n            join unnest(columns) col\n                on f.column_name = col.name;\n    $function$\n"
  },
  {
    "schema_name": "realtime",
    "function_name": "list_changes",
    "args_signature": "publication name, slot_name name, max_changes integer, max_record_bytes integer",
    "definition": "CREATE OR REPLACE FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer)\n RETURNS SETOF realtime.wal_rls\n LANGUAGE sql\n SET log_min_messages TO 'fatal'\nAS $function$\n      with pub as (\n        select\n          concat_ws(\n            ',',\n            case when bool_or(pubinsert) then 'insert' else null end,\n            case when bool_or(pubupdate) then 'update' else null end,\n            case when bool_or(pubdelete) then 'delete' else null end\n          ) as w2j_actions,\n          coalesce(\n            string_agg(\n              realtime.quote_wal2json(format('%I.%I', schemaname, tablename)::regclass),\n              ','\n            ) filter (where ppt.tablename is not null and ppt.tablename not like '% %'),\n            ''\n          ) w2j_add_tables\n        from\n          pg_publication pp\n          left join pg_publication_tables ppt\n            on pp.pubname = ppt.pubname\n        where\n          pp.pubname = publication\n        group by\n          pp.pubname\n        limit 1\n      ),\n      w2j as (\n        select\n          x.*, pub.w2j_add_tables\n        from\n          pub,\n          pg_logical_slot_get_changes(\n            slot_name, null, max_changes,\n            'include-pk', 'true',\n            'include-transaction', 'false',\n            'include-timestamp', 'true',\n            'include-type-oids', 'true',\n            'format-version', '2',\n            'actions', pub.w2j_actions,\n            'add-tables', pub.w2j_add_tables\n          ) x\n      )\n      select\n        xyz.wal,\n        xyz.is_rls_enabled,\n        xyz.subscription_ids,\n        xyz.errors\n      from\n        w2j,\n        realtime.apply_rls(\n          wal := w2j.data::jsonb,\n          max_record_bytes := max_record_bytes\n        ) xyz(wal, is_rls_enabled, subscription_ids, errors)\n      where\n        w2j.w2j_add_tables <> ''\n        and xyz.subscription_ids[1] is not null\n    $function$\n"
  },
  {
    "schema_name": "realtime",
    "function_name": "quote_wal2json",
    "args_signature": "entity regclass",
    "definition": "CREATE OR REPLACE FUNCTION realtime.quote_wal2json(entity regclass)\n RETURNS text\n LANGUAGE sql\n IMMUTABLE STRICT\nAS $function$\n      select\n        (\n          select string_agg('' || ch,'')\n          from unnest(string_to_array(nsp.nspname::text, null)) with ordinality x(ch, idx)\n          where\n            not (x.idx = 1 and x.ch = '\"')\n            and not (\n              x.idx = array_length(string_to_array(nsp.nspname::text, null), 1)\n              and x.ch = '\"'\n            )\n        )\n        || '.'\n        || (\n          select string_agg('' || ch,'')\n          from unnest(string_to_array(pc.relname::text, null)) with ordinality x(ch, idx)\n          where\n            not (x.idx = 1 and x.ch = '\"')\n            and not (\n              x.idx = array_length(string_to_array(nsp.nspname::text, null), 1)\n              and x.ch = '\"'\n            )\n          )\n      from\n        pg_class pc\n        join pg_namespace nsp\n          on pc.relnamespace = nsp.oid\n      where\n        pc.oid = entity\n    $function$\n"
  },
  {
    "schema_name": "realtime",
    "function_name": "send",
    "args_signature": "payload jsonb, event text, topic text, private boolean",
    "definition": "CREATE OR REPLACE FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean DEFAULT true)\n RETURNS void\n LANGUAGE plpgsql\nAS $function$\nBEGIN\n  BEGIN\n    -- Set the topic configuration\n    EXECUTE format('SET LOCAL realtime.topic TO %L', topic);\n\n    -- Attempt to insert the message\n    INSERT INTO realtime.messages (payload, event, topic, private, extension)\n    VALUES (payload, event, topic, private, 'broadcast');\n  EXCEPTION\n    WHEN OTHERS THEN\n      -- Capture and notify the error\n      RAISE WARNING 'ErrorSendingBroadcastMessage: %', SQLERRM;\n  END;\nEND;\n$function$\n"
  },
  {
    "schema_name": "realtime",
    "function_name": "subscription_check_filters",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION realtime.subscription_check_filters()\n RETURNS trigger\n LANGUAGE plpgsql\nAS $function$\n    /*\n    Validates that the user defined filters for a subscription:\n    - refer to valid columns that the claimed role may access\n    - values are coercable to the correct column type\n    */\n    declare\n        col_names text[] = coalesce(\n                array_agg(c.column_name order by c.ordinal_position),\n                '{}'::text[]\n            )\n            from\n                information_schema.columns c\n            where\n                format('%I.%I', c.table_schema, c.table_name)::regclass = new.entity\n                and pg_catalog.has_column_privilege(\n                    (new.claims ->> 'role'),\n                    format('%I.%I', c.table_schema, c.table_name)::regclass,\n                    c.column_name,\n                    'SELECT'\n                );\n        filter realtime.user_defined_filter;\n        col_type regtype;\n\n        in_val jsonb;\n    begin\n        for filter in select * from unnest(new.filters) loop\n            -- Filtered column is valid\n            if not filter.column_name = any(col_names) then\n                raise exception 'invalid column for filter %', filter.column_name;\n            end if;\n\n            -- Type is sanitized and safe for string interpolation\n            col_type = (\n                select atttypid::regtype\n                from pg_catalog.pg_attribute\n                where attrelid = new.entity\n                      and attname = filter.column_name\n            );\n            if col_type is null then\n                raise exception 'failed to lookup type for column %', filter.column_name;\n            end if;\n\n            -- Set maximum number of entries for in filter\n            if filter.op = 'in'::realtime.equality_op then\n                in_val = realtime.cast(filter.value, (col_type::text || '[]')::regtype);\n                if coalesce(jsonb_array_length(in_val), 0) > 100 then\n                    raise exception 'too many values for `in` filter. Maximum 100';\n                end if;\n            else\n                -- raises an exception if value is not coercable to type\n                perform realtime.cast(filter.value, col_type);\n            end if;\n\n        end loop;\n\n        -- Apply consistent order to filters so the unique constraint on\n        -- (subscription_id, entity, filters) can't be tricked by a different filter order\n        new.filters = coalesce(\n            array_agg(f order by f.column_name, f.op, f.value),\n            '{}'\n        ) from unnest(new.filters) f;\n\n        return new;\n    end;\n    $function$\n"
  },
  {
    "schema_name": "realtime",
    "function_name": "to_regrole",
    "args_signature": "role_name text",
    "definition": "CREATE OR REPLACE FUNCTION realtime.to_regrole(role_name text)\n RETURNS regrole\n LANGUAGE sql\n IMMUTABLE\nAS $function$ select role_name::regrole $function$\n"
  },
  {
    "schema_name": "realtime",
    "function_name": "topic",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION realtime.topic()\n RETURNS text\n LANGUAGE sql\n STABLE\nAS $function$\nselect nullif(current_setting('realtime.topic', true), '')::text;\n$function$\n"
  },
  {
    "schema_name": "storage",
    "function_name": "add_prefixes",
    "args_signature": "_bucket_id text, _name text",
    "definition": "CREATE OR REPLACE FUNCTION storage.add_prefixes(_bucket_id text, _name text)\n RETURNS void\n LANGUAGE plpgsql\n SECURITY DEFINER\nAS $function$\nDECLARE\n    prefixes text[];\nBEGIN\n    prefixes := \"storage\".\"get_prefixes\"(\"_name\");\n\n    IF array_length(prefixes, 1) > 0 THEN\n        INSERT INTO storage.prefixes (name, bucket_id)\n        SELECT UNNEST(prefixes) as name, \"_bucket_id\" ON CONFLICT DO NOTHING;\n    END IF;\nEND;\n$function$\n"
  },
  {
    "schema_name": "storage",
    "function_name": "can_insert_object",
    "args_signature": "bucketid text, name text, owner uuid, metadata jsonb",
    "definition": "CREATE OR REPLACE FUNCTION storage.can_insert_object(bucketid text, name text, owner uuid, metadata jsonb)\n RETURNS void\n LANGUAGE plpgsql\nAS $function$\nBEGIN\n  INSERT INTO \"storage\".\"objects\" (\"bucket_id\", \"name\", \"owner\", \"metadata\") VALUES (bucketid, name, owner, metadata);\n  -- hack to rollback the successful insert\n  RAISE sqlstate 'PT200' using\n  message = 'ROLLBACK',\n  detail = 'rollback successful insert';\nEND\n$function$\n"
  },
  {
    "schema_name": "storage",
    "function_name": "delete_leaf_prefixes",
    "args_signature": "bucket_ids text[], names text[]",
    "definition": "CREATE OR REPLACE FUNCTION storage.delete_leaf_prefixes(bucket_ids text[], names text[])\n RETURNS void\n LANGUAGE plpgsql\n SECURITY DEFINER\nAS $function$\nDECLARE\n    v_rows_deleted integer;\nBEGIN\n    LOOP\n        WITH candidates AS (\n            SELECT DISTINCT\n                t.bucket_id,\n                unnest(storage.get_prefixes(t.name)) AS name\n            FROM unnest(bucket_ids, names) AS t(bucket_id, name)\n        ),\n        uniq AS (\n             SELECT\n                 bucket_id,\n                 name,\n                 storage.get_level(name) AS level\n             FROM candidates\n             WHERE name <> ''\n             GROUP BY bucket_id, name\n        ),\n        leaf AS (\n             SELECT\n                 p.bucket_id,\n                 p.name,\n                 p.level\n             FROM storage.prefixes AS p\n                  JOIN uniq AS u\n                       ON u.bucket_id = p.bucket_id\n                           AND u.name = p.name\n                           AND u.level = p.level\n             WHERE NOT EXISTS (\n                 SELECT 1\n                 FROM storage.objects AS o\n                 WHERE o.bucket_id = p.bucket_id\n                   AND o.level = p.level + 1\n                   AND o.name COLLATE \"C\" LIKE p.name || '/%'\n             )\n             AND NOT EXISTS (\n                 SELECT 1\n                 FROM storage.prefixes AS c\n                 WHERE c.bucket_id = p.bucket_id\n                   AND c.level = p.level + 1\n                   AND c.name COLLATE \"C\" LIKE p.name || '/%'\n             )\n        )\n        DELETE\n        FROM storage.prefixes AS p\n            USING leaf AS l\n        WHERE p.bucket_id = l.bucket_id\n          AND p.name = l.name\n          AND p.level = l.level;\n\n        GET DIAGNOSTICS v_rows_deleted = ROW_COUNT;\n        EXIT WHEN v_rows_deleted = 0;\n    END LOOP;\nEND;\n$function$\n"
  },
  {
    "schema_name": "storage",
    "function_name": "delete_prefix",
    "args_signature": "_bucket_id text, _name text",
    "definition": "CREATE OR REPLACE FUNCTION storage.delete_prefix(_bucket_id text, _name text)\n RETURNS boolean\n LANGUAGE plpgsql\n SECURITY DEFINER\nAS $function$\nBEGIN\n    -- Check if we can delete the prefix\n    IF EXISTS(\n        SELECT FROM \"storage\".\"prefixes\"\n        WHERE \"prefixes\".\"bucket_id\" = \"_bucket_id\"\n          AND level = \"storage\".\"get_level\"(\"_name\") + 1\n          AND \"prefixes\".\"name\" COLLATE \"C\" LIKE \"_name\" || '/%'\n        LIMIT 1\n    )\n    OR EXISTS(\n        SELECT FROM \"storage\".\"objects\"\n        WHERE \"objects\".\"bucket_id\" = \"_bucket_id\"\n          AND \"storage\".\"get_level\"(\"objects\".\"name\") = \"storage\".\"get_level\"(\"_name\") + 1\n          AND \"objects\".\"name\" COLLATE \"C\" LIKE \"_name\" || '/%'\n        LIMIT 1\n    ) THEN\n    -- There are sub-objects, skip deletion\n    RETURN false;\n    ELSE\n        DELETE FROM \"storage\".\"prefixes\"\n        WHERE \"prefixes\".\"bucket_id\" = \"_bucket_id\"\n          AND level = \"storage\".\"get_level\"(\"_name\")\n          AND \"prefixes\".\"name\" = \"_name\";\n        RETURN true;\n    END IF;\nEND;\n$function$\n"
  },
  {
    "schema_name": "storage",
    "function_name": "delete_prefix_hierarchy_trigger",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION storage.delete_prefix_hierarchy_trigger()\n RETURNS trigger\n LANGUAGE plpgsql\nAS $function$\nDECLARE\n    prefix text;\nBEGIN\n    prefix := \"storage\".\"get_prefix\"(OLD.\"name\");\n\n    IF coalesce(prefix, '') != '' THEN\n        PERFORM \"storage\".\"delete_prefix\"(OLD.\"bucket_id\", prefix);\n    END IF;\n\n    RETURN OLD;\nEND;\n$function$\n"
  },
  {
    "schema_name": "storage",
    "function_name": "enforce_bucket_name_length",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION storage.enforce_bucket_name_length()\n RETURNS trigger\n LANGUAGE plpgsql\nAS $function$\nbegin\n    if length(new.name) > 100 then\n        raise exception 'bucket name \"%\" is too long (% characters). Max is 100.', new.name, length(new.name);\n    end if;\n    return new;\nend;\n$function$\n"
  },
  {
    "schema_name": "storage",
    "function_name": "extension",
    "args_signature": "name text",
    "definition": "CREATE OR REPLACE FUNCTION storage.extension(name text)\n RETURNS text\n LANGUAGE plpgsql\n IMMUTABLE\nAS $function$\nDECLARE\n    _parts text[];\n    _filename text;\nBEGIN\n    SELECT string_to_array(name, '/') INTO _parts;\n    SELECT _parts[array_length(_parts,1)] INTO _filename;\n    RETURN reverse(split_part(reverse(_filename), '.', 1));\nEND\n$function$\n"
  },
  {
    "schema_name": "storage",
    "function_name": "filename",
    "args_signature": "name text",
    "definition": "CREATE OR REPLACE FUNCTION storage.filename(name text)\n RETURNS text\n LANGUAGE plpgsql\nAS $function$\nDECLARE\n_parts text[];\nBEGIN\n\tselect string_to_array(name, '/') into _parts;\n\treturn _parts[array_length(_parts,1)];\nEND\n$function$\n"
  },
  {
    "schema_name": "storage",
    "function_name": "foldername",
    "args_signature": "name text",
    "definition": "CREATE OR REPLACE FUNCTION storage.foldername(name text)\n RETURNS text[]\n LANGUAGE plpgsql\n IMMUTABLE\nAS $function$\nDECLARE\n    _parts text[];\nBEGIN\n    -- Split on \"/\" to get path segments\n    SELECT string_to_array(name, '/') INTO _parts;\n    -- Return everything except the last segment\n    RETURN _parts[1 : array_length(_parts,1) - 1];\nEND\n$function$\n"
  },
  {
    "schema_name": "storage",
    "function_name": "get_level",
    "args_signature": "name text",
    "definition": "CREATE OR REPLACE FUNCTION storage.get_level(name text)\n RETURNS integer\n LANGUAGE sql\n IMMUTABLE STRICT\nAS $function$\nSELECT array_length(string_to_array(\"name\", '/'), 1);\n$function$\n"
  },
  {
    "schema_name": "storage",
    "function_name": "get_prefix",
    "args_signature": "name text",
    "definition": "CREATE OR REPLACE FUNCTION storage.get_prefix(name text)\n RETURNS text\n LANGUAGE sql\n IMMUTABLE STRICT\nAS $function$\nSELECT\n    CASE WHEN strpos(\"name\", '/') > 0 THEN\n             regexp_replace(\"name\", '[\\/]{1}[^\\/]+\\/?$', '')\n         ELSE\n             ''\n        END;\n$function$\n"
  },
  {
    "schema_name": "storage",
    "function_name": "get_prefixes",
    "args_signature": "name text",
    "definition": "CREATE OR REPLACE FUNCTION storage.get_prefixes(name text)\n RETURNS text[]\n LANGUAGE plpgsql\n IMMUTABLE STRICT\nAS $function$\nDECLARE\n    parts text[];\n    prefixes text[];\n    prefix text;\nBEGIN\n    -- Split the name into parts by '/'\n    parts := string_to_array(\"name\", '/');\n    prefixes := '{}';\n\n    -- Construct the prefixes, stopping one level below the last part\n    FOR i IN 1..array_length(parts, 1) - 1 LOOP\n            prefix := array_to_string(parts[1:i], '/');\n            prefixes := array_append(prefixes, prefix);\n    END LOOP;\n\n    RETURN prefixes;\nEND;\n$function$\n"
  },
  {
    "schema_name": "storage",
    "function_name": "get_size_by_bucket",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION storage.get_size_by_bucket()\n RETURNS TABLE(size bigint, bucket_id text)\n LANGUAGE plpgsql\n STABLE\nAS $function$\nBEGIN\n    return query\n        select sum((metadata->>'size')::bigint) as size, obj.bucket_id\n        from \"storage\".objects as obj\n        group by obj.bucket_id;\nEND\n$function$\n"
  },
  {
    "schema_name": "storage",
    "function_name": "list_multipart_uploads_with_delimiter",
    "args_signature": "bucket_id text, prefix_param text, delimiter_param text, max_keys integer, next_key_token text, next_upload_token text",
    "definition": "CREATE OR REPLACE FUNCTION storage.list_multipart_uploads_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer DEFAULT 100, next_key_token text DEFAULT ''::text, next_upload_token text DEFAULT ''::text)\n RETURNS TABLE(key text, id text, created_at timestamp with time zone)\n LANGUAGE plpgsql\nAS $function$\nBEGIN\n    RETURN QUERY EXECUTE\n        'SELECT DISTINCT ON(key COLLATE \"C\") * from (\n            SELECT\n                CASE\n                    WHEN position($2 IN substring(key from length($1) + 1)) > 0 THEN\n                        substring(key from 1 for length($1) + position($2 IN substring(key from length($1) + 1)))\n                    ELSE\n                        key\n                END AS key, id, created_at\n            FROM\n                storage.s3_multipart_uploads\n            WHERE\n                bucket_id = $5 AND\n                key ILIKE $1 || ''%'' AND\n                CASE\n                    WHEN $4 != '''' AND $6 = '''' THEN\n                        CASE\n                            WHEN position($2 IN substring(key from length($1) + 1)) > 0 THEN\n                                substring(key from 1 for length($1) + position($2 IN substring(key from length($1) + 1))) COLLATE \"C\" > $4\n                            ELSE\n                                key COLLATE \"C\" > $4\n                            END\n                    ELSE\n                        true\n                END AND\n                CASE\n                    WHEN $6 != '''' THEN\n                        id COLLATE \"C\" > $6\n                    ELSE\n                        true\n                    END\n            ORDER BY\n                key COLLATE \"C\" ASC, created_at ASC) as e order by key COLLATE \"C\" LIMIT $3'\n        USING prefix_param, delimiter_param, max_keys, next_key_token, bucket_id, next_upload_token;\nEND;\n$function$\n"
  },
  {
    "schema_name": "storage",
    "function_name": "list_objects_with_delimiter",
    "args_signature": "bucket_id text, prefix_param text, delimiter_param text, max_keys integer, start_after text, next_token text",
    "definition": "CREATE OR REPLACE FUNCTION storage.list_objects_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer DEFAULT 100, start_after text DEFAULT ''::text, next_token text DEFAULT ''::text)\n RETURNS TABLE(name text, id uuid, metadata jsonb, updated_at timestamp with time zone)\n LANGUAGE plpgsql\nAS $function$\nBEGIN\n    RETURN QUERY EXECUTE\n        'SELECT DISTINCT ON(name COLLATE \"C\") * from (\n            SELECT\n                CASE\n                    WHEN position($2 IN substring(name from length($1) + 1)) > 0 THEN\n                        substring(name from 1 for length($1) + position($2 IN substring(name from length($1) + 1)))\n                    ELSE\n                        name\n                END AS name, id, metadata, updated_at\n            FROM\n                storage.objects\n            WHERE\n                bucket_id = $5 AND\n                name ILIKE $1 || ''%'' AND\n                CASE\n                    WHEN $6 != '''' THEN\n                    name COLLATE \"C\" > $6\n                ELSE true END\n                AND CASE\n                    WHEN $4 != '''' THEN\n                        CASE\n                            WHEN position($2 IN substring(name from length($1) + 1)) > 0 THEN\n                                substring(name from 1 for length($1) + position($2 IN substring(name from length($1) + 1))) COLLATE \"C\" > $4\n                            ELSE\n                                name COLLATE \"C\" > $4\n                            END\n                    ELSE\n                        true\n                END\n            ORDER BY\n                name COLLATE \"C\" ASC) as e order by name COLLATE \"C\" LIMIT $3'\n        USING prefix_param, delimiter_param, max_keys, next_token, bucket_id, start_after;\nEND;\n$function$\n"
  },
  {
    "schema_name": "storage",
    "function_name": "lock_top_prefixes",
    "args_signature": "bucket_ids text[], names text[]",
    "definition": "CREATE OR REPLACE FUNCTION storage.lock_top_prefixes(bucket_ids text[], names text[])\n RETURNS void\n LANGUAGE plpgsql\n SECURITY DEFINER\nAS $function$\nDECLARE\n    v_bucket text;\n    v_top text;\nBEGIN\n    FOR v_bucket, v_top IN\n        SELECT DISTINCT t.bucket_id,\n            split_part(t.name, '/', 1) AS top\n        FROM unnest(bucket_ids, names) AS t(bucket_id, name)\n        WHERE t.name <> ''\n        ORDER BY 1, 2\n        LOOP\n            PERFORM pg_advisory_xact_lock(hashtextextended(v_bucket || '/' || v_top, 0));\n        END LOOP;\nEND;\n$function$\n"
  },
  {
    "schema_name": "storage",
    "function_name": "objects_delete_cleanup",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION storage.objects_delete_cleanup()\n RETURNS trigger\n LANGUAGE plpgsql\n SECURITY DEFINER\nAS $function$\nDECLARE\n    v_bucket_ids text[];\n    v_names      text[];\nBEGIN\n    IF current_setting('storage.gc.prefixes', true) = '1' THEN\n        RETURN NULL;\n    END IF;\n\n    PERFORM set_config('storage.gc.prefixes', '1', true);\n\n    SELECT COALESCE(array_agg(d.bucket_id), '{}'),\n           COALESCE(array_agg(d.name), '{}')\n    INTO v_bucket_ids, v_names\n    FROM deleted AS d\n    WHERE d.name <> '';\n\n    PERFORM storage.lock_top_prefixes(v_bucket_ids, v_names);\n    PERFORM storage.delete_leaf_prefixes(v_bucket_ids, v_names);\n\n    RETURN NULL;\nEND;\n$function$\n"
  },
  {
    "schema_name": "storage",
    "function_name": "objects_insert_prefix_trigger",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION storage.objects_insert_prefix_trigger()\n RETURNS trigger\n LANGUAGE plpgsql\nAS $function$\nBEGIN\n    PERFORM \"storage\".\"add_prefixes\"(NEW.\"bucket_id\", NEW.\"name\");\n    NEW.level := \"storage\".\"get_level\"(NEW.\"name\");\n\n    RETURN NEW;\nEND;\n$function$\n"
  },
  {
    "schema_name": "storage",
    "function_name": "objects_update_cleanup",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION storage.objects_update_cleanup()\n RETURNS trigger\n LANGUAGE plpgsql\n SECURITY DEFINER\nAS $function$\nDECLARE\n    -- NEW - OLD (destinations to create prefixes for)\n    v_add_bucket_ids text[];\n    v_add_names      text[];\n\n    -- OLD - NEW (sources to prune)\n    v_src_bucket_ids text[];\n    v_src_names      text[];\nBEGIN\n    IF TG_OP <> 'UPDATE' THEN\n        RETURN NULL;\n    END IF;\n\n    -- 1) Compute NEW−OLD (added paths) and OLD−NEW (moved-away paths)\n    WITH added AS (\n        SELECT n.bucket_id, n.name\n        FROM new_rows n\n        WHERE n.name <> '' AND position('/' in n.name) > 0\n        EXCEPT\n        SELECT o.bucket_id, o.name FROM old_rows o WHERE o.name <> ''\n    ),\n    moved AS (\n         SELECT o.bucket_id, o.name\n         FROM old_rows o\n         WHERE o.name <> ''\n         EXCEPT\n         SELECT n.bucket_id, n.name FROM new_rows n WHERE n.name <> ''\n    )\n    SELECT\n        -- arrays for ADDED (dest) in stable order\n        COALESCE( (SELECT array_agg(a.bucket_id ORDER BY a.bucket_id, a.name) FROM added a), '{}' ),\n        COALESCE( (SELECT array_agg(a.name      ORDER BY a.bucket_id, a.name) FROM added a), '{}' ),\n        -- arrays for MOVED (src) in stable order\n        COALESCE( (SELECT array_agg(m.bucket_id ORDER BY m.bucket_id, m.name) FROM moved m), '{}' ),\n        COALESCE( (SELECT array_agg(m.name      ORDER BY m.bucket_id, m.name) FROM moved m), '{}' )\n    INTO v_add_bucket_ids, v_add_names, v_src_bucket_ids, v_src_names;\n\n    -- Nothing to do?\n    IF (array_length(v_add_bucket_ids, 1) IS NULL) AND (array_length(v_src_bucket_ids, 1) IS NULL) THEN\n        RETURN NULL;\n    END IF;\n\n    -- 2) Take per-(bucket, top) locks: ALL prefixes in consistent global order to prevent deadlocks\n    DECLARE\n        v_all_bucket_ids text[];\n        v_all_names text[];\n    BEGIN\n        -- Combine source and destination arrays for consistent lock ordering\n        v_all_bucket_ids := COALESCE(v_src_bucket_ids, '{}') || COALESCE(v_add_bucket_ids, '{}');\n        v_all_names := COALESCE(v_src_names, '{}') || COALESCE(v_add_names, '{}');\n\n        -- Single lock call ensures consistent global ordering across all transactions\n        IF array_length(v_all_bucket_ids, 1) IS NOT NULL THEN\n            PERFORM storage.lock_top_prefixes(v_all_bucket_ids, v_all_names);\n        END IF;\n    END;\n\n    -- 3) Create destination prefixes (NEW−OLD) BEFORE pruning sources\n    IF array_length(v_add_bucket_ids, 1) IS NOT NULL THEN\n        WITH candidates AS (\n            SELECT DISTINCT t.bucket_id, unnest(storage.get_prefixes(t.name)) AS name\n            FROM unnest(v_add_bucket_ids, v_add_names) AS t(bucket_id, name)\n            WHERE name <> ''\n        )\n        INSERT INTO storage.prefixes (bucket_id, name)\n        SELECT c.bucket_id, c.name\n        FROM candidates c\n        ON CONFLICT DO NOTHING;\n    END IF;\n\n    -- 4) Prune source prefixes bottom-up for OLD−NEW\n    IF array_length(v_src_bucket_ids, 1) IS NOT NULL THEN\n        -- re-entrancy guard so DELETE on prefixes won't recurse\n        IF current_setting('storage.gc.prefixes', true) <> '1' THEN\n            PERFORM set_config('storage.gc.prefixes', '1', true);\n        END IF;\n\n        PERFORM storage.delete_leaf_prefixes(v_src_bucket_ids, v_src_names);\n    END IF;\n\n    RETURN NULL;\nEND;\n$function$\n"
  },
  {
    "schema_name": "storage",
    "function_name": "objects_update_level_trigger",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION storage.objects_update_level_trigger()\n RETURNS trigger\n LANGUAGE plpgsql\nAS $function$\nBEGIN\n    -- Ensure this is an update operation and the name has changed\n    IF TG_OP = 'UPDATE' AND (NEW.\"name\" <> OLD.\"name\" OR NEW.\"bucket_id\" <> OLD.\"bucket_id\") THEN\n        -- Set the new level\n        NEW.\"level\" := \"storage\".\"get_level\"(NEW.\"name\");\n    END IF;\n    RETURN NEW;\nEND;\n$function$\n"
  },
  {
    "schema_name": "storage",
    "function_name": "objects_update_prefix_trigger",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION storage.objects_update_prefix_trigger()\n RETURNS trigger\n LANGUAGE plpgsql\nAS $function$\nDECLARE\n    old_prefixes TEXT[];\nBEGIN\n    -- Ensure this is an update operation and the name has changed\n    IF TG_OP = 'UPDATE' AND (NEW.\"name\" <> OLD.\"name\" OR NEW.\"bucket_id\" <> OLD.\"bucket_id\") THEN\n        -- Retrieve old prefixes\n        old_prefixes := \"storage\".\"get_prefixes\"(OLD.\"name\");\n\n        -- Remove old prefixes that are only used by this object\n        WITH all_prefixes as (\n            SELECT unnest(old_prefixes) as prefix\n        ),\n        can_delete_prefixes as (\n             SELECT prefix\n             FROM all_prefixes\n             WHERE NOT EXISTS (\n                 SELECT 1 FROM \"storage\".\"objects\"\n                 WHERE \"bucket_id\" = OLD.\"bucket_id\"\n                   AND \"name\" <> OLD.\"name\"\n                   AND \"name\" LIKE (prefix || '%')\n             )\n         )\n        DELETE FROM \"storage\".\"prefixes\" WHERE name IN (SELECT prefix FROM can_delete_prefixes);\n\n        -- Add new prefixes\n        PERFORM \"storage\".\"add_prefixes\"(NEW.\"bucket_id\", NEW.\"name\");\n    END IF;\n    -- Set the new level\n    NEW.\"level\" := \"storage\".\"get_level\"(NEW.\"name\");\n\n    RETURN NEW;\nEND;\n$function$\n"
  },
  {
    "schema_name": "storage",
    "function_name": "operation",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION storage.operation()\n RETURNS text\n LANGUAGE plpgsql\n STABLE\nAS $function$\nBEGIN\n    RETURN current_setting('storage.operation', true);\nEND;\n$function$\n"
  },
  {
    "schema_name": "storage",
    "function_name": "prefixes_delete_cleanup",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION storage.prefixes_delete_cleanup()\n RETURNS trigger\n LANGUAGE plpgsql\n SECURITY DEFINER\nAS $function$\nDECLARE\n    v_bucket_ids text[];\n    v_names      text[];\nBEGIN\n    IF current_setting('storage.gc.prefixes', true) = '1' THEN\n        RETURN NULL;\n    END IF;\n\n    PERFORM set_config('storage.gc.prefixes', '1', true);\n\n    SELECT COALESCE(array_agg(d.bucket_id), '{}'),\n           COALESCE(array_agg(d.name), '{}')\n    INTO v_bucket_ids, v_names\n    FROM deleted AS d\n    WHERE d.name <> '';\n\n    PERFORM storage.lock_top_prefixes(v_bucket_ids, v_names);\n    PERFORM storage.delete_leaf_prefixes(v_bucket_ids, v_names);\n\n    RETURN NULL;\nEND;\n$function$\n"
  },
  {
    "schema_name": "storage",
    "function_name": "prefixes_insert_trigger",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION storage.prefixes_insert_trigger()\n RETURNS trigger\n LANGUAGE plpgsql\nAS $function$\nBEGIN\n    PERFORM \"storage\".\"add_prefixes\"(NEW.\"bucket_id\", NEW.\"name\");\n    RETURN NEW;\nEND;\n$function$\n"
  },
  {
    "schema_name": "storage",
    "function_name": "search",
    "args_signature": "prefix text, bucketname text, limits integer, levels integer, offsets integer, search text, sortcolumn text, sortorder text",
    "definition": "CREATE OR REPLACE FUNCTION storage.search(prefix text, bucketname text, limits integer DEFAULT 100, levels integer DEFAULT 1, offsets integer DEFAULT 0, search text DEFAULT ''::text, sortcolumn text DEFAULT 'name'::text, sortorder text DEFAULT 'asc'::text)\n RETURNS TABLE(name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)\n LANGUAGE plpgsql\nAS $function$\ndeclare\n    can_bypass_rls BOOLEAN;\nbegin\n    SELECT rolbypassrls\n    INTO can_bypass_rls\n    FROM pg_roles\n    WHERE rolname = coalesce(nullif(current_setting('role', true), 'none'), current_user);\n\n    IF can_bypass_rls THEN\n        RETURN QUERY SELECT * FROM storage.search_v1_optimised(prefix, bucketname, limits, levels, offsets, search, sortcolumn, sortorder);\n    ELSE\n        RETURN QUERY SELECT * FROM storage.search_legacy_v1(prefix, bucketname, limits, levels, offsets, search, sortcolumn, sortorder);\n    END IF;\nend;\n$function$\n"
  },
  {
    "schema_name": "storage",
    "function_name": "search_legacy_v1",
    "args_signature": "prefix text, bucketname text, limits integer, levels integer, offsets integer, search text, sortcolumn text, sortorder text",
    "definition": "CREATE OR REPLACE FUNCTION storage.search_legacy_v1(prefix text, bucketname text, limits integer DEFAULT 100, levels integer DEFAULT 1, offsets integer DEFAULT 0, search text DEFAULT ''::text, sortcolumn text DEFAULT 'name'::text, sortorder text DEFAULT 'asc'::text)\n RETURNS TABLE(name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)\n LANGUAGE plpgsql\n STABLE\nAS $function$\ndeclare\n    v_order_by text;\n    v_sort_order text;\nbegin\n    case\n        when sortcolumn = 'name' then\n            v_order_by = 'name';\n        when sortcolumn = 'updated_at' then\n            v_order_by = 'updated_at';\n        when sortcolumn = 'created_at' then\n            v_order_by = 'created_at';\n        when sortcolumn = 'last_accessed_at' then\n            v_order_by = 'last_accessed_at';\n        else\n            v_order_by = 'name';\n        end case;\n\n    case\n        when sortorder = 'asc' then\n            v_sort_order = 'asc';\n        when sortorder = 'desc' then\n            v_sort_order = 'desc';\n        else\n            v_sort_order = 'asc';\n        end case;\n\n    v_order_by = v_order_by || ' ' || v_sort_order;\n\n    return query execute\n        'with folders as (\n           select path_tokens[$1] as folder\n           from storage.objects\n             where objects.name ilike $2 || $3 || ''%''\n               and bucket_id = $4\n               and array_length(objects.path_tokens, 1) <> $1\n           group by folder\n           order by folder ' || v_sort_order || '\n     )\n     (select folder as \"name\",\n            null as id,\n            null as updated_at,\n            null as created_at,\n            null as last_accessed_at,\n            null as metadata from folders)\n     union all\n     (select path_tokens[$1] as \"name\",\n            id,\n            updated_at,\n            created_at,\n            last_accessed_at,\n            metadata\n     from storage.objects\n     where objects.name ilike $2 || $3 || ''%''\n       and bucket_id = $4\n       and array_length(objects.path_tokens, 1) = $1\n     order by ' || v_order_by || ')\n     limit $5\n     offset $6' using levels, prefix, search, bucketname, limits, offsets;\nend;\n$function$\n"
  },
  {
    "schema_name": "storage",
    "function_name": "search_v1_optimised",
    "args_signature": "prefix text, bucketname text, limits integer, levels integer, offsets integer, search text, sortcolumn text, sortorder text",
    "definition": "CREATE OR REPLACE FUNCTION storage.search_v1_optimised(prefix text, bucketname text, limits integer DEFAULT 100, levels integer DEFAULT 1, offsets integer DEFAULT 0, search text DEFAULT ''::text, sortcolumn text DEFAULT 'name'::text, sortorder text DEFAULT 'asc'::text)\n RETURNS TABLE(name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)\n LANGUAGE plpgsql\n STABLE\nAS $function$\ndeclare\n    v_order_by text;\n    v_sort_order text;\nbegin\n    case\n        when sortcolumn = 'name' then\n            v_order_by = 'name';\n        when sortcolumn = 'updated_at' then\n            v_order_by = 'updated_at';\n        when sortcolumn = 'created_at' then\n            v_order_by = 'created_at';\n        when sortcolumn = 'last_accessed_at' then\n            v_order_by = 'last_accessed_at';\n        else\n            v_order_by = 'name';\n        end case;\n\n    case\n        when sortorder = 'asc' then\n            v_sort_order = 'asc';\n        when sortorder = 'desc' then\n            v_sort_order = 'desc';\n        else\n            v_sort_order = 'asc';\n        end case;\n\n    v_order_by = v_order_by || ' ' || v_sort_order;\n\n    return query execute\n        'with folders as (\n           select (string_to_array(name, ''/''))[level] as name\n           from storage.prefixes\n             where lower(prefixes.name) like lower($2 || $3) || ''%''\n               and bucket_id = $4\n               and level = $1\n           order by name ' || v_sort_order || '\n     )\n     (select name,\n            null as id,\n            null as updated_at,\n            null as created_at,\n            null as last_accessed_at,\n            null as metadata from folders)\n     union all\n     (select path_tokens[level] as \"name\",\n            id,\n            updated_at,\n            created_at,\n            last_accessed_at,\n            metadata\n     from storage.objects\n     where lower(objects.name) like lower($2 || $3) || ''%''\n       and bucket_id = $4\n       and level = $1\n     order by ' || v_order_by || ')\n     limit $5\n     offset $6' using levels, prefix, search, bucketname, limits, offsets;\nend;\n$function$\n"
  },
  {
    "schema_name": "storage",
    "function_name": "search_v2",
    "args_signature": "prefix text, bucket_name text, limits integer, levels integer, start_after text, sort_order text, sort_column text, sort_column_after text",
    "definition": "CREATE OR REPLACE FUNCTION storage.search_v2(prefix text, bucket_name text, limits integer DEFAULT 100, levels integer DEFAULT 1, start_after text DEFAULT ''::text, sort_order text DEFAULT 'asc'::text, sort_column text DEFAULT 'name'::text, sort_column_after text DEFAULT ''::text)\n RETURNS TABLE(key text, name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)\n LANGUAGE plpgsql\n STABLE\nAS $function$\nDECLARE\n    sort_col text;\n    sort_ord text;\n    cursor_op text;\n    cursor_expr text;\n    sort_expr text;\nBEGIN\n    -- Validate sort_order\n    sort_ord := lower(sort_order);\n    IF sort_ord NOT IN ('asc', 'desc') THEN\n        sort_ord := 'asc';\n    END IF;\n\n    -- Determine cursor comparison operator\n    IF sort_ord = 'asc' THEN\n        cursor_op := '>';\n    ELSE\n        cursor_op := '<';\n    END IF;\n    \n    sort_col := lower(sort_column);\n    -- Validate sort column  \n    IF sort_col IN ('updated_at', 'created_at') THEN\n        cursor_expr := format(\n            '($5 = '''' OR ROW(date_trunc(''milliseconds'', %I), name COLLATE \"C\") %s ROW(COALESCE(NULLIF($6, '''')::timestamptz, ''epoch''::timestamptz), $5))',\n            sort_col, cursor_op\n        );\n        sort_expr := format(\n            'COALESCE(date_trunc(''milliseconds'', %I), ''epoch''::timestamptz) %s, name COLLATE \"C\" %s',\n            sort_col, sort_ord, sort_ord\n        );\n    ELSE\n        cursor_expr := format('($5 = '''' OR name COLLATE \"C\" %s $5)', cursor_op);\n        sort_expr := format('name COLLATE \"C\" %s', sort_ord);\n    END IF;\n\n    RETURN QUERY EXECUTE format(\n        $sql$\n        SELECT * FROM (\n            (\n                SELECT\n                    split_part(name, '/', $4) AS key,\n                    name,\n                    NULL::uuid AS id,\n                    updated_at,\n                    created_at,\n                    NULL::timestamptz AS last_accessed_at,\n                    NULL::jsonb AS metadata\n                FROM storage.prefixes\n                WHERE name COLLATE \"C\" LIKE $1 || '%%'\n                    AND bucket_id = $2\n                    AND level = $4\n                    AND %s\n                ORDER BY %s\n                LIMIT $3\n            )\n            UNION ALL\n            (\n                SELECT\n                    split_part(name, '/', $4) AS key,\n                    name,\n                    id,\n                    updated_at,\n                    created_at,\n                    last_accessed_at,\n                    metadata\n                FROM storage.objects\n                WHERE name COLLATE \"C\" LIKE $1 || '%%'\n                    AND bucket_id = $2\n                    AND level = $4\n                    AND %s\n                ORDER BY %s\n                LIMIT $3\n            )\n        ) obj\n        ORDER BY %s\n        LIMIT $3\n        $sql$,\n        cursor_expr,    -- prefixes WHERE\n        sort_expr,      -- prefixes ORDER BY\n        cursor_expr,    -- objects WHERE\n        sort_expr,      -- objects ORDER BY\n        sort_expr       -- final ORDER BY\n    )\n    USING prefix, bucket_name, limits, levels, start_after, sort_column_after;\nEND;\n$function$\n"
  },
  {
    "schema_name": "storage",
    "function_name": "update_updated_at_column",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION storage.update_updated_at_column()\n RETURNS trigger\n LANGUAGE plpgsql\nAS $function$\nBEGIN\n    NEW.updated_at = now();\n    RETURN NEW; \nEND;\n$function$\n"
  },
  {
    "schema_name": "vault",
    "function_name": "_crypto_aead_det_decrypt",
    "args_signature": "message bytea, additional bytea, key_id bigint, context bytea, nonce bytea",
    "definition": "CREATE OR REPLACE FUNCTION vault._crypto_aead_det_decrypt(message bytea, additional bytea, key_id bigint, context bytea DEFAULT '\\x7067736f6469756d'::bytea, nonce bytea DEFAULT NULL::bytea)\n RETURNS bytea\n LANGUAGE c\n IMMUTABLE\nAS '$libdir/supabase_vault', $function$pgsodium_crypto_aead_det_decrypt_by_id$function$\n"
  },
  {
    "schema_name": "vault",
    "function_name": "_crypto_aead_det_encrypt",
    "args_signature": "message bytea, additional bytea, key_id bigint, context bytea, nonce bytea",
    "definition": "CREATE OR REPLACE FUNCTION vault._crypto_aead_det_encrypt(message bytea, additional bytea, key_id bigint, context bytea DEFAULT '\\x7067736f6469756d'::bytea, nonce bytea DEFAULT NULL::bytea)\n RETURNS bytea\n LANGUAGE c\n IMMUTABLE\nAS '$libdir/supabase_vault', $function$pgsodium_crypto_aead_det_encrypt_by_id$function$\n"
  },
  {
    "schema_name": "vault",
    "function_name": "_crypto_aead_det_noncegen",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION vault._crypto_aead_det_noncegen()\n RETURNS bytea\n LANGUAGE c\n IMMUTABLE\nAS '$libdir/supabase_vault', $function$pgsodium_crypto_aead_det_noncegen$function$\n"
  },
  {
    "schema_name": "vault",
    "function_name": "create_secret",
    "args_signature": "new_secret text, new_name text, new_description text, new_key_id uuid",
    "definition": "CREATE OR REPLACE FUNCTION vault.create_secret(new_secret text, new_name text DEFAULT NULL::text, new_description text DEFAULT ''::text, new_key_id uuid DEFAULT NULL::uuid)\n RETURNS uuid\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO ''\nAS $function$\nDECLARE\n  rec record;\nBEGIN\n  INSERT INTO vault.secrets (secret, name, description)\n  VALUES (\n    new_secret,\n    new_name,\n    new_description\n  )\n  RETURNING * INTO rec;\n  UPDATE vault.secrets s\n  SET secret = encode(vault._crypto_aead_det_encrypt(\n    message := convert_to(rec.secret, 'utf8'),\n    additional := convert_to(s.id::text, 'utf8'),\n    key_id := 0,\n    context := 'pgsodium'::bytea,\n    nonce := rec.nonce\n  ), 'base64')\n  WHERE id = rec.id;\n  RETURN rec.id;\nEND\n$function$\n"
  },
  {
    "schema_name": "vault",
    "function_name": "update_secret",
    "args_signature": "secret_id uuid, new_secret text, new_name text, new_description text, new_key_id uuid",
    "definition": "CREATE OR REPLACE FUNCTION vault.update_secret(secret_id uuid, new_secret text DEFAULT NULL::text, new_name text DEFAULT NULL::text, new_description text DEFAULT NULL::text, new_key_id uuid DEFAULT NULL::uuid)\n RETURNS void\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO ''\nAS $function$\nDECLARE\n  decrypted_secret text := (SELECT decrypted_secret FROM vault.decrypted_secrets WHERE id = secret_id);\nBEGIN\n  UPDATE vault.secrets s\n  SET\n    secret = CASE WHEN new_secret IS NULL THEN s.secret\n                  ELSE encode(vault._crypto_aead_det_encrypt(\n                    message := convert_to(new_secret, 'utf8'),\n                    additional := convert_to(s.id::text, 'utf8'),\n                    key_id := 0,\n                    context := 'pgsodium'::bytea,\n                    nonce := s.nonce\n                  ), 'base64') END,\n    name = coalesce(new_name, s.name),\n    description = coalesce(new_description, s.description),\n    updated_at = now()\n  WHERE s.id = secret_id;\nEND\n$function$\n"
  }
]



-----------


# Views and their definitions (all schemas)

[
  {
    "schema_name": "extensions",
    "view_name": "pg_stat_statements",
    "view_definition": " SELECT userid,\n    dbid,\n    toplevel,\n    queryid,\n    query,\n    plans,\n    total_plan_time,\n    min_plan_time,\n    max_plan_time,\n    mean_plan_time,\n    stddev_plan_time,\n    calls,\n    total_exec_time,\n    min_exec_time,\n    max_exec_time,\n    mean_exec_time,\n    stddev_exec_time,\n    rows,\n    shared_blks_hit,\n    shared_blks_read,\n    shared_blks_dirtied,\n    shared_blks_written,\n    local_blks_hit,\n    local_blks_read,\n    local_blks_dirtied,\n    local_blks_written,\n    temp_blks_read,\n    temp_blks_written,\n    shared_blk_read_time,\n    shared_blk_write_time,\n    local_blk_read_time,\n    local_blk_write_time,\n    temp_blk_read_time,\n    temp_blk_write_time,\n    wal_records,\n    wal_fpi,\n    wal_bytes,\n    jit_functions,\n    jit_generation_time,\n    jit_inlining_count,\n    jit_inlining_time,\n    jit_optimization_count,\n    jit_optimization_time,\n    jit_emission_count,\n    jit_emission_time,\n    jit_deform_count,\n    jit_deform_time,\n    stats_since,\n    minmax_stats_since\n   FROM pg_stat_statements(true) pg_stat_statements(userid, dbid, toplevel, queryid, query, plans, total_plan_time, min_plan_time, max_plan_time, mean_plan_time, stddev_plan_time, calls, total_exec_time, min_exec_time, max_exec_time, mean_exec_time, stddev_exec_time, rows, shared_blks_hit, shared_blks_read, shared_blks_dirtied, shared_blks_written, local_blks_hit, local_blks_read, local_blks_dirtied, local_blks_written, temp_blks_read, temp_blks_written, shared_blk_read_time, shared_blk_write_time, local_blk_read_time, local_blk_write_time, temp_blk_read_time, temp_blk_write_time, wal_records, wal_fpi, wal_bytes, jit_functions, jit_generation_time, jit_inlining_count, jit_inlining_time, jit_optimization_count, jit_optimization_time, jit_emission_count, jit_emission_time, jit_deform_count, jit_deform_time, stats_since, minmax_stats_since);"
  },
  {
    "schema_name": "extensions",
    "view_name": "pg_stat_statements_info",
    "view_definition": " SELECT dealloc,\n    stats_reset\n   FROM pg_stat_statements_info() pg_stat_statements_info(dealloc, stats_reset);"
  },
  {
    "schema_name": "vault",
    "view_name": "decrypted_secrets",
    "view_definition": " SELECT id,\n    name,\n    description,\n    secret,\n    convert_from(vault._crypto_aead_det_decrypt(message => decode(secret, 'base64'::text), additional => convert_to(id::text, 'utf8'::name), key_id => 0::bigint, context => '\\x7067736f6469756d'::bytea, nonce => nonce), 'utf8'::name) AS decrypted_secret,\n    key_id,\n    nonce,\n    created_at,\n    updated_at\n   FROM vault.secrets s;"
  }
]



---------


# Enums and labels (all schemas)

[
  {
    "schema_name": "auth",
    "enum_name": "aal_level",
    "sort_order": 1,
    "label": "aal1"
  },
  {
    "schema_name": "auth",
    "enum_name": "aal_level",
    "sort_order": 2,
    "label": "aal2"
  },
  {
    "schema_name": "auth",
    "enum_name": "aal_level",
    "sort_order": 3,
    "label": "aal3"
  },
  {
    "schema_name": "auth",
    "enum_name": "code_challenge_method",
    "sort_order": 1,
    "label": "s256"
  },
  {
    "schema_name": "auth",
    "enum_name": "code_challenge_method",
    "sort_order": 2,
    "label": "plain"
  },
  {
    "schema_name": "auth",
    "enum_name": "factor_status",
    "sort_order": 1,
    "label": "unverified"
  },
  {
    "schema_name": "auth",
    "enum_name": "factor_status",
    "sort_order": 2,
    "label": "verified"
  },
  {
    "schema_name": "auth",
    "enum_name": "factor_type",
    "sort_order": 1,
    "label": "totp"
  },
  {
    "schema_name": "auth",
    "enum_name": "factor_type",
    "sort_order": 2,
    "label": "webauthn"
  },
  {
    "schema_name": "auth",
    "enum_name": "factor_type",
    "sort_order": 3,
    "label": "phone"
  },
  {
    "schema_name": "auth",
    "enum_name": "oauth_registration_type",
    "sort_order": 1,
    "label": "dynamic"
  },
  {
    "schema_name": "auth",
    "enum_name": "oauth_registration_type",
    "sort_order": 2,
    "label": "manual"
  },
  {
    "schema_name": "auth",
    "enum_name": "one_time_token_type",
    "sort_order": 1,
    "label": "confirmation_token"
  },
  {
    "schema_name": "auth",
    "enum_name": "one_time_token_type",
    "sort_order": 2,
    "label": "reauthentication_token"
  },
  {
    "schema_name": "auth",
    "enum_name": "one_time_token_type",
    "sort_order": 3,
    "label": "recovery_token"
  },
  {
    "schema_name": "auth",
    "enum_name": "one_time_token_type",
    "sort_order": 4,
    "label": "email_change_token_new"
  },
  {
    "schema_name": "auth",
    "enum_name": "one_time_token_type",
    "sort_order": 5,
    "label": "email_change_token_current"
  },
  {
    "schema_name": "auth",
    "enum_name": "one_time_token_type",
    "sort_order": 6,
    "label": "phone_change_token"
  },
  {
    "schema_name": "public",
    "enum_name": "assessment_type_enum",
    "sort_order": 1,
    "label": "FOCAL"
  },
  {
    "schema_name": "public",
    "enum_name": "assessment_type_enum",
    "sort_order": 2,
    "label": "GENERALIZED"
  },
  {
    "schema_name": "public",
    "enum_name": "assessment_type_enum",
    "sort_order": 3,
    "label": "SECONDARY_GENERALIZED"
  },
  {
    "schema_name": "public",
    "enum_name": "assessment_type_enum",
    "sort_order": 4,
    "label": "UNKNOWN"
  },
  {
    "schema_name": "public",
    "enum_name": "brain_lobe_enum",
    "sort_order": 1,
    "label": "TEMPORAL"
  },
  {
    "schema_name": "public",
    "enum_name": "brain_lobe_enum",
    "sort_order": 2,
    "label": "FRONTAL"
  },
  {
    "schema_name": "public",
    "enum_name": "brain_lobe_enum",
    "sort_order": 3,
    "label": "PARIETAL"
  },
  {
    "schema_name": "public",
    "enum_name": "brain_lobe_enum",
    "sort_order": 4,
    "label": "OCCIPITAL"
  },
  {
    "schema_name": "public",
    "enum_name": "brain_lobe_enum",
    "sort_order": 5,
    "label": "INSULA"
  },
  {
    "schema_name": "public",
    "enum_name": "brain_lobe_enum",
    "sort_order": 6,
    "label": "CINGULATE"
  },
  {
    "schema_name": "public",
    "enum_name": "brain_lobe_enum",
    "sort_order": 7,
    "label": "HYPOTHALAMUS"
  },
  {
    "schema_name": "public",
    "enum_name": "brain_lobe_enum",
    "sort_order": 8,
    "label": "BILATERAL"
  },
  {
    "schema_name": "public",
    "enum_name": "brain_subregion_enum",
    "sort_order": 1,
    "label": "MESIAL_TEMPORAL"
  },
  {
    "schema_name": "public",
    "enum_name": "brain_subregion_enum",
    "sort_order": 2,
    "label": "LATERAL_TEMPORAL"
  },
  {
    "schema_name": "public",
    "enum_name": "brain_subregion_enum",
    "sort_order": 3,
    "label": "ANTERIOR_TEMPORAL"
  },
  {
    "schema_name": "public",
    "enum_name": "brain_subregion_enum",
    "sort_order": 4,
    "label": "POSTERIOR_TEMPORAL"
  },
  {
    "schema_name": "public",
    "enum_name": "brain_subregion_enum",
    "sort_order": 5,
    "label": "BASAL_TEMPORAL"
  },
  {
    "schema_name": "public",
    "enum_name": "brain_subregion_enum",
    "sort_order": 6,
    "label": "HIPPOCAMPUS"
  },
  {
    "schema_name": "public",
    "enum_name": "brain_subregion_enum",
    "sort_order": 7,
    "label": "AMYGDALA"
  },
  {
    "schema_name": "public",
    "enum_name": "brain_subregion_enum",
    "sort_order": 8,
    "label": "PRIMARY_MOTOR_CORTEX"
  },
  {
    "schema_name": "public",
    "enum_name": "brain_subregion_enum",
    "sort_order": 9,
    "label": "PREMOTOR_CORTEX"
  },
  {
    "schema_name": "public",
    "enum_name": "brain_subregion_enum",
    "sort_order": 10,
    "label": "SUPPLEMENTARY_MOTOR_AREA"
  },
  {
    "schema_name": "public",
    "enum_name": "brain_subregion_enum",
    "sort_order": 11,
    "label": "BROCA_AREA"
  },
  {
    "schema_name": "public",
    "enum_name": "brain_subregion_enum",
    "sort_order": 12,
    "label": "PREFRONTAL_CORTEX"
  },
  {
    "schema_name": "public",
    "enum_name": "brain_subregion_enum",
    "sort_order": 13,
    "label": "PRIMARY_SOMATOSENSORY_CORTEX"
  },
  {
    "schema_name": "public",
    "enum_name": "brain_subregion_enum",
    "sort_order": 14,
    "label": "SUPERIOR_PARIETAL_LOBULE"
  },
  {
    "schema_name": "public",
    "enum_name": "brain_subregion_enum",
    "sort_order": 15,
    "label": "INFERIOR_PARIETAL_LOBULE"
  },
  {
    "schema_name": "public",
    "enum_name": "brain_subregion_enum",
    "sort_order": 16,
    "label": "PRIMARY_VISUAL_CORTEX"
  },
  {
    "schema_name": "public",
    "enum_name": "brain_subregion_enum",
    "sort_order": 17,
    "label": "VISUAL_ASSOCIATION_AREAS"
  },
  {
    "schema_name": "public",
    "enum_name": "brain_subregion_enum",
    "sort_order": 18,
    "label": "ANTERIOR_INSULA"
  },
  {
    "schema_name": "public",
    "enum_name": "brain_subregion_enum",
    "sort_order": 19,
    "label": "POSTERIOR_INSULA"
  },
  {
    "schema_name": "public",
    "enum_name": "brain_subregion_enum",
    "sort_order": 20,
    "label": "ANTERIOR_CINGULATE"
  },
  {
    "schema_name": "public",
    "enum_name": "brain_subregion_enum",
    "sort_order": 21,
    "label": "POSTERIOR_CINGULATE"
  },
  {
    "schema_name": "public",
    "enum_name": "consciousness_level_enum",
    "sort_order": 1,
    "label": "FULL"
  },
  {
    "schema_name": "public",
    "enum_name": "consciousness_level_enum",
    "sort_order": 2,
    "label": "PARTIAL"
  },
  {
    "schema_name": "public",
    "enum_name": "consciousness_level_enum",
    "sort_order": 3,
    "label": "NONE"
  },
  {
    "schema_name": "public",
    "enum_name": "consent_status_enum",
    "sort_order": 1,
    "label": "pending"
  },
  {
    "schema_name": "public",
    "enum_name": "consent_status_enum",
    "sort_order": 2,
    "label": "active"
  },
  {
    "schema_name": "public",
    "enum_name": "consent_status_enum",
    "sort_order": 3,
    "label": "withdrawn"
  },
  {
    "schema_name": "public",
    "enum_name": "consent_status_enum",
    "sort_order": 4,
    "label": "expired"
  },
  {
    "schema_name": "public",
    "enum_name": "cycle_phase_enum",
    "sort_order": 1,
    "label": "MENSTRUAL"
  },
  {
    "schema_name": "public",
    "enum_name": "cycle_phase_enum",
    "sort_order": 2,
    "label": "FOLLICULAR"
  },
  {
    "schema_name": "public",
    "enum_name": "cycle_phase_enum",
    "sort_order": 3,
    "label": "OVULATION"
  },
  {
    "schema_name": "public",
    "enum_name": "cycle_phase_enum",
    "sort_order": 4,
    "label": "LUTEAL"
  },
  {
    "schema_name": "public",
    "enum_name": "flow_intensity_enum",
    "sort_order": 1,
    "label": "SPOTTING"
  },
  {
    "schema_name": "public",
    "enum_name": "flow_intensity_enum",
    "sort_order": 2,
    "label": "LIGHT"
  },
  {
    "schema_name": "public",
    "enum_name": "flow_intensity_enum",
    "sort_order": 3,
    "label": "MODERATE"
  },
  {
    "schema_name": "public",
    "enum_name": "flow_intensity_enum",
    "sort_order": 4,
    "label": "HEAVY"
  },
  {
    "schema_name": "public",
    "enum_name": "flow_intensity_enum",
    "sort_order": 5,
    "label": "VERY_HEAVY"
  },
  {
    "schema_name": "public",
    "enum_name": "gender_enum",
    "sort_order": 1,
    "label": "male"
  },
  {
    "schema_name": "public",
    "enum_name": "gender_enum",
    "sort_order": 2,
    "label": "female"
  },
  {
    "schema_name": "public",
    "enum_name": "gender_enum",
    "sort_order": 3,
    "label": "non_binary"
  },
  {
    "schema_name": "public",
    "enum_name": "gender_enum",
    "sort_order": 4,
    "label": "other"
  },
  {
    "schema_name": "public",
    "enum_name": "gender_enum",
    "sort_order": 5,
    "label": "prefer_not_to_say"
  },
  {
    "schema_name": "public",
    "enum_name": "laterality_enum",
    "sort_order": 1,
    "label": "LEFT"
  },
  {
    "schema_name": "public",
    "enum_name": "laterality_enum",
    "sort_order": 2,
    "label": "RIGHT"
  },
  {
    "schema_name": "public",
    "enum_name": "laterality_enum",
    "sort_order": 3,
    "label": "BILATERAL"
  },
  {
    "schema_name": "public",
    "enum_name": "laterality_enum",
    "sort_order": 4,
    "label": "UNKNOWN"
  },
  {
    "schema_name": "public",
    "enum_name": "location_type_enum",
    "sort_order": 1,
    "label": "HOME"
  },
  {
    "schema_name": "public",
    "enum_name": "location_type_enum",
    "sort_order": 2,
    "label": "WORK"
  },
  {
    "schema_name": "public",
    "enum_name": "location_type_enum",
    "sort_order": 3,
    "label": "SCHOOL"
  },
  {
    "schema_name": "public",
    "enum_name": "location_type_enum",
    "sort_order": 4,
    "label": "OUTDOORS"
  },
  {
    "schema_name": "public",
    "enum_name": "location_type_enum",
    "sort_order": 5,
    "label": "TRANSIT"
  },
  {
    "schema_name": "public",
    "enum_name": "location_type_enum",
    "sort_order": 6,
    "label": "CLINICAL"
  },
  {
    "schema_name": "public",
    "enum_name": "location_type_enum",
    "sort_order": 7,
    "label": "PUBLIC_PLACE"
  },
  {
    "schema_name": "public",
    "enum_name": "location_type_enum",
    "sort_order": 8,
    "label": "UNKNOWN"
  },
  {
    "schema_name": "public",
    "enum_name": "medication_adherence_enum",
    "sort_order": 1,
    "label": "TAKEN_ON_TIME"
  },
  {
    "schema_name": "public",
    "enum_name": "medication_adherence_enum",
    "sort_order": 2,
    "label": "LATE"
  },
  {
    "schema_name": "public",
    "enum_name": "medication_adherence_enum",
    "sort_order": 3,
    "label": "MISSED"
  },
  {
    "schema_name": "public",
    "enum_name": "medication_adherence_enum",
    "sort_order": 4,
    "label": "UNKNOWN"
  },
  {
    "schema_name": "public",
    "enum_name": "menstrual_symptom_severity_enum",
    "sort_order": 1,
    "label": "NONE"
  },
  {
    "schema_name": "public",
    "enum_name": "menstrual_symptom_severity_enum",
    "sort_order": 2,
    "label": "MILD"
  },
  {
    "schema_name": "public",
    "enum_name": "menstrual_symptom_severity_enum",
    "sort_order": 3,
    "label": "MODERATE"
  },
  {
    "schema_name": "public",
    "enum_name": "menstrual_symptom_severity_enum",
    "sort_order": 4,
    "label": "SEVERE"
  },
  {
    "schema_name": "public",
    "enum_name": "menstrual_symptom_severity_enum",
    "sort_order": 5,
    "label": "VERY_SEVERE"
  },
  {
    "schema_name": "public",
    "enum_name": "post_ictal_symptom_enum",
    "sort_order": 1,
    "label": "CONFUSION"
  },
  {
    "schema_name": "public",
    "enum_name": "post_ictal_symptom_enum",
    "sort_order": 2,
    "label": "FATIGUE"
  },
  {
    "schema_name": "public",
    "enum_name": "post_ictal_symptom_enum",
    "sort_order": 3,
    "label": "HEADACHE"
  },
  {
    "schema_name": "public",
    "enum_name": "post_ictal_symptom_enum",
    "sort_order": 4,
    "label": "AGITATION"
  },
  {
    "schema_name": "public",
    "enum_name": "post_ictal_symptom_enum",
    "sort_order": 5,
    "label": "WEAKNESS"
  },
  {
    "schema_name": "public",
    "enum_name": "post_ictal_symptom_enum",
    "sort_order": 6,
    "label": "SPEECH_DIFFICULTY"
  },
  {
    "schema_name": "public",
    "enum_name": "post_ictal_symptom_enum",
    "sort_order": 7,
    "label": "MEMORY_LOSS"
  },
  {
    "schema_name": "public",
    "enum_name": "post_ictal_symptom_enum",
    "sort_order": 8,
    "label": "MUSCLE_PAIN"
  },
  {
    "schema_name": "public",
    "enum_name": "post_ictal_symptom_enum",
    "sort_order": 9,
    "label": "NAUSEA"
  },
  {
    "schema_name": "public",
    "enum_name": "probability_grade_enum",
    "sort_order": 1,
    "label": "VERY_LOW"
  },
  {
    "schema_name": "public",
    "enum_name": "probability_grade_enum",
    "sort_order": 2,
    "label": "LOW"
  },
  {
    "schema_name": "public",
    "enum_name": "probability_grade_enum",
    "sort_order": 3,
    "label": "MODERATE"
  },
  {
    "schema_name": "public",
    "enum_name": "probability_grade_enum",
    "sort_order": 4,
    "label": "HIGH"
  },
  {
    "schema_name": "public",
    "enum_name": "probability_grade_enum",
    "sort_order": 5,
    "label": "VERY_HIGH"
  },
  {
    "schema_name": "public",
    "enum_name": "relationship_enum",
    "sort_order": 1,
    "label": "parent"
  },
  {
    "schema_name": "public",
    "enum_name": "relationship_enum",
    "sort_order": 2,
    "label": "spouse"
  },
  {
    "schema_name": "public",
    "enum_name": "relationship_enum",
    "sort_order": 3,
    "label": "partner"
  },
  {
    "schema_name": "public",
    "enum_name": "relationship_enum",
    "sort_order": 4,
    "label": "child"
  },
  {
    "schema_name": "public",
    "enum_name": "relationship_enum",
    "sort_order": 5,
    "label": "sibling"
  },
  {
    "schema_name": "public",
    "enum_name": "relationship_enum",
    "sort_order": 6,
    "label": "friend"
  },
  {
    "schema_name": "public",
    "enum_name": "relationship_enum",
    "sort_order": 7,
    "label": "caregiver"
  },
  {
    "schema_name": "public",
    "enum_name": "relationship_enum",
    "sort_order": 8,
    "label": "other"
  },
  {
    "schema_name": "public",
    "enum_name": "rescue_medication_enum",
    "sort_order": 1,
    "label": "MIDAZOLAM"
  },
  {
    "schema_name": "public",
    "enum_name": "rescue_medication_enum",
    "sort_order": 2,
    "label": "DIAZEPAM"
  },
  {
    "schema_name": "public",
    "enum_name": "rescue_medication_enum",
    "sort_order": 3,
    "label": "LORAZEPAM"
  },
  {
    "schema_name": "public",
    "enum_name": "rescue_medication_enum",
    "sort_order": 4,
    "label": "CLONAZEPAM"
  },
  {
    "schema_name": "public",
    "enum_name": "rescue_medication_enum",
    "sort_order": 5,
    "label": "NONE"
  },
  {
    "schema_name": "public",
    "enum_name": "rescue_medication_enum",
    "sort_order": 6,
    "label": "OTHER"
  },
  {
    "schema_name": "public",
    "enum_name": "research_data_type_enum",
    "sort_order": 1,
    "label": "seizure_data"
  },
  {
    "schema_name": "public",
    "enum_name": "research_data_type_enum",
    "sort_order": 2,
    "label": "medication_data"
  },
  {
    "schema_name": "public",
    "enum_name": "research_data_type_enum",
    "sort_order": 3,
    "label": "symptom_data"
  },
  {
    "schema_name": "public",
    "enum_name": "research_data_type_enum",
    "sort_order": 4,
    "label": "menstrual_data"
  },
  {
    "schema_name": "public",
    "enum_name": "research_data_type_enum",
    "sort_order": 5,
    "label": "wearable_data"
  },
  {
    "schema_name": "public",
    "enum_name": "research_data_type_enum",
    "sort_order": 6,
    "label": "genetic_data"
  },
  {
    "schema_name": "public",
    "enum_name": "research_data_type_enum",
    "sort_order": 7,
    "label": "imaging_data"
  },
  {
    "schema_name": "public",
    "enum_name": "research_data_type_enum",
    "sort_order": 8,
    "label": "location_data"
  },
  {
    "schema_name": "public",
    "enum_name": "research_data_type_enum",
    "sort_order": 9,
    "label": "demographic_data"
  },
  {
    "schema_name": "public",
    "enum_name": "research_data_type_enum",
    "sort_order": 10,
    "label": "all_data"
  },
  {
    "schema_name": "public",
    "enum_name": "seizure_sign_enum",
    "sort_order": 1,
    "label": "EPIGASTRIC_AURA"
  },
  {
    "schema_name": "public",
    "enum_name": "seizure_sign_enum",
    "sort_order": 2,
    "label": "OLFACTORY_AURA"
  },
  {
    "schema_name": "public",
    "enum_name": "seizure_sign_enum",
    "sort_order": 3,
    "label": "GUSTATORY_AURA"
  },
  {
    "schema_name": "public",
    "enum_name": "seizure_sign_enum",
    "sort_order": 4,
    "label": "VISUAL_AURA"
  },
  {
    "schema_name": "public",
    "enum_name": "seizure_sign_enum",
    "sort_order": 5,
    "label": "AUDITORY_AURA"
  },
  {
    "schema_name": "public",
    "enum_name": "seizure_sign_enum",
    "sort_order": 6,
    "label": "SOMATOSENSORY_AURA"
  },
  {
    "schema_name": "public",
    "enum_name": "seizure_sign_enum",
    "sort_order": 7,
    "label": "FEAR_ANXIETY_AURA"
  },
  {
    "schema_name": "public",
    "enum_name": "seizure_sign_enum",
    "sort_order": 8,
    "label": "DEJA_VU"
  },
  {
    "schema_name": "public",
    "enum_name": "seizure_sign_enum",
    "sort_order": 9,
    "label": "JAMAIS_VU"
  },
  {
    "schema_name": "public",
    "enum_name": "seizure_sign_enum",
    "sort_order": 10,
    "label": "AUTOMATISMS_ORAL"
  },
  {
    "schema_name": "public",
    "enum_name": "seizure_sign_enum",
    "sort_order": 11,
    "label": "AUTOMATISMS_MANUAL"
  },
  {
    "schema_name": "public",
    "enum_name": "seizure_sign_enum",
    "sort_order": 12,
    "label": "TONIC_ACTIVITY"
  },
  {
    "schema_name": "public",
    "enum_name": "seizure_sign_enum",
    "sort_order": 13,
    "label": "CLONIC_ACTIVITY"
  },
  {
    "schema_name": "public",
    "enum_name": "seizure_sign_enum",
    "sort_order": 14,
    "label": "MYOCLONIC_JERKS"
  },
  {
    "schema_name": "public",
    "enum_name": "seizure_sign_enum",
    "sort_order": 15,
    "label": "ATONIC_DROP"
  },
  {
    "schema_name": "public",
    "enum_name": "seizure_sign_enum",
    "sort_order": 16,
    "label": "HEAD_VERSION"
  },
  {
    "schema_name": "public",
    "enum_name": "seizure_sign_enum",
    "sort_order": 17,
    "label": "EYE_DEVIATION"
  },
  {
    "schema_name": "public",
    "enum_name": "seizure_sign_enum",
    "sort_order": 18,
    "label": "DYSTONIC_POSTURING"
  },
  {
    "schema_name": "public",
    "enum_name": "seizure_sign_enum",
    "sort_order": 19,
    "label": "HYPERMOTOR_ACTIVITY"
  },
  {
    "schema_name": "public",
    "enum_name": "seizure_sign_enum",
    "sort_order": 20,
    "label": "MIMETIC_AUTOMATISMS"
  },
  {
    "schema_name": "public",
    "enum_name": "seizure_sign_enum",
    "sort_order": 21,
    "label": "GELASTIC"
  },
  {
    "schema_name": "public",
    "enum_name": "seizure_sign_enum",
    "sort_order": 22,
    "label": "DACRYSTIC"
  },
  {
    "schema_name": "public",
    "enum_name": "seizure_sign_enum",
    "sort_order": 23,
    "label": "VOCALIZATION"
  },
  {
    "schema_name": "public",
    "enum_name": "seizure_sign_enum",
    "sort_order": 24,
    "label": "SPEECH_ARREST"
  },
  {
    "schema_name": "public",
    "enum_name": "seizure_sign_enum",
    "sort_order": 25,
    "label": "LOSS_OF_AWARENESS"
  },
  {
    "schema_name": "public",
    "enum_name": "seizure_sign_enum",
    "sort_order": 26,
    "label": "STARING"
  },
  {
    "schema_name": "public",
    "enum_name": "seizure_sign_enum",
    "sort_order": 27,
    "label": "BEHAVIORAL_ARREST"
  },
  {
    "schema_name": "public",
    "enum_name": "seizure_sign_enum",
    "sort_order": 28,
    "label": "AUTONOMIC_FEATURES"
  },
  {
    "schema_name": "public",
    "enum_name": "seizure_sign_enum",
    "sort_order": 29,
    "label": "PALLOR"
  },
  {
    "schema_name": "public",
    "enum_name": "seizure_sign_enum",
    "sort_order": 30,
    "label": "FLUSHING"
  },
  {
    "schema_name": "public",
    "enum_name": "seizure_sign_enum",
    "sort_order": 31,
    "label": "SWEATING"
  },
  {
    "schema_name": "public",
    "enum_name": "seizure_sign_enum",
    "sort_order": 32,
    "label": "PILOERECTION"
  },
  {
    "schema_name": "public",
    "enum_name": "seizure_sign_enum",
    "sort_order": 33,
    "label": "HEART_RATE_CHANGE"
  },
  {
    "schema_name": "public",
    "enum_name": "seizure_sign_enum",
    "sort_order": 34,
    "label": "BREATHING_CHANGE"
  },
  {
    "schema_name": "public",
    "enum_name": "seizure_sign_enum",
    "sort_order": 35,
    "label": "INCONTINENCE"
  },
  {
    "schema_name": "public",
    "enum_name": "seizure_sign_enum",
    "sort_order": 36,
    "label": "TONGUE_BITING"
  },
  {
    "schema_name": "public",
    "enum_name": "seizure_type_enum",
    "sort_order": 1,
    "label": "FOCAL_AWARE"
  },
  {
    "schema_name": "public",
    "enum_name": "seizure_type_enum",
    "sort_order": 2,
    "label": "FOCAL_IMPAIRED"
  },
  {
    "schema_name": "public",
    "enum_name": "seizure_type_enum",
    "sort_order": 3,
    "label": "FOCAL_TO_BILATERAL_TONIC_CLONIC"
  },
  {
    "schema_name": "public",
    "enum_name": "seizure_type_enum",
    "sort_order": 4,
    "label": "GENERALIZED_TONIC_CLONIC"
  },
  {
    "schema_name": "public",
    "enum_name": "seizure_type_enum",
    "sort_order": 5,
    "label": "GENERALIZED_ABSENCE"
  },
  {
    "schema_name": "public",
    "enum_name": "seizure_type_enum",
    "sort_order": 6,
    "label": "GENERALIZED_MYOCLONIC"
  },
  {
    "schema_name": "public",
    "enum_name": "seizure_type_enum",
    "sort_order": 7,
    "label": "GENERALIZED_ATONIC"
  },
  {
    "schema_name": "public",
    "enum_name": "seizure_type_enum",
    "sort_order": 8,
    "label": "GENERALIZED_TONIC"
  },
  {
    "schema_name": "public",
    "enum_name": "seizure_type_enum",
    "sort_order": 9,
    "label": "GENERALIZED_CLONIC"
  },
  {
    "schema_name": "public",
    "enum_name": "seizure_type_enum",
    "sort_order": 10,
    "label": "UNKNOWN"
  },
  {
    "schema_name": "public",
    "enum_name": "semiology_category_enum",
    "sort_order": 1,
    "label": "AURA"
  },
  {
    "schema_name": "public",
    "enum_name": "semiology_category_enum",
    "sort_order": 2,
    "label": "MOTOR"
  },
  {
    "schema_name": "public",
    "enum_name": "semiology_category_enum",
    "sort_order": 3,
    "label": "AUTONOMIC"
  },
  {
    "schema_name": "public",
    "enum_name": "semiology_category_enum",
    "sort_order": 4,
    "label": "CONSCIOUSNESS"
  },
  {
    "schema_name": "public",
    "enum_name": "semiology_category_enum",
    "sort_order": 5,
    "label": "BEHAVIORAL"
  },
  {
    "schema_name": "public",
    "enum_name": "semiology_category_enum",
    "sort_order": 6,
    "label": "SENSORY"
  },
  {
    "schema_name": "public",
    "enum_name": "stress_level_enum",
    "sort_order": 1,
    "label": "1"
  },
  {
    "schema_name": "public",
    "enum_name": "stress_level_enum",
    "sort_order": 2,
    "label": "2"
  },
  {
    "schema_name": "public",
    "enum_name": "stress_level_enum",
    "sort_order": 3,
    "label": "3"
  },
  {
    "schema_name": "public",
    "enum_name": "stress_level_enum",
    "sort_order": 4,
    "label": "4"
  },
  {
    "schema_name": "public",
    "enum_name": "stress_level_enum",
    "sort_order": 5,
    "label": "5"
  },
  {
    "schema_name": "public",
    "enum_name": "stress_level_enum",
    "sort_order": 6,
    "label": "6"
  },
  {
    "schema_name": "public",
    "enum_name": "stress_level_enum",
    "sort_order": 7,
    "label": "7"
  },
  {
    "schema_name": "public",
    "enum_name": "stress_level_enum",
    "sort_order": 8,
    "label": "8"
  },
  {
    "schema_name": "public",
    "enum_name": "stress_level_enum",
    "sort_order": 9,
    "label": "9"
  },
  {
    "schema_name": "public",
    "enum_name": "stress_level_enum",
    "sort_order": 10,
    "label": "10"
  },
  {
    "schema_name": "public",
    "enum_name": "tracking_feature_enum",
    "sort_order": 1,
    "label": "seizure"
  },
  {
    "schema_name": "public",
    "enum_name": "tracking_feature_enum",
    "sort_order": 2,
    "label": "tremor"
  },
  {
    "schema_name": "public",
    "enum_name": "tracking_feature_enum",
    "sort_order": 3,
    "label": "gait"
  },
  {
    "schema_name": "public",
    "enum_name": "tracking_feature_enum",
    "sort_order": 4,
    "label": "menstruation"
  },
  {
    "schema_name": "public",
    "enum_name": "tracking_feature_enum",
    "sort_order": 5,
    "label": "temperature"
  },
  {
    "schema_name": "public",
    "enum_name": "tracking_feature_enum",
    "sort_order": 6,
    "label": "mood"
  },
  {
    "schema_name": "public",
    "enum_name": "tracking_feature_enum",
    "sort_order": 7,
    "label": "energy"
  },
  {
    "schema_name": "public",
    "enum_name": "tracking_feature_enum",
    "sort_order": 8,
    "label": "sleep"
  },
  {
    "schema_name": "public",
    "enum_name": "tracking_feature_enum",
    "sort_order": 9,
    "label": "symptoms"
  },
  {
    "schema_name": "public",
    "enum_name": "tracking_feature_enum",
    "sort_order": 10,
    "label": "medication"
  },
  {
    "schema_name": "public",
    "enum_name": "tracking_feature_enum",
    "sort_order": 11,
    "label": "heart_rate"
  },
  {
    "schema_name": "public",
    "enum_name": "tracking_feature_enum",
    "sort_order": 12,
    "label": "blood_pressure"
  },
  {
    "schema_name": "public",
    "enum_name": "tracking_feature_enum",
    "sort_order": 13,
    "label": "weight"
  },
  {
    "schema_name": "public",
    "enum_name": "tracking_feature_enum",
    "sort_order": 14,
    "label": "exercise"
  },
  {
    "schema_name": "public",
    "enum_name": "trigger_strength_enum",
    "sort_order": 1,
    "label": "NONE"
  },
  {
    "schema_name": "public",
    "enum_name": "trigger_strength_enum",
    "sort_order": 2,
    "label": "WEAK"
  },
  {
    "schema_name": "public",
    "enum_name": "trigger_strength_enum",
    "sort_order": 3,
    "label": "MODERATE"
  },
  {
    "schema_name": "public",
    "enum_name": "trigger_strength_enum",
    "sort_order": 4,
    "label": "STRONG"
  },
  {
    "schema_name": "public",
    "enum_name": "trigger_type_enum",
    "sort_order": 1,
    "label": "SLEEP_DEPRIVATION"
  },
  {
    "schema_name": "public",
    "enum_name": "trigger_type_enum",
    "sort_order": 2,
    "label": "FEVER"
  },
  {
    "schema_name": "public",
    "enum_name": "trigger_type_enum",
    "sort_order": 3,
    "label": "ALCOHOL"
  },
  {
    "schema_name": "public",
    "enum_name": "trigger_type_enum",
    "sort_order": 4,
    "label": "MEDICATION_MISSED"
  },
  {
    "schema_name": "public",
    "enum_name": "trigger_type_enum",
    "sort_order": 5,
    "label": "EMOTIONAL_STRESS"
  },
  {
    "schema_name": "public",
    "enum_name": "trigger_type_enum",
    "sort_order": 6,
    "label": "PHYSICAL_STRESS"
  },
  {
    "schema_name": "public",
    "enum_name": "trigger_type_enum",
    "sort_order": 7,
    "label": "FLASHING_LIGHTS"
  },
  {
    "schema_name": "public",
    "enum_name": "trigger_type_enum",
    "sort_order": 8,
    "label": "MENSTRUATION"
  },
  {
    "schema_name": "public",
    "enum_name": "trigger_type_enum",
    "sort_order": 9,
    "label": "ILLNESS"
  },
  {
    "schema_name": "public",
    "enum_name": "trigger_type_enum",
    "sort_order": 10,
    "label": "UNKNOWN"
  },
  {
    "schema_name": "public",
    "enum_name": "user_type_enum",
    "sort_order": 1,
    "label": "patient"
  },
  {
    "schema_name": "public",
    "enum_name": "user_type_enum",
    "sort_order": 2,
    "label": "carer"
  },
  {
    "schema_name": "public",
    "enum_name": "user_type_enum",
    "sort_order": 3,
    "label": "clinician"
  },
  {
    "schema_name": "public",
    "enum_name": "user_type_enum",
    "sort_order": 4,
    "label": "researcher"
  },
  {
    "schema_name": "public",
    "enum_name": "user_type_enum",
    "sort_order": 5,
    "label": "admin"
  },
  {
    "schema_name": "public",
    "enum_name": "witness_role_enum",
    "sort_order": 1,
    "label": "SELF"
  },
  {
    "schema_name": "public",
    "enum_name": "witness_role_enum",
    "sort_order": 2,
    "label": "FAMILY"
  },
  {
    "schema_name": "public",
    "enum_name": "witness_role_enum",
    "sort_order": 3,
    "label": "FRIEND"
  },
  {
    "schema_name": "public",
    "enum_name": "witness_role_enum",
    "sort_order": 4,
    "label": "CLINICIAN"
  },
  {
    "schema_name": "public",
    "enum_name": "witness_role_enum",
    "sort_order": 5,
    "label": "CARER"
  },
  {
    "schema_name": "public",
    "enum_name": "witness_role_enum",
    "sort_order": 6,
    "label": "STRANGER"
  },
  {
    "schema_name": "public",
    "enum_name": "witness_role_enum",
    "sort_order": 7,
    "label": "UNKNOWN"
  },
  {
    "schema_name": "public",
    "enum_name": "yes_no_enum",
    "sort_order": 1,
    "label": "YES"
  },
  {
    "schema_name": "public",
    "enum_name": "yes_no_enum",
    "sort_order": 2,
    "label": "NO"
  },
  {
    "schema_name": "realtime",
    "enum_name": "action",
    "sort_order": 1,
    "label": "INSERT"
  },
  {
    "schema_name": "realtime",
    "enum_name": "action",
    "sort_order": 2,
    "label": "UPDATE"
  },
  {
    "schema_name": "realtime",
    "enum_name": "action",
    "sort_order": 3,
    "label": "DELETE"
  },
  {
    "schema_name": "realtime",
    "enum_name": "action",
    "sort_order": 4,
    "label": "TRUNCATE"
  },
  {
    "schema_name": "realtime",
    "enum_name": "action",
    "sort_order": 5,
    "label": "ERROR"
  },
  {
    "schema_name": "realtime",
    "enum_name": "equality_op",
    "sort_order": 1,
    "label": "eq"
  },
  {
    "schema_name": "realtime",
    "enum_name": "equality_op",
    "sort_order": 2,
    "label": "neq"
  },
  {
    "schema_name": "realtime",
    "enum_name": "equality_op",
    "sort_order": 3,
    "label": "lt"
  },
  {
    "schema_name": "realtime",
    "enum_name": "equality_op",
    "sort_order": 4,
    "label": "lte"
  },
  {
    "schema_name": "realtime",
    "enum_name": "equality_op",
    "sort_order": 5,
    "label": "gt"
  },
  {
    "schema_name": "realtime",
    "enum_name": "equality_op",
    "sort_order": 6,
    "label": "gte"
  },
  {
    "schema_name": "realtime",
    "enum_name": "equality_op",
    "sort_order": 7,
    "label": "in"
  },
  {
    "schema_name": "storage",
    "enum_name": "buckettype",
    "sort_order": 1,
    "label": "STANDARD"
  },
  {
    "schema_name": "storage",
    "enum_name": "buckettype",
    "sort_order": 2,
    "label": "ANALYTICS"
  }
]
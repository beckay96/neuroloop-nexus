[
  {
    "schema": "clinical",
    "table_name": "ai_insights_cards",
    "column_position": 1,
    "column_name": "insight_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "clinical",
    "table_name": "ai_insights_cards",
    "column_position": 2,
    "column_name": "clinician_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "ai_insights_cards",
    "column_position": 3,
    "column_name": "title",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "ai_insights_cards",
    "column_position": 4,
    "column_name": "content",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "ai_insights_cards",
    "column_position": 5,
    "column_name": "insight_type",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "ai_insights_cards",
    "column_position": 6,
    "column_name": "impact_metric",
    "data_type": "pg_catalog.jsonb",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "ai_insights_cards",
    "column_position": 7,
    "column_name": "ai_model_version",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "ai_insights_cards",
    "column_position": 8,
    "column_name": "confidence_score",
    "data_type": "pg_catalog.numeric",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "ai_insights_cards",
    "column_position": 9,
    "column_name": "is_read",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "false"
  },
  {
    "schema": "clinical",
    "table_name": "ai_insights_cards",
    "column_position": 10,
    "column_name": "is_dismissed",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "false"
  },
  {
    "schema": "clinical",
    "table_name": "ai_insights_cards",
    "column_position": 11,
    "column_name": "is_pinned",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "false"
  },
  {
    "schema": "clinical",
    "table_name": "ai_insights_cards",
    "column_position": 12,
    "column_name": "has_action",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "false"
  },
  {
    "schema": "clinical",
    "table_name": "ai_insights_cards",
    "column_position": 13,
    "column_name": "action_url",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "ai_insights_cards",
    "column_position": 14,
    "column_name": "action_taken",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "false"
  },
  {
    "schema": "clinical",
    "table_name": "ai_insights_cards",
    "column_position": 15,
    "column_name": "generated_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "NO",
    "column_default": "now()"
  },
  {
    "schema": "clinical",
    "table_name": "ai_insights_cards",
    "column_position": 16,
    "column_name": "read_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "ai_insights_cards",
    "column_position": 17,
    "column_name": "dismissed_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "ai_insights_cards",
    "column_position": 18,
    "column_name": "snomed_ct_code",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "ai_insights_cards",
    "column_position": 19,
    "column_name": "icd10_code",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "ai_insights_cards",
    "column_position": 20,
    "column_name": "data_origin",
    "data_type": "public.data_origin_enum",
    "is_nullable": "YES",
    "column_default": "'AI_generated'::data_origin_enum"
  },
  {
    "schema": "clinical",
    "table_name": "case_data_panels",
    "column_position": 1,
    "column_name": "panel_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "clinical",
    "table_name": "case_data_panels",
    "column_position": 2,
    "column_name": "patient_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "case_data_panels",
    "column_position": 3,
    "column_name": "panel_type",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "case_data_panels",
    "column_position": 4,
    "column_name": "custom_panel_name",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "case_data_panels",
    "column_position": 5,
    "column_name": "title",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "case_data_panels",
    "column_position": 6,
    "column_name": "content",
    "data_type": "pg_catalog.jsonb",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "case_data_panels",
    "column_position": 7,
    "column_name": "display_order",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": "0"
  },
  {
    "schema": "clinical",
    "table_name": "case_data_panels",
    "column_position": 8,
    "column_name": "is_visible",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "true"
  },
  {
    "schema": "clinical",
    "table_name": "case_data_panels",
    "column_position": 9,
    "column_name": "is_collapsed",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "false"
  },
  {
    "schema": "clinical",
    "table_name": "case_data_panels",
    "column_position": 10,
    "column_name": "priority_score",
    "data_type": "pg_catalog.numeric",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "case_data_panels",
    "column_position": 11,
    "column_name": "added_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "NO",
    "column_default": "now()"
  },
  {
    "schema": "clinical",
    "table_name": "case_data_panels",
    "column_position": 12,
    "column_name": "added_by",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "case_data_panels",
    "column_position": 13,
    "column_name": "updated_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "clinical",
    "table_name": "case_data_panels",
    "column_position": 14,
    "column_name": "snomed_ct_code",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "case_data_panels",
    "column_position": 15,
    "column_name": "icd10_code",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "clinical_notes_exports",
    "column_position": 1,
    "column_name": "note_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "clinical",
    "table_name": "clinical_notes_exports",
    "column_position": 2,
    "column_name": "patient_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "clinical_notes_exports",
    "column_position": 3,
    "column_name": "note_type",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "clinical_notes_exports",
    "column_position": 4,
    "column_name": "content",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "clinical_notes_exports",
    "column_position": 5,
    "column_name": "format",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "clinical_notes_exports",
    "column_position": 6,
    "column_name": "file_path",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "clinical_notes_exports",
    "column_position": 7,
    "column_name": "status",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": "'draft'::text"
  },
  {
    "schema": "clinical",
    "table_name": "clinical_notes_exports",
    "column_position": 8,
    "column_name": "author_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "clinical_notes_exports",
    "column_position": 9,
    "column_name": "signed_by",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "clinical_notes_exports",
    "column_position": 10,
    "column_name": "signed_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "clinical_notes_exports",
    "column_position": 11,
    "column_name": "digital_signature",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "clinical_notes_exports",
    "column_position": 12,
    "column_name": "shared_with",
    "data_type": "pg_catalog._uuid[]",
    "is_nullable": "YES",
    "column_default": "ARRAY[]::uuid[]"
  },
  {
    "schema": "clinical",
    "table_name": "clinical_notes_exports",
    "column_position": 13,
    "column_name": "shared_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "clinical_notes_exports",
    "column_position": 14,
    "column_name": "visit_date",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "clinical_notes_exports",
    "column_position": 15,
    "column_name": "generated_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "NO",
    "column_default": "now()"
  },
  {
    "schema": "clinical",
    "table_name": "clinical_notes_exports",
    "column_position": 16,
    "column_name": "updated_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "clinical",
    "table_name": "clinical_notes_exports",
    "column_position": 17,
    "column_name": "snomed_ct_code",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "clinical_notes_exports",
    "column_position": 18,
    "column_name": "icd10_code",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "clinical_notes_exports",
    "column_position": 19,
    "column_name": "last_modified_by",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "clinical_notes_exports",
    "column_position": 20,
    "column_name": "modification_reason",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "clinical_scale_results",
    "column_position": 1,
    "column_name": "scale_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "clinical",
    "table_name": "clinical_scale_results",
    "column_position": 2,
    "column_name": "patient_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "clinical_scale_results",
    "column_position": 3,
    "column_name": "scale_type",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "clinical_scale_results",
    "column_position": 4,
    "column_name": "scale_version",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "clinical_scale_results",
    "column_position": 5,
    "column_name": "total_score",
    "data_type": "pg_catalog.numeric",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "clinical_scale_results",
    "column_position": 6,
    "column_name": "subscale_scores",
    "data_type": "pg_catalog.jsonb",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "clinical_scale_results",
    "column_position": 7,
    "column_name": "assessed_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "clinical_scale_results",
    "column_position": 8,
    "column_name": "due_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "clinical_scale_results",
    "column_position": 9,
    "column_name": "change_from_baseline",
    "data_type": "pg_catalog.numeric",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "clinical_scale_results",
    "column_position": 10,
    "column_name": "change_alert",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "false"
  },
  {
    "schema": "clinical",
    "table_name": "clinical_scale_results",
    "column_position": 11,
    "column_name": "is_significant_change",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "false"
  },
  {
    "schema": "clinical",
    "table_name": "clinical_scale_results",
    "column_position": 12,
    "column_name": "trend",
    "data_type": "pg_catalog.jsonb",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "clinical_scale_results",
    "column_position": 13,
    "column_name": "assessed_by",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "clinical_scale_results",
    "column_position": 14,
    "column_name": "assessment_notes",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "clinical_scale_results",
    "column_position": 15,
    "column_name": "patient_condition",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "clinical_scale_results",
    "column_position": 16,
    "column_name": "entered_by",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "clinical_scale_results",
    "column_position": 17,
    "column_name": "entered_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "clinical",
    "table_name": "clinical_scale_results",
    "column_position": 18,
    "column_name": "updated_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "clinical",
    "table_name": "clinical_scale_results",
    "column_position": 19,
    "column_name": "snomed_ct_code",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "clinical_scale_results",
    "column_position": 20,
    "column_name": "icd10_code",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "clinical_scale_results",
    "column_position": 21,
    "column_name": "data_origin",
    "data_type": "public.data_origin_enum",
    "is_nullable": "YES",
    "column_default": "'manual_entry'::data_origin_enum"
  },
  {
    "schema": "clinical",
    "table_name": "clinical_scale_results",
    "column_position": 22,
    "column_name": "reporter_type",
    "data_type": "public.reporter_type_enum",
    "is_nullable": "YES",
    "column_default": "'clinician'::reporter_type_enum"
  },
  {
    "schema": "clinical",
    "table_name": "clinical_scale_results",
    "column_position": 23,
    "column_name": "last_modified_by",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "clinical_scale_results",
    "column_position": 24,
    "column_name": "modification_reason",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "clinical_scale_subscore_results",
    "column_position": 1,
    "column_name": "subscore_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "clinical",
    "table_name": "clinical_scale_subscore_results",
    "column_position": 2,
    "column_name": "scale_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "clinical_scale_subscore_results",
    "column_position": 3,
    "column_name": "subscale_label",
    "data_type": "clinical.subscale_label_enum",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "clinical_scale_subscore_results",
    "column_position": 4,
    "column_name": "score",
    "data_type": "pg_catalog.numeric",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "clinical_scale_subscore_results",
    "column_position": 5,
    "column_name": "max_score",
    "data_type": "pg_catalog.numeric",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "clinical_scale_subscore_results",
    "column_position": 6,
    "column_name": "score_interpretation",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "clinical_scale_subscore_results",
    "column_position": 7,
    "column_name": "created_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "clinical",
    "table_name": "clinician_today_view",
    "column_position": 1,
    "column_name": "view_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "clinical",
    "table_name": "clinician_today_view",
    "column_position": 2,
    "column_name": "clinician_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "clinician_today_view",
    "column_position": 3,
    "column_name": "date",
    "data_type": "pg_catalog.date",
    "is_nullable": "NO",
    "column_default": "CURRENT_DATE"
  },
  {
    "schema": "clinical",
    "table_name": "clinician_today_view",
    "column_position": 4,
    "column_name": "appointments",
    "data_type": "pg_catalog.jsonb",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "clinician_today_view",
    "column_position": 5,
    "column_name": "alerts",
    "data_type": "pg_catalog.jsonb",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "clinician_today_view",
    "column_position": 6,
    "column_name": "high_priority_patients",
    "data_type": "pg_catalog.jsonb",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "clinician_today_view",
    "column_position": 7,
    "column_name": "pending_tasks",
    "data_type": "pg_catalog.jsonb",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "clinician_today_view",
    "column_position": 8,
    "column_name": "layout_config",
    "data_type": "pg_catalog.jsonb",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "clinician_today_view",
    "column_position": 9,
    "column_name": "widget_order",
    "data_type": "pg_catalog._int4[]",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "clinician_today_view",
    "column_position": 10,
    "column_name": "last_refreshed",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "clinical",
    "table_name": "clinician_today_view",
    "column_position": 11,
    "column_name": "created_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "clinical",
    "table_name": "clinician_today_view",
    "column_position": 12,
    "column_name": "updated_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "clinical",
    "table_name": "imaging_annotations",
    "column_position": 1,
    "column_name": "annotation_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "clinical",
    "table_name": "imaging_annotations",
    "column_position": 2,
    "column_name": "image_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "imaging_annotations",
    "column_position": 3,
    "column_name": "annotation_type",
    "data_type": "clinical.annotation_type_enum",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "imaging_annotations",
    "column_position": 4,
    "column_name": "coordinates",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "imaging_annotations",
    "column_position": 5,
    "column_name": "ai_flagged",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "false"
  },
  {
    "schema": "clinical",
    "table_name": "imaging_annotations",
    "column_position": 6,
    "column_name": "ai_confidence",
    "data_type": "pg_catalog.numeric",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "imaging_annotations",
    "column_position": 7,
    "column_name": "snomed_ct_code",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "imaging_annotations",
    "column_position": 8,
    "column_name": "icd10_code",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "imaging_annotations",
    "column_position": 9,
    "column_name": "notes",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "imaging_annotations",
    "column_position": 10,
    "column_name": "validated_by",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "imaging_annotations",
    "column_position": 11,
    "column_name": "validation_status",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "imaging_annotations",
    "column_position": 12,
    "column_name": "created_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "clinical",
    "table_name": "imaging_annotations",
    "column_position": 13,
    "column_name": "updated_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "clinical",
    "table_name": "neuro_imaging_results",
    "column_position": 1,
    "column_name": "image_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "clinical",
    "table_name": "neuro_imaging_results",
    "column_position": 2,
    "column_name": "patient_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "neuro_imaging_results",
    "column_position": 3,
    "column_name": "study_type",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "neuro_imaging_results",
    "column_position": 4,
    "column_name": "study_protocol",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "neuro_imaging_results",
    "column_position": 5,
    "column_name": "modality_details",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "neuro_imaging_results",
    "column_position": 6,
    "column_name": "image_path",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "neuro_imaging_results",
    "column_position": 7,
    "column_name": "dicom_uid",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "neuro_imaging_results",
    "column_position": 8,
    "column_name": "file_size_mb",
    "data_type": "pg_catalog.numeric",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "neuro_imaging_results",
    "column_position": 9,
    "column_name": "findings_summary",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "neuro_imaging_results",
    "column_position": 10,
    "column_name": "impression",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "neuro_imaging_results",
    "column_position": 11,
    "column_name": "annotations",
    "data_type": "pg_catalog.jsonb",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "neuro_imaging_results",
    "column_position": 12,
    "column_name": "critical_findings",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "false"
  },
  {
    "schema": "clinical",
    "table_name": "neuro_imaging_results",
    "column_position": 13,
    "column_name": "study_date",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "neuro_imaging_results",
    "column_position": 14,
    "column_name": "radiologist",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "neuro_imaging_results",
    "column_position": 15,
    "column_name": "ordering_physician",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "neuro_imaging_results",
    "column_position": 16,
    "column_name": "ai_processed",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "false"
  },
  {
    "schema": "clinical",
    "table_name": "neuro_imaging_results",
    "column_position": 17,
    "column_name": "ai_findings",
    "data_type": "pg_catalog.jsonb",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "neuro_imaging_results",
    "column_position": 18,
    "column_name": "uploaded_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "clinical",
    "table_name": "neuro_imaging_results",
    "column_position": 19,
    "column_name": "uploaded_by",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "neuro_imaging_results",
    "column_position": 20,
    "column_name": "updated_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "clinical",
    "table_name": "neuro_imaging_results",
    "column_position": 21,
    "column_name": "snomed_ct_code",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "neuro_imaging_results",
    "column_position": 22,
    "column_name": "icd10_code",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "neuro_imaging_results",
    "column_position": 23,
    "column_name": "study_condition_code",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "patient_collab_chat",
    "column_position": 1,
    "column_name": "message_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "clinical",
    "table_name": "patient_collab_chat",
    "column_position": 2,
    "column_name": "patient_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "patient_collab_chat",
    "column_position": 3,
    "column_name": "sender_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "patient_collab_chat",
    "column_position": 4,
    "column_name": "message",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "patient_collab_chat",
    "column_position": 5,
    "column_name": "thread_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "patient_collab_chat",
    "column_position": 6,
    "column_name": "parent_message_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "patient_collab_chat",
    "column_position": 7,
    "column_name": "attachments",
    "data_type": "pg_catalog.jsonb",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "patient_collab_chat",
    "column_position": 8,
    "column_name": "is_urgent",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "false"
  },
  {
    "schema": "clinical",
    "table_name": "patient_collab_chat",
    "column_position": 9,
    "column_name": "requires_response",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "false"
  },
  {
    "schema": "clinical",
    "table_name": "patient_collab_chat",
    "column_position": 10,
    "column_name": "is_read",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "false"
  },
  {
    "schema": "clinical",
    "table_name": "patient_collab_chat",
    "column_position": 11,
    "column_name": "read_by",
    "data_type": "pg_catalog._uuid[]",
    "is_nullable": "YES",
    "column_default": "ARRAY[]::uuid[]"
  },
  {
    "schema": "clinical",
    "table_name": "patient_collab_chat",
    "column_position": 12,
    "column_name": "read_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "patient_collab_chat",
    "column_position": 13,
    "column_name": "mentioned_users",
    "data_type": "pg_catalog._uuid[]",
    "is_nullable": "YES",
    "column_default": "ARRAY[]::uuid[]"
  },
  {
    "schema": "clinical",
    "table_name": "patient_collab_chat",
    "column_position": 14,
    "column_name": "sent_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "NO",
    "column_default": "now()"
  },
  {
    "schema": "clinical",
    "table_name": "patient_collab_chat",
    "column_position": 15,
    "column_name": "edited_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "patient_collab_chat",
    "column_position": 16,
    "column_name": "deleted_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "patient_pro_timeline",
    "column_position": 1,
    "column_name": "pro_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "clinical",
    "table_name": "patient_pro_timeline",
    "column_position": 2,
    "column_name": "patient_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "patient_pro_timeline",
    "column_position": 3,
    "column_name": "pro_type",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "patient_pro_timeline",
    "column_position": 4,
    "column_name": "custom_type_name",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "patient_pro_timeline",
    "column_position": 5,
    "column_name": "value",
    "data_type": "pg_catalog.numeric",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "patient_pro_timeline",
    "column_position": 6,
    "column_name": "value_unit",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "patient_pro_timeline",
    "column_position": 7,
    "column_name": "value_json",
    "data_type": "pg_catalog.jsonb",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "patient_pro_timeline",
    "column_position": 8,
    "column_name": "reported_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "NO",
    "column_default": "now()"
  },
  {
    "schema": "clinical",
    "table_name": "patient_pro_timeline",
    "column_position": 9,
    "column_name": "collection_method",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "patient_pro_timeline",
    "column_position": 10,
    "column_name": "linked_intervention",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "patient_pro_timeline",
    "column_position": 11,
    "column_name": "intervention_notes",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "patient_pro_timeline",
    "column_position": 12,
    "column_name": "is_validated",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "false"
  },
  {
    "schema": "clinical",
    "table_name": "patient_pro_timeline",
    "column_position": 13,
    "column_name": "validated_by",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "patient_pro_timeline",
    "column_position": 14,
    "column_name": "validation_notes",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "patient_pro_timeline",
    "column_position": 15,
    "column_name": "created_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "clinical",
    "table_name": "patient_pro_timeline",
    "column_position": 16,
    "column_name": "updated_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "clinical",
    "table_name": "patient_pro_timeline",
    "column_position": 17,
    "column_name": "snomed_ct_code",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "patient_pro_timeline",
    "column_position": 18,
    "column_name": "icd10_code",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "patient_pro_timeline",
    "column_position": 19,
    "column_name": "data_origin",
    "data_type": "public.data_origin_enum",
    "is_nullable": "YES",
    "column_default": "'manual_entry'::data_origin_enum"
  },
  {
    "schema": "clinical",
    "table_name": "patient_pro_timeline",
    "column_position": 20,
    "column_name": "reporter_type",
    "data_type": "public.reporter_type_enum",
    "is_nullable": "YES",
    "column_default": "'self'::reporter_type_enum"
  },
  {
    "schema": "clinical",
    "table_name": "patient_pro_value",
    "column_position": 1,
    "column_name": "value_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "clinical",
    "table_name": "patient_pro_value",
    "column_position": 2,
    "column_name": "pro_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "patient_pro_value",
    "column_position": 3,
    "column_name": "domain_label",
    "data_type": "clinical.pro_domain_label_enum",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "patient_pro_value",
    "column_position": 4,
    "column_name": "value",
    "data_type": "pg_catalog.numeric",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "patient_pro_value",
    "column_position": 5,
    "column_name": "value_unit",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "patient_pro_value",
    "column_position": 6,
    "column_name": "snomed_ct_code",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "patient_pro_value",
    "column_position": 7,
    "column_name": "icd10_code",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "patient_pro_value",
    "column_position": 8,
    "column_name": "collected_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "clinical",
    "table_name": "patient_risk_alerts",
    "column_position": 1,
    "column_name": "alert_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "clinical",
    "table_name": "patient_risk_alerts",
    "column_position": 2,
    "column_name": "patient_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "patient_risk_alerts",
    "column_position": 3,
    "column_name": "risk_type",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "patient_risk_alerts",
    "column_position": 4,
    "column_name": "alert_level",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": "'moderate'::text"
  },
  {
    "schema": "clinical",
    "table_name": "patient_risk_alerts",
    "column_position": 5,
    "column_name": "score",
    "data_type": "pg_catalog.numeric",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "patient_risk_alerts",
    "column_position": 6,
    "column_name": "reason",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "patient_risk_alerts",
    "column_position": 7,
    "column_name": "context_data",
    "data_type": "pg_catalog.jsonb",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "patient_risk_alerts",
    "column_position": 8,
    "column_name": "status",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": "'unread'::text"
  },
  {
    "schema": "clinical",
    "table_name": "patient_risk_alerts",
    "column_position": 9,
    "column_name": "acknowledged_by",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "patient_risk_alerts",
    "column_position": 10,
    "column_name": "acknowledged_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "patient_risk_alerts",
    "column_position": 11,
    "column_name": "resolved_by",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "patient_risk_alerts",
    "column_position": 12,
    "column_name": "resolved_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "patient_risk_alerts",
    "column_position": 13,
    "column_name": "resolution_notes",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "patient_risk_alerts",
    "column_position": 14,
    "column_name": "created_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "NO",
    "column_default": "now()"
  },
  {
    "schema": "clinical",
    "table_name": "patient_risk_alerts",
    "column_position": 15,
    "column_name": "updated_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "clinical",
    "table_name": "patient_risk_alerts",
    "column_position": 16,
    "column_name": "snomed_ct_code",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "patient_risk_alerts",
    "column_position": 17,
    "column_name": "icd10_code",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "patient_snapshots",
    "column_position": 1,
    "column_name": "snapshot_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "clinical",
    "table_name": "patient_snapshots",
    "column_position": 2,
    "column_name": "patient_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "patient_snapshots",
    "column_position": 3,
    "column_name": "summary",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "patient_snapshots",
    "column_position": 4,
    "column_name": "highlight_events",
    "data_type": "pg_catalog.jsonb",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "patient_snapshots",
    "column_position": 5,
    "column_name": "key_metrics",
    "data_type": "pg_catalog.jsonb",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "patient_snapshots",
    "column_position": 6,
    "column_name": "author",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "patient_snapshots",
    "column_position": 7,
    "column_name": "author_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "patient_snapshots",
    "column_position": 8,
    "column_name": "ai_model_version",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "patient_snapshots",
    "column_position": 9,
    "column_name": "period_start",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "patient_snapshots",
    "column_position": 10,
    "column_name": "period_end",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "patient_snapshots",
    "column_position": 11,
    "column_name": "is_pinned",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "false"
  },
  {
    "schema": "clinical",
    "table_name": "patient_snapshots",
    "column_position": 12,
    "column_name": "is_archived",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "false"
  },
  {
    "schema": "clinical",
    "table_name": "patient_snapshots",
    "column_position": 13,
    "column_name": "generated_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "NO",
    "column_default": "now()"
  },
  {
    "schema": "clinical",
    "table_name": "patient_snapshots",
    "column_position": 14,
    "column_name": "reviewed_by",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "clinical",
    "table_name": "patient_snapshots",
    "column_position": 15,
    "column_name": "reviewed_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "basal_temperature_logs",
    "column_position": 1,
    "column_name": "id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "private_health_info",
    "table_name": "basal_temperature_logs",
    "column_position": 2,
    "column_name": "user_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "basal_temperature_logs",
    "column_position": 3,
    "column_name": "log_date",
    "data_type": "pg_catalog.date",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "basal_temperature_logs",
    "column_position": 4,
    "column_name": "log_time",
    "data_type": "pg_catalog.time",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "basal_temperature_logs",
    "column_position": 5,
    "column_name": "temperature_celsius",
    "data_type": "pg_catalog.numeric",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "basal_temperature_logs",
    "column_position": 6,
    "column_name": "notes",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "basal_temperature_logs",
    "column_position": 7,
    "column_name": "created_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "private_health_info",
    "table_name": "clinical_media",
    "column_position": 1,
    "column_name": "media_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "private_health_info",
    "table_name": "clinical_media",
    "column_position": 2,
    "column_name": "patient_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "clinical_media",
    "column_position": 3,
    "column_name": "parent_type",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "clinical_media",
    "column_position": 4,
    "column_name": "parent_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "clinical_media",
    "column_position": 5,
    "column_name": "file_url",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "clinical_media",
    "column_position": 6,
    "column_name": "file_type",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "clinical_media",
    "column_position": 7,
    "column_name": "file_size_mb",
    "data_type": "pg_catalog.numeric",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "clinical_media",
    "column_position": 8,
    "column_name": "mime_type",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "clinical_media",
    "column_position": 9,
    "column_name": "thumbnail_url",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "clinical_media",
    "column_position": 10,
    "column_name": "duration_seconds",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "clinical_media",
    "column_position": 11,
    "column_name": "description",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "clinical_media",
    "column_position": 12,
    "column_name": "tags",
    "data_type": "pg_catalog.jsonb",
    "is_nullable": "YES",
    "column_default": "'[]'::jsonb"
  },
  {
    "schema": "private_health_info",
    "table_name": "clinical_media",
    "column_position": 13,
    "column_name": "storage_bucket",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": "'phi-bucket'::text"
  },
  {
    "schema": "private_health_info",
    "table_name": "clinical_media",
    "column_position": 14,
    "column_name": "storage_path",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "clinical_media",
    "column_position": 15,
    "column_name": "shared_with_clinician",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "true"
  },
  {
    "schema": "private_health_info",
    "table_name": "clinical_media",
    "column_position": 16,
    "column_name": "visible_to_researchers",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "false"
  },
  {
    "schema": "private_health_info",
    "table_name": "clinical_media",
    "column_position": 17,
    "column_name": "uploaded_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "private_health_info",
    "table_name": "clinical_media",
    "column_position": 18,
    "column_name": "uploaded_by",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "clinician_onboarding_data",
    "column_position": 1,
    "column_name": "id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "private_health_info",
    "table_name": "clinician_onboarding_data",
    "column_position": 2,
    "column_name": "user_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "clinician_onboarding_data",
    "column_position": 3,
    "column_name": "first_name",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "clinician_onboarding_data",
    "column_position": 4,
    "column_name": "middle_name",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "clinician_onboarding_data",
    "column_position": 5,
    "column_name": "last_name",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "clinician_onboarding_data",
    "column_position": 6,
    "column_name": "clinician_title",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "clinician_onboarding_data",
    "column_position": 7,
    "column_name": "specialty",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "clinician_onboarding_data",
    "column_position": 8,
    "column_name": "institution",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "clinician_onboarding_data",
    "column_position": 9,
    "column_name": "license_number",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "clinician_onboarding_data",
    "column_position": 10,
    "column_name": "patient_invite_emails",
    "data_type": "pg_catalog._text[]",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "clinician_onboarding_data",
    "column_position": 11,
    "column_name": "completed_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "clinician_onboarding_data",
    "column_position": 12,
    "column_name": "created_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "private_health_info",
    "table_name": "clinician_onboarding_data",
    "column_position": 13,
    "column_name": "updated_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "private_health_info",
    "table_name": "clinician_onboarding_data",
    "column_position": 14,
    "column_name": "onboarding_step",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": "0"
  },
  {
    "schema": "private_health_info",
    "table_name": "clinician_onboarding_data",
    "column_position": 15,
    "column_name": "last_updated_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "private_health_info",
    "table_name": "clinician_phi",
    "column_position": 1,
    "column_name": "id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "private_health_info",
    "table_name": "clinician_phi",
    "column_position": 2,
    "column_name": "user_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "clinician_phi",
    "column_position": 3,
    "column_name": "npi_number",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "clinician_phi",
    "column_position": 4,
    "column_name": "dea_number",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "clinician_phi",
    "column_position": 5,
    "column_name": "license_number",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "clinician_phi",
    "column_position": 6,
    "column_name": "license_state",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "clinician_phi",
    "column_position": 7,
    "column_name": "license_expiry",
    "data_type": "pg_catalog.date",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "clinician_phi",
    "column_position": 8,
    "column_name": "office_phone",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "clinician_phi",
    "column_position": 9,
    "column_name": "office_fax",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "clinician_phi",
    "column_position": 10,
    "column_name": "practice_address",
    "data_type": "pg_catalog.jsonb",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "clinician_phi",
    "column_position": 11,
    "column_name": "medical_degree",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "clinician_phi",
    "column_position": 12,
    "column_name": "board_certifications",
    "data_type": "pg_catalog._text[]",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "clinician_phi",
    "column_position": 13,
    "column_name": "created_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "private_health_info",
    "table_name": "clinician_phi",
    "column_position": 14,
    "column_name": "updated_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "private_health_info",
    "table_name": "daily_symptom_logs",
    "column_position": 1,
    "column_name": "log_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "private_health_info",
    "table_name": "daily_symptom_logs",
    "column_position": 2,
    "column_name": "patient_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "daily_symptom_logs",
    "column_position": 3,
    "column_name": "log_date",
    "data_type": "pg_catalog.date",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "daily_symptom_logs",
    "column_position": 4,
    "column_name": "overall_feeling",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "daily_symptom_logs",
    "column_position": 5,
    "column_name": "mood",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "daily_symptom_logs",
    "column_position": 6,
    "column_name": "energy_level",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "daily_symptom_logs",
    "column_position": 7,
    "column_name": "fatigue_level",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "daily_symptom_logs",
    "column_position": 8,
    "column_name": "pain_level",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "daily_symptom_logs",
    "column_position": 9,
    "column_name": "sleep_quality",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "daily_symptom_logs",
    "column_position": 10,
    "column_name": "sleep_hours",
    "data_type": "pg_catalog.numeric",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "daily_symptom_logs",
    "column_position": 11,
    "column_name": "sleep_disturbances",
    "data_type": "pg_catalog.jsonb",
    "is_nullable": "YES",
    "column_default": "'[]'::jsonb"
  },
  {
    "schema": "private_health_info",
    "table_name": "daily_symptom_logs",
    "column_position": 12,
    "column_name": "motor_fluctuations_occurred",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "daily_symptom_logs",
    "column_position": 13,
    "column_name": "on_time_hours",
    "data_type": "pg_catalog.numeric",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "daily_symptom_logs",
    "column_position": 14,
    "column_name": "off_time_hours",
    "data_type": "pg_catalog.numeric",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "daily_symptom_logs",
    "column_position": 15,
    "column_name": "dyskinesia_severity",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "daily_symptom_logs",
    "column_position": 16,
    "column_name": "stiffness_severity",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "daily_symptom_logs",
    "column_position": 17,
    "column_name": "slowness_severity",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "daily_symptom_logs",
    "column_position": 18,
    "column_name": "cognitive_issues",
    "data_type": "pg_catalog.jsonb",
    "is_nullable": "YES",
    "column_default": "'[]'::jsonb"
  },
  {
    "schema": "private_health_info",
    "table_name": "daily_symptom_logs",
    "column_position": 19,
    "column_name": "mood_issues",
    "data_type": "pg_catalog.jsonb",
    "is_nullable": "YES",
    "column_default": "'[]'::jsonb"
  },
  {
    "schema": "private_health_info",
    "table_name": "daily_symptom_logs",
    "column_position": 20,
    "column_name": "autonomic_symptoms",
    "data_type": "pg_catalog.jsonb",
    "is_nullable": "YES",
    "column_default": "'[]'::jsonb"
  },
  {
    "schema": "private_health_info",
    "table_name": "daily_symptom_logs",
    "column_position": 21,
    "column_name": "adl_independence_level",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "daily_symptom_logs",
    "column_position": 22,
    "column_name": "activities_difficult",
    "data_type": "pg_catalog.jsonb",
    "is_nullable": "YES",
    "column_default": "'[]'::jsonb"
  },
  {
    "schema": "private_health_info",
    "table_name": "daily_symptom_logs",
    "column_position": 23,
    "column_name": "all_medications_taken",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "true"
  },
  {
    "schema": "private_health_info",
    "table_name": "daily_symptom_logs",
    "column_position": 24,
    "column_name": "missed_doses",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "daily_symptom_logs",
    "column_position": 25,
    "column_name": "medication_side_effects",
    "data_type": "pg_catalog.jsonb",
    "is_nullable": "YES",
    "column_default": "'[]'::jsonb"
  },
  {
    "schema": "private_health_info",
    "table_name": "daily_symptom_logs",
    "column_position": 26,
    "column_name": "other_symptoms",
    "data_type": "pg_catalog.jsonb",
    "is_nullable": "YES",
    "column_default": "'[]'::jsonb"
  },
  {
    "schema": "private_health_info",
    "table_name": "daily_symptom_logs",
    "column_position": 27,
    "column_name": "symptom_notes",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "daily_symptom_logs",
    "column_position": 28,
    "column_name": "stress_level",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "daily_symptom_logs",
    "column_position": 29,
    "column_name": "exercise_minutes",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "daily_symptom_logs",
    "column_position": 30,
    "column_name": "notable_events",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "daily_symptom_logs",
    "column_position": 31,
    "column_name": "shared_with_clinician",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "true"
  },
  {
    "schema": "private_health_info",
    "table_name": "daily_symptom_logs",
    "column_position": 32,
    "column_name": "visible_to_researchers",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "false"
  },
  {
    "schema": "private_health_info",
    "table_name": "daily_symptom_logs",
    "column_position": 33,
    "column_name": "created_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "private_health_info",
    "table_name": "daily_symptom_logs",
    "column_position": 34,
    "column_name": "updated_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "private_health_info",
    "table_name": "gait_episodes",
    "column_position": 1,
    "column_name": "gait_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "private_health_info",
    "table_name": "gait_episodes",
    "column_position": 2,
    "column_name": "patient_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "gait_episodes",
    "column_position": 3,
    "column_name": "occurred_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "gait_episodes",
    "column_position": 4,
    "column_name": "duration_seconds",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "gait_episodes",
    "column_position": 5,
    "column_name": "event_type",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "gait_episodes",
    "column_position": 6,
    "column_name": "severity",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "gait_episodes",
    "column_position": 7,
    "column_name": "resulted_in_fall",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "false"
  },
  {
    "schema": "private_health_info",
    "table_name": "gait_episodes",
    "column_position": 8,
    "column_name": "fall_direction",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "gait_episodes",
    "column_position": 9,
    "column_name": "injury_occurred",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "false"
  },
  {
    "schema": "private_health_info",
    "table_name": "gait_episodes",
    "column_position": 10,
    "column_name": "injury_description",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "gait_episodes",
    "column_position": 11,
    "column_name": "required_assistance",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "false"
  },
  {
    "schema": "private_health_info",
    "table_name": "gait_episodes",
    "column_position": 12,
    "column_name": "location",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "gait_episodes",
    "column_position": 13,
    "column_name": "activity",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "gait_episodes",
    "column_position": 14,
    "column_name": "environmental_factors",
    "data_type": "pg_catalog.jsonb",
    "is_nullable": "YES",
    "column_default": "'[]'::jsonb"
  },
  {
    "schema": "private_health_info",
    "table_name": "gait_episodes",
    "column_position": 15,
    "column_name": "medication_status",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "gait_episodes",
    "column_position": 16,
    "column_name": "hours_since_medication",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "gait_episodes",
    "column_position": 17,
    "column_name": "freezing_trigger",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "gait_episodes",
    "column_position": 18,
    "column_name": "broke_freeze_with",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "gait_episodes",
    "column_position": 19,
    "column_name": "video_recorded",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "false"
  },
  {
    "schema": "private_health_info",
    "table_name": "gait_episodes",
    "column_position": 20,
    "column_name": "media_urls",
    "data_type": "pg_catalog.jsonb",
    "is_nullable": "YES",
    "column_default": "'[]'::jsonb"
  },
  {
    "schema": "private_health_info",
    "table_name": "gait_episodes",
    "column_position": 21,
    "column_name": "notes",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "gait_episodes",
    "column_position": 22,
    "column_name": "shared_with_clinician",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "true"
  },
  {
    "schema": "private_health_info",
    "table_name": "gait_episodes",
    "column_position": 23,
    "column_name": "visible_to_researchers",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "false"
  },
  {
    "schema": "private_health_info",
    "table_name": "gait_episodes",
    "column_position": 24,
    "column_name": "created_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "private_health_info",
    "table_name": "gait_episodes",
    "column_position": 25,
    "column_name": "updated_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "private_health_info",
    "table_name": "medication_logs",
    "column_position": 1,
    "column_name": "id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "private_health_info",
    "table_name": "medication_logs",
    "column_position": 2,
    "column_name": "user_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "medication_logs",
    "column_position": 3,
    "column_name": "user_medication_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "medication_logs",
    "column_position": 4,
    "column_name": "log_date",
    "data_type": "pg_catalog.date",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "medication_logs",
    "column_position": 5,
    "column_name": "log_time",
    "data_type": "pg_catalog.time",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "medication_logs",
    "column_position": 6,
    "column_name": "taken",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "false"
  },
  {
    "schema": "private_health_info",
    "table_name": "medication_logs",
    "column_position": 7,
    "column_name": "notes",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "medication_logs",
    "column_position": 8,
    "column_name": "created_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "private_health_info",
    "table_name": "menstrual_cycle_logs",
    "column_position": 1,
    "column_name": "id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "private_health_info",
    "table_name": "menstrual_cycle_logs",
    "column_position": 2,
    "column_name": "user_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "menstrual_cycle_logs",
    "column_position": 3,
    "column_name": "cycle_start_date",
    "data_type": "pg_catalog.date",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "menstrual_cycle_logs",
    "column_position": 4,
    "column_name": "cycle_end_date",
    "data_type": "pg_catalog.date",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "menstrual_cycle_logs",
    "column_position": 5,
    "column_name": "cycle_length_days",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "menstrual_cycle_logs",
    "column_position": 6,
    "column_name": "flow_intensity",
    "data_type": "public.flow_intensity_enum",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "menstrual_cycle_logs",
    "column_position": 7,
    "column_name": "cycle_phase",
    "data_type": "public.cycle_phase_enum",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "menstrual_cycle_logs",
    "column_position": 8,
    "column_name": "overall_symptom_severity",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "menstrual_cycle_logs",
    "column_position": 9,
    "column_name": "seizure_count_during_cycle",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": "0"
  },
  {
    "schema": "private_health_info",
    "table_name": "menstrual_cycle_logs",
    "column_position": 10,
    "column_name": "seizure_clustered_around_menstruation",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "false"
  },
  {
    "schema": "private_health_info",
    "table_name": "menstrual_cycle_logs",
    "column_position": 11,
    "column_name": "catamenial_pattern_suspected",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "false"
  },
  {
    "schema": "private_health_info",
    "table_name": "menstrual_cycle_logs",
    "column_position": 12,
    "column_name": "notes",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "menstrual_cycle_logs",
    "column_position": 13,
    "column_name": "created_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "NO",
    "column_default": "now()"
  },
  {
    "schema": "private_health_info",
    "table_name": "menstrual_cycle_logs",
    "column_position": 14,
    "column_name": "updated_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "NO",
    "column_default": "now()"
  },
  {
    "schema": "private_health_info",
    "table_name": "menstrual_log_symptoms",
    "column_position": 1,
    "column_name": "id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "private_health_info",
    "table_name": "menstrual_log_symptoms",
    "column_position": 2,
    "column_name": "log_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "menstrual_log_symptoms",
    "column_position": 3,
    "column_name": "symptom_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "menstrual_log_symptoms",
    "column_position": 4,
    "column_name": "severity",
    "data_type": "public.menstrual_symptom_severity_enum",
    "is_nullable": "YES",
    "column_default": "'MODERATE'::menstrual_symptom_severity_enum"
  },
  {
    "schema": "private_health_info",
    "table_name": "menstrual_log_symptoms",
    "column_position": 5,
    "column_name": "created_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "NO",
    "column_default": "now()"
  },
  {
    "schema": "private_health_info",
    "table_name": "patient_diagnoses",
    "column_position": 1,
    "column_name": "diagnosis_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "private_health_info",
    "table_name": "patient_diagnoses",
    "column_position": 2,
    "column_name": "patient_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "patient_diagnoses",
    "column_position": 3,
    "column_name": "diagnosis_date",
    "data_type": "pg_catalog.date",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "patient_diagnoses",
    "column_position": 4,
    "column_name": "diagnosis_type",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "patient_diagnoses",
    "column_position": 5,
    "column_name": "diagnosis_subtype",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "patient_diagnoses",
    "column_position": 6,
    "column_name": "snomed_ct_code",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "patient_diagnoses",
    "column_position": 7,
    "column_name": "icd10_code",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "patient_diagnoses",
    "column_position": 8,
    "column_name": "confirmed_by_clinician",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "false"
  },
  {
    "schema": "private_health_info",
    "table_name": "patient_diagnoses",
    "column_position": 9,
    "column_name": "confirming_clinician_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "patient_diagnoses",
    "column_position": 10,
    "column_name": "notes",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "patient_diagnoses",
    "column_position": 11,
    "column_name": "created_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "private_health_info",
    "table_name": "patient_diagnoses",
    "column_position": 12,
    "column_name": "updated_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "private_health_info",
    "table_name": "patient_onboarding_data",
    "column_position": 1,
    "column_name": "id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "private_health_info",
    "table_name": "patient_onboarding_data",
    "column_position": 2,
    "column_name": "user_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "patient_onboarding_data",
    "column_position": 3,
    "column_name": "first_name",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "patient_onboarding_data",
    "column_position": 4,
    "column_name": "middle_name",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "patient_onboarding_data",
    "column_position": 5,
    "column_name": "last_name",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "patient_onboarding_data",
    "column_position": 6,
    "column_name": "date_of_birth",
    "data_type": "pg_catalog.date",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "patient_onboarding_data",
    "column_position": 7,
    "column_name": "gender",
    "data_type": "public.gender_enum",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "patient_onboarding_data",
    "column_position": 8,
    "column_name": "phone_number",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "patient_onboarding_data",
    "column_position": 9,
    "column_name": "emergency_contact_name",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "patient_onboarding_data",
    "column_position": 10,
    "column_name": "emergency_contact_phone",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "patient_onboarding_data",
    "column_position": 11,
    "column_name": "emergency_contact_relationship",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "patient_onboarding_data",
    "column_position": 12,
    "column_name": "selected_conditions",
    "data_type": "pg_catalog._uuid[]",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "patient_onboarding_data",
    "column_position": 13,
    "column_name": "track_menstrual_cycle",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "false"
  },
  {
    "schema": "private_health_info",
    "table_name": "patient_onboarding_data",
    "column_position": 14,
    "column_name": "share_research_data",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "false"
  },
  {
    "schema": "private_health_info",
    "table_name": "patient_onboarding_data",
    "column_position": 15,
    "column_name": "research_data_types",
    "data_type": "public._research_data_type_enum[]",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "patient_onboarding_data",
    "column_position": 16,
    "column_name": "completed_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "patient_onboarding_data",
    "column_position": 17,
    "column_name": "created_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "private_health_info",
    "table_name": "patient_onboarding_data",
    "column_position": 18,
    "column_name": "updated_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "private_health_info",
    "table_name": "patient_onboarding_data",
    "column_position": 19,
    "column_name": "onboarding_step",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": "0"
  },
  {
    "schema": "private_health_info",
    "table_name": "patient_onboarding_data",
    "column_position": 20,
    "column_name": "last_updated_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "private_health_info",
    "table_name": "patient_phi",
    "column_position": 1,
    "column_name": "id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "private_health_info",
    "table_name": "patient_phi",
    "column_position": 2,
    "column_name": "user_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "patient_phi",
    "column_position": 3,
    "column_name": "date_of_birth",
    "data_type": "pg_catalog.date",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "patient_phi",
    "column_position": 4,
    "column_name": "social_security_number_encrypted",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "patient_phi",
    "column_position": 5,
    "column_name": "medical_record_number",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "patient_phi",
    "column_position": 6,
    "column_name": "gender",
    "data_type": "public.gender_enum",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "patient_phi",
    "column_position": 7,
    "column_name": "ethnicity",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "patient_phi",
    "column_position": 8,
    "column_name": "race",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "patient_phi",
    "column_position": 9,
    "column_name": "primary_language",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": "'English'::text"
  },
  {
    "schema": "private_health_info",
    "table_name": "patient_phi",
    "column_position": 10,
    "column_name": "preferred_pronouns",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "patient_phi",
    "column_position": 11,
    "column_name": "home_address",
    "data_type": "pg_catalog.jsonb",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "patient_phi",
    "column_position": 12,
    "column_name": "phone_number",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "patient_phi",
    "column_position": 13,
    "column_name": "emergency_contact_name",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "patient_phi",
    "column_position": 14,
    "column_name": "emergency_contact_phone",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "patient_phi",
    "column_position": 15,
    "column_name": "emergency_contact_relationship",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "patient_phi",
    "column_position": 16,
    "column_name": "primary_diagnosis",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "patient_phi",
    "column_position": 17,
    "column_name": "diagnosis_date",
    "data_type": "pg_catalog.date",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "patient_phi",
    "column_position": 18,
    "column_name": "referring_physician",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "patient_phi",
    "column_position": 19,
    "column_name": "primary_care_physician",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "patient_phi",
    "column_position": 20,
    "column_name": "insurance_provider",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "patient_phi",
    "column_position": 21,
    "column_name": "insurance_member_id",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "patient_phi",
    "column_position": 22,
    "column_name": "timezone",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "patient_phi",
    "column_position": 23,
    "column_name": "created_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "private_health_info",
    "table_name": "patient_phi",
    "column_position": 24,
    "column_name": "updated_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "private_health_info",
    "table_name": "patient_phi",
    "column_position": 25,
    "column_name": "medicare_number_encrypted",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "patient_phi",
    "column_position": 26,
    "column_name": "medicare_irn",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "patient_phi",
    "column_position": 27,
    "column_name": "medicare_expiry",
    "data_type": "pg_catalog.date",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "patient_phi",
    "column_position": 28,
    "column_name": "dva_number_encrypted",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "patient_phi",
    "column_position": 29,
    "column_name": "private_health_insurer",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "patient_phi",
    "column_position": 30,
    "column_name": "private_health_member_id_encrypted",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "patient_phi",
    "column_position": 31,
    "column_name": "aadhaar_number_encrypted",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "patient_phi",
    "column_position": 32,
    "column_name": "pan_number_encrypted",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "patient_phi",
    "column_position": 33,
    "column_name": "ayushman_bharat_id_encrypted",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "patient_phi",
    "column_position": 34,
    "column_name": "country_code",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": "'AU'::text"
  },
  {
    "schema": "private_health_info",
    "table_name": "patient_phi",
    "column_position": 35,
    "column_name": "national_health_id_encrypted",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_events",
    "column_position": 1,
    "column_name": "event_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_events",
    "column_position": 2,
    "column_name": "patient_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_events",
    "column_position": 3,
    "column_name": "occurred_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_events",
    "column_position": 4,
    "column_name": "duration_seconds",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_events",
    "column_position": 5,
    "column_name": "seizure_type",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_events",
    "column_position": 6,
    "column_name": "seizure_subtype",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_events",
    "column_position": 7,
    "column_name": "severity",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_events",
    "column_position": 8,
    "column_name": "consciousness_level",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_events",
    "column_position": 9,
    "column_name": "had_aura",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "false"
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_events",
    "column_position": 10,
    "column_name": "aura_signs",
    "data_type": "pg_catalog.jsonb",
    "is_nullable": "YES",
    "column_default": "'[]'::jsonb"
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_events",
    "column_position": 11,
    "column_name": "aura_description",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_events",
    "column_position": 12,
    "column_name": "warning_time_seconds",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_events",
    "column_position": 13,
    "column_name": "possible_triggers",
    "data_type": "pg_catalog.jsonb",
    "is_nullable": "YES",
    "column_default": "'[]'::jsonb"
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_events",
    "column_position": 14,
    "column_name": "trigger_details",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_events",
    "column_position": 15,
    "column_name": "body_parts_affected",
    "data_type": "pg_catalog.jsonb",
    "is_nullable": "YES",
    "column_default": "'[]'::jsonb"
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_events",
    "column_position": 16,
    "column_name": "motor_symptoms",
    "data_type": "pg_catalog.jsonb",
    "is_nullable": "YES",
    "column_default": "'[]'::jsonb"
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_events",
    "column_position": 17,
    "column_name": "non_motor_symptoms",
    "data_type": "pg_catalog.jsonb",
    "is_nullable": "YES",
    "column_default": "'[]'::jsonb"
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_events",
    "column_position": 18,
    "column_name": "post_ictal_confusion",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "false"
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_events",
    "column_position": 19,
    "column_name": "post_ictal_effects",
    "data_type": "pg_catalog.jsonb",
    "is_nullable": "YES",
    "column_default": "'[]'::jsonb"
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_events",
    "column_position": 20,
    "column_name": "post_ictal_duration_minutes",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_events",
    "column_position": 21,
    "column_name": "injuries_occurred",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "false"
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_events",
    "column_position": 22,
    "column_name": "injury_types",
    "data_type": "pg_catalog.jsonb",
    "is_nullable": "YES",
    "column_default": "'[]'::jsonb"
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_events",
    "column_position": 23,
    "column_name": "injury_description",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_events",
    "column_position": 24,
    "column_name": "required_medical_attention",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "false"
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_events",
    "column_position": 25,
    "column_name": "location",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_events",
    "column_position": 26,
    "column_name": "activity_before",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_events",
    "column_position": 27,
    "column_name": "witnessed",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "false"
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_events",
    "column_position": 28,
    "column_name": "witness_name",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_events",
    "column_position": 29,
    "column_name": "witness_description",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_events",
    "column_position": 30,
    "column_name": "medication_taken_as_prescribed",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_events",
    "column_position": 31,
    "column_name": "hours_since_last_dose",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_events",
    "column_position": 32,
    "column_name": "recent_medication_changes",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "false"
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_events",
    "column_position": 33,
    "column_name": "fully_recovered",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "false"
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_events",
    "column_position": 34,
    "column_name": "recovery_time_minutes",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_events",
    "column_position": 35,
    "column_name": "video_recorded",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "false"
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_events",
    "column_position": 36,
    "column_name": "media_urls",
    "data_type": "pg_catalog.jsonb",
    "is_nullable": "YES",
    "column_default": "'[]'::jsonb"
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_events",
    "column_position": 37,
    "column_name": "notes",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_events",
    "column_position": 38,
    "column_name": "patient_concerns",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_events",
    "column_position": 39,
    "column_name": "shared_with_clinician",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "true"
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_events",
    "column_position": 40,
    "column_name": "shared_with_carers",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "true"
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_events",
    "column_position": 41,
    "column_name": "visible_to_researchers",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "false"
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_events",
    "column_position": 42,
    "column_name": "created_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_events",
    "column_position": 43,
    "column_name": "updated_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_events",
    "column_position": 44,
    "column_name": "synced_to_clinician_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_generalized_assessment",
    "column_position": 1,
    "column_name": "id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_generalized_assessment",
    "column_position": 2,
    "column_name": "log_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_generalized_assessment",
    "column_position": 3,
    "column_name": "assessment_type",
    "data_type": "public.assessment_type_enum",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_generalized_assessment",
    "column_position": 4,
    "column_name": "classifier_basis",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_generalized_assessment",
    "column_position": 5,
    "column_name": "confidence_score",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_generalized_assessment",
    "column_position": 6,
    "column_name": "created_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_log_brain_regions",
    "column_position": 1,
    "column_name": "id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_log_brain_regions",
    "column_position": 2,
    "column_name": "log_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_log_brain_regions",
    "column_position": 3,
    "column_name": "region_id",
    "data_type": "pg_catalog.int4",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_log_brain_regions",
    "column_position": 4,
    "column_name": "calculated_probability",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_log_brain_regions",
    "column_position": 5,
    "column_name": "probability_grade",
    "data_type": "public.probability_grade_enum",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_log_brain_regions",
    "column_position": 6,
    "column_name": "created_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_log_post_ictal_symptoms",
    "column_position": 1,
    "column_name": "id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_log_post_ictal_symptoms",
    "column_position": 2,
    "column_name": "log_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_log_post_ictal_symptoms",
    "column_position": 3,
    "column_name": "symptom",
    "data_type": "public.post_ictal_symptom_enum",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_log_post_ictal_symptoms",
    "column_position": 4,
    "column_name": "severity",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_log_post_ictal_symptoms",
    "column_position": 5,
    "column_name": "created_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_log_signs",
    "column_position": 1,
    "column_name": "id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_log_signs",
    "column_position": 2,
    "column_name": "log_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_log_signs",
    "column_position": 3,
    "column_name": "sign_id",
    "data_type": "pg_catalog.int4",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_log_signs",
    "column_position": 4,
    "column_name": "present",
    "data_type": "public.yes_no_enum",
    "is_nullable": "YES",
    "column_default": "'YES'::yes_no_enum"
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_log_signs",
    "column_position": 5,
    "column_name": "observer_rank",
    "data_type": "public.witness_role_enum",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_log_signs",
    "column_position": 6,
    "column_name": "created_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_log_triggers",
    "column_position": 1,
    "column_name": "id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_log_triggers",
    "column_position": 2,
    "column_name": "log_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_log_triggers",
    "column_position": 3,
    "column_name": "trigger_id",
    "data_type": "pg_catalog.int4",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_log_triggers",
    "column_position": 4,
    "column_name": "trigger_strength",
    "data_type": "public.trigger_strength_enum",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_log_triggers",
    "column_position": 5,
    "column_name": "created_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_logs",
    "column_position": 1,
    "column_name": "id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_logs",
    "column_position": 2,
    "column_name": "patient_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_logs",
    "column_position": 3,
    "column_name": "log_date",
    "data_type": "pg_catalog.date",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_logs",
    "column_position": 4,
    "column_name": "log_time",
    "data_type": "pg_catalog.time",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_logs",
    "column_position": 5,
    "column_name": "seizure_type",
    "data_type": "public.seizure_type_enum",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_logs",
    "column_position": 6,
    "column_name": "epilepsy_subtype",
    "data_type": "public.epilepsy_subtype_enum",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_logs",
    "column_position": 7,
    "column_name": "snomed_ct_code",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_logs",
    "column_position": 8,
    "column_name": "icd10_code",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_logs",
    "column_position": 9,
    "column_name": "context",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_logs",
    "column_position": 10,
    "column_name": "severity",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_logs",
    "column_position": 11,
    "column_name": "duration_seconds",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_logs",
    "column_position": 12,
    "column_name": "notes",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_logs",
    "column_position": 13,
    "column_name": "capture_method",
    "data_type": "public.capture_method_enum",
    "is_nullable": "YES",
    "column_default": "'manual'::capture_method_enum"
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_logs",
    "column_position": 14,
    "column_name": "reporter_type",
    "data_type": "public.reporter_type_enum",
    "is_nullable": "YES",
    "column_default": "'self'::reporter_type_enum"
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_logs",
    "column_position": 15,
    "column_name": "shared_with_clinician",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "true"
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_logs",
    "column_position": 16,
    "column_name": "visible_to_researchers",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "false"
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_logs",
    "column_position": 17,
    "column_name": "consent_status",
    "data_type": "public.consent_status_enum",
    "is_nullable": "YES",
    "column_default": "'granted'::consent_status_enum"
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_logs",
    "column_position": 18,
    "column_name": "created_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_logs_research",
    "column_position": 1,
    "column_name": "log_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_logs_research",
    "column_position": 2,
    "column_name": "user_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_logs_research",
    "column_position": 3,
    "column_name": "log_date",
    "data_type": "pg_catalog.date",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_logs_research",
    "column_position": 4,
    "column_name": "log_time",
    "data_type": "pg_catalog.time",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_logs_research",
    "column_position": 6,
    "column_name": "consciousness_level",
    "data_type": "public.consciousness_level_enum",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_logs_research",
    "column_position": 7,
    "column_name": "duration_seconds",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_logs_research",
    "column_position": 8,
    "column_name": "aura_present",
    "data_type": "public.yes_no_enum",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_logs_research",
    "column_position": 9,
    "column_name": "aura_description",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_logs_research",
    "column_position": 10,
    "column_name": "witnessed",
    "data_type": "public.yes_no_enum",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_logs_research",
    "column_position": 11,
    "column_name": "witness_role",
    "data_type": "public.witness_role_enum",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_logs_research",
    "column_position": 12,
    "column_name": "video_recorded",
    "data_type": "public.yes_no_enum",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_logs_research",
    "column_position": 13,
    "column_name": "location_type",
    "data_type": "public.location_type_enum",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_logs_research",
    "column_position": 14,
    "column_name": "post_ictal_confusion_minutes",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_logs_research",
    "column_position": 15,
    "column_name": "recovery_time_minutes",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_logs_research",
    "column_position": 16,
    "column_name": "sleep_hours_prior",
    "data_type": "pg_catalog.numeric",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_logs_research",
    "column_position": 17,
    "column_name": "medication_adherence_prior",
    "data_type": "public.medication_adherence_enum",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_logs_research",
    "column_position": 18,
    "column_name": "stress_level",
    "data_type": "public.stress_level_enum",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_logs_research",
    "column_position": 19,
    "column_name": "emergency_services_called",
    "data_type": "public.yes_no_enum",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_logs_research",
    "column_position": 20,
    "column_name": "rescue_medication_used",
    "data_type": "public.yes_no_enum",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_logs_research",
    "column_position": 21,
    "column_name": "rescue_medication_type",
    "data_type": "public.rescue_medication_enum",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_logs_research",
    "column_position": 22,
    "column_name": "hospitalized",
    "data_type": "public.yes_no_enum",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_logs_research",
    "column_position": 23,
    "column_name": "research_grade",
    "data_type": "public.yes_no_enum",
    "is_nullable": "YES",
    "column_default": "'YES'::yes_no_enum"
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_logs_research",
    "column_position": 24,
    "column_name": "notes",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_logs_research",
    "column_position": 25,
    "column_name": "created_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "private_health_info",
    "table_name": "seizure_logs_research",
    "column_position": 26,
    "column_name": "updated_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "private_health_info",
    "table_name": "tracking_entries",
    "column_position": 1,
    "column_name": "id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "private_health_info",
    "table_name": "tracking_entries",
    "column_position": 2,
    "column_name": "user_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "tracking_entries",
    "column_position": 3,
    "column_name": "tracking_type",
    "data_type": "public.tracking_feature_enum",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "tracking_entries",
    "column_position": 4,
    "column_name": "entry_date",
    "data_type": "pg_catalog.date",
    "is_nullable": "YES",
    "column_default": "CURRENT_DATE"
  },
  {
    "schema": "private_health_info",
    "table_name": "tracking_entries",
    "column_position": 5,
    "column_name": "value",
    "data_type": "pg_catalog.numeric",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "tracking_entries",
    "column_position": 6,
    "column_name": "severity",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "tracking_entries",
    "column_position": 7,
    "column_name": "notes",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "tracking_entries",
    "column_position": 8,
    "column_name": "metadata",
    "data_type": "pg_catalog.jsonb",
    "is_nullable": "YES",
    "column_default": "'{}'::jsonb"
  },
  {
    "schema": "private_health_info",
    "table_name": "tracking_entries",
    "column_position": 9,
    "column_name": "created_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "private_health_info",
    "table_name": "tracking_entries",
    "column_position": 10,
    "column_name": "updated_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "private_health_info",
    "table_name": "tremor_episodes",
    "column_position": 1,
    "column_name": "tremor_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "private_health_info",
    "table_name": "tremor_episodes",
    "column_position": 2,
    "column_name": "patient_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "tremor_episodes",
    "column_position": 3,
    "column_name": "occurred_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "tremor_episodes",
    "column_position": 4,
    "column_name": "duration_seconds",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "tremor_episodes",
    "column_position": 5,
    "column_name": "tremor_type",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "tremor_episodes",
    "column_position": 6,
    "column_name": "severity",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "tremor_episodes",
    "column_position": 7,
    "column_name": "frequency_hz",
    "data_type": "pg_catalog.numeric",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "tremor_episodes",
    "column_position": 8,
    "column_name": "body_regions",
    "data_type": "pg_catalog.jsonb",
    "is_nullable": "YES",
    "column_default": "'[]'::jsonb"
  },
  {
    "schema": "private_health_info",
    "table_name": "tremor_episodes",
    "column_position": 9,
    "column_name": "dominant_side",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "tremor_episodes",
    "column_position": 10,
    "column_name": "interfered_with_activities",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "false"
  },
  {
    "schema": "private_health_info",
    "table_name": "tremor_episodes",
    "column_position": 11,
    "column_name": "activities_affected",
    "data_type": "pg_catalog.jsonb",
    "is_nullable": "YES",
    "column_default": "'[]'::jsonb"
  },
  {
    "schema": "private_health_info",
    "table_name": "tremor_episodes",
    "column_position": 12,
    "column_name": "occurred_during",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "tremor_episodes",
    "column_position": 13,
    "column_name": "medication_status",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "tremor_episodes",
    "column_position": 14,
    "column_name": "hours_since_medication",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "tremor_episodes",
    "column_position": 15,
    "column_name": "possible_triggers",
    "data_type": "pg_catalog.jsonb",
    "is_nullable": "YES",
    "column_default": "'[]'::jsonb"
  },
  {
    "schema": "private_health_info",
    "table_name": "tremor_episodes",
    "column_position": 16,
    "column_name": "trigger_details",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "tremor_episodes",
    "column_position": 17,
    "column_name": "video_recorded",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "false"
  },
  {
    "schema": "private_health_info",
    "table_name": "tremor_episodes",
    "column_position": 18,
    "column_name": "media_urls",
    "data_type": "pg_catalog.jsonb",
    "is_nullable": "YES",
    "column_default": "'[]'::jsonb"
  },
  {
    "schema": "private_health_info",
    "table_name": "tremor_episodes",
    "column_position": 19,
    "column_name": "notes",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "tremor_episodes",
    "column_position": 20,
    "column_name": "shared_with_clinician",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "true"
  },
  {
    "schema": "private_health_info",
    "table_name": "tremor_episodes",
    "column_position": 21,
    "column_name": "visible_to_researchers",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "false"
  },
  {
    "schema": "private_health_info",
    "table_name": "tremor_episodes",
    "column_position": 22,
    "column_name": "created_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "private_health_info",
    "table_name": "tremor_episodes",
    "column_position": 23,
    "column_name": "updated_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "private_health_info",
    "table_name": "user_conditions",
    "column_position": 1,
    "column_name": "id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "private_health_info",
    "table_name": "user_conditions",
    "column_position": 2,
    "column_name": "user_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "user_conditions",
    "column_position": 3,
    "column_name": "condition_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "user_conditions",
    "column_position": 4,
    "column_name": "diagnosis_date",
    "data_type": "pg_catalog.date",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "user_conditions",
    "column_position": 5,
    "column_name": "severity",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "user_conditions",
    "column_position": 6,
    "column_name": "tracking_features_enabled",
    "data_type": "public._tracking_feature_enum[]",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "user_conditions",
    "column_position": 7,
    "column_name": "created_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "private_health_info",
    "table_name": "user_medications",
    "column_position": 1,
    "column_name": "id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "private_health_info",
    "table_name": "user_medications",
    "column_position": 2,
    "column_name": "user_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "user_medications",
    "column_position": 3,
    "column_name": "medication_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "user_medications",
    "column_position": 4,
    "column_name": "dosage_amount",
    "data_type": "pg_catalog.numeric",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "user_medications",
    "column_position": 5,
    "column_name": "dosage_unit",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "user_medications",
    "column_position": 6,
    "column_name": "frequency",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "user_medications",
    "column_position": 7,
    "column_name": "start_date",
    "data_type": "pg_catalog.date",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "user_medications",
    "column_position": 8,
    "column_name": "end_date",
    "data_type": "pg_catalog.date",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "user_medications",
    "column_position": 9,
    "column_name": "is_active",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "true"
  },
  {
    "schema": "private_health_info",
    "table_name": "user_medications",
    "column_position": 10,
    "column_name": "created_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "private_health_info",
    "table_name": "user_medications",
    "column_position": 11,
    "column_name": "medication_name",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "private_health_info",
    "table_name": "user_medications",
    "column_position": 12,
    "column_name": "times",
    "data_type": "pg_catalog._time[]",
    "is_nullable": "YES",
    "column_default": "ARRAY[]::time without time zone[]"
  },
  {
    "schema": "public",
    "table_name": "achievements",
    "column_position": 1,
    "column_name": "id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "public",
    "table_name": "achievements",
    "column_position": 2,
    "column_name": "name",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "achievements",
    "column_position": 3,
    "column_name": "description",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "achievements",
    "column_position": 4,
    "column_name": "icon",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "achievements",
    "column_position": 5,
    "column_name": "points",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": "0"
  },
  {
    "schema": "public",
    "table_name": "achievements",
    "column_position": 6,
    "column_name": "category",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "achievements",
    "column_position": 7,
    "column_name": "created_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "public",
    "table_name": "api_request_logs",
    "column_position": 1,
    "column_name": "id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "public",
    "table_name": "api_request_logs",
    "column_position": 2,
    "column_name": "endpoint",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "api_request_logs",
    "column_position": 3,
    "column_name": "method",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "api_request_logs",
    "column_position": 4,
    "column_name": "status_code",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "api_request_logs",
    "column_position": 5,
    "column_name": "user_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "api_request_logs",
    "column_position": 6,
    "column_name": "session_id",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "api_request_logs",
    "column_position": 7,
    "column_name": "ip_address",
    "data_type": "pg_catalog.inet",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "api_request_logs",
    "column_position": 8,
    "column_name": "user_agent",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "api_request_logs",
    "column_position": 9,
    "column_name": "request_time",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "NO",
    "column_default": "now()"
  },
  {
    "schema": "public",
    "table_name": "api_request_logs",
    "column_position": 10,
    "column_name": "response_time",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "api_request_logs",
    "column_position": 11,
    "column_name": "duration_ms",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "api_request_logs",
    "column_position": 12,
    "column_name": "error_message",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "api_request_logs",
    "column_position": 13,
    "column_name": "error_type",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "api_request_logs",
    "column_position": 14,
    "column_name": "rate_limit_remaining",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "api_request_logs",
    "column_position": 15,
    "column_name": "created_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "NO",
    "column_default": "now()"
  },
  {
    "schema": "public",
    "table_name": "audit_log",
    "column_position": 1,
    "column_name": "id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "public",
    "table_name": "audit_log",
    "column_position": 2,
    "column_name": "user_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "audit_log",
    "column_position": 3,
    "column_name": "action",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "audit_log",
    "column_position": 4,
    "column_name": "table_name",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "audit_log",
    "column_position": 5,
    "column_name": "record_id",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "audit_log",
    "column_position": 6,
    "column_name": "old_values",
    "data_type": "pg_catalog.jsonb",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "audit_log",
    "column_position": 7,
    "column_name": "new_values",
    "data_type": "pg_catalog.jsonb",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "audit_log",
    "column_position": 8,
    "column_name": "ip_address_hash",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "audit_log",
    "column_position": 9,
    "column_name": "created_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "public",
    "table_name": "brain_regions_reference",
    "column_position": 1,
    "column_name": "region_id",
    "data_type": "pg_catalog.int4",
    "is_nullable": "NO",
    "column_default": "nextval('brain_regions_reference_region_id_seq'::regclass)"
  },
  {
    "schema": "public",
    "table_name": "brain_regions_reference",
    "column_position": 2,
    "column_name": "lobe",
    "data_type": "public.brain_lobe_enum",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "brain_regions_reference",
    "column_position": 3,
    "column_name": "subregion",
    "data_type": "public.brain_subregion_enum",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "brain_regions_reference",
    "column_position": 4,
    "column_name": "laterality",
    "data_type": "public.laterality_enum",
    "is_nullable": "YES",
    "column_default": "'BILATERAL'::laterality_enum"
  },
  {
    "schema": "public",
    "table_name": "brain_regions_reference",
    "column_position": 5,
    "column_name": "display_name",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "brain_regions_reference",
    "column_position": 6,
    "column_name": "function_description",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "brain_regions_reference",
    "column_position": 7,
    "column_name": "created_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "public",
    "table_name": "carer_invitations",
    "column_position": 1,
    "column_name": "id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "public",
    "table_name": "carer_invitations",
    "column_position": 2,
    "column_name": "relationship_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "carer_invitations",
    "column_position": 3,
    "column_name": "patient_user_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "carer_invitations",
    "column_position": 4,
    "column_name": "carer_email",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "carer_invitations",
    "column_position": 5,
    "column_name": "carer_email_hash",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "carer_invitations",
    "column_position": 6,
    "column_name": "invitation_token",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": "encode(gen_random_bytes(32), 'hex'::text)"
  },
  {
    "schema": "public",
    "table_name": "carer_invitations",
    "column_position": 7,
    "column_name": "status",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": "'pending'::text"
  },
  {
    "schema": "public",
    "table_name": "carer_invitations",
    "column_position": 8,
    "column_name": "dob_verification_attempts",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": "0"
  },
  {
    "schema": "public",
    "table_name": "carer_invitations",
    "column_position": 9,
    "column_name": "max_dob_attempts",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": "3"
  },
  {
    "schema": "public",
    "table_name": "carer_invitations",
    "column_position": 10,
    "column_name": "last_verification_attempt",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "carer_invitations",
    "column_position": 11,
    "column_name": "invited_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "public",
    "table_name": "carer_invitations",
    "column_position": 12,
    "column_name": "expires_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "(now() + '30 days'::interval)"
  },
  {
    "schema": "public",
    "table_name": "carer_invitations",
    "column_position": 13,
    "column_name": "accepted_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "carer_invitations",
    "column_position": 14,
    "column_name": "cancelled_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "carer_invitations",
    "column_position": 15,
    "column_name": "carer_user_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "carer_invitations",
    "column_position": 16,
    "column_name": "created_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "public",
    "table_name": "carer_invitations",
    "column_position": 17,
    "column_name": "updated_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "public",
    "table_name": "carer_onboarding_data",
    "column_position": 1,
    "column_name": "id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "public",
    "table_name": "carer_onboarding_data",
    "column_position": 2,
    "column_name": "user_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "carer_onboarding_data",
    "column_position": 3,
    "column_name": "first_name",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "carer_onboarding_data",
    "column_position": 4,
    "column_name": "middle_name",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "carer_onboarding_data",
    "column_position": 5,
    "column_name": "last_name",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "carer_onboarding_data",
    "column_position": 6,
    "column_name": "completed_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "carer_onboarding_data",
    "column_position": 7,
    "column_name": "created_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "public",
    "table_name": "carer_onboarding_data",
    "column_position": 8,
    "column_name": "updated_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "public",
    "table_name": "carer_profiles",
    "column_position": 1,
    "column_name": "id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "public",
    "table_name": "carer_profiles",
    "column_position": 2,
    "column_name": "user_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "carer_profiles",
    "column_position": 3,
    "column_name": "preferred_contact_method",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": "'email'::text"
  },
  {
    "schema": "public",
    "table_name": "carer_profiles",
    "column_position": 4,
    "column_name": "availability_notes",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "carer_profiles",
    "column_position": 5,
    "column_name": "certifications",
    "data_type": "pg_catalog._text[]",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "carer_profiles",
    "column_position": 6,
    "column_name": "created_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "public",
    "table_name": "carer_profiles",
    "column_position": 7,
    "column_name": "updated_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "public",
    "table_name": "carer_profiles",
    "column_position": 8,
    "column_name": "first_name",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "carer_profiles",
    "column_position": 9,
    "column_name": "middle_name",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "carer_profiles",
    "column_position": 10,
    "column_name": "last_name",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "carer_profiles",
    "column_position": 11,
    "column_name": "date_of_birth",
    "data_type": "pg_catalog.date",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "carer_profiles",
    "column_position": 12,
    "column_name": "phone_number",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "carer_profiles",
    "column_position": 13,
    "column_name": "relationship_to_patient",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "carer_profiles",
    "column_position": 14,
    "column_name": "patient_dob_verification",
    "data_type": "pg_catalog.date",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "carer_relationships",
    "column_position": 1,
    "column_name": "id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "public",
    "table_name": "carer_relationships",
    "column_position": 2,
    "column_name": "patient_user_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "carer_relationships",
    "column_position": 3,
    "column_name": "carer_user_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "carer_relationships",
    "column_position": 4,
    "column_name": "relationship_type",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "carer_relationships",
    "column_position": 5,
    "column_name": "relationship_details",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "carer_relationships",
    "column_position": 6,
    "column_name": "status",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": "'pending'::text"
  },
  {
    "schema": "public",
    "table_name": "carer_relationships",
    "column_position": 7,
    "column_name": "can_view_health_data",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "true"
  },
  {
    "schema": "public",
    "table_name": "carer_relationships",
    "column_position": 8,
    "column_name": "can_receive_alerts",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "true"
  },
  {
    "schema": "public",
    "table_name": "carer_relationships",
    "column_position": 9,
    "column_name": "can_manage_appointments",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "false"
  },
  {
    "schema": "public",
    "table_name": "carer_relationships",
    "column_position": 10,
    "column_name": "invited_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "carer_relationships",
    "column_position": 11,
    "column_name": "approved_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "carer_relationships",
    "column_position": 12,
    "column_name": "terminated_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "carer_relationships",
    "column_position": 13,
    "column_name": "termination_reason",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "carer_relationships",
    "column_position": 14,
    "column_name": "created_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "NO",
    "column_default": "now()"
  },
  {
    "schema": "public",
    "table_name": "carer_relationships",
    "column_position": 15,
    "column_name": "updated_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "public",
    "table_name": "clinical_scales_library",
    "column_position": 1,
    "column_name": "scale_library_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "public",
    "table_name": "clinical_scales_library",
    "column_position": 2,
    "column_name": "scale_type",
    "data_type": "clinical.scale_type_enum",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "clinical_scales_library",
    "column_position": 3,
    "column_name": "full_name",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "clinical_scales_library",
    "column_position": 4,
    "column_name": "abbreviation",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "clinical_scales_library",
    "column_position": 5,
    "column_name": "description",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "clinical_scales_library",
    "column_position": 6,
    "column_name": "snomed_ct_code",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "clinical_scales_library",
    "column_position": 7,
    "column_name": "icd10_code",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "clinical_scales_library",
    "column_position": 8,
    "column_name": "typical_use_case",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "clinical_scales_library",
    "column_position": 9,
    "column_name": "min_score",
    "data_type": "pg_catalog.numeric",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "clinical_scales_library",
    "column_position": 10,
    "column_name": "max_score",
    "data_type": "pg_catalog.numeric",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "clinical_scales_library",
    "column_position": 11,
    "column_name": "scoring_interpretation",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "clinical_scales_library",
    "column_position": 12,
    "column_name": "available_versions",
    "data_type": "pg_catalog._text[]",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "clinical_scales_library",
    "column_position": 13,
    "column_name": "created_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "public",
    "table_name": "clinician_profiles",
    "column_position": 1,
    "column_name": "id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "public",
    "table_name": "clinician_profiles",
    "column_position": 2,
    "column_name": "user_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "clinician_profiles",
    "column_position": 3,
    "column_name": "specialty",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "clinician_profiles",
    "column_position": 4,
    "column_name": "sub_specialty",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "clinician_profiles",
    "column_position": 5,
    "column_name": "institution",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "clinician_profiles",
    "column_position": 6,
    "column_name": "department",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "clinician_profiles",
    "column_position": 7,
    "column_name": "years_in_practice",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "clinician_profiles",
    "column_position": 8,
    "column_name": "patient_capacity",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": "100"
  },
  {
    "schema": "public",
    "table_name": "clinician_profiles",
    "column_position": 9,
    "column_name": "accepting_new_patients",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "true"
  },
  {
    "schema": "public",
    "table_name": "clinician_profiles",
    "column_position": 10,
    "column_name": "preferred_communication",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": "'email'::text"
  },
  {
    "schema": "public",
    "table_name": "clinician_profiles",
    "column_position": 11,
    "column_name": "created_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "public",
    "table_name": "clinician_profiles",
    "column_position": 12,
    "column_name": "updated_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "public",
    "table_name": "clinician_profiles",
    "column_position": 13,
    "column_name": "first_name",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "clinician_profiles",
    "column_position": 14,
    "column_name": "middle_name",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "clinician_profiles",
    "column_position": 15,
    "column_name": "last_name",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "clinician_profiles",
    "column_position": 16,
    "column_name": "clinician_title",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "clinician_profiles",
    "column_position": 17,
    "column_name": "license_number",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "conditions",
    "column_position": 1,
    "column_name": "id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "public",
    "table_name": "conditions",
    "column_position": 2,
    "column_name": "name",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "conditions",
    "column_position": 3,
    "column_name": "category",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "conditions",
    "column_position": 4,
    "column_name": "description",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "conditions",
    "column_position": 5,
    "column_name": "snomed_code",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "conditions",
    "column_position": 6,
    "column_name": "icd10_code",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "conditions",
    "column_position": 7,
    "column_name": "tracking_features_array",
    "data_type": "public._tracking_feature_enum[]",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "conditions",
    "column_position": 8,
    "column_name": "created_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "public",
    "table_name": "custom_tracking_items",
    "column_position": 1,
    "column_name": "item_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "public",
    "table_name": "custom_tracking_items",
    "column_position": 2,
    "column_name": "user_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "custom_tracking_items",
    "column_position": 3,
    "column_name": "item_name",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "custom_tracking_items",
    "column_position": 4,
    "column_name": "item_type",
    "data_type": "public.custom_tracking_type_enum",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "custom_tracking_items",
    "column_position": 5,
    "column_name": "description",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "custom_tracking_items",
    "column_position": 6,
    "column_name": "min_value",
    "data_type": "pg_catalog.numeric",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "custom_tracking_items",
    "column_position": 7,
    "column_name": "max_value",
    "data_type": "pg_catalog.numeric",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "custom_tracking_items",
    "column_position": 8,
    "column_name": "unit",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "custom_tracking_items",
    "column_position": 9,
    "column_name": "icon",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "custom_tracking_items",
    "column_position": 10,
    "column_name": "color",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "custom_tracking_items",
    "column_position": 11,
    "column_name": "display_order",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": "0"
  },
  {
    "schema": "public",
    "table_name": "custom_tracking_items",
    "column_position": 12,
    "column_name": "is_active",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "true"
  },
  {
    "schema": "public",
    "table_name": "custom_tracking_items",
    "column_position": 13,
    "column_name": "created_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "public",
    "table_name": "custom_tracking_items",
    "column_position": 14,
    "column_name": "updated_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "public",
    "table_name": "custom_tracking_values",
    "column_position": 1,
    "column_name": "value_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "public",
    "table_name": "custom_tracking_values",
    "column_position": 2,
    "column_name": "item_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "custom_tracking_values",
    "column_position": 3,
    "column_name": "user_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "custom_tracking_values",
    "column_position": 4,
    "column_name": "numeric_value",
    "data_type": "pg_catalog.numeric",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "custom_tracking_values",
    "column_position": 5,
    "column_name": "text_value",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "custom_tracking_values",
    "column_position": 6,
    "column_name": "boolean_value",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "custom_tracking_values",
    "column_position": 7,
    "column_name": "logged_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "NO",
    "column_default": "now()"
  },
  {
    "schema": "public",
    "table_name": "custom_tracking_values",
    "column_position": 8,
    "column_name": "log_date",
    "data_type": "pg_catalog.date",
    "is_nullable": "NO",
    "column_default": "CURRENT_DATE"
  },
  {
    "schema": "public",
    "table_name": "custom_tracking_values",
    "column_position": 9,
    "column_name": "notes",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "custom_tracking_values",
    "column_position": 10,
    "column_name": "created_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "public",
    "table_name": "daily_tracking_preferences",
    "column_position": 1,
    "column_name": "id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "public",
    "table_name": "daily_tracking_preferences",
    "column_position": 2,
    "column_name": "user_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "daily_tracking_preferences",
    "column_position": 3,
    "column_name": "tracking_times",
    "data_type": "pg_catalog._time[]",
    "is_nullable": "YES",
    "column_default": "ARRAY[]::time without time zone[]"
  },
  {
    "schema": "public",
    "table_name": "daily_tracking_preferences",
    "column_position": 4,
    "column_name": "basal_temp_time",
    "data_type": "pg_catalog.time",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "daily_tracking_preferences",
    "column_position": 5,
    "column_name": "medication_times",
    "data_type": "pg_catalog._time[]",
    "is_nullable": "YES",
    "column_default": "ARRAY[]::time without time zone[]"
  },
  {
    "schema": "public",
    "table_name": "daily_tracking_preferences",
    "column_position": 7,
    "column_name": "created_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "public",
    "table_name": "daily_tracking_preferences",
    "column_position": 8,
    "column_name": "updated_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "public",
    "table_name": "data_sharing_preferences",
    "column_position": 1,
    "column_name": "id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "public",
    "table_name": "data_sharing_preferences",
    "column_position": 2,
    "column_name": "patient_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "data_sharing_preferences",
    "column_position": 3,
    "column_name": "default_share_with_clinicians",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "true"
  },
  {
    "schema": "public",
    "table_name": "data_sharing_preferences",
    "column_position": 4,
    "column_name": "default_share_with_carers",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "true"
  },
  {
    "schema": "public",
    "table_name": "data_sharing_preferences",
    "column_position": 5,
    "column_name": "default_share_with_researchers",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "false"
  },
  {
    "schema": "public",
    "table_name": "data_sharing_preferences",
    "column_position": 6,
    "column_name": "clinician_access_rules",
    "data_type": "pg_catalog.jsonb",
    "is_nullable": "YES",
    "column_default": "'[]'::jsonb"
  },
  {
    "schema": "public",
    "table_name": "data_sharing_preferences",
    "column_position": 7,
    "column_name": "carer_access_rules",
    "data_type": "pg_catalog.jsonb",
    "is_nullable": "YES",
    "column_default": "'[]'::jsonb"
  },
  {
    "schema": "public",
    "table_name": "data_sharing_preferences",
    "column_position": 8,
    "column_name": "research_seizure_data",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "false"
  },
  {
    "schema": "public",
    "table_name": "data_sharing_preferences",
    "column_position": 9,
    "column_name": "research_tremor_data",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "false"
  },
  {
    "schema": "public",
    "table_name": "data_sharing_preferences",
    "column_position": 10,
    "column_name": "research_gait_data",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "false"
  },
  {
    "schema": "public",
    "table_name": "data_sharing_preferences",
    "column_position": 11,
    "column_name": "research_medication_data",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "false"
  },
  {
    "schema": "public",
    "table_name": "data_sharing_preferences",
    "column_position": 12,
    "column_name": "research_symptom_data",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "false"
  },
  {
    "schema": "public",
    "table_name": "data_sharing_preferences",
    "column_position": 13,
    "column_name": "research_imaging_data",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "false"
  },
  {
    "schema": "public",
    "table_name": "data_sharing_preferences",
    "column_position": 14,
    "column_name": "research_demographic_data",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "false"
  },
  {
    "schema": "public",
    "table_name": "data_sharing_preferences",
    "column_position": 15,
    "column_name": "seizure_events_visibility",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": "'clinician_carer'::text"
  },
  {
    "schema": "public",
    "table_name": "data_sharing_preferences",
    "column_position": 16,
    "column_name": "tremor_episodes_visibility",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": "'clinician_carer'::text"
  },
  {
    "schema": "public",
    "table_name": "data_sharing_preferences",
    "column_position": 17,
    "column_name": "gait_episodes_visibility",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": "'clinician_carer'::text"
  },
  {
    "schema": "public",
    "table_name": "data_sharing_preferences",
    "column_position": 18,
    "column_name": "daily_logs_visibility",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": "'clinician_only'::text"
  },
  {
    "schema": "public",
    "table_name": "data_sharing_preferences",
    "column_position": 19,
    "column_name": "medications_visibility",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": "'clinician_carer'::text"
  },
  {
    "schema": "public",
    "table_name": "data_sharing_preferences",
    "column_position": 20,
    "column_name": "media_visibility",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": "'clinician_only'::text"
  },
  {
    "schema": "public",
    "table_name": "data_sharing_preferences",
    "column_position": 21,
    "column_name": "created_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "public",
    "table_name": "data_sharing_preferences",
    "column_position": 22,
    "column_name": "updated_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "public",
    "table_name": "database_operation_logs",
    "column_position": 1,
    "column_name": "id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "public",
    "table_name": "database_operation_logs",
    "column_position": 2,
    "column_name": "operation_type",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "database_operation_logs",
    "column_position": 3,
    "column_name": "table_schema",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "database_operation_logs",
    "column_position": 4,
    "column_name": "table_name",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "database_operation_logs",
    "column_position": 5,
    "column_name": "executed_by_user_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "database_operation_logs",
    "column_position": 6,
    "column_name": "executed_by_role",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "database_operation_logs",
    "column_position": 7,
    "column_name": "operation_detail",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "database_operation_logs",
    "column_position": 8,
    "column_name": "rows_affected",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "database_operation_logs",
    "column_position": 9,
    "column_name": "success",
    "data_type": "pg_catalog.bool",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "database_operation_logs",
    "column_position": 10,
    "column_name": "error_message",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "database_operation_logs",
    "column_position": 11,
    "column_name": "sql_state",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "database_operation_logs",
    "column_position": 12,
    "column_name": "executed_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "NO",
    "column_default": "now()"
  },
  {
    "schema": "public",
    "table_name": "database_operation_logs",
    "column_position": 13,
    "column_name": "session_id",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "database_operation_logs",
    "column_position": 14,
    "column_name": "created_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "NO",
    "column_default": "now()"
  },
  {
    "schema": "public",
    "table_name": "diagnoses_library",
    "column_position": 1,
    "column_name": "diagnosis_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "public",
    "table_name": "diagnoses_library",
    "column_position": 2,
    "column_name": "diagnosis_name",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "diagnoses_library",
    "column_position": 3,
    "column_name": "diagnosis_category",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "diagnoses_library",
    "column_position": 4,
    "column_name": "snomed_ct_code",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "diagnoses_library",
    "column_position": 5,
    "column_name": "icd10_code",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "diagnoses_library",
    "column_position": 6,
    "column_name": "description",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "diagnoses_library",
    "column_position": 7,
    "column_name": "typical_subtypes",
    "data_type": "pg_catalog._text[]",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "diagnoses_library",
    "column_position": 8,
    "column_name": "created_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "public",
    "table_name": "function_execution_logs",
    "column_position": 1,
    "column_name": "id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "public",
    "table_name": "function_execution_logs",
    "column_position": 2,
    "column_name": "function_name",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "function_execution_logs",
    "column_position": 3,
    "column_name": "execution_status",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "function_execution_logs",
    "column_position": 4,
    "column_name": "started_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "NO",
    "column_default": "now()"
  },
  {
    "schema": "public",
    "table_name": "function_execution_logs",
    "column_position": 5,
    "column_name": "completed_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "function_execution_logs",
    "column_position": 6,
    "column_name": "duration_ms",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "function_execution_logs",
    "column_position": 7,
    "column_name": "input_user_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "function_execution_logs",
    "column_position": 8,
    "column_name": "input_user_type",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "function_execution_logs",
    "column_position": 9,
    "column_name": "input_parameters",
    "data_type": "pg_catalog.jsonb",
    "is_nullable": "YES",
    "column_default": "'{}'::jsonb"
  },
  {
    "schema": "public",
    "table_name": "function_execution_logs",
    "column_position": 10,
    "column_name": "return_value",
    "data_type": "pg_catalog.jsonb",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "function_execution_logs",
    "column_position": 11,
    "column_name": "success",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "function_execution_logs",
    "column_position": 12,
    "column_name": "error_message",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "function_execution_logs",
    "column_position": 13,
    "column_name": "error_detail",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "function_execution_logs",
    "column_position": 14,
    "column_name": "error_hint",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "function_execution_logs",
    "column_position": 15,
    "column_name": "sql_state",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "function_execution_logs",
    "column_position": 16,
    "column_name": "session_id",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "function_execution_logs",
    "column_position": 17,
    "column_name": "triggered_by",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "function_execution_logs",
    "column_position": 18,
    "column_name": "created_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "NO",
    "column_default": "now()"
  },
  {
    "schema": "public",
    "table_name": "imaging_findings_library",
    "column_position": 1,
    "column_name": "finding_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "public",
    "table_name": "imaging_findings_library",
    "column_position": 2,
    "column_name": "finding_name",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "imaging_findings_library",
    "column_position": 3,
    "column_name": "annotation_type",
    "data_type": "clinical.annotation_type_enum",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "imaging_findings_library",
    "column_position": 4,
    "column_name": "snomed_ct_code",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "imaging_findings_library",
    "column_position": 5,
    "column_name": "icd10_code",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "imaging_findings_library",
    "column_position": 6,
    "column_name": "description",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "imaging_findings_library",
    "column_position": 7,
    "column_name": "typical_in_parkinsons",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "false"
  },
  {
    "schema": "public",
    "table_name": "imaging_findings_library",
    "column_position": 8,
    "column_name": "typical_in_epilepsy",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "false"
  },
  {
    "schema": "public",
    "table_name": "imaging_findings_library",
    "column_position": 9,
    "column_name": "clinical_significance",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "imaging_findings_library",
    "column_position": 10,
    "column_name": "search_keywords",
    "data_type": "pg_catalog._text[]",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "imaging_findings_library",
    "column_position": 11,
    "column_name": "created_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "public",
    "table_name": "medications",
    "column_position": 1,
    "column_name": "id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "public",
    "table_name": "medications",
    "column_position": 2,
    "column_name": "name",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "medications",
    "column_position": 3,
    "column_name": "generic_name",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "medications",
    "column_position": 4,
    "column_name": "category",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "medications",
    "column_position": 5,
    "column_name": "rxnorm_code",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "medications",
    "column_position": 6,
    "column_name": "atc_code",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "medications",
    "column_position": 7,
    "column_name": "common_dosages",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "medications",
    "column_position": 8,
    "column_name": "contraindications",
    "data_type": "pg_catalog._text[]",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "medications",
    "column_position": 9,
    "column_name": "created_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "public",
    "table_name": "menstrual_symptom_options",
    "column_position": 1,
    "column_name": "id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "public",
    "table_name": "menstrual_symptom_options",
    "column_position": 2,
    "column_name": "category",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "menstrual_symptom_options",
    "column_position": 3,
    "column_name": "symptom_name",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "menstrual_symptom_options",
    "column_position": 4,
    "column_name": "description",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "menstrual_symptom_options",
    "column_position": 5,
    "column_name": "display_order",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": "0"
  },
  {
    "schema": "public",
    "table_name": "menstrual_symptom_options",
    "column_position": 6,
    "column_name": "active",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "true"
  },
  {
    "schema": "public",
    "table_name": "menstrual_symptom_options",
    "column_position": 7,
    "column_name": "created_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "public",
    "table_name": "notification_history",
    "column_position": 1,
    "column_name": "id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "public",
    "table_name": "notification_history",
    "column_position": 2,
    "column_name": "user_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "notification_history",
    "column_position": 3,
    "column_name": "notification_type",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "notification_history",
    "column_position": 4,
    "column_name": "sent_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "notification_history",
    "column_position": 5,
    "column_name": "opened_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "notification_history",
    "column_position": 6,
    "column_name": "action_taken",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "false"
  },
  {
    "schema": "public",
    "table_name": "notification_history",
    "column_position": 7,
    "column_name": "created_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "public",
    "table_name": "notification_preferences",
    "column_position": 1,
    "column_name": "id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "public",
    "table_name": "notification_preferences",
    "column_position": 2,
    "column_name": "user_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "notification_preferences",
    "column_position": 3,
    "column_name": "push_enabled",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "true"
  },
  {
    "schema": "public",
    "table_name": "notification_preferences",
    "column_position": 4,
    "column_name": "email_enabled",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "false"
  },
  {
    "schema": "public",
    "table_name": "notification_preferences",
    "column_position": 5,
    "column_name": "medication_reminders",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "true"
  },
  {
    "schema": "public",
    "table_name": "notification_preferences",
    "column_position": 6,
    "column_name": "medication_reminder_minutes",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": "15"
  },
  {
    "schema": "public",
    "table_name": "notification_preferences",
    "column_position": 7,
    "column_name": "appointment_reminders",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "true"
  },
  {
    "schema": "public",
    "table_name": "notification_preferences",
    "column_position": 8,
    "column_name": "appointment_reminder_hours",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": "24"
  },
  {
    "schema": "public",
    "table_name": "notification_preferences",
    "column_position": 9,
    "column_name": "critical_alerts",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "true"
  },
  {
    "schema": "public",
    "table_name": "notification_preferences",
    "column_position": 10,
    "column_name": "pattern_alerts",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "true"
  },
  {
    "schema": "public",
    "table_name": "notification_preferences",
    "column_position": 11,
    "column_name": "achievement_notifications",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "true"
  },
  {
    "schema": "public",
    "table_name": "notification_preferences",
    "column_position": 12,
    "column_name": "message_notifications",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "true"
  },
  {
    "schema": "public",
    "table_name": "notification_preferences",
    "column_position": 13,
    "column_name": "direct_messages",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "true"
  },
  {
    "schema": "public",
    "table_name": "notification_preferences",
    "column_position": 14,
    "column_name": "daily_checkin_reminder",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "true"
  },
  {
    "schema": "public",
    "table_name": "notification_preferences",
    "column_position": 15,
    "column_name": "daily_checkin_time",
    "data_type": "pg_catalog.time",
    "is_nullable": "YES",
    "column_default": "'20:00:00'::time without time zone"
  },
  {
    "schema": "public",
    "table_name": "notification_preferences",
    "column_position": 16,
    "column_name": "quiet_hours_enabled",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "false"
  },
  {
    "schema": "public",
    "table_name": "notification_preferences",
    "column_position": 17,
    "column_name": "quiet_hours_start",
    "data_type": "pg_catalog.time",
    "is_nullable": "YES",
    "column_default": "'22:00:00'::time without time zone"
  },
  {
    "schema": "public",
    "table_name": "notification_preferences",
    "column_position": 18,
    "column_name": "quiet_hours_end",
    "data_type": "pg_catalog.time",
    "is_nullable": "YES",
    "column_default": "'08:00:00'::time without time zone"
  },
  {
    "schema": "public",
    "table_name": "notification_preferences",
    "column_position": 19,
    "column_name": "sound_enabled",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "true"
  },
  {
    "schema": "public",
    "table_name": "notification_preferences",
    "column_position": 20,
    "column_name": "vibration_enabled",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "true"
  },
  {
    "schema": "public",
    "table_name": "notification_preferences",
    "column_position": 21,
    "column_name": "created_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "public",
    "table_name": "notification_preferences",
    "column_position": 22,
    "column_name": "updated_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "public",
    "table_name": "notification_queue",
    "column_position": 1,
    "column_name": "id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "public",
    "table_name": "notification_queue",
    "column_position": 2,
    "column_name": "user_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "notification_queue",
    "column_position": 3,
    "column_name": "notification_type",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "notification_queue",
    "column_position": 4,
    "column_name": "title",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "notification_queue",
    "column_position": 5,
    "column_name": "body",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "notification_queue",
    "column_position": 6,
    "column_name": "action_url",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "notification_queue",
    "column_position": 7,
    "column_name": "reference_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "notification_queue",
    "column_position": 8,
    "column_name": "status",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": "'pending'::text"
  },
  {
    "schema": "public",
    "table_name": "notification_queue",
    "column_position": 9,
    "column_name": "scheduled_for",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "notification_queue",
    "column_position": 10,
    "column_name": "sent_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "notification_queue",
    "column_position": 11,
    "column_name": "priority",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": "'normal'::text"
  },
  {
    "schema": "public",
    "table_name": "notification_queue",
    "column_position": 12,
    "column_name": "created_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "public",
    "table_name": "notification_queue",
    "column_position": 13,
    "column_name": "updated_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "public",
    "table_name": "patient_clinician_connections",
    "column_position": 1,
    "column_name": "id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "public",
    "table_name": "patient_clinician_connections",
    "column_position": 2,
    "column_name": "patient_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "patient_clinician_connections",
    "column_position": 3,
    "column_name": "clinician_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "patient_clinician_connections",
    "column_position": 4,
    "column_name": "status",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": "'pending'::text"
  },
  {
    "schema": "public",
    "table_name": "patient_clinician_connections",
    "column_position": 5,
    "column_name": "access_level",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": "'full'::text"
  },
  {
    "schema": "public",
    "table_name": "patient_clinician_connections",
    "column_position": 6,
    "column_name": "access_expires_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "patient_clinician_connections",
    "column_position": 7,
    "column_name": "connected_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "patient_clinician_connections",
    "column_position": 8,
    "column_name": "approved_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "patient_clinician_connections",
    "column_position": 9,
    "column_name": "terminated_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "patient_clinician_connections",
    "column_position": 10,
    "column_name": "termination_reason",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "patient_clinician_connections",
    "column_position": 11,
    "column_name": "created_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "NO",
    "column_default": "now()"
  },
  {
    "schema": "public",
    "table_name": "patient_clinician_connections",
    "column_position": 12,
    "column_name": "updated_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "public",
    "table_name": "patient_invitations",
    "column_position": 1,
    "column_name": "id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "public",
    "table_name": "patient_invitations",
    "column_position": 2,
    "column_name": "clinician_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "patient_invitations",
    "column_position": 3,
    "column_name": "patient_email",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "patient_invitations",
    "column_position": 4,
    "column_name": "patient_email_hash",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "patient_invitations",
    "column_position": 5,
    "column_name": "invitation_token",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": "encode(gen_random_bytes(32), 'hex'::text)"
  },
  {
    "schema": "public",
    "table_name": "patient_invitations",
    "column_position": 6,
    "column_name": "status",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": "'pending'::text"
  },
  {
    "schema": "public",
    "table_name": "patient_invitations",
    "column_position": 7,
    "column_name": "patient_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "patient_invitations",
    "column_position": 8,
    "column_name": "message",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "patient_invitations",
    "column_position": 9,
    "column_name": "invited_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "public",
    "table_name": "patient_invitations",
    "column_position": 10,
    "column_name": "expires_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "(now() + '7 days'::interval)"
  },
  {
    "schema": "public",
    "table_name": "patient_invitations",
    "column_position": 11,
    "column_name": "accepted_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "patient_invitations",
    "column_position": 12,
    "column_name": "cancelled_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "patient_invitations",
    "column_position": 13,
    "column_name": "created_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "public",
    "table_name": "patient_invitations",
    "column_position": 14,
    "column_name": "updated_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "public",
    "table_name": "patient_profiles",
    "column_position": 1,
    "column_name": "id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "public",
    "table_name": "patient_profiles",
    "column_position": 2,
    "column_name": "user_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "patient_profiles",
    "column_position": 3,
    "column_name": "timezone",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "patient_profiles",
    "column_position": 4,
    "column_name": "preferred_language",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": "'English'::text"
  },
  {
    "schema": "public",
    "table_name": "patient_profiles",
    "column_position": 5,
    "column_name": "created_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "public",
    "table_name": "patient_profiles",
    "column_position": 6,
    "column_name": "updated_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "public",
    "table_name": "patient_profiles",
    "column_position": 7,
    "column_name": "first_name",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "patient_profiles",
    "column_position": 8,
    "column_name": "last_name",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "patient_profiles",
    "column_position": 9,
    "column_name": "date_of_birth",
    "data_type": "pg_catalog.date",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "patient_profiles",
    "column_position": 10,
    "column_name": "gender",
    "data_type": "public.gender_enum",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "pro_measures_library",
    "column_position": 1,
    "column_name": "pro_library_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "public",
    "table_name": "pro_measures_library",
    "column_position": 2,
    "column_name": "pro_type",
    "data_type": "clinical.pro_type_enum",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "pro_measures_library",
    "column_position": 3,
    "column_name": "full_name",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "pro_measures_library",
    "column_position": 4,
    "column_name": "description",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "pro_measures_library",
    "column_position": 5,
    "column_name": "snomed_ct_code",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "pro_measures_library",
    "column_position": 6,
    "column_name": "icd10_code",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "pro_measures_library",
    "column_position": 7,
    "column_name": "typical_use_case",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "pro_measures_library",
    "column_position": 8,
    "column_name": "typical_domains",
    "data_type": "pg_catalog._text[]",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "pro_measures_library",
    "column_position": 9,
    "column_name": "min_value",
    "data_type": "pg_catalog.numeric",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "pro_measures_library",
    "column_position": 10,
    "column_name": "max_value",
    "data_type": "pg_catalog.numeric",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "pro_measures_library",
    "column_position": 11,
    "column_name": "unit_of_measure",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "pro_measures_library",
    "column_position": 12,
    "column_name": "interpretation_guide",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "pro_measures_library",
    "column_position": 13,
    "column_name": "created_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "public",
    "table_name": "profiles",
    "column_position": 1,
    "column_name": "id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "profiles",
    "column_position": 2,
    "column_name": "user_type",
    "data_type": "public.user_type_enum",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "profiles",
    "column_position": 3,
    "column_name": "first_name",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "profiles",
    "column_position": 4,
    "column_name": "middle_name",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "profiles",
    "column_position": 5,
    "column_name": "last_name",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "profiles",
    "column_position": 6,
    "column_name": "email",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "profiles",
    "column_position": 7,
    "column_name": "phone_number",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "profiles",
    "column_position": 8,
    "column_name": "onboarding_completed",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "false"
  },
  {
    "schema": "public",
    "table_name": "profiles",
    "column_position": 10,
    "column_name": "created_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "public",
    "table_name": "profiles",
    "column_position": 11,
    "column_name": "updated_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "public",
    "table_name": "pwa_push_subscriptions",
    "column_position": 1,
    "column_name": "id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "public",
    "table_name": "pwa_push_subscriptions",
    "column_position": 2,
    "column_name": "user_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "pwa_push_subscriptions",
    "column_position": 3,
    "column_name": "endpoint",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "pwa_push_subscriptions",
    "column_position": 4,
    "column_name": "p256dh_key",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "pwa_push_subscriptions",
    "column_position": 5,
    "column_name": "auth_key",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "pwa_push_subscriptions",
    "column_position": 6,
    "column_name": "device_type",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "pwa_push_subscriptions",
    "column_position": 7,
    "column_name": "browser",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "pwa_push_subscriptions",
    "column_position": 8,
    "column_name": "active",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "true"
  },
  {
    "schema": "public",
    "table_name": "pwa_push_subscriptions",
    "column_position": 9,
    "column_name": "last_used_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "public",
    "table_name": "pwa_push_subscriptions",
    "column_position": 10,
    "column_name": "created_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "public",
    "table_name": "pwa_push_subscriptions",
    "column_position": 11,
    "column_name": "updated_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "public",
    "table_name": "research_consent",
    "column_position": 1,
    "column_name": "id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "public",
    "table_name": "research_consent",
    "column_position": 2,
    "column_name": "user_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "research_consent",
    "column_position": 3,
    "column_name": "data_type",
    "data_type": "public.research_data_type_enum",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "research_consent",
    "column_position": 5,
    "column_name": "consent_given_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "research_consent",
    "column_position": 6,
    "column_name": "consent_withdrawn_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "research_consent",
    "column_position": 7,
    "column_name": "consent_version",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "research_consent",
    "column_position": 8,
    "column_name": "created_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "public",
    "table_name": "research_data_sharing_details",
    "column_position": 1,
    "column_name": "id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "public",
    "table_name": "research_data_sharing_details",
    "column_position": 2,
    "column_name": "user_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "research_data_sharing_details",
    "column_position": 3,
    "column_name": "seizure_data",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "false"
  },
  {
    "schema": "public",
    "table_name": "research_data_sharing_details",
    "column_position": 4,
    "column_name": "parkinsons_data",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "false"
  },
  {
    "schema": "public",
    "table_name": "research_data_sharing_details",
    "column_position": 5,
    "column_name": "medication_data",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "false"
  },
  {
    "schema": "public",
    "table_name": "research_data_sharing_details",
    "column_position": 6,
    "column_name": "menstrual_data",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "false"
  },
  {
    "schema": "public",
    "table_name": "research_data_sharing_details",
    "column_position": 7,
    "column_name": "symptom_data",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "false"
  },
  {
    "schema": "public",
    "table_name": "research_data_sharing_details",
    "column_position": 8,
    "column_name": "demographic_data",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "false"
  },
  {
    "schema": "public",
    "table_name": "research_data_sharing_details",
    "column_position": 9,
    "column_name": "created_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "public",
    "table_name": "research_data_sharing_details",
    "column_position": 10,
    "column_name": "updated_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "public",
    "table_name": "researcher_onboarding_data",
    "column_position": 1,
    "column_name": "id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "public",
    "table_name": "researcher_onboarding_data",
    "column_position": 2,
    "column_name": "user_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "researcher_onboarding_data",
    "column_position": 3,
    "column_name": "first_name",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "researcher_onboarding_data",
    "column_position": 4,
    "column_name": "middle_name",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "researcher_onboarding_data",
    "column_position": 5,
    "column_name": "last_name",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "researcher_onboarding_data",
    "column_position": 6,
    "column_name": "institution",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "researcher_onboarding_data",
    "column_position": 7,
    "column_name": "research_focus",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "researcher_onboarding_data",
    "column_position": 8,
    "column_name": "credentials",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "researcher_onboarding_data",
    "column_position": 9,
    "column_name": "completed_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "researcher_onboarding_data",
    "column_position": 10,
    "column_name": "created_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "public",
    "table_name": "researcher_onboarding_data",
    "column_position": 11,
    "column_name": "updated_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "public",
    "table_name": "researcher_profiles",
    "column_position": 1,
    "column_name": "id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "public",
    "table_name": "researcher_profiles",
    "column_position": 2,
    "column_name": "user_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "researcher_profiles",
    "column_position": 3,
    "column_name": "institution",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "researcher_profiles",
    "column_position": 4,
    "column_name": "department",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "researcher_profiles",
    "column_position": 5,
    "column_name": "research_focus",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "researcher_profiles",
    "column_position": 6,
    "column_name": "credentials",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "researcher_profiles",
    "column_position": 7,
    "column_name": "access_level",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": "'basic'::text"
  },
  {
    "schema": "public",
    "table_name": "researcher_profiles",
    "column_position": 8,
    "column_name": "created_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "public",
    "table_name": "researcher_profiles",
    "column_position": 9,
    "column_name": "updated_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "public",
    "table_name": "security_incidents",
    "column_position": 1,
    "column_name": "id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "public",
    "table_name": "security_incidents",
    "column_position": 2,
    "column_name": "user_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "security_incidents",
    "column_position": 3,
    "column_name": "incident_type",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "security_incidents",
    "column_position": 4,
    "column_name": "severity",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": "'medium'::text"
  },
  {
    "schema": "public",
    "table_name": "security_incidents",
    "column_position": 5,
    "column_name": "description",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "security_incidents",
    "column_position": 6,
    "column_name": "ip_address_hash",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "security_incidents",
    "column_position": 7,
    "column_name": "user_agent",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "security_incidents",
    "column_position": 8,
    "column_name": "resolved",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "false"
  },
  {
    "schema": "public",
    "table_name": "security_incidents",
    "column_position": 9,
    "column_name": "resolved_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "security_incidents",
    "column_position": 10,
    "column_name": "resolved_by",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "security_incidents",
    "column_position": 11,
    "column_name": "created_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "public",
    "table_name": "security_incidents",
    "column_position": 12,
    "column_name": "updated_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "public",
    "table_name": "seizure_signs_reference",
    "column_position": 1,
    "column_name": "sign_id",
    "data_type": "pg_catalog.int4",
    "is_nullable": "NO",
    "column_default": "nextval('seizure_signs_reference_sign_id_seq'::regclass)"
  },
  {
    "schema": "public",
    "table_name": "seizure_signs_reference",
    "column_position": 2,
    "column_name": "sign_name",
    "data_type": "public.seizure_sign_enum",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "seizure_signs_reference",
    "column_position": 3,
    "column_name": "category",
    "data_type": "public.semiology_category_enum",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "seizure_signs_reference",
    "column_position": 4,
    "column_name": "display_name",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "seizure_signs_reference",
    "column_position": 5,
    "column_name": "description",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "seizure_signs_reference",
    "column_position": 6,
    "column_name": "research_code",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "seizure_signs_reference",
    "column_position": 7,
    "column_name": "created_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "public",
    "table_name": "seizure_triggers_reference",
    "column_position": 1,
    "column_name": "trigger_id",
    "data_type": "pg_catalog.int4",
    "is_nullable": "NO",
    "column_default": "nextval('seizure_triggers_reference_trigger_id_seq'::regclass)"
  },
  {
    "schema": "public",
    "table_name": "seizure_triggers_reference",
    "column_position": 2,
    "column_name": "trigger_type",
    "data_type": "public.trigger_type_enum",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "seizure_triggers_reference",
    "column_position": 3,
    "column_name": "display_name",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "seizure_triggers_reference",
    "column_position": 4,
    "column_name": "description",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "seizure_triggers_reference",
    "column_position": 5,
    "column_name": "created_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "public",
    "table_name": "sign_brain_region_mapping",
    "column_position": 1,
    "column_name": "id",
    "data_type": "pg_catalog.int4",
    "is_nullable": "NO",
    "column_default": "nextval('sign_brain_region_mapping_id_seq'::regclass)"
  },
  {
    "schema": "public",
    "table_name": "sign_brain_region_mapping",
    "column_position": 2,
    "column_name": "sign_id",
    "data_type": "pg_catalog.int4",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "sign_brain_region_mapping",
    "column_position": 3,
    "column_name": "region_id",
    "data_type": "pg_catalog.int4",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "sign_brain_region_mapping",
    "column_position": 4,
    "column_name": "probability_grade",
    "data_type": "public.probability_grade_enum",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "sign_brain_region_mapping",
    "column_position": 5,
    "column_name": "probability_percentage",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "sign_brain_region_mapping",
    "column_position": 6,
    "column_name": "research_basis",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "sign_brain_region_mapping",
    "column_position": 7,
    "column_name": "created_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "public",
    "table_name": "symptom_options",
    "column_position": 1,
    "column_name": "id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "public",
    "table_name": "symptom_options",
    "column_position": 2,
    "column_name": "category",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "symptom_options",
    "column_position": 3,
    "column_name": "symptom_name",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "symptom_options",
    "column_position": 4,
    "column_name": "description",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "symptom_options",
    "column_position": 5,
    "column_name": "display_order",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": "0"
  },
  {
    "schema": "public",
    "table_name": "symptom_options",
    "column_position": 6,
    "column_name": "active",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "true"
  },
  {
    "schema": "public",
    "table_name": "symptoms_library",
    "column_position": 1,
    "column_name": "symptom_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "public",
    "table_name": "symptoms_library",
    "column_position": 2,
    "column_name": "symptom_name",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "symptoms_library",
    "column_position": 3,
    "column_name": "category",
    "data_type": "public.symptom_category_enum",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "symptoms_library",
    "column_position": 4,
    "column_name": "common_in_epilepsy",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "false"
  },
  {
    "schema": "public",
    "table_name": "symptoms_library",
    "column_position": 5,
    "column_name": "common_in_parkinsons",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "false"
  },
  {
    "schema": "public",
    "table_name": "symptoms_library",
    "column_position": 6,
    "column_name": "description",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "symptoms_library",
    "column_position": 7,
    "column_name": "search_keywords",
    "data_type": "pg_catalog._text[]",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "symptoms_library",
    "column_position": 8,
    "column_name": "created_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "public",
    "table_name": "symptoms_library",
    "column_position": 9,
    "column_name": "snomed_ct_code",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "symptoms_library",
    "column_position": 10,
    "column_name": "icd10_code",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "symptoms_library",
    "column_position": 11,
    "column_name": "coding_system",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": "'SNOMED_CT'::text"
  },
  {
    "schema": "public",
    "table_name": "system_logs",
    "column_position": 1,
    "column_name": "id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "public",
    "table_name": "system_logs",
    "column_position": 2,
    "column_name": "log_level",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "system_logs",
    "column_position": 3,
    "column_name": "category",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "system_logs",
    "column_position": 4,
    "column_name": "event_type",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "system_logs",
    "column_position": 5,
    "column_name": "message",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "system_logs",
    "column_position": 6,
    "column_name": "user_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "system_logs",
    "column_position": 7,
    "column_name": "function_name",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "system_logs",
    "column_position": 8,
    "column_name": "table_name",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "system_logs",
    "column_position": 9,
    "column_name": "operation",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "system_logs",
    "column_position": 10,
    "column_name": "error_code",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "system_logs",
    "column_position": 11,
    "column_name": "sql_state",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "system_logs",
    "column_position": 12,
    "column_name": "stack_trace",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "system_logs",
    "column_position": 13,
    "column_name": "context_data",
    "data_type": "pg_catalog.jsonb",
    "is_nullable": "YES",
    "column_default": "'{}'::jsonb"
  },
  {
    "schema": "public",
    "table_name": "system_logs",
    "column_position": 14,
    "column_name": "created_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "NO",
    "column_default": "now()"
  },
  {
    "schema": "public",
    "table_name": "system_logs",
    "column_position": 15,
    "column_name": "session_id",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "system_logs",
    "column_position": 16,
    "column_name": "ip_address",
    "data_type": "pg_catalog.inet",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "system_logs",
    "column_position": 17,
    "column_name": "user_agent",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "trigger_options",
    "column_position": 1,
    "column_name": "id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "public",
    "table_name": "trigger_options",
    "column_position": 2,
    "column_name": "category",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "trigger_options",
    "column_position": 3,
    "column_name": "trigger_name",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "trigger_options",
    "column_position": 4,
    "column_name": "description",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "trigger_options",
    "column_position": 5,
    "column_name": "display_order",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": "0"
  },
  {
    "schema": "public",
    "table_name": "trigger_options",
    "column_position": 6,
    "column_name": "active",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": "true"
  },
  {
    "schema": "public",
    "table_name": "user_achievements",
    "column_position": 1,
    "column_name": "id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "public",
    "table_name": "user_achievements",
    "column_position": 2,
    "column_name": "user_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "user_achievements",
    "column_position": 3,
    "column_name": "achievement_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "user_achievements",
    "column_position": 4,
    "column_name": "earned_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "public",
    "table_name": "user_points",
    "column_position": 1,
    "column_name": "id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "public",
    "table_name": "user_points",
    "column_position": 2,
    "column_name": "user_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "user_points",
    "column_position": 3,
    "column_name": "points",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": "0"
  },
  {
    "schema": "public",
    "table_name": "user_points",
    "column_position": 4,
    "column_name": "level",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": "1"
  },
  {
    "schema": "public",
    "table_name": "user_points",
    "column_position": 5,
    "column_name": "streak_days",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": "0"
  },
  {
    "schema": "public",
    "table_name": "user_points",
    "column_position": 6,
    "column_name": "last_activity_date",
    "data_type": "pg_catalog.date",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "public",
    "table_name": "user_points",
    "column_position": 7,
    "column_name": "created_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "public",
    "table_name": "user_points",
    "column_position": 8,
    "column_name": "updated_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "research",
    "table_name": "daily_symptom_logs",
    "column_position": 1,
    "column_name": "log_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "research",
    "table_name": "daily_symptom_logs",
    "column_position": 2,
    "column_name": "research_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "daily_symptom_logs",
    "column_position": 3,
    "column_name": "log_date",
    "data_type": "pg_catalog.date",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "daily_symptom_logs",
    "column_position": 4,
    "column_name": "overall_feeling",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "daily_symptom_logs",
    "column_position": 5,
    "column_name": "mood",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "daily_symptom_logs",
    "column_position": 6,
    "column_name": "energy_level",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "daily_symptom_logs",
    "column_position": 7,
    "column_name": "fatigue_level",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "daily_symptom_logs",
    "column_position": 8,
    "column_name": "pain_level",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "daily_symptom_logs",
    "column_position": 9,
    "column_name": "sleep_quality",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "daily_symptom_logs",
    "column_position": 10,
    "column_name": "sleep_hours",
    "data_type": "pg_catalog.numeric",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "daily_symptom_logs",
    "column_position": 11,
    "column_name": "sleep_disturbances",
    "data_type": "pg_catalog.jsonb",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "daily_symptom_logs",
    "column_position": 12,
    "column_name": "motor_fluctuations_occurred",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "daily_symptom_logs",
    "column_position": 13,
    "column_name": "on_time_hours",
    "data_type": "pg_catalog.numeric",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "daily_symptom_logs",
    "column_position": 14,
    "column_name": "off_time_hours",
    "data_type": "pg_catalog.numeric",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "daily_symptom_logs",
    "column_position": 15,
    "column_name": "dyskinesia_severity",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "daily_symptom_logs",
    "column_position": 16,
    "column_name": "stiffness_severity",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "daily_symptom_logs",
    "column_position": 17,
    "column_name": "slowness_severity",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "daily_symptom_logs",
    "column_position": 18,
    "column_name": "cognitive_issues",
    "data_type": "pg_catalog.jsonb",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "daily_symptom_logs",
    "column_position": 19,
    "column_name": "mood_issues",
    "data_type": "pg_catalog.jsonb",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "daily_symptom_logs",
    "column_position": 20,
    "column_name": "autonomic_symptoms",
    "data_type": "pg_catalog.jsonb",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "daily_symptom_logs",
    "column_position": 21,
    "column_name": "adl_independence_level",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "daily_symptom_logs",
    "column_position": 22,
    "column_name": "activities_difficult",
    "data_type": "pg_catalog.jsonb",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "daily_symptom_logs",
    "column_position": 23,
    "column_name": "all_medications_taken",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "daily_symptom_logs",
    "column_position": 24,
    "column_name": "medication_side_effects",
    "data_type": "pg_catalog.jsonb",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "daily_symptom_logs",
    "column_position": 25,
    "column_name": "stress_level",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "daily_symptom_logs",
    "column_position": 26,
    "column_name": "exercise_minutes",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "daily_symptom_logs",
    "column_position": 27,
    "column_name": "created_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "research",
    "table_name": "daily_symptom_logs",
    "column_position": 28,
    "column_name": "source_log_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "gait_episodes",
    "column_position": 1,
    "column_name": "gait_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "research",
    "table_name": "gait_episodes",
    "column_position": 2,
    "column_name": "research_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "gait_episodes",
    "column_position": 3,
    "column_name": "occurred_at_date",
    "data_type": "pg_catalog.date",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "gait_episodes",
    "column_position": 4,
    "column_name": "occurred_at_hour",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "gait_episodes",
    "column_position": 5,
    "column_name": "duration_seconds",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "gait_episodes",
    "column_position": 6,
    "column_name": "event_type",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "gait_episodes",
    "column_position": 7,
    "column_name": "severity",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "gait_episodes",
    "column_position": 8,
    "column_name": "resulted_in_fall",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "gait_episodes",
    "column_position": 9,
    "column_name": "fall_direction",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "gait_episodes",
    "column_position": 10,
    "column_name": "injury_occurred",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "gait_episodes",
    "column_position": 11,
    "column_name": "required_assistance",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "gait_episodes",
    "column_position": 12,
    "column_name": "environmental_factors",
    "data_type": "pg_catalog.jsonb",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "gait_episodes",
    "column_position": 13,
    "column_name": "medication_status",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "gait_episodes",
    "column_position": 14,
    "column_name": "hours_since_medication",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "gait_episodes",
    "column_position": 15,
    "column_name": "freezing_trigger",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "gait_episodes",
    "column_position": 16,
    "column_name": "created_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "research",
    "table_name": "gait_episodes",
    "column_position": 17,
    "column_name": "source_gait_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "seizure_events",
    "column_position": 1,
    "column_name": "event_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "research",
    "table_name": "seizure_events",
    "column_position": 2,
    "column_name": "research_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "seizure_events",
    "column_position": 3,
    "column_name": "occurred_at_date",
    "data_type": "pg_catalog.date",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "seizure_events",
    "column_position": 4,
    "column_name": "occurred_at_hour",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "seizure_events",
    "column_position": 5,
    "column_name": "duration_seconds",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "seizure_events",
    "column_position": 6,
    "column_name": "seizure_type",
    "data_type": "pg_catalog.text",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "seizure_events",
    "column_position": 7,
    "column_name": "severity",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "seizure_events",
    "column_position": 8,
    "column_name": "consciousness_level",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "seizure_events",
    "column_position": 9,
    "column_name": "had_aura",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "seizure_events",
    "column_position": 10,
    "column_name": "aura_signs",
    "data_type": "pg_catalog.jsonb",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "seizure_events",
    "column_position": 11,
    "column_name": "possible_triggers",
    "data_type": "pg_catalog.jsonb",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "seizure_events",
    "column_position": 12,
    "column_name": "body_parts_affected",
    "data_type": "pg_catalog.jsonb",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "seizure_events",
    "column_position": 13,
    "column_name": "motor_symptoms",
    "data_type": "pg_catalog.jsonb",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "seizure_events",
    "column_position": 14,
    "column_name": "non_motor_symptoms",
    "data_type": "pg_catalog.jsonb",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "seizure_events",
    "column_position": 15,
    "column_name": "post_ictal_effects",
    "data_type": "pg_catalog.jsonb",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "seizure_events",
    "column_position": 16,
    "column_name": "post_ictal_duration_minutes",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "seizure_events",
    "column_position": 17,
    "column_name": "injuries_occurred",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "seizure_events",
    "column_position": 18,
    "column_name": "injury_types",
    "data_type": "pg_catalog.jsonb",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "seizure_events",
    "column_position": 19,
    "column_name": "required_medical_attention",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "seizure_events",
    "column_position": 20,
    "column_name": "witnessed",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "seizure_events",
    "column_position": 21,
    "column_name": "medication_taken_as_prescribed",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "seizure_events",
    "column_position": 22,
    "column_name": "hours_since_last_dose",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "seizure_events",
    "column_position": 23,
    "column_name": "recent_medication_changes",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "seizure_events",
    "column_position": 24,
    "column_name": "fully_recovered",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "seizure_events",
    "column_position": 25,
    "column_name": "recovery_time_minutes",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "seizure_events",
    "column_position": 26,
    "column_name": "created_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "research",
    "table_name": "seizure_events",
    "column_position": 27,
    "column_name": "source_event_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "tremor_episodes",
    "column_position": 1,
    "column_name": "tremor_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()"
  },
  {
    "schema": "research",
    "table_name": "tremor_episodes",
    "column_position": 2,
    "column_name": "research_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "tremor_episodes",
    "column_position": 3,
    "column_name": "occurred_at_date",
    "data_type": "pg_catalog.date",
    "is_nullable": "NO",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "tremor_episodes",
    "column_position": 4,
    "column_name": "occurred_at_hour",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "tremor_episodes",
    "column_position": 5,
    "column_name": "duration_seconds",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "tremor_episodes",
    "column_position": 6,
    "column_name": "tremor_type",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "tremor_episodes",
    "column_position": 7,
    "column_name": "severity",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "tremor_episodes",
    "column_position": 8,
    "column_name": "frequency_hz",
    "data_type": "pg_catalog.numeric",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "tremor_episodes",
    "column_position": 9,
    "column_name": "body_regions",
    "data_type": "pg_catalog.jsonb",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "tremor_episodes",
    "column_position": 10,
    "column_name": "dominant_side",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "tremor_episodes",
    "column_position": 11,
    "column_name": "interfered_with_activities",
    "data_type": "pg_catalog.bool",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "tremor_episodes",
    "column_position": 12,
    "column_name": "activities_affected",
    "data_type": "pg_catalog.jsonb",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "tremor_episodes",
    "column_position": 13,
    "column_name": "occurred_during",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "tremor_episodes",
    "column_position": 14,
    "column_name": "medication_status",
    "data_type": "pg_catalog.text",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "tremor_episodes",
    "column_position": 15,
    "column_name": "hours_since_medication",
    "data_type": "pg_catalog.int4",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "tremor_episodes",
    "column_position": 16,
    "column_name": "possible_triggers",
    "data_type": "pg_catalog.jsonb",
    "is_nullable": "YES",
    "column_default": null
  },
  {
    "schema": "research",
    "table_name": "tremor_episodes",
    "column_position": 17,
    "column_name": "created_at",
    "data_type": "pg_catalog.timestamptz",
    "is_nullable": "YES",
    "column_default": "now()"
  },
  {
    "schema": "research",
    "table_name": "tremor_episodes",
    "column_position": 18,
    "column_name": "source_tremor_id",
    "data_type": "pg_catalog.uuid",
    "is_nullable": "YES",
    "column_default": null
  }
]

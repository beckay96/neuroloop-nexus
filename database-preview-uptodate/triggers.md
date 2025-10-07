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
    "trigger_name": "trg_sync_onboarding_to_phi",
    "granularity": "ROW",
    "events": [
      "INSERT",
      "UPDATE"
    ],
    "timing": "AFTER",
    "function_name": "private_health_info.sync_onboarding_to_patient_phi",
    "trigger_def": "CREATE TRIGGER trg_sync_onboarding_to_phi AFTER INSERT OR UPDATE OF date_of_birth, gender, phone_number, emergency_contact_name, emergency_contact_phone, emergency_contact_relationship ON private_health_info.patient_onboarding_data FOR EACH ROW WHEN (new.user_id IS NOT NULL) EXECUTE FUNCTION private_health_info.sync_onboarding_to_patient_phi()"
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
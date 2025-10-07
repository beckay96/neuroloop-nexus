[
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`private_health_info.daily_symptom_logs\\` has a row level security policy \\`Users view own daily_symptom_logs\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "daily_symptom_logs",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "auth_rls_init_plan_private_health_info_daily_symptom_logs_Users view own daily_symptom_logs"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`public.profiles\\` has a row level security policy \\`System can insert profiles\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "profiles",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "auth_rls_init_plan_public_profiles_System can insert profiles"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`public.patient_profiles\\` has a row level security policy \\`Users manage own patient_profiles\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "patient_profiles",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "auth_rls_init_plan_public_patient_profiles_Users manage own patient_profiles"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`public.daily_tracking_preferences\\` has a row level security policy \\`users_can_manage_own_tracking_prefs\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "daily_tracking_preferences",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "auth_rls_init_plan_public_daily_tracking_preferences_users_can_manage_own_tracking_prefs"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`public.research_consent\\` has a row level security policy \\`users_can_manage_own_research_consent\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "research_consent",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "auth_rls_init_plan_public_research_consent_users_can_manage_own_research_consent"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`public.daily_tracking_preferences\\` has a row level security policy \\`Users can view own tracking preferences\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "daily_tracking_preferences",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "auth_rls_init_plan_public_daily_tracking_preferences_Users can view own tracking preferences"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`public.daily_tracking_preferences\\` has a row level security policy \\`Users can update own tracking preferences\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "daily_tracking_preferences",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "auth_rls_init_plan_public_daily_tracking_preferences_Users can update own tracking preferences"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`public.daily_tracking_preferences\\` has a row level security policy \\`Users can insert own tracking preferences\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "daily_tracking_preferences",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "auth_rls_init_plan_public_daily_tracking_preferences_Users can insert own tracking preferences"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`private_health_info.seizure_logs\\` has a row level security policy \\`Users can manage own seizure logs\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "seizure_logs",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "auth_rls_init_plan_private_health_info_seizure_logs_Users can manage own seizure logs"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`public.clinician_profiles\\` has a row level security policy \\`Users manage own clinician_profiles\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "clinician_profiles",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "auth_rls_init_plan_public_clinician_profiles_Users manage own clinician_profiles"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`clinical.patient_pro_value\\` has a row level security policy \\`Users can view PRO values for their own timeline\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "patient_pro_value",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "auth_rls_init_plan_clinical_patient_pro_value_Users can view PRO values for their own timeline"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`private_health_info.daily_symptom_logs\\` has a row level security policy \\`Clinicians view patient daily_symptom_logs\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "daily_symptom_logs",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "auth_rls_init_plan_private_health_info_daily_symptom_logs_Clinicians view patient daily_symptom_logs"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`private_health_info.daily_symptom_logs\\` has a row level security policy \\`Users insert own daily_symptom_logs\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "daily_symptom_logs",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "auth_rls_init_plan_private_health_info_daily_symptom_logs_Users insert own daily_symptom_logs"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`private_health_info.daily_symptom_logs\\` has a row level security policy \\`Users update own daily_symptom_logs\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "daily_symptom_logs",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "auth_rls_init_plan_private_health_info_daily_symptom_logs_Users update own daily_symptom_logs"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`private_health_info.daily_symptom_logs\\` has a row level security policy \\`Users delete own daily_symptom_logs\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "daily_symptom_logs",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "auth_rls_init_plan_private_health_info_daily_symptom_logs_Users delete own daily_symptom_logs"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`private_health_info.seizure_events\\` has a row level security policy \\`Users view own seizure_events\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "seizure_events",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "auth_rls_init_plan_private_health_info_seizure_events_Users view own seizure_events"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`private_health_info.seizure_events\\` has a row level security policy \\`Clinicians view patient seizure_events\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "seizure_events",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "auth_rls_init_plan_private_health_info_seizure_events_Clinicians view patient seizure_events"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`private_health_info.seizure_events\\` has a row level security policy \\`Users insert own seizure_events\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "seizure_events",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "auth_rls_init_plan_private_health_info_seizure_events_Users insert own seizure_events"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`private_health_info.seizure_events\\` has a row level security policy \\`Users update own seizure_events\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "seizure_events",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "auth_rls_init_plan_private_health_info_seizure_events_Users update own seizure_events"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`clinical.clinical_scale_subscore_results\\` has a row level security policy \\`Users can view subscores for their own scale results\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "clinical_scale_subscore_results",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "auth_rls_init_plan_clinical_clinical_scale_subscore_results_Users can view subscores for their own scale results"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`clinical.imaging_annotations\\` has a row level security policy \\`Users can view annotations for their own images\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "imaging_annotations",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "auth_rls_init_plan_clinical_imaging_annotations_Users can view annotations for their own images"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`private_health_info.seizure_events\\` has a row level security policy \\`Users delete own seizure_events\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "seizure_events",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "auth_rls_init_plan_private_health_info_seizure_events_Users delete own seizure_events"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`private_health_info.tremor_episodes\\` has a row level security policy \\`Users view own tremor_episodes\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "tremor_episodes",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "auth_rls_init_plan_private_health_info_tremor_episodes_Users view own tremor_episodes"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`private_health_info.tremor_episodes\\` has a row level security policy \\`Clinicians view patient tremor_episodes\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "tremor_episodes",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "auth_rls_init_plan_private_health_info_tremor_episodes_Clinicians view patient tremor_episodes"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`private_health_info.tremor_episodes\\` has a row level security policy \\`Users insert own tremor_episodes\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "tremor_episodes",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "auth_rls_init_plan_private_health_info_tremor_episodes_Users insert own tremor_episodes"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`private_health_info.tremor_episodes\\` has a row level security policy \\`Users update own tremor_episodes\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "tremor_episodes",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "auth_rls_init_plan_private_health_info_tremor_episodes_Users update own tremor_episodes"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`clinical.patient_pro_value\\` has a row level security policy \\`Users can view their own PRO values\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "patient_pro_value",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "auth_rls_init_plan_clinical_patient_pro_value_Users can view their own PRO values"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`private_health_info.patient_diagnoses\\` has a row level security policy \\`Users can view own diagnoses\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "patient_diagnoses",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "auth_rls_init_plan_private_health_info_patient_diagnoses_Users can view own diagnoses"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`private_health_info.tremor_episodes\\` has a row level security policy \\`Users delete own tremor_episodes\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "tremor_episodes",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "auth_rls_init_plan_private_health_info_tremor_episodes_Users delete own tremor_episodes"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`private_health_info.gait_episodes\\` has a row level security policy \\`Users view own gait_episodes\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "gait_episodes",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "auth_rls_init_plan_private_health_info_gait_episodes_Users view own gait_episodes"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`private_health_info.gait_episodes\\` has a row level security policy \\`Clinicians view patient gait_episodes\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "gait_episodes",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "auth_rls_init_plan_private_health_info_gait_episodes_Clinicians view patient gait_episodes"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`private_health_info.gait_episodes\\` has a row level security policy \\`Users insert own gait_episodes\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "gait_episodes",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "auth_rls_init_plan_private_health_info_gait_episodes_Users insert own gait_episodes"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`private_health_info.gait_episodes\\` has a row level security policy \\`Users update own gait_episodes\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "gait_episodes",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "auth_rls_init_plan_private_health_info_gait_episodes_Users update own gait_episodes"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`private_health_info.gait_episodes\\` has a row level security policy \\`Users delete own gait_episodes\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "gait_episodes",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "auth_rls_init_plan_private_health_info_gait_episodes_Users delete own gait_episodes"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`private_health_info.clinical_media\\` has a row level security policy \\`Users view own clinical_media\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "clinical_media",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "auth_rls_init_plan_private_health_info_clinical_media_Users view own clinical_media"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`private_health_info.clinical_media\\` has a row level security policy \\`Clinicians view patient clinical_media\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "clinical_media",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "auth_rls_init_plan_private_health_info_clinical_media_Clinicians view patient clinical_media"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`private_health_info.clinical_media\\` has a row level security policy \\`Users insert own clinical_media\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "clinical_media",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "auth_rls_init_plan_private_health_info_clinical_media_Users insert own clinical_media"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`private_health_info.patient_diagnoses\\` has a row level security policy \\`Users can insert own diagnoses\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "patient_diagnoses",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "auth_rls_init_plan_private_health_info_patient_diagnoses_Users can insert own diagnoses"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`private_health_info.clinical_media\\` has a row level security policy \\`Users update own clinical_media\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "clinical_media",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "auth_rls_init_plan_private_health_info_clinical_media_Users update own clinical_media"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`private_health_info.clinical_media\\` has a row level security policy \\`Users delete own clinical_media\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "clinical_media",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "auth_rls_init_plan_private_health_info_clinical_media_Users delete own clinical_media"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`private_health_info.user_conditions\\` has a row level security policy \\`Users manage own user_conditions\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "user_conditions",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "auth_rls_init_plan_private_health_info_user_conditions_Users manage own user_conditions"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`private_health_info.user_medications\\` has a row level security policy \\`Users manage own user_medications\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "user_medications",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "auth_rls_init_plan_private_health_info_user_medications_Users manage own user_medications"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`private_health_info.patient_phi\\` has a row level security policy \\`Users manage own patient_phi\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "patient_phi",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "auth_rls_init_plan_private_health_info_patient_phi_Users manage own patient_phi"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`private_health_info.clinician_phi\\` has a row level security policy \\`Users manage own clinician_phi\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "clinician_phi",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "auth_rls_init_plan_private_health_info_clinician_phi_Users manage own clinician_phi"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`private_health_info.patient_diagnoses\\` has a row level security policy \\`Users can update own diagnoses\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "patient_diagnoses",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "auth_rls_init_plan_private_health_info_patient_diagnoses_Users can update own diagnoses"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`private_health_info.medication_logs\\` has a row level security policy \\`Users manage own medication_logs\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "medication_logs",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "auth_rls_init_plan_private_health_info_medication_logs_Users manage own medication_logs"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`private_health_info.patient_diagnoses\\` has a row level security policy \\`Users can delete own diagnoses\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "patient_diagnoses",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "auth_rls_init_plan_private_health_info_patient_diagnoses_Users can delete own diagnoses"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`private_health_info.seizure_logs\\` has a row level security policy \\`Users can view own seizure logs\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "seizure_logs",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "auth_rls_init_plan_private_health_info_seizure_logs_Users can view own seizure logs"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`private_health_info.seizure_logs\\` has a row level security policy \\`Users can insert own seizure logs\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "seizure_logs",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "auth_rls_init_plan_private_health_info_seizure_logs_Users can insert own seizure logs"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`private_health_info.basal_temperature_logs\\` has a row level security policy \\`Users manage own basal_temperature_logs\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "basal_temperature_logs",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "auth_rls_init_plan_private_health_info_basal_temperature_logs_Users manage own basal_temperature_logs"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`private_health_info.seizure_logs\\` has a row level security policy \\`Users can update own seizure logs\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "seizure_logs",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "auth_rls_init_plan_private_health_info_seizure_logs_Users can update own seizure logs"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`private_health_info.seizure_logs\\` has a row level security policy \\`Users can delete own seizure logs\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "seizure_logs",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "auth_rls_init_plan_private_health_info_seizure_logs_Users can delete own seizure logs"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`public.custom_tracking_items\\` has a row level security policy \\`Users can view own custom tracking items\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "custom_tracking_items",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "auth_rls_init_plan_public_custom_tracking_items_Users can view own custom tracking items"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`public.custom_tracking_items\\` has a row level security policy \\`Users can insert own custom tracking items\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "custom_tracking_items",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "auth_rls_init_plan_public_custom_tracking_items_Users can insert own custom tracking items"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`public.custom_tracking_items\\` has a row level security policy \\`Users can update own custom tracking items\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "custom_tracking_items",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "auth_rls_init_plan_public_custom_tracking_items_Users can update own custom tracking items"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`public.custom_tracking_items\\` has a row level security policy \\`Users can delete own custom tracking items\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "custom_tracking_items",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "auth_rls_init_plan_public_custom_tracking_items_Users can delete own custom tracking items"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`public.custom_tracking_values\\` has a row level security policy \\`Users can view own custom tracking values\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "custom_tracking_values",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "auth_rls_init_plan_public_custom_tracking_values_Users can view own custom tracking values"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`public.custom_tracking_values\\` has a row level security policy \\`Users can insert own custom tracking values\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "custom_tracking_values",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "auth_rls_init_plan_public_custom_tracking_values_Users can insert own custom tracking values"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`public.custom_tracking_values\\` has a row level security policy \\`Users can update own custom tracking values\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "custom_tracking_values",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "auth_rls_init_plan_public_custom_tracking_values_Users can update own custom tracking values"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`public.custom_tracking_values\\` has a row level security policy \\`Users can delete own custom tracking values\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "custom_tracking_values",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "auth_rls_init_plan_public_custom_tracking_values_Users can delete own custom tracking values"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`private_health_info.patient_onboarding_data\\` has a row level security policy \\`Users manage own patient_onboarding_data\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "patient_onboarding_data",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "auth_rls_init_plan_private_health_info_patient_onboarding_data_Users manage own patient_onboarding_data"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`private_health_info.clinician_onboarding_data\\` has a row level security policy \\`Users manage own clinician_onboarding_data\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "clinician_onboarding_data",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "auth_rls_init_plan_private_health_info_clinician_onboarding_data_Users manage own clinician_onboarding_data"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`private_health_info.tracking_entries\\` has a row level security policy \\`Users manage own tracking_entries\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "tracking_entries",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "auth_rls_init_plan_private_health_info_tracking_entries_Users manage own tracking_entries"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`clinical.imaging_annotations\\` has a row level security policy \\`Users can insert annotations for their own images\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "imaging_annotations",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "auth_rls_init_plan_clinical_imaging_annotations_Users can insert annotations for their own images"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`clinical.patient_pro_value\\` has a row level security policy \\`Users can insert their own PRO values\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "patient_pro_value",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "auth_rls_init_plan_clinical_patient_pro_value_Users can insert their own PRO values"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`private_health_info.menstrual_cycle_logs\\` has a row level security policy \\`Users manage own menstrual_cycle_logs\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "menstrual_cycle_logs",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "auth_rls_init_plan_private_health_info_menstrual_cycle_logs_Users manage own menstrual_cycle_logs"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`clinical.clinical_scale_subscore_results\\` has a row level security policy \\`Users can insert subscores for their own scale results\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "clinical_scale_subscore_results",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "auth_rls_init_plan_clinical_clinical_scale_subscore_results_Users can insert subscores for their own scale results"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`private_health_info.seizure_logs_research\\` has a row level security policy \\`Users manage own seizure_logs_research\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "seizure_logs_research",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "auth_rls_init_plan_private_health_info_seizure_logs_research_Users manage own seizure_logs_research"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`private_health_info.menstrual_log_symptoms\\` has a row level security policy \\`Users manage own symptoms\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "menstrual_log_symptoms",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "auth_rls_init_plan_private_health_info_menstrual_log_symptoms_Users manage own symptoms"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`clinical.patient_risk_alerts\\` has a row level security policy \\`Patients view own patient_risk_alerts\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "patient_risk_alerts",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "auth_rls_init_plan_clinical_patient_risk_alerts_Patients view own patient_risk_alerts"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`public.carer_profiles\\` has a row level security policy \\`Users manage own carer_profiles\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "carer_profiles",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "auth_rls_init_plan_public_carer_profiles_Users manage own carer_profiles"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`clinical.patient_risk_alerts\\` has a row level security policy \\`Clinicians view patient patient_risk_alerts\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "patient_risk_alerts",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "auth_rls_init_plan_clinical_patient_risk_alerts_Clinicians view patient patient_risk_alerts"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`public.system_logs\\` has a row level security policy \\`Service role can view all logs\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "system_logs",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "auth_rls_init_plan_public_system_logs_Service role can view all logs"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`clinical.patient_risk_alerts\\` has a row level security policy \\`Clinicians manage patient patient_risk_alerts\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "patient_risk_alerts",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "auth_rls_init_plan_clinical_patient_risk_alerts_Clinicians manage patient patient_risk_alerts"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`clinical.patient_snapshots\\` has a row level security policy \\`Patients view own patient_snapshots\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "patient_snapshots",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "auth_rls_init_plan_clinical_patient_snapshots_Patients view own patient_snapshots"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`public.function_execution_logs\\` has a row level security policy \\`Service role can view function logs\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "function_execution_logs",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "auth_rls_init_plan_public_function_execution_logs_Service role can view function logs"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`public.api_request_logs\\` has a row level security policy \\`Service role can view API logs\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "api_request_logs",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "auth_rls_init_plan_public_api_request_logs_Service role can view API logs"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`clinical.patient_snapshots\\` has a row level security policy \\`Clinicians view patient patient_snapshots\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "patient_snapshots",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "auth_rls_init_plan_clinical_patient_snapshots_Clinicians view patient patient_snapshots"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`clinical.patient_snapshots\\` has a row level security policy \\`Clinicians manage patient patient_snapshots\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "patient_snapshots",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "auth_rls_init_plan_clinical_patient_snapshots_Clinicians manage patient patient_snapshots"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`clinical.case_data_panels\\` has a row level security policy \\`Patients view own case_data_panels\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "case_data_panels",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "auth_rls_init_plan_clinical_case_data_panels_Patients view own case_data_panels"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`clinical.case_data_panels\\` has a row level security policy \\`Clinicians view patient case_data_panels\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "case_data_panels",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "auth_rls_init_plan_clinical_case_data_panels_Clinicians view patient case_data_panels"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`public.database_operation_logs\\` has a row level security policy \\`Service role can view DB logs\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "database_operation_logs",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "auth_rls_init_plan_public_database_operation_logs_Service role can view DB logs"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`clinical.case_data_panels\\` has a row level security policy \\`Clinicians manage patient case_data_panels\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "case_data_panels",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "auth_rls_init_plan_clinical_case_data_panels_Clinicians manage patient case_data_panels"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`clinical.clinical_notes_exports\\` has a row level security policy \\`Patients view own clinical_notes_exports\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "clinical_notes_exports",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "auth_rls_init_plan_clinical_clinical_notes_exports_Patients view own clinical_notes_exports"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`clinical.clinical_notes_exports\\` has a row level security policy \\`Clinicians view patient clinical_notes_exports\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "clinical_notes_exports",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "auth_rls_init_plan_clinical_clinical_notes_exports_Clinicians view patient clinical_notes_exports"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`clinical.clinical_notes_exports\\` has a row level security policy \\`Clinicians manage patient clinical_notes_exports\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "clinical_notes_exports",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "auth_rls_init_plan_clinical_clinical_notes_exports_Clinicians manage patient clinical_notes_exports"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`clinical.clinical_scale_results\\` has a row level security policy \\`Patients view own clinical_scale_results\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "clinical_scale_results",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "auth_rls_init_plan_clinical_clinical_scale_results_Patients view own clinical_scale_results"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`clinical.clinical_scale_results\\` has a row level security policy \\`Clinicians view patient clinical_scale_results\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "clinical_scale_results",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "auth_rls_init_plan_clinical_clinical_scale_results_Clinicians view patient clinical_scale_results"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`public.notification_preferences\\` has a row level security policy \\`Users manage own notification_preferences\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "notification_preferences",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "auth_rls_init_plan_public_notification_preferences_Users manage own notification_preferences"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`clinical.clinical_scale_results\\` has a row level security policy \\`Clinicians manage patient clinical_scale_results\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "clinical_scale_results",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "auth_rls_init_plan_clinical_clinical_scale_results_Clinicians manage patient clinical_scale_results"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`clinical.neuro_imaging_results\\` has a row level security policy \\`Patients view own neuro_imaging_results\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "neuro_imaging_results",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "auth_rls_init_plan_clinical_neuro_imaging_results_Patients view own neuro_imaging_results"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`clinical.neuro_imaging_results\\` has a row level security policy \\`Clinicians view patient neuro_imaging_results\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "neuro_imaging_results",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "auth_rls_init_plan_clinical_neuro_imaging_results_Clinicians view patient neuro_imaging_results"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`clinical.neuro_imaging_results\\` has a row level security policy \\`Clinicians manage patient neuro_imaging_results\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "neuro_imaging_results",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "auth_rls_init_plan_clinical_neuro_imaging_results_Clinicians manage patient neuro_imaging_results"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`clinical.patient_pro_timeline\\` has a row level security policy \\`Patients view own patient_pro_timeline\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "patient_pro_timeline",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "auth_rls_init_plan_clinical_patient_pro_timeline_Patients view own patient_pro_timeline"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`clinical.patient_pro_timeline\\` has a row level security policy \\`Clinicians view patient patient_pro_timeline\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "patient_pro_timeline",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "auth_rls_init_plan_clinical_patient_pro_timeline_Clinicians view patient patient_pro_timeline"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`clinical.patient_pro_timeline\\` has a row level security policy \\`Clinicians manage patient patient_pro_timeline\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "patient_pro_timeline",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "auth_rls_init_plan_clinical_patient_pro_timeline_Clinicians manage patient patient_pro_timeline"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`clinical.ai_insights_cards\\` has a row level security policy \\`Clinicians manage own ai_insights_cards\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "ai_insights_cards",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "auth_rls_init_plan_clinical_ai_insights_cards_Clinicians manage own ai_insights_cards"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`clinical.clinician_today_view\\` has a row level security policy \\`Clinicians manage own clinician_today_view\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "clinician_today_view",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "auth_rls_init_plan_clinical_clinician_today_view_Clinicians manage own clinician_today_view"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`clinical.patient_collab_chat\\` has a row level security policy \\`Participants view chat\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "patient_collab_chat",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "auth_rls_init_plan_clinical_patient_collab_chat_Participants view chat"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`clinical.patient_collab_chat\\` has a row level security policy \\`Participants send messages\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "patient_collab_chat",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "auth_rls_init_plan_clinical_patient_collab_chat_Participants send messages"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`clinical.patient_collab_chat\\` has a row level security policy \\`Senders manage messages\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "patient_collab_chat",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "auth_rls_init_plan_clinical_patient_collab_chat_Senders manage messages"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`public.user_points\\` has a row level security policy \\`Users manage own user_points\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "user_points",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "auth_rls_init_plan_public_user_points_Users manage own user_points"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`public.user_achievements\\` has a row level security policy \\`Users manage own user_achievements\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "user_achievements",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "auth_rls_init_plan_public_user_achievements_Users manage own user_achievements"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`public.research_consent\\` has a row level security policy \\`Users manage own research_consent\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "research_consent",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "auth_rls_init_plan_public_research_consent_Users manage own research_consent"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`public.profiles\\` has a row level security policy \\`Users manage own profile\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "profiles",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "auth_rls_init_plan_public_profiles_Users manage own profile"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`public.patient_clinician_connections\\` has a row level security policy \\`Participants view connections\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "patient_clinician_connections",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "auth_rls_init_plan_public_patient_clinician_connections_Participants view connections"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`public.patient_clinician_connections\\` has a row level security policy \\`Patients request connections\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "patient_clinician_connections",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "auth_rls_init_plan_public_patient_clinician_connections_Patients request connections"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`public.patient_clinician_connections\\` has a row level security policy \\`Participants update connections\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "patient_clinician_connections",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "auth_rls_init_plan_public_patient_clinician_connections_Participants update connections"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`public.carer_relationships\\` has a row level security policy \\`Participants view relationships\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "carer_relationships",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "auth_rls_init_plan_public_carer_relationships_Participants view relationships"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`public.carer_relationships\\` has a row level security policy \\`Patients invite carers\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "carer_relationships",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "auth_rls_init_plan_public_carer_relationships_Patients invite carers"
  },
  {
    "name": "auth_rls_initplan",
    "title": "Auth RLS Initialization Plan",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if calls to \\`current_setting()\\` and \\`auth.<function>()\\` in RLS policies are being unnecessarily re-evaluated for each row",
    "detail": "Table \\`public.carer_relationships\\` has a row level security policy \\`Participants update relationships\\` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing \\`auth.<function>()\\` with \\`(select auth.<function>())\\`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan",
    "metadata": {
      "name": "carer_relationships",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "auth_rls_init_plan_public_carer_relationships_Participants update relationships"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`clinical.ai_insights_cards\\` has multiple permissive policies for role \\`anon\\` for action \\`INSERT\\`. Policies include \\`{\"Clinicians manage own ai_insights_cards\",\"System can generate insights\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "ai_insights_cards",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "multiple_permissive_policies_clinical_ai_insights_cards_anon_INSERT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`clinical.ai_insights_cards\\` has multiple permissive policies for role \\`authenticated\\` for action \\`INSERT\\`. Policies include \\`{\"Clinicians manage own ai_insights_cards\",\"System can generate insights\",\"System creates insights\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "ai_insights_cards",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "multiple_permissive_policies_clinical_ai_insights_cards_authenticated_INSERT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`clinical.ai_insights_cards\\` has multiple permissive policies for role \\`authenticator\\` for action \\`INSERT\\`. Policies include \\`{\"Clinicians manage own ai_insights_cards\",\"System can generate insights\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "ai_insights_cards",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "multiple_permissive_policies_clinical_ai_insights_cards_authenticator_INSERT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`clinical.ai_insights_cards\\` has multiple permissive policies for role \\`dashboard_user\\` for action \\`INSERT\\`. Policies include \\`{\"Clinicians manage own ai_insights_cards\",\"System can generate insights\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "ai_insights_cards",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "multiple_permissive_policies_clinical_ai_insights_cards_dashboard_user_INSERT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`clinical.case_data_panels\\` has multiple permissive policies for role \\`anon\\` for action \\`SELECT\\`. Policies include \\`{\"Clinicians manage patient case_data_panels\",\"Clinicians view patient case_data_panels\",\"Patients view own case_data_panels\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "case_data_panels",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "multiple_permissive_policies_clinical_case_data_panels_anon_SELECT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`clinical.case_data_panels\\` has multiple permissive policies for role \\`authenticated\\` for action \\`SELECT\\`. Policies include \\`{\"Clinicians manage patient case_data_panels\",\"Clinicians view patient case_data_panels\",\"Patients view own case_data_panels\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "case_data_panels",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "multiple_permissive_policies_clinical_case_data_panels_authenticated_SELECT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`clinical.case_data_panels\\` has multiple permissive policies for role \\`authenticator\\` for action \\`SELECT\\`. Policies include \\`{\"Clinicians manage patient case_data_panels\",\"Clinicians view patient case_data_panels\",\"Patients view own case_data_panels\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "case_data_panels",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "multiple_permissive_policies_clinical_case_data_panels_authenticator_SELECT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`clinical.case_data_panels\\` has multiple permissive policies for role \\`dashboard_user\\` for action \\`SELECT\\`. Policies include \\`{\"Clinicians manage patient case_data_panels\",\"Clinicians view patient case_data_panels\",\"Patients view own case_data_panels\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "case_data_panels",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "multiple_permissive_policies_clinical_case_data_panels_dashboard_user_SELECT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`clinical.clinical_notes_exports\\` has multiple permissive policies for role \\`anon\\` for action \\`SELECT\\`. Policies include \\`{\"Clinicians manage patient clinical_notes_exports\",\"Clinicians view patient clinical_notes_exports\",\"Patients view own clinical_notes_exports\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "clinical_notes_exports",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "multiple_permissive_policies_clinical_clinical_notes_exports_anon_SELECT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`clinical.clinical_notes_exports\\` has multiple permissive policies for role \\`authenticated\\` for action \\`SELECT\\`. Policies include \\`{\"Clinicians manage patient clinical_notes_exports\",\"Clinicians view patient clinical_notes_exports\",\"Patients view own clinical_notes_exports\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "clinical_notes_exports",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "multiple_permissive_policies_clinical_clinical_notes_exports_authenticated_SELECT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`clinical.clinical_notes_exports\\` has multiple permissive policies for role \\`authenticator\\` for action \\`SELECT\\`. Policies include \\`{\"Clinicians manage patient clinical_notes_exports\",\"Clinicians view patient clinical_notes_exports\",\"Patients view own clinical_notes_exports\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "clinical_notes_exports",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "multiple_permissive_policies_clinical_clinical_notes_exports_authenticator_SELECT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`clinical.clinical_notes_exports\\` has multiple permissive policies for role \\`dashboard_user\\` for action \\`SELECT\\`. Policies include \\`{\"Clinicians manage patient clinical_notes_exports\",\"Clinicians view patient clinical_notes_exports\",\"Patients view own clinical_notes_exports\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "clinical_notes_exports",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "multiple_permissive_policies_clinical_clinical_notes_exports_dashboard_user_SELECT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`clinical.clinical_scale_results\\` has multiple permissive policies for role \\`anon\\` for action \\`SELECT\\`. Policies include \\`{\"Clinicians manage patient clinical_scale_results\",\"Clinicians view patient clinical_scale_results\",\"Patients view own clinical_scale_results\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "clinical_scale_results",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "multiple_permissive_policies_clinical_clinical_scale_results_anon_SELECT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`clinical.clinical_scale_results\\` has multiple permissive policies for role \\`authenticated\\` for action \\`SELECT\\`. Policies include \\`{\"Clinicians manage patient clinical_scale_results\",\"Clinicians view patient clinical_scale_results\",\"Patients view own clinical_scale_results\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "clinical_scale_results",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "multiple_permissive_policies_clinical_clinical_scale_results_authenticated_SELECT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`clinical.clinical_scale_results\\` has multiple permissive policies for role \\`authenticator\\` for action \\`SELECT\\`. Policies include \\`{\"Clinicians manage patient clinical_scale_results\",\"Clinicians view patient clinical_scale_results\",\"Patients view own clinical_scale_results\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "clinical_scale_results",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "multiple_permissive_policies_clinical_clinical_scale_results_authenticator_SELECT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`clinical.clinical_scale_results\\` has multiple permissive policies for role \\`dashboard_user\\` for action \\`SELECT\\`. Policies include \\`{\"Clinicians manage patient clinical_scale_results\",\"Clinicians view patient clinical_scale_results\",\"Patients view own clinical_scale_results\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "clinical_scale_results",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "multiple_permissive_policies_clinical_clinical_scale_results_dashboard_user_SELECT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`clinical.neuro_imaging_results\\` has multiple permissive policies for role \\`anon\\` for action \\`SELECT\\`. Policies include \\`{\"Clinicians manage patient neuro_imaging_results\",\"Clinicians view patient neuro_imaging_results\",\"Patients view own neuro_imaging_results\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "neuro_imaging_results",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "multiple_permissive_policies_clinical_neuro_imaging_results_anon_SELECT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`clinical.neuro_imaging_results\\` has multiple permissive policies for role \\`authenticated\\` for action \\`SELECT\\`. Policies include \\`{\"Clinicians manage patient neuro_imaging_results\",\"Clinicians view patient neuro_imaging_results\",\"Patients view own neuro_imaging_results\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "neuro_imaging_results",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "multiple_permissive_policies_clinical_neuro_imaging_results_authenticated_SELECT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`clinical.neuro_imaging_results\\` has multiple permissive policies for role \\`authenticator\\` for action \\`SELECT\\`. Policies include \\`{\"Clinicians manage patient neuro_imaging_results\",\"Clinicians view patient neuro_imaging_results\",\"Patients view own neuro_imaging_results\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "neuro_imaging_results",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "multiple_permissive_policies_clinical_neuro_imaging_results_authenticator_SELECT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`clinical.neuro_imaging_results\\` has multiple permissive policies for role \\`dashboard_user\\` for action \\`SELECT\\`. Policies include \\`{\"Clinicians manage patient neuro_imaging_results\",\"Clinicians view patient neuro_imaging_results\",\"Patients view own neuro_imaging_results\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "neuro_imaging_results",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "multiple_permissive_policies_clinical_neuro_imaging_results_dashboard_user_SELECT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`clinical.patient_collab_chat\\` has multiple permissive policies for role \\`anon\\` for action \\`INSERT\\`. Policies include \\`{\"Participants send messages\",\"Senders manage messages\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "patient_collab_chat",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "multiple_permissive_policies_clinical_patient_collab_chat_anon_INSERT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`clinical.patient_collab_chat\\` has multiple permissive policies for role \\`anon\\` for action \\`SELECT\\`. Policies include \\`{\"Participants view chat\",\"Senders manage messages\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "patient_collab_chat",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "multiple_permissive_policies_clinical_patient_collab_chat_anon_SELECT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`clinical.patient_collab_chat\\` has multiple permissive policies for role \\`authenticated\\` for action \\`INSERT\\`. Policies include \\`{\"Participants send messages\",\"Senders manage messages\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "patient_collab_chat",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "multiple_permissive_policies_clinical_patient_collab_chat_authenticated_INSERT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`clinical.patient_collab_chat\\` has multiple permissive policies for role \\`authenticated\\` for action \\`SELECT\\`. Policies include \\`{\"Participants view chat\",\"Senders manage messages\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "patient_collab_chat",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "multiple_permissive_policies_clinical_patient_collab_chat_authenticated_SELECT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`clinical.patient_collab_chat\\` has multiple permissive policies for role \\`authenticator\\` for action \\`INSERT\\`. Policies include \\`{\"Participants send messages\",\"Senders manage messages\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "patient_collab_chat",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "multiple_permissive_policies_clinical_patient_collab_chat_authenticator_INSERT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`clinical.patient_collab_chat\\` has multiple permissive policies for role \\`authenticator\\` for action \\`SELECT\\`. Policies include \\`{\"Participants view chat\",\"Senders manage messages\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "patient_collab_chat",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "multiple_permissive_policies_clinical_patient_collab_chat_authenticator_SELECT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`clinical.patient_collab_chat\\` has multiple permissive policies for role \\`dashboard_user\\` for action \\`INSERT\\`. Policies include \\`{\"Participants send messages\",\"Senders manage messages\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "patient_collab_chat",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "multiple_permissive_policies_clinical_patient_collab_chat_dashboard_user_INSERT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`clinical.patient_collab_chat\\` has multiple permissive policies for role \\`dashboard_user\\` for action \\`SELECT\\`. Policies include \\`{\"Participants view chat\",\"Senders manage messages\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "patient_collab_chat",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "multiple_permissive_policies_clinical_patient_collab_chat_dashboard_user_SELECT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`clinical.patient_pro_timeline\\` has multiple permissive policies for role \\`anon\\` for action \\`INSERT\\`. Policies include \\`{\"Clinicians manage patient patient_pro_timeline\",\"System can insert PROs\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "patient_pro_timeline",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "multiple_permissive_policies_clinical_patient_pro_timeline_anon_INSERT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`clinical.patient_pro_timeline\\` has multiple permissive policies for role \\`anon\\` for action \\`SELECT\\`. Policies include \\`{\"Clinicians manage patient patient_pro_timeline\",\"Clinicians view patient patient_pro_timeline\",\"Patients view own patient_pro_timeline\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "patient_pro_timeline",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "multiple_permissive_policies_clinical_patient_pro_timeline_anon_SELECT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`clinical.patient_pro_timeline\\` has multiple permissive policies for role \\`authenticated\\` for action \\`INSERT\\`. Policies include \\`{\"Clinicians manage patient patient_pro_timeline\",\"System can insert PROs\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "patient_pro_timeline",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "multiple_permissive_policies_clinical_patient_pro_timeline_authenticated_INSERT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`clinical.patient_pro_timeline\\` has multiple permissive policies for role \\`authenticated\\` for action \\`SELECT\\`. Policies include \\`{\"Clinicians manage patient patient_pro_timeline\",\"Clinicians view patient patient_pro_timeline\",\"Patients view own patient_pro_timeline\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "patient_pro_timeline",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "multiple_permissive_policies_clinical_patient_pro_timeline_authenticated_SELECT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`clinical.patient_pro_timeline\\` has multiple permissive policies for role \\`authenticator\\` for action \\`INSERT\\`. Policies include \\`{\"Clinicians manage patient patient_pro_timeline\",\"System can insert PROs\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "patient_pro_timeline",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "multiple_permissive_policies_clinical_patient_pro_timeline_authenticator_INSERT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`clinical.patient_pro_timeline\\` has multiple permissive policies for role \\`authenticator\\` for action \\`SELECT\\`. Policies include \\`{\"Clinicians manage patient patient_pro_timeline\",\"Clinicians view patient patient_pro_timeline\",\"Patients view own patient_pro_timeline\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "patient_pro_timeline",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "multiple_permissive_policies_clinical_patient_pro_timeline_authenticator_SELECT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`clinical.patient_pro_timeline\\` has multiple permissive policies for role \\`dashboard_user\\` for action \\`INSERT\\`. Policies include \\`{\"Clinicians manage patient patient_pro_timeline\",\"System can insert PROs\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "patient_pro_timeline",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "multiple_permissive_policies_clinical_patient_pro_timeline_dashboard_user_INSERT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`clinical.patient_pro_timeline\\` has multiple permissive policies for role \\`dashboard_user\\` for action \\`SELECT\\`. Policies include \\`{\"Clinicians manage patient patient_pro_timeline\",\"Clinicians view patient patient_pro_timeline\",\"Patients view own patient_pro_timeline\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "patient_pro_timeline",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "multiple_permissive_policies_clinical_patient_pro_timeline_dashboard_user_SELECT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`clinical.patient_pro_value\\` has multiple permissive policies for role \\`anon\\` for action \\`SELECT\\`. Policies include \\`{\"Users can view PRO values for their own timeline\",\"Users can view their own PRO values\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "patient_pro_value",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "multiple_permissive_policies_clinical_patient_pro_value_anon_SELECT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`clinical.patient_pro_value\\` has multiple permissive policies for role \\`authenticated\\` for action \\`SELECT\\`. Policies include \\`{\"Users can view PRO values for their own timeline\",\"Users can view their own PRO values\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "patient_pro_value",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "multiple_permissive_policies_clinical_patient_pro_value_authenticated_SELECT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`clinical.patient_pro_value\\` has multiple permissive policies for role \\`authenticator\\` for action \\`SELECT\\`. Policies include \\`{\"Users can view PRO values for their own timeline\",\"Users can view their own PRO values\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "patient_pro_value",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "multiple_permissive_policies_clinical_patient_pro_value_authenticator_SELECT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`clinical.patient_pro_value\\` has multiple permissive policies for role \\`dashboard_user\\` for action \\`SELECT\\`. Policies include \\`{\"Users can view PRO values for their own timeline\",\"Users can view their own PRO values\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "patient_pro_value",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "multiple_permissive_policies_clinical_patient_pro_value_dashboard_user_SELECT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`clinical.patient_risk_alerts\\` has multiple permissive policies for role \\`anon\\` for action \\`SELECT\\`. Policies include \\`{\"Clinicians manage patient patient_risk_alerts\",\"Clinicians view patient patient_risk_alerts\",\"Patients view own patient_risk_alerts\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "patient_risk_alerts",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "multiple_permissive_policies_clinical_patient_risk_alerts_anon_SELECT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`clinical.patient_risk_alerts\\` has multiple permissive policies for role \\`authenticated\\` for action \\`SELECT\\`. Policies include \\`{\"Clinicians manage patient patient_risk_alerts\",\"Clinicians view patient patient_risk_alerts\",\"Patients view own patient_risk_alerts\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "patient_risk_alerts",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "multiple_permissive_policies_clinical_patient_risk_alerts_authenticated_SELECT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`clinical.patient_risk_alerts\\` has multiple permissive policies for role \\`authenticator\\` for action \\`SELECT\\`. Policies include \\`{\"Clinicians manage patient patient_risk_alerts\",\"Clinicians view patient patient_risk_alerts\",\"Patients view own patient_risk_alerts\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "patient_risk_alerts",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "multiple_permissive_policies_clinical_patient_risk_alerts_authenticator_SELECT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`clinical.patient_risk_alerts\\` has multiple permissive policies for role \\`dashboard_user\\` for action \\`SELECT\\`. Policies include \\`{\"Clinicians manage patient patient_risk_alerts\",\"Clinicians view patient patient_risk_alerts\",\"Patients view own patient_risk_alerts\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "patient_risk_alerts",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "multiple_permissive_policies_clinical_patient_risk_alerts_dashboard_user_SELECT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`clinical.patient_snapshots\\` has multiple permissive policies for role \\`anon\\` for action \\`INSERT\\`. Policies include \\`{\"Clinicians manage patient patient_snapshots\",\"System can generate snapshots\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "patient_snapshots",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "multiple_permissive_policies_clinical_patient_snapshots_anon_INSERT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`clinical.patient_snapshots\\` has multiple permissive policies for role \\`anon\\` for action \\`SELECT\\`. Policies include \\`{\"Clinicians manage patient patient_snapshots\",\"Clinicians view patient patient_snapshots\",\"Patients view own patient_snapshots\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "patient_snapshots",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "multiple_permissive_policies_clinical_patient_snapshots_anon_SELECT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`clinical.patient_snapshots\\` has multiple permissive policies for role \\`authenticated\\` for action \\`INSERT\\`. Policies include \\`{\"Clinicians manage patient patient_snapshots\",\"System can generate snapshots\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "patient_snapshots",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "multiple_permissive_policies_clinical_patient_snapshots_authenticated_INSERT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`clinical.patient_snapshots\\` has multiple permissive policies for role \\`authenticated\\` for action \\`SELECT\\`. Policies include \\`{\"Clinicians manage patient patient_snapshots\",\"Clinicians view patient patient_snapshots\",\"Patients view own patient_snapshots\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "patient_snapshots",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "multiple_permissive_policies_clinical_patient_snapshots_authenticated_SELECT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`clinical.patient_snapshots\\` has multiple permissive policies for role \\`authenticator\\` for action \\`INSERT\\`. Policies include \\`{\"Clinicians manage patient patient_snapshots\",\"System can generate snapshots\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "patient_snapshots",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "multiple_permissive_policies_clinical_patient_snapshots_authenticator_INSERT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`clinical.patient_snapshots\\` has multiple permissive policies for role \\`authenticator\\` for action \\`SELECT\\`. Policies include \\`{\"Clinicians manage patient patient_snapshots\",\"Clinicians view patient patient_snapshots\",\"Patients view own patient_snapshots\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "patient_snapshots",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "multiple_permissive_policies_clinical_patient_snapshots_authenticator_SELECT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`clinical.patient_snapshots\\` has multiple permissive policies for role \\`dashboard_user\\` for action \\`INSERT\\`. Policies include \\`{\"Clinicians manage patient patient_snapshots\",\"System can generate snapshots\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "patient_snapshots",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "multiple_permissive_policies_clinical_patient_snapshots_dashboard_user_INSERT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`clinical.patient_snapshots\\` has multiple permissive policies for role \\`dashboard_user\\` for action \\`SELECT\\`. Policies include \\`{\"Clinicians manage patient patient_snapshots\",\"Clinicians view patient patient_snapshots\",\"Patients view own patient_snapshots\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "patient_snapshots",
      "type": "table",
      "schema": "clinical"
    },
    "cache_key": "multiple_permissive_policies_clinical_patient_snapshots_dashboard_user_SELECT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`private_health_info.clinical_media\\` has multiple permissive policies for role \\`anon\\` for action \\`SELECT\\`. Policies include \\`{\"Clinicians view patient clinical_media\",\"Users view own clinical_media\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "clinical_media",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "multiple_permissive_policies_private_health_info_clinical_media_anon_SELECT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`private_health_info.clinical_media\\` has multiple permissive policies for role \\`authenticated\\` for action \\`SELECT\\`. Policies include \\`{\"Clinicians view patient clinical_media\",\"Users view own clinical_media\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "clinical_media",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "multiple_permissive_policies_private_health_info_clinical_media_authenticated_SELECT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`private_health_info.clinical_media\\` has multiple permissive policies for role \\`authenticator\\` for action \\`SELECT\\`. Policies include \\`{\"Clinicians view patient clinical_media\",\"Users view own clinical_media\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "clinical_media",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "multiple_permissive_policies_private_health_info_clinical_media_authenticator_SELECT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`private_health_info.clinical_media\\` has multiple permissive policies for role \\`dashboard_user\\` for action \\`SELECT\\`. Policies include \\`{\"Clinicians view patient clinical_media\",\"Users view own clinical_media\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "clinical_media",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "multiple_permissive_policies_private_health_info_clinical_media_dashboard_user_SELECT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`private_health_info.daily_symptom_logs\\` has multiple permissive policies for role \\`anon\\` for action \\`SELECT\\`. Policies include \\`{\"Clinicians view patient daily_symptom_logs\",\"Users view own daily_symptom_logs\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "daily_symptom_logs",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "multiple_permissive_policies_private_health_info_daily_symptom_logs_anon_SELECT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`private_health_info.daily_symptom_logs\\` has multiple permissive policies for role \\`authenticated\\` for action \\`SELECT\\`. Policies include \\`{\"Clinicians view patient daily_symptom_logs\",\"Users view own daily_symptom_logs\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "daily_symptom_logs",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "multiple_permissive_policies_private_health_info_daily_symptom_logs_authenticated_SELECT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`private_health_info.daily_symptom_logs\\` has multiple permissive policies for role \\`authenticator\\` for action \\`SELECT\\`. Policies include \\`{\"Clinicians view patient daily_symptom_logs\",\"Users view own daily_symptom_logs\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "daily_symptom_logs",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "multiple_permissive_policies_private_health_info_daily_symptom_logs_authenticator_SELECT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`private_health_info.daily_symptom_logs\\` has multiple permissive policies for role \\`dashboard_user\\` for action \\`SELECT\\`. Policies include \\`{\"Clinicians view patient daily_symptom_logs\",\"Users view own daily_symptom_logs\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "daily_symptom_logs",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "multiple_permissive_policies_private_health_info_daily_symptom_logs_dashboard_user_SELECT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`private_health_info.gait_episodes\\` has multiple permissive policies for role \\`anon\\` for action \\`SELECT\\`. Policies include \\`{\"Clinicians view patient gait_episodes\",\"Users view own gait_episodes\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "gait_episodes",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "multiple_permissive_policies_private_health_info_gait_episodes_anon_SELECT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`private_health_info.gait_episodes\\` has multiple permissive policies for role \\`authenticated\\` for action \\`SELECT\\`. Policies include \\`{\"Clinicians view patient gait_episodes\",\"Users view own gait_episodes\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "gait_episodes",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "multiple_permissive_policies_private_health_info_gait_episodes_authenticated_SELECT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`private_health_info.gait_episodes\\` has multiple permissive policies for role \\`authenticator\\` for action \\`SELECT\\`. Policies include \\`{\"Clinicians view patient gait_episodes\",\"Users view own gait_episodes\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "gait_episodes",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "multiple_permissive_policies_private_health_info_gait_episodes_authenticator_SELECT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`private_health_info.gait_episodes\\` has multiple permissive policies for role \\`dashboard_user\\` for action \\`SELECT\\`. Policies include \\`{\"Clinicians view patient gait_episodes\",\"Users view own gait_episodes\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "gait_episodes",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "multiple_permissive_policies_private_health_info_gait_episodes_dashboard_user_SELECT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`private_health_info.seizure_events\\` has multiple permissive policies for role \\`anon\\` for action \\`SELECT\\`. Policies include \\`{\"Clinicians view patient seizure_events\",\"Users view own seizure_events\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "seizure_events",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "multiple_permissive_policies_private_health_info_seizure_events_anon_SELECT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`private_health_info.seizure_events\\` has multiple permissive policies for role \\`authenticated\\` for action \\`SELECT\\`. Policies include \\`{\"Clinicians view patient seizure_events\",\"Users view own seizure_events\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "seizure_events",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "multiple_permissive_policies_private_health_info_seizure_events_authenticated_SELECT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`private_health_info.seizure_events\\` has multiple permissive policies for role \\`authenticator\\` for action \\`SELECT\\`. Policies include \\`{\"Clinicians view patient seizure_events\",\"Users view own seizure_events\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "seizure_events",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "multiple_permissive_policies_private_health_info_seizure_events_authenticator_SELECT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`private_health_info.seizure_events\\` has multiple permissive policies for role \\`dashboard_user\\` for action \\`SELECT\\`. Policies include \\`{\"Clinicians view patient seizure_events\",\"Users view own seizure_events\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "seizure_events",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "multiple_permissive_policies_private_health_info_seizure_events_dashboard_user_SELECT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`private_health_info.seizure_logs\\` has multiple permissive policies for role \\`anon\\` for action \\`DELETE\\`. Policies include \\`{\"Users can delete own seizure logs\",\"Users can manage own seizure logs\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "seizure_logs",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "multiple_permissive_policies_private_health_info_seizure_logs_anon_DELETE"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`private_health_info.seizure_logs\\` has multiple permissive policies for role \\`anon\\` for action \\`INSERT\\`. Policies include \\`{\"Users can insert own seizure logs\",\"Users can manage own seizure logs\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "seizure_logs",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "multiple_permissive_policies_private_health_info_seizure_logs_anon_INSERT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`private_health_info.seizure_logs\\` has multiple permissive policies for role \\`anon\\` for action \\`SELECT\\`. Policies include \\`{\"Users can manage own seizure logs\",\"Users can view own seizure logs\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "seizure_logs",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "multiple_permissive_policies_private_health_info_seizure_logs_anon_SELECT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`private_health_info.seizure_logs\\` has multiple permissive policies for role \\`anon\\` for action \\`UPDATE\\`. Policies include \\`{\"Users can manage own seizure logs\",\"Users can update own seizure logs\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "seizure_logs",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "multiple_permissive_policies_private_health_info_seizure_logs_anon_UPDATE"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`private_health_info.seizure_logs\\` has multiple permissive policies for role \\`authenticated\\` for action \\`DELETE\\`. Policies include \\`{\"Users can delete own seizure logs\",\"Users can manage own seizure logs\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "seizure_logs",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "multiple_permissive_policies_private_health_info_seizure_logs_authenticated_DELETE"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`private_health_info.seizure_logs\\` has multiple permissive policies for role \\`authenticated\\` for action \\`INSERT\\`. Policies include \\`{\"Users can insert own seizure logs\",\"Users can manage own seizure logs\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "seizure_logs",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "multiple_permissive_policies_private_health_info_seizure_logs_authenticated_INSERT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`private_health_info.seizure_logs\\` has multiple permissive policies for role \\`authenticated\\` for action \\`SELECT\\`. Policies include \\`{\"Users can manage own seizure logs\",\"Users can view own seizure logs\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "seizure_logs",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "multiple_permissive_policies_private_health_info_seizure_logs_authenticated_SELECT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`private_health_info.seizure_logs\\` has multiple permissive policies for role \\`authenticated\\` for action \\`UPDATE\\`. Policies include \\`{\"Users can manage own seizure logs\",\"Users can update own seizure logs\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "seizure_logs",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "multiple_permissive_policies_private_health_info_seizure_logs_authenticated_UPDATE"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`private_health_info.seizure_logs\\` has multiple permissive policies for role \\`authenticator\\` for action \\`DELETE\\`. Policies include \\`{\"Users can delete own seizure logs\",\"Users can manage own seizure logs\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "seizure_logs",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "multiple_permissive_policies_private_health_info_seizure_logs_authenticator_DELETE"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`private_health_info.seizure_logs\\` has multiple permissive policies for role \\`authenticator\\` for action \\`INSERT\\`. Policies include \\`{\"Users can insert own seizure logs\",\"Users can manage own seizure logs\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "seizure_logs",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "multiple_permissive_policies_private_health_info_seizure_logs_authenticator_INSERT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`private_health_info.seizure_logs\\` has multiple permissive policies for role \\`authenticator\\` for action \\`SELECT\\`. Policies include \\`{\"Users can manage own seizure logs\",\"Users can view own seizure logs\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "seizure_logs",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "multiple_permissive_policies_private_health_info_seizure_logs_authenticator_SELECT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`private_health_info.seizure_logs\\` has multiple permissive policies for role \\`authenticator\\` for action \\`UPDATE\\`. Policies include \\`{\"Users can manage own seizure logs\",\"Users can update own seizure logs\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "seizure_logs",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "multiple_permissive_policies_private_health_info_seizure_logs_authenticator_UPDATE"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`private_health_info.seizure_logs\\` has multiple permissive policies for role \\`dashboard_user\\` for action \\`DELETE\\`. Policies include \\`{\"Users can delete own seizure logs\",\"Users can manage own seizure logs\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "seizure_logs",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "multiple_permissive_policies_private_health_info_seizure_logs_dashboard_user_DELETE"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`private_health_info.seizure_logs\\` has multiple permissive policies for role \\`dashboard_user\\` for action \\`INSERT\\`. Policies include \\`{\"Users can insert own seizure logs\",\"Users can manage own seizure logs\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "seizure_logs",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "multiple_permissive_policies_private_health_info_seizure_logs_dashboard_user_INSERT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`private_health_info.seizure_logs\\` has multiple permissive policies for role \\`dashboard_user\\` for action \\`SELECT\\`. Policies include \\`{\"Users can manage own seizure logs\",\"Users can view own seizure logs\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "seizure_logs",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "multiple_permissive_policies_private_health_info_seizure_logs_dashboard_user_SELECT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`private_health_info.seizure_logs\\` has multiple permissive policies for role \\`dashboard_user\\` for action \\`UPDATE\\`. Policies include \\`{\"Users can manage own seizure logs\",\"Users can update own seizure logs\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "seizure_logs",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "multiple_permissive_policies_private_health_info_seizure_logs_dashboard_user_UPDATE"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`private_health_info.tremor_episodes\\` has multiple permissive policies for role \\`anon\\` for action \\`SELECT\\`. Policies include \\`{\"Clinicians view patient tremor_episodes\",\"Users view own tremor_episodes\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "tremor_episodes",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "multiple_permissive_policies_private_health_info_tremor_episodes_anon_SELECT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`private_health_info.tremor_episodes\\` has multiple permissive policies for role \\`authenticated\\` for action \\`SELECT\\`. Policies include \\`{\"Clinicians view patient tremor_episodes\",\"Users view own tremor_episodes\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "tremor_episodes",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "multiple_permissive_policies_private_health_info_tremor_episodes_authenticated_SELECT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`private_health_info.tremor_episodes\\` has multiple permissive policies for role \\`authenticator\\` for action \\`SELECT\\`. Policies include \\`{\"Clinicians view patient tremor_episodes\",\"Users view own tremor_episodes\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "tremor_episodes",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "multiple_permissive_policies_private_health_info_tremor_episodes_authenticator_SELECT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`private_health_info.tremor_episodes\\` has multiple permissive policies for role \\`dashboard_user\\` for action \\`SELECT\\`. Policies include \\`{\"Clinicians view patient tremor_episodes\",\"Users view own tremor_episodes\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "tremor_episodes",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "multiple_permissive_policies_private_health_info_tremor_episodes_dashboard_user_SELECT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`public.brain_regions_reference\\` has multiple permissive policies for role \\`authenticated\\` for action \\`SELECT\\`. Policies include \\`{\"Anyone authenticated can read brain regions\",brain_regions_readable_by_all}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "brain_regions_reference",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "multiple_permissive_policies_public_brain_regions_reference_authenticated_SELECT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`public.clinical_scales_library\\` has multiple permissive policies for role \\`authenticated\\` for action \\`SELECT\\`. Policies include \\`{\"Clinical scales library readable by authenticated\",\"Scales library readable by authenticated\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "clinical_scales_library",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "multiple_permissive_policies_public_clinical_scales_library_authenticated_SELECT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`public.daily_tracking_preferences\\` has multiple permissive policies for role \\`authenticated\\` for action \\`INSERT\\`. Policies include \\`{\"Users can insert own tracking preferences\",users_can_manage_own_tracking_prefs}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "daily_tracking_preferences",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "multiple_permissive_policies_public_daily_tracking_preferences_authenticated_INSERT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`public.daily_tracking_preferences\\` has multiple permissive policies for role \\`authenticated\\` for action \\`SELECT\\`. Policies include \\`{\"Users can view own tracking preferences\",users_can_manage_own_tracking_prefs}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "daily_tracking_preferences",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "multiple_permissive_policies_public_daily_tracking_preferences_authenticated_SELECT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`public.daily_tracking_preferences\\` has multiple permissive policies for role \\`authenticated\\` for action \\`UPDATE\\`. Policies include \\`{\"Users can update own tracking preferences\",users_can_manage_own_tracking_prefs}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "daily_tracking_preferences",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "multiple_permissive_policies_public_daily_tracking_preferences_authenticated_UPDATE"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`public.medications\\` has multiple permissive policies for role \\`anon\\` for action \\`SELECT\\`. Policies include \\`{\"Enable read access for all users\",medications_readable_by_all}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "medications",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "multiple_permissive_policies_public_medications_anon_SELECT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`public.medications\\` has multiple permissive policies for role \\`authenticated\\` for action \\`SELECT\\`. Policies include \\`{\"Enable read access for all users\",medications_readable_by_all}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "medications",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "multiple_permissive_policies_public_medications_authenticated_SELECT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`public.profiles\\` has multiple permissive policies for role \\`anon\\` for action \\`INSERT\\`. Policies include \\`{\"Service role can insert profiles\",\"System can insert profiles\",\"Users manage own profile\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "profiles",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "multiple_permissive_policies_public_profiles_anon_INSERT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`public.profiles\\` has multiple permissive policies for role \\`authenticated\\` for action \\`INSERT\\`. Policies include \\`{\"Service role can insert profiles\",\"System can insert profiles\",\"Users manage own profile\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "profiles",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "multiple_permissive_policies_public_profiles_authenticated_INSERT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`public.profiles\\` has multiple permissive policies for role \\`authenticator\\` for action \\`INSERT\\`. Policies include \\`{\"Service role can insert profiles\",\"System can insert profiles\",\"Users manage own profile\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "profiles",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "multiple_permissive_policies_public_profiles_authenticator_INSERT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`public.profiles\\` has multiple permissive policies for role \\`dashboard_user\\` for action \\`INSERT\\`. Policies include \\`{\"Service role can insert profiles\",\"System can insert profiles\",\"Users manage own profile\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "profiles",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "multiple_permissive_policies_public_profiles_dashboard_user_INSERT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`public.research_consent\\` has multiple permissive policies for role \\`authenticated\\` for action \\`DELETE\\`. Policies include \\`{\"Users manage own research_consent\",users_can_manage_own_research_consent}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "research_consent",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "multiple_permissive_policies_public_research_consent_authenticated_DELETE"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`public.research_consent\\` has multiple permissive policies for role \\`authenticated\\` for action \\`INSERT\\`. Policies include \\`{\"Users manage own research_consent\",users_can_manage_own_research_consent}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "research_consent",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "multiple_permissive_policies_public_research_consent_authenticated_INSERT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`public.research_consent\\` has multiple permissive policies for role \\`authenticated\\` for action \\`SELECT\\`. Policies include \\`{\"Users manage own research_consent\",users_can_manage_own_research_consent}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "research_consent",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "multiple_permissive_policies_public_research_consent_authenticated_SELECT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`public.research_consent\\` has multiple permissive policies for role \\`authenticated\\` for action \\`UPDATE\\`. Policies include \\`{\"Users manage own research_consent\",users_can_manage_own_research_consent}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "research_consent",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "multiple_permissive_policies_public_research_consent_authenticated_UPDATE"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`public.seizure_signs_reference\\` has multiple permissive policies for role \\`authenticated\\` for action \\`SELECT\\`. Policies include \\`{\"Anyone authenticated can read seizure signs\",seizure_signs_readable_by_all}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "seizure_signs_reference",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "multiple_permissive_policies_public_seizure_signs_reference_authenticated_SELECT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`public.seizure_triggers_reference\\` has multiple permissive policies for role \\`authenticated\\` for action \\`SELECT\\`. Policies include \\`{\"Anyone authenticated can read seizure triggers\",seizure_triggers_readable_by_all}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "seizure_triggers_reference",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "multiple_permissive_policies_public_seizure_triggers_reference_authenticated_SELECT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`public.sign_brain_region_mapping\\` has multiple permissive policies for role \\`authenticated\\` for action \\`SELECT\\`. Policies include \\`{\"Anyone authenticated can read sign-brain mappings\",sign_brain_mapping_readable_by_all}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "sign_brain_region_mapping",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "multiple_permissive_policies_public_sign_brain_region_mapping_authenticated_SELECT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`public.user_achievements\\` has multiple permissive policies for role \\`anon\\` for action \\`INSERT\\`. Policies include \\`{\"System can award achievements\",\"Users manage own user_achievements\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "user_achievements",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "multiple_permissive_policies_public_user_achievements_anon_INSERT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`public.user_achievements\\` has multiple permissive policies for role \\`authenticated\\` for action \\`INSERT\\`. Policies include \\`{\"System can award achievements\",\"Users manage own user_achievements\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "user_achievements",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "multiple_permissive_policies_public_user_achievements_authenticated_INSERT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`public.user_achievements\\` has multiple permissive policies for role \\`authenticator\\` for action \\`INSERT\\`. Policies include \\`{\"System can award achievements\",\"Users manage own user_achievements\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "user_achievements",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "multiple_permissive_policies_public_user_achievements_authenticator_INSERT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`public.user_achievements\\` has multiple permissive policies for role \\`dashboard_user\\` for action \\`INSERT\\`. Policies include \\`{\"System can award achievements\",\"Users manage own user_achievements\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "user_achievements",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "multiple_permissive_policies_public_user_achievements_dashboard_user_INSERT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`public.user_points\\` has multiple permissive policies for role \\`anon\\` for action \\`DELETE\\`. Policies include \\`{\"System can manage points\",\"Users manage own user_points\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "user_points",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "multiple_permissive_policies_public_user_points_anon_DELETE"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`public.user_points\\` has multiple permissive policies for role \\`anon\\` for action \\`INSERT\\`. Policies include \\`{\"System can manage points\",\"Users manage own user_points\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "user_points",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "multiple_permissive_policies_public_user_points_anon_INSERT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`public.user_points\\` has multiple permissive policies for role \\`anon\\` for action \\`SELECT\\`. Policies include \\`{\"System can manage points\",\"Users manage own user_points\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "user_points",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "multiple_permissive_policies_public_user_points_anon_SELECT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`public.user_points\\` has multiple permissive policies for role \\`anon\\` for action \\`UPDATE\\`. Policies include \\`{\"System can manage points\",\"Users manage own user_points\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "user_points",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "multiple_permissive_policies_public_user_points_anon_UPDATE"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`public.user_points\\` has multiple permissive policies for role \\`authenticated\\` for action \\`DELETE\\`. Policies include \\`{\"System can manage points\",\"Users manage own user_points\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "user_points",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "multiple_permissive_policies_public_user_points_authenticated_DELETE"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`public.user_points\\` has multiple permissive policies for role \\`authenticated\\` for action \\`INSERT\\`. Policies include \\`{\"System can manage points\",\"Users manage own user_points\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "user_points",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "multiple_permissive_policies_public_user_points_authenticated_INSERT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`public.user_points\\` has multiple permissive policies for role \\`authenticated\\` for action \\`SELECT\\`. Policies include \\`{\"System can manage points\",\"Users manage own user_points\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "user_points",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "multiple_permissive_policies_public_user_points_authenticated_SELECT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`public.user_points\\` has multiple permissive policies for role \\`authenticated\\` for action \\`UPDATE\\`. Policies include \\`{\"System can manage points\",\"Users manage own user_points\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "user_points",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "multiple_permissive_policies_public_user_points_authenticated_UPDATE"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`public.user_points\\` has multiple permissive policies for role \\`authenticator\\` for action \\`DELETE\\`. Policies include \\`{\"System can manage points\",\"Users manage own user_points\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "user_points",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "multiple_permissive_policies_public_user_points_authenticator_DELETE"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`public.user_points\\` has multiple permissive policies for role \\`authenticator\\` for action \\`INSERT\\`. Policies include \\`{\"System can manage points\",\"Users manage own user_points\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "user_points",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "multiple_permissive_policies_public_user_points_authenticator_INSERT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`public.user_points\\` has multiple permissive policies for role \\`authenticator\\` for action \\`SELECT\\`. Policies include \\`{\"System can manage points\",\"Users manage own user_points\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "user_points",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "multiple_permissive_policies_public_user_points_authenticator_SELECT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`public.user_points\\` has multiple permissive policies for role \\`authenticator\\` for action \\`UPDATE\\`. Policies include \\`{\"System can manage points\",\"Users manage own user_points\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "user_points",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "multiple_permissive_policies_public_user_points_authenticator_UPDATE"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`public.user_points\\` has multiple permissive policies for role \\`dashboard_user\\` for action \\`DELETE\\`. Policies include \\`{\"System can manage points\",\"Users manage own user_points\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "user_points",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "multiple_permissive_policies_public_user_points_dashboard_user_DELETE"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`public.user_points\\` has multiple permissive policies for role \\`dashboard_user\\` for action \\`INSERT\\`. Policies include \\`{\"System can manage points\",\"Users manage own user_points\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "user_points",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "multiple_permissive_policies_public_user_points_dashboard_user_INSERT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`public.user_points\\` has multiple permissive policies for role \\`dashboard_user\\` for action \\`SELECT\\`. Policies include \\`{\"System can manage points\",\"Users manage own user_points\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "user_points",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "multiple_permissive_policies_public_user_points_dashboard_user_SELECT"
  },
  {
    "name": "multiple_permissive_policies",
    "title": "Multiple Permissive Policies",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects if multiple permissive row level security policies are present on a table for the same \\`role\\` and \\`action\\` (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.",
    "detail": "Table \\`public.user_points\\` has multiple permissive policies for role \\`dashboard_user\\` for action \\`UPDATE\\`. Policies include \\`{\"System can manage points\",\"Users manage own user_points\"}\\`",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies",
    "metadata": {
      "name": "user_points",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "multiple_permissive_policies_public_user_points_dashboard_user_UPDATE"
  },
  {
    "name": "duplicate_index",
    "title": "Duplicate Index",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "PERFORMANCE"
    ],
    "description": "Detects cases where two ore more identical indexes exist.",
    "detail": "Table \\`clinical.patient_pro_timeline\\` has identical indexes {idx_pro_timeline_type,idx_pro_type}. Drop all except one of them",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0009_duplicate_index",
    "metadata": {
      "name": "patient_pro_timeline",
      "type": "table",
      "schema": "clinical",
      "indexes": [
        "idx_pro_timeline_type",
        "idx_pro_type"
      ]
    },
    "cache_key": "duplicate_index_clinical_patient_pro_timeline_{idx_pro_timeline_type,idx_pro_type}"
  }
]










# Issues described further below 

### Issue a
Table private_health_info.daily_symptom_logs has a row level security policy Users view own daily_symptom_logs that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing auth.<function>() with (select auth.<function>()). See docs for more info.

### Description a
Detects if calls to current_setting() and auth.<function>() in RLS policies are being unnecessarily re-evaluated for each row

### Practical approaches
Create stable, cached helpers
Wrap auth and claim extraction in small SECURITY DEFINER STABLE functions that return primitives. Reference these helpers in policies instead of calling auth.* or current_setting directly.
Because you’ll call the helper as a function, still use the scalar subselect pattern in policies once, but the heavy lifting lives in the helper.*
Example helpers

SQL Query


```sql
-- Current user id
CREATE OR REPLACE FUNCTION app.get_current_user_id()
RETURNS uuid
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT auth.uid();
$$;
REVOKE EXECUTE ON FUNCTION app.get_current_user_id() FROM anon, authenticated;

-- Tenant id from JWT
CREATE OR REPLACE FUNCTION app.get_current_tenant_id()
RETURNS uuid
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT ((auth.jwt() ->> 'tenant_id')::uuid);
$$;
REVOKE EXECUTE ON FUNCTION app.get_current_tenant_id() FROM anon, authenticated;
```

### Policy usage pattern

* SQL Query


```sql
USING (user_id = (select app.get_current_user_id()))
-- or
USING (tenant_id = (select app.get_current_tenant_id()))
```

## Benefit:

In the future if you need to change how you derive identity/claims, you edit the helper once (or a few helpers), not 230 policies.
You still get the per-statement evaluation benefit via the scalar subselect.
SECURITY DEFINER lets you encapsulate complexity safely; just ensure you REVOKE EXECUTE from public roles.
Use a view layer for identity values
Create a small view that exposes the current identity values as constants via subselects, then reference them in policies.
This is less common than helper functions but can ease refactors.
Example

SQL Query


```sql
CREATE OR REPLACE VIEW app.current_context AS
SELECT
  (select auth.uid())       AS user_id,
  ((select auth.jwt()) ->> 'tenant_id')::uuid AS tenant_id;
```

## Policy usage

SQL Query
```sql
USING (user_id = (select user_id from app.current_context))
```

### Migration helper to bulk-update policies
If your policies follow consistent patterns, write a one-time migration to rewrite them automatically using pg_catalog introspection and string replacement.
Caveat: Only do this if policy definitions are regular enough to transform safely; otherwise risk manual review.



## Sketch
* SQL Query


```sql
-- Pseudo: detect policies with 'auth.uid()' and regenerate with '(select auth.uid())'
-- You’d read pg_policy, pg_get_expr(pol.polqual, pol.polrelid), build new text, and EXECUTE.
-- Test in a staging branch first.
```

### Prioritize hot tables
If a global rewrite is too risky, first fix policies on your highest-traffic tables (top read/write paths). You’ll get most of the performance gains with a fraction of the work.
Recommended plan
Add app.get_current_user_id() and app.get_current_tenant_id() now.
Update policies in batches to reference these helpers using the scalar subselect pattern.
Start with hot tables, then roll through the remainder. If feasible, automate the rewrite for simple patterns.
Ensure indexes exist for columns used in policy predicates (user_id, tenant_id, org_id, etc.).
Notes and safeguards
Keep helpers STABLE and SECURITY DEFINER; do not expose them to anon/authenticated via EXECUTE.
Avoid introducing joins inside policy expressions; prefer EXISTS or subselects within helpers for performance.
Test with EXPLAIN ANALYZE on representative queries to confirm plan stability and index usage.




## Issue b
Table clinical.patient_snapshots has multiple permissive policies for role anon for action INSERT. Policies include {"Clinicians manage patient patient_snapshots","System can generate snapshots"}

## Description
Detects if multiple permissive row level security policies are present on a table for the same role and action (e.g. insert). Multiple permissive policies are suboptimal for performance as each policy must be executed for every relevant query.

## Summary of the issue
Table: clinical.patient_snapshots
Action: INSERT
Role: anon (effectively public/unauthenticated in your setup)
Finding: There are multiple permissive INSERT policies:
"Clinicians manage patient patient_snapshots" (Command: ALL; applies to public; includes a WITH CHECK using patient_clinician_connections)
"System can generate snapshots" (Command: INSERT; applies to public; WITH CHECK: author = 'ai')
Because policies for the same role and action are combined with OR, Postgres evaluates each relevant policy on every INSERT. This increases planning/execution overhead and can create unexpected access if any single policy is too broad.

## Why it matters
Performance: Each additional permissive policy adds another condition to evaluate on every insert, impacting latency under load.
Clarity and safety: Overlapping policies make it harder to reason about who can insert and under what conditions, increasing risk of unintended access.
Recommended fixes
Pick one or combine several of the options below to simplify and harden your policy model. Aim for a single INSERT policy per role when possible.

Split roles and scope policies precisely
If “System can generate snapshots” is intended for backend/service usage, move it to service_role or a dedicated role rather than public/anon.
Similarly, the clinician workflow should target authenticated users, not public/anon.
Example adjustments:

Change “System can generate snapshots” to TO authenticated and require a stricter check (e.g., a JWT claim) or use service_role which bypasses RLS entirely.
Change “Clinicians manage patient patient_snapshots” to TO authenticated (not public) and keep the current WITH CHECK join to patient_clinician_connections.
Merge logic into a single INSERT policy for the same role
If both conditions truly must be available to the same role, consolidate into one policy with an OR condition inside WITH CHECK. This reduces the number of policies to evaluate.
Illustrative example (conceptual, not executed):

### SQL Query


```sql
-- Single policy for authenticated inserts, combining both conditions
CREATE POLICY "Insert snapshots (clinician or ai)"
ON clinical.patient_snapshots
FOR INSERT
TO authenticated
WITH CHECK (
  -- Clinician linked to patient
  EXISTS (
    SELECT 1
    FROM patient_clinician_connections pcc
    WHERE pcc.patient_id = patient_snapshots.patient_id
      AND pcc.clinician_id = (SELECT auth.uid())
      AND pcc.status = 'active'
  )
  OR
  -- System-generated snapshots
  author = 'ai'
);
```

## Prefer service_role for trusted system writes
If snapshots generated by the system occur from secure server-side code, call the database using the service role key. The service_role bypasses RLS, eliminating the need for a permissive public/anon policy for that path. Remove “System can generate snapshots” from public/anon if you take this route.

## Ensure indexes to support policy conditions
Add indexes for columns referenced in policy checks to keep RLS fast:
patient_clinician_connections(patient_id, clinician_id, status)
patient_snapshots(patient_id)

## If author is frequently checked, consider an index on patient_snapshots(author) if it materially helps your insert path validations.
Concrete next steps
Decide intended access for each path:

## Clinician inserts should require authenticated role and an active connection to the patient.

##System-generated inserts should either use service_role (preferred) or authenticated with a verifiable claim, not anon/public.

## Reduce to one INSERT policy per role:

## Either merge the conditions into one policy for authenticated users, or separate into distinct roles (authenticated vs service_role) so only one applies at runtime.

## Add the supporting indexes noted above.





# OTHER BIG ISSUES

```json
[
  {
    "name": "function_search_path_mutable",
    "title": "Function Search Path Mutable",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "SECURITY"
    ],
    "description": "Detects functions where the search_path parameter is not set.",
    "detail": "Function \\`public.test_user_creation\\` has a role mutable search_path",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0011_function_search_path_mutable",
    "metadata": {
      "name": "test_user_creation",
      "type": "function",
      "schema": "public"
    },
    "cache_key": "function_search_path_mutable_public_test_user_creation_4da7032ae3e745623de16c84ea2e572b"
  },
  {
    "name": "function_search_path_mutable",
    "title": "Function Search Path Mutable",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "SECURITY"
    ],
    "description": "Detects functions where the search_path parameter is not set.",
    "detail": "Function \\`public.get_recent_errors\\` has a role mutable search_path",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0011_function_search_path_mutable",
    "metadata": {
      "name": "get_recent_errors",
      "type": "function",
      "schema": "public"
    },
    "cache_key": "function_search_path_mutable_public_get_recent_errors_1efd4d478ac69925ff4ea22ecf451856"
  },
  {
    "name": "function_search_path_mutable",
    "title": "Function Search Path Mutable",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "SECURITY"
    ],
    "description": "Detects functions where the search_path parameter is not set.",
    "detail": "Function \\`public.get_function_stats\\` has a role mutable search_path",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0011_function_search_path_mutable",
    "metadata": {
      "name": "get_function_stats",
      "type": "function",
      "schema": "public"
    },
    "cache_key": "function_search_path_mutable_public_get_function_stats_5fc4e1416aaa24d65fbf86ec0f260be4"
  },
  {
    "name": "function_search_path_mutable",
    "title": "Function Search Path Mutable",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "SECURITY"
    ],
    "description": "Detects functions where the search_path parameter is not set.",
    "detail": "Function \\`public.save_patient_onboarding\\` has a role mutable search_path",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0011_function_search_path_mutable",
    "metadata": {
      "name": "save_patient_onboarding",
      "type": "function",
      "schema": "public"
    },
    "cache_key": "function_search_path_mutable_public_save_patient_onboarding_f2ba2c44a5c6456c12e16a99c7f7e70b"
  },
  {
    "name": "function_search_path_mutable",
    "title": "Function Search Path Mutable",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "SECURITY"
    ],
    "description": "Detects functions where the search_path parameter is not set.",
    "detail": "Function \\`private_health_info.update_menstrual_log_timestamp\\` has a role mutable search_path",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0011_function_search_path_mutable",
    "metadata": {
      "name": "update_menstrual_log_timestamp",
      "type": "function",
      "schema": "private_health_info"
    },
    "cache_key": "function_search_path_mutable_private_health_info_update_menstrual_log_timestamp_06bcf30ac3d0a7f279a54cbf228a7bec"
  },
  {
    "name": "function_search_path_mutable",
    "title": "Function Search Path Mutable",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "SECURITY"
    ],
    "description": "Detects functions where the search_path parameter is not set.",
    "detail": "Function \\`public.cleanup_old_logs\\` has a role mutable search_path",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0011_function_search_path_mutable",
    "metadata": {
      "name": "cleanup_old_logs",
      "type": "function",
      "schema": "public"
    },
    "cache_key": "function_search_path_mutable_public_cleanup_old_logs_cc22d8643fa8a11c21a25247bfa179dc"
  }
]
```


## Not BIG issues but needs a CHECK OVER

```json
[
  {
    "name": "rls_enabled_no_policy",
    "title": "RLS Enabled No Policy",
    "level": "INFO",
    "facing": "EXTERNAL",
    "categories": [
      "SECURITY"
    ],
    "description": "Detects cases where row level security (RLS) has been enabled on a table but no RLS policies have been created.",
    "detail": "Table \\`private_health_info.seizure_generalized_assessment\\` has RLS enabled, but no policies exist",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0008_rls_enabled_no_policy",
    "metadata": {
      "name": "seizure_generalized_assessment",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "rls_enabled_no_policy_private_health_info_seizure_generalized_assessment"
  },
  {
    "name": "rls_enabled_no_policy",
    "title": "RLS Enabled No Policy",
    "level": "INFO",
    "facing": "EXTERNAL",
    "categories": [
      "SECURITY"
    ],
    "description": "Detects cases where row level security (RLS) has been enabled on a table but no RLS policies have been created.",
    "detail": "Table \\`private_health_info.seizure_log_brain_regions\\` has RLS enabled, but no policies exist",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0008_rls_enabled_no_policy",
    "metadata": {
      "name": "seizure_log_brain_regions",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "rls_enabled_no_policy_private_health_info_seizure_log_brain_regions"
  },
  {
    "name": "rls_enabled_no_policy",
    "title": "RLS Enabled No Policy",
    "level": "INFO",
    "facing": "EXTERNAL",
    "categories": [
      "SECURITY"
    ],
    "description": "Detects cases where row level security (RLS) has been enabled on a table but no RLS policies have been created.",
    "detail": "Table \\`private_health_info.seizure_log_post_ictal_symptoms\\` has RLS enabled, but no policies exist",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0008_rls_enabled_no_policy",
    "metadata": {
      "name": "seizure_log_post_ictal_symptoms",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "rls_enabled_no_policy_private_health_info_seizure_log_post_ictal_symptoms"
  },
  {
    "name": "rls_enabled_no_policy",
    "title": "RLS Enabled No Policy",
    "level": "INFO",
    "facing": "EXTERNAL",
    "categories": [
      "SECURITY"
    ],
    "description": "Detects cases where row level security (RLS) has been enabled on a table but no RLS policies have been created.",
    "detail": "Table \\`private_health_info.seizure_log_signs\\` has RLS enabled, but no policies exist",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0008_rls_enabled_no_policy",
    "metadata": {
      "name": "seizure_log_signs",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "rls_enabled_no_policy_private_health_info_seizure_log_signs"
  },
  {
    "name": "rls_enabled_no_policy",
    "title": "RLS Enabled No Policy",
    "level": "INFO",
    "facing": "EXTERNAL",
    "categories": [
      "SECURITY"
    ],
    "description": "Detects cases where row level security (RLS) has been enabled on a table but no RLS policies have been created.",
    "detail": "Table \\`private_health_info.seizure_log_triggers\\` has RLS enabled, but no policies exist",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0008_rls_enabled_no_policy",
    "metadata": {
      "name": "seizure_log_triggers",
      "type": "table",
      "schema": "private_health_info"
    },
    "cache_key": "rls_enabled_no_policy_private_health_info_seizure_log_triggers"
  },
  {
    "name": "rls_enabled_no_policy",
    "title": "RLS Enabled No Policy",
    "level": "INFO",
    "facing": "EXTERNAL",
    "categories": [
      "SECURITY"
    ],
    "description": "Detects cases where row level security (RLS) has been enabled on a table but no RLS policies have been created.",
    "detail": "Table \\`public.achievements\\` has RLS enabled, but no policies exist",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0008_rls_enabled_no_policy",
    "metadata": {
      "name": "achievements",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "rls_enabled_no_policy_public_achievements"
  },
  {
    "name": "rls_enabled_no_policy",
    "title": "RLS Enabled No Policy",
    "level": "INFO",
    "facing": "EXTERNAL",
    "categories": [
      "SECURITY"
    ],
    "description": "Detects cases where row level security (RLS) has been enabled on a table but no RLS policies have been created.",
    "detail": "Table \\`public.carer_invitations\\` has RLS enabled, but no policies exist",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0008_rls_enabled_no_policy",
    "metadata": {
      "name": "carer_invitations",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "rls_enabled_no_policy_public_carer_invitations"
  },
  {
    "name": "rls_enabled_no_policy",
    "title": "RLS Enabled No Policy",
    "level": "INFO",
    "facing": "EXTERNAL",
    "categories": [
      "SECURITY"
    ],
    "description": "Detects cases where row level security (RLS) has been enabled on a table but no RLS policies have been created.",
    "detail": "Table \\`public.carer_onboarding_data\\` has RLS enabled, but no policies exist",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0008_rls_enabled_no_policy",
    "metadata": {
      "name": "carer_onboarding_data",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "rls_enabled_no_policy_public_carer_onboarding_data"
  },
  {
    "name": "rls_enabled_no_policy",
    "title": "RLS Enabled No Policy",
    "level": "INFO",
    "facing": "EXTERNAL",
    "categories": [
      "SECURITY"
    ],
    "description": "Detects cases where row level security (RLS) has been enabled on a table but no RLS policies have been created.",
    "detail": "Table \\`public.data_sharing_preferences\\` has RLS enabled, but no policies exist",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0008_rls_enabled_no_policy",
    "metadata": {
      "name": "data_sharing_preferences",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "rls_enabled_no_policy_public_data_sharing_preferences"
  },
  {
    "name": "rls_enabled_no_policy",
    "title": "RLS Enabled No Policy",
    "level": "INFO",
    "facing": "EXTERNAL",
    "categories": [
      "SECURITY"
    ],
    "description": "Detects cases where row level security (RLS) has been enabled on a table but no RLS policies have been created.",
    "detail": "Table \\`public.menstrual_symptom_options\\` has RLS enabled, but no policies exist",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0008_rls_enabled_no_policy",
    "metadata": {
      "name": "menstrual_symptom_options",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "rls_enabled_no_policy_public_menstrual_symptom_options"
  },
  {
    "name": "rls_enabled_no_policy",
    "title": "RLS Enabled No Policy",
    "level": "INFO",
    "facing": "EXTERNAL",
    "categories": [
      "SECURITY"
    ],
    "description": "Detects cases where row level security (RLS) has been enabled on a table but no RLS policies have been created.",
    "detail": "Table \\`public.notification_history\\` has RLS enabled, but no policies exist",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0008_rls_enabled_no_policy",
    "metadata": {
      "name": "notification_history",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "rls_enabled_no_policy_public_notification_history"
  },
  {
    "name": "rls_enabled_no_policy",
    "title": "RLS Enabled No Policy",
    "level": "INFO",
    "facing": "EXTERNAL",
    "categories": [
      "SECURITY"
    ],
    "description": "Detects cases where row level security (RLS) has been enabled on a table but no RLS policies have been created.",
    "detail": "Table \\`public.notification_queue\\` has RLS enabled, but no policies exist",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0008_rls_enabled_no_policy",
    "metadata": {
      "name": "notification_queue",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "rls_enabled_no_policy_public_notification_queue"
  },
  {
    "name": "rls_enabled_no_policy",
    "title": "RLS Enabled No Policy",
    "level": "INFO",
    "facing": "EXTERNAL",
    "categories": [
      "SECURITY"
    ],
    "description": "Detects cases where row level security (RLS) has been enabled on a table but no RLS policies have been created.",
    "detail": "Table \\`public.patient_invitations\\` has RLS enabled, but no policies exist",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0008_rls_enabled_no_policy",
    "metadata": {
      "name": "patient_invitations",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "rls_enabled_no_policy_public_patient_invitations"
  },
  {
    "name": "rls_enabled_no_policy",
    "title": "RLS Enabled No Policy",
    "level": "INFO",
    "facing": "EXTERNAL",
    "categories": [
      "SECURITY"
    ],
    "description": "Detects cases where row level security (RLS) has been enabled on a table but no RLS policies have been created.",
    "detail": "Table \\`public.pwa_push_subscriptions\\` has RLS enabled, but no policies exist",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0008_rls_enabled_no_policy",
    "metadata": {
      "name": "pwa_push_subscriptions",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "rls_enabled_no_policy_public_pwa_push_subscriptions"
  },
  {
    "name": "rls_enabled_no_policy",
    "title": "RLS Enabled No Policy",
    "level": "INFO",
    "facing": "EXTERNAL",
    "categories": [
      "SECURITY"
    ],
    "description": "Detects cases where row level security (RLS) has been enabled on a table but no RLS policies have been created.",
    "detail": "Table \\`public.research_data_sharing_details\\` has RLS enabled, but no policies exist",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0008_rls_enabled_no_policy",
    "metadata": {
      "name": "research_data_sharing_details",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "rls_enabled_no_policy_public_research_data_sharing_details"
  },
  {
    "name": "rls_enabled_no_policy",
    "title": "RLS Enabled No Policy",
    "level": "INFO",
    "facing": "EXTERNAL",
    "categories": [
      "SECURITY"
    ],
    "description": "Detects cases where row level security (RLS) has been enabled on a table but no RLS policies have been created.",
    "detail": "Table \\`public.researcher_onboarding_data\\` has RLS enabled, but no policies exist",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0008_rls_enabled_no_policy",
    "metadata": {
      "name": "researcher_onboarding_data",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "rls_enabled_no_policy_public_researcher_onboarding_data"
  },
  {
    "name": "rls_enabled_no_policy",
    "title": "RLS Enabled No Policy",
    "level": "INFO",
    "facing": "EXTERNAL",
    "categories": [
      "SECURITY"
    ],
    "description": "Detects cases where row level security (RLS) has been enabled on a table but no RLS policies have been created.",
    "detail": "Table \\`public.researcher_profiles\\` has RLS enabled, but no policies exist",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0008_rls_enabled_no_policy",
    "metadata": {
      "name": "researcher_profiles",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "rls_enabled_no_policy_public_researcher_profiles"
  },
  {
    "name": "rls_enabled_no_policy",
    "title": "RLS Enabled No Policy",
    "level": "INFO",
    "facing": "EXTERNAL",
    "categories": [
      "SECURITY"
    ],
    "description": "Detects cases where row level security (RLS) has been enabled on a table but no RLS policies have been created.",
    "detail": "Table \\`public.security_incidents\\` has RLS enabled, but no policies exist",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0008_rls_enabled_no_policy",
    "metadata": {
      "name": "security_incidents",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "rls_enabled_no_policy_public_security_incidents"
  },
  {
    "name": "rls_enabled_no_policy",
    "title": "RLS Enabled No Policy",
    "level": "INFO",
    "facing": "EXTERNAL",
    "categories": [
      "SECURITY"
    ],
    "description": "Detects cases where row level security (RLS) has been enabled on a table but no RLS policies have been created.",
    "detail": "Table \\`public.symptom_options\\` has RLS enabled, but no policies exist",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0008_rls_enabled_no_policy",
    "metadata": {
      "name": "symptom_options",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "rls_enabled_no_policy_public_symptom_options"
  },
  {
    "name": "rls_enabled_no_policy",
    "title": "RLS Enabled No Policy",
    "level": "INFO",
    "facing": "EXTERNAL",
    "categories": [
      "SECURITY"
    ],
    "description": "Detects cases where row level security (RLS) has been enabled on a table but no RLS policies have been created.",
    "detail": "Table \\`public.trigger_options\\` has RLS enabled, but no policies exist",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0008_rls_enabled_no_policy",
    "metadata": {
      "name": "trigger_options",
      "type": "table",
      "schema": "public"
    },
    "cache_key": "rls_enabled_no_policy_public_trigger_options"
  }
]
```
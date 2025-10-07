-- =====================================================
-- CRITICAL: FIX RLS PERFORMANCE ISSUES
-- =====================================================
-- Issue: 67 RLS policies use auth.uid() which re-evaluates per row
-- Fix: Replace with (select auth.uid()) for performance
-- Impact: MASSIVE performance improvement at scale
-- =====================================================

-- =====================================================
-- NOTE: Running without BEGIN/COMMIT to see exact error
-- Each policy will attempt individually
-- =====================================================

-- =====================================================
-- PRIVATE_HEALTH_INFO SCHEMA POLICIES
-- =====================================================

-- daily_symptom_logs (5 policies)
DROP POLICY IF EXISTS "Users view own daily_symptom_logs" ON private_health_info.daily_symptom_logs;
CREATE POLICY "Users view own daily_symptom_logs" ON private_health_info.daily_symptom_logs
  FOR SELECT USING (patient_id = (select auth.uid()));

DROP POLICY IF EXISTS "Clinicians view patient daily_symptom_logs" ON private_health_info.daily_symptom_logs;
CREATE POLICY "Clinicians view patient daily_symptom_logs" ON private_health_info.daily_symptom_logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.patient_clinician_connections
      WHERE patient_id = daily_symptom_logs.patient_id
      AND clinician_id = (select auth.uid())
      AND status = 'active'
    )
  );

DROP POLICY IF EXISTS "Users insert own daily_symptom_logs" ON private_health_info.daily_symptom_logs;
CREATE POLICY "Users insert own daily_symptom_logs" ON private_health_info.daily_symptom_logs
  FOR INSERT WITH CHECK (patient_id = (select auth.uid()));

DROP POLICY IF EXISTS "Users update own daily_symptom_logs" ON private_health_info.daily_symptom_logs;
CREATE POLICY "Users update own daily_symptom_logs" ON private_health_info.daily_symptom_logs
  FOR UPDATE USING (patient_id = (select auth.uid()));

DROP POLICY IF EXISTS "Users delete own daily_symptom_logs" ON private_health_info.daily_symptom_logs;
CREATE POLICY "Users delete own daily_symptom_logs" ON private_health_info.daily_symptom_logs
  FOR DELETE USING (patient_id = (select auth.uid()));

-- seizure_events (5 policies)
DROP POLICY IF EXISTS "Users view own seizure_events" ON private_health_info.seizure_events;
CREATE POLICY "Users view own seizure_events" ON private_health_info.seizure_events
  FOR SELECT USING (patient_id = (select auth.uid()));

DROP POLICY IF EXISTS "Clinicians view patient seizure_events" ON private_health_info.seizure_events;
CREATE POLICY "Clinicians view patient seizure_events" ON private_health_info.seizure_events
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.patient_clinician_connections
      WHERE patient_id = seizure_events.patient_id
      AND clinician_id = (select auth.uid())
      AND status = 'active'
    )
  );

DROP POLICY IF EXISTS "Users insert own seizure_events" ON private_health_info.seizure_events;
CREATE POLICY "Users insert own seizure_events" ON private_health_info.seizure_events
  FOR INSERT WITH CHECK (patient_id = (select auth.uid()));

DROP POLICY IF EXISTS "Users update own seizure_events" ON private_health_info.seizure_events;
CREATE POLICY "Users update own seizure_events" ON private_health_info.seizure_events
  FOR UPDATE USING (patient_id = (select auth.uid()));

DROP POLICY IF EXISTS "Users delete own seizure_events" ON private_health_info.seizure_events;
CREATE POLICY "Users delete own seizure_events" ON private_health_info.seizure_events
  FOR DELETE USING (patient_id = (select auth.uid()));
  


-- tremor_episodes (5 policies)
DROP POLICY IF EXISTS "Users view own tremor_episodes" ON private_health_info.tremor_episodes;
CREATE POLICY "Users view own tremor_episodes" ON private_health_info.tremor_episodes
  FOR SELECT USING (patient_id = (select auth.uid()));

DROP POLICY IF EXISTS "Clinicians view patient tremor_episodes" ON private_health_info.tremor_episodes;
CREATE POLICY "Clinicians view patient tremor_episodes" ON private_health_info.tremor_episodes
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.patient_clinician_connections
      WHERE patient_id = tremor_episodes.patient_id
      AND clinician_id = (select auth.uid())
      AND status = 'active'
    )
  );

DROP POLICY IF EXISTS "Users insert own tremor_episodes" ON private_health_info.tremor_episodes;
CREATE POLICY "Users insert own tremor_episodes" ON private_health_info.tremor_episodes
  FOR INSERT WITH CHECK (patient_id = (select auth.uid()));

DROP POLICY IF EXISTS "Users update own tremor_episodes" ON private_health_info.tremor_episodes;
CREATE POLICY "Users update own tremor_episodes" ON private_health_info.tremor_episodes
  FOR UPDATE USING (patient_id = (select auth.uid()));

DROP POLICY IF EXISTS "Users delete own tremor_episodes" ON private_health_info.tremor_episodes;
CREATE POLICY "Users delete own tremor_episodes" ON private_health_info.tremor_episodes
  FOR DELETE USING (patient_id = (select auth.uid()));

-- gait_episodes (5 policies)
DROP POLICY IF EXISTS "Users view own gait_episodes" ON private_health_info.gait_episodes;
CREATE POLICY "Users view own gait_episodes" ON private_health_info.gait_episodes
  FOR SELECT USING (patient_id = (select auth.uid()));

DROP POLICY IF EXISTS "Clinicians view patient gait_episodes" ON private_health_info.gait_episodes;
CREATE POLICY "Clinicians view patient gait_episodes" ON private_health_info.gait_episodes
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.patient_clinician_connections
      WHERE patient_id = gait_episodes.patient_id
      AND clinician_id = (select auth.uid())
      AND status = 'active'
    )
  );

DROP POLICY IF EXISTS "Users insert own gait_episodes" ON private_health_info.gait_episodes;
CREATE POLICY "Users insert own gait_episodes" ON private_health_info.gait_episodes
  FOR INSERT WITH CHECK (patient_id = (select auth.uid()));

DROP POLICY IF EXISTS "Users update own gait_episodes" ON private_health_info.gait_episodes;
CREATE POLICY "Users update own gait_episodes" ON private_health_info.gait_episodes
  FOR UPDATE USING (patient_id = (select auth.uid()));

DROP POLICY IF EXISTS "Users delete own gait_episodes" ON private_health_info.gait_episodes;
CREATE POLICY "Users delete own gait_episodes" ON private_health_info.gait_episodes
  FOR DELETE USING (patient_id = (select auth.uid()));

-- clinical_media (5 policies)
DROP POLICY IF EXISTS "Users view own clinical_media" ON private_health_info.clinical_media;
CREATE POLICY "Users view own clinical_media" ON private_health_info.clinical_media
  FOR SELECT USING (patient_id = (select auth.uid()));

DROP POLICY IF EXISTS "Clinicians view patient clinical_media" ON private_health_info.clinical_media;
CREATE POLICY "Clinicians view patient clinical_media" ON private_health_info.clinical_media
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.patient_clinician_connections
      WHERE patient_id = clinical_media.patient_id
      AND clinician_id = (select auth.uid())
      AND status = 'active'
    )
  );

DROP POLICY IF EXISTS "Users insert own clinical_media" ON private_health_info.clinical_media;
CREATE POLICY "Users insert own clinical_media" ON private_health_info.clinical_media
  FOR INSERT WITH CHECK (patient_id = (select auth.uid()));

DROP POLICY IF EXISTS "Users update own clinical_media" ON private_health_info.clinical_media;
CREATE POLICY "Users update own clinical_media" ON private_health_info.clinical_media
  FOR UPDATE USING (patient_id = (select auth.uid()));

DROP POLICY IF EXISTS "Users delete own clinical_media" ON private_health_info.clinical_media;
CREATE POLICY "Users delete own clinical_media" ON private_health_info.clinical_media
  FOR DELETE USING (patient_id = (select auth.uid()));

## Success so far. 


-- user_conditions
DROP POLICY IF EXISTS "Users manage own user_conditions" ON private_health_info.user_conditions;
CREATE POLICY "Users manage own user_conditions" ON private_health_info.user_conditions
  FOR ALL USING (user_id = (select auth.uid()));

-- user_medications
DROP POLICY IF EXISTS "Users manage own user_medications" ON private_health_info.user_medications;
CREATE POLICY "Users manage own user_medications" ON private_health_info.user_medications
  FOR ALL USING (user_id = (select auth.uid()));

-- patient_phi
DROP POLICY IF EXISTS "Users manage own patient_phi" ON private_health_info.patient_phi;
CREATE POLICY "Users manage own patient_phi" ON private_health_info.patient_phi
  FOR ALL USING (user_id = (select auth.uid()));

-- clinician_phi
DROP POLICY IF EXISTS "Users manage own clinician_phi" ON private_health_info.clinician_phi;
CREATE POLICY "Users manage own clinician_phi" ON private_health_info.clinician_phi
  FOR ALL USING (user_id = (select auth.uid()));

-- patient_diagnoses (4 policies) - Uses patient_id NOT user_id!
DROP POLICY IF EXISTS "Users can view own diagnoses" ON private_health_info.patient_diagnoses;
CREATE POLICY "Users can view own diagnoses" ON private_health_info.patient_diagnoses
  FOR SELECT USING (patient_id = (select auth.uid()));

DROP POLICY IF EXISTS "Users can insert own diagnoses" ON private_health_info.patient_diagnoses;
CREATE POLICY "Users can insert own diagnoses" ON private_health_info.patient_diagnoses
  FOR INSERT WITH CHECK (patient_id = (select auth.uid()));

DROP POLICY IF EXISTS "Users can update own diagnoses" ON private_health_info.patient_diagnoses;
CREATE POLICY "Users can update own diagnoses" ON private_health_info.patient_diagnoses
  FOR UPDATE USING (patient_id = (select auth.uid()));

DROP POLICY IF EXISTS "Users can delete own diagnoses" ON private_health_info.patient_diagnoses;
CREATE POLICY "Users can delete own diagnoses" ON private_health_info.patient_diagnoses
  FOR DELETE USING (patient_id = (select auth.uid()));

## Success so far. 

-- medication_logs
DROP POLICY IF EXISTS "Users manage own medication_logs" ON private_health_info.medication_logs;
CREATE POLICY "Users manage own medication_logs" ON private_health_info.medication_logs
  FOR ALL USING (user_id = (select auth.uid()));

-- seizure_logs (5 policies) - Uses patient_id NOT user_id!
DROP POLICY IF EXISTS "Users can view own seizure logs" ON private_health_info.seizure_logs;
CREATE POLICY "Users can view own seizure logs" ON private_health_info.seizure_logs
  FOR SELECT USING (patient_id = (select auth.uid()));

DROP POLICY IF EXISTS "Users can insert own seizure logs" ON private_health_info.seizure_logs;
CREATE POLICY "Users can insert own seizure logs" ON private_health_info.seizure_logs
  FOR INSERT WITH CHECK (patient_id = (select auth.uid()));

DROP POLICY IF EXISTS "Users can update own seizure logs" ON private_health_info.seizure_logs;
CREATE POLICY "Users can update own seizure logs" ON private_health_info.seizure_logs
  FOR UPDATE USING (patient_id = (select auth.uid()));

DROP POLICY IF EXISTS "Users can delete own seizure logs" ON private_health_info.seizure_logs;
CREATE POLICY "Users can delete own seizure logs" ON private_health_info.seizure_logs
  FOR DELETE USING (patient_id = (select auth.uid()));

DROP POLICY IF EXISTS "Users can manage own seizure logs" ON private_health_info.seizure_logs;
CREATE POLICY "Users can manage own seizure logs" ON private_health_info.seizure_logs
  FOR ALL USING (patient_id = (select auth.uid()));

-- basal_temperature_logs
DROP POLICY IF EXISTS "Users manage own basal_temperature_logs" ON private_health_info.basal_temperature_logs;
CREATE POLICY "Users manage own basal_temperature_logs" ON private_health_info.basal_temperature_logs
  FOR ALL USING (user_id = (select auth.uid()));

-- patient_onboarding_data
DROP POLICY IF EXISTS "Users manage own patient_onboarding_data" ON private_health_info.patient_onboarding_data;
CREATE POLICY "Users manage own patient_onboarding_data" ON private_health_info.patient_onboarding_data
  FOR ALL USING (user_id = (select auth.uid()));

-- clinician_onboarding_data
DROP POLICY IF EXISTS "Users manage own clinician_onboarding_data" ON private_health_info.clinician_onboarding_data;
CREATE POLICY "Users manage own clinician_onboarding_data" ON private_health_info.clinician_onboarding_data
  FOR ALL USING (user_id = (select auth.uid()));

-- tracking_entries
DROP POLICY IF EXISTS "Users manage own tracking_entries" ON private_health_info.tracking_entries;
CREATE POLICY "Users manage own tracking_entries" ON private_health_info.tracking_entries
  FOR ALL USING (user_id = (select auth.uid()));

-- menstrual_cycle_logs
DROP POLICY IF EXISTS "Users manage own menstrual_cycle_logs" ON private_health_info.menstrual_cycle_logs;
CREATE POLICY "Users manage own menstrual_cycle_logs" ON private_health_info.menstrual_cycle_logs
  FOR ALL USING (user_id = (select auth.uid()));

-- menstrual_log_symptoms
DROP POLICY IF EXISTS "Users manage own symptoms" ON private_health_info.menstrual_log_symptoms;
CREATE POLICY "Users manage own symptoms" ON private_health_info.menstrual_log_symptoms
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM private_health_info.menstrual_cycle_logs
      WHERE id = menstrual_log_symptoms.log_id
      AND user_id = (select auth.uid())
    )
  );


-- seizure_logs_research
DROP POLICY IF EXISTS "Users manage own seizure_logs_research" ON private_health_info.seizure_logs_research;
CREATE POLICY "Users manage own seizure_logs_research" ON private_health_info.seizure_logs_research
  FOR ALL USING (user_id = (select auth.uid()));

-- =====================================================
-- PUBLIC SCHEMA POLICIES
-- =====================================================

-- profiles (2 policies)
DROP POLICY IF EXISTS "System can insert profiles" ON public.profiles;
CREATE POLICY "System can insert profiles" ON public.profiles
  FOR INSERT WITH CHECK ((select auth.uid()) IS NOT NULL);

DROP POLICY IF EXISTS "Users manage own profile" ON public.profiles;
CREATE POLICY "Users manage own profile" ON public.profiles
  FOR ALL USING (id = (select auth.uid()));

-- patient_profiles
DROP POLICY IF EXISTS "Users manage own patient_profiles" ON public.patient_profiles;
CREATE POLICY "Users manage own patient_profiles" ON public.patient_profiles
  FOR ALL USING (user_id = (select auth.uid()));

-- clinician_profiles
DROP POLICY IF EXISTS "Users manage own clinician_profiles" ON public.clinician_profiles;
CREATE POLICY "Users manage own clinician_profiles" ON public.clinician_profiles
  FOR ALL USING (user_id = (select auth.uid()));

-- carer_profiles
DROP POLICY IF EXISTS "Users manage own carer_profiles" ON public.carer_profiles;
CREATE POLICY "Users manage own carer_profiles" ON public.carer_profiles
  FOR ALL USING (user_id = (select auth.uid()));

-- daily_tracking_preferences (4 policies)
DROP POLICY IF EXISTS "users_can_manage_own_tracking_prefs" ON public.daily_tracking_preferences;
CREATE POLICY "users_can_manage_own_tracking_prefs" ON public.daily_tracking_preferences
  FOR ALL USING (user_id = (select auth.uid()));

DROP POLICY IF EXISTS "Users can view own tracking preferences" ON public.daily_tracking_preferences;
CREATE POLICY "Users can view own tracking preferences" ON public.daily_tracking_preferences
  FOR SELECT USING (user_id = (select auth.uid()));

DROP POLICY IF EXISTS "Users can update own tracking preferences" ON public.daily_tracking_preferences;
CREATE POLICY "Users can update own tracking preferences" ON public.daily_tracking_preferences
  FOR UPDATE USING (user_id = (select auth.uid()));

DROP POLICY IF EXISTS "Users can insert own tracking preferences" ON public.daily_tracking_preferences;
CREATE POLICY "Users can insert own tracking preferences" ON public.daily_tracking_preferences
  FOR INSERT WITH CHECK (user_id = (select auth.uid()));

-- research_consent (2 policies)
DROP POLICY IF EXISTS "users_can_manage_own_research_consent" ON public.research_consent;
CREATE POLICY "users_can_manage_own_research_consent" ON public.research_consent
  FOR ALL USING (user_id = (select auth.uid()));

DROP POLICY IF EXISTS "Users manage own research_consent" ON public.research_consent;
CREATE POLICY "Users manage own research_consent" ON public.research_consent
  FOR ALL USING (user_id = (select auth.uid()));

-- custom_tracking_items (4 policies)
DROP POLICY IF EXISTS "Users can view own custom tracking items" ON public.custom_tracking_items;
CREATE POLICY "Users can view own custom tracking items" ON public.custom_tracking_items
  FOR SELECT USING (user_id = (select auth.uid()));

DROP POLICY IF EXISTS "Users can insert own custom tracking items" ON public.custom_tracking_items;
CREATE POLICY "Users can insert own custom tracking items" ON public.custom_tracking_items
  FOR INSERT WITH CHECK (user_id = (select auth.uid()));

DROP POLICY IF EXISTS "Users can update own custom tracking items" ON public.custom_tracking_items;
CREATE POLICY "Users can update own custom tracking items" ON public.custom_tracking_items
  FOR UPDATE USING (user_id = (select auth.uid()));

DROP POLICY IF EXISTS "Users can delete own custom tracking items" ON public.custom_tracking_items;
CREATE POLICY "Users can delete own custom tracking items" ON public.custom_tracking_items
  FOR DELETE USING (user_id = (select auth.uid()));

-- custom_tracking_values (4 policies)
DROP POLICY IF EXISTS "Users can view own custom tracking values" ON public.custom_tracking_values;
CREATE POLICY "Users can view own custom tracking values" ON public.custom_tracking_values
  FOR SELECT USING (user_id = (select auth.uid()));

DROP POLICY IF EXISTS "Users can insert own custom tracking values" ON public.custom_tracking_values;
CREATE POLICY "Users can insert own custom tracking values" ON public.custom_tracking_values
  FOR INSERT WITH CHECK (user_id = (select auth.uid()));

DROP POLICY IF EXISTS "Users can update own custom tracking values" ON public.custom_tracking_values;
CREATE POLICY "Users can update own custom tracking values" ON public.custom_tracking_values
  FOR UPDATE USING (user_id = (select auth.uid()));

DROP POLICY IF EXISTS "Users can delete own custom tracking values" ON public.custom_tracking_values;
CREATE POLICY "Users can delete own custom tracking values" ON public.custom_tracking_values
  FOR DELETE USING (user_id = (select auth.uid()));


-- notification_preferences
DROP POLICY IF EXISTS "Users manage own notification_preferences" ON public.notification_preferences;
CREATE POLICY "Users manage own notification_preferences" ON public.notification_preferences
  FOR ALL USING (user_id = (select auth.uid()));

-- user_points
DROP POLICY IF EXISTS "Users manage own user_points" ON public.user_points;
CREATE POLICY "Users manage own user_points" ON public.user_points
  FOR ALL USING (user_id = (select auth.uid()));

-- user_achievements
DROP POLICY IF EXISTS "Users manage own user_achievements" ON public.user_achievements;
CREATE POLICY "Users manage own user_achievements" ON public.user_achievements
  FOR ALL USING (user_id = (select auth.uid()));


-- patient_clinician_connections (3 policies)
DROP POLICY IF EXISTS "Participants view connections" ON public.patient_clinician_connections;
CREATE POLICY "Participants view connections" ON public.patient_clinician_connections
  FOR SELECT USING (patient_id = (select auth.uid()) OR clinician_id = (select auth.uid()));

DROP POLICY IF EXISTS "Patients request connections" ON public.patient_clinician_connections;
CREATE POLICY "Patients request connections" ON public.patient_clinician_connections
  FOR INSERT WITH CHECK (patient_id = (select auth.uid()));

DROP POLICY IF EXISTS "Participants update connections" ON public.patient_clinician_connections;
CREATE POLICY "Participants update connections" ON public.patient_clinician_connections
  FOR UPDATE USING (patient_id = (select auth.uid()) OR clinician_id = (select auth.uid()));

-- carer_relationships (3 policies) - FIXED: patient_user_id, carer_user_id
DROP POLICY IF EXISTS "Participants view relationships" ON public.carer_relationships;
CREATE POLICY "Participants view relationships" ON public.carer_relationships
  FOR SELECT USING (patient_user_id = (select auth.uid()) OR carer_user_id = (select auth.uid()));

DROP POLICY IF EXISTS "Patients invite carers" ON public.carer_relationships;
CREATE POLICY "Patients invite carers" ON public.carer_relationships
  FOR INSERT WITH CHECK (patient_user_id = (select auth.uid()));

DROP POLICY IF EXISTS "Participants update relationships" ON public.carer_relationships;
CREATE POLICY "Participants update relationships" ON public.carer_relationships
  FOR UPDATE USING (patient_user_id = (select auth.uid()) OR carer_user_id = (select auth.uid()));

-- system_logs
DROP POLICY IF EXISTS "Service role can view all logs" ON public.system_logs;
CREATE POLICY "Service role can view all logs" ON public.system_logs
  FOR SELECT USING ((select auth.role()) = 'service_role');

-- function_execution_logs
DROP POLICY IF EXISTS "Service role can view function logs" ON public.function_execution_logs;
CREATE POLICY "Service role can view function logs" ON public.function_execution_logs
  FOR SELECT USING ((select auth.role()) = 'service_role');

-- api_request_logs
DROP POLICY IF EXISTS "Service role can view API logs" ON public.api_request_logs;
CREATE POLICY "Service role can view API logs" ON public.api_request_logs
  FOR SELECT USING ((select auth.role()) = 'service_role');

-- database_operation_logs
DROP POLICY IF EXISTS "Service role can view DB logs" ON public.database_operation_logs;
CREATE POLICY "Service role can view DB logs" ON public.database_operation_logs
  FOR SELECT USING ((select auth.role()) = 'service_role');

-- =====================================================
-- CLINICAL SCHEMA POLICIES
-- =====================================================

-- clinical_scale_subscore_results (2 policies)
DROP POLICY IF EXISTS "Users can view subscores for their own scale results" ON clinical.clinical_scale_subscore_results;
CREATE POLICY "Users can view subscores for their own scale results" ON clinical.clinical_scale_subscore_results
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM clinical.clinical_scale_results
      WHERE scale_id = clinical_scale_subscore_results.scale_id
      AND patient_id = (select auth.uid())
    )
  );

DROP POLICY IF EXISTS "Users can insert subscores for their own scale results" ON clinical.clinical_scale_subscore_results;
CREATE POLICY "Users can insert subscores for their own scale results" ON clinical.clinical_scale_subscore_results
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM clinical.clinical_scale_results
      WHERE scale_id = clinical_scale_subscore_results.scale_id
      AND patient_id = (select auth.uid())
    )
  );

-- imaging_annotations (2 policies) - FIXED: image_id (not imaging_id)
DROP POLICY IF EXISTS "Users can view annotations for their own images" ON clinical.imaging_annotations;
CREATE POLICY "Users can view annotations for their own images" ON clinical.imaging_annotations
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM clinical.neuro_imaging_results
      WHERE image_id = imaging_annotations.image_id
      AND patient_id = (select auth.uid())
    )
  );

DROP POLICY IF EXISTS "Users can insert annotations for their own images" ON clinical.imaging_annotations;
CREATE POLICY "Users can insert annotations for their own images" ON clinical.imaging_annotations
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM clinical.neuro_imaging_results
      WHERE image_id = imaging_annotations.image_id
      AND patient_id = (select auth.uid())
    )
  );

-- patient_pro_value (3 policies) - FIXED: pro_id (not timeline_id)
DROP POLICY IF EXISTS "Users can view PRO values for their own timeline" ON clinical.patient_pro_value;
CREATE POLICY "Users can view PRO values for their own timeline" ON clinical.patient_pro_value
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM clinical.patient_pro_timeline
      WHERE pro_id = patient_pro_value.pro_id
      AND patient_id = (select auth.uid())
    )
  );

DROP POLICY IF EXISTS "Users can view their own PRO values" ON clinical.patient_pro_value;
CREATE POLICY "Users can view their own PRO values" ON clinical.patient_pro_value
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM clinical.patient_pro_timeline
      WHERE pro_id = patient_pro_value.pro_id
      AND patient_id = (select auth.uid())
    )
  );

DROP POLICY IF EXISTS "Users can insert their own PRO values" ON clinical.patient_pro_value;
CREATE POLICY "Users can insert their own PRO values" ON clinical.patient_pro_value
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM clinical.patient_pro_timeline
      WHERE pro_id = patient_pro_value.pro_id
      AND patient_id = (select auth.uid())
    )
  );

-- patient_risk_alerts (3 policies)
DROP POLICY IF EXISTS "Patients view own patient_risk_alerts" ON clinical.patient_risk_alerts;
CREATE POLICY "Patients view own patient_risk_alerts" ON clinical.patient_risk_alerts
  FOR SELECT USING (patient_id = (select auth.uid()));

DROP POLICY IF EXISTS "Clinicians view patient patient_risk_alerts" ON clinical.patient_risk_alerts;
CREATE POLICY "Clinicians view patient patient_risk_alerts" ON clinical.patient_risk_alerts
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.patient_clinician_connections
      WHERE patient_id = patient_risk_alerts.patient_id
      AND clinician_id = (select auth.uid())
      AND status = 'active'
    )
  );

DROP POLICY IF EXISTS "Clinicians manage patient patient_risk_alerts" ON clinical.patient_risk_alerts;
CREATE POLICY "Clinicians manage patient patient_risk_alerts" ON clinical.patient_risk_alerts
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.patient_clinician_connections
      WHERE patient_id = patient_risk_alerts.patient_id
      AND clinician_id = (select auth.uid())
      AND status = 'active'
    )
  );

-- patient_snapshots (3 policies)
DROP POLICY IF EXISTS "Patients view own patient_snapshots" ON clinical.patient_snapshots;
CREATE POLICY "Patients view own patient_snapshots" ON clinical.patient_snapshots
  FOR SELECT USING (patient_id = (select auth.uid()));

DROP POLICY IF EXISTS "Clinicians view patient patient_snapshots" ON clinical.patient_snapshots;
CREATE POLICY "Clinicians view patient patient_snapshots" ON clinical.patient_snapshots
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.patient_clinician_connections
      WHERE patient_id = patient_snapshots.patient_id
      AND clinician_id = (select auth.uid())
      AND status = 'active'
    )
  );

DROP POLICY IF EXISTS "Clinicians manage patient patient_snapshots" ON clinical.patient_snapshots;
CREATE POLICY "Clinicians manage patient patient_snapshots" ON clinical.patient_snapshots
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.patient_clinician_connections
      WHERE patient_id = patient_snapshots.patient_id
      AND clinician_id = (select auth.uid())
      AND status = 'active'
    )
  );

-- case_data_panels (3 policies)
DROP POLICY IF EXISTS "Patients view own case_data_panels" ON clinical.case_data_panels;
CREATE POLICY "Patients view own case_data_panels" ON clinical.case_data_panels
  FOR SELECT USING (patient_id = (select auth.uid()));

DROP POLICY IF EXISTS "Clinicians view patient case_data_panels" ON clinical.case_data_panels;
CREATE POLICY "Clinicians view patient case_data_panels" ON clinical.case_data_panels
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.patient_clinician_connections
      WHERE patient_id = case_data_panels.patient_id
      AND clinician_id = (select auth.uid())
      AND status = 'active'
    )
  );

DROP POLICY IF EXISTS "Clinicians manage patient case_data_panels" ON clinical.case_data_panels;
CREATE POLICY "Clinicians manage patient case_data_panels" ON clinical.case_data_panels
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.patient_clinician_connections
      WHERE patient_id = case_data_panels.patient_id
      AND clinician_id = (select auth.uid())
      AND status = 'active'
    )
  );

-- clinical_notes_exports (3 policies)
DROP POLICY IF EXISTS "Patients view own clinical_notes_exports" ON clinical.clinical_notes_exports;
CREATE POLICY "Patients view own clinical_notes_exports" ON clinical.clinical_notes_exports
  FOR SELECT USING (patient_id = (select auth.uid()));

DROP POLICY IF EXISTS "Clinicians view patient clinical_notes_exports" ON clinical.clinical_notes_exports;
CREATE POLICY "Clinicians view patient clinical_notes_exports" ON clinical.clinical_notes_exports
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.patient_clinician_connections
      WHERE patient_id = clinical_notes_exports.patient_id
      AND clinician_id = (select auth.uid())
      AND status = 'active'
    )
  );

DROP POLICY IF EXISTS "Clinicians manage patient clinical_notes_exports" ON clinical.clinical_notes_exports;
CREATE POLICY "Clinicians manage patient clinical_notes_exports" ON clinical.clinical_notes_exports
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.patient_clinician_connections
      WHERE patient_id = clinical_notes_exports.patient_id
      AND clinician_id = (select auth.uid())
      AND status = 'active'
    )
  );

-- clinical_scale_results (3 policies)
DROP POLICY IF EXISTS "Patients view own clinical_scale_results" ON clinical.clinical_scale_results;
CREATE POLICY "Patients view own clinical_scale_results" ON clinical.clinical_scale_results
  FOR SELECT USING (patient_id = (select auth.uid()));

DROP POLICY IF EXISTS "Clinicians view patient clinical_scale_results" ON clinical.clinical_scale_results;
CREATE POLICY "Clinicians view patient clinical_scale_results" ON clinical.clinical_scale_results
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.patient_clinician_connections
      WHERE patient_id = clinical_scale_results.patient_id
      AND clinician_id = (select auth.uid())
      AND status = 'active'
    )
  );

DROP POLICY IF EXISTS "Clinicians manage patient clinical_scale_results" ON clinical.clinical_scale_results;
CREATE POLICY "Clinicians manage patient clinical_scale_results" ON clinical.clinical_scale_results
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.patient_clinician_connections
      WHERE patient_id = clinical_scale_results.patient_id
      AND clinician_id = (select auth.uid())
      AND status = 'active'
    )
  );

-- neuro_imaging_results (3 policies)
DROP POLICY IF EXISTS "Patients view own neuro_imaging_results" ON clinical.neuro_imaging_results;
CREATE POLICY "Patients view own neuro_imaging_results" ON clinical.neuro_imaging_results
  FOR SELECT USING (patient_id = (select auth.uid()));

DROP POLICY IF EXISTS "Clinicians view patient neuro_imaging_results" ON clinical.neuro_imaging_results;
CREATE POLICY "Clinicians view patient neuro_imaging_results" ON clinical.neuro_imaging_results
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.patient_clinician_connections
      WHERE patient_id = neuro_imaging_results.patient_id
      AND clinician_id = (select auth.uid())
      AND status = 'active'
    )
  );

DROP POLICY IF EXISTS "Clinicians manage patient neuro_imaging_results" ON clinical.neuro_imaging_results;
CREATE POLICY "Clinicians manage patient neuro_imaging_results" ON clinical.neuro_imaging_results
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.patient_clinician_connections
      WHERE patient_id = neuro_imaging_results.patient_id
      AND clinician_id = (select auth.uid())
      AND status = 'active'
    )
  );

-- patient_pro_timeline (3 policies)
DROP POLICY IF EXISTS "Patients view own patient_pro_timeline" ON clinical.patient_pro_timeline;
CREATE POLICY "Patients view own patient_pro_timeline" ON clinical.patient_pro_timeline
  FOR SELECT USING (patient_id = (select auth.uid()));

DROP POLICY IF EXISTS "Clinicians view patient patient_pro_timeline" ON clinical.patient_pro_timeline;
CREATE POLICY "Clinicians view patient patient_pro_timeline" ON clinical.patient_pro_timeline
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.patient_clinician_connections
      WHERE patient_id = patient_pro_timeline.patient_id
      AND clinician_id = (select auth.uid())
      AND status = 'active'
    )
  );

DROP POLICY IF EXISTS "Clinicians manage patient patient_pro_timeline" ON clinical.patient_pro_timeline;
CREATE POLICY "Clinicians manage patient patient_pro_timeline" ON clinical.patient_pro_timeline
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.patient_clinician_connections
      WHERE patient_id = patient_pro_timeline.patient_id
      AND clinician_id = (select auth.uid())
      AND status = 'active'
    )
  );

-- ai_insights_cards
DROP POLICY IF EXISTS "Clinicians manage own ai_insights_cards" ON clinical.ai_insights_cards;
CREATE POLICY "Clinicians manage own ai_insights_cards" ON clinical.ai_insights_cards
  FOR ALL USING (clinician_id = (select auth.uid()));

-- clinician_today_view
DROP POLICY IF EXISTS "Clinicians manage own clinician_today_view" ON clinical.clinician_today_view;
CREATE POLICY "Clinicians manage own clinician_today_view" ON clinical.clinician_today_view
  FOR ALL USING (clinician_id = (select auth.uid()));

-- patient_collab_chat (3 policies)
DROP POLICY IF EXISTS "Participants view chat" ON clinical.patient_collab_chat;
CREATE POLICY "Participants view chat" ON clinical.patient_collab_chat
  FOR SELECT USING (patient_id = (select auth.uid()) OR sender_id = (select auth.uid()));

DROP POLICY IF EXISTS "Participants send messages" ON clinical.patient_collab_chat;
CREATE POLICY "Participants send messages" ON clinical.patient_collab_chat
  FOR INSERT WITH CHECK (sender_id = (select auth.uid()));

DROP POLICY IF EXISTS "Senders manage messages" ON clinical.patient_collab_chat;
CREATE POLICY "Senders manage messages" ON clinical.patient_collab_chat
  FOR DELETE USING (sender_id = (select auth.uid()));

-- =====================================================
-- DONE - No COMMIT needed (no transaction)
-- =====================================================

-- =====================================================
-- VERIFICATION
-- =====================================================
DO $$
DECLARE
  v_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO v_count
  FROM pg_policies
  WHERE schemaname IN ('public', 'private_health_info', 'clinical')
  AND qual LIKE '%auth.uid()%'
  AND qual NOT LIKE '%(select auth.uid())%';
  
  IF v_count > 0 THEN
    RAISE NOTICE '⚠️  WARNING: Still found % policies with unoptimized auth.uid()', v_count;
  ELSE
    RAISE NOTICE '✅ SUCCESS: All RLS policies optimized for performance!';
  END IF;
END $$;

-- Reload PostgREST schema
NOTIFY pgrst, '{"action": "reload"}';

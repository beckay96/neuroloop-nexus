-- Fix security issues: Enable RLS and create policies for all public tables

-- Enable RLS on all tables that don't have it
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.auth_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.carer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.carer_relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clinical_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clinical_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clinical_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cohort_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conditions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_tracking_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dashboard_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.device_test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medication_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menstrual_cycle_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patient_clinical_overview ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patient_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patient_timeline ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_consent ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_data_quality ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_medication_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_seizure_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_symptom_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seizure_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.symptom_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tracking_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_conditions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_medications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create basic RLS policies for user-specific tables
CREATE POLICY "Users can manage their own achievements" ON public.achievements
  FOR ALL USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can manage their own profiles" ON public.profiles
  FOR ALL USING (auth.uid() = id);

CREATE POLICY "Users can manage their own user records" ON public.users
  FOR ALL USING (auth.uid() = auth_user_id);

CREATE POLICY "Users can view their own seizure logs" ON public.seizure_logs
  FOR ALL USING (auth.uid()::text = user_id);

CREATE POLICY "Users can view their own symptom logs" ON public.symptom_logs
  FOR ALL USING (auth.uid()::text = user_id);

CREATE POLICY "Users can view their own medication logs" ON public.medication_logs
  FOR ALL USING (auth.uid()::text = user_id);

CREATE POLICY "Users can view their own tracking entries" ON public.tracking_entries
  FOR ALL USING (auth.uid()::text = user_id);

CREATE POLICY "Users can view their own user conditions" ON public.user_conditions
  FOR ALL USING (auth.uid()::text = user_id);

CREATE POLICY "Users can view their own user medications" ON public.user_medications
  FOR ALL USING (auth.uid()::text = user_id);

CREATE POLICY "Users can view their own user achievements" ON public.user_achievements
  FOR ALL USING (auth.uid()::text = user_id);

CREATE POLICY "Users can view their own user points" ON public.user_points
  FOR ALL USING (auth.uid()::text = user_id);

CREATE POLICY "Users can view their own daily tracking preferences" ON public.daily_tracking_preferences
  FOR ALL USING (auth.uid()::text = user_id);

CREATE POLICY "Users can view their own menstrual cycle logs" ON public.menstrual_cycle_logs
  FOR ALL USING (auth.uid()::text = user_id);

CREATE POLICY "Users can view their own research consent" ON public.research_consent
  FOR ALL USING (auth.uid()::text = user_id);

-- Create read-only policies for reference tables
CREATE POLICY "Everyone can view conditions" ON public.conditions
  FOR SELECT USING (true);

CREATE POLICY "Everyone can view medications" ON public.medications
  FOR SELECT USING (true);

-- Restrictive policies for sensitive tables
CREATE POLICY "No public access to audit log" ON public.audit_log
  FOR ALL USING (false);

CREATE POLICY "No public access to auth users" ON public.auth_users
  FOR ALL USING (false);

CREATE POLICY "No public access to sessions" ON public.sessions
  FOR ALL USING (false);
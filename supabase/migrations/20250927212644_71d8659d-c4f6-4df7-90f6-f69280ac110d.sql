-- Fix function security issues and add missing RLS policies

-- Fix function search path issues
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.set_user_context(auth_user_id character varying, user_id character varying)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  PERFORM set_config('app.current_user_auth_id', auth_user_id, true);
  PERFORM set_config('app.current_user_id', user_id, true);
END;
$function$;

CREATE OR REPLACE FUNCTION public.audit_trigger_function()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  INSERT INTO audit_log (
    user_id, 
    action, 
    table_name, 
    record_id, 
    changes,
    created_at
  ) VALUES (
    current_setting('app.current_user_id', true),
    TG_OP,
    TG_TABLE_NAME,
    COALESCE(NEW.id, OLD.id),
    CASE 
      WHEN TG_OP = 'DELETE' THEN row_to_json(OLD)
      WHEN TG_OP = 'UPDATE' THEN jsonb_build_object('old', row_to_json(OLD), 'new', row_to_json(NEW))
      ELSE row_to_json(NEW)
    END,
    CURRENT_TIMESTAMP
  );
  RETURN COALESCE(NEW, OLD);
END;
$function$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name'
  );
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.auth_uid_as_uuid()
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  RETURN (auth.uid()::text)::uuid;
END;
$function$;

-- Add policies for tables that don't have them yet
CREATE POLICY "Restrict access to carer profiles" ON public.carer_profiles
  FOR ALL USING (false);

CREATE POLICY "Restrict access to carer relationships" ON public.carer_relationships
  FOR ALL USING (false);

CREATE POLICY "Restrict access to clinical alerts" ON public.clinical_alerts
  FOR ALL USING (false);

CREATE POLICY "Restrict access to clinical metrics" ON public.clinical_metrics
  FOR ALL USING (false);

CREATE POLICY "Restrict access to clinical reports" ON public.clinical_reports
  FOR ALL USING (false);

CREATE POLICY "Restrict access to cohort analytics" ON public.cohort_analytics
  FOR ALL USING (false);

CREATE POLICY "Restrict access to dashboard preferences" ON public.dashboard_preferences
  FOR ALL USING (false);

CREATE POLICY "Restrict access to device test results" ON public.device_test_results
  FOR ALL USING (false);

CREATE POLICY "Restrict access to patient clinical overview" ON public.patient_clinical_overview
  FOR ALL USING (false);

CREATE POLICY "Restrict access to patient profiles" ON public.patient_profiles
  FOR ALL USING (false);

CREATE POLICY "Restrict access to patient timeline" ON public.patient_timeline
  FOR ALL USING (false);

CREATE POLICY "Restrict access to research data quality" ON public.research_data_quality
  FOR ALL USING (false);

CREATE POLICY "Restrict access to research medication data" ON public.research_medication_data
  FOR ALL USING (false);

CREATE POLICY "Restrict access to research seizure data" ON public.research_seizure_data
  FOR ALL USING (false);

CREATE POLICY "Restrict access to research symptom data" ON public.research_symptom_data
  FOR ALL USING (false);
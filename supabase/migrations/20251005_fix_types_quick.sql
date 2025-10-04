BEGIN;

-- Drop all RLS policies first
DO $$
DECLARE r RECORD;
BEGIN
    FOR r IN SELECT schemaname, tablename, policyname FROM pg_policies WHERE schemaname = 'public'
    LOOP EXECUTE format('DROP POLICY IF EXISTS %I ON %I.%I', r.policyname, r.schemaname, r.tablename);
    END LOOP;
END $$;

-- Fix user_id columns: VARCHAR → UUID
ALTER TABLE public.audit_log ALTER COLUMN user_id TYPE UUID USING user_id::UUID;
ALTER TABLE public.carer_profiles ALTER COLUMN user_id TYPE UUID USING user_id::UUID;
ALTER TABLE public.carer_relationships ALTER COLUMN carer_user_id TYPE UUID USING carer_user_id::UUID;
ALTER TABLE public.carer_relationships ALTER COLUMN patient_user_id TYPE UUID USING patient_user_id::UUID;
ALTER TABLE public.daily_tracking_preferences ALTER COLUMN user_id TYPE UUID USING user_id::UUID;
ALTER TABLE public.medication_logs ALTER COLUMN user_id TYPE UUID USING user_id::UUID;
ALTER TABLE public.menstrual_cycle_logs ALTER COLUMN user_id TYPE UUID USING user_id::UUID;
ALTER TABLE public.patient_profiles ALTER COLUMN user_id TYPE UUID USING user_id::UUID;
ALTER TABLE public.research_consent ALTER COLUMN user_id TYPE UUID USING user_id::UUID;
ALTER TABLE public.seizure_logs ALTER COLUMN user_id TYPE UUID USING user_id::UUID;
ALTER TABLE public.symptom_logs ALTER COLUMN user_id TYPE UUID USING user_id::UUID;
ALTER TABLE public.tracking_entries ALTER COLUMN user_id TYPE UUID USING user_id::UUID;
ALTER TABLE public.user_achievements ALTER COLUMN user_id TYPE UUID USING user_id::UUID;
ALTER TABLE public.user_conditions ALTER COLUMN user_id TYPE UUID USING user_id::UUID;

-- Fix id columns: VARCHAR → UUID (drop default, convert, restore default)
ALTER TABLE public.audit_log ALTER COLUMN id DROP DEFAULT, ALTER COLUMN id TYPE UUID USING id::UUID, ALTER COLUMN id SET DEFAULT gen_random_uuid();
ALTER TABLE public.carer_profiles ALTER COLUMN id DROP DEFAULT, ALTER COLUMN id TYPE UUID USING id::UUID, ALTER COLUMN id SET DEFAULT gen_random_uuid();
ALTER TABLE public.carer_relationships ALTER COLUMN id DROP DEFAULT, ALTER COLUMN id TYPE UUID USING id::UUID, ALTER COLUMN id SET DEFAULT gen_random_uuid();
ALTER TABLE public.conditions ALTER COLUMN id DROP DEFAULT, ALTER COLUMN id TYPE UUID USING id::UUID, ALTER COLUMN id SET DEFAULT gen_random_uuid();
ALTER TABLE public.daily_tracking_preferences ALTER COLUMN id DROP DEFAULT, ALTER COLUMN id TYPE UUID USING id::UUID, ALTER COLUMN id SET DEFAULT gen_random_uuid();
ALTER TABLE public.medication_logs ALTER COLUMN id DROP DEFAULT, ALTER COLUMN id TYPE UUID USING id::UUID, ALTER COLUMN id SET DEFAULT gen_random_uuid();
ALTER TABLE public.medications ALTER COLUMN id DROP DEFAULT, ALTER COLUMN id TYPE UUID USING id::UUID, ALTER COLUMN id SET DEFAULT gen_random_uuid();
ALTER TABLE public.menstrual_cycle_logs ALTER COLUMN id DROP DEFAULT, ALTER COLUMN id TYPE UUID USING id::UUID, ALTER COLUMN id SET DEFAULT gen_random_uuid();
ALTER TABLE public.patient_profiles ALTER COLUMN id DROP DEFAULT, ALTER COLUMN id TYPE UUID USING id::UUID, ALTER COLUMN id SET DEFAULT gen_random_uuid();
ALTER TABLE public.research_consent ALTER COLUMN id DROP DEFAULT, ALTER COLUMN id TYPE UUID USING id::UUID, ALTER COLUMN id SET DEFAULT gen_random_uuid();
ALTER TABLE public.seizure_logs ALTER COLUMN id DROP DEFAULT, ALTER COLUMN id TYPE UUID USING id::UUID, ALTER COLUMN id SET DEFAULT gen_random_uuid();
ALTER TABLE public.symptom_logs ALTER COLUMN id DROP DEFAULT, ALTER COLUMN id TYPE UUID USING id::UUID, ALTER COLUMN id SET DEFAULT gen_random_uuid();
ALTER TABLE public.tracking_entries ALTER COLUMN id DROP DEFAULT, ALTER COLUMN id TYPE UUID USING id::UUID, ALTER COLUMN id SET DEFAULT gen_random_uuid();
ALTER TABLE public.user_achievements ALTER COLUMN id DROP DEFAULT, ALTER COLUMN id TYPE UUID USING id::UUID, ALTER COLUMN id SET DEFAULT gen_random_uuid();
ALTER TABLE public.user_conditions ALTER COLUMN id DROP DEFAULT, ALTER COLUMN id TYPE UUID USING id::UUID, ALTER COLUMN id SET DEFAULT gen_random_uuid();

-- Fix condition_id and medication_id
ALTER TABLE public.user_conditions ALTER COLUMN condition_id TYPE UUID USING condition_id::UUID;
ALTER TABLE public.user_medications ALTER COLUMN medication_id TYPE UUID USING medication_id::UUID;
ALTER TABLE public.medication_logs ALTER COLUMN user_medication_id TYPE UUID USING user_medication_id::UUID;

-- Fix VARCHAR → TEXT
ALTER TABLE public.audit_log ALTER COLUMN table_name TYPE TEXT, ALTER COLUMN record_id TYPE TEXT, ALTER COLUMN session_id TYPE TEXT;
ALTER TABLE public.carer_profiles ALTER COLUMN first_name TYPE TEXT, ALTER COLUMN last_name TYPE TEXT, ALTER COLUMN email TYPE TEXT;
ALTER TABLE public.conditions ALTER COLUMN name TYPE TEXT, ALTER COLUMN category TYPE TEXT;
ALTER TABLE public.medications ALTER COLUMN name TYPE TEXT, ALTER COLUMN generic_name TYPE TEXT, ALTER COLUMN category TYPE TEXT;
ALTER TABLE public.patient_profiles ALTER COLUMN first_name TYPE TEXT, ALTER COLUMN last_name TYPE TEXT, ALTER COLUMN gender TYPE TEXT;
ALTER TABLE public.seizure_logs ALTER COLUMN seizure_type TYPE TEXT, ALTER COLUMN consciousness_level TYPE TEXT;
ALTER TABLE public.symptom_logs ALTER COLUMN symptom_type TYPE TEXT;
ALTER TABLE public.user_conditions ALTER COLUMN severity TYPE TEXT;

-- Add foreign keys
ALTER TABLE public.carer_profiles ADD CONSTRAINT fk_carer_profiles_user FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE public.carer_relationships ADD CONSTRAINT fk_carer_relationships_carer FOREIGN KEY (carer_user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE public.carer_relationships ADD CONSTRAINT fk_carer_relationships_patient FOREIGN KEY (patient_user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE public.daily_tracking_preferences ADD CONSTRAINT fk_daily_tracking_user FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE public.medication_logs ADD CONSTRAINT fk_medication_logs_user FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE public.menstrual_cycle_logs ADD CONSTRAINT fk_menstrual_cycle_logs_user FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE public.patient_profiles ADD CONSTRAINT fk_patient_profiles_user FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE public.research_consent ADD CONSTRAINT fk_research_consent_user FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE public.seizure_logs ADD CONSTRAINT fk_seizure_logs_user FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE public.symptom_logs ADD CONSTRAINT fk_symptom_logs_user FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE public.tracking_entries ADD CONSTRAINT fk_tracking_entries_user FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE public.user_achievements ADD CONSTRAINT fk_user_achievements_user FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE public.user_conditions ADD CONSTRAINT fk_user_conditions_user FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE public.user_conditions ADD CONSTRAINT fk_user_conditions_condition FOREIGN KEY (condition_id) REFERENCES public.conditions(id) ON DELETE CASCADE;
ALTER TABLE public.user_medications ADD CONSTRAINT fk_user_medications_medication FOREIGN KEY (medication_id) REFERENCES public.medications(id) ON DELETE SET NULL;

-- Recreate RLS policies
CREATE POLICY "Users can manage own tracking" ON public.daily_tracking_preferences FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own medication logs" ON public.medication_logs FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own seizure logs" ON public.seizure_logs FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own symptom logs" ON public.symptom_logs FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own tracking entries" ON public.tracking_entries FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own conditions" ON public.user_conditions FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view own profile" ON public.patient_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.patient_profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own menstrual logs" ON public.menstrual_cycle_logs FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own research consent" ON public.research_consent FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view own achievements" ON public.user_achievements FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own carer profile" ON public.carer_profiles FOR ALL USING (auth.uid() = user_id);

COMMIT;

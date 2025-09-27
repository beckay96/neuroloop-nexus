-- Clean up old database objects with CASCADE to handle dependencies

-- Drop old triggers and functions with CASCADE
DROP TRIGGER IF EXISTS update_onboarding_progress_updated_at ON public.onboarding_progress CASCADE;
DROP TRIGGER IF EXISTS update_onboarding_progress_updated_at_trigger ON public.onboarding_progress CASCADE;
DROP FUNCTION IF EXISTS public.update_onboarding_progress_updated_at() CASCADE;

-- Update onboarding_progress table to work with new system
ALTER TABLE public.onboarding_progress 
ADD COLUMN IF NOT EXISTS user_type text CHECK (user_type IN ('patient', 'clinician', 'researcher', 'carer')),
ADD COLUMN IF NOT EXISTS completed boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS step_data jsonb DEFAULT '{}';

-- Update existing rows to have a default user_type if null
UPDATE public.onboarding_progress 
SET user_type = 'patient' 
WHERE user_type IS NULL;

-- Make user_type NOT NULL after setting defaults
ALTER TABLE public.onboarding_progress 
ALTER COLUMN user_type SET NOT NULL;

-- Enable RLS on onboarding_progress if not already enabled
ALTER TABLE public.onboarding_progress ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for onboarding_progress
DROP POLICY IF EXISTS "Users can manage their own onboarding progress" ON public.onboarding_progress;
CREATE POLICY "Users can manage their own onboarding progress" ON public.onboarding_progress
  FOR ALL USING (auth.uid() = user_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers to all onboarding tables
CREATE TRIGGER update_onboarding_progress_updated_at
  BEFORE UPDATE ON public.onboarding_progress
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_patient_onboarding_data_updated_at
  BEFORE UPDATE ON public.patient_onboarding_data
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_clinician_onboarding_data_updated_at
  BEFORE UPDATE ON public.clinician_onboarding_data
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_carer_onboarding_data_updated_at
  BEFORE UPDATE ON public.carer_onboarding_data
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_researcher_access_requests_updated_at
  BEFORE UPDATE ON public.researcher_access_requests
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
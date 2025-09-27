-- Create onboarding tables (avoiding conflicts)

-- Drop existing triggers if they exist
DROP TRIGGER IF EXISTS update_onboarding_progress_updated_at ON public.onboarding_progress;

-- Create specialized tables for each user type onboarding data
CREATE TABLE IF NOT EXISTS public.patient_onboarding_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  first_name text NOT NULL,
  middle_name text,
  last_name text NOT NULL,
  gender text CHECK (gender IN ('male', 'female', 'other', 'prefer_not_to_say')),
  date_of_birth date,
  carer_name text,
  carer_phone text,
  carer_email text,
  selected_conditions text[],
  preferred_tracking_times text[],
  track_menstrual_cycle boolean DEFAULT false,
  share_research_data boolean DEFAULT false,
  research_data_types text[],
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.clinician_onboarding_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  first_name text NOT NULL,
  middle_name text,
  last_name text NOT NULL,
  clinician_title text, -- Dr, Prof, etc
  specialty text,
  institution text,
  license_number text,
  patient_invite_emails text[],
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.carer_onboarding_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  first_name text NOT NULL,
  middle_name text,
  last_name text NOT NULL,
  date_of_birth date,
  phone_number text,
  patient_date_of_birth date,
  relationship_to_patient text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.researcher_access_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  email text NOT NULL,
  first_name text,
  last_name text,
  institution text,
  research_area text,
  request_reason text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.patient_onboarding_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clinician_onboarding_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.carer_onboarding_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.researcher_access_requests ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can manage their own patient onboarding data" ON public.patient_onboarding_data
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own clinician onboarding data" ON public.clinician_onboarding_data
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own carer onboarding data" ON public.carer_onboarding_data
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own researcher requests" ON public.researcher_access_requests
  FOR ALL USING (auth.uid() = user_id);
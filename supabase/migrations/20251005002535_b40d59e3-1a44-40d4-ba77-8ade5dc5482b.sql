-- Enable RLS on all tables with policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patient_onboarding_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.carer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.carer_relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patient_clinician_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_user_mapping ENABLE ROW LEVEL SECURITY;
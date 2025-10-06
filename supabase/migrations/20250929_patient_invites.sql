-- Create patient invites tracking table
CREATE TABLE IF NOT EXISTS public.patient_invites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  clinician_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  invite_id uuid, -- Supabase auth user ID when invite is created
  status text DEFAULT 'sent' CHECK (status IN ('sent', 'accepted', 'expired', 'cancelled')),
  invited_at timestamp with time zone DEFAULT now(),
  accepted_at timestamp with time zone,
  expires_at timestamp with time zone DEFAULT (now() + interval '7 days'),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create patient-clinician connections table
CREATE TABLE IF NOT EXISTS public.patient_clinician_connections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  clinician_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'inactive', 'rejected')),
  invited_by uuid REFERENCES auth.users(id),
  connected_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  UNIQUE(patient_id, clinician_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_patient_invites_clinician_id ON public.patient_invites(clinician_id);
CREATE INDEX IF NOT EXISTS idx_patient_invites_email ON public.patient_invites(email);
CREATE INDEX IF NOT EXISTS idx_patient_invites_status ON public.patient_invites(status);
CREATE INDEX IF NOT EXISTS idx_patient_clinician_connections_patient ON public.patient_clinician_connections(patient_id);
CREATE INDEX IF NOT EXISTS idx_patient_clinician_connections_clinician ON public.patient_clinician_connections(clinician_id);

-- Enable RLS
ALTER TABLE public.patient_invites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patient_clinician_connections ENABLE ROW LEVEL SECURITY;

-- RLS Policies for patient_invites
CREATE POLICY "Clinicians can view their own invites" ON public.patient_invites
  FOR SELECT USING (auth.uid() = clinician_id);

CREATE POLICY "Clinicians can insert their own invites" ON public.patient_invites
  FOR INSERT WITH CHECK (auth.uid() = clinician_id);

CREATE POLICY "Clinicians can update their own invites" ON public.patient_invites
  FOR UPDATE USING (auth.uid() = clinician_id);

-- RLS Policies for patient_clinician_connections
CREATE POLICY "Users can view their own connections" ON public.patient_clinician_connections
  FOR SELECT USING (auth.uid() = patient_id OR auth.uid() = clinician_id);

CREATE POLICY "Clinicians can create connections" ON public.patient_clinician_connections
  FOR INSERT WITH CHECK (auth.uid() = clinician_id OR auth.uid() = invited_by);

CREATE POLICY "Users can update their own connections" ON public.patient_clinician_connections
  FOR UPDATE USING (auth.uid() = patient_id OR auth.uid() = clinician_id);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_patient_invites_updated_at 
  BEFORE UPDATE ON public.patient_invites 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_patient_clinician_connections_updated_at 
  BEFORE UPDATE ON public.patient_clinician_connections 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

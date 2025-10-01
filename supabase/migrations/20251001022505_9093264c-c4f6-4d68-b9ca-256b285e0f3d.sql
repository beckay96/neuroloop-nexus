-- Premium Clinical Dashboard Features Migration
-- Created: 2025-09-30
-- All tables for 10 advanced clinical features

-- 1. Live Patient Radar / Proactive Alerts
CREATE TABLE IF NOT EXISTS public.patient_risk_alerts (
  alert_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  risk_type TEXT CHECK (risk_type IN ('seizure', 'fall', 'hospital', 'med_failure')) NOT NULL,
  score DECIMAL(5,2) NOT NULL,
  alert_level TEXT CHECK (alert_level IN ('critical', 'moderate', 'low')) NOT NULL,
  reason TEXT NOT NULL,
  status TEXT CHECK (status IN ('unread', 'acknowledged', 'closed')) DEFAULT 'unread',
  resolved_by UUID REFERENCES auth.users(id),
  resolved_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_patient_risk_alerts_patient ON public.patient_risk_alerts(patient_id);
CREATE INDEX idx_patient_risk_alerts_status ON public.patient_risk_alerts(status);
CREATE INDEX idx_patient_risk_alerts_level ON public.patient_risk_alerts(alert_level);

-- 2. Smart Snapshot Summaries
CREATE TABLE IF NOT EXISTS public.patient_snapshots (
  snapshot_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  summary TEXT NOT NULL,
  highlight_events JSONB,
  generated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  author TEXT CHECK (author IN ('ai', 'clinician')) DEFAULT 'ai'
);

CREATE INDEX idx_patient_snapshots_patient ON public.patient_snapshots(patient_id);
CREATE INDEX idx_patient_snapshots_generated ON public.patient_snapshots(generated_at DESC);

-- 3. Integrated Clinical Scales Entry / Trend
CREATE TABLE IF NOT EXISTS public.clinical_scale_results (
  scale_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  scale_type TEXT CHECK (scale_type IN ('MDS-UPDRS', 'MoCA', 'NIHSS', 'NINDS-CSC', 'PDSS', 'Tremor', 'MMSE', 'ACE-R')) NOT NULL,
  score DECIMAL(6,2) NOT NULL,
  assessed_at DATE NOT NULL,
  due_at DATE,
  entered_by UUID REFERENCES auth.users(id) NOT NULL,
  change_alert BOOLEAN DEFAULT false,
  trend JSONB,
  subscores JSONB,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE INDEX idx_clinical_scales_patient ON public.clinical_scale_results(patient_id);
CREATE INDEX idx_clinical_scales_type ON public.clinical_scale_results(scale_type);
CREATE INDEX idx_clinical_scales_assessed ON public.clinical_scale_results(assessed_at DESC);
CREATE INDEX idx_clinical_scales_due ON public.clinical_scale_results(due_at);

-- 4. Neuroimaging/Report Overlay
CREATE TABLE IF NOT EXISTS public.neuro_imaging_results (
  image_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  study_type TEXT CHECK (study_type IN ('MRI', 'CT', 'EEG', 'PET', 'SEEG', 'DaTscan', 'fMRI', 'MEG')) NOT NULL,
  image_path VARCHAR(512),
  dicom_uid VARCHAR(256),
  annotations JSONB,
  findings_summary TEXT,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  study_date DATE,
  radiologist_id UUID REFERENCES auth.users(id),
  status TEXT CHECK (status IN ('pending', 'reviewed', 'finalized')) DEFAULT 'pending'
);

CREATE INDEX idx_neuro_imaging_patient ON public.neuro_imaging_results(patient_id);
CREATE INDEX idx_neuro_imaging_type ON public.neuro_imaging_results(study_type);
CREATE INDEX idx_neuro_imaging_date ON public.neuro_imaging_results(study_date DESC);

-- 5. Case-Driven Data Panels
CREATE TABLE IF NOT EXISTS public.case_data_panels (
  panel_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  panel_type TEXT CHECK (panel_type IN ('urgency', 'ai_alerts', 'trends', 'intervention', 'medication', 'safety')) NOT NULL,
  content JSONB NOT NULL,
  added_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  priority INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true
);

CREATE INDEX idx_case_panels_patient ON public.case_data_panels(patient_id);
CREATE INDEX idx_case_panels_type ON public.case_data_panels(panel_type);
CREATE INDEX idx_case_panels_priority ON public.case_data_panels(priority DESC);

-- 6. 1-Click Clinical Note/Letter Generation
CREATE TABLE IF NOT EXISTS public.clinical_notes_exports (
  note_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  generated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  content TEXT NOT NULL,
  format TEXT CHECK (format IN ('pdf', 'docx', 'html')) NOT NULL,
  author_id UUID REFERENCES auth.users(id) NOT NULL,
  status TEXT CHECK (status IN ('draft', 'finalized', 'shared')) DEFAULT 'draft',
  template_used VARCHAR(100),
  file_path VARCHAR(512),
  shared_with JSONB
);

CREATE INDEX idx_clinical_notes_patient ON public.clinical_notes_exports(patient_id);
CREATE INDEX idx_clinical_notes_author ON public.clinical_notes_exports(author_id);
CREATE INDEX idx_clinical_notes_status ON public.clinical_notes_exports(status);

-- 7. Secure Consult/Referral Chat/Collab
CREATE TABLE IF NOT EXISTS public.patient_collab_chat (
  message_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  sender_id UUID REFERENCES auth.users(id) NOT NULL,
  message TEXT NOT NULL,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  attachments JSONB,
  is_urgent BOOLEAN DEFAULT false,
  thread_id UUID,
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMP WITH TIME ZONE,
  mentioned_users UUID[]
);

CREATE INDEX idx_collab_chat_patient ON public.patient_collab_chat(patient_id);
CREATE INDEX idx_collab_chat_thread ON public.patient_collab_chat(thread_id);
CREATE INDEX idx_collab_chat_sent ON public.patient_collab_chat(sent_at DESC);
CREATE INDEX idx_collab_chat_urgent ON public.patient_collab_chat(is_urgent) WHERE is_urgent = true;

-- 8. Patient-Reported Outcomes (PRO) Timeline
CREATE TABLE IF NOT EXISTS public.patient_pro_timeline (
  pro_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  pro_type TEXT CHECK (pro_type IN ('sleep', 'mood', 'falls', 'side_effects', 'pain', 'fatigue', 'cognition', 'mobility')) NOT NULL,
  value JSONB NOT NULL,
  reported_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  linked_intervention UUID,
  notes TEXT,
  severity INTEGER CHECK (severity BETWEEN 0 AND 10)
);

CREATE INDEX idx_pro_timeline_patient ON public.patient_pro_timeline(patient_id);
CREATE INDEX idx_pro_timeline_type ON public.patient_pro_timeline(pro_type);
CREATE INDEX idx_pro_timeline_reported ON public.patient_pro_timeline(reported_at DESC);

-- 9. Personalized Today View
CREATE TABLE IF NOT EXISTS public.clinician_today_view (
  view_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinician_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  date DATE DEFAULT CURRENT_DATE,
  appointments JSONB,
  alerts JSONB,
  high_priority_patients JSONB,
  pending_tasks JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(clinician_id, date)
);

CREATE INDEX idx_today_view_clinician ON public.clinician_today_view(clinician_id);
CREATE INDEX idx_today_view_date ON public.clinician_today_view(date DESC);

-- 10. Zero-Click AI Insights
CREATE TABLE IF NOT EXISTS public.ai_insights_cards (
  insight_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinician_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  generated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  content TEXT NOT NULL,
  impact_metric JSONB,
  is_read BOOLEAN DEFAULT false,
  insight_type TEXT CHECK (insight_type IN ('did_you_know', 'impact', 'recommendation', 'trend', 'alert')) NOT NULL,
  related_patient_id UUID REFERENCES auth.users(id),
  dismissed BOOLEAN DEFAULT false
);

CREATE INDEX idx_ai_insights_clinician ON public.ai_insights_cards(clinician_id);
CREATE INDEX idx_ai_insights_read ON public.ai_insights_cards(is_read);
CREATE INDEX idx_ai_insights_type ON public.ai_insights_cards(insight_type);

-- Enable Row Level Security
ALTER TABLE public.patient_risk_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patient_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clinical_scale_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.neuro_imaging_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_data_panels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clinical_notes_exports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patient_collab_chat ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patient_pro_timeline ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clinician_today_view ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_insights_cards ENABLE ROW LEVEL SECURITY;

-- RLS Policies for patient_risk_alerts
CREATE POLICY "Clinicians can view alerts for their patients" ON public.patient_risk_alerts
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.patient_clinician_connections
      WHERE patient_id = patient_risk_alerts.patient_id
      AND clinician_id = auth.uid()
      AND status = 'active'
    )
  );

CREATE POLICY "Clinicians can update alerts" ON public.patient_risk_alerts
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.patient_clinician_connections
      WHERE patient_id = patient_risk_alerts.patient_id
      AND clinician_id = auth.uid()
      AND status = 'active'
    )
  );

-- RLS Policies for patient_snapshots
CREATE POLICY "Clinicians can view patient snapshots" ON public.patient_snapshots
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.patient_clinician_connections
      WHERE patient_id = patient_snapshots.patient_id
      AND clinician_id = auth.uid()
      AND status = 'active'
    )
  );

-- RLS Policies for clinical_scale_results
CREATE POLICY "Clinicians can manage clinical scales" ON public.clinical_scale_results
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.patient_clinician_connections
      WHERE patient_id = clinical_scale_results.patient_id
      AND clinician_id = auth.uid()
      AND status = 'active'
    )
  );

-- RLS Policies for neuro_imaging_results
CREATE POLICY "Clinicians can view imaging results" ON public.neuro_imaging_results
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.patient_clinician_connections
      WHERE patient_id = neuro_imaging_results.patient_id
      AND clinician_id = auth.uid()
      AND status = 'active'
    )
  );

-- RLS Policies for case_data_panels
CREATE POLICY "Clinicians can view case panels" ON public.case_data_panels
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.patient_clinician_connections
      WHERE patient_id = case_data_panels.patient_id
      AND clinician_id = auth.uid()
      AND status = 'active'
    )
  );

-- RLS Policies for clinical_notes_exports
CREATE POLICY "Clinicians can manage their notes" ON public.clinical_notes_exports
  FOR ALL USING (auth.uid() = author_id);

-- RLS Policies for patient_collab_chat
CREATE POLICY "Clinicians can view patient chat" ON public.patient_collab_chat
  FOR ALL USING (
    auth.uid() = sender_id OR
    EXISTS (
      SELECT 1 FROM public.patient_clinician_connections
      WHERE patient_id = patient_collab_chat.patient_id
      AND clinician_id = auth.uid()
      AND status = 'active'
    )
  );

-- RLS Policies for patient_pro_timeline
CREATE POLICY "Clinicians can view PRO data" ON public.patient_pro_timeline
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.patient_clinician_connections
      WHERE patient_id = patient_pro_timeline.patient_id
      AND clinician_id = auth.uid()
      AND status = 'active'
    )
  );

-- RLS Policies for clinician_today_view
CREATE POLICY "Clinicians can manage their own today view" ON public.clinician_today_view
  FOR ALL USING (auth.uid() = clinician_id);

-- RLS Policies for ai_insights_cards
CREATE POLICY "Clinicians can view their AI insights" ON public.ai_insights_cards
  FOR ALL USING (auth.uid() = clinician_id);

-- Trigger for updated_at on clinician_today_view
CREATE TRIGGER update_clinician_today_view_updated_at 
  BEFORE UPDATE ON public.clinician_today_view 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
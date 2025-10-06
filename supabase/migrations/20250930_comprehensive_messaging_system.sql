-- Comprehensive Clinician-Patient Messaging System
-- Created: 2025-09-30
-- HIPAA-compliant, secure, feature-rich messaging with forms, attachments, AI prioritization

-- =====================================================
-- CORE MESSAGING TABLES
-- =====================================================

-- Conversations: Main thread between clinician and patient
CREATE TABLE IF NOT EXISTS public.conversations (
  conversation_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinician_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  patient_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  subject VARCHAR(255),
  status TEXT CHECK (status IN ('active', 'archived', 'closed')) DEFAULT 'active',
  priority TEXT CHECK (priority IN ('urgent', 'high', 'normal', 'low')) DEFAULT 'normal',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  last_message_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  unread_count_clinician INTEGER DEFAULT 0,
  unread_count_patient INTEGER DEFAULT 0,
  ai_priority_score DECIMAL(5,2) DEFAULT 0,
  ai_summary TEXT,
  ai_urgency_reason TEXT,
  tags TEXT[],
  UNIQUE(clinician_id, patient_id)
);

CREATE INDEX idx_conversations_clinician ON public.conversations(clinician_id);
CREATE INDEX idx_conversations_patient ON public.conversations(patient_id);
CREATE INDEX idx_conversations_updated ON public.conversations(updated_at DESC);
CREATE INDEX idx_conversations_priority ON public.conversations(priority, ai_priority_score DESC);
CREATE INDEX idx_conversations_status ON public.conversations(status);

-- Messages: Individual messages in conversations
CREATE TABLE IF NOT EXISTS public.messages (
  message_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES public.conversations(conversation_id) ON DELETE CASCADE NOT NULL,
  sender_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  sender_type TEXT CHECK (sender_type IN ('clinician', 'patient', 'system', 'ai')) NOT NULL,
  message_type TEXT CHECK (message_type IN ('text', 'form', 'form_response', 'system', 'attachment')) NOT NULL,
  content TEXT,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  read_at TIMESTAMP WITH TIME ZONE,
  is_read BOOLEAN DEFAULT false,
  is_urgent BOOLEAN DEFAULT false,
  is_draft BOOLEAN DEFAULT false,
  reply_to_message_id UUID REFERENCES public.messages(message_id),
  ai_summary TEXT,
  ai_sentiment TEXT CHECK (ai_sentiment IN ('positive', 'neutral', 'negative', 'concerning')),
  ai_requires_action BOOLEAN DEFAULT false,
  ai_action_items TEXT[],
  metadata JSONB,
  edited_at TIMESTAMP WITH TIME ZONE,
  deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_messages_conversation ON public.messages(conversation_id, sent_at DESC);
CREATE INDEX idx_messages_sender ON public.messages(sender_id);
CREATE INDEX idx_messages_read ON public.messages(is_read, sent_at DESC);
CREATE INDEX idx_messages_urgent ON public.messages(is_urgent) WHERE is_urgent = true;
CREATE INDEX idx_messages_ai_action ON public.messages(ai_requires_action) WHERE ai_requires_action = true;

-- =====================================================
-- CUSTOM FORMS SYSTEM
-- =====================================================

-- Form Templates: Reusable forms created by clinicians
CREATE TABLE IF NOT EXISTS public.form_templates (
  template_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinician_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  template_name VARCHAR(255) NOT NULL,
  description TEXT,
  category TEXT CHECK (category IN ('assessment', 'symptom_tracking', 'medication_review', 'feedback', 'consent', 'custom')) DEFAULT 'custom',
  form_schema JSONB NOT NULL, -- JSON schema defining fields
  is_active BOOLEAN DEFAULT true,
  is_shared BOOLEAN DEFAULT false, -- Share with other clinicians
  usage_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE INDEX idx_form_templates_clinician ON public.form_templates(clinician_id);
CREATE INDEX idx_form_templates_category ON public.form_templates(category);
CREATE INDEX idx_form_templates_active ON public.form_templates(is_active) WHERE is_active = true;

-- Form Instances: Specific form sent to a patient
CREATE TABLE IF NOT EXISTS public.form_instances (
  form_instance_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id UUID REFERENCES public.messages(message_id) ON DELETE CASCADE NOT NULL,
  template_id UUID REFERENCES public.form_templates(template_id),
  conversation_id UUID REFERENCES public.conversations(conversation_id) ON DELETE CASCADE NOT NULL,
  form_data JSONB NOT NULL, -- Current form configuration
  status TEXT CHECK (status IN ('pending', 'in_progress', 'completed', 'expired')) DEFAULT 'pending',
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE,
  reminder_sent BOOLEAN DEFAULT false,
  last_reminder_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_form_instances_message ON public.form_instances(message_id);
CREATE INDEX idx_form_instances_conversation ON public.form_instances(conversation_id);
CREATE INDEX idx_form_instances_status ON public.form_instances(status);
CREATE INDEX idx_form_instances_expires ON public.form_instances(expires_at) WHERE status = 'pending';

-- Form Responses: Patient responses to forms
CREATE TABLE IF NOT EXISTS public.form_responses (
  response_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  form_instance_id UUID REFERENCES public.form_instances(form_instance_id) ON DELETE CASCADE NOT NULL,
  message_id UUID REFERENCES public.messages(message_id) ON DELETE CASCADE, -- Response message
  patient_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  response_data JSONB NOT NULL, -- Patient's answers
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  ai_analysis JSONB, -- AI analysis of responses
  flagged_responses TEXT[], -- Questions flagged by AI
  requires_followup BOOLEAN DEFAULT false
);

CREATE INDEX idx_form_responses_instance ON public.form_responses(form_instance_id);
CREATE INDEX idx_form_responses_patient ON public.form_responses(patient_id);
CREATE INDEX idx_form_responses_submitted ON public.form_responses(submitted_at DESC);
CREATE INDEX idx_form_responses_followup ON public.form_responses(requires_followup) WHERE requires_followup = true;

-- =====================================================
-- ATTACHMENTS SYSTEM
-- =====================================================

-- Attachments: Files, photos, test results
CREATE TABLE IF NOT EXISTS public.message_attachments (
  attachment_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id UUID REFERENCES public.messages(message_id) ON DELETE CASCADE NOT NULL,
  conversation_id UUID REFERENCES public.conversations(conversation_id) ON DELETE CASCADE NOT NULL,
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL NOT NULL,
  attachment_type TEXT CHECK (attachment_type IN ('photo', 'document', 'test_result', 'imaging', 'video', 'audio')) NOT NULL,
  file_name VARCHAR(512) NOT NULL,
  file_path VARCHAR(1024) NOT NULL, -- Supabase Storage path
  file_size INTEGER, -- bytes
  mime_type VARCHAR(100),
  thumbnail_path VARCHAR(1024),
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  is_sensitive BOOLEAN DEFAULT false, -- PHI/sensitive data
  ai_description TEXT, -- AI-generated description
  metadata JSONB -- Additional metadata (dimensions, duration, etc.)
);

CREATE INDEX idx_attachments_message ON public.message_attachments(message_id);
CREATE INDEX idx_attachments_conversation ON public.message_attachments(conversation_id);
CREATE INDEX idx_attachments_type ON public.message_attachments(attachment_type);
CREATE INDEX idx_attachments_uploaded ON public.message_attachments(uploaded_at DESC);

-- Test Results Linking: Link lab/imaging results to messages
CREATE TABLE IF NOT EXISTS public.message_test_results (
  link_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id UUID REFERENCES public.messages(message_id) ON DELETE CASCADE NOT NULL,
  conversation_id UUID REFERENCES public.conversations(conversation_id) ON DELETE CASCADE NOT NULL,
  patient_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  result_type TEXT CHECK (result_type IN ('lab', 'imaging', 'clinical_scale', 'vital_signs', 'genetic', 'other')) NOT NULL,
  result_id VARCHAR(255), -- External ID or reference
  result_data JSONB NOT NULL, -- Full result data
  result_date DATE NOT NULL,
  clinician_notes TEXT,
  shared_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  is_abnormal BOOLEAN DEFAULT false,
  ai_interpretation TEXT
);

CREATE INDEX idx_test_results_message ON public.message_test_results(message_id);
CREATE INDEX idx_test_results_conversation ON public.message_test_results(conversation_id);
CREATE INDEX idx_test_results_patient ON public.message_test_results(patient_id);
CREATE INDEX idx_test_results_type ON public.message_test_results(result_type);
CREATE INDEX idx_test_results_abnormal ON public.message_test_results(is_abnormal) WHERE is_abnormal = true;

-- =====================================================
-- AI PRIORITIZATION & ANALYTICS
-- =====================================================

-- AI Message Analysis: Detailed AI analysis of messages
CREATE TABLE IF NOT EXISTS public.ai_message_analysis (
  analysis_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id UUID REFERENCES public.messages(message_id) ON DELETE CASCADE NOT NULL,
  conversation_id UUID REFERENCES public.conversations(conversation_id) ON DELETE CASCADE NOT NULL,
  analyzed_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  priority_score DECIMAL(5,2) NOT NULL, -- 0-100
  urgency_level TEXT CHECK (urgency_level IN ('critical', 'urgent', 'routine', 'informational')) NOT NULL,
  sentiment_score DECIMAL(3,2), -- -1 to 1
  key_topics TEXT[],
  mentioned_symptoms TEXT[],
  mentioned_medications TEXT[],
  action_required BOOLEAN DEFAULT false,
  suggested_actions TEXT[],
  risk_indicators TEXT[],
  summary TEXT NOT NULL,
  confidence_score DECIMAL(3,2), -- 0-1
  model_version VARCHAR(50)
);

CREATE INDEX idx_ai_analysis_message ON public.ai_message_analysis(message_id);
CREATE INDEX idx_ai_analysis_conversation ON public.ai_message_analysis(conversation_id);
CREATE INDEX idx_ai_analysis_urgency ON public.ai_message_analysis(urgency_level, priority_score DESC);
CREATE INDEX idx_ai_analysis_action ON public.ai_message_analysis(action_required) WHERE action_required = true;

-- Message Classification: Tag and categorize messages
CREATE TABLE IF NOT EXISTS public.message_classifications (
  classification_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id UUID REFERENCES public.messages(message_id) ON DELETE CASCADE NOT NULL,
  category TEXT CHECK (category IN ('symptom_report', 'medication_question', 'side_effect', 'emergency', 'appointment_request', 'general_question', 'test_result_inquiry', 'update', 'other')) NOT NULL,
  confidence DECIMAL(3,2),
  classified_by TEXT CHECK (classified_by IN ('ai', 'clinician')) DEFAULT 'ai',
  classified_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE INDEX idx_classifications_message ON public.message_classifications(message_id);
CREATE INDEX idx_classifications_category ON public.message_classifications(category);

-- =====================================================
-- NOTIFICATIONS & REMINDERS
-- =====================================================

-- Message Notifications: Track notification delivery
CREATE TABLE IF NOT EXISTS public.message_notifications (
  notification_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id UUID REFERENCES public.messages(message_id) ON DELETE CASCADE NOT NULL,
  recipient_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  notification_type TEXT CHECK (notification_type IN ('new_message', 'form_received', 'form_reminder', 'urgent_message', 'result_shared')) NOT NULL,
  delivery_method TEXT CHECK (delivery_method IN ('in_app', 'email', 'sms', 'push')) NOT NULL,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  delivered_at TIMESTAMP WITH TIME ZONE,
  read_at TIMESTAMP WITH TIME ZONE,
  status TEXT CHECK (status IN ('pending', 'sent', 'delivered', 'failed')) DEFAULT 'pending',
  error_message TEXT
);

CREATE INDEX idx_notifications_recipient ON public.message_notifications(recipient_id, sent_at DESC);
CREATE INDEX idx_notifications_message ON public.message_notifications(message_id);
CREATE INDEX idx_notifications_status ON public.message_notifications(status);

-- =====================================================
-- AUDIT & COMPLIANCE
-- =====================================================

-- Message Audit Log: Complete audit trail
CREATE TABLE IF NOT EXISTS public.message_audit_log (
  audit_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id UUID REFERENCES public.messages(message_id) ON DELETE SET NULL,
  conversation_id UUID REFERENCES public.conversations(conversation_id) ON DELETE SET NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action TEXT CHECK (action IN ('created', 'read', 'edited', 'deleted', 'forwarded', 'exported', 'attachment_added', 'form_sent', 'form_completed')) NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT now(),
  ip_address INET,
  user_agent TEXT,
  details JSONB
);

CREATE INDEX idx_audit_log_message ON public.message_audit_log(message_id);
CREATE INDEX idx_audit_log_conversation ON public.message_audit_log(conversation_id);
CREATE INDEX idx_audit_log_user ON public.message_audit_log(user_id, timestamp DESC);
CREATE INDEX idx_audit_log_action ON public.message_audit_log(action);

-- =====================================================
-- ROW LEVEL SECURITY POLICIES
-- =====================================================

ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.form_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.form_instances ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.form_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.message_attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.message_test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_message_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.message_classifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.message_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.message_audit_log ENABLE ROW LEVEL SECURITY;

-- Conversations: Users can access their own conversations
CREATE POLICY "Users can view their conversations" ON public.conversations
  FOR SELECT USING (
    auth.uid() = clinician_id OR auth.uid() = patient_id
  );

CREATE POLICY "Clinicians can create conversations" ON public.conversations
  FOR INSERT WITH CHECK (auth.uid() = clinician_id);

CREATE POLICY "Users can update their conversations" ON public.conversations
  FOR UPDATE USING (
    auth.uid() = clinician_id OR auth.uid() = patient_id
  );

-- Messages: Users can access messages in their conversations
CREATE POLICY "Users can view their messages" ON public.messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.conversations
      WHERE conversation_id = messages.conversation_id
      AND (clinician_id = auth.uid() OR patient_id = auth.uid())
    )
  );

CREATE POLICY "Users can send messages" ON public.messages
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.conversations
      WHERE conversation_id = messages.conversation_id
      AND (clinician_id = auth.uid() OR patient_id = auth.uid())
    )
    AND auth.uid() = sender_id
  );

CREATE POLICY "Users can update their own messages" ON public.messages
  FOR UPDATE USING (auth.uid() = sender_id);

-- Form Templates: Clinicians manage their templates
CREATE POLICY "Clinicians can manage their templates" ON public.form_templates
  FOR ALL USING (auth.uid() = clinician_id);

CREATE POLICY "Clinicians can view shared templates" ON public.form_templates
  FOR SELECT USING (is_shared = true);

-- Form Instances: Access through conversations
CREATE POLICY "Users can view form instances" ON public.form_instances
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.conversations
      WHERE conversation_id = form_instances.conversation_id
      AND (clinician_id = auth.uid() OR patient_id = auth.uid())
    )
  );

-- Form Responses: Patients submit, clinicians view
CREATE POLICY "Patients can submit responses" ON public.form_responses
  FOR INSERT WITH CHECK (auth.uid() = patient_id);

CREATE POLICY "Users can view responses" ON public.form_responses
  FOR SELECT USING (
    auth.uid() = patient_id OR
    EXISTS (
      SELECT 1 FROM public.form_instances fi
      JOIN public.conversations c ON fi.conversation_id = c.conversation_id
      WHERE fi.form_instance_id = form_responses.form_instance_id
      AND c.clinician_id = auth.uid()
    )
  );

-- Attachments: Access through conversations
CREATE POLICY "Users can manage attachments" ON public.message_attachments
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.conversations
      WHERE conversation_id = message_attachments.conversation_id
      AND (clinician_id = auth.uid() OR patient_id = auth.uid())
    )
  );

-- Test Results: Clinicians share, patients view
CREATE POLICY "Users can view shared results" ON public.message_test_results
  FOR SELECT USING (
    auth.uid() = patient_id OR
    EXISTS (
      SELECT 1 FROM public.conversations
      WHERE conversation_id = message_test_results.conversation_id
      AND clinician_id = auth.uid()
    )
  );

-- AI Analysis: View through messages
CREATE POLICY "Users can view AI analysis" ON public.ai_message_analysis
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.conversations
      WHERE conversation_id = ai_message_analysis.conversation_id
      AND (clinician_id = auth.uid() OR patient_id = auth.uid())
    )
  );

-- Notifications: Users view their own
CREATE POLICY "Users can view their notifications" ON public.message_notifications
  FOR ALL USING (auth.uid() = recipient_id);

-- Audit Log: Users can view their own actions
CREATE POLICY "Users can view their audit log" ON public.message_audit_log
  FOR SELECT USING (auth.uid() = user_id);

-- =====================================================
-- TRIGGERS & FUNCTIONS
-- =====================================================

-- Update conversation timestamp on new message
CREATE OR REPLACE FUNCTION update_conversation_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.conversations
  SET 
    updated_at = NEW.sent_at,
    last_message_at = NEW.sent_at,
    unread_count_clinician = CASE 
      WHEN NEW.sender_type = 'patient' THEN unread_count_clinician + 1
      ELSE unread_count_clinician
    END,
    unread_count_patient = CASE 
      WHEN NEW.sender_type = 'clinician' THEN unread_count_patient + 1
      ELSE unread_count_patient
    END
  WHERE conversation_id = NEW.conversation_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_conversation_timestamp
  AFTER INSERT ON public.messages
  FOR EACH ROW
  EXECUTE FUNCTION update_conversation_timestamp();

-- Reset unread count when message is read
CREATE OR REPLACE FUNCTION reset_unread_count()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_read = true AND OLD.is_read = false THEN
    UPDATE public.conversations
    SET 
      unread_count_clinician = CASE 
        WHEN NEW.sender_type = 'patient' AND unread_count_clinician > 0 THEN unread_count_clinician - 1
        ELSE unread_count_clinician
      END,
      unread_count_patient = CASE 
        WHEN NEW.sender_type = 'clinician' AND unread_count_patient > 0 THEN unread_count_patient - 1
        ELSE unread_count_patient
      END
    WHERE conversation_id = NEW.conversation_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_reset_unread_count
  AFTER UPDATE ON public.messages
  FOR EACH ROW
  WHEN (NEW.is_read IS DISTINCT FROM OLD.is_read)
  EXECUTE FUNCTION reset_unread_count();

-- Auto-update conversation updated_at
CREATE TRIGGER update_conversations_updated_at 
  BEFORE UPDATE ON public.conversations 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Auto-update form_templates updated_at
CREATE TRIGGER update_form_templates_updated_at 
  BEFORE UPDATE ON public.form_templates 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

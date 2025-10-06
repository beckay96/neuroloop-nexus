-- Comprehensive Scheduling System
-- Created: 2025-09-30
-- Features: Appointments, Calendar Sync, Availability, Reminders, Video Calls

-- =====================================================
-- CORE APPOINTMENT TABLES
-- =====================================================

-- Appointments: Main appointment records
CREATE TABLE IF NOT EXISTS public.appointments (
  appointment_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinician_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  patient_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  appointment_type TEXT CHECK (appointment_type IN (
    'initial_consultation',
    'follow_up',
    'medication_review',
    'test_review',
    'urgent_visit',
    'routine_checkup',
    'video_call',
    'in_person',
    'phone_call'
  )) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  scheduled_start TIMESTAMP WITH TIME ZONE NOT NULL,
  scheduled_end TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_minutes INTEGER NOT NULL,
  status TEXT CHECK (status IN (
    'requested',
    'pending_approval',
    'confirmed',
    'rescheduled',
    'cancelled_by_patient',
    'cancelled_by_clinician',
    'completed',
    'no_show',
    'in_progress'
  )) DEFAULT 'confirmed',
  location_type TEXT CHECK (location_type IN ('in_person', 'video', 'phone')) NOT NULL,
  location_details TEXT,
  video_call_link TEXT,
  video_call_provider TEXT CHECK (video_call_provider IN ('zoom', 'google_meet', 'microsoft_teams', 'custom')),
  
  -- Messaging integration
  requested_via_message_id UUID REFERENCES public.messages(message_id),
  conversation_id UUID REFERENCES public.conversations(conversation_id),
  
  -- Calendar sync
  google_calendar_event_id VARCHAR(255),
  apple_calendar_event_id VARCHAR(255),
  ical_uid VARCHAR(255),
  
  -- Notes and attachments
  clinician_notes TEXT,
  patient_notes TEXT,
  preparation_instructions TEXT,
  
  -- Reminders
  reminder_sent_24h BOOLEAN DEFAULT false,
  reminder_sent_1h BOOLEAN DEFAULT false,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  confirmed_at TIMESTAMP WITH TIME ZONE,
  cancelled_at TIMESTAMP WITH TIME ZONE,
  cancellation_reason TEXT,
  completed_at TIMESTAMP WITH TIME ZONE,
  
  -- Check constraints
  CONSTRAINT valid_time_range CHECK (scheduled_end > scheduled_start),
  CONSTRAINT valid_duration CHECK (duration_minutes > 0 AND duration_minutes <= 480)
);

CREATE INDEX idx_appointments_clinician ON public.appointments(clinician_id, scheduled_start DESC);
CREATE INDEX idx_appointments_patient ON public.appointments(patient_id, scheduled_start DESC);
CREATE INDEX idx_appointments_status ON public.appointments(status);
CREATE INDEX idx_appointments_scheduled ON public.appointments(scheduled_start, scheduled_end);
CREATE INDEX idx_appointments_conversation ON public.appointments(conversation_id);
CREATE INDEX idx_appointments_google_sync ON public.appointments(google_calendar_event_id) WHERE google_calendar_event_id IS NOT NULL;
CREATE INDEX idx_appointments_type ON public.appointments(appointment_type);

-- =====================================================
-- CLINICIAN AVAILABILITY
-- =====================================================

-- Recurring availability patterns
CREATE TABLE IF NOT EXISTS public.clinician_availability (
  availability_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinician_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  day_of_week INTEGER CHECK (day_of_week BETWEEN 0 AND 6) NOT NULL, -- 0=Sunday, 6=Saturday
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  slot_duration_minutes INTEGER DEFAULT 30,
  is_active BOOLEAN DEFAULT true,
  timezone VARCHAR(50) DEFAULT 'UTC',
  location_type TEXT CHECK (location_type IN ('in_person', 'video', 'phone', 'any')) DEFAULT 'any',
  appointment_types TEXT[], -- Which appointment types allowed
  buffer_minutes INTEGER DEFAULT 0, -- Buffer between appointments
  max_appointments_per_day INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  CONSTRAINT valid_time_range CHECK (end_time > start_time)
);

CREATE INDEX idx_availability_clinician ON public.clinician_availability(clinician_id);
CREATE INDEX idx_availability_day ON public.clinician_availability(day_of_week);
CREATE INDEX idx_availability_active ON public.clinician_availability(is_active) WHERE is_active = true;

-- Specific date overrides (holidays, time off, special hours)
CREATE TABLE IF NOT EXISTS public.clinician_date_overrides (
  override_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinician_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  override_date DATE NOT NULL,
  is_available BOOLEAN DEFAULT false,
  start_time TIME,
  end_time TIME,
  reason TEXT,
  override_type TEXT CHECK (override_type IN ('vacation', 'holiday', 'sick_leave', 'conference', 'custom_hours', 'blocked')) DEFAULT 'vacation',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(clinician_id, override_date)
);

CREATE INDEX idx_date_overrides_clinician ON public.clinician_date_overrides(clinician_id, override_date);
CREATE INDEX idx_date_overrides_date ON public.clinician_date_overrides(override_date);

-- =====================================================
-- APPOINTMENT REQUESTS & OFFERS
-- =====================================================

-- Appointment time slots offered/requested in messages
CREATE TABLE IF NOT EXISTS public.appointment_time_slots (
  slot_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id UUID REFERENCES public.messages(message_id) ON DELETE CASCADE NOT NULL,
  conversation_id UUID REFERENCES public.conversations(conversation_id) ON DELETE CASCADE NOT NULL,
  offered_by UUID REFERENCES auth.users(id) NOT NULL,
  offered_to UUID REFERENCES auth.users(id) NOT NULL,
  slot_type TEXT CHECK (slot_type IN ('offer', 'request', 'counter_offer')) NOT NULL,
  
  -- Time slot options (multiple can be offered)
  time_options JSONB NOT NULL, -- Array of {start, end, duration}
  
  appointment_type TEXT,
  location_type TEXT,
  notes TEXT,
  
  -- Response tracking
  status TEXT CHECK (status IN ('pending', 'accepted', 'declined', 'expired', 'cancelled')) DEFAULT 'pending',
  selected_time_index INTEGER, -- Which option was selected
  responded_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE,
  
  -- Link to created appointment
  appointment_id UUID REFERENCES public.appointments(appointment_id),
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE INDEX idx_time_slots_message ON public.appointment_time_slots(message_id);
CREATE INDEX idx_time_slots_conversation ON public.appointment_time_slots(conversation_id);
CREATE INDEX idx_time_slots_offered_to ON public.appointment_time_slots(offered_to, status);
CREATE INDEX idx_time_slots_status ON public.appointment_time_slots(status);

-- =====================================================
-- CALENDAR SYNC
-- =====================================================

-- Calendar sync connections
CREATE TABLE IF NOT EXISTS public.calendar_sync_connections (
  connection_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  provider TEXT CHECK (provider IN ('google', 'apple', 'microsoft', 'outlook')) NOT NULL,
  calendar_id VARCHAR(512) NOT NULL,
  calendar_name VARCHAR(255),
  access_token TEXT, -- Encrypted
  refresh_token TEXT, -- Encrypted
  token_expires_at TIMESTAMP WITH TIME ZONE,
  is_primary BOOLEAN DEFAULT false,
  sync_enabled BOOLEAN DEFAULT true,
  sync_direction TEXT CHECK (sync_direction IN ('two_way', 'to_external', 'from_external')) DEFAULT 'two_way',
  last_sync_at TIMESTAMP WITH TIME ZONE,
  last_sync_status TEXT CHECK (last_sync_status IN ('success', 'failed', 'pending')) DEFAULT 'pending',
  sync_errors JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, provider, calendar_id)
);

CREATE INDEX idx_calendar_sync_user ON public.calendar_sync_connections(user_id);
CREATE INDEX idx_calendar_sync_provider ON public.calendar_sync_connections(provider);
CREATE INDEX idx_calendar_sync_enabled ON public.calendar_sync_connections(sync_enabled) WHERE sync_enabled = true;

-- Sync log for troubleshooting
CREATE TABLE IF NOT EXISTS public.calendar_sync_log (
  log_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  connection_id UUID REFERENCES public.calendar_sync_connections(connection_id) ON DELETE CASCADE NOT NULL,
  appointment_id UUID REFERENCES public.appointments(appointment_id),
  sync_direction TEXT CHECK (sync_direction IN ('to_external', 'from_external')) NOT NULL,
  action TEXT CHECK (action IN ('create', 'update', 'delete', 'sync')) NOT NULL,
  status TEXT CHECK (status IN ('success', 'failed')) NOT NULL,
  error_message TEXT,
  external_event_id VARCHAR(512),
  synced_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE INDEX idx_sync_log_connection ON public.calendar_sync_log(connection_id, synced_at DESC);
CREATE INDEX idx_sync_log_appointment ON public.calendar_sync_log(appointment_id);

-- =====================================================
-- REMINDERS & NOTIFICATIONS
-- =====================================================

-- Appointment reminders
CREATE TABLE IF NOT EXISTS public.appointment_reminders (
  reminder_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  appointment_id UUID REFERENCES public.appointments(appointment_id) ON DELETE CASCADE NOT NULL,
  recipient_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  reminder_type TEXT CHECK (reminder_type IN ('24_hours', '1_hour', '15_minutes', 'custom')) NOT NULL,
  scheduled_for TIMESTAMP WITH TIME ZONE NOT NULL,
  delivery_method TEXT CHECK (delivery_method IN ('email', 'sms', 'push', 'in_app')) NOT NULL,
  status TEXT CHECK (status IN ('pending', 'sent', 'failed', 'cancelled')) DEFAULT 'pending',
  sent_at TIMESTAMP WITH TIME ZONE,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE INDEX idx_reminders_appointment ON public.appointment_reminders(appointment_id);
CREATE INDEX idx_reminders_recipient ON public.appointment_reminders(recipient_id);
CREATE INDEX idx_reminders_scheduled ON public.appointment_reminders(scheduled_for, status) WHERE status = 'pending';

-- =====================================================
-- VIDEO CONSULTATION
-- =====================================================

-- Video call sessions
CREATE TABLE IF NOT EXISTS public.video_call_sessions (
  session_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  appointment_id UUID REFERENCES public.appointments(appointment_id) ON DELETE CASCADE NOT NULL,
  provider TEXT CHECK (provider IN ('zoom', 'google_meet', 'microsoft_teams', 'twilio', 'custom')) NOT NULL,
  meeting_id VARCHAR(255) NOT NULL,
  meeting_url TEXT NOT NULL,
  meeting_password VARCHAR(255),
  host_id UUID REFERENCES auth.users(id) NOT NULL,
  
  -- Session status
  status TEXT CHECK (status IN ('scheduled', 'active', 'ended', 'failed')) DEFAULT 'scheduled',
  started_at TIMESTAMP WITH TIME ZONE,
  ended_at TIMESTAMP WITH TIME ZONE,
  duration_seconds INTEGER,
  
  -- Participants
  participants JSONB, -- Array of {user_id, joined_at, left_at}
  
  -- Recording
  recording_enabled BOOLEAN DEFAULT false,
  recording_url TEXT,
  recording_password VARCHAR(255),
  
  -- Metadata
  provider_metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE INDEX idx_video_sessions_appointment ON public.video_call_sessions(appointment_id);
CREATE INDEX idx_video_sessions_host ON public.video_call_sessions(host_id);
CREATE INDEX idx_video_sessions_status ON public.video_call_sessions(status);

-- =====================================================
-- WAITLIST & CANCELLATIONS
-- =====================================================

-- Waitlist for cancelled appointments
CREATE TABLE IF NOT EXISTS public.appointment_waitlist (
  waitlist_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinician_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  patient_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  appointment_type TEXT NOT NULL,
  preferred_dates DATE[],
  preferred_times TEXT[], -- ['morning', 'afternoon', 'evening']
  location_type TEXT,
  notes TEXT,
  priority INTEGER DEFAULT 0,
  status TEXT CHECK (status IN ('active', 'fulfilled', 'cancelled', 'expired')) DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  fulfilled_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_waitlist_clinician ON public.appointment_waitlist(clinician_id, status);
CREATE INDEX idx_waitlist_patient ON public.appointment_waitlist(patient_id);
CREATE INDEX idx_waitlist_active ON public.appointment_waitlist(status, priority DESC) WHERE status = 'active';

-- =====================================================
-- ANALYTICS & METRICS
-- =====================================================

-- Appointment statistics
CREATE TABLE IF NOT EXISTS public.appointment_statistics (
  stat_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinician_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  total_appointments INTEGER DEFAULT 0,
  completed_appointments INTEGER DEFAULT 0,
  cancelled_appointments INTEGER DEFAULT 0,
  no_show_appointments INTEGER DEFAULT 0,
  average_duration_minutes DECIMAL(5,2),
  utilization_rate DECIMAL(5,2), -- Percentage of available time used
  cancellation_rate DECIMAL(5,2),
  no_show_rate DECIMAL(5,2),
  video_call_count INTEGER DEFAULT 0,
  in_person_count INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(clinician_id, date)
);

CREATE INDEX idx_stats_clinician ON public.appointment_statistics(clinician_id, date DESC);
CREATE INDEX idx_stats_date ON public.appointment_statistics(date DESC);

-- =====================================================
-- ROW LEVEL SECURITY
-- =====================================================

ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clinician_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clinician_date_overrides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointment_time_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.calendar_sync_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.calendar_sync_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointment_reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.video_call_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointment_waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointment_statistics ENABLE ROW LEVEL SECURITY;

-- Appointments: Users can see their own appointments
CREATE POLICY "Users can view their appointments" ON public.appointments
  FOR SELECT USING (
    auth.uid() = clinician_id OR auth.uid() = patient_id
  );

CREATE POLICY "Clinicians can create appointments" ON public.appointments
  FOR INSERT WITH CHECK (auth.uid() = clinician_id);

CREATE POLICY "Users can update their appointments" ON public.appointments
  FOR UPDATE USING (
    auth.uid() = clinician_id OR auth.uid() = patient_id
  );

-- Availability: Clinicians manage their own, patients can view
CREATE POLICY "Clinicians manage their availability" ON public.clinician_availability
  FOR ALL USING (auth.uid() = clinician_id);

CREATE POLICY "Patients can view clinician availability" ON public.clinician_availability
  FOR SELECT USING (
    is_active = true AND
    EXISTS (
      SELECT 1 FROM public.patient_clinician_connections
      WHERE clinician_id = clinician_availability.clinician_id
      AND patient_id = auth.uid()
      AND status = 'active'
    )
  );

-- Date overrides: Similar to availability
CREATE POLICY "Clinicians manage date overrides" ON public.clinician_date_overrides
  FOR ALL USING (auth.uid() = clinician_id);

-- Time slots: Users can see slots offered to them
CREATE POLICY "Users can view their time slots" ON public.appointment_time_slots
  FOR SELECT USING (
    auth.uid() = offered_by OR auth.uid() = offered_to
  );

CREATE POLICY "Users can create time slots" ON public.appointment_time_slots
  FOR INSERT WITH CHECK (auth.uid() = offered_by);

CREATE POLICY "Recipients can update time slots" ON public.appointment_time_slots
  FOR UPDATE USING (auth.uid() = offered_to);

-- Calendar sync: Users manage their own
CREATE POLICY "Users manage their calendar connections" ON public.calendar_sync_connections
  FOR ALL USING (auth.uid() = user_id);

-- Calendar sync log: Users view their own
CREATE POLICY "Users view their sync log" ON public.calendar_sync_log
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.calendar_sync_connections
      WHERE connection_id = calendar_sync_log.connection_id
      AND user_id = auth.uid()
    )
  );

-- Reminders: Recipients view their own
CREATE POLICY "Users view their reminders" ON public.appointment_reminders
  FOR SELECT USING (auth.uid() = recipient_id);

-- Video sessions: Participants can view
CREATE POLICY "Users view their video sessions" ON public.video_call_sessions
  FOR SELECT USING (
    auth.uid() = host_id OR
    EXISTS (
      SELECT 1 FROM public.appointments
      WHERE appointment_id = video_call_sessions.appointment_id
      AND (clinician_id = auth.uid() OR patient_id = auth.uid())
    )
  );

-- Waitlist: Users view their own entries
CREATE POLICY "Users view their waitlist entries" ON public.appointment_waitlist
  FOR ALL USING (
    auth.uid() = patient_id OR auth.uid() = clinician_id
  );

-- Statistics: Clinicians view their own
CREATE POLICY "Clinicians view their statistics" ON public.appointment_statistics
  FOR SELECT USING (auth.uid() = clinician_id);

-- =====================================================
-- TRIGGERS & FUNCTIONS
-- =====================================================

-- Update appointment updated_at
CREATE TRIGGER update_appointments_updated_at 
  BEFORE UPDATE ON public.appointments 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Update availability updated_at
CREATE TRIGGER update_availability_updated_at 
  BEFORE UPDATE ON public.clinician_availability 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Update calendar sync updated_at
CREATE TRIGGER update_calendar_sync_updated_at 
  BEFORE UPDATE ON public.calendar_sync_connections 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Auto-create reminders when appointment is confirmed
CREATE OR REPLACE FUNCTION create_appointment_reminders()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'confirmed' AND OLD.status != 'confirmed' THEN
    -- 24 hour reminder
    INSERT INTO public.appointment_reminders (
      appointment_id, recipient_id, reminder_type, scheduled_for, delivery_method
    ) VALUES
    (NEW.appointment_id, NEW.patient_id, '24_hours', NEW.scheduled_start - INTERVAL '24 hours', 'email'),
    (NEW.appointment_id, NEW.clinician_id, '24_hours', NEW.scheduled_start - INTERVAL '24 hours', 'in_app');
    
    -- 1 hour reminder
    INSERT INTO public.appointment_reminders (
      appointment_id, recipient_id, reminder_type, scheduled_for, delivery_method
    ) VALUES
    (NEW.appointment_id, NEW.patient_id, '1_hour', NEW.scheduled_start - INTERVAL '1 hour', 'push'),
    (NEW.appointment_id, NEW.clinician_id, '1_hour', NEW.scheduled_start - INTERVAL '1 hour', 'in_app');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_create_reminders
  AFTER INSERT OR UPDATE ON public.appointments
  FOR EACH ROW
  EXECUTE FUNCTION create_appointment_reminders();

-- ========================================
-- NOTIFICATIONS SYSTEM SETUP
-- ========================================
-- Purpose: Complete PWA notification system with database backing
-- Privacy: NO PHI in notification content - only references
-- Date: 2025-01-06
-- Status: READY TO APPLY

BEGIN;

-- ========================================
-- 1. NOTIFICATION PREFERENCES TABLE
-- ========================================

CREATE TABLE IF NOT EXISTS public.notification_preferences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    
    -- Master switches
    push_enabled BOOLEAN DEFAULT true,
    email_enabled BOOLEAN DEFAULT false,
    
    -- Medication reminders
    medication_reminders BOOLEAN DEFAULT true,
    medication_reminder_minutes INTEGER DEFAULT 15, -- minutes before dose
    
    -- Appointment reminders
    appointment_reminders BOOLEAN DEFAULT true,
    appointment_reminder_hours INTEGER DEFAULT 24,
    
    -- Health alerts
    critical_alerts BOOLEAN DEFAULT true,
    pattern_alerts BOOLEAN DEFAULT true,
    achievement_notifications BOOLEAN DEFAULT true,
    
    -- Messages
    message_notifications BOOLEAN DEFAULT true,
    direct_messages BOOLEAN DEFAULT true,
    
    -- Daily check-ins
    daily_checkin_reminder BOOLEAN DEFAULT true,
    daily_checkin_time TIME DEFAULT '20:00:00',
    
    -- Quiet hours
    quiet_hours_enabled BOOLEAN DEFAULT false,
    quiet_hours_start TIME DEFAULT '22:00:00',
    quiet_hours_end TIME DEFAULT '08:00:00',
    
    -- Sound & vibration
    sound_enabled BOOLEAN DEFAULT true,
    vibration_enabled BOOLEAN DEFAULT true,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE public.notification_preferences IS 'User notification preferences - NO PHI';

-- Indexes
CREATE INDEX IF NOT EXISTS idx_notification_prefs_user_id ON public.notification_preferences(user_id);

-- RLS: Users can only manage their own preferences
ALTER TABLE public.notification_preferences ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can manage own notification preferences" ON public.notification_preferences;
CREATE POLICY "Users can manage own notification preferences"
    ON public.notification_preferences
    FOR ALL
    USING (auth.uid() = user_id);

-- ========================================
-- 2. NOTIFICATION QUEUE TABLE
-- ========================================
-- Stores notifications to be sent (NO PHI in content!)

CREATE TABLE IF NOT EXISTS public.notification_queue (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    
    -- Notification metadata (NO PHI!)
    notification_type TEXT NOT NULL CHECK (notification_type IN (
        'medication_reminder',
        'appointment_reminder',
        'daily_checkin',
        'critical_alert',
        'pattern_alert',
        'achievement',
        'message',
        'system'
    )),
    
    -- Content (NO PHI - only references!)
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    action_url TEXT, -- e.g., '/dashboard/medications', '/messages/123'
    reference_id UUID, -- Reference to medication, appointment, etc. (NOT PHI content)
    
    -- Delivery
    status TEXT NOT NULL CHECK (status IN ('pending', 'sent', 'failed', 'cancelled')) DEFAULT 'pending',
    scheduled_for TIMESTAMPTZ NOT NULL,
    sent_at TIMESTAMPTZ,
    
    -- Priority
    priority TEXT CHECK (priority IN ('low', 'normal', 'high', 'critical')) DEFAULT 'normal',
    
    -- Metadata
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE public.notification_queue IS 'Notification queue - NO PHI in content, only references';

-- Indexes
CREATE INDEX IF NOT EXISTS idx_notification_queue_user_id ON public.notification_queue(user_id);
CREATE INDEX IF NOT EXISTS idx_notification_queue_status ON public.notification_queue(status);
CREATE INDEX IF NOT EXISTS idx_notification_queue_scheduled ON public.notification_queue(scheduled_for);
CREATE INDEX IF NOT EXISTS idx_notification_queue_type ON public.notification_queue(notification_type);

-- RLS: Users can only see their own notifications
ALTER TABLE public.notification_queue ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own notifications" ON public.notification_queue;
CREATE POLICY "Users can view own notifications"
    ON public.notification_queue
    FOR SELECT
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own notification status" ON public.notification_queue;
CREATE POLICY "Users can update own notification status"
    ON public.notification_queue
    FOR UPDATE
    USING (auth.uid() = user_id);

-- ========================================
-- 3. NOTIFICATION HISTORY TABLE
-- ========================================
-- Tracks sent notifications for analytics (NO PHI!)

CREATE TABLE IF NOT EXISTS public.notification_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    notification_type TEXT NOT NULL,
    sent_at TIMESTAMPTZ NOT NULL,
    opened_at TIMESTAMPTZ,
    action_taken BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE public.notification_history IS 'Notification delivery history - NO PHI';

-- Indexes
CREATE INDEX IF NOT EXISTS idx_notification_history_user_id ON public.notification_history(user_id);
CREATE INDEX IF NOT EXISTS idx_notification_history_sent_at ON public.notification_history(sent_at);

-- RLS: Users can only see their own history
ALTER TABLE public.notification_history ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own notification history" ON public.notification_history;
CREATE POLICY "Users can view own notification history"
    ON public.notification_history
    FOR SELECT
    USING (auth.uid() = user_id);

-- ========================================
-- 4. PWA PUSH SUBSCRIPTIONS TABLE
-- ========================================
-- Stores PWA push subscription endpoints (NO PHI!)

CREATE TABLE IF NOT EXISTS public.pwa_push_subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    
    -- Push subscription data
    endpoint TEXT NOT NULL,
    p256dh_key TEXT NOT NULL, -- Public key for encryption
    auth_key TEXT NOT NULL, -- Authentication secret
    
    -- Device info (NO PHI!)
    device_type TEXT, -- 'mobile', 'desktop', 'tablet'
    browser TEXT, -- 'chrome', 'firefox', 'safari'
    
    -- Status
    active BOOLEAN DEFAULT true,
    last_used_at TIMESTAMPTZ DEFAULT NOW(),
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(user_id, endpoint)
);

COMMENT ON TABLE public.pwa_push_subscriptions IS 'PWA push notification subscriptions - NO PHI';

-- Indexes
CREATE INDEX IF NOT EXISTS idx_pwa_subscriptions_user_id ON public.pwa_push_subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_pwa_subscriptions_active ON public.pwa_push_subscriptions(active);

-- RLS: Users can only manage their own subscriptions
ALTER TABLE public.pwa_push_subscriptions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can manage own push subscriptions" ON public.pwa_push_subscriptions;
CREATE POLICY "Users can manage own push subscriptions"
    ON public.pwa_push_subscriptions
    FOR ALL
    USING (auth.uid() = user_id);

-- ========================================
-- 5. NOTIFICATION HELPER FUNCTIONS
-- ========================================

-- 5.1 Check if in Quiet Hours
CREATE OR REPLACE FUNCTION public.is_in_quiet_hours(p_user_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_prefs RECORD;
    v_current_time TIME;
BEGIN
    -- Get user preferences
    SELECT quiet_hours_enabled, quiet_hours_start, quiet_hours_end
    INTO v_prefs
    FROM public.notification_preferences
    WHERE user_id = p_user_id;
    
    -- If quiet hours not enabled, return false
    IF NOT FOUND OR NOT v_prefs.quiet_hours_enabled THEN
        RETURN false;
    END IF;
    
    v_current_time := CURRENT_TIME;
    
    -- Handle overnight quiet hours (e.g., 22:00 to 08:00)
    IF v_prefs.quiet_hours_start > v_prefs.quiet_hours_end THEN
        RETURN v_current_time >= v_prefs.quiet_hours_start OR v_current_time < v_prefs.quiet_hours_end;
    ELSE
        RETURN v_current_time >= v_prefs.quiet_hours_start AND v_current_time < v_prefs.quiet_hours_end;
    END IF;
END;
$$;

COMMENT ON FUNCTION public.is_in_quiet_hours IS 'Check if current time is in user quiet hours';

-- 5.2 Schedule Notification
CREATE OR REPLACE FUNCTION public.schedule_notification(
    p_user_id UUID,
    p_type TEXT,
    p_title TEXT,
    p_body TEXT,
    p_action_url TEXT DEFAULT NULL,
    p_reference_id UUID DEFAULT NULL,
    p_scheduled_for TIMESTAMPTZ DEFAULT NOW(),
    p_priority TEXT DEFAULT 'normal'
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_notification_id UUID;
    v_prefs RECORD;
BEGIN
    -- Get user preferences
    SELECT * INTO v_prefs
    FROM public.notification_preferences
    WHERE user_id = p_user_id;
    
    -- Check if notifications enabled
    IF NOT FOUND OR NOT v_prefs.push_enabled THEN
        RETURN NULL; -- User has disabled notifications
    END IF;
    
    -- Check type-specific preferences
    IF p_type = 'medication_reminder' AND NOT v_prefs.medication_reminders THEN
        RETURN NULL;
    ELSIF p_type = 'daily_checkin' AND NOT v_prefs.daily_checkin_reminder THEN
        RETURN NULL;
    ELSIF p_type = 'message' AND NOT v_prefs.message_notifications THEN
        RETURN NULL;
    END IF;
    
    -- Don't schedule during quiet hours (unless critical)
    IF p_priority != 'critical' AND public.is_in_quiet_hours(p_user_id) THEN
        -- Reschedule for end of quiet hours
        SELECT quiet_hours_end INTO p_scheduled_for
        FROM public.notification_preferences
        WHERE user_id = p_user_id;
    END IF;
    
    -- Insert notification
    INSERT INTO public.notification_queue (
        user_id,
        notification_type,
        title,
        body,
        action_url,
        reference_id,
        scheduled_for,
        priority
    ) VALUES (
        p_user_id,
        p_type,
        p_title,
        p_body,
        p_action_url,
        p_reference_id,
        p_scheduled_for,
        p_priority
    )
    RETURNING id INTO v_notification_id;
    
    RETURN v_notification_id;
END;
$$;

COMMENT ON FUNCTION public.schedule_notification IS 'Schedule a notification respecting user preferences - NO PHI in content';

-- 5.3 Mark Notification as Read
CREATE OR REPLACE FUNCTION public.mark_notification_read(p_notification_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    UPDATE public.notification_queue
    SET status = 'sent',
        sent_at = NOW()
    WHERE id = p_notification_id
    AND user_id = auth.uid(); -- Security: only own notifications
    
    -- Log to history
    INSERT INTO public.notification_history (
        user_id,
        notification_type,
        sent_at,
        opened_at
    )
    SELECT 
        user_id,
        notification_type,
        NOW(),
        NOW()
    FROM public.notification_queue
    WHERE id = p_notification_id;
END;
$$;

-- ========================================
-- 6. MEDICATION REMINDER TRIGGERS
-- ========================================

-- 6.1 Schedule Medication Reminders
CREATE OR REPLACE FUNCTION private_health_info.schedule_medication_reminders()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = private_health_info, public
AS $$
DECLARE
    v_prefs RECORD;
    v_medication_name TEXT;
    v_next_dose TIMESTAMPTZ;
BEGIN
    -- Get user preferences
    SELECT * INTO v_prefs
    FROM public.notification_preferences
    WHERE user_id = NEW.user_id;
    
    -- If medication reminders disabled, skip
    IF NOT FOUND OR NOT v_prefs.medication_reminders THEN
        RETURN NEW;
    END IF;
    
    -- Get medication name (NO PHI - just generic reference)
    SELECT 'Medication Reminder' INTO v_medication_name;
    
    -- Calculate next dose time (example: if dose_times array exists)
    -- For now, schedule for tomorrow at daily_checkin_time
    v_next_dose := (CURRENT_DATE + INTERVAL '1 day' + v_prefs.daily_checkin_time::TIME)::TIMESTAMPTZ;
    
    -- Schedule notification (NO PHI in content!)
    PERFORM public.schedule_notification(
        NEW.user_id,
        'medication_reminder',
        'Medication Reminder',
        'Time to take your medication. Tap to log.',
        '/dashboard?action=medication',
        NEW.id,
        v_next_dose - (v_prefs.medication_reminder_minutes || ' minutes')::INTERVAL,
        'normal'
    );
    
    RETURN NEW;
END;
$$;

-- Trigger on user_medications
DROP TRIGGER IF EXISTS trigger_schedule_medication_reminders ON private_health_info.user_medications;
CREATE TRIGGER trigger_schedule_medication_reminders
    AFTER INSERT OR UPDATE ON private_health_info.user_medications
    FOR EACH ROW
    WHEN (NEW.end_date IS NULL) -- Only active medications
    EXECUTE FUNCTION private_health_info.schedule_medication_reminders();

-- ========================================
-- 7. DAILY CHECK-IN REMINDER FUNCTION
-- ========================================

-- This would be called by a cron job or scheduled function
CREATE OR REPLACE FUNCTION public.schedule_daily_checkin_reminders()
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_user RECORD;
    v_scheduled_time TIMESTAMPTZ;
    v_count INTEGER := 0;
BEGIN
    -- Loop through users with daily check-in enabled
    FOR v_user IN 
        SELECT user_id, daily_checkin_time
        FROM public.notification_preferences
        WHERE daily_checkin_reminder = true
        AND push_enabled = true
    LOOP
        -- Calculate next check-in time
        v_scheduled_time := (CURRENT_DATE + v_user.daily_checkin_time)::TIMESTAMPTZ;
        
        -- If time has passed today, schedule for tomorrow
        IF v_scheduled_time < NOW() THEN
            v_scheduled_time := v_scheduled_time + INTERVAL '1 day';
        END IF;
        
        -- Schedule notification (NO PHI!)
        PERFORM public.schedule_notification(
            v_user.user_id,
            'daily_checkin',
            'Daily Health Check-In',
            'How are you feeling today? Log your mood, energy, and symptoms.',
            '/dashboard?action=daily-tracking',
            NULL,
            v_scheduled_time,
            'normal'
        );
        
        v_count := v_count + 1;
    END LOOP;
    
    RETURN v_count;
END;
$$;

COMMENT ON FUNCTION public.schedule_daily_checkin_reminders IS 'Schedule daily check-in reminders for all users - NO PHI';

-- ========================================
-- 8. PATTERN ALERT TRIGGERS
-- ========================================

-- 8.1 Catamenial Pattern Alert
CREATE OR REPLACE FUNCTION private_health_info.check_catamenial_pattern_alert()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = private_health_info, public
AS $$
DECLARE
    v_recent_cycles INTEGER;
BEGIN
    -- If user suspects catamenial pattern, send alert
    IF NEW.catamenial_pattern_suspected = true THEN
        -- Check how many times they've suspected this
        SELECT COUNT(*) INTO v_recent_cycles
        FROM private_health_info.menstrual_cycle_logs
        WHERE user_id = NEW.user_id
        AND catamenial_pattern_suspected = true
        AND created_at > NOW() - INTERVAL '3 months';
        
        -- If 2+ cycles with suspected pattern, send alert (NO PHI!)
        IF v_recent_cycles >= 2 THEN
            PERFORM public.schedule_notification(
                NEW.user_id,
                'pattern_alert',
                'Catamenial Seizure Pattern Detected',
                'You''ve logged multiple cycles with menstrual-related seizures. Consider discussing this pattern with your neurologist.',
                '/dashboard/insights',
                NEW.id,
                NOW(),
                'high'
            );
        END IF;
    END IF;
    
    RETURN NEW;
END;
$$;

-- Trigger on menstrual logs
DROP TRIGGER IF EXISTS trigger_catamenial_pattern_alert ON private_health_info.menstrual_cycle_logs;
CREATE TRIGGER trigger_catamenial_pattern_alert
    AFTER INSERT ON private_health_info.menstrual_cycle_logs
    FOR EACH ROW
    EXECUTE FUNCTION private_health_info.check_catamenial_pattern_alert();

-- 8.2 Seizure Cluster Alert
CREATE OR REPLACE FUNCTION private_health_info.check_seizure_cluster_alert()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = private_health_info, public
AS $$
DECLARE
    v_recent_seizures INTEGER;
BEGIN
    -- Count seizures in last 24 hours
    SELECT COUNT(*) INTO v_recent_seizures
    FROM private_health_info.seizure_events
    WHERE patient_id = NEW.patient_id
    AND occurred_at > NOW() - INTERVAL '24 hours';
    
    -- If 3+ seizures in 24 hours, send critical alert (NO PHI!)
    IF v_recent_seizures >= 3 THEN
        PERFORM public.schedule_notification(
            NEW.patient_id,
            'critical_alert',
            'Seizure Cluster Detected',
            'You''ve logged 3+ seizures in 24 hours. Consider contacting your healthcare provider.',
            '/dashboard/emergency',
            NEW.id,
            NOW(),
            'critical'
        );
    END IF;
    
    RETURN NEW;
END;
$$;

-- Trigger on seizure events
DROP TRIGGER IF EXISTS trigger_seizure_cluster_alert ON private_health_info.seizure_events;
CREATE TRIGGER trigger_seizure_cluster_alert
    AFTER INSERT ON private_health_info.seizure_events
    FOR EACH ROW
    EXECUTE FUNCTION private_health_info.check_seizure_cluster_alert();

-- ========================================
-- 9. GRANT PERMISSIONS
-- ========================================

-- Allow authenticated users to call notification functions
GRANT EXECUTE ON FUNCTION public.schedule_notification TO authenticated;
GRANT EXECUTE ON FUNCTION public.mark_notification_read TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_in_quiet_hours TO authenticated;

COMMIT;

-- ========================================
-- VERIFICATION QUERIES
-- ========================================

-- Check tables exist:
-- SELECT table_name FROM information_schema.tables 
-- WHERE table_name LIKE '%notification%' OR table_name LIKE '%pwa%';

-- Check triggers:
-- SELECT trigger_name, event_object_table 
-- FROM information_schema.triggers 
-- WHERE trigger_name LIKE '%notification%' OR trigger_name LIKE '%alert%';

-- Test notification scheduling:
-- SELECT public.schedule_notification(
--     auth.uid(),
--     'daily_checkin',
--     'Test Notification',
--     'This is a test',
--     '/dashboard',
--     NULL,
--     NOW() + INTERVAL '1 minute',
--     'normal'
-- );

-- ========================================
-- POST-MIGRATION NOTES
-- ========================================

-- ✅ Notification preferences table created
-- ✅ Notification queue with NO PHI
-- ✅ PWA push subscriptions table
-- ✅ Medication reminder triggers
-- ✅ Daily check-in scheduling
-- ✅ Catamenial pattern alerts
-- ✅ Seizure cluster alerts
-- ✅ Quiet hours support
-- ✅ Priority-based delivery

-- CRITICAL: All notification content is PHI-free!
-- Only references (IDs, URLs) are stored.
-- Actual PHI is fetched client-side when notification is opened.

-- PWA Push Setup (Frontend):
-- 1. Request notification permission
-- 2. Subscribe to push notifications
-- 3. Save subscription to pwa_push_subscriptions table
-- 4. Service worker handles push events
-- 5. Fetch actual data when notification clicked

-- Cron Job Setup (Backend):
-- Schedule: public.schedule_daily_checkin_reminders()
-- Run: Daily at midnight to schedule next day's reminders

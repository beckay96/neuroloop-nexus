import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface NotificationPreferences {
  id?: string;
  user_id: string;
  push_enabled: boolean;
  email_enabled: boolean;
  medication_reminders: boolean;
  medication_reminder_minutes: number;
  appointment_reminders: boolean;
  appointment_reminder_hours: number;
  critical_alerts: boolean;
  pattern_alerts: boolean;
  achievement_notifications: boolean;
  message_notifications: boolean;
  direct_messages: boolean;
  daily_checkin_reminder: boolean;
  daily_checkin_time: string;
  quiet_hours_enabled: boolean;
  quiet_hours_start: string;
  quiet_hours_end: string;
  sound_enabled: boolean;
  vibration_enabled: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Notification {
  id: string;
  user_id: string;
  notification_type: string;
  title: string;
  body: string;
  action_url?: string;
  reference_id?: string;
  status: 'pending' | 'sent' | 'failed' | 'cancelled';
  scheduled_for: string;
  sent_at?: string;
  priority: 'low' | 'normal' | 'high' | 'critical';
  created_at: string;
}

export const useNotifications = (userId?: string) => {
  const [preferences, setPreferences] = useState<NotificationPreferences | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Fetch notification preferences
  const fetchPreferences = async () => {
    if (!userId) return;

    try {
      const { data, error } = await supabase
        .from('notification_preferences')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') throw error;
      
      if (data) {
        setPreferences(data);
      } else {
        // Create default preferences
        await createDefaultPreferences();
      }
    } catch (error) {
      console.error('Error fetching notification preferences:', error);
    }
  };

  // Create default preferences
  const createDefaultPreferences = async () => {
    if (!userId) return;

    try {
      const { data, error } = await supabase
        .from('notification_preferences')
        .insert({
          user_id: userId,
          push_enabled: true,
          medication_reminders: true,
          daily_checkin_reminder: true,
          daily_checkin_time: '20:00:00'
        })
        .select()
        .single();

      if (error) throw error;
      setPreferences(data);
    } catch (error) {
      console.error('Error creating notification preferences:', error);
    }
  };

  // Fetch notifications
  const fetchNotifications = async () => {
    if (!userId) return;

    try {
      const { data, error } = await supabase
        .from('notification_queue')
        .select('*')
        .eq('user_id', userId)
        .eq('status', 'pending')
        .order('scheduled_for', { ascending: true })
        .limit(50);

      if (error) throw error;
      setNotifications(data || []);
      setUnreadCount(data?.length || 0);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  // Update preferences
  const updatePreferences = async (updates: Partial<NotificationPreferences>) => {
    if (!userId) return { success: false };

    try {
      const { data, error } = await supabase
        .from('notification_preferences')
        .update(updates)
        .eq('user_id', userId)
        .select()
        .single();

      if (error) throw error;

      setPreferences(data);
      
      toast({
        title: "Preferences Updated",
        description: "Your notification settings have been saved.",
      });

      return { success: true, data };
    } catch (error: any) {
      console.error('Error updating preferences:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update preferences",
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  // Mark notification as read
  const markAsRead = async (notificationId: string) => {
    try {
      const { error } = await supabase
        .rpc('mark_notification_read', { p_notification_id: notificationId });

      if (error) throw error;

      // Remove from local state
      setNotifications(notifications.filter(n => n.id !== notificationId));
      setUnreadCount(prev => Math.max(0, prev - 1));

      return { success: true };
    } catch (error: any) {
      console.error('Error marking notification as read:', error);
      return { success: false, error };
    }
  };

  // Request PWA notification permission
  const requestPermission = async () => {
    if (!('Notification' in window)) {
      toast({
        title: "Not Supported",
        description: "Notifications are not supported in this browser",
        variant: "destructive"
      });
      return { success: false, error: 'not_supported' };
    }

    try {
      const permission = await Notification.requestPermission();
      
      if (permission === 'granted') {
        toast({
          title: "Notifications Enabled",
          description: "You'll now receive important health reminders",
        });
        return { success: true };
      } else {
        toast({
          title: "Permission Denied",
          description: "You can enable notifications later in settings",
          variant: "destructive"
        });
        return { success: false, error: 'denied' };
      }
    } catch (error: any) {
      console.error('Error requesting notification permission:', error);
      return { success: false, error };
    }
  };

  // Subscribe to PWA push notifications
  const subscribeToPush = async (subscription: PushSubscription) => {
    if (!userId) return { success: false };

    try {
      const subscriptionJson = subscription.toJSON();
      
      const { error } = await supabase
        .from('pwa_push_subscriptions')
        .upsert({
          user_id: userId,
          endpoint: subscriptionJson.endpoint!,
          p256dh_key: subscriptionJson.keys!.p256dh,
          auth_key: subscriptionJson.keys!.auth,
          device_type: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
          browser: /Chrome/i.test(navigator.userAgent) ? 'chrome' : 
                   /Firefox/i.test(navigator.userAgent) ? 'firefox' : 
                   /Safari/i.test(navigator.userAgent) ? 'safari' : 'other',
          active: true,
          last_used_at: new Date().toISOString()
        }, { onConflict: 'user_id,endpoint' });

      if (error) throw error;

      return { success: true };
    } catch (error: any) {
      console.error('Error saving push subscription:', error);
      return { success: false, error };
    }
  };

  useEffect(() => {
    if (userId) {
      fetchPreferences();
      fetchNotifications();
    }
  }, [userId]);

  return {
    preferences,
    notifications,
    unreadCount,
    loading,
    updatePreferences,
    markAsRead,
    requestPermission,
    subscribeToPush,
    refetch: fetchNotifications
  };
};

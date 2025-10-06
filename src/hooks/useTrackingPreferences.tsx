import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// EXACT schema match from daily_tracking_preferences table
export interface TrackingPreferences {
  id?: string;
  user_id: string;
  tracking_types?: Record<string, any>; // JSONB
  reminder_times?: Record<string, any>; // JSONB
  notification_enabled?: boolean;
  streak_notifications?: boolean;
  weekly_reports?: boolean;
  created_at?: string;
  updated_at?: string;
}

export const useTrackingPreferences = (userId?: string) => {
  const [preferences, setPreferences] = useState<TrackingPreferences | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchPreferences = async () => {
    if (!userId) return;

    try {
      const { data, error } = await supabase
        .from('daily_tracking_preferences')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows
        throw error;
      }
      
      setPreferences(data || null);
    } catch (error) {
      console.error('Error fetching tracking preferences:', error);
    } finally {
      setLoading(false);
    }
  };

  const createPreferences = async (prefsData: Omit<TrackingPreferences, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('daily_tracking_preferences')
        .insert(prefsData)
        .select()
        .single();

      if (error) throw error;

      setPreferences(data);
      
      toast({
        title: "Preferences Saved",
        description: "Your tracking preferences have been saved.",
      });

      return { success: true, data };
    } catch (error: any) {
      console.error('Error creating preferences:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to save preferences",
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  const updatePreferences = async (updates: Partial<TrackingPreferences>) => {
    if (!userId) return { success: false };

    try {
      const { data, error } = await supabase
        .from('daily_tracking_preferences')
        .upsert({
          user_id: userId,
          ...updates,
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;

      setPreferences(data);
      
      toast({
        title: "Preferences Updated",
        description: "Your tracking preferences have been updated.",
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

  const toggleNotifications = async (enabled: boolean) => {
    return updatePreferences({ notification_enabled: enabled });
  };

  const toggleStreakNotifications = async (enabled: boolean) => {
    return updatePreferences({ streak_notifications: enabled });
  };

  const toggleWeeklyReports = async (enabled: boolean) => {
    return updatePreferences({ weekly_reports: enabled });
  };

  const updateReminderTimes = async (reminderTimes: Record<string, any>) => {
    return updatePreferences({ reminder_times: reminderTimes });
  };

  const updateTrackingTypes = async (trackingTypes: Record<string, any>) => {
    return updatePreferences({ tracking_types: trackingTypes });
  };

  useEffect(() => {
    if (userId) {
      fetchPreferences();
    }
  }, [userId]);

  return {
    preferences,
    loading,
    createPreferences,
    updatePreferences,
    toggleNotifications,
    toggleStreakNotifications,
    toggleWeeklyReports,
    updateReminderTimes,
    updateTrackingTypes,
    refetch: fetchPreferences
  };
};

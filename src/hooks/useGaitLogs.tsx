import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Parkinson's-specific gait tracking
export interface GaitLog {
  id?: string;
  user_id: string;
  log_date: string; // DATE
  log_time?: string; // TIME
  gait_speed?: number; // meters per second
  step_length?: number; // centimeters
  stride_length?: number; // centimeters
  cadence?: number; // steps per minute
  freezing_episodes?: number;
  freezing_duration_seconds?: number;
  turn_difficulty?: number; // 1-10 scale
  balance_issues?: boolean;
  use_of_assistive_device?: string; // walker, cane, none
  fall_occurred?: boolean;
  location?: string;
  time_since_medication?: number; // minutes
  notes?: string;
  created_at?: string;
}

export const useGaitLogs = (userId?: string) => {
  const [gaitLogs, setGaitLogs] = useState<GaitLog[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchGaitLogs = async () => {
    if (!userId) return;

    try {
      const { data, error } = await supabase
        .from('gait_logs')
        .select('*')
        .eq('user_id', userId)
        .order('log_date', { ascending: false });

      if (error) throw error;
      setGaitLogs(data || []);
    } catch (error) {
      console.error('Error fetching gait logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const addGaitLog = async (logData: Omit<GaitLog, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('gait_logs')
        .insert(logData)
        .select()
        .single();

      if (error) throw error;

      setGaitLogs([data, ...gaitLogs]);
      
      toast({
        title: "Gait Assessment Logged",
        description: "Your gait data has been recorded successfully.",
      });

      return { success: true, data };
    } catch (error: any) {
      console.error('Error adding gait log:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to log gait assessment",
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  const updateGaitLog = async (id: string, updates: Partial<GaitLog>) => {
    try {
      const { data, error } = await supabase
        .from('gait_logs')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setGaitLogs(gaitLogs.map(log => log.id === id ? data : log));
      
      toast({
        title: "Log Updated",
        description: "Gait assessment has been updated.",
      });

      return { success: true, data };
    } catch (error: any) {
      console.error('Error updating gait log:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update log",
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  const deleteGaitLog = async (id: string) => {
    try {
      const { error } = await supabase
        .from('gait_logs')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setGaitLogs(gaitLogs.filter(log => log.id !== id));
      
      toast({
        title: "Log Deleted",
        description: "Gait assessment has been deleted.",
      });

      return { success: true };
    } catch (error: any) {
      console.error('Error deleting gait log:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete log",
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  // Calculate gait metrics over time
  const getGaitTrends = () => {
    if (gaitLogs.length < 2) return null;

    const recent = gaitLogs.slice(0, 7); // Last 7 entries
    const avgSpeed = recent.reduce((sum, log) => sum + (log.gait_speed || 0), 0) / recent.length;
    const avgCadence = recent.reduce((sum, log) => sum + (log.cadence || 0), 0) / recent.length;
    const totalFreezingEpisodes = recent.reduce((sum, log) => sum + (log.freezing_episodes || 0), 0);

    return {
      avgSpeed,
      avgCadence,
      totalFreezingEpisodes,
      fallOccurred: recent.some(log => log.fall_occurred)
    };
  };

  useEffect(() => {
    if (userId) {
      fetchGaitLogs();
    }
  }, [userId]);

  return {
    gaitLogs,
    loading,
    addGaitLog,
    updateGaitLog,
    deleteGaitLog,
    getGaitTrends,
    refetch: fetchGaitLogs
  };
};

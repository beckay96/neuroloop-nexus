import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Gait episodes tracking (falls, freezing, near-falls)
export interface GaitLog {
  id?: string;
  patient_id: string;
  occurred_at: string;
  episode_type?: string; // 'fall', 'freezing', 'near_fall'
  severity?: string;
  duration_seconds?: number;
  location_type?: string;
  injury_occurred?: boolean;
  injury_details?: string;
  assistance_needed?: boolean;
  triggers?: string[];
  notes?: string;
  video_url?: string;
  shared_with_clinician?: boolean;
  shared_with_carers?: boolean;
  created_at?: string;
  updated_at?: string;
}

export const useGaitLogs = (userId?: string) => {
  const [gaitLogs, setGaitLogs] = useState<GaitLog[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchGaitLogs = async () => {
    if (!userId) return;

    try {
      const { data, error } = await supabase
        .from('gait_episodes')
        .select('*')
        .eq('patient_id', userId)
        .order('occurred_at', { ascending: false });

      if (error) throw error;
      setGaitLogs(data || []);
    } catch (error) {
      console.error('Error fetching gait logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const addGaitLog = async (logData: Omit<GaitLog, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      // @ts-ignore - Table exists in private_health_info schema
      const { data, error } = await supabase
        .from('gait_episodes')
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
      // @ts-ignore - Table exists in private_health_info schema
      const { data, error } = await supabase
        .from('gait_episodes')
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
      // @ts-ignore - Table exists in private_health_info schema
      const { error } = await supabase
        .from('gait_episodes')
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

  // Calculate gait episode statistics
  const getGaitStats = () => {
    if (gaitLogs.length === 0) return null;

    const recent = gaitLogs.slice(0, 30); // Last 30 episodes
    const fallCount = recent.filter(log => log.episode_type === 'fall').length;
    const freezingCount = recent.filter(log => log.episode_type === 'freezing').length;
    const nearFallCount = recent.filter(log => log.episode_type === 'near_fall').length;
    const injuryCount = recent.filter(log => log.injury_occurred).length;

    return {
      fallCount,
      freezingCount,
      nearFallCount,
      injuryCount,
      totalEpisodes: recent.length
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
    getGaitStats,
    refetch: fetchGaitLogs
  };
};

import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Tremor episodes tracking - matches tremor_episodes table
export interface TremorLog {
  id?: string;
  patient_id: string;
  occurred_at: string;
  tremor_type?: string;
  severity?: number; // 1-10 scale
  duration_seconds?: number;
  body_parts_affected?: string[];
  triggers?: string[];
  medication_taken?: string;
  activity_during_tremor?: string;
  notes?: string;
  video_url?: string;
  shared_with_clinician?: boolean;
  shared_with_carers?: boolean;
  created_at?: string;
  updated_at?: string;
}

export const useTremorLogs = (userId?: string) => {
  const [tremorLogs, setTremorLogs] = useState<TremorLog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTremorLogs = async () => {
    if (!userId) return;

    try {
      // HIPAA-compliant: Use RPC function instead of direct table access
      const { data, error } = await supabase
        .rpc('get_tremor_episodes', { p_patient_id: userId });
      if (error) throw error;
    } catch (error) {
      console.error('Error fetching tremor episodes:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to fetch tremor episodes",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addTremorLog = async (logData: Omit<TremorLog, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      // For now, still use direct insert as we don't have save_tremor_episode RPC yet
      // TODO: Create and use save_tremor_episode RPC function
      const { data, error } = await supabase
        .schema('private_health_info')
        .from('tremor_episodes')
        .insert(logData)
        .select()
        .single();

      if (error) throw error;

      setTremorLogs([data, ...tremorLogs]);
      
      toast({
        title: "Tremor Episode Logged",
        description: "Your tremor episode has been recorded successfully.",
      });

      return { success: true, data };
    } catch (error: any) {
      console.error('Error adding tremor episode:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to log tremor episode",
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  const updateTremorLog = async (id: string, updates: Partial<TremorLog>) => {
    try {
      // @ts-ignore - Table exists in private_health_info schema
      const { data, error } = await supabase
        .schema('private_health_info')
        .from('tremor_episodes')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setTremorLogs(tremorLogs.map(log => log.id === id ? data : log));
      
      toast({
        title: "Episode Updated",
        description: "Tremor episode has been updated.",
      });

      return { success: true, data };
    } catch (error: any) {
      console.error('Error updating tremor episode:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update episode",
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  const deleteTremorLog = async (id: string) => {
    try {
      // @ts-ignore - Table exists in private_health_info schema
      const { error } = await supabase
        .schema('private_health_info')
        .from('tremor_episodes')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setTremorLogs(tremorLogs.filter(log => log.id !== id));
      
      toast({
        title: "Episode Deleted",
        description: "Tremor episode has been deleted.",
      });

      return { success: true };
    } catch (error: any) {
      console.error('Error deleting tremor episode:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete episode",
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  // Calculate tremor statistics
  const getTremorStats = () => {
    if (tremorLogs.length === 0) return null;

    const recent = tremorLogs.slice(0, 30); // Last 30 episodes
    const avgSeverity = recent.reduce((sum, log) => sum + (log.severity || 0), 0) / recent.length;
    const avgDuration = recent.reduce((sum, log) => sum + (log.duration_seconds || 0), 0) / recent.length;
    
    // Count episodes by tremor type
    const typeCount: Record<string, number> = {};
    recent.forEach(log => {
      if (log.tremor_type) {
        typeCount[log.tremor_type] = (typeCount[log.tremor_type] || 0) + 1;
      }
    });

    return {
      totalEpisodes: recent.length,
      avgSeverity: Math.round(avgSeverity * 10) / 10,
      avgDuration: Math.round(avgDuration),
      typeBreakdown: typeCount,
      hasVideo: recent.filter(log => log.video_url).length
    };
  };

  useEffect(() => {
    if (userId) {
      fetchTremorLogs();
    }
  }, [userId]);

  return {
    tremorLogs,
    loading,
    addTremorLog,
    updateTremorLog,
    deleteTremorLog,
    getTremorStats,
    refetch: fetchTremorLogs
  };
};

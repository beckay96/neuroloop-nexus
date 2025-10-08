import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// EXACT schema match from menstrual_cycle_logs table
export interface MenstrualLog {
  id?: string;
  user_id: string;
  cycle_start_date: string; // DATE
  cycle_end_date?: string; // DATE
  cycle_length_days?: number;
  flow_intensity?: string;
  cycle_phase?: string;
  symptoms?: string[] | Record<string, any>; // JSONB - can be array or object
  symptom_severity?: number;
  seizure_count_during_cycle?: number;
  seizure_clustered_around_menstruation?: boolean;
  catamenial_pattern_suspected?: boolean;
  seizure_correlation?: Record<string, any>; // JSONB
  is_pregnant?: boolean;
  is_breastfeeding?: boolean;
  notes?: string;
  created_at?: string;
}

export const useMenstrualLogs = (userId?: string) => {
  const [menstrualLogs, setMenstrualLogs] = useState<MenstrualLog[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchMenstrualLogs = async () => {
    if (!userId) return;

    try {
      // Use RPC function to access private_health_info schema
      // @ts-ignore - RPC function not yet in types
      const { data, error } = await supabase
        .rpc('get_menstrual_logs', { p_user_id: userId });

      if (error) throw error;
      setMenstrualLogs(data || []);
    } catch (error) {
      console.error('Error fetching menstrual logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const addMenstrualLog = async (logData: Omit<MenstrualLog, 'id' | 'created_at'>) => {
    try {
      const { data: logId, error } = await supabase.rpc('save_menstrual_log', {
        p_user_id: logData.user_id,
        p_cycle_start_date: logData.cycle_start_date,
        p_cycle_end_date: logData.cycle_end_date || null,
        p_cycle_length_days: logData.cycle_length_days || null,
        p_flow_intensity: logData.flow_intensity || null,
        p_cycle_phase: logData.cycle_phase || null,
        p_overall_symptom_severity: logData.symptom_severity || null,
        p_seizure_count_during_cycle: logData.seizure_count_during_cycle || 0,
        p_seizure_clustered_around_menstruation: logData.seizure_clustered_around_menstruation || false,
        p_catamenial_pattern_suspected: logData.catamenial_pattern_suspected || false,
        p_is_pregnant: (logData as any).is_pregnant || false,
        p_is_breastfeeding: (logData as any).is_breastfeeding || false,
        p_notes: logData.notes || null
      });

      if (error) throw error;

      await fetchMenstrualLogs();
      
      toast({
        title: "Cycle Logged",
        description: "Your menstrual cycle has been recorded successfully.",
      });

      return { success: true, data: { id: logId } };
    } catch (error: any) {
      console.error('Error adding menstrual log:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to log cycle",
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  const updateMenstrualLog = async (id: string, updates: Partial<MenstrualLog>) => {
    try {
      const { data, error } = await supabase.rpc('update_menstrual_log', {
        p_log_id: id,
        p_cycle_end_date: updates.cycle_end_date || null,
        p_cycle_length_days: updates.cycle_length_days || null,
        p_flow_intensity: updates.flow_intensity || null,
        p_cycle_phase: updates.cycle_phase || null,
        p_overall_symptom_severity: updates.symptom_severity || null,
        p_seizure_count_during_cycle: updates.seizure_count_during_cycle || null,
        p_seizure_clustered_around_menstruation: updates.seizure_clustered_around_menstruation || null,
        p_catamenial_pattern_suspected: updates.catamenial_pattern_suspected || null,
        p_is_pregnant: (updates as any).is_pregnant || null,
        p_is_breastfeeding: (updates as any).is_breastfeeding || null,
        p_notes: updates.notes || null
      });

      if (error) throw error;

      await fetchMenstrualLogs();
      
      toast({
        title: "Log Updated",
        description: "Menstrual cycle log has been updated.",
      });

      return { success: true, data };
    } catch (error: any) {
      console.error('Error updating menstrual log:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update log",
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  const deleteMenstrualLog = async (id: string) => {
    try {
      const { error } = await supabase.rpc('delete_menstrual_log', {
        p_log_id: id
      });

      if (error) throw error;

      setMenstrualLogs(menstrualLogs.filter(log => log.id !== id));
      
      toast({
        title: "Log Deleted",
        description: "Menstrual cycle log has been deleted.",
      });

      return { success: true };
    } catch (error: any) {
      console.error('Error deleting menstrual log:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete log",
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  useEffect(() => {
    if (userId) {
      fetchMenstrualLogs();
    }
  }, [userId]);

  return {
    menstrualLogs,
    loading,
    addMenstrualLog,
    updateMenstrualLog,
    deleteMenstrualLog,
    refetch: fetchMenstrualLogs
  };
};

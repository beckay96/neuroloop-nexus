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
      // @ts-ignore - Table exists in private_health_info schema
      const { data, error } = await supabase
        .schema('private_health_info')
        .from('menstrual_cycle_logs')
        .insert(logData)
        .select()
        .single();

      if (error) throw error;

      setMenstrualLogs([data, ...menstrualLogs]);
      
      toast({
        title: "Cycle Logged",
        description: "Your menstrual cycle has been recorded successfully.",
      });

      return { success: true, data };
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
      // @ts-ignore - Table exists in private_health_info schema
      const { data, error } = await supabase
        .schema('private_health_info')
        .from('menstrual_cycle_logs')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setMenstrualLogs(menstrualLogs.map(log => log.id === id ? data : log));
      
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
      // @ts-ignore - Table exists in private_health_info schema
      const { error } = await supabase
        .schema('private_health_info')
        .from('menstrual_cycle_logs')
        .delete()
        .eq('id', id);

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

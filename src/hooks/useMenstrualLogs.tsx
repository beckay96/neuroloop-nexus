import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// EXACT schema match from menstrual_cycle_logs table
export interface MenstrualLog {
  id?: string;
  user_id: string;
  cycle_start_date: string; // DATE
  cycle_end_date?: string; // DATE
  flow_intensity?: string;
  symptoms?: Record<string, any>; // JSONB
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
      const { data, error } = await supabase
        .from('menstrual_cycle_logs')
        .select('*')
        .eq('user_id', userId)
        .order('cycle_start_date', { ascending: false });

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
      const { data, error } = await supabase
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
      const { data, error } = await supabase
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
      const { error } = await supabase
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

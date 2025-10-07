import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Daily symptom logs - matches daily_symptom_logs table
export interface SymptomLog {
  id?: string;
  patient_id: string;
  log_date: string; // DATE
  mood_rating?: number; // 1-10
  energy_level?: number; // 1-10
  sleep_quality?: number; // 1-10
  sleep_hours?: number;
  pain_level?: number; // 1-10
  pain_location?: string;
  symptoms?: string[];
  triggers?: string[];
  medications_taken?: string[];
  notes?: string;
  shared_with_clinician?: boolean;
  shared_with_carers?: boolean;
  created_at?: string;
  updated_at?: string;
}

export const useSymptomLogs = (userId?: string) => {
  const [symptomLogs, setSymptomLogs] = useState<SymptomLog[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchSymptomLogs = async () => {
    if (!userId) return;

    try {
      // Use RPC function to access private_health_info schema
      const { data, error } = await supabase
        .rpc('get_daily_symptom_logs', { p_patient_id: userId });

      if (error) throw error;
      setSymptomLogs(data || []);
    } catch (error) {
      console.error('Error fetching symptom logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const addSymptomLog = async (logData: Omit<SymptomLog, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      // For now, still use direct insert as we don't have save_symptom_log RPC yet
      // TODO: Create and use save_symptom_log RPC function
      // @ts-ignore - Table exists in private_health_info schema
      const { data, error } = await supabase
        .schema('private_health_info')
        .from('daily_symptom_logs')
        .insert(logData)
        .select()
        .single();

      if (error) throw error;

      setSymptomLogs([data, ...symptomLogs]);
      
      toast({
        title: "Symptom Logged",
        description: "Your symptom has been recorded successfully.",
      });

      return { success: true, data };
    } catch (error: any) {
      console.error('Error adding symptom log:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to log symptom",
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  const updateSymptomLog = async (id: string, updates: Partial<SymptomLog>) => {
    try {
      // For now, still use direct update as we don't have update_symptom_log RPC yet
      // TODO: Create and use update_symptom_log RPC function
      // @ts-ignore - Table exists in private_health_info schema
      const { data, error } = await supabase
        .schema('private_health_info')
        .from('daily_symptom_logs')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setSymptomLogs(symptomLogs.map(log => log.id === id ? data : log));
      
      toast({
        title: "Log Updated",
        description: "Symptom log has been updated.",
      });

      return { success: true, data };
    } catch (error: any) {
      console.error('Error updating symptom log:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update log",
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  const deleteSymptomLog = async (id: string) => {
    try {
      // For now, still use direct delete as we don't have delete_symptom_log RPC yet
      // TODO: Create and use delete_symptom_log RPC function
      // @ts-ignore - Table exists in private_health_info schema
      const { error } = await supabase
        .schema('private_health_info')
        .from('daily_symptom_logs')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setSymptomLogs(symptomLogs.filter(log => log.id !== id));
      
      toast({
        title: "Log Deleted",
        description: "Symptom log has been deleted.",
      });

      return { success: true };
    } catch (error: any) {
      console.error('Error deleting symptom log:', error);
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
      fetchSymptomLogs();
    }
  }, [userId]);

  return {
    symptomLogs,
    loading,
    addSymptomLog,
    updateSymptomLog,
    deleteSymptomLog,
    refetch: fetchSymptomLogs
  };
};

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
        .rpc('get_symptom_logs', { p_patient_id: userId });

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
      // Use RPC function to securely insert into private_health_info schema
      const { data: logId, error } = await supabase
        .rpc('save_symptom_log', {
          p_patient_id: logData.patient_id,
          p_log_date: logData.log_date,
          p_overall_feeling: logData.mood_rating || null,
          p_mood: logData.mood_rating || null,
          p_energy_level: logData.energy_level || null,
          p_sleep_hours: logData.sleep_hours || null,
          p_sleep_quality: logData.sleep_quality || null,
          p_sleep_disturbances: logData.symptoms ? { symptoms: logData.symptoms } : null,
          p_other_symptoms: logData.triggers ? { triggers: logData.triggers } : null,
          p_symptom_notes: logData.notes || null,
          p_shared_with_clinician: logData.shared_with_clinician || false,
          p_visible_to_researchers: false
        });

      if (error) throw error;

      // Refresh the list
      await fetchSymptomLogs();
      
      toast({
        title: "Symptom Logged",
        description: "Your symptom has been recorded successfully.",
      });

      return { success: true, data: { id: logId, ...logData } };
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
      // Use RPC function to securely update in private_health_info schema
      const { error } = await supabase
        .rpc('update_symptom_log', {
          p_log_id: id,
          p_overall_feeling: updates.mood_rating || null,
          p_mood: updates.mood_rating || null,
          p_energy_level: updates.energy_level || null,
          p_sleep_hours: updates.sleep_hours || null,
          p_sleep_quality: updates.sleep_quality || null,
          p_sleep_disturbances: updates.symptoms ? { symptoms: updates.symptoms } : null,
          p_other_symptoms: updates.triggers ? { triggers: updates.triggers } : null,
          p_symptom_notes: updates.notes || null,
          p_shared_with_clinician: updates.shared_with_clinician ?? null,
          p_visible_to_researchers: null
        });

      if (error) throw error;

      // Refresh the list
      await fetchSymptomLogs();
      
      toast({
        title: "Log Updated",
        description: "Symptom log has been updated.",
      });

      return { success: true };
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
      // Use RPC function to securely delete from private_health_info schema
      const { error } = await supabase
        .rpc('delete_symptom_log', {
          p_log_id: id
        });

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

import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Interface matching seizure_logs_research table structure
// NOTE: seizure_logs_research does NOT have seizure_type column
export interface SeizureLog {
  log_id?: string;
  user_id: string;
  log_date: string;
  log_time?: string;
  consciousness_level?: string;
  duration_seconds?: number;
  aura_present?: string;
  aura_description?: string;
  witnessed?: string;
  witness_role?: string;
  video_recorded?: string;
  location_type?: string;
  post_ictal_confusion_minutes?: number;
  recovery_time_minutes?: number;
  sleep_hours_prior?: number;
  medication_adherence_prior?: string;
  stress_level?: string;
  emergency_services_called?: string;
  rescue_medication_used?: string;
  rescue_medication_type?: string;
  hospitalized?: string;
  research_grade?: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

export const useSeizureLogs = (userId?: string) => {
  const [seizureLogs, setSeizureLogs] = useState<SeizureLog[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchSeizureLogs = async () => {
    if (!userId) return;

    try {
      // Use RPC function to access private_health_info schema
      // seizure_logs_research uses user_id, not patient_id
      const { data, error } = await supabase
        .rpc('get_seizure_logs', { p_user_id: userId });

      if (error) throw error;
      setSeizureLogs(data || []);
    } catch (error) {
      console.error('Error fetching seizure events:', error);
    } finally {
      setLoading(false);
    }
  };

  const addSeizureLog = async (logData: Omit<SeizureLog, 'log_id' | 'created_at' | 'updated_at'>) => {
    try {
      // Parse date and time from log_date if needed
      const occurredAt = logData.log_date + (logData.log_time ? 'T' + logData.log_time : 'T00:00:00');
      
      // Use RPC for secure access to private_health_info schema
      const { data: logId, error } = await supabase.rpc('save_seizure_log', {
        p_user_id: logData.user_id,
        p_occurred_at: occurredAt,
        p_duration_seconds: logData.duration_seconds || null,
        p_consciousness_level: logData.consciousness_level || null,
        p_warning_signs: logData.aura_present === 'yes' ? [logData.aura_description || ''] : [],
        p_post_ictal_symptoms: [],
        p_possible_triggers: [],
        p_location_during: logData.location_type || null,
        p_rescue_medication_given: logData.rescue_medication_used === 'yes',
        p_emergency_services_called: logData.emergency_services_called === 'yes',
        p_notes: logData.notes || null
      });

      if (error) throw error;

      toast({
        title: "Seizure Logged",
        description: "Your seizure has been recorded successfully.",
      });

      // Refetch to get the complete record
      await fetchSeizureLogs();
      return { success: true, data: { log_id: logId } };
    } catch (error: any) {
      console.error('Error adding seizure event:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to log seizure",
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  const updateSeizureLog = async (logId: string, updates: Partial<SeizureLog>) => {
    try {
      // Use RPC for secure update with authentication
      const { data, error } = await supabase.rpc('update_seizure_log', {
        p_log_id: logId,
        p_duration_seconds: updates.duration_seconds,
        p_consciousness_level: updates.consciousness_level,
        p_aura_present: updates.aura_present,
        p_aura_description: updates.aura_description,
        p_witnessed: updates.witnessed,
        p_witness_role: updates.witness_role,
        p_video_recorded: updates.video_recorded,
        p_location_type: updates.location_type,
        p_post_ictal_confusion_minutes: updates.post_ictal_confusion_minutes,
        p_recovery_time_minutes: updates.recovery_time_minutes,
        p_sleep_hours_prior: updates.sleep_hours_prior,
        p_medication_adherence_prior: updates.medication_adherence_prior,
        p_stress_level: updates.stress_level,
        p_emergency_services_called: updates.emergency_services_called,
        p_rescue_medication_used: updates.rescue_medication_used,
        p_rescue_medication_type: updates.rescue_medication_type,
        p_hospitalized: updates.hospitalized,
        p_notes: updates.notes
      });

      if (error) throw error;

      // Refetch to get updated data
      await fetchSeizureLogs();
      
      toast({
        title: "Log Updated",
        description: "Seizure log has been updated.",
      });

      return { success: true, data: { log_id: data } };
    } catch (error: any) {
      console.error('Error updating seizure log:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update log",
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  const deleteSeizureLog = async (logId: string) => {
    try {
      // Use RPC for secure soft delete with authentication
      const { data, error } = await supabase.rpc('delete_seizure_log', {
        p_log_id: logId
      });

      if (error) throw error;

      // Refetch to update list (soft delete may just hide the record)
      await fetchSeizureLogs();
      
      toast({
        title: "Log Deleted",
        description: "Seizure log has been deleted.",
      });

      return { success: true };
    } catch (error: any) {
      console.error('Error deleting seizure log:', error);
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
      fetchSeizureLogs();
    }
  }, [userId]);

  return {
    seizureLogs,
    loading,
    addSeizureLog,
    updateSeizureLog,
    deleteSeizureLog,
    refetch: fetchSeizureLogs
  };
};

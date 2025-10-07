import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface SeizureLog {
  id?: string;
  patient_id: string;
  occurred_at: string;
  seizure_type: string;
  duration_seconds: number;
  severity: string;
  consciousness_level: string;
  location_type?: string;
  location_details?: string;
  aura_present?: boolean;
  aura_type?: string;
  aura_duration_seconds?: number;
  triggers?: string[];
  symptoms_before?: string[];
  symptoms_during?: string[];
  symptoms_after?: string[];
  recovery_time_minutes?: number;
  injury_occurred?: boolean;
  injury_details?: string;
  hospital_visit_required?: boolean;
  medication_taken?: string;
  witnessed_by?: string;
  notes?: string;
  shared_with_clinician?: boolean;
  shared_with_carers?: boolean;
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

  const addSeizureLog = async (logData: Omit<SeizureLog, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      // @ts-ignore - Table exists in private_health_info schema
      const { data, error } = await supabase
        .schema('private_health_info')
        .from('seizure_events')
        .insert(logData)
        .select()
        .single();
      if (error) throw error;

      setSeizureLogs([data, ...seizureLogs]);
      
      toast({
        title: "Seizure Logged",
        description: "Your seizure has been recorded successfully.",
      });

      return { success: true, data };
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

  const updateSeizureLog = async (id: string, updates: Partial<SeizureLog>) => {
    try {
      // @ts-ignore - Table exists in private_health_info schema
      const { data, error } = await supabase
        .schema('private_health_info')
        .from('seizure_events')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setSeizureLogs(seizureLogs.map(log => log.id === id ? data : log));
      
      toast({
        title: "Log Updated",
        description: "Seizure log has been updated.",
      });

      return { success: true, data };
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

  const deleteSeizureLog = async (id: string) => {
    try {
      // @ts-ignore - Table exists in private_health_info schema
      const { error } = await supabase
        .schema('private_health_info')
        .from('seizure_events')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setSeizureLogs(seizureLogs.filter(log => log.id !== id));
      
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

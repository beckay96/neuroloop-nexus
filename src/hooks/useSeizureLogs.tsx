import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface SeizureLog {
  id?: string;
  user_id: string;
  seizure_type: string;
  duration_seconds: number;
  consciousness_level: string;
  recovery_time_minutes?: number;
  triggers?: string[];
  symptoms?: string[];
  location?: string;
  witnesses?: string[];
  post_seizure_symptoms?: string[];
  notes?: string;
  log_date: string;
  created_at?: string;
}

export const useSeizureLogs = (userId?: string) => {
  const [seizureLogs, setSeizureLogs] = useState<SeizureLog[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchSeizureLogs = async () => {
    if (!userId) return;

    try {
      const { data, error } = await supabase
        .from('seizure_logs')
        .select('*')
        .eq('user_id', userId)
        .order('log_date', { ascending: false });

      if (error) throw error;
      setSeizureLogs(data || []);
    } catch (error) {
      console.error('Error fetching seizure logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const addSeizureLog = async (logData: Omit<SeizureLog, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('seizure_logs')
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
      console.error('Error adding seizure log:', error);
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
      const { data, error } = await supabase
        .from('seizure_logs')
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
      const { error } = await supabase
        .from('seizure_logs')
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

import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// EXACT schema match from medication_logs table
export interface MedicationLog {
  id?: string;
  user_id: string;
  user_medication_id?: string;
  log_date: string; // DATE
  log_time?: string; // TIME
  dosage_taken?: string;
  taken?: boolean;
  side_effects?: Record<string, any>; // JSONB
  notes?: string;
  created_at?: string;
}

export const useMedicationLogs = (userId?: string) => {
  const [medicationLogs, setMedicationLogs] = useState<MedicationLog[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchMedicationLogs = async () => {
    if (!userId) return;

    try {
      const { data, error } = await supabase
        .from('medication_logs')
        .select('*')
        .eq('user_id', userId)
        .order('log_date', { ascending: false });

      if (error) throw error;
      setMedicationLogs(data || []);
    } catch (error) {
      console.error('Error fetching medication logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const addMedicationLog = async (logData: Omit<MedicationLog, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('medication_logs')
        .insert(logData)
        .select()
        .single();

      if (error) throw error;

      setMedicationLogs([data, ...medicationLogs]);
      
      toast({
        title: "Medication Logged",
        description: "Your medication has been recorded successfully.",
      });

      return { success: true, data };
    } catch (error: any) {
      console.error('Error adding medication log:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to log medication",
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  const updateMedicationLog = async (id: string, updates: Partial<MedicationLog>) => {
    try {
      const { data, error } = await supabase
        .from('medication_logs')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setMedicationLogs(medicationLogs.map(log => log.id === id ? data : log));
      
      toast({
        title: "Log Updated",
        description: "Medication log has been updated.",
      });

      return { success: true, data };
    } catch (error: any) {
      console.error('Error updating medication log:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update log",
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  const deleteMedicationLog = async (id: string) => {
    try {
      const { error } = await supabase
        .from('medication_logs')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setMedicationLogs(medicationLogs.filter(log => log.id !== id));
      
      toast({
        title: "Log Deleted",
        description: "Medication log has been deleted.",
      });

      return { success: true };
    } catch (error: any) {
      console.error('Error deleting medication log:', error);
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
      fetchMedicationLogs();
    }
  }, [userId]);

  return {
    medicationLogs,
    loading,
    addMedicationLog,
    updateMedicationLog,
    deleteMedicationLog,
    refetch: fetchMedicationLogs
  };
};

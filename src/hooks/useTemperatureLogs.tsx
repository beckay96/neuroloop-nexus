import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface TemperatureLog {
  id?: string;
  user_id: string;
  log_date: string; // DATE
  log_time: string; // TIME
  temperature: number; // NUMERIC(4,1)
  temperature_unit: string; // 'F' or 'C'
  measurement_type?: string; // 'basal', 'regular', 'fever'
  measurement_location?: string;
  menstrual_cycle_day?: number;
  sleep_quality?: string;
  time_after_waking?: string; // NEW: How long after waking
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

export const useTemperatureLogs = (userId?: string) => {
  const [temperatureLogs, setTemperatureLogs] = useState<TemperatureLog[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchTemperatureLogs = async () => {
    if (!userId) return;

    try {
      // Use RPC function to access private_health_info schema
      // @ts-ignore - RPC function not yet in types
      const { data, error } = await supabase
        .rpc('get_temperature_logs', { p_user_id: userId });

      if (error) throw error;
      setTemperatureLogs(data || []);
    } catch (error) {
      console.error('Error fetching temperature logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const addTemperatureLog = async (logData: Omit<TemperatureLog, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data: logId, error } = await supabase.rpc('save_basal_temperature_log', {
        p_user_id: logData.user_id,
        p_log_date: logData.log_date,
        p_log_time: logData.log_time,
        p_temperature: logData.temperature,
        p_temperature_unit: logData.temperature_unit,
        p_measurement_type: logData.measurement_type || 'basal',
        p_measurement_location: logData.measurement_location || null,
        p_menstrual_cycle_day: logData.menstrual_cycle_day || null,
        p_sleep_quality: logData.sleep_quality || null,
        p_time_after_waking: logData.time_after_waking || 'unknown',
        p_notes: logData.notes || null
      });

      if (error) throw error;

      await fetchTemperatureLogs();
      
      toast({
        title: "Temperature Logged",
        description: "Your temperature has been recorded successfully.",
      });

      return { success: true, data: { id: logId } };
    } catch (error: any) {
      console.error('Error adding temperature log:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to log temperature",
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  const updateTemperatureLog = async (id: string, updates: Partial<TemperatureLog>) => {
    try {
      const { data, error } = await supabase.rpc('update_basal_temperature_log', {
        p_log_id: id,
        p_temperature: updates.temperature || null,
        p_temperature_unit: updates.temperature_unit || null,
        p_measurement_type: updates.measurement_type || null,
        p_measurement_location: updates.measurement_location || null,
        p_menstrual_cycle_day: updates.menstrual_cycle_day || null,
        p_sleep_quality: updates.sleep_quality || null,
        p_time_after_waking: updates.time_after_waking || null,
        p_notes: updates.notes || null
      });

      if (error) throw error;

      await fetchTemperatureLogs();
      
      toast({
        title: "Log Updated",
        description: "Temperature log has been updated.",
      });

      return { success: true, data };
    } catch (error: any) {
      console.error('Error updating temperature log:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update log",
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  const deleteTemperatureLog = async (id: string) => {
    try {
      const { error } = await supabase.rpc('delete_basal_temperature_log', {
        p_log_id: id
      });

      if (error) throw error;

      setTemperatureLogs(temperatureLogs.filter(log => log.id !== id));
      
      toast({
        title: "Log Deleted",
        description: "Temperature log has been deleted.",
      });

      return { success: true };
    } catch (error: any) {
      console.error('Error deleting temperature log:', error);
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
      fetchTemperatureLogs();
    }
  }, [userId]);

  return {
    temperatureLogs,
    loading,
    addTemperatureLog,
    updateTemperatureLog,
    deleteTemperatureLog,
    refetch: fetchTemperatureLogs
  };
};

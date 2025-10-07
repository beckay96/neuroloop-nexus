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
  time_awake?: string;
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
      // @ts-ignore - Table exists in private_health_info schema
      const { data, error } = await supabase
        .schema('private_health_info')
        .from('basal_temperature_logs')
        .insert(logData)
        .select()
        .single();

      if (error) throw error;

      setTemperatureLogs([data, ...temperatureLogs]);
      
      toast({
        title: "Temperature Logged",
        description: "Your temperature has been recorded successfully.",
      });

      return { success: true, data };
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
      // @ts-ignore - Table exists in private_health_info schema
      const { data, error } = await supabase
        .schema('private_health_info')
        .from('basal_temperature_logs')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setTemperatureLogs(temperatureLogs.map(log => log.id === id ? data : log));
      
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
      // @ts-ignore - Table exists in private_health_info schema
      const { error } = await supabase
        .schema('private_health_info')
        .from('basal_temperature_logs')
        .delete()
        .eq('id', id);

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

import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// EXACT schema match from tracking_entries table
export interface TrackingEntry {
  id?: string;
  user_id: string;
  entry_date: string; // DATE
  entry_type?: string;
  title?: string;
  description?: string;
  mood_rating?: number; // 1-10
  energy_level?: number; // 1-10
  sleep_quality?: number; // 1-10
  duration_minutes?: number;
  severity?: number; // 1-10
  triggers?: string;
  location?: string;
  notes?: string;
  created_at?: string;
}

export const useTrackingEntries = (userId?: string) => {
  const [trackingEntries, setTrackingEntries] = useState<TrackingEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchTrackingEntries = async () => {
    if (!userId) return;

    try {
      const { data, error } = await supabase
        .from('tracking_entries')
        .select('*')
        .eq('user_id', userId)
        .order('entry_date', { ascending: false });

      if (error) throw error;
      setTrackingEntries(data || []);
    } catch (error) {
      console.error('Error fetching tracking entries:', error);
    } finally {
      setLoading(false);
    }
  };

  const addTrackingEntry = async (entryData: Omit<TrackingEntry, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('tracking_entries')
        .insert(entryData)
        .select()
        .single();

      if (error) throw error;

      setTrackingEntries([data, ...trackingEntries]);
      
      toast({
        title: "Entry Saved",
        description: "Your tracking entry has been recorded successfully.",
      });

      return { success: true, data };
    } catch (error: any) {
      console.error('Error adding tracking entry:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to save entry",
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  const updateTrackingEntry = async (id: string, updates: Partial<TrackingEntry>) => {
    try {
      const { data, error } = await supabase
        .from('tracking_entries')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setTrackingEntries(trackingEntries.map(entry => entry.id === id ? data : entry));
      
      toast({
        title: "Entry Updated",
        description: "Tracking entry has been updated.",
      });

      return { success: true, data };
    } catch (error: any) {
      console.error('Error updating tracking entry:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update entry",
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  const deleteTrackingEntry = async (id: string) => {
    try {
      const { error } = await supabase
        .from('tracking_entries')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setTrackingEntries(trackingEntries.filter(entry => entry.id !== id));
      
      toast({
        title: "Entry Deleted",
        description: "Tracking entry has been deleted.",
      });

      return { success: true };
    } catch (error: any) {
      console.error('Error deleting tracking entry:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete entry",
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  // Get entries by type
  const getEntriesByType = (entryType: string) => {
    return trackingEntries.filter(entry => entry.entry_type === entryType);
  };

  // Get latest entry
  const getLatestEntry = () => {
    return trackingEntries[0] || null;
  };

  useEffect(() => {
    if (userId) {
      fetchTrackingEntries();
    }
  }, [userId]);

  return {
    trackingEntries,
    loading,
    addTrackingEntry,
    updateTrackingEntry,
    deleteTrackingEntry,
    getEntriesByType,
    getLatestEntry,
    refetch: fetchTrackingEntries
  };
};

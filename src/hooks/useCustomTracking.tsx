import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export type CustomTrackingType = 'numeric' | 'text' | 'boolean' | 'scale';

export interface CustomTrackingItem {
  item_id: string;
  item_name: string;
  item_type: CustomTrackingType;
  description?: string;
  min_value?: number;
  max_value?: number;
  unit?: string;
  icon?: string;
  color?: string;
  display_order: number;
  is_active: boolean;
}

export interface CustomTrackingValue {
  value_id: string;
  item_id: string;
  item_name: string;
  item_type: string;
  numeric_value?: number;
  text_value?: string;
  boolean_value?: boolean;
  logged_at: string;
  log_date: string;
  notes?: string;
}

export const useCustomTracking = (userId: string) => {
  const [items, setItems] = useState<CustomTrackingItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchTrackingItems = async () => {
    if (!userId) return;

    try {
      setLoading(true);
      
      const { data, error } = await supabase.rpc(
        'get_user_custom_tracking_items',
        { p_user_id: userId }
      );

      if (error) throw error;
      setItems(data || []);
    } catch (error: any) {
      console.error('Error fetching custom tracking items:', error);
      toast({
        title: 'Error',
        description: 'Failed to load tracking items',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const createTrackingItem = async (
    itemName: string,
    itemType: CustomTrackingType,
    options: {
      description?: string;
      min_value?: number;
      max_value?: number;
      unit?: string;
      icon?: string;
      color?: string;
    } = {}
  ) => {
    try {
      const { data, error } = await supabase
        .from('custom_tracking_items')
        .insert({
          user_id: userId,
          item_name: itemName,
          item_type: itemType,
          description: options.description,
          min_value: options.min_value,
          max_value: options.max_value,
          unit: options.unit,
          icon: options.icon,
          color: options.color,
          is_active: true
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: 'Tracking Item Created',
        description: `${itemName} added to your tracking list`
      });

      await fetchTrackingItems();
      return { success: true, data };
    } catch (error: any) {
      console.error('Error creating tracking item:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to create tracking item',
        variant: 'destructive'
      });
      return { success: false, error };
    }
  };

  const saveTrackingValue = async (
    itemId: string,
    value: {
      numeric_value?: number;
      text_value?: string;
      boolean_value?: boolean;
      logged_at?: string;
      notes?: string;
    }
  ) => {
    try {
      const { data, error } = await supabase.rpc('save_custom_tracking_value', {
        p_item_id: itemId,
        p_numeric_value: value.numeric_value || null,
        p_text_value: value.text_value || null,
        p_boolean_value: value.boolean_value !== undefined ? value.boolean_value : null,
        p_logged_at: value.logged_at || new Date().toISOString(),
        p_notes: value.notes || null
      });

      if (error) throw error;

      toast({
        title: 'Value Logged',
        description: 'Tracking value recorded successfully'
      });

      return { success: true, data };
    } catch (error: any) {
      console.error('Error saving tracking value:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to save value',
        variant: 'destructive'
      });
      return { success: false, error };
    }
  };

  const getTrackingHistory = async (
    itemId: string,
    options: {
      start_date?: string;
      end_date?: string;
      limit?: number;
    } = {}
  ) => {
    try {
      const { data, error } = await supabase.rpc('get_custom_tracking_history', {
        p_item_id: itemId,
        p_start_date: options.start_date || null,
        p_end_date: options.end_date || null,
        p_limit: options.limit || 100
      });

      if (error) throw error;
      return { success: true, data: data as CustomTrackingValue[] };
    } catch (error: any) {
      console.error('Error fetching tracking history:', error);
      toast({
        title: 'Error',
        description: 'Failed to load tracking history',
        variant: 'destructive'
      });
      return { success: false, error, data: [] };
    }
  };

  const updateTrackingItem = async (
    itemId: string,
    updates: Partial<CustomTrackingItem>
  ) => {
    try {
      const { error } = await supabase
        .from('custom_tracking_items')
        .update(updates)
        .eq('item_id', itemId);

      if (error) throw error;

      toast({
        title: 'Item Updated',
        description: 'Tracking item updated successfully'
      });

      await fetchTrackingItems();
      return { success: true };
    } catch (error: any) {
      console.error('Error updating tracking item:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to update item',
        variant: 'destructive'
      });
      return { success: false, error };
    }
  };

  const deleteTrackingItem = async (itemId: string) => {
    try {
      // Soft delete by setting is_active to false
      const { error } = await supabase
        .from('custom_tracking_items')
        .update({ is_active: false })
        .eq('item_id', itemId);

      if (error) throw error;

      toast({
        title: 'Item Deleted',
        description: 'Tracking item removed from your list'
      });

      await fetchTrackingItems();
      return { success: true };
    } catch (error: any) {
      console.error('Error deleting tracking item:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete item',
        variant: 'destructive'
      });
      return { success: false, error };
    }
  };

  useEffect(() => {
    if (userId) {
      fetchTrackingItems();
    }
  }, [userId]);

  return {
    items,
    loading,
    refetch: fetchTrackingItems,
    createTrackingItem,
    saveTrackingValue,
    getTrackingHistory,
    updateTrackingItem,
    deleteTrackingItem
  };
};

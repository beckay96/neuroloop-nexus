import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Condition {
  id: string;
  name: string;
  category: string;
  description?: string;
  tracking_features_array?: string[];
  created_at?: string;
}

export interface UserCondition {
  id: string;
  user_id: string;
  condition_id: string;
  tracking_features_enabled?: string[];
  diagnosis_date?: string;
  notes?: string;
  conditions?: Condition;
}

export const useConditions = (userId?: string) => {
  const [conditions, setConditions] = useState<Condition[]>([]);
  const [userConditions, setUserConditions] = useState<UserCondition[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Fetch all available conditions
  const fetchConditions = async () => {
    try {
      const { data, error } = await supabase
        .from('conditions')
        .select('*')
        .order('name');

      if (error) throw error;
      setConditions(data || []);
    } catch (error) {
      console.error('Error fetching conditions:', error);
    }
  };

  // Fetch user's conditions
  const fetchUserConditions = async () => {
    if (!userId) return;

    try {
      // HIPAA-compliant: Use RPC function instead of direct table access
      const { data, error } = await supabase
        .rpc('get_user_conditions', { p_user_id: userId });

      if (error) throw error;
      
      // Fetch condition details separately if needed
      if (data && data.length > 0) {
        const conditionIds = data.map(uc => uc.condition_id).filter(Boolean);
        const { data: conditionsData } = await supabase
          .from('conditions')
          .select('*')
          .in('id', conditionIds);
        
        // Merge conditions data
        const merged = data.map(uc => ({
          ...uc,
          conditions: conditionsData?.find(c => c.id === uc.condition_id)
        }));
        setUserConditions(merged || []);
      } else {
        setUserConditions(data || []);
      }
    } catch (error) {
      console.error('Error fetching user conditions:', error);
    } finally {
      setLoading(false);
    }
  };

  // Add condition to user
  const addCondition = async (conditionId: string, diagnosisDate?: string, notes?: string) => {
    if (!userId) {
      toast({
        title: "Error",
        description: "User not found",
        variant: "destructive",
      });
      return { success: false };
    }

    try {
      // @ts-ignore - Table exists in private_health_info schema
      const { data, error } = await supabase
        .schema('private_health_info')
        .from('user_conditions')
        .insert({
          user_id: userId,
          condition_id: conditionId,
          diagnosis_date: diagnosisDate || new Date().toISOString(),
          notes
        })
        .select(`
          *,
          conditions (*)
        `)
        .single();

      if (error) throw error;

      setUserConditions([...userConditions, data]);
      
      toast({
        title: "Condition Added",
        description: "Tracking features have been automatically configured.",
      });

      return { success: true, data };
    } catch (error: any) {
      console.error('Error adding condition:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to add condition",
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  // Remove condition from user
  const removeCondition = async (userConditionId: string) => {
    try {
      // @ts-ignore - Table exists in private_health_info schema
      const { error } = await supabase
        .schema('private_health_info')
        .from('user_conditions')
        .delete()
        .eq('id', userConditionId);

      if (error) throw error;

      setUserConditions(userConditions.filter(uc => uc.id !== userConditionId));
      
      toast({
        title: "Condition Removed",
        description: "The condition has been removed from your profile.",
      });

      return { success: true };
    } catch (error: any) {
      console.error('Error removing condition:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to remove condition",
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  useEffect(() => {
    fetchConditions();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchUserConditions();
    }
  }, [userId]);

  return {
    conditions,
    userConditions,
    loading,
    addCondition,
    removeCondition,
    refetch: fetchUserConditions
  };
};

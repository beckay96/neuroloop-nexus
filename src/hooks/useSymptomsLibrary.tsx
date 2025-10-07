import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export type SymptomCategory = 
  | 'motor' | 'cognitive' | 'mood' | 'sleep' | 'autonomic' 
  | 'sensory' | 'pain' | 'gastrointestinal' | 'cardiovascular' 
  | 'respiratory' | 'other';

export interface SymptomLibraryItem {
  symptom_id: string;
  symptom_code: string;
  symptom_name: string;
  category: SymptomCategory;
  snomed_ct_code: string;
  icd10_code: string;
  description?: string;
  common_in_parkinsons?: boolean;
  common_in_epilepsy?: boolean;
  severity_scale?: string;
  typical_duration?: string;
  search_keywords?: string[];
}

export const useSymptomsLibrary = () => {
  const [symptoms, setSymptoms] = useState<SymptomLibraryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const searchSymptoms = async (searchTerm: string) => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase.rpc('search_symptoms', {
        p_search_term: searchTerm || null
      });

      if (error) throw error;
      setSymptoms(data || []);
      return { success: true, data: data as SymptomLibraryItem[] };
    } catch (error: any) {
      console.error('Error searching symptoms:', error);
      toast({
        title: 'Error',
        description: 'Failed to search symptoms',
        variant: 'destructive'
      });
      return { success: false, error, data: [] };
    } finally {
      setLoading(false);
    }
  };

  const fetchSymptomsByCategory = async (category: SymptomCategory) => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('symptoms_library')
        .select('*')
        .eq('category', category)
        .order('symptom_name');

      if (error) throw error;
      setSymptoms(data || []);
      return { success: true, data: data as SymptomLibraryItem[] };
    } catch (error: any) {
      console.error('Error fetching symptoms by category:', error);
      toast({
        title: 'Error',
        description: 'Failed to load symptoms',
        variant: 'destructive'
      });
      return { success: false, error, data: [] };
    } finally {
      setLoading(false);
    }
  };

  const fetchCommonSymptoms = async (condition: 'parkinsons' | 'epilepsy') => {
    try {
      setLoading(true);
      
      const column = condition === 'parkinsons' 
        ? 'common_in_parkinsons' 
        : 'common_in_epilepsy';

      const { data, error } = await supabase
        .from('symptoms_library')
        .select('*')
        .eq(column, true)
        .order('symptom_name');

      if (error) throw error;
      setSymptoms(data || []);
      return { success: true, data: data as SymptomLibraryItem[] };
    } catch (error: any) {
      console.error('Error fetching common symptoms:', error);
      toast({
        title: 'Error',
        description: 'Failed to load common symptoms',
        variant: 'destructive'
      });
      return { success: false, error, data: [] };
    } finally {
      setLoading(false);
    }
  };

  const getAllSymptoms = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('symptoms_library')
        .select('*')
        .order('symptom_name');

      if (error) throw error;
      setSymptoms(data || []);
      return { success: true, data: data as SymptomLibraryItem[] };
    } catch (error: any) {
      console.error('Error fetching all symptoms:', error);
      toast({
        title: 'Error',
        description: 'Failed to load symptoms library',
        variant: 'destructive'
      });
      return { success: false, error, data: [] };
    } finally {
      setLoading(false);
    }
  };

  return {
    symptoms,
    loading,
    searchSymptoms,
    fetchSymptomsByCategory,
    fetchCommonSymptoms,
    getAllSymptoms
  };
};

import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export type PROType = 
  | 'quality_of_life' | 'sleep_quality' | 'fatigue_level' | 'cognition' | 'mood'
  | 'depression' | 'anxiety' | 'physical_function' | 'pain' | 'seizure_frequency'
  | 'motor_symptoms' | 'adherence_to_medication' | 'social_function' 
  | 'energy_vitality' | 'emotional_wellbeing' | 'sexual_function' | 'autonomic_symptoms' | 'other';

export type CollectionMethod = 
  | 'manual_entry' | 'device' | 'EHR_import' | 'patient_survey' | 'proxy_report' | 'telehealth' | 'other';

export type PRODomainLabel =
  | 'total_score' | 'overall_quality' | 'emotional_wellbeing' | 'physical_wellbeing'
  | 'social_wellbeing' | 'cognitive_functioning' | 'pain_level' | 'fatigue_level'
  | 'sleep_duration' | 'sleep_quality' | 'motor_score' | 'mobility' | 'self_care'
  | 'usual_activities' | 'anxiety_depression' | 'energy_vitality' | 'other';

export interface PROValue {
  domain_label: PRODomainLabel;
  value: number;
  value_unit?: string;
  snomed_ct_code?: string;
  icd10_code?: string;
}

export interface PROEntry {
  pro_id: string;
  patient_id: string;
  pro_type: string;
  collection_method: string;
  reported_at: string;
  snomed_ct_code?: string;
  icd10_code?: string;
  notes?: string;
  created_at: string;
  pro_values: PROValue[];
}

export interface PROMeasure {
  pro_library_id: string;
  pro_type: PROType;
  full_name: string;
  description?: string;
  snomed_ct_code?: string;
  icd10_code?: string;
  typical_use_case?: string;
  typical_domains?: string[];
  min_value?: number;
  max_value?: number;
  unit_of_measure?: string;
}

export const usePatientPRO = (patientId: string) => {
  const [proEntries, setProEntries] = useState<PROEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchPROEntries = async (proType?: PROType) => {
    if (!patientId) return;

    try {
      setLoading(true);
      
      const { data, error } = await supabase.rpc(
        'get_pro_with_values',
        {
          p_patient_id: patientId,
          p_pro_type: proType || null,
          p_limit: 20
        }
      );

      if (error) throw error;

      // Parse PRO values from JSONB
      const parsed = data?.map((entry: any) => ({
        ...entry,
        pro_values: entry.pro_values || []
      })) || [];

      setProEntries(parsed);
    } catch (error: any) {
      console.error('Error fetching PRO entries:', error);
      toast({
        title: 'Error',
        description: 'Failed to load PRO data',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const savePROEntry = async (
    proType: PROType,
    collectionMethod: CollectionMethod,
    reportedAt: string,
    options: {
      snomed_ct_code?: string;
      icd10_code?: string;
      notes?: string;
      pro_values?: PROValue[];
    } = {}
  ) => {
    try {
      const { data, error } = await supabase.rpc('save_pro_with_values', {
        p_patient_id: patientId,
        p_pro_type: proType,
        p_collection_method: collectionMethod,
        p_reported_at: reportedAt,
        p_snomed_ct_code: options.snomed_ct_code || null,
        p_icd10_code: options.icd10_code || null,
        p_notes: options.notes || null,
        p_values: options.pro_values ? JSON.stringify(options.pro_values) : '[]'
      });

      if (error) throw error;

      toast({
        title: 'PRO Recorded',
        description: 'Patient reported outcome saved successfully'
      });

      await fetchPROEntries();
      return { success: true, data };
    } catch (error: any) {
      console.error('Error saving PRO entry:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to save PRO',
        variant: 'destructive'
      });
      return { success: false, error };
    }
  };

  useEffect(() => {
    if (patientId) {
      fetchPROEntries();
    }
  }, [patientId]);

  return {
    proEntries,
    loading,
    refetch: fetchPROEntries,
    savePROEntry
  };
};

export const usePROLibrary = () => {
  const [library, setLibrary] = useState<PROMeasure[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchLibrary = async (useCase?: string) => {
    try {
      setLoading(true);
      
      let query = supabase
        .from('pro_measures_library')
        .select('*')
        .order('full_name');

      if (useCase) {
        query = query.eq('typical_use_case', useCase);
      }

      const { data, error } = await query;

      if (error) throw error;
      setLibrary(data || []);
    } catch (error: any) {
      console.error('Error fetching PRO library:', error);
      toast({
        title: 'Error',
        description: 'Failed to load PRO library',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    library,
    loading,
    fetchLibrary
  };
};

import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export type ScaleType = 
  | 'UPDRS' | 'MoCA' | 'MMSE' | 'HAM-D' | 'QOLIE-89' | 'QOLIE-31' 
  | 'EQ-5D' | 'BDI' | 'STAI' | 'PDQ-39' | 'HADS' | 'GAD-7' | 'PSQI' | 'other';

export type ScaleVersion = 'v1' | 'v2' | 'v3' | 'short' | 'long' | 'other';

export type SubscaleLabel = 
  | 'UPDRS_I' | 'UPDRS_II' | 'UPDRS_III' | 'UPDRS_IV'
  | 'Visuospatial' | 'Naming' | 'Attention' | 'Language' | 'Abstraction' | 'Delayed_Recall' | 'Orientation'
  | 'Seizure_Worry' | 'Overall_Quality' | 'Emotional_Wellbeing' | 'Energy_Fatigue' 
  | 'Cognitive_Functioning' | 'Medication_Effects' | 'Social_Functioning' | 'Physical_Functioning'
  | 'other';

export interface Subscore {
  subscale_label: SubscaleLabel;
  score: number;
  max_score?: number;
  score_interpretation?: string;
}

export interface ScaleResult {
  scale_id: string;
  patient_id: string;
  scale_type: string;
  scale_version?: string;
  total_score: number;
  assessment_date: string;
  assessed_by?: string;
  entered_by?: string;
  snomed_ct_code?: string;
  icd10_code?: string;
  notes?: string;
  created_at: string;
  subscores?: Subscore[];
}

export interface ScaleLibraryItem {
  scale_library_id: string;
  scale_type: ScaleType;
  full_name: string;
  abbreviation: string;
  description?: string;
  snomed_ct_code?: string;
  icd10_code?: string;
  typical_use_case?: string;
  min_score?: number;
  max_score?: number;
  available_versions?: string[];
}

export const useClinicalScales = (patientId: string) => {
  const [scaleResults, setScaleResults] = useState<ScaleResult[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchScaleResults = async (scaleType?: ScaleType) => {
    if (!patientId) return;

    try {
      setLoading(true);
      
      const { data, error } = await supabase.rpc(
        'get_scale_results_with_subscores',
        {
          p_patient_id: patientId,
          p_scale_type: scaleType || null,
          p_limit: 20
        }
      );

      if (error) throw error;

      // Parse subscores from JSONB
      const parsed = data?.map((result: any) => ({
        ...result,
        subscores: result.subscores || []
      })) || [];

      setScaleResults(parsed);
    } catch (error: any) {
      console.error('Error fetching scale results:', error);
      toast({
        title: 'Error',
        description: 'Failed to load scale results',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const saveScaleResult = async (
    scaleType: ScaleType,
    scaleVersion: ScaleVersion,
    totalScore: number,
    assessmentDate: string,
    assessedBy: string,
    enteredBy: string,
    options: {
      snomed_ct_code?: string;
      icd10_code?: string;
      notes?: string;
      subscores?: Subscore[];
    } = {}
  ) => {
    try {
      const { data, error } = await supabase.rpc('save_scale_result', {
        p_patient_id: patientId,
        p_scale_type: scaleType,
        p_scale_version: scaleVersion,
        p_total_score: totalScore,
        p_assessment_date: assessmentDate,
        p_assessed_by: assessedBy,
        p_entered_by: enteredBy,
        p_snomed_ct_code: options.snomed_ct_code || null,
        p_icd10_code: options.icd10_code || null,
        p_notes: options.notes || null,
        p_subscores: options.subscores ? JSON.stringify(options.subscores) : '[]'
      });

      if (error) throw error;

      toast({
        title: 'Scale Result Saved',
        description: `${scaleType} assessment recorded successfully`
      });

      await fetchScaleResults();
      return { success: true, data };
    } catch (error: any) {
      console.error('Error saving scale result:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to save scale result',
        variant: 'destructive'
      });
      return { success: false, error };
    }
  };

  useEffect(() => {
    if (patientId) {
      fetchScaleResults();
    }
  }, [patientId]);

  return {
    scaleResults,
    loading,
    refetch: fetchScaleResults,
    saveScaleResult
  };
};

export const useScalesLibrary = () => {
  const [library, setLibrary] = useState<ScaleLibraryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchLibrary = async (useCase?: string) => {
    try {
      setLoading(true);
      
      let query = supabase
        .from('clinical_scales_library')
        .select('*')
        .order('abbreviation');

      if (useCase) {
        query = query.eq('typical_use_case', useCase);
      }

      const { data, error } = await query;

      if (error) throw error;
      setLibrary(data || []);
    } catch (error: any) {
      console.error('Error fetching scales library:', error);
      toast({
        title: 'Error',
        description: 'Failed to load scales library',
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

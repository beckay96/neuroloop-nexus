import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Diagnosis {
  diagnosis_id: string;
  patient_id: string;
  diagnosis_date: string;
  diagnosis_type: string;
  diagnosis_subtype?: string;
  snomed_ct_code?: string;
  icd10_code?: string;
  confirmed_by_clinician: boolean;
  confirming_clinician_id?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface DiagnosisLibraryItem {
  diagnosis_id: string;
  diagnosis_name: string;
  diagnosis_category: string;
  snomed_ct_code: string;
  icd10_code: string;
  description?: string;
  typical_subtypes?: string[];
}

export const useDiagnoses = (patientId: string) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchDiagnoses = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('patient_diagnoses')
        .select('*')
        .eq('patient_id', patientId)
        .order('diagnosis_date', { ascending: false });

      if (error) throw error;
      setDiagnoses(data || []);
    } catch (error: any) {
      console.error('Error fetching diagnoses:', error);
      toast({
        title: 'Error',
        description: 'Failed to load diagnoses',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const addDiagnosis = async (diagnosis: Omit<Diagnosis, 'diagnosis_id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('patient_diagnoses')
        .insert([diagnosis])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: 'Diagnosis Added',
        description: 'Your diagnosis has been recorded successfully'
      });

      await fetchDiagnoses();
      return { success: true, data };
    } catch (error: any) {
      console.error('Error adding diagnosis:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to add diagnosis',
        variant: 'destructive'
      });
      return { success: false, error };
    }
  };

  const updateDiagnosis = async (diagnosisId: string, updates: Partial<Diagnosis>) => {
    try {
      const { error } = await supabase
        .from('patient_diagnoses')
        .update(updates)
        .eq('diagnosis_id', diagnosisId);

      if (error) throw error;

      toast({
        title: 'Diagnosis Updated',
        description: 'Your diagnosis has been updated successfully'
      });

      await fetchDiagnoses();
      return { success: true };
    } catch (error: any) {
      console.error('Error updating diagnosis:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to update diagnosis',
        variant: 'destructive'
      });
      return { success: false, error };
    }
  };

  useEffect(() => {
    if (patientId) {
      fetchDiagnoses();
    }
  }, [patientId]);

  return {
    diagnoses,
    loading,
    refetch: fetchDiagnoses,
    addDiagnosis,
    updateDiagnosis
  };
};

export const useDiagnosesLibrary = () => {
  const [library, setLibrary] = useState<DiagnosisLibraryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchLibrary = async (category?: string) => {
    try {
      setLoading(true);
      let query = supabase
        .from('diagnoses_library')
        .select('*')
        .order('diagnosis_name');

      if (category) {
        query = query.eq('diagnosis_category', category);
      }

      const { data, error } = await query;

      if (error) throw error;
      setLibrary(data || []);
    } catch (error: any) {
      console.error('Error fetching diagnoses library:', error);
      toast({
        title: 'Error',
        description: 'Failed to load diagnoses library',
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

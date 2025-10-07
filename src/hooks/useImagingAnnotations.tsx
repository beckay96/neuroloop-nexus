import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export type AnnotationType = 
  | 'lesion' | 'atrophy' | 'infarct' | 'hemorrhage' | 'hyperintensity' | 'hypointensity'
  | 'tumor' | 'artifact' | 'normal' | 'calcification' | 'impairment' | 'other';

export interface Annotation {
  annotation_id: string;
  annotation_type: AnnotationType;
  coordinates?: string; // JSON string: "[x, y, w, h]"
  ai_flagged: boolean;
  ai_confidence?: number;
  snomed_ct_code?: string;
  icd10_code?: string;
  notes?: string;
  validated_by?: string;
  validation_status?: string;
}

export interface ImagingResult {
  image_id: string;
  patient_id: string;
  study_type: string;
  study_date: string;
  image_url: string;
  findings?: string;
  impression?: string;
  snomed_ct_code?: string;
  icd10_code?: string;
  study_condition_code?: string;
  ordering_physician?: string;
  uploaded_by?: string;
  created_at: string;
  annotations: Annotation[];
}

export interface ImagingFinding {
  finding_id: string;
  finding_name: string;
  annotation_type: string;
  snomed_ct_code: string;
  icd10_code: string;
  description?: string;
}

export const useImagingAnnotations = (patientId: string) => {
  const [imagingResults, setImagingResults] = useState<ImagingResult[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchImagingResults = async () => {
    if (!patientId) return;

    try {
      setLoading(true);
      
      const { data, error } = await supabase.rpc(
        'get_imaging_with_annotations',
        {
          p_patient_id: patientId,
          p_limit: 10
        }
      );

      if (error) throw error;

      // Parse annotations from JSONB
      const parsed = data?.map((result: any) => ({
        ...result,
        annotations: result.annotations || []
      })) || [];

      setImagingResults(parsed);
    } catch (error: any) {
      console.error('Error fetching imaging results:', error);
      toast({
        title: 'Error',
        description: 'Failed to load imaging results',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const saveImagingWithAnnotations = async (
    studyType: string,
    studyDate: string,
    imageUrl: string,
    options: {
      findings?: string;
      impression?: string;
      snomed_ct_code?: string;
      icd10_code?: string;
      study_condition_code?: string;
      ordering_physician?: string;
      uploaded_by?: string;
      annotations?: Omit<Annotation, 'annotation_id'>[];
    } = {}
  ) => {
    try {
      const { data, error } = await supabase.rpc('save_imaging_with_annotations', {
        p_patient_id: patientId,
        p_study_type: studyType,
        p_study_date: studyDate,
        p_image_url: imageUrl,
        p_findings: options.findings || null,
        p_impression: options.impression || null,
        p_snomed_ct_code: options.snomed_ct_code || null,
        p_icd10_code: options.icd10_code || null,
        p_study_condition_code: options.study_condition_code || null,
        p_ordering_physician: options.ordering_physician || null,
        p_uploaded_by: options.uploaded_by || null,
        p_annotations: options.annotations ? JSON.stringify(options.annotations) : '[]'
      });

      if (error) throw error;

      toast({
        title: 'Imaging Saved',
        description: 'Imaging study and annotations recorded successfully'
      });

      await fetchImagingResults();
      return { success: true, data };
    } catch (error: any) {
      console.error('Error saving imaging:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to save imaging',
        variant: 'destructive'
      });
      return { success: false, error };
    }
  };

  const validateAnnotation = async (annotationId: string, status: 'confirmed' | 'rejected') => {
    try {
      const { error } = await supabase
        .from('imaging_annotations')
        .update({
          validated_by: (await supabase.auth.getUser()).data.user?.id,
          validation_status: status,
          updated_at: new Date().toISOString()
        })
        .eq('annotation_id', annotationId);

      if (error) throw error;

      toast({
        title: 'Annotation Validated',
        description: `Annotation marked as ${status}`
      });

      await fetchImagingResults();
      return { success: true };
    } catch (error: any) {
      console.error('Error validating annotation:', error);
      toast({
        title: 'Error',
        description: 'Failed to validate annotation',
        variant: 'destructive'
      });
      return { success: false, error };
    }
  };

  useEffect(() => {
    if (patientId) {
      fetchImagingResults();
    }
  }, [patientId]);

  return {
    imagingResults,
    loading,
    refetch: fetchImagingResults,
    saveImagingWithAnnotations,
    validateAnnotation
  };
};

export const useImagingFindingsLibrary = () => {
  const [findings, setFindings] = useState<ImagingFinding[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const searchFindings = async (
    searchTerm: string,
    options: {
      parkinsons_only?: boolean;
      epilepsy_only?: boolean;
    } = {}
  ) => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase.rpc('search_imaging_findings', {
        p_search_term: searchTerm || null,
        p_parkinsons_only: options.parkinsons_only || false,
        p_epilepsy_only: options.epilepsy_only || false
      });

      if (error) throw error;
      setFindings(data || []);
    } catch (error: any) {
      console.error('Error searching findings:', error);
      toast({
        title: 'Error',
        description: 'Failed to search findings',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    findings,
    loading,
    searchFindings
  };
};

import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Reference data interfaces
export interface SeizureSign {
  sign_id: number;
  sign_name: string;
  category: string;
  display_name: string;
  description: string;
  research_code?: string;
}

export interface BrainRegion {
  region_id: number;
  lobe: string;
  subregion?: string;
  laterality: string;
  display_name: string;
  function_description?: string;
}

export interface SignBrainMapping {
  sign_id: number;
  region_id: number;
  probability_grade: string;
  probability_percentage: number;
  research_basis?: string;
}

export interface SeizureTrigger {
  trigger_id: number;
  trigger_type: string;
  display_name: string;
  description?: string;
}

// Main seizure log interface
export interface ResearchSeizureLog {
  log_id?: string;
  user_id: string;
  log_date: string;
  log_time: string;
  seizure_type: string;
  consciousness_level?: string;
  duration_seconds?: number;
  aura_present?: string;
  aura_description?: string;
  witnessed?: string;
  witness_role?: string;
  video_recorded?: string;
  location_type?: string;
  post_ictal_confusion_minutes?: number;
  recovery_time_minutes?: number;
  sleep_hours_prior?: number;
  medication_adherence_prior?: string;
  stress_level?: string;
  emergency_services_called?: string;
  rescue_medication_used?: string;
  rescue_medication_type?: string;
  hospitalized?: string;
  research_grade?: string;
  notes?: string;
}

export const useSeizureResearch = (userId?: string) => {
  const [seizureSigns, setSeizureSigns] = useState<SeizureSign[]>([]);
  const [brainRegions, setBrainRegions] = useState<BrainRegion[]>([]);
  const [signBrainMappings, setSignBrainMappings] = useState<SignBrainMapping[]>([]);
  const [triggers, setTriggers] = useState<SeizureTrigger[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Fetch all reference data
  const fetchReferenceData = async () => {
    try {
      // @ts-ignore - Tables exist
      const [signsResult, regionsResult, mappingsResult, triggersResult] = await Promise.all([
        supabase.from('seizure_signs_reference').select('*').order('category', { ascending: true }),
        supabase.from('brain_regions_reference').select('*').order('lobe', { ascending: true }),
        supabase.from('sign_brain_region_mapping').select('*'),
        supabase.from('seizure_triggers_reference').select('*')
      ]);

      if (signsResult.data) setSeizureSigns(signsResult.data);
      if (regionsResult.data) setBrainRegions(regionsResult.data);
      if (mappingsResult.data) setSignBrainMappings(mappingsResult.data);
      if (triggersResult.data) setTriggers(triggersResult.data);
    } catch (error) {
      console.error('Error fetching reference data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate brain region probabilities from selected signs
  const calculateBrainRegions = (selectedSignIds: number[]): Record<number, number> => {
    const regionScores: Record<number, number[]> = {};

    selectedSignIds.forEach(signId => {
      const mappings = signBrainMappings.filter(m => m.sign_id === signId);
      
      mappings.forEach(mapping => {
        if (!regionScores[mapping.region_id]) {
          regionScores[mapping.region_id] = [];
        }
        regionScores[mapping.region_id].push(mapping.probability_percentage);
      });
    });

    // Average probabilities
    const averaged: Record<number, number> = {};
    Object.entries(regionScores).forEach(([regionId, scores]) => {
      averaged[parseInt(regionId)] = Math.round(
        scores.reduce((a, b) => a + b, 0) / scores.length
      );
    });

    return averaged;
  };

  // Assess if generalized seizure
  const assessGeneralized = (selectedSignIds: number[]) => {
    const signs = seizureSigns.filter(s => selectedSignIds.includes(s.sign_id));
    
    const bilateralSigns = signs.filter(s => 
      ['TONIC_ACTIVITY', 'CLONIC_ACTIVITY', 'MYOCLONIC_JERKS'].includes(s.sign_name)
    ).length;

    const consciousnessLoss = signs.some(s => s.sign_name === 'LOSS_OF_AWARENESS');
    
    const associatedFeatures = signs.filter(s =>
      ['TONGUE_BITING', 'INCONTINENCE'].includes(s.sign_name)
    ).length;

    if (bilateralSigns >= 1 && (consciousnessLoss || associatedFeatures >= 2)) {
      return {
        type: 'GENERALIZED',
        basis: `${bilateralSigns} bilateral signs, consciousness loss: ${consciousnessLoss}`,
        confidence: 85
      };
    }

    return {
      type: 'FOCAL',
      basis: 'Focal signs predominate',
      confidence: 70
    };
  };

  // Get probability grade from percentage
  const getProbabilityGrade = (percentage: number): string => {
    if (percentage <= 20) return 'VERY_LOW';
    if (percentage <= 40) return 'LOW';
    if (percentage <= 60) return 'MODERATE';
    if (percentage <= 80) return 'HIGH';
    return 'VERY_HIGH';
  };

  // Save complete research-grade seizure log
  const saveResearchSeizureLog = async (
    logData: ResearchSeizureLog,
    selectedSignIds: number[],
    selectedTriggerIds: number[],
    triggerStrengths: Record<number, string>,
    postIctalSymptoms: Array<{symptom: string, severity: number}>
  ) => {
    try {
      // 1. Save main seizure log
      // @ts-ignore - Table exists
      const { data: log, error: logError } = await supabase
        .schema('private_health_info')
        .from('seizure_logs_research')
        .insert(logData)
        .select()
        .single();

      if (logError) throw logError;

      // 2. Save selected signs (linking table)
      if (selectedSignIds.length > 0) {
        const signInserts = selectedSignIds.map(signId => ({
          log_id: log.log_id,
          sign_id: signId,
          present: 'YES',
          observer_rank: logData.witnessed === 'YES' ? logData.witness_role : 'SELF'
        }));

        // @ts-ignore - Table exists
        const { error: signsError } = await supabase
          .schema('private_health_info')
          .from('seizure_log_signs')
          .insert(signInserts);

        if (signsError) throw signsError;
      }

      // 3. Calculate and save brain regions
      const regionProbabilities = calculateBrainRegions(selectedSignIds);
      
      if (Object.keys(regionProbabilities).length > 0) {
        const regionInserts = Object.entries(regionProbabilities).map(([regionId, prob]) => ({
          log_id: log.log_id,
          region_id: parseInt(regionId),
          calculated_probability: prob,
          probability_grade: getProbabilityGrade(prob)
        }));

        // @ts-ignore - Table exists
        const { error: regionsError } = await supabase
          .schema('private_health_info')
          .from('seizure_log_brain_regions')
          .insert(regionInserts);

        if (regionsError) throw regionsError;
      }

      // 4. Save generalized assessment
      const assessment = assessGeneralized(selectedSignIds);
      
      // @ts-ignore - Table exists
      const { error: assessmentError } = await supabase
        .schema('private_health_info')
        .from('seizure_generalized_assessment')
        .insert({
          log_id: log.log_id,
          assessment_type: assessment.type,
          classifier_basis: assessment.basis,
          confidence_score: assessment.confidence
        });

      if (assessmentError) throw assessmentError;

      // 5. Save triggers (if any)
      if (selectedTriggerIds.length > 0) {
        const triggerInserts = selectedTriggerIds.map(triggerId => ({
          log_id: log.log_id,
          trigger_id: triggerId,
          trigger_strength: triggerStrengths[triggerId] || 'MODERATE'
        }));

        // @ts-ignore - Table exists
        const { error: triggersError } = await supabase
          .schema('private_health_info')
          .from('seizure_log_triggers')
          .insert(triggerInserts);

        if (triggersError) throw triggersError;
      }

      // 6. Save post-ictal symptoms
      if (postIctalSymptoms.length > 0) {
        const symptomInserts = postIctalSymptoms.map(s => ({
          log_id: log.log_id,
          symptom: s.symptom,
          severity: s.severity
        }));

        // @ts-ignore - Table exists
        const { error: symptomsError } = await supabase
          .schema('private_health_info')
          .from('seizure_log_post_ictal_symptoms')
          .insert(symptomInserts);

        if (symptomsError) throw symptomsError;
      }

      toast({
        title: "✅ Research-Grade Seizure Logged",
        description: "Complete data captured with brain analysis",
      });

      return { success: true, data: log };
    } catch (error: any) {
      console.error('Error saving research seizure log:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to save seizure log",
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  // Fetch seizure logs with full details
  const fetchSeizureLogsWithDetails = async () => {
    if (!userId) return [];

    try {
      // @ts-ignore - Table exists
      const { data: logs, error } = await supabase
        .schema('private_health_info')
        .from('seizure_logs_research')
        .select(`
          *,
          seizure_log_signs (
            sign_id,
            seizure_signs_reference (*)
          ),
          seizure_log_brain_regions (
            region_id,
            calculated_probability,
            brain_regions_reference (*)
          ),
          seizure_generalized_assessment (*),
          seizure_log_triggers (
            trigger_id,
            trigger_strength,
            seizure_triggers_reference (*)
          )
        `)
        .eq('user_id', userId)
        .order('log_date', { ascending: false });

      if (error) throw error;
      return logs || [];
    } catch (error) {
      console.error('Error fetching seizure logs:', error);
      return [];
    }
  };

  useEffect(() => {
    fetchReferenceData();
  }, []);

  return {
    seizureSigns,
    brainRegions,
    signBrainMappings,
    triggers,
    loading,
    calculateBrainRegions,
    assessGeneralized,
    getProbabilityGrade,
    saveResearchSeizureLog,
    fetchSeizureLogsWithDetails,
    refetch: fetchReferenceData
  };
};

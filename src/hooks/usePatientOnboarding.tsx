import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface PatientOnboardingData {
  firstName: string;
  lastName: string;
  middleName?: string;
  dateOfBirth: string;
  gender: string;
  selectedConditions: string[]; // UUID array
  medications: Array<{ 
    id: string;
    name: string; 
    dosage: string; 
    times: string[];
  }>;
  trackMenstrual: boolean;
  basalTempTime?: string;
  trackingTimes?: string[];
  emergencyContactName: string;
  emergencyContactPhone: string;
  carerEmail?: string;
  researchConsent: boolean;
  researchDataTypes?: {
    seizureData: boolean;
    parkinsonData: boolean;
    medicationData: boolean;
    menstrualData: boolean;
  };
}

export const usePatientOnboarding = () => {
  const { toast } = useToast();

  const saveOnboarding = async (userId: string, data: PatientOnboardingData) => {
    try {
      // 1. Save to patient_onboarding_data using RPC function (accesses private_health_info schema)
      const { data: onboardingResult, error: onboardingError } = await supabase
        .rpc('save_patient_onboarding_data' as any, {
          p_user_id: userId,
          p_first_name: data.firstName,
          p_middle_name: data.middleName || null,
          p_last_name: data.lastName,
          p_date_of_birth: data.dateOfBirth,
          p_gender: data.gender,
          p_selected_conditions: data.selectedConditions,
          p_track_menstrual_cycle: data.trackMenstrual,
          p_emergency_contact_name: data.emergencyContactName,
          p_emergency_contact_phone: data.emergencyContactPhone
        });

      if (onboardingError) {
        console.error('Error saving onboarding:', onboardingError);
        throw onboardingError;
      }

      if (onboardingResult && !(onboardingResult as any).success) {
        console.error('Onboarding RPC error:', (onboardingResult as any).error);
        throw new Error((onboardingResult as any).error);
      }

      // 2. Save daily tracking preferences (tracking times & basal temp)
      if (data.trackingTimes && data.trackingTimes.length > 0 || data.basalTempTime) {
        const { data: trackingResult, error: trackingError } = await supabase
          .rpc('save_daily_tracking_preferences' as any, {
            p_user_id: userId,
            p_tracking_times: data.trackingTimes || [],
            p_basal_temp_time: data.basalTempTime || null
          });

        if (trackingError) {
          console.error('Error saving tracking preferences:', trackingError);
        } else if (trackingResult && !(trackingResult as any).success) {
          console.error('Tracking preferences RPC error:', (trackingResult as any).error);
        }
      }

      // 4. Save conditions using RPC function
      for (const conditionId of data.selectedConditions) {
        const { data: conditionResult, error: conditionError } = await supabase
          .rpc('save_user_condition' as any, {
            p_user_id: userId,
            p_condition_id: conditionId,
            p_diagnosis_date: new Date().toISOString().split('T')[0]
          });

        if (conditionError) {
          console.error('Error saving condition:', conditionError);
        } else if (conditionResult && !(conditionResult as any).success) {
          console.error('Condition RPC error:', (conditionResult as any).error);
        }
      }

      // 5. Save medications to user_medications
      for (const med of data.medications) {
        // First, get or create the medication in the medications table
        const { data: existingMed, error: medSearchError } = await supabase
          .from('medications')
          .select('id')
          .eq('name', med.name)
          .single();

        let medicationId;

        if (existingMed) {
          medicationId = existingMed.id;
        } else {
          // Create new medication
          const { data: newMed, error: medCreateError } = await supabase
            .from('medications')
            .insert({ name: med.name })
            .select('id')
            .single();

          if (medCreateError) {
            console.error('Error creating medication:', medCreateError);
            continue;
          }
          medicationId = newMed.id;
        }

        // Add to user_medications using RPC function
        const { data: medicationResult, error: medicationError } = await supabase
          .rpc('save_user_medication' as any, {
            p_user_id: userId,
            p_medication_id: medicationId,
            p_medication_name: med.name,
            p_dosage_amount: parseFloat(med.dosage) || null,
            p_dosage_unit: med.dosage.replace(/[0-9.]/g, '').trim() || 'mg',
            p_times: med.times
          });

        if (medicationError) {
          console.error('Error saving medication:', medicationError);
        } else if (medicationResult && !(medicationResult as any).success) {
          console.error('Medication RPC error:', (medicationResult as any).error);
        }
      }

      // 6. Save research consent with granular data types
      if (data.researchConsent && data.researchDataTypes) {
        const dataTypes = [];
        if (data.researchDataTypes.seizureData) dataTypes.push('seizure_data');
        if (data.researchDataTypes.parkinsonData) dataTypes.push('symptom_data');
        if (data.researchDataTypes.medicationData) dataTypes.push('medication_data');
        if (data.researchDataTypes.menstrualData) dataTypes.push('menstrual_data');
        
        // Save each data type consent
        for (const dataType of dataTypes) {
          await supabase
            .from('research_consent')
            .insert({
              user_id: userId,
              data_type: dataType as any,
              consent_status: 'active',
              consent_given_at: new Date().toISOString()
            });
        }
      }

      // 7. Complete onboarding and create research_id if consent given
      const { data: completionResult, error: completionError } = await supabase
        .rpc('complete_onboarding', {
          p_user_id: userId,
          p_user_type: 'patient',
          p_research_consent: data.researchConsent || false
        });

      if (completionError) {
        console.error('Error completing onboarding:', completionError);
        throw completionError;
      }

      // Log research_id creation if applicable
      if (completionResult?.research_id_created) {
        console.log('✅ Research ID created for user:', completionResult.research_id);
      }

      toast({
        title: "Onboarding Complete!",
        description: data.researchConsent 
          ? "Your profile has been set up and you're enrolled in research."
          : "Your profile has been set up successfully.",
      });

      return { success: true, researchIdCreated: completionResult?.research_id_created };
    } catch (error) {
      console.error('Error in patient onboarding:', error);
      toast({
        title: "Error",
        description: "Failed to save onboarding data. Please try again.",
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  return { saveOnboarding };
};

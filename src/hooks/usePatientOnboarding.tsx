import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface PatientOnboardingData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  selectedConditions: string[]; // UUID array
  medications: Array<{ name: string; dosage: string; frequency: string }>;
  trackMenstrual: boolean;
  emergencyContactName: string;
  emergencyContactPhone: string;
  researchConsent: boolean;
}

export const usePatientOnboarding = () => {
  const { toast } = useToast();

  const saveOnboarding = async (userId: string, data: PatientOnboardingData) => {
    try {
      // 1. Save to patient_onboarding_data in private_health_info schema
      // @ts-ignore - Table exists in private_health_info schema
      const { error: onboardingError} = await supabase
        .schema('private_health_info')
        .from('patient_onboarding_data')
        .upsert([{
          user_id: userId,
          first_name: data.firstName,
          last_name: data.lastName,
          date_of_birth: data.dateOfBirth,
          gender: data.gender,
          selected_conditions: data.selectedConditions,
          track_menstrual_cycle: data.trackMenstrual,
          emergency_contact_name: data.emergencyContactName,
          emergency_contact_phone: data.emergencyContactPhone,
          completed_at: new Date().toISOString()
        }]);

      if (onboardingError) {
        console.error('Error saving onboarding:', onboardingError);
        throw onboardingError;
      }

      // 2. Save conditions to user_conditions (triggers will auto-create tracking preferences)
      for (const conditionId of data.selectedConditions) {
        const { error: conditionError } = await supabase
          .from('user_conditions')
          .insert({
            user_id: userId,
            condition_id: conditionId,
            diagnosis_date: new Date().toISOString()
          });

        if (conditionError && conditionError.code !== '23505') { // Ignore duplicate errors
          console.error('Error saving condition:', conditionError);
        }
      }

      // 3. Save medications to user_medications
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

        // Add to user_medications
        await supabase
          .from('user_medications')
          .insert({
            user_id: userId,
            medication_id: medicationId,
            dosage: med.dosage,
            frequency: med.frequency,
            is_active: true
          });
      }

      // 4. Save research consent
      if (data.researchConsent) {
        await supabase
          .from('research_consent')
          .insert({
            user_id: userId,
            consent_given: true,
            data_type: 'all', // or specific types based on consent
            consent_date: new Date().toISOString()
          });
      }

      // 5. Update profile to mark onboarding complete
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert([{
          id: userId,
          user_type: 'patient',
          onboarding_completed: true
        }]);

      if (profileError) {
        console.error('Error updating profile:', profileError);
      }

      toast({
        title: "Onboarding Complete!",
        description: "Your profile has been set up successfully.",
      });

      return { success: true };
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

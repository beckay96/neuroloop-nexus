import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface CarerOnboardingData {
  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfBirth: Date | string;
  phoneNumber: string;
  relationshipToPatient: string;
  patientDateOfBirth: Date | string; // For verification
  preferredContactMethod?: string;
  availabilityNotes?: string;
}

export const useCarerOnboardingComplete = () => {
  const { toast } = useToast();

  const saveCarerOnboarding = async (userId: string, data: CarerOnboardingData) => {
    try {
      // Convert dates to strings if needed
      const dobString = data.dateOfBirth instanceof Date 
        ? data.dateOfBirth.toISOString().split('T')[0]
        : data.dateOfBirth;
      
      const patientDobString = data.patientDateOfBirth instanceof Date
        ? data.patientDateOfBirth.toISOString().split('T')[0]
        : data.patientDateOfBirth;

      // 1. Update profiles table
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: userId,
          user_type: 'carer',
          first_name: data.firstName,
          middle_name: data.middleName,
          last_name: data.lastName,
          phone_number: data.phoneNumber,
          onboarding_completed: true
        });

      if (profileError) {
        console.error('Error updating profile:', profileError);
        throw profileError;
      }

      // 2. Save to carer_profiles
      const { error: carerError } = await supabase
        .from('carer_profiles')
        .insert({
          user_id: userId,
          first_name: data.firstName,
          middle_name: data.middleName,
          last_name: data.lastName,
          date_of_birth: dobString,
          phone_number: data.phoneNumber,
          relationship_to_patient: data.relationshipToPatient,
          patient_dob_verification: patientDobString,
          preferred_contact_method: data.preferredContactMethod || 'phone',
          availability_notes: data.availabilityNotes,
          certifications: [] // Can be added later
        });

      if (carerError && carerError.code !== '23505') { // Ignore duplicate
        console.error('Error saving carer profile:', carerError);
        throw carerError;
      }

      // 3. TODO: Link to patient account (requires patient confirmation)
      // This would typically be done through a separate verification process
      // where the patient confirms the carer relationship

      toast({
        title: "Welcome to NeuroLoop! 💙",
        description: "Your carer profile has been set up successfully. The patient will be notified to confirm your connection.",
      });

      return { success: true };
    } catch (error) {
      console.error('Error in carer onboarding:', error);
      toast({
        title: "Setup Error",
        description: "Failed to save your information. Please try again.",
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  return { saveCarerOnboarding };
};

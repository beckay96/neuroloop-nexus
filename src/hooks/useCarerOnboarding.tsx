import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface CarerOnboardingData {
  firstName: string;
  lastName: string;
  relationship: string;
  patientCode: string;
}

export const useCarerOnboarding = () => {
  const { toast } = useToast();

  const saveOnboarding = async (userId: string, data: CarerOnboardingData) => {
    try {
      // 1. Save to carer_onboarding_data
      const { error: onboardingError } = await supabase
        .from('carer_onboarding_data')
        .upsert([{
          user_id: userId,
          first_name: data.firstName,
          last_name: data.lastName,
          relationship: data.relationship,
          patient_code: data.patientCode,
          completed_at: new Date().toISOString()
        }]);

      if (onboardingError) {
        console.error('Error saving carer onboarding:', onboardingError);
        throw onboardingError;
      }

      // 2. Create carer profile
      const { error: profileError } = await supabase
        .from('carer_profiles')
        .upsert([{
          user_id: userId,
          relationship_type: data.relationship
        }]);

      if (profileError) {
        console.error('Error creating carer profile:', profileError);
      }

      // 3. Update main profile
      const { error: mainProfileError } = await supabase
        .from('profiles')
        .upsert([{
          id: userId,
          user_type: 'carer',
          onboarding_completed: true
        }]);

      if (mainProfileError) {
        console.error('Error updating profile:', mainProfileError);
      }

      toast({
        title: "Onboarding Complete!",
        description: "Your carer profile has been set up successfully.",
      });

      return { success: true };
    } catch (error) {
      console.error('Error in carer onboarding:', error);
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

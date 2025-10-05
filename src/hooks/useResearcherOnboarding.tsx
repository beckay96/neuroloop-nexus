import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface ResearcherOnboardingData {
  firstName: string;
  lastName: string;
  institution: string;
  researchFocus: string;
  credentials: string;
}

export const useResearcherOnboarding = () => {
  const { toast } = useToast();

  const saveOnboarding = async (userId: string, data: ResearcherOnboardingData) => {
    try {
      // 1. Save to researcher_access_requests
      const { error: requestError } = await supabase
        .from('researcher_access_requests')
        .insert([{
          user_id: userId,
          first_name: data.firstName,
          last_name: data.lastName,
          institution: data.institution,
          research_focus: data.researchFocus,
          credentials: data.credentials,
          status: 'pending' // Requires admin approval
        }]);

      if (requestError) {
        console.error('Error saving researcher request:', requestError);
        throw requestError;
      }

      // 2. Update profile to mark onboarding complete
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert([{
          id: userId,
          user_type: 'researcher',
          onboarding_completed: true
        }]);

      if (profileError) {
        console.error('Error updating profile:', profileError);
      }

      toast({
        title: "Access Request Submitted!",
        description: "Your research access request is pending approval.",
      });

      return { success: true };
    } catch (error) {
      console.error('Error in researcher onboarding:', error);
      toast({
        title: "Error",
        description: "Failed to submit access request. Please try again.",
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  return { saveOnboarding };
};

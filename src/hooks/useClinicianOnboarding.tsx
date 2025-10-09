import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface ClinicianOnboardingData {
  firstName: string;
  lastName: string;
  middleName?: string;
  title: string; // Dr, Prof, etc.
  specialty: string;
  institution: string;
  licenseNumber: string;
  patientEmails: string[];
}

export const useClinicianOnboarding = () => {
  const { toast } = useToast();

  const saveOnboarding = async (userId: string, data: ClinicianOnboardingData) => {
    try {
      // 1. Save onboarding via secure RPC (writes to private schema server-side)
      const { error: onboardingError } = await supabase.rpc('save_clinician_onboarding', {
        p_user_id: userId,
        p_first_name: data.firstName,
        p_last_name: data.lastName,
        p_middle_name: data.middleName ?? null,
        p_clinician_title: data.title,
        p_specialty: data.specialty,
        p_institution: data.institution,
        p_license_number: data.licenseNumber,
        p_patient_invite_emails: data.patientEmails
      });

      if (onboardingError) {
        console.error('Error saving clinician onboarding:', onboardingError);
        throw onboardingError;
      }

      // 2. Create patient invitations via Edge Function (service-role, PHI-safe)
      for (const email of data.patientEmails) {
        try {
          const { error } = await supabase.functions.invoke('invite_patient', {
            body: { email, message: undefined }
          });
          if (error) {
            // Allow 409 (already invited) to pass
            const status = (error as any)?.context?.response?.status;
            if (status !== 409) {
              console.error('Error creating invitation:', error);
            }
          }
        } catch (e) {
          console.error('Error invoking invite_patient:', e);
        }
      }

      // 3. Create clinician_profile in public schema
      const { error: clinicianProfileError } = await supabase
        .from('clinician_profiles')
        .upsert([{
          user_id: userId,
          first_name: data.firstName,
          last_name: data.lastName,
          clinician_title: data.title,
          specialty: data.specialty,
          license_number: data.licenseNumber,
          institution: data.institution
        }], { onConflict: 'user_id' });

      if (clinicianProfileError) {
        console.error('Error creating clinician profile:', clinicianProfileError);
        throw clinicianProfileError;
      }

      // 4. Update profile to mark onboarding complete
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert([{
          id: userId,
          user_type: 'clinician',
          onboarding_completed: true
        }]);

      if (profileError) {
        console.error('Error updating profile:', profileError);
      }

      toast({
        title: "Onboarding Complete!",
        description: `Successfully created ${data.patientEmails.length} patient invitations.`,
      });

      return { success: true };
    } catch (error) {
      console.error('Error in clinician onboarding:', error);
      toast({
        title: "Error",
        description: "Failed to save onboarding data. Please try again.",
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  // No longer needed here (hashing happens in Edge Function)
  const hashEmail = async (email: string): Promise<string> => email;

  return { saveOnboarding };
};

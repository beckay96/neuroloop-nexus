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
      // 1. Save to clinician_onboarding_data in private_health_info schema
      // @ts-ignore - Table exists in private_health_info schema
      const { error: onboardingError } = await supabase
        .schema('private_health_info')
        .from('clinician_onboarding_data')
        .upsert([{
          user_id: userId,
          first_name: data.firstName,
          last_name: data.lastName,
          middle_name: data.middleName,
          clinician_title: data.title,
          specialty: data.specialty,
          institution: data.institution,
          license_number: data.licenseNumber,
          patient_invite_emails: data.patientEmails,
          completed_at: new Date().toISOString()
        }]);

      if (onboardingError) {
        console.error('Error saving clinician onboarding:', onboardingError);
        throw onboardingError;
      }

      // 2. Create patient invitations
      for (const email of data.patientEmails) {
        // Hash the email
        const emailHash = await hashEmail(email);
        
        const { error: inviteError } = await supabase
          .from('patient_invitations')
          .insert({
            clinician_id: userId,
            patient_email: email,
            patient_email_hash: emailHash,
            status: 'pending',
            expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days
          });

        if (inviteError && inviteError.code !== '23505') { // Ignore duplicates
          console.error('Error creating invitation:', inviteError);
        }
      }

      // 3. Update profile to mark onboarding complete
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

  const hashEmail = async (email: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(email.toLowerCase().trim());
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  };

  return { saveOnboarding };
};

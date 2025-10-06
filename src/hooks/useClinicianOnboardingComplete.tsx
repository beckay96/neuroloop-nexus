import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { usePatientInvites } from "@/hooks/usePatientInvites";

export interface ClinicianOnboardingData {
  firstName: string;
  middleName?: string;
  lastName: string;
  clinicianTitle: string; // Dr, Prof, etc.
  specialty: string;
  subSpecialty?: string;
  institution: string;
  department?: string;
  licenseNumber?: string;
  yearsInPractice?: number;
  patientInviteEmails: string[];
}

export const useClinicianOnboardingComplete = () => {
  const { toast } = useToast();
  const { sendMultipleInvites } = usePatientInvites();

  const saveClinicianOnboarding = async (userId: string, data: ClinicianOnboardingData) => {
    try {
      // 1. Update profiles table
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: userId,
          user_type: 'clinician',
          first_name: data.firstName,
          middle_name: data.middleName,
          last_name: data.lastName,
          onboarding_completed: true
        });

      if (profileError) {
        console.error('Error updating profile:', profileError);
        throw profileError;
      }

      // 2. Save to clinician_profiles
      const { error: clinicianError } = await supabase
        .from('clinician_profiles')
        .insert({
          user_id: userId,
          first_name: data.firstName,
          middle_name: data.middleName,
          last_name: data.lastName,
          clinician_title: data.clinicianTitle,
          specialty: data.specialty,
          sub_specialty: data.subSpecialty,
          institution: data.institution,
          department: data.department,
          license_number: data.licenseNumber,
          years_in_practice: data.yearsInPractice,
          patient_capacity: 100, // Default
          accepting_new_patients: true,
          preferred_communication: 'in_app'
        });

      if (clinicianError && clinicianError.code !== '23505') { // Ignore duplicate
        console.error('Error saving clinician profile:', clinicianError);
        throw clinicianError;
      }

      // 3. Send patient invites
      if (data.patientInviteEmails.length > 0) {
        const clinicianName = `${data.clinicianTitle} ${data.firstName} ${data.lastName}`.trim();
        const inviteMessage = `You've been invited to join NeuroLoop by ${clinicianName} from ${data.institution}. 
          This secure platform will help track your neurological health and connect you with your care team.`;
        
        await sendMultipleInvites(
          data.patientInviteEmails,
          clinicianName,
          inviteMessage
        );
      }

      toast({
        title: "Welcome to NeuroLoop! 👨‍⚕️",
        description: "Your clinician profile has been set up successfully.",
      });

      return { success: true };
    } catch (error) {
      console.error('Error in clinician onboarding:', error);
      toast({
        title: "Setup Error",
        description: "Failed to save your professional information. Please try again.",
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  return { saveClinicianOnboarding };
};

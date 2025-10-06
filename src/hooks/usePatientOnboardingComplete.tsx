import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface PatientOnboardingCompleteData {
  // Personal Info
  firstName: string;
  middleName?: string;
  lastName: string;
  gender: string;
  dateOfBirth: Date | string;
  phoneNumber?: string;
  
  // Emergency Contact
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelationship?: string;
  carerEmail?: string;
  
  // Medical
  selectedConditions: string[]; // UUID array
  medications: Array<{
    id: string;
    name: string;
    dosage: string;
    times: string[];
  }>;
  
  // Tracking
  trackMenstrual: boolean;
  basalTempTime?: string;
  trackingTimes: string[];
  
  // Research
  shareResearch: boolean;
  researchDataTypes: {
    seizureData: boolean;
    parkinsonData: boolean;
    medicationData: boolean;
    menstrualData: boolean;
  };
}

export const usePatientOnboardingComplete = () => {
  const { toast } = useToast();

  const saveCompleteOnboarding = async (userId: string, data: PatientOnboardingCompleteData) => {
    try {
      // Convert date to string if needed
      const dobString = data.dateOfBirth instanceof Date 
        ? data.dateOfBirth.toISOString().split('T')[0]
        : data.dateOfBirth;

      // 1. Call the comprehensive save function
      const { data: saveResult, error: saveError } = await supabase.rpc('save_patient_onboarding', {
        p_user_id: userId,
        p_data: {
          firstName: data.firstName,
          middleName: data.middleName || '',
          lastName: data.lastName,
          gender: data.gender,
          dateOfBirth: dobString,
          phoneNumber: data.phoneNumber || '',
          emergencyContactName: data.emergencyContactName,
          emergencyContactPhone: data.emergencyContactPhone,
          emergencyContactRelationship: data.emergencyContactRelationship || '',
          selectedConditions: data.selectedConditions,
          trackMenstrual: data.trackMenstrual,
          shareResearch: data.shareResearch
        }
      });

      if (saveError) {
        console.error('Error in save_patient_onboarding:', saveError);
        throw saveError;
      }

      // 2. Save conditions to user_conditions
      for (const conditionId of data.selectedConditions) {
        await supabase
          .from('user_conditions')
          .insert({
            user_id: userId,
            condition_id: conditionId,
            diagnosis_date: new Date().toISOString().split('T')[0],
            severity: 3, // Default moderate
            tracking_features_enabled: [] // Will be set based on condition type
          })
          .select()
          .single();
      }

      // 3. Save medications with times
      for (const med of data.medications) {
        // Parse dosage to get amount and unit
        const dosageMatch = med.dosage.match(/^([\d.]+)\s*(.*)$/);
        const dosageAmount = dosageMatch ? parseFloat(dosageMatch[1]) : null;
        const dosageUnit = dosageMatch ? dosageMatch[2] : med.dosage;

        // Check if it's a custom medication
        const isCustom = med.id.startsWith('custom-');
        
        await supabase
          .from('user_medications')
          .insert({
            user_id: userId,
            medication_id: isCustom ? null : med.id,
            medication_name: isCustom ? med.name : null,
            dosage_amount: dosageAmount,
            dosage_unit: dosageUnit,
            frequency: `${med.times.length}x daily`,
            times: med.times,
            start_date: new Date().toISOString().split('T')[0],
            is_active: true
          });
      }

      // 4. Save daily tracking preferences
      const medicationTimes = data.medications.flatMap(m => m.times);
      const allTrackingTimes = [...new Set([...data.trackingTimes, ...medicationTimes])].sort();
      
      await supabase
        .from('daily_tracking_preferences')
        .insert({
          user_id: userId,
          tracking_times: allTrackingTimes,
          basal_temp_time: data.trackMenstrual ? data.basalTempTime : null,
          medication_times: medicationTimes
        });

      // 5. Save data sharing preferences
      await supabase
        .from('data_sharing_preferences')
        .insert({
          patient_id: userId,
          default_share_with_researchers: data.shareResearch,
          research_seizure_data: data.researchDataTypes.seizureData,
          research_tremor_data: data.researchDataTypes.parkinsonData,
          research_gait_data: data.researchDataTypes.parkinsonData,
          research_medication_data: data.researchDataTypes.medicationData,
          research_symptom_data: data.researchDataTypes.seizureData || data.researchDataTypes.parkinsonData,
          research_demographic_data: data.shareResearch,
          // Set default visibility
          seizure_events_visibility: 'clinician_carer',
          tremor_episodes_visibility: 'clinician_carer',
          gait_episodes_visibility: 'clinician_carer',
          daily_logs_visibility: 'clinician_carer',
          medications_visibility: 'clinician_carer',
          media_visibility: 'clinician_only'
        });

      // 6. Save granular research consent
      if (data.shareResearch) {
        await supabase
          .from('research_data_sharing_details')
          .insert({
            user_id: userId,
            seizure_data: data.researchDataTypes.seizureData,
            parkinsons_data: data.researchDataTypes.parkinsonData,
            medication_data: data.researchDataTypes.medicationData,
            menstrual_data: data.researchDataTypes.menstrualData,
            symptom_data: true,
            demographic_data: true
          });

        // Save individual consent records
        const consentTypes = [];
        if (data.researchDataTypes.seizureData) consentTypes.push('seizure_data');
        if (data.researchDataTypes.parkinsonData) consentTypes.push('parkinsons_data');
        if (data.researchDataTypes.medicationData) consentTypes.push('medication_data');
        if (data.researchDataTypes.menstrualData) consentTypes.push('menstrual_data');

        for (const dataType of consentTypes) {
          await supabase
            .from('research_consent')
            .insert({
              user_id: userId,
              consent_given: true,
              data_type: dataType,
              consent_date: new Date().toISOString()
            });
        }
      }

      // 7. Initialize notification preferences
      await supabase
        .from('notification_preferences')
        .insert({
          patient_id: userId,
          medication_reminders: true,
          tracking_reminders: true,
          appointment_reminders: true,
          educational_content: true,
          research_updates: data.shareResearch,
          system_updates: true,
          reminder_time_morning: '08:00',
          reminder_time_evening: '20:00'
        });

      // 8. Initialize gamification
      await supabase
        .from('user_points')
        .insert({
          user_id: userId,
          total_points: 100, // Welcome bonus
          current_streak: 0,
          longest_streak: 0
        });

      // 9. Send carer invite if email provided
      if (data.carerEmail) {
        await supabase.functions.invoke('invite_carer', {
          body: {
            carerEmail: data.carerEmail,
            patientName: `${data.firstName} ${data.lastName}`,
            relationship: data.emergencyContactRelationship || 'Emergency Contact'
          }
        });
      }

      toast({
        title: "Welcome to NeuroLoop! 🎉",
        description: "Your profile has been set up successfully. Let's start tracking!",
      });

      return { success: true };
    } catch (error) {
      console.error('Error in complete patient onboarding:', error);
      toast({
        title: "Setup Error",
        description: "There was an issue saving your information. Please try again.",
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  return { saveCompleteOnboarding };
};

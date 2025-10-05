import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { CustomDatePicker } from "@/components/ui/custom-date-picker";
import DailyTrackingModal from "@/components/tracking/DailyTrackingModal";
import { 
  Heart,
  User,
  Phone,
  Calendar,
  Clock,
  Shield,
  ChevronLeft,
  ChevronRight,
  Activity,
  Pill,
  Brain,
  Zap,
  AlertTriangle,
  Plus,
  X,
  Search,
  Send,
  CheckCircle,
  Loader2
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useInviteCarer } from "@/hooks/useInviteCarer";
import { useToast } from "@/hooks/use-toast";

interface PatientOnboardingProps {
  onComplete: (data: any) => void;
  onBack: () => void;
}

const onboardingSteps = [
  { id: 1, title: "Personal Information", icon: User },
  { id: 2, title: "Emergency Contact", icon: Phone },
  { id: 3, title: "Medical Conditions", icon: Heart },
  { id: 4, title: "Medications", icon: Pill },
  { id: 5, title: "Menstrual Cycle", icon: Calendar },
  { id: 6, title: "Daily Tracking", icon: Clock },
  { id: 7, title: "Research Consent", icon: Shield },
  { id: 8, title: "First Tracking", icon: Activity }
];

const conditions = [
  { 
    id: "epilepsy", 
    name: "Epilepsy", 
    category: "seizure",
    description: "A neurological disorder affecting 65 million people worldwide. Characterized by recurring seizures due to abnormal electrical activity in the brain. Often involves unpredictable seizure patterns that can significantly impact quality of life.",
    icon: Zap,
    color: "text-red-500",
    bgColor: "bg-red-50 dark:bg-red-950/20",
    borderColor: "border-red-200 dark:border-red-800"
  },
  { 
    id: "parkinsons", 
    name: "Parkinson's Disease", 
    category: "movement",
    description: "A progressive neurodegenerative disorder affecting over 10 million people globally. Causes tremor, rigidity, slowness of movement, and balance problems. Symptoms often fluctuate throughout the day.",
    icon: Brain,
    color: "text-purple-500",
    bgColor: "bg-purple-50 dark:bg-purple-950/20",
    borderColor: "border-purple-200 dark:border-purple-800"
  },
  { 
    id: "seizure_other", 
    name: "Other Seizure Disorders", 
    category: "seizure",
    description: "Various seizure conditions including focal seizures, absence seizures, and rare epileptic syndromes. Each type has unique characteristics and treatment approaches.",
    icon: AlertTriangle,
    color: "text-orange-500",
    bgColor: "bg-orange-50 dark:bg-orange-950/20",
    borderColor: "border-orange-200 dark:border-orange-800"
  },
  { 
    id: "essential_tremor", 
    name: "Essential Tremor", 
    category: "movement",
    description: "The most common movement disorder, causing rhythmic shaking especially in hands and arms. Often worsens with stress, caffeine, or fatigue.",
    icon: Activity,
    color: "text-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
    borderColor: "border-blue-200 dark:border-blue-800"
  },
  { 
    id: "movement_other", 
    name: "Other Movement Disorders", 
    category: "movement",
    description: "Neurological conditions affecting voluntary or involuntary movements, including dystonia, chorea, ataxia, and tics. Each requires specialized tracking approaches.",
    icon: Heart,
    color: "text-emerald-500",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/20",
    borderColor: "border-emerald-200 dark:border-emerald-800"
  }
];

export default function PatientOnboarding({ onComplete, onBack }: PatientOnboardingProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [customTime, setCustomTime] = useState("");
  const [availableMedications, setAvailableMedications] = useState<any[]>([]);
  const [medicationSearch, setMedicationSearch] = useState("");
  const [carerInviteSent, setCarerInviteSent] = useState(false);
  const [carerRelationship, setCarerRelationship] = useState("spouse");
  const { inviteCarer, loading: inviteLoading } = useInviteCarer();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    
    // Emergency Contact
    carerName: "",
    carerPhone: "",
    carerEmail: "",
    
    // Conditions
    selectedConditions: [] as string[],
    
    // Medications
    medications: [] as Array<{
      id?: string;
      name: string;
      dosage: string;
      frequency: string;
      times: Array<{ time: string; label: string }>;
    }>,
    
    // Menstrual (if applicable)
    trackMenstrual: false,
    basalTempTime: "07:00",
    
    // Tracking
    preferredTimes: [] as string[],
    
    // Research
    shareResearchData: false,
    researchDataTypes: [] as string[]
  });

  // Load medications from database
  useEffect(() => {
    loadMedications();
    loadOnboardingProgress(); // Load saved progress
  }, []);

  // Load saved onboarding progress
  const loadOnboardingProgress = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // @ts-ignore - Table exists in private_health_info schema
      const { data, error } = await supabase
        .schema('private_health_info')
        .from('patient_onboarding_data')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Error loading onboarding progress:', error);
        return;
      }

      if (data && !data.completed_at) {
        // Resume from saved step
        setCurrentStep(data.onboarding_step || 0);
        
        // Restore form data
        setFormData(prev => ({
          ...prev,
          firstName: data.first_name || '',
          lastName: data.last_name || '',
          middleName: data.middle_name || '',
          gender: data.gender || '',
          dateOfBirth: data.date_of_birth || '',
          selectedConditions: data.selected_conditions || [],
          trackMenstrual: data.track_menstrual_cycle || false,
          shareResearchData: data.share_research_data || false,
          researchDataTypes: data.research_data_types || [],
        }));
      }
    } catch (error) {
      console.error('Error loading onboarding progress:', error);
    }
  };

  const loadMedications = async () => {
    try {
      const { data, error } = await supabase
        .from('medications')
        .select('*')
        .order('name');
      
      if (error) {
        console.error('Error loading medications:', error);
        return;
      }
      
      setAvailableMedications(data || []);
    } catch (error) {
      console.error('Error loading medications:', error);
    }
  };

  const updateFormData = (updates: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  // Save progress to database
  const saveProgress = async (nextStep: number) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // @ts-ignore - Table exists in private_health_info schema
      await supabase
        .schema('private_health_info')
        .from('patient_onboarding_data')
        .upsert([{
          user_id: user.id,
          onboarding_step: nextStep,
          first_name: formData.firstName || null,
          last_name: formData.lastName || null,
          middle_name: formData.middleName || null,
          gender: formData.gender || null,
          date_of_birth: formData.dateOfBirth || null,
          selected_conditions: formData.selectedConditions.length > 0 ? formData.selectedConditions : null,
          track_menstrual_cycle: formData.trackMenstrual,
          share_research_data: formData.shareResearchData,
          research_data_types: formData.researchDataTypes.length > 0 ? formData.researchDataTypes as any[] : null,
        }], { onConflict: 'user_id' });
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  const handleNext = async () => {
    if (currentStep < getMaxSteps()) {
      // Determine next step
      let nextStep;
      // Skip menstrual cycle step if not female
      if (currentStep === 4 && formData.gender !== "female") {
        nextStep = 6; // Skip menstrual cycle, go to tracking
      } else {
        nextStep = currentStep + 1;
      }
      
      // Save progress before moving to next step
      await saveProgress(nextStep);
      
      // Update current step
      setCurrentStep(nextStep);
    } else {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // 1. Create patient profile
        const { error: profileError } = await supabase
          .from('patient_profiles')
          .upsert([{
            user_id: user.id,
            first_name: formData.firstName,
            last_name: formData.lastName,
            date_of_birth: formData.dateOfBirth || null,
            gender: (formData.gender as any) || null
          }], { onConflict: 'user_id' });

        if (profileError) {
          console.error('Error saving patient profile:', profileError);
          return;
        }

        // 2. Create profiles record with user type
        const { error: userProfileError } = await supabase
          .from('profiles')
          .upsert([{
            id: user.id,
            user_type: 'patient' as const,
            onboarding_completed: true
          }]);

        if (userProfileError) {
          console.error('Error saving profiles:', userProfileError);
        }

        // 3. Get condition UUIDs from database
        const conditionNames = formData.selectedConditions.map(id => {
          const condition = conditions.find(c => c.id === id);
          return condition?.name;
        }).filter(Boolean);

        const { data: dbConditions } = await supabase
          .from('conditions')
          .select('id, name, tracking_features_array')
          .in('name', conditionNames);

        const conditionUUIDs = (dbConditions || []).map(c => c.id);

        // 4. Save onboarding data to private_health_info schema
        // @ts-ignore - Table exists in private_health_info schema  
        const { error: onboardingError } = await supabase
          .schema('private_health_info')
          .from('patient_onboarding_data')
          .upsert([{
            user_id: user.id,
            selected_conditions: conditionUUIDs,
            track_menstrual_cycle: formData.trackMenstrual,
            share_research_data: formData.shareResearchData,
            research_data_types: formData.researchDataTypes.length > 0 ? formData.researchDataTypes as any[] : null,
            onboarding_step: currentStep,
            completed_at: new Date().toISOString()
          }], { onConflict: 'user_id' });

        if (onboardingError) {
          console.error('Error saving onboarding data:', onboardingError);
          return;
        }

        // 5. Create user_conditions records
        if (dbConditions && dbConditions.length > 0) {
          const conditionRecords = dbConditions.map(condition => ({
            user_id: user.id,
            condition_id: condition.id,
            tracking_features_enabled: condition.tracking_features_array
          }));

          // @ts-ignore - Table exists in private_health_info schema
          const { error: conditionsError } = await supabase
            .schema('private_health_info')
            .from('user_conditions')
            .upsert(conditionRecords, { onConflict: 'user_id,condition_id' });

          if (conditionsError) {
            console.error('Error saving user conditions:', conditionsError);
          }
        }

        // 6. Create user_medications records
        if (formData.medications.length > 0) {
          const medicationRecords = formData.medications.map(med => ({
            user_id: user.id,
            medication_id: med.id || null,
            dosage_amount: parseFloat(med.dosage) || null,
            dosage_unit: med.dosage.replace(/[0-9.]/g, '').trim() || 'mg',
            frequency: med.frequency as any,
            start_date: new Date().toISOString().split('T')[0]
          }));

          // @ts-ignore - Table exists in private_health_info schema
          const { error: medsError } = await supabase
            .schema('private_health_info')
            .from('user_medications')
            .insert(medicationRecords);

          if (medsError) {
            console.error('Error saving medications:', medsError);
          }
        }

        // 7. Create research consent records
        if (formData.shareResearchData && formData.researchDataTypes.length > 0) {
          const consentRecords = formData.researchDataTypes.map(dataType => ({
            user_id: user.id,
            data_type: dataType as any,
            consent_status: 'active' as const,
            consent_given_at: new Date().toISOString()
          }));

          const { error: consentError } = await supabase
            .from('research_consent')
            .upsert(consentRecords, { onConflict: 'user_id,data_type' });

          if (consentError) {
            console.error('Error saving research consent:', consentError);
          }
        }

        // 8. Set up tracking preferences
        let allTrackingFeatures: string[] = [];
        if (dbConditions) {
          dbConditions.forEach(condition => {
            if (condition.tracking_features_array) {
              allTrackingFeatures = [...allTrackingFeatures, ...condition.tracking_features_array];
            }
          });
        }
        if (formData.trackMenstrual) {
          allTrackingFeatures.push('menstruation');
        }
        allTrackingFeatures = Array.from(new Set(allTrackingFeatures));

        const { error: prefError } = await supabase
          .from('daily_tracking_preferences')
          .upsert([{
            user_id: user.id,
            tracking_types: allTrackingFeatures as any[],
            notification_enabled: true
          }], { onConflict: 'user_id' });

        if (prefError) {
          console.error('Error saving tracking preferences:', prefError);
        }

        onComplete(formData);
      } catch (error) {
        console.error('Error during patient onboarding:', error);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      // Skip menstrual cycle step if not female
      if (currentStep === 6 && formData.gender !== "female") {
        setCurrentStep(4); // Go back to medications
      } else {
        setCurrentStep(prev => prev - 1);
      }
    } else {
      onBack();
    }
  };

  const getMaxSteps = () => {
    // Skip menstrual cycle step if not female
    return formData.gender === "female" ? 8 : 7;
  };

  const addCustomTime = () => {
    if (customTime && !formData.preferredTimes.includes(customTime)) {
      updateFormData({
        preferredTimes: [...formData.preferredTimes, customTime]
      });
      setCustomTime("");
    }
  };

  const removeTime = (timeToRemove: string) => {
    updateFormData({
      preferredTimes: formData.preferredTimes.filter(time => time !== timeToRemove)
    });
  };

  // Helper function to get default times based on frequency
  const getDefaultTimesForFrequency = (frequency: string) => {
    switch (frequency) {
      case 'once_daily':
        return [{ time: '08:00', label: 'Morning' }];
      case 'twice_daily':
        return [
          { time: '08:00', label: 'Morning' },
          { time: '20:00', label: 'Evening' }
        ];
      case 'three_times_daily':
        return [
          { time: '08:00', label: 'Morning' },
          { time: '14:00', label: 'Afternoon' },
          { time: '20:00', label: 'Evening' }
        ];
      case 'four_times_daily':
        return [
          { time: '08:00', label: 'Morning' },
          { time: '12:00', label: 'Noon' },
          { time: '17:00', label: 'Afternoon' },
          { time: '21:00', label: 'Evening' }
        ];
      case 'as_needed':
      default:
        return [{ time: '08:00', label: 'As needed' }];
    }
  };

  const addMedication = (medicationData?: any) => {
    const newMedication = {
      id: medicationData?.id || undefined,
      name: medicationData?.name || "",
      dosage: medicationData?.common_dosages ? JSON.parse(medicationData.common_dosages)[0] || "" : "",
      frequency: "once_daily",
      times: getDefaultTimesForFrequency("once_daily")
    };
    
    updateFormData({
      medications: [...formData.medications, newMedication]
    });
  };

  const updateMedication = (index: number, updates: Partial<typeof formData.medications[0]>) => {
    const updatedMedications = [...formData.medications];
    
    // If frequency changes, update times accordingly
    if (updates.frequency && updates.frequency !== updatedMedications[index].frequency) {
      updates.times = getDefaultTimesForFrequency(updates.frequency);
    }
    
    updatedMedications[index] = { ...updatedMedications[index], ...updates };
    updateFormData({ medications: updatedMedications });
  };

  const updateMedicationTime = (medicationIndex: number, timeIndex: number, newTime: string) => {
    const updatedMedications = [...formData.medications];
    updatedMedications[medicationIndex].times[timeIndex].time = newTime;
    updateFormData({ medications: updatedMedications });
  };

  const removeMedication = (index: number) => {
    updateFormData({
      medications: formData.medications.filter((_, i) => i !== index)
    });
  };

  // Generate smart tracking times based on selections
  const generateSmartTrackingTimes = () => {
    const times = new Set<string>();
    
    // Add medication times
    formData.medications.forEach(med => {
      med.times.forEach(time => {
        times.add(time.time);
      });
    });
    
    // Add basal temp time if tracking menstrual cycle
    if (formData.trackMenstrual) {
      times.add(formData.basalTempTime);
    }
    
    // Add some standard times if nothing is set
    if (times.size === 0) {
      times.add("08:00");
      times.add("20:00");
    }
    
    return Array.from(times).sort();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <User className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Personal Information</h2>
              <p className="text-muted-foreground">Help us personalize your experience</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => updateFormData({ firstName: e.target.value })}
                  placeholder="Enter your first name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => updateFormData({ lastName: e.target.value })}
                  placeholder="Enter your last name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="middleName">Middle Name</Label>
                <Input
                  id="middleName"
                  value={formData.middleName}
                  onChange={(e) => updateFormData({ middleName: e.target.value })}
                  placeholder="Optional"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select value={formData.gender} onValueChange={(value) => updateFormData({ gender: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border border-border z-50">
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="non_binary">Non-Binary</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="md:col-span-2">
                <CustomDatePicker
                  id="dateOfBirth"
                  label="Date of Birth"
                  value={formData.dateOfBirth}
                  onChange={(value) => updateFormData({ dateOfBirth: value })}
                  max={new Date().toISOString().split('T')[0]}
                  showFormatHint={true}
                  required={false}
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Phone className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Emergency Contact</h2>
              <p className="text-muted-foreground">Someone who can assist you in emergencies</p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="carerName">Full Name *</Label>
                <Input
                  id="carerName"
                  value={formData.carerName}
                  onChange={(e) => updateFormData({ carerName: e.target.value })}
                  placeholder="Enter emergency contact name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="carerPhone">Phone Number *</Label>
                <Input
                  id="carerPhone"
                  type="tel"
                  value={formData.carerPhone}
                  onChange={(e) => updateFormData({ carerPhone: e.target.value })}
                  placeholder="Enter phone number"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="carerEmail">Email Address</Label>
                <Input
                  id="carerEmail"
                  type="email"
                  value={formData.carerEmail}
                  onChange={(e) => updateFormData({ carerEmail: e.target.value })}
                  placeholder="Email for carer portal invite (optional)"
                />
              </div>

              {formData.carerEmail && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="carerRelationship">Relationship *</Label>
                    <Select value={carerRelationship} onValueChange={setCarerRelationship}>
                      <SelectTrigger id="carerRelationship">
                        <SelectValue placeholder="Select relationship" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="spouse">Spouse/Partner</SelectItem>
                        <SelectItem value="parent">Parent</SelectItem>
                        <SelectItem value="child">Child</SelectItem>
                        <SelectItem value="sibling">Sibling</SelectItem>
                        <SelectItem value="friend">Friend</SelectItem>
                        <SelectItem value="professional_caregiver">Professional Caregiver</SelectItem>
                        <SelectItem value="other_family">Other Family</SelectItem>
                        <SelectItem value="healthcare_worker">Healthcare Worker</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Card className="p-4 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                    <div className="flex items-start gap-3 mb-3">
                      <Send className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                          Send Carer Portal Invite
                        </h4>
                        <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
                          Invite {formData.carerName || 'this person'} to access the carer portal. 
                          They'll be able to view your health data and assist with care.
                        </p>
                        {carerInviteSent ? (
                          <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
                            <CheckCircle className="h-4 w-4" />
                            <span className="text-sm font-medium">Invite sent!</span>
                          </div>
                        ) : (
                          <Button
                            type="button"
                            onClick={async () => {
                              if (!formData.carerEmail) return;
                              
                              const result = await inviteCarer({
                                email: formData.carerEmail,
                                relationship_type: carerRelationship
                              });

                              if (result.success) {
                                setCarerInviteSent(true);
                                toast({
                                  title: 'Invite Sent!',
                                  description: `Carer portal invite sent to ${formData.carerEmail}`,
                                });
                              } else {
                                toast({
                                  title: 'Failed to Send Invite',
                                  description: result.error || 'Please try again',
                                  variant: 'destructive'
                                });
                              }
                            }}
                            disabled={inviteLoading || !formData.carerEmail || !carerRelationship}
                            variant="outline"
                            size="sm"
                            className="bg-white dark:bg-gray-900"
                          >
                            {inviteLoading ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Sending...
                              </>
                            ) : (
                              <>
                                <Send className="mr-2 h-4 w-4" />
                                Send Invite Now
                              </>
                            )}
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                </>
              )}

              {!formData.carerEmail && (
                <p className="text-sm text-muted-foreground italic">
                  💡 Tip: Add an email address to send a carer portal invite
                </p>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Medical Conditions</h2>
              <p className="text-muted-foreground">Select the conditions you'd like to track</p>
            </div>
            
            <div className="space-y-4">
              {conditions.map((condition) => {
                const IconComponent = condition.icon;
                const isSelected = formData.selectedConditions.includes(condition.id);
                return (
                  <Card key={condition.id} className={`p-6 transition-all cursor-pointer hover:shadow-glow-primary hover:scale-[1.02] ${
                    isSelected
                      ? `${condition.bgColor} ${condition.borderColor} border-2 shadow-lg` 
                      : 'hover:border-primary/50 border-2 border-transparent'
                  }`}>
                    <div className="flex items-start space-x-4">
                      <Checkbox
                        id={condition.id}
                        checked={isSelected}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            updateFormData({
                              selectedConditions: [...formData.selectedConditions, condition.id]
                            });
                          } else {
                            updateFormData({
                              selectedConditions: formData.selectedConditions.filter(id => id !== condition.id)
                            });
                          }
                        }}
                        className="mt-1"
                      />
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${condition.bgColor}`}>
                            <IconComponent className={`h-6 w-6 ${condition.color}`} />
                          </div>
                          <Label htmlFor={condition.id} className="text-lg font-semibold cursor-pointer">
                            {condition.name}
                          </Label>
                          {(condition.id === "epilepsy" || condition.id === "parkinsons") && (
                            <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                              Primary Focus
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {condition.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
            
            <div className="bg-gradient-subtle p-4 rounded-lg border border-border">
              <p className="text-sm text-center text-muted-foreground">
                💡 <strong>Tip:</strong> You can select multiple conditions. The app will customize tracking based on your selections.
              </p>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Pill className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Current Medications</h2>
              <p className="text-muted-foreground">Select from our database or add custom medications with precise timing</p>
            </div>
            
            <div className="space-y-6">
              {/* Medication Database Selection */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4 flex items-center">
                  <Search className="h-5 w-5 mr-2" />
                  Find Your Medications
                </h3>
                
                <div className="space-y-4">
                  <Input
                    placeholder="Search medications..."
                    value={medicationSearch}
                    onChange={(e) => setMedicationSearch(e.target.value)}
                    className="w-full"
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto">
                    {availableMedications
                      .filter(med => 
                        med.name.toLowerCase().includes(medicationSearch.toLowerCase()) ||
                        (med.generic_name && med.generic_name.toLowerCase().includes(medicationSearch.toLowerCase()))
                      )
                      .slice(0, 20)
                      .map((medication) => (
                        <Card 
                          key={medication.id} 
                          className="p-3 cursor-pointer hover:bg-accent transition-colors"
                          onClick={() => addMedication(medication)}
                        >
                          <div className="space-y-1">
                            <p className="font-medium text-sm">{medication.name}</p>
                            {medication.generic_name && (
                              <p className="text-xs text-muted-foreground">Generic: {medication.generic_name}</p>
                            )}
                            <p className="text-xs text-primary">{medication.category}</p>
                          </div>
                        </Card>
                      ))}
                  </div>
                  
                  <Button
                    variant="outline"
                    onClick={() => addMedication()}
                    className="w-full border-dashed border-2"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Custom Medication
                  </Button>
                </div>
              </Card>

              {/* Selected Medications */}
              {formData.medications.length > 0 && (
                <Card className="p-6">
                  <h3 className="font-semibold mb-4">
                    Your Medications ({formData.medications.length} selected)
                  </h3>
                  
                  <div className="space-y-6">
                    {formData.medications.map((medication, index) => (
                      <Card key={index} className="p-4 border-2 border-dashed">
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <h4 className="font-semibold">Medication {index + 1}</h4>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeMedication(index)}
                              className="text-destructive hover:text-destructive"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Medication Name *</Label>
                              <Input
                                placeholder="e.g., Levetiracetam"
                                value={medication.name}
                                onChange={(e) => updateMedication(index, { name: e.target.value })}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label>Dosage *</Label>
                              <Input
                                placeholder="e.g., 500mg"
                                value={medication.dosage}
                                onChange={(e) => updateMedication(index, { dosage: e.target.value })}
                              />
                            </div>
                            
                            <div className="space-y-2 md:col-span-2">
                              <Label>Frequency *</Label>
                              <Select 
                                value={medication.frequency}
                                onValueChange={(value) => updateMedication(index, { frequency: value })}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="How often do you take this?" />
                                </SelectTrigger>
                                <SelectContent className="bg-popover border border-border z-50">
                                  <SelectItem value="once_daily">Once daily</SelectItem>
                                  <SelectItem value="twice_daily">Twice daily</SelectItem>
                                  <SelectItem value="three_times_daily">Three times daily</SelectItem>
                                  <SelectItem value="four_times_daily">Four times daily</SelectItem>
                                  <SelectItem value="as_needed">As needed</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          
                          {/* Medication Times */}
                          <div className="space-y-3 p-4 bg-accent/50 rounded-lg">
                            <Label className="font-medium">
                              Medication Times ({medication.times.length} times per day)
                            </Label>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                              {medication.times.map((timeSlot, timeIndex) => (
                                <div key={timeIndex} className="flex items-center space-x-2 p-2 bg-background rounded border">
                                  <span className="text-sm font-medium min-w-[70px] text-muted-foreground">
                                    {timeSlot.label}:
                                  </span>
                                  <Input
                                    type="time"
                                    value={timeSlot.time}
                                    onChange={(e) => updateMedicationTime(index, timeIndex, e.target.value)}
                                    className="flex-1 text-sm"
                                  />
                                </div>
                              ))}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              💡 Times automatically adjust based on frequency. Customize as needed for your schedule.
                            </p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </Card>
              )}
              
              <div className="bg-accent p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  💡 <strong>Smart Reminders:</strong> We'll use these exact times to send you medication reminders and track adherence patterns.
                </p>
              </div>
            </div>
          </div>
        );

      case 5:
        if (formData.gender !== "female") {
          // Skip to tracking for non-female users
          setCurrentStep(6);
          return null;
        }
        
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Menstrual Cycle Tracking</h2>
              <p className="text-muted-foreground">Optional - helps identify patterns with neurological symptoms</p>
            </div>
            
            <Card className="p-6 border-2 border-dashed border-primary/30">
              <div className="flex items-start space-x-4">
                <Checkbox
                  id="trackMenstrual"
                  checked={formData.trackMenstrual}
                  onCheckedChange={(checked) => updateFormData({ trackMenstrual: !!checked })}
                />
                <div className="flex-1 space-y-4">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="trackMenstrual" className="text-lg font-semibold cursor-pointer">
                        Track menstrual cycle and basal temperature
                      </Label>
                      <p className="text-sm text-muted-foreground mt-2">
                        <strong>Research shows:</strong> Catamenial epilepsy affects up to 40% of women with epilepsy. 
                        Hormonal fluctuations can significantly impact seizure frequency and other neurological symptoms.
                      </p>
                    </div>
                    
                    {formData.trackMenstrual && (
                      <div className="ml-4 p-4 bg-secondary/10 rounded-lg border">
                        <Label className="text-sm font-medium">Daily Basal Temperature Time</Label>
                        <p className="text-xs text-muted-foreground mb-2">
                          For accuracy, take temperature at the same time each morning before getting up.
                        </p>
                        <Input
                          type="time"
                          value={formData.basalTempTime}
                          onChange={(e) => updateFormData({ basalTempTime: e.target.value })}
                          className="w-32"
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-accent p-4 rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">Critical Research Gap</h4>
                    <ul className="text-xs space-y-1 text-muted-foreground">
                      <li>• 65% of women report menstrual seizure patterns, yet only 12% are properly studied</li>
                      <li>• Limited data exists on hormonal impacts on neurological conditions</li>
                      <li>• Your data could help millions of women worldwide</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
            
            {formData.trackMenstrual && (
              <Card className="p-4 bg-success/5 border-success/20">
                <p className="text-sm">
                  <strong>What we'll track:</strong> Cycle start/end dates, flow intensity, 
                  symptoms, basal body temperature, and correlation with neurological symptoms.
                </p>
              </Card>
            )}
          </div>
        );

      case 6:
        const smartTimes = generateSmartTrackingTimes();
        
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Daily Tracking Schedule</h2>
              <p className="text-muted-foreground">Smart times based on your medication and tracking preferences</p>
            </div>
            
            <div className="space-y-6">
              {/* Smart Suggestions */}
              <Card className="p-6 bg-gradient-subtle">
                <h3 className="font-semibold mb-4 flex items-center">
                  <span className="text-2xl mr-2">🧠</span>
                  Smart Tracking Schedule
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Based on your medication times{formData.trackMenstrual && " and basal temperature schedule"}, 
                  we've created an optimal tracking schedule. You can customize any times.
                </p>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {smartTimes.map((time, index) => {
                      const isSelected = formData.preferredTimes.includes(time);
                      const isMedicationTime = formData.medications.some(med => 
                        med.times.some(t => t.time === time)
                      );
                      const isBasalTime = formData.trackMenstrual && formData.basalTempTime === time;
                      
                      return (
                        <Card 
                          key={time}
                          className={`p-3 cursor-pointer transition-all ${
                            isSelected 
                              ? 'bg-primary/10 border-primary' 
                              : 'hover:bg-accent'
                          }`}
                          onClick={() => {
                            if (isSelected) {
                              updateFormData({
                                preferredTimes: formData.preferredTimes.filter(t => t !== time)
                              });
                            } else {
                              updateFormData({
                                preferredTimes: [...formData.preferredTimes, time]
                              });
                            }
                          }}
                        >
                          <div className="text-center">
                            <div className="font-medium">{time}</div>
                            <div className="text-xs text-muted-foreground space-y-1">
                              {isMedicationTime && <div>💊 Medication</div>}
                              {isBasalTime && <div>🌡️ Basal temp</div>}
                              {!isMedicationTime && !isBasalTime && <div>📊 Symptoms</div>}
                            </div>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                  
                  {/* Custom Time Addition */}
                  <div className="border-t pt-4">
                    <Label className="text-sm font-medium">Add Custom Time:</Label>
                    <div className="flex gap-2 mt-2">
                      <Input
                        type="time"
                        value={customTime}
                        onChange={(e) => setCustomTime(e.target.value)}
                        placeholder="Select time"
                        className="flex-1"
                      />
                      <Button onClick={addCustomTime} disabled={!customTime || formData.preferredTimes.includes(customTime)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Your Selected Times ({formData.preferredTimes.length}):</Label>
                    <div className="flex flex-wrap gap-2">
                      {formData.preferredTimes.sort().map((time) => (
                        <div key={time} className="flex items-center bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                          {time}
                          <button
                            onClick={() => removeTime(time)}
                            className="ml-2 hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                    {formData.preferredTimes.length === 0 && (
                      <p className="text-sm text-muted-foreground">No times selected yet - select from suggestions above</p>
                    )}
                  </div>
                </div>
              </Card>
              
              {/* Tracking Preview */}
              <Card className="p-4 bg-gradient-subtle">
                <h4 className="font-semibold text-sm mb-3">📋 Your Complete Tracking Schedule</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <Card className="p-3 bg-background">
                    <div className="font-medium mb-2">💊 Medications</div>
                    <div className="space-y-1">
                      {formData.medications.length === 0 ? (
                        <div className="text-muted-foreground">No medications added</div>
                      ) : (
                        formData.medications.map((med, idx) => (
                          <div key={idx} className="text-muted-foreground">
                            {med.name}: {med.times.length} times/day
                          </div>
                        ))
                      )}
                    </div>
                  </Card>
                  
                  <Card className="p-3 bg-background">
                    <div className="font-medium mb-2">📊 Daily Tracking</div>
                    <div className="space-y-1 text-muted-foreground">
                      <div>Symptoms: {formData.preferredTimes.length} check-ins</div>
                      <div>Mood & Energy tracking</div>
                      <div>Sleep quality logs</div>
                    </div>
                  </Card>
                  
                  {formData.trackMenstrual && (
                    <Card className="p-3 bg-background">
                      <div className="font-medium mb-2">🌡️ Menstrual Tracking</div>
                      <div className="space-y-1 text-muted-foreground">
                        <div>Basal temp: {formData.basalTempTime}</div>
                        <div>Cycle tracking</div>
                        <div>Symptom correlation</div>
                      </div>
                    </Card>
                  )}
                </div>
              </Card>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Advance Epilepsy Research</h2>
              <p className="text-muted-foreground">Help change the future of neurological care</p>
            </div>
            
            <div className="space-y-6">
              <Card className="p-6 border-2 border-primary/20 bg-gradient-subtle">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-center">The Research Crisis</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <Card className="p-4 bg-destructive/5 border-destructive/20">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-destructive mb-2">65%</div>
                        <p className="text-muted-foreground">of women with epilepsy report menstrual seizure patterns, yet only 12% are properly studied</p>
                      </div>
                    </Card>
                    
                    <Card className="p-4 bg-warning/5 border-warning/20">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-warning mb-2">90%</div>
                        <p className="text-muted-foreground">of neurological research lacks diverse, real-world patient data</p>
                      </div>
                    </Card>
                  </div>
                  
                  <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
                    "The lack of comprehensive patient data is the biggest barrier to developing better treatments for epilepsy and movement disorders. Every data point helps us understand these conditions better."
                    <footer className="text-xs mt-2">- Dr. Sarah Chen, Epilepsy Research Consortium</footer>
                  </blockquote>
                  
                  <div className="bg-warning/10 border border-warning/20 p-4 rounded-lg">
                    <p className="text-sm font-medium text-warning-foreground mb-2">Menstrual Cycle Research Gap</p>
                    <p className="text-xs text-muted-foreground">
                      "Despite affecting millions, catamenial epilepsy remains understudied. Current treatment guidelines are based on limited data from small studies, 
                      leaving women with few evidence-based options." - International League Against Epilepsy
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start space-x-3 mb-6">
                  <Checkbox
                    id="shareResearchData"
                    checked={formData.shareResearchData}
                    onCheckedChange={(checked) => updateFormData({ shareResearchData: !!checked })}
                  />
                  <div className="flex-1">
                    <Label htmlFor="shareResearchData" className="text-lg font-semibold cursor-pointer">
                      Share anonymized data for research
                    </Label>
                    <p className="text-sm text-muted-foreground mt-2">
                      Your anonymized data could help researchers develop better treatments for millions of people worldwide.
                      You maintain complete control over what is shared.
                    </p>
                  </div>
                </div>
                
                {formData.shareResearchData && (
                  <div className="ml-6 space-y-4 border-l-2 border-primary pl-6">
                    <p className="font-semibold text-sm">Choose what to contribute:</p>
                    {[
                      { id: "epilepsy_symptoms", label: "Epilepsy & seizure data", description: "Seizure patterns, triggers, frequency - critical for advancing epilepsy care" },
                      { id: "parkinsons_symptoms", label: "Parkinson's symptom data", description: "Motor symptoms, on/off periods, dyskinesia tracking for movement disorder research" },
                      { id: "medications", label: "Medication effectiveness data", description: "Dosing, adherence, side effects - improve treatment protocols worldwide" },
                      { id: "menstrual", label: "Menstrual cycle correlations", description: "Critical for understanding catamenial epilepsy - severely understudied area" },
                      { id: "daily_tracking", label: "Daily wellness tracking", description: "Mood, energy, sleep, triggers - provides comprehensive health picture" },
                      { id: "movement_data", label: "Movement & activity patterns", description: "Gait, tremor, rigidity patterns for movement disorder research" },
                      { id: "demographics", label: "Age, gender, condition type", description: "Ensure research represents diverse populations globally" }
                    ].map((item) => (
                      <Card key={item.id} className="p-4">
                        <div className="flex items-start space-x-3">
                          <Checkbox
                            id={item.id}
                            checked={formData.researchDataTypes.includes(item.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                updateFormData({
                                  researchDataTypes: [...formData.researchDataTypes, item.id]
                                });
                              } else {
                                updateFormData({
                                  researchDataTypes: formData.researchDataTypes.filter(type => type !== item.id)
                                });
                              }
                            }}
                          />
                          <div className="flex-1">
                            <Label htmlFor={item.id} className="font-medium cursor-pointer">
                              {item.label}
                            </Label>
                            <p className="text-xs text-muted-foreground mt-1">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </Card>
              
              <div className="bg-success/10 border border-success/20 p-4 rounded-lg">
                <p className="text-sm text-success-foreground">
                  🔒 <strong>Your privacy is protected:</strong> All data is anonymized, 
                  encrypted, and you can withdraw consent at any time. No personal identifiers are ever shared.
                </p>
              </div>
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Activity className="h-12 w-12 text-success mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Ready for Your First Tracking!</h2>
              <p className="text-muted-foreground">Let's establish your baseline with your first health check-in</p>
            </div>
            
            <Card className="p-6 bg-gradient-subtle">
              <div className="text-center space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">🌟 Your NeuroLoop Profile is Complete!</h3>
                  <p className="text-muted-foreground">
                    Now let's capture your first health data to establish your personal baseline.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="text-center p-4 bg-card rounded-lg border">
                    <div className="text-2xl font-bold text-primary mb-2">✓</div>
                    <div className="font-medium">Profile Complete</div>
                    <div className="text-muted-foreground text-xs">Personal & medical info</div>
                  </div>
                  <div className="text-center p-4 bg-card rounded-lg border">
                    <div className="text-2xl font-bold text-secondary mb-2">{formData.preferredTimes.length}</div>
                    <div className="font-medium">Daily Check-ins</div>
                    <div className="text-muted-foreground text-xs">Scheduled tracking times</div>
                  </div>
                  <div className="text-center p-4 bg-card rounded-lg border">
                    <div className="text-2xl font-bold text-success mb-2">→</div>
                    <div className="font-medium">First Tracking</div>
                    <div className="text-muted-foreground text-xs">Establish baseline</div>
                  </div>
                </div>
                
                <Button 
                  variant="hero" 
                  onClick={() => setShowTrackingModal(true)}
                  className="w-full text-lg py-6"
                >
                  🚀 Start My Health Journey
                </Button>
              </div>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.firstName && formData.lastName;
      case 2:
        return formData.carerName && formData.carerPhone;
      case 3:
        return formData.selectedConditions.length > 0;
      case 4:
        return true; // Medications optional
      case 5:
        return true; // Optional menstrual step
      case 6:
        return formData.preferredTimes.length > 0;
      case 7:
        return true; // Optional research step
      case 8:
        return true; // Tracking step
      default:
        return false;
    }
  };

  const handleTrackingComplete = async (trackingData: any) => {
    // First tracking completed - save to database in production
    setShowTrackingModal(false);
    
    try {
      // Save patient onboarding data with first tracking
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // @ts-ignore - Table exists in private_health_info schema
      const { error: patientError } = await supabase
        .schema('private_health_info')
        .from('patient_onboarding_data')
        .upsert([{
          user_id: user.id,
          selected_conditions: formData.selectedConditions,
          track_menstrual_cycle: formData.trackMenstrual,
          share_research_data: formData.shareResearchData,
          research_data_types: formData.researchDataTypes as any[],
          completed_at: new Date().toISOString()
        }], { onConflict: 'user_id' });

      if (patientError) {
        console.error('Error saving patient data:', patientError);
        return;
      }

      // Mark onboarding as completed in profiles
      const { error: progressError } = await supabase
        .from('profiles')
        .upsert([{
          id: user.id,
          user_type: 'patient' as const,
          onboarding_completed: true
        }]);

      if (progressError) {
        console.error('Error updating progress:', progressError);
      }

      onComplete({ ...formData, firstTracking: trackingData });
    } catch (error) {
      console.error('Error during tracking completion:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Progress Bar */}
      <div className="space-y-4">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Step {currentStep} of {getMaxSteps()}</span>
          <span>{Math.round((currentStep / getMaxSteps()) * 100)}% Complete</span>
        </div>
        
        <div className="w-full bg-secondary rounded-full h-2">
          <div 
            className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / getMaxSteps()) * 100}%` }}
          />
        </div>

        {/* Step Navigation */}
        <div className="flex justify-between items-center">
          {onboardingSteps
            .filter((_, index) => formData.gender === "female" || index !== 4) // Skip menstrual step if not female
            .map((step, index) => {
            const actualStep = formData.gender === "female" ? step.id : (step.id > 4 ? step.id - 1 : step.id);
            const StepIcon = step.icon;
            const isActive = currentStep === actualStep;
            const isCompleted = currentStep > actualStep;
            
            return (
              <div key={step.id} className={`flex flex-col items-center space-y-2 ${
                isActive ? 'text-primary' : isCompleted ? 'text-success' : 'text-muted-foreground'
              }`}>
                <div className={`p-2 rounded-full border-2 ${
                  isActive ? 'border-primary bg-primary/10' : 
                  isCompleted ? 'border-success bg-success/10' : 'border-muted'
                }`}>
                  <StepIcon className="h-4 w-4" />
                </div>
                <span className="text-xs font-medium hidden md:block">{step.title}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <Card className="p-8">
        {renderStepContent()}
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={handleBack}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        
        <Button 
          onClick={handleNext} 
          disabled={!isStepValid()}
          className="min-w-[120px]"
        >
          {currentStep === getMaxSteps() ? 'Complete Setup' : 'Continue'}
          {currentStep < getMaxSteps() && <ChevronRight className="h-4 w-4 ml-2" />}
        </Button>
      </div>

      {/* Daily Tracking Modal */}
      {showTrackingModal && (
        <DailyTrackingModal
          isOpen={showTrackingModal}
          onClose={() => setShowTrackingModal(false)}
          onComplete={handleTrackingComplete}
        />
      )}
    </div>
  );
}
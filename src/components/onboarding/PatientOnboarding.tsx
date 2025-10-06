import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  ChevronLeft,
  ChevronRight,
  Activity,
  CheckCircle,
  User,
  Phone,
  Heart,
  Pill,
  Calendar,
  Clock,
  Shield
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { usePatientOnboarding } from "@/hooks/usePatientOnboarding";
import { useToast } from "@/hooks/use-toast";
import { PersonalInfoStep } from "./steps/PersonalInfoStep";
import { EmergencyContactStep } from "./steps/EmergencyContactStep";
import { ConditionsStep } from "./steps/ConditionsStep";
import { MedicationStep } from "./steps/MedicationStep";
import { MenstrualTrackingStep } from "./steps/MenstrualTrackingStep";
import { DailyTrackingStep } from "./steps/DailyTrackingStep";
import { ResearchConsentStep } from "./steps/ResearchConsentStep";

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

// Condition ID to name mapping for database lookup
const conditionIdToName: Record<string, string> = {
  "epilepsy": "Epilepsy",
  "parkinsons": "Parkinson's Disease",
  "seizure_other": "Other Seizure Disorders",
  "essential_tremor": "Essential Tremor",
  "movement_other": "Other Movement Disorders"
};

export default function PatientOnboarding({ onComplete, onBack }: PatientOnboardingProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const { saveOnboarding } = usePatientOnboarding();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    dateOfBirth: undefined as Date | undefined,
    
    // Emergency Contact
    emergencyContactName: "",
    emergencyContactPhone: "",
    carerEmail: "",
    
    // Conditions
    selectedConditions: [] as string[],
    
    // Medications (updated structure for new component)
    medications: [] as Array<{
      id: string;
      name: string;
      dosage: string;
      frequency?: string;
      times: string[];
    }>,
    
    // Menstrual (if applicable)
    trackMenstrual: false,
    basalTempTime: "07:00",
    
    // Daily Tracking
    trackingTimes: [] as string[],
    
    // Research
    researchConsent: false,
    researchDataTypes: {
      seizureData: false,
      parkinsonData: false,
      medicationData: false,
      menstrualData: false,
      dailyWellness: false,
      movementData: false,
      demographics: false
    }
  });

  const updateFormData = (updates: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
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
      
      setCurrentStep(nextStep);
    } else {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // Get condition UUIDs from database
        const conditionNames = formData.selectedConditions.map(id => conditionIdToName[id]).filter(Boolean);

        const { data: dbConditions } = await supabase
          .from('conditions')
          .select('id, name')
          .in('name', conditionNames);

        const conditionUUIDs = (dbConditions || []).map(c => c.id);

        // Use the hook to save all onboarding data
        const result = await saveOnboarding(user.id, {
          firstName: formData.firstName,
          lastName: formData.lastName,
          middleName: formData.middleName,
          dateOfBirth: formData.dateOfBirth ? formData.dateOfBirth.toISOString().split('T')[0] : '',
          gender: formData.gender,
          selectedConditions: conditionUUIDs,
          medications: formData.medications,
          trackMenstrual: formData.trackMenstrual,
          basalTempTime: formData.basalTempTime,
          trackingTimes: formData.trackingTimes,
          emergencyContactName: formData.emergencyContactName,
          emergencyContactPhone: formData.emergencyContactPhone,
          carerEmail: formData.carerEmail,
          researchConsent: formData.researchConsent,
          researchDataTypes: formData.researchDataTypes
        });

        if (result.success) {
          onComplete(formData);
        }
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

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoStep
            firstName={formData.firstName}
            lastName={formData.lastName}
            middleName={formData.middleName}
            gender={formData.gender}
            dateOfBirth={formData.dateOfBirth}
            onUpdate={(data) => updateFormData(data)}
          />
        );

      case 2:
        return (
          <EmergencyContactStep
            emergencyContactName={formData.emergencyContactName}
            emergencyContactPhone={formData.emergencyContactPhone}
            carerEmail={formData.carerEmail}
            onUpdate={(data) => updateFormData(data)}
          />
        );

      case 3:
        return (
          <ConditionsStep
            selectedConditions={formData.selectedConditions}
            onUpdate={(conditionIds) => updateFormData({ selectedConditions: conditionIds })}
          />
        );

      case 4:
        return (
          <MedicationStep
            medications={formData.medications}
            onUpdate={(meds) => updateFormData({ medications: meds })}
          />
        );

      case 5:
        // Only show for female users
        return (
          <MenstrualTrackingStep
            trackMenstrual={formData.trackMenstrual}
            basalTempTime={formData.basalTempTime}
            onUpdate={(data) => updateFormData(data)}
            hasEpilepsy={formData.selectedConditions.includes('epilepsy')}
          />
        );

      case 6:
        return (
          <DailyTrackingStep
            trackingTimes={formData.trackingTimes}
            basalTempTime={formData.trackMenstrual ? formData.basalTempTime : undefined}
            medicationTimes={formData.medications.flatMap(m => m.times)}
            medications={formData.medications}
            tracksMenstrual={formData.trackMenstrual}
            onUpdate={(times) => updateFormData({ trackingTimes: times })}
          />
        );

      case 7:
        return (
          <ResearchConsentStep
            shareResearch={formData.researchConsent}
            dataTypes={formData.researchDataTypes}
            onUpdate={(data) => updateFormData({ 
              researchConsent: data.shareResearch,
              researchDataTypes: data.dataTypes 
            })}
            hasEpilepsy={formData.selectedConditions.includes('epilepsy')}
            hasParkinsons={formData.selectedConditions.includes('parkinsons')}
            tracksMenstrual={formData.trackMenstrual}
          />
        );

      case 8:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Activity className="h-12 w-12 text-teal-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground">Ready for Your First Tracking!</h2>
              <p className="text-muted-foreground">
                Let's establish your baseline with your first health check-in
              </p>
            </div>
            
            <Card className="p-6 bg-card border-border">
              <div className="text-center space-y-6">
                <div>
                  <span className="text-4xl">⭐</span>
                  <h3 className="text-xl font-bold text-foreground mt-3">
                    Your NeuroLoop Profile is Complete!
                  </h3>
                  <p className="text-muted-foreground mt-2">
                    Now let's capture your first health data to establish your personal baseline.
                  </p>
                </div>

                {/* Summary Cards */}
                <div className="space-y-3">
                  <Card className="p-4 bg-background/50 border-border">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">✓</span>
                      <div className="text-left flex-1">
                        <div className="font-semibold text-foreground">Profile Complete</div>
                        <div className="text-sm text-muted-foreground">Personal & medical info</div>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4 bg-background/50 border-border">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl text-purple-500">2</span>
                      <div className="text-left flex-1">
                        <div className="font-semibold text-foreground">Daily Check-ins</div>
                        <div className="text-sm text-muted-foreground">Scheduled tracking times</div>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4 bg-background/50 border-border">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl text-teal-500">→</span>
                      <div className="text-left flex-1">
                        <div className="font-semibold text-foreground">First Tracking</div>
                        <div className="text-sm text-muted-foreground">Establish baseline</div>
                      </div>
                    </div>
                  </Card>
                </div>

                <Button
                  onClick={handleNext}
                  className="w-full bg-gradient-to-r from-teal-600 to-purple-600 hover:from-teal-700 hover:to-purple-700 text-white text-lg py-6 shadow-lg"
                >
                  <span className="mr-2">🚀</span>
                  Start My Health Journey
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
        return formData.firstName && formData.lastName && formData.gender && !!formData.dateOfBirth;
      case 2:
        return formData.emergencyContactName && formData.emergencyContactPhone;
      case 3:
        return formData.selectedConditions.length > 0;
      case 4:
        return true; // Medications optional
      case 5:
        return true; // Menstrual tracking optional
      case 6:
        return true; // Tracking times optional
      case 7:
        return true; // Research consent optional
      case 8:
        return true; // Final step
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-4">
        {/* Top Progress Section */}
        <div className="mb-6">
          {/* Step Counter */}
          <div className="flex justify-between items-center mb-4 text-sm">
            <span className="text-muted-foreground">Step {currentStep} of {getMaxSteps()}</span>
            <span className="text-muted-foreground">{Math.round((currentStep / getMaxSteps()) * 100)}% Complete</span>
          </div>

          {/* Beautiful Gradient Progress Bar */}
          <div className="w-full h-2 bg-secondary/20 rounded-full overflow-hidden mb-6">
            <div 
              className="h-full bg-gradient-to-r from-teal-500 via-cyan-500 to-purple-600 transition-all duration-500 ease-out rounded-full"
              style={{ width: `${(currentStep / getMaxSteps()) * 100}%` }}
            />
          </div>

          {/* Step Navigation Icons */}
          <div className="flex justify-center gap-3 mb-6">
            {onboardingSteps
              .filter((_, index) => formData.gender === "female" || index !== 4) // Skip menstrual if not female
              .map((step, index) => {
                const actualStep = formData.gender === "female" ? step.id : (step.id > 4 ? step.id - 1 : step.id);
                const StepIcon = step.icon;
                const isActive = currentStep === actualStep;
                const isCompleted = currentStep > actualStep;
                
                return (
                  <div
                    key={step.id}
                    className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                      isActive
                        ? 'border-teal-500 bg-teal-500/20 shadow-[0_0_15px_rgba(20,184,166,0.5)]'
                        : isCompleted
                        ? 'border-teal-500/50 bg-teal-500/10'
                        : 'border-muted bg-background/50'
                    }`}
                  >
                    <StepIcon
                      className={`h-5 w-5 transition-colors duration-300 ${
                        isActive
                          ? 'text-teal-400'
                          : isCompleted
                          ? 'text-teal-500/70'
                          : 'text-muted-foreground'
                      }`}
                    />
                  </div>
                );
              })}
          </div>
        </div>

        {/* Step Content */}
        <Card className="p-6 md:p-8 bg-card border-border">
          {renderStepContent()}
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={handleBack}
            className="flex items-center border-2"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={!isStepValid()}
            className="flex items-center bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white shadow-lg"
          >
            {currentStep === getMaxSteps() ? "Complete Setup" : "Continue"}
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}

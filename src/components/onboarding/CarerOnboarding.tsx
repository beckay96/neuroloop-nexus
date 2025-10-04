import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { 
  User,
  Phone,
  Heart,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface CarerOnboardingProps {
  onComplete: (data: any) => void;
  onBack: () => void;
}

const relationships = [
  "Spouse/Partner",
  "Parent",
  "Child", 
  "Sibling",
  "Friend",
  "Caregiver",
  "Other Family Member",
  "Healthcare Worker"
];

export default function CarerOnboarding({ onComplete, onBack }: CarerOnboardingProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    phoneNumber: "",
    patientDateOfBirth: "",
    relationshipToPatient: ""
  });

  const updateFormData = (updates: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleNext = async () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    } else {
      try {
        // Save carer onboarding data
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { error: carerError } = await supabase
          .from('carer_profiles')
          .upsert([{
            user_id: user.id,
            first_name: formData.firstName,
            last_name: formData.lastName,
            relationship: formData.relationshipToPatient as any
          }], { onConflict: 'user_id' });

        if (carerError) {
          console.error('Error saving carer data:', carerError);
          return;
        }

        // Mark onboarding complete
        const { error: progressError } = await supabase
          .from('profiles')
          .upsert([{
            id: user.id,
            user_type: 'carer' as const,
            onboarding_completed: true
          }]);

        if (progressError) {
          console.error('Error updating progress:', progressError);
        }

        onComplete(formData);
      } catch (error) {
        console.error('Error during onboarding:', error);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    } else {
      onBack();
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <User className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Your Information</h2>
              <p className="text-muted-foreground">Tell us about yourself</p>
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
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => updateFormData({ dateOfBirth: e.target.value })}
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="phoneNumber">Phone Number *</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => updateFormData({ phoneNumber: e.target.value })}
                  placeholder="For emergency contact by patient"
                />
                <p className="text-sm text-muted-foreground">
                  This allows patients to quickly call you during emergencies
                </p>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Patient Connection</h2>
              <p className="text-muted-foreground">Help us verify your connection to the patient</p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="relationship">Your Relationship to Patient *</Label>
                <Select onValueChange={(value) => updateFormData({ relationshipToPatient: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border border-border z-50">
                    {relationships.map((relationship) => (
                      <SelectItem key={relationship} value={relationship}>
                        {relationship}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="patientDateOfBirth">Patient's Date of Birth *</Label>
                <Input
                  id="patientDateOfBirth"
                  type="date"
                  value={formData.patientDateOfBirth}
                  onChange={(e) => updateFormData({ patientDateOfBirth: e.target.value })}
                />
                <p className="text-sm text-muted-foreground">
                  This helps us verify you're authorized to care for this patient
                </p>
              </div>
            </div>
            
            <div className="bg-warning/10 border border-warning/20 p-4 rounded-lg">
              <p className="text-sm text-warning-foreground">
                ⚠️ <strong>Privacy Note:</strong> You'll only have access to information 
                the patient explicitly shares with you. All data sharing requires patient consent.
              </p>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Phone className="h-12 w-12 text-success mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Setup Complete!</h2>
              <p className="text-muted-foreground">You're ready to support your patient</p>
            </div>
            
            <Card className="p-6 bg-gradient-subtle">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">What's Next?</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                    <div>
                      <p className="font-medium">Patient Authorization</p>
                      <p className="text-sm text-muted-foreground">
                        The patient will need to authorize your access to their health data
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                    <div>
                      <p className="font-medium">Emergency Features</p>
                      <p className="text-sm text-muted-foreground">
                        Quick access to emergency logging and contact features
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                    <div>
                      <p className="font-medium">Care Coordination</p>
                      <p className="text-sm text-muted-foreground">
                        Help with medication reminders and symptom tracking
                      </p>
                    </div>
                  </div>
                </div>
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
        return formData.firstName && formData.lastName && formData.dateOfBirth && formData.phoneNumber;
      case 2:
        return formData.relationshipToPatient && formData.patientDateOfBirth;
      case 3:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-muted-foreground">
              Step {currentStep} of 3
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round((currentStep / 3) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-muted h-2 rounded-full">
            <div 
              className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <Card className="medical-card p-8">
          {renderStepContent()}
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handleBack}
            className="flex items-center"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <Button
            variant="hero"
            onClick={handleNext}
            disabled={!isStepValid()}
            className="flex items-center"
          >
            {currentStep === 3 ? "Complete Setup" : "Continue"}
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
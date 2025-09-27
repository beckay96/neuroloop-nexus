import { useState } from "react";
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
import { 
  Heart,
  User,
  Phone,
  Calendar,
  Clock,
  Shield,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

interface PatientOnboardingProps {
  onComplete: (data: any) => void;
  onBack: () => void;
}

const onboardingSteps = [
  { id: 1, title: "Personal Information", icon: User },
  { id: 2, title: "Emergency Contact", icon: Phone },
  { id: 3, title: "Medical Conditions", icon: Heart },
  { id: 4, title: "Daily Tracking", icon: Clock },
  { id: 5, title: "Menstrual Cycle", icon: Calendar },
  { id: 6, title: "Research Consent", icon: Shield }
];

const conditions = [
  { id: "epilepsy", name: "Epilepsy", category: "seizure" },
  { id: "seizure_other", name: "Other Seizure Disorders", category: "seizure" },
  { id: "parkinsons", name: "Parkinson's Disease", category: "movement" },
  { id: "movement_other", name: "Other Movement Disorders", category: "movement" },
  { id: "multiple_sclerosis", name: "Multiple Sclerosis", category: "neurological" },
  { id: "essential_tremor", name: "Essential Tremor", category: "movement" }
];

const trackingTimes = [
  "8:00 AM", "12:00 PM", "4:00 PM", "8:00 PM", "10:00 PM"
];

export default function PatientOnboarding({ onComplete, onBack }: PatientOnboardingProps) {
  const [currentStep, setCurrentStep] = useState(1);
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
    
    // Tracking
    preferredTimes: [] as string[],
    
    // Menstrual (if applicable)
    trackMenstrual: false,
    
    // Research
    shareResearchData: false,
    researchDataTypes: [] as string[]
  });

  const updateFormData = (updates: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (currentStep < getMaxSteps()) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete(formData);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    } else {
      onBack();
    }
  };

  const getMaxSteps = () => {
    // Skip menstrual cycle step if not female
    return formData.gender === "female" ? 6 : 5;
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
                <Select onValueChange={(value) => updateFormData({ gender: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => updateFormData({ dateOfBirth: e.target.value })}
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
                  placeholder="Optional - for carer portal invite"
                />
                <p className="text-sm text-muted-foreground">
                  We'll send them an invite to access the carer portal (optional)
                </p>
              </div>
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {conditions.map((condition) => (
                <Card key={condition.id} className="p-4">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id={condition.id}
                      checked={formData.selectedConditions.includes(condition.id)}
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
                    />
                    <Label htmlFor={condition.id} className="font-medium">
                      {condition.name}
                    </Label>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Daily Tracking Times</h2>
              <p className="text-muted-foreground">When would you like to track your symptoms?</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {trackingTimes.map((time) => (
                <Card key={time} className="p-4 cursor-pointer hover:shadow-glow-primary transition-all">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id={time}
                      checked={formData.preferredTimes.includes(time)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          updateFormData({
                            preferredTimes: [...formData.preferredTimes, time]
                          });
                        } else {
                          updateFormData({
                            preferredTimes: formData.preferredTimes.filter(t => t !== time)
                          });
                        }
                      }}
                    />
                    <Label htmlFor={time} className="font-medium">
                      {time}
                    </Label>
                  </div>
                </Card>
              ))}
            </div>
            
            <div className="bg-accent p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">
                💡 <strong>Tip:</strong> Choose times that work with your daily routine. 
                You can always adjust these later in settings.
              </p>
            </div>
          </div>
        );

      case 5:
        if (formData.gender !== "female") {
          // Skip to next step for non-female users
          setCurrentStep(6);
          return null;
        }
        
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Menstrual Cycle Tracking</h2>
              <p className="text-muted-foreground">Optional - helps identify patterns with seizures</p>
            </div>
            
            <Card className="p-6">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="trackMenstrual"
                  checked={formData.trackMenstrual}
                  onCheckedChange={(checked) => updateFormData({ trackMenstrual: !!checked })}
                />
                <div className="flex-1">
                  <Label htmlFor="trackMenstrual" className="font-medium text-base">
                    Track menstrual cycle and basal temperature
                  </Label>
                  <p className="text-sm text-muted-foreground mt-2">
                    Catamenial epilepsy affects up to 40% of women with epilepsy. 
                    Tracking your cycle can help identify seizure patterns related to hormonal changes.
                  </p>
                </div>
              </div>
            </Card>
            
            {formData.trackMenstrual && (
              <Card className="p-4 bg-accent">
                <p className="text-sm">
                  <strong>What we'll track:</strong> Cycle start/end dates, flow intensity, 
                  symptoms, and correlation with seizures or other neurological symptoms.
                </p>
              </Card>
            )}
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Research Contribution</h2>
              <p className="text-muted-foreground">Help advance neurological research (completely optional)</p>
            </div>
            
            <Card className="p-6">
              <div className="flex items-start space-x-3 mb-4">
                <Checkbox
                  id="shareResearchData"
                  checked={formData.shareResearchData}
                  onCheckedChange={(checked) => updateFormData({ shareResearchData: !!checked })}
                />
                <div className="flex-1">
                  <Label htmlFor="shareResearchData" className="font-medium text-base">
                    Share anonymized data for research
                  </Label>
                  <p className="text-sm text-muted-foreground mt-2">
                    Your anonymized data helps researchers develop better treatments. 
                    You maintain complete control over what is shared.
                  </p>
                </div>
              </div>
              
              {formData.shareResearchData && (
                <div className="ml-6 space-y-3 border-l-2 border-primary pl-4">
                  <p className="font-medium text-sm">Choose what to share:</p>
                  {[
                    { id: "symptoms", label: "Symptom tracking data" },
                    { id: "medications", label: "Medication information" },
                    { id: "seizures", label: "Seizure logs" },
                    { id: "demographics", label: "Age, gender, condition type" },
                    { id: "outcomes", label: "Treatment outcomes" }
                  ].map((item) => (
                    <div key={item.id} className="flex items-center space-x-2">
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
                      <Label htmlFor={item.id} className="text-sm">
                        {item.label}
                      </Label>
                    </div>
                  ))}
                </div>
              )}
            </Card>
            
            <div className="bg-success/10 border border-success/20 p-4 rounded-lg">
              <p className="text-sm text-success-foreground">
                🔒 <strong>Your privacy is protected:</strong> All data is anonymized, 
                encrypted, and you can withdraw consent at any time.
              </p>
            </div>
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
        return formData.preferredTimes.length > 0;
      case 5:
        return true; // Optional step
      case 6:
        return true; // Optional step
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
              Step {currentStep} of {getMaxSteps()}
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round((currentStep / getMaxSteps()) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-muted h-2 rounded-full">
            <div 
              className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / getMaxSteps()) * 100}%` }}
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
            {currentStep === getMaxSteps() ? "Complete Setup" : "Continue"}
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
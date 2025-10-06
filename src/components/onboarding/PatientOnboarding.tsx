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
import { usePatientOnboarding } from "@/hooks/usePatientOnboarding";
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
    description: "A neurological disorder affecting 65 million people worldwide. Characterized by recurring seizures due to abnormal electrical activity in the brain.",
    icon: Zap,
    color: "text-red-500",
    bgColor: "bg-red-50 dark:bg-red-950/20",
    borderColor: "border-red-200 dark:border-red-800"
  },
  { 
    id: "parkinsons", 
    name: "Parkinson's Disease", 
    category: "movement",
    description: "A progressive neurodegenerative disorder affecting over 10 million people globally. Causes tremor, rigidity, slowness of movement, and balance problems.",
    icon: Brain,
    color: "text-purple-500",
    bgColor: "bg-purple-50 dark:bg-purple-950/20",
    borderColor: "border-purple-200 dark:border-purple-800"
  },
  { 
    id: "seizure_other", 
    name: "Other Seizure Disorders", 
    category: "seizure",
    description: "Various seizure conditions including focal seizures, absence seizures, and rare epileptic syndromes.",
    icon: AlertTriangle,
    color: "text-orange-500",
    bgColor: "bg-orange-50 dark:bg-orange-950/20",
    borderColor: "border-orange-200 dark:border-orange-800"
  },
  { 
    id: "essential_tremor", 
    name: "Essential Tremor", 
    category: "movement",
    description: "The most common movement disorder, causing rhythmic shaking especially in hands and arms.",
    icon: Activity,
    color: "text-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
    borderColor: "border-blue-200 dark:border-blue-800"
  },
  { 
    id: "movement_other", 
    name: "Other Movement Disorders", 
    category: "movement",
    description: "Neurological conditions affecting voluntary or involuntary movements, including dystonia, chorea, ataxia, and tics.",
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
  const { saveOnboarding } = usePatientOnboarding();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    
    // Emergency Contact
    emergencyContactName: "",
    emergencyContactPhone: "",
    carerEmail: "",
    
    // Conditions
    selectedConditions: [] as string[],
    
    // Medications
    medications: [] as Array<{
      name: string;
      dosage: string;
      frequency: string;
    }>,
    
    // Menstrual (if applicable)
    trackMenstrual: false,
    
    // Research
    researchConsent: false
  });

  // Load medications from database
  useEffect(() => {
    loadMedications();
  }, []);

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
        const conditionNames = formData.selectedConditions.map(id => {
          const condition = conditions.find(c => c.id === id);
          return condition?.name;
        }).filter(Boolean);

        const { data: dbConditions } = await supabase
          .from('conditions')
          .select('id, name')
          .in('name', conditionNames);

        const conditionUUIDs = (dbConditions || []).map(c => c.id);

        // Use the hook to save all onboarding data
        const result = await saveOnboarding(user.id, {
          firstName: formData.firstName,
          lastName: formData.lastName,
          dateOfBirth: formData.dateOfBirth,
          gender: formData.gender,
          selectedConditions: conditionUUIDs,
          medications: formData.medications,
          trackMenstrual: formData.trackMenstrual,
          emergencyContactName: formData.emergencyContactName,
          emergencyContactPhone: formData.emergencyContactPhone,
          researchConsent: formData.researchConsent
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

  const addMedication = () => {
    updateFormData({
      medications: [...formData.medications, { name: "", dosage: "", frequency: "once_daily" }]
    });
  };

  const updateMedication = (index: number, field: keyof typeof formData.medications[0], value: string) => {
    const newMeds = [...formData.medications];
    newMeds[index] = { ...newMeds[index], [field]: value };
    updateFormData({ medications: newMeds });
  };

  const removeMedication = (index: number) => {
    updateFormData({
      medications: formData.medications.filter((_, i) => i !== index)
    });
  };

  const toggleCondition = (conditionId: string) => {
    const isSelected = formData.selectedConditions.includes(conditionId);
    updateFormData({
      selectedConditions: isSelected
        ? formData.selectedConditions.filter(id => id !== conditionId)
        : [...formData.selectedConditions, conditionId]
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <User className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Personal Information</h2>
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
                <Label htmlFor="gender">Gender *</Label>
                <Select onValueChange={(value) => updateFormData({ gender: value })} value={formData.gender}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border border-border z-50">
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="non_binary">Non-binary</SelectItem>
                    <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="dob">Date of Birth *</Label>
                <CustomDatePicker
                  value={formData.dateOfBirth}
                  onChange={(date) => updateFormData({ dateOfBirth: date })}
                  maxDate={new Date()}
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
              <p className="text-muted-foreground">Who should we contact in case of emergency?</p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="emergencyName">Contact Name *</Label>
                <Input
                  id="emergencyName"
                  value={formData.emergencyContactName}
                  onChange={(e) => updateFormData({ emergencyContactName: e.target.value })}
                  placeholder="Full name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="emergencyPhone">Contact Phone *</Label>
                <Input
                  id="emergencyPhone"
                  type="tel"
                  value={formData.emergencyContactPhone}
                  onChange={(e) => updateFormData({ emergencyContactPhone: e.target.value })}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="carerEmail">Contact Email (Optional)</Label>
                <Input
                  id="carerEmail"
                  type="email"
                  value={formData.carerEmail}
                  onChange={(e) => updateFormData({ carerEmail: e.target.value })}
                  placeholder="email@example.com"
                />
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
            
            <div className="grid grid-cols-1 gap-4">
              {conditions.map((condition) => {
                const Icon = condition.icon;
                const isSelected = formData.selectedConditions.includes(condition.id);
                
                return (
                  <Card
                    key={condition.id}
                    className={`p-4 cursor-pointer transition-all ${
                      isSelected
                        ? `${condition.bgColor} ${condition.borderColor} border-2`
                        : 'border hover:border-primary/50'
                    }`}
                    onClick={() => toggleCondition(condition.id)}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${condition.bgColor}`}>
                        <Icon className={`h-6 w-6 ${condition.color}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">{condition.name}</h3>
                          <Checkbox checked={isSelected} />
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {condition.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Pill className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Current Medications</h2>
              <p className="text-muted-foreground">Add any medications you're currently taking</p>
            </div>
            
            <div className="space-y-4">
              {formData.medications.map((med, index) => (
                <Card key={index} className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Medication {index + 1}</Label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeMedication(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="space-y-2">
                        <Label>Name *</Label>
                        <Input
                          value={med.name}
                          onChange={(e) => updateMedication(index, 'name', e.target.value)}
                          placeholder="Medication name"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Dosage *</Label>
                        <Input
                          value={med.dosage}
                          onChange={(e) => updateMedication(index, 'dosage', e.target.value)}
                          placeholder="e.g., 500mg"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Frequency *</Label>
                        <Select
                          value={med.frequency}
                          onValueChange={(value) => updateMedication(index, 'frequency', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-popover border border-border z-50">
                            <SelectItem value="once_daily">Once daily</SelectItem>
                            <SelectItem value="twice_daily">Twice daily</SelectItem>
                            <SelectItem value="three_times_daily">Three times daily</SelectItem>
                            <SelectItem value="as_needed">As needed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
              
              <Button
                variant="outline"
                onClick={addMedication}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Medication
              </Button>
            </div>
          </div>
        );

      case 5:
        // Only show for female users
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Menstrual Cycle Tracking</h2>
              <p className="text-muted-foreground">
                Track your menstrual cycle for better health insights
              </p>
            </div>
            
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <Checkbox
                  id="trackMenstrual"
                  checked={formData.trackMenstrual}
                  onCheckedChange={(checked) => updateFormData({ trackMenstrual: checked as boolean })}
                />
                <div className="flex-1">
                  <Label htmlFor="trackMenstrual" className="text-base font-semibold cursor-pointer">
                    Enable menstrual cycle tracking
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Tracking your cycle can help identify patterns related to your condition, 
                    especially for conditions like epilepsy where hormonal changes may affect symptoms.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Daily Tracking</h2>
              <p className="text-muted-foreground">
                Set your preferred tracking times
              </p>
            </div>
            
            <Card className="p-6">
              <p className="text-sm text-muted-foreground">
                You'll be able to customize your tracking preferences and reminders after completing onboarding.
              </p>
            </Card>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Research Consent</h2>
              <p className="text-muted-foreground">
                Help advance medical research (completely optional)
              </p>
            </div>
            
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <Checkbox
                  id="researchConsent"
                  checked={formData.researchConsent}
                  onCheckedChange={(checked) => updateFormData({ researchConsent: checked as boolean })}
                />
                <div className="flex-1">
                  <Label htmlFor="researchConsent" className="text-base font-semibold cursor-pointer">
                    Share anonymized data for research
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your data will be completely anonymized and used only for approved medical research.
                    You can change this setting at any time.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        );

      case 8:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Activity className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold">You're All Set!</h2>
              <p className="text-muted-foreground">
                Ready to start tracking your health journey
              </p>
            </div>
            
            <Card className="p-6">
              <div className="text-center space-y-4">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
                <p className="text-lg font-semibold">
                  Your account is ready!
                </p>
                <p className="text-sm text-muted-foreground">
                  Click "Complete Setup" to access your dashboard and start tracking.
                </p>
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
        return formData.firstName && formData.lastName && formData.gender && formData.dateOfBirth;
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
              className="bg-gradient-secondary h-2 rounded-full transition-all duration-300"
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
            variant="secondary"
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

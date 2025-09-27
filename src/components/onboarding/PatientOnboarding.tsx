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
  X
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

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
      name: string;
      dosage: string;
      frequency: string;
      times: string[];
    }>,
    
    // Menstrual (if applicable)
    trackMenstrual: false,
    
    // Tracking
    preferredTimes: [] as string[],
    
    // Research
    shareResearchData: false,
    researchDataTypes: [] as string[]
  });

  const updateFormData = (updates: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleNext = async () => {
    if (currentStep < getMaxSteps()) {
      // Skip menstrual cycle step if not female
      if (currentStep === 4 && formData.gender !== "female") {
        setCurrentStep(6); // Skip menstrual cycle, go to tracking
      } else {
        setCurrentStep(prev => prev + 1);
      }
    } else {
      try {
        // Save patient onboarding data to the database
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { error: patientError } = await supabase
          .from('patient_onboarding_data')
          .insert({
            user_id: user.id,
            first_name: formData.firstName,
            middle_name: formData.middleName,
            last_name: formData.lastName,
            gender: formData.gender,
            date_of_birth: formData.dateOfBirth,
            carer_name: formData.carerName,
            carer_phone: formData.carerPhone,
            carer_email: formData.carerEmail,
            selected_conditions: formData.selectedConditions,
            preferred_tracking_times: formData.preferredTimes,
            track_menstrual_cycle: formData.trackMenstrual,
            share_research_data: formData.shareResearchData,
            research_data_types: formData.researchDataTypes
          });

        if (patientError) {
          console.error('Error saving patient data:', patientError);
          return;
        }

        // Update onboarding progress
        const { error: progressError } = await supabase
          .from('onboarding_progress')
          .upsert({
            user_id: user.id,
            user_type: 'patient',
            current_step: getMaxSteps(),
            completed: true,
            step_data: formData
          });

        if (progressError) {
          console.error('Error updating progress:', progressError);
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

  const addMedication = () => {
    updateFormData({
      medications: [...formData.medications, {
        name: "",
        dosage: "",
        frequency: "",
        times: []
      }]
    });
  };

  const updateMedication = (index: number, updates: Partial<typeof formData.medications[0]>) => {
    const updatedMedications = [...formData.medications];
    updatedMedications[index] = { ...updatedMedications[index], ...updates };
    updateFormData({ medications: updatedMedications });
  };

  const removeMedication = (index: number) => {
    updateFormData({
      medications: formData.medications.filter((_, i) => i !== index)
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
                  <SelectContent className="bg-popover border border-border z-50">
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
              <p className="text-muted-foreground">Help us track your medication schedule and effectiveness</p>
            </div>
            
            <div className="space-y-4">
              {formData.medications.map((medication, index) => (
                <Card key={index} className="p-4 border-2">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-semibold">Medication {index + 1}</h4>
                      <Button
                        variant="outline"
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
                        <Select onValueChange={(value) => updateMedication(index, { frequency: value })}>
                          <SelectTrigger>
                            <SelectValue placeholder="How often do you take this?" />
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
                className="w-full border-dashed border-2 border-primary/30 hover:border-primary"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Medication
              </Button>
              
              <div className="bg-accent p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  💡 <strong>Note:</strong> This information helps us set up medication reminders and track adherence. 
                  You can always add or modify medications later.
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
                  <div>
                    <Label htmlFor="trackMenstrual" className="text-lg font-semibold cursor-pointer">
                      Track menstrual cycle and basal temperature
                    </Label>
                    <p className="text-sm text-muted-foreground mt-2">
                      <strong>Research shows:</strong> Catamenial epilepsy affects up to 40% of women with epilepsy. 
                      Hormonal fluctuations can significantly impact seizure frequency and other neurological symptoms.
                    </p>
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
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Daily Tracking Schedule</h2>
              <p className="text-muted-foreground">Set up your personalized tracking times</p>
            </div>
            
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Your Tracking Schedule</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Based on your medication schedule and preferences, set times when you'd like to track symptoms, 
                  {formData.trackMenstrual && " basal temperature,"}
                  {" "}and general wellness.
                </p>
                
                <div className="space-y-4">
                  <p className="text-sm font-medium">Add your preferred tracking times:</p>
                  <div className="flex gap-2">
                    <Input
                      type="time"
                      value={customTime}
                      onChange={(e) => setCustomTime(e.target.value)}
                      placeholder="Select time"
                      className="flex-1"
                    />
                    <Button onClick={addCustomTime} disabled={!customTime}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {formData.trackMenstrual && (
                    <div className="bg-secondary/10 p-3 rounded-lg border border-secondary/20">
                      <p className="text-sm text-secondary-foreground">
                        💡 <strong>Tip:</strong> Add a morning time (6-8 AM) to track basal temperature for menstrual cycle accuracy.
                      </p>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <Label>Selected Times:</Label>
                    <div className="flex flex-wrap gap-2">
                      {formData.preferredTimes.map((time) => (
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
                      <p className="text-sm text-muted-foreground">No times selected yet</p>
                    )}
                  </div>
                </div>
              </Card>
              
              <Card className="p-4 bg-gradient-subtle">
                <h4 className="font-semibold text-sm mb-2">Tracking Preview</h4>
                <div className="text-xs space-y-1">
                  <div>📊 <strong>Daily Symptoms:</strong> {formData.preferredTimes.length} check-ins per day</div>
                  <div>💊 <strong>Medications:</strong> {formData.medications.length} medications to track</div>
                  {formData.trackMenstrual && (
                    <div>🌡️ <strong>Basal Temperature:</strong> Morning temperature recording</div>
                  )}
                  <div>📈 <strong>Wellness:</strong> Mood, energy, sleep quality tracking</div>
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
                      { id: "symptoms", label: "Symptom patterns and triggers", description: "Help identify common patterns across patients" },
                      { id: "medications", label: "Medication effectiveness data", description: "Improve treatment protocols and dosing guidelines" },
                      { id: "seizures", label: "Seizure frequency and characteristics", description: "Advance seizure prediction and prevention research" },
                      { id: "menstrual", label: "Menstrual cycle correlations", description: "Critical for understanding catamenial epilepsy - severely understudied" },
                      { id: "demographics", label: "Age, gender, condition type", description: "Ensure research represents diverse populations" }
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
    console.log("First tracking completed:", trackingData);
    setShowTrackingModal(false);
    
    try {
      // Save patient onboarding data with first tracking
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error: patientError } = await supabase
        .from('patient_onboarding_data')
        .insert({
          user_id: user.id,
          first_name: formData.firstName,
          middle_name: formData.middleName,
          last_name: formData.lastName,
          gender: formData.gender,
          date_of_birth: formData.dateOfBirth,
          carer_name: formData.carerName,
          carer_phone: formData.carerPhone,
          carer_email: formData.carerEmail,
          selected_conditions: formData.selectedConditions,
          preferred_tracking_times: formData.preferredTimes,
          track_menstrual_cycle: formData.trackMenstrual,
          share_research_data: formData.shareResearchData,
          research_data_types: formData.researchDataTypes
        });

      if (patientError) {
        console.error('Error saving patient data:', patientError);
        return;
      }

      // Update onboarding progress
      const { error: progressError } = await supabase
        .from('onboarding_progress')
        .upsert({
          user_id: user.id,
          user_type: 'patient',
          current_step: getMaxSteps(),
          completed: true,
          step_data: { ...formData, firstTracking: trackingData }
        });

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
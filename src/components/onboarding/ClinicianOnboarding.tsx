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
import { 
  User,
  Stethoscope,
  Mail,
  ChevronLeft,
  ChevronRight,
  Plus,
  X
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface ClinicianOnboardingProps {
  onComplete: (data: any) => void;
  onBack: () => void;
}

const specialties = [
  "Neurology",
  "Neuropsychology", 
  "Epileptology",
  "Movement Disorders",
  "Pediatric Neurology",
  "Clinical Research",
  "General Medicine",
  "Other"
];

export default function ClinicianOnboarding({ onComplete, onBack }: ClinicianOnboardingProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    clinicianTitle: "",
    specialty: "",
    institution: "",
    licenseNumber: "",
    patientInviteEmails: [] as string[]
  });

  const [newEmail, setNewEmail] = useState("");

  const updateFormData = (updates: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const addPatientEmail = () => {
    if (newEmail && newEmail.includes("@")) {
      updateFormData({
        patientInviteEmails: [...formData.patientInviteEmails, newEmail]
      });
      setNewEmail("");
    }
  };

  const removePatientEmail = (index: number) => {
    updateFormData({
      patientInviteEmails: formData.patientInviteEmails.filter((_, i) => i !== index)
    });
  };

  const handleNext = async () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    } else {
      try {
        // Save clinician onboarding data
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { error: clinicianError } = await supabase
          .from('clinician_onboarding_data')
          .insert({
            user_id: user.id,
            first_name: formData.firstName,
            middle_name: formData.middleName,
            last_name: formData.lastName,
            clinician_title: formData.clinicianTitle,
            specialty: formData.specialty,
            institution: formData.institution,
            license_number: formData.licenseNumber,
            patient_invite_emails: formData.patientInviteEmails
          });

        if (clinicianError) {
          console.error('Error saving clinician data:', clinicianError);
          return;
        }

        // Update onboarding progress
        const { error: progressError } = await supabase
          .from('onboarding_progress')
          .upsert({
            user_id: user.id,
            user_type: 'clinician',
            current_step: 3,
            completed: true,
            step_data: formData
          });

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
              <h2 className="text-2xl font-bold">Professional Information</h2>
              <p className="text-muted-foreground">Tell us about your medical practice</p>
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
                <Label htmlFor="title">Professional Title *</Label>
                <Input
                  id="title"
                  value={formData.clinicianTitle}
                  onChange={(e) => updateFormData({ clinicianTitle: e.target.value })}
                  placeholder="Dr, Prof, etc."
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="specialty">Specialty *</Label>
                <Select onValueChange={(value) => updateFormData({ specialty: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your specialty" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border border-border z-50">
                    {specialties.map((specialty) => (
                      <SelectItem key={specialty} value={specialty}>
                        {specialty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Stethoscope className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Institution Details</h2>
              <p className="text-muted-foreground">Where do you practice?</p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="institution">Institution/Hospital *</Label>
                <Input
                  id="institution"
                  value={formData.institution}
                  onChange={(e) => updateFormData({ institution: e.target.value })}
                  placeholder="Enter your institution name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="license">Medical License Number</Label>
                <Input
                  id="license"
                  value={formData.licenseNumber}
                  onChange={(e) => updateFormData({ licenseNumber: e.target.value })}
                  placeholder="Optional - for verification purposes"
                />
                <p className="text-sm text-muted-foreground">
                  This helps verify your credentials (optional but recommended)
                </p>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Invite Patients</h2>
              <p className="text-muted-foreground">Send invitations to your patients (optional)</p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Patient Email Addresses</Label>
                <div className="flex gap-2">
                  <Input
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="patient@example.com"
                    onKeyPress={(e) => e.key === "Enter" && addPatientEmail()}
                  />
                  <Button onClick={addPatientEmail} variant="outline" size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {formData.patientInviteEmails.length > 0 && (
                <div className="space-y-2">
                  <Label>Invited Patients</Label>
                  <div className="space-y-2">
                    {formData.patientInviteEmails.map((email, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-accent rounded-lg">
                        <span className="text-sm">{email}</span>
                        <Button
                          onClick={() => removePatientEmail(index)}
                          variant="ghost"
                          size="sm"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg">
                <p className="text-sm text-foreground">
                  💡 <strong>Tip:</strong> Patients will receive an email invitation to join NeuroLoop 
                  and connect with your clinical dashboard. You can add more patients later.
                </p>
              </div>
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
        return formData.firstName && formData.lastName && formData.clinicianTitle && formData.specialty;
      case 2:
        return formData.institution;
      case 3:
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
              Step {currentStep} of 3
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round((currentStep / 3) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-muted h-2 rounded-full">
            <div 
              className="bg-gradient-secondary h-2 rounded-full transition-all duration-300"
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
            variant="secondary"
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
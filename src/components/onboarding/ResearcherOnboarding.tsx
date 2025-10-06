import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  FlaskConical,
  Mail,
  CheckCircle,
  ChevronLeft
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface ResearcherOnboardingProps {
  onComplete: (data: any) => void;
  onBack: () => void;
}

export default function ResearcherOnboarding({ onComplete, onBack }: ResearcherOnboardingProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    institution: "",
    researchArea: "",
    requestReason: ""
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateFormData = (updates: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleSubmit = async () => {
    try {
      // Save researcher access request
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Mark researcher onboarding complete (pending approval)
      const { error: requestError } = await supabase
        .from('profiles')
        .upsert([{
          id: user.id,
          user_type: 'researcher' as const,
          onboarding_completed: true
        }]);

      if (requestError) {
        console.error('Error saving researcher request:', requestError);
        return;
      }

      // Simulate sending email to bec@elevitaai.com
      setIsSubmitted(true);
      
      // Complete after a delay to show the success message
      setTimeout(() => {
        onComplete(formData);
      }, 3000);
    } catch (error) {
      console.error('Error during researcher onboarding:', error);
    }
  };

  const isFormValid = () => {
    return formData.firstName && formData.lastName && formData.email && 
           formData.institution && formData.researchArea && formData.requestReason;
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <Card className="medical-card p-8 text-center">
            <CheckCircle className="h-16 w-16 text-success mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-4">Request Submitted Successfully!</h2>
            <p className="text-muted-foreground mb-6">
              Your research access request has been sent to our team. 
              We'll review your application and get back to you within 2-3 business days.
            </p>
            
            <div className="bg-accent p-4 rounded-lg mb-6">
              <p className="text-sm">
                <strong>What happens next?</strong><br />
                • Our research team will review your request<br />
                • We'll verify your institutional affiliation<br />
                • You'll receive an email with next steps<br />
                • Access will be granted upon approval
              </p>
            </div>
            
            <Button onClick={() => onComplete(formData)} variant="hero">
              Return to Home
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="w-full bg-muted h-2 rounded-full">
            <div className="bg-gradient-hero h-2 rounded-full w-full" />
          </div>
        </div>

        {/* Content */}
        <Card className="medical-card p-8">
          <div className="space-y-6">
            <div className="text-center mb-8">
              <FlaskConical className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Research Access Request</h2>
              <p className="text-muted-foreground">Apply for access to anonymized neurological research data</p>
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
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData({ email: e.target.value })}
                  placeholder="researcher@university.edu"
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="institution">Institution/Organization *</Label>
                <Input
                  id="institution"
                  value={formData.institution}
                  onChange={(e) => updateFormData({ institution: e.target.value })}
                  placeholder="University, hospital, or research organization"
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="researchArea">Research Area *</Label>
                <Input
                  id="researchArea"
                  value={formData.researchArea}
                  onChange={(e) => updateFormData({ researchArea: e.target.value })}
                  placeholder="e.g., Epilepsy treatment outcomes, Parkinson's progression"
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="requestReason">Research Purpose *</Label>
                <Textarea
                  id="requestReason"
                  value={formData.requestReason}
                  onChange={(e) => updateFormData({ requestReason: e.target.value })}
                  placeholder="Describe your research objectives and how you plan to use the data..."
                  rows={4}
                />
              </div>
            </div>
            
            <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg">
              <h3 className="font-semibold mb-2 flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                Application Process
              </h3>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Your request will be sent to bec@elevitaai.com</p>
                <p>• Our research team will review your application</p>
                <p>• We'll verify your institutional affiliation</p>
                <p>• Access is granted based on research merit and data usage agreement</p>
              </div>
            </div>
            
            <div className="bg-warning/10 border border-warning/20 p-4 rounded-lg">
              <p className="text-sm text-warning-foreground">
                <strong>Data Usage:</strong> All research data is anonymized and aggregated. 
                Individual patient data is never shared. Usage must comply with healthcare 
                research regulations and ethical guidelines.
              </p>
            </div>
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={onBack}
            className="flex items-center"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <Button
            variant="hero"
            onClick={handleSubmit}
            disabled={!isFormValid()}
          >
            Submit Research Request
          </Button>
        </div>
      </div>
    </div>
  );
}
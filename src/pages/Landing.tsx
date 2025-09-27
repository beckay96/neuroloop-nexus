import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import UserTypeSelector from "@/components/UserTypeSelector";
import PatientOnboarding from "@/components/onboarding/PatientOnboarding";
import ClinicianOnboarding from "@/components/onboarding/ClinicianOnboarding";
import CarerOnboarding from "@/components/onboarding/CarerOnboarding";
import ResearcherOnboarding from "@/components/onboarding/ResearcherOnboarding";
import { 
  Brain, 
  Shield, 
  Users, 
  TrendingUp,
  ChevronRight,
  Moon,
  Sun,
  Monitor
} from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import heroImage from "@/assets/hero-neural.jpg";

const features = [
  {
    icon: Brain,
    title: "Advanced Tracking",
    description: "Comprehensive symptom and medication tracking designed specifically for neurological conditions"
  },
  {
    icon: Shield, 
    title: "HIPAA Compliant",
    description: "Medical-grade security and privacy protection for all your sensitive health data"
  },
  {
    icon: Users,
    title: "Care Team Integration", 
    description: "Seamlessly share data with clinicians, researchers, and family members"
  },
  {
    icon: TrendingUp,
    title: "Research Impact",
    description: "Contribute to groundbreaking neurological research while improving your own care"
  }
];

const conditions = [
  "Epilepsy & Seizure Disorders",
  "Parkinson's Disease", 
  "Movement Disorders",
  "Essential Tremor",
  "Multiple Sclerosis",
  "And more expanding conditions..."
];

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const nextTheme = theme === "light" ? "dark" : theme === "dark" ? "system" : "light";
  const Icon = theme === "light" ? Sun : theme === "dark" ? Moon : Monitor;

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setTheme(nextTheme)}
      className="w-9 h-9 p-0"
    >
      <Icon className="h-4 w-4" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

export default function Landing() {
  const [showUserTypeSelector, setShowUserTypeSelector] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState<string>("");
  const [showOnboarding, setShowOnboarding] = useState(false);

  const handleUserTypeSelection = (userType: string) => {
    setSelectedUserType(userType);
    setShowOnboarding(true);
  };

  const handleOnboardingComplete = (data: any) => {
    console.log("Onboarding completed:", data);
    // Here you would save the data to the database and redirect to appropriate dashboard
  };

  const handleBackToTypeSelection = () => {
    setShowOnboarding(false);
    setSelectedUserType("");
  };

  // Show onboarding flow
  if (showOnboarding && selectedUserType) {
    if (selectedUserType === "patient") {
      return <PatientOnboarding onComplete={handleOnboardingComplete} onBack={handleBackToTypeSelection} />;
    } else if (selectedUserType === "clinician") {
      return <ClinicianOnboarding onComplete={handleOnboardingComplete} onBack={handleBackToTypeSelection} />;
    } else if (selectedUserType === "carer") {
      return <CarerOnboarding onComplete={handleOnboardingComplete} onBack={handleBackToTypeSelection} />;
    } else if (selectedUserType === "researcher") {
      return <ResearcherOnboarding onComplete={handleOnboardingComplete} onBack={handleBackToTypeSelection} />;
    }
  }

  if (showUserTypeSelector) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">NeuroLoop</span>
            </div>
            <ThemeToggle />
          </div>
        </header>
        
        <main className="py-12">
          <UserTypeSelector onSelectUserType={handleUserTypeSelection} />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">NeuroLoop</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button variant="outline">Sign In</Button>
            <Button variant="hero" onClick={() => setShowUserTypeSelector(true)}>
              Get Started
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-subtle opacity-50" />
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
          <img 
            src={heroImage} 
            alt="Neural networks" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Advanced{" "}
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                Neurological
              </span>{" "}
              Condition Tracking
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Designed specifically for epilepsy, Parkinson's, and other neurological conditions. 
              Track symptoms, manage medications, and contribute to life-saving research.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button 
                variant="hero" 
                size="xl"
                onClick={() => setShowUserTypeSelector(true)}
              >
                Start Tracking Today
                <ChevronRight className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="xl">
                Learn More
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <Shield className="h-4 w-4 mr-2 text-success" />
                HIPAA Compliant
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Users className="h-4 w-4 mr-2 text-primary" />
                Trusted by Healthcare Professionals
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Brain className="h-4 w-4 mr-2 text-secondary" />
                Research Grade
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Built for Better Outcomes
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Every feature is designed with neurological conditions in mind, 
              combining clinical expertise with cutting-edge technology.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="medical-card p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Conditions Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Specialized for Your Condition
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                NeuroLoop is specifically designed for neurological conditions, 
                with specialized tracking features for each diagnosis.
              </p>
              
              <div className="space-y-3 mb-8">
                {conditions.map((condition, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-primary mr-3" />
                    <span className="text-muted-foreground">{condition}</span>
                  </div>
                ))}
              </div>
              
              <Button variant="medical" size="lg">
                Explore Conditions
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="bg-gradient-subtle rounded-2xl p-8 medical-card">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-hero rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Research Impact</h3>
                <p className="text-muted-foreground mb-6">
                  Your anonymized data contributes to groundbreaking research 
                  that helps develop better treatments for neurological conditions.
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">10K+</div>
                    <div className="text-muted-foreground">Patients Helped</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-secondary">50+</div>
                    <div className="text-muted-foreground">Research Studies</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-hero text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of patients and healthcare professionals using NeuroLoop 
            to improve neurological care and advance medical research.
          </p>
          
          <Button 
            variant="outline" 
            size="xl" 
            className="bg-white text-primary hover:bg-gray-50"
            onClick={() => setShowUserTypeSelector(true)}
          >
            Get Started Free
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">NeuroLoop</span>
            </div>
            
            <div className="flex items-center space-x-8 text-sm text-muted-foreground">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>HIPAA Compliance</span>
              <span>Contact Support</span>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2024 NeuroLoop. All rights reserved. Made for better neurological care.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
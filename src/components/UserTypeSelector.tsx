import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  Stethoscope, 
  FlaskConical, 
  Users,
  ChevronRight 
} from "lucide-react";

const userTypes = [
  {
    type: "patient",
    title: "Patient",
    description: "Track your neurological symptoms, medications, and daily wellness to improve your care",
    icon: Heart,
    gradient: "gradient-primary",
    benefits: ["Personal health tracking", "Medication reminders", "Symptom patterns", "Care team sharing"]
  },
  {
    type: "clinician", 
    title: "Clinician",
    description: "Monitor patient progress, analyze cohort data, and enhance clinical decision-making",
    icon: Stethoscope,
    gradient: "gradient-secondary", 
    benefits: ["Patient dashboards", "Clinical analytics", "Treatment insights", "Research data"]
  },
  {
    type: "researcher",
    title: "Researcher", 
    description: "Access anonymized datasets to advance neurological research and save more lives",
    icon: FlaskConical,
    gradient: "gradient-hero",
    benefits: ["Large-scale datasets", "Research analytics", "Population insights", "Clinical trials"]
  },
  {
    type: "carer",
    title: "Carer",
    description: "Support your loved one by helping track symptoms and managing emergency situations",
    icon: Users,
    gradient: "gradient-primary",
    benefits: ["Emergency assistance", "Symptom logging", "Care coordination", "Family insights"]
  }
];

interface UserTypeSelectorProps {
  onSelectUserType: (type: string) => void;
}

export default function UserTypeSelector({ onSelectUserType }: UserTypeSelectorProps) {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-4">
          Welcome to NeuroLoop
        </h1>
        <p className="text-xl text-muted-foreground mb-2">
          Advanced neurological condition tracking for better outcomes
        </p>
        <p className="text-muted-foreground">
          Choose your role to get started with personalized features
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {userTypes.map((userType) => {
          const IconComponent = userType.icon;
          return (
            <Card 
              key={userType.type}
              className="medical-card p-6 cursor-pointer group hover:shadow-glow-primary border-0"
              onClick={() => onSelectUserType(userType.type)}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-${userType.gradient}`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                
                <h3 className="text-2xl font-semibold mb-3">{userType.title}</h3>
                <p className="text-muted-foreground mb-6 flex-grow">
                  {userType.description}
                </p>
                
                <div className="space-y-2">
                  {userType.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2" />
                      {benefit}
                    </div>
                  ))}
                </div>
                
                <Button 
                  className="w-full mt-6 bg-gradient-primary hover:bg-primary-hover text-white border-0"
                  size="lg"
                >
                  Continue as {userType.title}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
      
      <div className="text-center mt-8 text-sm text-muted-foreground">
        <p>Trusted by healthcare professionals • HIPAA compliant • Research-grade security</p>
      </div>
    </div>
  );
}
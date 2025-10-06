import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Heart, Zap, Brain, AlertTriangle, Activity } from "lucide-react";

interface Condition {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: any;
  color: string;
  bgColor: string;
  borderColor: string;
}

interface ConditionsStepProps {
  selectedConditions: string[];
  onUpdate: (conditionIds: string[]) => void;
}

const conditions: Condition[] = [
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

export function ConditionsStep({
  selectedConditions,
  onUpdate
}: ConditionsStepProps) {
  const toggleCondition = (conditionId: string) => {
    const isSelected = selectedConditions.includes(conditionId);
    onUpdate(
      isSelected
        ? selectedConditions.filter(id => id !== conditionId)
        : [...selectedConditions, conditionId]
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-foreground">Medical Conditions</h2>
        <p className="text-muted-foreground">
          Select the conditions you'd like to track
        </p>
      </div>
      
      <div className="space-y-4">
        {conditions.map((condition) => {
          const Icon = condition.icon;
          const isSelected = selectedConditions.includes(condition.id);
          
          return (
            <Card
              key={condition.id}
              className={`p-6 cursor-pointer transition-all duration-300 ${
                isSelected
                  ? 'border-2 border-teal-500 bg-teal-500/5 shadow-[0_0_20px_rgba(20,184,166,0.3)]'
                  : 'border-2 border-border hover:border-teal-500/30'
              }`}
              onClick={() => toggleCondition(condition.id)}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${condition.bgColor}`}>
                  <Icon className={`h-6 w-6 ${condition.color}`} />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-lg text-foreground">{condition.name}</h3>
                      {(condition.id === "epilepsy" || condition.id === "parkinsons") && (
                        <span className="px-2 py-1 bg-teal-500/20 text-teal-400 text-xs font-medium rounded-full">
                          Primary Focus
                        </span>
                      )}
                    </div>
                    <Checkbox 
                      checked={isSelected}
                      className="h-5 w-5 data-[state=checked]:bg-teal-500 data-[state=checked]:border-teal-500"
                    />
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

      {/* Info Card */}
      <Card className="p-4 bg-gradient-to-br from-teal-500/10 to-purple-500/10 border-teal-500/20">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            💡 <strong className="text-foreground">Tip:</strong> You can select multiple conditions. 
            The app will customize tracking based on your selections.
          </p>
        </div>
      </Card>
    </div>
  );
}

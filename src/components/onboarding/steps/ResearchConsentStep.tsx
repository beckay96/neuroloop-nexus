import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Shield, Database, Heart, Pill, Calendar, TrendingUp, Users } from "lucide-react";

interface ResearchConsentStepProps {
  shareResearch: boolean;
  dataTypes: {
    seizureData: boolean;
    parkinsonData: boolean;
    medicationData: boolean;
    menstrualData: boolean;
  };
  onUpdate: (data: {
    shareResearch: boolean;
    dataTypes: {
      seizureData: boolean;
      parkinsonData: boolean;
      medicationData: boolean;
      menstrualData: boolean;
    };
  }) => void;
  hasEpilepsy: boolean;
  hasParkinsons: boolean;
  tracksMenstrual: boolean;
}

export function ResearchConsentStep({
  shareResearch,
  dataTypes,
  onUpdate,
  hasEpilepsy,
  hasParkinsons,
  tracksMenstrual
}: ResearchConsentStepProps) {
  const toggleDataType = (type: keyof typeof dataTypes) => {
    onUpdate({
      shareResearch,
      dataTypes: {
        ...dataTypes,
        [type]: !dataTypes[type]
      }
    });
  };

  const dataOptions = [
    {
      id: 'seizureData' as const,
      title: 'Epilepsy & seizure data',
      description: 'Seizure patterns, triggers, frequency - critical for advancing epilepsy care',
      icon: TrendingUp,
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/20',
      show: hasEpilepsy
    },
    {
      id: 'parkinsonData' as const,
      title: "Parkinson's symptom data",
      description: 'Motor symptoms, on/off periods, dyskinesia tracking for movement disorder research',
      icon: Heart,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
      show: hasParkinsons
    },
    {
      id: 'medicationData' as const,
      title: 'Medication effectiveness data',
      description: 'Dosing, adherence, side effects - improve treatment protocols worldwide',
      icon: Pill,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
      show: true
    },
    {
      id: 'menstrualData' as const,
      title: 'Menstrual cycle correlations',
      description: 'Critical for understanding catamenial epilepsy - severely understudied area',
      icon: Calendar,
      color: 'text-pink-500',
      bgColor: 'bg-pink-500/10',
      borderColor: 'border-pink-500/20',
      show: tracksMenstrual
    }
  ].filter(option => option.show);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-foreground">Share anonymized data for research</h2>
        <p className="text-muted-foreground">
          Help advance medical research (completely optional)
        </p>
      </div>

      {/* Main Consent Card */}
      <Card className="p-6 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <div className="flex items-start gap-4">
          <Checkbox
            id="shareResearch"
            checked={shareResearch}
            onCheckedChange={(checked) => 
              onUpdate({ shareResearch: checked as boolean, dataTypes })
            }
            className="mt-1"
          />
          <div className="flex-1 space-y-4">
            <div>
              <Label htmlFor="shareResearch" className="text-lg font-semibold cursor-pointer text-foreground">
                Share anonymized data for research
              </Label>
              <p className="text-sm text-muted-foreground mt-2">
                Your anonymized data could help researchers develop better treatments for millions of people worldwide. 
                You maintain complete control over what is shared.
              </p>
            </div>

            {/* Data Privacy Info */}
            <Card className="p-4 bg-card border-border">
              <div className="flex items-start gap-3">
                <Database className="h-5 w-5 text-teal-500 mt-0.5 flex-shrink-0" />
                <div className="text-sm space-y-2">
                  <p className="font-semibold text-foreground">Your data is protected:</p>
                  <ul className="space-y-1 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-teal-500 mt-1">✓</span>
                      <span>Completely anonymized - no personal identifiers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-teal-500 mt-1">✓</span>
                      <span>HIPAA compliant encryption</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-teal-500 mt-1">✓</span>
                      <span>Only shared with approved research institutions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-teal-500 mt-1">✓</span>
                      <span>You can withdraw consent at any time</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Card>

      {/* Granular Data Selection */}
      {shareResearch && (
        <div className="space-y-4 animate-in slide-in-from-top">
          <div className="border-l-4 border-primary pl-4">
            <h3 className="font-semibold text-lg text-foreground">Choose what to contribute:</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Select the specific data types you're comfortable sharing
            </p>
          </div>

          {dataOptions.map((option) => {
            const Icon = option.icon;
            const isSelected = dataTypes[option.id];

            return (
              <Card
                key={option.id}
                className={`p-4 cursor-pointer transition-all ${
                  isSelected
                    ? `${option.bgColor} ${option.borderColor} border-2`
                    : 'border border-border hover:border-primary/50'
                }`}
                onClick={() => toggleDataType(option.id)}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${option.bgColor}`}>
                    <Icon className={`h-6 w-6 ${option.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-foreground">{option.title}</h4>
                      <Checkbox checked={isSelected} />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {option.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}

          {/* Impact Statement */}
          <Card className="p-4 bg-gradient-to-br from-teal-500/10 to-purple-500/10 border-teal-500/20">
            <div className="flex items-start gap-3">
              <Users className="h-6 w-6 text-teal-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-foreground mb-2">Your potential impact:</h4>
                <p className="text-sm text-muted-foreground">
                  By sharing your data, you're contributing to a global effort to understand and treat neurological conditions. 
                  Large-scale datasets like yours are essential for:
                </p>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-teal-500">•</span>
                    <span>Identifying new treatment approaches</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500">•</span>
                    <span>Understanding disease patterns and triggers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-500">•</span>
                    <span>Developing AI-powered diagnostic tools</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500">•</span>
                    <span>Improving quality of life for millions worldwide</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

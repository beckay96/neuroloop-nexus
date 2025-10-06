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
    dailyWellness: boolean;
    movementData: boolean;
    demographics: boolean;
  };
  onUpdate: (data: {
    shareResearch: boolean;
    dataTypes: {
      seizureData: boolean;
      parkinsonData: boolean;
      medicationData: boolean;
      menstrualData: boolean;
      dailyWellness: boolean;
      movementData: boolean;
      demographics: boolean;
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
      show: hasEpilepsy
    },
    {
      id: 'parkinsonData' as const,
      title: "Parkinson's symptom data",
      description: 'Motor symptoms, on/off periods, dyskinesia tracking for movement disorder research',
      show: hasParkinsons
    },
    {
      id: 'medicationData' as const,
      title: 'Medication effectiveness data',
      description: 'Dosing, adherence, side effects - improve treatment protocols worldwide',
      show: true
    },
    {
      id: 'menstrualData' as const,
      title: 'Menstrual cycle correlations',
      description: 'Critical for understanding catamenial epilepsy - severely understudied area',
      show: tracksMenstrual
    },
    {
      id: 'dailyWellness' as const,
      title: 'Daily wellness tracking',
      description: 'Mood, energy, sleep, triggers - provides comprehensive health picture',
      show: true
    },
    {
      id: 'movementData' as const,
      title: 'Movement & activity patterns',
      description: 'Gait, tremor, rigidity patterns for movement disorder research',
      show: true
    },
    {
      id: 'demographics' as const,
      title: 'Age, gender, condition type',
      description: 'Ensure research represents diverse populations globally',
      show: true
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
            const isSelected = dataTypes[option.id] || false;

            return (
              <Card
                key={option.id}
                className="p-4 cursor-pointer transition-all border border-border hover:border-teal-500/30"
                onClick={() => toggleDataType(option.id)}
              >
                <div className="flex items-start gap-3">
                  <Checkbox 
                    checked={isSelected}
                    className="mt-1 data-[state=checked]:bg-teal-500 data-[state=checked]:border-teal-500"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-1">{option.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {option.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}

        </div>
      )}

      {/* Privacy Protection Notice */}
      <Card className="p-4 bg-teal-500/5 border-teal-500/20">
        <div className="flex items-start gap-3">
          <span className="text-xl">🔒</span>
          <div className="flex-1">
            <p className="text-sm text-foreground">
              <strong>Your privacy is protected:</strong> All data is anonymized, encrypted, and you can 
              withdraw consent at any time. No personal identifiers are ever shared.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

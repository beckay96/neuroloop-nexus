import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CustomDatePicker } from "@/components/ui/custom-date-picker";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Activity, Clock, Target, AlertTriangle, Heart, Brain } from "lucide-react";
import { SYMPTOM_TYPES, BODY_LOCATIONS, SEIZURE_TRIGGERS } from "@/utils/databaseEnums";

interface SymptomLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (data: any) => void;
  userConditions?: string[]; // To customize symptom types
}

export default function SymptomLogModalEnhanced({ 
  isOpen, 
  onClose, 
  onComplete,
  userConditions = []
}: SymptomLogModalProps) {
  const [symptomLog, setSymptomLog] = useState({
    log_date: new Date().toISOString().split('T')[0],
    log_time: new Date().toTimeString().slice(0, 5),
    symptom_type: "",
    severity: 5,
    duration_minutes: 0,
    body_locations: [] as string[],
    impact_on_daily_activities: 5,
    work_school_affected: false,
    relief_methods_tried: [] as string[],
    relief_effectiveness: 0,
    identified_triggers: [] as string[],
    notes: ""
  });

  // Enhanced symptom types based on user conditions
  const getRelevantSymptoms = () => {
    const symptoms = {
      epilepsy: [
        "Aura/warning signs",
        "Absence seizure",
        "Focal seizure",
        "Tonic-clonic seizure",
        "Myoclonic jerk",
        "Post-ictal confusion",
        "Post-ictal fatigue",
        "Memory problems",
        "Headache after seizure",
        "Mood changes",
        "Sleep disturbances",
        "Medication side effects"
      ],
      parkinsons: [
        "Tremor (resting)",
        "Tremor (action)",
        "Rigidity/stiffness",
        "Bradykinesia (slowness)",
        "Freezing of gait",
        "Balance problems",
        "Falls",
        "Dyskinesia (involuntary movements)",
        "Wearing off (medication)",
        "On-off fluctuations",
        "Dystonia (muscle contractions)",
        "Fatigue",
        "Constipation",
        "Sleep problems",
        "Depression/anxiety",
        "Cognitive changes",
        "Hallucinations",
        "Speech difficulties",
        "Swallowing difficulties"
      ],
      general: [
        "Headache",
        "Migraine",
        "Fatigue",
        "Dizziness",
        "Vertigo",
        "Nausea",
        "Pain (general)",
        "Muscle pain",
        "Joint pain",
        "Anxiety",
        "Depression",
        "Sleep problems",
        "Memory issues",
        "Concentration problems",
        "Vision changes",
        "Hearing changes",
        "Other"
      ]
    };

    // Build symptom list based on user conditions
    let relevantSymptoms: string[] = [];
    
    if (userConditions.includes('epilepsy')) {
      relevantSymptoms = [...relevantSymptoms, ...symptoms.epilepsy];
    }
    if (userConditions.includes('parkinsons')) {
      relevantSymptoms = [...relevantSymptoms, ...symptoms.parkinsons];
    }
    
    // Always include general symptoms
    relevantSymptoms = [...relevantSymptoms, ...symptoms.general];
    
    // Remove duplicates and sort
    return [...new Set(relevantSymptoms)].sort();
  };

  // Enhanced body locations with laterality
  const bodyLocations = [
    "Head",
    "Face",
    "Eyes",
    "Neck",
    "Left shoulder",
    "Right shoulder",
    "Both shoulders",
    "Left arm",
    "Right arm",
    "Both arms",
    "Left hand",
    "Right hand",
    "Both hands",
    "Chest",
    "Upper back",
    "Lower back",
    "Abdomen",
    "Left hip",
    "Right hip",
    "Both hips",
    "Left leg",
    "Right leg",
    "Both legs",
    "Left foot",
    "Right foot",
    "Both feet",
    "Whole body",
    "Other"
  ];

  // Enhanced triggers with condition-specific options
  const triggers = [
    "Stress",
    "Lack of sleep",
    "Missed medication",
    "Late medication",
    "Physical exertion",
    "Weather changes",
    "Temperature extremes",
    "Hormonal changes",
    "Menstrual cycle",
    "Alcohol",
    "Caffeine",
    "Specific foods",
    "Dehydration",
    "Hunger/low blood sugar",
    "Bright lights",
    "Flashing lights",
    "Loud noises",
    "Strong smells",
    "Screens/electronics",
    "Reading",
    "Emotional upset",
    "Excitement",
    "Illness/fever",
    "Unknown",
    "Other"
  ];

  // Enhanced relief methods
  const reliefMethods = [
    "Rest/lying down",
    "Sleep",
    "Medication (rescue)",
    "Medication (regular)",
    "Deep breathing",
    "Meditation/mindfulness",
    "Heat therapy",
    "Cold therapy",
    "Massage",
    "Stretching",
    "Physical therapy exercises",
    "Changed position",
    "Walked/moved around",
    "Ate food",
    "Drank water",
    "Drank caffeine",
    "Distraction/activity",
    "Talked to someone",
    "Used assistive device",
    "Emergency medication",
    "Called doctor",
    "Went to ER",
    "Nothing helped",
    "Other"
  ];

  const updateSymptomLog = (key: string, value: any) => {
    setSymptomLog(prev => ({ ...prev, [key]: value }));
  };

  const toggleArrayItem = (array: string[], itemValue: string, key: string) => {
    const updated = array.includes(itemValue) 
      ? array.filter(i => i !== itemValue)
      : [...array, itemValue];
    updateSymptomLog(key, updated);
  };

  const handleComplete = () => {
    const finalData = {
      ...symptomLog,
      duration_minutes: symptomLog.duration_minutes || null,
      relief_effectiveness: symptomLog.relief_effectiveness || null,
      notes: symptomLog.notes || null
    };
    onComplete(finalData);
    onClose();
  };

  const getSeverityLabel = (value: number) => {
    const labels = ["None", "Minimal", "Mild", "Moderate", "Significant", "Severe", "Very Severe", "Extreme", "Unbearable", "Emergency"];
    return labels[value - 1] || "";
  };

  const getSeverityColor = (value: number) => {
    if (value <= 3) return "text-green-500";
    if (value <= 5) return "text-yellow-500";
    if (value <= 7) return "text-orange-500";
    return "text-red-500";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card border border-border z-50 max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center flex items-center justify-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Log Symptom
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Date and Time */}
          <Card className="p-4 bg-gradient-to-br from-primary/5 to-purple-500/5 border-primary/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <CustomDatePicker
                  label="Date"
                  value={symptomLog.log_date}
                  onChange={(dateString) => updateSymptomLog("log_date", dateString)}
                />
              </div>
              <div className="space-y-2">
                <Label>Time</Label>
                <Input 
                  type="time"
                  value={symptomLog.log_time}
                  onChange={(e) => updateSymptomLog("log_time", e.target.value)}
                  className="font-mono"
                />
              </div>
            </div>
          </Card>

          {/* Symptom Type */}
          <Card className="p-4">
            <Label className="flex items-center gap-2 mb-3">
              <Heart className="h-4 w-4 text-red-500" />
              What symptom are you experiencing?
            </Label>
            <Select value={symptomLog.symptom_type} onValueChange={(value) => updateSymptomLog("symptom_type", value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select symptom type" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                {getRelevantSymptoms().map(symptom => (
                  <SelectItem key={symptom} value={symptom}>
                    {symptom}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Card>

          {/* Severity */}
          <Card className="p-4">
            <Label className="flex items-center gap-2 mb-3">
              <AlertTriangle className="h-4 w-4 text-orange-500" />
              Severity (1-10)
            </Label>
            <div className="space-y-3">
              <Slider
                value={[symptomLog.severity]}
                onValueChange={(value) => updateSymptomLog("severity", value[0])}
                min={1}
                max={10}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">1 (Minimal)</span>
                <Badge className={`${getSeverityColor(symptomLog.severity)} bg-opacity-10`}>
                  {symptomLog.severity} - {getSeverityLabel(symptomLog.severity)}
                </Badge>
                <span className="text-sm text-muted-foreground">10 (Emergency)</span>
              </div>
            </div>
          </Card>

          {/* Duration */}
          <Card className="p-4">
            <Label className="mb-3">Duration (minutes)</Label>
            <Input
              type="number"
              value={symptomLog.duration_minutes}
              onChange={(e) => updateSymptomLog("duration_minutes", parseInt(e.target.value) || 0)}
              placeholder="How long did it last?"
              min={0}
            />
            <p className="text-sm text-muted-foreground mt-2">
              Enter 0 if ongoing or unknown
            </p>
          </Card>

          {/* Body Locations */}
          <Card className="p-4">
            <Label className="flex items-center gap-2 mb-3">
              <Target className="h-4 w-4 text-blue-500" />
              Affected Body Parts
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {bodyLocations.map(location => (
                <div key={location} className="flex items-center gap-2">
                  <Checkbox
                    checked={symptomLog.body_locations.includes(location)}
                    onCheckedChange={() => toggleArrayItem(symptomLog.body_locations, location, "body_locations")}
                  />
                  <Label className="text-sm cursor-pointer">{location}</Label>
                </div>
              ))}
            </div>
          </Card>

          {/* Triggers */}
          <Card className="p-4">
            <Label className="flex items-center gap-2 mb-3">
              <Brain className="h-4 w-4 text-purple-500" />
              Possible Triggers
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {triggers.map(trigger => (
                <div key={trigger} className="flex items-center gap-2">
                  <Checkbox
                    checked={symptomLog.identified_triggers.includes(trigger)}
                    onCheckedChange={() => toggleArrayItem(symptomLog.identified_triggers, trigger, "identified_triggers")}
                  />
                  <Label className="text-sm cursor-pointer">{trigger}</Label>
                </div>
              ))}
            </div>
          </Card>

          {/* Relief Methods */}
          <Card className="p-4">
            <Label className="mb-3">What did you try for relief?</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
              {reliefMethods.map(method => (
                <div key={method} className="flex items-center gap-2">
                  <Checkbox
                    checked={symptomLog.relief_methods_tried.includes(method)}
                    onCheckedChange={() => toggleArrayItem(symptomLog.relief_methods_tried, method, "relief_methods_tried")}
                  />
                  <Label className="text-sm cursor-pointer">{method}</Label>
                </div>
              ))}
            </div>
            
            {symptomLog.relief_methods_tried.length > 0 && (
              <div className="mt-4 pt-4 border-t">
                <Label>How effective was the relief? (0-10)</Label>
                <Slider
                  value={[symptomLog.relief_effectiveness]}
                  onValueChange={(value) => updateSymptomLog("relief_effectiveness", value[0])}
                  min={0}
                  max={10}
                  step={1}
                  className="w-full mt-2"
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                  <span>0 (No relief)</span>
                  <span>{symptomLog.relief_effectiveness}/10</span>
                  <span>10 (Complete relief)</span>
                </div>
              </div>
            )}
          </Card>

          {/* Impact on Activities */}
          <Card className="p-4">
            <Label className="mb-3">Impact on Daily Activities</Label>
            <Slider
              value={[symptomLog.impact_on_daily_activities]}
              onValueChange={(value) => updateSymptomLog("impact_on_daily_activities", value[0])}
              min={0}
              max={10}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>0 (No impact)</span>
              <span>{symptomLog.impact_on_daily_activities}/10</span>
              <span>10 (Completely unable)</span>
            </div>
            
            <div className="flex items-center gap-2 mt-4">
              <Checkbox
                checked={symptomLog.work_school_affected}
                onCheckedChange={(checked) => updateSymptomLog("work_school_affected", checked)}
              />
              <Label className="cursor-pointer">Affected work/school attendance</Label>
            </div>
          </Card>

          {/* Notes */}
          <Card className="p-4">
            <Label>Additional Notes</Label>
            <Textarea
              value={symptomLog.notes}
              onChange={(e) => updateSymptomLog("notes", e.target.value)}
              placeholder="Any other details about this symptom..."
              className="min-h-[100px] mt-2"
            />
          </Card>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleComplete}
            disabled={!symptomLog.symptom_type}
            className="bg-gradient-secondary"
          >
            Save Symptom Log
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Activity, Clock, Target, Zap } from "lucide-react";

interface SymptomsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (data: any) => void;
}

export default function SymptomsModal({ isOpen, onClose, onComplete }: SymptomsModalProps) {
  const [symptomData, setSymptomData] = useState({
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().slice(0, 5),
    symptom_type: "",
    severity: [5],
    duration_minutes: [30],
    body_parts: [] as string[],
    triggers: [] as string[],
    relief_methods: [] as string[],
    impact_on_activities: [] as string[],
    notes: ""
  });

  const symptomTypes = {
    epilepsy: [
      "Aura/warning signs",
      "Post-ictal confusion", 
      "Post-ictal fatigue",
      "Memory problems",
      "Headache after seizure",
      "Mood changes",
      "Sleep disturbances",
      "Medication side effects"
    ],
    parkinsons: [
      "Tremor",
      "Rigidity/stiffness", 
      "Bradykinesia (slowness)",
      "Freezing of gait",
      "Balance problems",
      "Dyskinesia (involuntary movements)",
      "Wearing off (medication)",
      "On-off fluctuations",
      "Fatigue",
      "Constipation",
      "Sleep problems",
      "Depression/anxiety",
      "Cognitive changes"
    ],
    general: [
      "Headache",
      "Fatigue",
      "Dizziness",
      "Nausea",
      "Pain",
      "Anxiety",
      "Depression",
      "Sleep problems",
      "Memory issues",
      "Concentration problems",
      "Other"
    ]
  };

  const allSymptoms = [...symptomTypes.epilepsy, ...symptomTypes.parkinsons, ...symptomTypes.general];
  const uniqueSymptoms = [...new Set(allSymptoms)].sort();

  const bodyParts = [
    "Head/Face",
    "Left arm", 
    "Right arm",
    "Left hand",
    "Right hand", 
    "Left leg",
    "Right leg",
    "Torso/Chest",
    "Back",
    "Neck",
    "Whole body",
    "Other"
  ];

  const commonTriggers = [
    "Stress",
    "Lack of sleep",
    "Missed medication",
    "Physical exertion",
    "Weather changes",
    "Hormonal changes",
    "Alcohol",
    "Caffeine",
    "Bright lights",
    "Loud noises",
    "Hunger",
    "Dehydration",
    "Other"
  ];

  const reliefMethods = [
    "Rest/lying down",
    "Medication",
    "Deep breathing",
    "Heat therapy",
    "Cold therapy",
    "Massage",
    "Stretching",
    "Meditation",
    "Distraction",
    "Changed position",
    "Ate/drank something",
    "Nothing helped",
    "Other"
  ];

  const activityImpacts = [
    "No impact",
    "Mild difficulty with tasks",
    "Moderate difficulty with tasks", 
    "Unable to complete some tasks",
    "Unable to work/function normally",
    "Needed to rest/lie down",
    "Needed assistance",
    "Had to stop all activities"
  ];

  const updateSymptomData = (key: string, value: any) => {
    setSymptomData(prev => ({ ...prev, [key]: value }));
  };

  const toggleArrayItem = (array: string[], item: string, key: string) => {
    const updated = array.includes(item) 
      ? array.filter(i => i !== item)
      : [...array, item];
    updateSymptomData(key, updated);
  };

  const getSeverityLabel = (severity: number) => {
    if (severity <= 2) return "Mild";
    if (severity <= 4) return "Mild-Moderate";
    if (severity <= 6) return "Moderate";
    if (severity <= 8) return "Moderate-Severe";
    return "Severe";
  };

  const getDurationLabel = (minutes: number) => {
    if (minutes < 60) return `${minutes} minutes`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours} hour${hours > 1 ? 's' : ''}`;
  };

  const handleComplete = () => {
    const finalData = {
      ...symptomData,
      severity: symptomData.severity[0],
      duration_minutes: symptomData.duration_minutes[0],
      logged_at: new Date().toISOString()
    };
    
    onComplete(finalData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card border border-border z-50 max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center flex items-center justify-center gap-2">
            <Activity className="h-5 w-5 text-accent" />
            Log Symptoms
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Date and Time */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              When did this occur?
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Date</Label>
                <Input
                  type="date"
                  value={symptomData.date}
                  onChange={(e) => updateSymptomData("date", e.target.value)}
                />
              </div>
              <div>
                <Label>Time</Label>
                <Input
                  type="time"
                  value={symptomData.time}
                  onChange={(e) => updateSymptomData("time", e.target.value)}
                />
              </div>
            </div>
          </Card>

          {/* Symptom Type */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3">What symptom are you experiencing?</h3>
            <Select 
              value={symptomData.symptom_type} 
              onValueChange={(value) => updateSymptomData("symptom_type", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select symptom type" />
              </SelectTrigger>
              <SelectContent>
                <div className="p-2 text-xs font-semibold text-muted-foreground">Epilepsy-related</div>
                {symptomTypes.epilepsy.map(symptom => (
                  <SelectItem key={symptom} value={symptom}>{symptom}</SelectItem>
                ))}
                <div className="p-2 text-xs font-semibold text-muted-foreground">Parkinson's-related</div>
                {symptomTypes.parkinsons.map(symptom => (
                  <SelectItem key={symptom} value={symptom}>{symptom}</SelectItem>
                ))}
                <div className="p-2 text-xs font-semibold text-muted-foreground">General</div>
                {symptomTypes.general.map(symptom => (
                  <SelectItem key={symptom} value={symptom}>{symptom}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Card>

          {/* Severity and Duration */}
          <Card className="p-4">
            <h3 className="font-semibold mb-4">Severity & Duration</h3>
            <div className="space-y-6">
              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <Target className="h-4 w-4" />
                  Severity: {getSeverityLabel(symptomData.severity[0])} ({symptomData.severity[0]}/10)
                </Label>
                <Slider
                  value={symptomData.severity}
                  onValueChange={(value) => updateSymptomData("severity", value)}
                  max={10}
                  min={1}
                  step={1}
                  className="mt-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Mild</span>
                  <span>Moderate</span>
                  <span>Severe</span>
                </div>
              </div>

              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4" />
                  Duration: {getDurationLabel(symptomData.duration_minutes[0])}
                </Label>
                <Slider
                  value={symptomData.duration_minutes}
                  onValueChange={(value) => updateSymptomData("duration_minutes", value)}
                  max={480}
                  min={1}
                  step={1}
                  className="mt-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>1 min</span>
                  <span>4 hours</span>
                  <span>8+ hours</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Body Parts Affected */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Body Parts Affected</h3>
            <div className="grid grid-cols-2 gap-2">
              {bodyParts.map(part => (
                <div key={part} className="flex items-center space-x-2">
                  <Checkbox
                    checked={symptomData.body_parts.includes(part)}
                    onCheckedChange={() => toggleArrayItem(symptomData.body_parts, part, "body_parts")}
                  />
                  <label className="text-sm">{part}</label>
                </div>
              ))}
            </div>
            {symptomData.body_parts.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-3">
                {symptomData.body_parts.map(part => (
                  <Badge key={part} variant="secondary" className="text-xs">{part}</Badge>
                ))}
              </div>
            )}
          </Card>

          {/* Possible Triggers */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Possible Triggers</h3>
            <div className="grid grid-cols-2 gap-2">
              {commonTriggers.map(trigger => (
                <div key={trigger} className="flex items-center space-x-2">
                  <Checkbox
                    checked={symptomData.triggers.includes(trigger)}
                    onCheckedChange={() => toggleArrayItem(symptomData.triggers, trigger, "triggers")}
                  />
                  <label className="text-sm">{trigger}</label>
                </div>
              ))}
            </div>
            {symptomData.triggers.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-3">
                {symptomData.triggers.map(trigger => (
                  <Badge key={trigger} variant="outline" className="text-xs">{trigger}</Badge>
                ))}
              </div>
            )}
          </Card>

          {/* Relief Methods */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3">What helped (if anything)?</h3>
            <div className="grid grid-cols-2 gap-2">
              {reliefMethods.map(method => (
                <div key={method} className="flex items-center space-x-2">
                  <Checkbox
                    checked={symptomData.relief_methods.includes(method)}
                    onCheckedChange={() => toggleArrayItem(symptomData.relief_methods, method, "relief_methods")}
                  />
                  <label className="text-sm">{method}</label>
                </div>
              ))}
            </div>
            {symptomData.relief_methods.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-3">
                {symptomData.relief_methods.map(method => (
                  <Badge key={method} variant="secondary" className="text-xs bg-green-100 text-green-800">
                    {method}
                  </Badge>
                ))}
              </div>
            )}
          </Card>

          {/* Impact on Activities */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Impact on Daily Activities</h3>
            <div className="grid grid-cols-1 gap-2">
              {activityImpacts.map(impact => (
                <div key={impact} className="flex items-center space-x-2">
                  <Checkbox
                    checked={symptomData.impact_on_activities.includes(impact)}
                    onCheckedChange={() => toggleArrayItem(symptomData.impact_on_activities, impact, "impact_on_activities")}
                  />
                  <label className="text-sm">{impact}</label>
                </div>
              ))}
            </div>
            {symptomData.impact_on_activities.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-3">
                {symptomData.impact_on_activities.map(impact => (
                  <Badge key={impact} variant="outline" className="text-xs">{impact}</Badge>
                ))}
              </div>
            )}
          </Card>

          {/* Notes */}
          <Card className="p-4">
            <Label>Additional Notes</Label>
            <Textarea
              value={symptomData.notes}
              onChange={(e) => updateSymptomData("notes", e.target.value)}
              placeholder="Any additional details about this symptom..."
              rows={3}
              className="mt-2"
            />
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              variant="hero" 
              onClick={handleComplete}
              disabled={!symptomData.symptom_type}
            >
              Save Symptom Log
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
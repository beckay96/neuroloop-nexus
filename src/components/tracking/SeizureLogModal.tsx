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
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Zap, Clock, AlertTriangle, MapPin } from "lucide-react";

interface SeizureLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (data: any) => void;
}

export default function SeizureLogModal({ isOpen, onClose, onComplete }: SeizureLogModalProps) {
  const [seizureData, setSeizureData] = useState({
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().slice(0, 5),
    seizure_type: "",
    duration_seconds: [60],
    severity: [5],
    consciousness_level: "",
    location: "",
    triggers: [] as string[],
    warning_signs: [] as string[],
    post_ictal_symptoms: [] as string[],
    witness_present: false,
    witness_account: "",
    injuries: [] as string[],
    notes: ""
  });

  const seizureTypes = [
    "Focal aware (simple partial)",
    "Focal impaired awareness (complex partial)",
    "Focal to bilateral tonic-clonic",
    "Generalized tonic-clonic",
    "Absence",
    "Myoclonic",
    "Atonic (drop attack)",
    "Tonic",
    "Unknown/Unsure"
  ];

  const consciousnessLevels = [
    "Fully conscious",
    "Partially conscious", 
    "Unconscious",
    "Unknown"
  ];

  const commonTriggers = [
    "Sleep deprivation",
    "Stress",
    "Missed medication",
    "Alcohol",
    "Flashing lights",
    "Menstrual cycle",
    "Illness/fever",
    "Exercise",
    "Other"
  ];

  const commonWarningSigns = [
    "Aura",
    "Unusual taste/smell",
    "Déjà vu feeling",
    "Anxiety/fear",
    "Stomach sensation",
    "Visual changes",
    "Other"
  ];

  const commonPostIctalSymptoms = [
    "Confusion",
    "Fatigue",
    "Headache",
    "Memory problems",
    "Muscle soreness",
    "Sleep",
    "Nausea",
    "Other"
  ];

  const commonInjuries = [
    "Tongue bite",
    "Head injury",
    "Bruising",
    "Cut/scrape",
    "Muscle strain",
    "Fall",
    "Other"
  ];

  const updateSeizureData = (key: string, value: any) => {
    setSeizureData(prev => ({ ...prev, [key]: value }));
  };

  const toggleArrayItem = (array: string[], item: string, key: string) => {
    const updated = array.includes(item) 
      ? array.filter(i => i !== item)
      : [...array, item];
    updateSeizureData(key, updated);
  };

  const handleComplete = () => {
    const finalData = {
      ...seizureData,
      duration_seconds: seizureData.duration_seconds[0],
      severity: seizureData.severity[0],
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
            <Zap className="h-5 w-5 text-status-critical" />
            Log Seizure Event
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
                  value={seizureData.date}
                  onChange={(e) => updateSeizureData("date", e.target.value)}
                />
              </div>
              <div>
                <Label>Time</Label>
                <Input
                  type="time"
                  value={seizureData.time}
                  onChange={(e) => updateSeizureData("time", e.target.value)}
                />
              </div>
            </div>
          </Card>

          {/* Seizure Details */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Seizure Details</h3>
            <div className="space-y-4">
              <div>
                <Label>Seizure Type</Label>
                <Select 
                  value={seizureData.seizure_type} 
                  onValueChange={(value) => updateSeizureData("seizure_type", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select seizure type" />
                  </SelectTrigger>
                  <SelectContent>
                    {seizureTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Duration (seconds): {seizureData.duration_seconds[0]}s</Label>
                <Slider
                  value={seizureData.duration_seconds}
                  onValueChange={(value) => updateSeizureData("duration_seconds", value)}
                  max={600}
                  min={5}
                  step={5}
                  className="mt-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>5s</span>
                  <span>10 min</span>
                </div>
              </div>

              <div>
                <Label>Severity (1-10): {seizureData.severity[0]}</Label>
                <Slider
                  value={seizureData.severity}
                  onValueChange={(value) => updateSeizureData("severity", value)}
                  max={10}
                  min={1}
                  step={1}
                  className="mt-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Mild</span>
                  <span>Severe</span>
                </div>
              </div>

              <div>
                <Label>Consciousness Level</Label>
                <Select 
                  value={seizureData.consciousness_level} 
                  onValueChange={(value) => updateSeizureData("consciousness_level", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select consciousness level" />
                  </SelectTrigger>
                  <SelectContent>
                    {consciousnessLevels.map(level => (
                      <SelectItem key={level} value={level}>{level}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Location</Label>
                <Input
                  value={seizureData.location}
                  onChange={(e) => updateSeizureData("location", e.target.value)}
                  placeholder="Where did this occur?"
                />
              </div>
            </div>
          </Card>

          {/* Triggers */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Possible Triggers</h3>
            <div className="grid grid-cols-2 gap-2">
              {commonTriggers.map(trigger => (
                <div key={trigger} className="flex items-center space-x-2">
                  <Checkbox
                    checked={seizureData.triggers.includes(trigger)}
                    onCheckedChange={() => toggleArrayItem(seizureData.triggers, trigger, "triggers")}
                  />
                  <label className="text-sm">{trigger}</label>
                </div>
              ))}
            </div>
          </Card>

          {/* Warning Signs */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Warning Signs (Aura)</h3>
            <div className="grid grid-cols-2 gap-2">
              {commonWarningSigns.map(sign => (
                <div key={sign} className="flex items-center space-x-2">
                  <Checkbox
                    checked={seizureData.warning_signs.includes(sign)}
                    onCheckedChange={() => toggleArrayItem(seizureData.warning_signs, sign, "warning_signs")}
                  />
                  <label className="text-sm">{sign}</label>
                </div>
              ))}
            </div>
          </Card>

          {/* Post-ictal Symptoms */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3">After Effects (Post-ictal)</h3>
            <div className="grid grid-cols-2 gap-2">
              {commonPostIctalSymptoms.map(symptom => (
                <div key={symptom} className="flex items-center space-x-2">
                  <Checkbox
                    checked={seizureData.post_ictal_symptoms.includes(symptom)}
                    onCheckedChange={() => toggleArrayItem(seizureData.post_ictal_symptoms, symptom, "post_ictal_symptoms")}
                  />
                  <label className="text-sm">{symptom}</label>
                </div>
              ))}
            </div>
          </Card>

          {/* Witness Information */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Witness Information</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={seizureData.witness_present}
                  onCheckedChange={(checked) => updateSeizureData("witness_present", checked)}
                />
                <label>Someone witnessed this seizure</label>
              </div>
              
              {seizureData.witness_present && (
                <Textarea
                  value={seizureData.witness_account}
                  onChange={(e) => updateSeizureData("witness_account", e.target.value)}
                  placeholder="Witness account (what they observed)..."
                  rows={3}
                />
              )}
            </div>
          </Card>

          {/* Injuries */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              Any Injuries?
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {commonInjuries.map(injury => (
                <div key={injury} className="flex items-center space-x-2">
                  <Checkbox
                    checked={seizureData.injuries.includes(injury)}
                    onCheckedChange={() => toggleArrayItem(seizureData.injuries, injury, "injuries")}
                  />
                  <label className="text-sm">{injury}</label>
                </div>
              ))}
            </div>
          </Card>

          {/* Notes */}
          <Card className="p-4">
            <Label>Additional Notes</Label>
            <Textarea
              value={seizureData.notes}
              onChange={(e) => updateSeizureData("notes", e.target.value)}
              placeholder="Any additional details about this seizure..."
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
              disabled={!seizureData.seizure_type}
            >
              Save Seizure Log
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
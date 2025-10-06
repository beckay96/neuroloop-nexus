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
import { Activity } from "lucide-react";
import { SYMPTOM_TYPES, BODY_LOCATIONS, SEIZURE_TRIGGERS } from "@/utils/databaseEnums";

interface SymptomLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (data: any) => void;
}

export default function SymptomLogModal({ isOpen, onClose, onComplete }: SymptomLogModalProps) {
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

  const reliefMethods = [
    "Rest/Sleep",
    "Medication",
    "Cold compress",
    "Hot compress",
    "Massage",
    "Breathing exercises",
    "Hydration",
    "Food",
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

  const toggleReliefMethod = (method: string) => {
    const updated = symptomLog.relief_methods_tried.includes(method)
      ? symptomLog.relief_methods_tried.filter(m => m !== method)
      : [...symptomLog.relief_methods_tried, method];
    updateSymptomLog("relief_methods_tried", updated);
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card border border-border z-50 max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center flex items-center justify-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Log Symptom
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <Card className="p-4">
            <h3 className="font-semibold mb-3">When & What</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <CustomDatePicker
                    label="Date"
                    value={symptomLog.log_date}
                    onChange={(value) => updateSymptomLog("log_date", value)}
                    max={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <Label>Time</Label>
                  <Input
                    type="time"
                    value={symptomLog.log_time}
                    onChange={(e) => updateSymptomLog("log_time", e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label>Symptom Type *</Label>
                <Select 
                  value={symptomLog.symptom_type} 
                  onValueChange={(value) => updateSymptomLog("symptom_type", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select symptom" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border border-border z-50">
                    {SYMPTOM_TYPES.map(symptom => (
                      <SelectItem key={symptom.value} value={symptom.value}>{symptom.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Severity (1-10): {symptomLog.severity}</Label>
                <Slider
                  value={[symptomLog.severity]}
                  onValueChange={(value) => updateSymptomLog("severity", value[0])}
                  max={10}
                  min={1}
                  step={1}
                  className="mt-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Very Mild</span>
                  <span>Very Severe</span>
                </div>
              </div>

              <div>
                <Label>Duration (minutes)</Label>
                <Input
                  type="number"
                  value={symptomLog.duration_minutes}
                  onChange={(e) => updateSymptomLog("duration_minutes", parseInt(e.target.value) || 0)}
                  placeholder="How long did it last?"
                />
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="font-semibold mb-3">Body Location</h3>
            <div className="grid grid-cols-3 gap-2">
              {BODY_LOCATIONS.map(location => (
                <div key={location.value} className="flex items-center space-x-2">
                  <Checkbox
                    checked={symptomLog.body_locations.includes(location.value)}
                    onCheckedChange={() => toggleArrayItem(symptomLog.body_locations, location.value, "body_locations")}
                  />
                  <label className="text-sm">{location.label}</label>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="font-semibold mb-3">Impact on Daily Life</h3>
            
            <div className="space-y-4">
              <div>
                <Label>Impact on Daily Activities (1-10): {symptomLog.impact_on_daily_activities}</Label>
                <Slider
                  value={[symptomLog.impact_on_daily_activities]}
                  onValueChange={(value) => updateSymptomLog("impact_on_daily_activities", value[0])}
                  max={10}
                  min={1}
                  step={1}
                  className="mt-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>No Impact</span>
                  <span>Completely Debilitating</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={symptomLog.work_school_affected}
                  onCheckedChange={(checked) => updateSymptomLog("work_school_affected", checked)}
                />
                <Label className="cursor-pointer">Affected work/school</Label>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="font-semibold mb-3">Relief Methods</h3>
            
            <div className="space-y-4">
              <div>
                <Label>What did you try?</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {reliefMethods.map(method => (
                    <div key={method} className="flex items-center space-x-2">
                      <Checkbox
                        checked={symptomLog.relief_methods_tried.includes(method)}
                        onCheckedChange={() => toggleReliefMethod(method)}
                      />
                      <label className="text-sm">{method}</label>
                    </div>
                  ))}
                </div>
              </div>

              {symptomLog.relief_methods_tried.length > 0 && (
                <div>
                  <Label>Relief Effectiveness (1-10): {symptomLog.relief_effectiveness || "Not rated"}</Label>
                  <Slider
                    value={[symptomLog.relief_effectiveness]}
                    onValueChange={(value) => updateSymptomLog("relief_effectiveness", value[0])}
                    max={10}
                    min={1}
                    step={1}
                    className="mt-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Not Effective</span>
                    <span>Completely Relieved</span>
                  </div>
                </div>
              )}
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="font-semibold mb-3">Possible Triggers</h3>
            <div className="grid grid-cols-2 gap-2">
              {SEIZURE_TRIGGERS.map(trigger => (
                <div key={trigger.value} className="flex items-center space-x-2">
                  <Checkbox
                    checked={symptomLog.identified_triggers.includes(trigger.value)}
                    onCheckedChange={() => toggleArrayItem(symptomLog.identified_triggers, trigger.value, "identified_triggers")}
                  />
                  <label className="text-sm">{trigger.label}</label>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-4">
            <Label>Additional Notes</Label>
            <Textarea
              value={symptomLog.notes}
              onChange={(e) => updateSymptomLog("notes", e.target.value)}
              placeholder="Any additional details about this symptom..."
              rows={3}
              className="mt-2"
            />
          </Card>

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              variant="hero" 
              onClick={handleComplete}
              disabled={!symptomLog.symptom_type}
            >
              Save Symptom Log
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

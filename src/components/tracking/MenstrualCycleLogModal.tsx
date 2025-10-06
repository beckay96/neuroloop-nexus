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
import { Calendar } from "lucide-react";
import { MENSTRUAL_FLOW, MENSTRUAL_PHASE, SYMPTOM_TYPES } from "@/utils/databaseEnums";

interface MenstrualCycleLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (data: any) => void;
}

export default function MenstrualCycleLogModal({ isOpen, onClose, onComplete }: MenstrualCycleLogModalProps) {
  const [menstrualLog, setMenstrualLog] = useState({
    cycle_start_date: new Date().toISOString().split('T')[0],
    cycle_end_date: "",
    cycle_length_days: 0,
    flow_intensity: "moderate" as string,
    cycle_phase: "menstrual" as string,
    symptoms: [] as string[],
    symptom_severity: 5,
    seizure_count_during_cycle: 0,
    seizure_clustered_around_menstruation: false,
    catamenial_pattern_suspected: false,
    notes: ""
  });

  const updateMenstrualLog = (key: string, value: any) => {
    setMenstrualLog(prev => ({ ...prev, [key]: value }));
  };

  const toggleArrayItem = (array: string[], itemValue: string, key: string) => {
    const updated = array.includes(itemValue) 
      ? array.filter(i => i !== itemValue)
      : [...array, itemValue];
    updateMenstrualLog(key, updated);
  };

  const calculateCycleLength = () => {
    if (menstrualLog.cycle_start_date && menstrualLog.cycle_end_date) {
      const start = new Date(menstrualLog.cycle_start_date);
      const end = new Date(menstrualLog.cycle_end_date);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      updateMenstrualLog("cycle_length_days", diffDays);
    }
  };

  const handleComplete = () => {
    const finalData = {
      ...menstrualLog,
      cycle_end_date: menstrualLog.cycle_end_date || null,
      cycle_length_days: menstrualLog.cycle_length_days || null,
      symptom_severity: menstrualLog.symptoms.length > 0 ? menstrualLog.symptom_severity : null,
      notes: menstrualLog.notes || null
    };
    onComplete(finalData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card border border-border z-50 max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center flex items-center justify-center gap-2">
            <Calendar className="h-5 w-5 text-pink-500" />
            Log Menstrual Cycle
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <Card className="p-4 bg-pink-50 dark:bg-pink-950/10 border-pink-200 dark:border-pink-800">
            <h3 className="font-semibold mb-2 text-pink-700 dark:text-pink-400">Research Importance</h3>
            <p className="text-xs text-muted-foreground">
              Up to 40% of women with epilepsy experience catamenial (menstrual-related) seizures. 
              Tracking your cycle helps identify patterns and improve treatment strategies.
            </p>
          </Card>
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Cycle Dates</h3>
            
            <div className="space-y-4">
              <div>
                <CustomDatePicker
                  label="Cycle Start Date"
                  value={menstrualLog.cycle_start_date}
                  onChange={(value) => {
                    updateMenstrualLog("cycle_start_date", value);
                    if (value) updateMenstrualLog("is_prediction", false);
                  }}
                  required
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div>
                <CustomDatePicker
                  label="Cycle End Date (Optional)"
                  value={menstrualLog.cycle_end_date}
                  onChange={(value) => updateMenstrualLog("cycle_end_date", value)}
                  max={new Date().toISOString().split('T')[0]}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Leave blank if cycle is ongoing
                </p>
              </div>
              {menstrualLog.cycle_length_days > 0 && (
                <div className="p-3 bg-accent rounded-lg">
                  <p className="text-sm font-medium">
                    Cycle Length: {menstrualLog.cycle_length_days} days
                  </p>
                </div>
              )}
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="font-semibold mb-3">Flow & Phase</h3>
            
            <div className="space-y-4">
              <div>
                <Label>Flow Intensity</Label>
                <Select 
                  value={menstrualLog.flow_intensity} 
                  onValueChange={(value) => updateMenstrualLog("flow_intensity", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border border-border z-50">
                    {MENSTRUAL_FLOW.map(flow => (
                      <SelectItem key={flow.value} value={flow.value}>{flow.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Cycle Phase</Label>
                <Select 
                  value={menstrualLog.cycle_phase} 
                  onValueChange={(value) => updateMenstrualLog("cycle_phase", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border border-border z-50">
                    {MENSTRUAL_PHASE.map(phase => (
                      <SelectItem key={phase.value} value={phase.value}>{phase.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="font-semibold mb-3">Symptoms</h3>
            
            <div className="space-y-4">
              <div>
                <Label>Select Symptoms Experienced</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {SYMPTOM_TYPES.map(symptom => (
                    <div key={symptom.value} className="flex items-center space-x-2">
                      <Checkbox
                        checked={menstrualLog.symptoms.includes(symptom.value)}
                        onCheckedChange={() => toggleArrayItem(menstrualLog.symptoms, symptom.value, "symptoms")}
                      />
                      <label className="text-sm">{symptom.label}</label>
                    </div>
                  ))}
                </div>
              </div>

              {menstrualLog.symptoms.length > 0 && (
                <div>
                  <Label>Overall Symptom Severity (1-10): {menstrualLog.symptom_severity}</Label>
                  <Slider
                    value={[menstrualLog.symptom_severity]}
                    onValueChange={(value) => updateMenstrualLog("symptom_severity", value[0])}
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
              )}
            </div>
          </Card>

          <Card className="p-4 bg-red-50 dark:bg-red-950/10 border-red-200 dark:border-red-800">
            <h3 className="font-semibold mb-3 text-red-700 dark:text-red-400">Seizure Correlation</h3>
            
            <div className="space-y-4">
              <div>
                <Label>Seizures During This Cycle</Label>
                <Input
                  type="number"
                  value={menstrualLog.seizure_count_during_cycle}
                  onChange={(e) => updateMenstrualLog("seizure_count_during_cycle", parseInt(e.target.value) || 0)}
                  placeholder="Number of seizures"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={menstrualLog.seizure_clustered_around_menstruation}
                  onCheckedChange={(checked) => updateMenstrualLog("seizure_clustered_around_menstruation", checked)}
                />
                <Label className="cursor-pointer">Seizures clustered around menstruation</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={menstrualLog.catamenial_pattern_suspected}
                  onCheckedChange={(checked) => updateMenstrualLog("catamenial_pattern_suspected", checked)}
                />
                <Label className="cursor-pointer">I suspect a catamenial (menstrual) seizure pattern</Label>
              </div>

              <div className="bg-white dark:bg-gray-900 p-3 rounded-lg">
                <p className="text-xs text-muted-foreground">
                  <strong>Catamenial epilepsy:</strong> Seizure patterns tied to menstrual cycle phases. 
                  Affects hormonal treatment decisions. Your tracking helps identify this pattern.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <Label>Additional Notes</Label>
            <Textarea
              value={menstrualLog.notes}
              onChange={(e) => updateMenstrualLog("notes", e.target.value)}
              placeholder="Any additional observations about this cycle..."
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
            >
              Save Menstrual Log
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

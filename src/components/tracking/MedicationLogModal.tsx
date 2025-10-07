import { useState, useEffect } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Pill } from "lucide-react";
import { MEDICATION_ADHERENCE, SYMPTOM_TYPES } from "@/utils/databaseEnums";
import { supabase } from "@/integrations/supabase/client";

interface MedicationLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (data: any) => void;
}

export default function MedicationLogModal({ isOpen, onClose, onComplete }: MedicationLogModalProps) {
  const [userMedications, setUserMedications] = useState<any[]>([]);
  const [medicationLog, setMedicationLog] = useState({
    user_medication_id: "",
    log_date: new Date().toISOString().split('T')[0],
    log_time: new Date().toTimeString().slice(0, 5),
    adherence_status: "taken_on_time" as string,
    dosage_amount: 0,
    dosage_unit: "",
    planned_time: "",
    actual_time: "",
    missed_reason: "",
    side_effects_present: false,
    side_effect_types: [] as string[],
    side_effect_severity: "none" as string,
    plasma_level: null as number | null,
    plasma_level_unit: "",
    notes: ""
  });

  useEffect(() => {
    if (isOpen) {
      loadUserMedications();
    }
  }, [isOpen]);

  const loadUserMedications = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // HIPAA-compliant: Use RPC function instead of direct table access
      const { data, error } = await supabase
        .rpc('get_user_medications', { p_user_id: user.id });

      if (error) {
        console.error('Error loading medications:', error);
        return;
      }

      setUserMedications(data || []);
    } catch (error) {
      console.error('Error loading medications:', error);
    }
  };

  const updateMedicationLog = (key: string, value: any) => {
    setMedicationLog(prev => ({ ...prev, [key]: value }));
  };

  const toggleArrayItem = (array: string[], itemValue: string, key: string) => {
    const updated = array.includes(itemValue) 
      ? array.filter(i => i !== itemValue)
      : [...array, itemValue];
    updateMedicationLog(key, updated);
  };

  const handleComplete = () => {
    const finalData = {
      ...medicationLog,
      dosage_amount: medicationLog.dosage_amount || null,
      plasma_level: medicationLog.plasma_level || null,
      missed_reason: medicationLog.missed_reason || null,
      notes: medicationLog.notes || null
    };
    onComplete(finalData);
    onClose();
  };

  const selectedMedication = userMedications.find(m => m.id === medicationLog.user_medication_id);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card border border-border z-50 max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center flex items-center justify-center gap-2">
            <Pill className="h-5 w-5 text-primary" />
            Log Medication
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Medication Selection</h3>
            
            <div className="space-y-4">
              <div>
                <Label>Select Medication *</Label>
                <Select 
                  value={medicationLog.user_medication_id} 
                  onValueChange={(value) => {
                    updateMedicationLog("user_medication_id", value);
                    const med = userMedications.find(m => m.id === value);
                    if (med) {
                      updateMedicationLog("dosage_amount", med.dosage_amount);
                      updateMedicationLog("dosage_unit", med.dosage_unit);
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a medication" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border border-border z-50">
                    {userMedications.map(med => (
                      <SelectItem key={med.id} value={med.id}>
                        {med.medications?.name || "Unknown"} - {med.dosage_amount}{med.dosage_unit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <CustomDatePicker
                    label="Date"
                    value={medicationLog.log_date}
                    onChange={(value) => updateMedicationLog("log_date", value)}
                    max={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <Label>Time Taken</Label>
                  <Input
                    type="time"
                    value={medicationLog.log_time}
                    onChange={(e) => updateMedicationLog("log_time", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="font-semibold mb-3">Adherence</h3>
            
            <div className="space-y-4">
              <div>
                <Label>Status *</Label>
                <Select 
                  value={medicationLog.adherence_status} 
                  onValueChange={(value) => updateMedicationLog("adherence_status", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border border-border z-50">
                    {MEDICATION_ADHERENCE.map(option => (
                      <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {medicationLog.adherence_status === "missed" && (
                <div>
                  <Label>Reason for Missing</Label>
                  <Textarea
                    value={medicationLog.missed_reason}
                    onChange={(e) => updateMedicationLog("missed_reason", e.target.value)}
                    placeholder="Why was this dose missed?"
                    rows={2}
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Planned Time</Label>
                  <Input
                    type="time"
                    value={medicationLog.planned_time}
                    onChange={(e) => updateMedicationLog("planned_time", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Actual Time</Label>
                  <Input
                    type="time"
                    value={medicationLog.actual_time}
                    onChange={(e) => updateMedicationLog("actual_time", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="font-semibold mb-3">Side Effects</h3>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={medicationLog.side_effects_present}
                  onCheckedChange={(checked) => updateMedicationLog("side_effects_present", checked)}
                />
                <Label className="cursor-pointer">I experienced side effects</Label>
              </div>

              {medicationLog.side_effects_present && (
                <>
                  <div>
                    <Label>Side Effect Types</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {SYMPTOM_TYPES.map(symptom => (
                        <div key={symptom.value} className="flex items-center space-x-2">
                          <Checkbox
                            checked={medicationLog.side_effect_types.includes(symptom.value)}
                            onCheckedChange={() => toggleArrayItem(medicationLog.side_effect_types, symptom.value, "side_effect_types")}
                          />
                          <label className="text-sm">{symptom.label}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Severity</Label>
                    <Select 
                      value={medicationLog.side_effect_severity} 
                      onValueChange={(value) => updateMedicationLog("side_effect_severity", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border border-border z-50">
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="mild">Mild</SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                        <SelectItem value="severe">Severe</SelectItem>
                        <SelectItem value="life_threatening">Life Threatening</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="font-semibold mb-3">Clinical Data (Optional)</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Plasma Level</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={medicationLog.plasma_level || ""}
                  onChange={(e) => updateMedicationLog("plasma_level", parseFloat(e.target.value) || null)}
                  placeholder="If available"
                />
              </div>
              <div>
                <Label>Unit</Label>
                <Input
                  value={medicationLog.plasma_level_unit}
                  onChange={(e) => updateMedicationLog("plasma_level_unit", e.target.value)}
                  placeholder="e.g., mg/L"
                />
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <Label>Additional Notes</Label>
            <Textarea
              value={medicationLog.notes}
              onChange={(e) => updateMedicationLog("notes", e.target.value)}
              placeholder="Any additional details..."
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
              disabled={!medicationLog.user_medication_id}
            >
              Save Medication Log
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

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
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Pill, Clock, CheckCircle, AlertCircle } from "lucide-react";

interface MedicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (data: any) => void;
}

export default function MedicationModal({ isOpen, onClose, onComplete }: MedicationModalProps) {
  const [medicationLog, setMedicationLog] = useState({
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().slice(0, 5),
    medication_name: "",
    dosage_taken: "",
    taken: true,
    effectiveness_rating: [7],
    effectiveness_option: "rate", // "rate", "not_sure", "not_relevant"
    side_effects: [] as string[],
    notes: "",
    missed_reason: "",
    other_medication: "",
    other_side_effect: "",
    other_missed_reason: ""
  });

  // Sample medications - in real app this would come from user's medication list
  const userMedications = [
    { name: "Levetiracetam (Keppra)", dosage: "500mg", scheduled_time: "08:00" },
    { name: "Levetiracetam (Keppra)", dosage: "500mg", scheduled_time: "20:00" },
    { name: "Lamotrigine (Lamictal)", dosage: "100mg", scheduled_time: "08:00" },
    { name: "Vitamin D", dosage: "1000 IU", scheduled_time: "08:00" }
  ];

  const commonSideEffects = [
    "Drowsiness",
    "Dizziness", 
    "Nausea",
    "Headache",
    "Fatigue",
    "Mood changes",
    "Weight gain",
    "Weight loss",
    "Skin rash",
    "Memory problems",
    "Coordination issues",
    "Other"
  ];

  const missedReasons = [
    "Forgot to take",
    "Ran out of medication",
    "Side effects",
    "Feeling better",
    "Away from home",
    "Sick/vomiting",
    "Other"
  ];

  const updateMedicationLog = (key: string, value: any) => {
    setMedicationLog(prev => ({ ...prev, [key]: value }));
  };

  const toggleSideEffect = (effect: string) => {
    const updated = medicationLog.side_effects.includes(effect)
      ? medicationLog.side_effects.filter(e => e !== effect)
      : [...medicationLog.side_effects, effect];
    updateMedicationLog("side_effects", updated);
  };

  const handleComplete = () => {
    const finalData = {
      ...medicationLog,
      // Use the actual medication name if "other" was selected
      medication_name: medicationLog.medication_name === "other" ? medicationLog.other_medication : medicationLog.medication_name,
      // Include effectiveness rating only if user chose to rate
      effectiveness_rating: medicationLog.effectiveness_option === "rate" ? medicationLog.effectiveness_rating[0] : null,
      effectiveness_option: medicationLog.effectiveness_option,
      // Handle other fields
      missed_reason: medicationLog.missed_reason === "Other" ? medicationLog.other_missed_reason : medicationLog.missed_reason,
      side_effects: medicationLog.side_effects.includes("Other") 
        ? [...medicationLog.side_effects.filter(e => e !== "Other"), medicationLog.other_side_effect].filter(Boolean)
        : medicationLog.side_effects,
      logged_at: new Date().toISOString()
    };
    
    onComplete(finalData);
    onClose();
  };

  const getCurrentTimeMedications = () => {
    const currentHour = new Date().getHours();
    const currentTime = `${currentHour.toString().padStart(2, '0')}:00`;
    
    return userMedications.filter(med => {
      const medHour = parseInt(med.scheduled_time.split(':')[0]);
      return Math.abs(currentHour - medHour) <= 1; // Within 1 hour
    });
  };

  const upcomingMedications = getCurrentTimeMedications();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card border border-border z-50 max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center flex items-center justify-center gap-2">
            <Pill className="h-5 w-5 text-secondary" />
            Medication Tracking
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Quick Actions for Current Medications */}
          {upcomingMedications.length > 0 && (
            <Card className="p-4 bg-secondary/5 border-secondary/20">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Clock className="h-4 w-4 text-secondary" />
                Due Now
              </h3>
              <div className="space-y-2">
                {upcomingMedications.map((med, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-background rounded-lg border">
                    <div>
                      <p className="font-medium">{med.name}</p>
                      <p className="text-sm text-muted-foreground">{med.dosage} • {med.scheduled_time}</p>
                    </div>
                    <Button 
                      size="sm" 
                      onClick={() => {
                        updateMedicationLog("medication_name", med.name);
                        updateMedicationLog("dosage_taken", med.dosage);
                      }}
                    >
                      Log This
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Date and Time */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3">When was this taken?</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <CustomDatePicker
                  label="Date"
                  value={medicationLog.date}
                  onChange={(value) => updateMedicationLog("date", value)}
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <Label>Time</Label>
                <Input
                  type="time"
                  value={medicationLog.time}
                  onChange={(e) => updateMedicationLog("time", e.target.value)}
                />
              </div>
            </div>
          </Card>

          {/* Medication Details */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Medication Details</h3>
            <div className="space-y-4">
              <div>
                <Label>Medication Name</Label>
                <Select 
                  value={medicationLog.medication_name} 
                  onValueChange={(value) => updateMedicationLog("medication_name", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select medication" />
                  </SelectTrigger>
                  <SelectContent>
                    {[...new Set(userMedications.map(med => med.name))].map(name => (
                      <SelectItem key={name} value={name}>{name}</SelectItem>
                    ))}
                    <SelectItem value="other">Other medication...</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {medicationLog.medication_name === "other" && (
                <Input
                  placeholder="Enter medication name"
                  value={medicationLog.other_medication}
                  onChange={(e) => updateMedicationLog("other_medication", e.target.value)}
                />
              )}

              <div>
                <Label>Dosage Taken</Label>
                <Input
                  value={medicationLog.dosage_taken}
                  onChange={(e) => updateMedicationLog("dosage_taken", e.target.value)}
                  placeholder="e.g., 500mg"
                />
              </div>
            </div>
          </Card>

          {/* Taken Status */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Status</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={medicationLog.taken}
                  onCheckedChange={(checked) => updateMedicationLog("taken", checked)}
                />
                <label className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-status-stable" />
                  Medication taken successfully
                </label>
              </div>

              {!medicationLog.taken && (
                <div className="space-y-3">
                  <div>
                    <Label>Reason for missing</Label>
                    <Select 
                      value={medicationLog.missed_reason} 
                      onValueChange={(value) => updateMedicationLog("missed_reason", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Why wasn't this taken?" />
                      </SelectTrigger>
                      <SelectContent>
                        {missedReasons.map(reason => (
                          <SelectItem key={reason} value={reason}>{reason}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {medicationLog.missed_reason === "Other" && (
                    <Input
                      placeholder="Please specify the reason"
                      value={medicationLog.other_missed_reason}
                      onChange={(e) => updateMedicationLog("other_missed_reason", e.target.value)}
                    />
                  )}
                </div>
              )}
            </div>
          </Card>

          {/* Effectiveness (only if taken) */}
          {medicationLog.taken && (
            <Card className="p-4">
              <h3 className="font-semibold mb-3">How effective was this dose?</h3>
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="grid grid-cols-1 gap-2">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="effectiveness"
                        value="rate"
                        checked={medicationLog.effectiveness_option === "rate"}
                        onChange={(e) => updateMedicationLog("effectiveness_option", e.target.value)}
                        className="w-4 h-4 text-primary"
                      />
                      <span className="text-sm">Rate effectiveness (1-10)</span>
                    </label>
                    
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="effectiveness"
                        value="not_sure"
                        checked={medicationLog.effectiveness_option === "not_sure"}
                        onChange={(e) => updateMedicationLog("effectiveness_option", e.target.value)}
                        className="w-4 h-4 text-primary"
                      />
                      <span className="text-sm">Not sure yet</span>
                    </label>
                    
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="effectiveness"
                        value="not_relevant"
                        checked={medicationLog.effectiveness_option === "not_relevant"}
                        onChange={(e) => updateMedicationLog("effectiveness_option", e.target.value)}
                        className="w-4 h-4 text-primary"
                      />
                      <span className="text-sm">Not relevant</span>
                    </label>
                  </div>
                  
                  {medicationLog.effectiveness_option === "rate" && (
                    <div>
                      <Label>Effectiveness (1-10): {medicationLog.effectiveness_rating[0]}</Label>
                      <Slider
                        value={medicationLog.effectiveness_rating}
                        onValueChange={(value) => updateMedicationLog("effectiveness_rating", value)}
                        max={10}
                        min={1}
                        step={1}
                        className="mt-2"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>Not effective</span>
                        <span>Very effective</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          )}

          {/* Side Effects */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-warning" />
              Any side effects?
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {commonSideEffects.map(effect => (
                <div key={effect} className="flex items-center space-x-2">
                  <Checkbox
                    checked={medicationLog.side_effects.includes(effect)}
                    onCheckedChange={() => toggleSideEffect(effect)}
                  />
                  <label className="text-sm">{effect}</label>
                </div>
              ))}
            </div>
            
            {medicationLog.side_effects.includes("Other") && (
              <div className="mt-3">
                <Input
                  placeholder="Please specify the side effect"
                  value={medicationLog.other_side_effect}
                  onChange={(e) => updateMedicationLog("other_side_effect", e.target.value)}
                />
              </div>
            )}
            
            {medicationLog.side_effects.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1">
                {medicationLog.side_effects.map(effect => (
                  <Badge key={effect} variant="secondary" className="text-xs">
                    {effect}
                  </Badge>
                ))}
              </div>
            )}
          </Card>

          {/* Notes */}
          <Card className="p-4">
            <Label>Additional Notes</Label>
            <Textarea
              value={medicationLog.notes}
              onChange={(e) => updateMedicationLog("notes", e.target.value)}
              placeholder="Any additional notes about this medication..."
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
              disabled={
                (!medicationLog.medication_name || !medicationLog.dosage_taken) ||
                (medicationLog.medication_name === "other" && !medicationLog.other_medication)
              }
            >
              Save Medication Log
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
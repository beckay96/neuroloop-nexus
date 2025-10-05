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
import { Zap, Clock, AlertTriangle, Brain, Activity } from "lucide-react";
import { 
  SEIZURE_TYPES, 
  CONSCIOUSNESS_LEVELS, 
  SEIZURE_TRIGGERS, 
  SYMPTOM_TYPES,
  MEDICATION_ADHERENCE 
} from "@/utils/databaseEnums";
import { useSeizureLogs } from "@/hooks/useSeizureLogs";
import { useAuth } from "@/hooks/useAuth";

interface SeizureLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (data: any) => void;
}

export default function SeizureLogModal({ isOpen, onClose, onComplete }: SeizureLogModalProps) {
  const { user } = useAuth();
  const { addSeizureLog } = useSeizureLogs(user?.id);
  const [currentSection, setCurrentSection] = useState(0);
  const [seizureData, setSeizureData] = useState({
    event_date: new Date().toISOString().split('T')[0],
    event_time: new Date().toTimeString().slice(0, 5),
    seizure_type: "",
    duration_seconds: 60,
    consciousness_level: "",
    
    // Pre-ictal (before seizure)
    aura_present: false,
    aura_description: "",
    pre_ictal_symptoms: [] as string[],
    
    // Ictal (during seizure)
    witnessed: false,
    witness_name: "",
    video_recorded: false,
    location_type: "",
    
    // Post-ictal (after seizure)
    post_ictal_confusion_minutes: 0,
    post_ictal_symptoms: [] as string[],
    recovery_time_minutes: 0,
    
    // Triggers & Context
    identified_triggers: [] as string[],
    sleep_hours_prior: 7,
    medication_adherence_prior: "taken_on_time" as string,
    stress_level: 5,
    
    // Medical response
    emergency_services_called: false,
    rescue_medication_used: false,
    rescue_medication_name: "",
    hospitalized: false,
    
    notes: ""
  });

  const sections = [
    { title: "Basic Info", icon: Clock },
    { title: "Pre-Seizure", icon: Brain },
    { title: "During Seizure", icon: Zap },
    { title: "After Seizure", icon: Activity },
    { title: "Context & Response", icon: AlertTriangle }
  ];

  const updateSeizureData = (key: string, value: any) => {
    setSeizureData(prev => ({ ...prev, [key]: value }));
  };

  const toggleArrayItem = (array: string[], itemValue: string, key: string) => {
    const updated = array.includes(itemValue) 
      ? array.filter(i => i !== itemValue)
      : [...array, itemValue];
    updateSeizureData(key, updated);
  };

  const handleComplete = async () => {
    if (!user?.id) return;
    
    // Save to database
    const result = await addSeizureLog({
      user_id: user.id,
      log_date: seizureData.event_date,
      seizure_type: seizureData.seizure_type as any,
      duration_seconds: seizureData.duration_seconds,
      consciousness_level: seizureData.consciousness_level as any,
      aura_present: seizureData.aura_present,
      aura_description: seizureData.aura_description,
      pre_ictal_symptoms: seizureData.pre_ictal_symptoms,
      witnessed: seizureData.witnessed,
      witness_name: seizureData.witness_name,
      video_recorded: seizureData.video_recorded,
      location_type: seizureData.location_type,
      post_ictal_confusion_minutes: seizureData.post_ictal_confusion_minutes,
      post_ictal_symptoms: seizureData.post_ictal_symptoms,
      recovery_time_minutes: seizureData.recovery_time_minutes,
      identified_triggers: seizureData.identified_triggers,
      sleep_hours_prior: seizureData.sleep_hours_prior,
      medication_adherence_prior: seizureData.medication_adherence_prior,
      stress_level: seizureData.stress_level,
      emergency_services_called: seizureData.emergency_services_called,
      rescue_medication_used: seizureData.rescue_medication_used,
      rescue_medication_name: seizureData.rescue_medication_name,
      hospitalized: seizureData.hospitalized,
      notes: seizureData.notes
    });
    
    if (result?.success) {
      onComplete(seizureData);
      onClose();
    }
  };

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(prev => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentSection > 0) {
      setCurrentSection(prev => prev - 1);
    }
  };

  const renderSection = () => {
    switch (currentSection) {
      case 0: // Basic Info
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <CustomDatePicker
                  label="Date"
                  value={seizureData.event_date}
                  onChange={(value) => updateSeizureData("event_date", value)}
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <Label>Time</Label>
                <Input
                  type="time"
                  value={seizureData.event_time}
                  onChange={(e) => updateSeizureData("event_time", e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label>Seizure Type *</Label>
              <Select 
                value={seizureData.seizure_type} 
                onValueChange={(value) => updateSeizureData("seizure_type", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select seizure type" />
                </SelectTrigger>
                <SelectContent className="bg-popover border border-border z-50">
                  {SEIZURE_TYPES.map(type => (
                    <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Duration: {Math.floor(seizureData.duration_seconds / 60)}m {seizureData.duration_seconds % 60}s</Label>
              <Slider
                value={[seizureData.duration_seconds]}
                onValueChange={(value) => updateSeizureData("duration_seconds", value[0])}
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
              <Label>Consciousness Level</Label>
              <Select 
                value={seizureData.consciousness_level} 
                onValueChange={(value) => updateSeizureData("consciousness_level", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select consciousness level" />
                </SelectTrigger>
                <SelectContent className="bg-popover border border-border z-50">
                  {CONSCIOUSNESS_LEVELS.map(level => (
                    <SelectItem key={level.value} value={level.value}>{level.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Location</Label>
              <Input
                value={seizureData.location_type}
                onChange={(e) => updateSeizureData("location_type", e.target.value)}
                placeholder="Where did this occur? (e.g., home, work, outdoors)"
              />
            </div>
          </div>
        );

      case 1: // Pre-Seizure
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 p-4 bg-accent/50 rounded-lg">
              <Checkbox
                checked={seizureData.aura_present}
                onCheckedChange={(checked) => updateSeizureData("aura_present", checked)}
              />
              <Label className="cursor-pointer">I experienced an aura (warning sign) before this seizure</Label>
            </div>

            {seizureData.aura_present && (
              <div>
                <Label>Describe the Aura</Label>
                <Textarea
                  value={seizureData.aura_description}
                  onChange={(e) => updateSeizureData("aura_description", e.target.value)}
                  placeholder="What did you experience? (e.g., unusual smell, déjà vu, stomach sensation, visual changes)"
                  rows={3}
                />
              </div>
            )}

            <div>
              <Label>Pre-Seizure Symptoms</Label>
              <p className="text-xs text-muted-foreground mb-2">
                Select any symptoms you experienced before the seizure
              </p>
              <div className="grid grid-cols-2 gap-2">
                {SYMPTOM_TYPES.slice(0, 10).map(symptom => (
                  <div key={symptom.value} className="flex items-center space-x-2">
                    <Checkbox
                      checked={seizureData.pre_ictal_symptoms.includes(symptom.value)}
                      onCheckedChange={() => toggleArrayItem(seizureData.pre_ictal_symptoms, symptom.value, "pre_ictal_symptoms")}
                    />
                    <label className="text-sm">{symptom.label}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 2: // During Seizure
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 p-4 bg-accent/50 rounded-lg">
              <Checkbox
                checked={seizureData.witnessed}
                onCheckedChange={(checked) => updateSeizureData("witnessed", checked)}
              />
              <Label className="cursor-pointer">Someone witnessed this seizure</Label>
            </div>

            {seizureData.witnessed && (
              <div>
                <Label>Witness Name (Optional)</Label>
                <Input
                  value={seizureData.witness_name}
                  onChange={(e) => updateSeizureData("witness_name", e.target.value)}
                  placeholder="Who witnessed the seizure?"
                />
              </div>
            )}

            <div className="flex items-center space-x-2 p-4 bg-accent/50 rounded-lg">
              <Checkbox
                checked={seizureData.video_recorded}
                onCheckedChange={(checked) => updateSeizureData("video_recorded", checked)}
              />
              <Label className="cursor-pointer">This seizure was recorded on video</Label>
            </div>
          </div>
        );

      case 3: // After Seizure
        return (
          <div className="space-y-4">
            <div>
              <Label>Post-Seizure Confusion Duration (minutes)</Label>
              <Input
                type="number"
                value={seizureData.post_ictal_confusion_minutes}
                onChange={(e) => updateSeizureData("post_ictal_confusion_minutes", parseInt(e.target.value) || 0)}
                placeholder="How long were you confused after?"
              />
            </div>

            <div>
              <Label>Recovery Time (minutes)</Label>
              <Input
                type="number"
                value={seizureData.recovery_time_minutes}
                onChange={(e) => updateSeizureData("recovery_time_minutes", parseInt(e.target.value) || 0)}
                placeholder="How long until you felt back to normal?"
              />
            </div>

            <div>
              <Label>Post-Seizure Symptoms</Label>
              <p className="text-xs text-muted-foreground mb-2">
                Select symptoms experienced after the seizure
              </p>
              <div className="grid grid-cols-2 gap-2">
                {SYMPTOM_TYPES.map(symptom => (
                  <div key={symptom.value} className="flex items-center space-x-2">
                    <Checkbox
                      checked={seizureData.post_ictal_symptoms.includes(symptom.value)}
                      onCheckedChange={() => toggleArrayItem(seizureData.post_ictal_symptoms, symptom.value, "post_ictal_symptoms")}
                    />
                    <label className="text-sm">{symptom.label}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 4: // Context & Response
        return (
          <div className="space-y-4">
            <div>
              <Label>Possible Triggers</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {SEIZURE_TRIGGERS.map(trigger => (
                  <div key={trigger.value} className="flex items-center space-x-2">
                    <Checkbox
                      checked={seizureData.identified_triggers.includes(trigger.value)}
                      onCheckedChange={() => toggleArrayItem(seizureData.identified_triggers, trigger.value, "identified_triggers")}
                    />
                    <label className="text-sm">{trigger.label}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Sleep Hours (night before)</Label>
                <Input
                  type="number"
                  step="0.5"
                  value={seizureData.sleep_hours_prior}
                  onChange={(e) => updateSeizureData("sleep_hours_prior", parseFloat(e.target.value) || 0)}
                />
              </div>

              <div>
                <Label>Medication Adherence</Label>
                <Select 
                  value={seizureData.medication_adherence_prior} 
                  onValueChange={(value) => updateSeizureData("medication_adherence_prior", value)}
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
            </div>

            <div>
              <Label>Stress Level (1-10): {seizureData.stress_level}</Label>
              <Slider
                value={[seizureData.stress_level]}
                onValueChange={(value) => updateSeizureData("stress_level", value[0])}
                max={10}
                min={1}
                step={1}
                className="mt-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Very Low</span>
                <span>Very High</span>
              </div>
            </div>

            <Card className="p-4 bg-destructive/5 border-destructive/20">
              <Label className="font-semibold mb-3 block">Medical Response</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={seizureData.emergency_services_called}
                    onCheckedChange={(checked) => updateSeizureData("emergency_services_called", checked)}
                  />
                  <label className="text-sm">Emergency services were called</label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={seizureData.rescue_medication_used}
                    onCheckedChange={(checked) => updateSeizureData("rescue_medication_used", checked)}
                  />
                  <label className="text-sm">Rescue medication was used</label>
                </div>

                {seizureData.rescue_medication_used && (
                  <Input
                    value={seizureData.rescue_medication_name}
                    onChange={(e) => updateSeizureData("rescue_medication_name", e.target.value)}
                    placeholder="Rescue medication name"
                    className="ml-6"
                  />
                )}

                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={seizureData.hospitalized}
                    onCheckedChange={(checked) => updateSeizureData("hospitalized", checked)}
                  />
                  <label className="text-sm">I was hospitalized</label>
                </div>
              </div>
            </Card>

            <div>
              <Label>Additional Notes</Label>
              <Textarea
                value={seizureData.notes}
                onChange={(e) => updateSeizureData("notes", e.target.value)}
                placeholder="Any additional details about this seizure..."
                rows={3}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const SectionIcon = sections[currentSection].icon;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card border border-border z-50 max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center flex items-center justify-center gap-2">
            <Zap className="h-5 w-5 text-status-critical" />
            Log Seizure Event - Research Grade
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Indicator */}
          <div className="flex justify-center space-x-2">
            {sections.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSection 
                    ? "bg-primary" 
                    : index < currentSection 
                      ? "bg-success" 
                      : "bg-muted"
                }`}
              />
            ))}
          </div>

          {/* Current Section */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg">
                <SectionIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">{sections[currentSection].title}</h3>
                <p className="text-xs text-muted-foreground">
                  Step {currentSection + 1} of {sections.length}
                </p>
              </div>
            </div>

            {renderSection()}
          </Card>

          {/* Navigation */}
          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={currentSection === 0 ? onClose : handlePrev}
            >
              {currentSection === 0 ? "Cancel" : "Previous"}
            </Button>
            
            <Button
              variant="hero"
              onClick={handleNext}
              disabled={!seizureData.seizure_type && currentSection === 0}
            >
              {currentSection === sections.length - 1 ? "Save Seizure Log" : "Next"}
            </Button>
          </div>

          <div className="bg-accent p-3 rounded-lg text-center">
            <p className="text-xs text-muted-foreground">
              🔬 <strong>Research-grade tracking:</strong> Your detailed data helps advance neurological research
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

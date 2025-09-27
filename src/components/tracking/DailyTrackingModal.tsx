import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { 
  Activity, 
  Heart, 
  Moon, 
  Battery,
  AlertCircle,
  Smile,
  CheckCircle
} from "lucide-react";

interface DailyTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (data: any) => void;
  isFirstTracking?: boolean;
}

const trackingCategories = [
  {
    id: "mood",
    title: "Mood Rating",
    icon: Smile,
    description: "How are you feeling today?",
    type: "slider",
    min: 1,
    max: 10,
    labels: ["Very Low", "Low", "Moderate", "Good", "Excellent"]
  },
  {
    id: "energy",
    title: "Energy Level", 
    icon: Battery,
    description: "Your energy level today",
    type: "slider",
    min: 1,
    max: 10,
    labels: ["Very Low", "Low", "Moderate", "High", "Very High"]
  },
  {
    id: "sleep",
    title: "Sleep Quality",
    icon: Moon,
    description: "How well did you sleep?",
    type: "slider", 
    min: 1,
    max: 10,
    labels: ["Very Poor", "Poor", "Fair", "Good", "Excellent"]
  },
  {
    id: "symptoms",
    title: "Symptom Selection",
    icon: Activity,
    description: "Select symptoms you experienced today",
    type: "symptom_selection",
    symptoms: [
      "Tremor",
      "Seizure activity", 
      "Fatigue",
      "Dizziness",
      "Headache",
      "Nausea",
      "Sleep problems",
      "Anxiety",
      "Depression",
      "Memory issues",
      "Confusion",
      "Mood changes",
      "Other"
    ]
  }
];

export default function DailyTrackingModal({ 
  isOpen, 
  onClose, 
  onComplete, 
  isFirstTracking = false 
}: DailyTrackingModalProps) {
  const [trackingData, setTrackingData] = useState({
    mood: [7],
    energy: [7],
    sleep: [7],
    symptoms: [] as string[],
    symptom_severities: {} as Record<string, number>,
    other_symptom: "",
    notes: "",
    medications_taken: true
  });

  const [currentCategory, setCurrentCategory] = useState(0);

  const updateTrackingData = (key: string, value: any) => {
    setTrackingData(prev => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (currentCategory < trackingCategories.length - 1) {
      setCurrentCategory(prev => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentCategory > 0) {
      setCurrentCategory(prev => prev - 1);
    }
  };

  const handleComplete = () => {
    const finalData = {
      ...trackingData,
      // Process symptoms and their severities
      symptoms: trackingData.symptoms.includes("Other") && trackingData.other_symptom
        ? [...trackingData.symptoms.filter(s => s !== "Other"), trackingData.other_symptom]
        : trackingData.symptoms,
      symptom_severities: trackingData.symptom_severities,
      date: new Date().toISOString().split('T')[0],
      completed_at: new Date().toISOString()
    };
    
    onComplete(finalData);
    onClose();
  };

  const currentTrackingItem = trackingCategories[currentCategory];
  const IconComponent = currentTrackingItem.icon;
  const currentValue = currentTrackingItem.type === "slider" 
    ? trackingData[currentTrackingItem.id as keyof typeof trackingData] as number[]
    : null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card border border-border z-50 max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center">
            {isFirstTracking ? "🎉 Your First Daily Tracking!" : "Daily Health Check-in"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Indicator */}
          <div className="flex justify-center space-x-2">
            {trackingCategories.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentCategory 
                    ? "bg-primary" 
                    : index < currentCategory 
                      ? "bg-success" 
                      : "bg-muted"
                }`}
              />
            ))}
          </div>

          {/* Current Category */}
          <Card className="p-6">
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <IconComponent className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{currentTrackingItem.title}</h3>
              <p className="text-sm text-muted-foreground">{currentTrackingItem.description}</p>
            </div>

            <div className="space-y-4">
              {currentTrackingItem.type === "slider" && currentValue && (
                <>
                  <div className="px-2">
                    <Slider
                      value={currentValue}
                      onValueChange={(value) => updateTrackingData(currentTrackingItem.id, value)}
                      max={currentTrackingItem.max}
                      min={currentTrackingItem.min}
                      step={1}
                      className="w-full"
                    />
                  </div>
                  
                  <div className="flex justify-between text-xs text-muted-foreground px-2">
                    <span>{currentTrackingItem.labels[0]}</span>
                    <span className="font-medium text-primary">
                      {currentValue[0]} / {currentTrackingItem.max}
                    </span>
                    <span>{currentTrackingItem.labels[currentTrackingItem.labels.length - 1]}</span>
                  </div>
                  
                  {currentValue[0] !== undefined && (
                    <div className="text-center">
                      <span className="text-sm font-medium">
                        {currentTrackingItem.labels[Math.floor((currentValue[0] - currentTrackingItem.min) / 
                          ((currentTrackingItem.max - currentTrackingItem.min) / (currentTrackingItem.labels.length - 1)))]}
                      </span>
                    </div>
                  )}
                </>
              )}

              {currentTrackingItem.type === "symptom_selection" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    {currentTrackingItem.symptoms?.map(symptom => (
                      <div key={symptom} className="flex items-center space-x-2">
                        <Checkbox
                          checked={trackingData.symptoms.includes(symptom)}
                          onCheckedChange={(checked) => {
                            const updatedSymptoms = checked
                              ? [...trackingData.symptoms, symptom]
                              : trackingData.symptoms.filter(s => s !== symptom);
                            updateTrackingData("symptoms", updatedSymptoms);
                          }}
                        />
                        <label className="text-sm">{symptom}</label>
                      </div>
                    ))}
                  </div>

                  {trackingData.symptoms.includes("Other") && (
                    <Input
                      placeholder="Please specify other symptom"
                      value={trackingData.other_symptom}
                      onChange={(e) => updateTrackingData("other_symptom", e.target.value)}
                    />
                  )}

                  {/* Severity rating for selected symptoms */}
                  {trackingData.symptoms.length > 0 && (
                    <div className="space-y-4 pt-4 border-t">
                      <h4 className="font-medium text-sm">Rate severity of selected symptoms:</h4>
                      {trackingData.symptoms
                        .filter(symptom => symptom !== "Other")
                        .map(symptom => (
                          <div key={symptom} className="space-y-2">
                            <Label className="text-sm">
                              {symptom}: {trackingData.symptom_severities[symptom] || 1}/10
                            </Label>
                            <Slider
                              value={[trackingData.symptom_severities[symptom] || 1]}
                              onValueChange={(value) => {
                                updateTrackingData("symptom_severities", {
                                  ...trackingData.symptom_severities,
                                  [symptom]: value[0]
                                });
                              }}
                              max={10}
                              min={1}
                              step={1}
                              className="w-full"
                            />
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>Very Mild</span>
                              <span>Very Severe</span>
                            </div>
                          </div>
                        ))}
                      
                      {trackingData.symptoms.includes("Other") && trackingData.other_symptom && (
                        <div className="space-y-2">
                          <Label className="text-sm">
                            {trackingData.other_symptom}: {trackingData.symptom_severities["Other"] || 1}/10
                          </Label>
                          <Slider
                            value={[trackingData.symptom_severities["Other"] || 1]}
                            onValueChange={(value) => {
                              updateTrackingData("symptom_severities", {
                                ...trackingData.symptom_severities,
                                "Other": value[0]
                              });
                            }}
                            max={10}
                            min={1}
                            step={1}
                            className="w-full"
                          />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Very Mild</span>
                            <span>Very Severe</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </Card>

          {/* Notes section (last step) */}
          {currentCategory === trackingCategories.length - 1 && (
            <Card className="p-4">
              <Label htmlFor="notes" className="text-sm font-medium mb-2 block">
                Additional Notes (Optional)
              </Label>
              <Textarea
                id="notes"
                value={trackingData.notes}
                onChange={(e) => updateTrackingData("notes", e.target.value)}
                placeholder="Any additional notes about today..."
                rows={3}
              />
            </Card>
          )}

          {isFirstTracking && (
            <div className="bg-accent p-4 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">
                🌟 <strong>Welcome to daily tracking!</strong> Regular tracking helps identify patterns 
                and improves your care outcomes.
              </p>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentCategory === 0}
            >
              Previous
            </Button>
            
            <Button
              variant="hero"
              onClick={handleNext}
            >
              {currentCategory === trackingCategories.length - 1 ? "Complete" : "Next"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
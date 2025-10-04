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
import { Slider } from "@/components/ui/slider";
import { 
  Smile,
  Battery,
  Moon,
  Activity
} from "lucide-react";
import { 
  numericToMoodEnum,
  numericToEnergyEnum,
  numericToSleepEnum
} from "@/utils/databaseEnums";

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
    min: 1,
    max: 10,
    labels: ["Very Poor", "Poor", "Neutral", "Good", "Very Good"]
  },
  {
    id: "energy",
    title: "Energy Level", 
    icon: Battery,
    description: "Your energy level today",
    min: 1,
    max: 10,
    labels: ["Exhausted", "Low", "Moderate", "High", "Very High"]
  },
  {
    id: "sleep",
    title: "Sleep Quality",
    icon: Moon,
    description: "How well did you sleep?",
    min: 1,
    max: 10,
    labels: ["Very Poor", "Poor", "Fair", "Good", "Excellent"]
  },
  {
    id: "details",
    title: "Additional Details",
    icon: Activity,
    description: "More information about today"
  }
];

export default function DailyTrackingModal({ 
  isOpen, 
  onClose, 
  onComplete, 
  isFirstTracking = false 
}: DailyTrackingModalProps) {
  const [trackingData, setTrackingData] = useState({
    log_date: new Date().toISOString().split('T')[0],
    mood_numeric: 6,
    energy_numeric: 6,
    sleep_numeric: 6,
    sleep_hours: 7,
    sleep_interruptions: 0,
    exercise_minutes: 0,
    exercise_type: "",
    stress_level: 5,
    notes: ""
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
    // Convert numeric values to database enums
    const finalData = {
      log_date: trackingData.log_date,
      mood: numericToMoodEnum(trackingData.mood_numeric),
      energy_level: numericToEnergyEnum(trackingData.energy_numeric),
      sleep_quality: numericToSleepEnum(trackingData.sleep_numeric),
      sleep_hours: trackingData.sleep_hours,
      sleep_interruptions: trackingData.sleep_interruptions,
      exercise_minutes: trackingData.exercise_minutes || null,
      exercise_type: trackingData.exercise_type || null,
      stress_level: trackingData.stress_level,
      notes: trackingData.notes || null
    };
    
    onComplete(finalData);
    onClose();
  };

  const renderCategory = () => {
    const currentItem = trackingCategories[currentCategory];
    
    if (currentCategory === 3) {
      // Additional Details
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Sleep Hours</Label>
              <Input
                type="number"
                step="0.5"
                value={trackingData.sleep_hours}
                onChange={(e) => updateTrackingData("sleep_hours", parseFloat(e.target.value) || 0)}
              />
            </div>
            <div>
              <Label>Sleep Interruptions</Label>
              <Input
                type="number"
                value={trackingData.sleep_interruptions}
                onChange={(e) => updateTrackingData("sleep_interruptions", parseInt(e.target.value) || 0)}
                placeholder="Times woken up"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Exercise (minutes)</Label>
              <Input
                type="number"
                value={trackingData.exercise_minutes}
                onChange={(e) => updateTrackingData("exercise_minutes", parseInt(e.target.value) || 0)}
                placeholder="0"
              />
            </div>
            <div>
              <Label>Exercise Type</Label>
              <Input
                value={trackingData.exercise_type}
                onChange={(e) => updateTrackingData("exercise_type", e.target.value)}
                placeholder="e.g., Walking, Yoga"
              />
            </div>
          </div>

          <div>
            <Label>Stress Level (1-10): {trackingData.stress_level}</Label>
            <Slider
              value={[trackingData.stress_level]}
              onValueChange={(value) => updateTrackingData("stress_level", value[0])}
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

          <div>
            <Label>Notes (Optional)</Label>
            <Textarea
              value={trackingData.notes}
              onChange={(e) => updateTrackingData("notes", e.target.value)}
              placeholder="Any additional notes about today..."
              rows={3}
            />
          </div>
        </div>
      );
    }

    // Mood, Energy, or Sleep sliders
    const fieldName = currentItem.id + "_numeric";
    const currentValue = trackingData[fieldName as keyof typeof trackingData] as number;

    return (
      <div className="space-y-4">
        <div className="px-2">
          <Slider
            value={[currentValue]}
            onValueChange={(value) => updateTrackingData(fieldName, value[0])}
            max={currentItem.max!}
            min={currentItem.min!}
            step={1}
            className="w-full"
          />
        </div>
        
        <div className="flex justify-between text-xs text-muted-foreground px-2">
          <span>{currentItem.labels![0]}</span>
          <span className="font-medium text-primary text-lg">
            {currentValue} / {currentItem.max}
          </span>
          <span>{currentItem.labels![currentItem.labels!.length - 1]}</span>
        </div>
        
        <div className="text-center">
          <span className="text-lg font-medium">
            {currentItem.labels![Math.floor((currentValue - currentItem.min!) / 
              ((currentItem.max! - currentItem.min!) / (currentItem.labels!.length - 1)))]}
          </span>
        </div>
      </div>
    );
  };

  const IconComponent = trackingCategories[currentCategory].icon;

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
              <h3 className="text-lg font-semibold mb-2">{trackingCategories[currentCategory].title}</h3>
              <p className="text-sm text-muted-foreground">{trackingCategories[currentCategory].description}</p>
            </div>

            {renderCategory()}
          </Card>

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

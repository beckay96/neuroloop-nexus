import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Clock, Plus, X, Brain, Pill, Thermometer, Calendar as CalendarIcon, Activity, Moon, Zap } from "lucide-react";

interface DailyTrackingStepProps {
  trackingTimes: string[];
  basalTempTime?: string;
  medicationTimes: string[];
  onUpdate: (times: string[]) => void;
  medications?: Array<{ name: string; times: string[]; frequency?: string }>;
  tracksMenstrual?: boolean;
}

export function DailyTrackingStep({
  trackingTimes,
  basalTempTime,
  medicationTimes,
  onUpdate,
  medications = [],
  tracksMenstrual = false
}: DailyTrackingStepProps) {
  const [customTime, setCustomTime] = useState("");

  // Generate smart schedule based on medication and basal temp times
  const generateSmartSchedule = () => {
    const timeMap = new Map<string, { time: string; type: string; emoji: string }>();
    
    // Add basal temp time if exists
    if (basalTempTime && tracksMenstrual) {
      timeMap.set(basalTempTime, { 
        time: basalTempTime, 
        type: "Basal temp",
        emoji: "🌡️"
      });
    }
    
    // Add medication times
    medicationTimes.forEach(time => {
      if (!timeMap.has(time)) {
        timeMap.set(time, {
          time: time,
          type: "Medication",
          emoji: "💊"
        });
      }
    });
    
    return Array.from(timeMap.values()).sort((a, b) => a.time.localeCompare(b.time));
  };

  const smartSchedule = generateSmartSchedule();

  const addTimeFromSuggestion = (time: string) => {
    if (!trackingTimes.includes(time)) {
      onUpdate([...trackingTimes, time].sort());
    }
  };

  const addCustomTime = () => {
    if (customTime && !trackingTimes.includes(customTime)) {
      onUpdate([...trackingTimes, customTime].sort());
      setCustomTime("");
    }
  };

  const removeTime = (time: string) => {
    onUpdate(trackingTimes.filter(t => t !== time));
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-foreground">Daily Tracking Schedule</h2>
        <p className="text-muted-foreground">
          Smart times based on your medication and tracking preferences
        </p>
      </div>

      {/* Smart Tracking Schedule Card */}
      <Card className="p-6 bg-card border-border">
        <div className="flex items-start gap-3 mb-4">
          <span className="text-2xl">🧠</span>
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-foreground">Smart Tracking Schedule</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Based on your medication times{tracksMenstrual && " and basal temperature schedule"}, we've created an optimal tracking schedule. 
              You can customize any times.
            </p>
          </div>
        </div>

        {/* Suggested Time Cards */}
        <div className="grid grid-cols-2 gap-3">
          {smartSchedule.map((item) => (
            <Card
              key={item.time}
              className="p-3 cursor-pointer border-2 hover:border-teal-500/50 transition-all"
              onClick={() => addTimeFromSuggestion(item.time)}
            >
              <div className="text-center">
                <div className="font-mono text-xl font-bold text-foreground">{item.time}</div>
                <div className="text-sm text-muted-foreground mt-1">
                  <span className="mr-1">{item.emoji}</span>
                  {item.type}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* Add Custom Time */}
      <div className="space-y-2">
        <Label className="font-semibold text-foreground">Add Custom Time:</Label>
        <div className="flex gap-2">
          <Input
            type="time"
            value={customTime}
            onChange={(e) => setCustomTime(e.target.value)}
            className="flex-1 font-mono border-2 focus-visible:border-teal-500 focus-visible:ring-teal-500"
          />
          <Button 
            onClick={addCustomTime}
            className="bg-teal-600 hover:bg-teal-700"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Your Selected Times */}
      <div className="space-y-2">
        <Label className="font-semibold text-foreground">
          Your Selected Times ({trackingTimes.length}):
        </Label>
        {trackingTimes.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No times selected yet - select from suggestions above
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {trackingTimes.map((time) => (
              <div
                key={time}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-teal-500/10 border border-teal-500/20"
              >
                <span className="font-mono font-semibold text-teal-600 dark:text-teal-400">{time}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 hover:bg-destructive/20"
                  onClick={() => removeTime(time)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Your Complete Tracking Schedule */}
      <Card className="p-4 bg-card border-border">
        <div className="flex items-start gap-3">
          <span className="text-xl">📋</span>
          <div className="flex-1 space-y-4">
            <h3 className="font-semibold text-foreground">Your Complete Tracking Schedule</h3>
            
            {/* Medications */}
            {medications.length > 0 && (
              <div className="p-3 bg-background/50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span>💊</span>
                  <span className="font-semibold text-foreground">Medications</span>
                </div>
                {medications.map((med, idx) => (
                  <div key={idx} className="text-sm text-muted-foreground">
                    {med.name}: {med.times.length} times/day
                  </div>
                ))}
              </div>
            )}

            {/* Daily Tracking */}
            <div className="p-3 bg-background/50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <span>📊</span>
                <span className="font-semibold text-foreground">Daily Tracking</span>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <div>Symptoms: {trackingTimes.length} check-ins</div>
                <div>Mood & Energy tracking</div>
                <div>Sleep quality logs</div>
              </div>
            </div>

            {/* Menstrual Tracking */}
            {tracksMenstrual && basalTempTime && (
              <div className="p-3 bg-background/50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span>🌡️</span>
                  <span className="font-semibold text-foreground">Menstrual Tracking</span>
                </div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>Basal temp: {basalTempTime}</div>
                  <div>Cycle tracking</div>
                  <div>Symptom correlation</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}

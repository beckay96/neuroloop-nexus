import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Clock, Plus, X, Brain, Pill, Thermometer, Calendar as CalendarIcon } from "lucide-react";

interface DailyTrackingStepProps {
  trackingTimes: string[];
  basalTempTime?: string;
  medicationTimes: string[];
  onUpdate: (times: string[]) => void;
}

export function DailyTrackingStep({
  trackingTimes,
  basalTempTime,
  medicationTimes,
  onUpdate
}: DailyTrackingStepProps) {
  const [customTime, setCustomTime] = useState("12:00");

  // Generate smart schedule based on medication and basal temp times
  const generateSmartSchedule = () => {
    const times = new Set<string>();
    
    // Add basal temp time if exists
    if (basalTempTime) times.add(basalTempTime);
    
    // Add medication times
    medicationTimes.forEach(time => times.add(time));
    
    // Ensure we have at least 2 tracking times
    if (times.size === 0) {
      times.add("08:00");
      times.add("20:00");
    } else if (times.size === 1) {
      // Add an evening time if only morning exists
      const existing = Array.from(times)[0];
      const hour = parseInt(existing.split(':')[0]);
      if (hour < 12) {
        times.add("20:00");
      } else {
        times.add("08:00");
      }
    }
    
    return Array.from(times).sort();
  };

  const smartSchedule = generateSmartSchedule();

  const addTime = () => {
    if (customTime && !trackingTimes.includes(customTime)) {
      onUpdate([...trackingTimes, customTime].sort());
      setCustomTime("12:00");
    }
  };

  const removeTime = (time: string) => {
    onUpdate(trackingTimes.filter(t => t !== time));
  };

  const getTimeLabel = (time: string) => {
    if (basalTempTime === time) return "Basal temp";
    if (medicationTimes.includes(time)) return "Medication";
    return "Custom";
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

      {/* Smart Schedule Card */}
      <Card className="p-6 bg-gradient-to-br from-primary/10 to-purple-500/5 border-primary/20">
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 rounded-lg bg-primary/20">
            <Brain className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-foreground">Smart Tracking Schedule</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Based on your medication times and basal temperature schedule, we've created an optimal tracking schedule. 
              You can customize any times.
            </p>
          </div>
        </div>

        {/* Suggested Times */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          {smartSchedule.map((time, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border"
            >
              <div className="flex-1">
                <div className="font-mono text-lg font-semibold text-foreground">{time}</div>
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  {basalTempTime === time && (
                    <>
                      <Thermometer className="h-3 w-3" />
                      <span>Basal temp</span>
                    </>
                  )}
                  {medicationTimes.includes(time) && (
                    <>
                      <Pill className="h-3 w-3" />
                      <span>Medication</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Add Custom Time */}
      <Card className="p-4 bg-card border-border">
        <Label className="text-sm font-semibold mb-3 block text-foreground">Add Custom Time:</Label>
        <div className="flex gap-2">
          <Input
            type="time"
            value={customTime}
            onChange={(e) => setCustomTime(e.target.value)}
            className="flex-1 font-mono text-lg"
          />
          <Button onClick={addTime} className="px-6">
            <Plus className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>
      </Card>

      {/* Your Selected Times */}
      {trackingTimes.length > 0 && (
        <Card className="p-4 bg-card border-border">
          <Label className="text-sm font-semibold mb-3 block text-foreground">
            Your Selected Times ({trackingTimes.length}):
          </Label>
          <div className="flex flex-wrap gap-2">
            {trackingTimes.map((time) => (
              <div
                key={time}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 border border-primary/20"
              >
                <span className="font-mono font-semibold text-primary">{time}</span>
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
        </Card>
      )}

      {/* Complete Schedule Preview */}
      <Card className="p-4 bg-gradient-to-br from-teal-500/5 to-purple-500/5 border-teal-500/20">
        <div className="flex items-start gap-3">
          <CalendarIcon className="h-5 w-5 text-teal-500 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">Your Complete Tracking Schedule</h3>
            <div className="mt-3 space-y-2">
              {trackingTimes.length > 0 ? (
                trackingTimes.map((time) => (
                  <div key={time} className="flex items-center gap-3 text-sm">
                    <span className="font-mono font-semibold text-teal-600 dark:text-teal-400 w-16">
                      {time}
                    </span>
                    <div className="flex gap-2">
                      {basalTempTime === time && (
                        <span className="px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs">
                          Basal temp
                        </span>
                      )}
                      {medicationTimes.includes(time) && (
                        <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs">
                          Medications
                        </span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  Add times above to create your tracking schedule
                </p>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

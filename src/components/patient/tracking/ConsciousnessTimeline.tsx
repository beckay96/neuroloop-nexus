import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Plus, X, AlertCircle } from "lucide-react";
import { DurationPicker } from "./DurationPicker";

interface ConsciousnessSegment {
  startMin: number;
  startSec: number;
  endMin: number;
  endSec: number;
  level: "aware" | "impaired" | "unresponsive" | "unknown";
}

interface ConsciousnessTimelineProps {
  segments: ConsciousnessSegment[];
  totalDuration: { minutes: number; seconds: number };
  onChange: (segments: ConsciousnessSegment[]) => void;
}

export function ConsciousnessTimeline({ 
  segments, 
  totalDuration, 
  onChange 
}: ConsciousnessTimelineProps) {
  const [errors, setErrors] = useState<string[]>([]);

  const totalSeconds = totalDuration.minutes * 60 + totalDuration.seconds;

  const toSeconds = (min: number, sec: number) => min * 60 + sec;
  const toMinSec = (totalSec: number) => ({
    min: Math.floor(totalSec / 60),
    sec: totalSec % 60
  });

  const validateSegments = (segs: ConsciousnessSegment[]): string[] => {
    const errs: string[] = [];
    
    segs.forEach((seg, idx) => {
      const start = toSeconds(seg.startMin, seg.startSec);
      const end = toSeconds(seg.endMin, seg.endSec);
      
      if (start >= end) {
        errs.push(`Segment ${idx + 1}: Start must be before end`);
      }
      if (end > totalSeconds) {
        errs.push(`Segment ${idx + 1}: Exceeds total duration`);
      }
    });

    // Check overlaps
    for (let i = 0; i < segs.length; i++) {
      for (let j = i + 1; j < segs.length; j++) {
        const seg1Start = toSeconds(segs[i].startMin, segs[i].startSec);
        const seg1End = toSeconds(segs[i].endMin, segs[i].endSec);
        const seg2Start = toSeconds(segs[j].startMin, segs[j].startSec);
        const seg2End = toSeconds(segs[j].endMin, segs[j].endSec);
        
        if ((seg1Start < seg2End && seg1End > seg2Start)) {
          errs.push(`Segments ${i + 1} and ${j + 1} overlap`);
        }
      }
    }

    return errs;
  };

  const updateSegment = (index: number, field: keyof ConsciousnessSegment, value: any) => {
    const newSegments = [...segments];
    newSegments[index] = { ...newSegments[index], [field]: value };
    const errs = validateSegments(newSegments);
    setErrors(errs);
    onChange(newSegments);
  };

  const addSegment = () => {
    const lastSeg = segments[segments.length - 1];
    const lastEnd = lastSeg ? toSeconds(lastSeg.endMin, lastSeg.endSec) : 0;
    const newStart = toMinSec(lastEnd);
    const newEnd = toMinSec(Math.min(lastEnd + 60, totalSeconds));
    
    onChange([...segments, {
      startMin: newStart.min,
      startSec: newStart.sec,
      endMin: newEnd.min,
      endSec: newEnd.sec,
      level: "unknown"
    }]);
  };

  const removeSegment = (index: number) => {
    if (segments.length > 1) {
      onChange(segments.filter((_, i) => i !== index));
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "aware": return "bg-green-100 dark:bg-green-900 border-green-300 dark:border-green-700";
      case "impaired": return "bg-yellow-100 dark:bg-yellow-900 border-yellow-300 dark:border-yellow-700";
      case "unresponsive": return "bg-red-100 dark:bg-red-900 border-red-300 dark:border-red-700";
      default: return "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-base">Consciousness Timeline</Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addSegment}
          disabled={totalSeconds === 0}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Segment
        </Button>
      </div>

      {errors.length > 0 && (
        <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
          <div className="flex gap-2">
            <AlertCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
            <div className="text-sm text-destructive">
              {errors.map((err, idx) => (
                <div key={idx}>{err}</div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {segments.map((segment, index) => (
          <Card key={index} className={`p-4 ${getLevelColor(segment.level)}`}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm">Segment {index + 1}</span>
                {segments.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSegment(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs">Start time</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="number"
                      min="0"
                      max="59"
                      value={segment.startMin}
                      onChange={(e) => updateSegment(index, "startMin", parseInt(e.target.value) || 0)}
                      className="w-16 p-2 border rounded text-center"
                      placeholder="min"
                    />
                    <span>:</span>
                    <input
                      type="number"
                      min="0"
                      max="59"
                      value={segment.startSec}
                      onChange={(e) => updateSegment(index, "startSec", parseInt(e.target.value) || 0)}
                      className="w-16 p-2 border rounded text-center"
                      placeholder="sec"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-xs">End time</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="number"
                      min="0"
                      max="59"
                      value={segment.endMin}
                      onChange={(e) => updateSegment(index, "endMin", parseInt(e.target.value) || 0)}
                      className="w-16 p-2 border rounded text-center"
                      placeholder="min"
                    />
                    <span>:</span>
                    <input
                      type="number"
                      min="0"
                      max="59"
                      value={segment.endSec}
                      onChange={(e) => updateSegment(index, "endSec", parseInt(e.target.value) || 0)}
                      className="w-16 p-2 border rounded text-center"
                      placeholder="sec"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-xs mb-2 block">Consciousness level</Label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: "aware", label: "Aware" },
                    { value: "impaired", label: "Impaired/Altered" },
                    { value: "unresponsive", label: "Unresponsive" },
                    { value: "unknown", label: "Unknown" }
                  ].map(option => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => updateSegment(index, "level", option.value)}
                      className={`p-2 rounded-md text-sm font-medium transition-colors ${
                        segment.level === option.value
                          ? "bg-primary text-primary-foreground"
                          : "bg-background border hover:bg-muted"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <p className="text-xs text-muted-foreground">
        Total seizure duration: {totalDuration.minutes}m {totalDuration.seconds}s
      </p>
    </div>
  );
}

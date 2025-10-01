import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Clock } from "lucide-react";

interface DurationPickerProps {
  minutes: number;
  seconds: number;
  onMinutesChange: (min: number) => void;
  onSecondsChange: (sec: number) => void;
  label?: string;
}

export function DurationPicker({ 
  minutes, 
  seconds, 
  onMinutesChange, 
  onSecondsChange,
  label 
}: DurationPickerProps) {
  
  const handleMinutesChange = (value: string) => {
    const num = parseInt(value) || 0;
    onMinutesChange(Math.max(0, Math.min(59, num)));
  };

  const handleSecondsChange = (value: string) => {
    const num = parseInt(value) || 0;
    onSecondsChange(Math.max(0, Math.min(59, num)));
  };

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      <div className="flex items-center gap-3">
        <Clock className="h-4 w-4 text-muted-foreground" />
        <div className="flex items-center gap-2">
          <div className="flex flex-col">
            <Input
              type="number"
              min="0"
              max="59"
              value={minutes}
              onChange={(e) => handleMinutesChange(e.target.value)}
              className="w-20 text-center"
              aria-label="Minutes"
            />
            <span className="text-xs text-muted-foreground text-center mt-1">min</span>
          </div>
          <span className="text-lg font-bold">:</span>
          <div className="flex flex-col">
            <Input
              type="number"
              min="0"
              max="59"
              value={seconds}
              onChange={(e) => handleSecondsChange(e.target.value)}
              className="w-20 text-center"
              aria-label="Seconds"
            />
            <span className="text-xs text-muted-foreground text-center mt-1">sec</span>
          </div>
        </div>
        <div className="text-sm text-muted-foreground ml-2">
          {minutes > 0 && `${minutes}m `}{seconds}s total
        </div>
      </div>
    </div>
  );
}

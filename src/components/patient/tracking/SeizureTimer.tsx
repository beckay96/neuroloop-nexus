import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Timer, Pause, Play, StopCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SeizureTimerProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (timerData: {
    startTime: Date;
    endTime: Date;
    duration: { minutes: number; seconds: number };
  }) => void;
}

export function SeizureTimer({ isOpen, onClose, onComplete }: SeizureTimerProps) {
  const { toast } = useToast();
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [pausedTime, setPausedTime] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && !isPaused) {
      intervalRef.current = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, isPaused]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsRunning(true);
    setIsPaused(false);
    setStartTime(new Date());
    setSeconds(0);
    setPausedTime(0);
    toast({
      title: "Timer Started",
      description: "Recording seizure duration...",
    });
  };

  const handlePause = () => {
    setIsPaused(true);
    setPausedTime(seconds);
    toast({
      title: "Timer Paused",
      description: "You can resume when ready",
    });
  };

  const handleResume = () => {
    setIsPaused(false);
    toast({
      title: "Timer Resumed",
      description: "Continuing to record...",
    });
  };

  const handleStop = () => {
    if (!startTime) return;

    const endTime = new Date();
    const durationMinutes = Math.floor(seconds / 60);
    const durationSeconds = seconds % 60;

    const timerData = {
      startTime,
      endTime,
      duration: {
        minutes: durationMinutes,
        seconds: durationSeconds
      }
    };

    // Reset timer
    setIsRunning(false);
    setIsPaused(false);
    setSeconds(0);
    setStartTime(null);
    setPausedTime(0);

    toast({
      title: "Timer Stopped",
      description: `Seizure duration: ${durationMinutes}m ${durationSeconds}s`,
    });

    // Pass data to parent and prompt for full details
    onComplete(timerData);
  };

  const handleCancel = () => {
    if (isRunning) {
      if (confirm("Are you sure you want to cancel? The timer data will be lost.")) {
        setIsRunning(false);
        setIsPaused(false);
        setSeconds(0);
        setStartTime(null);
        setPausedTime(0);
        onClose();
      }
    } else {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCancel}>
      <DialogContent className="bg-card border border-border max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Timer className="h-5 w-5 text-primary" />
            Seizure Timer
          </DialogTitle>
          <DialogDescription>
            Track the duration of the seizure event
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Safety Notice */}
          <Card className="border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950">
            <CardContent className="pt-4">
              <div className="flex gap-2">
                <AlertCircle className="h-5 w-5 text-orange-600 shrink-0 mt-0.5" />
                <div className="text-sm text-orange-800 dark:text-orange-200">
                  <p className="font-semibold mb-1">Safety First</p>
                  <p>If the seizure lasts more than 5 minutes or you're concerned, call for medical help immediately.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timer Display */}
          <div className="flex flex-col items-center justify-center py-8">
            <div 
              className={`text-6xl font-mono font-bold ${
                isRunning && !isPaused ? 'text-primary animate-pulse' : 
                isPaused ? 'text-yellow-600' : 
                'text-muted-foreground'
              }`}
            >
              {formatTime(seconds)}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {!isRunning && "Ready to start"}
              {isRunning && !isPaused && "Recording..."}
              {isPaused && "Paused"}
            </p>
            {startTime && (
              <p className="text-xs text-muted-foreground mt-1">
                Started at {startTime.toLocaleTimeString()}
              </p>
            )}
          </div>

          {/* Control Buttons */}
          <div className="flex flex-col gap-3">
            {!isRunning && (
              <Button
                onClick={handleStart}
                className="w-full h-12 text-lg"
                variant="default"
              >
                <Play className="h-5 w-5 mr-2" />
                Start Timer
              </Button>
            )}

            {isRunning && !isPaused && (
              <>
                <Button
                  onClick={handlePause}
                  className="w-full h-12"
                  variant="outline"
                >
                  <Pause className="h-5 w-5 mr-2" />
                  Pause
                </Button>
                <Button
                  onClick={handleStop}
                  className="w-full h-12"
                  variant="destructive"
                >
                  <StopCircle className="h-5 w-5 mr-2" />
                  Stop & Log Details
                </Button>
              </>
            )}

            {isPaused && (
              <>
                <Button
                  onClick={handleResume}
                  className="w-full h-12"
                  variant="default"
                >
                  <Play className="h-5 w-5 mr-2" />
                  Resume
                </Button>
                <Button
                  onClick={handleStop}
                  className="w-full h-12"
                  variant="destructive"
                >
                  <StopCircle className="h-5 w-5 mr-2" />
                  Stop & Log Details
                </Button>
              </>
            )}

            {/* Warning for long seizures */}
            {seconds >= 300 && isRunning && (
              <Card className="border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-950">
                <CardContent className="pt-4">
                  <div className="flex gap-2">
                    <AlertCircle className="h-5 w-5 text-red-600 shrink-0" />
                    <div className="text-sm text-red-800 dark:text-red-200">
                      <p className="font-bold">⚠️ Prolonged Seizure - 5+ Minutes</p>
                      <p>This is a medical emergency. Call emergency services if you haven't already.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Cancel Button */}
          <Button
            onClick={handleCancel}
            variant="ghost"
            className="w-full"
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Floating Timer Widget (for use during active tracking)
interface FloatingTimerProps {
  seconds: number;
  onStop: () => void;
  onPause: () => void;
  isPaused: boolean;
}

export function FloatingSeizureTimer({ seconds, onStop, onPause, isPaused }: FloatingTimerProps) {
  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className={`${seconds >= 300 ? 'border-red-500 bg-red-50 dark:bg-red-950' : 'border-primary'} shadow-lg`}>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Timer className={`h-5 w-5 ${seconds >= 300 ? 'text-red-600' : 'text-primary'}`} />
            <div>
              <p className="text-xs text-muted-foreground">Seizure Timer</p>
              <p className={`text-2xl font-mono font-bold ${seconds >= 300 ? 'text-red-600' : ''} ${!isPaused && 'animate-pulse'}`}>
                {formatTime(seconds)}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Button size="sm" variant="outline" onClick={onPause}>
                {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
              </Button>
              <Button size="sm" variant="destructive" onClick={onStop}>
                <StopCircle className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {seconds >= 300 && (
            <p className="text-xs text-red-600 font-semibold mt-2">
              ⚠️ Emergency: 5+ minutes
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

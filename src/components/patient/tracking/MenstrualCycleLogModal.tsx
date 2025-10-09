import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CustomDatePicker } from "@/components/ui/custom-date-picker";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Heart, Droplet, Droplets, Baby, Milk, Calendar, Thermometer, AlertCircle } from "lucide-react";
import { useMenstrualLogs } from "@/hooks/useMenstrualLogs";
import { useBasalTemperature } from "@/hooks/useBasalTemperature";
import { useAuth } from "@/hooks/useAuth";

interface MenstrualCycleLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (data: any) => void;
}

export default function MenstrualCycleLogModal({ isOpen, onClose, onComplete }: MenstrualCycleLogModalProps) {
  const { user } = useAuth();
  const { menstrualLogs } = useMenstrualLogs(user?.id);
  const { temperatureLogs } = useBasalTemperature(user?.id);
  
  const [isOnPeriod, setIsOnPeriod] = useState(false);
  const [periodStartDate, setPeriodStartDate] = useState("");
  const [periodEndDate, setPeriodEndDate] = useState("");
  const [flowIntensity, setFlowIntensity] = useState("moderate");
  const [isPregnant, setIsPregnant] = useState(false);
  const [isBreastfeeding, setIsBreastfeeding] = useState(false);
  const [notes, setNotes] = useState("");
  const [todayBasalTemp, setTodayBasalTemp] = useState<any>(null);

  // Check if user is currently on their period
  useEffect(() => {
    if (menstrualLogs && menstrualLogs.length > 0) {
      const latestLog = menstrualLogs[0];
      // If latest log has start date but no end date, they're on their period
      if (latestLog.cycle_start_date && !latestLog.cycle_end_date) {
        setIsOnPeriod(true);
        setPeriodStartDate(latestLog.cycle_start_date);
      }
    }
  }, [menstrualLogs]);

  // Check today's basal temp
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const todayTemp = temperatureLogs?.find(temp => temp.log_date === today);
    setTodayBasalTemp(todayTemp);
  }, [temperatureLogs]);

  const handleStartPeriod = () => {
    const today = new Date().toISOString().split('T')[0];
    setPeriodStartDate(today);
    setIsOnPeriod(true);
  };

  const handleEndPeriod = () => {
    const today = new Date().toISOString().split('T')[0];
    setPeriodEndDate(today);
  };

  const handleComplete = () => {
    const data = {
      user_id: user?.id,
      cycle_start_date: periodStartDate,
      cycle_end_date: periodEndDate || null,
      flow_intensity: flowIntensity,
      is_pregnant: isPregnant,
      is_breastfeeding: isBreastfeeding,
      notes: notes || null
    };
    onComplete(data);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-b from-pink-50 to-white dark:from-pink-950/20 dark:to-background border-2 border-pink-200 dark:border-pink-800 z-50 max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center flex items-center justify-center gap-2 text-pink-600 dark:text-pink-400">
            <Heart className="h-6 w-6 fill-pink-500" />
            Track Your Cycle
          </DialogTitle>
          <DialogDescription className="text-center text-sm text-muted-foreground">
            Log your period and track patterns for better health insights
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basal Temperature Reminder */}
          {!todayBasalTemp && (
            <Card className="p-4 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-3">
                <Thermometer className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-blue-700 dark:text-blue-400">Log Your Basal Temperature</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    You haven't logged your basal temperature today. For accurate cycle tracking, log it first thing in the morning.
                  </p>
                </div>
              </div>
            </Card>
          )}

          {todayBasalTemp && (
            <Card className="p-4 bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Thermometer className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-sm font-medium">Today's Basal Temperature</p>
                    <p className="text-lg font-bold text-green-600 dark:text-green-400">
                      {todayBasalTemp.temperature}°{todayBasalTemp.temperature_unit}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Period Status */}
          {!isOnPeriod ? (
            <Card className="p-6 text-center">
              <Calendar className="h-12 w-12 text-pink-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Not Currently on Period</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Tap the button below when your period starts
              </p>
              <Button
                onClick={handleStartPeriod}
                className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white"
              >
                <Heart className="h-4 w-4 mr-2 fill-white" />
                My Period Started
              </Button>
            </Card>
          ) : (
            <>
              {/* Period Dates */}
              <Card className="p-4">
                <h3 className="font-semibold mb-4 text-pink-600 dark:text-pink-400">Period Dates</h3>
                
                <div className="space-y-4">
                  <div>
                    <Label>Period Started</Label>
                    <CustomDatePicker
                      label=""
                      value={periodStartDate}
                      onChange={setPeriodStartDate}
                      max={new Date().toISOString().split('T')[0]}
                      className="mt-2"
                    />
                  </div>

                  {periodEndDate && (
                    <div>
                      <Label>Period Ended</Label>
                      <CustomDatePicker
                        label=""
                        value={periodEndDate}
                        onChange={setPeriodEndDate}
                        max={new Date().toISOString().split('T')[0]}
                        className="mt-2"
                      />
                    </div>
                  )}

                  {!periodEndDate && (
                    <Button
                      variant="outline"
                      onClick={handleEndPeriod}
                      className="w-full border-pink-300 text-pink-600 hover:bg-pink-50"
                    >
                      I Finished My Period
                    </Button>
                  )}
                </div>
              </Card>

              {/* Flow Intensity */}
              <Card className="p-4 bg-white dark:bg-gray-900">
                <h3 className="font-semibold mb-4 text-pink-600 dark:text-pink-400">Flow Intensity</h3>
                
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { value: 'light', label: 'Light', icon: <Droplet className="h-8 w-8" />, color: 'pink-300' },
                    { value: 'moderate', label: 'Medium', icon: <Droplets className="h-8 w-8" />, color: 'pink-400' },
                    { value: 'heavy', label: 'Heavy', icon: <Droplets className="h-10 w-10" />, color: 'pink-500' },
                    { value: 'very_heavy', label: 'Disaster', icon: <Droplets className="h-12 w-12" />, color: 'pink-600' }
                  ].map((flow) => (
                    <button
                      key={flow.value}
                      type="button"
                      onClick={() => setFlowIntensity(flow.value)}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                        flowIntensity === flow.value
                          ? `border-pink-500 bg-pink-50 dark:bg-pink-950/30 shadow-lg`
                          : `border-gray-200 dark:border-gray-700 hover:border-pink-300 hover:bg-pink-50/50`
                      }`}
                    >
                      <div className={`text-${flow.color} mb-2`}>{flow.icon}</div>
                      <span className="text-xs font-medium">{flow.label}</span>
                    </button>
                  ))}
                </div>
              </Card>

              {/* Hormonal Status */}
              <Card className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-purple-200 dark:border-purple-800">
                <h3 className="font-semibold mb-4 text-purple-600 dark:text-purple-400">Hormonal Status</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-900 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Baby className="h-5 w-5 text-purple-500" />
                      <div>
                        <Label className="font-medium">Pregnant</Label>
                        <p className="text-xs text-muted-foreground">Affects hormone levels and seizure patterns</p>
                      </div>
                    </div>
                    <Switch
                      checked={isPregnant}
                      onCheckedChange={setIsPregnant}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-900 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Milk className="h-5 w-5 text-blue-500" />
                      <div>
                        <Label className="font-medium">Breastfeeding</Label>
                        <p className="text-xs text-muted-foreground">Impacts hormones and medication considerations</p>
                      </div>
                    </div>
                    <Switch
                      checked={isBreastfeeding}
                      onCheckedChange={setIsBreastfeeding}
                    />
                  </div>
                </div>
              </Card>

              {/* Notes */}
              <Card className="p-4">
                <Label>Additional Notes</Label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any additional observations about this cycle..."
                  rows={3}
                  className="mt-2"
                />
              </Card>
            </>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            {isOnPeriod && (
              <Button 
                onClick={handleComplete}
                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
              >
                <Heart className="h-4 w-4 mr-2 fill-white" />
                Save Cycle Log
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

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
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Thermometer, Clock, TrendingUp, Info } from "lucide-react";

interface TemperatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (data: any) => void;
}

export default function TemperatureModal({ isOpen, onClose, onComplete }: TemperatureModalProps) {
  const [temperatureData, setTemperatureData] = useState({
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().slice(0, 5),
    temperature: "",
    temperature_unit: "F",
    measurement_type: "basal",
    measurement_location: "oral",
    menstrual_cycle_day: "",
    sleep_quality: "",
    time_after_waking: "unknown",
    notes: ""
  });

  const measurementTypes = [
    { value: "basal", label: "Basal Body Temperature", description: "First thing in the morning before getting up" },
    { value: "regular", label: "Regular Temperature", description: "General temperature measurement" },
    { value: "fever", label: "Fever Monitoring", description: "Monitoring illness or elevated temperature" }
  ];

  const measurementLocations = [
    "Oral (mouth)",
    "Temporal (forehead)", 
    "Tympanic (ear)",
    "Axillary (armpit)",
    "Rectal"
  ];

  const sleepQualityOptions = [
    "Excellent (8+ hours, uninterrupted)",
    "Good (7-8 hours, minimal interruptions)",
    "Fair (6-7 hours, some interruptions)",
    "Poor (4-6 hours, frequent interruptions)",
    "Very poor (<4 hours, very restless)"
  ];

  const updateTemperatureData = (key: string, value: any) => {
    setTemperatureData(prev => ({ ...prev, [key]: value }));
  };

  const convertTemperature = (temp: string, fromUnit: string, toUnit: string): string => {
    if (!temp || fromUnit === toUnit) return temp;
    
    const numTemp = parseFloat(temp);
    if (isNaN(numTemp)) return temp;
    
    if (fromUnit === "F" && toUnit === "C") {
      return ((numTemp - 32) * 5/9).toFixed(1);
    } else if (fromUnit === "C" && toUnit === "F") {
      return (numTemp * 9/5 + 32).toFixed(1);
    }
    return temp;
  };

  const handleUnitChange = (newUnit: string) => {
    const convertedTemp = convertTemperature(temperatureData.temperature, temperatureData.temperature_unit, newUnit);
    updateTemperatureData("temperature", convertedTemp);
    updateTemperatureData("temperature_unit", newUnit);
  };

  const getTemperatureAnalysis = () => {
    const temp = parseFloat(temperatureData.temperature);
    if (isNaN(temp)) return null;
    
    const tempF = temperatureData.temperature_unit === "C" ? (temp * 9/5 + 32) : temp;
    
    if (temperatureData.measurement_type === "basal") {
      if (tempF < 97.0) return { status: "low", color: "text-blue-600", message: "Below normal basal range" };
      if (tempF >= 97.0 && tempF < 97.8) return { status: "follicular", color: "text-green-600", message: "Typical follicular phase" };
      if (tempF >= 97.8) return { status: "luteal", color: "text-orange-600", message: "Typical luteal phase (post-ovulation)" };
    } else {
      if (tempF < 97.0) return { status: "low", color: "text-blue-600", message: "Below normal" };
      if (tempF >= 97.0 && tempF < 99.0) return { status: "normal", color: "text-green-600", message: "Normal range" };
      if (tempF >= 99.0 && tempF < 100.4) return { status: "elevated", color: "text-orange-600", message: "Slightly elevated" };
      if (tempF >= 100.4) return { status: "fever", color: "text-red-600", message: "Fever - consider medical attention" };
    }
    
    return null;
  };

  const temperatureAnalysis = getTemperatureAnalysis();

  const handleComplete = () => {
    const finalData = {
      ...temperatureData,
      temperature: parseFloat(temperatureData.temperature),
      menstrual_cycle_day: temperatureData.menstrual_cycle_day ? parseInt(temperatureData.menstrual_cycle_day) : null,
      logged_at: new Date().toISOString()
    };
    
    onComplete(finalData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card border border-border z-50 max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center flex items-center justify-center gap-2">
            <Thermometer className="h-5 w-5 text-status-monitoring" />
            Temperature Logging
          </DialogTitle>
          <DialogDescription className="text-center text-sm text-muted-foreground">
            Track your basal body temperature for cycle phase detection
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basal Temperature Info */}
          <Card className="p-4 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
            <div className="flex items-start gap-2">
              <Info className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-1">
                  Basal Body Temperature Tips
                </h4>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  <li>• Take immediately upon waking, before getting out of bed</li>
                  <li>• Use the same thermometer daily for consistency</li>
                  <li>• Take at the same time each morning when possible</li>
                  <li>• Track alongside menstrual cycle for seizure pattern insights</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Date and Time */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              When was this measured?
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <CustomDatePicker
                  label="Date"
                  value={temperatureData.date}
                  onChange={(value) => updateTemperatureData("date", value)}
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <Label>Time</Label>
                <Input
                  type="time"
                  value={temperatureData.time}
                  onChange={(e) => updateTemperatureData("time", e.target.value)}
                />
              </div>
            </div>
          </Card>

          {/* Temperature Measurement */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Temperature Reading</h3>
            <div className="space-y-4">
              <div>
                <Label>Measurement Type</Label>
                <Select 
                  value={temperatureData.measurement_type} 
                  onValueChange={(value) => updateTemperatureData("measurement_type", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select measurement type" />
                  </SelectTrigger>
                  <SelectContent>
                    {measurementTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        <div>
                          <div className="font-medium">{type.label}</div>
                          <div className="text-xs text-muted-foreground">{type.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Temperature</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={temperatureData.temperature}
                    onChange={(e) => updateTemperatureData("temperature", e.target.value)}
                    placeholder="98.6"
                  />
                </div>
                <div>
                  <Label>Unit</Label>
                  <Select 
                    value={temperatureData.temperature_unit} 
                    onValueChange={handleUnitChange}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="F">Fahrenheit (°F)</SelectItem>
                      <SelectItem value="C">Celsius (°C)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Measurement Location</Label>
                <Select 
                  value={temperatureData.measurement_location} 
                  onValueChange={(value) => updateTemperatureData("measurement_location", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {measurementLocations.map(location => (
                      <SelectItem key={location} value={location}>{location}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Temperature Analysis */}
              {temperatureAnalysis && (
                <div className={`p-3 rounded-lg border ${
                  temperatureAnalysis.status === 'fever' ? 'bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800' :
                  temperatureAnalysis.status === 'elevated' ? 'bg-orange-50 border-orange-200 dark:bg-orange-950 dark:border-orange-800' :
                  temperatureAnalysis.status === 'luteal' ? 'bg-orange-50 border-orange-200 dark:bg-orange-950 dark:border-orange-800' :
                  'bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800'
                }`}>
                  <div className="flex items-center gap-2">
                    <TrendingUp className={`h-4 w-4 ${temperatureAnalysis.color}`} />
                    <span className={`font-medium ${temperatureAnalysis.color}`}>
                      {temperatureAnalysis.message}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Menstrual Cycle Tracking */}
          {temperatureData.measurement_type === "basal" && (
            <Card className="p-4">
              <h3 className="font-semibold mb-3">Menstrual Cycle Context</h3>
              <div className="space-y-4">
                <div>
                  <Label>Day of Menstrual Cycle (optional)</Label>
                  <Input
                    type="number"
                    min="1"
                    max="40"
                    value={temperatureData.menstrual_cycle_day}
                    onChange={(e) => updateTemperatureData("menstrual_cycle_day", e.target.value)}
                    placeholder="Day 1 = first day of period"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Day 1 = first day of menstrual flow. This helps identify patterns with seizures.
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Sleep Quality */}
          {temperatureData.measurement_type === "basal" && (
            <Card className="p-4">
              <h3 className="font-semibold mb-3">Sleep Context</h3>
              <div className="space-y-4">
                <div>
                  <Label>Sleep Quality Last Night</Label>
                  <Select 
                    value={temperatureData.sleep_quality} 
                    onValueChange={(value) => updateTemperatureData("sleep_quality", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="How well did you sleep?" />
                    </SelectTrigger>
                    <SelectContent>
                      {sleepQualityOptions.map(option => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Time After Waking</Label>
                  <Select 
                    value={temperatureData.time_after_waking} 
                    onValueChange={(value) => updateTemperatureData("time_after_waking", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="How long after waking?" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border border-border z-50">
                      <SelectItem value="under_10_min">Under 10 minutes ✅ (Most accurate)</SelectItem>
                      <SelectItem value="10_20_min">10-20 minutes (Good)</SelectItem>
                      <SelectItem value="20_30_min">20-30 minutes (Acceptable)</SelectItem>
                      <SelectItem value="30_60_min">30-60 minutes (Less accurate)</SelectItem>
                      <SelectItem value="1_2_hours">1-2 hours (Poor)</SelectItem>
                      <SelectItem value="2_3_hours">2-3 hours (Not ideal)</SelectItem>
                      <SelectItem value="over_3_hours">Over 3 hours (Not useful)</SelectItem>
                      <SelectItem value="unknown">Unknown</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-1">
                    For accurate basal temperature, measure within 10 minutes of waking.
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Notes */}
          <Card className="p-4">
            <Label>Additional Notes</Label>
            <Textarea
              value={temperatureData.notes}
              onChange={(e) => updateTemperatureData("notes", e.target.value)}
              placeholder="Any factors that might affect temperature (illness, stress, etc.)..."
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
              disabled={!temperatureData.temperature}
            >
              Save Temperature Log
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
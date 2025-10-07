import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Plus, X, Pill, Clock } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";

interface Medication {
  id: string;
  name: string;
  generic_name?: string | null;
  category?: string | null;
  common_dosages?: string | null;
}

interface MedicationStepProps {
  medications: Array<{
    id: string;
    name: string;
    dosage: string;
    frequency?: string;
    times: string[];
  }>;
  onUpdate: (medications: any[]) => void;
}

export function MedicationStep({ medications, onUpdate }: MedicationStepProps) {
  const [availableMedications, setAvailableMedications] = useState<Medication[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [customMedicationName, setCustomMedicationName] = useState("");
  const [showCustomForm, setShowCustomForm] = useState(false);

  useEffect(() => {
    loadMedications();
  }, []);

  const loadMedications = async () => {
    console.log('🔍 Loading medications from database...');
    const { data, error } = await supabase
      .from('medications')
      .select('id, name, generic_name, category, common_dosages')
      .order('name');
    
    console.log('📊 Medications query result:', { data, error, count: data?.length });
    
    if (error) {
      console.error('❌ Error loading medications:', error);
      console.error('Error details:', error.message, error.code, error.details);
      // Fallback to common neurological medications if database fails
      setAvailableMedications([
        { id: '1', name: 'Keppra', generic_name: 'Levetiracetam', category: 'Antiepileptic', common_dosages: '["500mg", "750mg", "1000mg"]' },
        { id: '2', name: 'Dilantin', generic_name: 'Phenytoin', category: 'Antiepileptic', common_dosages: '["100mg", "200mg", "300mg"]' },
        { id: '3', name: 'Tegretol', generic_name: 'Carbamazepine', category: 'Antiepileptic', common_dosages: '["200mg", "400mg"]' },
        { id: '4', name: 'Sinemet', generic_name: 'Carbidopa-Levodopa', category: "Parkinson's Medication", common_dosages: '["25/100mg", "25/250mg"]' },
        { id: '5', name: 'Requip', generic_name: 'Ropinirole', category: "Parkinson's Medication", common_dosages: '["0.25mg", "0.5mg", "1mg"]' },
      ]);
    } else if (data) {
      console.log('✅ Successfully loaded medications:', data.length);
      setAvailableMedications(data);
    } else {
      console.warn('⚠️ No data returned from medications query');
    }
  };

  const filteredMedications = searchTerm
    ? availableMedications.filter(med =>
        med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (med.generic_name && med.generic_name.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : availableMedications.slice(0, 10); // Show top 10 by default

  // Helper to get labeled times based on frequency
  const getDefaultTimesForFrequency = (frequency: string) => {
    switch (frequency) {
      case 'once_daily':
        return ["08:00"];
      case 'twice_daily':
        return ["08:00", "20:00"];
      case 'three_times_daily':
        return ["08:00", "14:00", "20:00"];
      case 'four_times_daily':
        return ["08:00", "12:00", "17:00", "21:00"];
      case 'as_needed':
      default:
        return ["08:00"];
    }
  };

  const getTimeLabels = (frequency: string) => {
    switch (frequency) {
      case 'once_daily':
        return ["Morning"];
      case 'twice_daily':
        return ["Morning", "Evening"];
      case 'three_times_daily':
        return ["Morning", "Afternoon", "Evening"];
      case 'four_times_daily':
        return ["Morning", "Noon", "Afternoon", "Evening"];
      case 'as_needed':
      default:
        return ["As needed"];
    }
  };

  const addMedication = (medication?: Medication) => {
    // Parse common_dosages safely - it might be JSON array or plain text
    let defaultDosage = "";
    if (medication?.common_dosages) {
      try {
        // Try to parse as JSON array
        const parsed = JSON.parse(medication.common_dosages);
        defaultDosage = Array.isArray(parsed) ? (parsed[0] || "") : "";
      } catch {
        // If not valid JSON, use the value as-is (it's likely plain text)
        defaultDosage = medication.common_dosages;
      }
    }
    
    const newMed = {
      id: medication?.id || `custom-${Date.now()}`,
      name: medication?.name || "",
      dosage: defaultDosage,
      frequency: "once_daily",
      times: ["08:00"]
    };
    
    onUpdate([...medications, newMed]);
  };

  const addCustomMedication = () => {
    if (customMedicationName.trim()) {
      addMedication();
      setCustomMedicationName("");
      setShowCustomForm(false);
    }
  };

  const removeMedication = (id: string) => {
    onUpdate(medications.filter(m => m.id !== id));
  };

  const updateMedication = (id: string, field: string, value: any) => {
    onUpdate(medications.map(m => {
      if (m.id === id) {
        const updated = { ...m, [field]: value };
        // If frequency changes, update times accordingly
        if (field === 'frequency') {
          updated.times = getDefaultTimesForFrequency(value);
        }
        return updated;
      }
      return m;
    }));
  };

  const updateTime = (id: string, timeIndex: number, newTime: string) => {
    onUpdate(medications.map(m =>
      m.id === id ? {
        ...m,
        times: m.times.map((t, i) => i === timeIndex ? newTime : t)
      } : m
    ));
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Pill className="h-12 w-12 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-foreground">Current Medications</h2>
        <p className="text-muted-foreground">
          Select from our database or add custom medications with precise timing
        </p>
      </div>

      {/* Search and Select */}
      <Card className="p-6 bg-card border-border">
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Search className="h-5 w-5 text-foreground" />
            <Label className="text-base font-semibold text-foreground">Find Your Medications</Label>
          </div>

          <Input
            placeholder="Search medications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-background border-2 focus-visible:border-teal-500 focus-visible:ring-teal-500"
          />

          {/* Show medications list */}
          {filteredMedications.length > 0 && (
            <div className="max-h-[280px] overflow-y-auto space-y-2 border-t pt-3">
              {filteredMedications.map((med) => (
                <Card
                  key={med.id}
                  className="p-3 cursor-pointer hover:bg-accent transition-all hover:scale-[1.02] border-border"
                  onClick={() => addMedication(med)}
                >
                  <div className="font-medium text-foreground">{med.name}</div>
                  {med.generic_name && (
                    <div className="text-sm text-primary">Generic: {med.generic_name}</div>
                  )}
                  {med.category && (
                    <div className="text-xs text-muted-foreground capitalize">{med.category}</div>
                  )}
                </Card>
              ))}
            </div>
          )}
          
          {filteredMedications.length === 0 && searchTerm && (
            <div className="text-center py-4 text-muted-foreground text-sm">
              No medications found. Try a different search or add a custom medication below.
            </div>
          )}

          <Button
            variant="outline"
            onClick={() => setShowCustomForm(!showCustomForm)}
            className="w-full border-dashed border-2"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Custom Medication
          </Button>

          {showCustomForm && (
            <div className="flex gap-2 animate-in slide-in-from-top">
              <Input
                placeholder="Enter medication name"
                value={customMedicationName}
                onChange={(e) => setCustomMedicationName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addCustomMedication()}
              />
              <Button onClick={addCustomMedication}>Add</Button>
            </div>
          )}
        </div>
      </Card>

      {/* Selected Medications */}
      {medications.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-foreground">
            Your Medications ({medications.length} selected)
          </h3>
          
          {medications.map((med, index) => (
            <Card key={med.id} className="p-6 border-2 border-dashed border-teal-500/30 bg-card">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-foreground">Medication {index + 1}</h4>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeMedication(med.id)}
                    className="text-destructive hover:text-destructive h-8 w-8"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-foreground">Medication Name *</Label>
                    <Input
                      placeholder="e.g., Levetiracetam"
                      value={med.name}
                      onChange={(e) => updateMedication(med.id, 'name', e.target.value)}
                      className="border-2 focus-visible:border-teal-500 focus-visible:ring-teal-500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-foreground">Dosage *</Label>
                    <Input
                      placeholder="e.g., 500mg"
                      value={med.dosage}
                      onChange={(e) => updateMedication(med.id, 'dosage', e.target.value)}
                      className="border-2 focus-visible:border-teal-500 focus-visible:ring-teal-500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-foreground">Frequency *</Label>
                    <Select 
                      value={med.frequency || "once_daily"}
                      onValueChange={(value) => updateMedication(med.id, 'frequency', value)}
                    >
                      <SelectTrigger className="border-2">
                        <SelectValue placeholder="How often do you take this?" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border border-border z-50">
                        <SelectItem value="once_daily">Once daily</SelectItem>
                        <SelectItem value="twice_daily">Twice daily</SelectItem>
                        <SelectItem value="three_times_daily">Three times daily</SelectItem>
                        <SelectItem value="four_times_daily">Four times daily</SelectItem>
                        <SelectItem value="as_needed">As needed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {/* Medication Times */}
                <div className="space-y-3 pt-2">
                  <Label className="font-medium text-foreground">
                    Medication Times ({med.times.length} time{med.times.length !== 1 ? 's' : ''} per day)
                  </Label>
                  <div className="space-y-2">
                    {med.times.map((time, timeIndex) => {
                      const labels = getTimeLabels(med.frequency || "once_daily");
                      return (
                        <div key={timeIndex} className="flex items-center gap-3">
                          <span className="text-sm font-medium min-w-[80px] text-foreground">
                            {labels[timeIndex]}:
                          </span>
                          <Input
                            type="time"
                            value={time}
                            onChange={(e) => updateTime(med.id, timeIndex, e.target.value)}
                            className="flex-1 font-mono border-2 focus-visible:border-teal-500 focus-visible:ring-teal-500"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Smart Reminders Info */}
      <Card className="p-4 bg-gradient-to-br from-teal-500/10 to-purple-500/10 border-teal-500/20">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Clock className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <div className="font-semibold text-foreground">Smart Reminders</div>
            <p className="text-sm text-muted-foreground mt-1">
              We'll use these exact times to send you medication reminders and track adherence patterns. 
              Times auto-adjust when you change frequency!
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

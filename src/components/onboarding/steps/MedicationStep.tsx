import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Plus, X, Pill, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Medication {
  id: string;
  name: string;
  generic_name?: string | null;
  category?: string | null;
  times?: string[];
}

interface MedicationStepProps {
  medications: Array<{
    id: string;
    name: string;
    dosage: string;
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
    const { data } = await supabase
      .from('medications')
      .select('*')
      .order('name');
    if (data) setAvailableMedications(data);
  };

  const filteredMedications = availableMedications.filter(med =>
    med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (med.generic_name && med.generic_name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const addMedication = (medication: Medication) => {
    if (!medications.find(m => m.id === medication.id)) {
      onUpdate([...medications, {
        id: medication.id,
        name: medication.name,
        dosage: "",
        times: ["08:00"]
      }]);
    }
  };

  const addCustomMedication = () => {
    if (customMedicationName.trim()) {
      onUpdate([...medications, {
        id: `custom-${Date.now()}`,
        name: customMedicationName,
        dosage: "",
        times: ["08:00"]
      }]);
      setCustomMedicationName("");
      setShowCustomForm(false);
    }
  };

  const removeMedication = (id: string) => {
    onUpdate(medications.filter(m => m.id !== id));
  };

  const updateMedication = (id: string, field: string, value: any) => {
    onUpdate(medications.map(m => 
      m.id === id ? { ...m, [field]: value } : m
    ));
  };

  const addTime = (id: string) => {
    onUpdate(medications.map(m =>
      m.id === id ? { ...m, times: [...m.times, "08:00"] } : m
    ));
  };

  const updateTime = (id: string, timeIndex: number, newTime: string) => {
    onUpdate(medications.map(m =>
      m.id === id ? {
        ...m,
        times: m.times.map((t, i) => i === timeIndex ? newTime : t)
      } : m
    ));
  };

  const removeTime = (id: string, timeIndex: number) => {
    onUpdate(medications.map(m =>
      m.id === id ? {
        ...m,
        times: m.times.filter((_, i) => i !== timeIndex)
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
          <div className="flex items-center gap-2">
            <Search className="h-5 w-5 text-muted-foreground" />
            <Label className="text-base font-semibold">Find Your Medications</Label>
          </div>

          <Input
            placeholder="Search medications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-background"
          />

          {searchTerm && (
            <div className="max-h-[200px] overflow-y-auto space-y-2">
              {filteredMedications.slice(0, 5).map((med) => (
                <Card
                  key={med.id}
                  className="p-3 cursor-pointer hover:bg-accent transition-colors border-border"
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
          {medications.map((med) => (
            <Card key={med.id} className="p-4 bg-card border-border">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="font-semibold text-foreground">{med.name}</div>
                    <Input
                      placeholder="Dosage (e.g., 500mg)"
                      value={med.dosage}
                      onChange={(e) => updateMedication(med.id, 'dosage', e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeMedication(med.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Times */}
                <div className="space-y-2">
                  <Label className="text-sm flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Times
                  </Label>
                  {med.times.map((time, idx) => (
                    <div key={idx} className="flex gap-2">
                      <Input
                        type="time"
                        value={time}
                        onChange={(e) => updateTime(med.id, idx, e.target.value)}
                        className="flex-1"
                      />
                      {med.times.length > 1 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeTime(med.id, idx)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addTime(med.id)}
                    className="w-full"
                  >
                    <Plus className="h-3 w-3 mr-2" />
                    Add Another Time
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Smart Reminders Info */}
      <Card className="p-4 bg-primary/5 border-primary/20">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Clock className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <div className="font-semibold text-foreground">Smart Reminders</div>
            <p className="text-sm text-muted-foreground mt-1">
              We'll use these exact times to send you medication reminders and track adherence patterns.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

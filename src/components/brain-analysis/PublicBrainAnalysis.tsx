import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Brain, Search, RotateCcw, Info, AlertCircle, X } from "lucide-react";
import BrainVisualizationImages from "@/components/brain-analysis/BrainVisualizationImages";
import { SEIZURE_SEMIOLOGY, BRAIN_REGIONS, GENERALIZED_SEIZURES } from "@/data/brain-seizure-data";

interface PublicBrainAnalysisProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PublicBrainAnalysis({ isOpen, onClose }: PublicBrainAnalysisProps) {
  const [selectedSigns, setSelectedSigns] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedRegions, setHighlightedRegions] = useState<Record<string, number>>({});
  const [showGeneralized, setShowGeneralized] = useState(false);

  // Calculate brain region probabilities based on selected signs
  const calculateRegionProbabilities = () => {
    const regionScores: Record<string, number[]> = {};
    
    selectedSigns.forEach(signId => {
      const sign = SEIZURE_SEMIOLOGY[signId];
      if (sign && sign.localizations) {
        Object.entries(sign.localizations).forEach(([region, probability]) => {
          if (!regionScores[region]) {
            regionScores[region] = [];
          }
          regionScores[region].push(probability);
        });
      }
    });

    // Average probabilities for each region
    const averaged: Record<string, number> = {};
    Object.entries(regionScores).forEach(([region, scores]) => {
      averaged[region] = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    });

    setHighlightedRegions(averaged);
  };

  // Check if signs suggest generalized seizures
  const checkGeneralizedSeizures = () => {
    const bilateralSigns = selectedSigns.filter(id => 
      SEIZURE_SEMIOLOGY[id]?.category === "Bilateral Motor"
    ).length;
    
    const consciousnessSigns = selectedSigns.filter(id =>
      id.includes("immediate_loss") || id.includes("no_aura")
    ).length;

    const associatedFeatures = selectedSigns.filter(id =>
      id.includes("tongue_biting") || id.includes("incontinence") || id.includes("postictal")
    ).length;

    if (bilateralSigns >= 1 && (consciousnessSigns >= 1 || associatedFeatures >= 2)) {
      setShowGeneralized(true);
    } else {
      setShowGeneralized(false);
    }
  };

  const handleSignToggle = (signId: string) => {
    const newSelected = selectedSigns.includes(signId)
      ? selectedSigns.filter(id => id !== signId)
      : [...selectedSigns, signId];
    
    setSelectedSigns(newSelected);
    
    // Recalculate on next tick
    setTimeout(() => {
      calculateRegionProbabilities();
      checkGeneralizedSeizures();
    }, 0);
  };

  const handleReset = () => {
    setSelectedSigns([]);
    setHighlightedRegions({});
    setShowGeneralized(false);
  };

  const filteredSigns = Object.entries(SEIZURE_SEMIOLOGY).filter(([id, sign]) =>
    sign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sign.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = {
    "Auras (Subjective Sensations)": filteredSigns.filter(([_, s]) => s.type === "Subjective Sensory"),
    "Motor Signs and Movements": filteredSigns.filter(([_, s]) => s.type === "Motor Signs"),
    "Autonomic Symptoms": filteredSigns.filter(([_, s]) => s.type === "Autonomic Signs"),
    "Consciousness Changes": filteredSigns.filter(([_, s]) => s.type === "Consciousness"),
    "Behavioral Changes": filteredSigns.filter(([_, s]) => s.type === "Behavioral"),
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[95vh] overflow-y-auto bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Brain className="h-8 w-8 text-primary" />
              <div>
                <DialogTitle className="text-2xl">Interactive Brain Seizure Localization</DialogTitle>
                <DialogDescription>
                  Select seizure signs to visualize probable brain regions. Based on 11,000+ research data points.
                </DialogDescription>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DialogHeader>

        {/* Disclaimer */}
        <Card className="p-4 bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-semibold text-amber-900 dark:text-amber-200 mb-1">Educational Tool Only</p>
              <p className="text-amber-800 dark:text-amber-300">
                This tool provides educational information based on research. It cannot diagnose or replace medical evaluation.
              </p>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
          {/* Left Panel - Symptom Selection */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Select Seizure Signs</h2>
                <Button variant="outline" size="sm" onClick={handleReset}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </div>

              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search symptoms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Selected Count */}
              {selectedSigns.length > 0 && (
                <Badge variant="secondary" className="mb-4">
                  {selectedSigns.length} sign{selectedSigns.length !== 1 ? 's' : ''} selected
                </Badge>
              )}

              {/* Categories - Scrollable */}
              <div className="max-h-[500px] overflow-y-auto space-y-4">
                {Object.entries(categories).map(([category, signs]) => (
                  signs.length > 0 && (
                    <div key={category}>
                      <h3 className="font-medium text-sm mb-2 sticky top-0 bg-card z-10 py-1">{category}</h3>
                      <div className="space-y-2">
                        {signs.map(([id, sign]) => (
                          <div key={id} className="flex items-start space-x-2">
                            <Checkbox
                              checked={selectedSigns.includes(id)}
                              onCheckedChange={() => handleSignToggle(id)}
                              id={id}
                            />
                            <label htmlFor={id} className="text-sm cursor-pointer flex-1">
                              <div className="font-medium">{sign.name}</div>
                              <div className="text-xs text-muted-foreground">{sign.description}</div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                ))}
              </div>
            </Card>
          </div>

          {/* Right Panel - Brain Visualization */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Brain Region Localization</h2>
              
              <BrainVisualizationImages 
                highlightedRegions={highlightedRegions}
                selectedSigns={selectedSigns}
              />

              {/* Region Information */}
              {Object.keys(highlightedRegions).length > 0 && (
                <div className="mt-6 p-4 bg-accent rounded-lg">
                  <h3 className="font-semibold mb-2">Highlighted Regions:</h3>
                  <div className="space-y-2">
                    {Object.entries(highlightedRegions)
                      .sort(([, a], [, b]) => b - a)
                      .map(([region, probability]) => (
                        <div key={region} className="flex items-center justify-between">
                          <span className="text-sm">{region}</span>
                          <Badge variant={probability > 60 ? "destructive" : probability > 40 ? "default" : "secondary"}>
                            {probability}%
                          </Badge>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Generalized Seizure Alert */}
              {showGeneralized && (
                <Card className="mt-6 p-4 bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-red-900 dark:text-red-200 mb-2">
                        Generalized Seizure Pattern Detected
                      </h3>
                      <p className="text-sm text-red-800 dark:text-red-300 mb-3">
                        The selected signs suggest a generalized seizure involving bilateral brain networks.
                      </p>
                    </div>
                  </div>
                </Card>
              )}
            </Card>

            {/* Educational Resources */}
            <Card className="mt-6 p-6">
              <h2 className="text-lg font-semibold mb-4">Understanding the Results</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <h3 className="font-medium mb-2">What Percentages Mean</h3>
                  <p className="text-muted-foreground">
                    Probability scores represent how often specific seizure signs originate from each brain region based on research data.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Limitations</h3>
                  <p className="text-muted-foreground">
                    This tool provides population-based statistics. Individual cases may vary. Accurate localization requires EEG and imaging.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">When to Seek Help</h3>
                  <p className="text-muted-foreground">
                    If you experience seizures, consult a neurologist. Emergency care needed for seizures lasting &gt;5 minutes.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

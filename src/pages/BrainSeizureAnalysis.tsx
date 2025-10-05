import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Search, RotateCcw, Info, AlertCircle } from "lucide-react";
import AppNavbar from "@/components/navigation/AppNavbar";
import { useAuth } from "@/hooks/useAuth";
import BrainVisualization from "@/components/brain-analysis/BrainVisualization";
import { SEIZURE_SEMIOLOGY, BRAIN_REGIONS, GENERALIZED_SEIZURES } from "@/data/brain-seizure-data";

export default function BrainSeizureAnalysis() {
  const { user } = useAuth();
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
  };

  const handleReset = () => {
    setSelectedSigns([]);
    setHighlightedRegions({});
    setShowGeneralized(false);
  };

  // Update calculations when selections change
  useState(() => {
    calculateRegionProbabilities();
    checkGeneralizedSeizures();
  });

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <AppNavbar userName={user?.email || "User"} title="Brain Seizure Analysis" />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Brain className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Interactive Brain Seizure Localization</h1>
          </div>
          <p className="text-muted-foreground">
            Select seizure signs to visualize probable brain regions involved. Based on research from 11,000+ data points.
          </p>
        </div>

        {/* Disclaimer */}
        <Card className="p-4 mb-6 bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-amber-900 dark:text-amber-200 mb-1">Educational Tool Only</p>
              <p className="text-amber-800 dark:text-amber-300">
                This tool provides educational information based on research. It cannot diagnose or replace medical evaluation. 
                Seizure localization requires comprehensive clinical assessment including EEG, imaging, and expert consultation.
              </p>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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

              {/* Categories */}
              <Tabs defaultValue="auras" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="auras">Auras</TabsTrigger>
                  <TabsTrigger value="motor">Motor</TabsTrigger>
                </TabsList>
                <TabsContent value="auras" className="space-y-4 mt-4">
                  {Object.entries(categories).slice(0, 2).map(([category, signs]) => (
                    <div key={category}>
                      <h3 className="font-medium text-sm mb-2">{category}</h3>
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
                  ))}
                </TabsContent>
                <TabsContent value="motor" className="space-y-4 mt-4">
                  {Object.entries(categories).slice(2).map(([category, signs]) => (
                    <div key={category}>
                      <h3 className="font-medium text-sm mb-2">{category}</h3>
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
                  ))}
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          {/* Middle Panel - Brain Visualization */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Brain Region Localization</h2>
              
              <BrainVisualization 
                highlightedRegions={highlightedRegions}
                selectedSigns={selectedSigns}
              />

              {/* Probability Legend */}
              <div className="mt-6">
                <h3 className="text-sm font-medium mb-2">Probability Scale</h3>
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: '#E8E8E8' }}></div>
                    <span>0-20%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: '#FFE5B4' }}></div>
                    <span>21-40%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: '#FFB347' }}></div>
                    <span>41-60%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: '#FF6B35' }}></div>
                    <span>61-80%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: '#DC143C' }}></div>
                    <span>81-100%</span>
                  </div>
                </div>
              </div>

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
                    <Info className="h-5 w-5 text-red-600 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-red-900 dark:text-red-200 mb-2">
                        Generalized Seizure Pattern Detected
                      </h3>
                      <p className="text-sm text-red-800 dark:text-red-300 mb-3">
                        The selected signs suggest a generalized seizure involving bilateral brain networks from onset.
                      </p>
                      <div className="space-y-2">
                        {Object.entries(GENERALIZED_SEIZURES).map(([type, info]) => (
                          <details key={type} className="text-sm">
                            <summary className="cursor-pointer font-medium">{type}</summary>
                            <p className="mt-1 text-muted-foreground">{info.description}</p>
                          </details>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              )}
            </Card>
          </div>
        </div>

        {/* Educational Resources */}
        <Card className="mt-6 p-6">
          <h2 className="text-xl font-semibold mb-4">Understanding the Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-medium mb-2">What Percentages Mean</h3>
              <p className="text-sm text-muted-foreground">
                Probability scores represent how often specific seizure signs originate from each brain region based on 
                research data from 4,643 patients across 309 studies.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Limitations</h3>
              <p className="text-sm text-muted-foreground">
                This tool provides population-based statistics. Individual cases may vary. Accurate localization requires 
                EEG, neuroimaging, and comprehensive clinical evaluation.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">When to Seek Help</h3>
              <p className="text-sm text-muted-foreground">
                If you experience seizures, consult a neurologist. Emergency care is needed for seizures lasting {'>'} 5 minutes, 
                clusters of seizures, or injury during seizures.
              </p>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}

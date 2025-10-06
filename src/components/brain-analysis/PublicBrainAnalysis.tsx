import { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger
} from "@/components/ui/sheet";
import { Brain, Search, X, Info, AlertCircle, BookOpen, Share2, ExternalLink, Copy, Check } from "lucide-react";
import BrainVisualizationImages from "@/components/brain-analysis/BrainVisualizationImages";
import { SEIZURE_SEMIOLOGY, BRAIN_REGIONS } from "@/data/brain-seizure-data";
import { useToast } from "@/hooks/use-toast";

interface PublicBrainAnalysisProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PublicBrainAnalysisV2({ isOpen, onClose }: PublicBrainAnalysisProps) {
  const [selectedSigns, setSelectedSigns] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [highlightedRegions, setHighlightedRegions] = useState<Record<string, number>>({});
  const [showGeneralized, setShowGeneralized] = useState(false);
  const [methodologyOpen, setMethodologyOpen] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const { toast } = useToast();

  // Debounce search input (200ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 200);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Calculate brain region probabilities based on selected signs
  const calculateRegionProbabilities = useCallback(() => {
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
  }, [selectedSigns]);

  // Check if signs suggest generalized seizures
  const checkGeneralizedSeizures = useCallback(() => {
    const bilateralSigns = selectedSigns.filter(id => 
      id.includes("bilateral") || id.includes("clonic") || id.includes("tonic") || id.includes("myoclonic")
    ).length;
    
    const consciousnessSigns = selectedSigns.filter(id =>
      id.includes("immediate_loss_consciousness") || id.includes("loss_of_awareness")
    ).length;

    const generalizedIndicators = selectedSigns.filter(id =>
      id.includes("tongue_biting") || id.includes("incontinence")
    ).length;

    if ((bilateralSigns >= 1 && consciousnessSigns >= 1) || generalizedIndicators >= 1) {
      setShowGeneralized(true);
    } else {
      setShowGeneralized(false);
    }
  }, [selectedSigns]);

  useEffect(() => {
    calculateRegionProbabilities();
    checkGeneralizedSeizures();
  }, [selectedSigns, calculateRegionProbabilities, checkGeneralizedSeizures]);

  const handleSignToggle = (signId: string) => {
    const newSelected = selectedSigns.includes(signId)
      ? selectedSigns.filter(id => id !== signId)
      : [...selectedSigns, signId];
    
    setSelectedSigns(newSelected);
  };

  const handleClearSelections = () => {
    setSelectedSigns([]);
    setHighlightedRegions({});
    setShowGeneralized(false);
    toast({
      title: "Selections cleared",
      description: "All seizure signs have been deselected.",
    });
  };

  const handleCopyLink = () => {
    const params = new URLSearchParams({ signs: selectedSigns.join(',') });
    const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    navigator.clipboard.writeText(url);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
    toast({
      title: "Link copied!",
      description: "Share this link to show your selected signs.",
    });
  };

  const filteredSigns = Object.entries(SEIZURE_SEMIOLOGY).filter(([id, sign]) =>
    sign.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    sign.description.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  const categories = {
    "Auras (Subjective Sensations)": filteredSigns.filter(([_, s]) => s.type === "Subjective Sensory"),
    "Motor Signs and Movements": filteredSigns.filter(([_, s]) => s.type === "Motor Signs"),
    "Autonomic Symptoms": filteredSigns.filter(([_, s]) => s.type === "Autonomic Signs"),
    "Consciousness Changes": filteredSigns.filter(([_, s]) => s.type === "Consciousness"),
    "Language and Speech": filteredSigns.filter(([_, s]) => s.type === "Language"),
    "Post-Ictal Symptoms": filteredSigns.filter(([_, s]) => s.type === "Post-Ictal"),
    "Behavioral Changes": filteredSigns.filter(([_, s]) => s.type === "Behavioral"),
    "Generalized/Bilateral Indicators": filteredSigns.filter(([_, s]) => s.type === "Generalized" || s.type === "Associated Features"),
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[95vh] overflow-y-auto bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Brain className="h-8 w-8 text-primary" />
              <div>
                <DialogTitle className="text-2xl">Brain Seizure Localization Tool</DialogTitle>
                <DialogDescription>
                  Research-grade educational tool. Select signs to explore likely brain regions (population estimates).
                </DialogDescription>
              </div>
              
            </div>
            <div className="flex items-center gap-2">
              <Sheet open={methodologyOpen} onOpenChange={setMethodologyOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Methodology
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[600px] sm:w-[700px] overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Research Methodology & Data Sources</SheetTitle>
                    <SheetDescription>
                      How this tool works and where the data comes from
                    </SheetDescription>
                  </SheetHeader>
                  
                  <div className="mt-6 space-y-6">
                    <div>
                      <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Data Source</h3>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                        Based on <strong>11,532 data points</strong> from <strong>4,643 patients</strong> across <strong>309 published studies</strong>.
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Primary source: "Probabilistic landscape of seizure semiology localizing values" - Meta-analysis published in Brain Communications (2022)
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Classification Standards</h3>
                      <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 list-disc list-inside">
                        <li>International League Against Epilepsy (ILAE) 2017, 2022, 2025 classifications</li>
                        <li>Validated semiology localization studies</li>
                        <li>Clinical consensus guidelines from European epilepsy monitoring units</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">How Percentages Work</h3>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Each percentage represents the probability that a specific seizure sign originates from that brain region, based on population-level research data. For example, "Epigastric Aura - Temporal Lobe 83%" means that in research studies, 83% of patients with epigastric auras had temporal lobe involvement.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Important Limitations</h3>
                      <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2 list-disc list-inside">
                        <li><strong>Population estimates only:</strong> Individual cases may vary significantly</li>
                        <li><strong>Focal epilepsy bias:</strong> Tool trained primarily on focal epilepsies; not fully validated for all generalized epilepsies</li>
                        <li><strong>Not diagnostic:</strong> Accurate localization requires EEG, MRI, and clinical evaluation</li>
                        <li><strong>Research context:</strong> This tool supports education and hypothesis generation, not clinical diagnosis</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Last Reviewed</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        October 2025 | Data current as of Q4 2024
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Key References</h3>
                      <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                        <p>
                          <a 
                            href="https://academic.oup.com/braincomms/advance-article-pdf/doi/10.1093/braincomms/fcac130/43754399/fcac130.pdf" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:underline flex items-center gap-1"
                          >
                            Probabilistic landscape of seizure semiology <ExternalLink className="h-3 w-3" />
                          </a>
                        </p>
                        <p>
                          <a 
                            href="https://onlinelibrary.wiley.com/doi/10.1111/epi.18338" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:underline flex items-center gap-1"
                          >
                            ILAE 2025 Seizure Classification <ExternalLink className="h-3 w-3" />
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        {/* Educational Disclaimer - Always Visible */}
        <Card className="p-4 bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-700">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-semibold text-amber-900 dark:text-amber-100 mb-1">Educational Tool Only - Not for Diagnosis</p>
              <p className="text-amber-800 dark:text-amber-200">
                This tool provides educational information based on population research. It cannot diagnose conditions or replace medical evaluation. Consult a neurologist for medical care.
              </p>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
          {/* Left Panel - Symptom Selection */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Select Seizure Signs</h2>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleClearSelections}
                  disabled={selectedSigns.length === 0}
                >
                  Clear All
                </Button>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Tick all signs that apply. Results update instantly.
              </p>

              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search symptoms... (e.g., 'visual', 'aura')"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  aria-label="Search seizure signs"
                />
              </div>

              {debouncedSearch && filteredSigns.length === 0 && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  No results. Try: 'visual', 'aura', 'motor', 'confusion'
                </p>
              )}

              {/* Selected Count */}
              {selectedSigns.length > 0 && (
                <Badge variant="secondary" className="mb-4">
                  {selectedSigns.length} sign{selectedSigns.length !== 1 ? 's' : ''} selected
                </Badge>
              )}

              {/* Categories - Scrollable with Fieldsets */}
              <div className="max-h-[500px] overflow-y-auto space-y-4" role="region" aria-live="polite">
                {Object.entries(categories).map(([category, signs]) => (
                  signs.length > 0 && (
                    <fieldset key={category} className="border-0">
                      <legend className="font-medium text-sm mb-2 sticky top-0 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 z-10 py-1 border-b border-gray-200 dark:border-gray-700 w-full">
                        {category}
                      </legend>
                      <div className="space-y-2">
                        {signs.map(([id, sign]) => (
                          <div key={id} className="flex items-start space-x-2">
                            <Checkbox
                              checked={selectedSigns.includes(id)}
                              onCheckedChange={() => handleSignToggle(id)}
                              id={id}
                              aria-label={`${sign.name}: ${sign.description}`}
                            />
                            <label htmlFor={id} className="text-sm cursor-pointer flex-1">
                              <div className="font-medium text-gray-900 dark:text-gray-100">{sign.name}</div>
                              <div className="text-xs text-gray-600 dark:text-gray-400">{sign.description}</div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </fieldset>
                  )
                ))}
              </div>
            </Card>
          </div>

          {/* Right Panel - Brain Visualization */}
          <div className="lg:col-span-2">
            <Card className="p-6 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Brain Region Localization</h2>
              </div>
              
              <div aria-live="polite" aria-atomic="true">
                <BrainVisualizationImages 
                  highlightedRegions={highlightedRegions}
                  selectedSigns={selectedSigns}
                />
              </div>

              {/* Generalized Seizure Alert */}
              {showGeneralized && (
                <Card className="mt-6 p-4 bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-700">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-red-900 dark:text-red-100 mb-2">
                        Generalized Seizure Pattern Detected
                      </h3>
                      <p className="text-sm text-red-800 dark:text-red-200">
                        The selected signs suggest possible generalized seizure involvement affecting bilateral brain networks. This requires comprehensive evaluation.
                      </p>
                    </div>
                  </div>
                </Card>
              )}
            </Card>

            {/* Next Steps & Safety Info */}
            <Card className="mt-6 p-6 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Next Steps & Important Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h3 className="font-medium mb-2 text-gray-900 dark:text-gray-100 flex items-center gap-2">
                    <Info className="h-4 w-4" />
                    When to Seek Medical Care
                  </h3>
                  <ul className="text-gray-600 dark:text-gray-400 space-y-1 list-disc list-inside">
                    <li>Seizures lasting &gt;5 minutes</li>
                    <li>Injury during seizure</li>
                    <li>First-time seizure</li>
                    <li>Recurrent seizures</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium mb-2 text-gray-900 dark:text-gray-100 flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Typical Evaluation Process
                  </h3>
                  <ul className="text-gray-600 dark:text-gray-400 space-y-1 list-disc list-inside">
                    <li>EEG (brain wave test)</li>
                    <li>MRI brain imaging</li>
                    <li>Neurologist consultation</li>
                    <li>Video EEG if needed</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Data Privacy Notice */}
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-xs text-blue-800 dark:text-blue-200 flex items-center gap-2">
                <Info className="h-3 w-3" />
                <span>
                  <strong>Privacy:</strong> Data not saved. Selections stay in your browser only. 
                </span>
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

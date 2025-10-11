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
import { Brain, Search, X, Info, AlertCircle, BookOpen, Share2, ExternalLink, Copy, Check, EyeOff, ChevronDown, ChevronUp, ArrowDown, Sparkles, ArrowLeftRight, Star } from "lucide-react";
import BrainVisualizationImages from "./BrainVisualizationImages";
import { SEIZURE_SEMIOLOGY, BRAIN_REGIONS } from "@/data/brain-seizure-data";
import { useToast } from "@/hooks/use-toast";

interface PublicBrainAnalysisProps {
  isOpen: boolean;
  onClose: () => void;
  onWaitlistOpen?: () => void;
}

export default function PublicBrainAnalysisV2({ isOpen, onClose, onWaitlistOpen }: PublicBrainAnalysisProps) {
  const [selectedSigns, setSelectedSigns] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [highlightedRegions, setHighlightedRegions] = useState<Record<string, number>>({});
  const [showGeneralized, setShowGeneralized] = useState(false);
  const [methodologyOpen, setMethodologyOpen] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [selectionPanelOpen, setSelectionPanelOpen] = useState(false);
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

  // Helper function to get lateralization badge
  const getLateralizationBadge = (lateralization?: string) => {
    if (!lateralization || lateralization === "non_lateralizing") return null;
    
    const config = {
      ipsilateral: { icon: "→", label: "Same Side", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" },
      contralateral: { icon: "←→", label: "Opposite Side", color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200" },
      bilateral: { icon: "⇄", label: "Both Sides", color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200" },
    };
    
    const item = config[lateralization as keyof typeof config];
    if (!item) return null;
    
    return (
      <Badge variant="outline" className={`text-xs ${item.color} flex items-center gap-1`}>
        <ArrowLeftRight className="h-3 w-3" />
        {item.label}
      </Badge>
    );
  };

  const categories = {
    "🌟 Pathognomonic Signs (Diagnostic)": filteredSigns.filter(([_, s]) => s.pathognomonic === true),
    "⚡ Lateralizing Signs (Left vs Right Brain)": filteredSigns.filter(([_, s]) => 
      s.lateralization && s.lateralization !== "non_lateralizing" && s.lateralization !== "bilateral" && !s.pathognomonic
    ),
    "Auras (Subjective Sensations)": filteredSigns.filter(([_, s]) => s.type === "Subjective Sensory" && !s.pathognomonic),
    "Motor Signs and Movements": filteredSigns.filter(([_, s]) => s.type === "Motor Signs" && !s.pathognomonic && (!s.lateralization || s.lateralization === "non_lateralizing" || s.lateralization === "bilateral")),
    "Autonomic Symptoms": filteredSigns.filter(([_, s]) => s.type === "Autonomic Signs" && !s.pathognomonic),
    "Consciousness Changes": filteredSigns.filter(([_, s]) => s.type === "Consciousness"),
    "Language and Speech": filteredSigns.filter(([_, s]) => s.type === "Language"),
    "Post-Ictal Symptoms": filteredSigns.filter(([_, s]) => s.type === "Post-Ictal" && !s.pathognomonic && (!s.lateralization || s.lateralization === "non_lateralizing")),
    "Behavioral Changes": filteredSigns.filter(([_, s]) => s.type === "Behavioral" && !s.pathognomonic),
    "Generalized/Bilateral Indicators": filteredSigns.filter(([_, s]) => s.type === "Generalized" || s.type === "Associated Features"),
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[95vh] overflow-y-auto bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 dark:from-gray-950 dark:via-purple-950/30 dark:to-gray-900 pt-12 sm:pt-6">
        <DialogHeader className="space-y-4 pb-6 border-b-2 border-purple-200 dark:border-purple-800/50">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="relative">
                <Brain className="h-8 w-8 sm:h-10 sm:w-10 text-purple-600 dark:text-purple-400 flex-shrink-0 animate-pulse" />
                <div className="absolute -inset-1 bg-purple-400/30 dark:bg-purple-600/30 rounded-full blur-lg -z-10"></div>
              </div>
              <div>
                <DialogTitle className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-teal-500 dark:from-purple-400 dark:via-pink-400 dark:to-teal-400 bg-clip-text text-transparent leading-tight">
                  Interactive Brain Localization Tool
                </DialogTitle>
                <DialogDescription className="mt-2 text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium">
                  🧠 Try the free Brain Seizure Localisation Tool — discover which brain regions are most often linked to your seizure symptoms.
                </DialogDescription>
              </div>
              
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Sheet open={methodologyOpen} onOpenChange={setMethodologyOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Methodology
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:w-[540px] md:w-[640px] lg:w-[700px] overflow-y-auto">
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
                      <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">🌟 Pathognomonic vs Lateralizing Signs</h3>
                      <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                        <div>
                          <strong className="text-yellow-700 dark:text-yellow-400">⭐ Pathognomonic Signs:</strong> These are "diagnostic" - when present, they strongly indicate a specific brain region. Examples: Figure-of-4 sign (temporal lobe), Gelastic seizures (hypothalamus), Fencing posture (SMA).
                        </div>
                        <div>
                          <strong className="text-purple-700 dark:text-purple-400">⚡ Lateralizing Signs:</strong> These help identify which side of the brain (left vs right hemisphere) is involved:
                          <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                            <li><strong>Same Side (Ipsilateral):</strong> Sign on same side as seizure focus</li>
                            <li><strong>Opposite Side (Contralateral):</strong> Sign opposite to seizure focus - most common</li>
                            <li><strong>Both Sides:</strong> Complex bilateral patterns with specific meanings</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Data Verification & Transparency</h3>
                      <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                        <p><strong className="text-green-700 dark:text-green-400">✓ Verified Data:</strong> 40+ signs with exact percentages from Alim-Marvasti et al. (2022) meta-analysis with confidence intervals.</p>
                        <p><strong className="text-orange-700 dark:text-orange-400">⚠️ Literature-Supported:</strong> Lateralizing signs with verified concepts (e.g., contralateral/ipsilateral rules from Kotagal 2005) but estimated regional percentages pending primary source verification.</p>
                        <p><strong>All lateralization directions are clinically verified.</strong> Specific regional percentages for newer signs marked with ⚠️ are estimates pending verification.</p>
                      </div>
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
                        October 2025 | Data current as of October 2025
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
              <p className="text-xs text-amber-700 dark:text-amber-300 mt-2 font-medium">
                Built from global epilepsy research data (ILAE-aligned).
              </p>
            </div>
          </div>
        </Card>

        <div className="space-y-6 mt-4">
          {/* Brain Visualization - Now First */}
          <Card className="p-6 bg-gradient-to-br from-white to-teal-50/30 dark:from-gray-900 dark:to-teal-950/20 border-2 border-teal-200 dark:border-teal-800/50 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-teal-600 via-purple-600 to-pink-600 dark:from-teal-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                Brain Region Localization
              </h2>
            </div>
            
            <div aria-live="polite" aria-atomic="true">
              <BrainVisualizationImages 
                highlightedRegions={highlightedRegions}
                selectedSigns={selectedSigns}
                onWaitlistOpen={onWaitlistOpen}
                onClose={onClose}
              />
            </div>

            {/* CTA to Select Symptoms Below */}
            {selectedSigns.length === 0 && (
              <Card className="mt-6 p-5 bg-gradient-to-r from-purple-50 via-pink-50 to-teal-50 dark:from-purple-950/40 dark:via-pink-950/40 dark:to-teal-950/40 border-2 border-purple-300 dark:border-purple-600 animate-pulse">
                <div className="text-center space-y-3">
                  <div className="flex justify-center">
                    <ArrowDown className="h-8 w-8 text-purple-600 dark:text-purple-400 animate-bounce" />
                  </div>
                  <h3 className="text-lg font-bold text-purple-900 dark:text-purple-100">
                    Select Your Seizure Signs Below
                  </h3>
                  <p className="text-sm text-purple-700 dark:text-purple-300">
                    Choose symptoms from the list below to see which brain regions they map to. Results appear instantly!
                  </p>
                  <Button
                    size="lg"
                    onClick={() => setSelectionPanelOpen(true)}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    Select Symptoms ⬇️
                  </Button>
                </div>
              </Card>
            )}

            {/* Generalized Seizure Alert */}
            {showGeneralized && (
              <Card className="mt-6 p-4 bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-700">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-semibold text-red-900 dark:text-red-100 mb-1">Generalized Seizure Pattern Detected</p>
                    <p className="text-red-800 dark:text-red-200">
                      Your selected signs suggest a generalized seizure pattern. This tool is optimized for focal seizures. Consult a neurologist for evaluation.
                    </p>
                  </div>
                </div>
              </Card>
            )}
          </Card>

          {/* Symptom Selection Panel - Now Below, Collapsible */}
          <div>
            <Card className="bg-gradient-to-br from-white to-purple-50/30 dark:from-gray-900 dark:to-purple-950/20 border-2 border-purple-200 dark:border-purple-800/50 shadow-lg overflow-hidden">
              {/* Collapsible Header */}
              <button
                onClick={() => setSelectionPanelOpen(!selectionPanelOpen)}
                className="w-full p-6 flex items-center justify-between hover:bg-purple-50/50 dark:hover:bg-purple-950/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                    Select Seizure Signs
                  </h2>
                  {selectedSigns.length > 0 && (
                    <Badge variant="secondary" className="bg-purple-100 dark:bg-purple-900">
                      {selectedSigns.length} selected
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClearSelections();
                    }}
                    disabled={selectedSigns.length === 0}
                    className="border-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950/50"
                  >
                    Clear All
                  </Button>
                  {selectionPanelOpen ? (
                    <ChevronUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  ) : (
                    <ChevronDown className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  )}
                </div>
              </button>

              {/* Collapsible Content */}
              {selectionPanelOpen && (
                <div className="px-6 pb-6 animate-in slide-in-from-top-2">

              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 font-medium">
                ✨ Tick all signs that apply. Results update instantly.
              </p>
              
              {/* Quick Example Buttons - Gamification */}
              <div className="mb-4 p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-lg border border-purple-200 dark:border-purple-700">
                <p className="text-xs font-semibold text-purple-700 dark:text-purple-300 mb-2">Try Quick Examples:</p>
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs"
                    onClick={() => setSelectedSigns(['visual_aura'])}
                  >
                    Visual Aura
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs"
                    onClick={() => setSelectedSigns(['olfactory_aura'])}
                  >
                    Olfactory Aura
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs"
                    onClick={() => setSelectedSigns(['automatisms'])}
                  >
                    Automatisms
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs"
                    onClick={() => setSelectedSigns(['epigastric_aura', 'fear_anxiety_aura'])}
                  >
                    Multiple Signs
                  </Button>
                </div>
              </div>

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
                          <div key={id} className={`flex items-start space-x-2 p-2 rounded-lg transition-colors ${sign.pathognomonic ? 'bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'}`}>
                            <Checkbox
                              checked={selectedSigns.includes(id)}
                              onCheckedChange={() => handleSignToggle(id)}
                              id={id}
                              aria-label={`${sign.name}: ${sign.description}`}
                            />
                            <label htmlFor={id} className="text-sm cursor-pointer flex-1">
                              <div className="flex items-center gap-2 flex-wrap mb-1">
                                <span className="font-medium text-gray-900 dark:text-gray-100">{sign.name}</span>
                                {sign.pathognomonic && (
                                  <Badge variant="default" className="bg-yellow-500 text-yellow-900 text-xs flex items-center gap-1">
                                    <Star className="h-3 w-3" />
                                    Diagnostic
                                  </Badge>
                                )}
                                {getLateralizationBadge(sign.lateralization)}
                                {sign.confidence === "very_high" && !sign.pathognomonic && (
                                  <Badge variant="outline" className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                    High Confidence
                                  </Badge>
                                )}
                              </div>
                              <div className="text-xs text-gray-600 dark:text-gray-400">{sign.description}</div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </fieldset>
                  )
                ))}
              </div>
                </div>
              )}
            </Card>
          </div>
        </div>

      </DialogContent>
    </Dialog>
  );
}

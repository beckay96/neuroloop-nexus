import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, Brain as BrainIcon, Bell, Share2, Camera, Download, Copy, ExternalLink } from "lucide-react";
import { getProbabilityColor, BRAIN_REGIONS } from "@/data/brain-seizure-data";
import { useToast } from "@/hooks/use-toast";
import html2canvas from "html2canvas";
import ExportCard from "./ExportCard";

interface BrainVisualizationImagesProps {
  highlightedRegions: Record<string, number>;
  selectedSigns: string[];
  onWaitlistOpen?: () => void;
  onClose?: () => void;
}

export default function BrainVisualizationImages({ 
  highlightedRegions, 
  selectedSigns,
  onWaitlistOpen,
  onClose
}: BrainVisualizationImagesProps) {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [exportMode, setExportMode] = useState<'light' | 'dark' | 'both'>('light');
  const exportCardRef = useRef<HTMLDivElement>(null);
  const exportCardDarkRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const handleShareScreenshot = async () => {
    toast({
      title: "📸 Screenshot tip!",
      description: "Take a screenshot of your results to share on social media or with your healthcare provider. No personal data is included.",
    });
  };
  
  const handleDownloadImage = async () => {
    if (Object.keys(highlightedRegions).length === 0) {
      toast({
        title: "⚠️ No results to export",
        description: "Please select seizure signs first to generate results.",
        variant: "destructive"
      });
      return;
    }

    setIsExporting(true);
    const today = new Date().toISOString().split('T')[0];

    try {
      if (exportMode === 'both') {
        // Export both light and dark modes
        toast({
          title: "🎨 Creating both versions...",
          description: "Generating light and dark mode exports. Your browser may ask permission for multiple downloads.",
        });

        await new Promise(resolve => setTimeout(resolve, 100));

        // Light mode export
        if (exportCardRef.current) {
          const canvasLight = await html2canvas(exportCardRef.current, {
            backgroundColor: null,
            scale: 2,
            logging: false,
            useCORS: true,
          });

          canvasLight.toBlob((blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.download = `neuroloop-brain-localization-light-${today}.png`;
              link.href = url;
              link.click();
              URL.revokeObjectURL(url);
            }
          }, 'image/png', 1.0);
        }

        // Dark mode export (with delay for browser)
        await new Promise(resolve => setTimeout(resolve, 500));
        
        if (exportCardDarkRef.current) {
          const canvasDark = await html2canvas(exportCardDarkRef.current, {
            backgroundColor: null,
            scale: 2,
            logging: false,
            useCORS: true,
          });

          canvasDark.toBlob((blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.download = `neuroloop-brain-localization-dark-${today}.png`;
              link.href = url;
              link.click();
              URL.revokeObjectURL(url);
            }
          }, 'image/png', 1.0);
        }

        toast({
          title: "✅ Both exports successful!",
          description: "Light and dark mode brain maps downloaded. Perfect for any platform!",
        });
      } else {
        // Single mode export
        const isDark = exportMode === 'dark';
        const cardRef = isDark ? exportCardDarkRef : exportCardRef;
        
        if (!cardRef.current) return;

        toast({
          title: "🎨 Creating your export...",
          description: `Generating beautiful ${isDark ? 'dark' : 'light'} mode image.`,
        });

        await new Promise(resolve => setTimeout(resolve, 100));

        const canvas = await html2canvas(cardRef.current, {
          backgroundColor: null,
          scale: 2,
          logging: false,
          useCORS: true,
        });

        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.download = `neuroloop-brain-localization-${isDark ? 'dark' : 'light'}-${today}.png`;
            link.href = url;
            link.click();
            URL.revokeObjectURL(url);

            toast({
              title: "✅ Export successful!",
              description: `Your ${isDark ? 'dark' : 'light'} mode brain map is ready to share!`,
            });
          }
        }, 'image/png', 1.0);
      }
    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: "❌ Export failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsExporting(false);
    }
  };
  
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast({
        title: "🔗 Link copied!",
        description: "Share this tool with friends, family, or healthcare providers.",
      });
    } catch (err) {
      toast({
        title: "❌ Copy failed",
        description: "Please try again or manually copy the URL.",
        variant: "destructive"
      });
    }
  };
  
  const handleWaitlistClick = () => {
    // Close brain tool and open waitlist modal
    if (onClose) onClose();
    setTimeout(() => {
      if (onWaitlistOpen) onWaitlistOpen();
    }, 100); // Small delay for smooth transition
  };

  // Get the dominant highlighted region (highest probability)
  const getDominantRegion = (): string | null => {
    if (Object.keys(highlightedRegions).length === 0) return null;
    
    const sorted = Object.entries(highlightedRegions).sort(([, a], [, b]) => b - a);
    return sorted[0][0];
  };

  const dominantRegion = getDominantRegion();

  // Get regions sorted by probability
  const sortedRegions = Object.entries(highlightedRegions)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5); // Show top 5

  return (
    <div className="space-y-6">
      {/* Animated Header - ENHANCED WITH GRADIENTS */}
      {sortedRegions.length > 0 && (
        <div className="space-y-3 mb-4 sm:mb-6">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-teal-500 dark:from-purple-400 dark:via-pink-400 dark:to-teal-400 bg-clip-text text-transparent animate-pulse break-words">
            ✨ Brain regions lighting up based on your seizure signs!
          </h3>
          <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
            These patterns are population estimates — your data helps improve global accuracy.
          </p>
        </div>
      )}

      {/* Brain Regions - Interactive Cards */}
      <div className="space-y-3">
        {sortedRegions.length === 0 ? (
          <Card className="p-8 sm:p-12 bg-gradient-to-br from-purple-50 via-pink-50 to-teal-50 dark:from-purple-950/50 dark:via-pink-950/50 dark:to-teal-950/50 border-2 border-purple-300 dark:border-purple-600 shadow-2xl relative overflow-hidden">
            {/* Animated background circles */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-300/20 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-pink-300/20 dark:bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            
            <div className="text-center space-y-4 relative z-10">
              <BrainIcon className="h-20 w-20 sm:h-24 sm:w-24 mx-auto text-purple-500 dark:text-purple-400 animate-bounce" />
              <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-teal-500 dark:from-purple-400 dark:via-pink-400 dark:to-teal-400 bg-clip-text text-transparent">
                ✨ Ready to explore your brain?
              </h3>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 max-w-md mx-auto leading-relaxed">
                Select seizure signs from the list above to see which brain regions they're associated with.
                Each region will <strong className="text-purple-600 dark:text-purple-400">light up</strong> with its probability percentage!
              </p>
              <div className="pt-4">
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 text-sm">
                  🎯 Try the quick examples to get started!
                </Badge>
              </div>
            </div>
          </Card>
        ) : (
          sortedRegions.map(([region, probability], index) => {
            const regionData = BRAIN_REGIONS[region];
            if (!regionData) return null;

            return (
              <Card
                key={region}
                className="p-3 sm:p-4 cursor-pointer transition-all duration-300 hover:scale-[1.02] animate-in slide-in-from-bottom-4 relative overflow-hidden"
                style={{
                  backgroundColor: `${getProbabilityColor(probability)}20`,
                  borderColor: getProbabilityColor(probability),
                  borderWidth: '3px',
                  animationDelay: `${index * 100}ms`,
                  boxShadow: `0 4px 20px ${getProbabilityColor(probability)}40, 0 0 30px ${getProbabilityColor(probability)}20`
                }}
                onClick={() => setSelectedRegion(selectedRegion === region ? null : region)}
              >
                <div className="flex items-start justify-between gap-3 sm:gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <h3 className="font-bold text-base sm:text-lg">{region}</h3>
                      <Badge 
                        className="font-bold"
                        style={{ 
                          backgroundColor: getProbabilityColor(probability),
                          color: probability <= 40 ? '#000000' : '#FFFFFF'
                        }}
                      >
                        {probability}%
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                      <strong className="text-gray-900 dark:text-gray-100">🧠 What it does:</strong> {regionData.function}
                    </p>

                    {regionData.seizureCharacteristics && (
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        <strong className="text-gray-900 dark:text-gray-100">⚡ Seizure signs:</strong> {regionData.seizureCharacteristics}
                      </p>
                    )}

                    {selectedRegion === region && regionData.subregions && (
                      <div className="mt-3 pt-3 border-t border-gray-300 dark:border-gray-600 animate-in slide-in-from-top-2">
                        <p className="text-xs font-medium text-gray-900 dark:text-gray-100 mb-2">📍 Specific areas:</p>
                        <div className="grid grid-cols-1 gap-1.5">
                          {Object.entries(regionData.subregions).map(([sub, desc]) => (
                            <div key={sub} className="text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-2 rounded text-gray-700 dark:text-gray-300">
                              <span className="font-medium text-gray-900 dark:text-gray-100">{sub}:</span> {desc}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div 
                    className="w-20 h-20 rounded-lg flex-shrink-0 flex items-center justify-center font-bold text-2xl shadow-lg"
                    style={{ 
                      backgroundColor: getProbabilityColor(probability),
                      color: probability <= 40 ? '#000000' : '#FFFFFF'
                    }}
                  >
                    #{index + 1}
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>

      {/* Enhanced Share Section - Multiple Options */}
      {sortedRegions.length > 0 && (
        <Card className="p-5 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/40 dark:via-purple-950/40 dark:to-pink-950/40 border-2 border-purple-300 dark:border-purple-600 shadow-xl">
          <div className="space-y-4">
            <div>
              <h3 className="text-base sm:text-lg font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent flex items-center gap-2">
                <Camera className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <span className="break-words">Share Your Brain Map</span>
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                📸 Export, share, or save your results (no personal data included)
              </p>
            </div>
            
            {/* Export Style Selector */}
            <div className="flex items-center justify-center gap-2 p-3 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-950/40 dark:to-pink-950/40 rounded-lg border-2 border-purple-300 dark:border-purple-700">
              <p className="text-sm font-semibold text-purple-700 dark:text-purple-300 mr-1">Export Style:</p>
              <Button
                size="sm"
                variant={exportMode === 'light' ? 'default' : 'outline'}
                onClick={() => setExportMode('light')}
                className={exportMode === 'light' ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'hover:bg-purple-50 dark:hover:bg-purple-950/50'}
              >
                ☀️ Light
              </Button>
              <Button
                size="sm"
                variant={exportMode === 'dark' ? 'default' : 'outline'}
                onClick={() => setExportMode('dark')}
                className={exportMode === 'dark' ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'hover:bg-purple-50 dark:hover:bg-purple-950/50'}
              >
                🌙 Dark
              </Button>
              <Button
                size="sm"
                variant={exportMode === 'both' ? 'default' : 'outline'}
                onClick={() => setExportMode('both')}
                className={exportMode === 'both' ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-teal-500' : 'hover:bg-purple-50 dark:hover:bg-purple-950/50'}
              >
                ✨ Both
              </Button>
            </div>
            
            {/* Mobile-friendly button grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleShareScreenshot}
                className="w-full border-2 border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50"
              >
                <Camera className="h-4 w-4 mr-2" />
                Screenshot Tip
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownloadImage}
                disabled={isExporting}
                className="w-full border-2 border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/50 disabled:opacity-50"
              >
                <Download className="h-4 w-4 mr-2" />
                {isExporting ? "Exporting..." : "Download Image"}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyLink}
                className="w-full border-2 border-pink-400 hover:bg-pink-50 dark:hover:bg-pink-950/50"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy Link
              </Button>
            </div>
            
            <p className="text-xs text-center text-gray-600 dark:text-gray-400 italic">
              💡 Perfect for Instagram, health forums, or sharing with your neurologist
            </p>
          </div>
        </Card>
      )}

      {/* Conversion CTA - After Results */}
      {sortedRegions.length > 0 && (
        <Card className="p-6 bg-gradient-to-br from-teal-50 via-purple-50 to-pink-50 dark:from-teal-950/40 dark:via-purple-950/40 dark:to-pink-950/40 border-2 border-purple-300 dark:border-purple-700 shadow-lg">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-purple-600 dark:text-purple-400 flex-wrap">
              <Sparkles className="h-5 w-5 flex-shrink-0" />
              <h3 className="text-base sm:text-lg font-bold text-center">Want to track your symptoms, medications, and seizure videos?</h3>
              <Sparkles className="h-5 w-5 flex-shrink-0" />
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Join the NeuroLoop waitlist and contribute to real research. It's free and secure.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={handleWaitlistClick}
            >
              <Bell className="h-5 w-5 mr-2" />
              Join the Waitlist
            </Button>
            <p className="text-xs text-gray-500 dark:text-gray-400 italic">
              No hard sell. It feels like continuing a scientific journey.
            </p>
          </div>
        </Card>
      )}

      {/* Probability Legend */}
      {sortedRegions.length > 0 && (
        <Card className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-semibold mb-3 text-gray-900 dark:text-gray-100">🎨 Color Guide - What the colors mean:</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-xs">
            <div className="flex flex-col items-center gap-1.5 p-3 rounded-lg border-2 shadow-sm" style={{ backgroundColor: '#E8E8E8', borderColor: '#C0C0C0' }}>
              <div className="w-12 h-12 rounded-full border-2 border-gray-400" style={{ backgroundColor: '#E8E8E8' }}></div>
              <span className="font-bold text-black">0-20%</span>
              <span className="font-medium text-gray-800">Unlikely</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 p-3 rounded-lg border-2 shadow-sm" style={{ backgroundColor: '#FFE5B4', borderColor: '#FFD700' }}>
              <div className="w-12 h-12 rounded-full border-2 border-orange-300" style={{ backgroundColor: '#FFE5B4' }}></div>
              <span className="font-bold text-black">21-40%</span>
              <span className="font-medium text-gray-900">Possible</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 p-2 rounded-lg bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800">
              <div className="w-10 h-10 rounded-full" style={{ backgroundColor: '#FFB347' }}></div>
              <span className="font-medium text-gray-900 dark:text-gray-100">41-60%</span>
              <span className="text-gray-600 dark:text-gray-400">Moderate</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 p-2 rounded-lg bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800">
              <div className="w-10 h-10 rounded-full" style={{ backgroundColor: '#FF6B35' }}></div>
              <span className="font-medium text-gray-900 dark:text-gray-100">61-80%</span>
              <span className="text-gray-600 dark:text-gray-400">Likely</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 p-2 rounded-lg bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800">
              <div className="w-10 h-10 rounded-full" style={{ backgroundColor: '#DC143C' }}></div>
              <span className="font-medium text-gray-900 dark:text-gray-100">81-100%</span>
              <span className="text-gray-600 dark:text-gray-400">Very Likely</span>
            </div>
          </div>
        </Card>
      )}
      
      {/* Hidden Export Cards for html2canvas */}
      <div style={{ position: 'absolute', left: '-9999px', top: 0 }}>
        {/* Light Mode Export Card */}
        <ExportCard
          ref={exportCardRef}
          highlightedRegions={highlightedRegions}
          selectedSignsCount={selectedSigns.length}
          darkMode={false}
        />
        
        {/* Dark Mode Export Card */}
        <ExportCard
          ref={exportCardDarkRef}
          highlightedRegions={highlightedRegions}
          selectedSignsCount={selectedSigns.length}
          darkMode={true}
        />
      </div>
      
      {/* Bottom CTA - Transition from Exploration to Purpose */}
      {sortedRegions.length > 0 && (
        <Card className="p-6 bg-gradient-to-r from-pink-50 via-purple-50 to-teal-50 dark:from-pink-950/40 dark:via-purple-950/40 dark:to-teal-950/40 border-2 border-pink-300 dark:border-pink-700">
          <div className="text-center space-y-3">
            <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
              Ready to track real seizure data — not just explore brain regions?
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              This tool shows you <strong>population patterns</strong>. NeuroLoop helps you track <strong>your personal patterns</strong> and contribute to life-saving research.
            </p>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-950/50"
              onClick={handleWaitlistClick}
            >
              <Bell className="h-5 w-5 mr-2" />
              Join NeuroLoop's Waitlist
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}

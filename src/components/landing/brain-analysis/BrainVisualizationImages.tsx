import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Brain as BrainIcon } from "lucide-react";
import { getProbabilityColor, BRAIN_REGIONS } from "@/data/brain-seizure-data";

interface BrainVisualizationImagesProps {
  highlightedRegions: Record<string, number>;
  selectedSigns: string[];
}

export default function BrainVisualizationImages({ 
  highlightedRegions, 
  selectedSigns 
}: BrainVisualizationImagesProps) {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

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
      {/* Animated Header */}
      {sortedRegions.length > 0 && (
        <div className="flex items-center gap-2 text-sm font-medium text-purple-600 dark:text-purple-400 animate-pulse">
          <Sparkles className="h-4 w-4" />
          <span>Brain regions lighting up based on your seizure signs!</span>
        </div>
      )}

      {/* Brain Regions - Interactive Cards */}
      <div className="space-y-3">
        {sortedRegions.length === 0 ? (
          <Card className="p-8 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border-purple-200 dark:border-purple-700">
            <div className="text-center space-y-3">
              <BrainIcon className="h-16 w-16 mx-auto text-purple-400 dark:text-purple-600" />
              <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100">
                Ready to explore your brain?
              </h3>
              <p className="text-sm text-purple-700 dark:text-purple-300">
                Select seizure signs from the list above to see which brain regions they're associated with.
                Each region will light up with its probability percentage!
              </p>
            </div>
          </Card>
        ) : (
          sortedRegions.map(([region, probability], index) => {
            const regionData = BRAIN_REGIONS[region];
            if (!regionData) return null;

            return (
              <Card
                key={region}
                className="p-4 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg animate-in slide-in-from-bottom-4"
                style={{
                  backgroundColor: `${getProbabilityColor(probability)}20`,
                  borderColor: getProbabilityColor(probability),
                  borderWidth: '2px',
                  animationDelay: `${index * 100}ms`
                }}
                onClick={() => setSelectedRegion(selectedRegion === region ? null : region)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold text-lg">{region}</h3>
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
                    className="w-20 h-20 rounded-lg flex-shrink-0 flex items-center justify-center text-white font-bold text-2xl shadow-lg"
                    style={{ backgroundColor: getProbabilityColor(probability) }}
                  >
                    #{index + 1}
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>

      {/* Probability Legend */}
      {sortedRegions.length > 0 && (
        <Card className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-semibold mb-3 text-gray-900 dark:text-gray-100">🎨 Color Guide - What the colors mean:</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-xs">
            <div className="flex flex-col items-center gap-1.5 p-2 rounded-lg bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800">
              <div className="w-10 h-10 rounded-full" style={{ backgroundColor: '#E8E8E8' }}></div>
              <span className="font-medium text-gray-900 dark:text-gray-100">0-20%</span>
              <span className="text-gray-600 dark:text-gray-400">Unlikely</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 p-2 rounded-lg bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800">
              <div className="w-10 h-10 rounded-full" style={{ backgroundColor: '#FFE5B4' }}></div>
              <span className="font-medium text-gray-900 dark:text-gray-100">21-40%</span>
              <span className="text-gray-600 dark:text-gray-400">Possible</span>
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
    </div>
  );
}

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ZoomIn, ZoomOut, RotateCw } from "lucide-react";
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
  const [viewAngle, setViewAngle] = useState<'lateral' | 'medial' | 'top'>('lateral');

  // Get the dominant highlighted region (highest probability)
  const getDominantRegion = (): string | null => {
    if (Object.keys(highlightedRegions).length === 0) return null;
    
    const sorted = Object.entries(highlightedRegions).sort(([, a], [, b]) => b - a);
    return sorted[0][0];
  };

  const dominantRegion = getDominantRegion();

  // Map region names to image filenames
  const getImagePath = (region: string | null, angle: string): string => {
    if (!region) return `/brain-images/brain-${angle}-neutral.png`;
    
    // Normalize region name for filename
    const normalized = region.toLowerCase().replace(/\s+/g, '-');
    return `/brain-images/brain-${angle}-${normalized}.png`;
  };

  // Get all highlighted regions for overlay
  const getHighlightedImagePaths = (): Array<{path: string, opacity: number}> => {
    if (Object.keys(highlightedRegions).length === 0) return [];
    
    return Object.entries(highlightedRegions).map(([region, probability]) => {
      const normalized = region.toLowerCase().replace(/\s+/g, '-');
      return {
        path: `/brain-images/brain-${viewAngle}-${normalized}.png`,
        opacity: probability / 100 // Convert percentage to opacity
      };
    });
  };

  const highlightedImages = getHighlightedImagePaths();

  return (
    <div className="space-y-4">
      {/* View Controls */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Button
            variant={viewAngle === 'lateral' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewAngle('lateral')}
          >
            Lateral View
          </Button>
          <Button
            variant={viewAngle === 'medial' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewAngle('medial')}
          >
            Medial View
          </Button>
          <Button
            variant={viewAngle === 'top' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewAngle('top')}
          >
            Top View
          </Button>
        </div>
        <div className="text-sm text-muted-foreground">
          Select different views to see brain regions from multiple angles
        </div>
      </div>

      {/* Brain Image Display */}
      <div className="relative border rounded-lg overflow-hidden bg-white dark:bg-gray-900 aspect-[4/3]">
        {/* Base brain image */}
        <div className="relative w-full h-full flex items-center justify-center p-8">
          {highlightedImages.length === 0 ? (
            // Neutral state - show placeholder
            <div className="text-center space-y-4">
              <div className="w-full max-w-md mx-auto aspect-square bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-lg flex items-center justify-center">
                <div className="text-center p-8">
                  <svg className="w-32 h-32 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <p className="text-lg font-medium text-gray-600 dark:text-gray-400">
                    Select seizure signs to see brain regions highlight
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                    {viewAngle === 'lateral' && 'Lateral (side) view'}
                    {viewAngle === 'medial' && 'Medial (inner) view'}
                    {viewAngle === 'top' && 'Superior (top) view'}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            // Highlighted state - show overlays
            <div className="relative w-full h-full">
              {/* Base neutral brain */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full max-w-2xl aspect-square bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-sm text-gray-500 mb-2">Brain {viewAngle} view</p>
                    <div className="space-y-2">
                      {Object.entries(highlightedRegions)
                        .sort(([, a], [, b]) => b - a)
                        .slice(0, 3)
                        .map(([region, prob]) => (
                          <div 
                            key={region}
                            className="inline-block px-3 py-1 rounded-full text-sm font-medium mx-1"
                            style={{ 
                              backgroundColor: getProbabilityColor(prob),
                              color: prob > 60 ? 'white' : 'black'
                            }}
                          >
                            {region}: {prob}%
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Color overlays for highlighted regions */}
              {Object.entries(highlightedRegions).map(([region, probability]) => (
                <div 
                  key={region}
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundColor: getProbabilityColor(probability),
                    opacity: probability / 200, // Subtle overlay
                    mixBlendMode: 'multiply'
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Image placeholder notice */}
        {highlightedImages.length > 0 && (
          <div className="absolute bottom-4 left-4 right-4">
            <Card className="p-3 bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800">
              <p className="text-xs text-blue-800 dark:text-blue-300">
                <strong>Note:</strong> Brain images will be added soon. Currently showing color-coded probability visualization.
                Image files should be placed in: <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">/public/brain-images/</code>
              </p>
            </Card>
          </div>
        )}
      </div>

      {/* Probability Legend */}
      <div className="mt-4">
        <h3 className="text-sm font-medium mb-2">Probability Scale</h3>
        <div className="flex items-center gap-4 text-xs flex-wrap">
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

      {/* Selected Region Details */}
      {dominantRegion && BRAIN_REGIONS[dominantRegion] && (
        <Card className="p-4 bg-accent">
          <h3 className="font-semibold mb-2">{dominantRegion}</h3>
          <p className="text-sm text-muted-foreground mb-2">
            <strong>Function:</strong> {BRAIN_REGIONS[dominantRegion].function}
          </p>
          {BRAIN_REGIONS[dominantRegion].seizureCharacteristics && (
            <p className="text-sm text-muted-foreground">
              <strong>Seizure Characteristics:</strong> {BRAIN_REGIONS[dominantRegion].seizureCharacteristics}
            </p>
          )}
          {highlightedRegions[dominantRegion] && (
            <div className="mt-2 pt-2 border-t">
              <p className="text-sm font-medium">
                Localization Probability: {highlightedRegions[dominantRegion]}%
              </p>
            </div>
          )}
        </Card>
      )}

      {/* Instructions */}
      {selectedSigns.length === 0 && (
        <Card className="p-4 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-800 dark:text-blue-300">
            Select seizure signs from the left panel to see brain region probabilities highlighted on the model.
            The color intensity represents the likelihood of seizure origin from each region.
          </p>
        </Card>
      )}

      {/* Image Setup Instructions for Developer */}
      <details className="text-xs text-muted-foreground">
        <summary className="cursor-pointer font-medium mb-2">Image Setup Instructions (for developers)</summary>
        <div className="space-y-2 pl-4">
          <p><strong>Required brain images:</strong></p>
          <ul className="list-disc pl-4 space-y-1">
            <li><code>brain-lateral-neutral.png</code> - Side view, no highlighting</li>
            <li><code>brain-lateral-temporal-lobe.png</code> - Temporal lobe highlighted</li>
            <li><code>brain-lateral-frontal-lobe.png</code> - Frontal lobe highlighted</li>
            <li><code>brain-lateral-parietal-lobe.png</code> - Parietal lobe highlighted</li>
            <li><code>brain-lateral-occipital-lobe.png</code> - Occipital lobe highlighted</li>
            <li>...and similar for medial and top views</li>
          </ul>
          <p className="mt-2"><strong>Place all images in:</strong> <code>/public/brain-images/</code></p>
          <p><strong>Image format:</strong> PNG with transparency, 1024x1024px recommended</p>
        </div>
      </details>
    </div>
  );
}

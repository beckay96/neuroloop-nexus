import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotateCw, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import { getProbabilityColor, BRAIN_REGIONS } from "@/data/brain-seizure-data";

interface BrainVisualizationProps {
  highlightedRegions: Record<string, number>;
  selectedSigns: string[];
}

export default function BrainVisualization({ highlightedRegions, selectedSigns }: BrainVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  // Brain regions with approximate positions (simplified 2D representation)
  const brainRegionPositions = {
    "Temporal Lobe": { x: 150, y: 200, width: 120, height: 80 },
    "Frontal Lobe": { x: 100, y: 100, width: 150, height: 100 },
    "Parietal Lobe": { x: 200, y: 120, width: 100, height: 80 },
    "Occipital Lobe": { x: 280, y: 180, width: 80, height: 70 },
    "Insula": { x: 170, y: 180, width: 60, height: 50 },
    "Cingulate": { x: 180, y: 140, width: 80, height: 40 },
    "Hypothalamus": { x: 190, y: 220, width: 50, height: 30 },
    "Mesial Temporal": { x: 160, y: 220, width: 70, height: 40 },
    "Anterior Temporal": { x: 130, y: 210, width: 60, height: 40 },
    "Posterior Temporal": { x: 200, y: 210, width: 60, height: 40 },
    "Supplementary Motor Area": { x: 150, y: 90, width: 80, height: 40 },
    "Primary Somatosensory Cortex": { x: 210, y: 110, width: 70, height: 50 },
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Apply transformations
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.scale(zoom, zoom);
    ctx.rotate(rotation.y * Math.PI / 180);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);

    // Draw brain outline
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(250, 180, 180, 140, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Draw brain regions
    Object.entries(brainRegionPositions).forEach(([region, pos]) => {
      const probability = highlightedRegions[region] || 0;
      const color = probability > 0 ? getProbabilityColor(probability) : '#f0f0f0';

      // Draw region
      ctx.fillStyle = color;
      ctx.strokeStyle = selectedRegion === region ? '#000' : '#999';
      ctx.lineWidth = selectedRegion === region ? 3 : 1;
      
      ctx.beginPath();
      ctx.roundRect(pos.x, pos.y, pos.width, pos.height, 8);
      ctx.fill();
      ctx.stroke();

      // Draw label
      if (probability > 0 || selectedRegion === region) {
        ctx.fillStyle = '#000';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(region, pos.x + pos.width / 2, pos.y + pos.height / 2 + 3);
        
        if (probability > 0) {
          ctx.font = 'bold 12px sans-serif';
          ctx.fillText(`${probability}%`, pos.x + pos.width / 2, pos.y + pos.height / 2 + 18);
        }
      }
    });

    ctx.restore();
  }, [highlightedRegions, rotation, zoom, selectedRegion]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;

    const deltaX = e.clientX - lastMousePos.x;
    const deltaY = e.clientY - lastMousePos.y;

    setRotation(prev => ({
      x: prev.x + deltaY * 0.5,
      y: prev.y + deltaX * 0.5
    }));

    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / zoom;
    const y = (e.clientY - rect.top) / zoom;

    // Check if click is on a region
    for (const [region, pos] of Object.entries(brainRegionPositions)) {
      if (
        x >= pos.x &&
        x <= pos.x + pos.width &&
        y >= pos.y &&
        y <= pos.y + pos.height
      ) {
        setSelectedRegion(region);
        return;
      }
    }

    setSelectedRegion(null);
  };

  const handleReset = () => {
    setRotation({ x: 0, y: 0 });
    setZoom(1);
    setSelectedRegion(null);
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setZoom(prev => Math.min(prev + 0.2, 3))}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setZoom(prev => Math.max(prev - 0.2, 0.5))}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
          >
            <RotateCw className="h-4 w-4" />
          </Button>
        </div>
        <div className="text-sm text-muted-foreground">
          Click and drag to rotate • Click regions for details
        </div>
      </div>

      {/* Canvas */}
      <div className="relative border rounded-lg overflow-hidden bg-white dark:bg-gray-900">
        <canvas
          ref={canvasRef}
          width={500}
          height={400}
          className="w-full cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onClick={handleClick}
        />
      </div>

      {/* Selected Region Info */}
      {selectedRegion && BRAIN_REGIONS[selectedRegion] && (
        <Card className="p-4 bg-accent">
          <h3 className="font-semibold mb-2">{selectedRegion}</h3>
          <p className="text-sm text-muted-foreground mb-2">
            <strong>Function:</strong> {BRAIN_REGIONS[selectedRegion].function}
          </p>
          {BRAIN_REGIONS[selectedRegion].seizureCharacteristics && (
            <p className="text-sm text-muted-foreground">
              <strong>Seizure Characteristics:</strong> {BRAIN_REGIONS[selectedRegion].seizureCharacteristics}
            </p>
          )}
          {highlightedRegions[selectedRegion] && (
            <div className="mt-2 pt-2 border-t">
              <p className="text-sm font-medium">
                Localization Probability: {highlightedRegions[selectedRegion]}%
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
    </div>
  );
}

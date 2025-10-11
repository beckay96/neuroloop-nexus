import { forwardRef } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Sparkles } from "lucide-react";
import { getProbabilityColor, BRAIN_REGIONS } from "@/data/brain-seizure-data";

interface ExportCardProps {
  highlightedRegions: Record<string, number>;
  selectedSignsCount: number;
  darkMode?: boolean;
}

const ExportCard = forwardRef<HTMLDivElement, ExportCardProps>(
  ({ highlightedRegions, selectedSignsCount, darkMode = false }, ref) => {
    const sortedRegions = Object.entries(highlightedRegions)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);

    const topRegion = sortedRegions[0];
    const today = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    // Helper: Desaturate colors for smaller tiles
    const getDesaturatedColor = (probability: number) => {
      const baseColor = getProbabilityColor(probability);
      const desaturatedMap: Record<string, string> = {
        '#FFB347': '#FFA86A',  // Medium orange -> lighter
        '#FF6B35': '#FF8C5A',  // Dark orange -> softer
        '#DC143C': '#E94560',  // Red -> softer red
      };
      return desaturatedMap[baseColor] || baseColor;
    };

    return (
      <div
        ref={ref}
        className="relative"
        style={{
          width: '1080px',
          minHeight: '1080px',
          height: sortedRegions.length <= 3 ? '1080px' : 'auto',
          maxHeight: '1350px',
          background: darkMode 
            ? '#1a0b2e'
            : '#f8f4ff',
          padding: '50px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Background Image */}
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: darkMode 
              ? 'url(https://evcdikzpnjjpotbkkshs.supabase.co/storage/v1/object/public/public-bucket/dark-mode-bg-image-for-posts.png.PNG)'
              : 'url(https://evcdikzpnjjpotbkkshs.supabase.co/storage/v1/object/public/public-bucket/light-mode-bg-image-for-posts.png.PNG)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.6,
            zIndex: 0,
          }}
        />
        
        {/* Glowing Decorative Elements */}
        <div 
          style={{
            position: 'absolute',
            top: '80px',
            right: '80px',
            width: '400px',
            height: '400px',
            background: darkMode 
              ? 'radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(168, 85, 247, 0.25) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(80px)',
            zIndex: 1,
          }}
        />
        <div 
          style={{
            position: 'absolute',
            bottom: '100px',
            left: '100px',
            width: '350px',
            height: '350px',
            background: darkMode
              ? 'radial-gradient(circle, rgba(236, 72, 153, 0.25) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(236, 72, 153, 0.2) 0%, transparent 70%)',
            filter: 'blur(70px)',
            zIndex: 1,
          }}
        />

        {/* Header with Wide Logo */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'flex-start', 
          justifyContent: 'space-between',
          marginBottom: '35px',
          position: 'relative',
          zIndex: 10,
        }}>
          <div>
            <img 
              src={darkMode 
                ? 'https://evcdikzpnjjpotbkkshs.supabase.co/storage/v1/object/public/public-bucket/dark-mode-wide-logo.png.png'
                : 'https://evcdikzpnjjpotbkkshs.supabase.co/storage/v1/object/public/public-bucket/light-mode-wide-logo.PNG'}
              alt="NeuroLoop"
              style={{
                height: '190px',
                width: 'auto',
                filter: darkMode ? 'drop-shadow(0 8px 30px rgba(147, 51, 234, 0.7))' : 'drop-shadow(0 8px 30px rgba(168, 85, 247, 0.6))',
              }}
            />
            <p style={{
              fontSize: '24px',
              color: darkMode ? '#e2e8f0' : '#64748b',
              margin: '12px 0 0 0',
              fontWeight: '600',
              letterSpacing: '0.5px',
            }}>
              Brain Localization Analysis
            </p>
          </div>
          <div style={{
            fontSize: '17px',
            color: darkMode ? '#cbd5e1' : '#64748b',
            textAlign: 'right',
            fontWeight: '500',
          }}>
            {today}
          </div>
        </div>

        {/* Main Results Card */}
        <div style={{
          background: darkMode ? 'rgba(15, 23, 42, 0.85)' : 'rgba(255, 255, 255, 0.94)',
          borderRadius: '28px',
          padding: '40px',
          boxShadow: darkMode 
            ? '0 25px 70px rgba(0, 0, 0, 0.6), 0 0 40px rgba(147, 51, 234, 0.15), 0 8px 24px rgba(0,0,0,0.15)'
            : '0 25px 70px rgba(0, 0, 0, 0.14), 0 0 40px rgba(168, 85, 247, 0.12), 0 8px 24px rgba(0,0,0,0.06)',
          backdropFilter: 'blur(20px)',
          border: darkMode ? '2px solid rgba(147, 51, 234, 0.3)' : '2px solid rgba(168, 85, 247, 0.25)',
          position: 'relative',
          zIndex: 10,
          marginBottom: 'auto',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}>
          {/* Summary Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            marginBottom: '22px',
          }}>
            <Sparkles style={{ 
              width: '32px', 
              height: '32px', 
              color: darkMode ? '#c084fc' : '#a855f7',
              filter: darkMode ? 'drop-shadow(0 0 8px rgba(192, 132, 252, 0.6))' : 'drop-shadow(0 0 6px rgba(168, 85, 247, 0.4))',
            }} />
            <h2 style={{
              fontSize: '32px',
              fontWeight: '700',
              color: darkMode ? '#f1f5f9' : '#1e293b',
              margin: 0,
              letterSpacing: '0.5px',
              textShadow: darkMode ? '0 2px 10px rgba(192, 132, 252, 0.3)' : 'none',
            }}>
              Your Brain Localization Results
            </h2>
          </div>

          {/* Top Region Highlight */}
          {topRegion && (
            <div style={{
              background: `${getProbabilityColor(topRegion[1])}20`,
              border: `3px solid ${getProbabilityColor(topRegion[1])}`,
              borderRadius: '20px',
              padding: '35px',
              marginBottom: '25px',
              boxShadow: `0 10px 30px ${getProbabilityColor(topRegion[1])}40, inset 0 1px 0 rgba(255,255,255,0.1)`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p style={{
                    fontSize: '18px',
                    color: darkMode ? '#cbd5e1' : '#64748b',
                    margin: '0 0 10px 0',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                  }}>
                    Most Likely Region
                  </p>
                  <h3 style={{
                    fontSize: '42px',
                    fontWeight: '800',
                    color: darkMode ? '#f1f5f9' : '#1a1a1a',
                    margin: 0,
                  }}>
                    {topRegion[0]}
                  </h3>
                </div>
                <div style={{
                  fontSize: '58px',
                  fontWeight: '700',
                  color: getProbabilityColor(topRegion[1]),
                }}>
                  {topRegion[1]}%
                </div>
              </div>
            </div>
          )}

          {/* Other Regions - Conditional Grid/Flex Layout */}
          <div style={{ marginTop: '20px' }}>
            <p style={{
              fontSize: '20px',
              fontWeight: '600',
              color: darkMode ? '#cbd5e1' : '#475569',
              marginBottom: '18px',
            }}>
              Other Probable Regions:
            </p>
            <div style={{ 
              display: sortedRegions.length > 3 ? 'grid' : 'flex',
              gridTemplateColumns: sortedRegions.length > 3 ? 'repeat(auto-fit, minmax(400px, 1fr))' : undefined,
              flexDirection: sortedRegions.length <= 3 ? 'column' : undefined,
              gap: '20px',
              maxHeight: sortedRegions.length > 3 ? '350px' : undefined,
              overflowY: sortedRegions.length > 3 ? 'auto' : undefined,
            }}>
              {sortedRegions.slice(1, 5).map(([region, probability], index) => (
                <div
                  key={region}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '18px 22px',
                    background: darkMode ? 'rgba(51, 65, 85, 0.5)' : 'rgba(248, 250, 252, 0.8)',
                    borderRadius: '15px',
                    border: `2px solid ${getProbabilityColor(probability)}40`,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                    <div style={{
                      width: '50px',
                      height: '50px',
                      minWidth: '50px',
                      minHeight: '50px',
                      borderRadius: '10px',
                      background: getDesaturatedColor(probability),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '22px',
                      fontWeight: '700',
                      color: probability <= 40 ? '#000' : '#fff',
                      lineHeight: '50px',
                      textAlign: 'center',
                      padding: 0,
                    }}>
                      {index + 2}
                    </div>
                    <span style={{
                      fontSize: '22px',
                      fontWeight: '600',
                      color: darkMode ? '#f1f5f9' : '#1e293b',
                    }}>
                      {region}
                    </span>
                  </div>
                  <span style={{
                    fontSize: '26px',
                    fontWeight: '700',
                    color: darkMode ? '#f1f5f9' : '#000000',
                    marginLeft: '15px',
                  }}>
                    {probability}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
          zIndex: 10,
          marginTop: 'auto',
        }}>
          <div>
            <p style={{
              fontSize: '18px',
              color: darkMode ? '#94a3b8' : '#6C6C6C',
              margin: 0,
              fontWeight: '500',
            }}>
              Based on {selectedSignsCount} seizure sign{selectedSignsCount !== 1 ? 's' : ''}
            </p>
            <p style={{
              fontSize: '16px',
              color: darkMode ? '#64748b' : '#8A8A8A',
              margin: '5px 0 0 0',
              fontWeight: '500',
            }}>
              Population estimates • ILAE-aligned research data
            </p>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
            padding: '14px 26px',
            borderRadius: '14px',
            boxShadow: '0 8px 25px rgba(168, 85, 247, 0.45)',
            transform: 'scale(1.12)',
            marginRight: '-12px',
          }}>
            <img 
              src={darkMode 
                ? "https://evcdikzpnjjpotbkkshs.supabase.co/storage/v1/object/public/public-bucket/darkmodelogo-neuroloop.png"
                : "https://evcdikzpnjjpotbkkshs.supabase.co/storage/v1/object/public/public-bucket/lightmodelogo-neuroloop.png"}
              alt="NeuroLoop" 
              style={{
                width: '34px',
                height: '34px',
                filter: darkMode ? 'drop-shadow(0 0 12px rgba(192, 132, 252, 0.7))' : 'drop-shadow(0 0 10px rgba(168, 85, 247, 0.5))',
              }}
            />
            <div>
              <p style={{
                fontSize: '19px',
                fontWeight: '700',
                color: 'white',
                margin: 0,
                lineHeight: 1.2,
              }}>
                NeuroLoop
              </p>
              <p style={{
                fontSize: '14px',
                fontWeight: '500',
                color: 'rgba(255, 255, 255, 0.95)',
                margin: 0,
                lineHeight: 1.2,
              }}>
                NeuroLoop.app
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

ExportCard.displayName = 'ExportCard';

export default ExportCard;

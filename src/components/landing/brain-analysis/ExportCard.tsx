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

    return (
      <div
        ref={ref}
        className="relative"
        style={{
          width: '1080px',
          height: '1080px',
          background: darkMode 
            ? 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)'
            : 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 50%, #e9d5ff 100%)',
          padding: '60px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Decorative Background Elements */}
        <div 
          style={{
            position: 'absolute',
            top: '100px',
            right: '100px',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(60px)',
          }}
        />
        <div 
          style={{
            position: 'absolute',
            bottom: '150px',
            left: '150px',
            width: '250px',
            height: '250px',
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.2) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(50px)',
          }}
        />

        {/* Header with Logo */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          marginBottom: '40px',
          position: 'relative',
          zIndex: 10,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 30px rgba(168, 85, 247, 0.4)',
            }}>
              <Brain style={{ 
                width: '48px', 
                height: '48px', 
                color: 'white',
              }} />
            </div>
            <div>
              <h1 style={{
                fontSize: '48px',
                fontWeight: '800',
                backgroundImage: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                display: 'inline-block',
                margin: 0,
                lineHeight: 1,
              }}>
                NeuroLoop
              </h1>
              <p style={{
                fontSize: '20px',
                color: darkMode ? '#cbd5e1' : '#64748b',
                margin: '5px 0 0 0',
                fontWeight: '500',
              }}>
                Brain Localization Analysis
              </p>
            </div>
          </div>
          <div style={{
            fontSize: '18px',
            color: darkMode ? '#94a3b8' : '#64748b',
            textAlign: 'right',
          }}>
            {today}
          </div>
        </div>

        {/* Main Results Card */}
        <div style={{
          background: darkMode ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.9)',
          borderRadius: '30px',
          padding: '40px',
          boxShadow: darkMode 
            ? '0 20px 60px rgba(0, 0, 0, 0.5)'
            : '0 20px 60px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(10px)',
          border: darkMode ? '2px solid rgba(148, 163, 184, 0.2)' : '2px solid rgba(168, 85, 247, 0.2)',
          position: 'relative',
          zIndex: 10,
          marginBottom: '30px',
          maxHeight: '820px',
        }}>
          {/* Summary Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            marginBottom: '35px',
          }}>
            <Sparkles style={{ 
              width: '32px', 
              height: '32px', 
              color: '#a855f7',
            }} />
            <h2 style={{
              fontSize: '32px',
              fontWeight: '700',
              color: darkMode ? '#f1f5f9' : '#1e293b',
              margin: 0,
              letterSpacing: '0.5px',
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
              marginBottom: '30px',
              boxShadow: `0 10px 30px ${getProbabilityColor(topRegion[1])}40`,
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
                    color: darkMode ? '#f1f5f9' : '#0f172a',
                    margin: 0,
                  }}>
                    {topRegion[0]}
                  </h3>
                </div>
                <div style={{
                  fontSize: '64px',
                  fontWeight: '800',
                  color: getProbabilityColor(topRegion[1]),
                }}>
                  {topRegion[1]}%
                </div>
              </div>
            </div>
          )}

          {/* Other Regions - Grid Layout with Max Height */}
          <div style={{ marginTop: '30px' }}>
            <p style={{
              fontSize: '20px',
              fontWeight: '600',
              color: darkMode ? '#cbd5e1' : '#475569',
              marginBottom: '20px',
            }}>
              Other Probable Regions:
            </p>
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
              gap: '15px',
              maxHeight: '350px',
              overflowY: 'auto',
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
                      background: getProbabilityColor(probability),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '22px',
                      fontWeight: '700',
                      color: probability <= 40 ? '#000' : '#fff',
                      lineHeight: 1,
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
                    color: '#000000',
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
              fontSize: '17px',
              color: darkMode ? '#94a3b8' : '#64748b',
              margin: 0,
              fontWeight: '500',
            }}>
              Based on {selectedSignsCount} seizure sign{selectedSignsCount !== 1 ? 's' : ''}
            </p>
            <p style={{
              fontSize: '15px',
              color: darkMode ? '#64748b' : '#94a3b8',
              margin: '5px 0 0 0',
            }}>
              Population estimates • ILAE-aligned research data
            </p>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
            padding: '12px 22px',
            borderRadius: '12px',
            boxShadow: '0 8px 25px rgba(168, 85, 247, 0.4)',
          }}>
            <img 
              src="https://evcdikzpnjjpotbkkshs.supabase.co/storage/v1/object/public/public-bucket/darkmodelogo-neuroloop.png" 
              alt="NeuroLoop" 
              style={{
                width: '28px',
                height: '28px',
              }}
            />
            <div>
              <p style={{
                fontSize: '18px',
                fontWeight: '700',
                color: 'white',
                margin: 0,
                lineHeight: 1.2,
              }}>
                NeuroLoop
              </p>
              <p style={{
                fontSize: '13px',
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

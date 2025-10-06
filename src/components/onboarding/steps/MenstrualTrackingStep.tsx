import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Calendar, Thermometer, AlertCircle, TrendingUp } from "lucide-react";

interface MenstrualTrackingStepProps {
  trackMenstrual: boolean;
  basalTempTime: string;
  onUpdate: (data: { trackMenstrual: boolean; basalTempTime: string }) => void;
  hasEpilepsy: boolean;
}

export function MenstrualTrackingStep({
  trackMenstrual,
  basalTempTime,
  onUpdate,
  hasEpilepsy
}: MenstrualTrackingStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-foreground">Menstrual Cycle Tracking</h2>
        <p className="text-muted-foreground">
          Track your cycle for better health insights
        </p>
      </div>

      {/* Main Tracking Card */}
      <Card className="p-6 border-2 border-dashed border-teal-500/30 bg-card">
        <div className="flex items-start gap-4">
          <Checkbox
            id="trackMenstrual"
            checked={trackMenstrual}
            onCheckedChange={(checked) => 
              onUpdate({ trackMenstrual: checked as boolean, basalTempTime })
            }
            className="mt-1 data-[state=checked]:bg-teal-500 data-[state=checked]:border-teal-500"
          />
          <div className="flex-1 space-y-4">
            <div>
              <Label htmlFor="trackMenstrual" className="text-lg font-semibold cursor-pointer text-foreground">
                Track menstrual cycle and basal temperature
              </Label>
              {hasEpilepsy && (
                <div className="mt-3 p-3 bg-background/50 rounded-lg border border-border">
                  <div className="flex items-start gap-2">
                    <div className="text-sm">
                      <p className="text-muted-foreground">
                        <strong className="text-foreground">Research shows:</strong> Catamenial epilepsy affects up to 40% of women with epilepsy. 
                        Hormonal fluctuations can significantly impact seizure frequency and other neurological symptoms.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Basal Temperature Section */}
            {trackMenstrual && (
              <div className="space-y-4 animate-in slide-in-from-top pt-4 border-t border-border">
                <div className="bg-card p-4 rounded-lg border border-border">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Thermometer className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <Label className="text-base font-semibold text-foreground">
                        Daily Basal Temperature Time
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        For accuracy, take temperature at the same time each morning before getting up.
                      </p>
                    </div>
                  </div>

                  <Input
                    type="time"
                    value={basalTempTime}
                    onChange={(e) => onUpdate({ trackMenstrual, basalTempTime: e.target.value })}
                    className="text-lg font-mono"
                  />
                </div>

                {/* Critical Research Gap */}
                <Card className="p-4 bg-gradient-to-br from-purple-500/10 to-teal-500/10 border-purple-500/20">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-purple-500" />
                      <h3 className="font-semibold text-foreground">Critical Research Gap</h3>
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-purple-500 mt-1">•</span>
                        <span>65% of women report menstrual seizure patterns, yet only 12% are properly studied</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-500 mt-1">•</span>
                        <span>Limited data exists on hormonal impacts on neurological conditions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-teal-500 mt-1">•</span>
                        <span className="text-teal-600 dark:text-teal-400 font-medium">
                          Your data could help millions of women worldwide
                        </span>
                      </li>
                    </ul>
                  </div>
                </Card>

                {/* What We'll Track */}
                <Card className="p-4 bg-card border-border">
                  <h3 className="font-semibold mb-3 text-foreground">What we'll track:</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                      <span className="text-muted-foreground">Cycle start/end dates</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                      <span className="text-muted-foreground">Flow intensity</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                      <span className="text-muted-foreground">Symptoms</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                      <span className="text-muted-foreground">Basal body temperature</span>
                    </div>
                    <div className="flex items-center gap-2 col-span-2">
                      <div className="h-2 w-2 rounded-full bg-teal-500"></div>
                      <span className="text-muted-foreground">Correlation with neurological symptoms</span>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}

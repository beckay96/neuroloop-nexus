import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, TrendingUp, TrendingDown, X, Eye, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface RiskAlert {
  alert_id: string;
  patient_id: string;
  patient_name: string;
  created_at: string;
  risk_type: 'seizure' | 'fall' | 'hospital' | 'med_failure';
  score: number;
  alert_level: 'critical' | 'moderate' | 'low';
  reason: string;
  status: 'unread' | 'acknowledged' | 'closed';
  historical_trend?: { date: string; score: number }[];
  context_notes?: string;
}

interface LivePatientRadarProps {
  maxVisible?: number;
}

export default function LivePatientRadar({ maxVisible = 8 }: LivePatientRadarProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedAlert, setSelectedAlert] = useState<RiskAlert | null>(null);
  
  // ALL MOCK DATA REMOVED - Will be replaced with real patient alerts
  const mockAlerts: RiskAlert[] = [];

  const alerts = mockAlerts.slice(0, maxVisible);

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'critical': return 'bg-red-500';
      case 'moderate': return 'bg-yellow-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getRiskIcon = (type: string) => {
    const iconMap: { [key: string]: string } = {
      seizure: '🧠',
      fall: '⚠️',
      hospital: '🏥',
      med_failure: '💊'
    };
    return iconMap[type] || '⚡';
  };

  const handleAcknowledge = (alertId: string) => {
    toast({
      title: "Alert Acknowledged",
      description: "Alert marked as reviewed and will move to acknowledged status.",
    });
    setSelectedAlert(null);
  };

  const handleClose = (alertId: string) => {
    toast({
      title: "Alert Closed",
      description: "Alert resolved and removed from active radar.",
    });
    setSelectedAlert(null);
  };

  return (
    <>
      <Card className="medical-card">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              Live Patient Radar
            </CardTitle>
            <Badge variant="destructive" className="text-xs">
              {alerts.filter(a => a.status === 'unread').length} Active
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {/* Radar Grid */}
          <div className="relative w-full aspect-square max-w-md mx-auto bg-gradient-to-br from-background to-muted rounded-full p-8 border-2 border-border">
            {/* Concentric circles */}
            <div className="absolute inset-8 rounded-full border border-border/30" />
            <div className="absolute inset-16 rounded-full border border-border/20" />
            <div className="absolute inset-24 rounded-full border border-border/10" />
            
            {/* Center indicator */}
            <div className="absolute top-1/2 left-1/2 w-4 h-4 -mt-2 -ml-2 bg-primary rounded-full shadow-glow-primary" />
            
            {/* Patient dots positioned around radar */}
            {alerts.map((alert, index) => {
              const angle = (index * 360) / Math.min(alerts.length, 8);
              const radius = alert.alert_level === 'critical' ? 35 : alert.alert_level === 'moderate' ? 55 : 75;
              const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
              const y = 50 + radius * Math.sin((angle * Math.PI) / 180);
              
              return (
                <button
                  key={alert.alert_id}
                  onClick={() => setSelectedAlert(alert)}
                  className={`absolute w-6 h-6 -ml-3 -mt-3 rounded-full ${getRiskColor(alert.alert_level)} 
                    shadow-lg cursor-pointer hover:scale-125 transition-all duration-200 
                    flex items-center justify-center text-xs
                    ${alert.status === 'unread' ? 'ring-2 ring-white' : ''}`}
                  style={{ left: `${x}%`, top: `${y}%` }}
                  title={`${alert.patient_name} - ${alert.risk_type}`}
                >
                  {getRiskIcon(alert.risk_type)}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <span>Critical</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full" />
              <span>Moderate</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full" />
              <span>Low</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-500 rounded-full ring-2 ring-gray-300" />
              <span>Unread</span>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 bg-red-500/10 rounded">
              <div className="font-bold text-red-600 dark:text-red-400">
                {alerts.filter(a => a.alert_level === 'critical').length}
              </div>
              <div className="text-muted-foreground">Critical</div>
            </div>
            <div className="p-2 bg-yellow-500/10 rounded">
              <div className="font-bold text-yellow-600 dark:text-yellow-400">
                {alerts.filter(a => a.alert_level === 'moderate').length}
              </div>
              <div className="text-muted-foreground">Moderate</div>
            </div>
            <div className="p-2 bg-blue-500/10 rounded">
              <div className="font-bold text-blue-600 dark:text-blue-400">
                {alerts.filter(a => a.alert_level === 'low').length}
              </div>
              <div className="text-muted-foreground">Low Risk</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alert Detail Dialog */}
      <Dialog open={!!selectedAlert} onOpenChange={() => setSelectedAlert(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedAlert && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <DialogTitle className="flex items-center gap-2">
                    <Badge variant={selectedAlert.alert_level === 'critical' ? 'destructive' : 'secondary'}>
                      {selectedAlert.alert_level.toUpperCase()}
                    </Badge>
                    <span>{selectedAlert.patient_name}</span>
                  </DialogTitle>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedAlert(null)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <DialogDescription className="text-xs text-muted-foreground">
                  {selectedAlert.risk_type.replace('_', ' ').toUpperCase()} Risk • {selectedAlert.created_at}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 mt-4">
                {/* Risk Score */}
                <Card>
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Risk Score</span>
                      <Badge variant="outline" className="text-lg font-bold">
                        {selectedAlert.score}
                      </Badge>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${getRiskColor(selectedAlert.alert_level)}`}
                        style={{ width: `${selectedAlert.score}%` }}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Reason */}
                <Card>
                  <CardContent className="pt-4">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-warning" />
                      Alert Reason
                    </h4>
                    <p className="text-sm text-muted-foreground">{selectedAlert.reason}</p>
                  </CardContent>
                </Card>

                {/* Historical Trend */}
                {selectedAlert.historical_trend && (
                  <Card>
                    <CardContent className="pt-4">
                      <h4 className="font-semibold mb-3">Historical Trend</h4>
                      <div className="space-y-2">
                        {selectedAlert.historical_trend.map((point, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground w-16">{point.date}</span>
                            <div className="flex-1 bg-muted rounded-full h-2">
                              <div
                                className="h-2 rounded-full bg-primary"
                                style={{ width: `${point.score}%` }}
                              />
                            </div>
                            <span className="text-xs font-medium w-8">{point.score}</span>
                            {idx < selectedAlert.historical_trend!.length - 1 && (
                              <TrendingUp className="h-3 w-3 text-red-500" />
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Context Notes */}
                {selectedAlert.context_notes && (
                  <Card>
                    <CardContent className="pt-4">
                      <h4 className="font-semibold mb-2">Context Notes</h4>
                      <p className="text-sm text-muted-foreground italic">{selectedAlert.context_notes}</p>
                    </CardContent>
                  </Card>
                )}

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                  <Button
                    variant="default"
                    className="flex-1"
                    onClick={() => navigate(`/patient/${selectedAlert.patient_id}`)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Full Record
                  </Button>
                  {selectedAlert.status === 'unread' && (
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleAcknowledge(selectedAlert.alert_id)}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Acknowledge
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    onClick={() => handleClose(selectedAlert.alert_id)}
                  >
                    Close Alert
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

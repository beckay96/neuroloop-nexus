import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle, Calendar, Phone, MessageSquare, Heart, Activity, Clock } from "lucide-react";

interface PatientAlert {
  id: string;
  patientName: string;
  patientId: string;
  age: number;
  condition: string;
  severity: 'critical' | 'moderate' | 'low';
  message: string;
  timestamp: string;
  action: string;
  lastSeizure?: string;
  lastMedication?: string;
  lastActivity?: string;
  medicationAdherence: number;
  recentEvents: string[];
}

interface PatientAlertDialogProps {
  alert: PatientAlert;
  children: React.ReactNode;
}

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'critical':
      return 'destructive';
    case 'moderate':
      return 'secondary';
    case 'low':
      return 'outline';
    default:
      return 'outline';
  }
};

export default function PatientAlertDialog({ alert, children }: PatientAlertDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-md sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            Patient Alert Review
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Patient Info Header */}
          <Card className="border-l-4 border-l-warning">
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <CardTitle className="text-lg">{alert.patientName}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    ID: {alert.patientId} • Age: {alert.age} • {alert.condition}
                  </p>
                </div>
                <Badge variant={getSeverityColor(alert.severity)}>
                  {alert.severity.toUpperCase()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-warning mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-sm">{alert.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{alert.timestamp}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Activity className="h-4 w-4 text-primary" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {alert.recentEvents.map((event, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div className="h-2 w-2 bg-primary rounded-full shrink-0" />
                  <span>{event}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Card className="p-3">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="h-4 w-4 text-status-stable" />
                <p className="text-sm font-medium">Medication Adherence</p>
              </div>
              <p className="text-2xl font-bold">{alert.medicationAdherence}%</p>
            </Card>
            
            <Card className="p-3">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-secondary" />
                <p className="text-sm font-medium">Last Event</p>
              </div>
              <p className="text-sm font-medium">
                {alert.lastSeizure || alert.lastMedication || alert.lastActivity || 'N/A'}
              </p>
            </Card>
          </div>

          {/* Recommended Action */}
          <Card className="bg-muted/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Recommended Action</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-3">{alert.action}</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button size="sm" className="flex-1">
                  <Phone className="h-4 w-4 mr-2" />
                  Contact Patient
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Visit
                </Button>
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Action Notes */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Clinical Notes</label>
            <Textarea
              placeholder="Add your clinical notes and action taken..."
              className="min-h-[80px]"
            />
            <div className="flex flex-col sm:flex-row gap-2">
              <Button className="flex-1">
                <MessageSquare className="h-4 w-4 mr-2" />
                Save & Acknowledge
              </Button>
              <Button variant="outline" className="flex-1">
                Mark as Resolved
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
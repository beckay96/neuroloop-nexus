import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Activity, Pill, TrendingUp, AlertCircle, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SnapshotEvent {
  type: 'seizure' | 'medication' | 'visit' | 'test' | 'alert';
  description: string;
  timestamp: string;
  severity?: 'critical' | 'moderate' | 'low';
}

interface PatientSnapshot {
  snapshot_id: string;
  patient_id: string;
  patient_name: string;
  patient_avatar: string;
  summary: string;
  highlight_events: SnapshotEvent[];
  adherence_rate: number;
  med_changes: number;
  ai_note: string;
  generated_at: string;
  author: 'ai' | 'clinician';
  status: 'stable' | 'monitoring' | 'urgent';
}

interface SmartSnapshotSummariesProps {
  maxVisible?: number;
}

export default function SmartSnapshotSummaries({ maxVisible = 6 }: SmartSnapshotSummariesProps) {
  const navigate = useNavigate();
  const [expandedSnapshots, setExpandedSnapshots] = useState<Set<string>>(new Set());

  const toggleSnapshot = (id: string) => {
    const newExpanded = new Set(expandedSnapshots);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedSnapshots(newExpanded);
  };

  // Mock data - replace with real API
  const mockSnapshots: PatientSnapshot[] = [
    {
      snapshot_id: '1',
      patient_id: 'P001',
      patient_name: 'Sarah Johnson',
      patient_avatar: 'SJ',
      summary: 'Critical seizure activity with medication adherence issues',
      highlight_events: [
        { type: 'seizure', description: '3 GTCs in 24h', timestamp: '2h ago', severity: 'critical' },
        { type: 'medication', description: 'Missed PM dose', timestamp: '5d ago', severity: 'moderate' },
        { type: 'alert', description: 'Blood level subtherapeutic', timestamp: '1w ago', severity: 'moderate' },
      ],
      adherence_rate: 87,
      med_changes: 0,
      ai_note: '⚠️ Missed PM dose 5 days ago may have contributed to cluster. Consider medication reminder system.',
      generated_at: '2 minutes ago',
      author: 'ai',
      status: 'urgent'
    },
    {
      snapshot_id: '2',
      patient_id: 'P002',
      patient_name: 'Michael Chen',
      patient_avatar: 'MC',
      summary: 'Progressive motor symptoms with medication timing concerns',
      highlight_events: [
        { type: 'medication', description: 'Missed 2 consecutive days', timestamp: '4h ago', severity: 'moderate' },
        { type: 'alert', description: 'Tremor worsening', timestamp: '12h ago', severity: 'moderate' },
        { type: 'visit', description: 'Last seen 2 weeks ago', timestamp: '14d ago' },
      ],
      adherence_rate: 72,
      med_changes: 1,
      ai_note: '💡 Adherence pattern suggests morning dose confusion. Recommend simplified dosing schedule.',
      generated_at: '15 minutes ago',
      author: 'ai',
      status: 'monitoring'
    },
    {
      snapshot_id: '3',
      patient_id: 'P003',
      patient_name: 'Emily Rodriguez',
      patient_avatar: 'ER',
      summary: 'Stable condition with excellent adherence',
      highlight_events: [
        { type: 'medication', description: 'Consistent dosing', timestamp: 'ongoing' },
        { type: 'test', description: 'Blood level therapeutic', timestamp: '1w ago' },
        { type: 'visit', description: 'Routine follow-up', timestamp: '3w ago' },
      ],
      adherence_rate: 95,
      med_changes: 0,
      ai_note: '✅ Excellent compliance and stable symptoms. Continue current regimen.',
      generated_at: '1 hour ago',
      author: 'ai',
      status: 'stable'
    },
    {
      snapshot_id: '4',
      patient_id: 'P004',
      patient_name: 'Lisa Parker',
      patient_avatar: 'LP',
      summary: 'Breakthrough seizures with stress triggers',
      highlight_events: [
        { type: 'seizure', description: 'Myoclonic jerks', timestamp: '6h ago', severity: 'moderate' },
        { type: 'alert', description: 'Sleep deprivation', timestamp: '8h ago', severity: 'moderate' },
        { type: 'medication', description: 'Good adherence', timestamp: 'ongoing' },
      ],
      adherence_rate: 91,
      med_changes: 0,
      ai_note: '⚡ Stress and poor sleep may be lowering seizure threshold. Consider stress management referral.',
      generated_at: '30 minutes ago',
      author: 'ai',
      status: 'monitoring'
    },
  ];

  const snapshots = mockSnapshots.slice(0, maxVisible);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'urgent': return 'bg-red-500/10 border-red-500/50 text-red-600 dark:text-red-400';
      case 'monitoring': return 'bg-yellow-500/10 border-yellow-500/50 text-yellow-600 dark:text-yellow-400';
      case 'stable': return 'bg-green-500/10 border-green-500/50 text-green-600 dark:text-green-400';
      default: return 'bg-muted';
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'seizure': return <Activity className="h-3 w-3" />;
      case 'medication': return <Pill className="h-3 w-3" />;
      case 'alert': return <AlertCircle className="h-3 w-3" />;
      case 'visit': return <TrendingUp className="h-3 w-3" />;
      default: return <Activity className="h-3 w-3" />;
    }
  };

  return (
    <div className="space-y-3">
      {snapshots.map((snapshot) => (
        <Card key={snapshot.snapshot_id} className={`medical-card border-2 ${getStatusColor(snapshot.status)}`}>
          <Collapsible open={expandedSnapshots.has(snapshot.snapshot_id)}>
            <div className="p-4">
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10 shrink-0">
                  <AvatarFallback className="bg-primary/10 text-primary font-medium">
                    {snapshot.patient_avatar}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <button
                      onClick={() => navigate(`/patient/${snapshot.patient_id}`)}
                      className="font-semibold hover:text-primary transition-colors hover:underline text-left"
                    >
                      {snapshot.patient_name}
                    </button>
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => toggleSnapshot(snapshot.snapshot_id)}
                      >
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-200 ${
                            expandedSnapshots.has(snapshot.snapshot_id) ? 'rotate-180' : ''
                          }`}
                        />
                      </Button>
                    </CollapsibleTrigger>
                  </div>

                  <p className="text-sm text-muted-foreground mb-2">{snapshot.summary}</p>

                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <Badge variant="outline" className="bg-primary/5">
                      {snapshot.adherence_rate}% adherence
                    </Badge>
                    {snapshot.med_changes > 0 && (
                      <Badge variant="outline" className="bg-warning/5">
                        {snapshot.med_changes} med change{snapshot.med_changes > 1 ? 's' : ''}
                      </Badge>
                    )}
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Sparkles className="h-3 w-3" />
                      {snapshot.generated_at}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <CollapsibleContent>
              <div className="px-4 pb-4 border-t bg-muted/20">
                {/* AI Note */}
                <div className="pt-3 mb-3 p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Sparkles className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                    <p className="text-sm italic">{snapshot.ai_note}</p>
                  </div>
                </div>

                {/* Highlight Events */}
                <div className="space-y-2 mb-3">
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase">Recent Events</h4>
                  {snapshot.highlight_events.map((event, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-sm p-2 rounded bg-background"
                    >
                      {getEventIcon(event.type)}
                      <span className="flex-1">{event.description}</span>
                      <span className="text-xs text-muted-foreground">{event.timestamp}</span>
                      {event.severity && (
                        <Badge
                          variant={
                            event.severity === 'critical'
                              ? 'destructive'
                              : event.severity === 'moderate'
                              ? 'secondary'
                              : 'outline'
                          }
                          className="text-xs"
                        >
                          {event.severity}
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => navigate(`/patient/${snapshot.patient_id}`)}
                  >
                    View Full Record
                  </Button>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </Card>
      ))}
    </div>
  );
}

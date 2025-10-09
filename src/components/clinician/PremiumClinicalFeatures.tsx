// Premium Clinical Features - Consolidated Components
// This file contains all remaining premium features: 
// 3. Clinical Scales, 4. Neuroimaging, 5. Case Panels, 6. Note Generation,
// 7. Chat, 8. PRO Timeline, 9. Today View, 10. AI Insights

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, FileText, MessageSquare, TrendingUp, Calendar, 
  Download, Send, Image, Lightbulb, CheckCircle, AlertCircle,
  Activity, Pill, Moon, Frown, Smile, Zap
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

// ============= 3. Clinical Scales Entry/Trend =============
interface ClinicalScale {
  scale_id: string;
  patient_id: string;
  patient_name: string;
  scale_type: string;
  score: number;
  assessed_at: string;
  due_at: string;
  change_alert: boolean;
  trend: { date: string; score: number }[];
}

export function ClinicalScalesWidget() {
  const [showEntryModal, setShowEntryModal] = useState(false);
  const [selectedScale, setSelectedScale] = useState<ClinicalScale | null>(null);

  // ALL MOCK DATA REMOVED - Will fetch from clinical.clinical_scale_results
  const scales: ClinicalScale[] = [];

  return (
    <Card className="medical-card">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Clinical Scales
          </span>
          <Button size="sm" onClick={() => setShowEntryModal(true)}>
            + Add Assessment
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {scales.map((scale) => (
            <Card key={scale.scale_id} className="p-3 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setSelectedScale(scale)}>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="font-semibold text-sm">{scale.patient_name}</div>
                  <div className="text-xs text-muted-foreground">{scale.scale_type}</div>
                </div>
                <Badge variant={scale.change_alert ? "destructive" : "outline"} className="text-lg">
                  {scale.score}
                </Badge>
              </div>
              {scale.change_alert && (
                <Badge variant="destructive" className="text-xs">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Significant Change
                </Badge>
              )}
              <div className="text-xs text-muted-foreground mt-2">
                Due: {scale.due_at}
              </div>
            </Card>
          ))}
        </div>

        {/* Trend Modal */}
        <Dialog open={!!selectedScale} onOpenChange={() => setSelectedScale(null)}>
          <DialogContent className="max-w-2xl">
            {selectedScale && (
              <>
                <DialogHeader>
                  <DialogTitle>{selectedScale.scale_type} - {selectedScale.patient_name}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Current Score:</span>
                    <Badge className="text-xl">{selectedScale.score}</Badge>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Historical Trend</h4>
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart data={selectedScale.trend}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="score" stroke="#8884d8" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}

// ============= 4. Neuroimaging Overlay =============
interface NeuroscanImage {
  image_id: string;
  patient_id: string;
  patient_name: string;
  study_type: string;
  findings_summary: string;
  uploaded_at: string;
  study_date: string;
}

export function NeuroimagingViewer() {
  const [selectedImage, setSelectedImage] = useState<NeuroscanImage | null>(null);

  // ALL MOCK DATA REMOVED - Will fetch from clinical.neuro_imaging_results
  const images: NeuroscanImage[] = [];

  return (
    <Card className="medical-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Image className="h-5 w-5" />
          Neuroimaging Results
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {images.map((img) => (
            <Card key={img.image_id} className="p-3 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setSelectedImage(img)}>
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold text-sm">{img.patient_name}</div>
                  <Badge variant="outline" className="text-xs mt-1">{img.study_type}</Badge>
                </div>
                <span className="text-xs text-muted-foreground">{img.study_date}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{img.findings_summary}</p>
            </Card>
          ))}
        </div>

        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-4xl">
            {selectedImage && (
              <>
                <DialogHeader>
                  <DialogTitle>{selectedImage.study_type} - {selectedImage.patient_name}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
                    <Image className="h-16 w-16 text-muted-foreground" />
                    <span className="ml-2 text-muted-foreground">DICOM Viewer Placeholder</span>
                  </div>
                  <Card className="p-4">
                    <h4 className="font-semibold mb-2">Findings</h4>
                    <p className="text-sm">{selectedImage.findings_summary}</p>
                  </Card>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}

// ============= 6. 1-Click Clinical Note Generation =============
export function ClinicalNoteGenerator({ patientId }: { patientId: string }) {
  const { toast } = useToast();
  const [generating, setGenerating] = useState(false);

  const handleGenerate = async (format: 'pdf' | 'docx') => {
    setGenerating(true);
    toast({
      title: "Generating Clinical Note",
      description: `Creating ${format.toUpperCase()} document...`,
    });
    
    // Simulate generation
    setTimeout(() => {
      setGenerating(false);
      toast({
        title: "Note Generated Successfully",
        description: `Clinical note ready for download.`,
      });
    }, 2000);
  };

  return (
    <Card className="medical-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Clinical Documentation
        </CardTitle>
        <CardDescription>Auto-generate visit summaries and reports</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <Button className="w-full" onClick={() => handleGenerate('pdf')} disabled={generating}>
            <Download className="h-4 w-4 mr-2" />
            Generate Visit Summary (PDF)
          </Button>
          <Button variant="outline" className="w-full" onClick={() => handleGenerate('docx')} disabled={generating}>
            <Download className="h-4 w-4 mr-2" />
            Generate Referral Letter (DOCX)
          </Button>
          {generating && <Progress value={66} className="w-full" />}
        </div>
      </CardContent>
    </Card>
  );
}

// ============= 7. Secure Chat/Collab =============
interface ChatMessage {
  message_id: string;
  sender_name: string;
  message: string;
  sent_at: string;
  is_urgent: boolean;
}

export function SecureConsultChat({ patientId }: { patientId: string }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    
    const msg: ChatMessage = {
      message_id: Date.now().toString(),
      sender_name: 'You',
      message: newMessage,
      sent_at: 'Just now',
      is_urgent: false
    };
    setMessages([...messages, msg]);
    setNewMessage('');
  };

  return (
    <Card className="medical-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Team Consultation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="text-sm text-muted-foreground">No messages yet.</div>
          ) : (
            messages.map((msg) => (
              <div key={msg.message_id} className="p-3 rounded-lg bg-muted">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-sm">{msg.sender_name}</span>
                  <div className="flex items-center gap-2">
                    {msg.is_urgent && <Badge variant="destructive" className="text-xs">Urgent</Badge>}
                    <span className="text-xs text-muted-foreground">{msg.sent_at}</span>
                  </div>
                </div>
                <p className="text-sm">{msg.message}</p>
              </div>
            ))
          )}
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Type message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <Button onClick={sendMessage}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// ============= 8. Patient-Reported Outcomes Timeline =============
export function PROTimeline({ patientId }: { patientId: string }) {
  const [proData] = useState<any[]>([]);

  return (
    <Card className="medical-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Patient-Reported Outcomes
        </CardTitle>
      </CardHeader>
      <CardContent>
        {proData.length === 0 ? (
          <div className="text-sm text-muted-foreground">No patient-reported outcomes yet.</div>
        ) : (
          <>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={proData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Line type="monotone" dataKey="sleep" stroke="#8884d8" name="Sleep" />
                <Line type="monotone" dataKey="mood" stroke="#82ca9d" name="Mood" />
                <Line type="monotone" dataKey="pain" stroke="#ffc658" name="Pain" />
              </LineChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-3 gap-2 mt-4">
              <div className="text-center p-2 bg-blue-500/10 rounded">
                <Moon className="h-4 w-4 mx-auto mb-1 text-blue-600" />
                <div className="text-xs text-muted-foreground">Sleep</div>
              </div>
              <div className="text-center p-2 bg-green-500/10 rounded">
                <Smile className="h-4 w-4 mx-auto mb-1 text-green-600" />
                <div className="text-xs text-muted-foreground">Mood</div>
              </div>
              <div className="text-center p-2 bg-yellow-500/10 rounded">
                <Zap className="h-4 w-4 mx-auto mb-1 text-yellow-600" />
                <div className="text-xs text-muted-foreground">Pain</div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

// ============= 9. Personalized Today View =============
export function TodayView() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [todayData, setTodayData] = useState<{
    appointments: any[];
    high_priority: any[];
    pending_tasks: any[];
  }>({ appointments: [], high_priority: [], pending_tasks: [] });

  useEffect(() => {
    const loadToday = async () => {
      try {
        setLoading(true);
        setError(null);
        if (!user?.id) {
          setTodayData({ appointments: [], high_priority: [], pending_tasks: [] });
          return;
        }
        const { data, error } = await supabase.rpc('get_clinician_today_view', {
          p_clinician_id: user.id
        });
        if (error) throw error;
        const row = Array.isArray(data) ? data[0] : data;
        setTodayData({
          appointments: row?.appointments ?? [],
          high_priority: row?.high_priority_patients ?? row?.high_priority ?? [],
          pending_tasks: row?.pending_tasks ?? []
        });
      } catch (err: any) {
        console.error('Failed to load today view:', err);
        setError('Failed to load Today view');
        setTodayData({ appointments: [], high_priority: [], pending_tasks: [] });
      } finally {
        setLoading(false);
      }
    };
    loadToday();
  }, [user?.id]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <Card className="medical-card">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Today's Appointments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {todayData.appointments.map((apt, idx) => (
              <div 
                key={idx} 
                className="p-2 bg-muted rounded text-sm cursor-pointer hover:bg-muted/80 transition-colors"
                onClick={() => {
                  navigate(`/patient/${apt.patientId}`);
                  toast({
                    title: "Opening Patient Record",
                    description: `Viewing details for ${apt.patient}`,
                  });
                }}
              >
                <div className="font-semibold">{apt.time}</div>
                <div>{apt.patient}</div>
                <Badge variant="outline" className="text-xs mt-1">{apt.type}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="medical-card">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-red-500" />
            High Priority
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Array.isArray(todayData.high_priority) && todayData.high_priority.length > 0 ? todayData.high_priority.map((item: any, idx: number) => (
              <div 
                key={idx} 
                className="p-2 bg-red-500/10 rounded text-sm border border-red-500/20 cursor-pointer hover:bg-red-500/20 transition-colors"
                onClick={() => {
                  const pid = item.patientId || item.patient_id || '';
                  if (pid) navigate(`/patient/${pid}`);
                  toast({
                    title: "High Priority Patient",
                    description: "Opening patient record",
                  });
                }}
              >
                {item.text || item.reason || item.patient || 'High priority item'}
              </div>
            )) : (
              <div className="text-sm text-muted-foreground">No high priority alerts.</div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="medical-card">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Pending Tasks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Array.isArray(todayData.pending_tasks) && todayData.pending_tasks.length > 0 ? todayData.pending_tasks.map((task: any, idx: number) => (
              <div key={idx} className="p-2 bg-muted rounded text-sm flex items-start gap-2 hover:bg-muted/80 transition-colors">
                <input 
                  type="checkbox" 
                  className="mt-1 cursor-pointer" 
                  onChange={(e) => {
                    if (e.target.checked) {
                      toast({
                        title: "Task Completed",
                        description: typeof task === 'string' ? task : (task?.title || 'Task completed'),
                      });
                    }
                  }}
                />
                <span>{typeof task === 'string' ? task : (task?.title || 'Task')}</span>
              </div>
            )) : (
              <div className="text-sm text-muted-foreground">No pending tasks.</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ============= 10. AI Insights Feed =============
export function AIInsightsFeed() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [dismissedInsights, setDismissedInsights] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [insights, setInsights] = useState<any[]>([]);

  const handleDismissInsight = (insightId: string) => {
    setDismissedInsights(prev => [...prev, insightId]);
    toast({
      title: "Insight Dismissed",
      description: "This insight has been removed from your feed",
    });
  };

  useEffect(() => {
    const loadInsights = async () => {
      try {
        setLoading(true);
        setError(null);
        if (!user?.id) { setInsights([]); return; }
        const { data, error } = await supabase.rpc('get_ai_insights_for_clinician', {
          p_clinician_id: user.id
        });
        if (error) throw error;
        setInsights(Array.isArray(data) ? data : (data ? [data] : []));
      } catch (err: any) {
        console.error('Failed to load insights:', err);
        setError('Failed to load insights');
        setInsights([]);
      } finally {
        setLoading(false);
      }
    };
    loadInsights();
  }, [user?.id]);

  const visibleInsights = insights.filter(i => !dismissedInsights.includes(i.insight_id));

  return (
    <div className="space-y-3">
      {loading ? (
        <div className="text-sm text-muted-foreground">Loading...</div>
      ) : error ? (
        <div className="text-sm text-destructive">{error}</div>
      ) : visibleInsights.length === 0 ? (
        <div className="text-sm text-muted-foreground">No insights yet.</div>
      ) : visibleInsights.map((insight) => (
        <Card key={insight.insight_id} className="medical-card border-l-4 border-l-blue-500 bg-blue-500/5">
          <CardContent className="pt-4">
            <div className="flex items-start gap-3">
              <Lightbulb className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium mb-1">{insight.content || insight.title}</p>
                {insight.impact_metric && (
                  <p className="text-xs text-muted-foreground">
                    {typeof insight.impact_metric === 'string' ? insight.impact_metric : JSON.stringify(insight.impact_metric)}
                  </p>
                )}
              </div>
              <Button variant="ghost" size="sm" onClick={() => handleDismissInsight(insight.insight_id)}>✕</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// ============= 5. Case-Driven Data Panels =============
export function CaseDataPanels({ patientId }: { patientId: string }) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [panels, setPanels] = useState<any[]>([]);

  useEffect(() => {
    const loadPanels = async () => {
      try {
        setLoading(true);
        setError(null);
        if (!patientId) { setPanels([]); return; }
        const { data, error } = await supabase.rpc('get_case_panels_for_patient', {
          p_patient_id: patientId
        });
        if (error) throw error;
        setPanels(Array.isArray(data) ? data : (data ? [data] : []));
      } catch (err: any) {
        console.error('Failed to load case panels:', err);
        setError('Failed to load case panels');
        setPanels([]);
      } finally {
        setLoading(false);
      }
    };
    loadPanels();
  }, [patientId]);

  const borderClass = (panelType?: string) => {
    switch ((panelType || '').toLowerCase()) {
      case 'urgency': return 'border-l-4 border-l-red-500';
      case 'trends': return 'border-l-4 border-l-yellow-500';
      default: return '';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {loading ? (
        <Card className="medical-card"><CardContent className="p-4 text-sm text-muted-foreground">Loading panels...</CardContent></Card>
      ) : error ? (
        <Card className="medical-card"><CardContent className="p-4 text-sm text-destructive">{error}</CardContent></Card>
      ) : panels.length === 0 ? (
        <Card className="medical-card"><CardContent className="p-4 text-sm text-muted-foreground">No case panels yet.</CardContent></Card>
      ) : (
        panels.map((panel) => (
          <Card key={panel.panel_id} className={`medical-card ${borderClass(panel.panel_type)}`}>
            <CardHeader>
              <CardTitle className="text-base">{panel.title || panel.custom_panel_name || panel.panel_type || 'Panel'}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              {panel.content ? (
                typeof panel.content === 'string' ? (
                  <div>{panel.content}</div>
                ) : (
                  Object.entries(panel.content).map(([k, v]: any) => (
                    <div key={k} className="flex items-start gap-2">
                      <span className="font-medium capitalize">{k.replace(/_/g, ' ')}:</span>
                      <span className="text-muted-foreground">{typeof v === 'string' ? v : JSON.stringify(v)}</span>
                    </div>
                  ))
                )
              ) : (
                <div className="text-muted-foreground">No content.</div>
              )}
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}

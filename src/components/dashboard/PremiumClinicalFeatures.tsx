// Premium Clinical Features - Consolidated Components
// This file contains all remaining premium features: 
// 3. Clinical Scales, 4. Neuroimaging, 5. Case Panels, 6. Note Generation,
// 7. Chat, 8. PRO Timeline, 9. Today View, 10. AI Insights

import { useState } from "react";
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

  const scales: ClinicalScale[] = [
    {
      scale_id: '1',
      patient_id: 'P001',
      patient_name: 'Sarah Johnson',
      scale_type: 'MDS-UPDRS',
      score: 42,
      assessed_at: '2025-09-15',
      due_at: '2025-10-15',
      change_alert: true,
      trend: [
        { date: '2025-06-15', score: 35 },
        { date: '2025-07-15', score: 38 },
        { date: '2025-08-15', score: 40 },
        { date: '2025-09-15', score: 42 }
      ]
    },
    {
      scale_id: '2',
      patient_id: 'P002',
      patient_name: 'Michael Chen',
      scale_type: 'MoCA',
      score: 26,
      assessed_at: '2025-09-20',
      due_at: '2025-12-20',
      change_alert: false,
      trend: [
        { date: '2025-03-20', score: 27 },
        { date: '2025-06-20', score: 27 },
        { date: '2025-09-20', score: 26 }
      ]
    }
  ];

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

  const images: NeuroscanImage[] = [
    {
      image_id: '1',
      patient_id: 'P001',
      patient_name: 'Sarah Johnson',
      study_type: 'MRI Brain',
      findings_summary: 'Mesial temporal sclerosis, left hippocampus. Consistent with focal epilepsy.',
      uploaded_at: '2025-09-25',
      study_date: '2025-09-24'
    },
    {
      image_id: '2',
      patient_id: 'P002',
      patient_name: 'Michael Chen',
      study_type: 'DaTscan',
      findings_summary: 'Reduced uptake in bilateral putamen, consistent with Parkinsons disease.',
      uploaded_at: '2025-09-20',
      study_date: '2025-09-19'
    }
  ];

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
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      message_id: '1',
      sender_name: 'Dr. Smith',
      message: 'Patient showing progressive symptoms. Recommend MRI follow-up.',
      sent_at: '10:30 AM',
      is_urgent: false
    },
    {
      message_id: '2',
      sender_name: 'Dr. Johnson',
      message: 'Agreed. Also consider increasing levetiracetam dose.',
      sent_at: '11:45 AM',
      is_urgent: true
    }
  ]);
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
          {messages.map((msg) => (
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
          ))}
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
  const proData = [
    { date: '09-15', sleep: 6, mood: 7, pain: 3 },
    { date: '09-20', sleep: 5, mood: 5, pain: 4 },
    { date: '09-25', sleep: 7, mood: 8, pain: 2 },
    { date: '09-30', sleep: 6, mood: 7, pain: 3 }
  ];

  return (
    <Card className="medical-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Patient-Reported Outcomes
        </CardTitle>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
}

// ============= 9. Personalized Today View =============
export function TodayView() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const todayData = {
    appointments: [
      { time: '09:00 AM', patient: 'Sarah Johnson', type: 'Follow-up', patientId: 'P001' },
      { time: '10:30 AM', patient: 'Michael Chen', type: 'New Patient', patientId: 'P002' },
      { time: '02:00 PM', patient: 'Emily Rodriguez', type: 'Medication Review', patientId: 'P003' }
    ],
    high_priority: [
      { text: 'Sarah Johnson (Seizure cluster)', patientId: 'P001' },
      { text: 'Robert Kim (Fall risk)', patientId: 'P005' }
    ],
    pending_tasks: [
      'Review MRI for Lisa Parker',
      'Sign off on 3 clinical notes',
      'Respond to 2 consultation requests'
    ]
  };

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
            {todayData.high_priority.map((item, idx) => (
              <div 
                key={idx} 
                className="p-2 bg-red-500/10 rounded text-sm border border-red-500/20 cursor-pointer hover:bg-red-500/20 transition-colors"
                onClick={() => {
                  navigate(`/patient/${item.patientId}`);
                  toast({
                    title: "High Priority Patient",
                    description: "Opening patient record",
                  });
                }}
              >
                {item.text}
              </div>
            ))}
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
            {todayData.pending_tasks.map((task, idx) => (
              <div key={idx} className="p-2 bg-muted rounded text-sm flex items-start gap-2 hover:bg-muted/80 transition-colors">
                <input 
                  type="checkbox" 
                  className="mt-1 cursor-pointer" 
                  onChange={(e) => {
                    if (e.target.checked) {
                      toast({
                        title: "Task Completed",
                        description: task,
                      });
                    }
                  }}
                />
                <span>{task}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ============= 10. AI Insights Cards =============
export function AIInsightsCards() {
  const insights = [
    {
      insight_id: '1',
      type: 'did_you_know',
      content: 'Patients with >90% adherence have 45% fewer breakthrough seizures in your cohort',
      impact: '+23 seizure-free days per patient'
    },
    {
      insight_id: '2',
      type: 'recommendation',
      content: '3 patients may benefit from medication timing optimization based on ON/OFF patterns',
      impact: 'Potential 30% improvement in motor function'
    },
    {
      insight_id: '3',
      type: 'trend',
      content: 'Falls incidents decreased 42% since implementing fall risk protocol',
      impact: '12 fewer falls this quarter'
    }
  ];

  return (
    <div className="space-y-3">
      {insights.map((insight) => (
        <Card key={insight.insight_id} className="medical-card border-l-4 border-l-blue-500 bg-blue-500/5">
          <CardContent className="pt-4">
            <div className="flex items-start gap-3">
              <Lightbulb className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium mb-1">{insight.content}</p>
                <p className="text-xs text-muted-foreground">{insight.impact}</p>
              </div>
              <Button variant="ghost" size="sm">✕</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// ============= 5. Case-Driven Data Panels =============
export function CaseDataPanels({ patientId }: { patientId: string }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="medical-card border-l-4 border-l-red-500">
        <CardHeader>
          <CardTitle className="text-base">Why Urgent Today?</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
            <span>3 seizures in 24h (baseline: 1/week)</span>
          </div>
          <div className="flex items-start gap-2">
            <Activity className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
            <span>Missed medication × 2 consecutive days</span>
          </div>
        </CardContent>
      </Card>

      <Card className="medical-card border-l-4 border-l-yellow-500">
        <CardHeader>
          <CardTitle className="text-base">Key Trends</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2">
          <div className="flex justify-between">
            <span>Adherence</span>
            <Badge variant="outline">87% ↓ from 95%</Badge>
          </div>
          <div className="flex justify-between">
            <span>Seizure Frequency</span>
            <Badge variant="destructive">↑ 200%</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

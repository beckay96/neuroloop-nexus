import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { 
  ArrowLeft, 
  Calendar, 
  Phone, 
  Mail, 
  MapPin, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Activity, 
  Brain, 
  Heart, 
  Pill, 
  FileText, 
  TrendingUp, 
  TrendingDown, 
  Edit, 
  Save, 
  Plus,
  Stethoscope,
  TestTube,
  Target,
  Users,
  MessageSquare,
  Download,
  Printer
} from 'lucide-react';
import ClinicianHeader from '@/components/navigation/ClinicianHeader';
import { useAuth } from '@/hooks/useAuth';

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  adherence: number;
  lastTaken: string;
  sideEffects: string[];
  bloodLevel?: {
    current: number;
    target: number;
    unit: string;
  };
}

interface RecentVitals {
  bloodPressure: string;
  heartRate: number;
  weight: string;
  lastUpdated: string;
}

interface ClinicalScale {
  id: string;
  type: string;
  score: number;
  maxScore: number;
  date: string;
  trend: 'improving' | 'stable' | 'worsening';
}

interface Visit {
  id: string;
  date: string;
  type: string;
  provider: string;
  notes: string;
  duration: string;
}

interface TestResult {
  id: string;
  type: string;
  date: string;
  status: string;
  notes: string;
}

interface CarePlan {
  goals: string[];
  interventions: string[];
  nextReview: string;
}

interface PatientData {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  condition: string;
  diagnosis: string[];
  riskLevel: 'low' | 'moderate' | 'high' | 'critical';
  lastVisit: string;
  nextAppointment: string;
  adherenceRate: number;
  currentMedications: Medication[];
  recentVitals: RecentVitals;
  clinicalScales: ClinicalScale[];
  visitHistory: Visit[];
  testResults: TestResult[];
  carePlan: CarePlan;
  notes: string;
}

export default function PatientView() {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [patient, setPatient] = useState<PatientData | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Mock patient data - replace with actual API call
  useEffect(() => {
    const loadPatientData = () => {
      // Simulate API call
      setTimeout(() => {
        const mockPatient: PatientData = {
          id: patientId || '1',
          name: 'Sarah Johnson',
          email: 'sarah.johnson@email.com',
          phone: '+1 (555) 123-4567',
          dateOfBirth: '1985-03-15',
          address: '123 Main St, San Francisco, CA 94102',
          emergencyContact: {
            name: 'Michael Johnson',
            relationship: 'Spouse',
            phone: '+1 (555) 987-6543'
          },
          condition: 'Temporal Lobe Epilepsy',
          diagnosis: ['Temporal Lobe Epilepsy', 'Anxiety Disorder', 'Mild Cognitive Impairment'],
          riskLevel: 'high',
          lastVisit: '2024-01-15',
          nextAppointment: '2024-02-15',
          adherenceRate: 87,
          currentMedications: [
            {
              id: '1',
              name: 'Levetiracetam',
              dosage: '500mg',
              frequency: '2x daily',
              adherence: 91,
              lastTaken: '4 hours ago',
              sideEffects: ['Mild drowsiness'],
              bloodLevel: { current: 28, target: 35, unit: 'μg/mL' }
            },
            {
              id: '2',
              name: 'Lamotrigine',
              dosage: '200mg',
              frequency: '2x daily',
              adherence: 83,
              lastTaken: '4 hours ago',
              sideEffects: [],
              bloodLevel: null
            }
          ],
          recentVitals: {
            bloodPressure: '125/82',
            heartRate: 72,
            weight: '68 kg',
            lastUpdated: '2024-01-15'
          },
          clinicalScales: [
            {
              id: '1',
              type: 'NINDS-CSC',
              score: 6,
              maxScore: 10,
              date: '2024-01-10',
              trend: 'stable'
            }
          ],
          visitHistory: [
            {
              id: '1',
              date: '2024-01-15',
              type: 'Follow-up',
              provider: 'Dr. Smith',
              notes: 'Patient reports good seizure control. No breakthrough seizures in past month.',
              duration: '30 min'
            },
            {
              id: '2',
              date: '2023-12-15',
              type: 'Routine Check-up',
              provider: 'Dr. Smith',
              notes: 'Medication adjustment made. Increased Levetiracetam dose.',
              duration: '45 min'
            }
          ],
          testResults: [
            {
              id: '1',
              type: 'EEG',
              date: '2024-01-05',
              status: 'Normal',
              notes: 'No epileptiform activity detected'
            },
            {
              id: '2',
              type: 'Blood Work',
              date: '2024-01-10',
              status: 'Normal',
              notes: 'Drug levels within therapeutic range'
            }
          ],
          carePlan: {
            goals: [
              'Maintain seizure freedom',
              'Improve medication adherence',
              'Manage anxiety symptoms'
            ],
            interventions: [
              'Continue current medication regimen',
              'Monthly follow-up visits',
              'Stress management counseling'
            ],
            nextReview: '2024-03-15'
          },
          notes: 'Patient is doing well overall. Reports good quality of life and no recent seizures. Continue current treatment plan.'
        };
        
        setPatient(mockPatient);
        setNotes(mockPatient.notes);
        setIsLoading(false);
      }, 1000);
    };

    loadPatientData();
  }, [patientId]);

  const getUserDisplayName = () => {
    if (user?.user_metadata?.first_name && user?.user_metadata?.last_name) {
      return `Dr. ${user.user_metadata.first_name} ${user.user_metadata.last_name}`;
    }
    if (user?.email) {
      return `Dr. ${user.email.split('@')[0]}`;
    }
    return "Dr. Clinician";
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800';
      case 'moderate': return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800';
      case 'critical': return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const handleSaveNotes = () => {
    // TODO: Save notes to backend
    setIsEditingNotes(false);
    if (patient) {
      setPatient({ ...patient, notes });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <ClinicianHeader userName={getUserDisplayName()} currentSection="Patient View" />
        <div className="container mx-auto p-6">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <Activity className="h-8 w-8 animate-pulse mx-auto mb-4 text-primary" />
              <p className="text-muted-foreground">Loading patient information...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="min-h-screen bg-background">
        <ClinicianHeader userName={getUserDisplayName()} currentSection="Patient View" />
        <div className="container mx-auto p-6">
          <div className="text-center py-12">
            <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-xl font-semibold mb-2">Patient Not Found</h2>
            <p className="text-muted-foreground mb-4">The requested patient could not be found.</p>
            <Button onClick={() => navigate('/clinician-dashboard')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <ClinicianHeader userName={getUserDisplayName()} currentSection="Patient View" />
      
      <div className="container mx-auto p-4 lg:p-6">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/clinician-dashboard')}
            className="shrink-0"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-foreground">Patient Consultation</h1>
            <Badge className={getRiskColor(patient.riskLevel)}>
              {patient.riskLevel.toUpperCase()} RISK
            </Badge>
          </div>
          
          <div className="ml-auto flex gap-2">
            <Button variant="outline" size="sm">
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Patient Header Card */}
        <Card className="mb-6 bg-card border-border/50">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Patient Info */}
              <div className="flex items-start gap-4 flex-1">
                <Avatar className="h-16 w-16 shrink-0">
                  <AvatarFallback className="text-lg font-semibold bg-primary/10 text-primary">
                    {getInitials(patient.name)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                    <h2 className="text-2xl font-bold text-foreground">{patient.name}</h2>
                    <div className="flex flex-wrap gap-2">
                      {patient.diagnosis.map((dx, index) => (
                        <Badge key={index} variant="outline" className="text-sm">
                          {dx}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Age:</span>
                      <span className="font-medium">{calculateAge(patient.dateOfBirth)} years</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Email:</span>
                      <span className="font-medium truncate">{patient.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Phone:</span>
                      <span className="font-medium">{patient.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Location:</span>
                      <span className="font-medium">San Francisco, CA</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Key Metrics */}
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 lg:w-64 shrink-0">
                <div className="bg-muted/30 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-foreground mb-1">{patient.adherenceRate}%</div>
                  <div className="text-sm text-muted-foreground">Medication Adherence</div>
                  <Progress value={patient.adherenceRate} className="h-2 mt-2" />
                </div>
                <div className="bg-muted/30 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-foreground mb-1">
                    {Math.floor((new Date().getTime() - new Date(patient.lastVisit).getTime()) / (1000 * 60 * 60 * 24))}
                  </div>
                  <div className="text-sm text-muted-foreground">Days Since Last Visit</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 lg:grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="medications">Medications</TabsTrigger>
            <TabsTrigger value="assessments">Assessments</TabsTrigger>
            <TabsTrigger value="visits">Visit History</TabsTrigger>
            <TabsTrigger value="tests">Test Results</TabsTrigger>
            <TabsTrigger value="care-plan">Care Plan</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Current Status */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    Current Status & Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-1">
                          Medication Review Due
                        </h4>
                        <p className="text-sm text-yellow-700 dark:text-yellow-400">
                          Blood levels should be checked within the next week. Last check was 2 weeks ago.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-muted/30 rounded-lg p-4">
                      <h4 className="font-semibold text-foreground mb-2">Recent Vitals</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Blood Pressure:</span>
                          <span className="font-medium">{patient.recentVitals.bloodPressure}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Heart Rate:</span>
                          <span className="font-medium">{patient.recentVitals.heartRate} bpm</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Weight:</span>
                          <span className="font-medium">{patient.recentVitals.weight}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-muted/30 rounded-lg p-4">
                      <h4 className="font-semibold text-foreground mb-2">Emergency Contact</h4>
                      <div className="space-y-1 text-sm">
                        <div className="font-medium">{patient.emergencyContact.name}</div>
                        <div className="text-muted-foreground">{patient.emergencyContact.relationship}</div>
                        <div className="font-medium">{patient.emergencyContact.phone}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Visit Note
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Appointment
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <TestTube className="h-4 w-4 mr-2" />
                    Order Lab Tests
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Pill className="h-4 w-4 mr-2" />
                    Adjust Medications
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            {/* Clinical Notes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Clinical Notes
                  </span>
                  {!isEditingNotes ? (
                    <Button variant="outline" size="sm" onClick={() => setIsEditingNotes(true)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Notes
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => setIsEditingNotes(false)}>
                        Cancel
                      </Button>
                      <Button size="sm" onClick={handleSaveNotes}>
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                    </div>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isEditingNotes ? (
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Enter clinical notes..."
                    className="min-h-32"
                  />
                ) : (
                  <div className="bg-muted/30 rounded-lg p-4">
                    <p className="text-foreground whitespace-pre-wrap">
                      {patient.notes || 'No clinical notes available.'}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Medications Tab */}
          <TabsContent value="medications" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {patient.currentMedications.map((med) => (
                <Card key={med.id} className="bg-card border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="text-lg">{med.name}</span>
                      <Badge variant="outline" className="text-sm">
                        {med.adherence}% adherence
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Dosage:</span>
                        <div className="font-medium">{med.dosage}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Frequency:</span>
                        <div className="font-medium">{med.frequency}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Last Taken:</span>
                        <div className="font-medium">{med.lastTaken}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Side Effects:</span>
                        <div className="font-medium">
                          {med.sideEffects.length > 0 ? med.sideEffects.join(', ') : 'None reported'}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Adherence Rate</span>
                        <span className="font-medium">{med.adherence}%</span>
                      </div>
                      <Progress value={med.adherence} className="h-2" />
                    </div>
                    
                    {med.bloodLevel && (
                      <div className="bg-muted/30 rounded-lg p-3">
                        <h4 className="font-medium text-sm mb-2">Blood Level</h4>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Current: {med.bloodLevel.current} {med.bloodLevel.unit}</span>
                          <span>Target: {med.bloodLevel.target} {med.bloodLevel.unit}</span>
                        </div>
                        <Progress 
                          value={(med.bloodLevel.current / med.bloodLevel.target) * 100} 
                          className="h-2" 
                        />
                      </div>
                    )}
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="h-4 w-4 mr-2" />
                        Adjust Dose
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <TestTube className="h-4 w-4 mr-2" />
                        Check Levels
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Assessments Tab */}
          <TabsContent value="assessments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    Clinical Assessments & Scales
                  </span>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    New Assessment
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {patient.clinicalScales.map((scale) => (
                    <div key={scale.id} className="bg-muted/30 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-foreground">{scale.type}</h4>
                          <p className="text-sm text-muted-foreground">
                            Completed on {formatDate(scale.date)}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-foreground">
                            {scale.score}/{scale.maxScore}
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {scale.trend === 'stable' && <Activity className="h-3 w-3 mr-1" />}
                            {scale.trend === 'improving' && <TrendingUp className="h-3 w-3 mr-1" />}
                            {scale.trend === 'worsening' && <TrendingDown className="h-3 w-3 mr-1" />}
                            {scale.trend}
                          </Badge>
                        </div>
                      </div>
                      <Progress value={(scale.score / scale.maxScore) * 100} className="h-2 mb-3" />
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          <Calendar className="h-4 w-4 mr-2" />
                          Schedule Follow-up
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Visit History Tab */}
          <TabsContent value="visits" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Stethoscope className="h-5 w-5 text-primary" />
                  Visit History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {patient.visitHistory.map((visit) => (
                    <div key={visit.id} className="border border-border/50 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-foreground">{visit.type}</h4>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(visit.date)} • {visit.duration} • {visit.provider}
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-2" />
                          View Full Note
                        </Button>
                      </div>
                      <div className="bg-muted/30 rounded p-3">
                        <p className="text-sm text-foreground">{visit.notes}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Test Results Tab */}
          <TabsContent value="tests" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <TestTube className="h-5 w-5 text-primary" />
                    Test Results & Imaging
                  </span>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Order New Test
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {patient.testResults.map((test) => (
                    <div key={test.id} className="border border-border/50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-foreground">{test.type}</h4>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(test.date)}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant={test.status === 'Normal' ? 'default' : 'destructive'}
                            className={test.status === 'Normal' ? 'bg-green-600' : ''}
                          >
                            {test.status === 'Normal' && <CheckCircle className="h-3 w-3 mr-1" />}
                            {test.status !== 'Normal' && <AlertTriangle className="h-3 w-3 mr-1" />}
                            {test.status}
                          </Badge>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>
                      <div className="bg-muted/30 rounded p-3">
                        <p className="text-sm text-foreground">{test.notes}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Care Plan Tab */}
          <TabsContent value="care-plan" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Treatment Goals
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {patient.carePlan.goals.map((goal, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                        <span className="text-sm text-foreground">{goal}</span>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Goal
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    Current Interventions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {patient.carePlan.interventions.map((intervention, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                        <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                        <span className="text-sm text-foreground">{intervention}</span>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Intervention
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Care Plan Review
                  </span>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Update Plan
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">Next Review Date:</span>
                    <span className="text-sm text-muted-foreground">
                      {formatDate(patient.carePlan.nextReview)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Comprehensive care plan review scheduled to assess progress on treatment goals 
                    and adjust interventions as needed.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

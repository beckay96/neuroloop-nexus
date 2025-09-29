import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Pill, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  Activity,
  Target,
  Zap,
  Heart
} from 'lucide-react';

interface MedicationDose {
  time: string;
  taken: boolean;
  late: boolean;
  skipped: boolean;
  sideEffects?: string[];
}

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  indication: string;
  adherenceRate: number;
  effectivenessScore: number;
  sideEffectSeverity: 'none' | 'mild' | 'moderate' | 'severe';
  lastTaken: string;
  nextDue: string;
  recentDoses: MedicationDose[];
  interactions: string[];
  bloodLevels?: {
    current: number;
    target: number;
    unit: string;
    lastChecked: string;
  };
}

interface PatientMedication {
  id: string;
  patientName: string;
  patientId: string;
  condition: string;
  overallAdherence: number;
  medications: Medication[];
  recentChanges: string[];
  alerts: {
    type: 'missed' | 'interaction' | 'level' | 'side_effect';
    message: string;
    severity: 'low' | 'medium' | 'high';
    timestamp: string;
  }[];
}

interface MedicationManagementProps {
  showAll?: boolean;
  maxItems?: number;
}

export default function MedicationManagement({ showAll = false, maxItems = 3 }: MedicationManagementProps) {
  const navigate = useNavigate();
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);

  // Mock data for medication management
  const patientMedications: PatientMedication[] = [
    {
      id: '1',
      patientName: 'Michael Chen',
      patientId: 'P002',
      condition: "Parkinson's Disease",
      overallAdherence: 72,
      medications: [
        {
          id: 'med1',
          name: 'Levodopa/Carbidopa',
          dosage: '25/100mg',
          frequency: '3x daily',
          indication: 'Motor symptoms',
          adherenceRate: 68,
          effectivenessScore: 85,
          sideEffectSeverity: 'mild',
          lastTaken: '36 hours ago',
          nextDue: 'Overdue by 12 hours',
          recentDoses: [
            { time: '08:00', taken: false, late: false, skipped: true },
            { time: '14:00', taken: false, late: false, skipped: true },
            { time: '20:00', taken: true, late: true, skipped: false, sideEffects: ['Nausea'] }
          ],
          interactions: ['Avoid high-protein meals'],
          bloodLevels: {
            current: 2.1,
            target: 3.5,
            unit: 'mg/L',
            lastChecked: '2024-01-10'
          }
        },
        {
          id: 'med2',
          name: 'Ropinirole',
          dosage: '2mg',
          frequency: '2x daily',
          indication: 'Dopamine agonist',
          adherenceRate: 85,
          effectivenessScore: 70,
          sideEffectSeverity: 'moderate',
          lastTaken: '8 hours ago',
          nextDue: 'In 4 hours',
          recentDoses: [
            { time: '08:00', taken: true, late: false, skipped: false },
            { time: '20:00', taken: true, late: true, skipped: false, sideEffects: ['Drowsiness', 'Impulse control'] }
          ],
          interactions: ['Monitor for impulse control disorders']
        }
      ],
      recentChanges: ['Increased Levodopa dose', 'Added Ropinirole'],
      alerts: [
        {
          type: 'missed',
          message: 'Missed 2 consecutive Levodopa doses',
          severity: 'high',
          timestamp: '2 hours ago'
        },
        {
          type: 'side_effect',
          message: 'Patient reported increased impulse control issues',
          severity: 'medium',
          timestamp: '1 day ago'
        }
      ]
    },
    {
      id: '2',
      patientName: 'Sarah Johnson',
      patientId: 'P001',
      condition: 'Temporal Lobe Epilepsy',
      overallAdherence: 87,
      medications: [
        {
          id: 'med3',
          name: 'Levetiracetam',
          dosage: '500mg',
          frequency: '2x daily',
          indication: 'Seizure prevention',
          adherenceRate: 91,
          effectivenessScore: 75,
          sideEffectSeverity: 'mild',
          lastTaken: '4 hours ago',
          nextDue: 'In 8 hours',
          recentDoses: [
            { time: '08:00', taken: true, late: false, skipped: false },
            { time: '20:00', taken: true, late: false, skipped: false }
          ],
          interactions: [],
          bloodLevels: {
            current: 28,
            target: 35,
            unit: 'μg/mL',
            lastChecked: '2024-01-12'
          }
        },
        {
          id: 'med4',
          name: 'Lamotrigine',
          dosage: '200mg',
          frequency: '2x daily',
          indication: 'Mood stabilization',
          adherenceRate: 83,
          effectivenessScore: 80,
          sideEffectSeverity: 'none',
          lastTaken: '4 hours ago',
          nextDue: 'In 8 hours',
          recentDoses: [
            { time: '08:00', taken: true, late: false, skipped: false },
            { time: '20:00', taken: true, late: false, skipped: false }
          ],
          interactions: ['Monitor for rash']
        }
      ],
      recentChanges: ['Increased Lamotrigine dose'],
      alerts: [
        {
          type: 'level',
          message: 'Levetiracetam level below target range',
          severity: 'medium',
          timestamp: '3 days ago'
        }
      ]
    },
    {
      id: '3',
      patientName: 'Emily Rodriguez',
      patientId: 'P003',
      condition: 'Essential Tremor',
      overallAdherence: 95,
      medications: [
        {
          id: 'med5',
          name: 'Propranolol',
          dosage: '40mg',
          frequency: '2x daily',
          indication: 'Tremor control',
          adherenceRate: 96,
          effectivenessScore: 88,
          sideEffectSeverity: 'mild',
          lastTaken: '2 hours ago',
          nextDue: 'In 10 hours',
          recentDoses: [
            { time: '08:00', taken: true, late: false, skipped: false },
            { time: '20:00', taken: true, late: false, skipped: false }
          ],
          interactions: ['Monitor blood pressure', 'Avoid abrupt discontinuation']
        }
      ],
      recentChanges: ['Stable regimen'],
      alerts: []
    }
  ];

  const getAdherenceColor = (rate: number) => {
    if (rate >= 90) return 'text-green-600 dark:text-green-400';
    if (rate >= 75) return 'text-yellow-600 dark:text-yellow-400';
    if (rate >= 60) return 'text-orange-600 dark:text-orange-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'none': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800';
      case 'mild': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800';
      case 'moderate': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 border-orange-200 dark:border-orange-800';
      case 'severe': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'border-l-blue-500 bg-blue-50 dark:bg-blue-950/30 dark:border-l-blue-400';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-950/30 dark:border-l-yellow-400';
      case 'high': return 'border-l-red-500 bg-red-50 dark:bg-red-950/30 dark:border-l-red-400';
      default: return 'border-l-muted-foreground bg-muted/30';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'missed': return <Clock className="h-4 w-4" />;
      case 'interaction': return <AlertTriangle className="h-4 w-4" />;
      case 'level': return <Activity className="h-4 w-4" />;
      case 'side_effect': return <Heart className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const displayPatients = showAll ? patientMedications : patientMedications.slice(0, maxItems);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Pill className="h-5 w-5 text-primary" />
            Medication Management
          </span>
          {!showAll && patientMedications.length > maxItems && (
            <Button variant="outline" size="sm" className="text-xs">
              View All ({patientMedications.length})
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayPatients.map((patient) => (
            <Card key={patient.id} className="border border-border/50 hover:shadow-md hover:border-border transition-all duration-200 bg-card">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                      <button 
                        onClick={() => navigate(`/patient/${patient.patientId}`)}
                        className="font-semibold text-base text-primary hover:text-primary/80 hover:underline transition-colors text-left"
                      >
                        {patient.patientName}
                      </button>
                      <Badge variant="outline" className={`${getAdherenceColor(patient.overallAdherence)} font-medium`}>
                        {patient.overallAdherence}% adherence
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium">{patient.condition}</span> • {patient.medications.length} medications
                    </div>
                  </div>
                  
                  <div className="text-right sm:text-center shrink-0">
                    <div className="text-2xl font-bold text-foreground">
                      {patient.alerts.length}
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">
                      Active Alerts
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <Progress 
                    value={patient.overallAdherence} 
                    className="h-2"
                  />
                </div>

                {/* Alerts */}
                {patient.alerts.length > 0 && (
                  <div className="mb-6">
                    <h5 className="font-semibold text-sm text-foreground mb-3">Active Alerts</h5>
                    <div className="space-y-3">
                      {patient.alerts.map((alert, index) => (
                        <div key={index} className={`p-3 border-l-4 rounded-lg ${getAlertColor(alert.severity)}`}>
                          <div className="flex items-start gap-3">
                            <div className="shrink-0 mt-0.5">
                              {getAlertIcon(alert.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-foreground mb-1">{alert.message}</p>
                              <p className="text-xs text-muted-foreground">{alert.timestamp}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedPatient === patient.id ? (
                  <div className="space-y-4 mt-4 pt-4 border-t border-border">
                    <h5 className="font-semibold text-sm text-foreground mb-3">Medication Details</h5>
                    <div className="space-y-4">
                      {patient.medications.map((med) => (
                        <div key={med.id} className="bg-muted/30 rounded-lg p-4 space-y-3">
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <h6 className="font-semibold text-base text-foreground mb-1">{med.name}</h6>
                              <p className="text-sm text-muted-foreground">
                                <span className="font-medium">{med.dosage}</span> • {med.frequency} • {med.indication}
                              </p>
                            </div>
                            <Badge variant="outline" className={`${getSeverityColor(med.sideEffectSeverity)} text-xs shrink-0`}>
                              {med.sideEffectSeverity} side effects
                            </Badge>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <p className="font-medium text-sm text-foreground mb-1">Adherence: {med.adherenceRate}%</p>
                              <Progress value={med.adherenceRate} className="h-2" />
                            </div>
                            <div>
                              <p className="font-medium text-sm text-foreground mb-1">Effectiveness: {med.effectivenessScore}%</p>
                              <Progress value={med.effectivenessScore} className="h-2" />
                            </div>
                          </div>

                          {med.bloodLevels && (
                            <div className="bg-muted/50 rounded p-3">
                              <p className="font-medium text-sm text-foreground mb-1">
                                Blood Level: {med.bloodLevels.current} {med.bloodLevels.unit}
                              </p>
                              <p className="text-sm text-muted-foreground mb-2">
                                Target: {med.bloodLevels.target} {med.bloodLevels.unit} • 
                                Last checked: {med.bloodLevels.lastChecked}
                              </p>
                              <Progress 
                                value={(med.bloodLevels.current / med.bloodLevels.target) * 100} 
                                className="h-2" 
                              />
                            </div>
                          )}

                          <div>
                            <p className="font-medium text-sm text-foreground mb-2">Recent Doses</p>
                            <div className="flex flex-wrap gap-2">
                              {med.recentDoses.map((dose, idx) => (
                                <div key={idx} className="flex items-center gap-2 bg-muted/50 rounded px-2 py-1">
                                  <span className="text-sm font-medium">{dose.time}</span>
                                  {dose.taken ? (
                                    <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                                  ) : dose.skipped ? (
                                    <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
                                  ) : (
                                    <Clock className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>

                          {med.interactions.length > 0 && (
                            <div>
                              <p className="font-medium text-sm text-foreground mb-2">Interactions & Notes</p>
                              <div className="flex flex-wrap gap-2">
                                {med.interactions.map((interaction, idx) => (
                                  <Badge key={idx} variant="outline" className="text-sm">
                                    {interaction}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 mt-4">
                      <Button variant="outline" size="sm" className="text-sm">
                        <Target className="h-4 w-4 mr-2" />
                        Adjust Regimen
                      </Button>
                      <Button variant="outline" size="sm" className="text-sm">
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule Review
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mt-3">
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium">Recent changes:</span> {patient.recentChanges.join(', ')}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-sm hover:bg-muted"
                      onClick={() => setSelectedPatient(patient.id)}
                    >
                      View Details
                    </Button>
                  </div>
                )}
                
                {selectedPatient === patient.id && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-sm mt-2 hover:bg-muted"
                    onClick={() => setSelectedPatient(null)}
                  >
                    Hide Details
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

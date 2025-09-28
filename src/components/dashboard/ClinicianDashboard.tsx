import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, AlertTriangle, UserCheck, Calendar, TrendingUp, TrendingDown, Filter, Search, Download, Plus, Activity, Brain, Stethoscope, FileText, BarChart3 } from "lucide-react";
import ClinicianHeader from "@/components/navigation/ClinicianHeader";
import PatternsIdentified from "@/components/patterns/PatternsIdentified";

// Comprehensive mock data for demonstration
const patientAlerts = [{
  id: '1',
  patientName: 'Sarah Johnson',
  patientId: 'P001',
  age: 34,
  condition: 'Temporal Lobe Epilepsy',
  severity: 'critical',
  message: 'Seizure cluster detected - 3 generalized tonic-clonic seizures in 24 hours',
  timestamp: '2 hours ago',
  action: 'Emergency contact required',
  lastSeizure: '2 hours ago',
  medicationAdherence: 87,
  recentEvents: ['Seizure (Tonic-Clonic)', 'Missed PM medication', 'Aura reported']
}, {
  id: '2',
  patientName: 'Michael Chen',
  patientId: 'P002',
  age: 68,
  condition: "Parkinson's Disease",
  severity: 'moderate',
  message: 'Missed levodopa doses for 2 consecutive days, tremor worsening',
  timestamp: '4 hours ago',
  action: 'Schedule urgent medication review',
  lastMedication: '36 hours ago',
  medicationAdherence: 72,
  recentEvents: ['Missed medication', 'Increased tremor', 'Freezing episode']
}, {
  id: '3',
  patientName: 'Emily Rodriguez',
  patientId: 'P003',
  age: 45,
  condition: 'Essential Tremor',
  severity: 'low',
  message: 'Tremor intensity increasing progressively over past week',
  timestamp: '1 day ago',
  action: 'Monitor and consider dose adjustment',
  lastActivity: '6 hours ago',
  medicationAdherence: 95,
  recentEvents: ['Tremor worsening', 'Sleep disturbance', 'Stress reported']
}, {
  id: '4',
  patientName: 'Lisa Parker',
  patientId: 'P004',
  age: 29,
  condition: 'Juvenile Myoclonic Epilepsy',
  severity: 'moderate',
  message: 'Breakthrough myoclonic jerks reported, possible stress trigger',
  timestamp: '6 hours ago',
  action: 'Review stress management and medication timing',
  lastSeizure: '8 hours ago',
  medicationAdherence: 91,
  recentEvents: ['Myoclonic jerks', 'Work stress', 'Sleep deprivation']
}, {
  id: '5',
  patientName: 'Robert Kim',
  patientId: 'P005',
  age: 72,
  condition: "Parkinson's Disease",
  severity: 'critical',
  message: 'Fall reported with injury, possible medication timing issue',
  timestamp: '30 minutes ago',
  action: 'Immediate assessment required',
  lastActivity: '30 minutes ago',
  medicationAdherence: 89,
  recentEvents: ['Fall with injury', 'Off period prolonged', 'Balance issues']
}];
const recentPatients = [{
  id: 'P001',
  name: 'Sarah Johnson',
  age: 34,
  condition: 'Temporal Lobe Epilepsy',
  diagnosisDate: '2019-03-15',
  lastActivity: '2 hours ago',
  status: 'critical',
  avatar: 'SJ',
  nextAppt: '2024-01-15',
  primaryMedication: 'Levetiracetam 1000mg BID',
  adherence: 87,
  recentVitals: {
    seizureFreq: '3/week',
    lastSeizure: '2 hours ago'
  }
}, {
  id: 'P002',
  name: 'Michael Chen',
  age: 68,
  condition: "Parkinson's Disease",
  diagnosisDate: '2020-07-22',
  lastActivity: '4 hours ago',
  status: 'moderate',
  avatar: 'MC',
  nextAppt: '2024-01-18',
  primaryMedication: 'Levodopa/Carbidopa 25/100mg TID',
  adherence: 72,
  recentVitals: {
    tremor: 'Moderate',
    lastDose: '36 hours ago'
  }
}, {
  id: 'P003',
  name: 'Emily Rodriguez',
  age: 45,
  condition: 'Essential Tremor',
  diagnosisDate: '2018-11-10',
  lastActivity: '6 hours ago',
  status: 'stable',
  avatar: 'ER',
  nextAppt: '2024-02-01',
  primaryMedication: 'Propranolol 80mg BID',
  adherence: 95,
  recentVitals: {
    tremor: 'Mild-Moderate',
    mood: 'Good'
  }
}, {
  id: 'P004',
  name: 'David Thompson',
  age: 22,
  condition: 'Juvenile Myoclonic Epilepsy',
  diagnosisDate: '2021-05-03',
  lastActivity: '1 day ago',
  status: 'stable',
  avatar: 'DT',
  nextAppt: '2024-01-25',
  primaryMedication: 'Valproate 500mg BID',
  adherence: 98,
  recentVitals: {
    seizureFreq: '0/month',
    mood: 'Excellent'
  }
}, {
  id: 'P005',
  name: 'Lisa Parker',
  age: 29,
  condition: 'Focal Epilepsy',
  diagnosisDate: '2022-01-12',
  lastActivity: '8 hours ago',
  status: 'moderate',
  avatar: 'LP',
  nextAppt: '2024-01-20',
  primaryMedication: 'Lamotrigine 200mg BID',
  adherence: 91,
  recentVitals: {
    seizureFreq: '1/week',
    auras: 'Frequent'
  }
}, {
  id: 'P006',
  name: 'Robert Kim',
  age: 72,
  condition: "Parkinson's Disease",
  diagnosisDate: '2019-09-18',
  lastActivity: '30 minutes ago',
  status: 'critical',
  avatar: 'RK',
  nextAppt: '2024-01-16',
  primaryMedication: 'Levodopa/Carbidopa 25/250mg QID',
  adherence: 89,
  recentVitals: {
    tremor: 'Severe',
    falls: '2 this week'
  }
}, {
  id: 'P007',
  name: 'Maria Santos',
  age: 56,
  condition: 'Multiple Sclerosis',
  diagnosisDate: '2017-04-25',
  lastActivity: '12 hours ago',
  status: 'stable',
  avatar: 'MS',
  nextAppt: '2024-02-05',
  primaryMedication: 'Glatiramer Acetate 20mg daily',
  adherence: 94,
  recentVitals: {
    mobility: 'Good',
    fatigue: 'Mild'
  }
}, {
  id: 'P008',
  name: 'James Wilson',
  age: 41,
  condition: 'Huntington Disease',
  diagnosisDate: '2023-02-14',
  lastActivity: '2 days ago',
  status: 'stable',
  avatar: 'JW',
  nextAppt: '2024-01-30',
  primaryMedication: 'Tetrabenazine 25mg TID',
  adherence: 92,
  recentVitals: {
    chorea: 'Mild',
    cognition: 'Stable',
    mood: 'Fair'
  }
}];
const cohortStats = [{
  label: "Total Patients",
  value: "287",
  change: "+12 this week",
  trend: "up",
  icon: Users,
  color: "text-primary"
}, {
  label: "Active Alerts",
  value: "5",
  change: "-2 from yesterday",
  trend: "down",
  icon: AlertTriangle,
  color: "text-warning"
}, {
  label: "Average Adherence",
  value: "89.7%",
  change: "+3.2% this month",
  trend: "up",
  icon: UserCheck,
  color: "text-status-stable"
}, {
  label: "Upcoming Appointments",
  value: "34",
  change: "Next 7 days",
  trend: "neutral",
  icon: Calendar,
  color: "text-secondary"
}];
const analyticsData = {
  seizureReduction: [{
    month: 'Jul',
    reduction: -8.2
  }, {
    month: 'Aug',
    reduction: -12.1
  }, {
    month: 'Sep',
    reduction: -15.3
  }, {
    month: 'Oct',
    reduction: -18.7
  }, {
    month: 'Nov',
    reduction: -22.1
  }, {
    month: 'Dec',
    reduction: -25.4
  }],
  adherenceRates: [{
    condition: 'Epilepsy',
    rate: 87.3,
    patients: 156
  }, {
    condition: 'Parkinson\'s',
    rate: 91.2,
    patients: 89
  }, {
    condition: 'Essential Tremor',
    rate: 94.1,
    patients: 42
  }],
  qualityMetrics: {
    patientSatisfaction: 94.2,
    treatmentEffectiveness: 88.7,
    sideEffectReports: 12.3,
    emergencyVisits: -34.2
  }
};
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
const getStatusColor = (status: string) => {
  switch (status) {
    case 'stable':
      return 'bg-status-stable/20 text-status-stable';
    case 'monitoring':
      return 'bg-status-monitoring/20 text-status-monitoring';
    case 'moderate':
      return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200';
    case 'critical':
      return 'bg-status-critical/20 text-status-critical';
    default:
      return 'bg-muted text-muted-foreground';
  }
};
export default function ClinicianDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("overview");
  const filteredPatients = recentPatients.filter(patient => patient.name.toLowerCase().includes(searchTerm.toLowerCase()) || patient.condition.toLowerCase().includes(searchTerm.toLowerCase()));
  return <div className="min-h-screen bg-background">
      <ClinicianHeader userName="Dr. Smith" currentSection="Dashboard" />

      <div className="container mx-auto p-4 lg:p-6">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <TabsList className="flex w-full max-w-2xl items-center ">
              <TabsTrigger value="overview" className="text-xs sm:text-sm">Overview</TabsTrigger>
              <TabsTrigger value="patterns" className="text-xs sm:text-sm">Patterns</TabsTrigger>
              <TabsTrigger value="patients" className="text-xs sm:text-sm">Patients</TabsTrigger>
              <TabsTrigger value="analytics" className="text-xs sm:text-sm">Analytics</TabsTrigger>
              <TabsTrigger value="research" className="text-xs sm:text-sm">Research</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center gap-2 mt-16 justify-center ">
              <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                <Download className="h-4 w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Export Data</span>
                <span className="sm:hidden">Export</span>
              </Button>
              <Button variant="hero" size="sm" className="text-xs sm:text-sm">
                <Plus className="h-4 w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Add Patient</span>
                <span className="sm:hidden">Add</span>
              </Button>
            </div>
          </div>

          <TabsContent value="overview" className="space-y-8">
            {/* Key Metrics */}
            <section>
              <h2 className="text-lg font-semibold mb-4">Key Metrics</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {cohortStats.map((stat, index) => {
                const IconComponent = stat.icon;
                return <Card key={index} className="medical-card p-6">
                      <div className="flex items-center justify-between mb-3">
                        <IconComponent className={`h-5 w-5 ${stat.color}`} />
                        {stat.trend !== "neutral" && <div className="flex items-center">
                            {stat.trend === "up" ? <TrendingUp className="h-4 w-4 text-status-stable" /> : <TrendingDown className="h-4 w-4 text-status-critical" />}
                          </div>}
                      </div>
                      <div className="space-y-1">
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                        <p className="text-xs text-muted-foreground">{stat.change}</p>
                      </div>
                    </Card>;
              })}
              </div>
            </section>

            {/* Critical Patient Alerts */}
            <section>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                Critical Patient Alerts
              </h2>
              <div className="space-y-3">
                {patientAlerts.slice(0, 3).map(alert => <Card key={alert.id} className="medical-card p-4 border-l-4 border-l-warning">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant={getSeverityColor(alert.severity)}>
                            {alert.severity.toUpperCase()}
                          </Badge>
                          <h4 className="font-semibold">{alert.patientName}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">{alert.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{alert.timestamp}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Review
                      </Button>
                    </div>
                  </Card>)}
              </div>
            </section>

            {/* Recent Patient Activity */}
            <section>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Recent Patient Activity
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {recentPatients.slice(0, 4).map(patient => <Card key={patient.id} className="medical-card p-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                      <Avatar className="shrink-0">
                        <AvatarFallback>{patient.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                          <h4 className="font-semibold truncate">{patient.name}</h4>
                          <Badge variant="outline" className={`${getStatusColor(patient.status)} shrink-0`}>
                            {patient.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2 truncate">{patient.condition}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          <div>
                            <p><strong>Adherence:</strong> {patient.adherence}%</p>
                            {patient.recentVitals?.seizureFreq && <p><strong>Seizures:</strong> {patient.recentVitals.seizureFreq}</p>}
                            {patient.recentVitals?.lastSeizure && <p><strong>Last:</strong> {patient.recentVitals.lastSeizure}</p>}
                            {patient.recentVitals?.tremor && <p><strong>Tremor:</strong> {patient.recentVitals.tremor}</p>}
                            {patient.recentVitals?.mood && <p><strong>Mood:</strong> {patient.recentVitals.mood}</p>}
                          </div>
                          <div>
                            <p><strong>Next Appt:</strong></p>
                            <p className="truncate">{patient.nextAppt}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>)}
              </div>
            </section>
          </TabsContent>

          <TabsContent value="patterns" className="space-y-6">
            <PatternsIdentified />
          </TabsContent>

          <TabsContent value="patients" className="space-y-6">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search patients..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-9" />
              </div>
              <Button variant="outline" size="sm" className="shrink-0">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>

            {/* Patient List */}
            <div className="grid gap-4">
              {filteredPatients.map(patient => <Card key={patient.id} className="medical-card p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10 sm:h-12 sm:w-12 shrink-0">
                        <AvatarFallback>{patient.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-base sm:text-lg truncate">{patient.name}</h3>
                        <p className="text-muted-foreground text-sm truncate">{patient.condition}</p>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          Age: {patient.age} • Diagnosed: {new Date(patient.diagnosisDate).getFullYear()}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className={`${getStatusColor(patient.status)} shrink-0`}>
                      {patient.status}
                    </Badge>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                    <div className="min-w-0">
                      <p className="text-muted-foreground text-xs">Primary Medication</p>
                      <p className="font-medium text-xs sm:text-sm truncate" title={patient.primaryMedication}>
                        {patient.primaryMedication}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Adherence</p>
                      <p className="font-medium text-xs sm:text-sm">{patient.adherence}%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Last Activity</p>
                      <p className="font-medium text-xs sm:text-sm">{patient.lastActivity}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Next Appointment</p>
                      <p className="font-medium text-xs sm:text-sm">{patient.nextAppt}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex flex-col sm:flex-row gap-2">
                    <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                      <FileText className="h-4 w-4 mr-1 sm:mr-2" />
                      <span className="hidden sm:inline">View Records</span>
                      <span className="sm:hidden">Records</span>
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                      <Stethoscope className="h-4 w-4 mr-1 sm:mr-2" />
                      <span className="hidden sm:inline">Schedule Visit</span>
                      <span className="sm:hidden">Schedule</span>
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                      <BarChart3 className="h-4 w-4 mr-1 sm:mr-2" />
                      <span className="hidden sm:inline">Analytics</span>
                      <span className="sm:hidden">Charts</span>
                    </Button>
                  </div>
                </Card>)}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="medical-card p-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Advanced Analytics
                </CardTitle>
                <CardDescription>
                  Comprehensive insights into patient outcomes and treatment effectiveness
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  <Card className="p-3 sm:p-4">
                    <h4 className="font-semibold mb-2 text-sm sm:text-base">Treatment Effectiveness</h4>
                    <p className="text-xl sm:text-2xl font-bold text-status-stable">88.7%</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">+5.2% from last quarter</p>
                  </Card>
                  <Card className="p-3 sm:p-4">
                    <h4 className="font-semibold mb-2 text-sm sm:text-base">Patient Satisfaction</h4>
                    <p className="text-xl sm:text-2xl font-bold text-primary">94.2%</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">+2.1% from last quarter</p>
                  </Card>
                  <Card className="p-3 sm:p-4">
                    <h4 className="font-semibold mb-2 text-sm sm:text-base">Emergency Visits</h4>
                    <p className="text-xl sm:text-2xl font-bold text-status-critical">-34.2%</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">Reduction from baseline</p>
                  </Card>
                </div>
                <div className="mt-6">
                  <Button>
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Detailed Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="research" className="space-y-6">
            <Card className="medical-card p-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  Research Collaboration
                </CardTitle>
                <CardDescription>
                  Contribute to advancing neurological research and patient care
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Active Studies</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Participate in groundbreaking research to improve treatment outcomes
                    </p>
                    <Button variant="outline" className="w-full sm:w-auto">
                      <Plus className="h-4 w-4 mr-2" />
                      Join Research Portal
                    </Button>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Data Contribution</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Export anonymized data for research purposes
                    </p>
                    <Button variant="outline" className="w-full sm:w-auto">
                      <Download className="h-4 w-4 mr-2" />
                      Export Research Data
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>;
}
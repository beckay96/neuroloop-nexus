import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Activity,
  AlertTriangle,
  Clock,
  Users,
  TrendingUp,
  TrendingDown,
  Search,
  Filter,
  Download,
  MessageSquare,
  Calendar,
  FileText,
  Settings,
  Bell,
  UserCheck,
  Zap,
  Heart,
  Brain
} from "lucide-react";

// Mock data for demonstration
const patientAlerts = [
  {
    id: 1,
    patientName: "Sarah Johnson",
    condition: "Epilepsy",
    alert: "Seizure cluster detected - 3 events in 24hrs",
    severity: "high",
    time: "2 hours ago",
    lastActivity: "Active now"
  },
  {
    id: 2,
    patientName: "Michael Chen",
    condition: "Parkinson's",
    alert: "Medication adherence dropped to 67%",
    severity: "medium",
    time: "4 hours ago",
    lastActivity: "12 hours ago"
  },
  {
    id: 3,
    patientName: "Emma Rodriguez",
    condition: "Essential Tremor",
    alert: "Reported severe tremor episode",
    severity: "medium",
    time: "6 hours ago",
    lastActivity: "2 hours ago"
  }
];

const recentPatients = [
  {
    id: 1,
    name: "David Park",
    condition: "Epilepsy",
    status: "stable",
    adherence: 94,
    lastSeizure: "12 days ago",
    nextAppointment: "Tomorrow 2:00 PM"
  },
  {
    id: 2,
    name: "Lisa Thompson",
    condition: "Parkinson's",
    status: "monitoring",
    adherence: 87,
    motorScore: "Improving",
    nextAppointment: "Friday 10:00 AM"
  },
  {
    id: 3,
    name: "James Wilson",
    condition: "Movement Disorder",
    status: "stable",
    adherence: 92,
    symptoms: "Mild",
    nextAppointment: "Next week"
  }
];

const cohortStats = [
  {
    label: "Total Patients",
    value: "127",
    change: "+3 this week",
    trend: "up",
    icon: Users,
    color: "text-primary"
  },
  {
    label: "Active Alerts",
    value: "8",
    change: "-2 from yesterday",
    trend: "down",
    icon: AlertTriangle,
    color: "text-warning"
  },
  {
    label: "Average Adherence",
    value: "89%",
    change: "+2% this month",
    trend: "up",
    icon: UserCheck,
    color: "text-status-stable"
  },
  {
    label: "Upcoming Appointments",
    value: "23",
    change: "Next 7 days",
    trend: "neutral",
    icon: Calendar,
    color: "text-secondary"
  }
];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'high': return 'destructive';
    case 'medium': return 'secondary';
    case 'low': return 'outline';
    default: return 'outline';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'stable': return 'bg-status-stable/20 text-status-stable';
    case 'monitoring': return 'bg-status-monitoring/20 text-status-monitoring';
    case 'critical': return 'bg-status-critical/20 text-status-critical';
    default: return 'bg-muted text-muted-foreground';
  }
};

export default function ClinicianDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Brain className="h-6 w-6 text-primary" />
                Clinical Dashboard
              </h1>
              <p className="text-muted-foreground">Monitor and manage your neurological patients</p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="patients">Patients</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="research">Research</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Key Metrics */}
            <section>
              <h2 className="text-lg font-semibold mb-4">Key Metrics</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {cohortStats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <Card key={index} className="medical-card p-6">
                      <div className="flex items-center justify-between mb-3">
                        <IconComponent className={`h-5 w-5 ${stat.color}`} />
                        {stat.trend !== "neutral" && (
                          <div className="flex items-center">
                            {stat.trend === "up" ? (
                              <TrendingUp className="h-4 w-4 text-status-stable" />
                            ) : (
                              <TrendingDown className="h-4 w-4 text-status-critical" />
                            )}
                          </div>
                        )}
                      </div>
                      <div>
                        <p className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</p>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </section>

            {/* Critical Alerts */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                  Critical Patient Alerts
                </h2>
                <Button variant="outline" size="sm">View All</Button>
              </div>
              
              <div className="space-y-3">
                {patientAlerts.map((alert) => (
                  <Card key={alert.id} className="medical-card p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold">{alert.patientName}</h4>
                          <Badge variant="outline" className="text-xs">{alert.condition}</Badge>
                          <Badge variant={getSeverityColor(alert.severity)} className="text-xs">
                            {alert.severity.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{alert.alert}</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          {alert.time} • Last active: {alert.lastActivity}
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* Recent Patient Activity */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Recent Patient Activity</h2>
                <Button variant="outline" size="sm">View All Patients</Button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {recentPatients.map((patient) => (
                  <Card key={patient.id} className="medical-card p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">{patient.name}</h4>
                      <Badge className={getStatusColor(patient.status)}>
                        {patient.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Condition:</span>
                        <span>{patient.condition}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Adherence:</span>
                        <span className={patient.adherence >= 85 ? 'text-status-stable' : 'text-warning'}>
                          {patient.adherence}%
                        </span>
                      </div>
                      {patient.lastSeizure && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Last seizure:</span>
                          <span>{patient.lastSeizure}</span>
                        </div>
                      )}
                      {patient.motorScore && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Motor score:</span>
                          <span>{patient.motorScore}</span>
                        </div>
                      )}
                      {patient.symptoms && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Symptoms:</span>
                          <span>{patient.symptoms}</span>
                        </div>
                      )}
                      <div className="pt-2 border-t">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3 mr-1" />
                          Next: {patient.nextAppointment}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          </TabsContent>

          <TabsContent value="patients" className="space-y-6">
            {/* Patient Search & Filters */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex gap-2 flex-1 max-w-md">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search patients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">Export List</Button>
                <Button variant="medical">Add Patient</Button>
              </div>
            </div>

            {/* Patient List */}
            <Card className="medical-card">
              <div className="p-6">
                <div className="space-y-4">
                  {[...recentPatients, ...patientAlerts.map(alert => ({
                    id: alert.id + 100,
                    name: alert.patientName,
                    condition: alert.condition,
                    status: alert.severity === 'high' ? 'critical' : 'monitoring',
                    adherence: Math.floor(Math.random() * 30) + 70,
                    nextAppointment: 'Scheduled',
                    symptoms: 'Varies'
                  }))].map((patient) => (
                    <div key={patient.id} className="flex items-center justify-between p-4 bg-accent rounded-lg hover:bg-accent/80 transition-colors cursor-pointer">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold">{patient.name}</h4>
                          <Badge variant="outline" className="text-xs">{patient.condition}</Badge>
                          <Badge className={getStatusColor(patient.status)}>
                            {patient.status}
                          </Badge>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground gap-4">
                          <span>Adherence: {patient.adherence}%</span>
                          <span>Next: {patient.nextAppointment}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Activity className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="medical-card p-8 text-center">
              <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Advanced Analytics</h3>
              <p className="text-muted-foreground mb-6">
                Comprehensive cohort analysis, treatment outcomes, and predictive insights for neurological conditions.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-primary/10 rounded-lg">
                  <h4 className="font-semibold text-primary">Seizure Patterns</h4>
                  <p className="text-sm text-muted-foreground">Temporal analysis & triggers</p>
                </div>
                <div className="p-4 bg-secondary/10 rounded-lg">
                  <h4 className="font-semibold text-secondary">Med Effectiveness</h4>
                  <p className="text-sm text-muted-foreground">Response & adherence tracking</p>
                </div>
                <div className="p-4 bg-accent rounded-lg">
                  <h4 className="font-semibold">Risk Stratification</h4>
                  <p className="text-sm text-muted-foreground">Predictive modeling</p>
                </div>
              </div>
              <Button variant="medical">View Detailed Analytics</Button>
            </Card>
          </TabsContent>

          <TabsContent value="research" className="space-y-6">
            <Card className="medical-card p-8 text-center">
              <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Research Collaboration</h3>
              <p className="text-muted-foreground mb-6">
                Access anonymized cohort data, collaborate on studies, and contribute to advancing neurological research.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="text-left">
                  <h4 className="font-semibold mb-2">Active Studies</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Catamenial Epilepsy Patterns (23 patients)</li>
                    <li>• Parkinson's Motor Fluctuations (41 patients)</li>
                    <li>• Anti-seizure Drug Effectiveness (67 patients)</li>
                  </ul>
                </div>
                <div className="text-left">
                  <h4 className="font-semibold mb-2">Data Contributions</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• 12,450 seizure events logged</li>
                    <li>• 89% medication adherence data</li>
                    <li>• 156 research-grade datasets</li>
                  </ul>
                </div>
              </div>
              <div className="flex gap-4 justify-center">
                <Button variant="medical">View Research Portal</Button>
                <Button variant="outline">Export Study Data</Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
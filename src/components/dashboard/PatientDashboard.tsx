import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import DailyTrackingModal from "@/components/tracking/DailyTrackingModal";
import SeizureLogModal from "@/components/tracking/SeizureLogModal";
import MedicationModal from "@/components/tracking/MedicationModal";
import VideoLogModal from "@/components/tracking/VideoLogModal";
import TemperatureModal from "@/components/tracking/TemperatureModal";
import SymptomsModal from "@/components/tracking/SymptomsModal";
import Navbar from "@/components/ui/navbar";
import { Activity, Heart, Pill, Calendar, TrendingUp, AlertCircle, Plus, Settings, Bell, Brain, Zap, Award, Target, Clock, FileText, Users, BarChart3, Shield, Camera, Thermometer, MessageSquare, Phone } from "lucide-react";
const quickActions = [{
  id: "daily-tracking",
  title: "Daily Check-in",
  icon: Heart,
  color: "text-primary",
  bg: "bg-primary/10",
  description: "Log mood, energy & symptoms"
}, {
  id: "log-seizure",
  title: "Log Seizure",
  icon: Zap,
  color: "text-status-critical",
  bg: "bg-status-critical/10",
  description: "Record seizure details"
}, {
  id: "medication",
  title: "Medications",
  icon: Pill,
  color: "text-secondary",
  bg: "bg-secondary/10",
  description: "Track & manage meds"
}, {
  id: "video-log",
  title: "Video Log",
  icon: Camera,
  color: "text-warning",
  bg: "bg-warning/10",
  description: "Record symptoms visually"
}, {
  id: "basal-temp",
  title: "Temperature",
  icon: Thermometer,
  color: "text-status-monitoring",
  bg: "bg-status-monitoring/10",
  description: "Basal body temperature"
}, {
  id: "symptom-log",
  title: "Symptoms",
  icon: Activity,
  color: "text-accent",
  bg: "bg-accent/30",
  description: "Detailed symptom tracking"
}];
const healthStats = [{
  label: "Days Seizure Free",
  value: "12",
  target: "30",
  trend: "up",
  color: "text-status-stable",
  progress: 40,
  icon: Shield
}, {
  label: "Medication Adherence",
  value: "94%",
  target: "95%",
  trend: "up",
  color: "text-status-stable",
  progress: 94,
  icon: Pill
}, {
  label: "Energy Level (Avg)",
  value: "7.2",
  target: "8.0",
  trend: "up",
  color: "text-primary",
  progress: 72,
  icon: Zap
}, {
  label: "Sleep Quality",
  value: "6.8",
  target: "8.0",
  trend: "down",
  color: "text-warning",
  progress: 68,
  icon: Heart
}];
const achievements = [{
  id: 1,
  title: "7-Day Streak",
  description: "Completed daily tracking for 7 days",
  icon: Award,
  earned: true,
  points: 50
}, {
  id: 2,
  title: "Medication Master",
  description: "100% adherence for 2 weeks",
  icon: Target,
  earned: true,
  points: 75
}, {
  id: 3,
  title: "Data Contributor",
  description: "Shared data for research",
  icon: Brain,
  earned: false,
  points: 100
}];
const upcomingReminders = [{
  id: 1,
  type: "medication",
  title: "Evening Levetiracetam",
  subtitle: "500mg dose due in 30 minutes",
  time: "8:00 PM",
  urgent: true
}, {
  id: 2,
  type: "tracking",
  title: "Daily Mood Check",
  subtitle: "Rate your energy and mood today",
  time: "Before bed",
  urgent: false
}, {
  id: 3,
  type: "appointment",
  title: "Dr. Smith Follow-up",
  subtitle: "Neurology appointment",
  time: "Tomorrow 2:00 PM",
  urgent: false
}, {
  id: 4,
  type: "temperature",
  title: "Basal Body Temperature",
  subtitle: "Morning temperature reading",
  time: "Tomorrow 7:00 AM",
  urgent: false
}];
interface PatientDashboardProps {
  userName?: string;
}
export default function PatientDashboard({
  userName = "Patient"
}: PatientDashboardProps) {
  const [showDailyTracking, setShowDailyTracking] = useState(false);
  const [showSeizureLog, setShowSeizureLog] = useState(false);
  const [showMedicationLog, setShowMedicationLog] = useState(false);
  const [showVideoLog, setShowVideoLog] = useState(false);
  const [showTemperatureLog, setShowTemperatureLog] = useState(false);
  const [showSymptomsLog, setShowSymptomsLog] = useState(false);
  const handleQuickAction = (actionId: string) => {
    switch (actionId) {
      case "daily-tracking":
        setShowDailyTracking(true);
        break;
      case "log-seizure":
        setShowSeizureLog(true);
        break;
      case "medication":
        setShowMedicationLog(true);
        break;
      case "video-log":
        setShowVideoLog(true);
        break;
      case "basal-temp":
        setShowTemperatureLog(true);
        break;
      case "symptom-log":
        setShowSymptomsLog(true);
        break;
      default:
        console.log("Action not implemented:", actionId);
    }
  };
  const handleModalComplete = (data: any, type: string) => {
    console.log(`${type} data:`, data);
    // Here you would save the data to your database
    // For now, just close the modal
  };
  return <>
      <DailyTrackingModal isOpen={showDailyTracking} onClose={() => setShowDailyTracking(false)} onComplete={data => {
      handleModalComplete(data, "daily-tracking");
      setShowDailyTracking(false);
    }} />
      
      <SeizureLogModal isOpen={showSeizureLog} onClose={() => setShowSeizureLog(false)} onComplete={data => {
      handleModalComplete(data, "seizure-log");
      setShowSeizureLog(false);
    }} />
      
      <MedicationModal isOpen={showMedicationLog} onClose={() => setShowMedicationLog(false)} onComplete={data => {
      handleModalComplete(data, "medication-log");
      setShowMedicationLog(false);
    }} />
      
      <VideoLogModal isOpen={showVideoLog} onClose={() => setShowVideoLog(false)} onComplete={data => {
      handleModalComplete(data, "video-log");
      setShowVideoLog(false);
    }} />
      
      <TemperatureModal isOpen={showTemperatureLog} onClose={() => setShowTemperatureLog(false)} onComplete={data => {
      handleModalComplete(data, "temperature-log");
      setShowTemperatureLog(false);
    }} />
      
      <SymptomsModal isOpen={showSymptomsLog} onClose={() => setShowSymptomsLog(false)} onComplete={data => {
      handleModalComplete(data, "symptoms-log");
      setShowSymptomsLog(false);
    }} />
      
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <Navbar userName={userName} userType="patient" />
      
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {userName}</h1>
            <p className="text-muted-foreground">Let's track your health today</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Health Status Alert */}
        <section className="mb-8">
          <Card className="medical-card p-6 bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-hero rounded-xl flex items-center justify-center">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Great job, {userName}! 🎉</h3>
                  <p className="text-muted-foreground">You're maintaining excellent tracking consistency</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-status-stable/20 text-status-stable">
                12-day streak
              </Badge>
            </div>
          </Card>
        </section>

        {/* Quick Actions */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickActions.map(action => {
              const IconComponent = action.icon;
              return <Card key={action.id} className="medical-card p-4 cursor-pointer group hover:shadow-glow-primary transition-all" onClick={() => handleQuickAction(action.id)}>
                  <div className={`w-12 h-12 ${action.bg} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                    <IconComponent className={`h-6 w-6 ${action.color}`} />
                  </div>
                  <h3 className="font-medium text-sm text-center mb-1">{action.title}</h3>
                  <p className="text-xs text-muted-foreground text-center">{action.description}</p>
                </Card>;
            })}
          </div>
        </section>

        {/* Health Metrics */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-secondary" />
            Health Metrics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {healthStats.map((stat, index) => {
              const IconComponent = stat.icon;
              return <Card key={index} className="medical-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <IconComponent className={`h-5 w-5 ${stat.color}`} />
                    {stat.trend !== "neutral" && <TrendingUp className={`h-4 w-4 ${stat.trend === "up" ? "text-status-stable" : "text-status-critical"} ${stat.trend === "down" ? "rotate-180" : ""}`} />}
                  </div>
                  <div className="mb-3">
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <div className="flex items-baseline gap-2">
                      <span className={`text-2xl font-bold ${stat.color}`}>{stat.value}</span>
                      <span className="text-sm text-muted-foreground">/ {stat.target}</span>
                    </div>
                  </div>
                  <Progress value={stat.progress} className="h-2" />
                </Card>;
            })}
          </div>
        </section>

        {/* Achievements */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Award className="h-5 w-5 text-warning" />
              Recent Achievements
            </h2>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {achievements.map(achievement => {
              const IconComponent = achievement.icon;
              return <Card key={achievement.id} className={`medical-card p-4 ${achievement.earned ? 'bg-gradient-to-br from-warning/5 to-primary/5 border-warning/20' : 'opacity-60'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${achievement.earned ? 'bg-warning/20' : 'bg-muted'} rounded-lg flex items-center justify-center`}>
                      <IconComponent className={`h-5 w-5 ${achievement.earned ? 'text-warning' : 'text-muted-foreground'}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{achievement.title}</h4>
                      <p className="text-xs text-muted-foreground">{achievement.description}</p>
                    </div>
                    <Badge variant={achievement.earned ? "default" : "outline"} className="text-xs">
                      +{achievement.points}
                    </Badge>
                  </div>
                </Card>;
            })}
          </div>
        </section>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Activity & Insights */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recent Activity */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Recent Activity
                </h2>
                <Button variant="ghost" size="sm">View All</Button>
              </div>
              
              <Card className="medical-card p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-status-stable/10 rounded-lg border border-status-stable/20">
                    <div className="w-10 h-10 bg-status-stable/20 rounded-lg flex items-center justify-center">
                      <Pill className="h-5 w-5 text-status-stable" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Medication taken successfully</p>
                      <p className="text-sm text-muted-foreground">Levetiracetam 500mg • 2 hours ago</p>
                    </div>
                    <Badge variant="outline" className="bg-status-stable/10 text-status-stable border-status-stable/30">
                      On time
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-primary/10 rounded-lg border border-primary/20">
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Heart className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Daily check-in completed</p>
                      <p className="text-sm text-muted-foreground">Mood: Good, Energy: 8/10 • This morning</p>
                    </div>
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                      +25 pts
                    </Badge>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-secondary/10 rounded-lg border border-secondary/20">
                    <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
                      <Activity className="h-5 w-5 text-secondary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Symptom logged</p>
                      <p className="text-sm text-muted-foreground">Mild fatigue • Yesterday, 3:30 PM</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <FileText className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </section>

            {/* Health Insights */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-secondary" />
                  Health Insights
                </h2>
                <Button variant="outline" size="sm">View Details</Button>
              </div>
              
              <Card className="medical-card p-6 bg-gradient-subtle">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">💡 Pattern Detected</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Your seizure-free days have increased by 40% since optimizing your sleep schedule.
                    </p>
                    <Button variant="medical" size="sm">Learn More</Button>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">📊 Weekly Summary</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Excellent medication adherence and consistent mood tracking this week.
                    </p>
                    <Button variant="outline" size="sm">View Report</Button>
                  </div>
                </div>
              </Card>
            </section>
          </div>

          {/* Right Column - Reminders & Quick Info */}
          <div className="space-y-6">
            {/* Urgent Reminders */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Bell className="h-5 w-5 text-warning" />
                  Reminders
                </h2>
                <Button variant="ghost" size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-3">
                {upcomingReminders.map(reminder => <Card key={reminder.id} className={`medical-card p-4 ${reminder.urgent ? 'border-warning/40 bg-warning/5' : ''}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${reminder.urgent ? 'bg-warning/20' : 'bg-muted'}`}>
                        {reminder.type === 'medication' && <Pill className={`h-4 w-4 ${reminder.urgent ? 'text-warning' : 'text-muted-foreground'}`} />}
                        {reminder.type === 'tracking' && <Heart className={`h-4 w-4 ${reminder.urgent ? 'text-warning' : 'text-muted-foreground'}`} />}
                        {reminder.type === 'appointment' && <Calendar className={`h-4 w-4 ${reminder.urgent ? 'text-warning' : 'text-muted-foreground'}`} />}
                        {reminder.type === 'temperature' && <Thermometer className={`h-4 w-4 ${reminder.urgent ? 'text-warning' : 'text-muted-foreground'}`} />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{reminder.title}</p>
                        <p className="text-xs text-muted-foreground">{reminder.subtitle}</p>
                        <p className="text-xs text-primary mt-1">{reminder.time}</p>
                      </div>
                      {reminder.urgent && <Badge variant="outline" className="bg-warning/10 text-warning border-warning/30">
                          Due soon
                        </Badge>}
                    </div>
                  </Card>)}
              </div>
            </section>

            {/* Care Team */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Users className="h-5 w-5 text-secondary" />
                  Care Team
                </h2>
              </div>
              
              <Card className="medical-card p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-secondary/20 rounded-lg flex items-center justify-center">
                      <Brain className="h-4 w-4 text-secondary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">Dr. Sarah Smith</p>
                      <p className="text-xs text-muted-foreground">Neurologist</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Heart className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">Mom (Emergency)</p>
                      <p className="text-xs text-muted-foreground">Primary caregiver</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Phone className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </section>
          </div>
        </div>

        {/* Research Contribution */}
        <section className="mt-8">
          <Card className="medical-card p-6 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 border border-primary/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-hero rounded-xl flex items-center justify-center">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Contributing to Research 🧬</h3>
                  <p className="text-muted-foreground text-sm">
                    Your anonymized data is helping advance epilepsy research. Thank you for making a difference!
                  </p>
                </div>
              </div>
              <div className="flex-col gap-2">
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  View Impact
                </Button>
                <Button variant="medical" size="sm">
                  Research Portal
                </Button>
              </div>
            </div>
          </Card>
        </section>
      </main>
    </div>
    </>;
}
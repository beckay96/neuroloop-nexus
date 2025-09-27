import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Activity, 
  Heart, 
  Pill, 
  Calendar,
  TrendingUp,
  AlertCircle,
  Plus,
  Settings,
  Bell
} from "lucide-react";

const quickActions = [
  { 
    id: "log-symptom",
    title: "Log Symptom", 
    icon: Activity, 
    color: "text-primary",
    bg: "bg-primary/10"
  },
  { 
    id: "log-seizure",
    title: "Log Seizure", 
    icon: AlertCircle, 
    color: "text-status-critical",
    bg: "bg-status-critical/10"
  },
  { 
    id: "medication",
    title: "Medications", 
    icon: Pill, 
    color: "text-secondary",
    bg: "bg-secondary/10"
  },
  { 
    id: "calendar",
    title: "Calendar", 
    icon: Calendar, 
    color: "text-status-stable",
    bg: "bg-status-stable/10"
  }
];

const recentStats = [
  { label: "Days Seizure Free", value: "12", trend: "up", color: "text-status-stable" },
  { label: "Medication Adherence", value: "94%", trend: "up", color: "text-status-stable" },
  { label: "Symptoms This Week", value: "3", trend: "down", color: "text-primary" },
  { label: "Next Appointment", value: "5 days", trend: "neutral", color: "text-muted-foreground" }
];

interface PatientDashboardProps {
  userName?: string;
}

export default function PatientDashboard({ userName = "Patient" }: PatientDashboardProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Welcome back, {userName}</h1>
              <p className="text-muted-foreground">Let's track your health today</p>
            </div>
            
            <div className="flex items-center space-x-3">
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
        {/* Quick Actions */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action) => {
              const IconComponent = action.icon;
              return (
                <Card key={action.id} className="medical-card p-6 cursor-pointer group text-center">
                  <div className={`w-12 h-12 ${action.bg} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:shadow-glow-primary transition-all`}>
                    <IconComponent className={`h-6 w-6 ${action.color}`} />
                  </div>
                  <h3 className="font-medium text-sm">{action.title}</h3>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Stats Overview */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Health Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {recentStats.map((stat, index) => (
              <Card key={index} className="medical-card p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
                  {stat.trend !== "neutral" && (
                    <TrendingUp 
                      className={`h-4 w-4 ${
                        stat.trend === "up" ? "text-status-stable" : "text-status-critical"
                      } ${stat.trend === "down" ? "rotate-180" : ""}`} 
                    />
                  )}
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Recent Activity & Reminders */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Recent Activity</h2>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            
            <Card className="medical-card">
              <div className="p-6 space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-accent rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-status-stable"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Medication taken - Levetiracetam</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-accent rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Mild tremor logged</p>
                    <p className="text-xs text-muted-foreground">Yesterday, 3:30 PM</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-accent rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-status-monitoring"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Sleep quality tracked - Good</p>
                    <p className="text-xs text-muted-foreground">Yesterday, 8:00 AM</p>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* Reminders & Alerts */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Reminders</h2>
              <Button variant="ghost" size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            <Card className="medical-card">
              <div className="p-6 space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-warning/10 border border-warning/20 rounded-lg">
                  <Pill className="h-5 w-5 text-warning" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Evening medication due</p>
                    <p className="text-xs text-muted-foreground">Levetiracetam 500mg in 30 minutes</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-primary/10 border border-primary/20 rounded-lg">
                  <Heart className="h-5 w-5 text-primary" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Daily symptom check</p>
                    <p className="text-xs text-muted-foreground">Rate your energy and mood today</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-secondary/10 border border-secondary/20 rounded-lg">
                  <Calendar className="h-5 w-5 text-secondary" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Upcoming appointment</p>
                    <p className="text-xs text-muted-foreground">Dr. Smith - Monday, 2:00 PM</p>
                  </div>
                </div>
              </div>
            </Card>
          </section>
        </div>

        {/* Achievement/Motivation Section */}
        <section className="mt-8">
          <Card className="medical-card p-6 bg-gradient-subtle">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">🎉 Great Progress!</h3>
                <p className="text-muted-foreground">
                  You've maintained excellent medication adherence this week. 
                  Consistency like this can significantly improve your health outcomes.
                </p>
              </div>
              <Button variant="hero" size="sm">
                View Insights
              </Button>
            </div>
          </Card>
        </section>
      </main>
    </div>
  );
}
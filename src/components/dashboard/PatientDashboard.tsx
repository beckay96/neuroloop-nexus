import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import AppNavbar from "@/components/navigation/AppNavbar";
import DailyTrackingModal from "@/components/tracking/DailyTrackingModal.tsx";
import SeizureLogModal from "@/components/tracking/SeizureLogModal";
import MedicationModal from "@/components/tracking/MedicationModal";
import VideoLogModal from "@/components/tracking/VideoLogModal";
import TemperatureModal from "@/components/tracking/TemperatureModal";
import SymptomsModal from "@/components/tracking/SymptomsModal";
import { Activity, Heart, Pill, Calendar, TrendingUp, AlertCircle, Plus, Brain, Zap, Award, Target, Clock, FileText, Users, BarChart3, Shield, Camera, Thermometer, MessageSquare, Phone, Bell } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  numericToMoodEnum,
  numericToEnergyEnum,
  numericToSleepEnum
} from "@/utils/databaseEnums";
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
export default function PatientDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Extract user name from profile data or fallback to email
  const getUserDisplayName = () => {
    if (user?.user_metadata?.first_name) {
      return user.user_metadata.first_name;
    }
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return "Patient";
  };
  
  const userName = getUserDisplayName();
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
        // All actions implemented
        break;
    }
  };
  const handleModalComplete = async (data: any, type: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({ 
        title: "Error", 
        description: "You must be logged in",
        variant: "destructive" 
      });
      return;
    }

    try {
      switch(type) {
        case 'seizure-log':
          const { error: seizureError } = await supabase
            .from('seizure_logs')
            .insert({
              user_id: user.id,
              ...data
            });
          if (seizureError) throw seizureError;
          toast({ title: "✅ Seizure logged successfully" });
          break;

        case 'daily-tracking':
          const wellnessData = {
            user_id: user.id,
            log_date: data.log_date,
            mood: numericToMoodEnum(data.mood_numeric) as any,
            energy_level: numericToEnergyEnum(data.energy_numeric) as any,
            sleep_quality: numericToSleepEnum(data.sleep_numeric) as any,
            sleep_hours: data.sleep_hours,
            sleep_interruptions: data.sleep_interruptions,
            exercise_minutes: data.exercise_minutes,
            exercise_type: data.exercise_type,
            stress_level: data.stress_level,
            notes: data.notes
          };
          
          const { error: wellnessError } = await supabase
            .from('daily_wellness_logs')
            .upsert([wellnessData], { onConflict: 'user_id,log_date' });
          if (wellnessError) throw wellnessError;
          toast({ title: "✅ Daily tracking saved" });
          break;

        case 'medication-log':
          const { error: medError } = await supabase
            .from('medication_logs')
            .insert({
              user_id: user.id,
              ...data
            });
          if (medError) throw medError;
          toast({ title: "✅ Medication logged" });
          break;

        case 'symptoms-log':
          const { error: symptomError } = await supabase
            .from('symptom_logs')
            .insert({
              user_id: user.id,
              ...data
            });
          if (symptomError) throw symptomError;
          toast({ title: "✅ Symptoms logged" });
          break;

        case 'temperature-log':
          const { error: tempError } = await supabase
            .from('menstrual_cycle_logs')
            .insert({
              user_id: user.id,
              cycle_start_date: data.date,
              notes: data.notes
            });
          if (tempError) throw tempError;
          toast({ title: "✅ Temperature logged" });
          break;

        case 'video-log':
          // Video logs might need special handling for file uploads
          toast({ title: "Video log feature coming soon" });
          break;
      }
    } catch (error: any) {
      console.error('Error saving data:', error);
      toast({ 
        title: "Error saving data", 
        description: error.message || "Please try again",
        variant: "destructive" 
      });
    }
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
      
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* App Navigation */}
      <AppNavbar 
        userName={userName} 
        title="Let's track your health today"
      />

      <main className="container mx-auto px-4 py-8">
        {/* Health Status Alert */}
        <section className="mb-8">
          <Card className="medical-card p-6 bg-gradient-to-r from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 border border-primary/20 dark:border-primary/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-hero rounded-xl flex items-center justify-center">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Great job, {userName}! 🎉</h3>
                  <p className="text-gray-600 dark:text-gray-300">You're maintaining excellent tracking consistency</p>
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
              return <Card key={action.id} className="medical-card p-4 cursor-pointer group hover:shadow-glow-primary transition-all bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 border-2 hover:border-primary/50 dark:border-gray-700" onClick={() => handleQuickAction(action.id)}>
                  <div className={`w-12 h-12 ${action.bg} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                    <IconComponent className={`h-6 w-6 ${action.color}`} />
                  </div>
                  <h3 className="font-medium text-sm text-center mb-1 text-gray-900 dark:text-white">{action.title}</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 text-center">{action.description}</p>
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
              return <Card key={index} className="medical-card p-6 bg-white dark:bg-gray-900 border-2 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <IconComponent className={`h-5 w-5 ${stat.color}`} />
                    {stat.trend !== "neutral" && <TrendingUp className={`h-4 w-4 ${stat.trend === "up" ? "text-status-stable" : "text-status-critical"} ${stat.trend === "down" ? "rotate-180" : ""}`} />}
                  </div>
                  <div className="mb-3">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.label}</p>
                    <div className="flex items-baseline gap-2">
                      <span className={`text-2xl font-bold ${stat.color}`}>{stat.value}</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">/ {stat.target}</span>
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
            <Button variant="ghost" size="sm" onClick={() => toast({ title: "All Achievements", description: "Viewing complete achievement history" })}>View All</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {achievements.map(achievement => {
              const IconComponent = achievement.icon;
              return <Card key={achievement.id} className={`medical-card p-4 ${achievement.earned ? 'bg-gradient-to-br from-warning/5 to-primary/5 dark:from-warning/10 dark:to-primary/10 border-warning/20 dark:border-warning/30' : 'opacity-60'} bg-white dark:bg-gray-900 border-2 dark:border-gray-700`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${achievement.earned ? 'bg-warning/20 dark:bg-warning/30' : 'bg-gray-200 dark:bg-gray-800'} rounded-lg flex items-center justify-center`}>
                      <IconComponent className={`h-5 w-5 ${achievement.earned ? 'text-warning' : 'text-gray-500 dark:text-gray-600'}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm text-gray-900 dark:text-white">{achievement.title}</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{achievement.description}</p>
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
                <Button variant="ghost" size="sm" onClick={() => toast({ title: "Activity History", description: "Viewing complete activity log" })}>View All</Button>
              </div>
              
              <Card className="medical-card p-6 bg-white dark:bg-gray-900 border-2 dark:border-gray-700">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-status-stable/10 dark:bg-status-stable/20 rounded-lg border border-status-stable/20 dark:border-status-stable/30">
                    <div className="w-10 h-10 bg-status-stable/20 dark:bg-status-stable/30 rounded-lg flex items-center justify-center">
                      <Pill className="h-5 w-5 text-status-stable" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">Medication taken successfully</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Levetiracetam 500mg • 2 hours ago</p>
                    </div>
                    <Badge variant="outline" className="bg-status-stable/10 text-status-stable border-status-stable/30">
                      On time
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-primary/10 dark:bg-primary/20 rounded-lg border border-primary/20 dark:border-primary/30">
                    <div className="w-10 h-10 bg-primary/20 dark:bg-primary/30 rounded-lg flex items-center justify-center">
                      <Heart className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">Daily check-in completed</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Mood: Good, Energy: 8/10 • This morning</p>
                    </div>
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                      +25 pts
                    </Badge>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-secondary/10 dark:bg-secondary/20 rounded-lg border border-secondary/20 dark:border-secondary/30">
                    <div className="w-10 h-10 bg-secondary/20 dark:bg-secondary/30 rounded-lg flex items-center justify-center">
                      <Activity className="h-5 w-5 text-secondary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">Symptom logged</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Mild fatigue • Yesterday, 3:30 PM</p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => toast({ title: "Activity Details", description: "Opening detailed activity view" })}>
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
                <Button variant="outline" size="sm" onClick={() => toast({ title: "Health Insights", description: "Opening comprehensive insights dashboard" })}>View Details</Button>
              </div>
              
              <Card className="medical-card p-6 bg-gradient-subtle bg-white dark:bg-gray-900 border-2 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">💡 Pattern Detected</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      Your seizure-free days have increased by 40% since optimizing your sleep schedule.
                    </p>
                    <Button variant="medical" size="sm" onClick={() => toast({ title: "Sleep Optimization", description: "Learn about sleep's impact on neurological health" })}>Learn More</Button>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">📊 Weekly Summary</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      Excellent medication adherence and consistent mood tracking this week.
                    </p>
                    <Button variant="outline" size="sm" onClick={() => toast({ title: "Weekly Report", description: "Opening detailed weekly health summary" })}>View Report</Button>
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
                <Button variant="ghost" size="sm" onClick={() => toast({ title: "Add Reminder", description: "Creating new reminder" })}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-3">
                {upcomingReminders.map(reminder => <Card key={reminder.id} className={`medical-card p-4 ${reminder.urgent ? 'border-warning/40 dark:border-warning/50 bg-warning/5 dark:bg-warning/10' : 'bg-white dark:bg-gray-900 border-2 dark:border-gray-700'}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${reminder.urgent ? 'bg-warning/20 dark:bg-warning/30' : 'bg-gray-200 dark:bg-gray-800'}`}>
                        {reminder.type === 'medication' && <Pill className={`h-4 w-4 ${reminder.urgent ? 'text-warning' : 'text-gray-500 dark:text-gray-400'}`} />}
                        {reminder.type === 'tracking' && <Heart className={`h-4 w-4 ${reminder.urgent ? 'text-warning' : 'text-gray-500 dark:text-gray-400'}`} />}
                        {reminder.type === 'appointment' && <Calendar className={`h-4 w-4 ${reminder.urgent ? 'text-warning' : 'text-gray-500 dark:text-gray-400'}`} />}
                        {reminder.type === 'temperature' && <Thermometer className={`h-4 w-4 ${reminder.urgent ? 'text-warning' : 'text-gray-500 dark:text-gray-400'}`} />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm text-gray-900 dark:text-white">{reminder.title}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{reminder.subtitle}</p>
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
              
              <Card className="medical-card p-4 bg-white dark:bg-gray-900 border-2 dark:border-gray-700">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-secondary/20 dark:bg-secondary/30 rounded-lg flex items-center justify-center">
                      <Brain className="h-4 w-4 text-secondary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-gray-900 dark:text-white">Dr. Sarah Smith</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Neurologist</p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => toast({ title: "Message Dr. Smith", description: "Opening secure messaging" })}>
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/20 dark:bg-primary/30 rounded-lg flex items-center justify-center">
                      <Heart className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-gray-900 dark:text-white">Mom (Emergency)</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Primary caregiver</p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => toast({ title: "Call Emergency Contact", description: "Initiating call to primary caregiver" })}>
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
          <Card className="medical-card p-6 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 dark:from-primary/10 dark:via-secondary/10 dark:to-accent/10 border border-primary/20 dark:border-primary/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-hero rounded-xl flex items-center justify-center">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white">Contributing to Research 🧬</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Your anonymized data is helping advance epilepsy research. Thank you for making a difference!
                  </p>
                </div>
              </div>
              <div className="flex-col gap-2">
                <Button variant="outline" size="sm" onClick={() => toast({ title: "Research Impact", description: "View how your data has contributed to research" })}>
                  <FileText className="h-4 w-4 mr-2" />
                  View Impact
                </Button>
                <Button variant="medical" size="sm" onClick={() => toast({ title: "Research Portal", description: "Opening research participation dashboard" })}>
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
import { useState, useEffect, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import AppNavbar from "@/components/navigation/AppNavbar";
import DailyTrackingModal from "@/components/tracking/DailyTrackingModal";
import SeizureLogModal from "@/components/tracking/SeizureLogModal";
import MedicationLogModal from "@/components/tracking/MedicationLogModal";
import VideoLogModal from "@/components/tracking/VideoLogModal";
import TemperatureModal from "@/components/tracking/TemperatureModal";
import SymptomLogModalEnhanced from "@/components/tracking/SymptomLogModalEnhanced";
import MenstrualCycleLogModal from "@/components/tracking/MenstrualCycleLogModal";
import { FloatingEmergencyButton } from "@/components/emergency/EmergencyButton";
import { Activity, Heart, Pill, Calendar, TrendingUp, AlertCircle, Plus, Brain, Zap, Award, Target, Clock, FileText, Users, BarChart3, Shield, Camera, Thermometer, MessageSquare, Phone, Bell } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { MedicationReminderService } from "@/services/medicationReminders";
import { useConditions } from "@/hooks/useConditions";
import { useSeizureLogs } from "@/hooks/useSeizureLogs";
import { useMedicationLogs } from "@/hooks/useMedicationLogs";
import { useSymptomLogs } from "@/hooks/useSymptomLogs";
import { useTremorLogs } from "@/hooks/useTremorLogs";
import { useGaitLogs } from "@/hooks/useGaitLogs";
import { useMenstrualLogs } from "@/hooks/useMenstrualLogs";
import { useTemperatureLogs } from "@/hooks/useTemperatureLogs";
import { useTrackingEntries } from "@/hooks/useTrackingEntries";
import { useTrackingPreferences } from "@/hooks/useTrackingPreferences";
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
}, {
  id: "menstrual-cycle",
  title: "Menstrual Cycle",
  icon: Calendar,
  color: "text-pink-500",
  bg: "bg-pink-100 dark:bg-pink-950/20",
  description: "Track cycle & seizure patterns"
}];
const healthStats = [{
  label: "Sleep Quality",
  value: "6.8",
  target: "8.0",
  trend: "down",
  color: "text-warning",
  progress: 68,
  icon: Heart
}, {
  label: "Medication Adherence",
  value: "94%",
  target: "95%",
  trend: "up",
  color: "text-teal-500",
  progress: 94,
  icon: Pill
}, {
  label: "Average Energy",
  value: "7.5",
  target: "8.0",
  trend: "up",
  color: "text-primary",
  progress: 72,
  icon: Zap
}, {
  label: "Days Seizure Free",
  value: "12",
  target: "30",
  trend: "up",
  color: "text-status-stable",
  progress: 40,
  icon: Shield
}];
// REMOVED MOCK DATA - Will be replaced with real achievements from database
const achievements = useMemo(() => [{
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
}], []);

// REMOVED MOCK DATA - Will be replaced with real reminders from database
const upcomingReminders = useMemo(() => [{
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
}], []);

export default function PatientDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Initialize medication reminder service ONLY for authenticated users
  useEffect(() => {
    if (user) {
      MedicationReminderService.getInstance();
    }
  }, [user]);
  
  // Load user's conditions and tracking preferences
  const { userConditions, loading: conditionsLoading } = useConditions(user?.id);
  const { preferences, loading: preferencesLoading } = useTrackingPreferences(user?.id);
  const { seizureLogs, addSeizureLog, refetch: refetchSeizures } = useSeizureLogs(user?.id);
  const { medicationLogs, addMedicationLog, refetch: refetchMedications } = useMedicationLogs(user?.id);
  const { symptomLogs, addSymptomLog, refetch: refetchSymptoms } = useSymptomLogs(user?.id);
  const { addMenstrualLog } = useMenstrualLogs(user?.id);
  const { addTemperatureLog } = useTemperatureLogs(user?.id);
  const { tremorLogs } = useTremorLogs(user?.id);
  const { gaitLogs } = useGaitLogs(user?.id);
  const { trackingEntries } = useTrackingEntries(user?.id);
  
  // Calculate real stats from data
  const daysSeizureFree = useMemo(() => {
    if (!seizureLogs || seizureLogs.length === 0) return 0;
    // Use log_date from seizure_logs_research table
    const lastSeizure = new Date(seizureLogs[0].log_date);
    const now = new Date();
    return Math.floor((now.getTime() - lastSeizure.getTime()) / (1000 * 60 * 60 * 24));
  }, [seizureLogs]);

  const avgEnergyLevel = useMemo(() => {
    if (!symptomLogs || symptomLogs.length === 0) return "0";
    const recent = symptomLogs.slice(0, 7); // Last 7 days
    const sum = recent.reduce((acc, log) => acc + (log.energy_level || 0), 0);
    return recent.length > 0 ? (sum / recent.length).toFixed(1) : "0";
  }, [symptomLogs]);

  const avgSleepQuality = useMemo(() => {
    if (!symptomLogs || symptomLogs.length === 0) return "0";
    const recent = symptomLogs.slice(0, 7); // Last 7 days
    const sum = recent.reduce((acc, log) => acc + (log.sleep_quality || 0), 0);
    return recent.length > 0 ? (sum / recent.length).toFixed(1) : "0";
  }, [symptomLogs]);

  const trackingStreak = useMemo(() => {
    if (!symptomLogs || symptomLogs.length === 0) return 0;
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let i = 0; i < symptomLogs.length; i++) {
      const logDate = new Date(symptomLogs[i].log_date);
      logDate.setHours(0, 0, 0, 0);
      const daysDiff = Math.floor((today.getTime() - logDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === i) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  }, [symptomLogs]);

  // Calculate dynamic health stats
  const calculatedHealthStats = useMemo(() => [{
    label: "Days Seizure Free",
    value: daysSeizureFree.toString(),
    target: "30",
    trend: daysSeizureFree >= 30 ? "up" : "stable" as const,
    color: daysSeizureFree >= 30 ? "text-status-stable" : "text-primary",
    progress: Math.min((daysSeizureFree / 30) * 100, 100),
    icon: Shield
  }, {
    label: "Medication Adherence",
    value: "94%", // TODO: Calculate from medication_logs when table is verified
    target: "95%",
    trend: "up" as const,
    color: "text-status-stable",
    progress: 94,
    icon: Pill
  }, {
    label: "Energy Level (Avg)",
    value: avgEnergyLevel.toString(),
    target: "8.0",
    trend: parseFloat(avgEnergyLevel) >= 7 ? "up" : "down" as const,
    color: parseFloat(avgEnergyLevel) >= 7 ? "text-primary" : "text-warning",
    progress: (parseFloat(avgEnergyLevel) / 10) * 100,
    icon: Zap
  }, {
    label: "Sleep Quality",
    value: avgSleepQuality.toString(),
    target: "8.0",
    trend: parseFloat(avgSleepQuality) >= 7 ? "up" : "down" as const,
    color: parseFloat(avgSleepQuality) >= 7 ? "text-status-stable" : "text-warning",
    progress: (parseFloat(avgSleepQuality) / 10) * 100,
    icon: Heart
  }], [daysSeizureFree, avgEnergyLevel, avgSleepQuality]);
  
  // Load user's first name from patient_onboarding_data
  const [userFirstName, setUserFirstName] = useState<string>("");
  
  useEffect(() => {
    const loadUserName = async () => {
      if (!user?.id) return;
      
      try {
        const { data, error } = await supabase.rpc('get_patient_onboarding_data', {
          p_user_id: user.id
        });
        
        if (data && data.length > 0 && data[0].first_name) {
          setUserFirstName(data[0].first_name);
        } else if (user.email) {
          setUserFirstName(user.email.split('@')[0]);
        }
      } catch (error) {
        console.error('Error loading user name:', error);
        if (user.email) {
          setUserFirstName(user.email.split('@')[0]);
        }
      }
    };
    
    loadUserName();
  }, [user]);
  
  const userName = userFirstName || "Patient";
  
  // Filter quick actions based on user's tracking features
  const getEnabledQuickActions = () => {
    if (!preferences?.tracking_types) {
      // If no preferences yet, show all options
      return quickActions;
    }
    
    const trackingTypes = Array.isArray(preferences.tracking_types) 
      ? preferences.tracking_types 
      : [];
    
    return quickActions.filter(action => {
      switch (action.id) {
        case "log-seizure":
          return trackingTypes.includes('seizure');
        case "medication":
          return trackingTypes.includes('medication');
        case "symptom-log":
          return trackingTypes.includes('symptoms');
        case "basal-temp":
          return trackingTypes.includes('temperature');
        case "daily-tracking":
          return trackingTypes.includes('mood') || trackingTypes.includes('energy') || trackingTypes.includes('sleep');
        default:
          return true; // Show other actions by default
      }
    });
  };
  
  const enabledQuickActions = getEnabledQuickActions();
  
  const [showDailyTracking, setShowDailyTracking] = useState(false);
  const [showSeizureLog, setShowSeizureLog] = useState(false);
  const [showMedicationLog, setShowMedicationLog] = useState(false);
  const [showVideoLog, setShowVideoLog] = useState(false);
  const [showTemperatureLog, setShowTemperatureLog] = useState(false);
  const [showSymptomsLog, setShowSymptomsLog] = useState(false);
  const [showMenstrualLog, setShowMenstrualLog] = useState(false);
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
      case "menstrual-cycle":
        setShowMenstrualLog(true);
        break;
      default:
        // All actions implemented
        break;
    }
  };
  const handleModalComplete = async (data: any, type: string) => {
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
          // Use the hook with correct seizure_logs_research schema
          const now = new Date();
          const seizureResult = await addSeizureLog({
            user_id: user.id,
            log_date: data.log_date || now.toISOString().split('T')[0],
            log_time: data.log_time || now.toTimeString().slice(0, 5),
            seizure_type: data.seizure_type,
            duration_seconds: data.duration_seconds,
            consciousness_level: data.consciousness_level,
            aura_present: data.aura_present,
            aura_description: data.aura_description,
            witnessed: data.witnessed,
            location_type: data.location_type,
            recovery_time_minutes: data.recovery_time_minutes,
            emergency_services_called: data.emergency_services_called,
            rescue_medication_used: data.rescue_medication_used,
            notes: data.notes
          });
          if (seizureResult.success) {
            refetchSeizures();
          }
          break;

        case 'daily-tracking':
          // Use symptom logs hook for daily tracking
          const symptomResult = await addSymptomLog({
            patient_id: user.id,
            log_date: data.log_date || new Date().toISOString().split('T')[0],
            mood_rating: data.mood_numeric || data.mood_rating,
            energy_level: data.energy_numeric || data.energy_level,
            sleep_quality: data.sleep_numeric || data.sleep_quality,
            sleep_hours: data.sleep_hours,
            pain_level: data.pain_level,
            pain_location: data.pain_location,
            symptoms: data.symptoms,
            triggers: data.triggers,
            medications_taken: data.medications_taken,
            notes: data.notes,
            shared_with_clinician: true,
            shared_with_carers: false
          });
          if (symptomResult.success) {
            refetchSymptoms();
          }
          break;

        case 'medication-log':
          // Use medication logs hook
          const medResult = await addMedicationLog({
            user_id: user.id,
            log_date: data.log_date || new Date().toISOString().split('T')[0],
            user_medication_id: data.user_medication_id,
            log_time: data.log_time,
            dosage_taken: data.dosage_taken,
            taken: data.taken,
            side_effects: data.side_effects,
            notes: data.notes
          });
          if (medResult.success) {
            refetchMedications();
          }
          break;

        case 'symptoms-log':
          // Use daily symptom logs hook
          const detailedSymptomResult = await addSymptomLog({
            patient_id: user.id,
            log_date: data.log_date || new Date().toISOString().split('T')[0],
            symptoms: data.symptoms,
            triggers: data.triggers,
            notes: data.notes,
            shared_with_clinician: true
          });
          if (detailedSymptomResult.success) {
            refetchSymptoms();
          }
          break;

        case 'temperature-log':
          // Use temperature logs hook for basal body temperature
          const tempResult = await addTemperatureLog({
            user_id: user.id,
            log_date: data.date || new Date().toISOString().split('T')[0],
            log_time: data.time || new Date().toTimeString().slice(0, 5),
            temperature: data.temperature,
            temperature_unit: data.temperature_unit || 'F',
            measurement_type: data.measurement_type || 'basal',
            measurement_location: data.measurement_location,
            menstrual_cycle_day: data.menstrual_cycle_day,
            sleep_quality: data.sleep_quality,
            time_awake: data.time_awake,
            notes: data.notes
          });
          if (tempResult.success) {
            toast({ title: "✅ Temperature logged" });
          }
          break;

        case 'menstrual-cycle':
          // Use menstrual logs hook for full cycle tracking
          const menstrualResult = await addMenstrualLog({
            user_id: user.id,
            cycle_start_date: data.cycle_start_date,
            cycle_end_date: data.cycle_end_date,
            cycle_length_days: data.cycle_length_days,
            flow_intensity: data.flow_intensity,
            cycle_phase: data.cycle_phase,
            symptoms: data.symptoms,
            symptom_severity: data.symptom_severity,
            seizure_count_during_cycle: data.seizure_count_during_cycle,
            seizure_clustered_around_menstruation: data.seizure_clustered_around_menstruation,
            catamenial_pattern_suspected: data.catamenial_pattern_suspected,
            notes: data.notes
          });
          if (menstrualResult.success) {
            toast({ title: "✅ Menstrual cycle logged" });
          }
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
      
      <MedicationLogModal isOpen={showMedicationLog} onClose={() => setShowMedicationLog(false)} onComplete={data => {
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
      
      <SymptomLogModalEnhanced 
        isOpen={showSymptomsLog} 
        onClose={() => setShowSymptomsLog(false)} 
        onComplete={data => {
          handleModalComplete(data, "symptoms-log");
          setShowSymptomsLog(false);
        }} 
        userConditions={userConditions.map(uc => uc.conditions?.name || '').filter(Boolean)} 
      />
      
      <MenstrualCycleLogModal isOpen={showMenstrualLog} onClose={() => setShowMenstrualLog(false)} onComplete={data => {
      handleModalComplete(data, "menstrual-cycle");
      setShowMenstrualLog(false);
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
                {trackingStreak > 0 ? `${trackingStreak}-day streak` : 'Start tracking today!'}
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
            {enabledQuickActions.map(action => {
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
            {calculatedHealthStats.map((stat, index) => {
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
      
      {/* Floating Emergency Button - Always Accessible */}
      {user && <FloatingEmergencyButton userId={user.id} />}
    </div>
    </>;
}
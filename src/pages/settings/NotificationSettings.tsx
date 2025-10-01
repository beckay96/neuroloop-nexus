import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { 
  Bell, ArrowLeft, Pill, Calendar, AlertTriangle, 
  MessageSquare, Activity, Moon, Volume2, Smartphone
} from "lucide-react";

export default function NotificationSettings() {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [notificationSettings, setNotificationSettings] = useState({
    // Push Notifications
    pushEnabled: true,
    
    // Medication Reminders
    medicationReminders: true,
    medicationReminderTime: 15, // minutes before
    
    // Appointment Reminders
    appointmentReminders: true,
    appointmentReminderHours: 24,
    
    // Health Alerts
    criticalAlerts: true,
    patternAlerts: true,
    achievementNotifications: true,
    
    // Messages
    messageNotifications: true,
    directMessages: true,
    
    // Daily Check-ins
    dailyCheckInReminder: true,
    dailyCheckInTime: "20:00",
    
    // Quiet Hours
    quietHoursEnabled: false,
    quietHoursStart: "22:00",
    quietHoursEnd: "08:00",
    
    // Notification Sound
    soundEnabled: true,
    vibrationEnabled: true,
  });

  const handleToggle = (key: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({ ...prev, [key]: !prev[key] }));
    toast({
      title: "Setting Updated",
      description: "Your notification preference has been saved",
    });
  };

  const handleSaveChanges = () => {
    toast({
      title: "Settings Saved",
      description: "All notification settings have been updated",
    });
  };

  return (
    <div className="container max-w-4xl mx-auto p-6">
      <Card className="medical-card">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Settings
              </CardTitle>
              <CardDescription>
                Customize how and when you receive alerts and reminders
              </CardDescription>
            </div>
            {notificationSettings.pushEnabled && (
              <Badge variant="secondary">Enabled</Badge>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Master Switch */}
          <div className="p-4 rounded-lg border-2 bg-primary/5">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5 flex-1">
                <Label className="text-base font-semibold">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Master switch for all notifications
                </p>
              </div>
              <Switch
                checked={notificationSettings.pushEnabled}
                onCheckedChange={() => handleToggle('pushEnabled')}
              />
            </div>
          </div>

          <Separator />

          {/* Medication Reminders */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold flex items-center gap-2 mb-4">
                <Pill className="h-4 w-4 text-primary" />
                Medication Reminders
              </h3>
            </div>
            
            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div className="space-y-0.5 flex-1">
                <Label className="text-base">Medication Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified when it's time to take your medications
                </p>
              </div>
              <Switch
                checked={notificationSettings.medicationReminders}
                onCheckedChange={() => handleToggle('medicationReminders')}
                disabled={!notificationSettings.pushEnabled}
              />
            </div>

            {notificationSettings.medicationReminders && (
              <div className="ml-4 p-3 rounded-lg bg-muted/50">
                <Label className="text-sm mb-2 block">Reminder Time</Label>
                <select 
                  className="w-full p-2 rounded border bg-background"
                  value={notificationSettings.medicationReminderTime}
                  onChange={(e) => setNotificationSettings(prev => ({
                    ...prev,
                    medicationReminderTime: parseInt(e.target.value)
                  }))}
                >
                  <option value={5}>5 minutes before</option>
                  <option value={10}>10 minutes before</option>
                  <option value={15}>15 minutes before</option>
                  <option value={30}>30 minutes before</option>
                  <option value={60}>1 hour before</option>
                </select>
              </div>
            )}
          </div>

          <Separator />

          {/* Appointment Reminders */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold flex items-center gap-2 mb-4">
                <Calendar className="h-4 w-4 text-secondary" />
                Appointment Reminders
              </h3>
            </div>
            
            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div className="space-y-0.5 flex-1">
                <Label className="text-base">Appointment Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Receive reminders for upcoming appointments
                </p>
              </div>
              <Switch
                checked={notificationSettings.appointmentReminders}
                onCheckedChange={() => handleToggle('appointmentReminders')}
                disabled={!notificationSettings.pushEnabled}
              />
            </div>

            {notificationSettings.appointmentReminders && (
              <div className="ml-4 p-3 rounded-lg bg-muted/50">
                <Label className="text-sm mb-2 block">First Reminder</Label>
                <select 
                  className="w-full p-2 rounded border bg-background"
                  value={notificationSettings.appointmentReminderHours}
                  onChange={(e) => setNotificationSettings(prev => ({
                    ...prev,
                    appointmentReminderHours: parseInt(e.target.value)
                  }))}
                >
                  <option value={1}>1 hour before</option>
                  <option value={2}>2 hours before</option>
                  <option value={4}>4 hours before</option>
                  <option value={24}>1 day before</option>
                  <option value={48}>2 days before</option>
                </select>
              </div>
            )}
          </div>

          <Separator />

          {/* Health Alerts */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold flex items-center gap-2 mb-4">
                <AlertTriangle className="h-4 w-4 text-warning" />
                Health Alerts
              </h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div className="space-y-0.5 flex-1">
                  <Label className="text-base">Critical Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Urgent notifications that require immediate attention
                  </p>
                  <Badge variant="destructive" className="mt-2">Cannot be disabled</Badge>
                </div>
                <Switch
                  checked={notificationSettings.criticalAlerts}
                  disabled={true}
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div className="space-y-0.5 flex-1">
                  <Label className="text-base">Pattern Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    AI-detected patterns in your health data
                  </p>
                </div>
                <Switch
                  checked={notificationSettings.patternAlerts}
                  onCheckedChange={() => handleToggle('patternAlerts')}
                  disabled={!notificationSettings.pushEnabled}
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div className="space-y-0.5 flex-1">
                  <Label className="text-base">Achievement Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Celebrate your health milestones and streaks
                  </p>
                </div>
                <Switch
                  checked={notificationSettings.achievementNotifications}
                  onCheckedChange={() => handleToggle('achievementNotifications')}
                  disabled={!notificationSettings.pushEnabled}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Messages */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold flex items-center gap-2 mb-4">
                <MessageSquare className="h-4 w-4 text-primary" />
                Messages
              </h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div className="space-y-0.5 flex-1">
                  <Label className="text-base">Message Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    New messages from your healthcare team
                  </p>
                </div>
                <Switch
                  checked={notificationSettings.messageNotifications}
                  onCheckedChange={() => handleToggle('messageNotifications')}
                  disabled={!notificationSettings.pushEnabled}
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div className="space-y-0.5 flex-1">
                  <Label className="text-base">Direct Messages</Label>
                  <p className="text-sm text-muted-foreground">
                    Priority notifications for direct messages
                  </p>
                </div>
                <Switch
                  checked={notificationSettings.directMessages}
                  onCheckedChange={() => handleToggle('directMessages')}
                  disabled={!notificationSettings.pushEnabled || !notificationSettings.messageNotifications}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Daily Check-ins */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold flex items-center gap-2 mb-4">
                <Activity className="h-4 w-4 text-primary" />
                Daily Check-ins
              </h3>
            </div>
            
            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div className="space-y-0.5 flex-1">
                <Label className="text-base">Daily Reminder</Label>
                <p className="text-sm text-muted-foreground">
                  Remind me to complete my daily health check-in
                </p>
              </div>
              <Switch
                checked={notificationSettings.dailyCheckInReminder}
                onCheckedChange={() => handleToggle('dailyCheckInReminder')}
                disabled={!notificationSettings.pushEnabled}
              />
            </div>

            {notificationSettings.dailyCheckInReminder && (
              <div className="ml-4 p-3 rounded-lg bg-muted/50">
                <Label className="text-sm mb-2 block">Reminder Time</Label>
                <input 
                  type="time"
                  className="w-full p-2 rounded border bg-background"
                  value={notificationSettings.dailyCheckInTime}
                  onChange={(e) => setNotificationSettings(prev => ({
                    ...prev,
                    dailyCheckInTime: e.target.value
                  }))}
                />
              </div>
            )}
          </div>

          <Separator />

          {/* Quiet Hours */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold flex items-center gap-2 mb-4">
                <Moon className="h-4 w-4" />
                Quiet Hours
              </h3>
            </div>
            
            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div className="space-y-0.5 flex-1">
                <Label className="text-base">Enable Quiet Hours</Label>
                <p className="text-sm text-muted-foreground">
                  Silence non-urgent notifications during specified hours
                </p>
              </div>
              <Switch
                checked={notificationSettings.quietHoursEnabled}
                onCheckedChange={() => handleToggle('quietHoursEnabled')}
                disabled={!notificationSettings.pushEnabled}
              />
            </div>

            {notificationSettings.quietHoursEnabled && (
              <div className="ml-4 p-3 rounded-lg bg-muted/50 space-y-3">
                <div>
                  <Label className="text-sm mb-2 block">Start Time</Label>
                  <input 
                    type="time"
                    className="w-full p-2 rounded border bg-background"
                    value={notificationSettings.quietHoursStart}
                    onChange={(e) => setNotificationSettings(prev => ({
                      ...prev,
                      quietHoursStart: e.target.value
                    }))}
                  />
                </div>
                <div>
                  <Label className="text-sm mb-2 block">End Time</Label>
                  <input 
                    type="time"
                    className="w-full p-2 rounded border bg-background"
                    value={notificationSettings.quietHoursEnd}
                    onChange={(e) => setNotificationSettings(prev => ({
                      ...prev,
                      quietHoursEnd: e.target.value
                    }))}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Note: Critical alerts will still be delivered during quiet hours
                </p>
              </div>
            )}
          </div>

          <Separator />

          {/* Sound & Vibration */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold flex items-center gap-2 mb-4">
                <Volume2 className="h-4 w-4" />
                Sound & Vibration
              </h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div className="space-y-0.5 flex-1">
                  <Label className="text-base">Notification Sound</Label>
                  <p className="text-sm text-muted-foreground">
                    Play sound for notifications
                  </p>
                </div>
                <Switch
                  checked={notificationSettings.soundEnabled}
                  onCheckedChange={() => handleToggle('soundEnabled')}
                  disabled={!notificationSettings.pushEnabled}
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div className="space-y-0.5 flex-1">
                  <Label className="text-base">Vibration</Label>
                  <p className="text-sm text-muted-foreground">
                    Vibrate for notifications
                  </p>
                </div>
                <Switch
                  checked={notificationSettings.vibrationEnabled}
                  onCheckedChange={() => handleToggle('vibrationEnabled')}
                  disabled={!notificationSettings.pushEnabled}
                />
              </div>
            </div>
          </div>

          {/* Device Info */}
          <div className="rounded-lg bg-muted/50 p-4">
            <div className="flex items-start gap-3">
              <Smartphone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div className="text-sm space-y-2">
                <p className="font-medium">Device Notifications</p>
                <p className="text-muted-foreground">
                  Make sure notifications are enabled in your device settings for the NeuroLoop app.
                  If you're not receiving notifications, check your device's notification permissions.
                </p>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex gap-2 pt-4">
            <Button onClick={handleSaveChanges} className="flex-1 sm:flex-initial">
              Save Changes
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate(-1)}
              className="flex-1 sm:flex-initial"
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

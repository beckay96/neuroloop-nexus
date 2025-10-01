import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { 
  Bell, 
  Pill, 
  Clock, 
  Calendar, 
  AlertTriangle, 
  CheckCircle,
  X,
  MoreHorizontal,
  Check
} from "lucide-react";

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  isMobile?: boolean;
  userType?: 'patient' | 'clinician';
}

const patientNotifications = [
  {
    id: 1,
    type: "medication",
    title: "Medication Reminder",
    message: "Levetiracetam 500mg due in 15 minutes",
    time: "8:45 PM",
    urgent: true,
    icon: Pill,
    color: "text-status-critical"
  },
  {
    id: 2,
    type: "tracking",
    title: "Daily Check-in",
    message: "Don't forget your evening health check-in",
    time: "30 min ago",
    urgent: false,
    icon: Clock,
    color: "text-primary"
  },
  {
    id: 3,
    type: "appointment",
    title: "Upcoming Appointment",
    message: "Dr. Smith consultation tomorrow at 2:00 PM",
    time: "2 hours ago",
    urgent: false,
    icon: Calendar,
    color: "text-secondary"
  },
  {
    id: 4,
    type: "achievement",
    title: "Achievement Unlocked!",
    message: "You've completed 7 days of consistent tracking",
    time: "This morning",
    urgent: false,
    icon: CheckCircle,
    color: "text-status-stable"
  },
  {
    id: 5,
    type: "alert",
    title: "Pattern Alert",
    message: "Unusual symptom pattern detected - consider consultation",
    time: "Yesterday",
    urgent: true,
    icon: AlertTriangle,
    color: "text-warning"
  }
];

const clinicianNotifications = [
  {
    id: 1,
    type: "critical",
    title: "Critical Patient Alert",
    message: "Sarah Johnson - Seizure cluster detected (3 in 24hrs)",
    time: "2 hours ago",
    urgent: true,
    icon: AlertTriangle,
    color: "text-status-critical"
  },
  {
    id: 2,
    type: "medication",
    title: "Medication Review Required",
    message: "Michael Chen - Missed doses for 2 consecutive days",
    time: "4 hours ago",
    urgent: true,
    icon: Pill,
    color: "text-warning"
  },
  {
    id: 3,
    type: "appointment",
    title: "Appointment Reminder",
    message: "5 patients scheduled for tomorrow",
    time: "1 hour ago",
    urgent: false,
    icon: Calendar,
    color: "text-secondary"
  },
  {
    id: 4,
    type: "research",
    title: "Research Data Update",
    message: "Weekly cohort analysis report available",
    time: "This morning",
    urgent: false,
    icon: CheckCircle,
    color: "text-primary"
  },
  {
    id: 5,
    type: "system",
    title: "System Update",
    message: "New pattern recognition algorithms deployed",
    time: "Yesterday",
    urgent: false,
    icon: Bell,
    color: "text-status-stable"
  }
];

export default function NotificationsPanel({ isOpen, onClose, isMobile = false, userType = 'patient' }: NotificationsPanelProps) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [readNotifications, setReadNotifications] = useState<number[]>([]);
  
  if (!isOpen) return null;

  const notifications = userType === 'clinician' ? clinicianNotifications : patientNotifications;
  const unreadNotifications = notifications.filter(n => !readNotifications.includes(n.id));
  
  const panelClasses = isMobile 
    ? "fixed inset-x-0 top-16 mx-4 mt-2 z-50" 
    : "absolute right-0 top-12 w-80 z-50";

  const handleMarkAsRead = (id: number) => {
    setReadNotifications(prev => [...prev, id]);
    toast({
      title: "Marked as Read",
      description: "Notification marked as read",
    });
  };

  const handleMarkAllAsRead = () => {
    setReadNotifications(notifications.map(n => n.id));
    toast({
      title: "All Marked as Read",
      description: `${unreadNotifications.length} notifications marked as read`,
    });
  };

  return (
    <>
      {/* Backdrop for mobile */}
      {isMobile && (
        <div 
          className="fixed inset-0 bg-black/20 z-40" 
          onClick={onClose}
        />
      )}
      
      <Card className={`${panelClasses} medical-card bg-card border shadow-floating`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-primary" />
            <h3 className="font-semibold">Notifications</h3>
            <Badge variant="secondary" className="text-xs">
              {unreadNotifications.length}
            </Badge>
          </div>
          
          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleMarkAllAsRead}
              className="text-xs"
            >
              Mark all read
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-6 text-center">
              <Bell className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No new notifications</p>
            </div>
          ) : (
            <div className="divide-y">
              {notifications.map(notification => {
                const IconComponent = notification.icon;
                return (
                  <div 
                    key={notification.id}
                    className={`p-4 hover:bg-accent/50 transition-colors ${
                      notification.urgent ? 'bg-status-critical/5 border-l-2 border-l-status-critical' : ''
                    } ${
                      readNotifications.includes(notification.id) ? 'opacity-50' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        notification.urgent ? 'bg-status-critical/20' : 'bg-muted'
                      }`}>
                        <IconComponent className={`h-4 w-4 ${notification.color}`} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-sm truncate">{notification.title}</h4>
                          {notification.urgent && (
                            <Badge variant="destructive" className="text-xs px-1">
                              Urgent
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">{notification.time}</span>
                          {!readNotifications.includes(notification.id) && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleMarkAsRead(notification.id)}
                              className="h-6 px-2 text-xs"
                            >
                              <Check className="h-3 w-3 mr-1" />
                              Read
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t bg-muted/30">
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full text-xs"
            onClick={() => {
              navigate('/notifications');
              onClose();
              toast({
                title: "All Notifications",
                description: "Viewing complete notification history",
              });
            }}
          >
            View All Notifications
          </Button>
        </div>
      </Card>
    </>
  );
}
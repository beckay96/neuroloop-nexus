import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, Bell, Pill, Clock, Calendar, AlertTriangle, 
  CheckCircle, Filter, Trash2, Check, X
} from "lucide-react";

interface Notification {
  id: number;
  type: "medication" | "tracking" | "appointment" | "achievement" | "alert" | "message";
  title: string;
  message: string;
  time: string;
  urgent: boolean;
  read: boolean;
  date: Date;
}

export default function AllNotifications() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedFilter, setSelectedFilter] = useState<"all" | "unread" | "urgent">("all");
  const [readNotifications, setReadNotifications] = useState<number[]>([]);

  // Extended mock notifications with dates
  const allNotifications: Notification[] = [
    // Today
    {
      id: 1,
      type: "medication",
      title: "Medication Reminder",
      message: "Levetiracetam 500mg due in 15 minutes",
      time: "8:45 PM",
      urgent: true,
      read: false,
      date: new Date()
    },
    {
      id: 2,
      type: "tracking",
      title: "Daily Check-in",
      message: "Don't forget your evening health check-in",
      time: "7:30 PM",
      urgent: false,
      read: false,
      date: new Date()
    },
    {
      id: 3,
      type: "message",
      title: "New Message from Dr. Wilson",
      message: "I've reviewed your latest test results. Everything looks good!",
      time: "2:15 PM",
      urgent: false,
      read: false,
      date: new Date()
    },
    {
      id: 4,
      type: "achievement",
      title: "Achievement Unlocked!",
      message: "You've completed 7 days of consistent tracking",
      time: "10:00 AM",
      urgent: false,
      read: true,
      date: new Date()
    },
    
    // Yesterday
    {
      id: 5,
      type: "alert",
      title: "Pattern Alert",
      message: "Unusual symptom pattern detected - consider consultation",
      time: "Yesterday, 8:30 PM",
      urgent: true,
      read: true,
      date: new Date(Date.now() - 86400000)
    },
    {
      id: 6,
      type: "appointment",
      title: "Appointment Reminder",
      message: "Dr. Smith consultation tomorrow at 2:00 PM",
      time: "Yesterday, 6:00 PM",
      urgent: false,
      read: true,
      date: new Date(Date.now() - 86400000)
    },
    {
      id: 7,
      type: "medication",
      title: "Medication Taken",
      message: "Evening dose of Lamotrigine logged successfully",
      time: "Yesterday, 9:00 PM",
      urgent: false,
      read: true,
      date: new Date(Date.now() - 86400000)
    },

    // 2 days ago
    {
      id: 8,
      type: "tracking",
      title: "Check-in Reminder",
      message: "You haven't completed today's health check-in",
      time: "2 days ago, 8:00 PM",
      urgent: false,
      read: true,
      date: new Date(Date.now() - 172800000)
    },
    {
      id: 9,
      type: "achievement",
      title: "Milestone Reached",
      message: "30 days of medication adherence - keep it up!",
      time: "2 days ago, 10:00 AM",
      urgent: false,
      read: true,
      date: new Date(Date.now() - 172800000)
    },

    // 3 days ago
    {
      id: 10,
      type: "alert",
      title: "Health Alert",
      message: "Your sleep quality has been declining. Consider reviewing your sleep habits.",
      time: "3 days ago, 9:00 AM",
      urgent: false,
      read: true,
      date: new Date(Date.now() - 259200000)
    },
  ];

  const getIconAndColor = (type: string) => {
    switch (type) {
      case "medication":
        return { icon: Pill, color: "text-primary" };
      case "tracking":
        return { icon: Clock, color: "text-secondary" };
      case "appointment":
        return { icon: Calendar, color: "text-blue-600" };
      case "achievement":
        return { icon: CheckCircle, color: "text-status-stable" };
      case "alert":
        return { icon: AlertTriangle, color: "text-warning" };
      case "message":
        return { icon: Bell, color: "text-primary" };
      default:
        return { icon: Bell, color: "text-muted-foreground" };
    }
  };

  const handleMarkAsRead = (id: number) => {
    setReadNotifications(prev => [...prev, id]);
    toast({
      title: "Marked as Read",
      description: "Notification marked as read",
    });
  };

  const handleMarkAllAsRead = () => {
    const unreadIds = filteredNotifications
      .filter(n => !n.read && !readNotifications.includes(n.id))
      .map(n => n.id);
    setReadNotifications(prev => [...prev, ...unreadIds]);
    toast({
      title: "All Marked as Read",
      description: `${unreadIds.length} notifications marked as read`,
    });
  };

  const handleDelete = (id: number) => {
    toast({
      title: "Notification Deleted",
      description: "The notification has been removed",
    });
  };

  const filteredNotifications = allNotifications.filter(notification => {
    const isRead = notification.read || readNotifications.includes(notification.id);
    
    if (selectedFilter === "unread") return !isRead;
    if (selectedFilter === "urgent") return notification.urgent;
    return true;
  });

  const unreadCount = allNotifications.filter(n => 
    !n.read && !readNotifications.includes(n.id)
  ).length;

  const urgentCount = allNotifications.filter(n => n.urgent).length;

  return (
    <div className="container max-w-5xl mx-auto p-6">
      <Card className="medical-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  All Notifications
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {unreadCount} unread • {urgentCount} urgent
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleMarkAllAsRead}
                disabled={unreadCount === 0}
              >
                <Check className="h-4 w-4 mr-2" />
                Mark All Read
              </Button>
            </div>
          </div>

          {/* Filter Tabs */}
          <Tabs value={selectedFilter} onValueChange={(v) => setSelectedFilter(v as any)} className="mt-4">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="all">
                All ({allNotifications.length})
              </TabsTrigger>
              <TabsTrigger value="unread">
                Unread ({unreadCount})
              </TabsTrigger>
              <TabsTrigger value="urgent">
                Urgent ({urgentCount})
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>

        <CardContent className="p-0">
          {filteredNotifications.length === 0 ? (
            <div className="p-12 text-center">
              <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">No Notifications</h3>
              <p className="text-sm text-muted-foreground">
                {selectedFilter === "unread" 
                  ? "You're all caught up! No unread notifications."
                  : selectedFilter === "urgent"
                  ? "No urgent notifications at the moment."
                  : "You don't have any notifications yet."
                }
              </p>
            </div>
          ) : (
            <div className="divide-y max-h-[600px] overflow-y-auto">
              {filteredNotifications.map((notification) => {
                const { icon: IconComponent, color } = getIconAndColor(notification.type);
                const isRead = notification.read || readNotifications.includes(notification.id);

                return (
                  <div 
                    key={notification.id}
                    className={`p-4 hover:bg-accent/50 transition-colors ${
                      notification.urgent ? 'bg-status-critical/5 border-l-4 border-l-status-critical' : ''
                    } ${
                      isRead ? 'opacity-60' : ''
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                        notification.urgent ? 'bg-status-critical/20' : 'bg-muted'
                      }`}>
                        <IconComponent className={`h-5 w-5 ${color}`} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium text-sm truncate">{notification.title}</h4>
                              {notification.urgent && (
                                <Badge variant="destructive" className="text-xs px-1 shrink-0">
                                  Urgent
                                </Badge>
                              )}
                              {!isRead && (
                                <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                              {notification.message}
                            </p>
                            <span className="text-xs text-muted-foreground">{notification.time}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        {!isRead && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleMarkAsRead(notification.id)}
                            className="h-8 px-2"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDelete(notification.id)}
                          className="h-8 px-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>

        {/* Footer */}
        {filteredNotifications.length > 0 && (
          <div className="border-t p-4 bg-muted/30 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {filteredNotifications.length} of {allNotifications.length} notifications
            </p>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate("/settings/notifications")}
            >
              <Filter className="h-4 w-4 mr-2" />
              Notification Settings
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}

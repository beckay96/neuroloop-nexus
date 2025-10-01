import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  Calendar as CalendarIcon, Clock, Video, MapPin, Plus, 
  Settings, Users, List, CalendarDays
} from "lucide-react";
import AppointmentCalendar from "./AppointmentCalendar";
import { AppointmentBooking, AvailabilityManager, CalendarSyncManager } from "./SchedulingComponents";
import { useAuth } from "@/hooks/useAuth";

interface Appointment {
  appointment_id: string;
  patient_id: string;
  patient_name: string;
  appointment_type: string;
  title: string;
  scheduled_start: string;
  scheduled_end: string;
  status: string;
  location_type: 'in_person' | 'video' | 'phone';
  video_call_link?: string;
}

export default function SchedulingHub() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState("calendar");
  const [showBooking, setShowBooking] = useState(false);
  const [showSyncCalendar, setShowSyncCalendar] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  // Mock upcoming appointments - replace with real API
  const upcomingAppointments: Appointment[] = [
    {
      appointment_id: '1',
      patient_id: 'P001',
      patient_name: 'Sarah Johnson',
      appointment_type: 'follow_up',
      title: 'Follow-up: Seizure Management',
      scheduled_start: '2025-09-30T14:00:00',
      scheduled_end: '2025-09-30T14:30:00',
      status: 'confirmed',
      location_type: 'video',
      video_call_link: 'https://meet.google.com/abc-defg-hij'
    },
    {
      appointment_id: '2',
      patient_id: 'P002',
      patient_name: 'Michael Chen',
      appointment_type: 'medication_review',
      title: 'Medication Review',
      scheduled_start: '2025-09-30T15:00:00',
      scheduled_end: '2025-09-30T15:45:00',
      status: 'confirmed',
      location_type: 'in_person',
    },
    {
      appointment_id: '3',
      patient_id: 'P003',
      patient_name: 'Emily Rodriguez',
      appointment_type: 'initial_consultation',
      title: 'New Patient Consultation',
      scheduled_start: '2025-10-01T10:00:00',
      scheduled_end: '2025-10-01T11:00:00',
      status: 'confirmed',
      location_type: 'in_person',
    }
  ];

  const todayAppointments = upcomingAppointments.filter(apt => {
    const aptDate = new Date(apt.scheduled_start);
    const today = new Date();
    return aptDate.toDateString() === today.toDateString();
  });

  const getLocationIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4" />;
      case 'phone': return <Clock className="h-4 w-4" />;
      default: return <MapPin className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-500/10 text-green-600 dark:text-green-400';
      case 'requested': return 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400';
      case 'cancelled_by_patient':
      case 'cancelled_by_clinician': return 'bg-red-500/10 text-red-600 dark:text-red-400';
      default: return 'bg-muted';
    }
  };

  if (showBooking) {
    return (
      <AppointmentBooking
        onClose={() => setShowBooking(false)}
        onBooked={() => {
          setShowBooking(false);
          // Refresh appointments
        }}
      />
    );
  }

  return (
    <div className="h-full flex flex-col">
      <Card className="medical-card flex-1 flex flex-col">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Appointment Scheduling
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setShowSyncCalendar(true);
                  toast({
                    title: "Calendar Sync",
                    description: "Opening calendar synchronization settings",
                  });
                }}
              >
                <Settings className="h-4 w-4 mr-2" />
                Sync Calendars
              </Button>
              <Button size="sm" onClick={() => setShowBooking(true)}>
                <Plus className="h-4 w-4 mr-2" />
                New Appointment
              </Button>
            </div>
          </div>

          {/* Today's Summary */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
            <Card className="p-3">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-primary" />
                <div>
                  <div className="text-2xl font-bold">{todayAppointments.length}</div>
                  <div className="text-xs text-muted-foreground">Today's Appointments</div>
                </div>
              </div>
            </Card>
            <Card className="p-3">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <div>
                  <div className="text-2xl font-bold">{upcomingAppointments.length}</div>
                  <div className="text-xs text-muted-foreground">Upcoming This Week</div>
                </div>
              </div>
            </Card>
            <Card className="p-3">
              <div className="flex items-center gap-2">
                <Video className="h-4 w-4 text-primary" />
                <div>
                  <div className="text-2xl font-bold">
                    {upcomingAppointments.filter(a => a.location_type === 'video').length}
                  </div>
                  <div className="text-xs text-muted-foreground">Video Consultations</div>
                </div>
              </div>
            </Card>
          </div>
        </CardHeader>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="flex-1 flex flex-col">
          <TabsList className="mx-6">
            <TabsTrigger value="calendar">
              <CalendarIcon className="h-4 w-4 mr-2" />
              Calendar View
            </TabsTrigger>
            <TabsTrigger value="list">
              <List className="h-4 w-4 mr-2" />
              List View
            </TabsTrigger>
            <TabsTrigger value="availability">
              <Clock className="h-4 w-4 mr-2" />
              Availability
            </TabsTrigger>
            <TabsTrigger value="sync">
              <Settings className="h-4 w-4 mr-2" />
              Calendar Sync
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calendar" className="flex-1 p-6">
            <AppointmentCalendar
              appointments={upcomingAppointments}
              onAppointmentClick={(apt) => setSelectedAppointment(apt)}
              onCreateAppointment={() => setShowBooking(true)}
            />
          </TabsContent>

          <TabsContent value="list" className="flex-1 p-6 overflow-y-auto">
            <div className="space-y-3">
              <h3 className="font-semibold mb-4">Upcoming Appointments</h3>
              {upcomingAppointments.map((appointment) => (
                <Card
                  key={appointment.appointment_id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setSelectedAppointment(appointment)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">{appointment.patient_name}</h4>
                          <Badge variant="outline" className={getStatusColor(appointment.status)}>
                            {appointment.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{appointment.title}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <CalendarIcon className="h-3 w-3" />
                            {new Date(appointment.scheduled_start).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {new Date(appointment.scheduled_start).toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </div>
                          <div className="flex items-center gap-1">
                            {getLocationIcon(appointment.location_type)}
                            {appointment.location_type}
                          </div>
                        </div>
                      </div>
                      {appointment.location_type === 'video' && appointment.video_call_link && (
                        <Button size="sm">
                          <Video className="h-4 w-4 mr-2" />
                          Join Call
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="availability" className="flex-1 p-6 overflow-y-auto">
            <AvailabilityManager />
          </TabsContent>

          <TabsContent value="sync" className="flex-1 p-6 overflow-y-auto">
            <CalendarSyncManager />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}

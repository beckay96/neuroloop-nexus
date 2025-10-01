import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Video, MapPin, Clock } from "lucide-react";

interface Appointment {
  appointment_id: string;
  patient_id: string;
  patient_name: string;
  title: string;
  scheduled_start: string;
  scheduled_end: string;
  status: string;
  location_type: 'in_person' | 'video' | 'phone';
  appointment_type: string;
  video_call_link?: string;
}

interface AppointmentCalendarProps {
  appointments: Appointment[];
  onAppointmentClick: (appointment: Appointment) => void;
  onCreateAppointment: () => void;
}

export default function AppointmentCalendar({
  appointments,
  onAppointmentClick,
  onCreateAppointment
}: AppointmentCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week' | 'day'>('week');

  const getWeekDays = () => {
    const start = new Date(currentDate);
    start.setDate(start.getDate() - start.getDay());
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      return date;
    });
  };

  const weekDays = getWeekDays();

  const getAppointmentsForDay = (date: Date) => {
    return appointments.filter(apt => {
      const aptDate = new Date(apt.scheduled_start);
      return aptDate.toDateString() === date.toDateString();
    }).sort((a, b) => 
      new Date(a.scheduled_start).getTime() - new Date(b.scheduled_start).getTime()
    );
  };

  const previousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const nextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const getLocationIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-3 w-3" />;
      case 'phone': return <Clock className="h-3 w-3" />;
      default: return <MapPin className="h-3 w-3" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'border-l-green-500 bg-green-500/10';
      case 'requested': return 'border-l-yellow-500 bg-yellow-500/10';
      case 'cancelled_by_patient':
      case 'cancelled_by_clinician': return 'border-l-red-500 bg-red-500/10';
      default: return 'border-l-gray-500 bg-gray-500/10';
    }
  };

  return (
    <div className="space-y-4">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={previousWeek}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={nextWeek}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={goToToday}>
            Today
          </Button>
          <h3 className="text-lg font-semibold ml-4">
            {weekDays[0].toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={view === 'day' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setView('day')}
          >
            Day
          </Button>
          <Button
            variant={view === 'week' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setView('week')}
          >
            Week
          </Button>
          <Button
            variant={view === 'month' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setView('month')}
          >
            Month
          </Button>
        </div>
      </div>

      {/* Week View Calendar */}
      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((day, index) => {
          const dayAppointments = getAppointmentsForDay(day);
          const isToday = day.toDateString() === new Date().toDateString();

          return (
            <Card
              key={index}
              className={`min-h-[300px] ${isToday ? 'ring-2 ring-primary' : ''}`}
            >
              <CardContent className="p-3">
                <div className="text-center mb-3">
                  <div className="text-xs text-muted-foreground">
                    {day.toLocaleDateString('en-US', { weekday: 'short' })}
                  </div>
                  <div className={`text-lg font-bold ${isToday ? 'text-primary' : ''}`}>
                    {day.getDate()}
                  </div>
                </div>

                <div className="space-y-2">
                  {dayAppointments.length > 0 ? (
                    dayAppointments.map((apt) => (
                      <Card
                        key={apt.appointment_id}
                        className={`cursor-pointer hover:shadow-md transition-shadow border-l-4 ${getStatusColor(apt.status)}`}
                        onClick={() => onAppointmentClick(apt)}
                      >
                        <CardContent className="p-2">
                          <div className="text-xs font-semibold truncate mb-1">
                            {new Date(apt.scheduled_start).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                          <div className="text-xs truncate mb-1">{apt.patient_name}</div>
                          <div className="flex items-center gap-1">
                            {getLocationIcon(apt.location_type)}
                            <span className="text-xs truncate">{apt.appointment_type}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full text-xs"
                      onClick={onCreateAppointment}
                    >
                      + Add
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded" />
          <span>Confirmed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-yellow-500 rounded" />
          <span>Requested</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded" />
          <span>Cancelled</span>
        </div>
        <div className="flex items-center gap-2">
          <Video className="h-3 w-3" />
          <span>Video</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-3 w-3" />
          <span>In-Person</span>
        </div>
      </div>
    </div>
  );
}

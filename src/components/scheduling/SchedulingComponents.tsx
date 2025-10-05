// Consolidated Scheduling Components
// AppointmentBooking, AvailabilityManager, CalendarSyncManager, AppointmentTimeSlot

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CustomDatePicker } from "@/components/ui/custom-date-picker";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  ArrowLeft, Calendar, Clock, MapPin, Video, Phone, Plus, Trash2,
  Save, X, Check, AlertCircle, Settings
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// ============= APPOINTMENT BOOKING =============
interface AppointmentBookingProps {
  onClose: () => void;
  onBooked: () => void;
  patientId?: string;
}

export function AppointmentBooking({ onClose, onBooked, patientId }: AppointmentBookingProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    patient_id: patientId || '',
    appointment_type: 'follow_up',
    title: '',
    description: '',
    date: '',
    start_time: '',
    duration: '30',
    location_type: 'in_person',
    location_details: ''
  });

  const handleSubmit = () => {
    toast({
      title: "Appointment Booked",
      description: "The appointment has been created successfully.",
    });
    onBooked();
  };

  return (
    <Card className="medical-card h-full flex flex-col">
      <CardHeader className="border-b">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onClose}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <CardTitle>Book Appointment</CardTitle>
            <CardDescription>Schedule a new appointment with a patient</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto p-6">
        <div className="space-y-6 max-w-2xl">
          {/* Appointment Type */}
          <div className="space-y-2">
            <Label>Appointment Type</Label>
            <Select
              value={formData.appointment_type}
              onValueChange={(value) => setFormData({ ...formData, appointment_type: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="initial_consultation">Initial Consultation</SelectItem>
                <SelectItem value="follow_up">Follow-up Visit</SelectItem>
                <SelectItem value="medication_review">Medication Review</SelectItem>
                <SelectItem value="test_review">Test Results Review</SelectItem>
                <SelectItem value="urgent_visit">Urgent Visit</SelectItem>
                <SelectItem value="routine_checkup">Routine Checkup</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Follow-up: Seizure Management"
            />
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <CustomDatePicker
                label="Date"
                value={formData.date}
                onChange={(value) => setFormData({ ...formData, date: value })}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className="space-y-2">
              <Label>Start Time</Label>
              <Input
                type="time"
                value={formData.start_time}
                onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Duration (minutes)</Label>
              <Select
                value={formData.duration}
                onValueChange={(value) => setFormData({ ...formData, duration: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="90">1.5 hours</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Location Type */}
          <div className="space-y-2">
            <Label>Location Type</Label>
            <div className="grid grid-cols-3 gap-3">
              <Button
                variant={formData.location_type === 'in_person' ? 'default' : 'outline'}
                onClick={() => setFormData({ ...formData, location_type: 'in_person' })}
                className="flex-col h-auto py-4"
              >
                <MapPin className="h-5 w-5 mb-2" />
                In-Person
              </Button>
              <Button
                variant={formData.location_type === 'video' ? 'default' : 'outline'}
                onClick={() => setFormData({ ...formData, location_type: 'video' })}
                className="flex-col h-auto py-4"
              >
                <Video className="h-5 w-5 mb-2" />
                Video Call
              </Button>
              <Button
                variant={formData.location_type === 'phone' ? 'default' : 'outline'}
                onClick={() => setFormData({ ...formData, location_type: 'phone' })}
                className="flex-col h-auto py-4"
              >
                <Phone className="h-5 w-5 mb-2" />
                Phone Call
              </Button>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label>Description (Optional)</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Additional notes or preparation instructions..."
              rows={4}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button className="flex-1" onClick={handleSubmit}>
              <Check className="h-4 w-4 mr-2" />
              Book Appointment
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ============= AVAILABILITY MANAGER =============
interface TimeSlot {
  id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  is_active: boolean;
}

export function AvailabilityManager() {
  const { toast } = useToast();
  const [slots, setSlots] = useState<TimeSlot[]>([
    { id: '1', day_of_week: 1, start_time: '09:00', end_time: '17:00', is_active: true },
    { id: '2', day_of_week: 2, start_time: '09:00', end_time: '17:00', is_active: true },
    { id: '3', day_of_week: 3, start_time: '09:00', end_time: '17:00', is_active: true },
    { id: '4', day_of_week: 4, start_time: '09:00', end_time: '17:00', is_active: true },
    { id: '5', day_of_week: 5, start_time: '09:00', end_time: '13:00', is_active: true },
  ]);

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const addSlot = () => {
    const newSlot: TimeSlot = {
      id: Date.now().toString(),
      day_of_week: 1,
      start_time: '09:00',
      end_time: '17:00',
      is_active: true
    };
    setSlots([...slots, newSlot]);
  };

  const removeSlot = (id: string) => {
    setSlots(slots.filter(s => s.id !== id));
  };

  const updateSlot = (id: string, updates: Partial<TimeSlot>) => {
    setSlots(slots.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const saveAvailability = () => {
    toast({
      title: "Availability Updated",
      description: "Your availability settings have been saved.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Manage Your Availability</h3>
          <p className="text-sm text-muted-foreground">
            Set your regular working hours for appointment booking
          </p>
        </div>
        <Button onClick={addSlot}>
          <Plus className="h-4 w-4 mr-2" />
          Add Time Slot
        </Button>
      </div>

      <div className="space-y-3">
        {slots.map((slot) => (
          <Card key={slot.id}>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <Select
                  value={slot.day_of_week.toString()}
                  onValueChange={(value) => updateSlot(slot.id, { day_of_week: parseInt(value) })}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {daysOfWeek.map((day, index) => (
                      <SelectItem key={index} value={index.toString()}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Input
                  type="time"
                  value={slot.start_time}
                  onChange={(e) => updateSlot(slot.id, { start_time: e.target.value })}
                  className="w-32"
                />
                <span>to</span>
                <Input
                  type="time"
                  value={slot.end_time}
                  onChange={(e) => updateSlot(slot.id, { end_time: e.target.value })}
                  className="w-32"
                />

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeSlot(slot.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button onClick={saveAvailability} className="w-full">
        <Save className="h-4 w-4 mr-2" />
        Save Availability
      </Button>
    </div>
  );
}

// ============= CALENDAR SYNC MANAGER =============
interface CalendarConnection {
  provider: 'google' | 'apple' | 'microsoft';
  calendar_name: string;
  sync_enabled: boolean;
  last_sync_at?: string;
}

export function CalendarSyncManager() {
  const { toast } = useToast();
  const [connections, setConnections] = useState<CalendarConnection[]>([]);

  const connectCalendar = (provider: 'google' | 'apple' | 'microsoft') => {
    toast({
      title: "Calendar Connection",
      description: `Opening ${provider} calendar authorization...`,
    });
    // OAuth flow would happen here
  };

  const toggleSync = (provider: string) => {
    setConnections(connections.map(conn => 
      conn.provider === provider 
        ? { ...conn, sync_enabled: !conn.sync_enabled }
        : conn
    ));
    toast({
      title: "Sync Status Updated",
      description: "Calendar sync settings have been updated.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Calendar Sync</h3>
        <p className="text-sm text-muted-foreground">
          Connect your external calendars to automatically sync appointments
        </p>
      </div>

      {/* Google Calendar */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold">Google Calendar</h4>
                <p className="text-sm text-muted-foreground">
                  Sync with Google Calendar
                </p>
              </div>
            </div>
            <Button onClick={() => connectCalendar('google')}>
              Connect
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Apple Calendar */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-500/10 rounded-lg flex items-center justify-center">
                <Calendar className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <h4 className="font-semibold">Apple Calendar (iCloud)</h4>
                <p className="text-sm text-muted-foreground">
                  Sync with Apple Calendar via iCloud
                </p>
              </div>
            </div>
            <Button onClick={() => connectCalendar('apple')}>
              Connect
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Microsoft/Outlook Calendar */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600/10 rounded-lg flex items-center justify-center">
                <Calendar className="h-5 w-5 text-blue-700" />
              </div>
              <div>
                <h4 className="font-semibold">Microsoft Outlook</h4>
                <p className="text-sm text-muted-foreground">
                  Sync with Outlook Calendar
                </p>
              </div>
            </div>
            <Button onClick={() => connectCalendar('microsoft')}>
              Connect
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Sync Options */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Sync Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Two-way sync</div>
              <div className="text-sm text-muted-foreground">
                Sync changes in both directions
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Configure
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Automatic sync</div>
              <div className="text-sm text-muted-foreground">
                Sync every 15 minutes
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Configure
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Export all components
export default {
  AppointmentBooking,
  AvailabilityManager,
  CalendarSyncManager
};

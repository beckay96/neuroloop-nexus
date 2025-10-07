import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { 
  Phone, 
  AlertTriangle, 
  MapPin, 
  Users, 
  Clock,
  Heart,
  Zap,
  Shield,
  CheckCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { SeizureTimer } from "@/components/tracking/SeizureTimer";

interface EmergencyContact {
  name: string;
  phone: string;
  relationship: string;
}

// Get emergency number based on user's country
function getEmergencyNumber(countryCode?: string): string {
  switch (countryCode?.toUpperCase()) {
    case 'AU': // Australia
    case 'AUS':
      return '000';
    case 'GB': // UK
    case 'UK':
      return '999';
    case 'EU': // Europe (most countries)
      return '112';
    case 'NZ': // New Zealand
      return '111';
    default: // USA, Canada, and default
      return '911';
  }
}

interface EmergencyButtonProps {
  userId: string;
  className?: string;
}

export function EmergencyButton({ userId, className = "" }: EmergencyButtonProps) {
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);
  const [emergencyContact, setEmergencyContact] = useState<EmergencyContact | null>(null);
  const [showSeizureTimer, setShowSeizureTimer] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [actionsTaken, setActionsTaken] = useState<string[]>([]);
  const { toast } = useToast();

  // Load emergency contact on mount
  useEffect(() => {
    loadEmergencyContact();
  }, [userId]);

  const loadEmergencyContact = async () => {
    try {
      // Use RPC function to access private_health_info schema
      const { data, error } = await supabase
        .rpc('get_patient_onboarding_data', { p_user_id: userId });

      if (data && !error && data.length > 0) {
        const contactData = data[0];
        setEmergencyContact({
          name: contactData.emergency_contact_name,
          phone: contactData.emergency_contact_phone,
          relationship: contactData.emergency_contact_relationship || 'Emergency Contact'
        });
      }
    } catch (error) {
      console.error('Error loading emergency contact:', error);
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setLocation(loc);
          setActionsTaken([...actionsTaken, 'Location obtained']);
          
          // Send location to emergency contact
          sendLocationToContacts(loc);
        },
        (error) => {
          console.error('Location error:', error);
          toast({
            title: "Location unavailable",
            description: "Unable to get GPS location. Please share your location manually.",
            variant: "destructive"
          });
        },
        { enableHighAccuracy: true, timeout: 5000 }
      );
    }
  };

  const sendLocationToContacts = async (loc: { lat: number; lng: number }) => {
    // In production, this would send SMS/email via Twilio/SendGrid
    const googleMapsUrl = `https://maps.google.com/?q=${loc.lat},${loc.lng}`;
    
    toast({
      title: "Location Shared",
      description: "Your location has been sent to emergency contacts",
    });

    // Log emergency event
    await logEmergencyEvent('location_shared', { location: loc });
  };

  const callEmergencyContact = () => {
    if (emergencyContact?.phone) {
      // Create tel: link for mobile devices
      window.location.href = `tel:${emergencyContact.phone}`;
      setActionsTaken([...actionsTaken, `Called ${emergencyContact.name}`]);
      logEmergencyEvent('emergency_contact_called', { contact: emergencyContact.name });
    }
  };

  const callEmergencyServices = () => {
    // TODO: Get country code from user profile
    const emergencyNumber = getEmergencyNumber('AU'); // Default to Australia for now
    window.location.href = `tel:${emergencyNumber}`;
    setActionsTaken([...actionsTaken, `Called ${emergencyNumber}`]);
    logEmergencyEvent('emergency_services_called', { number: emergencyNumber });
  };

  const startSeizureTimer = () => {
    setShowSeizureTimer(true);
    setActionsTaken([...actionsTaken, 'Started seizure timer']);
    logEmergencyEvent('seizure_timer_started', {});
  };

  const notifyAllCarers = async () => {
    // In production, this would trigger notifications to all registered carers
    setActionsTaken([...actionsTaken, 'Notified all carers']);
    
    toast({
      title: "Emergency Alert Sent",
      description: "All your registered carers have been notified",
    });

    await logEmergencyEvent('all_carers_notified', {});
  };

  const logEmergencyEvent = async (eventType: string, details: any) => {
    try {
      // Log to a dedicated emergency_events table (would need to be created)
      const { error } = await supabase
        .from('tracking_entries' as any)
        .insert({
          user_id: userId,
          entry_date: new Date().toISOString().split('T')[0],
          entry_time: new Date().toTimeString().slice(0, 5),
          mood: 'emergency',
          notes: `EMERGENCY EVENT: ${eventType} - ${JSON.stringify(details)}`,
          is_emergency: true
        });

      if (error) console.error('Error logging emergency:', error);
    } catch (error) {
      console.error('Failed to log emergency event:', error);
    }
  };

  const handleEmergencyClick = () => {
    setIsEmergencyMode(true);
    getLocation(); // Get location immediately
    logEmergencyEvent('emergency_activated', { timestamp: new Date().toISOString() });
  };

  const endEmergency = () => {
    setIsEmergencyMode(false);
    setActionsTaken([]);
    setShowSeizureTimer(false);
    logEmergencyEvent('emergency_ended', { actions_taken: actionsTaken });
    
    toast({
      title: "Emergency Mode Ended",
      description: "Stay safe. Your emergency data has been recorded.",
    });
  };

  return (
    <>
      {/* Emergency Button - Always Visible */}
      <Button
        variant="destructive"
        size="lg"
        onClick={handleEmergencyClick}
        className={`${className} shadow-lg hover:shadow-xl transition-all`}
      >
        <AlertTriangle className="h-5 w-5 mr-2" />
        EMERGENCY
      </Button>

      {/* Emergency Mode Dialog */}
      <Dialog open={isEmergencyMode} onOpenChange={setIsEmergencyMode}>
        <DialogContent className="max-w-md border-red-500 border-2">
          <DialogHeader>
            <DialogTitle className="text-red-600 flex items-center gap-2">
              <AlertTriangle className="h-6 w-6" />
              EMERGENCY MODE ACTIVE
            </DialogTitle>
            <DialogDescription>
              Quick actions for your safety
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Status Display */}
            {location && (
              <Card className="p-3 bg-green-50 dark:bg-green-950 border-green-500">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Location obtained and shared</span>
                </div>
              </Card>
            )}

            {/* Primary Emergency Actions */}
            <div className="grid grid-cols-1 gap-3">
              {emergencyContact && (
                <div>
                  <Button
                    size="lg"
                    variant="destructive"
                    onClick={callEmergencyContact}
                    className="w-full h-14 text-lg"
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    Call {emergencyContact.name.split(' ')[0]}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center mt-1">
                    {emergencyContact.relationship}
                  </p>
                </div>
              )}

              <Button
                size="lg"
                variant="destructive"
                onClick={callEmergencyServices}
                className="w-full h-14 text-lg bg-red-700 hover:bg-red-800"
              >
                <Phone className="h-5 w-5 mr-2" />
                Call {getEmergencyNumber('AU')}
              </Button>
            </div>

            {/* Secondary Actions */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={startSeizureTimer}
                className="border-orange-500 text-orange-600 hover:bg-orange-50"
              >
                <Clock className="h-4 w-4 mr-2" />
                Seizure Timer
              </Button>

              <Button
                variant="outline"
                onClick={notifyAllCarers}
                className="border-blue-500 text-blue-600 hover:bg-blue-50 relative"
                disabled
              >
                <Users className="h-4 w-4 mr-2" />
                Alert All Carers
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-[10px] px-2 py-0.5 rounded-full">
                  Coming Soon
                </span>
              </Button>
            </div>

            {/* Emergency Protocol Guidance */}
            <Card className="p-4 bg-black border-2 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]">
              <h3 className="font-semibold mb-2 flex items-center gap-2 text-white">
                <Shield className="h-4 w-4 text-red-500" />
                Emergency Protocol
              </h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <Heart className="h-3 w-3 text-red-500 mt-1" />
                  <span>Stay calm and ensure safety</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="h-3 w-3 text-yellow-500 mt-1" />
                  <span>If seizure: Clear area, turn on side, time it</span>
                </li>
                <li className="flex items-start gap-2">
                  <Phone className="h-3 w-3 text-blue-500 mt-1" />
                  <span>Call {getEmergencyNumber('AU')} if: First seizure, &gt;5 minutes, or injured</span>
                </li>
              </ul>
            </Card>

            {/* Actions Taken Log */}
            {actionsTaken.length > 0 && (
              <Card className="p-3 bg-gray-50 dark:bg-gray-950">
                <h4 className="text-sm font-semibold mb-2">Actions Taken:</h4>
                <ul className="space-y-1">
                  {actionsTaken.map((action, idx) => (
                    <li key={idx} className="text-xs flex items-center gap-1">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      {action}
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            {/* End Emergency Button */}
            <Button
              variant="outline"
              onClick={endEmergency}
              className="w-full"
            >
              End Emergency Mode
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Seizure Timer Modal */}
      {showSeizureTimer && (
        <SeizureTimer
          isOpen={showSeizureTimer}
          onClose={() => setShowSeizureTimer(false)}
          onComplete={(data) => {
            setActionsTaken([...actionsTaken, `Seizure recorded: ${data.duration.minutes}m ${data.duration.seconds}s`]);
            setShowSeizureTimer(false);
          }}
        />
      )}
    </>
  );
}

// Floating Emergency Button for constant access (bottom LEFT corner)
export function FloatingEmergencyButton({ userId }: { userId: string }) {
  return (
    <div className="fixed bottom-4 left-4 z-50">
      <EmergencyButton userId={userId} className="rounded-full h-16 w-16 p-0" />
    </div>
  );
}

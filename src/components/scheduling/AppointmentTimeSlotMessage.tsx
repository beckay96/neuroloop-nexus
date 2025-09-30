// Appointment Time Slot Component for Messaging Integration
// Allows clinicians to offer appointment times and patients to request/accept them

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Video, Phone, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TimeOption {
  start: string;
  end: string;
  duration: number;
}

interface AppointmentTimeSlotProps {
  slotId: string;
  slotType: 'offer' | 'request' | 'counter_offer';
  offeredBy: string;
  offeredByName: string;
  timeOptions: TimeOption[];
  appointmentType?: string;
  locationType?: 'in_person' | 'video' | 'phone';
  notes?: string;
  status: 'pending' | 'accepted' | 'declined' | 'expired';
  isReceiver: boolean; // Is current user the receiver of this slot
  onAccept?: (selectedIndex: number) => void;
  onDecline?: () => void;
  onCounterOffer?: () => void;
}

export default function AppointmentTimeSlotMessage({
  slotId,
  slotType,
  offeredByName,
  timeOptions,
  appointmentType,
  locationType,
  notes,
  status,
  isReceiver,
  onAccept,
  onDecline,
  onCounterOffer
}: AppointmentTimeSlotProps) {
  const { toast } = useToast();
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const getSlotTypeLabel = () => {
    switch (slotType) {
      case 'offer': return 'Appointment Time Offer';
      case 'request': return 'Appointment Time Request';
      case 'counter_offer': return 'Counter Offer';
    }
  };

  const getLocationIcon = () => {
    switch (locationType) {
      case 'video': return <Video className="h-4 w-4" />;
      case 'phone': return <Phone className="h-4 w-4" />;
      default: return <MapPin className="h-4 w-4" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'accepted': return 'bg-green-500/10 text-green-600 dark:text-green-400';
      case 'declined': return 'bg-red-500/10 text-red-600 dark:text-red-400';
      case 'expired': return 'bg-gray-500/10 text-gray-600 dark:text-gray-400';
      default: return 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400';
    }
  };

  const handleAccept = () => {
    if (selectedOption === null) {
      toast({
        title: "Please Select a Time",
        description: "Choose one of the available time slots before accepting.",
        variant: "destructive"
      });
      return;
    }
    onAccept?.(selectedOption);
    toast({
      title: "Appointment Confirmed",
      description: "The appointment has been added to your calendar.",
    });
  };

  const formatDateTime = (dateTimeStr: string) => {
    const date = new Date(dateTimeStr);
    return {
      date: date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }),
      time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };
  };

  return (
    <Card className={`border-l-4 ${
      slotType === 'offer' 
        ? 'border-l-blue-500 bg-blue-500/5' 
        : slotType === 'request'
        ? 'border-l-purple-500 bg-purple-500/5'
        : 'border-l-orange-500 bg-orange-500/5'
    }`}>
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            <span className="font-semibold text-sm">{getSlotTypeLabel()}</span>
          </div>
          <Badge className={getStatusColor()}>
            {status}
          </Badge>
        </div>

        {/* Appointment Details */}
        <div className="space-y-2 mb-3">
          {appointmentType && (
            <div className="text-sm">
              <span className="font-medium">Type:</span> {appointmentType.replace('_', ' ')}
            </div>
          )}
          {locationType && (
            <div className="flex items-center gap-2 text-sm">
              {getLocationIcon()}
              <span className="capitalize">{locationType}</span>
            </div>
          )}
          {notes && (
            <div className="text-sm text-muted-foreground italic">
              "{notes}"
            </div>
          )}
        </div>

        {/* Time Options */}
        <div className="space-y-2 mb-4">
          <div className="text-sm font-medium">Available Times:</div>
          {timeOptions.map((option, index) => {
            const { date, time } = formatDateTime(option.start);
            const isSelected = selectedOption === index;
            
            return (
              <Card
                key={index}
                className={`cursor-pointer transition-all ${
                  isSelected 
                    ? 'ring-2 ring-primary bg-primary/5' 
                    : 'hover:shadow-md'
                } ${status !== 'pending' && 'opacity-50 cursor-not-allowed'}`}
                onClick={() => {
                  if (status === 'pending' && isReceiver) {
                    setSelectedOption(index);
                  }
                }}
              >
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm">{date}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {time} ({option.duration} minutes)
                      </div>
                    </div>
                    {isSelected && (
                      <Check className="h-5 w-5 text-primary" />
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Actions */}
        {isReceiver && status === 'pending' && (
          <div className="flex gap-2">
            <Button 
              className="flex-1" 
              onClick={handleAccept}
              disabled={selectedOption === null}
            >
              <Check className="h-4 w-4 mr-2" />
              Accept
            </Button>
            {onCounterOffer && (
              <Button 
                variant="outline" 
                onClick={onCounterOffer}
              >
                Counter Offer
              </Button>
            )}
            <Button 
              variant="outline" 
              onClick={onDecline}
            >
              <X className="h-4 w-4 mr-2" />
              Decline
            </Button>
          </div>
        )}

        {/* Status Message */}
        {status === 'accepted' && (
          <div className="bg-green-500/10 border border-green-500/20 rounded p-2 text-sm text-green-600 dark:text-green-400">
            ✓ Appointment confirmed and added to calendar
          </div>
        )}
        {status === 'declined' && (
          <div className="bg-red-500/10 border border-red-500/20 rounded p-2 text-sm text-red-600 dark:text-red-400">
            ✗ Appointment declined
          </div>
        )}
        {status === 'expired' && (
          <div className="bg-gray-500/10 border border-gray-500/20 rounded p-2 text-sm text-gray-600 dark:text-gray-400">
            ⏱ Time slot offer has expired
          </div>
        )}
      </CardContent>
    </Card>
  );
}

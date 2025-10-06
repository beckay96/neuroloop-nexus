import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone, Shield, Mail } from "lucide-react";

interface EmergencyContactStepProps {
  emergencyContactName: string;
  emergencyContactPhone: string;
  carerEmail: string;
  onUpdate: (data: {
    emergencyContactName?: string;
    emergencyContactPhone?: string;
    carerEmail?: string;
  }) => void;
}

export function EmergencyContactStep({
  emergencyContactName,
  emergencyContactPhone,
  carerEmail,
  onUpdate
}: EmergencyContactStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Phone className="h-12 w-12 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-foreground">Emergency Contact</h2>
        <p className="text-muted-foreground">
          Someone who can assist you in emergencies
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="emergencyName" className="text-foreground font-medium">
            Full Name *
          </Label>
          <Input
            id="emergencyName"
            value={emergencyContactName}
            onChange={(e) => onUpdate({ emergencyContactName: e.target.value })}
            placeholder="Enter emergency contact name"
            className="text-lg border-2 focus-visible:border-teal-500 focus-visible:ring-teal-500"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="emergencyPhone" className="text-foreground font-medium">
            Phone Number *
          </Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
            <Input
              id="emergencyPhone"
              type="tel"
              value={emergencyContactPhone}
              onChange={(e) => onUpdate({ emergencyContactPhone: e.target.value })}
              placeholder="+1 (555) 123-4567"
              className="text-lg pl-10 border-2 focus-visible:border-teal-500 focus-visible:ring-teal-500"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="carerEmail" className="text-foreground font-medium">
            Email Address (Optional)
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
            <Input
              id="carerEmail"
              type="email"
              value={carerEmail}
              onChange={(e) => onUpdate({ carerEmail: e.target.value })}
              placeholder="email@example.com"
              className="text-lg pl-10 border-2 focus-visible:border-teal-500 focus-visible:ring-teal-500"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            We'll send them an invite to access the carer portal (optional)
          </p>
        </div>
      </div>

      {/* Info Card */}
      <Card className="p-4 bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Shield className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <div className="font-semibold text-foreground">Why We Need This</div>
            <p className="text-sm text-muted-foreground mt-1">
              In case of a medical emergency or if you need assistance, we can quickly contact your designated person. They'll also receive updates if you give them access to your care data.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

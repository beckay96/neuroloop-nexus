import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { User, Calendar } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface PersonalInfoStepProps {
  firstName: string;
  lastName: string;
  middleName: string;
  gender: string;
  dateOfBirth: Date | undefined;
  onUpdate: (data: {
    firstName?: string;
    lastName?: string;
    middleName?: string;
    gender?: string;
    dateOfBirth?: Date;
  }) => void;
}

export function PersonalInfoStep({
  firstName,
  lastName,
  middleName,
  gender,
  dateOfBirth,
  onUpdate
}: PersonalInfoStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <User className="h-12 w-12 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-foreground">Personal Information</h2>
        <p className="text-muted-foreground">
          Help us personalize your experience
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-foreground font-medium">First Name *</Label>
          <Input
            id="firstName"
            value={firstName}
            onChange={(e) => onUpdate({ firstName: e.target.value })}
            placeholder="Enter your first name"
            className="text-lg border-2 focus-visible:border-teal-500 focus-visible:ring-teal-500"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-foreground font-medium">Last Name *</Label>
          <Input
            id="lastName"
            value={lastName}
            onChange={(e) => onUpdate({ lastName: e.target.value })}
            placeholder="Enter your last name"
            className="text-lg border-2 focus-visible:border-teal-500 focus-visible:ring-teal-500"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="middleName" className="text-foreground font-medium">Middle Name (Optional)</Label>
          <Input
            id="middleName"
            value={middleName}
            onChange={(e) => onUpdate({ middleName: e.target.value })}
            placeholder="Optional"
            className="text-lg border-2 focus-visible:border-teal-500 focus-visible:ring-teal-500"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="gender" className="text-foreground font-medium">Gender *</Label>
          <Select onValueChange={(value) => onUpdate({ gender: value })} value={gender}>
            <SelectTrigger className="text-lg">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent className="bg-popover border border-border z-50">
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="non_binary">Non-binary</SelectItem>
              <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="dob" className="text-foreground font-medium">Date of Birth *</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal text-lg h-12",
                  !dateOfBirth && "text-muted-foreground"
                )}
              >
                <Calendar className="mr-2 h-5 w-5" />
                {dateOfBirth ? format(dateOfBirth, "PPP") : <span>Select your date of birth</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={dateOfBirth}
                onSelect={(date) => onUpdate({ dateOfBirth: date })}
                disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Helpful Info Card */}
      <Card className="p-4 bg-gradient-to-br from-teal-500/10 to-purple-500/10 border-teal-500/20">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <User className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <div className="font-semibold text-foreground">Your Privacy Matters</div>
            <p className="text-sm text-muted-foreground mt-1">
              Your personal information is encrypted and securely stored. We're HIPAA compliant and never share your data without your explicit consent.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

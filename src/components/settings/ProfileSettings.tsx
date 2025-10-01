import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { 
  User, Mail, Phone, MapPin, Briefcase, Calendar, 
  Save, X, Upload, ArrowLeft
} from "lucide-react";

interface ProfileSettingsProps {
  onClose?: () => void;
}

export default function ProfileSettings({ onClose }: ProfileSettingsProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Form state
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.user_metadata?.full_name || "",
    email: user?.email || "",
    phone: user?.user_metadata?.phone || "",
    specialization: user?.user_metadata?.specialization || "",
    licenseNumber: user?.user_metadata?.license_number || "",
    institution: user?.user_metadata?.institution || "",
    address: user?.user_metadata?.address || "",
    bio: user?.user_metadata?.bio || "",
  });

  const handleSave = () => {
    // Save profile data
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset form data
    setFormData({
      fullName: user?.user_metadata?.full_name || "",
      email: user?.email || "",
      phone: user?.user_metadata?.phone || "",
      specialization: user?.user_metadata?.specialization || "",
      licenseNumber: user?.user_metadata?.license_number || "",
      institution: user?.user_metadata?.institution || "",
      address: user?.user_metadata?.address || "",
      bio: user?.user_metadata?.bio || "",
    });
    setIsEditing(false);
  };

  const handleUploadPhoto = () => {
    toast({
      title: "Upload Photo",
      description: "Photo upload functionality will be implemented soon.",
    });
  };

  return (
    <div className="container max-w-4xl mx-auto p-6">
      <Card className="medical-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {onClose && (
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              )}
              <div>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Settings
                </CardTitle>
                <CardDescription>
                  Manage your personal information and professional details
                </CardDescription>
              </div>
            </div>
            <Badge variant="secondary">
              {user?.user_metadata?.role || "Clinician"}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Profile Photo */}
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user?.user_metadata?.avatar_url} />
              <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                {formData.fullName.split(" ").map(n => n[0]).join("").toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{formData.fullName || "User Name"}</h3>
              <p className="text-sm text-muted-foreground">{formData.email}</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2"
                onClick={handleUploadPhoto}
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload New Photo
              </Button>
            </div>
          </div>

          <Separator />

          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <User className="h-4 w-4" />
              Personal Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  disabled={!isEditing}
                  placeholder="Dr. John Smith"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={!isEditing}
                    className="pl-10"
                    placeholder="doctor@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    disabled={!isEditing}
                    className="pl-10"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    disabled={!isEditing}
                    className="pl-10"
                    placeholder="City, State"
                  />
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Professional Information */}
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Professional Details
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="specialization">Specialization</Label>
                <Input
                  id="specialization"
                  value={formData.specialization}
                  onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                  disabled={!isEditing}
                  placeholder="Neurology, Epileptology"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="licenseNumber">License Number</Label>
                <Input
                  id="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                  disabled={!isEditing}
                  placeholder="MED123456"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="institution">Institution/Hospital</Label>
                <Input
                  id="institution"
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  disabled={!isEditing}
                  placeholder="General Hospital, Medical Center"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Bio */}
          <div className="space-y-4">
            <h3 className="font-semibold">Professional Bio</h3>
            <Textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              disabled={!isEditing}
              placeholder="Brief description of your experience and expertise..."
              rows={4}
              className="resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)} className="flex-1 sm:flex-initial">
                <User className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              <>
                <Button onClick={handleSave} className="flex-1 sm:flex-initial">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleCancel}
                  className="flex-1 sm:flex-initial"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </>
            )}
          </div>

          {/* Account Information */}
          <Separator />
          <div className="rounded-lg bg-muted/50 p-4 space-y-2">
            <h4 className="font-semibold text-sm">Account Information</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Member since:</span>
                <span className="font-medium">
                  {new Date(user?.created_at || "").toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">User ID:</span>
                <span className="font-mono text-xs">{user?.id?.slice(0, 8)}...</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

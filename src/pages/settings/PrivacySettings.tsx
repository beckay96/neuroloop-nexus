import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { 
  Shield, ArrowLeft, Lock, Eye, EyeOff, Download, 
  Trash2, Database, Share2, FileText, AlertTriangle
} from "lucide-react";

export default function PrivacySettings() {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [settings, setSettings] = useState({
    shareDataForResearch: true,
    allowDataAnalytics: true,
    shareWithCaregivers: false,
    showProfileToOthers: false,
    allowNotifications: true,
    twoFactorAuth: false,
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    toast({
      title: "Setting Updated",
      description: "Your privacy preference has been saved",
    });
  };

  const handleDownloadData = () => {
    toast({
      title: "Data Export Initiated",
      description: "Your data export will be ready shortly. You'll receive an email when it's ready to download.",
    });
  };

  const handleDeleteAccount = () => {
    toast({
      title: "Account Deletion Requested",
      description: "Please contact support to complete account deletion. This action is irreversible.",
      variant: "destructive",
    });
  };

  return (
    <div className="container max-w-4xl mx-auto p-6">
      <Card className="medical-card">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Privacy & Security
              </CardTitle>
              <CardDescription>
                Manage your data, privacy preferences, and security settings
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Data Sharing */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold flex items-center gap-2 mb-4">
                <Share2 className="h-4 w-4" />
                Data Sharing Preferences
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Control how your health data is used and shared
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div className="space-y-0.5 flex-1">
                  <Label className="text-base">Share Data for Research</Label>
                  <p className="text-sm text-muted-foreground">
                    Help improve treatments by contributing anonymous data to medical research
                  </p>
                </div>
                <Switch
                  checked={settings.shareDataForResearch}
                  onCheckedChange={() => handleToggle('shareDataForResearch')}
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div className="space-y-0.5 flex-1">
                  <Label className="text-base">Allow Data Analytics</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable AI-powered insights and pattern recognition in your health data
                  </p>
                </div>
                <Switch
                  checked={settings.allowDataAnalytics}
                  onCheckedChange={() => handleToggle('allowDataAnalytics')}
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div className="space-y-0.5 flex-1">
                  <Label className="text-base">Share with Caregivers</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow designated caregivers to view your health information
                  </p>
                </div>
                <Switch
                  checked={settings.shareWithCaregivers}
                  onCheckedChange={() => handleToggle('shareWithCaregivers')}
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div className="space-y-0.5 flex-1">
                  <Label className="text-base">Show Profile to Others</Label>
                  <p className="text-sm text-muted-foreground">
                    Make your profile visible in the NeuroLoop community (name and photo only)
                  </p>
                </div>
                <Switch
                  checked={settings.showProfileToOthers}
                  onCheckedChange={() => handleToggle('showProfileToOthers')}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Security Settings */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold flex items-center gap-2 mb-4">
                <Lock className="h-4 w-4" />
                Security Settings
              </h3>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div className="space-y-0.5 flex-1">
                <Label className="text-base">Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account
                </p>
                {settings.twoFactorAuth && (
                  <Badge variant="secondary" className="mt-2">Enabled</Badge>
                )}
              </div>
              <Switch
                checked={settings.twoFactorAuth}
                onCheckedChange={() => handleToggle('twoFactorAuth')}
              />
            </div>

            <div className="p-4 rounded-lg border space-y-3">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-muted-foreground" />
                <Label className="text-base">Change Password</Label>
              </div>
              <p className="text-sm text-muted-foreground">
                Last changed: 30 days ago
              </p>
              <Button variant="outline" size="sm">
                Update Password
              </Button>
            </div>
          </div>

          <Separator />

          {/* Data Management */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold flex items-center gap-2 mb-4">
                <Database className="h-4 w-4" />
                Data Management
              </h3>
            </div>

            <div className="grid gap-4">
              <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={handleDownloadData}>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Download className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">Download Your Data</h4>
                    <p className="text-sm text-muted-foreground">
                      Get a copy of all your health data in a portable format
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">Privacy Policy</h4>
                    <p className="text-sm text-muted-foreground">
                      Read our complete privacy policy and terms of service
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <Separator />

          {/* Danger Zone */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold flex items-center gap-2 mb-2 text-destructive">
                <AlertTriangle className="h-4 w-4" />
                Danger Zone
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                These actions are permanent and cannot be undone
              </p>
            </div>

            <Card className="border-destructive/50 bg-destructive/5">
              <CardContent className="pt-6 space-y-3">
                <div className="flex items-start gap-3">
                  <Trash2 className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-medium text-destructive mb-1">Delete Account</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Permanently delete your account and all associated data. This action cannot be reversed.
                    </p>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={handleDeleteAccount}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete My Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Compliance Notice */}
          <div className="rounded-lg bg-muted/50 p-4">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div className="text-sm space-y-2">
                <p className="font-medium">HIPAA Compliant</p>
                <p className="text-muted-foreground">
                  NeuroLoop is fully HIPAA compliant. Your health data is encrypted end-to-end and stored securely. 
                  We never share your personal health information without your explicit consent.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

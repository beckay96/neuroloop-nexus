import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/components/ThemeProvider";
import { 
  Settings, 
  User, 
  Shield, 
  Bell, 
  HelpCircle, 
  LogOut,
  X,
  Sun,
  Moon,
  Monitor
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface SettingsDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  isMobile?: boolean;
}

export default function SettingsDropdown({ isOpen, onClose, isMobile = false }: SettingsDropdownProps) {
  const { theme, setTheme } = useTheme();
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  if (!isOpen) return null;

  const panelClasses = isMobile 
    ? "fixed inset-x-0 top-16 mx-4 mt-2 z-50" 
    : "absolute right-0 top-12 w-72 z-50";

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/auth", { replace: true });
    } catch (e) {
      console.error("Sign out error", e);
    } finally {
      onClose();
    }
  };

  const settingsItems = [
    {
      icon: User,
      label: "Profile Settings",
      description: "Manage your account",
      action: () => {
        navigate("/settings/profile");
        toast({
          title: "Opening Profile Settings",
          description: "Loading your profile information",
        });
      }
    },
    {
      icon: Shield,
      label: "Privacy & Security",
      description: "Data and privacy controls",
      action: () => {
        navigate("/settings/privacy");
        toast({
          title: "Privacy Settings",
          description: "Manage your data and privacy preferences",
        });
      }
    },
    {
      icon: Bell,
      label: "Notification Settings",
      description: "Manage alerts and reminders",
      action: () => {
        navigate("/settings/notifications");
        toast({
          title: "Notification Settings",
          description: "Configure your notification preferences",
        });
      }
    },
    {
      icon: HelpCircle,
      label: "Help & Support",
      description: "Get help and contact support",
      action: () => {
        window.open("https://support.neuroloop.com", "_blank");
        toast({
          title: "Help Center",
          description: "Opening support documentation",
        });
      }
    }
  ];

  return (
    <>
      {/* Backdrop for mobile */}
      {isMobile && (
        <div 
          className="fixed inset-0 bg-black/20 z-40" 
          onClick={onClose}
        />
      )}
      
      <Card className={`${panelClasses} medical-card bg-card border shadow-floating`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <Settings className="h-4 w-4 text-primary" />
            <h3 className="font-semibold">Settings</h3>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-4 space-y-4">
          {/* Theme Selection */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Theme</Label>
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant={theme === "light" ? "default" : "outline"}
                size="sm"
                onClick={() => handleThemeChange("light")}
                className="flex flex-col items-center gap-1 h-auto py-2"
              >
                <Sun className="h-4 w-4" />
                <span className="text-xs">Light</span>
              </Button>
              <Button
                variant={theme === "dark" ? "default" : "outline"}
                size="sm"
                onClick={() => handleThemeChange("dark")}
                className="flex flex-col items-center gap-1 h-auto py-2"
              >
                <Moon className="h-4 w-4" />
                <span className="text-xs">Dark</span>
              </Button>
              <Button
                variant={theme === "system" ? "default" : "outline"}
                size="sm"
                onClick={() => handleThemeChange("system")}
                className="flex flex-col items-center gap-1 h-auto py-2"
              >
                <Monitor className="h-4 w-4" />
                <span className="text-xs">System</span>
              </Button>
            </div>
          </div>

          <Separator />

          {/* Quick Settings */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Quick Settings</Label>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Push Notifications</p>
                <p className="text-xs text-muted-foreground">Receive medication reminders</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Data Sharing</p>
                <p className="text-xs text-muted-foreground">Share anonymous data for research</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>

          <Separator />

          {/* Settings Menu Items */}
          <div className="space-y-1">
            {settingsItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start h-auto p-3"
                  onClick={() => {
                    item.action();
                    onClose();
                  }}
                >
                  <div className="flex items-center gap-3">
                    <IconComponent className="h-4 w-4 text-muted-foreground" />
                    <div className="text-left">
                      <p className="text-sm font-medium">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </Button>
              );
            })}
          </div>

          <Separator />

          {/* Sign Out */}
          <Button
            variant="ghost"
            className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={handleSignOut}
          >
            <LogOut className="h-4 w-4 mr-3" />
            Sign Out
          </Button>
        </div>
      </Card>
    </>
  );
}
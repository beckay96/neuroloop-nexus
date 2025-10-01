import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/components/ThemeProvider";
import { useNavigate } from "react-router-dom";
import { 
  Brain, 
  ArrowLeft, 
  LogOut, 
  Settings, 
  Bell, 
  Menu,
  Sun,
  Moon,
  User
} from "lucide-react";
import NotificationsPanel from "./NotificationsPanel";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ClinicianHeaderProps {
  userName?: string;
  onNavigateBack?: () => void;
  currentSection?: string;
}

export default function ClinicianHeader({ 
  userName = "Dr. Smith", 
  onNavigateBack,
  currentSection = "Dashboard"
}: ClinicianHeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { signOut } = useAuth();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="border-b bg-card/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Left Section - Logo, Back Button, and Title */}
          <div className="flex items-center gap-3">
            {onNavigateBack && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onNavigateBack}
                className="mr-2"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary">NeuroLoop</h1>
                <p className="text-sm text-muted-foreground hidden sm:block">
                  Clinical {currentSection}
                </p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-1 mr-4">
              <span className="text-sm text-muted-foreground">Welcome,</span>
              <span className="text-sm font-medium">{userName}</span>
            </div>
            
            {/* Notifications */}
            <div className="relative">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-status-critical rounded-full"></span>
              </Button>
              <NotificationsPanel 
                isOpen={showNotifications} 
                onClose={() => setShowNotifications(false)} 
                userType="clinician"
              />
            </div>

            {/* Settings Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => navigate("/settings/profile")}>
                  <User className="mr-2 h-4 w-4" />
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={toggleTheme}>
                  {theme === "dark" ? (
                    <Sun className="mr-2 h-4 w-4" />
                  ) : (
                    <Moon className="mr-2 h-4 w-4" />
                  )}
                  Toggle Theme
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden mt-4 pt-4 border-t space-y-2">
            <div className="flex items-center justify-between py-2">
              <span className="text-sm font-medium">Welcome, {userName}</span>
            </div>
            
            <div className="flex flex-col gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="justify-start"
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowMobileMenu(false);
                }}
              >
                <Bell className="h-4 w-4 mr-2" />
                Notifications
                <span className="ml-auto w-2 h-2 bg-status-critical rounded-full"></span>
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="justify-start"
                onClick={toggleTheme}
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4 mr-2" />
                ) : (
                  <Moon className="h-4 w-4 mr-2" />
                )}
                Toggle Theme
              </Button>

              <Button 
                variant="ghost" 
                size="sm" 
                className="justify-start text-destructive"
                onClick={handleSignOut}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Notifications Panel */}
      <NotificationsPanel 
        isOpen={showNotifications} 
        onClose={() => setShowNotifications(false)} 
        isMobile={true}
        userType="clinician"
      />
    </header>
  );
}
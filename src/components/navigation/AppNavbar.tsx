import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bell, Settings, Menu, Brain } from "lucide-react";
import NotificationsPanel from "./NotificationsPanel";
import SettingsDropdown from "./SettingsDropdown";

interface AppNavbarProps {
  userName?: string;
  title?: string;
}

export default function AppNavbar({ userName = "User", title }: AppNavbarProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <header className="border-b bg-card/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary">NeuroLoop</h1>
              {title && (
                <p className="text-sm text-muted-foreground">{title}</p>
              )}
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
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
              />
            </div>

            {/* Settings */}
            <div className="relative">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowSettings(!showSettings)}
              >
                <Settings className="h-4 w-4" />
              </Button>
              <SettingsDropdown 
                isOpen={showSettings} 
                onClose={() => setShowSettings(false)} 
              />
            </div>
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
          <div className="md:hidden mt-4 pt-4 border-t">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between py-2">
                <span className="text-sm font-medium">Welcome, {userName}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex-1 justify-start"
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
                  className="flex-1 justify-start"
                  onClick={() => {
                    setShowSettings(!showSettings);
                    setShowMobileMenu(false);
                  }}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Notifications Panel */}
      <NotificationsPanel 
        isOpen={showNotifications} 
        onClose={() => setShowNotifications(false)} 
        isMobile={true}
      />
      
      {/* Mobile Settings Dropdown */}
      <SettingsDropdown 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)} 
        isMobile={true}
      />
    </header>
  );
}
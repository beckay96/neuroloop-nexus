import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TabOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface MobileTabDropdownProps {
  tabs: TabOption[];
  selectedTab: string;
  onTabChange: (value: string) => void;
  className?: string;
}

export function MobileTabDropdown({ 
  tabs, 
  selectedTab, 
  onTabChange, 
  className = "" 
}: MobileTabDropdownProps) {
  const [open, setOpen] = useState(false);
  
  const selectedTabData = tabs.find(tab => tab.value === selectedTab);
  
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className={`w-full justify-between bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-border/60 ${className}`}
        >
          <div className="flex items-center gap-2">
            {selectedTabData?.icon}
            <span className="font-medium">{selectedTabData?.label}</span>
          </div>
          <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-full min-w-[250px] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90 border-border/60"
        align="start"
      >
        {tabs.map((tab) => (
          <DropdownMenuItem
            key={tab.value}
            onClick={() => {
              onTabChange(tab.value);
              setOpen(false);
            }}
            className={`flex items-center gap-2 cursor-pointer ${
              selectedTab === tab.value 
                ? 'bg-primary/10 text-primary font-medium' 
                : 'hover:bg-muted/50'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
import { useState, useRef, useEffect } from "react";
import { format, parse, isValid, addYears, subYears } from "date-fns";
import { DayPicker } from "react-day-picker";
import { Calendar as CalendarIcon, X, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { getDateFormatConfig } from "@/utils/regionalDateFormats";
import "react-day-picker/dist/style.css";

interface CustomDatePickerProps {
  label: string;
  value: string; // ISO format YYYY-MM-DD
  onChange: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
  min?: string;
  max?: string;
  id?: string;
  className?: string;
  showFormatHint?: boolean;
}

export function CustomDatePicker({
  label,
  value,
  onChange,
  required = false,
  disabled = false,
  min,
  max,
  id,
  className = "",
  showFormatHint = true
}: CustomDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [displayValue, setDisplayValue] = useState("");
  const [inputFocused, setInputFocused] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState<Date>(new Date());
  const dateConfig = getDateFormatConfig();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Generate year options (1900 - current year + 10)
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: currentYear - 1899 + 10 }, (_, i) => 1900 + i).reverse();
  
  // Month names
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Convert ISO date to regional display format
  const isoToDisplay = (isoDate: string): string => {
    if (!isoDate) return "";
    try {
      const date = parse(isoDate, "yyyy-MM-dd", new Date());
      if (!isValid(date)) return "";
      
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      
      switch (dateConfig.format) {
        case "MM/DD/YYYY":
          return `${month}/${day}/${year}`;
        case "YYYY/MM/DD":
          return `${year}/${month}/${day}`;
        default: // DD/MM/YYYY
          return `${day}/${month}/${year}`;
      }
    } catch {
      return "";
    }
  };

  // Convert display format to ISO
  const displayToISO = (display: string): string => {
    if (!display) return "";
    
    // Remove any non-numeric characters except /
    const cleaned = display.replace(/[^\d/]/g, "");
    const parts = cleaned.split("/").filter(p => p);
    
    if (parts.length !== 3) return "";
    
    let day: string, month: string, year: string;
    
    switch (dateConfig.format) {
      case "MM/DD/YYYY":
        [month, day, year] = parts;
        break;
      case "YYYY/MM/DD":
        [year, month, day] = parts;
        break;
      default: // DD/MM/YYYY
        [day, month, year] = parts;
    }
    
    // Validate
    const dayNum = parseInt(day);
    const monthNum = parseInt(month);
    const yearNum = parseInt(year);
    
    if (dayNum < 1 || dayNum > 31) return "";
    if (monthNum < 1 || monthNum > 12) return "";
    if (yearNum < 1900 || yearNum > 2100) return "";
    
    const isoDate = `${year.padStart(4, "0")}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    
    // Validate the date is real
    const testDate = parse(isoDate, "yyyy-MM-dd", new Date());
    if (!isValid(testDate)) return "";
    
    return isoDate;
  };

  // Initialize display value from prop
  useEffect(() => {
    if (value && !inputFocused) {
      setDisplayValue(isoToDisplay(value));
    }
  }, [value, inputFocused]);

  // Handle input change with smart formatting
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value;
    
    // Remove any non-numeric characters except /
    input = input.replace(/[^\d/]/g, "");
    
    // Auto-add slashes
    if (dateConfig.format === "DD/MM/YYYY" || dateConfig.format === "MM/DD/YYYY") {
      if (input.length === 2 && !input.includes("/")) {
        input += "/";
      } else if (input.length === 5 && input.split("/").length === 2) {
        input += "/";
      }
    } else if (dateConfig.format === "YYYY/MM/DD") {
      if (input.length === 4 && !input.includes("/")) {
        input += "/";
      } else if (input.length === 7 && input.split("/").length === 2) {
        input += "/";
      }
    }
    
    // Limit length
    const maxLength = 10; // DD/MM/YYYY or MM/DD/YYYY or YYYY/MM/DD
    if (input.length <= maxLength) {
      setDisplayValue(input);
      
      // Try to convert to ISO and update if valid
      if (input.length === maxLength) {
        const isoDate = displayToISO(input);
        if (isoDate) {
          onChange(isoDate);
        }
      }
    }
  };

  // Handle input blur
  const handleInputBlur = () => {
    setInputFocused(false);
    const isoDate = displayToISO(displayValue);
    if (isoDate) {
      onChange(isoDate);
      setDisplayValue(isoToDisplay(isoDate)); // Reformat to ensure consistency
    } else if (value) {
      setDisplayValue(isoToDisplay(value)); // Revert to last valid value
    }
  };

  // Handle calendar date selection
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      const isoDate = format(date, "yyyy-MM-dd");
      onChange(isoDate);
      setDisplayValue(isoToDisplay(isoDate));
      setIsOpen(false);
    }
  };

  // Handle clear
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
    setDisplayValue("");
    inputRef.current?.focus();
  };

  // Close calendar when clicking outside (but not on Select dropdown items)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      // Don't close if clicking on Select dropdown content (Radix portals)
      if (target.closest('[role="listbox"]') || target.closest('[data-radix-popper-content-wrapper]')) {
        return;
      }
      
      if (containerRef.current && !containerRef.current.contains(target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  // Get Date object for calendar
  const selectedDate = value ? parse(value, "yyyy-MM-dd", new Date()) : undefined;
  const minDate = min ? parse(min, "yyyy-MM-dd", new Date()) : undefined;
  const maxDate = max ? parse(max, "yyyy-MM-dd", new Date()) : undefined;

  // Initialize calendar month when opening
  useEffect(() => {
    if (isOpen) {
      if (selectedDate && isValid(selectedDate)) {
        setCalendarMonth(selectedDate);
      } else if (maxDate && isValid(maxDate)) {
        setCalendarMonth(maxDate);
      } else {
        setCalendarMonth(new Date());
      }
    }
  }, [isOpen]);

  // Handle month/year changes
  const handleMonthChange = (monthIndex: string) => {
    const newMonth = parseInt(monthIndex);
    const newDate = new Date(calendarMonth.getFullYear(), newMonth, 1);
    setCalendarMonth(newDate);
  };

  const handleYearChange = (year: string) => {
    const newYear = parseInt(year);
    const newDate = new Date(newYear, calendarMonth.getMonth(), 1);
    setCalendarMonth(newDate);
  };

  // Quick navigation handlers
  const goToPreviousYear = () => {
    setCalendarMonth(subYears(calendarMonth, 1));
  };

  const goToNextYear = () => {
    setCalendarMonth(addYears(calendarMonth, 1));
  };

  const goToPreviousMonth = () => {
    const newDate = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1);
    setCalendarMonth(newDate);
  };

  const goToNextMonth = () => {
    const newDate = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1);
    setCalendarMonth(newDate);
  };

  return (
    <div className={cn("relative", className)} ref={containerRef}>
      <Label htmlFor={id} className="text-sm font-medium block mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      
      <div className="relative">
        <Input
          ref={inputRef}
          id={id}
          type="text"
          value={displayValue}
          onChange={handleInputChange}
          onFocus={() => setInputFocused(true)}
          onBlur={handleInputBlur}
          placeholder={dateConfig.placeholder}
          disabled={disabled}
          required={required}
          className="pr-20"
          autoComplete="off"
        />
        
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {displayValue && !disabled && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="h-7 w-7 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X className="h-3.5 w-3.5 text-gray-400" />
            </Button>
          )}
          
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
            disabled={disabled}
            className="h-7 w-7 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <CalendarIcon className="h-4 w-4 text-gray-500" />
          </Button>
        </div>
      </div>

      {showFormatHint && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5 flex items-center gap-1.5">
          <span className="font-medium">Format:</span> {dateConfig.placeholder}
          <span className="text-gray-400">•</span>
          <span className="italic">e.g. {dateConfig.example}</span>
        </p>
      )}

      {/* Calendar Popup */}
      {isOpen && !disabled && (
        <div className="absolute z-50 mt-2 p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl animate-in fade-in-0 zoom-in-95 min-w-[320px] backdrop-blur-sm">
          {/* Custom Header with Month/Year Dropdowns and Navigation */}
          <div className="mb-4 space-y-3">
            {/* Navigation Buttons Row */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex gap-1">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={goToPreviousYear}
                  className="h-8 w-8 p-0"
                  title="Previous Year"
                >
                  <ChevronsLeft className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={goToPreviousMonth}
                  className="h-8 w-8 p-0"
                  title="Previous Month"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex gap-1">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={goToNextMonth}
                  className="h-8 w-8 p-0"
                  title="Next Month"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={goToNextYear}
                  className="h-8 w-8 p-0"
                  title="Next Year"
                >
                  <ChevronsRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Month and Year Dropdowns */}
            <div className="flex gap-2">
              <Select value={calendarMonth.getMonth().toString()} onValueChange={handleMonthChange}>
                <SelectTrigger className="flex-1 h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="max-h-60 bg-popover border border-border z-[60]">
                  {monthNames.map((month, index) => (
                    <SelectItem key={index} value={index.toString()}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={calendarMonth.getFullYear().toString()} onValueChange={handleYearChange}>
                <SelectTrigger className="w-24 h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="max-h-60 bg-popover border border-border z-[60]">
                  {yearOptions.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Calendar Grid */}
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            month={calendarMonth}
            onMonthChange={setCalendarMonth}
            disabled={(date) => {
              if (minDate && date < minDate) return true;
              if (maxDate && date > maxDate) return true;
              return false;
            }}
            className="rdp-custom"
            classNames={{
              months: "flex flex-col",
              month: "space-y-4",
              caption: "hidden", // Hide default caption since we have custom header
              caption_label: "hidden",
              nav: "hidden", // Hide default nav since we have custom buttons
              table: "w-full border-collapse space-y-1",
              head_row: "flex",
              head_cell: "text-gray-500 rounded-md w-9 font-normal text-[0.8rem]",
              row: "flex w-full mt-2",
              cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-gray-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
              day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors inline-flex items-center justify-center cursor-pointer",
              day_range_end: "day-range-end",
              day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-md font-medium",
              day_today: "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-semibold",
              day_outside: "day-outside text-gray-400 opacity-50",
              day_disabled: "text-gray-300 dark:text-gray-600 opacity-50 cursor-not-allowed",
              day_range_middle: "aria-selected:bg-gray-100 aria-selected:text-gray-900",
              day_hidden: "invisible",
            }}
          />
          
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                const today = new Date();
                const isoDate = format(today, "yyyy-MM-dd");
                onChange(isoDate);
                setDisplayValue(isoToDisplay(isoDate));
                setIsOpen(false);
              }}
              className="text-xs"
            >
              Today
            </Button>
            
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-xs"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

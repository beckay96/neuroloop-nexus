import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface DatePickerProps {
  date?: Date;
  onDateChange?: (date: Date | undefined) => void;
  placeholder?: string;
  mode?: "past" | "future" | "all";
  compact?: boolean;
  disabled?: boolean;
  className?: string;
}

export function DatePicker({
  date,
  onDateChange,
  placeholder = "Pick a date",
  mode = "all",
  compact = false,
  disabled = false,
  className,
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
            className
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode={mode}
          compact={compact}
          selected={date}
          onDayClick={onDateChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

// Specific variants for common use cases
export function BirthDatePicker(props: Omit<DatePickerProps, 'mode' | 'placeholder'>) {
  return (
    <DatePicker
      {...props}
      mode="past"
      placeholder="Select your date of birth"
      compact={true}
    />
  );
}

export function AppointmentDatePicker(props: Omit<DatePickerProps, 'mode' | 'placeholder'>) {
  return (
    <DatePicker
      {...props}
      mode="future"
      placeholder="Select appointment date"
      compact={false}
    />
  );
}

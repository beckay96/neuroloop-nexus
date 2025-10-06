import * as React from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";

interface DatePickerWithYearMonthProps {
  date?: Date;
  onSelect?: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: (date: Date) => boolean;
  className?: string;
}

export function DatePickerWithYearMonth({
  date,
  onSelect,
  placeholder = "Pick a date",
  disabled,
  className
}: DatePickerWithYearMonthProps) {
  const [displayMonth, setDisplayMonth] = React.useState(
    date ? date.getMonth() : new Date().getMonth()
  );
  const [displayYear, setDisplayYear] = React.useState(
    date ? date.getFullYear() : new Date().getFullYear()
  );
  const [isOpen, setIsOpen] = React.useState(false);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Generate years from 1900 to current year
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1900 + 1 },
    (_, i) => 1900 + i
  ).reverse();

  const daysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const firstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const handleDateSelect = (day: number) => {
    const selectedDate = new Date(displayYear, displayMonth, day);
    if (disabled && disabled(selectedDate)) {
      return;
    }
    onSelect?.(selectedDate);
    setIsOpen(false);
  };

  const handlePreviousMonth = () => {
    if (displayMonth === 0) {
      setDisplayMonth(11);
      setDisplayYear(displayYear - 1);
    } else {
      setDisplayMonth(displayMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (displayMonth === 11) {
      setDisplayMonth(0);
      setDisplayYear(displayYear + 1);
    } else {
      setDisplayMonth(displayMonth + 1);
    }
  };

  const renderCalendar = () => {
    const days = [];
    const totalDays = daysInMonth(displayMonth, displayYear);
    const firstDay = firstDayOfMonth(displayMonth, displayYear);

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2" />);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= totalDays; day++) {
      const currentDate = new Date(displayYear, displayMonth, day);
      const isSelected =
        date &&
        date.getDate() === day &&
        date.getMonth() === displayMonth &&
        date.getFullYear() === displayYear;
      const isDisabled = disabled && disabled(currentDate);

      days.push(
        <button
          key={day}
          onClick={() => handleDateSelect(day)}
          disabled={isDisabled}
          className={cn(
            "p-2 text-sm rounded-md hover:bg-accent transition-colors",
            "disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent",
            isSelected && "bg-primary text-primary-foreground hover:bg-primary/90",
            !isSelected && !isDisabled && "hover:bg-accent"
          )}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-3 space-y-4">
          {/* Month and Year Selectors */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={handlePreviousMonth}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <Select
              value={displayMonth.toString()}
              onValueChange={(value) => setDisplayMonth(parseInt(value))}
            >
              <SelectTrigger className="h-7 flex-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="max-h-[200px]">
                {months.map((month, index) => (
                  <SelectItem key={index} value={index.toString()}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={displayYear.toString()}
              onValueChange={(value) => setDisplayYear(parseInt(value))}
            >
              <SelectTrigger className="h-7 w-[100px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="max-h-[200px]">
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={handleNextMonth}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Calendar Grid */}
          <div className="space-y-2">
            {/* Day labels */}
            <div className="grid grid-cols-7 gap-1">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                <div
                  key={day}
                  className="p-2 text-center text-xs font-medium text-muted-foreground"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar days */}
            <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

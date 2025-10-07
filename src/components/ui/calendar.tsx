import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = Omit<React.ComponentProps<typeof DayPicker>, 'mode'> & {
  mode?: "past" | "future" | "all";
  compact?: boolean;
};

function Calendar({ 
  className, 
  classNames, 
  showOutsideDays = true, 
  mode = "all",
  compact = false,
  ...props 
}: CalendarProps) {
  // Calculate date restrictions based on mode
  const getDateRestrictions = () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    
    switch (mode) {
      case "past":
        return {
          disabled: (date: Date) => date > today,
          fromYear: 1900,
          toYear: currentYear,
        };
      case "future":
        return {
          disabled: (date: Date) => date < today,
          fromYear: currentYear,
          toYear: currentYear + 10,
        };
      default:
        return {
          fromYear: 1900,
          toYear: currentYear + 10,
        };
    }
  };

  const dateRestrictions = getDateRestrictions();
  
  // If we have a selected date, default to that month/year, otherwise use current date
  const defaultMonth = (props.selected instanceof Date) ? props.selected : new Date();
  
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      captionLayout="dropdown-buttons"
      fromYear={dateRestrictions.fromYear}
      toYear={dateRestrictions.toYear}
      disabled={dateRestrictions.disabled}
      defaultMonth={defaultMonth}
      className={cn(compact ? "p-2" : "p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-2 sm:space-x-2 sm:space-y-0",
        month: compact ? "space-y-2" : "space-y-3",
        caption: "flex flex-col-reverse items-center pt-1 pb-2 space-y-reverse space-y-2",
        caption_label: "text-sm font-medium hidden", // Hide the duplicate label
        nav: "flex justify-between w-full px-1",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          compact ? "h-7 w-7 bg-transparent p-0 opacity-60 hover:opacity-100 transition-opacity" : "h-8 w-8 bg-transparent p-0 opacity-60 hover:opacity-100 transition-opacity",
        ),
        nav_button_previous: "",
        nav_button_next: "",
        caption_dropdowns: "flex gap-2 justify-center items-center",
        dropdown: "px-2.5 py-1.5 rounded-md border bg-background text-sm font-normal appearance-none cursor-pointer hover:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary transition-colors",
        dropdown_month: "px-2.5 py-1.5 rounded-md border bg-background text-sm font-normal appearance-none cursor-pointer hover:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary transition-colors",
        dropdown_year: "px-2.5 py-1.5 rounded-md border bg-background text-sm font-normal appearance-none cursor-pointer hover:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary transition-colors",
        table: compact ? "w-full border-collapse space-y-0.5" : "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: compact ? "text-muted-foreground rounded-md w-8 font-normal text-[0.75rem]" : "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: compact ? "flex w-full mt-1" : "flex w-full mt-2",
        cell: compact ? "h-8 w-8 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20" : "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(buttonVariants({ variant: "ghost" }), compact ? "h-8 w-8 p-0 font-normal aria-selected:opacity-100" : "h-9 w-9 p-0 font-normal aria-selected:opacity-100"),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ..._props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ..._props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };

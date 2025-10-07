import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = Omit<React.ComponentProps<typeof DayPicker>, "mode"> & {
  /** Limit which dates are pickable. */
  mode?: "past" | "future" | "all";
  /** Slightly tighter spacing for dense UIs. */
  compact?: boolean;
};

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  mode = "all",
  compact = false,
  disabled,             // allow consumer to still pass a disabled predicate/range
  ...props
}: CalendarProps) {
  // Compute restrictions based on the "mode" prop and merge with user "disabled"
  const dateRestrictions = React.useMemo(() => {
    const today = new Date();
    const y = today.getFullYear();

    const clamp: { fromYear: number; toYear: number; disabled?: (d: Date) => boolean } = {
      fromYear: 1900,
      toYear: y + 10
    };

    if (mode === "past") {
      clamp.toYear = y;
      clamp.disabled = (d: Date) => d > today;
    } else if (mode === "future") {
      clamp.fromYear = y;
      clamp.disabled = (d: Date) => d < today;
    }

    // Merge any incoming disabled option (predicate or matcher). If both exist,
    // we OR them so either condition will disable the date.
    const mergedDisabled =
      typeof disabled === "function" && typeof clamp.disabled === "function"
        ? (d: Date) => disabled(d) || clamp.disabled!(d)
        : clamp.disabled ?? disabled;

    return { ...clamp, disabled: mergedDisabled };
  }, [mode, disabled]);

  // Default visible month respects a selected date when provided.
  const defaultMonth =
    props.selected instanceof Date
      ? props.selected
      : Array.isArray(props.selected) && props.selected?.[0] instanceof Date
      ? props.selected[0]
      : new Date();

  const size = compact ? { cell: "h-8 w-8", text: "text-[0.8rem]", pad: "p-2" }
                       : { cell: "h-9 w-9", text: "text-sm", pad: "p-3" };

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      captionLayout="dropdown-buttons"
      fromYear={dateRestrictions.fromYear}
      toYear={dateRestrictions.toYear}
      disabled={dateRestrictions.disabled}
      defaultMonth={defaultMonth}
      className={cn(
        // elevated popover-like panel with better contrast in dark mode
        "rounded-xl border bg-popover text-popover-foreground shadow-sm",
        size.pad,
        className
      )}
      classNames={{
        // Layout
        months: "flex flex-col sm:flex-row sm:space-x-3 space-y-3 sm:space-y-0",
        month: "space-y-2",
        table: "w-full border-collapse",
        row: "flex w-full mt-2",
        head_row: "flex",
        // Caption & navigation
        caption: "flex flex-col-reverse items-center gap-2 pt-1 pb-2",
        caption_label: "sr-only", // keep for a11y; we show dropdowns instead
        nav: "flex w-full items-center justify-between px-1",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-8 w-8 p-0 bg-transparent opacity-80 hover:opacity-100 " +
            "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 " +
            "disabled:opacity-40"
        ),
        nav_button_previous: "",
        nav_button_next: "",
        caption_dropdowns: "flex items-center justify-center gap-2",
        dropdown:
          "px-3 py-2 rounded-md border bg-background text-sm font-normal cursor-pointer " +
          "hover:border-primary/50 focus:outline-none focus-visible:ring-2 " +
          "focus-visible:ring-primary/50 focus-visible:ring-offset-2",
        dropdown_month:
          "px-3 py-2 rounded-md border bg-background text-sm cursor-pointer " +
          "hover:border-primary/50 focus:outline-none focus-visible:ring-2 " +
          "focus-visible:ring-primary/50 focus-visible:ring-offset-2",
        dropdown_year:
          "px-3 py-2 rounded-md border bg-background text-sm cursor-pointer " +
          "hover:border-primary/50 focus:outline-none focus-visible:ring-2 " +
          "focus-visible:ring-primary/50 focus-visible:ring-offset-2",
        // Head cells
        head_cell: cn(
          "text-muted-foreground rounded-md font-medium",
          compact ? "w-8 text-[0.72rem]" : "w-9 text-[0.8rem]"
        ),
        // Day cells
        cell: cn(
          size.cell,
          "text-center text-sm p-0 relative focus-within:relative focus-within:z-20 " +
            // nice range rounding
            "[&:has([aria-selected].day-range-end)]:rounded-r-md " +
            "[&:has([aria-selected].day-outside)]:bg-accent/50 " +
            "[&:has([aria-selected])]:bg-accent " +
            "first:[&:has([aria-selected])]:rounded-l-md " +
            "last:[&:has([aria-selected])]:rounded-r-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          size.cell,
          "p-0 font-normal aria-selected:opacity-100 transition-colors " +
            "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
        ),
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground " +
          "focus:bg-primary focus:text-primary-foreground",
        day_today:
          "relative bg-accent text-accent-foreground " +
          "after:absolute after:inset-x-1/4 after:bottom-1 after:h-[2px] after:rounded-full after:bg-primary/80",
        day_outside:
          "day-outside text-muted-foreground opacity-60 aria-selected:bg-accent/50 " +
          "aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-40 line-through",
        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames
      }}
      components={{
        IconLeft: (p) => <ChevronLeft aria-hidden className="h-4 w-4" {...p} />,
        IconRight: (p) => <ChevronRight aria-hidden className="h-4 w-4" {...p} />
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
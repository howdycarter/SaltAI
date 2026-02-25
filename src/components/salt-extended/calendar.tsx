"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";

import { buttonVariants } from "./button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-base font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: cn(
          "rounded-md w-9 font-normal text-[0.8rem]",
          "text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))]",
        ),
        row: "flex w-full mt-2",
        cell: cn(
          "h-9 w-9 text-center text-base p-0 relative",
          "[&:has([aria-selected].day-range-end)]:rounded-r-md",
          "[&:has([aria-selected].day-outside)]:bg-[var(--salt-actionable-secondary-background-hover,theme(colors.accent.DEFAULT))]/50",
          "[&:has([aria-selected])]:bg-[var(--salt-actionable-secondary-background-hover,theme(colors.accent.DEFAULT))]",
          "first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md",
          "focus-within:relative focus-within:z-20",
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
        ),
        day_range_end: "day-range-end",
        day_selected: cn(
          "bg-[var(--salt-actionable-cta-background,#0060f0)] text-white",
          "hover:bg-[var(--salt-actionable-cta-background-hover,#004abf)] hover:text-white",
          "focus:bg-[var(--salt-actionable-cta-background,#0060f0)] focus:text-white",
        ),
        day_today: cn(
          "bg-[var(--salt-actionable-secondary-background-hover,theme(colors.accent.DEFAULT))]",
          "text-[var(--salt-content-primary-foreground,theme(colors.accent.foreground))]",
        ),
        day_outside: cn(
          "day-outside opacity-50 aria-selected:opacity-30",
          "text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))]",
        ),
        day_disabled:
          "text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))] opacity-50",
        day_range_middle:
          "aria-selected:bg-[var(--salt-actionable-secondary-background-hover,theme(colors.accent.DEFAULT))] aria-selected:text-[var(--salt-content-primary-foreground,theme(colors.accent.foreground))]",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) =>
          orientation === "left" ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          ),
      }}
      {...props}
    />
  );
}

Calendar.displayName = "Calendar";

export { Calendar };

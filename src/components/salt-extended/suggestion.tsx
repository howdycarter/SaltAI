"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface SuggestionProps extends React.ComponentProps<"button"> {
  icon?: React.ReactNode;
}

function Suggestion({ className, icon, children, ...props }: SuggestionProps) {
  return (
    <button
      data-slot="suggestion"
      type="button"
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-4 py-2",
        "text-base whitespace-nowrap",
        "border-[var(--salt-container-borderColor,theme(colors.border))] border",
        "bg-[var(--salt-container-primary-background,theme(colors.background))]",
        "text-[var(--salt-content-primary-foreground,theme(colors.foreground))]",
        "hover:bg-[var(--salt-container-secondary-background,theme(colors.muted.DEFAULT))]",
        "transition-colors duration-150",
        "disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
}

function SuggestionGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="suggestion-group"
      className={cn(
        "scrollbar-none flex gap-2 overflow-x-auto pb-1",
        className,
      )}
      {...props}
    />
  );
}

export { Suggestion, SuggestionGroup };

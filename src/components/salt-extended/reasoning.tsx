"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface ReasoningProps extends React.ComponentProps<"div"> {
  title?: string;
  duration?: number;
  defaultOpen?: boolean;
}

function Reasoning({
  className,
  title = "Thinking",
  duration,
  defaultOpen = false,
  children,
  ...props
}: ReasoningProps) {
  const [open, setOpen] = React.useState(defaultOpen);

  const formatDuration = (ms: number) => {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(1)}s`;
  };

  return (
    <div
      data-slot="reasoning"
      className={cn(
        "overflow-hidden rounded-lg",
        "border-[var(--salt-container-borderColor,theme(colors.border))] border",
        className,
      )}
      {...props}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "flex w-full items-center gap-2 px-4 py-2.5",
          "bg-[var(--salt-container-secondary-background,theme(colors.muted.DEFAULT))]",
          "text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))]",
          "text-base",
          "transition-opacity hover:opacity-80",
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(
            "transition-transform duration-200",
            open && "rotate-90",
          )}
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
        <span className="font-medium">{title}</span>
        {duration != null && (
          <span className="ml-auto text-base opacity-60">
            {formatDuration(duration)}
          </span>
        )}
      </button>
      {open && (
        <div
          className={cn(
            "px-4 py-3 text-base",
            "bg-[var(--salt-container-primary-background,theme(colors.background))]",
            "text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))]",
            "border-[var(--salt-container-borderColor,theme(colors.border))] border-t",
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}

export { Reasoning };
export type { ReasoningProps };

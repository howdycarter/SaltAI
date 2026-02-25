"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface BranchProps extends React.ComponentProps<"div"> {
  current: number;
  total: number;
  onPrevious?: () => void;
  onNext?: () => void;
}

function Branch({
  className,
  current,
  total,
  onPrevious,
  onNext,
  ...props
}: BranchProps) {
  return (
    <div
      data-slot="branch"
      className={cn(
        "inline-flex items-center gap-1 rounded-md",
        "text-base font-medium",
        "text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))]",
        className,
      )}
      {...props}
    >
      <button
        type="button"
        onClick={onPrevious}
        disabled={current <= 1}
        className={cn(
          "rounded p-1 transition-colors",
          "hover:bg-[var(--salt-container-secondary-background,theme(colors.muted.DEFAULT))]",
          "disabled:pointer-events-none disabled:opacity-30",
        )}
        aria-label="Previous version"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>
      <span>
        {current} of {total}
      </span>
      <button
        type="button"
        onClick={onNext}
        disabled={current >= total}
        className={cn(
          "rounded p-1 transition-colors",
          "hover:bg-[var(--salt-container-secondary-background,theme(colors.muted.DEFAULT))]",
          "disabled:pointer-events-none disabled:opacity-30",
        )}
        aria-label="Next version"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>
    </div>
  );
}

export { Branch };
export type { BranchProps };

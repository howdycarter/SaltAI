"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface CheckpointProps extends React.ComponentProps<"div"> {
  label: string;
  timestamp?: string;
  onRestore?: () => void;
}

function Checkpoint({
  className,
  label,
  timestamp,
  onRestore,
  ...props
}: CheckpointProps) {
  return (
    <div
      data-slot="checkpoint"
      className={cn(
        "flex items-center gap-3 rounded-lg px-4 py-2.5",
        "border-[var(--salt-container-borderColor,theme(colors.border))] border border-dashed",
        "bg-[var(--salt-container-secondary-background,theme(colors.muted.DEFAULT))]",
        className,
      )}
      {...props}
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
        className="text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))] shrink-0"
      >
        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
        <polyline points="17 21 17 13 7 13 7 21" />
        <polyline points="7 3 7 8 15 8" />
      </svg>
      <div className="min-w-0 flex-1">
        <p className="text-[var(--salt-content-primary-foreground,theme(colors.foreground))] text-base font-medium">
          {label}
        </p>
        {timestamp && (
          <p className="text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))] text-base">
            {timestamp}
          </p>
        )}
      </div>
      {onRestore && (
        <button
          type="button"
          onClick={onRestore}
          className={cn(
            "rounded px-2 py-1 text-base font-medium",
            "text-[var(--salt-palette-interact-background,theme(colors.primary.DEFAULT))]",
            "hover:bg-[var(--salt-container-primary-background,theme(colors.background))]",
            "transition-colors",
          )}
        >
          Restore
        </button>
      )}
    </div>
  );
}

export { Checkpoint };
export type { CheckpointProps };

"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface ConfirmationProps extends React.ComponentProps<"div"> {
  title: string;
  description?: string;
  action?: string;
  onApprove?: () => void;
  onReject?: () => void;
  variant?: "default" | "destructive";
}

function Confirmation({
  className,
  title,
  description,
  action,
  onApprove,
  onReject,
  variant = "default",
  ...props
}: ConfirmationProps) {
  return (
    <div
      data-slot="confirmation"
      className={cn(
        "rounded-lg p-4",
        "border-[var(--salt-container-borderColor,theme(colors.border))] border",
        "bg-[var(--salt-container-primary-background,theme(colors.background))]",
        variant === "destructive" && "border-red-500/30",
        className,
      )}
      {...props}
    >
      <p
        className={cn(
          "text-base font-medium",
          "text-[var(--salt-content-primary-foreground,theme(colors.foreground))]",
        )}
      >
        {title}
      </p>
      {description && (
        <p
          className={cn(
            "mt-1 text-base",
            "text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))]",
          )}
        >
          {description}
        </p>
      )}
      {action && (
        <div
          className={cn(
            "mt-3 rounded-md px-3 py-2 font-mono text-base",
            "bg-[var(--salt-container-secondary-background,theme(colors.muted.DEFAULT))]",
            "text-[var(--salt-content-primary-foreground,theme(colors.foreground))]",
          )}
        >
          {action}
        </div>
      )}
      <div className="mt-4 flex items-center gap-2">
        <button
          type="button"
          onClick={onApprove}
          className={cn(
            "rounded-md px-4 py-1.5 text-base font-medium transition-colors",
            variant === "destructive"
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-[var(--salt-palette-interact-background,theme(colors.primary.DEFAULT))] text-[var(--salt-palette-interact-foreground,theme(colors.primary.foreground))] hover:opacity-90",
          )}
        >
          Approve
        </button>
        <button
          type="button"
          onClick={onReject}
          className={cn(
            "rounded-md px-4 py-1.5 text-base font-medium transition-colors",
            "border-[var(--salt-container-borderColor,theme(colors.border))] border",
            "text-[var(--salt-content-primary-foreground,theme(colors.foreground))]",
            "hover:bg-[var(--salt-container-secondary-background,theme(colors.muted.DEFAULT))]",
          )}
        >
          Reject
        </button>
      </div>
    </div>
  );
}

export { Confirmation };
export type { ConfirmationProps };

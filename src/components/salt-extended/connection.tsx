"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type ConnectionStatus = "connected" | "disconnected" | "error" | "connecting";

interface ConnectionProps extends React.ComponentProps<"div"> {
  status?: ConnectionStatus;
  label?: string;
  showLabel?: boolean;
}

const statusConfig: Record<
  ConnectionStatus,
  { color: string; pulseColor: string; defaultLabel: string }
> = {
  connected: {
    color: "bg-emerald-500",
    pulseColor: "bg-emerald-400",
    defaultLabel: "Connected",
  },
  disconnected: {
    color:
      "bg-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))]",
    pulseColor: "",
    defaultLabel: "Disconnected",
  },
  error: {
    color: "bg-red-500",
    pulseColor: "bg-red-400",
    defaultLabel: "Error",
  },
  connecting: {
    color: "bg-amber-500",
    pulseColor: "bg-amber-400",
    defaultLabel: "Connecting",
  },
};

function Connection({
  className,
  status = "disconnected",
  label,
  showLabel = true,
  ...props
}: ConnectionProps) {
  const config = statusConfig[status];
  const displayLabel = label ?? config.defaultLabel;

  return (
    <div
      data-slot="connection"
      className={cn("inline-flex items-center gap-2", className)}
      role="status"
      aria-label={displayLabel}
      {...props}
    >
      <span className="relative flex h-2.5 w-2.5">
        {(status === "connected" || status === "connecting") && (
          <span
            className={cn(
              "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
              config.pulseColor,
            )}
          />
        )}
        <span
          className={cn(
            "relative inline-flex h-2.5 w-2.5 rounded-full",
            config.color,
          )}
        />
      </span>
      {showLabel && (
        <span
          className={cn(
            "text-base font-medium",
            "text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))]",
          )}
        >
          {displayLabel}
        </span>
      )}
    </div>
  );
}

export { Connection };
export type { ConnectionProps, ConnectionStatus };

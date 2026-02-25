"use client";

import * as React from "react";

import {
  ActionButton,
  Actions,
  ChainOfThought,
} from "@/components/salt-extended";
import { cn } from "@/lib/utils";
import type { Alert, AlertSeverity, AlertStatus } from "@/types/alerts";

interface AlertCardProps {
  alert: Alert;
  onAcknowledge?: () => void;
  onResolve?: () => void;
  onWatch?: () => void;
  className?: string;
}

const severityConfig: Record<AlertSeverity, { badge: string; dot: string }> = {
  critical: {
    badge: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400",
    dot: "bg-red-500",
  },
  warning: {
    badge: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
    dot: "bg-amber-500",
  },
  info: {
    badge: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
    dot: "bg-blue-500",
  },
};

const statusLabel: Record<AlertStatus, string> = {
  open: "Open",
  acknowledged: "Acknowledged",
  resolved: "Resolved",
};

function CheckIcon() {
  return (
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
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function CheckCheckIcon() {
  return (
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
      aria-hidden="true"
    >
      <path d="M18 6 7 17l-5-5" />
      <path d="m22 10-9.37 9.37a.5.5 0 0 1-.7 0L10 17.5" />
    </svg>
  );
}

function EyeIcon() {
  return (
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
      aria-hidden="true"
    >
      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function AlertCard({
  alert,
  onAcknowledge,
  onResolve,
  onWatch,
  className,
}: AlertCardProps) {
  const severity = severityConfig[alert.severity];

  return (
    <div
      data-slot="alert-card"
      className={cn(
        "space-y-3 rounded-lg p-4",
        "border-[var(--salt-container-borderColor,theme(colors.border))] border",
        "bg-[var(--salt-container-primary-background,theme(colors.background))]",
        className,
      )}
    >
      {/* Header: severity badge + title */}
      <div className="flex items-start gap-2">
        <span
          className={cn(
            "inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-0.5 text-base font-medium",
            severity.badge,
          )}
        >
          <span className={cn("h-1.5 w-1.5 rounded-full", severity.dot)} />
          {alert.severity}
        </span>
        <h3 className="text-[var(--salt-content-primary-foreground,theme(colors.foreground))] text-base leading-snug font-semibold">
          {alert.title}
        </h3>
      </div>

      {/* Description */}
      <p className="text-[var(--salt-content-primary-foreground,theme(colors.foreground))] text-base leading-relaxed">
        {alert.description}
      </p>

      {/* Chain of Thought */}
      {alert.chainSteps && alert.chainSteps.length > 0 && (
        <ChainOfThought steps={alert.chainSteps} />
      )}

      {/* Meta: status + source + lob */}
      <div className="text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))] flex flex-wrap items-center gap-2 text-base">
        <span
          className={cn(
            "inline-flex items-center rounded-full px-2 py-0.5 font-medium",
            "border-[var(--salt-container-borderColor,theme(colors.border))] border",
          )}
        >
          {statusLabel[alert.status]}
        </span>
        <span>{alert.source}</span>
        <span aria-hidden="true">/</span>
        <span>{alert.lob}</span>
      </div>

      {/* Actions */}
      <Actions>
        {onAcknowledge && (
          <ActionButton
            onClick={onAcknowledge}
            aria-label="Acknowledge alert"
            title="Acknowledge"
          >
            <CheckIcon />
          </ActionButton>
        )}
        {onResolve && (
          <ActionButton
            onClick={onResolve}
            aria-label="Resolve alert"
            title="Resolve"
          >
            <CheckCheckIcon />
          </ActionButton>
        )}
        {onWatch && (
          <ActionButton
            onClick={onWatch}
            aria-label={
              alert.watchlisted ? "Remove from watchlist" : "Add to watchlist"
            }
            title={alert.watchlisted ? "Unwatch" : "Watch"}
            variant={alert.watchlisted ? "active" : "default"}
          >
            <EyeIcon />
          </ActionButton>
        )}
      </Actions>
    </div>
  );
}

export { AlertCard };
export type { AlertCardProps };

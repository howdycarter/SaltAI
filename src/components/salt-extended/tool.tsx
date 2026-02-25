"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type ToolStatus = "running" | "completed" | "error";

interface ToolProps extends React.ComponentProps<"div"> {
  name: string;
  description?: string;
  status?: ToolStatus;
  params?: Record<string, unknown>;
  output?: string;
  duration?: number;
}

const statusStyles: Record<ToolStatus, string> = {
  running: "border-amber-500/30 bg-amber-500/5",
  completed: "border-emerald-500/30 bg-emerald-500/5",
  error: "border-red-500/30 bg-red-500/5",
};

const statusLabel: Record<ToolStatus, string> = {
  running: "Running",
  completed: "Done",
  error: "Error",
};

function Tool({
  className,
  name,
  description,
  status = "completed",
  params,
  output,
  duration,
  ...props
}: ToolProps) {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <div
      data-slot="tool"
      className={cn(
        "overflow-hidden rounded-lg border",
        statusStyles[status],
        className,
      )}
      {...props}
    >
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center gap-2 px-4 py-2.5 text-left"
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
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
        <span className="text-[var(--salt-content-primary-foreground,theme(colors.foreground))] flex-1 truncate text-base font-medium">
          {name}
        </span>
        <span
          className={cn(
            "rounded-full px-1.5 py-0.5 text-base font-medium",
            status === "running" && "bg-amber-100 text-amber-600",
            status === "completed" && "bg-emerald-100 text-emerald-600",
            status === "error" && "bg-red-100 text-red-600",
          )}
        >
          {statusLabel[status]}
        </span>
        {duration != null && (
          <span className="text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))] text-base">
            {duration}ms
          </span>
        )}
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
          className={cn("transition-transform", expanded && "rotate-180")}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {expanded && (
        <div className="border-[var(--salt-container-borderColor,theme(colors.border))] bg-[var(--salt-container-primary-background,theme(colors.background))] border-t">
          {description && (
            <p className="text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))] px-4 py-2 text-base">
              {description}
            </p>
          )}
          {params && Object.keys(params).length > 0 && (
            <div className="border-[var(--salt-container-borderColor,theme(colors.border))] border-t px-4 py-2">
              <p className="text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))] mb-1 text-base font-medium tracking-wider uppercase">
                Parameters
              </p>
              <pre className="overflow-x-auto font-mono text-base">
                {JSON.stringify(params, null, 2)}
              </pre>
            </div>
          )}
          {output && (
            <div className="border-[var(--salt-container-borderColor,theme(colors.border))] border-t px-4 py-2">
              <p className="text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))] mb-1 text-base font-medium tracking-wider uppercase">
                Output
              </p>
              <pre className="overflow-x-auto font-mono text-base whitespace-pre-wrap">
                {output}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export { Tool };
export type { ToolProps, ToolStatus };

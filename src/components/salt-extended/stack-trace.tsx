"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface StackFrame {
  file: string;
  line?: number;
  column?: number;
  method?: string;
  isApp?: boolean;
}

interface StackTraceProps extends React.ComponentProps<"div"> {
  error: string;
  message?: string;
  frames?: StackFrame[];
}

function StackTrace({
  className,
  error,
  message,
  frames = [],
  ...props
}: StackTraceProps) {
  return (
    <div
      data-slot="stack-trace"
      className={cn(
        "overflow-hidden rounded-lg font-mono text-base",
        "border border-red-500/30",
        "bg-[var(--salt-container-primary-background,theme(colors.background))]",
        className,
      )}
      {...props}
    >
      <div className="border-b border-red-500/20 bg-red-500/10 px-4 py-3">
        <p className="font-bold text-red-500">{error}</p>
        {message && <p className="mt-1 text-base text-red-400/80">{message}</p>}
      </div>
      {frames.length > 0 && (
        <div className="divide-[var(--salt-container-borderColor,theme(colors.border))] divide-y">
          {frames.map((frame, i) => (
            <div
              key={i}
              className={cn(
                "flex items-baseline gap-2 px-4 py-2 text-base",
                frame.isApp
                  ? "text-[var(--salt-content-primary-foreground,theme(colors.foreground))]"
                  : "text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))] opacity-60",
              )}
            >
              {frame.method && (
                <span className="shrink-0 font-medium">{frame.method}</span>
              )}
              <span className="truncate">{frame.file}</span>
              {frame.line != null && (
                <span className="text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))] shrink-0">
                  :{frame.line}
                  {frame.column != null ? `:${frame.column}` : ""}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export { StackTrace };
export type { StackFrame, StackTraceProps };

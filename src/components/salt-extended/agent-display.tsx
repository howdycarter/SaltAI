"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface AgentTool {
  name: string;
  status: "idle" | "active" | "done";
}

interface AgentDisplayProps extends React.ComponentProps<"div"> {
  name: string;
  jobRole?: string;
  status?: "idle" | "working" | "done" | "error";
  tools?: AgentTool[];
  currentTask?: string;
}

function AgentDisplay({
  className,
  name,
  jobRole,
  status = "idle",
  tools,
  currentTask,
  ...props
}: AgentDisplayProps) {
  return (
    <div
      data-slot="agent-display"
      className={cn(
        "overflow-hidden rounded-lg",
        "border-[var(--salt-container-borderColor,theme(colors.border))] border",
        "bg-[var(--salt-container-primary-background,theme(colors.background))]",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "flex items-center gap-3 px-4 py-3",
          "bg-[var(--salt-container-secondary-background,theme(colors.muted.DEFAULT))]",
          "border-[var(--salt-container-borderColor,theme(colors.border))] border-b",
        )}
      >
        <div
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-base font-bold",
            "bg-[var(--salt-palette-interact-background,theme(colors.primary.DEFAULT))]",
            "text-[var(--salt-palette-interact-foreground,theme(colors.primary.foreground))]",
          )}
        >
          {name.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[var(--salt-content-primary-foreground,theme(colors.foreground))] text-base font-medium">
            {name}
          </p>
          {jobRole && (
            <p className="text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))] text-base">
              {jobRole}
            </p>
          )}
        </div>
        <span
          className={cn(
            "rounded-full px-2 py-0.5 text-base font-medium",
            status === "working" && "bg-amber-100 text-amber-600",
            status === "done" && "bg-emerald-100 text-emerald-600",
            status === "error" && "bg-red-100 text-red-600",
            status === "idle" &&
              "text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))] bg-[var(--salt-container-secondary-background,theme(colors.muted.DEFAULT))]",
          )}
        >
          {status}
        </span>
      </div>
      {currentTask && (
        <div className="border-[var(--salt-container-borderColor,theme(colors.border))] border-b px-4 py-2 text-base">
          <span className="text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))]">
            Current:{" "}
          </span>
          <span className="text-[var(--salt-content-primary-foreground,theme(colors.foreground))]">
            {currentTask}
          </span>
        </div>
      )}
      {tools && tools.length > 0 && (
        <div className="px-4 py-2">
          <p className="text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))] mb-1.5 text-base font-medium tracking-wider uppercase">
            Tools
          </p>
          <div className="flex flex-wrap gap-1">
            {tools.map((tool) => (
              <span
                key={tool.name}
                className={cn(
                  "inline-flex items-center gap-1 rounded px-2 py-0.5 font-mono text-base",
                  "border-[var(--salt-container-borderColor,theme(colors.border))] border",
                  tool.status === "active" &&
                    "border-amber-200 bg-amber-50 text-amber-700",
                  tool.status === "done" &&
                    "border-emerald-200 bg-emerald-50 text-emerald-700",
                  tool.status === "idle" &&
                    "bg-[var(--salt-container-primary-background,theme(colors.background))]",
                )}
              >
                {tool.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export { AgentDisplay };
export type { AgentDisplayProps, AgentTool };

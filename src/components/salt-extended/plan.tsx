"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface PlanStep {
  label: string;
  status: "completed" | "active" | "pending";
}

interface PlanProps extends React.ComponentProps<"div"> {
  title?: string;
  steps: PlanStep[];
}

function Plan({ className, title = "Plan", steps, ...props }: PlanProps) {
  const completed = steps.filter((s) => s.status === "completed").length;
  const progress = steps.length > 0 ? (completed / steps.length) * 100 : 0;

  return (
    <div
      data-slot="plan"
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
          "px-4 py-2.5",
          "bg-[var(--salt-container-secondary-background,theme(colors.muted.DEFAULT))]",
          "border-[var(--salt-container-borderColor,theme(colors.border))] border-b",
        )}
      >
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[var(--salt-content-primary-foreground,theme(colors.foreground))] text-base font-medium">
            {title}
          </span>
          <span className="text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))] text-base">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="bg-[var(--salt-container-borderColor,theme(colors.border))] h-1.5 w-full rounded-full">
          <div
            className="bg-[var(--salt-palette-interact-background,theme(colors.primary.DEFAULT))] h-full rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <div className="space-y-1 p-3">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-2 px-2 py-1">
            <span
              className={cn(
                "font-mono text-base",
                step.status === "completed" && "text-emerald-500",
                step.status === "active" && "text-amber-500",
                step.status === "pending" &&
                  "text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))]",
              )}
            >
              {step.status === "completed"
                ? "\u2713"
                : step.status === "active"
                  ? "\u25B6"
                  : `${i + 1}.`}
            </span>
            <span
              className={cn(
                "text-base",
                step.status === "completed" && "line-through opacity-60",
                step.status === "pending" &&
                  "text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))]",
                step.status === "active" && "font-medium",
                "text-[var(--salt-content-primary-foreground,theme(colors.foreground))]",
              )}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export { Plan };
export type { PlanProps, PlanStep };

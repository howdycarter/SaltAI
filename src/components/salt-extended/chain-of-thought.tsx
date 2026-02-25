"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type StepStatus = "completed" | "active" | "pending";

interface ThoughtStepData {
  label: string;
  description?: string;
  status?: StepStatus;
}

interface ChainOfThoughtProps extends React.ComponentProps<"div"> {
  steps: ThoughtStepData[];
}

function ChainOfThought({ className, steps, ...props }: ChainOfThoughtProps) {
  return (
    <div
      data-slot="chain-of-thought"
      className={cn("relative space-y-0", className)}
      {...props}
    >
      {steps.map((step, i) => (
        <ThoughtStep key={i} {...step} isLast={i === steps.length - 1} />
      ))}
    </div>
  );
}

interface ThoughtStepProps extends ThoughtStepData {
  isLast?: boolean;
}

function ThoughtStep({
  label,
  description,
  status = "pending",
  isLast = false,
}: ThoughtStepProps) {
  return (
    <div data-slot="thought-step" className="flex gap-3">
      <div className="flex flex-col items-center">
        <div
          className={cn(
            "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2",
            status === "completed" &&
              "border-emerald-500 bg-emerald-500 text-white",
            status === "active" &&
              "border-[var(--salt-palette-interact-background,theme(colors.primary.DEFAULT))] bg-[var(--salt-palette-interact-background,theme(colors.primary.DEFAULT))] text-white",
            status === "pending" &&
              "border-[var(--salt-container-borderColor,theme(colors.border))] bg-transparent",
          )}
        >
          {status === "completed" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          )}
          {status === "active" && (
            <span className="h-2 w-2 animate-pulse rounded-full bg-current" />
          )}
        </div>
        {!isLast && (
          <div
            className={cn(
              "min-h-[24px] w-px flex-1",
              status === "completed"
                ? "bg-emerald-500"
                : "bg-[var(--salt-container-borderColor,theme(colors.border))]",
            )}
          />
        )}
      </div>
      <div className={cn("pb-6", isLast && "pb-0")}>
        <p
          className={cn(
            "text-base leading-6 font-medium",
            status === "pending"
              ? "text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))]"
              : "text-[var(--salt-content-primary-foreground,theme(colors.foreground))]",
          )}
        >
          {label}
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
      </div>
    </div>
  );
}

export { ChainOfThought, ThoughtStep };
export type { ChainOfThoughtProps, ThoughtStepData };

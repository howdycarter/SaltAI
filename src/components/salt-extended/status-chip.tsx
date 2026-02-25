"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

const colorMap = {
  red: "text-red-600 dark:text-red-400",
  amber: "text-amber-600 dark:text-amber-400",
  blue: "text-blue-600 dark:text-blue-400",
  purple: "text-purple-600 dark:text-purple-400",
  default:
    "text-[var(--salt-content-primary-foreground,theme(colors.foreground))]",
  critical: "text-red-600 dark:text-red-400",
} as const;

type StatusChipColor = keyof typeof colorMap;

type StatusChipProps = {
  label: string;
  value: string | number;
  color?: StatusChipColor;
  className?: string;
};

function StatusChip({
  label,
  value,
  color = "default",
  className,
}: StatusChipProps) {
  return (
    <div
      data-slot="status-chip"
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1.5",
        "border-[var(--salt-container-borderColor,theme(colors.border))] border",
        "bg-[var(--salt-container-primary-background,theme(colors.background))]",
        "text-base",
        className,
      )}
    >
      <span className="text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))] text-base">
        {label}
      </span>
      <span
        className={cn(
          "max-w-[12rem] truncate font-semibold tabular-nums",
          colorMap[color],
        )}
      >
        {value}
      </span>
    </div>
  );
}

export { StatusChip, type StatusChipColor, type StatusChipProps };

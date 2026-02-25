"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type FilterTab<T extends string> = {
  label: string;
  value: T;
};

type FilterTabGroupProps<T extends string> = {
  tabs: FilterTab<T>[];
  value: T;
  onChange: (value: T) => void;
  ariaLabel: string;
  className?: string;
};

function FilterTabGroup<T extends string>({
  tabs,
  value,
  onChange,
  ariaLabel,
  className,
}: FilterTabGroupProps<T>) {
  return (
    <div
      className={cn(
        "inline-flex overflow-hidden rounded-md",
        "border-[var(--salt-container-borderColor,theme(colors.border))] border",
        className,
      )}
      role="tablist"
      aria-label={ariaLabel}
    >
      {tabs.map((tab) => (
        <button
          key={tab.value}
          type="button"
          role="tab"
          aria-selected={value === tab.value}
          onClick={() => onChange(tab.value)}
          className={cn(
            "px-3 py-1.5 text-base font-medium transition-colors",
            value === tab.value
              ? "bg-[var(--salt-palette-interact-background,theme(colors.primary.DEFAULT))] text-[var(--salt-palette-interact-foreground,theme(colors.primary.foreground))]"
              : "bg-[var(--salt-container-primary-background,theme(colors.background))] text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))] hover:bg-[var(--salt-container-secondary-background,theme(colors.muted.DEFAULT))]",
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export { type FilterTab, FilterTabGroup, type FilterTabGroupProps };

"use client";

import { ChevronDown, Clock } from "lucide-react";
import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/salt-extended/dropdown-menu";
import { cn } from "@/lib/utils";
import type { DashboardFilters, TimeRange } from "@/types/dashboard";

import { Button } from "./button";

const TIME_RANGE_LABELS: Record<TimeRange, string> = {
  today: "Today",
  yesterday: "Yesterday",
  last7: "Last 7 Days",
  last30: "Last 30 Days",
  custom: "Custom",
};

const TIME_PRESETS: TimeRange[] = ["today", "yesterday", "last7", "last30"];

export const AVAILABLE_LOBS = [
  "Card Services",
  "Banking",
  "Mortgage",
  "Auto",
  "Investments",
];

export const AVAILABLE_QUEUE_GROUPS = [
  "Tier 1 Support",
  "Tier 2 Support",
  "Retention",
  "Collections",
  "Sales",
];

function MultiSelectDropdown({
  label,
  options,
  selected,
  onChange,
}: {
  label: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
}) {
  const displayLabel =
    selected.length === 0
      ? `All ${label}`
      : selected.length <= 2
        ? selected.join(", ")
        : `${selected[0]}, ${selected[1]} +${selected.length - 2} more`;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-9 gap-1.5 text-base font-normal"
        >
          <span className="max-w-[140px] truncate">{displayLabel}</span>
          <ChevronDown className="h-3.5 w-3.5 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        {options.map((option) => (
          <DropdownMenuCheckboxItem
            key={option}
            checked={selected.includes(option)}
            onCheckedChange={(checked) => {
              onChange(
                checked
                  ? [...selected, option]
                  : selected.filter((s) => s !== option),
              );
            }}
            onSelect={(e) => e.preventDefault()}
          >
            {option}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function DashboardFilterBar({
  filters,
  onFilterChange,
  lastUpdated,
  className,
}: {
  filters: DashboardFilters;
  onFilterChange: (filters: DashboardFilters) => void;
  lastUpdated?: string;
  className?: string;
}) {
  const setTimeRange = (timeRange: TimeRange) => {
    onFilterChange({
      ...filters,
      timeRange,
      customStart: undefined,
      customEnd: undefined,
    });
  };

  const customDateWarning =
    filters.timeRange === "custom" &&
    filters.customStart &&
    filters.customEnd &&
    Math.abs(
      (new Date(filters.customEnd).getTime() -
        new Date(filters.customStart).getTime()) /
        (1000 * 60 * 60 * 24),
    ) > 90;

  return (
    <div
      data-slot="dashboard-filter-bar"
      className={cn("flex flex-wrap items-center gap-3 p-4", className)}
    >
      {/* Time range presets */}
      <div
        className="border-[var(--salt-container-borderColor,theme(colors.border))] flex gap-0.5 rounded-md border p-0.5"
        role="group"
        aria-label="Time range"
      >
        {TIME_PRESETS.map((preset) => (
          <button
            key={preset}
            onClick={() => setTimeRange(preset)}
            className={cn(
              "rounded px-3 py-1.5 text-base font-medium transition-colors",
              filters.timeRange === preset
                ? "bg-[var(--salt-actionable-cta-background,theme(colors.primary.DEFAULT))] text-[var(--salt-actionable-cta-foreground,white)]"
                : "hover:bg-[var(--salt-container-secondary-background,theme(colors.accent.DEFAULT))] text-[var(--salt-content-primary-foreground)]",
            )}
          >
            {TIME_RANGE_LABELS[preset]}
          </button>
        ))}
        <button
          onClick={() => setTimeRange("custom")}
          className={cn(
            "rounded px-3 py-1.5 text-base font-medium transition-colors",
            filters.timeRange === "custom"
              ? "bg-[var(--salt-actionable-cta-background,theme(colors.primary.DEFAULT))] text-[var(--salt-actionable-cta-foreground,white)]"
              : "hover:bg-[var(--salt-container-secondary-background,theme(colors.accent.DEFAULT))] text-[var(--salt-content-primary-foreground)]",
          )}
        >
          Custom
        </button>
      </div>

      {/* Custom date inputs */}
      {filters.timeRange === "custom" && (
        <div className="flex items-center gap-2">
          <input
            type="date"
            aria-label="Start date"
            value={filters.customStart ?? ""}
            onChange={(e) =>
              onFilterChange({ ...filters, customStart: e.target.value })
            }
            className="border-[var(--salt-container-borderColor,theme(colors.border))] bg-[var(--salt-container-primary-background,theme(colors.background))] h-9 rounded-md border px-2 text-base"
          />
          <span className="text-base text-[var(--salt-content-secondary-foreground)]">
            to
          </span>
          <input
            type="date"
            aria-label="End date"
            value={filters.customEnd ?? ""}
            onChange={(e) =>
              onFilterChange({ ...filters, customEnd: e.target.value })
            }
            className="border-[var(--salt-container-borderColor,theme(colors.border))] bg-[var(--salt-container-primary-background,theme(colors.background))] h-9 rounded-md border px-2 text-base"
          />
          {customDateWarning && (
            <span className="text-base text-amber-600" role="alert">
              Range exceeds 90 days
            </span>
          )}
        </div>
      )}

      {/* LOB multi-select */}
      <MultiSelectDropdown
        label="LOBs"
        options={AVAILABLE_LOBS}
        selected={filters.lobs}
        onChange={(lobs) => onFilterChange({ ...filters, lobs })}
      />

      {/* Queue Group multi-select */}
      <MultiSelectDropdown
        label="Queue Groups"
        options={AVAILABLE_QUEUE_GROUPS}
        selected={filters.queueGroups}
        onChange={(queueGroups) => onFilterChange({ ...filters, queueGroups })}
      />

      {/* Freshness indicator */}
      {lastUpdated && (
        <div className="ml-auto flex items-center gap-1.5 text-base text-[var(--salt-content-secondary-foreground)]">
          <Clock className="h-3.5 w-3.5" />
          <span>Last updated: {lastUpdated}</span>
        </div>
      )}
    </div>
  );
}

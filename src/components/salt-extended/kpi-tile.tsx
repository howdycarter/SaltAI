"use client";

import {
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  ArrowUp,
  CheckCircle2,
  Clock,
  Info,
} from "lucide-react";
import * as React from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/salt-extended/popover";
import { Skeleton } from "@/components/salt-extended/skeleton";
import { cn } from "@/lib/utils";
import type {
  KpiData,
  KpiStatus,
  ReconciliationStatus,
} from "@/types/dashboard";

const RECONCILIATION_STYLES: Record<
  ReconciliationStatus,
  {
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    label: string;
  }
> = {
  aligned: {
    icon: CheckCircle2,
    color: "text-green-600",
    label: "Reconciled",
  },
  pending: {
    icon: Clock,
    color: "text-yellow-600",
    label: "Pending reconciliation",
  },
  partial: {
    icon: AlertTriangle,
    color: "text-orange-600",
    label: "Partial match",
  },
};

const STATUS_STYLES: Record<KpiStatus, { border: string; delta: string }> = {
  normal: {
    border: "border-green-500/40",
    delta: "text-green-600",
  },
  amber: {
    border: "border-amber-500/40",
    delta: "text-amber-600",
  },
  critical: {
    border: "border-red-500/40",
    delta: "text-red-600",
  },
};

function TrendArrow({ delta }: { delta: number }) {
  if (delta > 0) return <ArrowUp className="h-3.5 w-3.5" />;
  if (delta < 0) return <ArrowDown className="h-3.5 w-3.5" />;
  return <ArrowRight className="h-3.5 w-3.5" />;
}

function formatDelta(
  delta: number | null,
  deltaPercent: number | null,
): string {
  if (delta === null) return "\u2014";
  const sign = delta > 0 ? "+" : "";
  const abs = `${sign}${delta.toLocaleString()}`;
  if (deltaPercent !== null) {
    return `${abs} (${sign}${deltaPercent.toFixed(1)}%)`;
  }
  return abs;
}

export function KpiTile({
  kpi,
  loading = false,
  onDrillDown,
  className,
}: {
  kpi: KpiData;
  loading?: boolean;
  onDrillDown?: (kpi: KpiData) => void;
  className?: string;
}) {
  if (loading) {
    return (
      <div
        data-slot="kpi-tile"
        className={cn(
          "border-[var(--salt-container-borderColor,theme(colors.border))] bg-[var(--salt-container-primary-background,theme(colors.background))] rounded-lg border p-4",
          className,
        )}
      >
        <Skeleton className="mb-3 h-3 w-2/3" />
        <Skeleton className="mb-2 h-7 w-1/2" />
        <Skeleton className="h-3 w-3/4" />
      </div>
    );
  }

  const style = STATUS_STYLES[kpi.status];

  return (
    <div
      data-slot="kpi-tile"
      role={onDrillDown ? "button" : undefined}
      tabIndex={onDrillDown ? 0 : undefined}
      onClick={onDrillDown ? () => onDrillDown(kpi) : undefined}
      onKeyDown={
        onDrillDown
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onDrillDown(kpi);
              }
            }
          : undefined
      }
      className={cn(
        "bg-[var(--salt-container-primary-background,theme(colors.background))] rounded-lg border border-l-4 p-4 transition-shadow",
        style.border,
        "border-r-[var(--salt-container-borderColor,theme(colors.border))] border-t-[var(--salt-container-borderColor,theme(colors.border))] border-b-[var(--salt-container-borderColor,theme(colors.border))]",
        onDrillDown &&
          "focus-visible:ring-[var(--salt-actionable-cta-background,theme(colors.primary.DEFAULT))] cursor-pointer hover:shadow-md focus-visible:ring-2 focus-visible:outline-none",
        className,
      )}
    >
      {/* Header: label + reconciliation badge + info popover */}
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="text-base font-medium tracking-wide text-[var(--salt-content-secondary-foreground)] uppercase">
            {kpi.label}
          </span>
          {kpi.reconciliationStatus &&
            (() => {
              const recon = RECONCILIATION_STYLES[kpi.reconciliationStatus];
              const ReconIcon = recon.icon;
              return (
                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      className={cn(
                        "rounded p-0.5 focus-visible:ring-2 focus-visible:ring-[var(--salt-actionable-cta-background)] focus-visible:outline-none",
                        recon.color,
                      )}
                      aria-label={`${kpi.label} reconciliation: ${recon.label}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ReconIcon className="h-3.5 w-3.5" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent side="top" className="w-56 text-base">
                    <p className="mb-1 font-semibold">{recon.label}</p>
                    {kpi.reconciliationDetails && (
                      <p className="text-[var(--salt-content-secondary-foreground)]">
                        {kpi.reconciliationDetails}
                      </p>
                    )}
                  </PopoverContent>
                </Popover>
              );
            })()}
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <button
              className="rounded p-0.5 text-[var(--salt-content-secondary-foreground)] hover:text-[var(--salt-content-primary-foreground)] focus-visible:ring-2 focus-visible:ring-[var(--salt-actionable-cta-background)] focus-visible:outline-none"
              aria-label={`${kpi.label} definition`}
              onClick={(e) => e.stopPropagation()}
            >
              <Info className="h-3.5 w-3.5" />
            </button>
          </PopoverTrigger>
          <PopoverContent side="top" className="w-64 text-base">
            <p className="mb-2 font-semibold">{kpi.label}</p>
            <p className="mb-2 text-[var(--salt-content-secondary-foreground)]">
              {kpi.definition}
            </p>
            <div className="space-y-1 text-[var(--salt-content-secondary-foreground)]">
              <p>
                <span className="font-medium">Source:</span> {kpi.dataSource}
              </p>
              <p>
                <span className="font-medium">Last refresh:</span>{" "}
                {kpi.lastRefresh}
              </p>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Value */}
      <p className="text-2xl font-semibold tabular-nums">
        {kpi.formattedValue}
      </p>

      {/* Delta */}
      <div
        className={cn("mt-1.5 flex items-center gap-1 text-base", style.delta)}
      >
        {kpi.delta !== null && <TrendArrow delta={kpi.delta} />}
        <span className="tabular-nums">
          {formatDelta(kpi.delta, kpi.deltaPercent)}
        </span>
        {kpi.comparisonValue && (
          <span className="ml-1 text-[var(--salt-content-secondary-foreground)]">
            vs {kpi.comparisonValue}
          </span>
        )}
      </div>
    </div>
  );
}

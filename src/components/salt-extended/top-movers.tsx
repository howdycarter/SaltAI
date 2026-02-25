"use client";

import { ArrowDown, ArrowUp, BarChart3 } from "lucide-react";
import * as React from "react";

import {
  EmptyState,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from "@/components/salt-extended/empty-state";
import { Skeleton } from "@/components/salt-extended/skeleton";
import { cn } from "@/lib/utils";
import type { TopMover } from "@/types/dashboard";

function MoverRow({
  mover,
  onClick,
}: {
  mover: TopMover;
  onClick?: () => void;
}) {
  const isPositive = mover.delta > 0;

  return (
    <div
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 transition-colors",
        onClick &&
          "hover:bg-[var(--salt-container-secondary-background,theme(colors.accent.DEFAULT))]/50 cursor-pointer",
      )}
    >
      {/* Name + metric */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-base font-medium">{mover.name}</p>
        <p className="text-base text-[var(--salt-content-secondary-foreground)]">
          {mover.metricLabel}: {mover.formattedValue}
        </p>
      </div>

      {/* Delta */}
      <div
        className={cn(
          "flex shrink-0 items-center gap-0.5 text-base font-medium",
          isPositive ? "text-red-600" : "text-green-600",
        )}
      >
        {isPositive ? (
          <ArrowUp className="h-3 w-3" />
        ) : (
          <ArrowDown className="h-3 w-3" />
        )}
        <span className="tabular-nums">
          {isPositive ? "+" : ""}
          {mover.delta.toLocaleString()}
        </span>
      </div>

      {/* Contribution bar */}
      <div className="flex w-24 shrink-0 items-center gap-2">
        <div className="bg-[var(--salt-container-secondary-background,theme(colors.accent.DEFAULT))] h-2 flex-1 overflow-hidden rounded-full">
          <div
            className={cn(
              "h-full rounded-full",
              isPositive ? "bg-red-500/60" : "bg-green-500/60",
            )}
            style={{ width: `${Math.min(Math.abs(mover.contribution), 100)}%` }}
          />
        </div>
        <span className="w-10 text-right text-base text-[var(--salt-content-secondary-foreground)] tabular-nums">
          {Math.abs(mover.contribution).toFixed(1)}%
        </span>
      </div>
    </div>
  );
}

function SkeletonColumn() {
  return (
    <div className="space-y-2 p-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 py-2">
          <div className="flex-1 space-y-1">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-2 w-24" />
        </div>
      ))}
    </div>
  );
}

function MoverColumn({
  title,
  movers,
  loading,
  onDrillDown,
}: {
  title: string;
  movers: TopMover[];
  loading?: boolean;
  onDrillDown?: (mover: TopMover) => void;
}) {
  return (
    <div className="border-[var(--salt-container-borderColor,theme(colors.border))] bg-[var(--salt-container-primary-background,theme(colors.background))] rounded-lg border">
      <div className="border-[var(--salt-container-borderColor,theme(colors.border))] border-b px-4 py-3">
        <h3 className="text-base font-semibold">{title}</h3>
      </div>
      {loading ? (
        <SkeletonColumn />
      ) : movers.length === 0 ? (
        <div className="p-6 text-center text-base text-[var(--salt-content-secondary-foreground)]">
          No movers to display
        </div>
      ) : (
        <div className="p-1">
          {movers.map((mover) => (
            <MoverRow
              key={mover.id}
              mover={mover}
              onClick={onDrillDown ? () => onDrillDown(mover) : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function TopMovers({
  volumeDrivers,
  outcomeDrivers,
  onDrillDown,
  loading = false,
  className,
}: {
  volumeDrivers: TopMover[];
  outcomeDrivers: TopMover[];
  onDrillDown?: (mover: TopMover) => void;
  loading?: boolean;
  className?: string;
}) {
  if (!loading && volumeDrivers.length === 0 && outcomeDrivers.length === 0) {
    return (
      <EmptyState
        data-slot="top-movers"
        className={cn("min-h-[200px]", className)}
      >
        <EmptyStateIcon>
          <BarChart3 />
        </EmptyStateIcon>
        <EmptyStateTitle>No Top Movers</EmptyStateTitle>
        <EmptyStateDescription>
          No significant metric changes detected for the selected period.
        </EmptyStateDescription>
      </EmptyState>
    );
  }

  return (
    <div
      data-slot="top-movers"
      className={cn("grid grid-cols-1 gap-4 p-4 lg:grid-cols-2", className)}
    >
      <MoverColumn
        title="Volume Drivers"
        movers={volumeDrivers}
        loading={loading}
        onDrillDown={onDrillDown}
      />
      <MoverColumn
        title="Outcome Drivers"
        movers={outcomeDrivers}
        loading={loading}
        onDrillDown={onDrillDown}
      />
    </div>
  );
}

"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import type { KpiData } from "@/types/dashboard";

import { KpiTile } from "./kpi-tile";

const SKELETON_COUNT = 6;

export function KpiStrip({
  kpis,
  loading = false,
  onDrillDown,
  className,
}: {
  kpis: KpiData[];
  loading?: boolean;
  onDrillDown?: (kpi: KpiData) => void;
  className?: string;
}) {
  if (loading) {
    return (
      <div
        data-slot="kpi-strip"
        className={cn(
          "grid grid-cols-2 gap-4 p-4 md:grid-cols-3 lg:grid-cols-6",
          className,
        )}
      >
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <KpiTile
            key={i}
            kpi={{
              label: "",
              value: 0,
              formattedValue: "",
              delta: null,
              deltaPercent: null,
              comparisonValue: null,
              status: "normal",
              definition: "",
              dataSource: "",
              lastRefresh: "",
            }}
            loading
          />
        ))}
      </div>
    );
  }

  return (
    <div
      data-slot="kpi-strip"
      className={cn(
        "grid grid-cols-2 gap-4 p-4 md:grid-cols-3 lg:grid-cols-6",
        className,
      )}
    >
      {kpis.map((kpi) => (
        <KpiTile key={kpi.label} kpi={kpi} onDrillDown={onDrillDown} />
      ))}
    </div>
  );
}

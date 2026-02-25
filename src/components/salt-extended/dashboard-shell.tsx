"use client";

import { LayoutDashboard } from "lucide-react";
import * as React from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/salt-extended/breadcrumb";
import { Skeleton, SkeletonText } from "@/components/salt-extended/skeleton";
import { cn } from "@/lib/utils";

function SkeletonFilterBar() {
  return (
    <div className="flex items-center gap-3 p-4">
      <Skeleton className="h-9 w-40" />
      <Skeleton className="h-9 w-36" />
      <Skeleton className="h-9 w-36" />
      <div className="ml-auto">
        <Skeleton className="h-4 w-48" />
      </div>
    </div>
  );
}

function SkeletonKpiStrip() {
  return (
    <div className="grid grid-cols-2 gap-4 p-4 md:grid-cols-3 lg:grid-cols-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="border-[var(--salt-container-borderColor,theme(colors.border))] bg-[var(--salt-container-primary-background,theme(colors.background))] rounded-lg border p-4"
        >
          <Skeleton className="mb-3 h-3 w-2/3" />
          <Skeleton className="mb-2 h-7 w-1/2" />
          <Skeleton className="h-3 w-3/4" />
        </div>
      ))}
    </div>
  );
}

function SkeletonTopMovers() {
  return (
    <div className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-2">
      {Array.from({ length: 2 }).map((_, col) => (
        <div
          key={col}
          className="border-[var(--salt-container-borderColor,theme(colors.border))] bg-[var(--salt-container-primary-background,theme(colors.background))] rounded-lg border p-4"
        >
          <Skeleton className="mb-4 h-5 w-1/3" />
          <div className="space-y-3">
            <SkeletonText lines={5} />
          </div>
        </div>
      ))}
    </div>
  );
}

export function DashboardShell({
  loading = false,
  filterBar,
  kpiStrip,
  topMovers,
  className,
}: {
  loading?: boolean;
  filterBar?: React.ReactNode;
  kpiStrip?: React.ReactNode;
  topMovers?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      data-slot="dashboard-shell"
      className={cn(
        "bg-[var(--salt-container-secondary-background,theme(colors.accent.DEFAULT))]/30 flex h-full flex-col",
        className,
      )}
    >
      {/* Header */}
      <div className="border-[var(--salt-container-borderColor,theme(colors.border))] bg-[var(--salt-container-primary-background,theme(colors.background))] border-b px-6 py-3">
        <div className="flex items-center gap-3">
          <LayoutDashboard className="h-5 w-5 text-[var(--salt-content-secondary-foreground)]" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="border-[var(--salt-container-borderColor,theme(colors.border))] bg-[var(--salt-container-primary-background,theme(colors.background))] border-b">
        {loading ? <SkeletonFilterBar /> : (filterBar ?? <SkeletonFilterBar />)}
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        {/* KPI Strip */}
        <section aria-label="Key Performance Indicators">
          {loading ? <SkeletonKpiStrip /> : (kpiStrip ?? <SkeletonKpiStrip />)}
        </section>

        {/* Top Movers */}
        <section aria-label="Top Movers">
          {loading ? (
            <SkeletonTopMovers />
          ) : (
            (topMovers ?? <SkeletonTopMovers />)
          )}
        </section>
      </div>
    </div>
  );
}

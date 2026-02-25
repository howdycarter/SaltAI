export type KpiStatus = "normal" | "amber" | "critical";

export type ReconciliationStatus = "aligned" | "pending" | "partial";

export type KpiData = {
  label: string;
  value: number;
  formattedValue: string;
  delta: number | null;
  deltaPercent: number | null;
  comparisonValue: string | null;
  status: KpiStatus;
  definition: string;
  dataSource: string;
  lastRefresh: string;
  reconciliationStatus?: ReconciliationStatus;
  reconciliationDetails?: string;
};

export type TopMover = {
  id: string;
  name: string;
  metricLabel: string;
  value: number;
  formattedValue: string;
  delta: number;
  contribution: number;
};

export type TimeRange = "today" | "yesterday" | "last7" | "last30" | "custom";

export type DashboardFilters = {
  timeRange: TimeRange;
  customStart?: string;
  customEnd?: string;
  lobs: string[];
  queueGroups: string[];
};

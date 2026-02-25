export type TrendDirection = "up" | "down" | "stable";

export type TopicSeverity = "critical" | "high" | "medium" | "low";

export type TrendingTopic = {
  id: string;
  name: string;
  lob: string;
  volume: number;
  deltaPercent: number;
  direction: TrendDirection;
  velocity: number;
  impactScore: number;
  severity: TopicSeverity;
  firstSeen: string;
  aiAnalysis: string;
  timeSeries: { date: string; value: number }[];
};

export type TrendingFilters = {
  lob: string;
  timeRange: "today" | "7d" | "30d";
  severity: TopicSeverity | "all";
};

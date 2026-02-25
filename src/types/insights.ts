export type InsightType =
  | "trend_analysis"
  | "anomaly_detection"
  | "forecast"
  | "recommendation"
  | "compliance_review";

export type GovernanceStatus =
  | "approved"
  | "pending_review"
  | "flagged"
  | "auto_generated";

export type InsightReport = {
  id: string;
  title: string;
  summary: string;
  type: InsightType;
  governanceStatus: GovernanceStatus;
  lob: string;
  generatedAt: string;
  reasoning?: string;
  confidence: number;
  tags: string[];
};

import type { ThoughtStepData } from "@/components/salt-extended/chain-of-thought";

export type AlertSeverity = "critical" | "warning" | "info";

export type AlertStatus = "open" | "acknowledged" | "resolved";

export type Alert = {
  id: string;
  title: string;
  description: string;
  severity: AlertSeverity;
  status: AlertStatus;
  source: string;
  lob: string;
  createdAt: string;
  updatedAt: string;
  watchlisted: boolean;
  chainSteps?: ThoughtStepData[];
};

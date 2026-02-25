import type { Alert } from "@/types/alerts";

export const MOCK_ALERTS: Alert[] = [
  {
    id: "alt-001",
    title: "Transfer Rate Exceeds 20% Threshold",
    description:
      "Card Services transfer rate has reached 22.1%, exceeding the 20% critical threshold. This correlates with the payment processing delay topic trending since 2/17.",
    severity: "critical",
    status: "open",
    source: "Threshold Monitor",
    lob: "Card Services",
    createdAt: "2026-02-22T08:14:00Z",
    updatedAt: "2026-02-22T08:14:00Z",
    watchlisted: true,
    chainSteps: [
      {
        label: "Detected transfer rate anomaly in Card Services",
        description: "Rate crossed 20% threshold at 08:12 AM",
        status: "completed",
      },
      {
        label: "Correlated with trending topic: Payment Processing Delays",
        description: "87% overlap in affected call segments",
        status: "completed",
      },
      {
        label: "Identified top contributing queue groups",
        description: "Disputes (28.4%) and General Inquiries (19.7%)",
        status: "completed",
      },
      {
        label: "Generating recommended actions",
        status: "active",
      },
    ],
  },
  {
    id: "alt-002",
    title: "AHT Spike Detected in Card Services",
    description:
      "Average handle time in Card Services has increased 18% over the rolling 4-hour window, driven primarily by fraud alert calls requiring extended verification.",
    severity: "critical",
    status: "open",
    source: "AHT Anomaly Detector",
    lob: "Card Services",
    createdAt: "2026-02-22T09:30:00Z",
    updatedAt: "2026-02-22T09:45:00Z",
    watchlisted: false,
    chainSteps: [
      {
        label: "Detected AHT deviation beyond 2 standard deviations",
        description: "Current AHT: 9:42 vs baseline 8:07",
        status: "completed",
      },
      {
        label: "Isolated contributing call segments",
        description: "Fraud verification calls averaging 14:23 handle time",
        status: "completed",
      },
      {
        label: "Cross-referenced with fraud alert volume surge",
        description: "40% false positive rate identified",
        status: "completed",
      },
      {
        label: "Drafting mitigation recommendation",
        status: "active",
      },
      {
        label: "Pending: Impact forecast for next 24 hours",
        status: "pending",
      },
    ],
  },
  {
    id: "alt-003",
    title: "Fraud Alert False Positive Rate Critical",
    description:
      "Automated fraud detection system is generating false positives at 40%, well above the 15% acceptable threshold. New MCC flagging rule deployed 2/17 is the likely cause.",
    severity: "critical",
    status: "acknowledged",
    source: "Fraud Analytics",
    lob: "Card Services",
    createdAt: "2026-02-22T07:00:00Z",
    updatedAt: "2026-02-22T10:15:00Z",
    watchlisted: true,
    chainSteps: [
      {
        label: "Detected elevated false positive rate in fraud alerts",
        description: "Rate: 40.2% vs 15% threshold",
        status: "completed",
      },
      {
        label: "Traced to MCC flagging rule change deployed 2/17",
        description: "Rule ID: FRD-2026-0217-A",
        status: "completed",
      },
      {
        label: "Estimated volume impact: +2,100 unnecessary calls/day",
        status: "completed",
      },
      {
        label: "Recommendation: Roll back rule or adjust thresholds",
        description: "Sent to Fraud Ops team for review",
        status: "completed",
      },
    ],
  },
  {
    id: "alt-004",
    title: "Mortgage Escalation Rate Trending Up",
    description:
      "Mortgage escalation rate has increased from 4.8% to 7.2% over the past 48 hours. Document upload issues and refinance confusion are primary drivers.",
    severity: "warning",
    status: "open",
    source: "Threshold Monitor",
    lob: "Mortgage",
    createdAt: "2026-02-21T14:20:00Z",
    updatedAt: "2026-02-22T06:00:00Z",
    watchlisted: false,
    chainSteps: [
      {
        label: "Detected escalation rate increase in Mortgage",
        description: "7.2% current vs 4.8% baseline",
        status: "completed",
      },
      {
        label: "Linked to document upload errors and refinance inquiries",
        status: "completed",
      },
      {
        label: "Assessing staffing implications",
        status: "active",
      },
    ],
  },
  {
    id: "alt-005",
    title: "Banking Queue Wait Time Above SLA",
    description:
      "Average speed of answer in Banking general queue has exceeded 3-minute SLA for the past 90 minutes. Current ASA is 4:12.",
    severity: "warning",
    status: "open",
    source: "SLA Monitor",
    lob: "Banking",
    createdAt: "2026-02-22T10:00:00Z",
    updatedAt: "2026-02-22T10:00:00Z",
    watchlisted: false,
  },
  {
    id: "alt-006",
    title: "Auto Loan Servicing Call Volume Dip",
    description:
      "Auto loan servicing calls dropped 22% compared to the same weekday last week. AutoPay fix may be reducing inbound volume as expected.",
    severity: "warning",
    status: "acknowledged",
    source: "Volume Anomaly Detector",
    lob: "Auto",
    createdAt: "2026-02-22T08:45:00Z",
    updatedAt: "2026-02-22T09:30:00Z",
    watchlisted: false,
  },
  {
    id: "alt-007",
    title: "Investment Portfolio Display Lag Reported",
    description:
      "Multiple agents reporting 5-10 second delays when loading customer portfolio views in the CRM. May be related to market data feed latency.",
    severity: "warning",
    status: "acknowledged",
    source: "Agent Feedback",
    lob: "Investments",
    createdAt: "2026-02-22T09:15:00Z",
    updatedAt: "2026-02-22T10:00:00Z",
    watchlisted: false,
  },
  {
    id: "alt-008",
    title: "iOS App Login Fix Deployed",
    description:
      "Engineering has deployed hotfix v4.12.1 addressing the biometric authentication failure on iOS 19.3. Monitoring for call volume reduction.",
    severity: "info",
    status: "resolved",
    source: "Engineering Notification",
    lob: "Banking",
    createdAt: "2026-02-22T07:30:00Z",
    updatedAt: "2026-02-22T09:00:00Z",
    watchlisted: false,
  },
  {
    id: "alt-009",
    title: "New Balance Transfer Promo FAQ Published",
    description:
      "Updated FAQ and agent talking points for the Q1 balance transfer promotion have been published to the knowledge base.",
    severity: "info",
    status: "resolved",
    source: "Knowledge Management",
    lob: "Card Services",
    createdAt: "2026-02-21T16:00:00Z",
    updatedAt: "2026-02-22T08:00:00Z",
    watchlisted: false,
  },
  {
    id: "alt-010",
    title: "Weekly Compliance Scan Completed",
    description:
      "Automated compliance review of 4,200 call transcripts completed. 12 flagged for supervisor review. No critical violations detected.",
    severity: "info",
    status: "resolved",
    source: "Compliance Engine",
    lob: "Card Services",
    createdAt: "2026-02-22T06:00:00Z",
    updatedAt: "2026-02-22T06:45:00Z",
    watchlisted: false,
  },
  {
    id: "alt-011",
    title: "Mortgage Portal Maintenance Scheduled",
    description:
      "Customer-facing mortgage portal scheduled for maintenance window Saturday 2/23 02:00-04:00 AM ET. Expect brief increase in calls Monday morning.",
    severity: "info",
    status: "open",
    source: "Change Management",
    lob: "Mortgage",
    createdAt: "2026-02-22T10:30:00Z",
    updatedAt: "2026-02-22T10:30:00Z",
    watchlisted: false,
  },
  {
    id: "alt-012",
    title: "Investments Team Staffing Update",
    description:
      "Three new hires completing onboarding in Investments queue. Expected to be fully ramped by 3/1. Current staffing is at 94% of target.",
    severity: "info",
    status: "acknowledged",
    source: "Workforce Management",
    lob: "Investments",
    createdAt: "2026-02-21T11:00:00Z",
    updatedAt: "2026-02-22T08:00:00Z",
    watchlisted: false,
  },
];

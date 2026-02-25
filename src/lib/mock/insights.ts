import type { InsightReport } from "@/types/insights";

export const MOCK_INSIGHTS: InsightReport[] = [
  {
    id: "ins-001",
    title: "Card Services Transfer Rate Trend Analysis",
    summary:
      "Transfer rate in Card Services has increased 28.9% week-over-week, driven by payment processing delays and fraud alert false positives. If current trajectory holds, the rate will exceed 25% by end of week.",
    type: "trend_analysis",
    governanceStatus: "approved",
    lob: "Card Services",
    generatedAt: "2026-02-22T08:00:00Z",
    reasoning:
      "Linear regression on 14-day transfer rate data shows a strong upward trend (R²=0.94). Two root causes identified through topic correlation analysis account for 78% of the variance.",
    confidence: 0.94,
    tags: ["transfer-rate", "card-services", "trend"],
  },
  {
    id: "ins-002",
    title: "Fraud Alert False Positive Anomaly Detected",
    summary:
      "The fraud detection system false positive rate jumped from 12% to 40% following the MCC flagging rule deployment on 2/17. This is generating approximately 2,100 unnecessary calls per day.",
    type: "anomaly_detection",
    governanceStatus: "approved",
    lob: "Card Services",
    generatedAt: "2026-02-22T07:30:00Z",
    reasoning:
      "Statistical process control detected the false positive rate exceeding 3 sigma from the historical mean on 2/18. Root cause traced to rule FRD-2026-0217-A through change log correlation.",
    confidence: 0.96,
    tags: ["fraud", "anomaly", "card-services", "false-positive"],
  },
  {
    id: "ins-003",
    title: "Banking Call Volume Forecast: Post-iOS Fix",
    summary:
      "With the iOS v4.12.1 hotfix deployed, Banking call volume is projected to decrease 6% next week. Login-related calls should drop from 1,234 to approximately 370 within 3 days as users update their apps.",
    type: "forecast",
    governanceStatus: "pending_review",
    lob: "Banking",
    generatedAt: "2026-02-22T09:00:00Z",
    reasoning:
      "Forecast based on prior app-fix adoption curves (v4.8, v4.10 incidents). Historical data shows 70% user adoption within 72 hours of hotfix availability. Applied exponential decay model to current login-issue call volume.",
    confidence: 0.82,
    tags: ["volume", "banking", "forecast", "mobile-app"],
  },
  {
    id: "ins-004",
    title: "Recommendation: Update Balance Transfer Agent Scripts",
    summary:
      "Agent scripts for the Q1 balance transfer promotion should be updated to lead with the fee structure and intro period end date. Analysis of 643 related calls shows 68% of customer confusion stems from unclear fee timing.",
    type: "recommendation",
    governanceStatus: "pending_review",
    lob: "Card Services",
    generatedAt: "2026-02-22T08:45:00Z",
    reasoning:
      "Topic modeling on balance transfer call transcripts identified three primary confusion clusters: fee timing (68%), minimum payment calculation (19%), and eligibility criteria (13%). Sentiment analysis shows negative sentiment peaks during fee discussion segments.",
    confidence: 0.88,
    tags: [
      "balance-transfer",
      "card-services",
      "agent-scripts",
      "recommendation",
    ],
  },
  {
    id: "ins-005",
    title: "Mortgage Disclosure Compliance Review",
    summary:
      "Review of 1,800 Mortgage call transcripts identified 14 instances where rate lock disclosures were incomplete. All occurred during high-volume periods when AHT pressure was elevated. No willful violations detected.",
    type: "compliance_review",
    governanceStatus: "flagged",
    lob: "Mortgage",
    generatedAt: "2026-02-22T06:30:00Z",
    reasoning:
      "NLP-based disclosure detection model scanned all Mortgage calls from the past 30 days against the required disclosure checklist (12 items per Reg Z). The 14 flagged calls were missing 1-2 items each, concentrated in the rate lock confirmation segment. Pattern correlates with calls exceeding 12 minutes in duration.",
    confidence: 0.91,
    tags: ["compliance", "mortgage", "reg-z", "disclosure"],
  },
  {
    id: "ins-006",
    title: "Auto LOB AHT Improvement Trend",
    summary:
      "Auto loan servicing AHT has decreased 8.7% over the past two weeks following the AutoPay system fix. Current average is 5:42, approaching the 5:30 target. Trend is expected to continue as remaining manual re-enrollments complete.",
    type: "trend_analysis",
    governanceStatus: "auto_generated",
    lob: "Auto",
    generatedAt: "2026-02-22T07:00:00Z",
    reasoning:
      "Time series decomposition shows a clear structural break on 2/14 when the AutoPay fix was deployed. Post-fix trend is -2.1 seconds per day. Extrapolating, the 5:30 target will be reached by approximately 2/28.",
    confidence: 0.86,
    tags: ["aht", "auto", "trend", "improvement"],
  },
  {
    id: "ins-007",
    title: "Investment Queue Staffing Optimization Forecast",
    summary:
      "With three new hires ramping in Investments, the queue is projected to reach 100% staffing target by 3/1. Current service level of 78% should improve to 85%+ once all agents are fully productive.",
    type: "forecast",
    governanceStatus: "auto_generated",
    lob: "Investments",
    generatedAt: "2026-02-22T08:15:00Z",
    confidence: 0.78,
    tags: ["staffing", "investments", "forecast", "service-level"],
  },
  {
    id: "ins-008",
    title: "Cross-LOB Repeat Contact Pattern Detected",
    summary:
      "An emerging pattern shows 3.2% of customers are calling multiple LOBs within a 48-hour window for related issues. Most common path: Card Services -> Banking -> Card Services. These customers have 2.4x lower satisfaction scores.",
    type: "anomaly_detection",
    governanceStatus: "auto_generated",
    lob: "Card Services",
    generatedAt: "2026-02-22T09:30:00Z",
    reasoning:
      "Graph analysis of customer contact sequences over 7 days identified cross-LOB repeat patterns using a 48-hour session window. The Card->Banking->Card path accounts for 41% of cross-LOB repeats, primarily involving customers with both checking and credit card products who encounter issues spanning both product lines.",
    confidence: 0.72,
    tags: ["repeat-contacts", "cross-lob", "customer-experience", "anomaly"],
  },
];

import type { TrendingTopic } from "@/types/trending";

function generateTimeSeries(
  base: number,
  trend: "up" | "down" | "stable",
  days: number = 7,
): { date: string; value: number }[] {
  const result: { date: string; value: number }[] = [];
  let current = base;
  for (let i = 0; i < days; i++) {
    const date = new Date(2026, 1, 16 + i);
    const noise = Math.round((Math.random() - 0.5) * base * 0.08);
    const drift =
      trend === "up"
        ? Math.round(base * 0.04)
        : trend === "down"
          ? -Math.round(base * 0.03)
          : 0;
    current = Math.max(0, current + drift + noise);
    result.push({
      date: date.toISOString().slice(0, 10),
      value: current,
    });
  }
  return result;
}

export const MOCK_TRENDING_TOPICS: TrendingTopic[] = [
  {
    id: "tt-001",
    name: "Payment Processing Delays",
    lob: "Card Services",
    volume: 1842,
    deltaPercent: 34.2,
    direction: "up",
    velocity: 8.7,
    impactScore: 92,
    severity: "critical",
    firstSeen: "2026-02-17",
    aiAnalysis:
      "Payment processing delays are concentrated in weekend batch cycles. Root cause appears linked to a recent gateway migration. Agents are spending 3+ minutes per call explaining delays, contributing to AHT spikes.",
    timeSeries: generateTimeSeries(1200, "up"),
  },
  {
    id: "tt-002",
    name: "Fraud Alert Volume Surge",
    lob: "Card Services",
    volume: 2105,
    deltaPercent: 47.8,
    direction: "up",
    velocity: 12.3,
    impactScore: 96,
    severity: "critical",
    firstSeen: "2026-02-18",
    aiAnalysis:
      "Unusual spike in fraud alerts correlates with a new merchant category code flagging rule deployed 2/17. Estimated 40% of alerts are false positives, driving unnecessary call volume and customer frustration.",
    timeSeries: generateTimeSeries(1400, "up"),
  },
  {
    id: "tt-003",
    name: "Interest Rate Inquiries Spike",
    lob: "Banking",
    volume: 967,
    deltaPercent: 22.1,
    direction: "up",
    velocity: 5.4,
    impactScore: 71,
    severity: "high",
    firstSeen: "2026-02-16",
    aiAnalysis:
      "Following the latest Fed rate announcement, savings and CD rate inquiries have surged. Customers are comparing competitor rates. Agents need updated rate comparison talking points.",
    timeSeries: generateTimeSeries(780, "up"),
  },
  {
    id: "tt-004",
    name: "Mobile App Login Issues",
    lob: "Banking",
    volume: 1234,
    deltaPercent: 28.5,
    direction: "up",
    velocity: 7.1,
    impactScore: 78,
    severity: "high",
    firstSeen: "2026-02-19",
    aiAnalysis:
      "Login failures increased after the v4.12 app update on iOS. Biometric authentication is failing for devices running iOS 19.3. Engineering team has been notified and a hotfix is in progress.",
    timeSeries: generateTimeSeries(950, "up"),
  },
  {
    id: "tt-005",
    name: "Balance Transfer Confusion",
    lob: "Card Services",
    volume: 643,
    deltaPercent: 15.3,
    direction: "up",
    velocity: 3.8,
    impactScore: 62,
    severity: "high",
    firstSeen: "2026-02-17",
    aiAnalysis:
      "New promotional balance transfer offer mailer is generating calls due to unclear terms around the 0% intro period. Customers are confused about the fee structure and timeline.",
    timeSeries: generateTimeSeries(550, "up"),
  },
  {
    id: "tt-006",
    name: "Refinance Rate Questions",
    lob: "Mortgage",
    volume: 521,
    deltaPercent: -12.4,
    direction: "down",
    velocity: -2.9,
    impactScore: 45,
    severity: "medium",
    firstSeen: "2026-02-10",
    aiAnalysis:
      "Refinance inquiry volume is declining as rates stabilize. Customers who were rate-shopping are settling into current positions. Expect continued decline through end of month.",
    timeSeries: generateTimeSeries(600, "down"),
  },
  {
    id: "tt-007",
    name: "AutoPay Setup Problems",
    lob: "Auto",
    volume: 389,
    deltaPercent: -8.7,
    direction: "down",
    velocity: -1.6,
    impactScore: 38,
    severity: "medium",
    firstSeen: "2026-02-12",
    aiAnalysis:
      "AutoPay enrollment issues from the January system update have been largely resolved. Remaining calls are from customers who missed the fix window and need manual re-enrollment.",
    timeSeries: generateTimeSeries(430, "down"),
  },
  {
    id: "tt-008",
    name: "Portfolio Rebalancing Questions",
    lob: "Investments",
    volume: 298,
    deltaPercent: 2.1,
    direction: "stable",
    velocity: 0.4,
    impactScore: 32,
    severity: "medium",
    firstSeen: "2026-02-08",
    aiAnalysis:
      "Steady volume of rebalancing inquiries tied to Q1 market volatility. Most calls are informational and handled efficiently. No action required at this time.",
    timeSeries: generateTimeSeries(290, "stable"),
  },
  {
    id: "tt-009",
    name: "Mortgage Document Upload Errors",
    lob: "Mortgage",
    volume: 187,
    deltaPercent: -4.2,
    direction: "down",
    velocity: -0.9,
    impactScore: 25,
    severity: "low",
    firstSeen: "2026-02-05",
    aiAnalysis:
      "Document upload errors are declining after the portal fix deployed 2/14. Remaining issues are browser-specific (older Safari versions). Knowledge base article has been updated.",
    timeSeries: generateTimeSeries(200, "down"),
  },
  {
    id: "tt-010",
    name: "Card Replacement Delays",
    lob: "Card Services",
    volume: 156,
    deltaPercent: 1.3,
    direction: "stable",
    velocity: 0.2,
    impactScore: 18,
    severity: "low",
    firstSeen: "2026-02-01",
    aiAnalysis:
      "Card replacement timelines are within normal SLA. Low-level background noise from customers inquiring about expedited shipping options. No systemic issue detected.",
    timeSeries: generateTimeSeries(150, "stable"),
  },
];

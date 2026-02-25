import type {
  AIResponse,
  BookmarkSuggestion,
  Highlight,
  PageContext,
} from "@/types/ai";

let idCounter = 0;
function nextId(prefix: string): string {
  return `${prefix}-${++idCounter}`;
}

export async function analyzeQuery(
  query: string,
  context?: PageContext,
): Promise<AIResponse> {
  await delay(600 + Math.random() * 400);

  const page = context?.page ?? "unknown";

  return {
    id: nextId("ai-resp"),
    answer: `Based on analysis of recent data${page !== "unknown" ? ` from the ${page} page` : ""}, here is what I found regarding "${query}": The primary driver is elevated transfer rates in Card Services (+4.1pp above threshold). This correlates with a 22.1% transfer rate in that LOB, significantly above the 14.2% baseline. AHT is also trending up 7.5%, primarily driven by new documentation requirements in Mortgage.`,
    reasoning: `I analyzed 12,847 calls across 5 LOBs. Transfer Rate delta (+4.1pp) exceeds the 3pp alert threshold. Card Services accounts for 42.3% of transfer volume increase. Mortgage AHT spike correlates with new documentation requirements implemented Jan 15.`,
    sources: [
      { title: "Daily KPI Report", url: "#/reports/daily-kpi" },
      { title: "Transfer Rate Analysis", url: "#/reports/transfer-analysis" },
      {
        title: "AHT Trend Report",
        url: "#/reports/aht-trend",
        snippet:
          "Mortgage queue AHT increased 12.3% following documentation update.",
      },
    ],
    citations: [
      {
        id: nextId("cite"),
        text: "Card Services transfer rate at 22.1%",
        sourceIndex: 1,
      },
      {
        id: nextId("cite"),
        text: "Mortgage AHT +12.3% post-documentation update",
        sourceIndex: 2,
      },
    ],
    confidence: 0.87,
    generatedAt: new Date().toISOString(),
  };
}

export async function parseNaturalLanguageFilter(
  query: string,
): Promise<Record<string, unknown>> {
  await delay(300 + Math.random() * 200);

  const lower = query.toLowerCase();
  const filters: Record<string, unknown> = {};

  if (lower.includes("card services")) filters.lob = "Card Services";
  else if (lower.includes("banking")) filters.lob = "Banking";
  else if (lower.includes("mortgage")) filters.lob = "Mortgage";

  if (lower.includes("today")) filters.timeRange = "today";
  else if (lower.includes("last 7") || lower.includes("7 day"))
    filters.timeRange = "last7";
  else if (lower.includes("last 30") || lower.includes("30 day"))
    filters.timeRange = "last30";

  if (lower.includes("yesterday")) filters.timeRange = "yesterday";
  if (lower.includes("compare")) filters.comparison = true;

  return filters;
}

export async function getAutoHighlights(
  _transcript: unknown[],
): Promise<Highlight[]> {
  await delay(800 + Math.random() * 400);

  return [
    {
      id: nextId("hl"),
      startTime: 45,
      endTime: 72,
      text: "Customer expressed frustration about being transferred multiple times",
      category: "sentiment_shift",
      confidence: 0.92,
    },
    {
      id: nextId("hl"),
      startTime: 120,
      endTime: 145,
      text: "Agent identified the root cause as a system error in the billing module",
      category: "key_moment",
      confidence: 0.88,
    },
    {
      id: nextId("hl"),
      startTime: 200,
      endTime: 230,
      text: "Escalation triggered due to unresolved billing discrepancy",
      category: "issue",
      confidence: 0.95,
    },
    {
      id: nextId("hl"),
      startTime: 310,
      endTime: 340,
      text: "Agent applied credit and confirmed resolution with customer",
      category: "resolution",
      confidence: 0.91,
    },
  ];
}

export async function suggestBookmarks(
  _transcript: unknown[],
): Promise<BookmarkSuggestion[]> {
  await delay(500 + Math.random() * 300);

  return [
    {
      id: nextId("bk-sug"),
      text: "Customer mentions previous calls about same issue — potential repeat contact",
      startTime: 30,
      endTime: 55,
      tag: "Repeat Contact",
      reason:
        "Customer referenced 2 prior calls, indicating FCR failure on original interaction",
      confidence: 0.89,
    },
    {
      id: nextId("bk-sug"),
      text: "Agent deviated from standard transfer protocol",
      startTime: 150,
      endTime: 175,
      tag: "Compliance",
      reason:
        "Transfer executed without warm handoff, violating SOP-TR-003 requirements",
      confidence: 0.84,
    },
    {
      id: nextId("bk-sug"),
      text: "Effective de-escalation technique demonstrated by agent",
      startTime: 260,
      endTime: 290,
      tag: "Best Practice",
      reason:
        "Agent used empathetic acknowledgment + concrete action plan, resulting in positive sentiment shift",
      confidence: 0.93,
    },
  ];
}

export async function getPageSuggestions(
  page: string,
  _context?: PageContext,
): Promise<string[]> {
  await delay(200 + Math.random() * 100);

  const suggestions: Record<string, string[]> = {
    dashboard: [
      "Why is Transfer Rate elevated today?",
      "Which LOB is driving AHT up?",
      "Compare today vs yesterday",
      "Show me FCR trends this week",
    ],
    alerts: [
      "Why so many critical alerts?",
      "Which LOB needs attention?",
      "Predict alert volume for tomorrow",
      "Show root cause for Card Services alerts",
    ],
    trending: [
      "Why is this topic trending?",
      "Predict next week's trends",
      "Which topics correlate with transfers?",
      "Show me emerging topics",
    ],
    insights: [
      "Generate a weekly summary",
      "Which insights need review?",
      "Show compliance-flagged insights",
      "Compare LOB performance",
    ],
    "call-review": [
      "Find similar calls",
      "What patterns appear in this batch?",
      "Highlight compliance issues",
      "Suggest coaching opportunities",
    ],
  };

  return (
    suggestions[page] ?? [
      "Ask me anything about your data",
      "What should I focus on?",
      "Show me today's highlights",
    ]
  );
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

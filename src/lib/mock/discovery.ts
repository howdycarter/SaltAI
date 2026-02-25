export type DiscoveryExchange = {
  id: string;
  query: string;
  response: string;
  planSteps: { label: string; status: "completed" | "active" | "pending" }[];
  sources: { title: string; url: string; description?: string }[];
  reasoning: string;
  citations: { index: number; title: string; url: string }[];
  timestamp: string;
};

export const MOCK_EXCHANGES: DiscoveryExchange[] = [
  {
    id: "ex-001",
    query: "Why is the transfer rate spiking in Card Services this week?",
    response:
      "The Card Services transfer rate has increased to 22.1%, up from a 14.2% baseline. The primary driver is the payment processing delay issue that began on 2/17, which is causing agents to transfer calls to specialized teams for manual resolution. A secondary contributor is the fraud alert false positive surge, where agents are transferring customers to the fraud verification team unnecessarily. Approximately 42% of transfers this week are linked to these two issues. Addressing the payment gateway migration and rolling back the MCC flagging rule would likely reduce the transfer rate by 8-10 percentage points within 48 hours.",
    planSteps: [
      {
        label: "Query transfer rate metrics for Card Services",
        status: "completed",
      },
      { label: "Identify correlated trending topics", status: "completed" },
      {
        label: "Analyze call segment data for transfer reasons",
        status: "completed",
      },
      { label: "Calculate contribution of each driver", status: "completed" },
      { label: "Generate actionable recommendations", status: "completed" },
    ],
    sources: [
      {
        title: "Avaya CMS Transfer Report",
        url: "/reports/avaya-cms/transfers/2026-02-22",
        description: "Real-time transfer metrics by queue group",
      },
      {
        title: "Trending Topic: Payment Processing Delays",
        url: "/trending/tt-001",
        description: "Trending analysis with 1,842 affected calls",
      },
      {
        title: "Fraud Alert Analysis Dashboard",
        url: "/reports/fraud/false-positive-analysis",
      },
    ],
    reasoning:
      "I started by pulling the transfer rate time series for Card Services and identified the inflection point on 2/17. I then cross-referenced this with all active trending topics and found strong temporal and categorical overlap with payment processing delays (r=0.91) and fraud alert volume (r=0.78). Call segment analysis confirmed that 28.4% of transfers cite payment issues and 13.8% cite fraud verification as the reason.",
    citations: [
      {
        index: 1,
        title: "Avaya CMS Transfer Report",
        url: "/reports/avaya-cms/transfers/2026-02-22",
      },
      {
        index: 2,
        title: "Trending Topic: Payment Processing Delays",
        url: "/trending/tt-001",
      },
      {
        index: 3,
        title: "Fraud Alert Analysis Dashboard",
        url: "/reports/fraud/false-positive-analysis",
      },
    ],
    timestamp: "2026-02-22T09:15:00Z",
  },
  {
    id: "ex-002",
    query: "What is the forecast for call volume across all LOBs next week?",
    response:
      "Based on current trends and historical patterns, total call volume next week is projected at 14,200 (+10.5% WoW). Card Services will see the largest increase at +18% due to ongoing payment processing and fraud alert issues. Banking volume is expected to normalize (-6%) as the iOS login fix takes effect. Mortgage will see a temporary Monday spike from the weekend portal maintenance, estimated at +12% for Monday only before returning to baseline. Auto and Investments are projected to remain stable within +/-3%.",
    planSteps: [
      {
        label: "Pull historical volume data (8-week lookback)",
        status: "completed",
      },
      { label: "Apply seasonal adjustment factors", status: "completed" },
      {
        label: "Incorporate active trending topic impact",
        status: "completed",
      },
      { label: "Adjust for known scheduled events", status: "completed" },
      { label: "Generate per-LOB daily forecasts", status: "completed" },
    ],
    sources: [
      {
        title: "Volume Forecast Model v3.2",
        url: "/models/volume-forecast/latest",
        description:
          "ML-based volume prediction with 92% accuracy at 7-day horizon",
      },
      {
        title: "Change Calendar: Mortgage Portal Maintenance",
        url: "/change-management/CHG-2026-0223",
      },
      {
        title: "iOS Hotfix Release Notes v4.12.1",
        url: "/engineering/releases/ios-4.12.1",
      },
    ],
    reasoning:
      "I used the 8-week historical baseline with day-of-week seasonal factors, then layered in adjustments for active trending topics. The payment processing delay adds an estimated 400 calls/day to Card Services. The iOS fix should reduce Banking volume by approximately 200 calls/day starting 2/23. The mortgage portal maintenance adds a one-day spike based on prior maintenance window patterns.",
    citations: [
      {
        index: 1,
        title: "Volume Forecast Model v3.2",
        url: "/models/volume-forecast/latest",
      },
      {
        index: 2,
        title: "Change Calendar",
        url: "/change-management/CHG-2026-0223",
      },
    ],
    timestamp: "2026-02-22T09:32:00Z",
  },
  {
    id: "ex-003",
    query: "Show me compliance risk areas from the past 30 days.",
    response:
      "Over the past 30 days, the compliance engine flagged 47 calls across all LOBs. The highest-risk area is Card Services with 22 flags (47%), primarily related to incomplete disclosure of balance transfer terms during the new promo campaign. Mortgage had 14 flags (30%) related to rate lock disclosures. Banking accounted for 8 flags (17%) mostly around fee waiver authorization. Auto and Investments had 2 and 1 flags respectively. No critical violations were found, but the Card Services disclosure issue warrants immediate attention as it coincides with the balance transfer confusion trending topic.",
    planSteps: [
      {
        label: "Query compliance engine flags for 30-day window",
        status: "completed",
      },
      { label: "Categorize by LOB and violation type", status: "completed" },
      {
        label: "Cross-reference with active trending topics",
        status: "completed",
      },
      { label: "Assess severity and regulatory risk", status: "completed" },
    ],
    sources: [
      {
        title: "Compliance Engine Weekly Report",
        url: "/compliance/reports/weekly/2026-W08",
        description: "Automated transcript analysis results",
      },
      {
        title: "Regulatory Requirements: Reg Z Disclosures",
        url: "/compliance/regulations/reg-z",
      },
      {
        title: "Balance Transfer Promo Guidelines",
        url: "/knowledge-base/promos/bt-q1-2026",
        description: "Current promotion terms and required disclosures",
      },
    ],
    reasoning:
      "I aggregated all compliance flags from the past 30 days and grouped them by LOB and violation category. The Card Services disclosure gap is concerning because Reg Z requires clear communication of promotional terms. The correlation with the balance transfer confusion trending topic suggests agents may be rushing through disclosures due to high call volume.",
    citations: [
      {
        index: 1,
        title: "Compliance Engine Weekly Report",
        url: "/compliance/reports/weekly/2026-W08",
      },
      {
        index: 2,
        title: "Regulatory Requirements: Reg Z",
        url: "/compliance/regulations/reg-z",
      },
      {
        index: 3,
        title: "Balance Transfer Promo Guidelines",
        url: "/knowledge-base/promos/bt-q1-2026",
      },
    ],
    timestamp: "2026-02-22T10:05:00Z",
  },
  {
    id: "ex-004",
    query: "Which agents are handling fraud calls most effectively?",
    response:
      "Analysis of 1,240 fraud-related calls this week identifies the top-performing agents by a composite score of AHT, first-call resolution, and customer satisfaction. The top 5 agents maintain an average AHT of 7:45 on fraud calls (vs. 14:23 team average) while achieving 89% FCR. Key differentiators include: (1) they verify account details before reading the fraud alert, saving 2-3 minutes, (2) they use the streamlined false-positive dismissal workflow, and (3) they proactively offer preventive measures. Recommend using their call recordings as training material for the broader team.",
    planSteps: [
      {
        label: "Identify all fraud-related call segments this week",
        status: "completed",
      },
      { label: "Calculate per-agent performance metrics", status: "completed" },
      { label: "Rank by composite effectiveness score", status: "completed" },
      { label: "Analyze talk patterns of top performers", status: "completed" },
      { label: "Generate coaching recommendations", status: "completed" },
    ],
    sources: [
      {
        title: "Agent Performance Dashboard",
        url: "/reports/agent-performance/fraud-segment",
        description: "Per-agent metrics filtered to fraud call type",
      },
      {
        title: "Call Recording Analysis",
        url: "/call-review/segment/fraud/top-performers",
      },
    ],
    reasoning:
      "I filtered this week's calls to the fraud segment using disposition codes and topic tags, then computed a weighted composite score (40% AHT efficiency, 30% FCR, 30% CSAT). I analyzed the talk-time distribution of top performers versus the team average to identify the specific workflow differences that drive their efficiency.",
    citations: [
      {
        index: 1,
        title: "Agent Performance Dashboard",
        url: "/reports/agent-performance/fraud-segment",
      },
      {
        index: 2,
        title: "Call Recording Analysis",
        url: "/call-review/segment/fraud/top-performers",
      },
    ],
    timestamp: "2026-02-22T10:22:00Z",
  },
  {
    id: "ex-005",
    query:
      "Compare AHT trends between Mortgage and Banking over the last 30 days.",
    response:
      "Over the past 30 days, Mortgage AHT has averaged 10:12 with a gradual upward trend (+14% from start to end of period), while Banking AHT has remained relatively stable at 6:48 (+2%). The Mortgage increase is driven by two factors: (1) refinance rate questions requiring longer consultative conversations as rates fluctuate, and (2) document upload errors causing agents to walk customers through alternative submission methods. Banking's stability is notable given the iOS login issue spike -- the team absorbed the extra volume without significant AHT impact, suggesting strong agent preparedness and effective knowledge base articles.",
    planSteps: [
      {
        label: "Pull daily AHT data for Mortgage and Banking (30d)",
        status: "completed",
      },
      {
        label: "Calculate trend lines and statistical significance",
        status: "completed",
      },
      { label: "Decompose AHT by call reason", status: "completed" },
      { label: "Identify driving factors for each LOB", status: "completed" },
    ],
    sources: [
      {
        title: "AHT Trend Report: Mortgage",
        url: "/reports/aht/mortgage/30d",
        description: "Daily AHT breakdown with call reason decomposition",
      },
      {
        title: "AHT Trend Report: Banking",
        url: "/reports/aht/banking/30d",
        description: "Daily AHT breakdown with call reason decomposition",
      },
      {
        title: "Knowledge Base Usage Analytics",
        url: "/knowledge-base/analytics/banking",
      },
    ],
    reasoning:
      "I pulled daily AHT aggregates for both LOBs and fit linear trend models. Mortgage shows a statistically significant upward trend (p<0.01, slope=+4.2s/day) while Banking's trend is not significant (p=0.34). Call reason decomposition reveals that Mortgage refinance calls went from averaging 8:30 to 12:15 over the period, which is the primary driver.",
    citations: [
      {
        index: 1,
        title: "AHT Trend Report: Mortgage",
        url: "/reports/aht/mortgage/30d",
      },
      {
        index: 2,
        title: "AHT Trend Report: Banking",
        url: "/reports/aht/banking/30d",
      },
    ],
    timestamp: "2026-02-22T10:41:00Z",
  },
];

export const MOCK_SUGGESTIONS: string[] = [
  "What is driving the AHT increase in Card Services?",
  "Show me the top 5 trending topics across all LOBs",
  "Which queue groups have the highest transfer rates?",
  "Compare this week's FCR to last week by LOB",
  "Are there any compliance risks in recent Mortgage calls?",
  "What is the projected call volume for next Monday?",
];

export const MOCK_DISCOVERY_FILTERS = {
  lob: [
    { label: "All LOBs", value: "all" },
    { label: "Card Services", value: "card-services" },
    { label: "Banking", value: "banking" },
    { label: "Mortgage", value: "mortgage" },
    { label: "Auto", value: "auto" },
    { label: "Investments", value: "investments" },
  ],
  dateRange: [
    { label: "Today", value: "today" },
    { label: "Last 7 days", value: "7d" },
    { label: "Last 30 days", value: "30d" },
    { label: "Last 90 days", value: "90d" },
  ],
};

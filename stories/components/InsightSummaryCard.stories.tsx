import type { Meta, StoryObj } from "@storybook/nextjs";

import { InsightSummaryCard } from "@/components/salt-extended/insight-summary-card";

const meta = {
  title: "Cards/InsightSummaryCard",
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-[520px]">
      <InsightSummaryCard
        title="Daily AI Summary"
        summary="Transfer Rate is elevated at 18.3%, driven primarily by Card Services (22.1%). AHT is trending up 7.5% — Mortgage queue is the leading contributor. FCR remains stable at 74.5%."
        reasoning="Analyzed 12,847 calls across 5 LOBs. Transfer Rate delta (+4.1pp) exceeds the 3pp alert threshold. Card Services accounts for 42.3% of transfer volume increase. Mortgage AHT spike correlates with new documentation requirements implemented Jan 15."
        generatedAt="2026-02-22T09:15:00Z"
      />
    </div>
  ),
};

export const ReasoningOpen: Story = {
  name: "Reasoning Open",
  render: () => (
    <div className="w-[520px]">
      <InsightSummaryCard
        title="Fraud Alert False Positive Analysis"
        summary="Automated fraud detection system is generating false positives at 40%, well above the 15% acceptable threshold. New MCC flagging rule deployed 2/17 is the likely cause."
        reasoning={`Root cause analysis:
1. MCC flagging rule FRD-2026-0217-A was deployed on 2/17
2. Rule expanded the set of flagged merchant category codes by 34%
3. The expansion included several high-volume, low-risk categories
4. Pre-deployment testing only covered 12% of production transaction volume
5. Estimated volume impact: +2,100 unnecessary calls per day
6. Recommended action: Roll back rule or adjust thresholds to reduce false positive rate below 20%`}
        generatedAt="2026-02-22T07:00:00Z"
      />
    </div>
  ),
};

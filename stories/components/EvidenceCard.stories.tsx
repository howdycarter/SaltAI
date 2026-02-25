import type { Meta, StoryObj } from "@storybook/nextjs";

import { EvidenceCard } from "@/components/salt-extended/evidence-card";

const meta = {
  title: "Cards/EvidenceCard",
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithCitations: Story = {
  name: "With Citations",
  render: () => (
    <div className="w-[520px]">
      <EvidenceCard
        title="Transfer Rate Evidence"
        body="Card Services transfer rate increased from 18.0% to 22.1% over the past 24 hours. The primary driver is the payment processing delay topic, which shows 87% overlap in affected call segments. Disputes queue group accounts for 28.4% of transfers."
        sources={[
          {
            title: "Card Services Transfer Rate Dashboard",
            url: "https://analytics.chase.com/dashboards/transfer-rate",
            description:
              "Real-time transfer rate monitoring across all Card Services queues",
          },
          {
            title: "Payment Processing Delay Topic Analysis",
            url: "https://analytics.chase.com/trending/payment-delays",
            description:
              "AI-generated analysis of the payment processing delay trending topic",
          },
          {
            title: "Disputes Queue Performance Report",
            url: "https://analytics.chase.com/reports/disputes-q1-2026",
          },
        ]}
        citations={[
          {
            index: 1,
            title: "Card Services Transfer Rate Dashboard",
            url: "https://analytics.chase.com/dashboards/transfer-rate",
          },
          {
            index: 2,
            title: "Payment Processing Delay Topic Analysis",
            url: "https://analytics.chase.com/trending/payment-delays",
          },
        ]}
      />
    </div>
  ),
};

export const WithoutCitations: Story = {
  name: "Without Citations",
  render: () => (
    <div className="w-[520px]">
      <EvidenceCard
        title="General Performance Overview"
        body="Overall call center performance remains within acceptable ranges. Average handle time is 8:07 across all lines of business. First call resolution is stable at 74.5%, consistent with the 30-day trailing average."
        sources={[
          {
            title: "Daily Performance Summary",
            url: "https://analytics.chase.com/reports/daily-summary",
            description: "Automated daily roll-up of key performance metrics",
          },
        ]}
        citations={[]}
      />
    </div>
  ),
};

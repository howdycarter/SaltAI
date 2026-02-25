import type { Meta, StoryObj } from "@storybook/nextjs";

import { InsightsPanel } from "@/components/salt-extended/insights-panel";
import { MOCK_INSIGHTS } from "@/lib/mock/call-review";
import type { CallInsights } from "@/types/call-review";

const meta = {
  title: "Call Review/Insights Panel",
  component: InsightsPanel,
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 400 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof InsightsPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    insights: MOCK_INSIGHTS,
  },
};

export const Loading: Story = {
  args: {
    insights: MOCK_INSIGHTS,
    loading: true,
  },
};

const noSentimentInsights: CallInsights = {
  ...MOCK_INSIGHTS,
  sentiment: undefined,
};

export const NoSentiment: Story = {
  args: {
    insights: noSentimentInsights,
  },
};

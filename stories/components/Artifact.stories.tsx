import type { Meta, StoryObj } from "@storybook/nextjs";

import { Artifact } from "@/components/salt-extended/artifact";

const meta = {
  title: "Components/AI/Artifact",
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Document: Story = {
  render: () => (
    <div className="w-[500px]">
      <Artifact title="Call Summary Report" type="document" expanded>
        <div className="prose prose-sm">
          <p>
            The call between Agent Smith and the customer lasted 12 minutes. Key
            topics discussed include billing inquiries and service upgrades.
          </p>
        </div>
      </Artifact>
    </div>
  ),
};

export const Collapsed: Story = {
  render: () => (
    <div className="w-[500px] space-y-2">
      <Artifact title="analysis.py" type="code" />
      <Artifact title="sentiment-chart.png" type="image" />
      <Artifact title="Monthly Metrics" type="chart" />
    </div>
  ),
};

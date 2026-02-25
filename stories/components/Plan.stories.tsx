import type { Meta, StoryObj } from "@storybook/nextjs";

import { Plan } from "@/components/salt-extended/plan";

const meta = {
  title: "Components/AI/Plan",
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-[400px]">
      <Plan
        title="Call Analysis Plan"
        steps={[
          { label: "Load and parse transcript", status: "completed" },
          { label: "Identify speakers and roles", status: "completed" },
          { label: "Analyze sentiment per segment", status: "active" },
          { label: "Extract action items", status: "pending" },
          { label: "Generate executive summary", status: "pending" },
        ]}
      />
    </div>
  ),
};

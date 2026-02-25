import type { Meta, StoryObj } from "@storybook/nextjs";

import { GraphEdge } from "@/components/salt-extended/graph-edge";

const meta = {
  title: "Components/AI/GraphEdge",
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="relative h-[150px] w-[300px]">
      <GraphEdge x1={20} y1={30} x2={280} y2={120} />
    </div>
  ),
};

export const WithLabel: Story = {
  name: "With Label",
  render: () => (
    <div className="relative h-[150px] w-[300px]">
      <GraphEdge
        x1={20}
        y1={30}
        x2={280}
        y2={120}
        label="data"
        variant="active"
      />
    </div>
  ),
};

export const Animated: Story = {
  render: () => (
    <div className="relative h-[150px] w-[300px]">
      <GraphEdge x1={20} y1={75} x2={280} y2={75} animated variant="active" />
    </div>
  ),
};

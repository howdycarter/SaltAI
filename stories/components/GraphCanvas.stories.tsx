import type { Meta, StoryObj } from "@storybook/nextjs";

import { GraphCanvas } from "@/components/salt-extended/graph-canvas";
import { GraphNode } from "@/components/salt-extended/graph-node";

const meta = {
  title: "Components/AI/GraphCanvas",
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="h-[400px] w-[600px]">
      <GraphCanvas>
        <GraphNode
          label="Input"
          status="completed"
          x={50}
          y={100}
          outputs={1}
        />
        <GraphNode
          label="Process"
          status="active"
          x={250}
          y={80}
          inputs={1}
          outputs={1}
        />
        <GraphNode label="Output" status="idle" x={450} y={100} inputs={1} />
      </GraphCanvas>
    </div>
  ),
};

export const Empty: Story = {
  render: () => (
    <div className="h-[300px] w-[600px]">
      <GraphCanvas showGrid />
    </div>
  ),
};

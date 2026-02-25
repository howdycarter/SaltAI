import type { Meta, StoryObj } from "@storybook/nextjs";

import { GraphNode } from "@/components/salt-extended/graph-node";

const meta = {
  title: "Components/AI/GraphNode",
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllStates: Story = {
  name: "All States",
  render: () => (
    <div className="flex items-center gap-6">
      <GraphNode label="Idle" status="idle" inputs={1} outputs={1} />
      <GraphNode label="Active" status="active" inputs={2} outputs={1} />
      <GraphNode label="Completed" status="completed" inputs={1} outputs={2} />
      <GraphNode label="Error" status="error" inputs={1} outputs={0} />
    </div>
  ),
};

export const Simple: Story = {
  render: () => (
    <GraphNode label="Process Data" status="active" inputs={1} outputs={1} />
  ),
};

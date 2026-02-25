import type { Meta, StoryObj } from "@storybook/nextjs";

import { AgentDisplay } from "@/components/salt-extended/agent-display";

const meta = {
  title: "Components/AI/AgentDisplay",
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Working: Story = {
  render: () => (
    <div className="w-[400px]">
      <AgentDisplay
        name="Analyst"
        jobRole="Call Review Agent"
        status="working"
        currentTask="Analyzing sentiment patterns"
        tools={[
          { name: "search", status: "done" },
          { name: "analyze", status: "active" },
          { name: "summarize", status: "idle" },
        ]}
      />
    </div>
  ),
};

export const Idle: Story = {
  render: () => (
    <div className="w-[400px]">
      <AgentDisplay name="Assistant" jobRole="General Purpose" status="idle" />
    </div>
  ),
};

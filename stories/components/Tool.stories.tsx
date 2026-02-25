import type { Meta, StoryObj } from "@storybook/nextjs";

import { Tool } from "@/components/salt-extended/tool";

const meta = {
  title: "Components/AI/Tool",
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Completed: Story = {
  render: () => (
    <div className="w-[450px]">
      <Tool
        name="search_documents"
        description="Search internal knowledge base"
        status="completed"
        params={{ query: "quarterly revenue", limit: 5 }}
        output="Found 3 matching documents"
        duration={234}
      />
    </div>
  ),
};

export const Running: Story = {
  render: () => (
    <div className="w-[450px]">
      <Tool
        name="analyze_sentiment"
        status="running"
        params={{ text: "Customer seems frustrated..." }}
      />
    </div>
  ),
};

export const Error: Story = {
  render: () => (
    <div className="w-[450px]">
      <Tool
        name="fetch_api"
        status="error"
        output="Error: 429 Too Many Requests"
        duration={1500}
      />
    </div>
  ),
};

import type { Meta, StoryObj } from "@storybook/nextjs";

import { ChainOfThought } from "@/components/salt-extended/chain-of-thought";

const meta = {
  title: "Components/AI/ChainOfThought",
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const InProgress: Story = {
  name: "In Progress",
  render: () => (
    <div className="w-[350px]">
      <ChainOfThought
        steps={[
          {
            label: "Parsing transcript",
            description: "Extracted 47 utterances",
            status: "completed",
          },
          {
            label: "Identifying speakers",
            description: "Found 2 speakers",
            status: "completed",
          },
          {
            label: "Analyzing sentiment",
            description: "Processing emotional cues...",
            status: "active",
          },
          { label: "Generating summary", status: "pending" },
        ]}
      />
    </div>
  ),
};

export const AllCompleted: Story = {
  name: "All Completed",
  render: () => (
    <div className="w-[350px]">
      <ChainOfThought
        steps={[
          { label: "Data loaded", status: "completed" },
          { label: "Analysis complete", status: "completed" },
          { label: "Report generated", status: "completed" },
        ]}
      />
    </div>
  ),
};

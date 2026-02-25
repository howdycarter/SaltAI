import type { Meta, StoryObj } from "@storybook/nextjs";

import { ContextPanel } from "@/components/salt-extended/context-panel";

const meta = {
  title: "Components/AI/ContextPanel",
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-[350px]">
      <ContextPanel
        items={[
          {
            type: "file",
            label: "transcript.json",
            preview: "Call transcript from 2024-02-15",
          },
          {
            type: "selection",
            label: "Lines 42-58",
            preview: "Customer complaint about billing...",
          },
          { type: "url", label: "https://docs.example.com/api" },
          {
            type: "text",
            label: "Custom instructions",
            preview: "Focus on sentiment analysis and action items",
          },
        ]}
      />
    </div>
  ),
};

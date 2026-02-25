import type { Meta, StoryObj } from "@storybook/nextjs";

import { Checkpoint } from "@/components/salt-extended/checkpoint";

const meta = {
  title: "Components/AI/Checkpoint",
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-[400px]">
      <Checkpoint
        label="After transcript analysis"
        timestamp="2 minutes ago"
        onRestore={() => {}}
      />
    </div>
  ),
};

export const NoRestore: Story = {
  name: "Without Restore Button",
  render: () => (
    <div className="w-[400px]">
      <Checkpoint label="Conversation start" timestamp="10 minutes ago" />
    </div>
  ),
};

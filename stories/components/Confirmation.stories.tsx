import type { Meta, StoryObj } from "@storybook/nextjs";

import { Confirmation } from "@/components/salt-extended/confirmation";

const meta = {
  title: "Components/AI/Confirmation",
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-[400px]">
      <Confirmation
        title="Run this command?"
        description="The AI wants to execute the following action"
        action="npm install lodash@latest"
      />
    </div>
  ),
};

export const Destructive: Story = {
  render: () => (
    <div className="w-[400px]">
      <Confirmation
        title="Delete all test data?"
        description="This action cannot be undone"
        action="DROP TABLE test_data;"
        variant="destructive"
      />
    </div>
  ),
};

export const Simple: Story = {
  render: () => (
    <div className="w-[400px]">
      <Confirmation title="Send this email to the customer?" />
    </div>
  ),
};

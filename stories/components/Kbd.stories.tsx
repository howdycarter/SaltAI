import type { Meta, StoryObj } from "@storybook/nextjs";

import { Kbd } from "@/components/salt-extended/kbd";

const meta = {
  title: "Components/Feedback & Input/Kbd",
  component: Kbd,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleKey: Story = {
  name: "Single Key",
  render: () => <Kbd>K</Kbd>,
};

export const Combo: Story = {
  name: "Key Combination",
  render: () => (
    <div className="flex items-center gap-1">
      <Kbd>⌘</Kbd>
      <Kbd>K</Kbd>
    </div>
  ),
};

export const WithDescription: Story = {
  name: "With Description",
  render: () => (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-8">
        <span className="text-sm">Open Command Palette</span>
        <div className="flex items-center gap-1">
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </div>
      </div>
      <div className="flex items-center justify-between gap-8">
        <span className="text-sm">New Investigation</span>
        <div className="flex items-center gap-1">
          <Kbd>⌘</Kbd>
          <Kbd>N</Kbd>
        </div>
      </div>
      <div className="flex items-center justify-between gap-8">
        <span className="text-sm">Export Report</span>
        <div className="flex items-center gap-1">
          <Kbd>⌘</Kbd>
          <Kbd>E</Kbd>
        </div>
      </div>
      <div className="flex items-center justify-between gap-8">
        <span className="text-sm">Toggle Sidebar</span>
        <div className="flex items-center gap-1">
          <Kbd>⌘</Kbd>
          <Kbd>B</Kbd>
        </div>
      </div>
    </div>
  ),
};

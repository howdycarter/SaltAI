import type { Meta, StoryObj } from "@storybook/nextjs";

import { Connection } from "@/components/salt-extended/connection";

const meta = {
  title: "Components/AI/Connection",
  component: Connection,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Connection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Connected: Story = {
  render: () => <Connection status="connected" />,
};

export const Disconnected: Story = {
  render: () => <Connection status="disconnected" />,
};

export const Error: Story = {
  render: () => <Connection status="error" />,
};

export const Connecting: Story = {
  render: () => <Connection status="connecting" />,
};

export const AllStates: Story = {
  name: "All States",
  render: () => (
    <div className="flex flex-col gap-3">
      <Connection status="connected" />
      <Connection status="connecting" />
      <Connection status="disconnected" />
      <Connection status="error" label="Connection lost" />
    </div>
  ),
};

export const DotOnly: Story = {
  name: "Dot Only (No Label)",
  render: () => (
    <div className="flex items-center gap-4">
      <Connection status="connected" showLabel={false} />
      <Connection status="error" showLabel={false} />
    </div>
  ),
};

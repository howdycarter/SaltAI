import type { Meta, StoryObj } from "@storybook/nextjs";

import { Matrix } from "@/components/salt-extended/matrix";

const meta = {
  title: "Components/Conversational AI/Matrix Display",
  component: Matrix,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Matrix>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Wave: Story = {
  render: () => <Matrix preset="wave" rows={5} cols={12} />,
};

export const Pulse: Story = {
  render: () => <Matrix preset="pulse" rows={5} cols={12} />,
};

export const Loader: Story = {
  render: () => <Matrix preset="loader" rows={3} cols={16} />,
};

export const Snake: Story = {
  render: () => <Matrix preset="snake" rows={4} cols={10} />,
};

export const Digits: Story = {
  render: () => <Matrix preset="digits" rows={6} cols={14} />,
};

export const AllPresets: Story = {
  name: "All Presets",
  render: () => (
    <div className="flex flex-wrap items-start gap-8">
      {(["wave", "pulse", "loader", "snake", "digits"] as const).map((p) => (
        <div key={p} className="text-center">
          <Matrix preset={p} rows={4} cols={10} />
          <span className="text-muted-foreground mt-2 block text-xs capitalize">
            {p}
          </span>
        </div>
      ))}
    </div>
  ),
};

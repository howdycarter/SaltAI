import type { Meta, StoryObj } from "@storybook/nextjs";

import { StatusChip } from "@/components/salt-extended";

const meta = {
  title: "Components/StatusChip",
  component: StatusChip,
  parameters: { layout: "centered" },
} satisfies Meta<typeof StatusChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Total",
    value: 42,
  },
};

export const Critical: Story = {
  args: {
    label: "Critical",
    value: 7,
    color: "critical",
  },
};

export const ColorVariants: Story = {
  name: "All Color Variants",
  args: { label: "Default", value: 100 },
  render: () => (
    <div className="flex flex-wrap gap-3">
      <StatusChip label="Default" value={100} />
      <StatusChip label="Critical" value={5} color="critical" />
      <StatusChip label="Red" value={12} color="red" />
      <StatusChip label="Amber" value={8} color="amber" />
      <StatusChip label="Blue" value={3} color="blue" />
      <StatusChip label="Purple" value={15} color="purple" />
    </div>
  ),
};

export const StringValues: Story = {
  name: "With String Values",
  args: { label: "Fastest Riser", value: "Card Fraud Calls" },
  render: () => (
    <div className="flex flex-wrap gap-3">
      <StatusChip label="Fastest Riser" value="Card Fraud Calls" />
      <StatusChip label="Highest Impact" value="Transfer Issues" />
    </div>
  ),
};

import type { Meta, StoryObj } from "@storybook/nextjs";

import { Branch } from "@/components/salt-extended/branch";

const meta = {
  title: "Components/AI/Branch",
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Branch current={2} total={3} />,
};

export const First: Story = {
  name: "First Version",
  render: () => <Branch current={1} total={5} />,
};

export const Last: Story = {
  name: "Last Version",
  render: () => <Branch current={5} total={5} />,
};

export const Single: Story = {
  name: "Single Version",
  render: () => <Branch current={1} total={1} />,
};

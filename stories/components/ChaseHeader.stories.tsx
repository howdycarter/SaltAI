import type { Meta, StoryObj } from "@storybook/nextjs";

import { Button } from "@/components/salt-extended/button";
import { ChaseHeader } from "@/components/salt-extended/chase-header";

const meta = {
  title: "Components/Chase Brand/Header",
  component: ChaseHeader,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof ChaseHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <ChaseHeader />,
};

export const WithActions: Story = {
  name: "With Actions",
  render: () => (
    <ChaseHeader>
      <Button variant="outline" size="sm">
        Export
      </Button>
      <Button size="sm">New Investigation</Button>
    </ChaseHeader>
  ),
};

export const Minimal: Story = {
  render: () => <ChaseHeader />,
};

export const MobileMenu: Story = {
  name: "Mobile — Hamburger Menu",
  parameters: {
    viewport: { defaultViewport: "mobile1" },
    nextjs: { navigation: { pathname: "/" } },
  },
  render: () => <ChaseHeader />,
};

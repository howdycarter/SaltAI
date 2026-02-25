import type { Meta, StoryObj } from "@storybook/nextjs";

import { ChaseFooter } from "@/components/salt-extended/chase-footer";

const meta = {
  title: "Components/Chase Brand/Footer",
  component: ChaseFooter,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof ChaseFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

const footerLinks = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Accessibility", href: "/accessibility" },
  { label: "Contact Us", href: "/contact" },
];

export const Default: Story = {
  render: () => <ChaseFooter links={footerLinks} />,
};

export const Minimal: Story = {
  render: () => <ChaseFooter />,
};

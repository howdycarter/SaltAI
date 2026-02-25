import type { Meta, StoryObj } from "@storybook/nextjs";

import { ShimmeringText } from "@/components/salt-extended/shimmering-text";

const meta = {
  title: "Components/Conversational AI/Shimmering Text",
  component: ShimmeringText,
  parameters: { layout: "centered" },
} satisfies Meta<typeof ShimmeringText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: "Insights Application" },
  render: () => (
    <ShimmeringText as="h2" className="text-2xl font-bold">
      Insights Application
    </ShimmeringText>
  ),
};

export const Heading: Story = {
  name: "Page Title",
  args: { children: "TorqueAI Discovery" },
  render: () => (
    <ShimmeringText as="h1" className="text-4xl font-bold">
      TorqueAI Discovery
    </ShimmeringText>
  ),
};

export const Inline: Story = {
  args: { children: "TorqueAI" },
  render: () => (
    <p className="text-sm">
      Powered by{" "}
      <ShimmeringText className="font-semibold">TorqueAI</ShimmeringText>
    </p>
  ),
};

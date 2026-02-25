import type { Meta, StoryObj } from "@storybook/nextjs";

import { Reasoning } from "@/components/salt-extended/reasoning";

const meta = {
  title: "Components/AI/Reasoning",
  component: Reasoning,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Reasoning>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-[500px]">
      <Reasoning duration={2340} defaultOpen>
        <p>
          Let me analyze the call transcript to identify key sentiment
          changes...
        </p>
        <p className="mt-2">
          The customer started with a neutral tone but became frustrated around
          the 3-minute mark when discussing billing issues.
        </p>
      </Reasoning>
    </div>
  ),
};

export const Collapsed: Story = {
  render: () => (
    <div className="w-[500px]">
      <Reasoning duration={1500}>
        <p>Hidden reasoning content</p>
      </Reasoning>
    </div>
  ),
};

export const CustomTitle: Story = {
  name: "Custom Title",
  render: () => (
    <div className="w-[500px]">
      <Reasoning title="Analysis" duration={5200} defaultOpen>
        <p>Performing deep analysis of conversation patterns...</p>
      </Reasoning>
    </div>
  ),
};

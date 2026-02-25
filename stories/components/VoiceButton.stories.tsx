import type { Meta, StoryObj } from "@storybook/nextjs";

import { VoiceButton } from "@/components/salt-extended/voice-button";

const meta = {
  title: "Components/Conversational AI/Voice Button",
  component: VoiceButton,
  parameters: { layout: "centered" },
} satisfies Meta<typeof VoiceButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <VoiceButton />,
};

export const Disabled: Story = {
  render: () => <VoiceButton disabled />,
};

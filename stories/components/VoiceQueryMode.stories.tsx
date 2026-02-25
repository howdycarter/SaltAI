import type { Meta, StoryObj } from "@storybook/nextjs";

import { VoiceQueryMode } from "@/components/salt-extended";

const meta = {
  title: "Components/VoiceQueryMode",
  component: VoiceQueryMode,
  parameters: { layout: "centered" },
} satisfies Meta<typeof VoiceQueryMode>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithCallbacks: Story = {
  args: {
    onTranscript: (text: string) => console.log("[onTranscript]", text),
    onSubmit: (text: string) => console.log("[onSubmit]", text),
  },
};

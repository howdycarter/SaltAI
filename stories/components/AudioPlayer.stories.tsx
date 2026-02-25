import type { Meta, StoryObj } from "@storybook/nextjs";

import { AudioPlayer } from "@/components/salt-extended/audio-player";

const meta = {
  title: "Components/Audio & Visualization/Audio Player",
  component: AudioPlayer,
  parameters: { layout: "padded" },
} satisfies Meta<typeof AudioPlayer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { src: "" },
  render: () => (
    <div className="max-w-md">
      <p className="text-muted-foreground mb-2 text-xs">
        Call Recording — CRD-0147832
      </p>
      <AudioPlayer src="" />
    </div>
  ),
};

export const Wide: Story = {
  name: "Full Width",
  args: { src: "" },
  render: () => (
    <div>
      <p className="text-muted-foreground mb-2 text-xs">
        Call Recording — CRD-0147833 (Balance Inquiry)
      </p>
      <AudioPlayer src="" className="w-full" />
    </div>
  ),
};

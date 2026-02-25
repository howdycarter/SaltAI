import type { Meta, StoryObj } from "@storybook/nextjs";

import { LiveWaveform } from "@/components/salt-extended/live-waveform";

const meta = {
  title: "Components/Audio & Visualization/Live Waveform",
  component: LiveWaveform,
  parameters: { layout: "padded" },
} satisfies Meta<typeof LiveWaveform>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NoStream: Story = {
  name: "Idle (No Stream)",
  render: () => (
    <div className="max-w-lg rounded-lg border p-4">
      <p className="text-muted-foreground mb-2 text-xs">
        Live waveform requires a MediaStream from the microphone. Click the
        Voice Button in a live app to activate.
      </p>
      <LiveWaveform stream={null} className="h-16 w-full" />
    </div>
  ),
};

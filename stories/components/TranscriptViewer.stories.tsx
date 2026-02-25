import type { Meta, StoryObj } from "@storybook/nextjs";
import * as React from "react";

import { TranscriptViewer } from "@/components/salt-extended/transcript-viewer";
import { MOCK_ALIGNMENT } from "@/lib/mock/transcript-alignment";

const meta = {
  title: "Components/Audio & Visualization/Transcript Viewer",
  component: TranscriptViewer,
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TranscriptViewer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    audioSrc: "https://cdn.freesound.org/previews/612/612095_5674468-lq.mp3",
    audioType: "audio/mpeg",
    alignment: MOCK_ALIGNMENT,
  },
};

export const HideAudioTags: Story = {
  args: {
    audioSrc: "https://cdn.freesound.org/previews/612/612095_5674468-lq.mp3",
    audioType: "audio/mpeg",
    alignment: MOCK_ALIGNMENT,
    hideAudioTags: true,
  },
};

function InteractiveDemo() {
  const [clickedTime, setClickedTime] = React.useState<number | null>(null);

  return (
    <div className="space-y-4">
      <TranscriptViewer
        audioSrc="https://cdn.freesound.org/previews/612/612095_5674468-lq.mp3"
        audioType="audio/mpeg"
        alignment={MOCK_ALIGNMENT}
        onWordClick={(time) => setClickedTime(time)}
      />
      {clickedTime !== null && (
        <p className="text-muted-foreground text-xs">
          Last word clicked at: {clickedTime.toFixed(2)}s
        </p>
      )}
    </div>
  );
}

export const Interactive: Story = {
  args: {
    audioSrc: "https://cdn.freesound.org/previews/612/612095_5674468-lq.mp3",
    alignment: MOCK_ALIGNMENT,
  },
  render: () => <InteractiveDemo />,
};

export const CustomLayout: Story = {
  args: {
    audioSrc: "https://cdn.freesound.org/previews/612/612095_5674468-lq.mp3",
    alignment: MOCK_ALIGNMENT,
  },
  render: () => (
    <TranscriptViewer
      audioSrc="https://cdn.freesound.org/previews/612/612095_5674468-lq.mp3"
      audioType="audio/mpeg"
      alignment={MOCK_ALIGNMENT}
    >
      <div className="flex items-start gap-4">
        <div className="shrink-0">
          <TranscriptViewer.PlayPauseButton />
        </div>
        <div className="flex-1 space-y-3">
          <TranscriptViewer.Words />
          <TranscriptViewer.ScrubBar />
        </div>
      </div>
    </TranscriptViewer>
  ),
};

import type { Meta, StoryObj } from "@storybook/nextjs";
import * as React from "react";

import {
  type PlaybackSpeed,
  TranscriptAudioPlayer,
} from "@/components/salt-extended/transcript-audio-player";
import { TranscriptPanel } from "@/components/salt-extended/transcript-panel";
import { useCallAudio } from "@/hooks/use-call-audio";
import { MOCK_TRANSCRIPT } from "@/lib/mock/call-review";

const meta = {
  title: "Call Review/Audio Player",
  component: TranscriptAudioPlayer,
  parameters: { layout: "padded" },
} satisfies Meta<typeof TranscriptAudioPlayer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: "",
    currentTime: 42,
    duration: 482,
    playing: false,
    speed: 1.0,
    onTogglePlay: () => {},
    onSeek: () => {},
    onSpeedChange: () => {},
  },
};

export const Playing: Story = {
  args: {
    src: "",
    currentTime: 68,
    duration: 482,
    playing: true,
    speed: 1.5,
    onTogglePlay: () => {},
    onSeek: () => {},
    onSpeedChange: () => {},
  },
};

/**
 * Full integration: audio player bar + transcript with segment
 * highlighting and click-to-seek. Uses the useCallAudio hook.
 */
function IntegrationDemo() {
  const audio = useCallAudio({
    src: "",
    segments: MOCK_TRANSCRIPT,
  });

  // Simulated playback for demo (no real audio)
  const [simTime, setSimTime] = React.useState(0);
  const intervalRef = React.useRef<ReturnType<typeof setInterval>>(null);
  const [simPlaying, setSimPlaying] = React.useState(false);
  const [speed, setSpeed] = React.useState<PlaybackSpeed>(1.0);

  React.useEffect(() => {
    if (simPlaying) {
      intervalRef.current = setInterval(() => {
        setSimTime((t) => {
          if (t >= 130) {
            setSimPlaying(false);
            return 130;
          }
          return t + 0.1 * speed;
        });
      }, 100);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [simPlaying, speed]);

  // Find active segment
  let activeId: string | null = null;
  for (let i = MOCK_TRANSCRIPT.length - 1; i >= 0; i--) {
    if (MOCK_TRANSCRIPT[i].timestamp <= simTime) {
      activeId = MOCK_TRANSCRIPT[i].id;
      break;
    }
  }

  return (
    <div className="border-[var(--salt-container-borderColor,theme(colors.border))] mx-auto max-w-2xl overflow-hidden rounded-lg border">
      <TranscriptAudioPlayer
        src=""
        currentTime={simTime}
        duration={130}
        playing={simPlaying}
        speed={speed}
        onTogglePlay={() => setSimPlaying(!simPlaying)}
        onSeek={(t) => setSimTime(t)}
        onSpeedChange={setSpeed}
      />
      <div className="max-h-96 overflow-y-auto">
        <TranscriptPanel
          segments={MOCK_TRANSCRIPT}
          activeSegmentId={activeId}
          onSegmentClick={(t) => {
            setSimTime(t);
            void audio;
          }}
        />
      </div>
    </div>
  );
}

export const WithTranscriptSync: Story = {
  args: {
    src: "",
    currentTime: 0,
    duration: 130,
    playing: false,
    speed: 1.0,
    onTogglePlay: () => {},
    onSeek: () => {},
    onSpeedChange: () => {},
  },
  render: () => <IntegrationDemo />,
};

export const NoEntitlement: Story = {
  args: {
    src: "",
    currentTime: 0,
    duration: 0,
    playing: false,
    speed: 1.0,
    onTogglePlay: () => {},
    onSeek: () => {},
    onSpeedChange: () => {},
  },
  render: () => (
    <div className="mx-auto max-w-2xl">
      <p className="text-muted-foreground mb-4 text-sm">
        Audio player is hidden when hasAudioEntitlement is false. Only the
        transcript is shown:
      </p>
      <div className="border-[var(--salt-container-borderColor,theme(colors.border))] overflow-hidden rounded-lg border">
        <div className="max-h-96 overflow-y-auto">
          <TranscriptPanel segments={MOCK_TRANSCRIPT} />
        </div>
      </div>
    </div>
  ),
};

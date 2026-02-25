import type { Meta, StoryObj } from "@storybook/nextjs";
import * as React from "react";

import { SpeechInput } from "@/components/salt-extended/speech-input";

const meta = {
  title: "Components/Audio & Visualization/Speech Input",
  component: SpeechInput,
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SpeechInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Small: Story = {
  args: {
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
  },
};

/**
 * Simulates a recording session with live transcript updates.
 * Click the mic button to start, then watch text stream in.
 */
function RecordingDemo() {
  const [transcript, setTranscript] = React.useState("");
  const [isRecording, setIsRecording] = React.useState(false);
  const intervalRef = React.useRef<ReturnType<typeof setInterval>>(null);

  const words = [
    "Hello,",
    "this",
    "is",
    "a",
    "demonstration",
    "of",
    "real-time",
    "speech",
    "to",
    "text",
    "transcription.",
    "The",
    "words",
    "appear",
    "as",
    "they",
    "are",
    "spoken.",
  ];

  React.useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleStart = () => {
    setIsRecording(true);
    setTranscript("");
    let idx = 0;
    intervalRef.current = setInterval(() => {
      if (idx < words.length) {
        setTranscript((prev) => (prev ? `${prev} ${words[idx]}` : words[idx]));
        idx++;
      } else {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }, 300);
  };

  const handleStop = () => {
    setIsRecording(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleCancel = () => {
    setIsRecording(false);
    setTranscript("");
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  return (
    <div className="space-y-4">
      <SpeechInput
        onStart={handleStart}
        onStop={handleStop}
        onCancel={handleCancel}
        onChange={setTranscript}
      />
      {isRecording && (
        <p className="text-muted-foreground text-xs">
          Recording... transcript length: {transcript.length}
        </p>
      )}
      {!isRecording && transcript && (
        <p className="text-xs">
          <strong>Final:</strong> {transcript}
        </p>
      )}
    </div>
  );
}

export const WithTranscript: Story = {
  render: () => <RecordingDemo />,
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <SpeechInput size="sm" />
      <SpeechInput size="default" />
      <SpeechInput size="lg" />
    </div>
  ),
};

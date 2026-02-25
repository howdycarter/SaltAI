import type { Meta, StoryObj } from "@storybook/nextjs";
import * as React from "react";

import { VoicePicker } from "@/components/salt-extended/voice-picker";
import { MOCK_VOICES } from "@/lib/mock/voices";

const meta = {
  title: "Components/Audio & Visualization/Voice Picker",
  component: VoicePicker,
  parameters: { layout: "centered" },
} satisfies Meta<typeof VoicePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    voices: MOCK_VOICES,
  },
};

export const WithSelection: Story = {
  args: {
    voices: MOCK_VOICES,
    value: "v-rachel-001",
  },
};

export const Empty: Story = {
  args: {
    voices: [],
  },
};

const manyVoices = Array.from({ length: 24 }, (_, i) => ({
  voice_id: `v-gen-${i}`,
  name: `Voice ${i + 1}`,
  labels: {
    accent: ["American", "British", "Australian", "Swedish"][i % 4],
    gender: i % 2 === 0 ? "Female" : "Male",
    age: ["Young", "Middle-aged", "Old"][i % 3],
  },
}));

export const ManyVoices: Story = {
  args: {
    voices: manyVoices,
  },
};

function ControlledExample() {
  const [value, setValue] = React.useState("v-emily-004");
  return (
    <div className="space-y-2">
      <VoicePicker
        voices={MOCK_VOICES}
        value={value}
        onValueChange={setValue}
      />
      <p className="text-muted-foreground text-xs">
        Selected: {value || "none"}
      </p>
    </div>
  );
}

export const Controlled: Story = {
  args: { voices: MOCK_VOICES },
  render: () => <ControlledExample />,
};

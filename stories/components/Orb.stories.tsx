import type { Meta, StoryObj } from "@storybook/nextjs";

import { Orb } from "@/components/salt-extended/orb";

const meta = {
  title: "Components/Audio & Visualization/Orb",
  component: Orb,
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div style={{ width: 200, height: 200 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Orb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    agentState: null,
  },
};

export const Listening: Story = {
  args: {
    agentState: "listening",
  },
};

export const Talking: Story = {
  args: {
    agentState: "talking",
  },
};

export const Thinking: Story = {
  args: {
    agentState: "thinking",
  },
};

export const CustomColors: Story = {
  args: {
    agentState: "talking",
    colors: ["#ff6b6b", "#ffd93d"],
  },
};

export const AllStates: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: "auto", height: "auto" }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div className="flex items-end gap-8">
      {(
        [
          { state: null, label: "Idle" },
          { state: "listening", label: "Listening" },
          { state: "talking", label: "Talking" },
          { state: "thinking", label: "Thinking" },
        ] as const
      ).map(({ state, label }) => (
        <div key={label} className="text-center">
          <div style={{ width: 150, height: 150 }}>
            <Orb agentState={state} />
          </div>
          <span className="text-muted-foreground mt-2 block text-xs">
            {label}
          </span>
        </div>
      ))}
    </div>
  ),
};

export const ManualVolume: Story = {
  args: {
    agentState: "talking",
    volumeMode: "manual",
    manualInput: 0.5,
    manualOutput: 0.8,
  },
};

export const Small: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: 64, height: 64 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    agentState: "listening",
  },
};

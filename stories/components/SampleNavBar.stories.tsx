import type { Meta, StoryObj } from "@storybook/nextjs";
import * as React from "react";

import { SampleNavBar } from "@/components/salt-extended/sample-nav-bar";
import type { SampleSet } from "@/types/call-review";

const MOCK_SAMPLE_SET: SampleSet = {
  callIds: Array.from({ length: 25 }, (_, i) => `CR-2026-0118-${47293 + i}`),
  totalCalls: 25,
  sliceDescription: "Card Services — Login Failure (Jan 2026)",
  samplingMethod: "Random 10%",
  sourceModule: "Investigation",
};

const meta = {
  title: "Call Review/Sample Nav Bar",
  component: SampleNavBar,
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-3xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SampleNavBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    sampleSet: MOCK_SAMPLE_SET,
    currentIndex: 2,
    onNavigate: () => {},
  },
};

export const AtFirstCall: Story = {
  args: {
    sampleSet: MOCK_SAMPLE_SET,
    currentIndex: 0,
    onNavigate: () => {},
  },
};

export const AtLastCall: Story = {
  args: {
    sampleSet: MOCK_SAMPLE_SET,
    currentIndex: 24,
    onNavigate: () => {},
  },
};

export const SingleCall: Story = {
  args: {
    sampleSet: {
      ...MOCK_SAMPLE_SET,
      callIds: ["CR-2026-0118-47293"],
      totalCalls: 1,
    },
    currentIndex: 0,
    onNavigate: () => {},
  },
};

function InteractiveDemo() {
  const [idx, setIdx] = React.useState(0);
  return (
    <div className="space-y-2">
      <SampleNavBar
        sampleSet={MOCK_SAMPLE_SET}
        currentIndex={idx}
        onNavigate={setIdx}
      />
      <p className="text-muted-foreground text-center text-xs">
        Current call: {MOCK_SAMPLE_SET.callIds[idx]}
      </p>
    </div>
  );
}

export const Interactive: Story = {
  args: {
    sampleSet: MOCK_SAMPLE_SET,
    currentIndex: 0,
    onNavigate: () => {},
  },
  render: () => <InteractiveDemo />,
};

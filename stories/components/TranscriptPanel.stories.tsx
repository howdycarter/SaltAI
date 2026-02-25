import type { Meta, StoryObj } from "@storybook/nextjs";

import { TranscriptPanel } from "@/components/salt-extended/transcript-panel";
import { MOCK_TRANSCRIPT } from "@/lib/mock/call-review";
import type { TranscriptSegment } from "@/types/call-review";

const meta = {
  title: "Call Review/Transcript Panel",
  component: TranscriptPanel,
  parameters: { layout: "padded" },
} satisfies Meta<typeof TranscriptPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    segments: MOCK_TRANSCRIPT,
  },
};

export const Empty: Story = {
  args: {
    segments: [],
  },
};

const redactedSegments: TranscriptSegment[] = [
  {
    id: "r-001",
    speaker: "agent",
    timestamp: 3,
    text: "Thank you for calling. Can I have your name and the last four digits of your card?",
  },
  {
    id: "r-002",
    speaker: "customer",
    timestamp: 8,
    text: "Sure, my name is [REDACTED] and the last four are [REDACTED].",
  },
  {
    id: "r-003",
    speaker: "agent",
    timestamp: 15,
    text: "Thank you, [REDACTED]. I can see your account ending in [REDACTED]. Let me pull up your recent transactions.",
  },
  {
    id: "r-004",
    speaker: "customer",
    timestamp: 22,
    text: "Yes, I see a charge from [REDACTED] on January 15th that I don't recognize.",
  },
  {
    id: "r-005",
    speaker: "system",
    timestamp: 30,
    text: "Agent accessed account [REDACTED] — transaction lookup initiated.",
  },
];

export const WithRedactions: Story = {
  args: {
    segments: redactedSegments,
  },
};

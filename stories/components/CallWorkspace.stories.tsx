import type { Meta, StoryObj } from "@storybook/nextjs";

import { CallWorkspace } from "@/components/salt-extended/call-workspace";
import { InsightsPanel } from "@/components/salt-extended/insights-panel";
import { MetadataPanel } from "@/components/salt-extended/metadata-panel";
import { TranscriptPanel } from "@/components/salt-extended/transcript-panel";
import {
  MOCK_CALL_METADATA,
  MOCK_INSIGHTS,
  MOCK_TRANSCRIPT,
} from "@/lib/mock/call-review";

const meta = {
  title: "Call Review/Call Workspace",
  component: CallWorkspace,
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div style={{ height: "100vh" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CallWorkspace>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    callId: "CR-2026-0118-47293",
  },
};

export const WithContent: Story = {
  args: {
    callId: "CR-2026-0118-47293",
    metadataContent: (
      <MetadataPanel metadata={MOCK_CALL_METADATA} showAgentId />
    ),
    transcriptContent: <TranscriptPanel segments={MOCK_TRANSCRIPT} />,
    insightsContent: <InsightsPanel insights={MOCK_INSIGHTS} />,
  },
};

export const Loading: Story = {
  args: {
    callId: "CR-2026-0118-47293",
    loading: true,
  },
};

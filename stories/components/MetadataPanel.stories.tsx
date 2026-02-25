import type { Meta, StoryObj } from "@storybook/nextjs";

import { MetadataPanel } from "@/components/salt-extended/metadata-panel";
import { MOCK_CALL_METADATA } from "@/lib/mock/call-review";
import type { CallMetadata } from "@/types/call-review";

const meta = {
  title: "Call Review/Metadata Panel",
  component: MetadataPanel,
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 320 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MetadataPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    metadata: MOCK_CALL_METADATA,
    showAgentId: true,
  },
};

const allFlagsMetadata: CallMetadata = {
  ...MOCK_CALL_METADATA,
  transferFlag: true,
  escalationFlag: true,
  fcrFlag: true,
};

export const WithAllFlags: Story = {
  args: {
    metadata: allFlagsMetadata,
    showAgentId: true,
  },
};

export const NoAgentId: Story = {
  args: {
    metadata: MOCK_CALL_METADATA,
    showAgentId: false,
  },
};

const sparseMetadata: CallMetadata = {
  callId: "CR-2026-0120-00001",
  dateTime: "2026-01-20T09:00:00Z",
  duration: 0,
  lob: "Unknown",
  queueGroup: "",
  queueSegment: "",
  taxonomyL1: "",
  taxonomyL2: "",
  lobTopics: [],
  transferFlag: false,
  escalationFlag: false,
  fcrFlag: false,
  handleTime: 0,
  afterCallWorkTime: 0,
};

export const MissingFields: Story = {
  args: {
    metadata: sparseMetadata,
    showAgentId: true,
  },
};

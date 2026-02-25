import type { Meta, StoryObj } from "@storybook/nextjs";

import {
  Message,
  MessageAvatar,
  MessageContent,
} from "@/components/salt-extended/message";

const meta = {
  title: "Components/Conversational AI/Message",
  component: Message,
  parameters: { layout: "padded" },
} satisfies Meta<typeof Message>;

export default meta;
type Story = StoryObj<typeof meta>;

export const UserMessage: Story = {
  name: "User",
  render: () => (
    <div className="mx-auto max-w-lg">
      <Message variant="user">
        <MessageAvatar className="bg-blue-600 text-white">HC</MessageAvatar>
        <MessageContent variant="user">
          Show me the top 5 emerging topics for this week
        </MessageContent>
      </Message>
    </div>
  ),
};

export const AssistantMessage: Story = {
  name: "Assistant",
  render: () => (
    <div className="mx-auto max-w-lg">
      <Message variant="assistant">
        <MessageAvatar>AI</MessageAvatar>
        <MessageContent variant="assistant">
          Here are the top 5 emerging topics for this week in Card Services: 1.
          Mobile App Crash (iOS 18.2) — +240%, 2. Fee Dispute (Annual) — +85%,
          3. Payment Declined (International) — +62%, 4. Statement Error (Double
          Charge) — +44%, 5. Reward Points Expiration — +31%.
        </MessageContent>
      </Message>
    </div>
  ),
};

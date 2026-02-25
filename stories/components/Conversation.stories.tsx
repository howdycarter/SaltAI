import type { Meta, StoryObj } from "@storybook/nextjs";

import { Conversation } from "@/components/salt-extended/conversation";
import {
  Message,
  MessageAvatar,
  MessageContent,
} from "@/components/salt-extended/message";

const meta = {
  title: "Components/Conversational AI/Conversation",
  component: Conversation,
  parameters: { layout: "padded" },
} satisfies Meta<typeof Conversation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="mx-auto max-w-lg rounded-lg border">
      <Conversation className="h-80">
        <Message variant="user">
          <MessageAvatar className="bg-blue-600 text-white">HC</MessageAvatar>
          <MessageContent variant="user">
            Why are login failure calls up 18% this week in Card Services?
          </MessageContent>
        </Message>
        <Message variant="assistant">
          <MessageAvatar>AI</MessageAvatar>
          <MessageContent variant="assistant">
            Login failure calls in Card Services rose 18% WoW (1,247 calls this
            week vs. 1,057 last week). The primary driver appears to be the new
            MFA enforcement policy rolled out on Dec 15. Approximately 72% of
            callers mention being locked out after failing the new security
            challenge on the mobile app.
          </MessageContent>
        </Message>
        <Message variant="user">
          <MessageAvatar className="bg-blue-600 text-white">HC</MessageAvatar>
          <MessageContent variant="user">
            Which specific user segments are most affected?
          </MessageContent>
        </Message>
        <Message variant="assistant">
          <MessageAvatar>AI</MessageAvatar>
          <MessageContent variant="assistant">
            The most affected segments are: (1) Customers aged 55+ who account
            for 41% of login failure calls, (2) First-time mobile app users who
            make up 28%, and (3) Customers with multiple linked accounts at 19%.
            The common thread is unfamiliarity with the updated MFA flow.
          </MessageContent>
        </Message>
      </Conversation>
    </div>
  ),
};

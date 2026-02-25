import type { Meta, StoryObj } from "@storybook/nextjs";

import { ConversationBar } from "@/components/salt-extended/conversation-bar";

const meta = {
  title: "Components/Conversational AI/Conversation Bar",
  component: ConversationBar,
  parameters: { layout: "padded" },
} satisfies Meta<typeof ConversationBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="mx-auto max-w-lg">
      <ConversationBar placeholder="Ask TorqueAI a question..." />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="mx-auto max-w-lg">
      <ConversationBar placeholder="Generating response..." disabled />
    </div>
  ),
};

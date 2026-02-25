import type { Meta, StoryObj } from "@storybook/nextjs";

import { OpenInChat } from "@/components/salt-extended/open-in-chat";

const meta = {
  title: "Components/AI/OpenInChat",
  component: OpenInChat,
  parameters: { layout: "centered" },
} satisfies Meta<typeof OpenInChat>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <OpenInChat url="https://chat.example.com/share/abc123" />,
};

export const WithoutUrl: Story = {
  name: "Without URL",
  render: () => <OpenInChat />,
};

export const CustomLabel: Story = {
  name: "Custom Label",
  render: () => (
    <OpenInChat
      url="https://chat.example.com/share/xyz"
      label="Continue in Chat"
    />
  ),
};

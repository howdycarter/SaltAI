import type { Meta, StoryObj } from "@storybook/nextjs";

import { Response } from "@/components/salt-extended/response";

const meta = {
  title: "Components/Conversational AI/Streaming Response",
  component: Response,
  parameters: { layout: "padded" },
} satisfies Meta<typeof Response>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { text: "" },
  render: () => (
    <div className="mx-auto max-w-lg rounded-lg border p-4">
      <Response
        text="Login failure calls in Card Services have increased 18% week-over-week. The primary driver is the new MFA enforcement policy, affecting 72% of callers who mention being locked out on the mobile app."
        speed={25}
      />
    </div>
  ),
};

export const Fast: Story = {
  args: { text: "" },
  render: () => (
    <div className="mx-auto max-w-lg rounded-lg border p-4">
      <Response
        text="Based on the analysis, the top recommendation is to add an in-app tutorial for the new MFA flow, targeting customers aged 55+ and first-time mobile users."
        speed={10}
      />
    </div>
  ),
};

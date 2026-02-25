import type { Meta, StoryObj } from "@storybook/nextjs";
import { toast } from "sonner";

import { Button } from "@/components/salt-extended/button";
import { Toaster } from "@/components/salt-extended/sonner";

const meta = {
  title: "Components/Feedback & Input/Toast (Sonner)",
  component: Toaster,
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <>
        <Story />
        <Toaster />
      </>
    ),
  ],
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() =>
        toast.success("Investigation saved", {
          description:
            '"Login Failure Spike — Dec 2025" saved to your workspace.',
        })
      }
    >
      Show Success Toast
    </Button>
  ),
};

export const Error: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() =>
        toast.error("Export failed", {
          description: "Unable to generate PDF. Please try again.",
        })
      }
    >
      Show Error Toast
    </Button>
  ),
};

export const WithAction: Story = {
  name: "With Action",
  render: () => (
    <Button
      variant="outline"
      onClick={() =>
        toast("Alert configured", {
          description:
            'You\'ll be notified when "Mobile App Crash" exceeds threshold.',
          action: {
            label: "Undo",
            onClick: () => toast("Alert removed"),
          },
        })
      }
    >
      Show Toast with Action
    </Button>
  ),
};

export const Loading: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() => {
        const id = toast.loading("Generating report...");
        setTimeout(() => {
          toast.success("Report ready", {
            id,
            description: "Card Services Weekly Summary is ready for download.",
          });
        }, 2000);
      }}
    >
      Show Loading Toast
    </Button>
  ),
};

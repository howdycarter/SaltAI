import type { Meta, StoryObj } from "@storybook/nextjs";
import { toast } from "sonner";

import { Button } from "@/components/salt-extended/button";
import { Toaster } from "@/components/salt-extended/sonner";

const meta = {
  title: "Patterns/Insights Application/Notification Stack",
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <>
        <Story />
        <Toaster />
      </>
    ),
  ],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/* ------------------------------------------------------------------ */
/*  Stories                                                            */
/* ------------------------------------------------------------------ */

export const Single: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() =>
        toast.info("Viewing Card Services for Jan 15–21", {
          description: "From Dashboard — filtered to General Inquiry queue.",
        })
      }
    >
      Show Notification
    </Button>
  ),
};

export const Stacked: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() => {
        toast.info("Viewing Card Services for Jan 15–21", {
          description: "From Dashboard — filtered to General Inquiry queue.",
        });
        toast.success("Report generated", {
          description: "Card Services Weekly Summary is ready for download.",
        });
        toast.warning("Fee disputes trending", {
          description:
            "Annual fee disputes approaching warning level — 18% above baseline.",
        });
      }}
    >
      Show 3 Notifications
    </Button>
  ),
};

export const Overflow: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() => {
        toast.info("Viewing Card Services for Jan 15–21", {
          description: "From Dashboard — filtered to General Inquiry queue.",
        });
        toast.success("Report generated", {
          description: "Card Services Weekly Summary is ready for download.",
        });
        toast.warning("Fee disputes trending", {
          description:
            "Annual fee disputes approaching warning level — 18% above baseline.",
        });
        toast.error("Critical: Mobile app crash spike", {
          description:
            "Call volume exceeded threshold — 240% spike detected in last 2 hours.",
        });
      }}
    >
      Show 4+ Notifications
    </Button>
  ),
};

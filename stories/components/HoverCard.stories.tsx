import type { Meta, StoryObj } from "@storybook/nextjs";
import { Phone, TrendingUp } from "lucide-react";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/salt-extended/hover-card";

const meta = {
  title: "Components/Feedback & Input/Hover Card",
  component: HoverCard,
  parameters: { layout: "centered" },
} satisfies Meta<typeof HoverCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <button className="text-sm font-medium text-blue-600 underline-offset-4 hover:underline">
          Login Failures
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Login Failures</h4>
          <p className="text-muted-foreground text-sm">
            Customer-reported inability to access accounts via web or mobile
            app.
          </p>
          <div className="text-muted-foreground flex items-center gap-4 pt-2 text-xs">
            <div className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              <span>1,247 calls this week</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              <span>+18% WoW</span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};

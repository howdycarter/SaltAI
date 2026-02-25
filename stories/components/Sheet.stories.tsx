import type { Meta, StoryObj } from "@storybook/nextjs";

import { Button } from "@/components/salt-extended/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/salt-extended/sheet";

const meta = {
  title: "Components/Navigation & Layout/Sheet",
  component: Sheet,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Right: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Right Sheet</Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Call Details</SheetTitle>
          <SheetDescription>
            Review metadata and AI insights for this call.
          </SheetDescription>
        </SheetHeader>
        <div className="space-y-4 py-4">
          <div>
            <div className="text-muted-foreground text-sm font-medium">
              Call ID
            </div>
            <div className="text-sm">CRD-2026-0147832</div>
          </div>
          <div>
            <div className="text-muted-foreground text-sm font-medium">
              Duration
            </div>
            <div className="text-sm">4:32</div>
          </div>
          <div>
            <div className="text-muted-foreground text-sm font-medium">
              Topic
            </div>
            <div className="text-sm">Login Failures — Password Reset</div>
          </div>
        </div>
        <SheetFooter>
          <Button variant="outline" size="sm">
            Export
          </Button>
          <Button size="sm">Open in Call Review</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const Left: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Left Sheet</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription>Adjust your analysis scope.</SheetDescription>
        </SheetHeader>
        <div className="space-y-3 py-4">
          <div className="text-sm">Time Range: Last 7 Days</div>
          <div className="text-sm">LOB: Card Services</div>
          <div className="text-sm">Queue: General Inquiry</div>
        </div>
      </SheetContent>
    </Sheet>
  ),
};

export const Bottom: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Bottom Sheet</Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Evidence Excerpts</SheetTitle>
          <SheetDescription>
            Representative call excerpts for this investigation.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
};

import type { Meta, StoryObj } from "@storybook/nextjs";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/salt-extended/resizable";

const meta = {
  title: "Components/Navigation & Layout/Resizable Panels",
  component: ResizablePanelGroup,
  parameters: { layout: "padded" },
} satisfies Meta<typeof ResizablePanelGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <ResizablePanelGroup
      orientation="horizontal"
      className="min-h-[200px] rounded-lg border"
    >
      <ResizablePanel defaultSize="30" minSize="20">
        <div className="flex h-full items-center justify-center p-4">
          <span className="text-sm font-medium">Metadata Panel</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize="50">
        <div className="flex h-full items-center justify-center p-4">
          <span className="text-sm font-medium">Transcript Panel</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize="20" minSize="15">
        <div className="flex h-full items-center justify-center p-4">
          <span className="text-sm font-medium">Insights Panel</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

export const Vertical: Story = {
  render: () => (
    <ResizablePanelGroup
      orientation="vertical"
      className="min-h-[300px] rounded-lg border"
    >
      <ResizablePanel defaultSize="60">
        <div className="flex h-full items-center justify-center p-4">
          <span className="text-sm font-medium">Primary View</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize="40">
        <div className="flex h-full items-center justify-center p-4">
          <span className="text-sm font-medium">Context Panel</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

export const CallReviewLayout: Story = {
  name: "Call Review Layout",
  render: () => (
    <ResizablePanelGroup
      orientation="horizontal"
      className="min-h-[300px] rounded-lg border"
    >
      <ResizablePanel defaultSize="20" minSize="15">
        <div className="flex h-full flex-col gap-2 p-4">
          <span className="text-muted-foreground text-xs font-semibold uppercase">
            Metadata
          </span>
          <div className="text-sm">Call ID: CRD-0147832</div>
          <div className="text-sm">Duration: 4:32</div>
          <div className="text-sm">LOB: Card Services</div>
          <div className="text-sm">Topic: Login Failures</div>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize="50">
        <div className="flex h-full flex-col gap-2 p-4">
          <span className="text-muted-foreground text-xs font-semibold uppercase">
            Transcript
          </span>
          <p className="text-muted-foreground text-sm">
            Customer: Hi, I&apos;ve been trying to log in to my account but it
            keeps saying my password is incorrect...
          </p>
          <p className="text-sm">
            Agent: I understand, let me help you reset your password. Can you
            verify your email address on file?
          </p>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize="30" minSize="20">
        <div className="flex h-full flex-col gap-2 p-4">
          <span className="text-muted-foreground text-xs font-semibold uppercase">
            AI Insights
          </span>
          <div className="rounded border bg-blue-50 p-2 text-xs">
            <strong>Summary:</strong> Customer unable to log in due to expired
            password. Agent guided through reset process.
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

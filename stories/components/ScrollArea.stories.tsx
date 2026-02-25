import type { Meta, StoryObj } from "@storybook/nextjs";

import { ScrollArea, ScrollBar } from "@/components/salt-extended/scroll-area";

const meta = {
  title: "Components/Navigation & Layout/Scroll Area",
  component: ScrollArea,
  parameters: { layout: "padded" },
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

const topics = [
  "Login Failures",
  "Password Reset",
  "Account Closure",
  "Balance Inquiry",
  "Fee Disputes",
  "Card Activation",
  "Payment Processing",
  "Fraud Alerts",
  "Statement Questions",
  "Reward Points",
  "Credit Limit",
  "Address Change",
  "Auto-Pay Setup",
  "Direct Deposit",
  "Wire Transfer",
  "Mobile App Issues",
  "Joint Account",
  "Overdraft Protection",
  "Check Deposit",
  "ATM Locator",
];

export const Vertical: Story = {
  render: () => (
    <ScrollArea className="h-48 w-64 rounded-md border p-4">
      <h4 className="mb-3 text-sm font-semibold">Topics</h4>
      {topics.map((topic) => (
        <div key={topic} className="border-b py-1.5 text-sm last:border-0">
          {topic}
        </div>
      ))}
    </ScrollArea>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <ScrollArea className="w-80 rounded-md border whitespace-nowrap">
      <div className="flex gap-4 p-4">
        {topics.slice(0, 10).map((topic) => (
          <div
            key={topic}
            className="shrink-0 rounded-md border px-3 py-2 text-sm"
          >
            {topic}
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ),
};

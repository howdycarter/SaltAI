import type { Meta, StoryObj } from "@storybook/nextjs";
import { AlertTriangle, Bell, TrendingUp } from "lucide-react";

import { Button } from "@/components/salt-extended/button";

const meta = {
  title: "Patterns/Alert Card",
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

type AlertCardProps = {
  severity: "critical" | "warning" | "info";
  title: string;
  description: string;
  metric: string;
  timestamp: string;
};

function AlertCard({
  severity,
  title,
  description,
  metric,
  timestamp,
}: AlertCardProps) {
  const colors = {
    critical: {
      border: "border-red-500",
      bg: "bg-red-50",
      icon: "text-red-600",
    },
    warning: {
      border: "border-amber-500",
      bg: "bg-amber-50",
      icon: "text-amber-600",
    },
    info: {
      border: "border-blue-500",
      bg: "bg-blue-50",
      icon: "text-blue-600",
    },
  };
  const c = colors[severity];
  const Icon =
    severity === "critical"
      ? AlertTriangle
      : severity === "warning"
        ? TrendingUp
        : Bell;

  return (
    <div className={`rounded-lg border-l-4 ${c.border} ${c.bg} p-4`}>
      <div className="flex items-start gap-3">
        <Icon className={`mt-0.5 h-5 w-5 ${c.icon}`} />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold">{title}</h4>
            <span className="text-muted-foreground text-xs">{timestamp}</span>
          </div>
          <p className="text-muted-foreground mt-1 text-sm">{description}</p>
          <div className="mt-2 flex items-center gap-3">
            <span className="text-sm font-bold">{metric}</span>
            <Button size="sm" variant="outline" className="h-7 text-xs">
              Investigate
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export const Critical: Story = {
  render: () => (
    <div className="max-w-lg">
      <AlertCard
        severity="critical"
        title="Mobile App Crash — iOS 18.2"
        description="Call volume for this topic has exceeded the critical threshold of 500 calls/day."
        metric="+240% (24h)"
        timestamp="9:15 AM"
      />
    </div>
  ),
};

export const Warning: Story = {
  render: () => (
    <div className="max-w-lg">
      <AlertCard
        severity="warning"
        title="Fee Dispute (Annual Fee)"
        description="Emerging topic detected. Approaching warning threshold."
        metric="+85% (7d)"
        timestamp="Yesterday"
      />
    </div>
  ),
};

export const Info: Story = {
  render: () => (
    <div className="max-w-lg">
      <AlertCard
        severity="info"
        title="Reward Points Expiration"
        description="New topic cluster forming around reward point expiration notifications."
        metric="+31% (7d)"
        timestamp="2 days ago"
      />
    </div>
  ),
};

export const AlertStack: Story = {
  name: "Alert Stack",
  render: () => (
    <div className="max-w-lg space-y-3">
      <AlertCard
        severity="critical"
        title="Mobile App Crash — iOS 18.2"
        description="Call volume exceeded critical threshold."
        metric="+240% (24h)"
        timestamp="9:15 AM"
      />
      <AlertCard
        severity="warning"
        title="Fee Dispute (Annual Fee)"
        description="Emerging topic approaching threshold."
        metric="+85% (7d)"
        timestamp="Yesterday"
      />
      <AlertCard
        severity="info"
        title="Reward Points Expiration"
        description="New topic cluster forming."
        metric="+31% (7d)"
        timestamp="2 days ago"
      />
    </div>
  ),
};

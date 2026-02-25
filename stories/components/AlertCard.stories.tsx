import type { Meta, StoryObj } from "@storybook/nextjs";

import { AlertCard } from "@/components/salt-extended/alert-card";
import { MOCK_ALERTS } from "@/lib/mock/alerts";

const criticalAlert = MOCK_ALERTS.find(
  (a) => a.severity === "critical" && a.chainSteps,
)!;
const warningAlert = MOCK_ALERTS.find((a) => a.severity === "warning")!;
const infoAlert = MOCK_ALERTS.find((a) => a.severity === "info")!;

const meta = {
  title: "Cards/AlertCard",
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Critical: Story = {
  name: "Critical (with Chain Steps)",
  render: () => (
    <div className="w-[560px]">
      <AlertCard
        alert={criticalAlert}
        onAcknowledge={() => console.log("Acknowledged")}
        onResolve={() => console.log("Resolved")}
        onWatch={() => console.log("Watchlisted")}
      />
    </div>
  ),
};

export const Warning: Story = {
  render: () => (
    <div className="w-[560px]">
      <AlertCard
        alert={warningAlert}
        onAcknowledge={() => console.log("Acknowledged")}
        onResolve={() => console.log("Resolved")}
        onWatch={() => console.log("Watchlisted")}
      />
    </div>
  ),
};

export const Info: Story = {
  render: () => (
    <div className="w-[560px]">
      <AlertCard alert={infoAlert} onWatch={() => console.log("Watchlisted")} />
    </div>
  ),
};

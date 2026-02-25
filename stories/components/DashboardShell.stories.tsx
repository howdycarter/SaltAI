import type { Meta, StoryObj } from "@storybook/nextjs";

import { DashboardShell } from "@/components/salt-extended/dashboard-shell";

const meta = {
  title: "Dashboard/Dashboard Shell",
  component: DashboardShell,
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div style={{ height: "100vh" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DashboardShell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    filterBar: (
      <div className="flex items-center gap-3 p-4">
        <div className="flex gap-1 rounded-md border border-[var(--salt-container-borderColor)] p-0.5 text-sm">
          <button className="rounded bg-[var(--salt-actionable-cta-background,#005ccc)] px-3 py-1.5 text-white">
            Today
          </button>
          <button className="px-3 py-1.5 text-[var(--salt-content-primary-foreground)]">
            Yesterday
          </button>
          <button className="px-3 py-1.5 text-[var(--salt-content-primary-foreground)]">
            Last 7 Days
          </button>
          <button className="px-3 py-1.5 text-[var(--salt-content-primary-foreground)]">
            Last 30 Days
          </button>
        </div>
        <div className="ml-auto text-xs text-[var(--salt-content-secondary-foreground)]">
          Last updated: Jan 20, 2026 at 9:15 AM
        </div>
      </div>
    ),
    kpiStrip: (
      <div className="grid grid-cols-2 gap-4 p-4 md:grid-cols-3 lg:grid-cols-6">
        {[
          "Volume",
          "AHT",
          "Transfer Rate",
          "Escalation Rate",
          "Repeat Contacts",
          "FCR",
        ].map((label) => (
          <div
            key={label}
            className="border-[var(--salt-container-borderColor,theme(colors.border))] bg-[var(--salt-container-primary-background,theme(colors.background))] rounded-lg border p-4"
          >
            <p className="text-xs text-[var(--salt-content-secondary-foreground)]">
              {label}
            </p>
            <p className="mt-1 text-2xl font-semibold">—</p>
            <p className="mt-1 text-xs text-[var(--salt-content-secondary-foreground)]">
              Placeholder
            </p>
          </div>
        ))}
      </div>
    ),
    topMovers: (
      <div className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-2">
        <div className="border-[var(--salt-container-borderColor,theme(colors.border))] bg-[var(--salt-container-primary-background,theme(colors.background))] rounded-lg border p-4">
          <h3 className="mb-3 text-sm font-semibold">Volume Drivers</h3>
          <p className="text-sm text-[var(--salt-content-secondary-foreground)]">
            Top movers will appear here
          </p>
        </div>
        <div className="border-[var(--salt-container-borderColor,theme(colors.border))] bg-[var(--salt-container-primary-background,theme(colors.background))] rounded-lg border p-4">
          <h3 className="mb-3 text-sm font-semibold">Outcome Drivers</h3>
          <p className="text-sm text-[var(--salt-content-secondary-foreground)]">
            Top movers will appear here
          </p>
        </div>
      </div>
    ),
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

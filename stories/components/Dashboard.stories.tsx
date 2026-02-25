import type { Meta, StoryObj } from "@storybook/nextjs";
import * as React from "react";

import { DashboardFilterBar } from "@/components/salt-extended/dashboard-filter-bar";
import { DashboardShell } from "@/components/salt-extended/dashboard-shell";
import { KpiStrip } from "@/components/salt-extended/kpi-strip";
import { TopMovers } from "@/components/salt-extended/top-movers";
import {
  MOCK_KPIS,
  MOCK_OUTCOME_DRIVERS,
  MOCK_VOLUME_DRIVERS,
} from "@/lib/mock/dashboard";
import type { DashboardFilters } from "@/types/dashboard";

const meta = {
  title: "Dashboard/Full Dashboard",
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
  args: {},
  render: () => (
    <DashboardShell
      filterBar={
        <DashboardFilterBar
          filters={{ timeRange: "today", lobs: [], queueGroups: [] }}
          onFilterChange={() => {}}
          lastUpdated="Jan 20, 2026 at 9:15 AM"
        />
      }
      kpiStrip={
        <KpiStrip
          kpis={MOCK_KPIS}
          onDrillDown={(kpi) => console.log("Drill:", kpi.label)}
        />
      }
      topMovers={
        <TopMovers
          volumeDrivers={MOCK_VOLUME_DRIVERS}
          outcomeDrivers={MOCK_OUTCOME_DRIVERS}
          onDrillDown={(m) => console.log("Drill:", m.name)}
        />
      }
    />
  ),
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

export const EmptyState: Story = {
  args: {},
  render: () => (
    <DashboardShell
      filterBar={
        <DashboardFilterBar
          filters={{ timeRange: "today", lobs: [], queueGroups: [] }}
          onFilterChange={() => {}}
          lastUpdated="Jan 20, 2026 at 9:15 AM"
        />
      }
      kpiStrip={<KpiStrip kpis={[]} />}
      topMovers={<TopMovers volumeDrivers={[]} outcomeDrivers={[]} />}
    />
  ),
};

export const FilterApplied: Story = {
  args: {},
  render: () => (
    <DashboardShell
      filterBar={
        <DashboardFilterBar
          filters={{
            timeRange: "last7",
            lobs: ["Card Services", "Banking"],
            queueGroups: ["Tier 1 Support"],
          }}
          onFilterChange={() => {}}
          lastUpdated="Jan 20, 2026 at 9:15 AM"
        />
      }
      kpiStrip={
        <KpiStrip
          kpis={MOCK_KPIS.slice(0, 4)}
          onDrillDown={(kpi) => console.log("Drill:", kpi.label)}
        />
      }
      topMovers={
        <TopMovers
          volumeDrivers={MOCK_VOLUME_DRIVERS.slice(0, 3)}
          outcomeDrivers={MOCK_OUTCOME_DRIVERS.slice(0, 2)}
          onDrillDown={(m) => console.log("Drill:", m.name)}
        />
      }
    />
  ),
};

function InteractiveDashboard() {
  const [filters, setFilters] = React.useState<DashboardFilters>({
    timeRange: "today",
    lobs: [],
    queueGroups: [],
  });

  return (
    <DashboardShell
      filterBar={
        <DashboardFilterBar
          filters={filters}
          onFilterChange={setFilters}
          lastUpdated="Jan 20, 2026 at 9:15 AM"
        />
      }
      kpiStrip={
        <KpiStrip
          kpis={MOCK_KPIS}
          onDrillDown={(kpi) => console.log("Drill:", kpi.label)}
        />
      }
      topMovers={
        <TopMovers
          volumeDrivers={MOCK_VOLUME_DRIVERS}
          outcomeDrivers={MOCK_OUTCOME_DRIVERS}
          onDrillDown={(m) => console.log("Drill:", m.name)}
        />
      }
    />
  );
}

export const Interactive: Story = {
  args: {},
  render: () => <InteractiveDashboard />,
};

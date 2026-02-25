import type { Meta, StoryObj } from "@storybook/nextjs";

import { DashboardFilterBar } from "@/components/salt-extended/dashboard-filter-bar";
import type { DashboardFilters } from "@/types/dashboard";

const meta = {
  title: "Dashboard/Filter Bar",
  component: DashboardFilterBar,
  parameters: { layout: "padded" },
} satisfies Meta<typeof DashboardFilterBar>;

export default meta;
type Story = StoryObj<typeof meta>;

const DEFAULT_FILTERS: DashboardFilters = {
  timeRange: "today",
  lobs: [],
  queueGroups: [],
};

export const Default: Story = {
  args: {
    filters: DEFAULT_FILTERS,
    onFilterChange: () => {},
    lastUpdated: "Jan 20, 2026 at 9:15 AM",
  },
};

export const WithSelections: Story = {
  args: {
    filters: {
      timeRange: "last7",
      lobs: ["Card Services", "Banking"],
      queueGroups: ["Tier 1 Support"],
    },
    onFilterChange: () => {},
    lastUpdated: "Jan 20, 2026 at 9:15 AM",
  },
};

export const CustomDateRange: Story = {
  args: {
    filters: {
      timeRange: "custom",
      customStart: "2026-01-01",
      customEnd: "2026-01-20",
      lobs: [],
      queueGroups: [],
    },
    onFilterChange: () => {},
    lastUpdated: "Jan 20, 2026 at 9:15 AM",
  },
};

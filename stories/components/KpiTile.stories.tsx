import type { Meta, StoryObj } from "@storybook/nextjs";

import { KpiTile } from "@/components/salt-extended/kpi-tile";
import { MOCK_KPIS } from "@/lib/mock/dashboard";

const meta = {
  title: "Dashboard/KPI Tile",
  component: KpiTile,
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 240 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof KpiTile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {
    kpi: MOCK_KPIS[0],
  },
};

export const Amber: Story = {
  args: {
    kpi: MOCK_KPIS[1],
  },
};

export const Critical: Story = {
  args: {
    kpi: MOCK_KPIS[2],
  },
};

export const Loading: Story = {
  args: {
    kpi: MOCK_KPIS[0],
    loading: true,
  },
};

export const Aligned: Story = {
  args: {
    kpi: {
      ...MOCK_KPIS[0],
      reconciliationStatus: "aligned",
      reconciliationDetails: "Matches Avaya CMS within 0.1% tolerance.",
    },
  },
};

export const Pending: Story = {
  args: {
    kpi: {
      ...MOCK_KPIS[1],
      reconciliationStatus: "pending",
      reconciliationDetails: "Awaiting end-of-day reconciliation run.",
    },
  },
};

export const Partial: Story = {
  args: {
    kpi: {
      ...MOCK_KPIS[2],
      reconciliationStatus: "partial",
      reconciliationDetails: "2.3% variance from source — under investigation.",
    },
  },
};

export const AllSix: Story = {
  args: {
    kpi: MOCK_KPIS[0],
  },
  decorators: [
    () => (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {MOCK_KPIS.map((kpi) => (
          <KpiTile
            key={kpi.label}
            kpi={kpi}
            onDrillDown={(k) => console.log("Drill down:", k.label)}
          />
        ))}
      </div>
    ),
  ],
};

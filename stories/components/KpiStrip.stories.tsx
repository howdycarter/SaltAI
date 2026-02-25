import type { Meta, StoryObj } from "@storybook/nextjs";

import { KpiStrip } from "@/components/salt-extended/kpi-strip";
import { MOCK_KPIS, MOCK_KPIS_ALL_AMBER } from "@/lib/mock/dashboard";

const meta = {
  title: "Dashboard/KPI Strip",
  component: KpiStrip,
  parameters: { layout: "padded" },
} satisfies Meta<typeof KpiStrip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    kpis: MOCK_KPIS,
  },
};

export const AllAmber: Story = {
  args: {
    kpis: MOCK_KPIS_ALL_AMBER,
  },
};

export const Mixed: Story = {
  args: {
    kpis: MOCK_KPIS,
  },
};

export const Loading: Story = {
  args: {
    kpis: [],
    loading: true,
  },
};

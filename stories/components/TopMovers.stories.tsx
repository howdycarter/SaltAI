import type { Meta, StoryObj } from "@storybook/nextjs";

import { TopMovers } from "@/components/salt-extended/top-movers";
import {
  MOCK_OUTCOME_DRIVERS,
  MOCK_VOLUME_DRIVERS,
} from "@/lib/mock/dashboard";

const meta = {
  title: "Dashboard/Top Movers",
  component: TopMovers,
  parameters: { layout: "padded" },
} satisfies Meta<typeof TopMovers>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    volumeDrivers: MOCK_VOLUME_DRIVERS,
    outcomeDrivers: MOCK_OUTCOME_DRIVERS,
  },
};

export const Empty: Story = {
  args: {
    volumeDrivers: [],
    outcomeDrivers: [],
  },
};

export const Loading: Story = {
  args: {
    volumeDrivers: [],
    outcomeDrivers: [],
    loading: true,
  },
};

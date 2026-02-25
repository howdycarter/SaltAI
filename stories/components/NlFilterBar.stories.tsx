import type { Meta, StoryObj } from "@storybook/nextjs";

import { NlFilterBar } from "@/components/salt-extended";

const meta = {
  title: "Components/NlFilterBar",
  component: NlFilterBar,
  parameters: { layout: "padded" },
} satisfies Meta<typeof NlFilterBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onFiltersParsed: (filters: Record<string, unknown>) =>
      console.log("[onFiltersParsed]", filters),
  },
};

export const WithCustomSuggestions: Story = {
  args: {
    onFiltersParsed: (filters: Record<string, unknown>) =>
      console.log("[onFiltersParsed]", filters),
    suggestions: [
      "High sentiment calls this week",
      "Escalations in Card Services",
      "Average handle time by queue",
      "Calls with compliance flags",
    ],
  },
};

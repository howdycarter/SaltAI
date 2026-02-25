import type { Meta, StoryObj } from "@storybook/nextjs";

import {
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from "@/components/salt-extended/skeleton";

const meta = {
  title: "Components/Data Display/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Line: Story = {
  render: () => <Skeleton className="h-4 w-48" />,
};

export const Circle: Story = {
  render: () => <SkeletonCircle />,
};

export const TextBlock: Story = {
  render: () => <SkeletonText lines={3} className="w-64" />,
};

export const Card: Story = {
  render: () => (
    <div
      className="flex items-start gap-4 rounded-lg border p-4"
      style={{ width: 320 }}
    >
      <SkeletonCircle className="size-12" />
      <div className="flex-1 space-y-3">
        <Skeleton className="h-4 w-3/4" />
        <SkeletonText lines={2} />
      </div>
    </div>
  ),
};

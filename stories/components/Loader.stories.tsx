import type { Meta, StoryObj } from "@storybook/nextjs";

import {
  Loader,
  LoaderDots,
  LoaderSpinner,
} from "@/components/salt-extended/loader";

const meta = {
  title: "Components/AI/Loader",
  component: Loader,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Loader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Dots: Story = {
  name: "Dots (Default)",
  render: () => <LoaderDots />,
};

export const Spinner: Story = {
  render: () => <LoaderSpinner />,
};

export const Pulse: Story = {
  render: () => <Loader variant="pulse" />,
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <LoaderDots size="sm" />
      <LoaderDots size="md" />
      <LoaderDots size="lg" />
    </div>
  ),
};

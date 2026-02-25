import type { Meta, StoryObj } from "@storybook/nextjs";

import { BarVisualizer } from "@/components/salt-extended/bar-visualizer";

const meta = {
  title: "Components/Audio & Visualization/Bar Visualizer",
  component: BarVisualizer,
  parameters: { layout: "centered" },
} satisfies Meta<typeof BarVisualizer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Idle: Story = {
  render: () => <BarVisualizer state="idle" className="h-10" />,
};

export const Listening: Story = {
  render: () => <BarVisualizer state="listening" className="h-10" />,
};

export const Speaking: Story = {
  render: () => <BarVisualizer state="speaking" className="h-10" />,
};

export const AllStates: Story = {
  name: "All States",
  render: () => (
    <div className="flex items-center gap-12">
      <div className="text-center">
        <BarVisualizer state="idle" className="mb-2 h-10" />
        <span className="text-muted-foreground text-xs">Idle</span>
      </div>
      <div className="text-center">
        <BarVisualizer state="listening" className="mb-2 h-10" />
        <span className="text-muted-foreground text-xs">Listening</span>
      </div>
      <div className="text-center">
        <BarVisualizer state="speaking" className="mb-2 h-10" />
        <span className="text-muted-foreground text-xs">Speaking</span>
      </div>
    </div>
  ),
};

import type { Meta, StoryObj } from "@storybook/nextjs";

import {
  Controls,
  ControlSlider,
  ControlToggle,
} from "@/components/salt-extended/controls";

const meta = {
  title: "Components/AI/Controls",
  component: Controls,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Controls>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-[320px]">
      <Controls>
        <ControlSlider
          label="Temperature"
          value={0.7}
          min={0}
          max={2}
          step={0.1}
        />
        <ControlSlider
          label="Max Tokens"
          value={4096}
          min={256}
          max={8192}
          step={256}
        />
        <ControlSlider label="Top P" value={0.9} min={0} max={1} step={0.05} />
        <ControlToggle
          label="Stream"
          description="Enable streaming responses"
          checked={true}
        />
        <ControlToggle
          label="JSON Mode"
          description="Force JSON output"
          checked={false}
        />
      </Controls>
    </div>
  ),
};

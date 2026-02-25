import type { Meta, StoryObj } from "@storybook/nextjs";
import * as React from "react";

import { MicSelector } from "@/components/salt-extended/mic-selector";

const meta = {
  title: "Components/Audio & Visualization/Mic Selector",
  component: MicSelector,
  parameters: { layout: "centered" },
} satisfies Meta<typeof MicSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Muted: Story = {
  args: {
    muted: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

function ControlledExample() {
  const [value, setValue] = React.useState<string | undefined>();
  const [muted, setMuted] = React.useState(false);

  return (
    <div className="space-y-2">
      <MicSelector
        value={value}
        onValueChange={setValue}
        muted={muted}
        onMutedChange={setMuted}
      />
      <p className="text-muted-foreground text-xs">
        Device: {value ?? "none"} | Muted: {String(muted)}
      </p>
    </div>
  );
}

export const Controlled: Story = {
  render: () => <ControlledExample />,
};

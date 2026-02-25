import type { Meta, StoryObj } from "@storybook/nextjs";
import * as React from "react";

import { ScrubBar } from "@/components/salt-extended/scrub-bar";

const meta = {
  title: "Components/Audio & Visualization/Scrub Bar",
  component: ScrubBar,
  parameters: { layout: "padded" },
} satisfies Meta<typeof ScrubBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [val, setVal] = React.useState(30);
    return (
      <div className="max-w-md">
        <ScrubBar value={val} max={100} onChange={setVal} />
        <p className="text-muted-foreground mt-1 text-xs">
          Value: {Math.round(val)}%
        </p>
      </div>
    );
  },
};

export const CallTimeline: Story = {
  name: "Call Timeline",
  render: () => {
    const [sec, setSec] = React.useState(92);
    const format = (s: number) =>
      `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
    return (
      <div className="max-w-lg">
        <div className="text-muted-foreground mb-1 flex justify-between text-xs">
          <span>{format(sec)}</span>
          <span>{format(272)}</span>
        </div>
        <ScrubBar value={sec} max={272} onChange={setSec} />
      </div>
    );
  },
};

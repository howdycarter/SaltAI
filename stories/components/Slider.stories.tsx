import type { Meta, StoryObj } from "@storybook/nextjs";
import * as React from "react";

import { Slider } from "@/components/salt-extended/slider";

const meta = {
  title: "Components/Data Display/Slider",
  component: Slider,
  parameters: { layout: "padded" },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-80">
      <p className="mb-2 text-sm font-medium">Confidence Threshold</p>
      <Slider
        defaultValue={[70]}
        max={100}
        step={1}
        aria-label="Confidence Threshold"
      />
    </div>
  ),
};

export const Range: Story = {
  name: "Range (Two Thumbs)",
  render: () => (
    <div className="w-80">
      <p className="mb-2 text-sm font-medium">Call Duration (minutes)</p>
      <Slider
        defaultValue={[2, 8]}
        max={15}
        step={1}
        aria-label="Call Duration"
      />
    </div>
  ),
};

export const WithSteps: Story = {
  name: "With Steps",
  render: () => (
    <div className="w-80">
      <p className="mb-2 text-sm font-medium">Sentiment Score</p>
      <Slider
        defaultValue={[3]}
        min={1}
        max={5}
        step={1}
        aria-label="Sentiment Score"
      />
      <div className="text-muted-foreground mt-1 flex justify-between text-xs">
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>5</span>
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="w-80">
      <p className="text-muted-foreground mb-2 text-sm font-medium">
        Locked Setting
      </p>
      <Slider
        defaultValue={[50]}
        max={100}
        disabled
        aria-label="Locked Setting"
      />
    </div>
  ),
};

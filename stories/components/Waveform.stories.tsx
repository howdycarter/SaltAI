import type { Meta, StoryObj } from "@storybook/nextjs";

import { Waveform } from "@/components/salt-extended/waveform";

const meta = {
  title: "Components/Audio & Visualization/Waveform",
  component: Waveform,
  parameters: { layout: "padded" },
} satisfies Meta<typeof Waveform>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleData = Array.from({ length: 60 }, () => Math.random() * 0.8 + 0.2);

export const Default: Story = {
  render: () => (
    <div className="max-w-lg">
      <Waveform data={sampleData} progress={0} />
    </div>
  ),
};

export const HalfProgress: Story = {
  name: "50% Progress",
  render: () => (
    <div className="max-w-lg">
      <Waveform data={sampleData} progress={0.5} />
    </div>
  ),
};

export const Complete: Story = {
  name: "Fully Played",
  render: () => (
    <div className="max-w-lg">
      <Waveform data={sampleData} progress={1} />
    </div>
  ),
};

export const CustomColors: Story = {
  name: "Custom Colors",
  render: () => (
    <div className="max-w-lg">
      <Waveform
        data={sampleData}
        progress={0.65}
        activeColor="#16a34a"
        inactiveColor="#d1d5db"
      />
    </div>
  ),
};

import type { Meta, StoryObj } from "@storybook/nextjs";

import { AIImage } from "@/components/salt-extended/ai-image";

const meta = {
  title: "Components/AI/AIImage",
  component: AIImage,
  parameters: { layout: "centered" },
} satisfies Meta<typeof AIImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Loading: Story = {
  render: () => (
    <div className="w-[300px]">
      <AIImage status="loading" prompt="A futuristic dashboard interface" />
    </div>
  ),
};

export const Error: Story = {
  render: () => (
    <div className="w-[300px]">
      <AIImage status="error" prompt="An impossible concept" />
    </div>
  ),
};

export const Loaded: Story = {
  render: () => (
    <div className="w-[300px]">
      <AIImage
        src="https://placehold.co/400x400/1a1a2e/ffffff?text=AI+Generated"
        prompt="Abstract data visualization"
        status="loaded"
      />
    </div>
  ),
};

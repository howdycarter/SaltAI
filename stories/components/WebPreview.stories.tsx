import type { Meta, StoryObj } from "@storybook/nextjs";

import { WebPreview } from "@/components/salt-extended/web-preview";

const meta = {
  title: "Components/AI/WebPreview",
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-[600px]">
      <WebPreview url="https://example.com" title="Example Site" height={300} />
    </div>
  ),
};

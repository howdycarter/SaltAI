import type { Meta, StoryObj } from "@storybook/nextjs";

import { Panel } from "@/components/salt-extended/panel";

const meta = {
  title: "Components/AI/Panel",
  component: Panel,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Panel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="h-[400px] w-[350px]">
      <Panel title="Details" onClose={() => {}}>
        <div className="p-4 text-sm">Panel content goes here</div>
      </Panel>
    </div>
  ),
};

export const NoHeader: Story = {
  name: "Without Header",
  render: () => (
    <div className="h-[300px] w-[350px]">
      <Panel>
        <div className="p-4 text-sm">Content-only panel</div>
      </Panel>
    </div>
  ),
};

import type { Meta, StoryObj } from "@storybook/nextjs";

import {
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarSeparator,
} from "@/components/salt-extended/toolbar";

const meta = {
  title: "Components/AI/Toolbar",
  component: Toolbar,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Toolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Toolbar>
      <ToolbarGroup>
        <ToolbarButton>Bold</ToolbarButton>
        <ToolbarButton>Italic</ToolbarButton>
        <ToolbarButton>Underline</ToolbarButton>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarGroup>
        <ToolbarButton>Left</ToolbarButton>
        <ToolbarButton active>Center</ToolbarButton>
        <ToolbarButton>Right</ToolbarButton>
      </ToolbarGroup>
    </Toolbar>
  ),
};

export const Minimal: Story = {
  render: () => (
    <Toolbar>
      <ToolbarButton>Copy</ToolbarButton>
      <ToolbarButton>Share</ToolbarButton>
    </Toolbar>
  ),
};

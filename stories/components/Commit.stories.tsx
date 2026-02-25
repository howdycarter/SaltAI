import type { Meta, StoryObj } from "@storybook/nextjs";

import { Commit } from "@/components/salt-extended/commit";

const meta = {
  title: "Components/AI/Commit",
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-[450px]">
      <Commit
        hash="89e1e63abc123def"
        message="fix: use string percentages for react-resizable-panels v4.6.4"
        author="howdycarter"
        date="2 hours ago"
        additions={24}
        deletions={8}
        filesChanged={3}
      />
    </div>
  ),
};

export const Minimal: Story = {
  render: () => (
    <div className="w-[450px]">
      <Commit hash="abc123def456" message="initial commit" />
    </div>
  ),
};

export const LargeChange: Story = {
  name: "Large Change",
  render: () => (
    <div className="w-[450px]">
      <Commit
        hash="def456ghi789"
        message="feat: complete Wave 2 salt-extended AI components"
        author="howdycarter"
        date="just now"
        additions={1247}
        deletions={32}
        filesChanged={21}
      />
    </div>
  ),
};

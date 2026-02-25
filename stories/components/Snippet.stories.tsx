import type { Meta, StoryObj } from "@storybook/nextjs";

import { Snippet } from "@/components/salt-extended/snippet";

const meta = {
  title: "Components/AI/Snippet",
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Snippet code="npm install @salt-ds/core" />,
};

export const NpmCommand: Story = {
  name: "NPM Install",
  render: () => <Snippet code="npm install prism-react-renderer" />,
};

export const NoPrompt: Story = {
  name: "Without Prompt",
  render: () => <Snippet code="const x = 42;" prompt="" />,
};

export const LongCommand: Story = {
  name: "Long Command",
  render: () => (
    <div className="max-w-md">
      <Snippet code="npx create-next-app@latest my-app --typescript --tailwind --eslint --app --src-dir" />
    </div>
  ),
};

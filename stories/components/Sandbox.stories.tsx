import type { Meta, StoryObj } from "@storybook/nextjs";

import { Sandbox } from "@/components/salt-extended/sandbox";

const meta = {
  title: "Components/AI/Sandbox",
  component: Sandbox,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Sandbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-[500px]">
      <Sandbox
        code={'console.log("Hello, world!");'}
        output="Hello, world!"
        status="success"
      />
    </div>
  ),
};

export const WithError: Story = {
  name: "With Error",
  render: () => (
    <div className="w-[500px]">
      <Sandbox
        code="const x = undefined;\nx.foo();"
        output="TypeError: Cannot read properties of undefined (reading 'foo')"
        status="error"
      />
    </div>
  ),
};

export const Empty: Story = {
  render: () => (
    <div className="w-[500px]">
      <Sandbox language="python" />
    </div>
  ),
};

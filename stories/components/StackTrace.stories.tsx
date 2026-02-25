import type { Meta, StoryObj } from "@storybook/nextjs";

import { StackTrace } from "@/components/salt-extended/stack-trace";

const meta = {
  title: "Components/AI/StackTrace",
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-[550px]">
      <StackTrace
        error="TypeError"
        message="Cannot read properties of undefined (reading 'map')"
        frames={[
          {
            method: "renderList",
            file: "src/components/List.tsx",
            line: 42,
            column: 12,
            isApp: true,
          },
          {
            method: "processData",
            file: "src/utils/data.ts",
            line: 18,
            column: 5,
            isApp: true,
          },
          {
            method: "Module._compile",
            file: "internal/modules/cjs/loader.js",
            line: 1078,
            column: 30,
          },
          {
            method: "Object.Module._extensions",
            file: "internal/modules/cjs/loader.js",
            line: 1108,
            column: 10,
          },
        ]}
      />
    </div>
  ),
};

export const ErrorOnly: Story = {
  name: "Error Only",
  render: () => (
    <div className="w-[550px]">
      <StackTrace error="SyntaxError" message="Unexpected token '<'" />
    </div>
  ),
};

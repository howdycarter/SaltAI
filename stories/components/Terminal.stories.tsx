import type { Meta, StoryObj } from "@storybook/nextjs";

import { Terminal } from "@/components/salt-extended/terminal";

const meta = {
  title: "Components/AI/Terminal",
  component: Terminal,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Terminal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-[500px]">
      <Terminal
        lines={[
          "$ npm run build",
          "",
          "> saltai@0.1.0 build",
          "> next build",
          "",
          "   Creating an optimized production build...",
          "   Compiled successfully.",
          "",
          "   Route (app)                    Size     First Load JS",
          "   /                              5.2 kB        87.3 kB",
          "   /call-review                   12.4 kB       94.5 kB",
          "",
          "   First Load JS shared by all    82.1 kB",
        ]}
      />
    </div>
  ),
};

export const WithChildren: Story = {
  name: "With Children",
  render: () => (
    <div className="w-[500px]">
      <Terminal title="Output">
        <div>Processing 127 records...</div>
        <div className="text-yellow-400">Warning: 3 records skipped</div>
        <div className="text-green-400">Done. 124 records imported.</div>
      </Terminal>
    </div>
  ),
};

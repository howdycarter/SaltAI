import type { Meta, StoryObj } from "@storybook/nextjs";

import { PackageInfo } from "@/components/salt-extended/package-info";

const meta = {
  title: "Components/AI/PackageInfo",
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-[400px]">
      <PackageInfo
        name="@salt-ds/core"
        version="1.35.0"
        description="Salt Design System core components"
      />
    </div>
  ),
};

export const WithCustomCommand: Story = {
  name: "Custom Install Command",
  render: () => (
    <div className="w-[400px]">
      <PackageInfo
        name="prism-react-renderer"
        version="2.3.1"
        description="Prism-powered syntax highlighting for React"
        installCommand="npm install prism-react-renderer"
      />
    </div>
  ),
};

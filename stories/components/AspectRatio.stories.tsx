import type { Meta, StoryObj } from "@storybook/nextjs";

import { AspectRatio } from "@/components/salt-extended/aspect-ratio";

const meta = {
  title: "Components/Data Display/Aspect Ratio",
  component: AspectRatio,
  parameters: { layout: "padded" },
} satisfies Meta<typeof AspectRatio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ratio16x9: Story = {
  name: "16:9",
  render: () => (
    <div className="w-96">
      <AspectRatio ratio={16 / 9}>
        <div className="flex h-full w-full items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 text-white">
          <div className="text-center">
            <div className="text-lg font-semibold">16:9 Ratio</div>
            <div className="text-sm opacity-80">Dashboard chart container</div>
          </div>
        </div>
      </AspectRatio>
    </div>
  ),
};

export const Ratio4x3: Story = {
  name: "4:3",
  render: () => (
    <div className="w-80">
      <AspectRatio ratio={4 / 3}>
        <div className="flex h-full w-full items-center justify-center rounded-lg border bg-gradient-to-br from-slate-100 to-slate-200">
          <div className="text-center">
            <div className="text-lg font-semibold text-slate-700">
              4:3 Ratio
            </div>
            <div className="text-sm text-slate-500">Report card layout</div>
          </div>
        </div>
      </AspectRatio>
    </div>
  ),
};

export const Ratio1x1: Story = {
  name: "1:1 (Square)",
  render: () => (
    <div className="w-48">
      <AspectRatio ratio={1}>
        <div className="flex h-full w-full items-center justify-center rounded-lg border bg-gradient-to-br from-amber-100 to-amber-200">
          <div className="text-center">
            <div className="text-sm font-semibold text-amber-800">1:1</div>
            <div className="text-xs text-amber-600">Avatar / Icon</div>
          </div>
        </div>
      </AspectRatio>
    </div>
  ),
};

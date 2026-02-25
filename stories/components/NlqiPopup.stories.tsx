import type { Meta, StoryObj } from "@storybook/nextjs";

import { NlqiPopup } from "@/components/salt-extended";
import { AIProvider } from "@/lib/ai-context";

const meta = {
  title: "Components/NlqiPopup",
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <AIProvider>
        <Story />
      </AIProvider>
    ),
  ],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex h-screen items-center justify-center">
      <p className="text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))] text-base">
        Press{" "}
        <kbd className="rounded border px-1.5 py-0.5 font-mono text-xs">
          Cmd+K
        </kbd>{" "}
        to open the NLQI popup.
      </p>
      <NlqiPopup />
    </div>
  ),
};

import type { Meta, StoryObj } from "@storybook/nextjs";

import { AISidebar, AISidebarTrigger } from "@/components/salt-extended";
import { AIProvider } from "@/lib/ai-context";

const meta = {
  title: "Components/AISidebar",
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
    <div className="relative h-screen">
      <div className="flex h-full items-center justify-center">
        <p className="text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))] text-base">
          Click the floating button in the bottom-right to open the AI sidebar.
        </p>
      </div>
      <AISidebar />
      <AISidebarTrigger />
    </div>
  ),
};

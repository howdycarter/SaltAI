import type { Meta, StoryObj } from "@storybook/nextjs";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/salt-extended/context-menu";

const meta = {
  title: "Components/Feedback & Input/Context Menu",
  component: ContextMenu,
  parameters: { layout: "centered" },
} satisfies Meta<typeof ContextMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="text-muted-foreground flex h-36 w-72 items-center justify-center rounded-md border border-dashed text-sm">
        Right-click here
      </ContextMenuTrigger>
      <ContextMenuContent className="w-48">
        <ContextMenuItem>
          Open in Call Review <ContextMenuShortcut>⌘O</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          Copy Call ID <ContextMenuShortcut>⌘C</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuSub>
          <ContextMenuSubTrigger>Export as</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-40">
            <ContextMenuItem>CSV</ContextMenuItem>
            <ContextMenuItem>PDF Report</ContextMenuItem>
            <ContextMenuItem>JSON</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuItem>
          Add to Investigation <ContextMenuShortcut>⌘I</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem disabled>Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

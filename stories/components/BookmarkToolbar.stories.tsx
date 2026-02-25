import type { Meta, StoryObj } from "@storybook/nextjs";
import * as React from "react";

import { BookmarkToolbar } from "@/components/salt-extended/bookmark-toolbar";

const meta = {
  title: "Call Review/Bookmark Toolbar",
  component: BookmarkToolbar,
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div className="relative h-64">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BookmarkToolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    visible: true,
    position: { top: 40, left: 40 },
    onBookmark: (tag) => console.log("Bookmarked:", tag),
    onDismiss: () => console.log("Dismissed"),
  },
};

export const Hidden: Story = {
  args: {
    visible: false,
    position: { top: 40, left: 40 },
    onBookmark: () => {},
    onDismiss: () => {},
  },
};

function CustomTagDemo() {
  const [lastTag, setLastTag] = React.useState<string | null>(null);
  return (
    <div>
      <BookmarkToolbar
        visible
        position={{ top: 40, left: 40 }}
        onBookmark={(tag) => setLastTag(tag)}
        onDismiss={() => {}}
      />
      {lastTag && (
        <p className="text-muted-foreground absolute bottom-4 left-4 text-xs">
          Last bookmark: <span className="font-medium">{lastTag}</span>
        </p>
      )}
    </div>
  );
}

export const Interactive: Story = {
  args: {
    visible: true,
    position: { top: 40, left: 40 },
    onBookmark: () => {},
    onDismiss: () => {},
  },
  render: () => <CustomTagDemo />,
};

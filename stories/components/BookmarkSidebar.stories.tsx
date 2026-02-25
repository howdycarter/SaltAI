import type { Meta, StoryObj } from "@storybook/nextjs";
import * as React from "react";

import { BookmarkSidebar } from "@/components/salt-extended/bookmark-sidebar";
import type { Bookmark } from "@/components/salt-extended/bookmark-toolbar";

const MOCK_BOOKMARKS: Bookmark[] = [
  {
    id: "bk-001",
    segmentId: "t-003",
    text: "I updated my Chase app yesterday and now I can't log in at all. Face ID isn't working.",
    tag: "Friction Point",
    timestamp: 8,
    createdAt: "2026-01-18T16:00:00Z",
  },
  {
    id: "bk-002",
    segmentId: "t-008",
    text: "We have been receiving reports about the latest app update affecting Face ID on some iPhone models.",
    tag: "Coaching Opportunity",
    timestamp: 43,
    createdAt: "2026-01-18T16:01:00Z",
  },
  {
    id: "bk-003",
    segmentId: "t-005",
    text: "Sure, it's [REDACTED] and the last four are [REDACTED].",
    tag: "Compliance Concern",
    timestamp: 25,
    createdAt: "2026-01-18T16:02:00Z",
  },
  {
    id: "bk-004",
    segmentId: "t-010",
    text: "What I can do is reset your password right now so you can log in with that while we get the Face ID issue resolved.",
    tag: "Best Practice",
    timestamp: 58,
    createdAt: "2026-01-18T16:03:00Z",
  },
  {
    id: "bk-005",
    segmentId: "t-016",
    text: "The Face ID fix should be included in the next app update.",
    tag: "Follow-up Required",
    timestamp: 114,
    createdAt: "2026-01-18T16:04:00Z",
  },
];

const meta = {
  title: "Call Review/Bookmark Sidebar",
  component: BookmarkSidebar,
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div className="flex h-screen justify-end">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BookmarkSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    bookmarks: MOCK_BOOKMARKS,
    open: true,
    onClose: () => console.log("Close"),
    onSelect: (bk) => console.log("Select:", bk.id),
    onRemove: (id) => console.log("Remove:", id),
  },
};

export const Empty: Story = {
  args: {
    bookmarks: [],
    open: true,
    onClose: () => {},
  },
};

export const Closed: Story = {
  args: {
    bookmarks: MOCK_BOOKMARKS,
    open: false,
    onClose: () => {},
  },
};

function InteractiveDemo() {
  const [bookmarks, setBookmarks] = React.useState(MOCK_BOOKMARKS);
  const [open, setOpen] = React.useState(true);

  return (
    <div className="flex h-screen">
      <div className="flex flex-1 items-center justify-center">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="bg-primary text-primary-foreground rounded px-4 py-2 text-sm"
        >
          Open Bookmarks ({bookmarks.length})
        </button>
      </div>
      <BookmarkSidebar
        bookmarks={bookmarks}
        open={open}
        onClose={() => setOpen(false)}
        onSelect={(bk) => console.log("Navigate to", bk.timestamp)}
        onRemove={(id) =>
          setBookmarks((prev) => prev.filter((b) => b.id !== id))
        }
      />
    </div>
  );
}

export const Interactive: Story = {
  args: {
    bookmarks: MOCK_BOOKMARKS,
    open: true,
    onClose: () => {},
  },
  render: () => <InteractiveDemo />,
};

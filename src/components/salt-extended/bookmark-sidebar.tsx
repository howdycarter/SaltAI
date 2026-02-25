"use client";

import { Bookmark, Trash2, X } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

import type { Bookmark as BookmarkType, BookmarkTag } from "./bookmark-toolbar";
import { DEFAULT_TAGS, TAG_COLORS } from "./bookmark-toolbar";
import { Button } from "./button";

export type BookmarkSidebarProps = {
  /** List of bookmarks to display */
  bookmarks: BookmarkType[];
  /** Called when a bookmark is clicked (e.g. to seek to that point) */
  onSelect?: (bookmark: BookmarkType) => void;
  /** Called when a bookmark is removed */
  onRemove?: (bookmarkId: string) => void;
  /** Whether the sidebar is open */
  open: boolean;
  /** Called when sidebar is closed */
  onClose: () => void;
  className?: string;
};

function formatTimestamp(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function getTagStyle(tag: string): string {
  if (tag in TAG_COLORS) {
    return TAG_COLORS[tag as BookmarkTag];
  }
  return "bg-[var(--salt-container-secondary-background,theme(colors.muted.DEFAULT))] text-[var(--salt-content-primary-foreground,theme(colors.foreground))]";
}

export function BookmarkSidebar({
  bookmarks,
  onSelect,
  onRemove,
  open,
  onClose,
  className,
}: BookmarkSidebarProps) {
  if (!open) return null;

  const grouped = DEFAULT_TAGS.reduce(
    (acc, tag) => {
      const matching = bookmarks.filter((b) => b.tag === tag);
      if (matching.length > 0) acc[tag] = matching;
      return acc;
    },
    {} as Record<string, BookmarkType[]>,
  );

  const customBookmarks = bookmarks.filter(
    (b) => !DEFAULT_TAGS.includes(b.tag as BookmarkTag),
  );
  if (customBookmarks.length > 0) {
    grouped["Custom"] = customBookmarks;
  }

  return (
    <div
      data-slot="bookmark-sidebar"
      className={cn(
        "flex h-full w-72 flex-col border-l",
        "border-[var(--salt-container-borderColor,theme(colors.border))]",
        "bg-[var(--salt-container-primary-background,theme(colors.background))]",
        className,
      )}
    >
      <div className="border-[var(--salt-container-borderColor,theme(colors.border))] flex items-center justify-between border-b px-3 py-2">
        <div className="flex items-center gap-2">
          <Bookmark className="h-4 w-4 text-[var(--salt-content-secondary-foreground)]" />
          <span className="text-[var(--salt-content-primary-foreground,theme(colors.foreground))] text-base font-semibold">
            Bookmarks
          </span>
          <span className="bg-[var(--salt-palette-neutral-backdrop,theme(colors.muted.DEFAULT))] text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))] rounded-full px-1.5 py-0.5 text-base font-medium">
            {bookmarks.length}
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Close bookmarks"
          onClick={onClose}
          className="h-7 w-7"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        {bookmarks.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
            <Bookmark className="text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))] h-8 w-8 opacity-40" />
            <p className="text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))] text-base">
              No bookmarks yet. Select text in the transcript to add one.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {Object.entries(grouped).map(([tag, items]) => (
              <div key={tag}>
                <h3 className="text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))] mb-1.5 text-base font-semibold tracking-wider uppercase">
                  {tag} ({items.length})
                </h3>
                <div className="space-y-1.5">
                  {items.map((bookmark) => (
                    <div
                      key={bookmark.id}
                      role="button"
                      tabIndex={0}
                      onClick={() => onSelect?.(bookmark)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          onSelect?.(bookmark);
                        }
                      }}
                      className={cn(
                        "group flex w-full cursor-pointer flex-col gap-1 rounded-md border p-2 text-left transition-colors",
                        "border-[var(--salt-container-borderColor,theme(colors.border))]",
                        "hover:bg-[var(--salt-palette-neutral-backdrop,theme(colors.muted.DEFAULT))]",
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={cn(
                            "rounded-full px-2 py-0.5 text-base font-medium",
                            getTagStyle(bookmark.tag),
                          )}
                        >
                          {bookmark.tag}
                        </span>
                        <div className="flex items-center gap-1">
                          <span className="text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))] text-base tabular-nums">
                            {formatTimestamp(bookmark.timestamp)}
                          </span>
                          {onRemove && (
                            <button
                              type="button"
                              aria-label={`Remove bookmark: ${bookmark.text.slice(0, 20)}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                onRemove(bookmark.id);
                              }}
                              className="opacity-0 transition-opacity group-hover:opacity-100"
                            >
                              <Trash2 className="text-[var(--salt-status-error-foreground,theme(colors.destructive.DEFAULT))] h-3 w-3" />
                            </button>
                          )}
                        </div>
                      </div>
                      <p className="text-[var(--salt-content-primary-foreground,theme(colors.foreground))] line-clamp-2 text-base">
                        {bookmark.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { Bookmark, Plus } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

import { Button } from "./button";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
export type BookmarkTag =
  | "Friction Point"
  | "Coaching Opportunity"
  | "Compliance Concern"
  | "Best Practice";

export type Bookmark = {
  id: string;
  segmentId: string;
  text: string;
  tag: BookmarkTag | string;
  timestamp: number;
  createdAt: string;
};

export type BookmarkToolbarProps = {
  /** Whether the toolbar is visible (text is selected) */
  visible: boolean;
  /** Position of the toolbar relative to the viewport */
  position: { top: number; left: number };
  /** Called when user selects a tag to bookmark */
  onBookmark: (tag: BookmarkTag | string) => void;
  /** Called when toolbar is dismissed */
  onDismiss: () => void;
  className?: string;
};

/* ------------------------------------------------------------------ */
/*  Tag colors                                                         */
/* ------------------------------------------------------------------ */
const TAG_COLORS: Record<BookmarkTag, string> = {
  "Friction Point":
    "bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-900/40 dark:text-amber-300 dark:hover:bg-amber-900/60",
  "Coaching Opportunity":
    "bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/40 dark:text-blue-300 dark:hover:bg-blue-900/60",
  "Compliance Concern":
    "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/40 dark:text-red-300 dark:hover:bg-red-900/60",
  "Best Practice":
    "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/40 dark:text-green-300 dark:hover:bg-green-900/60",
};

const DEFAULT_TAGS: BookmarkTag[] = [
  "Friction Point",
  "Coaching Opportunity",
  "Compliance Concern",
  "Best Practice",
];

export { DEFAULT_TAGS, TAG_COLORS };

/* ------------------------------------------------------------------ */
/*  BookmarkToolbar                                                    */
/* ------------------------------------------------------------------ */
export function BookmarkToolbar({
  visible,
  position,
  onBookmark,
  onDismiss,
  className,
}: BookmarkToolbarProps) {
  const [showCustom, setShowCustom] = React.useState(false);
  const [customTag, setCustomTag] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (!visible) {
      setShowCustom(false);
      setCustomTag("");
    }
  }, [visible]);

  React.useEffect(() => {
    if (showCustom) {
      inputRef.current?.focus();
    }
  }, [showCustom]);

  if (!visible) return null;

  const handleCustomSubmit = () => {
    const trimmed = customTag.trim();
    if (trimmed) {
      onBookmark(trimmed);
      setCustomTag("");
      setShowCustom(false);
    }
  };

  return (
    <div
      data-slot="bookmark-toolbar"
      className={cn(
        "fixed z-50 flex flex-col gap-1.5 rounded-lg border p-2 shadow-lg",
        "border-[var(--salt-container-borderColor,theme(colors.border))]",
        "bg-[var(--salt-container-primary-background,theme(colors.background))]",
        className,
      )}
      style={{ top: position.top, left: position.left }}
    >
      <div className="flex items-center gap-1.5 pb-1">
        <Bookmark className="h-3.5 w-3.5 text-[var(--salt-content-secondary-foreground)]" />
        <span className="text-base font-semibold tracking-wider text-[var(--salt-content-secondary-foreground)] uppercase">
          Bookmark as
        </span>
      </div>

      <div className="flex flex-wrap gap-1">
        {DEFAULT_TAGS.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => onBookmark(tag)}
            className={cn(
              "rounded-full px-2.5 py-0.5 text-base font-medium transition-colors",
              TAG_COLORS[tag],
            )}
          >
            {tag}
          </button>
        ))}
      </div>

      {showCustom ? (
        <div className="flex gap-1">
          <input
            ref={inputRef}
            type="text"
            value={customTag}
            onChange={(e) => setCustomTag(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleCustomSubmit();
              if (e.key === "Escape") {
                setShowCustom(false);
                onDismiss();
              }
            }}
            placeholder="Custom tag..."
            className="border-[var(--salt-editable-borderColor,theme(colors.border))] bg-[var(--salt-container-primary-background,theme(colors.background))] h-6 flex-1 rounded border px-2 text-base outline-none"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCustomSubmit}
            className="h-6 px-2 text-base"
          >
            Add
          </Button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setShowCustom(true)}
          className="flex items-center gap-1 text-base text-[var(--salt-content-secondary-foreground)] hover:text-[var(--salt-content-primary-foreground)]"
        >
          <Plus className="h-3 w-3" /> Custom tag
        </button>
      )}
    </div>
  );
}

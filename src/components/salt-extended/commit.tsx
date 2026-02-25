"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface CommitProps extends React.ComponentProps<"div"> {
  hash: string;
  message: string;
  author?: string;
  date?: string;
  additions?: number;
  deletions?: number;
  filesChanged?: number;
}

function Commit({
  className,
  hash,
  message,
  author,
  date,
  additions,
  deletions,
  filesChanged,
  ...props
}: CommitProps) {
  return (
    <div
      data-slot="commit"
      className={cn(
        "rounded-lg p-4",
        "border-[var(--salt-container-borderColor,theme(colors.border))] border",
        "bg-[var(--salt-container-primary-background,theme(colors.background))]",
        className,
      )}
      {...props}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
            "bg-[var(--salt-container-secondary-background,theme(colors.muted.DEFAULT))]",
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))]"
          >
            <circle cx="12" cy="12" r="3" />
            <line x1="3" x2="9" y1="12" y2="12" />
            <line x1="15" x2="21" y1="12" y2="12" />
          </svg>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[var(--salt-content-primary-foreground,theme(colors.foreground))] text-base font-medium">
            {message}
          </p>
          <div className="text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))] mt-1 flex items-center gap-2 text-base">
            <code className="font-mono">{hash.slice(0, 7)}</code>
            {author && <span>{author}</span>}
            {date && <span>{date}</span>}
          </div>
          {(additions != null || deletions != null || filesChanged != null) && (
            <div className="mt-2 flex items-center gap-3 text-base">
              {filesChanged != null && (
                <span className="text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))]">
                  {filesChanged} file{filesChanged !== 1 ? "s" : ""}
                </span>
              )}
              {additions != null && (
                <span className="text-emerald-500">+{additions}</span>
              )}
              {deletions != null && (
                <span className="text-red-500">-{deletions}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export { Commit };
export type { CommitProps };

"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface WebPreviewProps extends React.ComponentProps<"div"> {
  url: string;
  title?: string;
  height?: number;
}

function WebPreview({
  className,
  url,
  title,
  height = 400,
  ...props
}: WebPreviewProps) {
  const [key, setKey] = React.useState(0);

  return (
    <div
      data-slot="web-preview"
      className={cn(
        "overflow-hidden rounded-lg",
        "border-[var(--salt-container-borderColor,theme(colors.border))] border",
        "bg-[var(--salt-container-primary-background,theme(colors.background))]",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "flex items-center gap-2 px-3 py-2",
          "bg-[var(--salt-container-secondary-background,theme(colors.muted.DEFAULT))]",
          "border-[var(--salt-container-borderColor,theme(colors.border))] border-b",
        )}
      >
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
        </div>
        <div
          className={cn(
            "flex-1 truncate rounded-md px-3 py-1 font-mono text-base",
            "bg-[var(--salt-container-primary-background,theme(colors.background))]",
            "text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))]",
            "border-[var(--salt-container-borderColor,theme(colors.border))] border",
          )}
        >
          {url}
        </div>
        <button
          type="button"
          onClick={() => setKey((k) => k + 1)}
          className="hover:bg-[var(--salt-container-primary-background,theme(colors.background))] rounded p-1 transition-colors"
          aria-label="Refresh preview"
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
          >
            <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
            <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
            <path d="M16 16h5v5" />
          </svg>
        </button>
      </div>
      <iframe
        key={key}
        src={url}
        title={title ?? url}
        className="w-full border-0"
        style={{ height }}
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
}

export { WebPreview };
export type { WebPreviewProps };

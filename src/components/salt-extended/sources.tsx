"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface SourceItemData {
  title: string;
  url: string;
  description?: string;
}

interface SourcesProps extends React.ComponentProps<"div"> {
  sources: SourceItemData[];
  defaultOpen?: boolean;
}

function Sources({
  className,
  sources,
  defaultOpen = false,
  ...props
}: SourcesProps) {
  const [open, setOpen] = React.useState(defaultOpen);

  return (
    <div
      data-slot="sources"
      className={cn(
        "overflow-hidden rounded-lg",
        "border-[var(--salt-container-borderColor,theme(colors.border))] border",
        className,
      )}
      {...props}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "flex w-full items-center justify-between px-4 py-3",
          "bg-[var(--salt-container-secondary-background,theme(colors.muted.DEFAULT))]",
          "text-[var(--salt-content-primary-foreground,theme(colors.foreground))]",
          "text-base font-medium",
          "transition-opacity hover:opacity-80",
        )}
      >
        <span>
          {sources.length} source{sources.length !== 1 ? "s" : ""}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(
            "transition-transform duration-200",
            open && "rotate-180",
          )}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {open && (
        <div
          className={cn(
            "divide-y",
            "divide-[var(--salt-container-borderColor,theme(colors.border))]",
          )}
        >
          {sources.map((source, i) => (
            <SourceItem key={i} {...source} index={i + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

interface SourceItemProps extends SourceItemData {
  index: number;
}

function SourceItem({ title, url, description, index }: SourceItemProps) {
  const hostname = React.useMemo(() => {
    try {
      return new URL(url).hostname;
    } catch {
      return url;
    }
  }, [url]);

  return (
    <a
      data-slot="source-item"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "flex items-start gap-3 px-4 py-3",
        "hover:bg-[var(--salt-container-secondary-background,theme(colors.muted.DEFAULT))]",
        "transition-colors duration-150",
      )}
    >
      <span
        className={cn(
          "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded text-base font-bold",
          "bg-[var(--salt-palette-interact-background,theme(colors.primary.DEFAULT))]",
          "text-[var(--salt-palette-interact-foreground,theme(colors.primary.foreground))]",
        )}
      >
        {index}
      </span>
      <div className="min-w-0 flex-1">
        <p
          className={cn(
            "truncate text-base font-medium",
            "text-[var(--salt-content-primary-foreground,theme(colors.foreground))]",
          )}
        >
          {title}
        </p>
        <p
          className={cn(
            "mt-0.5 truncate text-base",
            "text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))]",
          )}
        >
          {hostname}
        </p>
        {description && (
          <p
            className={cn(
              "mt-1 line-clamp-2 text-base",
              "text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))]",
            )}
          >
            {description}
          </p>
        )}
      </div>
    </a>
  );
}

export { SourceItem, Sources };
export type { SourceItemData, SourcesProps };

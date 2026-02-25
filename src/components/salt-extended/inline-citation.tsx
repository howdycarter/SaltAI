"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface InlineCitationProps extends React.ComponentProps<"span"> {
  index: number;
  title?: string;
  url?: string;
  description?: string;
}

function InlineCitation({
  className,
  index,
  title,
  url,
  description,
  ...props
}: InlineCitationProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <span
      data-slot="inline-citation"
      className={cn("relative inline-block", className)}
      {...props}
    >
      <button
        type="button"
        className={cn(
          "inline-flex items-center justify-center",
          "h-4 min-w-4 rounded-sm px-0.5 text-base leading-none font-medium",
          "-translate-y-0.5 align-super",
          "bg-[var(--salt-palette-interact-background,theme(colors.primary.DEFAULT))]",
          "text-[var(--salt-palette-interact-foreground,theme(colors.primary.foreground))]",
          "cursor-pointer transition-opacity hover:opacity-80",
        )}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        aria-label={`Citation ${index}${title ? `: ${title}` : ""}`}
      >
        {index}
      </button>
      {open && (title || description) && (
        <div
          className={cn(
            "absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2",
            "w-64 rounded-md p-3 shadow-lg",
            "bg-[var(--salt-container-primary-background,theme(colors.popover.DEFAULT))]",
            "border-[var(--salt-container-borderColor,theme(colors.border))] border",
            "text-[var(--salt-content-primary-foreground,theme(colors.popover.foreground))]",
          )}
        >
          {title && (
            <p className="text-base leading-tight font-medium">
              {url ? (
                <a
                  href={url}
                  className="underline hover:no-underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {title}
                </a>
              ) : (
                title
              )}
            </p>
          )}
          {description && (
            <p className="mt-1 line-clamp-2 text-base opacity-70">
              {description}
            </p>
          )}
        </div>
      )}
    </span>
  );
}

export { InlineCitation };
export type { InlineCitationProps };

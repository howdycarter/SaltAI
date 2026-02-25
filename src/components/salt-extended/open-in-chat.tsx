"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface OpenInChatProps extends React.ComponentProps<"div"> {
  url?: string;
  label?: string;
  onOpen?: () => void;
}

function OpenInChat({
  className,
  url,
  label = "Open in Chat",
  onOpen,
  ...props
}: OpenInChatProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = React.useCallback(() => {
    if (!url) return;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [url]);

  return (
    <div
      data-slot="open-in-chat"
      className={cn(
        "inline-flex items-center gap-2 rounded-lg px-3 py-2",
        "border-[var(--salt-container-borderColor,theme(colors.border))] border",
        "bg-[var(--salt-container-primary-background,theme(colors.background))]",
        className,
      )}
      {...props}
    >
      <button
        type="button"
        onClick={onOpen}
        className={cn(
          "inline-flex items-center gap-1.5 text-base font-medium",
          "text-[var(--salt-palette-interact-background,theme(colors.primary.DEFAULT))]",
          "transition-opacity hover:opacity-80",
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
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        {label}
      </button>
      {url && (
        <>
          <span className="bg-[var(--salt-container-borderColor,theme(colors.border))] h-4 w-px" />
          <button
            type="button"
            onClick={handleCopy}
            className={cn(
              "text-base",
              "text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))]",
              "hover:text-[var(--salt-content-primary-foreground,theme(colors.foreground))]",
              "transition-colors",
            )}
            aria-label={copied ? "Link copied" : "Copy link"}
          >
            {copied ? "Copied!" : "Copy link"}
          </button>
        </>
      )}
    </div>
  );
}

export { OpenInChat };
export type { OpenInChatProps };

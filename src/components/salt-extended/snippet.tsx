"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface SnippetProps extends React.ComponentProps<"div"> {
  code: string;
  prompt?: string;
  onCopy?: () => void;
}

function Snippet({
  className,
  code,
  prompt = "$",
  onCopy,
  ...props
}: SnippetProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = React.useCallback(() => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    onCopy?.();
    setTimeout(() => setCopied(false), 2000);
  }, [code, onCopy]);

  return (
    <div
      data-slot="snippet"
      className={cn(
        "inline-flex items-center gap-2 rounded-lg px-3 py-2",
        "font-mono text-base",
        "bg-[var(--salt-container-secondary-background,theme(colors.muted.DEFAULT))]",
        "text-[var(--salt-content-primary-foreground,theme(colors.foreground))]",
        "border-[var(--salt-container-borderColor,theme(colors.border))] border",
        className,
      )}
      {...props}
    >
      <span className="opacity-50 select-none">{prompt}</span>
      <code className="flex-1">{code}</code>
      <button
        type="button"
        onClick={handleCopy}
        className={cn(
          "shrink-0 rounded-md p-1",
          "text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))]",
          "hover:text-[var(--salt-content-primary-foreground,theme(colors.foreground))]",
          "transition-colors duration-150",
        )}
        aria-label={copied ? "Copied" : "Copy to clipboard"}
      >
        {copied ? (
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
            <path d="M20 6 9 17l-5-5" />
          </svg>
        ) : (
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
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
          </svg>
        )}
      </button>
    </div>
  );
}

export { Snippet };
export type { SnippetProps };

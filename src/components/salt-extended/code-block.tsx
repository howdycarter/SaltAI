"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface CodeBlockProps extends React.ComponentProps<"div"> {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
}

function CodeBlock({
  className,
  code,
  language = "text",
  filename,
  showLineNumbers = false,
  ...props
}: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = React.useCallback(() => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  const lines = code.split("\n");

  return (
    <div
      data-slot="code-block"
      className={cn(
        "overflow-hidden rounded-lg",
        "border-[var(--salt-container-borderColor,theme(colors.border))] border",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "flex items-center justify-between px-4 py-2",
          "bg-[var(--salt-container-secondary-background,theme(colors.muted.DEFAULT))]",
          "border-[var(--salt-container-borderColor,theme(colors.border))] border-b",
        )}
      >
        <div className="flex items-center gap-2">
          {filename && (
            <span
              className={cn(
                "text-base font-medium",
                "text-[var(--salt-content-primary-foreground,theme(colors.foreground))]",
              )}
            >
              {filename}
            </span>
          )}
          <span
            className={cn(
              "text-base",
              "text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))]",
            )}
          >
            {language}
          </span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className={cn(
            "rounded-md px-2 py-1 text-base",
            "text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))]",
            "hover:text-[var(--salt-content-primary-foreground,theme(colors.foreground))]",
            "hover:bg-[var(--salt-container-primary-background,theme(colors.background))]",
            "transition-colors duration-150",
          )}
          aria-label={copied ? "Copied" : "Copy code"}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <div
        className={cn(
          "overflow-x-auto p-4",
          "bg-[var(--salt-container-primary-background,theme(colors.background))]",
        )}
      >
        <pre className="text-base leading-relaxed">
          <code className="font-mono">
            {lines.map((line, i) => (
              <div key={i} className="flex">
                {showLineNumbers && (
                  <span
                    className={cn(
                      "w-8 shrink-0 pr-4 text-right select-none",
                      "text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))]",
                      "opacity-50",
                    )}
                  >
                    {i + 1}
                  </span>
                )}
                <span>{line}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}

export { CodeBlock };
export type { CodeBlockProps };

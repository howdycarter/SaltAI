"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface PackageInfoProps extends React.ComponentProps<"div"> {
  name: string;
  version?: string;
  description?: string;
  registry?: string;
  installCommand?: string;
}

function PackageInfo({
  className,
  name,
  version,
  description,
  registry = "npm",
  installCommand,
  ...props
}: PackageInfoProps) {
  const [copied, setCopied] = React.useState(false);
  const cmd =
    installCommand ?? `npm install ${name}${version ? `@${version}` : ""}`;

  const handleCopy = React.useCallback(() => {
    navigator.clipboard.writeText(cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [cmd]);

  return (
    <div
      data-slot="package-info"
      className={cn(
        "overflow-hidden rounded-lg",
        "border-[var(--salt-container-borderColor,theme(colors.border))] border",
        "bg-[var(--salt-container-primary-background,theme(colors.background))]",
        className,
      )}
      {...props}
    >
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-[var(--salt-content-primary-foreground,theme(colors.foreground))] text-base font-semibold">
              {name}
            </p>
            {version && (
              <span
                className={cn(
                  "mt-0.5 inline-block rounded px-1.5 py-0.5 font-mono text-base",
                  "bg-[var(--salt-container-secondary-background,theme(colors.muted.DEFAULT))]",
                  "text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))]",
                )}
              >
                v{version}
              </span>
            )}
          </div>
          <span
            className={cn(
              "rounded px-1.5 py-0.5 text-base font-medium",
              "bg-[var(--salt-container-secondary-background,theme(colors.muted.DEFAULT))]",
              "text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))]",
            )}
          >
            {registry}
          </span>
        </div>
        {description && (
          <p className="text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))] mt-2 text-base">
            {description}
          </p>
        )}
      </div>
      <div
        className={cn(
          "flex items-center gap-2 px-4 py-2 font-mono text-base",
          "bg-[var(--salt-container-secondary-background,theme(colors.muted.DEFAULT))]",
          "border-[var(--salt-container-borderColor,theme(colors.border))] border-t",
        )}
      >
        <span className="opacity-50 select-none">$</span>
        <code className="flex-1 truncate">{cmd}</code>
        <button
          type="button"
          onClick={handleCopy}
          className="text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))] hover:text-[var(--salt-content-primary-foreground,theme(colors.foreground))] shrink-0 transition-colors"
          aria-label={copied ? "Copied" : "Copy install command"}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
}

export { PackageInfo };
export type { PackageInfoProps };

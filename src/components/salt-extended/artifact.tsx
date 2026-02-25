"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type ArtifactType = "document" | "code" | "image" | "chart";

interface ArtifactProps extends React.ComponentProps<"div"> {
  title: string;
  type?: ArtifactType;
  expanded?: boolean;
  onToggle?: () => void;
}

const typeIcons: Record<ArtifactType, string> = {
  document: "\uD83D\uDCC4",
  code: "\uD83D\uDCBB",
  image: "\uD83D\uDDBC\uFE0F",
  chart: "\uD83D\uDCCA",
};

function Artifact({
  className,
  title,
  type = "document",
  expanded: controlledExpanded,
  onToggle,
  children,
  ...props
}: ArtifactProps) {
  const [internalExpanded, setInternalExpanded] = React.useState(false);
  const expanded = controlledExpanded ?? internalExpanded;

  const toggle = () => {
    if (onToggle) onToggle();
    else setInternalExpanded(!internalExpanded);
  };

  return (
    <div
      data-slot="artifact"
      className={cn(
        "overflow-hidden rounded-lg",
        "border-[var(--salt-container-borderColor,theme(colors.border))] border",
        "bg-[var(--salt-container-primary-background,theme(colors.background))]",
        expanded && "shadow-lg",
        className,
      )}
      {...props}
    >
      <button
        type="button"
        onClick={toggle}
        className={cn(
          "flex w-full items-center gap-2 px-4 py-3",
          "hover:bg-[var(--salt-container-secondary-background,theme(colors.muted.DEFAULT))]",
          "transition-colors",
        )}
      >
        <span className="text-base">{typeIcons[type]}</span>
        <span className="text-[var(--salt-content-primary-foreground,theme(colors.foreground))] flex-1 text-left text-base font-medium">
          {title}
        </span>
        <span
          className={cn(
            "rounded px-1.5 py-0.5 text-base font-medium",
            "bg-[var(--salt-container-secondary-background,theme(colors.muted.DEFAULT))]",
            "text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))]",
          )}
        >
          {type}
        </span>
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
          className={cn(
            "shrink-0 transition-transform",
            expanded && "rotate-180",
          )}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {expanded && (
        <div className="border-[var(--salt-container-borderColor,theme(colors.border))] border-t p-4">
          {children}
        </div>
      )}
    </div>
  );
}

export { Artifact };
export type { ArtifactProps, ArtifactType };

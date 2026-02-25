"use client";

import * as React from "react";

import { Reasoning } from "@/components/salt-extended";
import { cn } from "@/lib/utils";

interface InsightSummaryCardProps {
  title: string;
  summary: string;
  reasoning: string;
  generatedAt: string;
  className?: string;
}

function SparkleIcon({ className }: { className?: string }) {
  return (
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
      className={className}
      aria-hidden="true"
    >
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
      <path d="M20 3v4" />
      <path d="M22 5h-4" />
    </svg>
  );
}

function InsightSummaryCard({
  title,
  summary,
  reasoning,
  generatedAt,
  className,
}: InsightSummaryCardProps) {
  const formattedDate = React.useMemo(() => {
    try {
      return new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(generatedAt));
    } catch {
      return generatedAt;
    }
  }, [generatedAt]);

  return (
    <div
      data-slot="insight-summary-card"
      className={cn(
        "space-y-3 rounded-lg p-4",
        "border-[var(--salt-container-borderColor,theme(colors.border))] border",
        "bg-[var(--salt-container-primary-background,theme(colors.background))]",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <SparkleIcon className="text-[var(--salt-palette-interact-background,theme(colors.primary.DEFAULT))] shrink-0" />
        <h3 className="text-[var(--salt-content-primary-foreground,theme(colors.foreground))] text-base font-semibold">
          {title}
        </h3>
      </div>

      <p className="text-[var(--salt-content-primary-foreground,theme(colors.foreground))] text-base leading-relaxed">
        {summary}
      </p>

      <Reasoning title="Reasoning" defaultOpen={false}>
        <p className="whitespace-pre-wrap">{reasoning}</p>
      </Reasoning>

      <p className="text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))] text-base">
        Generated {formattedDate}
      </p>
    </div>
  );
}

export { InsightSummaryCard };
export type { InsightSummaryCardProps };

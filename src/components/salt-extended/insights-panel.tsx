"use client";

import { ChevronDown, ChevronRight, Sparkles } from "lucide-react";
import * as React from "react";

import { Skeleton, SkeletonText } from "@/components/salt-extended/skeleton";
import type { CallInsights, KeyMoment } from "@/types/call-review";

function formatTimestamp(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

const momentColors: Record<string, string> = {
  resolution:
    "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  friction:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  escalation: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
  coaching: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  compliance:
    "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
};

const sentimentConfig: Record<string, { color: string; label: string }> = {
  positive: { color: "bg-green-500", label: "Positive" },
  negative: { color: "bg-red-500", label: "Negative" },
  neutral: {
    color:
      "bg-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))]",
    label: "Neutral",
  },
};

const resolutionColors: Record<string, string> = {
  resolved:
    "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  unresolved: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
  partial:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  transferred:
    "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h4 className="mb-1.5 text-base font-semibold tracking-wider text-[var(--salt-content-secondary-foreground)] uppercase">
        {title}
      </h4>
      {children}
    </div>
  );
}

function KeyMomentItem({ moment }: { moment: KeyMoment }) {
  const [open, setOpen] = React.useState(false);
  const colorClass =
    momentColors[moment.type] ??
    "bg-[var(--salt-container-secondary-background,theme(colors.muted.DEFAULT))] text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))]";

  return (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      className="border-[var(--salt-container-borderColor,theme(colors.border))] hover:bg-[var(--salt-container-secondary-background,theme(colors.accent.DEFAULT))] w-full rounded border p-2 text-left transition-colors"
    >
      <div className="flex items-center gap-2">
        {open ? (
          <ChevronDown className="h-3 w-3 shrink-0 text-[var(--salt-content-secondary-foreground)]" />
        ) : (
          <ChevronRight className="h-3 w-3 shrink-0 text-[var(--salt-content-secondary-foreground)]" />
        )}
        <span
          className={`rounded px-1 py-0.5 text-base font-medium capitalize ${colorClass}`}
        >
          {moment.type}
        </span>
        <span className="text-base text-[var(--salt-content-secondary-foreground)] tabular-nums">
          {formatTimestamp(moment.timestamp)}
        </span>
      </div>
      {open && (
        <p className="mt-1.5 pl-5 text-base leading-relaxed">
          {moment.description}
        </p>
      )}
    </button>
  );
}

function SkeletonPanel() {
  return (
    <div className="space-y-4 p-4">
      <Skeleton className="h-5 w-2/3" />
      <div className="space-y-3">
        <SkeletonText lines={2} />
        <Skeleton className="h-20 w-full rounded-md" />
        <SkeletonText lines={3} />
        <Skeleton className="h-16 w-full rounded-md" />
      </div>
    </div>
  );
}

export function InsightsPanel({
  insights,
  loading = false,
}: {
  insights: CallInsights;
  loading?: boolean;
}) {
  if (loading) return <SkeletonPanel />;

  const resolutionClass =
    resolutionColors[insights.resolutionStatus] ??
    "bg-[var(--salt-container-secondary-background,theme(colors.muted.DEFAULT))] text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))]";
  const sentiment = insights.sentiment
    ? sentimentConfig[insights.sentiment]
    : null;

  return (
    <div className="space-y-4 p-4">
      {/* AI badge */}
      <div className="flex items-center gap-2">
        <Sparkles className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
        <span className="rounded bg-blue-100 px-1.5 py-0.5 text-base font-medium text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
          AI-Generated
        </span>
      </div>

      {/* Summary */}
      <Section title="Summary">
        <p className="text-base leading-relaxed">{insights.summary}</p>
      </Section>

      {/* Customer Problem */}
      <Section title="Customer Problem">
        <p className="text-base leading-relaxed">{insights.customerProblem}</p>
      </Section>

      {/* Customer Actions */}
      <Section title="Customer Actions">
        <ul className="list-inside list-disc space-y-0.5 text-base">
          {insights.customerActions.map((action, i) => (
            <li key={i} className="leading-relaxed">
              {action}
            </li>
          ))}
        </ul>
      </Section>

      {/* Agent Actions */}
      <Section title="Agent Actions">
        <ul className="list-inside list-disc space-y-0.5 text-base">
          {insights.agentActions.map((action, i) => (
            <li key={i} className="leading-relaxed">
              {action}
            </li>
          ))}
        </ul>
      </Section>

      {/* Resolution */}
      <Section title="Resolution">
        <span
          className={`rounded-full px-2 py-0.5 text-base font-medium capitalize ${resolutionClass}`}
        >
          {insights.resolutionStatus}
        </span>
      </Section>

      {/* Key Moments */}
      <Section title="Key Moments">
        <div className="space-y-1.5">
          {insights.keyMoments.map((km, i) => (
            <KeyMomentItem key={i} moment={km} />
          ))}
        </div>
      </Section>

      {/* Sentiment */}
      {sentiment && (
        <Section title="Sentiment">
          <div className="flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full ${sentiment.color}`} />
            <span className="text-base">{sentiment.label}</span>
          </div>
        </Section>
      )}
    </div>
  );
}

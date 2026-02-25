"use client";

import { FileText } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";
import type { TranscriptSegment } from "@/types/call-review";

function formatTimestamp(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

const speakerStyles: Record<string, { label: string; color: string }> = {
  agent: { label: "Agent", color: "text-blue-600" },
  customer: {
    label: "Customer",
    color: "text-[var(--salt-content-primary-foreground)]",
  },
  system: {
    label: "System",
    color: "text-[var(--salt-content-secondary-foreground)]",
  },
};

function Utterance({
  segment,
  isActive,
  onClick,
}: {
  segment: TranscriptSegment;
  isActive?: boolean;
  onClick?: () => void;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const style = speakerStyles[segment.speaker] ?? speakerStyles.system;
  const isSystem = segment.speaker === "system";

  // Auto-scroll active segment into view
  React.useEffect(() => {
    if (isActive && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [isActive]);

  return (
    <div
      ref={ref}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      className={cn(
        "-mx-2 flex gap-3 rounded-md px-2 py-1.5 transition-colors",
        isSystem && "opacity-60",
        isActive &&
          "bg-[var(--salt-actionable-cta-background,theme(colors.primary.DEFAULT))]/8 border-[var(--salt-actionable-cta-background,theme(colors.primary.DEFAULT))] border-l-2",
        onClick &&
          "hover:bg-[var(--salt-container-secondary-background,theme(colors.accent.DEFAULT))]/50 cursor-pointer",
      )}
    >
      <div className="w-16 shrink-0 pt-0.5 text-right">
        <span className="text-base text-[var(--salt-content-secondary-foreground)] tabular-nums">
          {formatTimestamp(segment.timestamp)}
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <span className={`text-base font-semibold uppercase ${style.color}`}>
          {style.label}
        </span>
        <p
          className={cn(
            "mt-0.5 text-base leading-relaxed",
            isSystem &&
              "text-[var(--salt-content-secondary-foreground)] italic",
          )}
        >
          {segment.text.split(/(\[REDACTED\])/).map((part, i) =>
            part === "[REDACTED]" ? (
              <span
                key={i}
                className="rounded bg-amber-100 px-1 py-0.5 font-mono text-base text-amber-800"
              >
                [REDACTED]
              </span>
            ) : (
              part
            ),
          )}
        </p>
      </div>
    </div>
  );
}

export function TranscriptPanel({
  segments,
  activeSegmentId,
  onSegmentClick,
}: {
  segments: TranscriptSegment[];
  activeSegmentId?: string | null;
  onSegmentClick?: (timestamp: number) => void;
}) {
  if (segments.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
        <FileText className="h-8 w-8 text-[var(--salt-content-secondary-foreground)]" />
        <p className="text-base text-[var(--salt-content-secondary-foreground)]">
          No transcript available
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-1 p-4">
      {segments.map((segment) => (
        <Utterance
          key={segment.id}
          segment={segment}
          isActive={activeSegmentId === segment.id}
          onClick={
            onSegmentClick ? () => onSegmentClick(segment.timestamp) : undefined
          }
        />
      ))}
    </div>
  );
}

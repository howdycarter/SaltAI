"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import type { SampleSet } from "@/types/call-review";

import { Button } from "./button";

export type SampleNavBarProps = {
  /** The sample set being navigated */
  sampleSet: SampleSet;
  /** Zero-based index of the current call in the set */
  currentIndex: number;
  /** Called when the user navigates to a different call */
  onNavigate: (index: number) => void;
  className?: string;
};

export function SampleNavBar({
  sampleSet,
  currentIndex,
  onNavigate,
  className,
}: SampleNavBarProps) {
  const total = sampleSet.callIds.length;
  const isFirst = currentIndex === 0;
  const isLast = currentIndex >= total - 1;
  const isSingle = total === 1;

  return (
    <div
      data-slot="sample-nav-bar"
      className={cn(
        "flex items-center justify-between gap-4 border-b px-4 py-2",
        "border-[var(--salt-container-borderColor,theme(colors.border))]",
        "bg-[var(--salt-container-secondary-background,theme(colors.muted.DEFAULT))]",
        className,
      )}
    >
      <p className="text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))] min-w-0 flex-1 truncate text-base">
        Showing{" "}
        <span className="text-[var(--salt-content-primary-foreground,theme(colors.foreground))] font-medium">
          {total} {total === 1 ? "call" : "calls"}
        </span>{" "}
        for {sampleSet.sliceDescription}. Sampling:{" "}
        <span className="font-medium">{sampleSet.samplingMethod}</span>.
      </p>

      {!isSingle && (
        <div className="flex shrink-0 items-center gap-2">
          <span className="text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))] text-base tabular-nums">
            Call {currentIndex + 1} of {total}
          </span>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Previous call"
            disabled={isFirst}
            onClick={() => onNavigate(currentIndex - 1)}
            className="h-7 w-7"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Next call"
            disabled={isLast}
            onClick={() => onNavigate(currentIndex + 1)}
            className="h-7 w-7"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

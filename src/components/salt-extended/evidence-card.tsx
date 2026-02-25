"use client";

import * as React from "react";

import { InlineCitation, Sources } from "@/components/salt-extended";
import type { SourceItemData } from "@/components/salt-extended/sources";
import { cn } from "@/lib/utils";

interface CitationData {
  index: number;
  title: string;
  url: string;
}

interface EvidenceCardProps {
  title: string;
  body: string;
  sources: SourceItemData[];
  citations: CitationData[];
  className?: string;
}

function EvidenceCard({
  title,
  body,
  sources,
  citations,
  className,
}: EvidenceCardProps) {
  return (
    <div
      data-slot="evidence-card"
      className={cn(
        "space-y-3 rounded-lg p-4",
        "border-[var(--salt-container-borderColor,theme(colors.border))] border",
        "bg-[var(--salt-container-primary-background,theme(colors.background))]",
        className,
      )}
    >
      <h3 className="text-[var(--salt-content-primary-foreground,theme(colors.foreground))] text-base font-semibold">
        {title}
      </h3>

      <p className="text-[var(--salt-content-primary-foreground,theme(colors.foreground))] text-base leading-relaxed">
        {body}
        {citations.length > 0 && (
          <>
            {" "}
            {citations.map((c) => (
              <InlineCitation
                key={c.index}
                index={c.index}
                title={c.title}
                url={c.url}
              />
            ))}
          </>
        )}
      </p>

      {sources.length > 0 && <Sources sources={sources} />}
    </div>
  );
}

export { EvidenceCard };
export type { CitationData, EvidenceCardProps };

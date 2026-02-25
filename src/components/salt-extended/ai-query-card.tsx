"use client";

import * as React from "react";

import {
  PromptInput,
  Suggestion,
  SuggestionGroup,
} from "@/components/salt-extended";
import { cn } from "@/lib/utils";

interface AIQueryCardProps {
  title: string;
  placeholder: string;
  suggestions: string[];
  onSubmit: (query: string) => void;
  className?: string;
}

function AIQueryCard({
  title,
  placeholder,
  suggestions,
  onSubmit,
  className,
}: AIQueryCardProps) {
  return (
    <div
      data-slot="ai-query-card"
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
      <PromptInput placeholder={placeholder} onSubmit={onSubmit} />
      {suggestions.length > 0 && (
        <SuggestionGroup>
          {suggestions.map((s) => (
            <Suggestion key={s} onClick={() => onSubmit(s)}>
              {s}
            </Suggestion>
          ))}
        </SuggestionGroup>
      )}
    </div>
  );
}

export { AIQueryCard };
export type { AIQueryCardProps };

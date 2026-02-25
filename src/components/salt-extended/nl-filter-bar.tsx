"use client";

import * as React from "react";

import { parseNaturalLanguageFilter } from "@/lib/mock/ai-service";
import { cn } from "@/lib/utils";

import { Loader } from "./loader";
import { PromptInput } from "./prompt-input";
import { Suggestion } from "./suggestion";

type NlFilterBarProps = {
  onFiltersParsed?: (filters: Record<string, unknown>) => void;
  suggestions?: string[];
  children?: React.ReactNode;
  className?: string;
};

function NlFilterBar({
  onFiltersParsed,
  suggestions = [
    "Show Card Services last 7 days",
    "Compare today vs yesterday",
    "Banking queue only",
  ],
  children,
  className,
}: NlFilterBarProps) {
  const [inputValue, setInputValue] = React.useState("");
  const [isParsing, setIsParsing] = React.useState(false);
  const [lastQuery, setLastQuery] = React.useState<string | null>(null);

  const handleSubmit = React.useCallback(
    async (query: string) => {
      setIsParsing(true);
      setLastQuery(query);
      const filters = await parseNaturalLanguageFilter(query);
      onFiltersParsed?.(filters);
      setIsParsing(false);
      setInputValue("");
    },
    [onFiltersParsed],
  );

  return (
    <div
      data-slot="nl-filter-bar"
      className={cn(
        "space-y-3 rounded-lg p-3",
        "border-[var(--salt-container-borderColor,theme(colors.border))] border",
        "bg-[var(--salt-container-secondary-background,theme(colors.muted.DEFAULT))]",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <PromptInput
            placeholder="Describe what you want to see..."
            value={inputValue}
            onValueChange={setInputValue}
            onSubmit={handleSubmit}
            disabled={isParsing}
          />
        </div>
        {isParsing && <Loader variant="spinner" size="sm" />}
      </div>

      <div className="flex flex-wrap gap-2">
        {suggestions.map((s) => (
          <Suggestion key={s} onClick={() => handleSubmit(s)}>
            {s}
          </Suggestion>
        ))}
      </div>

      {lastQuery && !isParsing && (
        <p className="text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))] text-base">
          Applied: &quot;{lastQuery}&quot;
        </p>
      )}

      {children}
    </div>
  );
}

export { NlFilterBar, type NlFilterBarProps };

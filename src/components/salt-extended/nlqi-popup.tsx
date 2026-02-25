"use client";

import { useRouter } from "next/navigation";
import * as React from "react";

import { useAI } from "@/lib/ai-context";
import { analyzeQuery, getPageSuggestions } from "@/lib/mock/ai-service";
import { cn } from "@/lib/utils";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { Loader } from "./loader";
import { Reasoning } from "./reasoning";
import { Sources } from "./sources";

function NlqiPopup() {
  const router = useRouter();
  const { nlqiOpen, setNlqiOpen, pageContext } = useAI();
  const [query, setQuery] = React.useState("");
  const [suggestions, setSuggestions] = React.useState<string[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [result, setResult] = React.useState<{
    answer: string;
    reasoning: string;
    sources: { title: string; url: string }[];
  } | null>(null);

  // Keyboard shortcut: Cmd+K
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setNlqiOpen(!nlqiOpen);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [nlqiOpen, setNlqiOpen]);

  React.useEffect(() => {
    if (nlqiOpen) {
      getPageSuggestions(pageContext.page, pageContext).then(setSuggestions);
      setQuery("");
      setResult(null);
    }
  }, [nlqiOpen, pageContext]);

  const handleSelect = React.useCallback(
    async (value: string) => {
      setQuery(value);
      setIsLoading(true);

      const response = await analyzeQuery(value, pageContext);
      setResult({
        answer: response.answer,
        reasoning: response.reasoning,
        sources: response.sources,
      });
      setIsLoading(false);
    },
    [pageContext],
  );

  const handleOpenInDiscovery = React.useCallback(() => {
    setNlqiOpen(false);
    router.push(`/en/discovery?q=${encodeURIComponent(query)}`);
  }, [query, router, setNlqiOpen]);

  return (
    <CommandDialog open={nlqiOpen} onOpenChange={setNlqiOpen}>
      <Command>
        <CommandInput
          placeholder={`Ask TorqueAI about ${pageContext.title.toLowerCase()}...`}
          value={query}
          onValueChange={setQuery}
        />
        <CommandList className="max-h-[400px]">
          {isLoading && (
            <div className="flex items-center justify-center py-6">
              <Loader variant="dots" size="md" />
            </div>
          )}

          {!isLoading && !result && (
            <>
              <CommandEmpty>
                Press Enter or select a suggestion below.
              </CommandEmpty>
              <CommandGroup heading="Suggestions">
                {suggestions.map((s) => (
                  <CommandItem key={s} value={s} onSelect={handleSelect}>
                    {s}
                  </CommandItem>
                ))}
              </CommandGroup>
              {query.trim() && (
                <CommandGroup heading="Actions">
                  <CommandItem
                    value={query}
                    onSelect={() => handleSelect(query)}
                  >
                    Search: &quot;{query}&quot;
                  </CommandItem>
                </CommandGroup>
              )}
            </>
          )}

          {!isLoading && result && (
            <div className="space-y-3 p-4">
              <p
                className={cn(
                  "text-base",
                  "text-[var(--salt-content-primary-foreground,theme(colors.foreground))]",
                )}
              >
                {result.answer}
              </p>
              <Reasoning title="How I arrived at this">
                <p>{result.reasoning}</p>
              </Reasoning>
              <Sources sources={result.sources} />
              <button
                type="button"
                onClick={handleOpenInDiscovery}
                className={cn(
                  "mt-2 w-full rounded-md px-3 py-2 text-center text-base font-medium",
                  "bg-[var(--salt-palette-interact-background,theme(colors.primary.DEFAULT))]",
                  "text-[var(--salt-palette-interact-foreground,theme(colors.primary.foreground))]",
                  "transition-opacity hover:opacity-90",
                )}
              >
                Continue in Discovery
              </button>
            </div>
          )}
        </CommandList>
      </Command>
    </CommandDialog>
  );
}

export { NlqiPopup };

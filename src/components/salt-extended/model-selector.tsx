"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface ModelOption {
  id: string;
  name: string;
  provider?: string;
  description?: string;
}

interface ModelSelectorProps extends React.ComponentProps<"div"> {
  models: ModelOption[];
  value?: string;
  onValueChange?: (modelId: string) => void;
  placeholder?: string;
}

function ModelSelector({
  className,
  models,
  value,
  onValueChange,
  placeholder = "Select model...",
  ...props
}: ModelSelectorProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const ref = React.useRef<HTMLDivElement>(null);
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  const selected = models.find((m) => m.id === value);

  const filtered = React.useMemo(
    () =>
      models.filter(
        (m) =>
          m.name.toLowerCase().includes(search.toLowerCase()) ||
          m.provider?.toLowerCase().includes(search.toLowerCase()),
      ),
    [models, search],
  );

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Focus the search input when the dropdown opens
  React.useEffect(() => {
    if (open && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [open]);

  return (
    <div
      data-slot="model-selector"
      ref={ref}
      className={cn("relative inline-block", className)}
      {...props}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "flex items-center gap-2 rounded-lg px-3 py-2 text-base",
          "border-[var(--salt-container-borderColor,theme(colors.border))] border",
          "bg-[var(--salt-container-primary-background,theme(colors.background))]",
          "text-[var(--salt-content-primary-foreground,theme(colors.foreground))]",
          "hover:bg-[var(--salt-container-secondary-background,theme(colors.muted.DEFAULT))]",
          "transition-colors duration-150",
        )}
      >
        <span
          className={cn(
            !selected &&
              "text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))]",
          )}
        >
          {selected ? selected.name : placeholder}
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
          className={cn("transition-transform", open && "rotate-180")}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {open && (
        <div
          className={cn(
            "absolute top-full left-0 z-50 mt-1 w-64 overflow-hidden rounded-lg shadow-lg",
            "border-[var(--salt-container-borderColor,theme(colors.border))] border",
            "bg-[var(--salt-container-primary-background,theme(colors.popover.DEFAULT))]",
          )}
        >
          <div className="p-2">
            <input
              ref={searchInputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search models..."
              className={cn(
                "w-full rounded-md px-3 py-1.5 text-base outline-none",
                "bg-[var(--salt-container-secondary-background,theme(colors.muted.DEFAULT))]",
                "text-[var(--salt-content-primary-foreground,theme(colors.foreground))]",
                "placeholder:text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))]",
              )}
            />
          </div>
          <div className="max-h-48 overflow-y-auto">
            {filtered.map((model) => (
              <button
                key={model.id}
                type="button"
                onClick={() => {
                  onValueChange?.(model.id);
                  setOpen(false);
                  setSearch("");
                }}
                className={cn(
                  "flex w-full items-start gap-2 px-3 py-2 text-left text-base",
                  "hover:bg-[var(--salt-container-secondary-background,theme(colors.accent.DEFAULT))]",
                  "transition-colors",
                  model.id === value &&
                    "bg-[var(--salt-container-secondary-background,theme(colors.accent.DEFAULT))]",
                )}
              >
                <div>
                  <p className="text-[var(--salt-content-primary-foreground,theme(colors.foreground))] font-medium">
                    {model.name}
                  </p>
                  {model.provider && (
                    <p className="text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))] text-base">
                      {model.provider}
                    </p>
                  )}
                </div>
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))] px-3 py-2 text-base">
                No models found
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export { ModelSelector };
export type { ModelOption, ModelSelectorProps };

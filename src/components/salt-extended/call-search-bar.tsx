"use client";

import { Search, X } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

export type CallSearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onSearch: (query: string) => void;
  placeholder?: string;
  error?: string | null;
  className?: string;
};

const CALL_ID_PATTERN = /^CR-\d{4}-\d{4}-\d+$/;

export function CallSearchBar({
  value,
  onChange,
  onSearch,
  placeholder = "Search by Call ID (e.g. CR-2026-0118-47293)",
  error,
  className,
}: CallSearchBarProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (trimmed) onSearch(trimmed);
  };

  return (
    <div data-slot="call-search-bar" className={cn("w-full", className)}>
      <form onSubmit={handleSubmit} className="relative">
        <Search className="text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))] absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          aria-label="Search calls"
          className={cn(
            "h-10 w-full rounded-md border pr-10 pl-10 text-base transition-colors outline-none",
            "border-[var(--salt-editable-borderColor,theme(colors.border))]",
            "bg-[var(--salt-container-primary-background,theme(colors.background))]",
            "text-[var(--salt-content-primary-foreground,theme(colors.foreground))]",
            "placeholder:text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))]",
            "focus:border-[var(--salt-focused-outlineColor,theme(colors.ring))]",
            error &&
              "border-[var(--salt-status-error-borderColor,theme(colors.destructive.DEFAULT))]",
          )}
        />
        {value && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => onChange("")}
            className="text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))] hover:text-[var(--salt-content-primary-foreground,theme(colors.foreground))] absolute top-1/2 right-3 -translate-y-1/2"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </form>
      {error && (
        <p className="text-[var(--salt-status-error-foreground,theme(colors.destructive.DEFAULT))] mt-1 text-base">
          {error}
        </p>
      )}
    </div>
  );
}

export { CALL_ID_PATTERN };

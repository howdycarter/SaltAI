"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface EnvVar {
  name: string;
  value: string;
  masked?: boolean;
}

interface EnvironmentVariablesProps extends React.ComponentProps<"div"> {
  variables: EnvVar[];
  title?: string;
}

function EnvironmentVariables({
  className,
  variables,
  title = "Environment Variables",
  ...props
}: EnvironmentVariablesProps) {
  return (
    <div
      data-slot="environment-variables"
      className={cn(
        "overflow-hidden rounded-lg",
        "border-[var(--salt-container-borderColor,theme(colors.border))] border",
        "bg-[var(--salt-container-primary-background,theme(colors.background))]",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "px-4 py-2.5 text-base font-medium",
          "bg-[var(--salt-container-secondary-background,theme(colors.muted.DEFAULT))]",
          "text-[var(--salt-content-primary-foreground,theme(colors.foreground))]",
          "border-[var(--salt-container-borderColor,theme(colors.border))] border-b",
        )}
      >
        {title}
      </div>
      <div className="divide-[var(--salt-container-borderColor,theme(colors.border))] divide-y">
        {variables.map((v) => (
          <EnvVarRow key={v.name} {...v} />
        ))}
      </div>
    </div>
  );
}

function EnvVarRow({ name, value, masked = false }: EnvVar) {
  const [revealed, setRevealed] = React.useState(false);

  return (
    <div className="flex items-center gap-3 px-4 py-2 font-mono text-base">
      <span className="text-[var(--salt-content-primary-foreground,theme(colors.foreground))] shrink-0 font-medium">
        {name}
      </span>
      <span className="text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))]">
        =
      </span>
      <span
        className={cn(
          "flex-1 truncate",
          "text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))]",
        )}
      >
        {masked && !revealed ? "••••••••" : value}
      </span>
      {masked && (
        <button
          type="button"
          onClick={() => setRevealed(!revealed)}
          className="text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))] hover:text-[var(--salt-content-primary-foreground,theme(colors.foreground))] shrink-0 text-base transition-colors"
          aria-label={revealed ? "Hide value" : "Reveal value"}
        >
          {revealed ? "Hide" : "Reveal"}
        </button>
      )}
    </div>
  );
}

export { EnvironmentVariables };
export type { EnvironmentVariablesProps, EnvVar };

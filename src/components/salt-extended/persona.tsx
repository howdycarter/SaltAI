"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface PersonaProps extends React.ComponentProps<"div"> {
  name: string;
  jobRole?: string;
  avatar?: React.ReactNode;
  capabilities?: string[];
}

function Persona({
  className,
  name,
  jobRole,
  avatar,
  capabilities,
  ...props
}: PersonaProps) {
  return (
    <div
      data-slot="persona"
      className={cn(
        "flex items-start gap-3 rounded-lg p-4",
        "border-[var(--salt-container-borderColor,theme(colors.border))] border",
        "bg-[var(--salt-container-primary-background,theme(colors.background))]",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-base font-bold",
          "bg-[var(--salt-palette-interact-background,theme(colors.primary.DEFAULT))]",
          "text-[var(--salt-palette-interact-foreground,theme(colors.primary.foreground))]",
        )}
      >
        {avatar ?? name.charAt(0).toUpperCase()}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[var(--salt-content-primary-foreground,theme(colors.foreground))] text-base font-semibold">
          {name}
        </p>
        {jobRole && (
          <p className="text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))] text-base">
            {jobRole}
          </p>
        )}
        {capabilities && capabilities.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {capabilities.map((cap) => (
              <span
                key={cap}
                className={cn(
                  "inline-flex rounded-full px-2 py-0.5 text-base font-medium",
                  "bg-[var(--salt-container-secondary-background,theme(colors.muted.DEFAULT))]",
                  "text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))]",
                )}
              >
                {cap}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export { Persona };
export type { PersonaProps };

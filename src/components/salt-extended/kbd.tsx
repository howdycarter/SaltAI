"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        "pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 select-none",
        "font-mono text-base font-medium opacity-100",
        "bg-[var(--salt-container-secondary-background,theme(colors.muted.DEFAULT))]",
        "text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))]",
        "border-[var(--salt-container-borderColor,theme(colors.border))]",
        className,
      )}
      {...props}
    />
  );
}

export { Kbd };

"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface TerminalProps extends React.ComponentProps<"div"> {
  title?: string;
  lines?: string[];
}

function Terminal({
  className,
  title = "Terminal",
  lines = [],
  children,
  ...props
}: TerminalProps) {
  return (
    <div
      data-slot="terminal"
      className={cn(
        "overflow-hidden rounded-lg",
        "border-[var(--salt-container-borderColor,theme(colors.border))] border",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-2 bg-neutral-900 px-4 py-2">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-red-500" />
          <span className="h-3 w-3 rounded-full bg-yellow-500" />
          <span className="h-3 w-3 rounded-full bg-green-500" />
        </div>
        <span className="text-base font-medium text-neutral-400">{title}</span>
      </div>
      <div className="overflow-x-auto bg-neutral-950 p-4 font-mono text-base text-green-400">
        {lines.length > 0
          ? lines.map((line, i) => <div key={i}>{line || "\u00A0"}</div>)
          : children}
      </div>
    </div>
  );
}

export { Terminal };
export type { TerminalProps };

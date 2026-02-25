"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface SandboxProps extends React.ComponentProps<"div"> {
  code?: string;
  output?: string;
  language?: string;
  status?: "idle" | "running" | "success" | "error";
  onRun?: (code: string) => void;
}

function Sandbox({
  className,
  code = "",
  output,
  language = "javascript",
  status = "idle",
  onRun,
  ...props
}: SandboxProps) {
  const [value, setValue] = React.useState(code);

  return (
    <div
      data-slot="sandbox"
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
          "flex items-center justify-between px-4 py-2",
          "bg-[var(--salt-container-secondary-background,theme(colors.muted.DEFAULT))]",
          "border-[var(--salt-container-borderColor,theme(colors.border))] border-b",
        )}
      >
        <span className="text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))] text-base font-medium">
          {language}
        </span>
        <button
          type="button"
          onClick={() => onRun?.(value)}
          disabled={status === "running"}
          className={cn(
            "rounded-md px-3 py-1 text-base font-medium transition-colors",
            "bg-[var(--salt-palette-interact-background,theme(colors.primary.DEFAULT))]",
            "text-[var(--salt-palette-interact-foreground,theme(colors.primary.foreground))]",
            "hover:opacity-90",
            "disabled:opacity-50",
          )}
        >
          {status === "running" ? "Running..." : "Run"}
        </button>
      </div>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={cn(
          "min-h-[120px] w-full resize-none p-4 font-mono text-base outline-none",
          "bg-[var(--salt-container-primary-background,theme(colors.background))]",
          "text-[var(--salt-content-primary-foreground,theme(colors.foreground))]",
        )}
        spellCheck={false}
      />
      {output != null && (
        <div
          className={cn(
            "px-4 py-3 font-mono text-base",
            "border-[var(--salt-container-borderColor,theme(colors.border))] border-t",
            "bg-neutral-950 text-green-400",
            status === "error" && "text-red-400",
          )}
        >
          <pre className="whitespace-pre-wrap">{output}</pre>
        </div>
      )}
    </div>
  );
}

export { Sandbox };
export type { SandboxProps };

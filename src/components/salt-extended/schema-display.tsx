"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface SchemaField {
  name: string;
  type: string;
  required?: boolean;
  description?: string;
  children?: SchemaField[];
}

interface SchemaDisplayProps extends React.ComponentProps<"div"> {
  name?: string;
  fields: SchemaField[];
}

function SchemaDisplay({
  className,
  name,
  fields,
  ...props
}: SchemaDisplayProps) {
  return (
    <div
      data-slot="schema-display"
      className={cn(
        "overflow-hidden rounded-lg text-base",
        "border-[var(--salt-container-borderColor,theme(colors.border))] border",
        "bg-[var(--salt-container-primary-background,theme(colors.background))]",
        className,
      )}
      {...props}
    >
      {name && (
        <div
          className={cn(
            "px-4 py-2 font-medium",
            "bg-[var(--salt-container-secondary-background,theme(colors.muted.DEFAULT))]",
            "text-[var(--salt-content-primary-foreground,theme(colors.foreground))]",
            "border-[var(--salt-container-borderColor,theme(colors.border))] border-b",
          )}
        >
          {name}
        </div>
      )}
      <div className="p-2">
        {fields.map((field) => (
          <SchemaFieldRow key={field.name} field={field} depth={0} />
        ))}
      </div>
    </div>
  );
}

function SchemaFieldRow({
  field,
  depth,
}: {
  field: SchemaField;
  depth: number;
}) {
  const [open, setOpen] = React.useState(true);
  const hasChildren = field.children && field.children.length > 0;

  const handleToggle = () => {
    if (hasChildren) setOpen(!open);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (hasChildren && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      setOpen(!open);
    }
  };

  return (
    <div>
      <div
        className={cn(
          "flex items-center gap-2 rounded px-2 py-1.5 font-mono text-base",
          "hover:bg-[var(--salt-container-secondary-background,theme(colors.muted.DEFAULT))]",
          hasChildren && "cursor-pointer",
        )}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        role={hasChildren ? "button" : undefined}
        tabIndex={hasChildren ? 0 : undefined}
      >
        {hasChildren && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={cn("shrink-0 transition-transform", open && "rotate-90")}
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        )}
        <span className="text-[var(--salt-content-primary-foreground,theme(colors.foreground))]">
          {field.name}
        </span>
        {field.required && <span className="text-red-500">*</span>}
        <span className="text-[var(--salt-palette-interact-background,theme(colors.primary.DEFAULT))]">
          {field.type}
        </span>
        {field.description && (
          <span className="text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))] ml-auto truncate">
            {field.description}
          </span>
        )}
      </div>
      {hasChildren &&
        open &&
        field.children!.map((child) => (
          <SchemaFieldRow key={child.name} field={child} depth={depth + 1} />
        ))}
    </div>
  );
}

export { SchemaDisplay };
export type { SchemaDisplayProps, SchemaField };

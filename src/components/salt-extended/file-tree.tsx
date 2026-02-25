"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface FileNode {
  name: string;
  type: "file" | "folder";
  children?: FileNode[];
  active?: boolean;
}

interface FileTreeProps extends Omit<React.ComponentProps<"div">, "onSelect"> {
  items: FileNode[];
  onSelect?: (path: string) => void;
}

function FileTree({ className, items, onSelect, ...props }: FileTreeProps) {
  return (
    <div
      data-slot="file-tree"
      className={cn(
        "overflow-hidden rounded-lg font-mono text-base",
        "border-[var(--salt-container-borderColor,theme(colors.border))] border",
        "bg-[var(--salt-container-primary-background,theme(colors.background))]",
        className,
      )}
      {...props}
    >
      <div className="p-2">
        {items.map((item) => (
          <FileTreeItem
            key={item.name}
            node={item}
            depth={0}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}

function FileTreeItem({
  node,
  depth,
  onSelect,
  parentPath = "",
}: {
  node: FileNode;
  depth: number;
  onSelect?: (path: string) => void;
  parentPath?: string;
}) {
  const [open, setOpen] = React.useState(true);
  const fullPath = parentPath ? `${parentPath}/${node.name}` : node.name;

  return (
    <div data-slot="file-tree-item">
      <button
        type="button"
        onClick={() => {
          if (node.type === "folder") setOpen(!open);
          onSelect?.(fullPath);
        }}
        className={cn(
          "flex w-full items-center gap-1.5 rounded px-2 py-1 text-left text-base",
          "hover:bg-[var(--salt-container-secondary-background,theme(colors.accent.DEFAULT))]",
          "transition-colors",
          node.active &&
            "bg-[var(--salt-container-secondary-background,theme(colors.accent.DEFAULT))]",
        )}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
      >
        {node.type === "folder" ? (
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
            className={cn("shrink-0 transition-transform", open && "rotate-90")}
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        ) : (
          <span className="w-[14px]" />
        )}
        {node.type === "folder" ? (
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
            className="shrink-0 text-amber-500"
          >
            <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
          </svg>
        ) : (
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
            className="text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))] shrink-0"
          >
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
          </svg>
        )}
        <span className="text-[var(--salt-content-primary-foreground,theme(colors.foreground))] truncate">
          {node.name}
        </span>
      </button>
      {node.type === "folder" &&
        open &&
        node.children?.map((child) => (
          <FileTreeItem
            key={child.name}
            node={child}
            depth={depth + 1}
            onSelect={onSelect}
            parentPath={fullPath}
          />
        ))}
    </div>
  );
}

export { FileTree, FileTreeItem };
export type { FileNode, FileTreeProps };

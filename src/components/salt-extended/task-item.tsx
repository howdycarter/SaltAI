"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type TaskStatus = "pending" | "in_progress" | "completed" | "failed";

interface TaskData {
  id: string;
  label: string;
  status: TaskStatus;
  description?: string;
}

interface TaskListProps extends React.ComponentProps<"div"> {
  tasks: TaskData[];
}

const statusConfig: Record<TaskStatus, { icon: string; color: string }> = {
  pending: {
    icon: "\u25CB",
    color:
      "text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))]",
  },
  in_progress: { icon: "\u25D4", color: "text-amber-500" },
  completed: { icon: "\u2713", color: "text-emerald-500" },
  failed: { icon: "\u2717", color: "text-red-500" },
};

function TaskList({ className, tasks, ...props }: TaskListProps) {
  const done = tasks.filter((t) => t.status === "completed").length;

  return (
    <div
      data-slot="task-list"
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
          "flex items-center justify-between px-4 py-2.5",
          "bg-[var(--salt-container-secondary-background,theme(colors.muted.DEFAULT))]",
          "border-[var(--salt-container-borderColor,theme(colors.border))] border-b",
        )}
      >
        <span className="text-[var(--salt-content-primary-foreground,theme(colors.foreground))] text-base font-medium">
          Tasks
        </span>
        <span className="text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))] text-base">
          {done}/{tasks.length}
        </span>
      </div>
      <div className="divide-[var(--salt-container-borderColor,theme(colors.border))] divide-y">
        {tasks.map((task) => (
          <TaskItem key={task.id} {...task} />
        ))}
      </div>
    </div>
  );
}

function TaskItem({ label, status, description }: TaskData) {
  const config = statusConfig[status];
  return (
    <div data-slot="task-item" className="flex items-start gap-3 px-4 py-2.5">
      <span className={cn("mt-0.5 font-mono text-base", config.color)}>
        {config.icon}
      </span>
      <div className="min-w-0 flex-1">
        <p
          className={cn(
            "text-base",
            status === "completed" && "line-through opacity-60",
            "text-[var(--salt-content-primary-foreground,theme(colors.foreground))]",
          )}
        >
          {label}
        </p>
        {description && (
          <p className="text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))] mt-0.5 text-base">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

export { TaskItem, TaskList };
export type { TaskData, TaskListProps, TaskStatus };

"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const alertVariants = cva(
  cn(
    "relative w-full rounded-lg border px-4 py-3 text-base",
    "[&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
  ),
  {
    variants: {
      variant: {
        default: cn(
          "bg-[var(--salt-container-primary-background,theme(colors.background))]",
          "text-[var(--salt-content-primary-foreground,theme(colors.foreground))]",
        ),
        destructive: cn(
          "border-[var(--salt-status-error-borderColor,theme(colors.destructive/50))]",
          "text-[var(--salt-status-error-foreground,theme(colors.destructive))]",
          "[&>svg]:text-[var(--salt-status-error-foreground,theme(colors.destructive))]",
        ),
        success: cn(
          "border-emerald-500/50 text-emerald-700 dark:text-emerald-400",
          "[&>svg]:text-emerald-600",
        ),
        warning: cn(
          "border-amber-500/50 text-amber-700 dark:text-amber-400",
          "[&>svg]:text-amber-600",
        ),
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  );
}

function AlertTitle({
  className,
  children,
  ...props
}: React.ComponentProps<"h5">) {
  return (
    <h5
      data-slot="alert-title"
      className={cn("mb-1 leading-none font-medium tracking-tight", className)}
      {...props}
    >
      {children}
    </h5>
  );
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn("text-base [&_p]:leading-relaxed", className)}
      {...props}
    />
  );
}

export { Alert, AlertDescription, AlertTitle, alertVariants };

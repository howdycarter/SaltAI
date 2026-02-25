"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

function Toaster({ ...props }: ToasterProps) {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      data-slot="toaster"
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-[var(--salt-container-primary-background)] group-[.toaster]:text-[var(--salt-content-primary-foreground)] group-[.toaster]:border-[var(--salt-container-borderColor)] group-[.toaster]:shadow-lg",
          description:
            "group-[.toast]:text-[var(--salt-content-secondary-foreground)]",
          actionButton:
            "group-[.toast]:bg-[var(--salt-actionable-cta-background,#0060f0)] group-[.toast]:text-white",
          cancelButton:
            "group-[.toast]:bg-[var(--salt-container-secondary-background)] group-[.toast]:text-[var(--salt-content-secondary-foreground)]",
        },
      }}
      {...props}
    />
  );
}

export { Toaster };

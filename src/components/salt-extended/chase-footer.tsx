"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import * as React from "react";

import { cn } from "@/lib/utils";

type FooterLink = {
  label: string;
  href: string;
};

type ChaseFooterProps = {
  links?: FooterLink[];
  className?: string;
};

function ChaseFooter({ links = [], className }: ChaseFooterProps) {
  const { resolvedTheme } = useTheme();
  const logoSrc =
    resolvedTheme === "dark"
      ? "/logo/logo_chase_headerfooter_white.svg"
      : "/logo/logo_chase_headerfooter.svg";

  return (
    <footer
      data-slot="chase-footer"
      className={cn(
        "border-t px-6 py-8",
        "bg-[var(--salt-container-primary-background,theme(colors.background))]",
        "border-[var(--salt-container-borderColor,theme(colors.border))]",
        className,
      )}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 md:flex-row md:justify-between">
        <Link href="/" className="flex items-center">
          <Image src={logoSrc} alt="Chase" width={100} height={19} />
        </Link>
        {links.length > 0 && (
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-base transition-colors",
                  "text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))]",
                  "hover:text-[var(--salt-content-primary-foreground,theme(colors.foreground))]",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
        <p className="text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))] text-base">
          &copy; {new Date().getFullYear()} JPMorgan Chase &amp; Co.
        </p>
      </div>
    </footer>
  );
}

export { ChaseFooter, type FooterLink };

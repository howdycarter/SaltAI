"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import * as React from "react";

import { cn } from "@/lib/utils";

type HeaderLink = {
  label: string;
  href: string;
};

/**
 * Strip locale prefix (e.g. "/en/dashboard" -> "/dashboard") for route matching.
 */
function stripLocale(pathname: string): string {
  return pathname.replace(/^\/[a-z]{2}(?=\/|$)/, "") || "/";
}

function isActiveLink(pathname: string | null, href: string): boolean {
  if (!pathname) return false;
  const bare = stripLocale(pathname);
  if (href === "/") return bare === "/";
  return bare.startsWith(href);
}

type ChaseHeaderProps = {
  className?: string;
  children?: React.ReactNode;
};

function ChaseHeader({ className, children }: ChaseHeaderProps) {
  const { resolvedTheme } = useTheme();
  const logoSrc =
    resolvedTheme === "dark"
      ? "/logo/logo_chase_headerfooter_white.svg"
      : "/logo/logo_chase_headerfooter.svg";

  return (
    <header
      data-slot="chase-header"
      className={cn(
        "z-40 flex h-16 shrink-0 items-center justify-between border-b px-6",
        "bg-[var(--salt-container-primary-background,theme(colors.background))]",
        "border-[var(--salt-container-borderColor,theme(colors.border))]",
        className,
      )}
    >
      <div className="flex items-center gap-8">
        <Link href="/" className="flex items-center">
          <Image src={logoSrc} alt="Chase" width={126} height={24} priority />
        </Link>
      </div>

      <div className="flex items-center gap-4">{children}</div>
    </header>
  );
}

export { ChaseHeader, type HeaderLink, isActiveLink, stripLocale };

"use client";

import {
  Bell,
  FileText,
  LayoutDashboard,
  Phone,
  Search,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import {
  VerticalNavigation,
  VerticalNavigationItem,
  VerticalNavigationItemContent,
  VerticalNavigationItemLabel,
  VerticalNavigationItemTrigger,
} from "@/components/salt-extended";
import { cn } from "@/lib/utils";

import { isActiveLink } from "./chase-header";

/* ------------------------------------------------------------------ */
/*  Navigation items                                                   */
/* ------------------------------------------------------------------ */

const mainNavItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/" },
  { label: "Trending", icon: TrendingUp, href: "/trending" },
  { label: "Alerts", icon: Bell, href: "/alerts" },
  { label: "Discovery", icon: Search, href: "/discovery" },
  { label: "Insights", icon: FileText, href: "/insights" },
  { label: "Call Review", icon: Phone, href: "/call-review" },
] as const;

/* ------------------------------------------------------------------ */
/*  NavRail — public API                                               */
/* ------------------------------------------------------------------ */

function NavRail({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <aside
      data-slot="nav-rail"
      className={cn(
        "flex h-full w-48 flex-col border-r",
        "bg-[var(--salt-container-primary-background,theme(colors.background))]",
        "border-[var(--salt-container-borderColor,theme(colors.border))]",
        className,
      )}
    >
      <VerticalNavigation appearance="bordered" className="py-2">
        {mainNavItems.map((item) => {
          const active = isActiveLink(pathname, item.href);
          return (
            <VerticalNavigationItem key={item.href} active={active}>
              <VerticalNavigationItemTrigger
                href={item.href}
                render={<Link href={item.href} />}
              >
                <VerticalNavigationItemContent>
                  <item.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <VerticalNavigationItemLabel>
                    {item.label}
                  </VerticalNavigationItemLabel>
                </VerticalNavigationItemContent>
              </VerticalNavigationItemTrigger>
            </VerticalNavigationItem>
          );
        })}
      </VerticalNavigation>
    </aside>
  );
}

export { mainNavItems, NavRail };

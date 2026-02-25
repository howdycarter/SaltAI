"use client";

import { HelpCircle, LogOut, Moon, Settings, Sun, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/salt-extended";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";

function ProfileMenu({ className }: { className?: string }) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  if (!user) return null;

  const handleSignOut = () => {
    logout();
    router.push("/login");
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          data-slot="profile-menu-trigger"
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full text-base font-bold",
            "bg-[var(--salt-palette-interact-background,theme(colors.primary.DEFAULT))]",
            "text-[var(--salt-palette-interact-foreground,theme(colors.primary.foreground))]",
            "transition-opacity hover:opacity-90",
            className,
          )}
          aria-label={`Profile menu for ${user.name}`}
        >
          {user.initials}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <div className="px-2 py-1.5">
          <p className="text-[var(--salt-content-primary-foreground,theme(colors.foreground))] text-base font-medium">
            {user.name}
          </p>
          <p className="text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))] text-base">
            {user.roleLabel}
          </p>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/help" className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4" />
            Help
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={toggleTheme}
          className="flex items-center gap-2"
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
          {theme === "dark" ? "Light mode" : "Dark mode"}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleSignOut}
          className="flex items-center gap-2"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { ProfileMenu };

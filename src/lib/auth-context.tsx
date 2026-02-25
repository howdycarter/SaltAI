"use client";

import * as React from "react";

import { MOCK_USERS } from "@/lib/mock/users";
import type { AuthState, MockUser } from "@/types/auth";

type AuthContextType = AuthState & {
  login: (userId: string) => void;
  logout: () => void;
};

const AuthContext = React.createContext<AuthContextType | null>(null);

const STORAGE_KEY = "saltai-auth-user";

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<MockUser | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const found = MOCK_USERS.find((u) => u.id === parsed.id);
        if (found) setUser(found);
      }
    } catch {
      // ignore
    }
    setIsLoading(false);
  }, []);

  const login = React.useCallback((userId: string) => {
    const found = MOCK_USERS.find((u) => u.id === userId);
    if (found) {
      setUser(found);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(found));
    }
  }, []);

  const logout = React.useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export { AuthProvider, useAuth };

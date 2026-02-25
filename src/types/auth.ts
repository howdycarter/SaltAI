export type UserRole = "analyst" | "ops_leader" | "qa_manager" | "admin";

export type MockUser = {
  id: string;
  name: string;
  initials: string;
  role: UserRole;
  roleLabel: string;
  lobs: string[];
  email: string;
};

export type AuthState = {
  user: MockUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
};

import type { MockUser } from "@/types/auth";

export const MOCK_USERS: MockUser[] = [
  {
    id: "usr-001",
    name: "Sarah Chen",
    initials: "SC",
    role: "analyst",
    roleLabel: "Analyst",
    lobs: ["Card Services", "Banking"],
    email: "sarah.chen@chase.com",
  },
  {
    id: "usr-002",
    name: "James Wilson",
    initials: "JW",
    role: "ops_leader",
    roleLabel: "Operations Leader",
    lobs: ["Card Services", "Banking", "Mortgage", "Auto", "Investments"],
    email: "james.wilson@chase.com",
  },
  {
    id: "usr-003",
    name: "Maria Santos",
    initials: "MS",
    role: "qa_manager",
    roleLabel: "QA Manager",
    lobs: ["Card Services", "Mortgage"],
    email: "maria.santos@chase.com",
  },
  {
    id: "usr-004",
    name: "Admin User",
    initials: "AU",
    role: "admin",
    roleLabel: "Administrator",
    lobs: ["Card Services", "Banking", "Mortgage", "Auto", "Investments"],
    email: "admin@chase.com",
  },
];

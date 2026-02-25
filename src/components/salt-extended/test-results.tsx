"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type TestStatus = "pass" | "fail" | "skip" | "running";

interface TestCaseData {
  name: string;
  status: TestStatus;
  duration?: number;
  error?: string;
}

interface TestSuiteData {
  name: string;
  cases: TestCaseData[];
}

interface TestResultsProps extends React.ComponentProps<"div"> {
  suites: TestSuiteData[];
}

const statusIcon: Record<TestStatus, { symbol: string; color: string }> = {
  pass: { symbol: "\u2713", color: "text-emerald-500" },
  fail: { symbol: "\u2717", color: "text-red-500" },
  skip: {
    symbol: "\u2014",
    color:
      "text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))]",
  },
  running: { symbol: "\u25CB", color: "text-amber-500" },
};

function TestResults({ className, suites, ...props }: TestResultsProps) {
  const total = suites.reduce((acc, s) => acc + s.cases.length, 0);
  const passed = suites.reduce(
    (acc, s) => acc + s.cases.filter((c) => c.status === "pass").length,
    0,
  );
  const failed = suites.reduce(
    (acc, s) => acc + s.cases.filter((c) => c.status === "fail").length,
    0,
  );

  return (
    <div
      data-slot="test-results"
      className={cn(
        "overflow-hidden rounded-lg",
        "border-[var(--salt-container-borderColor,theme(colors.border))] border",
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
          Test Results
        </span>
        <div className="flex items-center gap-3 text-base">
          <span className="text-emerald-500">{passed} passed</span>
          {failed > 0 && <span className="text-red-500">{failed} failed</span>}
          <span className="text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))]">
            {total} total
          </span>
        </div>
      </div>
      <div className="divide-[var(--salt-container-borderColor,theme(colors.border))] divide-y">
        {suites.map((suite, i) => (
          <TestSuite key={i} {...suite} />
        ))}
      </div>
    </div>
  );
}

function TestSuite({ name, cases }: TestSuiteData) {
  return (
    <div data-slot="test-suite">
      <div
        className={cn(
          "px-4 py-2 text-base font-medium",
          "text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))]",
          "bg-[var(--salt-container-primary-background,theme(colors.background))]",
        )}
      >
        {name}
      </div>
      {cases.map((tc, i) => (
        <TestCase key={i} {...tc} />
      ))}
    </div>
  );
}

function TestCase({ name, status, duration, error }: TestCaseData) {
  const icon = statusIcon[status];
  return (
    <div
      data-slot="test-case"
      className={cn(
        "px-4 py-1.5 pl-8",
        "bg-[var(--salt-container-primary-background,theme(colors.background))]",
      )}
    >
      <div className="flex items-center gap-2 text-base">
        <span className={cn("font-mono text-base", icon.color)}>
          {icon.symbol}
        </span>
        <span
          className={cn(
            status === "fail"
              ? "text-red-500"
              : "text-[var(--salt-content-primary-foreground,theme(colors.foreground))]",
          )}
        >
          {name}
        </span>
        {duration != null && (
          <span className="text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))] ml-auto text-base">
            {duration}ms
          </span>
        )}
      </div>
      {error && (
        <p className="mt-1 pl-5 font-mono text-base text-red-400">{error}</p>
      )}
    </div>
  );
}

export { TestCase, TestResults, TestSuite };
export type { TestCaseData, TestResultsProps, TestStatus, TestSuiteData };

import type { Meta, StoryObj } from "@storybook/nextjs";
import * as React from "react";

import { FilterTabGroup } from "@/components/salt-extended/filter-tab-group";
import { NlFilterBar } from "@/components/salt-extended/nl-filter-bar";
import { StatusChip } from "@/components/salt-extended/status-chip";

const meta = {
  title: "Patterns/Natural Language Filter",
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/* ------------------------------------------------------------------ */
/*  Inline helpers                                                     */
/* ------------------------------------------------------------------ */

const timeTabs = [
  { label: "Today", value: "today" as const },
  { label: "7 Days", value: "7d" as const },
  { label: "30 Days", value: "30d" as const },
  { label: "Custom", value: "custom" as const },
];

const lobTabs = [
  { label: "All LOBs", value: "all" as const },
  { label: "Card Services", value: "card" as const },
  { label: "Banking", value: "banking" as const },
  { label: "Lending", value: "lending" as const },
];

function DualModeFilterDemo() {
  const [timeRange, setTimeRange] = React.useState("7d");
  const [lob, setLob] = React.useState("all");
  const [appliedNlFilter, setAppliedNlFilter] = React.useState<string | null>(
    null,
  );

  return (
    <div className="max-w-3xl space-y-4">
      {/* Status summary chips */}
      <div className="flex flex-wrap gap-2">
        <StatusChip label="Calls" value="12,483" color="blue" />
        <StatusChip label="Avg Handle Time" value="5.2 min" color="amber" />
        <StatusChip label="CSAT" value="4.1" color="default" />
        <StatusChip label="Negative Sentiment" value="18%" color="red" />
        {appliedNlFilter && (
          <StatusChip
            label="NL Filter"
            value={appliedNlFilter}
            color="purple"
          />
        )}
      </div>

      {/* NL filter bar */}
      <NlFilterBar
        suggestions={[
          "Show Card Services last 7 days",
          "Negative sentiment calls only",
          "Compare today vs yesterday",
        ]}
        onFiltersParsed={(filters) => {
          setAppliedNlFilter(JSON.stringify(filters));
        }}
      />

      {/* Traditional tab-based filters */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))] text-xs font-medium">
          Or filter manually:
        </span>
        <FilterTabGroup
          tabs={timeTabs}
          value={timeRange}
          onChange={setTimeRange}
          ariaLabel="Time range filter"
        />
        <FilterTabGroup
          tabs={lobTabs}
          value={lob}
          onChange={setLob}
          ariaLabel="Line of business filter"
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Stories                                                            */
/* ------------------------------------------------------------------ */

export const Default: Story = {
  render: () => <DualModeFilterDemo />,
};

export const NlOnly: Story = {
  name: "Natural Language Only",
  render: () => (
    <div className="max-w-3xl space-y-4">
      <div className="flex flex-wrap gap-2">
        <StatusChip label="Calls" value="12,483" color="blue" />
        <StatusChip label="Avg Handle Time" value="5.2 min" color="amber" />
        <StatusChip label="Negative Sentiment" value="18%" color="red" />
      </div>
      <NlFilterBar
        suggestions={[
          "Show Card Services last 7 days",
          "Negative sentiment calls only",
          "Banking queue this week",
          "Compare today vs yesterday",
        ]}
        onFiltersParsed={() => {}}
      />
    </div>
  ),
};

export const TraditionalWithChips: Story = {
  name: "Traditional Filters with Status Summary",
  render: () => {
    const [timeRange, setTimeRange] = React.useState("7d");
    const [lob, setLob] = React.useState("card");

    return (
      <div className="max-w-3xl space-y-4">
        <div className="flex flex-wrap gap-2">
          <StatusChip label="LOB" value="Card Services" color="blue" />
          <StatusChip label="Time" value="Last 7 Days" color="default" />
          <StatusChip label="Calls" value="4,291" color="blue" />
          <StatusChip label="CSAT" value="3.8" color="amber" />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <FilterTabGroup
            tabs={timeTabs}
            value={timeRange}
            onChange={setTimeRange}
            ariaLabel="Time range filter"
          />
          <FilterTabGroup
            tabs={lobTabs}
            value={lob}
            onChange={setLob}
            ariaLabel="Line of business filter"
          />
        </div>
      </div>
    );
  },
};

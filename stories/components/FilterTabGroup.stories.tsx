import type { Meta, StoryObj } from "@storybook/nextjs";
import * as React from "react";

import { FilterTabGroup } from "@/components/salt-extended";

const meta = {
  title: "Components/FilterTabGroup",
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const SEVERITY_TABS = [
  { label: "All", value: "all" },
  { label: "Critical", value: "critical" },
  { label: "Warning", value: "warning" },
  { label: "Info", value: "info" },
];

function InteractiveDemo() {
  const [value, setValue] = React.useState("all");
  return (
    <FilterTabGroup
      tabs={SEVERITY_TABS}
      value={value}
      onChange={setValue}
      ariaLabel="Severity filter"
    />
  );
}

export const Default: Story = {
  render: () => <InteractiveDemo />,
};

const TIME_TABS = [
  { label: "Today", value: "today" },
  { label: "7d", value: "7d" },
  { label: "30d", value: "30d" },
];

function TimeRangeDemo() {
  const [value, setValue] = React.useState("today");
  return (
    <FilterTabGroup
      tabs={TIME_TABS}
      value={value}
      onChange={setValue}
      ariaLabel="Time range"
    />
  );
}

export const TimeRange: Story = {
  name: "Time Range Tabs",
  render: () => <TimeRangeDemo />,
};

function MultipleGroupsDemo() {
  const [severity, setSeverity] = React.useState("all");
  const [time, setTime] = React.useState("today");
  return (
    <div className="flex flex-wrap gap-4">
      <FilterTabGroup
        tabs={SEVERITY_TABS}
        value={severity}
        onChange={setSeverity}
        ariaLabel="Severity filter"
      />
      <FilterTabGroup
        tabs={TIME_TABS}
        value={time}
        onChange={setTime}
        ariaLabel="Time range"
      />
    </div>
  );
}

export const MultipleGroups: Story = {
  name: "Multiple Groups",
  render: () => <MultipleGroupsDemo />,
};

import type { Meta, StoryObj } from "@storybook/nextjs";
import { Calendar, ChevronDown, X } from "lucide-react";

import { Button } from "@/components/salt-extended/button";

const meta = {
  title: "Patterns/Insights Application/Filter Bar",
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/* ------------------------------------------------------------------ */
/*  Inline helpers                                                     */
/* ------------------------------------------------------------------ */

function FilterChip({
  label,
  onRemove,
  dashed,
  source,
}: {
  label: string;
  onRemove?: () => void;
  dashed?: boolean;
  source?: string;
}) {
  return (
    <span
      className={`bg-[var(--salt-container-secondary-background,theme(colors.accent.DEFAULT))] text-[var(--salt-content-primary-foreground,theme(colors.foreground))] inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${dashed ? "border-[var(--salt-container-borderColor,theme(colors.border))] border border-dashed" : "border-[var(--salt-container-borderColor,theme(colors.border))] border"}`}
    >
      {label}
      {source && (
        <span className="text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))] text-[10px]">
          from {source}
        </span>
      )}
      {onRemove && (
        <button
          onClick={onRemove}
          className="text-[var(--salt-content-secondary-foreground)] hover:text-[var(--salt-content-primary-foreground)]"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </span>
  );
}

function OverflowBadge({ count }: { count: number }) {
  return (
    <span className="inline-flex items-center justify-center rounded-full bg-[var(--salt-actionable-cta-background,#0060f0)] px-2 py-0.5 text-[10px] font-semibold text-white">
      +{count} more
    </span>
  );
}

function DropdownButton({
  icon,
  label,
}: {
  icon?: React.ReactNode;
  label: string;
}) {
  return (
    <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs">
      {icon}
      {label}
      <ChevronDown className="h-3 w-3 opacity-50" />
    </Button>
  );
}

/* ------------------------------------------------------------------ */
/*  Stories                                                            */
/* ------------------------------------------------------------------ */

export const Default: Story = {
  render: () => (
    <div className="border-[var(--salt-container-borderColor,theme(colors.border))] bg-[var(--salt-container-primary-background,theme(colors.background))] flex flex-wrap items-center gap-2 rounded-lg border p-3">
      <DropdownButton
        icon={<Calendar className="h-3.5 w-3.5" />}
        label="Last 7 Days"
      />
      <div className="bg-[var(--salt-container-borderColor,theme(colors.border))] h-4 w-px" />
      <FilterChip label="LOB: Card Services" onRemove={() => {}} />
      <FilterChip label="LOB: Banking" onRemove={() => {}} />
      <OverflowBadge count={3} />
      <div className="bg-[var(--salt-container-borderColor,theme(colors.border))] h-4 w-px" />
      <FilterChip label="Queue: General Inquiry" onRemove={() => {}} />
      <FilterChip label="Queue: Disputes" onRemove={() => {}} />
      <div className="ml-auto">
        <button className="text-xs text-[var(--salt-actionable-cta-background,#0060f0)] hover:underline">
          Clear all
        </button>
      </div>
    </div>
  ),
};

export const WithInheritedFilters: Story = {
  name: "With Inherited Filters",
  render: () => (
    <div className="border-[var(--salt-container-borderColor,theme(colors.border))] bg-[var(--salt-container-primary-background,theme(colors.background))] flex flex-wrap items-center gap-2 rounded-lg border p-3">
      <DropdownButton
        icon={<Calendar className="h-3.5 w-3.5" />}
        label="Last 30 Days"
      />
      <div className="bg-[var(--salt-container-borderColor,theme(colors.border))] h-4 w-px" />
      {/* Inherited filters — dashed border + source label */}
      <FilterChip label="LOB: Card Services" dashed source="Dashboard" />
      <FilterChip label="Queue: General Inquiry" dashed source="Dashboard" />
      <div className="bg-[var(--salt-container-borderColor,theme(colors.border))] h-4 w-px" />
      {/* User-applied filters — solid border */}
      <FilterChip label="Sentiment: Negative" onRemove={() => {}} />
      <FilterChip label="Topic: Fee Disputes" onRemove={() => {}} />
      <div className="ml-auto">
        <button className="text-xs text-[var(--salt-actionable-cta-background,#0060f0)] hover:underline">
          Clear all
        </button>
      </div>
    </div>
  ),
};

export const Narrow: Story = {
  render: () => (
    <div className="max-w-lg">
      <div className="border-[var(--salt-container-borderColor,theme(colors.border))] bg-[var(--salt-container-primary-background,theme(colors.background))] flex items-center gap-2 rounded-lg border px-3 py-2">
        <DropdownButton
          icon={<Calendar className="h-3.5 w-3.5" />}
          label="Last 7 Days"
        />
        <div className="bg-[var(--salt-container-borderColor,theme(colors.border))] h-4 w-px" />
        <FilterChip label="Card Services" onRemove={() => {}} />
        <OverflowBadge count={2} />
        <div className="ml-auto">
          <button className="text-xs text-[var(--salt-actionable-cta-background,#0060f0)] hover:underline">
            Clear all
          </button>
        </div>
      </div>
    </div>
  ),
};

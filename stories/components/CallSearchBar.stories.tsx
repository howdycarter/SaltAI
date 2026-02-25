import type { Meta, StoryObj } from "@storybook/nextjs";
import * as React from "react";

import { CallSearchBar } from "@/components/salt-extended/call-search-bar";

const meta = {
  title: "Call Review/Call Search Bar",
  component: CallSearchBar,
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-md">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CallSearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "",
    onChange: () => {},
    onSearch: () => {},
  },
};

export const WithValue: Story = {
  args: {
    value: "CR-2026-0118",
    onChange: () => {},
    onSearch: () => {},
  },
};

export const WithError: Story = {
  args: {
    value: "invalid-id",
    onChange: () => {},
    onSearch: () => {},
    error: "Invalid Call ID format. Expected: CR-YYYY-MMDD-NNNNN",
  },
};

function InteractiveDemo() {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  return (
    <div className="space-y-2">
      <CallSearchBar
        value={value}
        onChange={(v) => {
          setValue(v);
          if (error) setError(null);
        }}
        onSearch={(q) => {
          if (!/^CR-\d{4}-\d{4}-\d+$/.test(q)) {
            setError("Invalid Call ID format. Expected: CR-YYYY-MMDD-NNNNN");
          } else {
            setError(null);
            console.log("Search:", q);
          }
        }}
        error={error}
      />
      <p className="text-muted-foreground text-center text-xs">
        Try searching &quot;CR-2026-0118-47293&quot; or an invalid format
      </p>
    </div>
  );
}

export const Interactive: Story = {
  args: {
    value: "",
    onChange: () => {},
    onSearch: () => {},
  },
  render: () => <InteractiveDemo />,
};

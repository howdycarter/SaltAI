import type { Meta, StoryObj } from "@storybook/nextjs";
import * as React from "react";
import { type DateRange } from "react-day-picker";

import { Calendar } from "@/components/salt-extended/calendar";

const meta = {
  title: "Components/Data Display/Calendar",
  component: Calendar,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleDate: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
    );
  },
};

export const DateRangeStory: Story = {
  name: "Date Range",
  render: () => {
    const [range, setRange] = React.useState<DateRange | undefined>({
      from: new Date(2025, 11, 10),
      to: new Date(2025, 11, 18),
    });
    return (
      <Calendar
        mode="range"
        selected={range}
        onSelect={setRange}
        numberOfMonths={2}
        className="rounded-md border"
      />
    );
  },
};

export const WithDisabledDates: Story = {
  name: "With Disabled Dates",
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>();
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        disabled={[{ dayOfWeek: [0, 6] }, { before: new Date() }]}
        className="rounded-md border"
      />
    );
  },
};

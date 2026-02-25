import type { Meta, StoryObj } from "@storybook/nextjs";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";

const meta = {
  title: "Patterns/KPI Tile",
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

type KPIProps = {
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down" | "flat";
  trendLabel: string;
};

function KPITile({ label, value, delta, trend, trendLabel }: KPIProps) {
  const trendIcon =
    trend === "up" ? (
      <ArrowUp className="h-3 w-3" />
    ) : trend === "down" ? (
      <ArrowDown className="h-3 w-3" />
    ) : (
      <Minus className="h-3 w-3" />
    );
  const trendColor =
    trend === "up"
      ? "text-red-600"
      : trend === "down"
        ? "text-green-600"
        : "text-yellow-600";

  return (
    <div className="rounded-lg border p-4" style={{ minWidth: 180 }}>
      <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
        {label}
      </p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
      <div
        className={`mt-1 flex items-center gap-1 text-xs font-medium ${trendColor}`}
      >
        {trendIcon}
        <span>{delta}</span>
        <span className="text-muted-foreground font-normal">
          ({trendLabel})
        </span>
      </div>
    </div>
  );
}

export const SingleTile: Story = {
  name: "Single Tile",
  render: () => (
    <KPITile
      label="Call Volume"
      value="12,847"
      delta="+8%"
      trend="up"
      trendLabel="vs last week"
    />
  ),
};

export const TileRow: Story = {
  name: "KPI Row",
  render: () => (
    <div className="flex flex-wrap gap-4">
      <KPITile
        label="Call Volume"
        value="12,847"
        delta="+8%"
        trend="up"
        trendLabel="WoW"
      />
      <KPITile
        label="Avg Handle Time"
        value="4:32"
        delta="-12s"
        trend="down"
        trendLabel="WoW"
      />
      <KPITile
        label="CSAT Score"
        value="4.2"
        delta="0%"
        trend="flat"
        trendLabel="WoW"
      />
      <KPITile
        label="First Call Resolution"
        value="78%"
        delta="+3%"
        trend="down"
        trendLabel="WoW"
      />
    </div>
  ),
};

import type { Meta, StoryObj } from "@storybook/nextjs";

const meta = {
  title: "Foundation/Typography",
  parameters: {
    layout: "padded",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

const typeScale = [
  {
    token: "text-display",
    size: "22pt",
    weight: "Bold (700)",
    usage: "Page titles, module headers",
    sampleText: "Dashboard Overview",
  },
  {
    token: "text-heading-1",
    size: "16pt",
    weight: "Bold (700)",
    usage: "Section headings within modules",
    sampleText: "Top Movers",
  },
  {
    token: "text-heading-2",
    size: "13pt",
    weight: "Bold (700)",
    usage: "Sub-section headings, card titles",
    sampleText: "Card Services — Volume Drivers",
  },
  {
    token: "text-body",
    size: "10.5pt",
    weight: "Regular (400)",
    usage: "Body text, table content, descriptions",
    sampleText:
      "Based on 12,847 calls in Card Services for the period Jan 15-21, the primary driver of AHT increase is the new escrow inquiry topic.",
  },
  {
    token: "text-body-strong",
    size: "10.5pt",
    weight: "SemiBold (600)",
    usage: "Emphasis within body text, metric labels",
    sampleText: "Average Handle Time",
  },
  {
    token: "text-small",
    size: "9.5pt",
    weight: "Regular (400)",
    usage: "Captions, timestamps, metadata, tooltips",
    sampleText: "Last updated: Feb 19, 2026 at 8:30 AM ET",
  },
  {
    token: "text-metric",
    size: "24pt",
    weight: "Bold (700)",
    usage: "KPI values in dashboard tiles",
    sampleText: "4:32",
  },
  {
    token: "text-metric-delta",
    size: "12pt",
    weight: "SemiBold (600)",
    usage: "Delta values beside metrics",
    sampleText: "+12.3%",
  },
];

const fontSizeMap: Record<string, number> = {
  "22pt": 22,
  "16pt": 16,
  "13pt": 13,
  "10.5pt": 10.5,
  "9.5pt": 9.5,
  "24pt": 24,
  "12pt": 12,
};

const fontWeightMap: Record<string, number> = {
  "Bold (700)": 700,
  "SemiBold (600)": 600,
  "Regular (400)": 400,
};

export const TypeScale: Story = {
  name: "Type Scale",
  render: () => (
    <div
      style={{
        fontFamily: "var(--salt-text-fontFamily, 'Open Sans', sans-serif)",
      }}
    >
      <h2 style={{ margin: "0 0 8px", fontSize: 18, fontWeight: 700 }}>
        Typography Scale
      </h2>
      <p style={{ margin: "0 0 32px", fontSize: 13, color: "#666" }}>
        Font family: Open Sans (primary), system sans-serif (fallback). Line
        height: 1.5 body, 1.3 headings, 1.0 metrics.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        {typeScale.map((t) => (
          <div
            key={t.token}
            style={{
              borderBottom: "1px solid #eee",
              paddingBottom: 24,
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 16,
                marginBottom: 12,
                alignItems: "baseline",
              }}
            >
              <code
                style={{
                  fontSize: 11,
                  backgroundColor: "#f5f5f5",
                  padding: "2px 6px",
                  borderRadius: 4,
                  fontFamily: "monospace",
                }}
              >
                {t.token}
              </code>
              <span style={{ fontSize: 11, color: "#999" }}>
                {t.size} · {t.weight}
              </span>
            </div>
            <div
              style={{
                fontSize: fontSizeMap[t.size],
                fontWeight: fontWeightMap[t.weight],
                lineHeight: t.token.startsWith("text-metric")
                  ? 1.0
                  : t.token.startsWith("text-heading") ||
                      t.token === "text-display"
                    ? 1.3
                    : 1.5,
                marginBottom: 8,
                maxWidth: 600,
              }}
            >
              {t.sampleText}
            </div>
            <div style={{ fontSize: 11, color: "#999" }}>{t.usage}</div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const MetricDisplay: Story = {
  name: "Metric Typography",
  render: () => (
    <div
      style={{
        fontFamily: "var(--salt-text-fontFamily, 'Open Sans', sans-serif)",
      }}
    >
      <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700 }}>
        KPI Tile Typography
      </h3>
      <div
        style={{
          display: "flex",
          gap: 24,
        }}
      >
        {[
          {
            label: "Call Volume",
            value: "24,891",
            delta: "+3.2%",
            positive: true,
          },
          { label: "AHT", value: "4:32", delta: "+12.3%", positive: false },
          { label: "FCR", value: "78.4%", delta: "-1.1%", positive: false },
        ].map((kpi) => (
          <div
            key={kpi.label}
            style={{
              padding: 16,
              border: "1px solid #e0e0e0",
              borderRadius: 8,
              minWidth: 160,
            }}
          >
            <div
              style={{
                fontSize: 10.5,
                fontWeight: 600,
                color: "#666",
                marginBottom: 8,
              }}
            >
              {kpi.label}
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <span style={{ fontSize: 24, fontWeight: 700, lineHeight: 1 }}>
                {kpi.value}
              </span>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: kpi.positive ? "#2E7D32" : "#C62828",
                }}
              >
                {kpi.delta}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

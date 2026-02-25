import type { Meta, StoryObj } from "@storybook/nextjs";

const meta = {
  title: "Foundation/Spacing",
  parameters: {
    layout: "padded",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

const spacingScale = [
  {
    token: "space-xs",
    value: "4px",
    usage: "Inline element gaps, icon-to-text spacing",
  },
  {
    token: "space-sm",
    value: "8px",
    usage: "Compact list items, badge padding",
  },
  {
    token: "space-md",
    value: "16px",
    usage: "Standard element spacing, card padding",
  },
  { token: "space-lg", value: "24px", usage: "Section spacing, panel padding" },
  {
    token: "space-xl",
    value: "32px",
    usage: "Major section dividers, page margins",
  },
  { token: "space-2xl", value: "48px", usage: "Between major content blocks" },
];

export const SpacingScale: Story = {
  name: "Spacing Scale",
  render: () => (
    <div>
      <h2 style={{ margin: "0 0 8px", fontSize: 18, fontWeight: 700 }}>
        Spacing Scale
      </h2>
      <p style={{ margin: "0 0 32px", fontSize: 13, color: "#666" }}>
        Consistent spacing tokens used across all components and layouts.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {spacingScale.map((s) => (
          <div
            key={s.token}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <code
              style={{
                fontSize: 12,
                fontFamily: "monospace",
                width: 100,
                flexShrink: 0,
              }}
            >
              {s.token}
            </code>
            <div
              style={{
                height: 24,
                width: parseInt(s.value) * 4,
                backgroundColor:
                  "var(--salt-actionable-cta-background, #0060f0)",
                borderRadius: 4,
                flexShrink: 0,
                opacity: 0.8,
              }}
            />
            <span
              style={{
                fontSize: 13,
                fontWeight: 600,
                width: 40,
                flexShrink: 0,
              }}
            >
              {s.value}
            </span>
            <span style={{ fontSize: 12, color: "#666" }}>{s.usage}</span>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const SpacingComparison: Story = {
  name: "Visual Comparison",
  render: () => (
    <div>
      <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700 }}>
        Spacing in Context
      </h3>
      <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
        {spacingScale.map((s) => (
          <div key={s.token} style={{ textAlign: "center" }}>
            <div
              style={{
                width: 80,
                height: 80,
                border: "2px dashed #ccc",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: `calc(80px - ${parseInt(s.value) * 2}px)`,
                  height: `calc(80px - ${parseInt(s.value) * 2}px)`,
                  backgroundColor:
                    "var(--salt-actionable-cta-background, #0060f0)",
                  borderRadius: 4,
                  minWidth: 4,
                  minHeight: 4,
                }}
              />
            </div>
            <div
              style={{ marginTop: 8, fontSize: 11, fontFamily: "monospace" }}
            >
              {s.token}
            </div>
            <div style={{ fontSize: 11, color: "#999" }}>{s.value} padding</div>
          </div>
        ))}
      </div>
    </div>
  ),
};

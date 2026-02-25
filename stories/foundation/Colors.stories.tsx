import type { Meta, StoryObj } from "@storybook/nextjs";

const meta = {
  title: "Foundation/Colors",
  parameters: {
    layout: "padded",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

const swatchGroups = [
  {
    label: "Chase Blue Scale",
    swatches: [
      { name: "blue-10", var: "--salt-color-blue-10", hex: "#e6f0fe" },
      { name: "blue-20", var: "--salt-color-blue-20", hex: "#b3d1fc" },
      { name: "blue-30", var: "--salt-color-blue-30", hex: "#80b3fa" },
      { name: "blue-40", var: "--salt-color-blue-40", hex: "#4d94f7" },
      { name: "blue-50", var: "--salt-color-blue-50", hex: "#1a75f5" },
      { name: "blue-100", var: "--salt-color-blue-100", hex: "#0060f0" },
      { name: "blue-200", var: "--salt-color-blue-200", hex: "#0055d8" },
      { name: "blue-300", var: "--salt-color-blue-300", hex: "#004abf" },
      { name: "blue-400", var: "--salt-color-blue-400", hex: "#003fa7" },
      { name: "blue-500", var: "--salt-color-blue-500", hex: "#00348e" },
      { name: "blue-600", var: "--salt-color-blue-600", hex: "#002976" },
      { name: "blue-700", var: "--salt-color-blue-700", hex: "#001e5e" },
      { name: "blue-800", var: "--salt-color-blue-800", hex: "#001346" },
      { name: "blue-900", var: "--salt-color-blue-900", hex: "#00082e" },
    ],
  },
  {
    label: "Actionable (CTA)",
    swatches: [
      {
        name: "CTA Default",
        var: "--salt-actionable-cta-background",
        hex: "#0060f0",
      },
      {
        name: "CTA Hover",
        var: "--salt-actionable-cta-background-hover",
        hex: "#004abf",
      },
      {
        name: "CTA Active",
        var: "--salt-actionable-cta-background-active",
        hex: "#003fa7",
      },
      {
        name: "CTA Disabled",
        var: "--salt-actionable-cta-background-disabled",
        hex: "#b3d1fc",
      },
    ],
  },
  {
    label: "Design System — Surface & Text",
    swatches: [
      {
        name: "Primary",
        var: "--color-primary",
        hex: "#1B5E8A",
        token: "color-primary",
      },
      {
        name: "Primary Dark",
        var: "--color-primary-dark",
        hex: "#0D3B5E",
        token: "color-primary-dark",
      },
      {
        name: "Surface",
        var: "--color-surface",
        hex: "#FFFFFF",
        token: "color-surface",
      },
      {
        name: "Surface Alt",
        var: "--color-surface-alt",
        hex: "#F5F7FA",
        token: "color-surface-alt",
      },
      {
        name: "Border",
        var: "--color-border",
        hex: "#CCCCCC",
        token: "color-border",
      },
      {
        name: "Text Primary",
        var: "--color-text-primary",
        hex: "#333333",
        token: "color-text-primary",
      },
      {
        name: "Text Secondary",
        var: "--color-text-secondary",
        hex: "#666666",
        token: "color-text-secondary",
      },
      {
        name: "Text Muted",
        var: "--color-text-muted",
        hex: "#999999",
        token: "color-text-muted",
      },
    ],
  },
  {
    label: "Design System — Status",
    swatches: [
      {
        name: "Success",
        var: "--color-success",
        hex: "#2E7D32",
        token: "color-success",
      },
      {
        name: "Warning",
        var: "--color-warning",
        hex: "#F57F17",
        token: "color-warning",
      },
      {
        name: "Critical",
        var: "--color-critical",
        hex: "#C62828",
        token: "color-critical",
      },
      {
        name: "Info",
        var: "--color-info",
        hex: "#E8F0FE",
        token: "color-info",
      },
    ],
  },
];

function Swatch({
  name,
  cssVar,
  hex,
}: {
  name: string;
  cssVar: string;
  hex: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginBottom: 8,
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 6,
          backgroundColor: `var(${cssVar}, ${hex})`,
          border: "1px solid #e0e0e0",
          flexShrink: 0,
        }}
      />
      <div style={{ fontSize: 13, lineHeight: 1.4 }}>
        <div style={{ fontWeight: 600 }}>{name}</div>
        <div style={{ color: "#666", fontFamily: "monospace", fontSize: 11 }}>
          {cssVar}
        </div>
        <div style={{ color: "#999", fontFamily: "monospace", fontSize: 11 }}>
          {hex}
        </div>
      </div>
    </div>
  );
}

export const AllColors: Story = {
  name: "Color Palette",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
      {swatchGroups.map((group) => (
        <div key={group.label}>
          <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700 }}>
            {group.label}
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: 8,
            }}
          >
            {group.swatches.map((s) => (
              <Swatch key={s.var} name={s.name} cssVar={s.var} hex={s.hex} />
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

export const BlueScale: Story = {
  name: "Chase Blue Scale",
  render: () => (
    <div>
      <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700 }}>
        Chase Blue Scale
      </h3>
      <div style={{ display: "flex", borderRadius: 8, overflow: "hidden" }}>
        {swatchGroups[0].swatches.map((s) => (
          <div
            key={s.var}
            style={{
              flex: 1,
              height: 80,
              backgroundColor: `var(${s.var}, ${s.hex})`,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              padding: 4,
            }}
          >
            <span
              style={{
                fontSize: 9,
                fontFamily: "monospace",
                color: s.hex < "#808080" ? "#fff" : "#000",
              }}
            >
              {s.hex}
            </span>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const StatusColors: Story = {
  name: "Status Colors",
  render: () => (
    <div>
      <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700 }}>
        Status Colors
      </h3>
      <div style={{ display: "flex", gap: 24 }}>
        {swatchGroups[3].swatches.map((s) => (
          <div key={s.var} style={{ textAlign: "center" }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 12,
                backgroundColor: `var(${s.var}, ${s.hex})`,
                border: "1px solid #e0e0e0",
                margin: "0 auto 8px",
              }}
            />
            <div style={{ fontWeight: 600, fontSize: 13 }}>{s.name}</div>
            <div
              style={{ fontFamily: "monospace", fontSize: 11, color: "#666" }}
            >
              {s.hex}
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

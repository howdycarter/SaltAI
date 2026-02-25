import type { Meta, StoryObj } from "@storybook/nextjs";

const meta = {
  title: "Foundation/Elevation",
  parameters: {
    layout: "padded",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

const elevationLevels = [
  {
    token: "elevation-0",
    value: "none",
    usage: "Flat elements, table cells",
    shadow: "none",
  },
  {
    token: "elevation-1",
    value: "0 1px 3px rgba(0,0,0,0.12)",
    usage: "Cards, panels, filter bar",
    shadow: "0 1px 3px rgba(0,0,0,0.12)",
  },
  {
    token: "elevation-2",
    value: "0 4px 12px rgba(0,0,0,0.15)",
    usage: "Dropdowns, tooltips, NLQI popup",
    shadow: "0 4px 12px rgba(0,0,0,0.15)",
  },
  {
    token: "elevation-3",
    value: "0 8px 24px rgba(0,0,0,0.2)",
    usage: "Modal dialogs, full-screen overlays",
    shadow: "0 8px 24px rgba(0,0,0,0.2)",
  },
];

export const ElevationScale: Story = {
  name: "Elevation Scale",
  render: () => (
    <div>
      <h2 style={{ margin: "0 0 8px", fontSize: 18, fontWeight: 700 }}>
        Elevation / Shadows
      </h2>
      <p style={{ margin: "0 0 32px", fontSize: 13, color: "#666" }}>
        Four levels of elevation used to convey visual hierarchy and layering.
      </p>
      <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
        {elevationLevels.map((e) => (
          <div key={e.token} style={{ width: 200 }}>
            <div
              style={{
                width: 200,
                height: 120,
                borderRadius: 8,
                backgroundColor: "#fff",
                boxShadow: e.shadow,
                border: e.shadow === "none" ? "1px solid #e0e0e0" : "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 12,
              }}
            >
              <span style={{ fontSize: 13, color: "#999" }}>{e.token}</span>
            </div>
            <code
              style={{
                display: "block",
                fontSize: 11,
                fontFamily: "monospace",
                marginBottom: 4,
              }}
            >
              {e.token}
            </code>
            <div style={{ fontSize: 11, color: "#666", marginBottom: 4 }}>
              {e.usage}
            </div>
            <div
              style={{
                fontSize: 10,
                fontFamily: "monospace",
                color: "#999",
                wordBreak: "break-all",
              }}
            >
              {e.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const ElevationStacked: Story = {
  name: "Stacked Layers",
  render: () => (
    <div>
      <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700 }}>
        Layering Context
      </h3>
      <div style={{ position: "relative", width: 400, height: 300 }}>
        {elevationLevels.map((e, i) => (
          <div
            key={e.token}
            style={{
              position: "absolute",
              top: i * 30,
              left: i * 30,
              width: 280,
              height: 160,
              borderRadius: 8,
              backgroundColor: "#fff",
              boxShadow: e.shadow,
              border: e.shadow === "none" ? "1px solid #e0e0e0" : "none",
              padding: 16,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div style={{ fontSize: 12, fontWeight: 600 }}>{e.token}</div>
            <div style={{ fontSize: 11, color: "#999" }}>{e.usage}</div>
          </div>
        ))}
      </div>
    </div>
  ),
};

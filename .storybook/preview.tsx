import "@salt-ds/theme/index.css";
import "../src/styles/salt-chase/chase-theme.css";
import "../src/styles/globals.css";

import { SaltProvider } from "@salt-ds/core";
import type { Preview } from "@storybook/nextjs";
import { useEffect } from "react";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: {
      appDirectory: true,
      navigation: { pathname: "/" },
    },
  },
  globalTypes: {
    theme: {
      description: "Light / Dark mode toggle",
      toolbar: {
        title: "Theme",
        icon: "mirror",
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "light",
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || "light";
      const isDark = theme === "dark";

      useEffect(() => {
        // Sync Tailwind .dark class on <html> to match the app behavior
        document.documentElement.classList.toggle("dark", isDark);
        document.documentElement.setAttribute("data-theme", theme);
      }, [isDark, theme]);

      return (
        <SaltProvider mode={isDark ? "dark" : "light"}>
          <div
            className={isDark ? "dark" : ""}
            style={{
              backgroundColor: "var(--background)",
              color: "var(--foreground)",
              minHeight: "100%",
              padding: "1rem",
            }}
          >
            <Story />
          </div>
        </SaltProvider>
      );
    },
  ],
};

export default preview;

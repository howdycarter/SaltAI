import type { Meta, StoryObj } from "@storybook/nextjs";

import { FileTree } from "@/components/salt-extended/file-tree";

const meta = {
  title: "Components/AI/FileTree",
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-[300px]">
      <FileTree
        items={[
          {
            name: "src",
            type: "folder",
            children: [
              {
                name: "components",
                type: "folder",
                children: [
                  { name: "Button.tsx", type: "file" },
                  { name: "Card.tsx", type: "file", active: true },
                ],
              },
              {
                name: "app",
                type: "folder",
                children: [
                  { name: "page.tsx", type: "file" },
                  { name: "layout.tsx", type: "file" },
                ],
              },
              { name: "globals.css", type: "file" },
            ],
          },
          { name: "package.json", type: "file" },
          { name: "tsconfig.json", type: "file" },
        ]}
      />
    </div>
  ),
};

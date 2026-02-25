import type { Meta, StoryObj } from "@storybook/nextjs";

import { CodeBlock } from "@/components/salt-extended/code-block";

const meta = {
  title: "Components/AI/CodeBlock",
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleCode = `function greet(name: string) {
  console.log(\`Hello, \${name}!\`);
}

greet("World");`;

export const Default: Story = {
  render: () => (
    <div className="w-[500px]">
      <CodeBlock code={sampleCode} language="typescript" />
    </div>
  ),
};

export const WithFilename: Story = {
  name: "With Filename",
  render: () => (
    <div className="w-[500px]">
      <CodeBlock
        code={sampleCode}
        language="typescript"
        filename="greeting.ts"
      />
    </div>
  ),
};

export const WithLineNumbers: Story = {
  name: "With Line Numbers",
  render: () => (
    <div className="w-[500px]">
      <CodeBlock code={sampleCode} language="typescript" showLineNumbers />
    </div>
  ),
};

export const ShellCommand: Story = {
  name: "Shell Command",
  render: () => (
    <div className="w-[500px]">
      <CodeBlock
        code="npm install @salt-ds/core @salt-ds/theme"
        language="bash"
      />
    </div>
  ),
};

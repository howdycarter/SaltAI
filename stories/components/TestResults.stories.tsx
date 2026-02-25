import type { Meta, StoryObj } from "@storybook/nextjs";

import { TestResults } from "@/components/salt-extended/test-results";

const meta = {
  title: "Components/AI/TestResults",
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Mixed: Story = {
  render: () => (
    <div className="w-[500px]">
      <TestResults
        suites={[
          {
            name: "src/__tests__/auth.spec.tsx",
            cases: [
              {
                name: "should login with valid credentials",
                status: "pass",
                duration: 42,
              },
              {
                name: "should reject invalid password",
                status: "pass",
                duration: 18,
              },
              {
                name: "should handle expired tokens",
                status: "fail",
                duration: 105,
                error: "Expected 401 but received 200",
              },
            ],
          },
          {
            name: "src/__tests__/api.spec.tsx",
            cases: [
              {
                name: "GET /api/calls returns list",
                status: "pass",
                duration: 23,
              },
              {
                name: "POST /api/calls creates call",
                status: "pass",
                duration: 67,
              },
            ],
          },
        ]}
      />
    </div>
  ),
};

export const AllPassing: Story = {
  name: "All Passing",
  render: () => (
    <div className="w-[500px]">
      <TestResults
        suites={[
          {
            name: "unit tests",
            cases: [
              { name: "renders correctly", status: "pass", duration: 5 },
              { name: "handles click", status: "pass", duration: 12 },
              { name: "updates state", status: "pass", duration: 8 },
            ],
          },
        ]}
      />
    </div>
  ),
};

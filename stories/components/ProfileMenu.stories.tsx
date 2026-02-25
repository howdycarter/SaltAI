import type { Meta, StoryObj } from "@storybook/nextjs";
import type { Decorator } from "@storybook/nextjs";

import { ProfileMenu } from "@/components/salt-extended/profile-menu";
import { AuthProvider } from "@/lib/auth-context";
import { MOCK_USERS } from "@/lib/mock/users";

const STORAGE_KEY = "saltai-auth-user";

function setMockUser(userId: string) {
  const user = MOCK_USERS.find((u) => u.id === userId);
  if (user) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }
}

const AnalystDecorator: Decorator = (Story) => {
  setMockUser("usr-001"); // Sarah Chen — Analyst
  return (
    <AuthProvider>
      <div className="flex min-h-[200px] items-start justify-end p-4">
        <Story />
      </div>
    </AuthProvider>
  );
};

const AdminDecorator: Decorator = (Story) => {
  setMockUser("usr-004"); // Admin User — Administrator
  return (
    <AuthProvider>
      <div className="flex min-h-[200px] items-start justify-end p-4">
        <Story />
      </div>
    </AuthProvider>
  );
};

const meta = {
  title: "Components/Chase Brand/ProfileMenu",
  component: ProfileMenu,
  parameters: {
    layout: "centered",
    nextjs: { navigation: { pathname: "/" } },
  },
} satisfies Meta<typeof ProfileMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Default (Analyst)",
  decorators: [AnalystDecorator],
  render: () => <ProfileMenu />,
};

export const Admin: Story = {
  name: "Admin",
  decorators: [AdminDecorator],
  render: () => <ProfileMenu />,
};

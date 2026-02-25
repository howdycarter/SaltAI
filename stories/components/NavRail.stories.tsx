import type { Meta, StoryObj } from "@storybook/nextjs";

import { NavRail } from "@/components/salt-extended/nav-rail";

const meta = {
  title: "Components/Chase Brand/NavRail",
  component: NavRail,
  parameters: {
    layout: "fullscreen",
    nextjs: { navigation: { pathname: "/" } },
  },
} satisfies Meta<typeof NavRail>;

export default meta;
type Story = StoryObj<typeof meta>;

const LayoutWrapper = ({
  children,
  contentLabel,
}: {
  children: React.ReactNode;
  contentLabel: string;
}) => (
  <div className="flex h-screen flex-col">
    <div className="flex h-16 shrink-0 items-center border-b px-6">
      <span className="font-semibold">CHASE</span>
    </div>
    <div className="flex flex-1 overflow-hidden">
      {children}
      <div className="flex-1 p-6">
        <p className="text-muted-foreground text-sm">{contentLabel}</p>
      </div>
    </div>
  </div>
);

export const Default: Story = {
  render: () => (
    <LayoutWrapper contentLabel="Main content area">
      <NavRail />
    </LayoutWrapper>
  ),
};

export const ActiveDashboard: Story = {
  name: "Active — Dashboard",
  parameters: {
    nextjs: { navigation: { pathname: "/" } },
  },
  render: () => (
    <LayoutWrapper contentLabel="Dashboard is active">
      <NavRail />
    </LayoutWrapper>
  ),
};

export const ActiveDiscovery: Story = {
  name: "Active — Discovery",
  parameters: {
    nextjs: { navigation: { pathname: "/discovery" } },
  },
  render: () => (
    <LayoutWrapper contentLabel="Discovery is active">
      <NavRail />
    </LayoutWrapper>
  ),
};

export const ActiveCallReview: Story = {
  name: "Active — Call Review",
  parameters: {
    nextjs: { navigation: { pathname: "/call-review" } },
  },
  render: () => (
    <LayoutWrapper contentLabel="Call Review is active">
      <NavRail />
    </LayoutWrapper>
  ),
};

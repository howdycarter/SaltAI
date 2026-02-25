import type { Meta, StoryObj } from "@storybook/nextjs";
import {
  AlertTriangle,
  BarChart3,
  FileText,
  LayoutDashboard,
  MessageSquare,
  Search,
  Settings,
  TrendingUp,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarItem,
  SidebarProvider,
} from "@/components/salt-extended/sidebar";

const meta = {
  title: "Components/Navigation & Layout/Sidebar",
  component: Sidebar,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

const modules = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: TrendingUp, label: "Trending", active: false },
  { icon: AlertTriangle, label: "Alerts", active: false, badge: 3 },
  { icon: Search, label: "Discovery", active: false },
  { icon: FileText, label: "Insights", active: false },
  { icon: MessageSquare, label: "Call Review", active: false },
];

export const Expanded: Story = {
  render: () => (
    <SidebarProvider defaultOpen>
      <div className="flex h-[400px]">
        <Sidebar>
          <SidebarHeader>
            <BarChart3 className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-semibold">Insights</span>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Modules</SidebarGroupLabel>
              {modules.map((m) => (
                <SidebarItem key={m.label} active={m.active}>
                  <m.icon className="h-4 w-4" />
                  <span>{m.label}</span>
                  {m.badge && (
                    <span className="ml-auto rounded-full bg-red-500 px-1.5 py-0.5 text-xs text-white">
                      {m.badge}
                    </span>
                  )}
                </SidebarItem>
              ))}
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarItem>
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </SidebarItem>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 p-6">
          <p className="text-muted-foreground text-sm">Main content area</p>
        </div>
      </div>
    </SidebarProvider>
  ),
};

export const WithActiveState: Story = {
  name: "Active Module",
  render: () => (
    <SidebarProvider defaultOpen>
      <div className="flex h-[400px]">
        <Sidebar>
          <SidebarHeader>
            <BarChart3 className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-semibold">Insights</span>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Modules</SidebarGroupLabel>
              {modules.map((m, i) => (
                <SidebarItem key={m.label} active={i === 3}>
                  <m.icon className="h-4 w-4" />
                  <span>{m.label}</span>
                </SidebarItem>
              ))}
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <div className="flex-1 p-6">
          <p className="text-muted-foreground text-sm">
            Discovery (TorqueAI) is active
          </p>
        </div>
      </div>
    </SidebarProvider>
  ),
};

import type { Meta, StoryObj } from "@storybook/nextjs";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/salt-extended/carousel";

const meta = {
  title: "Components/Data Display/Carousel",
  component: Carousel,
  parameters: { layout: "padded" },
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

const insights = [
  {
    title: "Login Failures",
    delta: "+18%",
    summary:
      "Login failure calls surged 18% WoW, concentrated in Card Services mobile app.",
  },
  {
    title: "Fee Disputes",
    delta: "+12%",
    summary:
      "Fee dispute volume rising steadily. Top driver: annual fee confusion on Sapphire cards.",
  },
  {
    title: "Fraud Alerts",
    delta: "-5%",
    summary:
      "Fraud alert calls decreased 5% following enhanced SMS verification rollout.",
  },
  {
    title: "Password Resets",
    delta: "+8%",
    summary:
      "Password reset calls up 8%, correlating with new MFA policy enforcement.",
  },
  {
    title: "Payment Issues",
    delta: "+3%",
    summary:
      "Moderate increase in payment processing inquiries tied to weekend batch delays.",
  },
];

export const Default: Story = {
  render: () => (
    <div className="mx-auto w-full max-w-md px-12">
      <Carousel>
        <CarouselContent>
          {insights.map((item) => (
            <CarouselItem key={item.title}>
              <div className="rounded-lg border p-6">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-sm font-semibold">{item.title}</h3>
                  <span
                    className={`text-sm font-medium ${item.delta.startsWith("+") ? "text-red-600" : "text-green-600"}`}
                  >
                    {item.delta}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm">{item.summary}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
};

export const MultipleVisible: Story = {
  name: "Multiple Visible",
  render: () => (
    <div className="mx-auto w-full max-w-2xl px-12">
      <Carousel opts={{ align: "start" }}>
        <CarouselContent className="-ml-2">
          {insights.map((item) => (
            <CarouselItem key={item.title} className="basis-1/3 pl-2">
              <div className="rounded-lg border p-4">
                <h3 className="text-xs font-semibold">{item.title}</h3>
                <span
                  className={`text-lg font-bold ${item.delta.startsWith("+") ? "text-red-600" : "text-green-600"}`}
                >
                  {item.delta}
                </span>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="mx-auto flex h-64 max-w-md items-center justify-center py-12">
      <Carousel orientation="vertical" className="w-full">
        <CarouselContent className="-mt-2 h-48">
          {insights.map((item) => (
            <CarouselItem key={item.title} className="basis-1/2 pt-2">
              <div className="rounded-lg border p-4">
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="text-muted-foreground text-xs">{item.summary}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
};

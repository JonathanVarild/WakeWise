"use client";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  phoneUsage: {
    label: "Phone Usage",
    color: "#fbbc05",
  },
} satisfies ChartConfig;

interface PhoneData {
  phone_usage: number;
  date: string;
}

interface PhoneDataProps {
  data3: PhoneData[];
}

export function PhoneUsageChart({ data3 }: PhoneDataProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Phone Usage</CardTitle>
        <CardDescription>This Week's Phone Usage</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={data3}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="phone_usage" fill="#f88ab4" radius={4} name="Phone Usage" />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing phone usage data
        </div>
      </CardFooter>
    </Card>
  );
}
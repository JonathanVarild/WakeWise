"use client";

import { TrendingUp } from "lucide-react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

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
  hours: {
    label: "Desktop",
    color: "#FF0000",
  },
} satisfies ChartConfig;

interface SleepData {
  month: string;
  total: number;
}

interface SleepDataProps {
  data3: SleepData[];
}

export function RadarChartCard({ data3 }: SleepDataProps) {
  const chartData = data3.map((item) => ({
    name: item.month,
    hour: item.total,
    fill: chartConfig.hours.color,
  }));
  return (
    <Card>
      <CardHeader className="items-center pb-4">
        <CardTitle>Monthly Comparison</CardTitle>
        <CardDescription>
          Showing total hours slept during each month
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="name" />
            <PolarGrid />
            <Radar dataKey="hour" fill="#FFCCCB" fillOpacity={0.6} />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none"></div>
        <div className="flex items-center gap-2 leading-none text-muted-foreground">
          January - June 2025
        </div>
      </CardFooter>
    </Card>
  );
}

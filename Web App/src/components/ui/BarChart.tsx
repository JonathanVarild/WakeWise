"use client";
import { LucideTable2, TrendingUp } from "lucide-react";
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
  hours: {
    label: "hours",
    color: "#4285F4",
  },
} satisfies ChartConfig;

interface CompData {
  date: string;
  hours: number;
}

interface CompDataProps {
  data2: CompData[];
}

export function BarChartCard({ data2 }: CompDataProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hours slept per week</CardTitle>
        <CardDescription>Week 40 </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={data2}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              //tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="hours" fill="#4285F4" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none"></div>
        <div className="leading-none text-muted-foreground">
          Showing hours slept during a certain period
        </div>
      </CardFooter>
    </Card>
  );
}

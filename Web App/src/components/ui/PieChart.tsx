"use client";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
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
  planned: {
    label: "Actual time ",
    color: "#4285F4",
  },
  actual: {
    label: "Scheduled time ",
    color: "#f8988a",
  },
} satisfies ChartConfig;

interface SleepData {
  /*slept*/ planned: number;
  /*total*/ actual: number;
}

interface SleepDataProps {
  data: SleepData;
}

export function PieChartCard({ data }: SleepDataProps) {
  const percentage = Math.round(((data.actual / data.planned) -1) * 100);
  const adjustedPercentage = percentage > 100 ? 0 : percentage;


  const chartData =
  adjustedPercentage === 0
    ? [
        { name: "Scheduled ", value: 1, fill: chartConfig.planned.color },
      ]
    : [
        { name: "Actual ", value: data.actual, fill: chartConfig.actual.color },
        {
          name: "Scheduled",
          value: data.planned,
          fill: chartConfig.planned.color,
        },
      ];


  return (
    <Card>
      <CardHeader>
        <CardTitle>Excessive Screen Time</CardTitle>
        <CardDescription>The screen time above your scheduled screen time</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square ">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              strokeWidth={0}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle">
                         <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold">
                          +{adjustedPercentage}%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold">
                          +{adjustedPercentage}%
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: chartConfig.actual.color }}
            />
            <span>Actual time: {data.actual}min</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: chartConfig.planned.color }}
            />
            <span>Scheduled time: {data.planned}min</span>
          </div>
        </div>
        <div className="leading-none text-muted-foreground">
          {percentage >= 33 ? "Good screen time!" : "Consider less screen time!"}
        </div>
      </CardFooter>
    </Card>
  );
}

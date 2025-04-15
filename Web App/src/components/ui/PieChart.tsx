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
  slept: {
    label: "Slept",
    color: "#4285F4",
  },
  remaining: {
    label: "Remaining",
    color: "#E0E0E0",
  },
} satisfies ChartConfig;

interface SleepData {
  slept: number;
  total: number;
}

interface SleepDataProps {
  data: SleepData;
}

export function PieChartCard({ data }: SleepDataProps) {
  const chartData = [
    { name: "slept", value: data.slept, fill: chartConfig.slept.color },
    {
      name: "remaining",
      value: data.total - data.slept,
      fill: chartConfig.remaining.color,
    },
  ];

  const percentage = Math.round((data.slept / data.total) * 100);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sleep vs Awake Time</CardTitle>
        <CardDescription>Weekly Comparison</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              strokeWidth={0}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {percentage}%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground text-sm"
                        >
                          of week
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
              style={{ backgroundColor: chartConfig.slept.color }}
            />
            <span>Slept: {data.slept}h</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: chartConfig.remaining.color }}
            />
            <span>Awake: {data.total - data.slept}h</span>
          </div>
        </div>
        <div className="leading-none text-muted-foreground">
          {percentage >= 33 ? "Good sleep balance" : "Consider more sleep time"}
        </div>
      </CardFooter>
    </Card>
  );
}

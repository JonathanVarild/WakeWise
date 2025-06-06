"use client";
import { Bar, BarChart, CartesianGrid, XAxis} from "recharts";
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
  Planned: {
    label: "Planned",
    color: "#4286f4",
  },
  Actual: {
    label: "Actual",
    color: "#8ab4f8"
  }

  
} satisfies ChartConfig;

interface CompData {
  planned: number;
  actual: number;
  date: string;
}


interface CompDataProps {
  data2: CompData[];
}



export function BarChartCard({ data2 }: CompDataProps) {
  console.log("DATA", data2);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sleep goal comparison</CardTitle>
        <CardDescription>This Week</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={data2}>
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
            <Bar dataKey="planned" fill="#4286f4" radius={4} name="Planned" />
            <Bar dataKey="actual" fill="#8ab4f8" radius={4} name="Actual" />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing planned sleep vs actual sleep
        </div>
      </CardFooter>
    </Card>
  );
}

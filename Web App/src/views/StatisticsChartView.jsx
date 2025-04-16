import { BarChartCard } from "../components/ui/BarChart";
import { PieChartCard } from "../components/ui/PieChart";
import { RadarChartCard } from "../components/ui/radarChart";

let testchartData2 = [
  { date: "2025/10/01", hours: 11 },
  { date: "2025/10/02", hours: 6 },
  { date: "2025/10/03", hours: 7 },
  { date: "2025/10/04", hours: 10 },
  { date: "2025/10/05", hours: 5 },
  { date: "2025/10/06", hours: 8 },
];

let testChartData = { slept: 60, total: 168 };

let chartData = [
  { month: "January", total: 186 },
  { month: "February", total: 305 },
  { month: "March", total: 237 },
  { month: "April", total: 273 },
  { month: "May", total: 209 },
  { month: "June", total: 214 },
];

function StatisticsChartView(props) {
  return (
    <div className="p-4 md:p-6">
      {/* <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-8 text-center">
        Statistics Dashboard
      </h1> */}
      <div className="flex flex-col gap-4 md:gap-8 md:grid md:grid-cols-3">
        <div className="h-[350px] md:h-[400px] lg:min-h-[500px]">
          <BarChartCard data2={testchartData2} className="h-full" />
        </div>

        <div className="h-[350px] md:h-[400px] lg:min-h-[500px]">
          <PieChartCard data={testChartData} className="h-full" />
        </div>
        <div className="h-[350px] md:h-[400px] lg:min-h-[500px]">
          <RadarChartCard data3={chartData} className="h-full" />
        </div>
      </div>
    </div>
  );
}

export default StatisticsChartView;

import {  BarChartCard} from "../components/ui/BarChart";
import { PhoneUsageChart } from "../components/ui/BarChartPhone";
import { PieChartCard } from "../components/ui/PieChart";
import { RadarChartCard } from "../components/ui/radarChart";
import clsx from "clsx";
import { Button } from "../components/ui/button";


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
    <div className="p-4">
      {/* <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-8 text-center">
        Statistics Dashboard
      </h1> */}
      <div>
      <div className="flex flex-row justify-center border rounded-lg">
			{props.tabs.map((tab, index) => (
				<Button
					key={tab.id}
					variant="ghost"
					className={clsx("flex flex-col items-center h-auto ", props.activeTab === tab.id ? "text-primary" : "text-muted-foreground")}
					onClick={() => props.changeTab(tab.id)}
				>
					{tab.icon}
					{tab.name}
				</Button>
			))}
		</div>
        <div className="flex flex-col ">
          <div className="pb-8 pt-4">
            <BarChartCard data2 = {props.plannedStartArray} className="h-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatisticsChartView;

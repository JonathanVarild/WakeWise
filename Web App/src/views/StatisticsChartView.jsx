import {  BarChartCard} from "../components/ui/BarChart";
import { PhoneUsageChart } from "../components/ui/BarChartPhone";
import { PieChartCard } from "../components/ui/PieChart";
import { RadarChartCard } from "../components/ui/radarChart";


let testchartData2 = [
  { date: "10/01", hours: 11 },
  { date: "10/02", hours: 6 },
  { date: "10/03", hours: 7 },
  { date: "10/04", hours: 10 },
  { date: "10/05", hours: 5 },
  { date: "10/06", hours: 8 },
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

   function filterSleepACB() {
    console.log("Filter sleep clicked");
    props.getAccuracyData();
    props.getTempData();
    props.getPhone()
    //console.log(chartData)
  }

   function filterScreenTimeACB() {
    console.log("Filter screen time clicked");
  }

  return (
    <div className="p-4">
      {/* <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-8 text-center">
        Statistics Dashboard
      </h1> */}
      <div>
        <div className=" gap-4 border rounded-lg flex justify-center flex-row">
          <button 
          className="p-2" onClick={filterSleepACB}>
            Sleep
          </button>
          <button className="p-2" onClick={filterScreenTimeACB}>
            Screen time
          </button>
        </div>
        <div className="flex flex-col ">
          <div className="pb-8 pt-4">
            <BarChartCard data2 = {props.plannedStartArray} className="h-full" />
          </div>
          <div className="pb-8 pt-4">
            <PhoneUsageChart data3 = {props.phoneUsageArray} className="h-full" />
          </div>

          <div className=" pb-8 ">
            <PieChartCard data={testChartData} className="h-full" />
          </div>
          <div className="pb-8 ">
            <RadarChartCard data3={chartData} className="h-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatisticsChartView;

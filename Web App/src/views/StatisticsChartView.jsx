import { BarChartCard } from "../components/ui/BarChart";
import { PhoneUsageChart } from "../components/ui/BarChartPhone";
import { PieChartCard } from "../components/ui/PieChart";
import { RadarChartCard } from "../components/ui/radarChart";

function StatisticsChartView(props) {
  //console.log("🔍 tempArray[0] = ", props.tempArray[0]);

  function filterSleepACB() {
    console.log("Filter sleep clicked");
    props.getAccuracyData();
    props.getPhone();
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
        {}
        <span className="block text-left font-semibold mb-4">
          Average Temperature: {props.tempArray[0]?.temp} &#8451;
        </span>

        <span className="block text-left font-semibold mb-4">
          Average Bed Time: {props.sleepRegArray[0]?.sleep_start}
        </span>

        <span className="block text-left font-semibold mb-4">
          Average Wake Time: {props.sleepRegArray[0]?.sleep_end}
        </span>

        <span className="block text-left font-semibold mb-4">
          Sleep Score: {props?.score} / 100
          {console.log("Hello test12345", props.score)}
        </span>

        <span className="block text-left font-semibold mb-4">
          Average Humidity: {props.tempArray[0]?.hum} Humidity
          {console.log("Hello test", props.tempArray[0]?.hum)}
        </span>

        {}
        <div className=" gap-4 border rounded-lg flex justify-center flex-row">
          <button className="p-2" onClick={filterSleepACB}>
            Sleep
          </button>
          <button className="p-2" onClick={filterScreenTimeACB}>
            Screen time
          </button>
        </div>
        <div className="flex flex-col ">
          <div className="pb-8 pt-4">
            <BarChartCard data2={props.plannedStartArray} className="h-full" />
          </div>
          <div className="pb-8 pt-4">
            <PhoneUsageChart data3={props.phoneUsageArray} className="h-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatisticsChartView;

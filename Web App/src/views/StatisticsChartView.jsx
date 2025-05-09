import { BarChartCard } from "../components/ui/BarChart";
import { PhoneUsageChart } from "../components/ui/BarChartPhone";
import { PieChartCard } from "../components/ui/PieChart";
import { RadarChartCard } from "../components/ui/radarChart";
import clsx from "clsx";
import { Button } from "../components/ui/button";
import {
  Thermometer,
  Bed,
  Sunrise,
  Smile,
  Droplets,
  Meh,
  Frown,
} from "lucide-react";

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
    <div className="">
      <div className="pb-4 w-full">
        <div className="flex flex-row justify-center border rounded-lg text-bold ">
          
          {props.tabs.map((tab, index) => (
            <Button
              key={tab.id}
              variant="ghost"
              className={clsx(
                "flex flex-col items-center h-auto ",
                props.activeTab === tab.id
                  ? "text-primary "
                  : ""
              )}
              onClick={() => props.changeTab(tab.id)}>
              {tab.icon}
              {tab.name}
            </Button>
          ))}
        </div>
      </div>
      <div className="text-lg pb-2 font-bold "> This weeks statistics: </div>
      <div className="flex flex-col gap-2 py-4 border rounded-lg px-2 ">
      
        <div className="flex flex-row border rounded-lg justify-center text-center ">
          <Thermometer className="mt-3" size={18} />
          <div className="flex  py-2">
            <div>Average Temperature: </div>
             <div className="font-semibold pl-2">{props.tempArray[0]?.temp} &#8451;</div>
          </div>
        </div>

        <div className="flex flex-row border rounded-lg justify-center text-center ">
          <Bed className="mt-3 mr-2" size={18} />
          <div className="flex  py-2">
            <div>Average Bed Time: </div>
            <div className="font-semibold pl-2">{props.sleepRegArray[0]?.sleep_start}</div>
          </div>
        </div>

        <div className="flex flex-row border rounded-lg justify-center text-center ">
          <Sunrise className="mt-3 mr-2" size={18} />
          <div className="flex py-2">
            <div>Average Wake Time:</div>
             <div className=" font-semibold pl-2">{props.sleepRegArray[0]?.sleep_end} </div>
          </div>
        </div>

        <div className="flex flex-row border rounded-lg justify-center text-center ">
          {props.avrgScore < 30 && <Frown className="mt-3 mr-2" size={18} />}
          {props.avrgScore >= 30 && props.avrgScore < 50 && (
            <Meh className="mt-3 mr-2" size={18} />
          )}
          {props.avrgScore >= 50 && <Smile className="mt-3 mr-2" size={18} />}
          <div className="flex py-2">
          <div>Sleep Score:</div>  
          <div className="font-semibold pl-2"> {props?.avrgScore} / 100</div> 
          </div>
        </div>

        <div className="flex flex-row border rounded-lg justify-center text-center ">
          <Droplets className="mt-3 mr-2" size={18} />
          <div className="flex  py-2">
           <div>Average Humidity:</div> 
           <div className="font-semibold pl-2">{props.tempArray[0]?.hum} %</div> 
          </div>
        </div>
      </div>
      <div className="flex flex-col ">
        <div className="pb-8 pt-4">
          <BarChartCard data2={props.plannedStartArray} className="h-full" />
        </div>
      </div>
    </div>
  );
}

export default StatisticsChartView;

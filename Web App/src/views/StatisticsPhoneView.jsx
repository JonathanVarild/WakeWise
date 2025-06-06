import { BarChartCard } from "../components/ui/BarChart";
import { PhoneUsageChart } from "../components/ui/BarChartPhone";
import { PieChartCard } from "../components/ui/PieChart";
import { RadarChartCard } from "../components/ui/radarChart";
import clsx from "clsx";
import { Button } from "../components/ui/button";
import { format } from "date-fns";
import { Moon, Smartphone, Notebook } from "lucide-react";

function StatisticsPhoneView(props) {

  return (
    <div className="pb-4 w-full">
      <div className="flex flex-row justify-center border rounded-lg font-bold w-full">
        {props.tabs.map((tab, index) => {
          console.log("Active Tab:", props.activeTab, "Tab ID:", tab.id);
          return (
            <Button
              key={tab.id}
              variant="ghost"
              className={clsx(
                "flex flex-col items-center h-auto",
                props.activeTab === tab.id ? "text-primary font-bold" : ""
              )}
              onClick={() => props.changeTab(tab.id)}>
              {tab.icon}
              {tab.name}
            </Button>
          );
        })}
      </div>
      <div className="pb-8 pt-4">
        <PhoneUsageChart data3={props.phoneUsageArray} className="h-full" />
      </div>

      <div className=" pb-8 ">
        <PieChartCard data={props.screenTimeArray} className="h-full" />
      </div>
    </div>
  );
}

export default StatisticsPhoneView;

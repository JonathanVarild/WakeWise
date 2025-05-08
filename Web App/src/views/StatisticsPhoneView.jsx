import { BarChartCard } from "../components/ui/BarChart";
import { PhoneUsageChart } from "../components/ui/BarChartPhone";
import { PieChartCard } from "../components/ui/PieChart";
import { RadarChartCard } from "../components/ui/radarChart";
import clsx from "clsx";
import { Button } from "../components/ui/button";

function StatisticsPhoneView(props) {
  return (
    <div className="p-4">
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

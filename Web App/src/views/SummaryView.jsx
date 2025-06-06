import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { CircleX } from "lucide-react";
import { X } from "lucide-react";

export function SummaryView(props) {
  const [difference, setDifference] = useState();


  useEffect(() => {
    if (props.differenceInSleep < 0) {
      console.log("DIIFFEN" , props.differenceInSleep)
      const absValue = Math.abs((props.differenceInSleep))
       console.log(absValue)
      setDifference(parseFloat(absValue));
      console.log("DIFFEN" , difference)


    } else {
      setDifference(props.differenceInSleep);
    }
  }, [props.differenceInSleep]);

  const notesACB = (user_notes) => {
    console.log("Props in SummaryView:", props);

    if (typeof props.setUserNotes === "function") {
      props.setUserNotes(user_notes);
    } else {
      console.error("setUserNotes is not a function:", props.setUserNotes);
    }
  };

  function getScoreColor(todaysScore) {
    if (todaysScore < 30) return "text-red-700";
    if (todaysScore >= 30 && todaysScore < 60) return "text-yellow-700";
    if (todaysScore >= 60) return "text-green-700";
  }

  function getDifferenceText(differenceInSleep) {
    if (differenceInSleep > 0) {
      return " hours less than yesterday";
    } else {
      return " hours more than yesterday";
    }
  }

  function closeSummaryACB(){
    console.log("Close button clicked");

    props.closeSummary(); 
  }

  return (
    <div className="flex justify-center items-center">
      <div className="">
        <div className="flex flex-col gap-2 justify-center text-center font-semibold ">
          <div className="justify-end place-self-end pt-4 ">
            <X 
            onClick={closeSummaryACB}/>
          </div>
          <div className="text-4xl pt-12">Good Morning,</div>
          <div></div>
          <div className="text-2xl"> {props.name}</div>
        </div>

        <div className="flex flex-col pt-8 justify-center text-center font-semibold text-3xl  ">
          <div>
            Your sleepscore:{" "}
            <div className={`pt-4 ${getScoreColor(props.todaysScore)}`}>
              {props.todaysScore}
            </div>{" "}
          </div>

          <div></div>
        </div>

        <div className="flex flex-row gap-2 justify-center pt-8">
          <div>Today you have slept </div>
          <div className="font-semibold">{Math.round(props.todaysHours)} </div>
          <div>hours</div>
        </div>
        <div className="flex flex-row gap-2 justify-center">
          <div>Which is </div>
          <div className="font-semibold"> {difference}</div>
          <div> {getDifferenceText(props.differenceInSleep)}</div>
        </div>

        <div className="flex flex-row gap-2 justify-center pt-4 text-wrap text-xs">
          <div>The average temperature during the night was </div>
          <div className="font-semibold ">{props.avrgTempNight}° C</div>
        </div>
        <div className="flex flex-row gap-2 justify-center text-wrap text-xs pb-4">
          <div>And the average humidity during the night was </div>
          <div className="font-semibold ">{props.avrgHum}%</div>
        </div>

        <div className="flex flex-row gap-2 justify-center text-wrap text-s pb-4">
          <div>You got out of bed </div>
          <div className="font-semibold">{Math.round(props.timeAfterAlarm)}</div>
          <div> minutes after the alarm</div>
        </div>

        <div className="p-4 px-2">
          <Textarea
            className="min-h-20 text-left text-wrap border rounded p-2 min-w-full "
            placeholder="Dream notes"
            onChange={(event) => {
              notesACB(event.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
}

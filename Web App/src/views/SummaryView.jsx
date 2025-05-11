import { Textarea } from "@/components/ui/textarea";

export function SummaryView(props) {

 
    const notesACB = (user_notes) => {
        console.log("Props in SummaryView:", props);

        if (typeof props.setUserNotes === "function") {
          props.setUserNotes(user_notes);
        } else {
          console.error("setUserNotes is not a function:", props.setUserNotes);
        }
      };


  return (
    <div className="h-full ">
      <div className="">
        <div className="flex flex-col pt-20 gap-2 justify-center text-center font-semibold text-3xl  ">
          <div>Good</div>
          <div>Morning,</div>
          <div> {props.name}</div>
        </div>

        <div className="flex flex-col pt-10 justify-center text-center font-semibold text-3xl  ">
          <div>Your sleepscore: </div>
          <div className="pt-4">{props.todaysScore}</div>
          <div></div>
        </div>

        <div className="flex flex-row gap-2 justify-center pt-8">
          <div>Today you have slept </div>
          <div className="font-semibold">{props.todaysHours} </div>
          <div>hours</div>
        </div>

        <div className="flex flex-row gap-2 justify-center pt-4">
          <div>The room has a temperature of </div>
          <div className="font-semibold ">{props.temp}° C</div>
        </div>

        <div className="pt-4 px-2">
          <textArea
            className="min-h-30 text-left text-wrap border rounded p-2 min-w-full "
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

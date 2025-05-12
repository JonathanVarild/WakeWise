import { Button } from "../components/ui/button";
import clsx from "clsx";
import { format } from "date-fns";

export default function DreamNotesView({ notes, tabs, activeTab, changeTab }) {
  return (
    <div className="pb-4 w-full">
      <div className="flex flex-row justify-center border rounded-lg font-bold w-full mb-4">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant="ghost"
            className={clsx(
              "flex flex-col items-center h-auto",
              activeTab === tab.id ? "text-primary font-bold" : ""
            )}
            onClick={() => changeTab(tab.id)}
          >
            {tab.icon}
            {tab.name}
          </Button>
        ))}
      </div>

      <div className="space-y-4">
        {notes?.map((note, index) => (
          <div key={index} className="p-4 border rounded-lg">
            <div className="text-sm text-muted-foreground">
              {format(new Date(note.planned_start), "PPP pp")}
            </div>
            <div className="mt-2">{note.user_note}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

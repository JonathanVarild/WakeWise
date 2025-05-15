import {
  Play,
  Pause,
  Star,
  Rewind,
  FastForward,
  AudioLines,
  Trash2,
  Download,
  Pen,
  Frown
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@mui/material";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";


function RecordingsView(props) {
  function toggleFavoriteACB(id) {
    props.toggleRecordingFavorite(id);
  }

  function changeRecordingNameACB(id, value) {
    props.changeRecordingName(id, value);
    props.saveName(id, value);
  }

  function updateNotesACB(id, event) {
    props.updateNotes(id, event);
  }

  const saveNameACB = (id, input) => {
    const recording = props.recordings.find((r) => r.id === id); 
    const name = recording ? recording.file_name : input; 
    props.saveName(id, name); 
  };

  const deleteRecordingACB = (id) => {
    props.deleteRecording(id);
    
  }

  if (!props.recordings || props.recordings.length === 0) {
    return (
      <div className="text-center py-4">
        <p>No recordings available.</p>
        <div className="flex justify-center pt-4"><Frown/></div>
      </div>
    );
  }

  return (
    <div className="pt-4">
      <div className="rounded-xl shadow-sm border border-gray-200/80 divide-y divide-gray-100">
        {props.recordings.map((recording) => (
          <div key={recording.id}>
            <Drawer className="">
              <div className="flex justify-center items-center p-2">
                <button
                  onClick={() => toggleFavoriteACB(recording.id)}
                  className="absolute left-10 mt-6">
                  {recording.is_favorite ? (
                    <Star size={20} fill="black" />
                  ) : (
                    <Star size={20} />
                  )}
                </button>
                <DrawerTrigger className="flex  items-center text-center">
                  <h3 className="pl-4 text-center  p-4">
                    {" "}
                    {recording.file_name}
                  </h3>
                </DrawerTrigger>
                <AlertDialog className="absolute right-10">
                  <AlertDialogTrigger>
                    <div className="absolute right-10">
                      <Trash2 />
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete recording</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete {recording.file_name}?
                        This action cannot be undone
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => deleteRecordingACB(recording.id)}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
              <div className=" text-center flex-col mb-2 text-xs ">
                {recording.created_at}
              </div>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>
                    <input
                      className="w-full"
                      value={recording.file_name}
                      onChange={(event) =>
                        changeRecordingNameACB(recording.id, event.target.value)
                      }
                    />
                  </DrawerTitle>
                  <DrawerDescription>
                    <div className="text-wrap">
                      <AudioLines className="mb-10" />
                      <div className="flex justify-center w-full">
                        
                        <audio controls>
                          <source className="w-full"
                            src={"api/storage/download?id=" + recording.file_id}
                            type="audio/mpeg"
                          />
                          Your browser does not support the audio element.
                        </audio>
                        
                      </div>
                      <div className="grid w-full max-w-sm items-center gap-1.5 pt-8">
                        <Label className="pl-2">Notes</Label>
                        <Textarea
                          value={recording.user_note}
                          className="min-h-30 text-left text-wrap border rounded-lg border-gray-300 p-2"
                          placeholder="Recording notes"
                          onChange={(event) =>
                            updateNotesACB(recording.id, event.target.value)
                          }
                        />
                      </div>
                    </div>
                  </DrawerDescription>
                </DrawerHeader>
                <div className="flex justify-center">
                  <Button>
                    <AlertDialog>
                      <AlertDialogContent className=" flex justify-center">
                        <AlertDialogHeader>
                          <AlertDialogDescription>
                            {recording.file_name}
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-blue-400"
                            onClick={() =>
                              saveNameACB(recording.id, recording.file_name)
                            }>
                            Save
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </Button>
                </div>
                <DrawerClose className="pb-2">
                  <Button variant="outline">Save</Button>
                </DrawerClose>
              </DrawerContent>
            </Drawer>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecordingsView;
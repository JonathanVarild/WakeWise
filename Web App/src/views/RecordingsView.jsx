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
  
  function RecordingsView(props) {
    function toggleFavoriteACB(id) {
      props.toggleFavorite(id);
    }
  
    function togglePlayACB(id) {
      props.togglePlay(id);
      const recording = props.recordings.find((rec) => rec.id === id);
      console.log(`Recording ID: ${id}, Playing: ${recording.playing}`);
    }
  
    function changeRecordingNameACB(id, value) {
      props.changeRecordingName(id, value);
    }
  
    const saveNameACB = (id, input) => {
        const recording = props.recordings.find((r) => r.id === id); // Hitta inspelningen
        const name = recording ? recording.file_name : input; // Använd inspelningens namn eller input som fallback
    
        console.log("DATA TO SEND:", { id, name }); // Logga datan som skickas
        props.saveName(id, name); // Anropa props.saveName
    };
  
    return (
      <div className="pt-4">
        <div className="rounded-xl shadow-sm border border-gray-200/80 divide-y divide-gray-100">
          {props.recordings.map((recording, index) => (
            <div key={recording.id}>
              <Drawer className="flex row-auto">
                <div className="flex p-5">
                  <Play className="mt-2" />
                  <DrawerTrigger className="flex row-auto mr-8">
                    <h3 className="pl-5">Recording {recording.file_name}</h3>
                  </DrawerTrigger>
                  <button
                    onClick={() => toggleFavoriteACB(recording.id)}
                    className="absolute right-12 mt-2"
                  >
                    {recording.favorite ? (
                      <Star size={20} fill="black" />
                    ) : (
                      <Star size={20} />
                    )}
                  </button>
                </div>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>
                      <input
                        className="w-full"
                        value={recording.file_name || ""}
                        onChange={(event) =>
                          changeRecordingNameACB(recording.id, event.target.value)
                        }
                      />
                    </DrawerTitle>
                    <DrawerDescription>
                      <div>
                        <AudioLines className="mb-10" />
                        <div>
                          <Slider
                            defaultValue={[recording.sliderValue]}
                            max={100}
                            step={1}
                            className="pb-4"
                          />
                        </div>
                        <div className="flex justify-center pt-5 px-8">
                          <button>
                            <Rewind />
                          </button>
                          <button
                            onClick={() => togglePlayACB(recording.id)}
                            className="px-8"
                          >
                            {recording.playing ? <Pause /> : <Play />}
                          </button>
                          <button>
                            <FastForward />
                          </button>
                        </div>
                      </div>
                    </DrawerDescription>
                  </DrawerHeader>
                  <div className="flex justify-center">
                    <Button>
                      <AlertDialog>
                        <AlertDialogTrigger>Save</AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Save name</AlertDialogTitle>
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
                              }
                            >
                              Save
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </Button>
                    <Button>
                      <AlertDialog>
                        <AlertDialogTrigger>
                          <div className="m-3">
                            <Trash2 />
                          </div>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete recording</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete{" "}
                              {recording.file_name}? This action cannot be undone
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction className="bg-red-500">
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </Button>
                  </div>
                  <DrawerClose>
                    <Button variant="outline">Cancel</Button>
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
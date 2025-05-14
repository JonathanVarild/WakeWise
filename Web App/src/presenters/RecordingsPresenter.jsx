import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getRecordingsMetadata,
  setRecordingMetadata,
  toggleRecordingPlay,
  setRecordingName,
  setRecordingNotes,
  setRecordingFavorite,
  removeRecordingFavorite,
  deleteRecording, 

} from "../model/modules/recordings";
import RecordingsView from "../views/RecordingsView";
import PageView from "../views/PageView";

function RecordingsPresenter() {
  const dispatch = useDispatch();
  const recordings = useSelector((state) => state.recordings.recordings);


  //const recordingsName = useSelector((state) => state.recordings.name);

  useEffect(() => {
    dispatch(getRecordingsMetadata()); 
  }, [dispatch]);

  useEffect(() => {
    dispatch(getRecordingsMetadata()); 
    }, [recordings]);

  function toggleRecordingFavoriteACB(file_id) {
    const recording = recordings.find((r) => r.id === file_id);

    if (recording.is_favorite) {
      console.log("dispatched: " + file_id);
      dispatch(removeRecordingFavorite({ file_id }))
        .then((response) => {
          console.log("Unfavorite updated successfully:", response);
        })
        .catch((error) => {
          console.error("Failed to update:", error);
        });
    } else {
      dispatch(setRecordingFavorite({ file_id }))
        .then((response) => {
          console.log("Favorite updated successfully:", response);
        })
        .catch((error) => {
          console.error("Failed to update favorite:", error);
        });
    }
  }


  const changeRecordingNameACB = (id, input) => {
    if (input === "") {
      dispatch(setRecordingName(""));
    }
    // Skapa payload med id och det nya namnet
    const payload = { id, name: input };
    // Dispatcha actionen med payload
    dispatch(setRecordingName(payload));
    console.log("Dispatched setRecordingName with:", payload);
  };

  const saveNameACB = (id, name) => {
    const payload = { id, file_name: name }; // Skapa payload
    console.log("Dispatching setRecordingMetadata with payload:", payload); // Logga payloaden
    dispatch(setRecordingMetadata(payload)) // Dispatcha setRecordingMetadata-thunken
      .then((response) => {
        console.log("Save successful:", response);
      })
      .catch((error) => {
        console.error("Failed to save name:", error);
      });
  };

  const updateNotesACB = (file_id, note) => {
    const payload = { file_id, user_note: note };
    dispatch(setRecordingNotes(payload));
  };


  const deleteRecordingACB = (id) => {
    const payload = {file_id: id};
    console.log("DELETE ID:", payload);

    dispatch(deleteRecording(payload))
  }


  return (
    <PageView title="Recordings">
      <RecordingsView
        toggleRecordingFavorite={toggleRecordingFavoriteACB}
        recordings={recordings}
        changeRecordingName={changeRecordingNameACB}
        saveName={saveNameACB}
        updateNotes={updateNotesACB}
        deleteRecording={deleteRecordingACB}
      />
    </PageView>
  );
}

export default RecordingsPresenter;
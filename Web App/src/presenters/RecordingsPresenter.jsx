import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { presentMetadata, saveMetadata } from "../model/interface/recordings";
import { toggleFavorite, togglePlay, recName } from "../model/interface";
import RecordingsView from "../views/RecordingsView";

function RecordingsPresenter() {
  const dispatch = useDispatch();
  const recordings = useSelector((state) => state.interface.recordings);

const recordingsName = useSelector((state) => state.interface.name);
  

  useEffect(() => {
    dispatch(presentMetadata()); // Hämta metadata när komponenten mountas
  }, [dispatch]);

  function toggleFavoriteACB(id) {
    console.log(recordings)
    dispatch(toggleFavorite(id));
  }

  function togglePlayACB(id) {
    dispatch(togglePlay(id));
  }

  const changeRecordingNameACB = (id, input) => {
    if (input === "") {
      dispatch(recName(""))
    }
  // Skapa payload med id och det nya namnet
  const payload = { id, name: input };
  // Dispatcha actionen med payload
  dispatch(recName(payload));
  console.log("Dispatched recName with:", payload);
};

const saveNameACB = (id, name) => {
    const payload = { id, file_name: name }; // Skapa payload
    console.log("Dispatching saveMetadata with payload:", payload); // Logga payloaden
    dispatch(saveMetadata(payload)) // Dispatcha saveMetadata-thunken
        .then((response) => {
            console.log("Save successful:", response);
        })
        .catch((error) => {
            console.error("Failed to save name:", error);
        });
};

  return (
    <RecordingsView
      toggleFavorite={toggleFavoriteACB}
      togglePlay={togglePlayACB}
      recordings={recordings}
      changeRecordingName={changeRecordingNameACB}
      saveName={saveNameACB}
    />
  );
}

export default RecordingsPresenter;

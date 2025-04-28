import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { presentMetadata } from "../model/interface/recordings";
import { toggleFavorite, togglePlay } from "../model/interface";
import RecordingsView from "../views/RecordingsView";

function RecordingsPresenter() {
  const dispatch = useDispatch();
  const recordings = useSelector((state) => state.interface.recordings);

  useEffect(() => {
    dispatch(presentMetadata()); // Hämta metadata när komponenten mountas
  }, [dispatch]);

  function toggleFavoriteACB(id) {
    dispatch(toggleFavorite(id));
  }

  function togglePlayACB(id) {
    dispatch(togglePlay(id));
  }

  return (
    <RecordingsView
      recordings={recordings}
      toggleFavorite={toggleFavoriteACB}
      togglePlay={togglePlayACB}
    />
  );
}

export default RecordingsPresenter;
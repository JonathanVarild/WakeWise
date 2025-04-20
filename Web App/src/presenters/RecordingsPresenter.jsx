import RecordingsView from "../views/RecordingsView";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite, togglePlay } from "../model/interface";

function RecordingsPresenter() {
  const dispatch = useDispatch();

  const recordings = useSelector((state) => state.interface.recordings);


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
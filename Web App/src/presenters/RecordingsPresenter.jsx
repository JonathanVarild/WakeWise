import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRecordingsMetadata, setRecordingMetadata, toggleRecordingFavorite, toggleRecordingPlay, setRecordingName, setRecordingNotes } from "../model/modules/recordings";
import RecordingsView from "../views/RecordingsView";
import PageView from "../views/PageView";


function RecordingsPresenter() {
	const dispatch = useDispatch();
	const recordings = useSelector((state) => state.recordings.recordings);

	//const recordingsName = useSelector((state) => state.recordings.name);

	useEffect(() => {
		dispatch(getRecordingsMetadata()); // Hämta metadata när komponenten mountas
	}, [dispatch]);

	function toggleRecordingFavoriteACB(id) {
		console.log(recordings);
		dispatch(toggleRecordingFavorite(id));
	}

	function toggleRecordingPlayACB(id) {
		dispatch(toggleRecordingPlay(id));
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
		console.log("Presenter: " + note);
		const payload = {file_id, user_note : note};
		dispatch(setRecordingNotes(payload))
		.then((response) => {
			console.log("Save successful:", response);
		})
		.catch((error) => {
			console.error("Failed to save name:", error);
		});
		
	}

	return (
		<PageView title="Recordings">
			<RecordingsView
				toggleRecordingFavorite={toggleRecordingFavoriteACB}
				toggleRecordingPlay={toggleRecordingPlayACB}
				recordings={recordings}
				changeRecordingName={changeRecordingNameACB}
				saveName={saveNameACB}
				updateNotes={updateNotesACB}
			/>
		</PageView>
	);
}

export default RecordingsPresenter;

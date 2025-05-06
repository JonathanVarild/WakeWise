import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageView from "../views/PageView";
import RoutinesView from "../views/RoutinesView";
import { getRoutineSettings, setMaxTimeInBed, setMustBeInBedTime, setRoutineSettings } from "../model/modules/routines";

function RoutinePresenter() {
	const dispatch = useDispatch();

	const reduxMaxTimeInBed = useSelector((state) => state.routine.max_time_in_bed);
	const reduxMustBeInBedTime = useSelector((state) => state.routine.must_be_in_bed_time);

	const [maxTimeInBed, setLocalMaxTimeInBed] = useState(0);
	const [mustBeInBedTime, setLocalMustBeInBedTime] = useState(0);

	useEffect(() => {
		dispatch(getRoutineSettings()).then(() => {
			setLocalMaxTimeInBed(reduxMaxTimeInBed);
			setLocalMustBeInBedTime(reduxMustBeInBedTime);
		});
	}, [dispatch, reduxMaxTimeInBed, reduxMustBeInBedTime]);

	const handleSave = () => {
		dispatch(setMaxTimeInBed(maxTimeInBed));
		dispatch(setMustBeInBedTime(mustBeInBedTime));
		dispatch(
			setRoutineSettings({
				max_time_in_bed: maxTimeInBed,
				must_be_in_bed_time: mustBeInBedTime,
			})
		);
	};

	return (
		<RoutinesView
			maxTimeInBed={maxTimeInBed}
			mustBeInBedTime={mustBeInBedTime}
			onMaxTimeInBedChange={setLocalMaxTimeInBed}
			onMustBeInBedTimeChange={setLocalMustBeInBedTime}
			onSave={handleSave}
		/>
	);
}

export default RoutinePresenter;

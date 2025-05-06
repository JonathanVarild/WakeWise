import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RoutinesView from "../views/RoutinesView";
import LoadingView from "../views/LoadingView";

import { getRoutineSettings, setMaxTimeInBed, setMustBeInBedTime, setRoutineSettings } from "../model/modules/routines";

function RoutinePresenter() {
	const dispatch = useDispatch();

	const isLoading = useSelector((state) => state.routine.getRoutineSettings.status === "loading");
	const maxTimeInBed = useSelector((state) => state.routine.max_time_in_bed);
	const mustBeInBedTime = useSelector((state) => state.routine.must_be_in_bed_time);

	useEffect(() => {
		dispatch(getRoutineSettings());
	}, [dispatch]);

	function onBeforeLimitChangeACB(event) {
		const value = event[0];
		dispatch(setMaxTimeInBed(value));
	}

	function onAfterLimitChangeACB(event) {
		const value = event[0];
		dispatch(setMustBeInBedTime(value));
	}

	function onSliderCommitACB() {
		dispatch(
			setRoutineSettings({
				max_time_in_bed: maxTimeInBed,
				must_be_in_bed_time: mustBeInBedTime,
			})
		);
	}

	if (isLoading) {
		return <LoadingView />;
	}
	return (
		<RoutinesView
			maxTimeInBed={maxTimeInBed}
			mustBeInBedTime={mustBeInBedTime}
			onBeforeLimitChange={onBeforeLimitChangeACB}
			onAfterLimitChange={onAfterLimitChangeACB}
			onSliderCommit={onSliderCommitACB}
		/>
	);
}

export default RoutinePresenter;

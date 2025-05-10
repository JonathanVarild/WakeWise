import ScreenTimeView from "../views/ScreenTimeView";
import { useDispatch, useSelector } from "react-redux";
import { getScreentimeSettings, setAlertType, setPostSleep, setPreSleep, setScreentimeSettings } from "../model/modules/screentime";
import { useEffect } from "react";
import LoadingView from "../views/LoadingView";
function ScreenTimePresenter() {
	const dispatch = useDispatch();

	const isLoading = useSelector((state) => state.screentime.getScreentimeSettings.status === "loading");
	const alertType = useSelector((state) => state.screentime.alertType);
	const post_sleep_min = useSelector((state) => state.screentime.post_sleep_min);
	const pre_sleep_min = useSelector((state) => state.screentime.pre_sleep_min);

	useEffect(() => {
		dispatch(getScreentimeSettings());
	}, [dispatch]);

	function onBeforeLimitChangeACB(event) {
		const value = event[0];
		dispatch(setPreSleep(value));
	}

	function onAfterLimitChangeACB(event) {
		const value = event[0];
		dispatch(setPostSleep(value));
	}

	function onSliderCommitACB() {
		dispatch(
			setScreentimeSettings({
				post_sleep_min: post_sleep_min,
				pre_sleep_min: pre_sleep_min,
				alertType: alertType,
			})
		);
	}

	function handleAlertChange(newAlert) {
		dispatch(setAlertType(newAlert));
		dispatch(
			setScreentimeSettings({
				post_sleep_min: post_sleep_min,
				pre_sleep_min: pre_sleep_min,
				alertType: newAlert,
			})
		);
	}

	if (isLoading || alertType === null || post_sleep_min === null || pre_sleep_min === null) {
		return <LoadingView />;
	}

	return (
		<ScreenTimeView
			beforeSleepLimit={pre_sleep_min}
			afterWakeLimit={post_sleep_min}
			alertType={alertType}
			onBeforeLimitChange={onBeforeLimitChangeACB}
			onAfterLimitChange={onAfterLimitChangeACB}
			onSliderCommit={onSliderCommitACB}
			onAlertTypeChange={handleAlertChange}
		/>
	);
}

export default ScreenTimePresenter;

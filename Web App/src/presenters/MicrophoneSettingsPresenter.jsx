import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import MicrophoneSettingsView from "../views/MicrophoneSettingsView";
import LoadingView from "../views/LoadingView";
import { fetchMicSettings, setActivationThreshold, setBeforeSleepDelay, setRecordingLifespan, updateMicSettings } from "../model/modules/mic";

function MicrophoneSettingsPresenter() {
	const dispatch = useDispatch();

	const isLoading = useSelector((state) => state.mic.fetchMicSettings.status === "loading");
	const beforeSleepDelay = useSelector((state) => state.mic.before_sleep_delay_minutes);
	const activationThreshold = useSelector((state) => state.mic.activation_threshold_db);
	const recordingLifespan = useSelector((state) => state.mic.recording_lifespan_days);

	useEffect(() => {
		dispatch(fetchMicSettings());
	}, [dispatch]);

	function onChangeBeforeDelayACB(event) {
		let value = parseInt(event.target.value);
		value = Math.max(0, Math.min(value, 120));
		dispatch(setBeforeSleepDelay(value));
	}

	function onChangeActivationThresholdACB(event) {
		let value = parseInt(event.target.value);
		value = Math.max(0, Math.min(value, 90));
		dispatch(setActivationThreshold(value));
	}

	function onChangeRecordingLifespanACB(event) {
		let value = parseInt(event.target.value);
		value = Math.max(0, Math.min(value, 90));
		dispatch(setRecordingLifespan(value));
	}

	function onSliderCommitACB() {
		dispatch(
			updateMicSettings({
				before_sleep_delay_minutes: beforeSleepDelay,
				activation_threshold_db: activationThreshold,
				recording_lifespan_days: recordingLifespan,
			})
		);
	}

	if (isLoading) {
		return <LoadingView />;
	}

	return (
		<MicrophoneSettingsView
			beforeSleepDelay={beforeSleepDelay}
			activationThreshold={activationThreshold}
			recordingLifespan={recordingLifespan}
			onChangeBeforeDelay={onChangeBeforeDelayACB}
			onChangeActivationThreshold={onChangeActivationThresholdACB}
			onChangeRecordingLifespan={onChangeRecordingLifespanACB}
			onSliderCommit={onSliderCommitACB}
		/>
	);
}

export default MicrophoneSettingsPresenter;

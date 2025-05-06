import { ComboBox } from "../components/ui/comboBox";
import { Slider } from "../components/ui/slider";
import { alertOptions } from "../lib/constants";

function ScreenTimeView(props) {
	return (
		<div className="grid gap-6 w-full max-w-md">
			<div className="flex justify-between">
				<label htmlFor="before_sleep_slider">Limit Before Sleep (minutes)</label>
				<span>{props.beforeSleepLimit}</span>
			</div>
			<Slider
				id="before_sleep_slider"
				value={[props.beforeSleepLimit]}
				onValueChange={props.onBeforeLimitChange}
				onValueCommit={props.onSliderCommit}
				max={30}
				step={1}
				className="w-full"
			/>

			<div className="flex justify-between">
				<label htmlFor="after_sleep_slider">Limit Before Sleep (minutes)</label>
				<span>{props.afterWakeLimit}</span>
			</div>
			<Slider
				id="after_sleep_slider"
				value={[props.afterWakeLimit]}
				onValueChange={props.onAfterLimitChange}
				onValueCommit={props.onSliderCommit}
				max={30}
				step={1}
				className="w-full"
			/>

			<div className="grid gap-2">
				<label htmlFor="alert_type_combobox">Alert Type</label>
				<ComboBox
					id="alert_type_combobox"
					value={alertOptions.find((option) => option.value === props.alertType).label}
					onChange={props.onAlertTypeChange}
					options={alertOptions}
					placeholder={alertOptions.find((option) => option.value === props.alertType).label}
				/>
			</div>
		</div>
	);
}

export default ScreenTimeView;

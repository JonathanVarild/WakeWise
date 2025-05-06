import { Slider } from "../components/ui/slider";

function RoutinesView(props) {
	return (
		<div className="grid gap-6 w-full max-w-md">
			<div className="flex justify-between">
				<label htmlFor="slider">Limit Before Sleep (minutes)</label>
				<span>{props.maxTimeInBed}</span>
			</div>
			<Slider id="slider" value={[props.maxTimeInBed]} onValueChange={props.onBeforeLimitChange} onValueCommit={props.onSliderCommit} max={30} step={1} className="w-full" />

			<div className="flex justify-between">
				<label htmlFor="slider">Limit After Wake (minutes)</label>
				<span>{props.mustBeInBedTime}</span>
			</div>
			<Slider
				id="slider"
				value={[props.mustBeInBedTime]}
				onValueChange={props.onAfterLimitChange}
				onValueCommit={props.onSliderCommit}
				max={30}
				step={1}
				className="w-full"
			/>
		</div>
	);
}

export default RoutinesView;

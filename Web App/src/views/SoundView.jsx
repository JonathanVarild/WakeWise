import { Slider } from "../components/ui/slider";
import { ComboBox } from "../components/ui/ComboBox";

function SoundView(props) {
	return (
		<div className="grid gap-4 w-full max-w-sm">
			<div className="grid gap-2">
				<div className="grid gap-2">
					<label>Alarm Sound</label>
					<ComboBox
						value={props.sound}
						onChange={(value) => {
							props.onSoundChange(value);
						}}
					/>
				</div>
				<div className="flex justify-between">
					<label htmlFor="slider">Volume</label>
					<span>{props.volume}</span>
				</div>
				<Slider id="slider" value={[props.volume]} onValueChange={props.onVolumeChange} onValueCommit={props.saveVolume} max={100} step={1} className="w-full" />
			</div>

			<div className="flex justify-between">
				<label htmlFor="slider">Fade In</label>
				<span>{props.fade}</span>
			</div>
			<div>
				<Slider id="slider2" value={[props.fade]} onValueChange={props.onFadeChange} onValueCommit={props.saveFade} max={120} step={1} className="w-full" />
			</div>
		</div>
	);
}

export default SoundView;

import React from "react";
import { Clock, Mic, Battery, ChevronRight } from "lucide-react";

export default function MicrophoneSettingsView(props) {
	return (
		<div className="flex flex-col gap-4">
			<div className="bg-white rounded-lg shadow-sm border border-gray-200">
				<div className="p-4 border-b border-gray-100 flex items-center gap-3">
					<Clock className="size-6 text-black" />
					<h2 className="text-lg font-semibold text-gray-800">Before Sleep Delay</h2>
				</div>
				<div className="p-4 flex items-center justify-between">
					<div className="flex items-center gap-2">
						<input
							type="number"
							min="0"
							max="120"
							value={props.beforeSleepDelay}
							onChange={(event) => {
								props.onChangeBeforeDelay(event);
								props.onSliderCommit();
							}}
							className="w-20 px-2 py-1 border rounded"
						/>
						<span className="text-gray-700">minutes</span>
					</div>
					<div className="flex items-center gap-2">
						<input
							type="range"
							min="0"
							max="120"
							value={props.beforeSleepDelay}
							onChange={props.onChangeBeforeDelay}
							onPointerUp={props.onSliderCommit}
							className="w-32 accent-black"
						/>
						<ChevronRight className="size-5 text-gray-400" />
					</div>
				</div>
			</div>

			<div className="bg-white rounded-lg shadow-sm border border-gray-200">
				<div className="p-4 border-b border-gray-100 flex items-center gap-3">
					<Mic className="size-6 text-black" />
					<h2 className="text-lg font-semibold text-gray-800">Activation Threshold</h2>
				</div>
				<div className="p-4 flex items-center justify-between">
					<div className="flex items-center gap-2">
						<input
							type="number"
							min="0"
							max="90"
							value={props.activationThreshold}
							onChange={(event) => {
								props.onChangeActivationThreshold(event);
								props.onSliderCommit();
							}}
							className="w-20 px-2 py-1 border rounded"
						/>
						<span className="text-gray-700">dB</span>
					</div>
					<div className="flex items-center gap-2">
						<input
							type="range"
							min="0"
							max="90"
							value={props.activationThreshold}
							onChange={props.onChangeActivationThreshold}
							onPointerUp={props.onSliderCommit}
							className="w-32 accent-black"
						/>
						<ChevronRight className="size-5 text-gray-400" />
					</div>
				</div>
			</div>

			<div className="bg-white rounded-lg shadow-sm border border-gray-200">
				<div className="p-4 border-b border-gray-100 flex items-center gap-3">
					<Battery className="size-6 text-black" />
					<h2 className="text-lg font-semibold text-gray-800">Recording Lifespan</h2>
				</div>
				<div className="p-4 flex items-center justify-between">
					<div className="flex items-center gap-2">
						<input
							type="number"
							min="1"
							max="60"
							value={props.recordingLifespan}
							onChange={(event) => {
								props.onChangeRecordingLifespan(event);
								props.onSliderCommit();
							}}
							className="w-20 px-2 py-1 border rounded"
						/>
						<span className="text-gray-700">days</span>
					</div>
					<div className="flex items-center gap-2">
						<input
							type="range"
							min="1"
							max="60"
							value={props.recordingLifespan}
							onChange={props.onChangeRecordingLifespan}
							onPointerUp={props.onSliderCommit}
							className="w-32 accent-black"
						/>
						<ChevronRight className="size-5 text-gray-400" />
					</div>
				</div>
			</div>
		</div>
	);
}

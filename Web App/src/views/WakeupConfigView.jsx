// 'View': Modulen/Funktionens "logik"

import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switchtoggle";
import { useState } from "react";

function WakeupConfigView(props) {
    const [showLightning, setShowLightning] = useState(false);
    const [volume, setVolume] = useState([30]);
    const [brightness, setBrightness] = useState([30]);

    return (
        <div className="flex flex-col gap-10 p-8">

            {/* Always Show */}
            <div className="flex flex-col text-base font-semibold" >
                <label className="mb-[4%]">Volume</label>
                <Slider className="w-[60%]" defaultValue={[30]} max={100} step={5} value={volume} onValueChange={setVolume} />
                <label className="ml-[22%] mt-[4%]">{volume[0]}%</label>
            </div>

            <div className="flex flex-col text-base font-semibold">
                <label className="mb-[4%]">Wakeup duration</label>
                <Slider className="w-[50%]" defaultValue={[30]} max={100} step={5} />
            </div>

            {/* Toggle */}
            <div className="flex flex-col text-base font-semibold">
                <label className="mb-[4%]">Enable Ambient Lightning</label>
                <div className="flex justify-left ">
                    <Switch size="m" checked={showLightning} onCheckedChange={setShowLightning} />
                </div>
            </div>
            
            {/* Conditionally show brightness & color sliders */}
            {showLightning && (
                <>
                    <div className="flex flex-col text-base font-semibold">
                        <label className="mb-[4%]">Brightness</label>
                        <Slider className="w-[50%]" defaultValue={[30]} max={100} step={2} value={brightness} onValueChange={setBrightness} />
                        <label className="ml-[22%] mt-[4%]">{brightness[0]}%</label>
                    </div>

                    <div className="flex flex-col text-base font-semibold">
                        <label className="mb-[4%]">Colour</label>
                        <Slider className="w-[50%]" defaultValue={[30]} max={100} step={5} />
                    </div>
                </>
            )}
        </div>
    );
}

export default WakeupConfigView;
// 'View': Modulen/Funktionens "logik"

import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switchtoggle";
import { useState } from "react";

function WakeupConfigView(props) {
    const [showLightning, setShowLightning] = useState(false);

    return (
        <div className="flex flex-col gap-12 p-8">

            {/* Always Show */}
            <div className="flex flex-col">
                <label className="text-base font-semibold mb-4 text-left">Volume</label>
                <Slider defaultValue={[30]} max={100} step={5} />
            </div>

            <div className="flex flex-col">
                <label className="text-base font-semibold mb-4 text-left">Wakeup duration</label>
                <Slider defaultValue={[30]} max={100} step={5} />
            </div>

            {/* Toggle */}
            <div className="flex flex-col">
                <label className="text-base font-semibold mb-4 text-left">Enable Ambient Lightning</label>
                <div className="flex justify-left ">
                    <Switch 
                        size="m"
                        checked={showLightning}
                        onCheckedChange={setShowLightning}
                    />
                </div>
            </div>
            
            {/* Conditionally show brightness & color sliders */}
            {showLightning && (
                <>
                    <div className="flex flex-col">
                        <label className="text-base font-semibold mb-4 text-left">Brightness</label>
                        <Slider defaultValue={[30]} max={100} step={5} />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-base font-semibold mb-4 text-left">Colour</label>
                        <Slider defaultValue={[30]} max={100} step={5} />
                    </div>
                </>
            )}
        </div>
    );
}

export default WakeupConfigView;
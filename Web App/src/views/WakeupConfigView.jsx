<<<<<<< Updated upstream
//import { Slider } from "@/components/ui/slider";
import { Slider } from "@/components/ui/slider";
=======
// 'View': Modulen/Funktionens "logik"
>>>>>>> Stashed changes

function WakeupConfigView(props) {
    return (
        <div className="flex flex-col gap-32 p-8">
            <section className="mt-[200px] flex items-center gap-4">
                <label className="w-15 text-xs font-semibold">Brightness</label>
                <Slider defaultValue={[33]} max={100} step={1} />
            </section>

            <section className="py-[10] flex items-center gap-4">
                <label className="w-15 text-xs font-semibold">Colour</label>
                <Slider defaultValue={[33]} max={100} step={1} />
            </section>

            <section className="flex items-center gap-4">
                <label className="w-15 text-xs font-semibold">Volume</label>
                <Slider defaultValue={[33]} max={100} step={1} />
            </section>

            <section className="flex items-center gap-4">
                <label className="w-15 text-xs font-semibold">Wakeup duration</label>
                <Slider defaultValue={[33]} max={100} step={1} />
            </section>
        </div>
        

    );
}

export default WakeupConfigView;
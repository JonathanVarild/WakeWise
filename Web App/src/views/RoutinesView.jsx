import { Clock, Sunrise } from 'lucide-react';
import { Slider } from "../components/ui/slider";

function RoutinesView(props) {
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-100 flex items-center gap-3">
          <Clock className="size-6 text-black" />
          <h2 className="text-lg font-semibold text-gray-800">Sleep Limits</h2>
        </div>
        
        <div className="p-4 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Before Sleep Limit</span>
              <span className="text-sm font-medium text-gray-900">{props.maxTimeInBed} mins</span>
            </div>
            <Slider 
              value={[props.maxTimeInBed]}
              onValueChange={props.onBeforeLimitChange}
              onValueCommit={props.onSliderCommit}
              max={30}
              step={1}
              className="w-full"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">After Wake Limit</span>
              <span className="text-sm font-medium text-gray-900">{props.mustBeInBedTime} mins</span>
            </div>
            <Slider
              value={[props.mustBeInBedTime]}
              onValueChange={props.onAfterLimitChange}
              onValueCommit={props.onSliderCommit}
              max={30}
              step={1}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoutinesView;
import { ComboBox } from "../components/ui/comboBox";
import { alertOptions } from "../lib/constants";

function ScreenTimeView(props) {
  return (
    <div className="grid gap-6 w-full max-w-md">
      {/* Limit before sleep */}
      <div className="grid gap-2">
        <label htmlFor="beforeSleep">Limit Before Sleep (minutes)</label>
        <input
          type="number"
          id="beforeSleep"
          min={0}
          max={180}
          value={props.beforeSleepLimit ?? ""} // shows empty string if null
          onChange={(e) => {
            const raw = e.target.value;
            props.onBeforeSleepChange(raw === "" ? null : Number(raw));
          }}
          className="border rounded px-3 py-2"
        />
      </div>

      {/* Limit after waking */}
      <div className="grid gap-2">
        <label htmlFor="afterWake">Limit After Wake (minutes)</label>
        <input
          type="number"
          id="afterWake"
          min={0}
          max={180}
          value={props.afterWakeLimit ?? ""}
          onChange={(e) => {
            const raw = e.target.value;
            props.onAfterWakeChange(raw === "" ? null : Number(raw));
          }}
          className="border rounded px-3 py-2"
        />
      </div>

      {/* Alert Type */}
      <div className="grid gap-2">
        <label htmlFor="alertType">Alert Type</label>
        <ComboBox
          value={props.alertType}
          onChange={props.onAlertTypeChange}
          options={alertOptions}
          placeholder="Select alert type"
        />
      </div>
    </div>
  );
}

export default ScreenTimeView;

function RoutinesView(props) {
  return (
    <div className="grid gap-6 w-full max-w-md">
      {/* Limit before sleep */}
      <div className="grid gap-2">
        <label htmlFor="beforeSleep">Limit Before Sleep (minutes)</label>
        <input
          type="number"
          inputMode="numeric"
          pattern="[0-9]"
          id="beforeSleep"
          min={0}
          max={180}
          value={props.maxTimeInBed ?? ""}
          onChange={(e) => {
            const raw = e.target.value;
            props.onMaxTimeInBedChange(raw === "" ? null : Number(raw));
          }}
          className="border rounded px-3 py-2"
        />
      </div>

      {/* Limit after waking */}
      <div className="grid gap-2">
        <label htmlFor="afterWake">Limit After Wake (minutes)</label>
        <input
          type="number"
          inputMode="numeric"
          pattern="[0-9]"
          id="afterWake"
          min={0}
          max={180}
          value={props.mustBeInBedTime ?? ""}
          onChange={(e) => {
            const raw = e.target.value;
            props.onMustBeInBedTimeChange(raw === "" ? null : Number(raw));
          }}
          className="border rounded px-3 py-2"
        />
      </div>

      <button
        onClick={props.onSave}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Save
      </button>
    </div>
  );
}

export default RoutinesView;

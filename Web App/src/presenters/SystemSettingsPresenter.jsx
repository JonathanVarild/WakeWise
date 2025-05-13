import SystemSettingsView from "../views/SystemSettingsView";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSettings,
  updateTimezone,
  updateTheme,
  getTimezones,
  setSettings
} from "../model/modules/system";

function SystemSettingsPresenter() {
  const dispatch = useDispatch();

  const { settings, timezones } = useSelector((state) => ({
    settings: state.system.settings,
    timezones: state.system.timezones
  }));

  const theme = settings?.theme || 'light';

  useEffect(() => {
    dispatch(getSettings());
    dispatch(getTimezones()); 
  }, [dispatch]);


  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    if (theme === "dark") {
      root.classList.add("dark");
      body.style.backgroundColor = "#1f2937";
      root.style.color = "#e5e7eb";
    } else {
      root.classList.remove("dark");
      body.style.backgroundColor = "";
      root.style.color = "";
    }
  }, [theme]);


  const handleTimezoneChange = (tz) => {
    dispatch(setSettings({ ...settings, time_zone: tz }));
    dispatch(updateTimezone({ time_zone: tz }));
  };


  const handleThemeChange = (t) => {
    dispatch(setSettings({ ...settings, theme: t }));
    dispatch(updateTheme({ theme: t }));
    localStorage.setItem("theme", t);
  };

  return (
    <SystemSettingsView
      timeZone={settings?.time_zone}
      theme={theme}
      timezones={timezones || []}
      onTimezoneChange={handleTimezoneChange}
      onThemeChange={handleThemeChange}
    />
  );
}

export default SystemSettingsPresenter;

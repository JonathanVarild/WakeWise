import SystemSettingsView from "../views/SystemSettingsView";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSettings,
  updateTimezone,
  updateTheme,
  getTimezones
} from "../model/modules/system";

function SystemSettingsPresenter(props) {
  const dispatch = useDispatch();

  const {
    settings,
    timezones 
  } = useSelector((state) => ({
    settings: state.system.settings,
    timezones: state.system.timezones
  }));

  const theme = settings?.theme || 'light';

  useEffect(() => {
    dispatch(getSettings());
    dispatch(getTimezones()); 
  }, [dispatch]);

  const handleTimezoneChange = (newTimezone) => {
    dispatch(updateTimezone({ time_zone: newTimezone }));
  };

  const handleThemeChange = (newTheme) => {
    dispatch(updateTheme({ theme: newTheme }));
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
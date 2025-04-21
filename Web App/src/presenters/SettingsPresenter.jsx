import { BrowserRouter as Router } from 'react-router-dom';
import SettingsView from "../views/SettingsView";
import { settingsData } from "../model/interface/settingsModel";

export default function SettingsPresenter() {
  return (
    <Router>
      <SettingsView modules={settingsData} />
    </Router>
  );
}
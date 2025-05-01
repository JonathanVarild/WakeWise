import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import MicrophoneSettingsView from '../views/MicrophoneSettingsView';
import { changeSettingSubTab } from "../model/interface";

export default function MicrophoneSettingsPresenter() {
  const dispatch = useDispatch();
  const rawData = useSelector(state => state.hardware?.mic);
  
  const [tempSettings, setTempSettings] = useState({
    delay: rawData?.delay || 300,
    threshold: rawData?.threshold || 45,
    lifespan: rawData?.lifespan || 5
  });

  const handleSave = () => {
    dispatch({
      type: 'UPDATE_MIC_SETTINGS',
      payload: tempSettings
    });
    dispatch(changeSettingSubTab(null)); 
  };

  const handleUpdate = (field, value) => {
    setTempSettings(prev => ({
      ...prev,
      [field]: Number(value)
    }));
  };

  return (
    <MicrophoneSettingsView
      settings={tempSettings}
      onSave={handleSave}
      onUpdate={handleUpdate}
    />
  );
}
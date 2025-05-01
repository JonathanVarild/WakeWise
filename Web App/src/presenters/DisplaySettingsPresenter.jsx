import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import DisplaySettingsView from '../views/DisplaySettingsView';
import { changeSettingSubTab } from "../model/interface";

export default function DisplaySettingsPresenter() {
  const dispatch = useDispatch();
  const rawData = useSelector(state => state.hardware?.display);
  
  const [tempSettings, setTempSettings] = useState({
    pageLayouts: rawData?.page_layouts || [[1,2,3,4], [5,6,7,8]],
    fontSize: rawData?.font_size ?? 14,
    color: rawData?.color || '#ff7626'
  });

  const handleSave = () => {
    dispatch({
      type: 'UPDATE_DISPLAY_CONFIG',
      payload: {
        page_layouts: tempSettings.pageLayouts,
        font_size: tempSettings.fontSize,
        color: tempSettings.color
      }
    });
    dispatch(changeSettingSubTab(null)); 
  };

  return (
    <DisplaySettingsView
      {...tempSettings}
      onSave={handleSave}
      onUpdate={(newData) => setTempSettings(prev => ({...prev, ...newData}))}
    />
  );
}
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import DisplaySettingsView from '../views/DisplaySettingsView';
import { changeSettingSubTab } from "../model/interface";
import { 
  fetchDisplaySettings, 
  updateDisplaySettings 
} from "../model/interface/display";

export default function DisplaySettingsPresenter() {
  const dispatch = useDispatch();
  
  const displayState = useSelector(state => state.interface.display || { 
    status: 'idle',
    page_layouts: [[1,2,3,4], [5,6,7,8]], 
    font_size: 14,
    color: '#ff7626'
  });

  
  const [tempSettings, setTempSettings] = useState({
    page_layouts: displayState.page_layouts,
    font_size: displayState.font_size,
    color: displayState.color
  });


  useEffect(() => {
    if (displayState.status === 'succeeded') {
      setTempSettings({
        page_layouts: displayState.page_layouts,
        font_size: displayState.font_size,
        color: displayState.color
      });
    }
  }, [displayState]);


  useEffect(() => {
    if (displayState.status === 'idle') {
      dispatch(fetchDisplaySettings());
    }
  }, [dispatch, displayState.status]);


  const handleSave = async () => {
    try {
      await dispatch(updateDisplaySettings(tempSettings)).unwrap();
      dispatch(changeSettingSubTab(null));
    } catch (error) {
      alert(`Save failed: ${error.message}`);
    }
  };


  const handleUpdate = (field, value) => {
    setTempSettings(prev => {
      if (typeof field === 'string' && field.startsWith('page_layouts.')) {
        const [_, pageIndex, itemIndex] = field.split('.');
        const updatedLayouts = prev.page_layouts.map(page => [...page]);
        updatedLayouts[pageIndex][itemIndex] = Number(value);
        return { ...prev, page_layouts: updatedLayouts };
      }
      return { 
        ...prev,
        [field]: field === 'font_size' ? Number(value) : value 
      };
    });
  };

  if (displayState.status === 'loading') {
    return <div>Loading display settings...</div>;
  }

  return (
    <DisplaySettingsView
      pageLayouts={tempSettings.page_layouts}
      fontSize={tempSettings.font_size}
      color={tempSettings.color}
      onSave={handleSave}
      onUpdate={handleUpdate}
      isLoading={displayState.status === 'updating'}
      errors={displayState.error ? [displayState.error] : []}
    />
  );
}
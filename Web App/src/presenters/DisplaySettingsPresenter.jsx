import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import DisplaySettingsView from '../views/DisplaySettingsView';
import { fetchDisplaySettings, updateDisplaySettings } from '../model/modules/display';

function DisplaySettingsPresenter() {
  const dispatch = useDispatch();
  const displayState = useSelector(state => state.display);

  const handleUpdate = (field, value) => {
    if (field === 'font_size' && ![18, 24, 30].includes(Number(value))) return;
    
    dispatch(updateDisplaySettings({
      ...displayState,
      [field]: field === 'font_size' ? Number(value) : value
    }));
  };

  useEffect(() => {
    dispatch(fetchDisplaySettings());
  }, [dispatch]);

  return (
    <DisplaySettingsView
      pageLayouts={displayState.page_layouts}
      fontSize={displayState.font_size}
      color={displayState.color}
      onUpdate={handleUpdate}
    />
  );
}

export default DisplaySettingsPresenter;
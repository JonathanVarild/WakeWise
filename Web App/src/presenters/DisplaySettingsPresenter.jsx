import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import DisplaySettingsView from '../views/DisplaySettingsView';
import { fetchDisplaySettings, updateDisplaySettings } from '../model/modules/display';

function DisplaySettingsPresenter() {
  const dispatch = useDispatch();
  const displayState = useSelector(state => state.display);

  const handleUpdate = (field, value) => {
    dispatch(updateDisplaySettings({
      ...displayState,
      [field]: value
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
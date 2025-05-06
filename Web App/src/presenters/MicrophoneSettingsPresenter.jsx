import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import MicrophoneSettingsView from '../views/MicrophoneSettingsView';
import { changeSubTab } from '../model/modules/navigation';
import { fetchMicSettings, updateMicSettings } from '../model/modules/mic';

function MicrophoneSettingsPresenter() {
    const dispatch = useDispatch();
    const micState = useSelector(state => state.interface.mic || { status: 'idle' });
    const [tempSettings, setTempSettings] = useState({
        before_sleep_delay_minutes: 10,  
        activation_threshold_db: 100,
        recording_lifespan_days: 30
    });

    useEffect(() => {
        if (micState.status === 'succeeded') {
            setTempSettings({
                before_sleep_delay_minutes: micState.before_sleep_delay_minutes,
                activation_threshold_db: micState.activation_threshold_db,
                recording_lifespan_days: micState.recording_lifespan_days
            });
        }
    }, [micState]);

    
    useEffect(() => {
        if (micState.status === 'idle') {
            dispatch(fetchMicSettings());
        }
    }, [dispatch, micState.status]);

   
    const handleUpdate = (field, value) => {
        const parsedValue = Number(value);
        setTempSettings(prev => ({
            ...prev,
            [field]: isNaN(parsedValue) ? value : parsedValue
        }));
    };

    const handleSave = async () => {
        try {
            await dispatch(updateMicSettings(tempSettings)).unwrap();
            dispatch(changeSubTab(null));
        } catch (error) {
            alert(`Save failed: ${error.message}`);
        }
    };

    if (micState.status === 'loading') {
        return <div>Loading microphone settings...</div>;
    }

    return (
        <MicrophoneSettingsView
            settings={tempSettings}
            onSave={handleSave}
            onUpdate={handleUpdate}
            isLoading={micState.status === 'pending'}
            errors={micState.error ? [micState.error] : []}
        />
    );
}

export default MicrophoneSettingsPresenter;
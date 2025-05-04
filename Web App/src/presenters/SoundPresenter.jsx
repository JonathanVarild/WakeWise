import PageView from "../views/PageView";
import SoundView from "../views/SoundView";
import { useDispatch, useSelector } from "react-redux";
import {
  getSoundSettings,
  setSound,
  setSoundSettings,
  setVolume,
} from "../model/modules/sound";
import { useEffect } from "react";
function SoundPresenter() {
  const dispatch = useDispatch();

  const volume = useSelector((state) => state.sound.volume);
  const sound = useSelector((state) => state.sound.sound);

  function handleVolumeChangeACB(newVolume) {
    console.log("Sound Volume:", newVolume);
    dispatch(setVolume(newVolume[0]));
  }

  function handleSoundChangeACB(newSound) {
    console.log("Sound change:", newSound);
    dispatch(setSound(newSound));
    dispatch(setSoundSettings({ volume: volume, sound: newSound }));
  }

  function onVolumeCommitACB(event) {
    console.log(sound);
    dispatch(setSoundSettings({ volume: event[0], sound: sound }));
    console.log(volume);
  }

  useEffect(() => {
    dispatch(getSoundSettings());
  }, [dispatch]);

  return (
    <PageView title="Sound Settings">
      <SoundView
        volume={volume}
        onVolumeChange={handleVolumeChangeACB}
        sound={sound}
        onSoundChange={handleSoundChangeACB}
        saveVolume={onVolumeCommitACB}
      />
    </PageView>
  );
}

export default SoundPresenter;

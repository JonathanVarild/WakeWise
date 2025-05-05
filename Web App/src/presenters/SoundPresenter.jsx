import PageView from "../views/PageView";
import SoundView from "../views/SoundView";
import { useDispatch, useSelector } from "react-redux";
import {
  getSoundSettings,
  setSound,
  setSoundSettings,
  setVolume,
  setFade,
} from "../model/modules/sound";
import { useEffect } from "react";
function SoundPresenter() {
  const dispatch = useDispatch();

  const volume = useSelector((state) => state.sound.volume);
  const sound = useSelector((state) => state.sound.sound);
  const fade = useSelector((state) => state.sound.fade);

  function handleVolumeChangeACB(newVolume) {
    console.log("Sound Volume:", newVolume);
    dispatch(setVolume(newVolume[0]));
  }

  function handleSoundChangeACB(newSound) {
    console.log("Sound change:", newSound);
    dispatch(setSound(newSound));
    dispatch(setSoundSettings({ volume: volume, sound: newSound, fade: fade }));
  }

  function handleFadeChangeACB(newFade) {
    console.log("Sound Volume:", newFade);
    dispatch(setFade(newFade[0]));
    dispatch(setSoundSettings({ volume: volume, sound: sound, fade: newFade }));
  }

  function onVolumeCommitACB(event) {
    console.log(sound);
    dispatch(setSoundSettings({ volume: event[0], sound: sound, fade: fade }));
    console.log(volume);
  }

  function onFadeCommitACB(event) {
    console.log(sound);
    dispatch(
      setSoundSettings({ volume: volume, sound: sound, fade: event[0] })
    );
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
        fade={fade}
        saveVolume={onVolumeCommitACB}
        onFadeChange={handleFadeChangeACB}
        saveFade={onFadeCommitACB}
      />
    </PageView>
  );
}

export default SoundPresenter;

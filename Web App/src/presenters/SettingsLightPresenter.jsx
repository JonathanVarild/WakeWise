import SettingsLightView from "../views/SettingsLightView";
import { useState, useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useDispatch, useSelector } from "react-redux";
import {
  getColors,
  updateColor,
  setBrightness,
  updateBrightness,
  updateColorsData,
  getBrightness,
  getSavedId,
  setId,
  getSunrise,
  updateSunrise,
} from "../model/modules/lights";

function SettingsLightPresenter(props) {
  const [hex, setHex] = useState("#ffffff");

  const dispatch = useDispatch();

  const brightness = useSelector((state) => state.lights.brightness);
  const id = useSelector((state) => state.lights.id);
  const sunrise = useSelector((state) => state.lights.sunrise);

  useEffect(() => {
    dispatch(getColors());
    dispatch(getBrightness());
    dispatch(getSavedId());
    dispatch(getSunrise());
  }, [dispatch]);


  //  console.log("ID: " , id);

  //console.log("Brightness!!:", brightness);

  const colors = useSelector((state) => state.lights.colors);

  function changeBrightnessACB(value) {

    dispatch(setBrightness({ brightness: value }));
    dispatch(updateBrightness({ brightness: value }));
  }

  function changeSunriseACB(value) {

    dispatch(getSunrise({ fade_in_minutes: value }));
    dispatch(updateSunrise({ fade_in_minutes: value }));
  }

  function changeColorACB(id, newColor) {
    const rgbString = `${newColor.rgb.r}, ${newColor.rgb.g}, ${newColor.rgb.b}`;
    const payload = { id, color_hex: newColor.hex, color_rgb: rgbString };
    dispatch(updateColor(payload));
  }

  function setColorACB(id) {
    dispatch(setId(id));
    if (id == 1) {
      dispatch(updateColorsData({ color: colors[0] }));
    } else if (id == 2) {
      dispatch(updateColorsData({ color: colors[1] }));
    } else if (id == 3) {
      dispatch(updateColorsData({ color: colors[2] }));
    } else {
      dispatch(updateColorsData({ color: colors[3] }));
    }
  }

  return (
    <SettingsLightView
      brightness={brightness}
      changeBrightness={changeBrightnessACB}
      changeColor={changeColorACB}
      hex={hex}
      colors={colors}
      setColor={setColorACB}
      id={id}
      changeSunrise={changeSunriseACB}
      sunrise={sunrise}
    />
  );
}

export default SettingsLightPresenter;

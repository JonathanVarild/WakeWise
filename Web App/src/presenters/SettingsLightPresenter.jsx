import SettingsLightView from "../views/SettingsLightView";
import { useState, useEffect  } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useDispatch, useSelector } from "react-redux";
import { getColors, updateColor } from "../model/modules/lights";


import { Lightbulb } from "lucide-react";

function SettingsLightPresenter(props) {
  const [brightness, setBrightness] = useState(30);
  const [hex, setHex] = useState("#ffffff");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getColors()); 
  }, [dispatch]);

  const colors = useSelector((state) => state.recordings.colors);
  console.log("Colors in presenter:", colors); 
  


  function changeBrightnessACB(value) {
    setBrightness(value);
    console.log("Brightness updated to: " + value);
    

  console.log("Lights array in component:", colors);

  }

  function changeColorACB(id, newColor) {
   
    const rgbString = `${newColor.rgb.r}, ${newColor.rgb.g}, ${newColor.rgb.b}`;
    console.log("RGB: ", rgbString);
  const payload = { id, color_hex: newColor.hex, color_rgb:rgbString  };
  console.log("Payload: " , newColor.hex);
    dispatch(updateColor(payload)); 
    console.log(`Updating color for id ${id} to ${color_hex}`);
}

  function setColorACB(id) {
    const color = showColors.find((c) => c.id === id); // Hitta objektet med rätt id
    if (color) {
      setHex(color.hex); // Uppdatera hex med rätt färg
      console.log("HEXCOLOR: " + color.hex + ", With id: " + id);
      const rgbString = hexToRgbString(color.hex);
      console.log(rgbString);
    } else {
      console.error("Color with id " + id + " not found");
    }
  }

  function hexToRgbString(hex) {
    hex = hex.replace(/^#/, "");

    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    return `rgb(${r}, ${g}, ${b})`;
  }

  const rgbString = hexToRgbString("#d0021b");
  console.log(rgbString);

  return (
    <SettingsLightView
      brightness={brightness}
      changeBrightness={changeBrightnessACB}
      changeColor={changeColorACB}
      hex={hex}
      colors={colors}
      setColor={setColorACB}
    />
  );
}

export default SettingsLightPresenter;

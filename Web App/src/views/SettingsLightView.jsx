import { Slider } from "@/components/ui/slider";
import { Sun } from "lucide-react";
import { Lightbulb } from "lucide-react";
import { Palette } from "lucide-react";
import { Sunrise } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../components/ui/button";
import { Wheel } from "@uiw/react-color";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function SettingsLightView(props) {
  function changeBrightnessACB(value) {
    props.changeBrightness(value);
  }

  function changeColorACB(id, color) {
    console.log("COLOR: ", color.hex);
    console.log("ID: ", id);
    props.changeColor(id, color);
  }

  function setColorACB(id) {
    console.log("SET id: " + id);
    props.setColor(id);
  }

  function changeSunriseACB(value) {
    props.changeSunrise(value);
  }

  return (
    <div className="h-full p-4">
      <div className="flex flex-col gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 flex items-center gap-3">
            <Lightbulb />
            <h2 className="text-lg font-semibold text-gray-800">Brightness</h2>
          </div>
          <div className="px-4 pb-4">
            <div className="flex flex-row ">
              <Sun size={30} fill={100} className="pr-2" />
              <Slider
                value={[props.brightness]}
                max={100}
                step={1}
                onValueChange={(value) => changeBrightnessACB(value[0])}
              />
              <Sun size={30} className="pl-2" />
            </div>
          </div>
          <div className="text-xs p-4 flex flex-row">
            Brightness at <div className="pl-1 font-bold">{props.brightness?.brightness || props.brightness} </div> %
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 flex items-center gap-3">
            <Palette />
            <h2 className="text-lg font-semibold text-gray-800">Color</h2>
          </div>
          <div>
            <div className="flex flex-row p-4 gap-4 justify-center">
              {props.colors.map((color) => (
                <div
                  key={color.id}
                  className="w-15 h-15 rounded-lg"
                  style={{ backgroundColor: color.color_hex }}>
                  <Dialog className="w-15 h-15 flex flex-row justify-center rounded-lg shadow-sm border border-gray-200">
                    <DialogTrigger className="justify-center rounded-lg shadow-sm border border-gray-200 w-15 h-15">
                      {/* Trigger för att öppna dialog */}
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Choose color</DialogTitle>
                        <DialogDescription>
                          <div className="py-8 flex justify-center">
                            <Wheel
                              color={color.color_hex}
                              onChange={(newColor) => {
                                changeColorACB(color.id, newColor);
                              }}
                            />
                          </div>
                        </DialogDescription>
                        <DialogTrigger>
                          <Button>Save</Button>
                        </DialogTrigger>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>
              ))}
            </div>
          </div>
          <RadioGroup
            value={props.id}
            className="justify-center flex flex-row gap-15 pb-4"
            onValueChange={(id) => {
              setColorACB(id);
            }}>
            <div className="flex items-center ">
              <RadioGroupItem value="1" id="1" />
              <Label htmlFor="option-one"></Label>
            </div>
            <div className="flex items-center ">
              <RadioGroupItem value="2" id="2" />
              <Label htmlFor="option-two"></Label>
            </div>
            <div className="flex items-center">
              <RadioGroupItem value="3" id="3" />
              <Label htmlFor="option-three"></Label>
            </div>
            <div className="flex items-center ">
              <RadioGroupItem value="4" id="4" />
              <Label htmlFor="option-four"></Label>
            </div>
          </RadioGroup>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 flex items-center gap-3">
            <Sunrise size={20} />
            <h2 className="text-lg font-semibold text-gray-800">
              Sunrise settings
            </h2>
          </div>
          <div className="px-4 pb-4">
            <div className="flex flex-row ">
              <div className="pr-4">0</div>
              <Slider
                value={[props.sunrise]}
                max={60}
                step={5}
                onValueChange={(value) => changeSunriseACB(value[0])}
              />
              <div className="pl-4">60</div>
            </div>
          </div>
          <div className="text-xs p-4 flex flex-row">
            <div className="pr-1 font-bold">{props.sunrise} </div> 
            <div>
              minutes before {props.brightness?.brightness || props.brightness}%
              brightness
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

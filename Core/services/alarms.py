import threading
import time
from utils.configuration_manager import configuration_manager
from controllers.speaker_controller import speaker_controller
from controllers.led_controller import led_controller

sound_files = {
    "Sound1": "sound1.mp3",
    "Sound2": "sound2.mp3",
    "Sound3": "sound3.mp3",
}

class AlarmService:
    def __init__(self):
        self.lock = threading.Lock()
        self.thread = threading.Thread(target=self.worker, daemon=True)
        self.prefix = "Alarm Service"
        self.alarm_triggered = False

    def print(self, *args):
        print(f"[{self.prefix}]", *args)

    def start(self):
        self.print("Starting thread...")
        self.thread.start()

    def hex_to_rgb(self, hex_color):
        hex_color = hex_color.lstrip('#') # Remove the '#' if present
        return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))


    def worker(self):
        while True:
            time.sleep(1)
            wakeup_time = configuration_manager.get_config("ALARM", "wakeup_time")
            current_time = time.strftime("%H:%M")
            
            with self.lock:
                if True:#current_time == wakeup_time and not self.alarm_triggered:
                    self.alarm_triggered = True
                    self.print("Alarm! Time to wake up!")
                    #LIGHT 
                    color = configuration_manager.get_config("LIGHT", "color")
                    brightness = (configuration_manager.get_config("LIGHT", "brightness"))/100

                    led_controller.set_color(self.hex_to_rgb(color))
                    led_controller.set_brightness(brightness=brightness)
                    led_controller.set_led(True)
                    
                    #SOUND
                    sound = sound_files.get(configuration_manager.get_config("SOUND", "wakeup_sound"), "default_sound.mp3")
                    fade_in_seconds = configuration_manager.get_config("SOUND", "fade_in_seconds")
                    max_volume = configuration_manager.get_config("SOUND", "max_volume")
                    
                    speaker_controller.set_volume(max_volume)
                    speaker_controller.play_repeating_sound(sound, fade_in_seconds)

    def get_state(self):
        with self.lock:
            return {
                "alarm_triggered": self.alarm_triggered
            }

# Create singleton instance of AlarmService
alarm_service = AlarmService()
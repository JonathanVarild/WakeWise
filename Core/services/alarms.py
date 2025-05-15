import threading
import time
from datetime import datetime
from utils.configuration_manager import configuration_manager
from controllers.speaker_controller import speaker_controller
from controllers.led_controller import led_controller
from sensors.bed_sensor import bed_sensor

from services.sleep import sleep_service

sound_files = {
    "beeping_alarm": "beeping_alarm.mp3",
    "birdsong": "birdsong.mp3",
    "lofi_alarm": "lofi_alarm.mp3",
    "rain": "rain.mp3",
}

class AlarmService:
    def __init__(self):
        self.lock = threading.Lock()
        self.thread = threading.Thread(target=self.worker, daemon=True)
        self.prefix = "Alarm Service"
        self.alarm_triggered = False
        self.alarm_timeout = 0

    def print(self, *args):
        print(f"[{self.prefix}]", *args)

    def start(self):
        self.print("Starting thread...")
        bed_sensor.add_listener(self.detect_bed_sensor)
        self.thread.start()

    def hex_to_rgb(self, hex_color):
        hex_color = hex_color.lstrip('#') # Remove the '#' if present
        print(hex_color) ##
        return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))

    def activate_alarm(self):
        self.alarm_triggered = True
        #LIGHT 
        color = configuration_manager.get_config("LIGHT", "color")
        brightness = (configuration_manager.get_config("LIGHT", "brightness"))/100
        print(color.get("color_hex")) ##
        led_controller.set_color(self.hex_to_rgb(color.get("color_hex")))
        led_controller.set_brightness(brightness=brightness)
        led_controller.set_led(True)
        
        #SOUND
        sound = sound_files.get(configuration_manager.get_config("SOUND", "wakeup_sound"), "lofi_alarm.mp3")
        print(sound)
        fade_in_seconds = configuration_manager.get_config("SOUND", "fade_in_seconds")
        max_volume = configuration_manager.get_config("SOUND", "max_volume")
        
        #sound_file = sound_files.get(sound, "lofi_alarm.mp3")
        #print(sound_file)
        
        speaker_controller.set_volume(max_volume)
        speaker_controller.play_repeating_sound(sound, fade_in_seconds)

    def deactivate_alarm(self):
        speaker_controller.stop_sound()
        self.alarm_triggered = False
        self.alarm_timeout = time.time() + 60.0
        print("until buffer-time left:", self.alarm_timeout - time.time())

    def worker(self):
        while True:
            time.sleep(1)
            wakeup_time = configuration_manager.get_config("ALARM", "wakeup_time")
            current_time = time.strftime("%H:%M")
            ###
            current_time_str = time.strftime("%H:%M")
            current_time_obj = datetime.strptime(current_time_str, "%H:%M")
            now = datetime.now()
            current_time_obj = current_time_obj.replace(year=now.year, month=now.month, day=now.day)
            current_time_epoch = current_time_obj.timestamp()

            wakeup_time_obj = datetime.strptime(wakeup_time, "%H:%M")
            wakeup_time_obj = wakeup_time_obj.replace(year=now.year, month=now.month, day=now.day)
            wakeup_time_epoch = wakeup_time_obj.timestamp()

            led_satus = led_controller.led_state #onödig
            #bedtime_time = sleep_service.get_planned_start_time()
            #bedtime_time = wakeup_time - configuration_manager.get_config("ALARM", "sleep_goal")
            print(wakeup_time, "   ", current_time, "  ", led_satus, "  ","  ",current_time_epoch, "  ", wakeup_time_epoch,    abs(current_time_epoch - wakeup_time_epoch)) 
            ###
            with self.lock:
                if current_time == wakeup_time and not self.alarm_triggered and time.time() > self.alarm_timeout:
                    self.print("Alarm! Time to wake up!")
                    self.activate_alarm()
                elif (abs(current_time_epoch/60 - wakeup_time_epoch/60) < 2) and time.time() > self.alarm_timeout: 
                    self.print("GO TO BED")
                    speaker_controller.play_single_sound("tripple_beep.mp3")
                    
    def detect_bed_sensor(self, state):
        with self.lock:
            if state and self.alarm_timeout > time.time():
                self.print("Bed sensor reactivated during timeout, reactivating alarm.")
                self.activate_alarm()
            else:
                if self.alarm_triggered:
                    self.print("Bed sensor deactivated, stopping alarm.")
                    self.deactivate_alarm()

    def get_alarm_status(self):
        return self.alarm_triggered
    
    def get_alarm_timeout(self):
        return self.alarm_timeout

# Create singleton instance of AlarmService
alarm_service = AlarmService()
import threading
import time
from utils.configuration_manager import configuration_manager
from controllers.speaker_controller import speaker_controller

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

    def worker(self):
        while True:
            time.sleep(1)
            wakeup_time = configuration_manager.get_config("ALARM", "wakeup_time")
            current_time = time.strftime("%H:%M")
            
            with self.lock:
                if current_time == wakeup_time and not self.alarm_triggered:
                    self.alarm_triggered = True
                    self.print("Alarm! Time to wake up!")
                    
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
import threading
import time
from utils.configuration_manager import configuration_manager
from controllers.speaker_controller import speaker_controller

sound_play_time_seconds = 60 * 60

class AmbientNoiseService:
    def __init__(self):
        self.lock = threading.Lock()
        self.thread = threading.Thread(target=self.worker, daemon=True)
        self.prefix = "Ambient Noise Service"
        self.played_since = 0
        self.is_playing = False

    def print(self, *args):
        print(f"[{self.prefix}]", *args)

    def start(self):
        self.print("Starting thread...")
        self.thread.start()

    def worker(self):
        while True:
            time.sleep(1)
            if sound_play_time_seconds < time.time() - self.played_since:
                with self.lock:
                    self.print("Stopping sound")
                    speaker_controller.stop_sound()
                    self.played_since = 0
                    self.is_playing = False
            
    def on_button1_pressed(self):
        with self.lock:
            self.print("Button 1 pressed")
            if self.is_playing:
                self.print("Stopping sound")
                speaker_controller.stop_sound()
                self.played_since = 0
                self.is_playing = False
            else:
                self.played_since = time.time()
                speaker_controller.play_repeating_sound("birdsong.mp3")
                self.is_playing = True
                    
# Create singleton instance of AlarmService
ambient_noise_service = AmbientNoiseService()
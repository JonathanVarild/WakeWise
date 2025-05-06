import threading
import time

class SpeakerController:
    def __init__(self):
        self.lock = threading.Lock()
        self.thread = threading.Thread(target=self.worker, daemon=True)
        self.prefix = "Speaker Controller"
        self.volume = 50

    def print(self, *args):
        print(f"[{self.prefix}]", *args)

    def start(self):
        self.print("Starting thread...")
        self.thread.start()

    def worker(self):
        while True:
            time.sleep(1)
            self.print("Running worker thread...")
            
    def set_volume(self, volume):
        with self.lock:
            self.print(f"Setting volume to: {volume}")
            
    def play_single_sound(self, sound):
        with self.lock:
            self.print(f"Playing sound: {sound}")
            
    def play_repeating_sound(self, sound, fade_in_seconds=0):
        with self.lock:
            self.print(f"Playing repeating sound: {sound} with fade in: {fade_in_seconds} seconds with volume: {self.volume}")
            
    def stop_sound(self):
        with self.lock:
            self.print("Stopping sound")
            

                        
# Create singleton instance of SpeakerController
speaker_controller = SpeakerController()
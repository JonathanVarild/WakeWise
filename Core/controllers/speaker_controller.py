import threading
import time
import pygame
import os 

class SpeakerController:
    def __init__(self):
        self.lock = threading.Lock()
        self.thread = threading.Thread(target=self.worker, daemon=True)
        self.prefix = "Speaker Controller"
        self.volume = 0.8
        os.system("bluetoothctl connect 78:44:05:8C:F5:64")

    def print(self, *args):
        print(f"[{self.prefix}]", *args)

    def start(self):
        self.print("Starting thread...")     
        self.thread.start()

    def worker(self):
        while True:
            time.sleep(0.1)
            self.print("Running worker thread...")
            
    def set_volume(self, volume):
        with self.lock:
            self.print(f"Setting volume to: {volume}")
            self.volume = volume
            
    def play_single_sound(self, sound):
        with self.lock:
            self.print(f"Playing single sound: {sound} with volume: {self.volume}")
            
            self.print("[INFO] Initializing pygame mixer...")
            pygame.mixer.init(frequency=44100, size=-16, channels=2, buffer=2048)

            self.print(f"[INFO] Loading sound file: {sound}")
            try:
                sound = pygame.mixer.Sound(f"./sounds/{sound}")
            except pygame.error as e:
                self.print(f"[ERROR] Failed to load sound: {e}")
                exit(1)

            self.print(f"[INFO] Setting volume to {self.volume * 100}%")
            sound.set_volume(self.volume)

            self.print("[INFO] Playing sound...")
            channel = sound.play(loops=0)
            
    def play_repeating_sound(self, sound, fade_in_seconds=0):
        with self.lock:
            self.print(f"Playing repeating sound: {sound} with fade in: {fade_in_seconds} seconds with volume: {self.volume}")
            
            self.print("[INFO] Initializing pygame mixer...")
            pygame.mixer.init(frequency=44100, size=-16, channels=2, buffer=2048)
                
            time.sleep(1)  # Allow time for mixer to initialize
            
            self.print(f"[INFO] Loading sound file: {sound}")
            try:
                sound = pygame.mixer.Sound(f"./sounds{sound}")
            except pygame.error as e:
                print(f"[ERROR] Failed to load sound: {e}")
                exit(1)

            self.print(f"[INFO] Setting volume to {self.volume * 100}%")
            sound.set_volume(self.volume)

            self.print("[INFO] Playing sound...")
            channel = sound.play(loops=-1)  # Loop indefinitely
            
    def stop_sound(self):
        with self.lock:
            self.print("Stopping sound...")
            pygame.mixer.stop()
                        
# Create singleton instance of SpeakerController
speaker_controller = SpeakerController()
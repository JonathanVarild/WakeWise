import threading
import time
from gpiozero import Button
from controllers.speaker_controller import speaker_controller

class PhoneSensor:
    def __init__(self):
        self.lock = threading.Lock()
        self.thread = threading.Thread(target=self.worker, daemon=True)
        self.prefix = "Phone Sensor"
        self.listeners = []
        self.button = Button(17) #pin 11
        self.phone_occupancy = self.button.is_pressed

    def print(self, *args):
        print(f"[{self.prefix}]", *args)

    def start(self):
        self.print("Starting thread...")
        self.read_sensor()
        self.thread.start()

    def worker(self):
        while True:
            time.sleep(1)
            self.read_sensor()
            
    def add_listener(self, listener):
        with self.lock:
            if listener not in self.listeners:
                self.listeners.append(listener)
            
    def read_sensor(self):
        with self.lock:
            newValue = self.button.is_pressed
            if newValue != self.phone_occupancy:
                self.phone_occupancy = newValue
                speaker_controller.play_single_sound("tripple_beep.mp3")
                for listener in self.listeners:
                    listener(self.phone_occupancy)
            
    def get_occupancy(self):
        with self.lock:
            return self.phone_occupancy
        

                
# Create singleton instance of PhoneSensor
phone_sensor = PhoneSensor()
import threading
import time
from gpiozero import Button

class BedSensor:
    def __init__(self):
        self.lock = threading.Lock()
        self.thread = threading.Thread(target=self.worker, daemon=True)
        self.prefix = "Bed Sensor"
        self.listeners = []
        self.button = Button(16) #pin 36
        self.bed_occupancy = self.button.is_pressed

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
            
    def read_sensor(self):
        with self.lock:
            newValue = self.button.is_pressed
            if newValue != self.bed_occupancy:
                self.bed_occupancy = newValue
                for listener in self.listeners:
                    listener(self.bed_occupancy)
            
    def get_occupancy(self):
        with self.lock:
            return self.bed_occupancy
        
    def add_listener(self, listener):
        with self.lock:
            if listener not in self.listeners:
                self.listeners.append(listener)
            
# Create singleton instance of BedSensor
bed_sensor = BedSensor()
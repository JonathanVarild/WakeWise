import threading
import time

class BedSensor:
    def __init__(self):
        self.lock = threading.Lock()
        self.thread = threading.Thread(target=self.worker, daemon=True)
        self.prefix = "Bed Sensor"
        self.listeners = []
        self.bed_occupancy = False

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
            newValue = not self.bed_occupancy # TODO: Replace with actual sensor reading.
            if newValue != self.bed_occupancy:
                self.bed_occupancy = newValue
                for listener in self.listeners:
                    listener(self.bed_occupancy)
            
    def get_data(self):
        with self.lock:
            return self.bed_occupancy
        
    def add_listener(self, listener):
        with self.lock:
            if listener not in self.listeners:
                self.listeners.append(listener)
            
# Create singleton instance of BedSensor
bed_sensor = BedSensor()
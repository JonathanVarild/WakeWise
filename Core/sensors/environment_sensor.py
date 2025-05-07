import threading
import time
import random

class EnvironmentSensor:
    def __init__(self):
        self.lock = threading.Lock()
        self.thread = threading.Thread(target=self.worker, daemon=True)
        self.prefix = "Bed Sensor"
        self.listeners = []
        self.indoor_temperature = -1
        self.indoor_humidity = -1

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
            new_indoor_temperature = random.uniform(15.0, 25.0) # TODO: Replace with actual sensor reading.
            new_indoor_humidity = random.uniform(30.0, 70.0) # TODO: Replace with actual sensor reading.
            
            if new_indoor_temperature != self.indoor_temperature or new_indoor_humidity != self.indoor_humidity: 
                self.indoor_temperature = new_indoor_temperature
                self.indoor_humidity = new_indoor_humidity
                for listener in self.listeners:
                    listener(self.indoor_temperature, self.indoor_humidity)
            
    def get_data(self):
        with self.lock:
            return self.indoor_temperature, self.indoor_humidity
        
    def add_listener(self, listener):
        with self.lock:
            if listener not in self.listeners:
                self.listeners.append(listener)
            
# Create singleton instance of EnvironmentSensor
environment_sensor = EnvironmentSensor()
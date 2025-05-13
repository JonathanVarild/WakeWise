import threading
import time
import board
import adafruit_dht

class EnvironmentSensor:
    def __init__(self):
        self.lock = threading.Lock()
        self.thread = threading.Thread(target=self.worker, daemon=True)
        self.prefix = "Bed Sensor"
        self.dht_sensor = adafruit_dht.DHT22(board.D2) # Initialize the DHT22 sensor on GPIO pin 2 (board pin 3)
        self.listeners = []
        self.indoor_temperature = self.read_temperature()
        self.indoor_humidity = self.read_humidity()
        self.print("Temperature:", self.indoor_temperature)
        self.print("Humidity: ", self.indoor_humidity)

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
            
    def read_temperature(self):
        try:
            return self.dht_sensor.temperature
        except Exception as e:
            print(f"Error reading sensor: {e}")
            return -99
        
    def read_humidity(self):
        try:
            return self.dht_sensor.humidity
        except Exception as e:
            print(f"Error reading sensor: {e}")
            return 0
            
    def read_sensor(self):
            new_indoor_temperature = self.read_temperature()
            new_indoor_humidity = self.read_humidity()
            
            if new_indoor_temperature != self.indoor_temperature or new_indoor_humidity != self.indoor_humidity: 
                self.indoor_temperature = new_indoor_temperature
                self.indoor_humidity = new_indoor_humidity
                for listener in self.listeners:
                    listener(self.indoor_temperature, self.indoor_humidity)
                self.print("Temperature or humidity changed:", new_indoor_temperature, "C, ", new_indoor_humidity, "%")
            
    def get_sensors(self):
        with self.lock:
            return self.indoor_temperature, self.indoor_humidity
        
    def add_listener(self, listener):
        with self.lock:
            if listener not in self.listeners:
                self.listeners.append(listener)
            
# Create singleton instance of EnvironmentSensor
environment_sensor = EnvironmentSensor()
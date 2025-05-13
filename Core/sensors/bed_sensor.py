import threading
import time
import RPi.GPIO as GPIO

class BedSensor:
    def __init__(self):
        self.lock = threading.Lock()
        self.thread = threading.Thread(target=self.worker, daemon=True)
        self.prefix = "Bed Sensor"
        self.listeners = []
        try:
            GPIO.setmode(GPIO.BCM)
            GPIO.setup(22, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
            self.button_pin = 22
            self.bed_occupancy = GPIO.input(self.button_pin)
        except Exception as e:
            self.print("Error initializing bed sensor:", e)
            self.button_pin = None
            self.bed_occupancy = False

    def print(self, *args):
        print(f"[{self.prefix}]", *args)

    def start(self):
        self.print("Starting thread...")
        self.read_sensor()
        self.thread.start()

    def worker(self):
        while True:
            time.sleep(0.1)
            self.read_sensor()

    def read_sensor(self):
        if self.button_pin is None:
            return
        with self.lock:
            newValue = GPIO.input(self.button_pin)
            if newValue != self.bed_occupancy:
                self.print("Bed occupancy changed:", newValue)
                self.bed_occupancy = newValue
                for listener in self.listeners:
                    listener(self.bed_occupancy)

    def get_occupancy(self):
        if self.button_pin is None:
            return False
        with self.lock:
            return self.bed_occupancy

    def add_listener(self, listener):
        with self.lock:
            if listener not in self.listeners:
                self.listeners.append(listener)

bed_sensor = BedSensor()
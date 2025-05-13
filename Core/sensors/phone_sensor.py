import threading
import time
import RPi.GPIO as GPIO
from controllers.speaker_controller import speaker_controller

class PhoneSensor:
    def __init__(self):
        self.lock = threading.Lock()
        self.thread = threading.Thread(target=self.worker, daemon=True)
        self.prefix = "Phone Sensor"
        self.listeners = []
        try:
            GPIO.setmode(GPIO.BCM)
            GPIO.setup(6, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
            self.button_pin = 6
            self.phone_occupancy = GPIO.input(self.button_pin)
        except Exception as e:
            self.print("Error initializing phone sensor:", e)
            self.button_pin = None
            self.phone_occupancy = False

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

    def add_listener(self, listener):
        with self.lock:
            if listener not in self.listeners:
                self.listeners.append(listener)

    def read_sensor(self):
        if self.button_pin is None:
            return
        with self.lock:
            newValue = GPIO.input(self.button_pin)
            if newValue != self.phone_occupancy:
                self.print("Phone occupancy changed:", newValue)
                self.phone_occupancy = newValue
                speaker_controller.play_single_sound("tripple_beep.mp3")
                for listener in self.listeners:
                    listener(self.phone_occupancy)

    def get_occupancy(self):
        if self.button_pin is None:
            return False
        with self.lock:
            return self.phone_occupancy

phone_sensor = PhoneSensor()
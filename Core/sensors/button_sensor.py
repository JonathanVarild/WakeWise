import threading
import time
import RPi.GPIO as GPIO

class ButtonSensor:
    def __init__(self):
        self.lock = threading.Lock()
        self.thread = threading.Thread(target=self.worker, daemon=True)
        self.prefix = "Button Sensor"
        self.listeners_button1 = []
        self.listeners_button2 = []
        try:
            GPIO.setmode(GPIO.BCM)
            GPIO.setup(4, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
            GPIO.setup(18, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
            self.button1_pin = 4
            self.button2_pin = 18
            self.pressed_button1 = GPIO.input(self.button1_pin)
            self.pressed_button2 = GPIO.input(self.button2_pin)
        except Exception as e:
            self.print("Error initializing button sensor:", e)
            self.button1_pin = None
            self.button2_pin = None
            self.pressed_button1 = False
            self.pressed_button2 = False

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
        if self.button1_pin is None or self.button2_pin is None:
            return
        with self.lock:
            new_btn_1 = GPIO.input(self.button1_pin)
            new_btn2 = GPIO.input(self.button2_pin)

            if new_btn_1 and new_btn_1 != self.pressed_button1:
                self.print("Button 1 pressed")
                for listener in self.listeners_button1:
                    listener(new_btn_1)

            if new_btn2 and new_btn2 != self.pressed_button2:
                self.print("Button 2 pressed")
                for listener in self.listeners_button2:
                    listener(new_btn2)

            self.pressed_button1 = new_btn_1
            self.pressed_button2 = new_btn2

    def get_button1(self):
        if self.button1_pin is None:
            return False
        with self.lock:
            return GPIO.input(self.button1_pin)

    def get_button2(self):
        if self.button2_pin is None:
            return False
        with self.lock:
            return GPIO.input(self.button2_pin)

    def add_listener_button1(self, listener):
        with self.lock:
            if listener not in self.listeners_button1:
                self.listeners_button1.append(listener)

    def add_listener_button2(self, listener):
        with self.lock:
            if listener not in self.listeners_button2:
                self.listeners_button2.append(listener)

button_sensor = ButtonSensor()
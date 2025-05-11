import threading
import time
from gpiozero import Button

class ButtonSensor:
    def __init__(self):
        self.lock = threading.Lock()
        self.thread = threading.Thread(target=self.worker, daemon=True)
        self.prefix = "Button Sensor"
        self.listeners_button1 = []
        self.listeners_button2 = []
        self.button1 = Button(6) #pin31
        self.button2 = Button(5) #pin29
        self.pressed_button1 = self.button1.is_pressed
        self.pressed_button2 = self.button2.is_pressed

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
            new_btn_1 = self.button1.is_pressed
            new_btn2 = self.button2.is_pressed
            
            if new_btn_1 and new_btn_1 != self.pressed_button1:
                for listener in self.listeners_button1:
                    listener(new_btn_1)
                    
            if new_btn2 and new_btn2 != self.pressed_button2:
                for listener in self.listeners_button2:
                    listener(new_btn2)
                    
            self.pressed_button1 = new_btn_1
            self.pressed_button2 = new_btn2
            
    def get_button1(self):
        with self.lock:
            return self.button1.is_pressed
        
    def get_button2(self):
        with self.lock:
            return self.button2.is_pressed
        
    def add_listener_button1(self, listener):
        with self.lock:
            if listener not in self.listeners_button1:
                self.listeners_button1.append(listener)
                
    def add_listener_button2(self, listener):
        with self.lock:
            if listener not in self.listeners_button2:
                self.listeners_button2.append(listener)
            
# Create singleton instance of ButtonSensor
button_sensor = ButtonSensor()
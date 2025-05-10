import threading
import time
#from gpiozero import Button




class ButtonSensor:
    def __init__(self):
        self.lock = threading.Lock()
        self.thread = threading.Thread(target=self.worker, daemon=True)
        self.prefix = "Button Sensor"
        self.listeners = []
        # self.button1 = Button(6) #pin31
        # self.button2 = Button(5) #pin29
        # self.button1.when_pressed = when_pressed
        # self.button2.when_pressed = when_pressed

    # def when_pressed():
    #     print("Button pressed!")


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
            btn1State = False # TODO: Replace with actual sensor reading.
            btn2State = False # TODO: Replace with actual sensor reading.
            
            if btn1State and btn2State:
                for listener in self.listeners:
                    listener(btn1State, btn2State)
            
    def get_data(self):
        with self.lock:
            return self.bed_occupancy
        
    def add_listener(self, listener):
        with self.lock:
            if listener not in self.listeners:
                self.listeners.append(listener)
            
# Create singleton instance of ButtonSensor
button_sensor = ButtonSensor()
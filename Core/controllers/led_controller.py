import threading

class LEDController:
    def __init__(self):
        self.lock = threading.Lock()
        self.prefix = "LED Controller"
        self.led_state = False
        self.brightness = 0
        self.color = (255, 255, 255)

    def print(self, *args):
        print(f"[{self.prefix}]", *args)
        
    def set_led(self, state: bool):
        with self.lock:
            self.led_state = state
            # TODO: Code to actually turn on the LED.

    def set_brightness(self, brightness: int):
        with self.lock:
            self.brightness = brightness
            # TODO: Code to actually set the brightness of the LED.

    def set_color(self, color: tuple):
        with self.lock:
            if len(color) == 3 and all(0 <= c <= 255 for c in color):
                self.color = color
            else:
                raise ValueError("Invalid color value.")

            
# Create singleton instance of LEDController
led_controller = LEDController()
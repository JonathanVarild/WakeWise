import threading
import board
import neopixel
import time

class LEDController:
    def __init__(self):
        self.lock = threading.Lock()
        self.prefix = "LED Controller"
        self.led_state = False
        self.brightness = 0.5
        self.color = (100, 255, 255)
        self.pixels = neopixel.NeoPixel(board.D13, 60, brightness=self.brightness, auto_write=False)
    
    def print(self, *args):
        print(f"[{self.prefix}]", *args)

    def set_led(self, state: bool):
        with self.lock:
            self.led_state = state
            print("Setting LED state to:", state, "Brightness:", self.brightness, "Color:", self.color)
            # TODO: Code to actually turn on the LED.
            if state:
                self.pixels.fill(self.color)
                self.pixels.show()
            elif not state:
                self.pixels.fill((0,0,0))
                self.pixels.show()

    def set_brightness(self, brightness: int):
        with self.lock:
            self.print("Setting brightness to:", brightness)
            self.brightness = brightness
            # TODO: Code to actually set the brightness of the LED.
            self.pixels.brightness = brightness
            if self.brightness != 0:
                self.pixels.show()

    def set_color(self, color: tuple):
        with self.lock:
            if len(color) == 3 and all(0 <= c <= 255 for c in color):
                self.color = color
                self.print(f"Setting color to: {color}")
            else:
                raise ValueError("Invalid color value.")
            self.pixels.fill(color)
            if self.brightness != 0:
                self.pixels.show()
    
    # def set_fade(self, fade_in_minutes):
    #      with self.lock:



# Create singleton instance of LEDController
led_controller = LEDController()
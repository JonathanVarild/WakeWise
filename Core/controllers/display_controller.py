import threading

import time
from datetime import datetime

from PIL import Image, ImageDraw
from adafruit_rgb_display import color565 # type: ignore
import adafruit_rgb_display.ili9341 as ili9341 # type: ignore

from utils.display_init import display_height, display_width, init_display
from utils.display_text_module import Text, canvas_size  # assuming your Text class is in a separate file

MAX_DRAWABLES = 10 # Maximum of 10 objects to be drawn on screen (probably xD)

class DisplayController:
    def __init__(self):
        self.lock = threading.Lock()
        self.prefix = "Display Controller"
        self.display = init_display()
        self.bg_color = (0, 0, 0)
        self.drawables = [None] * MAX_DRAWABLES
        self._last_rendered_image = None

    def clear_drawables(self):
        """Clears all drawable objects."""
        with self.lock:
           for i in range(MAX_DRAWABLES):
               self.drawables[i] = None    
        self._last_rendered_image = None
           

    def add_drawable(self, drawable):
        """Add any drawable object that has a 'draw(image)' method."""
        if not hasattr(drawable, 'draw'):
            raise ValueError("Drawable object must implement a 'draw(image)' method.")
        with self.lock:
            for i in range(MAX_DRAWABLES):
                if self.drawables[i] is None:
                    self.drawables[i] = drawable
                    return
            raise MemoryError("Drawable list is full (10 slots used). ")

    def render(self):
        """Renders and displays all images on the display"""
        with self.lock:
            bg = Image.new("RGB", canvas_size, self.bg_color)
            for drawable in self.drawables:
                if drawable is not None:
                    drawable.draw(bg)
            self._last_rendered_image = bg
            self.display.image(bg)
    
# Singleton instance
display_controller = DisplayController()


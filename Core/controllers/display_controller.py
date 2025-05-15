import threading

import time
from datetime import datetime
from utils.configuration_manager import configuration_manager as ConfMng

from PIL import Image, ImageColor, ImageDraw
from adafruit_rgb_display import color565 # type: ignore
import adafruit_rgb_display.ili9341 as ili9341 # type: ignore

from sensors.environment_sensor import environment_sensor as EnvSens

from utils.display_init import display_height, display_width, init_display
from utils.display_text_module import Text, canvas_size  # assuming your Text class is in a separate file
import utils.TextLib as TextLib

MAX_DRAWABLES = 10 # Maximum of 10 objects to be drawn on screen (probably xD)

class DisplayController:
    def __init__(self):
        self.lock = threading.Lock()
        self.prefix = "Display Controller"
        
        self.display = init_display()
        self.bg_color = (0, 0, 0)
        self.drawables = [None] * MAX_DRAWABLES
        self._last_rendered_image = None
        self._last_usr_color = None
        self._last_usr_font_size = None
        self._last_usr_layout_conf = None
        self._last_usr_wakeup_time = None

        self.data = TextLib.data
        self.symbols = TextLib.symbols
        self.add_obj()

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

    def update_text_style(self):
        """Update text object's style properties."""
        usr_color = ImageColor.getrgb(ConfMng.get_config("DISPL", "color"))
        usr_layout_conf = ConfMng.get_config("DISPL", "page_layouts")
        usr_wakeup_time = ConfMng.get_config("ALARM", "wakeup_time")
        
        usr_font_size = ConfMng.get_config("DISPL", "font_size")
        if usr_font_size == 18:
            usr_font_size = "small"
        elif usr_font_size == 24:
            usr_font_size = "medium"
        elif usr_font_size == 30:
            usr_font_size = "large"
        else:
            usr_font_size = "medium"

        excluded_font_objects = [self.data["time"], self.data["date"], self.data["weekday"]]
        self.data["wakeup_time"].update_text(usr_wakeup_time)
        for drawable in self.drawables:
            if isinstance(drawable, Text):
                drawable.update_color(usr_color)
                self._last_usr_color = usr_color

                if drawable not in excluded_font_objects: #not in self.data["time"] or self.data["weekday"] or self.data["date"]:
                    drawable.update_font_size(usr_font_size)
                    self._last_usr_font_size = usr_font_size
                
        # color = ConfMng.get_config("DISPL", "color")
        # color = ImageColor.getrgb(color)
        # target.update_color(color)

        # font_size = ConfMng.get_config("DISPL", "font_size")
        # font_size = font_size.lower()
        # target.update_font_size(font_size)

        self.render()

    def get_usr_info(self):
        usr_color = ImageColor.getrgb(ConfMng.get_config("DISPL", "color"))
        usr_font_size = ConfMng.get_config("DISPL", "font_size")
        usr_layout_conf = ConfMng.get_config("DISPL", "page_layouts")
        usr_wakeup_time = ConfMng.get_config("ALARM", "wakeup_time")

        if (
            usr_color == self._last_usr_color and
            usr_font_size == self._last_usr_font_size and
            usr_layout_conf == self._last_usr_layout_conf and 
            usr_wakeup_time == self._last_usr_wakeup_time
        ):
            return
        self.update_text_style()

    # def calc_symbol_offset():
    #     if data["temp"].offset[0] > 159:
    #         tempsym_x = (data["temp"].offset[0] + 25)
    #         tempsym_y = data["temp"].offset[1] - 5
    #     else:
    #         tempsym_x = (data["temp"].offset[0] - 25)
    #         tempsym_y = data["temp"].offset[1] - 5

    #     symbols["temp"].update_position(offset=(tempsym_x, tempsym_y))

    def add_obj(self):
        self.add_drawable(self.data["time"])
        self.add_drawable(drawable=self.data["date"])
        self.add_drawable(drawable=self.data["weekday"])
        self.add_drawable(drawable=self.data["weeknum"])
        self.add_drawable(drawable=self.data["wakeup_time"])
        
        self.add_drawable(drawable=self.data["temp"])
        self.add_drawable(drawable=self.symbols["temp"])
        
        self.add_drawable(drawable=self.data["humid"])
        self.add_drawable(drawable=self.symbols["humid"])
    
# Singleton instance
display_controller = DisplayController()


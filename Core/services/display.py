import threading
import time
from datetime import datetime
from utils.configuration_manager import configuration_manager

from controllers.display_controller import display_controller as DispCtrl

from sensors.environment_sensor import environment_sensor as EnvSens

from utils.display_init import init_display
from utils.display_text_module import Text, canvas_size
import utils.TextLib as TextLib

from adafruit_rgb_display import color565 # type: ignore
import adafruit_rgb_display.ili9341 as ili9341 # type: ignore

from PIL import Image

class DisplayService:
    def __init__(self):
        self.lock = threading.Lock()
        self.thread = threading.Thread(target=self.worker, daemon=True)
        self.prefix = "Display Service"

        self.drawables = DispCtrl.drawables
        # self.data = TextLib.data
        # self.symbols = TextLib.symbols
        # self.add_obj()

    def print(self, *args):
        print(f"[{self.prefix}]", *args)

    def start(self):
        self.print("Starting thread...")
        self.thread.start()

    def worker(self):
        while True:
            # self.update_data()
            #DispCtrl.update_text_style("time")
            DispCtrl.update_text_style()
            time.sleep(1)
    
    # def update_data(self):
    #     DispCtrl.data["time"].update_text(datetime.now().strftime("%H:%M:%S"))
    #     DispCtrl.data["temp"].update_text(f"{EnvSens.read_temperature()}°C")    
    #     DispCtrl.data["humid"].update_text(f"{EnvSens.read_humidity()}%")
    #     DispCtrl.render()
    
    # def add_obj(self):
    #     DispCtrl.add_drawable(self.data["time"])
    #     DispCtrl.add_drawable(drawable=self.data["temp"])
    #     DispCtrl.add_drawable(drawable=self.data["humid"])
    #     DispCtrl.add_drawable(drawable=self.data["date"])
    #     DispCtrl.add_drawable(drawable=self.data["weekday"])

    #     DispCtrl.add_drawable(drawable=self.symbols["temp"])
    #     DispCtrl.add_drawable(drawable=self.symbols["humid"])

# Create singleton instance of MetricsTracker
display_service = DisplayService()

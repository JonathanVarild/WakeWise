import threading
import time
from datetime import datetime
#from utils.configuration_manager import configuration_manager

from controllers.display_controller import display_controller as DispCtrl

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
        

    def print(self, *args):
        print(f"[{self.prefix}]", *args)

    def start(self):
        self.print("Starting thread...")
        self.thread.start()

    def worker(self):
        group_members = TextLib.group_members
        for ppl, text_obj in group_members.items():
            time_t = Text(datetime.now().strftime("%H:%M:%S"), size_label="xlarge", anchor="center")
            try:
                DispCtrl.add_drawable(drawable=text_obj)
                print(f"Drawable list [{ppl}]")
            except MemoryError:
                self.print("Drawable list full..")
                break
        DispCtrl.add_drawable(drawable=time_t)
        while True:
            time_t.update_text(datetime.now().strftime("%H:%M:%S"))
            self.print("Running worker thread...")
            DispCtrl.render()
            time.sleep(1)
            
# Create singleton instance of MetricsTracker
display_service = DisplayService()

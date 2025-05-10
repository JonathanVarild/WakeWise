import threading
from PIL import Image, ImageDraw
from utils.display_init import display_height, display_width, init_display
from utils.display_text_module import Text  # assuming your Text class is in a separate file

class DisplayController:
    def __init__(self):
        self.lock = threading.Lock()
        self.prefix = "Display Controller"
        self.text_objects = []  # list to hold Text instances
        self.display = init_display()

    def print(self, *args):
        print(f"[{self.prefix}]", *args)

    def add_text(self, text_obj):
        with self.lock:
            self.text_objects.append(text_obj)
            self.print(f"Added text: '{text_obj.text}'")

    def clear_texts(self):
        with self.lock:
            self.text_objects.clear()
            self.print("Cleared all text objects.")

    def render(self):
        with self.lock:
            image = Image.new("RGB", (display_width, display_height), (0, 0, 0))
            for text_obj in self.text_objects:
                text_obj.draw(image)
            self.print("Rendered image with all text objects.")
            return image

    def show(self):
        image = self.render()
        self.display.image(image)
        self.print("Image shown on display.")

# Singleton instance
display_controller = DisplayController()


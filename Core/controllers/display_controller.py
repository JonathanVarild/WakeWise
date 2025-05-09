import threading

class DisplayController:
    def __init__(self):
        self.lock = threading.Lock()
        self.prefix = "Display Controller"

    def print(self, *args):
        print(f"[{self.prefix}]", *args)
        
# Create singleton instance of DisplayController
display_controller = DisplayController()
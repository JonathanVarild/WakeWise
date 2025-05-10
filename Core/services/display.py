import threading
import time
from utils.configuration_manager import configuration_manager

class DisplayService:
    def __init__(self):
        self.lock = threading.Lock()
        self.thread = threading.Thread(target=self.worker, daemon=True)
        self.prefix = "Display Service"

    def print(self, *args):
        print(f"[{self.prefix}]", *args)

    def start(self):
        self.print("Starting thread...")
        self.thread.start()

    def worker(self):
        while True:
            time.sleep(1)
            self.print("Running worker thread...")
            
            
# Create singleton instance of MetricsTracker
display_service = DisplayService()

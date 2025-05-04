import threading
import time

class MetricsTracker:
    def __init__(self):
        self.lock = threading.Lock()
        self.thread = threading.Thread(target=self.worker, daemon=True)
        self.prefix = "Metrics Tracker"

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
metrics_tracker = MetricsTracker()
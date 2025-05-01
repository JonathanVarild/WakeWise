import threading
import time

class MetricsTracker:
    def __init__(self):
        self.lock = threading.Lock()
        self.thread = threading.Thread(target=self.worker, daemon=True)

    def start(self):
        print("[Metrics Tracker] Starting thread...")
        self.thread.start()

    def worker(self):
        while True:
            time.sleep(1)
            print("[Metrics Tracker] Running worker thread...")
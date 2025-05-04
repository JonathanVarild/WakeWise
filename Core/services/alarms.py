import threading
import time
from utils.configuration_manager import configuration_manager

class AlarmService:
    def __init__(self):
        self.lock = threading.Lock()
        self.thread = threading.Thread(target=self.worker, daemon=True)
        self.prefix = "Alarm Service"
        self.alarm_triggered = False

    def print(self, *args):
        print(f"[{self.prefix}]", *args)

    def start(self):
        self.print("Starting thread...")
        self.thread.start()

    def worker(self):
        while True:
            time.sleep(1)
            wakeup_time = configuration_manager.get_config("ALARM", "wakeup_time")
            current_time = time.strftime("%H:%M")
            
            self.print("Checking wakeup time vs current time: ", current_time, wakeup_time)

            with self.lock:
                if current_time == wakeup_time and not self.alarm_triggered:
                    self.alarm_triggered = True
                    self.print("Alarm! Time to wake up!")
                    # TODO: Trigger external alarm

    def get_state(self):
        with self.lock:
            return {
                "alarm_triggered": self.alarm_triggered
            }

# Create singleton instance of AlarmService
alarm_service = AlarmService()
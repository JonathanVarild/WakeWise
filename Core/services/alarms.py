import threading
import time
from utils.database import query

class AlarmService:
    def __init__(self):
        self.wakeup_time = "08:00"
        self.alarm_triggered = False
        self.lock = threading.Lock()
        self.thread = threading.Thread(target=self.worker, daemon=True)

    def load_config(self):
        config = query("SELECT json_value FROM configuration_pairs WHERE id = 'ALARM'")
        data = config[0][0]
        with self.lock:
            self.wakeup_time = data.get('wakeup_time', self.wakeup_time)
        print(f"[AlarmService] Alarm wakeup time set to {self.wakeup_time}")

    def start(self):
        print("[AlarmService] Starting thread...")
        self.load_config()
        self.thread.start()

    def worker(self):
        with self.lock:
            print("Got state wakeup_time:", self.wakeup_time)
            print("Got state alarm_triggered:", self.alarm_triggered)

        while True:
            time.sleep(1)
            current_time = time.strftime("%H:%M")
            print("Checking time:", current_time)

            with self.lock:
                if current_time == self.wakeup_time and not self.alarm_triggered:
                    self.alarm_triggered = True
                    print("Alarm! Time to wake up!")
                    # TODO: Trigger external alarm

    def get_state(self):
        with self.lock:
            return {
                "wakeup_time": self.wakeup_time,
                "alarm_triggered": self.alarm_triggered
            }

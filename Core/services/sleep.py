# Disclaimer: Little assistance was provided by AI when writing this file to improve work efficency.
import threading
import time
import datetime as dt

from utils.configuration_manager import configuration_manager
from utils.database import query
from sensors.bed_sensor import bed_sensor

SLEEP_DETECTION_MINUTES = 15
OVERSLEEP_HOURS = 8
OVERSLEEP_DELTA = dt.timedelta(hours=OVERSLEEP_HOURS)

class SleepService:
    def __init__(self):
        self.lock = threading.Lock()
        self.thread = threading.Thread(target=self.worker, daemon=True)
        self.prefix = "Sleep Service"

        self.current_sleep_id = None
        self.planned_sleep_end_time = None
        self.planned_sleep_start_time = None

        self.bed_sensor_active_since = None
        self.is_sleeping = False

    def print(self, *args):
        print(f"[{self.prefix}]", *args)

    def start(self):
        self.print("Starting thread…")
        bed_sensor.add_listener(self.detect_bed_sensor)
        self.create_sleep()
        self.thread.start()

    def worker(self):
        while True:
            time.sleep(1)
            now = dt.datetime.now()

            with self.lock:
                if (not self.is_sleeping and self.bed_sensor_active_since is not None and self.bed_sensor_active_since < now - dt.timedelta(minutes=SLEEP_DETECTION_MINUTES)):
                    self.is_sleeping = True
                    query("UPDATE sleep_history SET actual_start = COALESCE(actual_start,%s) WHERE id = %s", (self.bed_sensor_active_since, self.current_sleep_id),)
                    self.print("User now detected as sleeping")

                if (self.planned_sleep_end_time is not None and now > self.planned_sleep_end_time + OVERSLEEP_DELTA):
                    self.create_sleep()

    def create_sleep(self):
        with self.lock:
            self.is_sleeping = False
            self.bed_sensor_active_since = None

            sleep_goal = configuration_manager.get_config("ALARM", "sleep_goal")
            wakeup_cfg = configuration_manager.get_config("ALARM", "wakeup_time")

            today = dt.date.today()
            wake_clock = dt.datetime.strptime(wakeup_cfg, "%H:%M").time()
            planned_end = dt.datetime.combine(today, wake_clock)
            if planned_end < dt.datetime.now():
                planned_end += dt.timedelta(days=1)
            planned_start = planned_end - dt.timedelta(hours=float(sleep_goal))

            row = query("SELECT id FROM sleep_history WHERE planned_end::date = %s::date LIMIT 1", (planned_end.date(),),)

            self.planned_sleep_end_time = planned_end
            self.planned_sleep_start_time = planned_start

            if row:
                self.current_sleep_id = row[0][0]
                self.print("Existing sleep found with ID:", self.current_sleep_id)
                return

            result = query("INSERT INTO sleep_history (planned_start, planned_end, recordings_enabled, ambient_noise_enabled) VALUES (%s,%s,%s,%s) RETURNING id", (planned_start, planned_end, True, True),)
            self.current_sleep_id = result[0][0]
            self.print("Sleep created with ID:", self.current_sleep_id)

    def detect_bed_sensor(self, state):
        now = dt.datetime.now()
        with self.lock:
            if state:
                if not self.is_sleeping and self.bed_sensor_active_since is None:
                    self.bed_sensor_active_since = now
                    self.print("Bed sensor activated at:", now)
            else:
                if self.is_sleeping:
                    query("UPDATE sleep_history SET actual_end = %s WHERE id = %s", (now, self.current_sleep_id),)
                    self.print("Bed sensor deactivated, sleep ended at:", now)
                self.is_sleeping = False
                self.bed_sensor_active_since = None

    def get_sleep_id(self):
        with self.lock:
            if (self.planned_sleep_end_time is not None and dt.datetime.now() > self.planned_sleep_end_time + OVERSLEEP_DELTA):
                self.create_sleep()
            return self.current_sleep_id
        
    def get_planned_start_time(self):
        with self.lock:
            return self.planned_sleep_start_time
        
    def get_planned_end_time(self):
        with self.lock:
            return self.planned_sleep_end_time

sleep_service = SleepService()

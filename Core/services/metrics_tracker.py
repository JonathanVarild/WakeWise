import threading
import time
from utils.database import query
from services.sleep import sleep_service
from datetime import datetime
from sensors.bed_sensor import bed_sensor
from sensors.environment_sensor import environment_sensor
from sensors.phone_sensor import phone_sensor

class MetricsTrackerService:
    def __init__(self):
        self.lock = threading.Lock()
        self.thread = threading.Thread(target=self.worker, daemon=True)
        self.prefix = "Metrics Tracker Service"
        self.current_bed_sensor_id = None
        self.bed_sensor_active_since = None
        self.current_phone_sensor_id = None

    def print(self, *args):
        print(f"[{self.prefix}]", *args)

    def start(self):
        self.print("Starting thread...")
        query("DELETE FROM bed_occupancy WHERE duration IS NULL")
        query("DELETE FROM phone_occupancy WHERE duration IS NULL")
        bed_sensor.add_listener(self.detect_bed_sensor)
        self.thread.start()

    def worker(self):
        while True:
            time.sleep(900)
            if sleep_service.is_sleeping:
                temp, humidity = environment_sensor.get_sensors()
                query("INSERT INTO environment_history (sleep_id, stored_on, room_temperature, room_humidity) VALUES (%s, %s, %s, %s)", 
                      (sleep_service.get_sleep_id(), datetime.now(), temp, humidity))
                self.print("Inserted environment data:", temp, humidity)
            
    def detect_bed_sensor(self, state):
        with self.lock:
            if state:
                result = query("INSERT INTO bed_occupancy (sleep_id, start_timestamp) VALUES (%s, %s) RETURNING id", (sleep_service.get_sleep_id(), datetime.now()))
                self.current_bed_sensor_id = result[0][0]
                self.bed_sensor_active_since = datetime.now()
                self.print("Bed sensor activated, ID:", self.current_bed_sensor_id)
            else:
                if self.current_bed_sensor_id is not None:
                    duration = (datetime.now() - self.bed_sensor_active_since).total_seconds() / 60
                    query("UPDATE bed_occupancy SET duration = %s WHERE id = %s", (duration, self.current_bed_sensor_id))
                    
                    self.print("Bed sensor deactivated, ID:", self.current_bed_sensor_id)
                    
                    self.current_bed_sensor_id = None
                    self.bed_sensor_active_since = None
                    
                else:
                    self.print("Bed sensor deactivated, but no active ID found.")

    def detect_phone_sensor(self, state):
        with self.lock:
            if state:
                result = query("INSERT INTO phone_occupancy (sleep_id, start_timestamp) VALUES (%s, %s) RETURNING id", (sleep_service.get_sleep_id(), datetime.now()))
                self.current_phone_sensor_id = result[0][0]
                self.print("Phone sensor activated, ID:", self.current_phone_sensor_id)
            else:
                if self.current_phone_sensor_id is not None:
                    duration = (datetime.now() - self.bed_sensor_active_since).total_seconds() / 60
                    query("UPDATE phone_occupancy SET duration = %s WHERE id = %s", (duration, self.current_phone_sensor_id))
                    
                    self.print("Phone sensor deactivated, ID:", self.current_phone_sensor_id)
                    
                    self.current_phone_sensor_id = None
                    
                else:
                    self.print("Phone sensor deactivated, but no active ID found.")

# Create singleton instance of MetricsTracker
metrics_tracker_service = MetricsTrackerService()
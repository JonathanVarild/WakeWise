import threading
import time
from datetime import datetime
from services.sleep import sleep_service
from utils.configuration_manager import configuration_manager
from sensors.phone_sensor import phone_sensor
from utils.notifications_manager import notifications_manager
from controllers.speaker_controller import speaker_controller
from services.alarms import alarm_service

class PhoneTrackerService:
    def __init__(self):
        self.lock = threading.Lock()
        self.thread = threading.Thread(target=self.worker, daemon=True)
        self.prefix = "Phone Tracker Service"

    def print(self, *args):
        print(f"[{self.prefix}]", *args)

    def start(self):
        self.print("Starting thread...")
        phone_sensor.add_listener(self.detect_phone_sensor)
        self.thread.start()

    def worker(self):
        while True:
            time.sleep(5)
            
            start_time = sleep_service.get_planned_start_time()
            end_time = sleep_service.get_planned_end_time()
            now = datetime.now()
            
            if start_time <= now <= end_time and not phone_sensor.get_occupancy():
                self.print("Phone is used during sleep hours. Notifying user...")
                self.notify_user()
                time.sleep(180)
                
    def detect_phone_sensor(self, state):
        with self.lock:
            start_time = sleep_service.get_planned_start_time()
            end_time = sleep_service.get_planned_end_time()
            now = datetime.now()
            
            if not state and (start_time <= now <= end_time):
                self.print("Phone sensor activated during sleep hours")
                self.notify_user()

    def notify_user(self):
        alert_type = configuration_manager.get_config("SCRNT", "alert_type")
    
        if alert_type == "phone" or alert_type == "clockphone":
            notifications_manager.send_notification("Phone Usage Alert", "Your phone is being used during sleep hours. Put it away!")
            return
        if (alert_type == "clock" or alert_type == "clockphone") and not alarm_service.alarm_triggered:
            speaker_controller.play_single_sound("tripple_beep.mp3")
            return
    
            
# Create singleton instance of MetricsTracker
phone_tracker_service = PhoneTrackerService()
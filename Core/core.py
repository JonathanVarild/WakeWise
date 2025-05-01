from services.alarms import AlarmService
from services.metrics_tracker import MetricsTracker
import time

# Start threads.
alarm_service = AlarmService()
alarm_service.start()

# metrics_tracker = MetricsTracker()
# metrics_tracker.start()

# Wait for threads to finish.
try:
    while True:
        time.sleep(1)
except KeyboardInterrupt:
    print("Shutting down...")
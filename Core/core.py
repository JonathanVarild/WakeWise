import time
from services.alarms import alarm_service
from services.metrics_tracker import metrics_tracker
from services.configuration_manager import configuration_manager

# Start threads.
configuration_manager.start()
alarm_service.start()
# metrics_tracker.start()

# Wait for threads to finish.
try:
    while True:
        time.sleep(1)
except KeyboardInterrupt:
    print("Shutting down...")
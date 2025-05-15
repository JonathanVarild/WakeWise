import time
import pygame
from utils.configuration_manager import configuration_manager

from sensors.bed_sensor import bed_sensor
from sensors.button_sensor import button_sensor
from sensors.environment_sensor import environment_sensor
from sensors.phone_sensor import phone_sensor

from services.alarms import alarm_service
from services.metrics_tracker import metrics_tracker_service
from services.sleep import sleep_service
from services.display import display_service
from services.recordings import recordings_service
from services.ambient_noise import ambient_noise_service

from controllers.led_controller import led_controller
from controllers.display_controller import display_controller

led_controller.set_led(False)

# Start utility threads.
configuration_manager.start()

# Start sensor threads.
bed_sensor.start()
button_sensor.start()
environment_sensor.start()
phone_sensor.start()

# Start services threads.
alarm_service.start()
metrics_tracker_service.start()
sleep_service.start()
display_service.start()
#recordings_service.start()
#ambient_noise_service.start()

# Wait for threads to finish.
try:
    while True:
        time.sleep(1)
except KeyboardInterrupt:
    print("Shutting down...")

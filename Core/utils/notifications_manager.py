NOTIFY_ALL = 1
NOTIFY_USER = 2
NOTIFY_ADMIN = 3

class NotificationsManager:
    def __init__(self):
        self.prefix = "Notifications Manager"

    def print(self, *args):
        print(f"[{self.prefix}]", *args)
        
    def send_notification(self, title, message):
        # TODO: Send request to notification service
        return

# Create singleton instance of NotificationsManager
notifications_manager = NotificationsManager()
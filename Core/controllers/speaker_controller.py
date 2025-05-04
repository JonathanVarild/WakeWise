import threading

class SpeakerController:
    def __init__(self):
        self.lock = threading.Lock()
        self.prefix = "Speaker Controller"

    def print(self, *args):
        print(f"[{self.prefix}]", *args)
        
# Create singleton instance of SpeakerController
speaker_controller = SpeakerController()
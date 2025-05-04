import threading
import time
from utils.database import query

class ConfigurationManager:
    def __init__(self):
        self.lock = threading.Lock()
        self.thread = threading.Thread(target=self.worker, daemon=True)
        self.prefix = "Configuration Manager"
        self.config = {}
        
    def print(self, *args):
        print(f"[{self.prefix}]", *args)
        
    def start(self):
        self.print("Starting thread...")
        self.load_config()
        self.thread.start()

    def worker(self):
        while True:
            # Can be made much more efficient but works for this prototype.
            time.sleep(5)
            self.load_config()
            
    def load_config(self):
        retrievedConfig = query("SELECT * FROM configuration_pairs")
        with self.lock:
            self.config = {}
            for row in retrievedConfig:
                key = row[0]
                value = row[1]
                self.config[key] = value
            
    def get_config(self, module, key):
        with self.lock:
            return self.config.get(module, None).get(key, None)
            
# Create singleton instance of ConfigurationManager
configuration_manager = ConfigurationManager()
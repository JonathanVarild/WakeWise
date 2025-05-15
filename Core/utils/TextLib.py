# Library for pre-defined/reusable text through the project

from .display_text_module import Text
from datetime import datetime

from sensors.environment_sensor import environment_sensor as EnvSens

# --- Group Members ---
group_members = {
    "arvin": Text("Arvin.K", anchor="center"),
    "flora": Text("Flora.L", anchor="bottom-center"),
    "johan": Text("Johan.L", anchor="bottom-left"),
    "philip": Text("Philip.D", anchor="bottom-right"),
    "yunzhu": Text("Yunzhu.T", anchor="top-left"),
    "jonathan": Text("Jonathan.V", anchor="top-right")
}
# ---------------------

# --- Data ---
data = {
    "time": Text(
        text = datetime.now().strftime("%H:%M"), 
        size_label = "xlarge", 
        anchor = "center"
    ),
    "date": Text(
        text=datetime.today().strftime("%d/%m/%Y"), 
        size_label="ml",
        anchor="center",
        offset=(0, 45)
    ),
    "weekday": Text(
        text=datetime.today().strftime("%A"), 
        size_label="medium",
        anchor="center",
        offset=(0, 75)
    ),
    "weeknum": Text(
        text = "Vecka: " + datetime.today().strftime("%V"),
        size_label = "medium",
        anchor = "bottom-left",
        offset = (0, 0)
    ),
    "temp": Text(
        text = f"{EnvSens.read_temperature()}°C",
        size_label = "medium",
        anchor = "top-left",
        offset = (30, 20)
    ),
    "humid": Text(
        text = f"{EnvSens.read_humidity()}%",
        size_label = "medium",
        anchor = "top-left",
        offset = (30, 50)
    ),
    "wakeup_time": Text(
        text = "\udb80\udc20",
        size_label = "medium",
        anchor = "bottom-right",
        offset = (0, 0)
    )
}
# ---------------------

# --- Symbols ---
symbols = {
    "temp": Text(
        text = "\ue20a",
        size_label = "large",
        offset=(data["temp"].offset[0] - 25, data["temp"].offset[1] - 5)
    ),
    "humid": Text(
        text = "\ue373",
        size_label = "large",
        offset=(data["humid"].offset[0] - 25, data["humid"].offset[1] - 5)
    ),
}
# ---------------------
        
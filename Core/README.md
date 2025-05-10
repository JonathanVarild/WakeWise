# Clock Core
## Implementation
Will be responsible for core systems inside the clock such as sensory input, display, time-keeping, etc. Services and sensor listeners will be implemented as Threads from core.py script. Inter-process communication between threads will be handled using In-memory Event Bus.

## Development
* Development server reloads automatically when a file change is detected. (errors may be seen)
* Start in Linux `docker-compose up --build`
* Start in other environment `docker-compose -f docker-compose.yml up --build`
* Delete build with `docker-compose down -v`

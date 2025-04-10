# Sound Recorder
## Implementation
Will listen for recordings and save them when a certain volume threshold is met. Listens for signals using HTTP from core when to start recording, etc.

## Development
* Development server reloads automatically when a file change is detected. (errors may be seen)
* Start with `docker-compose up --build`
* Delete build with `docker-compose down -v`

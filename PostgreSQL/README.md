# PostgreSQL Database
## Implementation
Docker container for hosting PostgreSQL server. Used for storing various data such as configurations, metadata, etc.

## Development
* Start with `docker-compose up --build`
* Delete build with `docker-compose down -v`

## Connect 
* psql -U wakewise -d wakewise -h 127.0.0.1 -p 5432

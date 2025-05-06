# PostgreSQL Database
## Implementation
Docker container for hosting PostgreSQL server. Used for storing various data such as configurations, metadata, etc.

## Development
* Start with to build database with mock data  `docker-compose up --build`
* Start without any data `docker-compose -f docker-compose.yml up --build`
* Delete build with `docker-compose down -v`

## Production
* Start with `docker-compose -f docker-compose.yml up --build`

## Connect 
* psql -U wakewise -d wakewise -h 127.0.0.1 -p 5432


QUERY-NOTE:
SELECT files_metadata.id, files_metadata.file_name, recordings.is_favorite, recordings.user_note AS user_note, files_metadata.created_at
FROM files_metadata 
FULL OUTER JOIN recordings ON files_metadata.id=recordings.file_id;
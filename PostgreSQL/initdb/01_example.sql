\echo 'Running init script...'

CREATE TABLE IF NOT EXISTS example (
    id SERIAL PRIMARY KEY,
    some_text TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
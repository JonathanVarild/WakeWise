CREATE TABLE environment_history (
	id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	sleep_id INT NOT NULL REFERENCES sleep_history(id),
	stored_on TIMESTAMPTZ NOT NULL,
	room_temperature NUMERIC(3, 1) NOT NULL,
	room_humidity SMALLINT NOT NULL CHECK (room_humidity BETWEEN 0 AND 100)
);

CREATE INDEX idx_environment_sleep_id ON environment_history (sleep_id);
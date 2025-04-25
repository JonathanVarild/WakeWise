CREATE TABLE phone_occupancy (
	id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	sleep_id INT NOT NULL REFERENCES sleep_history(id),
	start_timestamp TIMESTAMPTZ NOT NULL,
	duration INT
);

CREATE INDEX idx_phone_occupancy_sleep_id ON phone_occupancy (sleep_id);
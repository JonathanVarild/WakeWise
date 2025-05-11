CREATE TABLE recordings (
	id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	file_id INT NOT NULL UNIQUE REFERENCES files_metadata(id),
	sleep_id INT NOT NULL REFERENCES sleep_history(id),
	start_time TIMESTAMPTZ NOT NULL,
	duration_seconds INT NOT NULL,
	peak_volume SMALLINT NOT NULL,
	is_favorite BOOLEAN NOT NULL DEFAULT FALSE,
	user_note VARCHAR(500)
);

CREATE INDEX idx_recordings_sleep_id ON recordings (sleep_id);
CREATE INDEX idx_recordings_start_time ON recordings (start_time);
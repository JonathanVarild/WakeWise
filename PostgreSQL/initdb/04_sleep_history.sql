CREATE TABLE sleep_history (
	id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	planned_start TIMESTAMPTZ NOT NULL,
	planned_end TIMESTAMPTZ NOT NULL,
	actual_start TIMESTAMPTZ,
	actual_end TIMESTAMPTZ,
	recordings_enabled BOOLEAN,
	ambient_noise_enabled BOOLEAN,
	score SMALLINT CHECK (score BETWEEN 0 AND 100),
	time_in_bed INT,
	total_phone_use INT,
	user_note VARCHAR(500)
);

CREATE INDEX idx_sleep_history_planned_start ON sleep_history (planned_start);
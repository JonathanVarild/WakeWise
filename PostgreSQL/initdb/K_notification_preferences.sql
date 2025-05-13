CREATE TABLE notification_preferences (
	listener_id INT PRIMARY KEY REFERENCES notification_listeners(id),
	not_in_bed BOOLEAN NOT NULL,
	time_to_sleep BOOLEAN NOT NULL,
	put_away_phone BOOLEAN NOT NULL,
	get_up BOOLEAN NOT NULL
);
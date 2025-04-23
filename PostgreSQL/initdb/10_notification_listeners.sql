CREATE TABLE notification_listeners (
	id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	user_id INT NOT NULL REFERENCES users(id),
	url_endpoint TEXT NOT NULL,
	client_pub_key TEXT NOT NULL,
	auth_secret TEXT NOT NULL,
	platform platform_enum NOT NULL,
	created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_notif_listeners_user_id ON notification_listeners (user_id);
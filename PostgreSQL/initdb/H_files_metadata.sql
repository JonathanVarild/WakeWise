CREATE TABLE files_metadata (
	id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	file_name VARCHAR(50) NOT NULL,
	mime_type VARCHAR(50) NOT NULL,
	size_bytes BIGINT NOT NULL,
	created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
	updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TRIGGER tg_files_metadata_updated BEFORE UPDATE ON files_metadata FOR EACH ROW EXECUTE FUNCTION trigger_on_update();
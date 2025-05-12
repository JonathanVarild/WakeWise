-- Enumerations for defining platforms.
CREATE TYPE platform_enum AS ENUM ('android', 'ios', 'desktop', 'other');

-- Trigger function to update "updated_at" when row is updated.
CREATE OR REPLACE FUNCTION trigger_on_update() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN
	NEW.updated_at := now();
	RETURN NEW;
END;
$$;
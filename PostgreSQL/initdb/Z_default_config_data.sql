-- SQLBook: Code
INSERT INTO configuration_pairs (id, json_value)
VALUES
    /* Alarm settings */
    (
        'ALARM',
        '{
            "wakeup_time": "07:00",
            "sleep_goal": 8
        }'::jsonb
    ),
    /* Light settings */
    (
        'LIGHT',
        '{
            "color": "#ffe55c",
            "brightness": 80,
            "fade_in_minutes": 20
        }'::jsonb
    ),
    /* Sound settings */
    (
        'SOUND',
        '{
            "wakeup_sound": "lofi_alarm",
            "volume": 50,
            "fade_in_seconds": 120
        }'::jsonb
    ),
    /* Display settings */
    (
        'DISPL',
        '{
            "page_layouts": [
                [1, 2, 3, 4],
                [5, 6, 7, 8]
            ],
            "font_size": 14,
            "color": "#ff7626"
        }'::jsonb
    ),
    /* Microphone settings */
    (
        'MICRO',
        '{
            "before_sleep_delay_minutes": 10,
            "activation_threshold_db": -40,
            "recording_lifespan_days": 30
        }'::jsonb
    ),
    /* Screen-time settings */
    (
        'SCRNT',
        '{
            "allowed_before_sleep_minutes": 1,
            "allowed_after_wake_minutes": 10,
            "alert_type": "clockphone"
        }'::jsonb
    ),
    /* Routines settings */
    (
        'ROUTN',
        '{
            "max_time_in_bed_after_wakeup_minutes": 20,
            "must_be_in_bed_before_minutes": 15
        }'::jsonb
    ),
    /* System settings */
    (
        'SYSSE',
        '{
            "time_zone": "Europe/Stockholm",
            "theme": "light"
        }'::jsonb
    );

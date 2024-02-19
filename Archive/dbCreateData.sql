
-- update flask start_date


UPDATE flasks
SET start_date = '2024-01-20 08:00 AM PST'::timestamptz
WHERE flask_id = 1;


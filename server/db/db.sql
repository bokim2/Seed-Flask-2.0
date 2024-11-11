-- CREATE TABLE users (
--   user_id BIGSERIAL NOT NULL PRIMARY KEY,
--   username VARCHAR(50) NOT NULL UNIQUE,
--   password VARCHAR(100) NOT NULL,
--   email VARCHAR(50) NOT NULL UNIQUE,
--   first_name VARCHAR(50) NOT NULL,
--   last_name VARCHAR(50) NOT NULL,
--   date_timestamptz TIMESTAMPTZ DEFAULT (current_timestamp AT TIME ZONE 'UTC')
);

CREATE TABLE cell_banks (
    cell_bank_id BIGSERIAL NOT NULL PRIMARY KEY,
    strain VARCHAR(50),
    notes TEXT,
    target_molecule TEXT,
    description TEXT,
    date_timestamptz TIMESTAMPTZ DEFAULT (current_timestamp AT TIME ZONE 'UTC'),
    project VARCHAR(250),
    username VARCHAR(250),
    user_id VARCHAR(250)
);




-- INSERT INTO cell_banks (strain, notes, target_molecule, description) values ( 'Aspergillus', 'cell bank: 32C cultivation in test tube.  Final OD600 2.4.', 'alpha amylase', 'secrete alpha amylase for dish detergent applications.  for project Cloudberry. no inducer, constitutive expression.');



-- Create the enum type for vessel_type
CREATE TYPE vessel_type AS ENUM ('flask', 'test tube', '96_well plate', '24 well plate');


CREATE TABLE flasks (
flask_id BIGSERIAL NOT NULL,
vessel_type vessel_type NOT NULL,
media VARCHAR(255) NOT NULL,
inoculum_uL REAL, 
media_mL REAL, 
temp_c REAL NOT NULL,
rpm REAL NOT NULL,
start_date TIMESTAMPTZ DEFAULT (current_timestamp AT TIME ZONE 'UTC'),
    username VARCHAR(250),
    user_id VARCHAR(250),
PRIMARY KEY(flask_id),
cell_bank_id INT NOT NULL,
FOREIGN KEY (cell_bank_id) REFERENCES cell_banks(cell_bank_id)
);

-- trigger function to update all time intervals on samples when flask start_date is updated.

CREATE OR REPLACE FUNCTION flasks_update_time_since_inoc_hr()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if the start_date of the associated flask is updated
  IF NEW.start_date IS DISTINCT FROM OLD.start_date THEN
    -- Update time_since_inoc_hr for all samples associated with the flask_id
    UPDATE samples s
    SET time_since_inoc_hr = EXTRACT(EPOCH FROM (s.end_date - NEW.start_date)) / 3600.0 -- Convert to hours
    FROM flasks f
    WHERE s.flask_id = NEW.flask_id AND f.flask_id = NEW.flask_id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER flasks_after_insert_update_time_since_inoc_hr
AFTER UPDATE ON flasks
FOR EACH ROW
EXECUTE FUNCTION flasks_update_time_since_inoc_hr();

-- UPDATE flasks
-- SET start_date = '2024-01-20 06:00 AM PST'::timestamptz
-- WHERE flask_id = 1;



-- INSERT INTO flasks (vessel_type, inoculum_uL, media_mL, cell_bank_id)
-- VALUES ('flask', 50, 250, 1);

-- INSERT INTO flasks (vessel_type, inoculum_uL, media_mL, cell_bank_id)
-- VALUES ('flask', 25, 500, 1);


-- SAMPLE TABLE 

-- Drop the existing samples table
DROP TABLE IF EXISTS samples;

-- Create the samples table with the desired columns
CREATE TABLE samples (
  sample_id BIGSERIAL NOT NULL PRIMARY KEY,
  flask_id BIGINT NOT NULL,
  end_date TIMESTAMPTZ DEFAULT (current_timestamp AT TIME ZONE 'UTC'),
  od600 REAL NOT NULL,
  completed BOOLEAN DEFAULT false,
    username VARCHAR(250),
    user_id VARCHAR(250),
  time_since_inoc_hr REAL, -- Updated data type
  FOREIGN KEY (flask_id) REFERENCES flasks(flask_id)
);

-- Trigger functions to update time_since_inoc_hr in hours

CREATE OR REPLACE FUNCTION calculate_time_since_inoc_hr_before_insert()
RETURNS TRIGGER AS $$
BEGIN
    -- Calculate and set time_since_inoc_hr for the new row
    NEW.time_since_inoc_hr := EXTRACT(EPOCH FROM (NEW.end_date - (SELECT start_date FROM flasks WHERE flask_id = NEW.flask_id))) / 3600.0;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create or replace the BEFORE INSERT trigger
DROP TRIGGER IF EXISTS before_insert_calculate_time_since_inoc_hr ON samples;
CREATE TRIGGER before_insert_calculate_time_since_inoc_hr
BEFORE INSERT ON samples
FOR EACH ROW
EXECUTE FUNCTION calculate_time_since_inoc_hr_before_insert();


CREATE OR REPLACE FUNCTION calculate_time_since_inoc_hr_after_update()
RETURNS TRIGGER AS $$
BEGIN
    -- Update time_since_inoc_hr for the updated row
    UPDATE samples
    SET time_since_inoc_hr = EXTRACT(EPOCH FROM (NEW.end_date - (SELECT start_date FROM flasks WHERE flask_id = NEW.flask_id))) / 3600.0
    WHERE sample_id = NEW.sample_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create or replace the AFTER UPDATE trigger
DROP TRIGGER IF EXISTS after_update_calculate_time_since_inoc_hr ON samples;
CREATE TRIGGER after_update_calculate_time_since_inoc_hr
AFTER UPDATE OF end_date ON samples
FOR EACH ROW
EXECUTE FUNCTION calculate_time_since_inoc_hr_after_update();


-- Insert a sample to test the trigger
-- INSERT INTO samples (flask_id, od600) VALUES (1, 4.2);
-- INSERT INTO samples (flask_id, od600) VALUES (2, 3.1);

-- INSERT INTO samples (flask_id, od600) VALUES (1, 7.8);
-- INSERT INTO samples (flask_id, od600) VALUES (2, 9.4);

-- INSERT INTO samples (flask_id, od600) VALUES (1, 9.1);
-- INSERT INTO samples (flask_id, od600) VALUES (2, 10.1);


-- SCHEDULES

CREATE TABLE IF NOT EXISTS schedules (
    schedule_id BIGSERIAL NOT NULL PRIMARY KEY,
    start_date TIMESTAMP NOT NULL,
    time_since_inoc_hr REAL NOT NULL,
    notes VARCHAR(500),
    username VARCHAR(250) NOT NULL,
    user_id VARCHAR(250) NOT NULL,
    flask_bookmark INT[],
    current_flasks INT[],
    flask_id INT,
    CONSTRAINT fk_flask_id FOREIGN KEY (flask_id) REFERENCES flasks (flask_id)
);


-- INSERT INTO schedules (
--     start_date,
--     time_since_inoc_hr,
--     notes,
--     username,
--     flask_bookmark,
--     flask_id
--   )
-- VALUES (
--     '2023-03-14 10:00:00',
--     5,
--     'testing bk notes',
--     'Bo Kim',
--     '{1,42}',
--     null
--   );

--   INSERT INTO schedules (
--     start_date,
--     time_since_inoc_hr,
--     notes,
--     username,
--     flask_bookmark,
--     flask_id
--   )
-- VALUES (
--     '2023-03-14 11:00:00',
--     24,
--     'testing2 bk notes',
--     'Bo Kim',
--     '{1,42,2}',
--     42
--   );
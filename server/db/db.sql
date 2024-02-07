-- CREATE TABLE users (
--   user_id BIGSERIAL NOT NULL PRIMARY KEY,
--   username VARCHAR(50) NOT NULL UNIQUE,
--   password VARCHAR(100) NOT NULL,
--   email VARCHAR(50) NOT NULL UNIQUE,
--   first_name VARCHAR(50) NOT NULL,
--   last_name VARCHAR(50) NOT NULL,
--   date_timestamptz TIMESTAMPTZ DEFAULT (current_timestamp AT TIME ZONE 'UTC')
);

-- CREATE TABLE cell_banks (
--     cell_bank_id BIGSERIAL NOT NULL PRIMARY KEY,
--     strain VARCHAR(50),
--     notes TEXT,
--     target_molecule TEXT,
--     description TEXT,
--     date_timestamptz TIMESTAMPTZ DEFAULT (current_timestamp AT TIME ZONE 'UTC')
-- );



-- INSERT INTO cell_banks (strain, notes, target_molecule, description) values ( 'Aspergillus', 'cell bank: 32C cultivation in test tube.  Final OD600 2.4.', 'alpha amylase', 'secrete alpha amylase for dish detergent applications.  for project Cloudberry. no inducer, constitutive expression.');



-- Create the enum type for vessel_type
CREATE TYPE vessel_type AS ENUM ('flask', 'test_tube', '96_well_plate', '24_well_plate');


CREATE TABLE flasks (
flask_id BIGSERIAL NOT NULL,
vessel_type vessel_type NOT NULL,
media VARCHAR(255) NOT NULL,
inoculum_uL REAL, 
media_mL REAL, 
temp_c REAL NOT NULL,
rpm REAL NOT NULL,
start_date TIMESTAMPTZ DEFAULT (current_timestamp AT TIME ZONE 'UTC'),
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

UPDATE flasks
SET start_date = '2024-01-20 06:00 AM PST'::timestamptz
WHERE flask_id = 1;



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
  time_since_inoc_hr REAL, -- Updated data type
  FOREIGN KEY (flask_id) REFERENCES flasks(flask_id)
);

-- Create a trigger function to update time_since_inoc_hr in hours
CREATE OR REPLACE FUNCTION update_time_since_inoc_hr()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE samples s
  SET time_since_inoc_hr = EXTRACT(EPOCH FROM (s.end_date - f.start_date)) / 3600.0 -- Convert to hours
  FROM flasks f
  WHERE s.flask_id = f.flask_id AND s.sample_id = NEW.sample_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger on the samples table
CREATE TRIGGER after_insert_update_time_since_inoc_hr
AFTER INSERT ON samples
FOR EACH ROW
EXECUTE FUNCTION update_time_since_inoc_hr();

INSERT INTO samples (flask_id, od600) VALUES (4, 0.2);

-- Insert a sample to test the trigger
INSERT INTO samples (flask_id, od600) VALUES (1, 4.2);
INSERT INTO samples (flask_id, od600) VALUES (2, 3.1);

INSERT INTO samples (flask_id, od600) VALUES (1, 7.8);
INSERT INTO samples (flask_id, od600) VALUES (2, 9.4);

INSERT INTO samples (flask_id, od600) VALUES (1, 9.1);
INSERT INTO samples (flask_id, od600) VALUES (2, 10.1);



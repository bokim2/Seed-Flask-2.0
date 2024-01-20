-- 2024-01-15 changed sql query from old one.  apparently the timestampz query was a bit wrong.  changed to timestampz at utc.  the tables are all corrected and "should" work



CREATE TABLE cell_banks (
    cell_bank_id BIGSERIAL NOT NULL PRIMARY KEY,
    strain VARCHAR(50),
    notes TEXT,
    target_molecule TEXT,
    description TEXT,
    date_timestamptz TIMESTAMPTZ DEFAULT (current_timestamp AT TIME ZONE 'UTC')
);



INSERT INTO cell_banks (strain, notes, target_molecule, description) values ( 'Aspergillus', 'cell bank: 32C cultivation in test tube.  Final OD600 2.4.', 'alpha amylase', 'secrete alpha amylase for dish detergent applications.  for project Cloudberry. no inducer, constitutive expression.');





-- CREATE TYPE vessel_type AS ENUM('flask', 'test tube', '96_well plate', '24 well plate');

-- CREATE TABLE flasks (
-- flask_id BIGSERIAL NOT NULL,
-- vessel_type vessel_type NOT NULL,
-- inoculum_uL REAL, 
-- media_mL REAL, 
-- start_date TIMESTAMPTZ DEFAULT (current_timestamp AT TIME ZONE 'UTC'),
-- PRIMARY KEY(flask_id),
-- cell_bank_id INT NOT NULL,
-- FOREIGN KEY (cell_bank_id) REFERENCES cell_banks(cell_bank_id)
-- );



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

-- Insert a sample to test the trigger
INSERT INTO samples (flask_id, od600) VALUES (1, 7.8);



INSERT INTO samples (flask_id, od600) VALUES (2, 9.4);

INSERT INTO samples (flask_id, od600) VALUES (1, 7.8);



INSERT INTO samples (flask_id, od600) VALUES (2, 9.4);
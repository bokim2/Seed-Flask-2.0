-- 2024-01-15 changed sql query from old one.  apparently the timestampz query was a bit wrong.  changed to timestampz at utc.  the tables are all corrected and "should" work

ALTER TABLE cell_banks
DROP COLUMN IF EXISTS start_date_timestamptz;


-- CREATE TABLE cell_banks (
--     cell_bank_id BIGSERIAL NOT NULL PRIMARY KEY,
--     strain VARCHAR(50),
--     notes TEXT,
--     target_molecule TEXT,
--     description TEXT,
--     date_timestamptz TIMESTAMPTZ DEFAULT (current_timestamp AT TIME ZONE 'UTC')
-- );

-- ALTER TABLE cell_banks
-- ADD COLUMN date_timestamptz TIMESTAMPTZ DEFAULT (current_timestamp AT TIME ZONE 'UTC');



-- ADD COLUMN start_date_timestamptz_utc TIMESTAMPTZ DEFAULT current_timestamp;

-- INSERT INTO cell_banks (strain, notes, target_molecule, description) values ( 'Aspergillus', 'cell bank: 32C cultivation in test tube.  Final OD600 2.4.', 'alpha amylase', 'secrete alpha amylase for dish detergent applications.  for project Cloudberry. no inducer, constitutive expression.');





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
-- VALUES ('flask', 25, 250, 1);


-- CREATE TABLE samples (
--   sample_id BIGSERIAL NOT NULL PRIMARY KEY,
--   flask_id BIGINT NOT NULL,
--   FOREIGN KEY (flask_id) REFERENCES flasks(flask_id),
--   end_date TIMESTAMPTZ DEFAULT (current_timestamp AT TIME ZONE 'UTC'),
--   od600 REAL,
--   completed BOOLEAN,
--   time_since_inoc_hr REAL
-- );

-- ALTER TABLE samples
-- ALTER COLUMN end_date SET DEFAULT (current_timestamp AT TIME ZONE 'UTC');



-- timepoint sample data examples:  after 0-2 hours

-- INSERT INTO samples (flask_id, od600, completed, time_since_inoc_hr)
-- VALUES (2, 0.5, false, EXTRACT(EPOCH FROM (current_timestamp - (SELECT start_date FROM flasks WHERE flask_id = 2))) / 3600);


-- INSERT INTO samples (flask_id, od600, completed, time_since_inoc_hr)
-- VALUES (1, 0.75, false, EXTRACT(EPOCH FROM (current_timestamp - (SELECT start_date FROM flasks WHERE flask_id = 1))) / 3600);

-- timepoint sample data examples:  after 3-6 hours

-- INSERT INTO samples (flask_id, od600, completed, time_since_inoc_hr)
-- VALUES (1, 4.6, false, EXTRACT(EPOCH FROM (current_timestamp - (SELECT start_date FROM flasks WHERE flask_id = 1))) / 3600);

-- INSERT INTO samples (flask_id, od600, completed, time_since_inoc_hr)
-- VALUES (2, 5.8, false, EXTRACT(EPOCH FROM (current_timestamp - (SELECT start_date FROM flasks WHERE flask_id = 2))) / 3600);


-- INSERT INTO samples (flask_id, od600, completed, time_since_inoc_hr)
-- VALUES (1, 5.7, true, EXTRACT(EPOCH FROM (current_timestamp - (SELECT start_date FROM flasks WHERE flask_id = 1))) / 3600);

-- INSERT INTO samples (flask_id, od600, completed, time_since_inoc_hr)
-- VALUES (2, 6.5 , true, EXTRACT(EPOCH FROM (current_timestamp - (SELECT start_date FROM flasks WHERE flask_id = 2))) / 3600);





-- 2024-01-15


-- // queries to make it timestampz instead...
-- ALTER TABLE flasks
-- ADD COLUMN start_date_timestamptz TIMESTAMPTZ DEFAULT current_timestamp;

-- ALTER TABLE cell_banks
-- ADD COLUMN start_date_timestamptz TIMESTAMPTZ DEFAULT current_timestamp;
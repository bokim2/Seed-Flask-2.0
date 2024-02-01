INSERT INTO flasks (vessel_type, inoculum_uL, media_mL, cell_bank_id, rpm, temp_c, media)
VALUES ('flask', 11, 250, 2, 225, 37, 'YPD 3% glucose');

INSERT INTO flasks (vessel_type, inoculum_uL, media_mL, cell_bank_id, rpm, temp_c, media)
VALUES ('flask', 22, 250, 3, 250, 34, 'YPD 2% sucrose');

-- alter table flasks add column media varchar(255);

-- update flasks set media = 'YPD 2% glucose' where media is null;

-- alter table flasks 
-- alter column media set not null;
import express, { Router } from 'express';
import 'dotenv/config';
import cors from 'cors';

import path from 'path';
import process from 'process';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.PORT || 3000;
console.log('process.env.NODE_ENV', process.env.NODE_ENV);

import { db } from './db/db.js';

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, '../dist')));

// Define any API routes

app.get('/api', (req, res) => {
  res.send('Hello from the API');
});

//GET all flasks before trying left join
// app.get('/api/flasks', async (req, res) => {
//   try {
//     const results = await db.query('select * from flasks');
//     console.log('results of getting all flasks', results.rows);
//     res.status(200).json({
//       status: 'success',
//       // results: results.rows.length,
//       data: results.rows,
//     });
//   } catch (err) {
//     console.log(err);
//   }
// });

//GET all flasks - flasks table joined with cell_banks table - format 2024-01-10T04:15:50.421Z returns pacific time
// app.get('/api/flasks', async (req, res) => {
//     try {
//       const results = await db.query(
//         `SELECT
//         *,
//         start_date AT TIME ZONE 'UTC' AT TIME ZONE 'America/Los_Angeles' AS start_date_pacific
//       FROM flasks;`
//       );
//       console.log('trying to get timezone to work', results);
//       res.status(200).json({
//         status: 'success',
//         // results: results.rows.length,
//         data: results.rows,
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   });

// get ALL flasks - works, format is like this 2024-01-10 12:15  returns pacific time, gives you more complicated format also as "start_date_pacific"
app.get('/api/flasks', async (req, res) => {
  try {
    const results = await db.query(
      `SELECT
      *,
      start_date AT TIME ZONE 'UTC' AT TIME ZONE 'America/Los_Angeles' AS adjusted_start_date_pacific,
      TO_CHAR(start_date AT TIME ZONE 'America/Los_Angeles', 'YYYY-MM-DD HH12:MI AM') AS readable_start_date_pacific
    FROM flasks as f LEFT JOIN cell_banks as c ON f.cell_bank_id = c.cell_bank_id;`
    );
    // console.log('trying to get timezone to work', results);
    res.status(200).json({
      status: 'success',
      // results: results.rows.length,
      data: results.rows,
    });
  } catch (err) {
    console.log(err);
  }
});

//GET one flask
app.get('/api/flasks/:id', async (req, res) => {
  try {
    const results = await db.query('select * from flasks WHERE flask_id = $1', [
      req.params.id,
    ]);
    // console.log('results of getting one flask', results.rows[0]);
    res.status(200).json({
      status: 'success',
      results: results.rows.length,
      data: results.rows[0],
    });
  } catch (err) {
    console.log(err);
  }
});

// GET all cell banks
app.get('/api/cellbanks', async (req, res) => {
  try {
    const results = await db.query(`SELECT
      *,
      date_timestamptz AT TIME ZONE 'UTC' AT TIME ZONE 'America/Los_Angeles' AS adjusted_start_date_pacific,
      TO_CHAR(date_timestamptz AT TIME ZONE 'America/Los_Angeles', 'YYYY-MM-DD HH12:MI AM') AS readable_start_date_pacific
    FROM cell_banks;`);
    res.status(200).json({
      status: 'success',
      data: results.rows,
    });
  } catch (err) {
    console.log(err);
  }
});
// post one cell bank
app.post('/api/cellbank', async (req, res) => {
  try {
    console.log(req.body, 'in post cell bank server');
    const results = await db.query(
      'INSERT INTO cell_banks (strain, notes, target_molecule, description) values ($1, $2, $3, $4) returning *',
      [
        req.body.strain,
        req.body.notes,
        req.body.target_molecule,
        req.body.description,
      ]
    );
    console.log(results.rows);
    res.status(200).json({
      status: 'success',
      data: results.rows,
    });
  } catch (err) {
    console.log(err);
  }
});

// UPDATE one cell bank

app.put('/api/cellbank/:id', async (req, res) => {
  try {
    console.log(req.body, 'in put cell bank server put request');
    const {strain, target_molecule, description, notes, date_timestamptz} = req.body
    const results = await db.query(`UPDATE cell_banks SET strain = $1, notes = $2, target_molecule = $3, description = $4, date_timestamptz = $5 WHERE cell_bank_id = $6 returning *;`, [strain, notes, target_molecule, description, date_timestamptz, req.params.id])
  } catch (err) {
    console.log(err);
  }
});

// GET all samples

app.get('/api/samples', async (req, res) => {
  try {
    const results = await db.query(`SELECT
    *
    ,
    end_date AT TIME ZONE 'UTC' AT TIME ZONE 'America/Los_Angeles' AS adjusted_end_date_pacific,
    TO_CHAR(end_date AT TIME ZONE 'America/Los_Angeles', 'YYYY-MM-DD HH12:MI AM') AS readable_end_date_pacific
  FROM samples;`);
    res.status(200).json({
      status: 'success',
      data: results.rows,
    });
  } catch (err) {
    console.log(err);
  }
});

// GET aggregate samples by flask_id for graphing

app.get('/api/graphs', async (req, res) => {
  try {
    const results = await db.query(`SELECT
  f.flask_id,
  f.vessel_type,
  f.inoculum_uL,
  f.media_mL,
  f.start_date,
  cb.cell_bank_id,
  cb.strain,
  cb.notes,
  cb.target_molecule,
  cb.description,
  cb.date_timestamptz,
  ARRAY_AGG(s.od600 ORDER BY s.end_date) AS od600_values,
  ARRAY_AGG(EXTRACT(EPOCH FROM (s.end_date - f.start_date)) / 3600 ORDER BY s.end_date) AS time_since_inoc_hr_values
FROM samples s
JOIN flasks f ON s.flask_id = f.flask_id
JOIN cell_banks cb ON f.cell_bank_id = cb.cell_bank_id
GROUP BY f.flask_id, f.vessel_type, f.inoculum_uL, f.media_mL, f.start_date, cb.cell_bank_id, cb.strain, cb.notes, cb.target_molecule, cb.description, cb.date_timestamptz;`);
    console.log(results);
    res.status(200).json({
      status: 'success',
      data: results.rows,
    });
  } catch (err) {
    console.log(err);
  }
});

// simpler version of graphs query just od600 and interval
// app.get('/api/graphs', async (req, res) => {
//   try {
//     const results = await db.query(`SELECT
//     f.flask_id,
//     ARRAY_AGG(s.od600 ORDER BY s.end_date) AS od600_values,
//     ARRAY_AGG(EXTRACT(EPOCH FROM (s.end_date - f.start_date)) / 3600 ORDER BY s.end_date) AS time_since_inoc_hr_values
//   FROM samples s
//   JOIN flasks f ON s.flask_id = f.flask_id
//   GROUP BY f.flask_id;`);
//   console.log(results)
//     res.status(200).json({
//       status: 'success',
//       data: results.rows,
//     });
//   } catch (err) {
//     console.log(err);
//   }
// });

// This query also worked for organizing the data for graphing but it split it up in objects
// SELECT
//     f.flask_id,
//     ARRAY_AGG(jsonb_build_object(
//       'time_since_inoc_hr', EXTRACT(EPOCH FROM (s.end_date - f.start_date)) / 3600,
//       'od600', s.od600
//     ) ORDER BY s.end_date) AS data
//   FROM samples s
//   JOIN flasks f ON s.flask_id = f.flask_id
//   GROUP BY f.flask_id;

// For any other route, serve the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

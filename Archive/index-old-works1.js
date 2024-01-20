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
      start_date AT TIME ZONE 'UTC' AT TIME ZONE 'America/Los_Angeles' AS start_date_pacific,
      start_date AT TIME ZONE 'UTC' AT TIME ZONE 'US/Eastern' AS start_date_eastern,
      TO_CHAR(start_date AT TIME ZONE 'UTC' AT TIME ZONE 'America/Los_Angeles', 'YYYY-MM-DD HH24:MI') AS start_date_pacific_readable
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

// For any other route, serve the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

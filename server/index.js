import express, { Router } from 'express';
import 'dotenv/config';
import cors from 'cors';
import morgan from 'morgan';

import path from 'path';
import process from 'process';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import { db } from './db/db.js';
import { badWordsMiddleware } from './middleware/badWordsMiddleware.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.PORT || 3000;
console.log('process.env.NODE_ENV', process.env.NODE_ENV);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, '../dist')));

// enable cors for development
app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);

// set cache control headers for images
app.use(
  '/images',
  express.static(path.join(__dirname, 'public'), {
    setHeaders: function (res, path) {
      res.setHeader('Cache-Control', 'public, max-age=3600');
    },
  })
);

// Define any API routes

app.get('/api', (req, res) => {
  res.send('Hello from the API');
});

// GET all cell banks
app.get('/api/cellbanks', async (req, res) => {
  try {
    const results = await db.query(`SELECT * FROM cell_banks
    ORDER BY cell_bank_id DESC;`);
    res.status(200).json({
      status: 'success',
      data: results.rows,
    });
  } catch (err) {
    console.log(err);
  }
});

// `SELECT
//       *,
//       date_timestamptz AT TIME ZONE 'UTC' AT TIME ZONE 'America/Los_Angeles' AS adjusted_start_date_pacific,
//       TO_CHAR(date_timestamptz AT TIME ZONE 'America/Los_Angeles', 'YYYY-MM-DD HH12:MI AM') AS readable_start_date_pacific
//     FROM cell_banks;`

// post one cell bank
app.post('/api/cellbanks', badWordsMiddleware, async (req, res) => {
  try {
    // console.log(req.body, 'in post cell bank server');
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

app.put('/api/cellbanks/:id', async (req, res) => {
  try {
    const { strain, target_molecule, description, notes, date_timestamptz } =
      req.body;
    const cellBankId = req.params.id;

    const query = `
      UPDATE cell_banks 
      SET strain = $1, notes = $2, target_molecule = $3, description = $4, date_timestamptz = $5 
      WHERE cell_bank_id = $6 
      RETURNING *;
    `;
    const updateValues = [
      strain,
      notes,
      target_molecule,
      description,
      date_timestamptz,
      cellBankId,
    ];
    const results = await db.query(query, updateValues);

    // Check if any rows were updated
    if (results.rowCount === 0) {
      return res.status(404).json({ message: 'Cell bank not found' });
    }

    // Sending back the updated data
    res.json({ message: 'Update successful', data: results.rows });
  } catch (err) {
    console.error('Error in server PUT request:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// DELETE on cell bank
app.delete('/api/cellbanks/:id', async (req, res) => {
  try {
    const result = await db.query(
      'DELETE FROM cell_banks WHERE cell_bank_id = $1',
      [req.params.id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({
        status: 'fail',
        message: 'Cell bank not found',
      });
    }
    res.status(200).json({
      status: 'success',
      message: `cellbank ${req.params.id} deleted successfully`,
    });
  } catch (err) {
    console.error(`Error deleting cellbank ${req.params.id}`, err);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
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
      *
      FROM flasks as f LEFT JOIN cell_banks as c ON f.cell_bank_id = c.cell_bank_id
      ORDER BY flask_id DESC;`
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

// post one flask

app.post('/api/flasks', badWordsMiddleware, async (req, res) => {
  try {
    const {
      cell_bank_id,
      temp_c,
      media,
      inoculum_ul,
      media_ml,
      vessel_type,
      rpm,
    } = req.body;
    const values = [
      cell_bank_id,
      temp_c,
      media,
      inoculum_ul,
      media_ml,
      vessel_type,
      rpm,
    ];
    const query = `INSERT INTO flasks (cell_bank_id, temp_c, media, inoculum_ul, media_ml, vessel_type, rpm) values ($1, $2, $3, $4, $5, $6, $7) returning *`;
    const results = await db.query(query, values);
    res.status(200).json({
      status: 'success',
      data: results.rows,
    });
  } catch (err) {
    console.log(err);
  }
});

// update a flask

app.put('/api/flasks/:id', async (req, res) => {
  console.log('req.body in server', req.body, 'req.params.id', req.params.id);
  const {
    inoculum_ul,
    media,
    media_ml,
    rpm,
    start_date,
    temp_c,
    vessel_type,
    cell_bank_id,
  } = req.body;

  const flaskId = req.params.id;

  const query = `
    UPDATE flasks
    SET inoculum_ul = $1, media = $2, media_ml = $3, rpm = $4, start_date = $5, temp_c = $6, vessel_type = $7,  cell_bank_id = $8
    WHERE flask_id = $9 `;

  const values = [
    inoculum_ul,
    media,
    media_ml,
    rpm,
    start_date,
    temp_c,
    vessel_type,
    cell_bank_id,
    flaskId,
  ];
  try {
    const results = await db.query(query, values);
    if (results.rowCount === 0) {
      return res.status(404).json({ message: 'Flask not found' });
    }
    res.status(200).json({ message: 'Update successful', data: results.rows });
  } catch (err) {
    console.error('Error in server PUT request:', err);
    throw err;
  }
});

app.delete('/api/flasks/:id', async (req, res) => {
  const query = 'DELETE FROM flasks WHERE flask_id = $1';
  const value = [req.params.id];

  try {
    const result = await db.query(query, value);
    if (result.rowCount === 0) {
      return res.status(404).json({
        status: 'fail',
        message: 'Flask not found',
      });
    }
    res.status(200).json({
      status: 'success',
      message: `flask ${req.params.id} deleted successfully`,
    });
  } catch (err) {
    console.error(`Error deleting flask ${req.params.id}`, err);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
});

// GET all samples

app.get('/api/samples', async (req, res) => {
  try {
    const query = `SELECT
      s.*,
      f.flask_id,
      f.temp_c,
      c.strain,
      c.target_molecule
      FROM samples as s 
      LEFT JOIN flasks as f on s.flask_id = f.flask_id
      LEFT JOIN cell_banks as c on f.cell_bank_id = c.cell_bank_id;`;
    const results = await db.query(query);
    res.status(200).json({
      status: 'success',
      data: results.rows,
    });
  } catch (err) {
    console.log(err);
  }
});

// GET aggregate samples by flask_id for graphing
// for LineGraph component.  NOT being used.  this is a draft
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

// get all flask and sample associated with all cellbanks
app.get('/api/chart/cellbanks', async (req, res) => {
  try {
    const results = await db.query(
      `SELECT 
      flasks.*,
      cell_banks.*,
      ARRAY_AGG(samples.od600 ORDER BY samples.time_since_inoc_hr) AS od600_values,
      ARRAY_AGG(samples.time_since_inoc_hr ORDER BY samples.time_since_inoc_hr) AS time_since_inoc_hr_values
    FROM 
      flasks
    JOIN 
      cell_banks ON flasks.cell_bank_id = cell_banks.cell_bank_id
    LEFT JOIN 
      samples ON flasks.flask_id = samples.flask_id
    GROUP BY 
      flasks.flask_id, cell_banks.cell_bank_id;
  `
    );
    res.status(200).json({
      status: 'success',
      test: 'test',
      data: results.rows,
    });
  } catch (err) {
    console.log(err);
  }
});

// get all flask and sample associated with one cellbank
app.get('/api/chart/cellbank/:id', async (req, res) => {
  try {
    const results = await db.query(
      `SELECT 
      flasks.*,
      cell_banks.*,
      ARRAY_AGG(samples.od600 ORDER BY samples.time_since_inoc_hr) AS od600_values,
      ARRAY_AGG(samples.time_since_inoc_hr ORDER BY samples.time_since_inoc_hr) AS time_since_inoc_hr_values
  FROM 
      flasks
  JOIN 
      cell_banks ON flasks.cell_bank_id = cell_banks.cell_bank_id
  LEFT JOIN 
      samples ON flasks.flask_id = samples.flask_id
  WHERE 
      cell_banks.cell_bank_id = $1
  GROUP BY 
      flasks.flask_id, cell_banks.cell_bank_id;
  
  `,
      [req.params.id]
    );
    res.status(200).json({
      status: 'success',
      test: 'test',
      data: results.rows,
    });
  } catch (err) {
    console.log(err);
  }
});

// search cell banks
app.get('/api/cellbanks/search', async (req, res) => {
  try {
    const { searchField, searchText } = req.query;
    console.log('searchField', searchField, 'searchText', searchText);

    const validFields = [
      'cell_bank_id',
      'strain',
      'target_molecule',
      'details',
      'notes',
    ];
    if (!validFields.includes(searchField)) {
      return res.status(400).send('Invalid search field.');
    }

    // Determine if the search field is 'cell_bank_id' and needs casting to text
    const isNumericSearchField = searchField === 'cell_bank_id';
    const fieldForQuery = isNumericSearchField
      ? `${searchField}::text`
      : searchField;

    const query = {
      text: `SELECT *, ts_rank(to_tsvector(${fieldForQuery}), plainto_tsquery($1)) AS relevance
        FROM cell_banks
        WHERE to_tsvector(${fieldForQuery}) @@ plainto_tsquery($1)
        ORDER BY relevance DESC;`,
      values: [searchText],
    };

    const result = await db.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
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

// Global Error handling middleware

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || 'Internal server error';

  console.error(err);

  res.status(statusCode).json({
    error: {
      message,
      status: statusCode,
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

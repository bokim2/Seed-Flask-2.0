import express, { Router } from 'express';
// import dotenv from 'dotenv';
import 'dotenv/config';
import cors from 'cors';
import morgan from 'morgan';
// auth0
import fs from 'fs';
import https from 'https';
import http from 'http';
//
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
// enable cors for development
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://localhost:5173',
      'https://seed-flask-2-c1d8d446416a.herokuapp.com',
      'https://dev-1gk5wccsooddgtgs.us.auth0.com',
    ],
    credentials: true, // Allow cookies to be sent
    allowedHeaders: 'Content-Type,Authorization', // Ensure Auth0 headers are allowed
  })
);

const PORT = process.env.PORT || 3000;
console.log('process.env.NODE_ENV', process.env.NODE_ENV);

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, '../dist')));

// setting .env file based on environment
if (process.env.NODE_ENV === 'development') {
  // dotenv.config({ path: path.resolve(__dirname, '.env') });
  app.use(morgan('dev'));
  // } else if (process.env.NODE_ENV === 'production') {
  //   dotenv.config({ path: path.resolve(__dirname, '.env.production') });
}
// else {
//   dotenv.config();
// }

// auth0
const sslServer = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, '/ssl/localhost+2-key.pem')),
    cert: fs.readFileSync(path.join(__dirname, '/ssl/localhost+2.pem')),
  },
  app
);

import pkg from 'express-openid-connect';
const { auth, requiresAuth } = pkg;

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  redirect_uri: process.env.BASE_URL + '/callback',
};
console.log('config for auth', config);

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.get('/profile', requiresAuth(), (req, res) => {
  res.json(req.oidc.user);
});

app.get('/env', (req, res) => {
  res.json({
    // processenv: process.env,
    secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
    processenvNODE_ENV: process.env.NODE_ENV,
  });
});

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
    if (!results.rows.length) {
      return res.status(404).json({ message: 'Post not successful' });
    }
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

  //   const validatedData = editFlaskSchema.validate({
  //   inoculum_ul,
  //   media,
  //   media_ml,
  //   rpm,
  //   start_date,
  //   temp_c,
  //   vessel_type,
  //   cell_bank_id,
  // });

  // console.log('validatedData.success', validatedData.success);

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
    return res
      .status(500)
      .json({ message: 'Internal server error', error: err.message });
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
      LEFT JOIN cell_banks as c on f.cell_bank_id = c.cell_bank_id
      ORDER BY s.sample_id DESC;`;
    const results = await db.query(query);
    res.status(200).json({
      status: 'success',
      data: results.rows,
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
});

// post one sample
app.post('/api/samples', async (req, res) => {
  try {
    console.log(req.body, 'in post sample server');
    const { flask_id, od600, completed } = req.body;
    const query = `INSERT INTO samples (flask_id, od600, completed) values ($1, $2, $3) returning *`;
    const values = [flask_id, od600, completed];

    const results = await db.query(query, values);
    console.log('results.success', results, 'results.rows', results.rows);
    if (!results.rowCount) {
      return res.status(404).json({ message: 'Post not successful' });
    }
    res.status(200).json({
      status: 'success',
      data: results.rows,
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
});

app.delete('/api/samples/:id', async (req, res) => {
  try {
    const sampleId = req.params.id;
    const query = `DELETE FROM samples WHERE sample_id = $1`;
    const value = [sampleId];
    const result = await db.query(query, value);
    console.log(result.rowCount);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Sample not found' });
    }
    res
      .status(200)
      .json({ message: `Sample ${sampleId} deleted successfully` });
  } catch (err) {
    console.log(err);
    throw err;
  }
});

app.put('/api/samples/:id', async (req, res) => {
  try {
    const { flask_id, end_date, od600, completed } = req.body;
    const sampleId = req.params.id;
    const query = `UPDATE samples SET flask_id = $1, end_date = $2, od600 = $3, completed = $4 WHERE sample_id = $5 RETURNING *`;
    const values = [flask_id, end_date, od600, completed, sampleId];
    const results = await db.query(query, values);
    if (results.rowCount === 0) {
      return res.status(404).json({ message: 'Sample not found' });
    }
    res.status(200).json({ message: 'Update successful', data: results.rows });
  } catch (err) {
    console.log(err);
    throw err;
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

if (process.env.NODE_ENV === 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
} else if (process.env.NODE_ENV === 'development') {
  sslServer.listen(PORT, () => {
    console.log(`Server is running on https://localhost:${PORT}`);
  });
}

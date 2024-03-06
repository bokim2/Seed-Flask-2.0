import express, { Router } from 'express';
// import dotenv from 'dotenv';
import 'dotenv/config';
import cors from 'cors';
import morgan from 'morgan';
// auth0
import fs from 'fs';
import https from 'https';
import pkg from 'express-openid-connect';
const { auth, requiresAuth } = pkg;

// auth0 api
// import pkgAPI from 'express-oauth2-jwt-bearer';
// const { auth: authAPI } = pkgAPI;

//
import path from 'path';
import process from 'process';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import { db } from './db/db.js';
import { badWordsMiddleware } from './middleware/badWordsMiddleware.js';
import { allowRolesAdminUser } from './middleware/allowRolesAdminUser.js';
import { validateIdParam } from './middleware/validateIdParam.js';
import { LIMIT } from '../src/lib/constants.js';
import { create } from 'domain';
import {
  createCellbankSchema,
  updateBackendCellbankSchema,
} from '../src/lib/zodSchemas.js';

// export const prodUrl = 'https://seed-flask-2-c1d8d446416a.herokuapp.com';
export const prodUrl = 'https://www.seedflask.com';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors());
// enable cors for development
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://localhost:5173',
      'https://seed-flask-2-c1d8d446416a.herokuapp.com',
      'https://seedflask.com',
      'https://dev-1gk5wccsooddgtgs.us.auth0.com',
      'https://localhost:3000',
    ],
    credentials: true, // Allow cookies to be sent
    allowedHeaders: 'Content-Type,Authorization', // Ensure Auth0 headers are allowed
  })
);

const PORT = process.env.PORT || 3000;
console.log('process.env.NODE_ENV', process.env.NODE_ENV);

// redirect seedflask.com to www.seedflask.com
app.use((req, res, next) => {
  if (req.hostname === 'seedflask.com') {
    res.redirect(301, `https://www.seedflask.com${req.originalUrl}`);
  }
  next();
});

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

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  // redirect_uri: process.env.BASE_URL + '/callback',
  // redirectUrl: process.env.CLIENT_URL,
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

// GET cell banks - INFINITE SCROLL
app.get('/api/cellbanks', async (req, res) => {
  try {
    console.log(
      'req.query',
      req.query,
      'req.query.limit',
      req.query.limit,
      'req.query.offset',
      req.query.offset
    );
    const limit = parseInt(req.query.limit, 10) || LIMIT; // Default to 50 if not specified
    const offset =
      parseInt(req.query.offset, 10) - parseInt(req.query.limit, 10) || 0; // Default to 0 if not specified
    const results = await db.query(
      `SELECT * FROM cell_banks
    ORDER BY cell_bank_id DESC 
    LIMIT $1 OFFSET $2;`,
      [limit, offset]
    );
    // console.log('results of getting all cell banks', results.rows[0]);

    // const popularOptions = getPopularOptions(results.rows);

    res.status(200).json({
      status: 'success',
      // data: results.rows,
      data: results.rows,
      // popularOptions: popularOptions,
      // user: req.oidc.user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// post one cell bank
app.post(
  '/api/cellbanks',
  allowRolesAdminUser,
  badWordsMiddleware,
  async (req, res) => {
    try {
      const userObj = req.oidc.user;
      const username = userObj.name;
      const user_id = userObj.sub;
      console.log(req.body, 'in post cell bank server');
      // const results = await db.query(
      //   'INSERT INTO cell_banks (strain, notes, target_molecule, project, description, username, user_id) values ($1, $2, $3, $4, $5, $6, $7) returning *',
      //   [
      //     req.body.strain,
      //     req.body.notes,
      //     req.body.target_molecule,
      //     req.body.project,
      //     req.body.description,
      //     username,
      //     user_id,
      //   ]
      // );
      const validatedReqBody = createCellbankSchema.safeParse(req.body);
      if (!validatedReqBody.success) {
        return res.status(400).json({
          message:
            validatedReqBody.error.issues ||
            'Zod validation error on the server for post cell bank',
          serverError: 'Zod validation error on the server for post cell bank',
        });
      }
      const { strain, target_molecule, description, notes, project } =
        validatedReqBody.data;
      const results = await db.query(
        'INSERT INTO cell_banks (strain, notes, target_molecule, project, description, username, user_id) values ($1, $2, $3, $4, $5, $6, $7) returning *',
        [
          strain,
          notes,
          target_molecule,
          project,
          description,
          username,
          user_id,
        ]
      );
      console.log(results.rows);
      res.status(200).json({
        status: 'success',
        data: results.rows,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err?.detail || 'Internal server error' });
    }
  }
);

// UPDATE one cell bank

app.put('/api/cellbanks/:id', validateIdParam, async (req, res) => {
  try {
    // const {
    //   strain,
    //   target_molecule,
    //   description,
    //   notes,
    //   date_timestamptz,
    //   project,
    // } = req.body;
    const validatedReqBody = updateBackendCellbankSchema.safeParse(req.body);
    if (!validatedReqBody.success) {
      return res.status(400).json({
        message:
          validatedReqBody.error.issues ||
          'Zod validation error on the server for update cell bank',
        serverError: 'Zod validation error on the server for update cell bank',
      });
    }
    const {
      strain,
      target_molecule,
      description,
      notes,
      date_timestamptz,
      project,
    } = validatedReqBody.data;

    const cellBankId = req.params.id;
    console.log('req.body', req.body, 'cellBankId', cellBankId);
    const query = `
      UPDATE cell_banks 
      SET strain = $1, notes = $2, target_molecule = $3, description = $4, date_timestamptz = $5 , project = $6
      WHERE cell_bank_id = $7 
      RETURNING *;
    `;
    const updateValues = [
      strain,
      notes,
      target_molecule,
      description,
      date_timestamptz,
      project,
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
app.delete('/api/cellbanks/:id', validateIdParam, async (req, res) => {
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

// get ALL flasks - infinite scroll
app.get('/api/flasks', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10 || LIMIT);
    const offset =
      parseInt(req.query.offset, 10) - parseInt(req.query.limit, 10) || 0; // Default to 0 if not specified
    const results = await db.query(
      `SELECT
      *
      FROM flasks as f LEFT JOIN cell_banks as c ON f.cell_bank_id = c.cell_bank_id
      ORDER BY flask_id DESC
      LIMIT $1 OFFSET $2;`,
      [limit, offset]
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

// get ALL flasks
// app.get('/api/flasks', async (req, res) => {
//   try {
//     const results = await db.query(
//       `SELECT
//       *
//       FROM flasks as f LEFT JOIN cell_banks as c ON f.cell_bank_id = c.cell_bank_id
//       ORDER BY flask_id DESC;`
//     );
//     // console.log('trying to get timezone to work', results);
//     res.status(200).json({
//       status: 'success',
//       // results: results.rows.length,
//       data: results.rows,
//     });
//   } catch (err) {
//     console.log(err);
//   }
// });

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

app.post(
  '/api/flasks',
  allowRolesAdminUser,
  badWordsMiddleware,
  async (req, res) => {
    try {
      const userObj = req.oidc.user;
      const username = userObj.name;
      const user_id = userObj.sub;
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
        username,
        user_id,
      ];
      const query = `INSERT INTO flasks (cell_bank_id, temp_c, media, inoculum_ul, media_ml, vessel_type, rpm, username, user_id) values ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *`;
      const results = await db.query(query, values);
      if (!results.rows.length) {
        return res.status(404).json({ message: 'Post not successful' });
      }
      res.status(200).json({
        status: 'success',
        data: results.rows,
      });
    } catch (err) {
      // console.log(err.detail);
      res.status(500).json({
        message: err?.detail || 'Internal server error',
        error: err.message,
      });
    }
  }
);

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
    const limit = parseInt(req.query.limit, 10 || LIMIT);
    const offset =
      parseInt(req.query.offset, 10) - parseInt(req.query.limit, 10) || 0;
    const query = `SELECT
      s.*,
      f.flask_id,
      f.temp_c,
      c.strain,
      c.target_molecule
      FROM samples as s 
      LEFT JOIN flasks as f on s.flask_id = f.flask_id
      LEFT JOIN cell_banks as c on f.cell_bank_id = c.cell_bank_id
      ORDER BY s.sample_id DESC
      LIMIT $1
      OFFSET $2;`;
    const results = await db.query(query, [limit, offset]);
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
app.post(
  '/api/samples',
  allowRolesAdminUser,
  badWordsMiddleware,
  async (req, res) => {
    try {
      const userObj = req.oidc.user;
      const username = userObj.name;
      const user_id = userObj.sub;

      console.log(req.body, 'in post sample server');
      const { flask_id, od600, completed } = req.body;
      const query = `INSERT INTO samples (flask_id, od600, completed, username, user_id) values ($1, $2, $3, $4, $5) returning *`;
      const values = [flask_id, od600, completed, username, user_id];

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
      res.status(500).json({ message: err?.detail || 'Internal server error' });
    }
  }
);

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

// search cell banks -original
// app.get('/api/cellbanks/search', async (req, res) => {
//   try {
//     const { searchField, searchText } = req.query;
//     console.log('searchField', searchField, 'searchText', searchText);

//     const validFields = [
//       'cell_bank_id',
//       'strain',
//       'project',
//       'target_molecule',
//       'details',
//       'notes',
//       'username',
//       'date_timestampz',
//     ];
//     if (!validFields.includes(searchField)) {
//       return res.status(400).send('Invalid search field.');
//     }

//     // Determine if the search field is 'cell_bank_id' and needs casting to text
//     const isNumericSearchField = searchField === 'cell_bank_id';
//     const fieldForQuery = isNumericSearchField
//       ? `${searchField}::text`
//       : searchField;

//     let query;

//     if (searchField === 'date_timestampz') {
//       query = {
//         text: `SELECT *
//           FROM cell_banks
//           WHERE cell_banks.date_timestamptz > $1
//           ORDER BY cell_banks.date_timestamptz DESC;`,
//         values: [searchText],
//       };
//     } else {
//       query = {
//         text: `SELECT *, ts_rank(to_tsvector(${fieldForQuery}), plainto_tsquery($1)) AS relevance
//         FROM cell_banks
//         WHERE to_tsvector(${fieldForQuery}) @@ plainto_tsquery($1)
//         ORDER BY relevance DESC;`,
//         values: [searchText],
//       };
//     }

//     const result = await db.query(query);
//     res.status(200).json(result.rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error');
//   }
// });

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

app.get('/api/cellbanks/search', async (req, res) => {
  try {
    // Assuming all queries come in as `searchField[]=field&searchText[]=text`
    let { searchField, searchText } = req.query;

    // Ensure searchField and searchText are arrays (single query param or none will not be arrays)
    searchField = Array.isArray(searchField)
      ? searchField
      : searchField
      ? [searchField]
      : [];
    searchText = Array.isArray(searchText)
      ? searchText
      : searchText
      ? [searchText]
      : [];

    const validFields = [
      'cell_bank_id',
      'strain',
      'project',
      'target_molecule',
      'details',
      'notes',
      'username',
      'date_timestampz',
    ];

    // Filter out invalid fields
    const queries = searchField
      .map((field, index) => ({
        field,
        text: searchText[index] || '',
      }))
      .filter((q) => validFields.includes(q.field) && q.text !== '');

    if (queries.length === 0) {
      return res
        .status(400)
        .json({ message: 'Invalid or missing search fields.' });
    }

    // Construct WHERE clause dynamically
    const whereClauses = queries.map((q, index) => {
      const fieldForQuery =
        q.field === 'cell_bank_id' ? `${q.field}::text` : q.field;
      if (q.field === 'date_timestampz') {
        return `cell_banks.date_timestamptz > $${index + 1}`;
      } else {
        return `to_tsvector(${fieldForQuery}) @@ plainto_tsquery($${
          index + 1
        })`;
      }
    });

    const whereClause = whereClauses.join(' AND ');

    const query = {
      text: `SELECT * FROM cell_banks WHERE ${whereClause} ORDER BY cell_bank_id DESC;`,
      values: queries.map((q) => q.text),
    };

    const result = await db.query(query);

    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err?.detail || 'Internal server error' });
  }
});

// GET unique values for project and username

app.get('/api/uniques/project', async (req, res) => {
  try {
    const results = await db.query(
      `SELECT ARRAY_Agg(DISTINCT project) from cell_banks;`
    );
    res.status(200).json({
      status: 'success',
      data: results.rows,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err?.detail || 'Internal server error' });
  }
});

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

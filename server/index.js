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
import {
  cellbanksSearchSchemaArray,
  createCellbankSchema,
  updateBackendCellbankSchema,
} from './zodSchemas.js';

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
// console.log('config for auth', config);

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.get('/api/auth/status', (req, res) => {
  res.json({
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.isAuthenticated() ? req.oidc.user : null,
  });
});

app.get('/profile', (req, res) => {
  try {
    console.log('req.oidc.isAuthenticated()', req.oidc.isAuthenticated());
    if (req.oidc.isAuthenticated()) {
      requiresAuth();
      res.json(req.oidc.user);
    }
  } catch (error) {
    console.log(error);
  }
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

// Define routers
import cellbankRouter from './routes/cellbankRoutes.js';
import flaskRouter from './routes/flaskRoutes.js';
import sampleRouter from './routes/sampleRoutes.js';
import scheduleRouter from './routes/scheduleRoutes.js';
import { getUtcTimestampFromLocalTime } from './helperFunctions.js';

app.use('/api/cellbanks', cellbankRouter);
app.use('/api/flasks', flaskRouter);
app.use('/api/samples', sampleRouter);
app.use('/api/schedules', scheduleRouter);

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

// get - GRAPH all flask and sample associated with all cellbanks
app.get('/api/chart/cellbanks', async (req, res) => {
  try {
    // need to fix limit and offset.  it is not set yet on the frontend
    const limit = parseInt(req.query.limit, 10 || LIMIT) || 50;
    const offset =
      parseInt(req.query.offset, 10) - parseInt(req.query.limit, 10) || 0; // Default to 0 if not specified
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
      flasks.flask_id, cell_banks.cell_bank_id 
      ORDER BY flask_id DESC 
      LIMIT $1 OFFSET $2;`,
        [limit, offset]
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

// get  - GRAPH all flask and sample associated with one cellbank
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

// get - GRAPH get flasks with od data for a list of bookmarked flasks

app.get('/api/chart/flasks', async (req, res) => {
  try {
    console.log('req.query.flaskIds', req.query.flaskIds);
    const flaskIds = req.query.flaskIds ? req.query.flaskIds.split(',') : [];
    if (!flaskIds?.length) {
      return res.status(400).json({ message: 'No bookmarked flask ids' });
    }
    const query = `SELECT 
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
flasks.flask_id = ANY ($1)
GROUP BY 
flasks.flask_id, cell_banks.cell_bank_id;`;
    const values = flaskIds;

    const results = await db.query(query, [values]);
    res.status(200).json({
      status: 'success',
      data: results.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
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

// app.get('/api/cellbanks/search', async (req, res) => {
//   try {
//     // Assuming all queries come in as `searchField[]=field&searchText[]=text`
//     console.log('req.query in cellbanks/search', req.query);
//     let { searchField, searchText } = req.query;

//     // Ensure searchField and searchText are arrays (single query param or none will not be arrays)
//     searchField = Array.isArray(searchField)
//       ? searchField
//       : searchField
//       ? [searchField]
//       : [];
//     searchText = Array.isArray(searchText)
//       ? searchText
//       : searchText
//       ? [searchText]
//       : [];

//     const validFields = [
//       'cell_bank_id',
//       'strain',
//       'project',
//       'target_molecule',
//       'description',
//       'notes',
//       'username',
//       // 'date_timestampz',
//       'human_readable_date',
//     ];

//     // Filter out invalid fields
//     const queries = searchField
//       .map((field, index) => ({
//         field,
//         text: searchText?.[index] || '',
//       }))
//       .filter((q) => validFields.includes(q.field) && q.text !== '');
//       console.log('is console working after queries');
//       console.log('queries', queries);

//       const zodValidatedData = cellbanksSearchSchemaArray.safeParse(queries);
//       if (!zodValidatedData.success) {
//         return res.status(400).json({
//           message: zodValidatedData.error.issues,
//           serverError: 'Zod validation error on the server for search cell banks',
//         });  
//       }

//     if (queries.length === 0) {
//       return res
//         .status(400)
//         .json({ message: 'Invalid or missing search fields.' });
//     }

//     // Construct WHERE clause dynamically
//     const whereClauses = queries.map((q, index) => {
//       const fieldForQuery =
//         q.field === 'cell_bank_id' ? `${q.field}::text` : q.field;
//       if (q.field === 'human_readable_date') {
//         q.field = 'date_timestampz';
//         q.text = getUtcTimestampFromLocalTime(q.text);
//       }
//       if (q.field === 'date_timestampz') {
//         return `cell_banks.date_timestamptz > $${index + 1}`;
//       } else {
//         return `to_tsvector(${fieldForQuery}) @@ plainto_tsquery($${
//           index + 1
//         })`;
//       }
//     });

//     const whereClause = whereClauses.join(' AND ');

//     const query = {
//       text: `SELECT * FROM cell_banks WHERE ${whereClause} ORDER BY cell_bank_id DESC;`,
//       values: queries.map((q) => q.text),
//     };

//     const result = await db.query(query);

//     if (result.rows.length === 0) {
//       return res.status(404).json({ message: 'No cell banks found' });
//     }

//     res.status(200).json(result.rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: err?.detail || 'Internal server error' });
//   }
// });

// GET unique values for project and username

app.get('/api/uniques/:value', async (req, res) => {
  try {
    const value = req.params.value;
    if (value === 'all') return;
    console.log('value', value);
    const results = await db.query(
      `SELECT ARRAY_Agg(DISTINCT ${value}) from cell_banks;`
    );
    const reversedResultsArray = results.rows[0].array_agg.reverse();
    // console.log('results right after db query',results)
    if (!results?.rows?.[0]?.array_agg) {
      return res.status(404).json({ message: 'No unique values found' });
    }
    // console.log('results.rows[0].array_agg in server right before sending data back', reversedResultsArray);
    res.status(200).json({
      status: 'success',
      data: results.rows[0].array_agg,
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

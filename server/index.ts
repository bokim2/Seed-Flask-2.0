// import express from 'express';
// import path from 'path';
// import { fileURLToPath } from 'url';

// // Create an Express application
// const app = express();
// const PORT = process.env.PORT || 3000;

// // Since __dirname is not defined in ES module scope, we use import.meta.url
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // A simple API endpoint
// app.get('/api', (req, res) => {
//   res.json({ message: 'Hello from the server!' });
// });

// // Serve static files from the React frontend app in production
// if (process.env.NODE_ENV === 'production') {
//   // Static folder
//   app.use(express.static(path.join(__dirname, '../../dist/client')));

//   // Handle React routing, return all requests to the React app
//   app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../../dist/client', 'index.html'));
//   });
// }

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });


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
import { db } from './db/db';
export const LIMIT = 10; // Number of items to display per page used in client and server side code
// import { badWordsMiddleware } from './middleware/badWordsMiddleware.js';
// import { allowRolesAdminUser } from './middleware/allowRolesAdminUser.js';

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

    type TQueryLimitOffset = {
        limit: string,
        offset: string
    }
    const { limit, offset } = req.query as TQueryLimitOffset;
    const limitValue = parseInt(limit, 10) || LIMIT; // Use LIMIT if parsing fails
    const offsetValue = parseInt(offset, 10) || 0;

    const results = await db.query(
      `SELECT * FROM cell_banks ORDER BY cell_bank_id DESC LIMIT $1 OFFSET $2;`,
      [limitValue, offsetValue]
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
  } 
  catch (err) {
    // console.log(error);
    // res.status(500).json({ error: error.message });
  }
});

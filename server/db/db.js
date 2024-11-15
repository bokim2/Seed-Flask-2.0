import pkg from 'pg';
const { Pool } = pkg;
import 'dotenv/config';
import process from 'process';
// require('dotenv').config();

// create a new pool here using the connection string above
const pool = new Pool({ connectionString: process.env.PG_URI, 
  ssl: {
    rejectUnauthorized: false,
  },
  // max: 3, // added by BK
  // min: 0, // added by BK
  // idle: 10000,  // added by BK
});

// Adding some notes about the database here will be helpful for future you or other developers.
// Schema for the database can be found below:
// https://github.com/CodesmithLLC/unit-10SB-databases/blob/master/docs/assets/images/schema.png

// We export an object that contains a property called query,
// which is a function that returns the invocation of pool.query() after logging the query
// This will be required in the controllers to be the access point to the database
// Remove the import statement for 'pool' since it is already defined in the previous code block

export const db = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};

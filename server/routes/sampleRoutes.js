import express from 'express';
import { db } from '../db/db.js';
import { LIMIT } from '../../src/lib/constants.js';
import { allowRolesAdminUser } from '../middleware/allowRolesAdminUser.js';
import { badWordsMiddleware } from '../middleware/badWordsMiddleware.js';

const sampleRouter = express.Router();

// GET all samples

sampleRouter.route('/').get(async (req, res) => {
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
sampleRouter
  .route('/')
  .post(allowRolesAdminUser, badWordsMiddleware, async (req, res) => {
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
  });


  // update a sample
  sampleRouter.route('/:id').put(async (req, res) => {
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
      res.status(500).json({ message: err?.detail || 'Internal server error' });
      console.log(err);
     
    }
  });


sampleRouter.route('/search').get(async (req, res)=> {
  try {
const limit = parseInt(req.query.limit, 10 || LIMIT);
const offset = parseInt(req.query.offset, 10) - parseInt(req.query.limit, 10) || 0;

let { searchField, searchText } = req.query;

// searchField = 

  } catch (err) {
    console.log(err);
    throw err;
  
  }
})

sampleRouter.route('/:id').delete(async (req, res) => {
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



export default sampleRouter;
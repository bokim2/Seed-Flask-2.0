import express from 'express';
import { db } from '../db/db.js';
import { LIMIT } from '../../src/lib/constants.js';
import {
  createCellbankSchema,
  updateBackendCellbankSchema,
} from '../zodSchemas.js';
import { allowRolesAdminUser } from '../middleware/allowRolesAdminUser.js';
import { badWordsMiddleware } from '../middleware/badWordsMiddleware.js';

const flaskRouter = express.Router();

// get ALL flasks - infinite scroll
flaskRouter.route('/').get(async (req, res) => {
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
// flaskRouter.route.get('/', async (req, res) => {
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
flaskRouter.route('/:id').get(async (req, res) => {
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

flaskRouter
  .route('/', allowRolesAdminUser, badWordsMiddleware)
  .post(async (req, res) => {
    try {
      console.log('in post flask server', req.body, req.body);
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
      console.log(err, err?.detail);
      res.status(500).json({
        message: err?.detail || 'Internal server error',
        error: err.message,
      });
    }
  });

// update a flask

flaskRouter.route('/:id').put(async (req, res) => {
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

flaskRouter.route('/:id').delete(async (req, res) => {
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

export default flaskRouter;

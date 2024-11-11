import express from 'express';
import { db } from '../db/db.js';
import { LIMIT } from '../../src/lib/constants.js';
import { allowRolesAdminUser } from '../middleware/roles/allowRolesAdminUserMiddleware.js';
import { badWordsMiddleware } from '../middleware/badWordsMiddleware.js';
import { validateIdParam } from '../middleware/validateIdParam.js';
// import { db } from '../db/db.js';

const scheduleRouter = express.Router();

scheduleRouter.route('/').get(async (req, res) => {
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
      `SELECT * FROM schedules
      ORDER BY schedule_id DESC 
      LIMIT $1 OFFSET $2;`,
      [limit, offset]
    );
    // console.log('results of getting all cell banks', results.rows[0]);

    res.status(200).json({
      status: 'success',
      data: results.rows,
    });
  } catch (err) {
    // console.log(error);
    // res.status(500).json({ error: 'Failed to fetch schedules' });
    console.error(err);
    res.status(500).json({ message: err?.detail || 'Internal server error' });
  }
});

// post one schedule
scheduleRouter
  .route('/')
  .post(allowRolesAdminUser, badWordsMiddleware, async (req, res) => {
    try {
      const {
        start_date,
        time_since_inoc_hr,
        notes,
        flask_bookmark,
        flask_id,
        current_flasks,
      } = req.body;
      const userObj = req.oidc.user;
      const username = userObj.name;
      const user_id = userObj.sub;
      console.log(req.body, 'in post cell bank server');
      const results = await db.query(
        'INSERT INTO schedules (start_date, time_since_inoc_hr, notes, username, user_id, flask_bookmark, flask_id, current_flasks) values ($1, $2, $3, $4, $5, $6, $7, $8) returning *',
        [
          start_date,
          time_since_inoc_hr,
          notes,
          username,
          user_id,
          flask_bookmark,
          flask_id,
          current_flasks,
        ]
      );
      // const validatedReqBody = createCellbankSchema.safeParse(req.body);
      // if (!validatedReqBody.success) {
      //   return res.status(400).json({
      //     message:
      //       validatedReqBody.error.issues ||
      //       'Zod validation error on the server for post cell bank',
      //     serverError: 'Zod validation error on the server for post cell bank',
      //   });
      // }
      // const { strain, target_molecule, description, notes, project } =
      //   validatedReqBody.data;
      // const results = await db.query(
      //   'INSERT INTO cell_banks (strain, notes, target_molecule, project, description, username, user_id) values ($1, $2, $3, $4, $5, $6, $7) returning *',
      //   [
      //     strain,
      //     notes,
      //     target_molecule,
      //     project,
      //     description,
      //     username,
      //     user_id,
      //   ]
      // );
      console.log(results.rows);
      res.status(200).json({
        status: 'success',
        data: results.rows,
      });
    } catch (err) {
      // console.error(err, { message: err?.detail || 'Internal server error' });
      // res.status(500).json({ message: err?.detail || 'Internal server error' });
      console.error(err);
      res.status(500).json({ message: err?.detail || 'Internal server error' });
    }
  });

// UPDATE one schedule

scheduleRouter.route('/:id').put(validateIdParam, async (req, res) => {
  try {
    const {
      start_date,
      time_since_inoc_hr,
      notes,
      flask_bookmark,
      flask_id,
      current_flasks,
    } = req.body;
    console.log('in update schedule server', req.body, req.params.id);
    //   const validatedReqBody = updateBackendCellbankSchema.safeParse(req.body);
    //   if (!validatedReqBody.success) {
    //     return res.status(400).json({
    //       message:
    //         validatedReqBody.error.issues ||
    //         'Zod validation error on the server for update cell bank',
    //       serverError: 'Zod validation error on the server for update cell bank',
    //     });
    //   }
    //   const {
    //     strain,
    //     target_molecule,
    //     description,
    //     notes,
    //     date_timestamptz,
    //     project,
    //   } = validatedReqBody.data;

    const schedule_id = req.params.id;
    console.log('req.body', req.body, 'schedule_id', schedule_id);
    const query = `
        UPDATE schedules 
        SET start_date = $1, time_since_inoc_hr = $2, notes = $3, flask_bookmark = $4, flask_id = $5 , current_flasks = $6
        WHERE schedule_id = $7 
        RETURNING *;
      `;
    const updateValues = [
      start_date,
      time_since_inoc_hr,
      notes,
      flask_bookmark,
      flask_id,
      current_flasks,
      schedule_id,
    ];
    const results = await db.query(query, updateValues);

    // Check if any rows were updated
    if (results.rowCount === 0) {
      return res.status(404).json({ message: 'Schedule not updated.' });
    }

    // Sending back the updated data
    res.json({ message: 'Update successful', data: results.rows });
  } catch (err) {
    console.error('Error in server PUT request:', err);
    res.status(500).json({ message: err?.detail || 'Internal server error' });
  }
});

// DELETE one schdedule
scheduleRouter.route('/:id').delete(validateIdParam, async (req, res) => {
  try {
    const result = await db.query(
      'DELETE FROM schedules WHERE schedule_id = $1',
      [req.params.id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({
        status: 'fail',
        message: 'Schedule not found',
      });
    }
    res.status(200).json({
      status: 'success',
      message: `Schedule id ${req.params.id} deleted successfully`,
    });
  } catch (err) {
    console.error(`Error deleting schedule ${req.params.id}`, err);
    res.status(500).json({
      status: 'error',
      message: err?.detail || 'Internal server error',
    });
  }
});

export default scheduleRouter;

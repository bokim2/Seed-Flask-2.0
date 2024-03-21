import express from 'express';
import { validateIdParam } from '../middleware/validateIdParam.js';
import { db } from '../db/db.js';
import {
  createCellbankSchema,
  updateBackendCellbankSchema,
} from '../zodSchemas.js';
import { allowRolesAdminUser } from '../middleware/allowRolesAdminUser.js';
import { badWordsMiddleware } from '../middleware/badWordsMiddleware.js';
import { LIMIT } from '../../src/lib/constants.js';

const cellbankRouter = express.Router();

// GET cell banks - INFINITE SCROLL
cellbankRouter.route('/').get(async (req, res) => {
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

    res.status(200).json({
      status: 'success',
      data: results.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to fetch cell banks' });
  }
});

// post one cell bank
cellbankRouter.route(
  '/').post(
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

cellbankRouter.route(
  '/:id').put(
  validateIdParam,
  async (req, res) => {
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
          serverError:
            'Zod validation error on the server for update cell bank',
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
  }
);

// DELETE on cell bank
cellbankRouter.route(
  '/:id').delete(
  validateIdParam,
  async (req, res) => {
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
  }
);

export default cellbankRouter;

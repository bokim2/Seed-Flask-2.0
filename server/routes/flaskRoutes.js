import express from 'express';
import { db } from '../db/db.js';
import { LIMIT } from '../../src/lib/constants.js';
import {
  createCellbankSchema,
  flasksSearchSchema,
  flasksSearchSchemaArray,
  updateBackendCellbankSchema,
} from '../zodSchemas.js';
import { allowRolesAdminUser } from '../middleware/roles/allowRolesAdminUserMiddleware.js';

import { badWordsMiddleware } from '../middleware/badWordsMiddleware.js';
import { allowIfUserIdMatchesMiddleware } from '../middleware/roles/allowIfUserIdMatchesMiddleware.js';
import { validateIdParam } from '../middleware/validateIdParam.js';
import { getUtcTimestampFromLocalTime } from '../helperFunctions.js';
import { z } from 'zod';

const flaskRouter = express.Router();

// get ALL flasks - infinite scroll
flaskRouter.route('/').get(async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10 || LIMIT);
    const offset =
      parseInt(req.query.offset, 10) - parseInt(req.query.limit, 10) || 0; // Default to 0 if not specified
    const results = await db.query(
      `SELECT
      f.*, 
      c.strain, c.target_molecule, c.project  
      FROM flasks as f
      LEFT JOIN cell_banks as c ON f.cell_bank_id = c.cell_bank_id
      ORDER BY f.flask_id DESC
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
    console.error(err);
    res.status(500).json({ message: err?.detail || 'Internal server error' });
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

// get flask data from a list of flasks - not yet implemented
// get ALL flasks - infinite scroll
flaskRouter.route('/list').get(async (req, res) => {
  try {
    console.log('req.query.flaskIds', req.query.flaskIds);
    const flaskIds = req.query.flaskIds ? req.query.flaskIds.split(',') : [];
    if (!flaskIds?.length) {
      return res.status(400).json({ message: 'No bookmarked flask ids' });
    }
    const results = await db.query(
      // `SELECT
      //   *
      //   FROM flasks as f LEFT JOIN cell_banks as c ON f.cell_bank_id = c.cell_bank_id
      //   ORDER BY flask_id DESC;`,
      `SELECT
      f.*,
      c.strain, c.target_molecule, c.project
      FROM flasks as f 
      LEFT JOIN cell_banks as c ON f.cell_bank_id
      ORDER BY f.flask_id DESC
      LIMIT $1 OFFSET $2;
      `,
      [flaskIds]
    );
    // console.log('trying to get timezone to work', results);
    res.status(200).json({
      status: 'success',
      // results: results.rows.length,
      data: results.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err?.detail || 'Internal server error' });
  }
});

flaskRouter.route('/search').get(async (req, res) => {
  console.log('in flask search backend');
  try {
    console.log(
      'req.query',
      req.query,
      'req.query.limit',
      req.query.limit,
      'req.query.offset',
      req.query.offset
    );
    const limit = parseInt(req.query.limit, 10) || LIMIT || 10; // Default to 50 if not specified
    const offset =
      parseInt(req.query.offset, 10) - parseInt(req.query.limit, 10) || 0; // Default to 0 if not specified
    // Assuming all queries come in as `searchField[]=field&searchText[]=text`
    console.log('req.query in cellbanks/search', req.query);
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

    // const validFields = [
    //   'flask_id',
    //   'cell_bank_id',
    //   'inoculum_ul',
    //   'media',
    //   'media_ml',
    //   'rpm',
    //   'start_date',
    //   'temp_c',
    //   'vessel_type',
    //   'username',
    //   'user_id',
    //   'human_readable_date',
    // ];

    // const validFields = {
    //   'flasks.flask_id': 'flask_id',
    //   'flasks.cell_bank_id': 'cell_bank_id',
    //   'flasks.inoculum_ul': 'inoculum_ul',
    //   'flasks.media': 'media',
    //   'flasks.media_ml': 'media_ml',
    //   'flasks.rpm': 'rpm',
    //   'flasks.start_date': 'start_date',
    //   'flasks.temp_c': 'temp_c',
    //   'flasks.vessel_type': 'vessel_type',
    //   'flasks.username': 'username',
    //   'flasks.user_id': 'user_id',
    //   'flasks.human_readable_date': 'human_readable_date',
    //   'cell_banks.cell_bank_id': 'cell_bank_id',
    //   'cell_banks.strain': 'strain',
    //   'cell_banks.target_molecule': 'target_molecule',
    //   'cell_banks.project': 'project',
    // }

    const validFields = {
      flask_id: 'flasks.flask_id',
      cell_bank_id: 'flasks.cell_bank_id',
      inoculum_ul: 'flasks.inoculum_ul',
      media: 'flasks.media',
      media_ml: 'flasks.media_ml',
      rpm: 'flasks.rpm',
      start_date: 'flasks.start_date',
      temp_c: 'flasks.temp_c',
      vessel_type: 'flasks.vessel_type',
      username: 'flasks.username',
      user_id: 'flasks.user_id',
      human_readable_date: 'flasks.human_readable_date',
      strain: 'cell_banks.strain',
      target_molecule: 'cell_banks.target_molecule',
      project: 'cell_banks.project',
    };

    // Filter out invalid fields
    const queries = searchField
      .map((field, index) => ({
        field: validFields[field],
        text: searchText?.[index] || '',
      }))
      .filter(
        (q) => Object.values(validFields).includes(q.field) && q.text !== ''
      );
    console.log('is console working after queries');
    console.log('queries', queries);

    if (queries.length === 0) {
      return res
        .status(400)
        .json({ message: 'No valid search fields provided' });
    }

    const numericFields = [
      validFields.flask_id,
      validFields.cell_bank_id,
      validFields.inoculum_ul,
      validFields.media_ml,
      validFields.rpm,
      validFields.temp_c,
    ];

    const transformQueryObject = (queryObject) => {
      if (numericFields.includes(queryObject.field)) {
        console.log(
          'numericFields.includes(queryObject.field)',
          numericFields.includes(queryObject.field)
        );
        return {
          ...queryObject,
          text: Number(queryObject.text),
        };
      }
      return queryObject;
    };

    const queryObjectSchema = z.object({
      field: z.string(),
      text: z.union([z.string(), z.number()]),
    });

    const transformedQueryObjectSchema =
      queryObjectSchema.transform(transformQueryObject);

    const queryArraySchema = z.array(transformedQueryObjectSchema);

    // console.log('queries before zodvalidation flaskroutes search', queries);
    // const validatedQueries = queries.map((query)=> (flasksSearchSchema.safeParse(query).data));
    // console.log('validatedQueries FLASK SEARCH', validatedQueries);
    const { data, success, error } = queryArraySchema.safeParse(queries);
    // console.log('zodValidatedData in flasks search', zodValidatedData);
    // console.log('zodValidatedData', zodValidatedData);
    if (!success) {
      return res.status(400).json({
        message: error?.issues,
        serverError: 'Zod validation error on the server for search flasks',
      });
    }

    if (data?.length === 0) {
      return res.status(400).json({
        message: error?.issues,
        serverError: 'No Match.  Check search fields',
      });
    }

    // Construct WHERE clause dynamically
    const whereClauses = data.map((q, index) => {
      const fieldForQuery = q.field;
      // q.field === 'flask_id' ? `${q.field}::text` : q.field;
      if (typeof q.text === 'number') {
        console.log(`{q.field} = $${index + 1}`, q.field, index + 1);
        return `${q.field} = $${index + 1}`;
      }
      if (q.field === 'flasks.human_readable_date') {
        q.field = 'start_date';
        q.text = getUtcTimestampFromLocalTime(q.text);
      }
      if (q.field === 'start_date') {
        return `flasks.start_date > $${index + 1}`;
      } else {
        return `to_tsvector(${fieldForQuery}) @@ plainto_tsquery($${
          index + 1
        })`;
      }
    });

    // flask_id: 'flasks.flask_id',
    // cell_bank_id: 'flasks.cell_bank_id',
    // inoculum_ul: 'flasks.inoculum_ul',
    // media: 'flasks.media',
    // media_ml: 'flasks.media_ml',
    // rpm: 'flasks.rpm',
    // start_date: 'flasks.start_date',
    // temp_c: 'flasks.temp_c',
    // vessel_type: 'flasks.vessel_type',
    // username: 'flasks.username',
    // user_id: 'flasks.user_id',
    // human_readable_date: 'flasks.human_readable_date',
    // strain: 'cell_banks.strain',
    // target_molecule: 'cell_banks.target_molecule',
    // project: 'cell_banks.project',
    // let queryText = `SELECT * FROM flasks`;
    let queryText = `SELECT 
      flasks.flask_id, 
      flasks.cell_bank_id,
      flasks.media,
      flasks.media_ml,
      flasks.rpm,
      flasks.start_date,
      flasks.temp_c,
      flasks.vessel_type,
      flasks.username,
      flasks.user_id,
      cell_banks.strain,
      cell_banks.target_molecule,
      cell_banks.project
      FROM flasks
      LEFT JOIN cell_banks ON flasks.cell_bank_id = cell_banks.cell_bank_id`;
    if (whereClauses.length > 0) {
      queryText += ` WHERE ${whereClauses.join(' AND ')}`;
    }
    queryText += ` ORDER BY flask_id DESC LIMIT $${
      whereClauses.length + 1
    } OFFSET $${whereClauses.length + 2}`;

    const query = {
      text: queryText,
      values: [...data.map((q) => q.text), limit, offset],
    };

    console.log('QUERY!!!', query);

    const results = await db.query(query);

    // if (results.rows.length === 0) {
    //   return res.status(404).json({ message: 'No flasks found' });
    // }
    console.log('returned data', results.rows);
    return res.status(200).json({
      status: 'success',
      data: results.rows,
    });
  } catch (err) {
    console.error(err);
    console.error('Database query error:', err.message);
    console.error('Detailed error:', err);
    res.status(500).json({
      message: err?.detail || 'Internal server error',
      error: err.message,
    });

    res.status(500).json({ message: err?.detail || 'Internal server error' });
  }
});

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

flaskRouter
  .route('/:id')
  .put(validateIdParam, allowIfUserIdMatchesMiddleware, async (req, res) => {
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
      res
        .status(200)
        .json({ message: 'Update successful', data: results.rows });
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

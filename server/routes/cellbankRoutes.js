import express from 'express';
import { validateIdParam } from '../middleware/validateIdParam.js';
import { db } from '../db/db.js';
import {
  cellbanksSearchSchemaArray,
  createCellbankSchema,
  updateBackendCellbankSchema,
} from '../zodSchemas.js';
import { allowRolesAdminUser } from '../middleware/roles/allowRolesAdminUserMiddleware.js';
import { badWordsMiddleware } from '../middleware/badWordsMiddleware.js';
import { allowIfUserIdMatchesMiddleware } from '../middleware/roles/allowIfUserIdMatchesMiddleware.js';
import { LIMIT } from '../../src/lib/constants.js';
import { getUtcTimestampFromLocalTime } from '../helperFunctions.js';
import { z } from 'zod';

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
  } catch (err) {
    // console.log(error);
    // res.status(500).json({ error: 'Failed to fetch cell banks' });
    console.error(err);
    res.status(500).json({ message: err?.detail || 'Internal server error' });
  }
});

// post one cell bank
cellbankRouter
  .route('/')
  .post(allowRolesAdminUser, badWordsMiddleware, async (req, res) => {
    try {
      const userObj = req.oidc.user;
      console.log('userObj in cellbank post', userObj);
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
      console.error(err);
      res.status(500).json({ message: err?.detail || 'Internal server error' });
    }
  });

cellbankRouter.route('/search').get(async (req, res) => {
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

    const validFields = [
      'cell_bank_id',
      'strain',
      'project',
      'target_molecule',
      'description',
      'notes',
      'username',
      // 'date_timestampz',
      'human_readable_date',
    ];

    const numericFields = ['cell_bank_id'];

    // Filter out invalid fields
    const queries = searchField
      .map((field, index) => ({
        field,
        text:
          (numericFields.includes(field)
            ? Number(searchText?.[index])
            : searchText?.[index]) || '',
      }))
      .filter((q) => validFields.includes(q.field) && q.text !== '');
    console.log('is console working after queries');
    console.log('queries', queries);

    if (queries.length === 0) {
      // return;
      return res
        .status(400)
        .json({ message: 'No valid search fields provided' });
    }

    const queryObjectSchema = z.object({
      field: z.string(),
      text: z.union([z.string(), z.number()]),
    });

    const transformQueryObject = (queryObject) => {
      if (numericFields.includes(queryObject.field)) {
        return { ...queryObject, text: Number(queryObject.text) };
      }
      return queryObject;
    };

    const transformedQueryObjectSchema =
      queryObjectSchema.transform(transformQueryObject);

    const queryArraySchema = z.array(transformedQueryObjectSchema);

    // const zodValidatedData = queryArraySchema.parse(queries);

    const { data, success, error } = queryArraySchema.safeParse(queries);
    if (!success) {
      return res.status(400).json({
        message: error?.issues?.map((issue) => ({
          path: issue.path.join('.'),
          message: issue.message,
        })),
        serverError: 'Zod validation error on the server for search cell banks',
      });
    }

    if (data?.length === 0) {
      return res.status(400).json({
        message: error?.issues,
        serverError: 'No Match.  Check search fields',
      });
    }
    console.log('data', data);
    // console.log('zodValidatedData', zodValidatedData);
    // Construct WHERE clause dynamically
    const whereClauses = data.map((q, index) => {
      const fieldForQuery =
        q.field === 'cell_bank_id' ? `${q.field}::text` : q.field;
      if (q.field === 'human_readable_date') {
        q.field = 'date_timestampz';
        q.text = getUtcTimestampFromLocalTime(q.text);
      }
      if (q.field === 'date_timestampz') {
        return `cell_banks.date_timestamptz > $${index + 1}`;
      } else {
        return `to_tsvector(${fieldForQuery}) @@ plainto_tsquery($${
          index + 1
        })`;
      }
    });

    let queryText = `SELECT * FROM cell_banks`;
    if (whereClauses.length > 0) {
      queryText += ` WHERE ${whereClauses.join(' AND ')}`;
    }
    queryText += ` ORDER BY cell_bank_id DESC LIMIT $${
      whereClauses.length + 1
    } OFFSET $${whereClauses.length + 2}`;

    const query = {
      text: queryText,
      values: [...data.map((q) => q.text), limit, offset],
    };

    console.log('QUERY!!!', query);

    const results = await db.query(query);

    if (results.rows.length === 0) {
      return res.status(404).json({ message: 'No cell banks found' });
    }
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

// UPDATE one cell bank

cellbankRouter
  .route('/:id')
  .put(validateIdParam, allowIfUserIdMatchesMiddleware, async (req, res) => {
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
      // req.tableName = 'cell_banks';
      // req.primaryKey = 'cell_bank_id';
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
      // console.error('Error in server PUT request:', err);
      // res.status(500).json({ message: 'Internal server error' });
      console.error(err);
      res.status(500).json({ message: err?.detail || 'Internal server error' });
    }
  });

// DELETE on cell bank
cellbankRouter.route('/:id').delete(validateIdParam, async (req, res) => {
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
    // res.status(500).json({
    //   status: 'error',
    //   message: 'Internal server error',
    // });
    console.error(err);
    res.status(500).json({ message: err?.detail || 'Internal server error' });
  }
});

// cellbankRouter.route('/search').get(async (req, res) => {
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
//     console.log('is console working after queries');
//     console.log('queries', queries);

//     const zodValidatedData = cellbanksSearchSchemaArray.safeParse(queries);
//     if (!zodValidatedData.success) {
//       return res.status(400).json({
//         message: zodValidatedData.error.issues,
//         serverError: 'Zod validation error on the server for search cell banks',
//       });
//     }

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

export default cellbankRouter;

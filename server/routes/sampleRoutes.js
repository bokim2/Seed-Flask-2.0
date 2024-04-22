import express from 'express';
import { db } from '../db/db.js';
import { LIMIT } from '../../src/lib/constants.js';
import { allowRolesAdminUser } from '../middleware/roles/allowRolesAdminUserMiddleware.js';
import { badWordsMiddleware } from '../middleware/badWordsMiddleware.js';
import { sampleSearchSchemaArray } from '../zodSchemas.js';
import { getUtcTimestampFromLocalTime } from '../helperFunctions.js';
import { z } from 'zod';

const sampleRouter = express.Router();

// GET all samples
console.log('in sampleRoutes.js');


sampleRouter.route('/search').get(async (req, res) => {
  try {
    console.log('in samples search backend')
    const limit = parseInt(req.query.limit, 10 || LIMIT);
    const offset =
      parseInt(req.query.offset, 10) - parseInt(req.query.limit, 10) || 0;

    let { searchField, searchText } = req.query;

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
      'sample_id',
      'flask_id',
      // 'end_date',
      'end date/time',
      'od600',
      'completed',
      'username',
      'user_id',
      'time_since_inoc_hr',
      
      'human_readable_date',
    ];
    
    const numericFields = ['sample_id', 'flask_id', 'od600', 'time_since_inoc_hr'];

    console.log('searchField', searchField, 'searchText', searchText)
    const queries = searchField
      .map((field, index) => ({
        field,
        text: (numericFields.includes(field) ? Number(searchText?.[index]) : searchText?.[index]) || '',
      }))
      .filter((q) => validFields.includes(q.field) && q.text !== '');

      console.log('queries', queries, 'numericFields.includes(searchField)', numericFields.includes(searchField))
    if (queries.length === 0) {
      return res
        .status(400)
        .json({ message: 'No valid search fields provided' });
    }

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
  text: z.union([z.string(), z.number()])
});

const transformedQueryObjectSchema =
queryObjectSchema.transform(transformQueryObject);

const queryArraySchema = z.array(transformedQueryObjectSchema);

const zodValidatedData = queryArraySchema.parse(queries);
console.log('zodValidatedData in samples search', zodValidatedData)


    // Construct WHERE clause dynamically
    const whereClauses = zodValidatedData.map((q, index) => {
      const fieldForQuery = q.field;
      console.log(q.field, 'q.field', q.text, 'q.text', index, 'index')
      // q.field === 'flask_id' ? `${q.field}::text` : q.field;
      if (typeof q.text === 'number') {

        console.log(`{q.field} = $${index + 1}`, q.field, index + 1)

        return `ROUND(${q.field}::numeric) = ROUND($${index + 1}::numeric)`;
      }
      if (q.field === 'end date/time') {
        q.field = 'end_date';
        q.text = getUtcTimestampFromLocalTime(q.text);
      }
      if (q.field === 'end_date') {
        return `samples.end_date > $${index + 1}`;
      } else {
        return `to_tsvector(${fieldForQuery}) @@ plainto_tsquery($${
          index + 1
        })`;
      }
    });


    let queryText = `SELECT * FROM samples`;
    if (whereClauses.length > 0) {
      queryText += ` WHERE ${whereClauses.join(' AND ')}`;
    }
    queryText += ` ORDER BY sample_id DESC LIMIT $${
      whereClauses.length + 1
    } OFFSET $${whereClauses.length + 2}`;

    const query = {
      text: queryText,
      values: [...queries.map((q) => q.text), limit, offset],
    };

    console.log('QUERY!!!', query);

    const results = await db.query(query);

    if (results.rows.length === 0) {
      return res.status(404).json({ message: 'No samples found' });
    }
    console.log('returned data', results.rows);
    return res.status(200).json({
      status: 'success',
      data: results.rows,
    });
  } catch (err) {
    console.log(err, err.detail);
    res.status(500).json({
      message: err?.detail || 'Internal server error',
    })
  }
});



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
    console.error(err);
    res.status(500).json({ message: err?.detail || 'Internal server error' });
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
      console.error(err);
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
    console.error(err);
    res.status(500).json({ message: err?.detail || 'Internal server error' });
  }
});

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
    console.error(err);
    res.status(500).json({ message: err?.detail || 'Internal server error' });
  }
});

export default sampleRouter;

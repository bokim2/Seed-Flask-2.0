import { RolesUrl } from '../../../src/lib/constants.js';
import { db } from '../../db/db.js';
import { prodUrl } from '../../index.js';

export const routeConfigTableAndPrimaryKey = {
  cellbanks: { tableName: 'cell_banks', primaryKey: 'cell_bank_id' },
  flasks: { tableName: 'flasks', primaryKey: 'flask_id' },
  samples: { tableName: 'samples', primaryKey: 'sample_id' },
};

// allow only admin or user roles

export const allowIfUserIdMatchesMiddleware = async (req, res, next) => {
  try {
    console.log('req.path', req.path, req.baseUrl);
    // console.log('req.oidc.user in cellbanks backend', req?.oidc?.user);
    if (req?.oidc?.user) {
      const userObj = req.oidc.user;

      // console.log('RolesUrl', RolesUrl, 'userObj', userObj, 'url', prodUrl);
      const roles = userObj[RolesUrl] || [];
      console.log('roles', roles);
      if (roles.includes('admin')) {
        console.log('user role is admin or user');
        next();
      } else if (roles.includes('user')) {
        const id = req.params.id;

        console.log('req.baseUrl', req.baseUrl);

        //   Object.keys(routeConfigTableAndPrimaryKey).find(path => req.baseUrl.includes(path))

        //   console.log('Object.keys(routeConfigTableAndPrimaryKey).find(path => req.baseUrl.includes(path))', Object.keys(routeConfigTableAndPrimaryKey).find(path => req.baseUrl.includes(path)))

        const matchedTableInfo = Object.keys(
          routeConfigTableAndPrimaryKey
        ).find((path) => req.baseUrl.includes(path));

        // console.log('matchedTableInfo', matchedTableInfo)

        const tableName =
          routeConfigTableAndPrimaryKey?.[matchedTableInfo]?.tableName;
        const primaryKey =
          routeConfigTableAndPrimaryKey?.[matchedTableInfo]?.primaryKey;

        console.log('tableName, primaryKey', tableName, primaryKey);

        const results = await db.query(
          `Select * from ${tableName} where ${primaryKey} = $1`,
          [id]
        );
        console.log(
          'results.rows[0].user_id, userObj.sub',
          results.rows[0].user_id,
          userObj.sub
        );
        if (results.rows[0].user_id === userObj.sub) {
          next();
        } else {
          res.status(403).json({
            serverError: `Id=${id}: User is not authorized, only user who created the entry or admins are allowed (guests can only read).  user who wrote the entry: ${results.rows[0].username} ${results.rows[0].user_id}
            }, user who is trying to edit: ${userObj.name} ${userObj.sub}`,
          });
        }
        console.log(
          'ALL USERNAME USERID',
          results.rows[0].username,
          results.rows[0].user_id,
          userObj.name,
          userObj.sub
        );
      } else {
        res.status(403).json({
          serverError:
            'Id=${id}: User is not authorized, only user who created the entry or admins are allowed (guests can only read).',
        });
      }
    } else {
      res.status(403).json({ serverError: 'User authentication is required' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err?.detail || 'Internal server error' });
  }
};

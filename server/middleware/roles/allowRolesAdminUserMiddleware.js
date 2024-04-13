import { RolesUrl } from '../../../src/lib/constants.js';
import { prodUrl } from '../../index.js';

// allow only admin or user roles

export const allowRolesAdminUser = (req, res, next) => {
  try {
    console.log('req.oidc.user in cellbanks backend', req.oidc.user);
    if (req?.oidc?.user) {
      const userObj = req.oidc.user;

      console.log(
       'RolesUrl', RolesUrl, 'userObj', userObj, 'url', prodUrl
      )
      const roles = userObj[RolesUrl] || [];
      console.log('roles', roles);
      if (roles.includes('admin') || roles.includes('user')) {
        console.log('user role is admin or user');
        next();
      } else {
        res
          .status(403)
          .json({
            serverError:
              'User is not authorized, only user or admins are allowed (not guest accounts).',
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

export const allowRolesAdmin = (req, res, next) => {
  try {
    console.log('req.oidc.user in cellbanks backend', req.oidc.user);
    if (req?.oidc?.user) {
      const userObj = req.oidc.user;

      // console.log(
      //  'RolesUrl', RolesUrl, 'userObj', userObj, 'url', prodUrl
      // )
      const roles = userObj[RolesUrl] || [];
      console.log('roles', roles);
      if (roles.includes('admin')) {
        console.log('user role is admin or user');
        next();
      } else {
        res
          .status(403)
          .json({
            serverError:
              "User is not authorized, only admins are allowed to edit other user's data.",
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

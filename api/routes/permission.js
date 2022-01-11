const { CREATED, OK } = require('http-status');
const { celebrate, Joi } = require('celebrate');
const { isAuth, checkPermissions } = require('./../middlewares');
const {
  createPermission, getPermissionById, getPermissionList, deletePermissionById, updatePermission
} = require('./../../services/permission');
const { Router } = require('express');
const route = Router();

/**
 * Get permission by id
 */
route.get(
  '/:id',
  isAuth,
  async (req, res, next) => {
    try {
      await checkPermissions(req?.user?.roleName, 'permissions:get');

      const permission = await getPermissionById(req?.params?.id);

      return res.success(permission);
    } catch (err) {
      next(err);
    }
  },
);

/**
 * Get list of permissions
 */
route.get(
  '/',
  isAuth,
  async (req, res, next) => {
    try {
      await checkPermissions(req?.user?.roleName, 'permissions:get_list');

      const permissions = await getPermissionList(req?.query);

      return res.success(permissions, OK);
    } catch (err) {
      next(err);
    }
  },
);

/**
 * Create permission
 */
route.post(
  '/',
  isAuth,
  celebrate({
    body: Joi.object({
      permName: Joi.string().required(),
      permDescription: Joi.string().required(),
    }),
  }, {
    abortEarly: false, allowUnknown: true, stripUnknown: true
  }),
  async (req, res, next) => {
    try {
      await checkPermissions(req?.user?.roleName, 'permissions:add');

      const permission = await createPermission(req.body);

      return res.success(permission, CREATED);
    } catch (err) {
      next(err);
    }
  },
);

/**
 * Update permission by id
 */
route.put(
  '/:id',
  isAuth,
  celebrate({
    body: Joi.object({
      permName: Joi.string().required(),
      permDescription: Joi.string().required(),
    }),
  }, {
    abortEarly: false, allowUnknown: true, stripUnknown: true
  }),
  async (req, res, next) => {
    try {
      await checkPermissions(req?.user?.roleName, 'permissions:update');

      const permission = await updatePermission(req?.params?.id, req.body);

      return res.success(permission, OK);
    } catch (err) {
      next(err);
    }
  },
);

/**
 * Delete permission by id
 */
route.delete(
  '/:id',
  isAuth,
  async (req, res, next) => {
    try {
      await checkPermissions(req?.user?.roleName, 'permissions:delete');

      const result = await deletePermissionById(req?.params?.id);

      return res.success(result, OK);
    } catch (err) {
      next(err);
    }
  },
);

module.exports = route;

const { CREATED } = require('http-status');
const { celebrate, Joi } = require('celebrate');
const { isAuth, checkPermissions } = require('./../middlewares');
const { createRole } = require('./../../services/role');
const { Router } = require('express');
const route = Router();

route.post(
  '/',
  isAuth,
  celebrate({
    body: Joi.object({
      name: Joi.string().required(),
      description: Joi.string().required(),
    }),
  }, {
    abortEarly: false, allowUnknown: true, stripUnknown: true
  }),
  async (req, res, next) => {
    try {
      await checkPermissions(req?.user?.roleName, 'role:add');

      const role = await createRole(req.body);

      return res.success(role, CREATED);
    } catch (err) {
      next(err);
    }
  },
);

// Add Permissions to Role
route.post(
  '/permissions/:id',
  isAuth,
  celebrate({
    body: Joi.object({
      permissions: Joi.array().items(Joi.number()).required(),
    }),
  }, {
    abortEarly: false, allowUnknown: true, stripUnknown: true
  }),
  async (req, res, next) => {
    try {
      await checkPermissions(req?.user?.roleName, 'role:add_permission');

      // @TODO
      return res.success(req?.body, CREATED);
    } catch (err) {
      next(err);
    }
  },
);

module.exports = route;

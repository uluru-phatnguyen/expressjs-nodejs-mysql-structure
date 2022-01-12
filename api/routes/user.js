const { CREATED, OK } = require('http-status');
const { celebrate, Joi } = require('celebrate');
const { isAuth, checkPermissions } = require('./../middlewares');
const { Router } = require('express');
const {
  createUser, updateUser, getUserById, getUserList, deleteUserById
} = require('./../../services/user');

const route = Router();

/**
 * Get me
 */
/* eslint-disable no-unused-vars */
route.get('/me', isAuth, (req, res, next) => {
  res.success({ me: req?.user });
});

/**
 * Get user by id
 */
route.get(
  '/:id',
  isAuth,
  async (req, res, next) => {
    try {
      await checkPermissions(req?.user?.roleName, 'user:get');

      const user = await getUserById(req?.params?.id);

      return res.success(user);
    } catch (err) {
      next(err);
    }
  },
);

/**
 * Get list of users
 */
route.get(
  '/',
  isAuth,
  async (req, res, next) => {
    try {
      await checkPermissions(req?.user?.roleName, 'user:get_list');

      const users = await getUserList(req?.query);

      return res.success(users, OK);
    } catch (err) {
      next(err);
    }
  },
);

/**
 * Create user
 */
route.post(
  '/',
  isAuth,
  celebrate({
    body: Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email(),
      roleName: Joi.string().required(),
    }),
  }, {
    abortEarly: false, allowUnknown: true, stripUnknown: true
  }),
  async (req, res, next) => {
    try {
      await checkPermissions(req?.user?.roleName, 'user:add');

      const user = await createUser(req.body);

      return res.success(user, CREATED);
    } catch (err) {
      next(err);
    }
  },
);

/**
 * Update user by id
 */
route.put(
  '/:id',
  isAuth,
  celebrate({
    body: Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      roleName: Joi.string().required(),
    }),
  }, {
    abortEarly: false, allowUnknown: true, stripUnknown: true
  }),
  async (req, res, next) => {
    try {
      await checkPermissions(req?.user?.roleName, 'user:update');

      const user = await updateUser(req?.params?.id, req.body);

      return res.success(user, OK);
    } catch (err) {
      next(err);
    }
  },
);

/**
 * Delete user by id
 */
route.delete(
  '/:id',
  isAuth,
  async (req, res, next) => {
    try {
      await checkPermissions(req?.user?.roleName, 'user:delete');

      const result = await deleteUserById(req?.params?.id);

      return res.success(result, OK);
    } catch (err) {
      next(err);
    }
  },
);

module.exports = route;

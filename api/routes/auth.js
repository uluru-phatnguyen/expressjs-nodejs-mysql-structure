const { Router } = require('express');
const { isAuth } = require('../middlewares');
const { celebrate, Joi } = require('celebrate');
const { CREATED, OK } = require('http-status');
const { signUp, signIn, signOut } = require('./../../services/auth');

const route = Router();

/**
 * Auth SignUp
 */
route.post(
  '/signup',
  celebrate({
    body: Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email(),
      password: Joi.string().required(),
    }),
  }, {
    abortEarly: false, allowUnknown: true, stripUnknown: true
  }),
  async (req, res, next) => {
    try {
      const { user, token } = await signUp(req.body);

      // Attatch user to request
      req.user = user;

      return res.success({ user, token }, CREATED);
    } catch (err) {
      return next(err);
    }
  },
);

/**
 * Auth SignIn
 */
route.post(
  '/signin',
  celebrate({
    body: Joi.object({
      email: Joi.string().email(),
      password: Joi.string().required(),
    }),
  }),
  async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const { user, token, refreshToken } = await signIn(email, password);

      // Attatch user to request
      req.user = user;

      return res.success({ user, token, refreshToken }, OK);
    } catch (err) {
      return next(err);
    }
  },
);

/**
 * Auth SignOut
 */
route.post('/logout', isAuth, (req, res, next) => {
  try {
    // Clean refresh token
    signOut(req?.user);

    // Reset
    req.user = null;

    return res.success({}, OK);
  } catch (err) {
    return next(err);
  }
});

module.exports = route;

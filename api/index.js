const { Router } = require('express');
const { response } = require('./middlewares');
const auth = require('./routes/auth');
const user = require('./routes/user');

const route = Router();
const middleware = [response];

route.get('/health', async (req, res, next) => {
  try {
    res.json('ok');
  } catch (err) {
    next(err);
  }
});

route.use('/auth', middleware, auth);
route.use('/user', middleware, user);

module.exports = route;

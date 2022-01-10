const { Router } = require('express');
const route = Router();

route.get('/me', (req, res, next) => {
  res.success({ me: {} });
});

module.exports = route;

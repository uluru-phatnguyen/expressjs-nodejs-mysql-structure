const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { handleError } = require('./helpers/error');
const apiRoutes = require('./api');
const { api } = require('./config/index');

const app = express();

app.use(cors());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({
  extended: true,
  limit: process.env.ENCODED_BODY_LIMIT || '50mb'
}));

// mount all routes on /api path
app.use(`${api.prefix}`, apiRoutes);

// Celebrate & Joi
app.use(errors());

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Path not found.');
  err.statusCode = 404;

  return next(err);
});

// error handler, send stacktrace only during development
/* eslint-disable no-unused-vars */
app.use((err, req, res, next) => {
  handleError(err, res);
});

module.exports = app;

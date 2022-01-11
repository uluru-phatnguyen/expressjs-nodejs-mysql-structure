const isAuth = require('./isAuth');
const { checkPermissions } = require('./checkPerm');

function response(req, res, next) {
  res.success = (data = null, statusCode = 200, message = 'success') => {
    return res.status(statusCode).json({
      code: 'success',
      data: data,
      statusCode,
      message: message,
    });
  };

  return next();
}

module.exports = {
  response,
  isAuth,
  checkPermissions,
};

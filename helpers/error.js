
const logger = require('./logger');

class KairosError extends Error {
  constructor(statusCode, message, code = 'error') {
    super();

    this.statusCode = statusCode ?? this.status;
    this.code = code?.toUpperCase();
    this.message = message;

    if (typeof message === 'object') {
      switch (message?.name) {
        case 'SequelizeValidationError': {
          this.code = `${message?.errors[0]?.validatorKey?.toUpperCase()}`;
          this.message = message?.errors[0]?.message;
          return;
        }
        case 'SequelizeUniqueConstraintError': {
          this.code = `${message?.errors[0]?.validatorKey?.toUpperCase()}`;
          this.message = message?.errors[0]?.message;
          return;
        }
        case 'SequelizeDatabaseError': {
          this.message = message?.message;
          return;
        }
        default: {
          this.message = message?.message;
          return;
        }
      }
    }

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * handleError
 *
 * @param {Error} err
 * @param {Object} res
 */
const handleError = (err, res) => {
  const { statusCode = 200, name } = err;

  if (name && name?.includes('Sequelize')) {
    err = new KairosError(statusCode, err);
  }

  logger.error('[HandleError]', { message: err.message || err, stack: err.stack });

  res.status(Number(statusCode)).json({
    statusCode: statusCode,
    code: err?.code,
    message: err?.message,
  });
};

module.exports = {
  KairosError,
  handleError
};

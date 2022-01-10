const dotenv = require('dotenv');
const dbConfig = require('./db.config.js');
const roleConstants = require('./role.js');

// Set the NODE_ENV to 'development' default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();

if (envFound?.error) {
  throw new Error('Not found .env file.');
}

module.exports = {
  /**
   * Server Port
   */
  port: Number(process.env.PORT, 6868),

  /**
   * JWT secret
   */
  jwtSecret: process.env.JWT_SECRET || '!@#$',
  jwtAlgorithm: process.env.JWT_ALGO || 'RS256',
  jwtExpiration: Number(process.env.JWT_EXPIRATION || 1 * 60 * 60), // 1 hour
  jwtRefreshExpiration: Number(process.env.JWT_REFRESH_EXPIRATION || 24 * 60 * 60), // 1 day

  /**
   * Winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'debug',
    dir: process.env.LOG_DIR || '../logs',
  },

  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },

  dbConfig: dbConfig[process.env.NODE_ENV],

  roleConstants: roleConstants,
};

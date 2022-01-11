const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const dbConfig = require('./db.config.js');
const roleConstants = require('./role.js');

// Set the NODE_ENV to 'development' default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';
const envFound = dotenv.config({
  path: path.resolve(__dirname, `./../${envFile}`),
});

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
  // jwtSecret: process.env.JWT_SECRET || '#123@321#',
  // jwtAlgorithm: process.env.JWT_ALGO || 'HS256',
  jwtSecret: fs.readFileSync(path.resolve(__dirname, './keys/jwtRS256.key')),
  jwtPublic: fs.readFileSync(path.resolve(__dirname, './keys/jwtRS256.key.pub')),
  jwtAlgorithm: 'RS256',
  jwtExpiration: Number(process.env.JWT_EXPIRATION || 1 * 60 * 60), // 1 hour
  jwtRefreshExpiration: Number(process.env.JWT_REFRESH_EXPIRATION || 24 * 60 * 60), // 1 day

  /**
   * Winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'debug',
    dir: process.env.LOG_DIR || '../logs',
    silent: process.env.LOG_SILENT || '',
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

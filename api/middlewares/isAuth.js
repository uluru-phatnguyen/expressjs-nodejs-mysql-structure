const jwt = require('express-jwt');
const { jwtSecret, jwtAlgorithm } = require('./../../config');

/**
 * getTokenFromHeaders
 *
 * Authorization: Bearer ${JWT}
 *
 */
const getTokenFromHeaders = (req) => {
  if (
    (req?.headers?.authorization && req?.headers?.authorization?.split(' ')[0] === 'JWT') ||
    (req?.headers?.authorization && req?.headers?.authorization?.split(' ')[0] === 'Bearer')
  ) {
    return req?.headers?.authorization?.split(' ')[1];
  } else if (req?.token) {
    return req?.token;
  }

  return null;
};

const isAuth = jwt({
  secret: jwtSecret, // The _secret_ to sign the JWTs
  algorithms: [jwtAlgorithm], // JWT Algorithm
  userProperty: 'token', // Use req.token to store the JWT
  getToken: getTokenFromHeaders, // How to extract the JWT from the request
});

module.exports = isAuth;

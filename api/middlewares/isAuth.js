const jwt = require('express-jwt');
const { jwtPublic, jwtAlgorithm } = require('./../../config');

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
  secret: jwtPublic, // The _secret_ to sign the JWTs
  algorithms: [jwtAlgorithm], // JWT Algorithm
  userProperty: 'user', // Use req.user to store the JWT
  getToken: getTokenFromHeaders, // How to extract the JWT from the request
});

module.exports = isAuth;

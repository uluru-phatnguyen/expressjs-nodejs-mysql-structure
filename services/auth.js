const jwt = require('jsonwebtoken');
const argon2 = require('argon2');
const { randomBytes } = require('crypto');
const { jwtSecret, jwtAlgorithm, jwtExpiration, roleConstants } = require('./../config');
const { NOT_FOUND, BAD_REQUEST, FORBIDDEN } = require('http-status');
const { KairosError } = require('./../helpers/error');
const { sequelize } = require('./../db');
const {
  User,
  RefreshToken,
} = sequelize.models;

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id, // Use this in the middleware 'isAuth'
      roleName: user.roleName,
    },
    jwtSecret,
    {
      algorithm: jwtAlgorithm,
      expiresIn: jwtExpiration
    }
  );
}

exports.signUp = async (userInputData) => {
  const salt = randomBytes(32);
  const hashedPassword = await argon2.hash(userInputData.password, { salt });

  const userRecord = await User.create({
    ...userInputData,
    salt: salt.toString('hex'),
    password: hashedPassword,
    roleName: roleConstants.ROLE_USER, // set Role default
  });

  const token = generateToken(userRecord);
  const user = userRecord.toJSON();

  delete user?.password;
  delete user?.salt;

  return { user, token };
};

exports.signIn = async (email, password) => {
  const userRecord = await User.findOne({
    where: {
      email,
    }
  });

  if (!userRecord) {
    throw new KairosError(NOT_FOUND, 'User not found.');
  }

  /**
   * We use verify from argon2 to prevent 'timing based' attacks
   */
  const validPassword = await argon2.verify(userRecord?.password, password);

  if (validPassword) {
    const token = generateToken(userRecord);

    const refreshToken = await RefreshToken.createToken(userRecord);

    const user = userRecord.toJSON();

    delete user?.password;
    delete user?.salt;

    return { user, token, refreshToken };
  } else {
    throw new KairosError(FORBIDDEN, 'Invalid email/password.');
  }
};

exports.refreshToken = async (requestToken) => {
  if (!requestToken || requestToken === null || requestToken === '') {
    throw new KairosError(BAD_REQUEST, 'Required refresh token.');
  }

  const refreshToken = await RefreshToken.findOne({
    where: {
      token: requestToken,
    }
  });

  if (!refreshToken) {
    throw new KairosError(FORBIDDEN, 'Invalid refresh token.');
  }

  if (RefreshToken.isExpiredToken(refreshToken)) {
    RefreshToken.destroy({
      where: {
        id: refreshToken.id,
      }
    });

    throw new KairosError(FORBIDDEN, 'Refresh token expired.');
  }

  // https://sequelize.org/v6/manual/assocs.html#note--method-names
  const user = await refreshToken.getUser();

  return {
    user,
    token: generateToken(user),
    refreshToken: refreshToken.token,
  };
};

exports.signOut = async (user) => {
  return RefreshToken.destroy({
    where: {
      userId: user?.id,
    },
  });
};

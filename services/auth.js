const jwt = require('jsonwebtoken');
const argon2 = require('argon2');
const { randomBytes } = require('crypto');
const { jwtSecret, jwtExpiration, roleConstants } = require('./../config');
const { NOT_FOUND, BAD_REQUEST, FORBIDDEN } = require('http-status');
const { KairosError } = require('./../helpers/error');
const { sequelize } = require('./../db');
const {
  User,
  RefreshToken,
  Role,
  Permission,
  RolePermission,
} = sequelize.models;

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id, // Use this in the middleware 'isAuth'
      roleName: user.roleName,
    },
    jwtSecret,
    {
      expiresIn: jwtExpiration
    }
  );
}

exports.signUp = async (userInputData) => {
  try {
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
  } catch (err) {
    throw err;
  }
};

exports.signIn = async (email, password) => {
  try {
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
  } catch (err) {
    throw err;
  }
};

exports.refreshToken = async (requestToken) => {
  if (!requestToken || requestToken === null || requestToken === '') {
    throw new KairosError(BAD_REQUEST, 'Required refresh token.');
  }

  try {
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
  } catch (err) {
    throw err;
  }
};

exports.signOut = async (user) => {
  return RefreshToken.destroy({
    where: {
      userId: user?.id,
    },
  });
};

exports.checkPermissions = async (roleName, permName) => {
  try {
    // const permission = await Permission.findOne({
    //   where: {
    //     permName: permName
    //   },
    // });

    // if (!permission) {
    //   throw new KairosError(FORBIDDEN, 'Permission denied.');
    // }

    const role = await Role.findOne({
      where: {
        name: roleName,
      },
      include: [
        {
          model: Permission,
          as: 'permissions',
          through: {
            model: RolePermission,
            attributes: [],
          },
          where: {
            permName: permName,
          },
          required: true,
        }
      ]
    });

    if (!role) {
      throw new KairosError(FORBIDDEN, 'Role denied.');
    }

    return role;
  } catch (err) {
    throw err;
  }
};

const { DataTypes } = require('sequelize');
const { newToken } = require('./../../utils/crypto');
const { jwtRefreshExpiration } = require('./../../config/index');

module.exports = (sequelize) => {
  const RefreshToken = sequelize.define('RefreshToken', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiredAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    timestamps: true,
    paranoid: true,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ['id'],
      },
      {
        unique: true,
        fields: ['token'],
        where: {
          deleted_at: null,
        }
      }
    ],
  });

  RefreshToken.createToken = async function (user) {
    await this.destroy({
      where: {
        userId: user?.id,
      }
    });

    const expiredAt = new Date();
    expiredAt.setSeconds(expiredAt.getSeconds() + jwtRefreshExpiration);

    const refreshToken = await this.create({
      token: 'r:' + newToken(),
      expiredAt: expiredAt.getTime(),
      userId: user.id,
    });

    return refreshToken.token;
  };

  RefreshToken.isExpiredToken = (token) => {
    return token.expiredAt.getTime() < new Date().getTime();
  };

  // Association will be setup in ../extra-setup.js
  // RefreshToken belongsTo User

  return RefreshToken;
};
